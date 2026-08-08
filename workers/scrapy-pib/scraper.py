"""
TGPRB Current Affairs Scraper - Exam Card Edition
---------------------------------------------------------------------------
Runs as a GitHub Actions cron job daily at 7am IST.

Pipeline:
1. Fetch Google News RSS for PYQ-aligned categories
2. Visit each source URL and extract the real article text
3. Gemini reads the real article and extracts exam facts + MCQ
4. Save as content/current-affairs/*.md exam cards

Gemini is an EXTRACTION layer only - it reads real article text and
pulls out facts. It does NOT generate or invent any information.

Based on docs/current-affairs-audit.md PYQ analysis:
- 154 CA questions across 10 papers (7.7% of exam)
- Top categories: Appointments (14.3%), International (14.3%),
  Economy (11.7%), Awards (10.4%), Sports (9.7%)
"""

import os
import re
import json
import tempfile
import requests
from datetime import datetime, timezone
from pathlib import Path
from bs4 import BeautifulSoup


# -- Config -------------------------------------------------------------------
CONTENT_DIR    = Path("content/current-affairs")
MAX_AGE_DAYS   = 365
TELEGRAM_BOT   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT  = os.environ.get("TELEGRAM_CHAT_ID", "")
GCP_PROJECT    = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS_JSON = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
AI_SCORE_MIN   = 6

# PYQ-proven categories (from audit Section A2)
VALID_CATEGORIES = [
    "appointments", "international", "economy", "awards", "sports",
    "telangana", "schemes", "defence", "science", "judiciary",
    "environment", "books",
]

# -- Gemini client setup ------------------------------------------------------
_vertex_client = None

def get_vertex_client():
    """
    Returns a Gemini client. Tries in order:
    1. Plain GEMINI_API_KEY (for local runs)
    2. Vertex AI via GCP_CREDS_JSON (for GitHub Actions)
    3. Vertex AI via ADC (gcloud auth application-default login)
    """
    global _vertex_client
    if _vertex_client is not None:
        return _vertex_client

    try:
        from google import genai

        # Option 1: plain API key (local dev)
        if GEMINI_API_KEY:
            _vertex_client = genai.Client(api_key=GEMINI_API_KEY)
            print("  [AI] Gemini ready via API key")
            return _vertex_client

        # Option 2: Vertex AI via JSON credentials (GitHub Actions)
        if GCP_CREDS_JSON and GCP_PROJECT:
            creds_data = json.loads(GCP_CREDS_JSON)
            tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
            json.dump(creds_data, tmp)
            tmp.flush()
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
            _vertex_client = genai.Client(vertexai=True, project=GCP_PROJECT, location="global")
            print("  [AI] Vertex AI ready via service account JSON")
            return _vertex_client

        # Option 3: ADC (gcloud auth application-default login)
        if GCP_PROJECT:
            _vertex_client = genai.Client(vertexai=True, project=GCP_PROJECT, location="global")
            print("  [AI] Vertex AI ready via ADC")
            return _vertex_client

        print("  [AI] No credentials. Set GEMINI_API_KEY or GOOGLE_CLOUD_PROJECT.")
        return None
    except Exception as e:
        print(f"  [AI] Init error: {e}")
        return None


# -- PYQ-aligned topic feeds --------------------------------------------------
# Ranked by exam frequency from audit Section A2
TOPIC_FEEDS = [
    # Priority 1: Appointments (14.3% of CA questions, 8/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+appointed+governor+secretary+chairman+DG+chief+justice+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "Appointments and Office-Holders",
        "category": "appointments",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    # Priority 2: International (14.3%, 8/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+summit+bilateral+agreement+G20+BRICS+UN+SCO+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "International Affairs",
        "category": "international",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    # Priority 3: Economy (11.7%, 8/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+RBI+GDP+inflation+budget+fiscal+GST+repo+rate+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Economy",
        "topic": "Indian Economy",
        "category": "economy",
        "related_topic_ids": ["NOTE-ECO-GENERAL"],
    },
    # Priority 4: Awards (10.4%, 8/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+Padma+Jnanpith+Nobel+Dronacharya+Arjuna+award+prize+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "General Knowledge",
        "topic": "Awards and Honours",
        "category": "awards",
        "related_topic_ids": [],
    },
    # Priority 5: Sports (9.7%, 8/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+cricket+boxing+athletics+medal+championship+Olympics+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "General Knowledge",
        "topic": "Sports Results",
        "category": "sports",
        "related_topic_ids": [],
    },
    # Priority 6: Telangana (9.1%, 6/10 papers) - 3 site-specific feeds
    {
        "url": "https://news.google.com/rss/search?q=Telangana+OR+Hyderabad+government+OR+scheme+OR+budget+OR+police+OR+inaugurated+when:7d+site:telanganatoday.com&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Telangana",
        "topic": "Telangana State",
        "category": "telangana",
        "related_topic_ids": ["NOTE-TEL-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=Telangana+OR+Hyderabad+government+OR+scheme+OR+budget+OR+police+OR+inaugurated+when:7d+site:thehansindia.com&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Telangana",
        "topic": "Telangana State",
        "category": "telangana",
        "related_topic_ids": ["NOTE-TEL-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=Telangana+OR+Hyderabad+government+OR+scheme+OR+budget+OR+police+OR+inaugurated+when:7d+site:thehindu.com&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Telangana",
        "topic": "Telangana State",
        "category": "telangana",
        "related_topic_ids": ["NOTE-TEL-GENERAL"],
    },
    # Priority 7: Government Schemes (8.4%, 7/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+scheme+launched+yojana+mission+programme+inaugurated+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "Government Schemes",
        "category": "schemes",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    # Priority 8: Defence (6.5%, 7/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+DRDO+missile+exercise+IAF+Navy+Army+defence+procurement+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "General Knowledge",
        "topic": "Defence and Security",
        "category": "defence",
        "related_topic_ids": [],
    },
    # Priority 9: Science/Space (3.9%, 6/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+ISRO+launch+satellite+space+SSLV+PSLV+science+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Science & Technology",
        "topic": "Science and Space",
        "category": "science",
        "related_topic_ids": ["NOTE-SCI-GENERAL"],
    },
    # Priority 10: Judiciary (4.5%, 4/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+Supreme+Court+verdict+High+Court+commission+bench+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "Judiciary and Commissions",
        "category": "judiciary",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    # Priority 11: Environment (2.6%, 3/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+wildlife+national+park+cyclone+climate+forest+endangered+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Geography",
        "topic": "Environment and Ecology",
        "category": "environment",
        "related_topic_ids": ["NOTE-GEO-ENVIRONMENT"],
    },
    # Priority 12: Books (3.2%, 4/10 papers)
    {
        "url": "https://news.google.com/rss/search?q=India+book+author+Sahitya+Akademi+literary+prize+memoir+when:7d&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "General Knowledge",
        "topic": "Books and Literary Awards",
        "category": "books",
        "related_topic_ids": [],
    },
]

MAX_ITEMS_PER_FEED = 20


# -- Article text extraction --------------------------------------------------

def fetch_article_text(url: str) -> str:
    """
    Fetch the actual article from a source URL and extract readable text.
    This is the ground truth - Gemini will extract facts from THIS text,
    not generate them from thin air.
    """
    try:
        # Follow Google News redirects to the real article
        resp = requests.get(
            url,
            headers={
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                              "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            },
            timeout=15,
            allow_redirects=True,
        )
        resp.raise_for_status()
    except Exception as e:
        print(f"    [Fetch] Failed: {e}")
        return ""

    try:
        soup = BeautifulSoup(resp.text, "html.parser")

        # Remove noise: scripts, styles, nav, ads, sidebars
        for tag in soup(["script", "style", "nav", "footer", "aside",
                         "iframe", "noscript", "form", "header"]):
            tag.decompose()

        # Try common article containers first
        article = (
            soup.find("article")
            or soup.find("div", class_=re.compile(r"article|story|content|post", re.I))
            or soup.find("main")
            or soup.body
        )

        if not article:
            return ""

        # Extract text from paragraphs (most reliable for articles)
        paragraphs = article.find_all("p")
        text = "\n".join(p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True))

        # Cap at 3000 chars to keep Gemini prompt manageable
        if len(text) > 3000:
            text = text[:3000] + "..."

        return text
    except Exception as e:
        print(f"    [Parse] Failed: {e}")
        return ""


# -- AI: Extract exam cards from real article text ----------------------------

def ai_extract_exam_cards(items: list[dict], feed_meta: dict) -> list[dict]:
    """
    Two-phase AI pipeline:
    Phase 1: Quick score headlines (batch of 25) - cheap, fast
    Phase 2: For passing headlines, read article text and extract facts (1 by 1)

    Gemini is EXTRACTION only. It reads real article text and pulls out
    facts that exist in the source. It does NOT invent information.
    """
    client = get_vertex_client()
    if not client or not items:
        return items

    # ── Phase 1: Quick headline scoring (batch) ──────────────────────────
    print("  Phase 1: Scoring headlines...")
    CHUNK_SIZE = 25
    scored = []

    for chunk_idx in range(0, len(items), CHUNK_SIZE):
        chunk = items[chunk_idx:chunk_idx + CHUNK_SIZE]
        headlines = "\n".join(
            f"{i+1}. {item['title']}" for i, item in enumerate(chunk)
        )

        score_prompt = f"""You are a filter for TGPRB police exam current affairs.
Category: {feed_meta['category']}

Score each headline 0-10 for TGPRB exam relevance:
- 8-10: Direct exam question likely (appointment, award, result, summit, scheme launch)
- 5-7: Useful context but not a direct question
- 0-4: Irrelevant (opinion, listicle, entertainment, foreign sports, coaching ad)

Headlines:
{headlines}

Reply ONLY with a JSON array of integers ({len(chunk)} scores). Example: [8, 3, 7, 2]"""

        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=score_prompt,
            )
            text = response.text.strip()
            if "```" in text:
                text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()

            scores = json.loads(text)
            if isinstance(scores, list) and len(scores) == len(chunk):
                for item, score in zip(chunk, scores):
                    if isinstance(score, int) and score >= AI_SCORE_MIN:
                        item['ai_score'] = score
                        scored.append(item)
                    else:
                        print(f"    Dropped (score {score}): {item['title'][:55]}")
            else:
                scored.extend(chunk)  # Keep on parse error
        except Exception as e:
            print(f"    Score error: {e}")
            scored.extend(chunk)

    print(f"  Phase 1: {len(scored)}/{len(items)} passed headline filter")
    if not scored:
        return []

    # ── Phase 2: Read real article + extract facts (one by one) ──────────
    print("  Phase 2: Reading articles and extracting exam facts...")
    results = []

    for item in scored:
        title = clean_title(item["title"])
        print(f"    Reading: {title[:55]}...")

        article_text = fetch_article_text(item["link"])
        if not article_text or len(article_text) < 50:
            print(f"    Skipped (no article text)")
            continue

        extract_prompt = f"""You are extracting exam-ready facts from a real news article for TGPRB police exam preparation.

RULES:
- Extract ONLY facts that are explicitly stated in the article text below.
- Do NOT add any information that is not in the article.
- Do NOT guess or assume anything.
- If the article does not contain a clear testable fact, set exam_fact to "" and mcq to null.

Category: {feed_meta['category']}
Headline: {title}

ARTICLE TEXT (from source):
{article_text}

Extract and return a single JSON object:
{{
  "exam_fact": "One sentence with the key testable fact from this article (name, date, number, place). MUST be directly from the article text.",
  "summary": "2-3 sentences of exam-relevant context from the article. Only include facts stated in the article.",
  "category": "one of {json.dumps(VALID_CATEGORIES)}",
  "is_telangana_focus": true/false,
  "event_date": "YYYY-MM-DD when the event happened (from the article)",
  "event_key": "short-slug-for-dedup (e.g. rbi-repo-rate-aug-2026)",
  "mcq": {{
    "question": "A TGPRB-style exam question whose answer is explicitly in the article",
    "options": ["correct answer from article", "plausible wrong 1", "plausible wrong 2", "plausible wrong 3"],
    "answer": 0,
    "explanation": "One sentence citing the fact from the article"
  }},
  "extra_topics": ["NOTE-XXX-YYY"]
}}

If the article has no clear testable fact, return:
{{"exam_fact": "", "summary": "", "category": "{feed_meta['category']}", "is_telangana_focus": false, "event_date": "", "event_key": "", "mcq": null, "extra_topics": []}}

Reply ONLY with valid JSON. No markdown."""

        try:
            response = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=extract_prompt,
            )
            text = response.text.strip()
            if "```" in text:
                text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()

            ai = json.loads(text)

            # Validate: must have exam_fact and mcq
            if not ai.get("exam_fact") or not ai.get("mcq"):
                print(f"    No testable fact found - skipped")
                continue

            mcq = ai.get("mcq", {})
            if not isinstance(mcq, dict) or "question" not in mcq or "options" not in mcq:
                print(f"    Invalid MCQ - skipped")
                continue

            if len(mcq.get("options", [])) != 4:
                print(f"    MCQ needs exactly 4 options - skipped")
                continue

            item['ai'] = ai
            item['article_text_length'] = len(article_text)
            results.append(item)
            print(f"    Extracted: {ai.get('exam_fact', '')[:60]}")

        except Exception as e:
            print(f"    Extract error: {e}")

    print(f"  Phase 2: {len(results)}/{len(scored)} have verified exam cards")
    return results


# -- Helpers ------------------------------------------------------------------

def parse_date(pub_date: str):
    for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"]:
        try:
            dt = datetime.strptime(pub_date.strip(), fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt
        except ValueError:
            continue
    return datetime.now(timezone.utc)


def is_recent(pub_date: str) -> bool:
    dt = parse_date(pub_date)
    return (datetime.now(timezone.utc) - dt).days <= MAX_AGE_DAYS


def clean_title(raw: str) -> str:
    raw = re.sub(r"\s+-\s+[^-]+$", "", raw).strip()
    raw = raw.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    return raw.replace('"', "'")


def make_id(category: str, title: str, date_str: str) -> str:
    cat = re.sub(r"[^A-Z]", "", category.upper())[:3]
    slug = re.sub(r"[^A-Z0-9]+", "-", title.upper()[:25]).strip("-")
    return f"CA-{cat}-{slug}-{date_str.replace('-', '')}"


def fetch_feed(url: str) -> list[dict]:
    """Fetch RSS and return list of {title, link, pub_date, guid} dicts."""
    try:
        resp = requests.get(
            url,
            headers={"User-Agent": "Mozilla/5.0 (compatible; TGPRBStudyBot/1.0)"},
            timeout=15,
        )
        resp.raise_for_status()
    except Exception as e:
        print(f"  Feed fetch error: {e}")
        return []

    import xml.etree.ElementTree as ET
    try:
        root = ET.fromstring(resp.content)
    except ET.ParseError as e:
        print(f"  XML parse error: {e}")
        return []

    items = []
    for item in root.findall(".//item"):
        items.append({
            "title":    item.findtext("title", "").strip(),
            "link":     item.findtext("link", "").strip(),
            "pub_date": item.findtext("pubDate", "").strip(),
            "guid":     item.findtext("guid", "").strip(),
        })
    return items


def event_key_exists(event_key: str) -> bool:
    """Check if an event_key already exists in any CA file (dedup)."""
    if not event_key:
        return False
    for path in CONTENT_DIR.glob("*.md"):
        try:
            content = path.read_text(encoding="utf-8")
            if f'event_key: "{event_key}"' in content:
                return True
        except Exception:
            pass
    return False


def slug_exists(slug: str) -> bool:
    return (CONTENT_DIR / f"{slug}.md").exists()


def escape_yaml(text: str) -> str:
    """Escape a string for safe YAML double-quoted value."""
    if not text:
        return ""
    return text.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def write_exam_card(item: dict, feed_meta: dict) -> Path | None:
    """Write a current-affairs exam card markdown file."""
    ai = item.get('ai', {})
    title = clean_title(item["title"])
    if not title or len(title) < 10:
        return None

    dt = parse_date(item["pub_date"])
    pub_date_str = dt.strftime("%Y-%m-%d")
    today_str = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    category = ai.get("category", feed_meta["category"])
    if category not in VALID_CATEGORIES:
        category = feed_meta["category"]

    event_key = ai.get("event_key", "")
    event_date = ai.get("event_date", pub_date_str)
    exam_fact = escape_yaml(ai.get("exam_fact", ""))
    summary = escape_yaml(ai.get("summary", ""))
    is_tg = bool(ai.get("is_telangana_focus", False))
    extra_topics = ai.get("extra_topics", [])

    mcq = ai.get("mcq", {})
    mcq_question = escape_yaml(mcq.get("question", ""))
    mcq_options = mcq.get("options", [])
    mcq_answer = mcq.get("answer", 0)
    mcq_explanation = escape_yaml(mcq.get("explanation", ""))

    # Dedup by event_key
    if event_key and event_key_exists(event_key):
        print(f"  [Dedup] Skipped (same event): {event_key}")
        return None

    # Build ID and check slug
    item_id = make_id(category, title, pub_date_str)
    slug = item_id.lower().replace("_", "-")
    if slug_exists(slug):
        return None

    # Merge topic IDs
    all_topics = list(dict.fromkeys(feed_meta["related_topic_ids"] + extra_topics))
    if all_topics:
        related = "\n".join(f'  - "{t}"' for t in all_topics)
    else:
        related = '  - ""'

    # MCQ options YAML
    mcq_options_yaml = "\n".join(f'    - "{escape_yaml(opt)}"' for opt in mcq_options)

    # Source info
    source_url = item.get("link", "")
    source_name = ""
    try:
        domain = re.sub(r"^www\.", "", requests.utils.urlparse(source_url).hostname or "")
        source_map = {
            "pib.gov.in": "PIB", "thehindu.com": "The Hindu",
            "indianexpress.com": "Indian Express", "ndtv.com": "NDTV",
            "telanganatoday.com": "Telangana Today", "thehansindia.com": "Hans India",
            "business-standard.com": "Business Standard", "livemint.com": "Mint",
            "economictimes.indiatimes.com": "Economic Times",
            "timesofindia.indiatimes.com": "Times of India",
            "deccanchronicle.com": "Deccan Chronicle",
            "isro.gov.in": "ISRO", "drdo.gov.in": "DRDO",
            "mea.gov.in": "MEA", "rbi.org.in": "RBI",
        }
        source_name = source_map.get(domain, domain)
    except Exception:
        source_name = "News"

    source_type = "official" if source_name in ("PIB", "ISRO", "DRDO", "MEA", "RBI") else "news"

    content = f"""---
id: "{item_id}"
type: "current_affair"
category: "{category}"
exam_section: "{feed_meta['exam_section']}"
topic: "{feed_meta['topic']}"
related_topic_ids:
{related}
is_telangana_focus: {"true" if is_tg else "false"}
headline: "{escape_yaml(title)}"
exam_fact: "{exam_fact}"
summary: "{summary}"
event_date: "{event_date}"
published_at: "{today_str}"
date: "{pub_date_str}"
source_name: "{source_name}"
source_type: "{source_type}"
canonical_source_url: "{source_url}"
source_url: "{source_url}"
event_key: "{escape_yaml(event_key)}"
mcq:
  question: "{mcq_question}"
  options:
{mcq_options_yaml}
  answer: {mcq_answer}
  explanation: "{mcq_explanation}"
---
"""

    path = CONTENT_DIR / f"{slug}.md"
    path.write_text(content, encoding="utf-8")
    return path


def send_telegram(message: str):
    if not TELEGRAM_BOT or not TELEGRAM_CHAT:
        print("Telegram not configured - skipping notification")
        return
    try:
        requests.post(
            f"https://api.telegram.org/bot{TELEGRAM_BOT}/sendMessage",
            json={"chat_id": TELEGRAM_CHAT, "text": message, "parse_mode": "HTML"},
            timeout=10,
        )
    except Exception as e:
        print(f"Telegram error: {e}")


# -- Main --------------------------------------------------------------------

def main():
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    added = []
    skipped = 0

    for feed_meta in TOPIC_FEEDS:
        print(f"\n{'='*60}")
        print(f"[{feed_meta['category'].upper()}: {feed_meta['topic']}]")
        items = fetch_feed(feed_meta["url"])
        print(f"  Fetched {len(items)} items from RSS")

        # Filter by date
        recent = [i for i in items if is_recent(i["pub_date"])]
        recent = recent[:MAX_ITEMS_PER_FEED]

        # Two-phase AI: score headlines, then read articles and extract facts
        exam_items = ai_extract_exam_cards(recent, feed_meta)

        for item in exam_items:
            path = write_exam_card(item, feed_meta)
            if path:
                ai = item.get('ai', {})
                cat = ai.get('category', feed_meta['category'])
                fact = ai.get('exam_fact', '')[:50]
                tg_flag = ' [TG]' if ai.get('is_telangana_focus') else ''
                added.append((cat, clean_title(item['title']), item['link']))
                print(f"  SAVED: {cat}{tg_flag} - {fact}")
            else:
                skipped += 1

    # Summary
    print(f"\n{'='*60}")
    print(f"Done: {len(added)} exam cards added, {skipped} skipped/deduped")

    if not added:
        print("Nothing new today.")
        return

    # Category breakdown
    cats = {}
    for cat, _, _ in added:
        cats[cat] = cats.get(cat, 0) + 1
    print("\nCategory breakdown:")
    for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {cat}: {count}")

    # Telegram
    msg = f"<b>TGPRB StudyOS - Exam Cards ({datetime.now().strftime('%d %b %Y')})</b>\n\n"
    msg += f"<b>{len(added)} new exam card(s):</b>\n"
    for cat, count in sorted(cats.items(), key=lambda x: -x[1]):
        msg += f"\n<b>{cat}</b>: {count} cards"
    msg += f"\n\nAll facts extracted from real source articles."
    msg += "\nCloudflare Pages will redeploy automatically."
    send_telegram(msg)


if __name__ == "__main__":
    main()
