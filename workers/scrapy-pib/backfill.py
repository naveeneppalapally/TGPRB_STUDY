"""
TGPRB Per-Category Historical Backfill - Exam Card Edition
---------------------------------------------------------------------------
Run once per category to backfill current affairs from Jan 2025 to today.
Sources: GDELT (free archive) + PIB.gov.in via Google News.

Each article's source URL is visited, the real text is extracted,
and Gemini extracts exam facts from the actual content (extraction only).

Usage (single category):
  python3 workers/scrapy-pib/backfill.py \\
    --category appointments \\
    --section "Polity" \\
    --topic "Appointments and Office-Holders" \\
    --note-ids NOTE-POL-CONSTITUTION \\
    --keywords "India appointed governor secretary chairman DG" \\
    --from 2025-01-01

Usage (all categories at once):
  python3 workers/scrapy-pib/backfill.py --all --from 2025-01-01

Optional:
  --to 2025-12-31       (default: today)
  --max 50              (default: 50 per category)
  --no-ai               (skip Gemini, keep headlines only)
"""

import os
import re
import json
import argparse
import tempfile
import requests
import time
from datetime import datetime, timezone, date, timedelta
from pathlib import Path
from bs4 import BeautifulSoup


CONTENT_DIR  = Path("content/current-affairs")
GCP_PROJECT  = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS    = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
AI_SCORE_MIN = 6

VALID_CATEGORIES = [
    "appointments", "international", "economy", "awards", "sports",
    "telangana", "schemes", "defence", "science", "judiciary",
    "environment", "books",
]

# All PYQ-aligned categories with their search keywords and metadata
ALL_CATEGORIES = [
    {
        "category": "appointments",
        "section": "Polity",
        "topic": "Appointments and Office-Holders",
        "note_ids": ["NOTE-POL-CONSTITUTION"],
        "keywords": "India appointed governor secretary chairman DG chief justice",
    },
    {
        "category": "international",
        "section": "Polity",
        "topic": "International Affairs",
        "note_ids": ["NOTE-POL-CONSTITUTION"],
        "keywords": "India summit bilateral agreement G20 BRICS UN SCO",
    },
    {
        "category": "economy",
        "section": "Economy",
        "topic": "Indian Economy",
        "note_ids": ["NOTE-ECO-GENERAL"],
        "keywords": "India RBI GDP inflation budget fiscal GST repo rate",
    },
    {
        "category": "awards",
        "section": "General Knowledge",
        "topic": "Awards and Honours",
        "note_ids": [],
        "keywords": "India Padma Jnanpith Nobel Dronacharya Arjuna award prize",
    },
    {
        "category": "sports",
        "section": "General Knowledge",
        "topic": "Sports Results",
        "note_ids": [],
        "keywords": "India cricket boxing athletics medal championship Olympics",
    },
    {
        "category": "telangana",
        "section": "Telangana",
        "topic": "Telangana State",
        "note_ids": ["NOTE-TEL-GENERAL"],
        "keywords": "Telangana Hyderabad government scheme budget police project",
    },
    {
        "category": "schemes",
        "section": "Polity",
        "topic": "Government Schemes",
        "note_ids": ["NOTE-POL-CONSTITUTION"],
        "keywords": "India scheme launched yojana mission programme inaugurated",
    },
    {
        "category": "defence",
        "section": "General Knowledge",
        "topic": "Defence and Security",
        "note_ids": [],
        "keywords": "India DRDO missile exercise IAF Navy Army defence",
    },
    {
        "category": "science",
        "section": "Science & Technology",
        "topic": "Science and Space",
        "note_ids": ["NOTE-SCI-GENERAL"],
        "keywords": "India ISRO launch satellite space SSLV PSLV science",
    },
    {
        "category": "judiciary",
        "section": "Polity",
        "topic": "Judiciary and Commissions",
        "note_ids": ["NOTE-POL-CONSTITUTION"],
        "keywords": "India Supreme Court verdict High Court commission bench",
    },
    {
        "category": "environment",
        "section": "Geography",
        "topic": "Environment and Ecology",
        "note_ids": ["NOTE-GEO-ENVIRONMENT"],
        "keywords": "India wildlife national park cyclone climate forest",
    },
    {
        "category": "books",
        "section": "General Knowledge",
        "topic": "Books and Literary Awards",
        "note_ids": [],
        "keywords": "India book author Sahitya Akademi literary prize",
    },
]


# -- Argument parsing ---------------------------------------------------------

def parse_args():
    p = argparse.ArgumentParser(description="Backfill current affairs exam cards")
    p.add_argument("--all", action="store_true", help="Run all categories")
    p.add_argument("--category", help="Single category to backfill")
    p.add_argument("--section", help="Exam section (required if not --all)")
    p.add_argument("--topic", help="Topic name (required if not --all)")
    p.add_argument("--note-ids", help="Comma-separated NOTE IDs")
    p.add_argument("--keywords", help="Search keywords (required if not --all)")
    p.add_argument("--from", dest="from_date", default="2025-01-01")
    p.add_argument("--to", dest="to_date", default=date.today().isoformat())
    p.add_argument("--max", type=int, default=50, help="Max articles per category")
    p.add_argument("--no-ai", action="store_true", help="Skip Gemini extraction")
    return p.parse_args()


# -- Vertex AI client ---------------------------------------------------------

_vertex_client = None

def get_vertex_client():
    global _vertex_client
    if _vertex_client is not None:
        return _vertex_client
    if not GCP_CREDS or not GCP_PROJECT:
        return None
    try:
        creds_data = json.loads(GCP_CREDS)
        tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
        json.dump(creds_data, tmp)
        tmp.flush()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
        from google import genai
        _vertex_client = genai.Client(vertexai=True, project=GCP_PROJECT, location="global")
        print("  [AI] Vertex AI ready - gemini-3.6-flash (extraction mode)")
        return _vertex_client
    except Exception as e:
        print(f"  [AI] Init error: {e}")
        return None


# -- Article text extraction --------------------------------------------------

def fetch_article_text(url: str) -> str:
    """Fetch and extract readable text from a source URL."""
    try:
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
    except Exception:
        return ""

    try:
        soup = BeautifulSoup(resp.text, "html.parser")
        for tag in soup(["script", "style", "nav", "footer", "aside",
                         "iframe", "noscript", "form", "header"]):
            tag.decompose()

        article = (
            soup.find("article")
            or soup.find("div", class_=re.compile(r"article|story|content|post", re.I))
            or soup.find("main")
            or soup.body
        )
        if not article:
            return ""

        paragraphs = article.find_all("p")
        text = "\n".join(p.get_text(strip=True) for p in paragraphs if p.get_text(strip=True))
        return text[:3000] + "..." if len(text) > 3000 else text
    except Exception:
        return ""


# -- AI: Score headlines then extract from articles ---------------------------

def ai_score_headlines(items: list[dict], topic: str) -> list[dict]:
    """Phase 1: Quick batch scoring of headlines."""
    client = get_vertex_client()
    if not client or not items:
        return items

    CHUNK = 25
    scored = []

    for ci in range(0, len(items), CHUNK):
        chunk = items[ci:ci + CHUNK]
        headlines = "\n".join(f"{i+1}. {it['title']}" for i, it in enumerate(chunk))

        prompt = f"""Score each headline 0-10 for TGPRB police exam relevance.
Topic: {topic}
8-10=direct exam question, 5-7=useful context, 0-4=irrelevant.

Headlines:
{headlines}

Reply ONLY with a JSON array of integers ({len(chunk)} scores). Example: [8, 3, 7]"""

        try:
            resp = client.models.generate_content(model="gemini-3.6-flash", contents=prompt)
            text = resp.text.strip()
            if "```" in text:
                text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
            scores = json.loads(text)
            if isinstance(scores, list) and len(scores) == len(chunk):
                for item, score in zip(chunk, scores):
                    if isinstance(score, int) and score >= AI_SCORE_MIN:
                        scored.append(item)
                    else:
                        print(f"    Dropped (score {score}): {item['title'][:55]}")
            else:
                scored.extend(chunk)
        except Exception as e:
            print(f"    Score error: {e}")
            scored.extend(chunk)

    return scored


def ai_extract_from_article(item: dict, category: str, topic: str) -> dict | None:
    """Phase 2: Read real article text and extract exam facts."""
    client = get_vertex_client()
    if not client:
        return None

    article_text = fetch_article_text(item["link"])
    if not article_text or len(article_text) < 50:
        return None

    title = clean_title(item["title"])

    prompt = f"""You are extracting exam-ready facts from a real news article for TGPRB police exam.

RULES:
- Extract ONLY facts explicitly stated in the article text below.
- Do NOT add information not in the article.
- If no clear testable fact exists, set exam_fact to "" and mcq to null.

Category: {category}
Headline: {title}

ARTICLE TEXT:
{article_text}

Return a single JSON object:
{{
  "exam_fact": "One sentence key testable fact from the article (name, date, number, place)",
  "summary": "2-3 sentences of exam-relevant context from the article",
  "category": "one of {json.dumps(VALID_CATEGORIES)}",
  "is_telangana_focus": true/false,
  "event_date": "YYYY-MM-DD from the article",
  "event_key": "short-dedup-slug",
  "mcq": {{
    "question": "TGPRB exam question with answer in the article",
    "options": ["correct from article", "wrong 1", "wrong 2", "wrong 3"],
    "answer": 0,
    "explanation": "One sentence citing the article fact"
  }},
  "extra_topics": []
}}

Reply ONLY with valid JSON."""

    try:
        resp = client.models.generate_content(model="gemini-3.6-flash", contents=prompt)
        text = resp.text.strip()
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
        ai = json.loads(text)

        if not ai.get("exam_fact") or not ai.get("mcq"):
            return None
        mcq = ai.get("mcq", {})
        if not isinstance(mcq, dict) or len(mcq.get("options", [])) != 4:
            return None
        return ai
    except Exception as e:
        print(f"    Extract error: {e}")
        return None


# -- GDELT source -------------------------------------------------------------

def fetch_gdelt(keywords: str, from_date: str, to_date: str) -> list[dict]:
    start = from_date.replace("-", "") + "000000"
    end   = to_date.replace("-", "") + "235959"
    query = "+".join(keywords.split())

    url = (
        f"https://api.gdeltproject.org/api/v2/doc/doc"
        f"?query={query}+sourcelang:english+sourcecountry:IN"
        f"&mode=ArtList"
        f"&startdatetime={start}"
        f"&enddatetime={end}"
        f"&maxrecords=250"
        f"&format=json"
    )

    print(f"  [GDELT] {from_date} to {to_date}...")
    try:
        resp = requests.get(url, timeout=20, headers={"User-Agent": "TGPRBStudyBot/1.0"})
        resp.raise_for_status()
        data = resp.json()
        articles = data.get("articles", [])
        print(f"  [GDELT] {len(articles)} articles")
        results = []
        for a in articles:
            raw_date = a.get("seendate", "")[:8]
            results.append({
                "title": a.get("title", "").strip(),
                "link":  a.get("url", "").strip(),
                "pub_date": f"{raw_date[:4]}-{raw_date[4:6]}-{raw_date[6:8]}" if len(raw_date) >= 8 else date.today().isoformat(),
                "source": a.get("domain", ""),
            })
        return results
    except Exception as e:
        print(f"  [GDELT] Error: {e}")
        return []


# -- PIB source ---------------------------------------------------------------

def fetch_pib(keywords: str, from_date: str, to_date: str) -> list[dict]:
    query = "+".join(keywords.split())
    url = (
        f"https://news.google.com/rss/search"
        f"?q={query}+site:pib.gov.in"
        f"&hl=en-IN&gl=IN&ceid=IN:en"
        f"&after={from_date}&before={to_date}"
    )
    print(f"  [PIB] Querying via Google News site:pib.gov.in...")
    try:
        resp = requests.get(url, timeout=15, headers={"User-Agent": "TGPRBStudyBot/1.0"})
        resp.raise_for_status()
        import xml.etree.ElementTree as ET
        root = ET.fromstring(resp.content)
        items = []
        for item in root.findall(".//item"):
            raw = item.findtext("pubDate", "").strip()
            pub_date = date.today().isoformat()
            for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"]:
                try:
                    pub_date = datetime.strptime(raw, fmt).strftime("%Y-%m-%d")
                    break
                except ValueError:
                    continue
            items.append({
                "title": item.findtext("title", "").strip(),
                "link": item.findtext("link", "").strip(),
                "pub_date": pub_date,
                "source": "pib.gov.in",
            })
        print(f"  [PIB] {len(items)} articles")
        return items
    except Exception as e:
        print(f"  [PIB] Error: {e}")
        return []


# -- Output -------------------------------------------------------------------

def clean_title(raw: str) -> str:
    raw = re.sub(r"\s+-\s+[^-]+$", "", raw).strip()
    raw = raw.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    return raw.replace('"', "'")


def make_id(category: str, title: str, date_str: str) -> str:
    cat = re.sub(r"[^A-Z]", "", category.upper())[:3]
    slug = re.sub(r"[^A-Z0-9]+", "-", title.upper()[:25]).strip("-")
    return f"CA-{cat}-{slug}-{date_str.replace('-', '')}"


def escape_yaml(text: str) -> str:
    if not text:
        return ""
    return text.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def event_key_exists(event_key: str) -> bool:
    if not event_key:
        return False
    for path in CONTENT_DIR.glob("*.md"):
        try:
            if f'event_key: "{event_key}"' in path.read_text(encoding="utf-8"):
                return True
        except Exception:
            pass
    return False


def write_exam_card(item: dict, ai: dict, category: str, section: str,
                    topic: str, note_ids: list[str]) -> Path | None:
    """Write exam card markdown file with the new schema."""
    title = clean_title(item["title"])
    if not title or len(title) < 10:
        return None

    pub_date_str = item.get("pub_date", date.today().isoformat())
    cat = ai.get("category", category)
    if cat not in VALID_CATEGORIES:
        cat = category

    event_key = ai.get("event_key", "")
    if event_key and event_key_exists(event_key):
        return None

    item_id = make_id(cat, title, pub_date_str)
    slug = item_id.lower().replace("_", "-")
    if (CONTENT_DIR / f"{slug}.md").exists():
        return None

    extra_topics = ai.get("extra_topics", [])
    all_topics = list(dict.fromkeys(note_ids + extra_topics))
    related = "\n".join(f'  - "{t}"' for t in all_topics) if all_topics else '  - ""'

    mcq = ai.get("mcq", {})
    mcq_options_yaml = "\n".join(f'    - "{escape_yaml(opt)}"' for opt in mcq.get("options", []))

    source_url = item.get("link", "")
    source_name = ""
    try:
        domain = re.sub(r"^www\.", "", requests.utils.urlparse(source_url).hostname or "")
        source_map = {
            "pib.gov.in": "PIB", "thehindu.com": "The Hindu",
            "indianexpress.com": "Indian Express", "ndtv.com": "NDTV",
            "telanganatoday.com": "Telangana Today", "thehansindia.com": "Hans India",
            "isro.gov.in": "ISRO", "drdo.gov.in": "DRDO", "mea.gov.in": "MEA", "rbi.org.in": "RBI",
        }
        source_name = source_map.get(domain, domain)
    except Exception:
        source_name = "News"

    source_type = "official" if source_name in ("PIB", "ISRO", "DRDO", "MEA", "RBI") else "news"
    is_tg = bool(ai.get("is_telangana_focus", False))

    content = f"""---
id: "{item_id}"
type: "current_affair"
category: "{cat}"
exam_section: "{section}"
topic: "{topic}"
related_topic_ids:
{related}
is_telangana_focus: {"true" if is_tg else "false"}
headline: "{escape_yaml(title)}"
exam_fact: "{escape_yaml(ai.get('exam_fact', ''))}"
summary: "{escape_yaml(ai.get('summary', ''))}"
event_date: "{ai.get('event_date', pub_date_str)}"
published_at: "{pub_date_str}"
date: "{pub_date_str}"
source_name: "{source_name}"
source_type: "{source_type}"
canonical_source_url: "{source_url}"
source_url: "{source_url}"
event_key: "{escape_yaml(event_key)}"
mcq:
  question: "{escape_yaml(mcq.get('question', ''))}"
  options:
{mcq_options_yaml}
  answer: {mcq.get('answer', 0)}
  explanation: "{escape_yaml(mcq.get('explanation', ''))}"
---
"""

    path = CONTENT_DIR / f"{slug}.md"
    path.write_text(content, encoding="utf-8")
    return path


# -- Main: single category ----------------------------------------------------

def backfill_category(cat_config: dict, from_date: str, to_date: str,
                      max_items: int, skip_ai: bool):
    category = cat_config["category"]
    section  = cat_config["section"]
    topic    = cat_config["topic"]
    note_ids = cat_config["note_ids"]
    keywords = cat_config["keywords"]

    print(f"\n{'='*60}")
    print(f"Backfilling: {category.upper()} - {topic}")
    print(f"Period: {from_date} to {to_date}")

    # Collect articles from GDELT + PIB
    start = datetime.strptime(from_date, "%Y-%m-%d").date()
    end   = datetime.strptime(to_date,   "%Y-%m-%d").date()

    all_items = []

    # GDELT month by month
    current = start
    while current <= end:
        month_end = min(
            date(current.year, current.month % 12 + 1, 1) - timedelta(days=1)
            if current.month < 12
            else date(current.year + 1, 1, 1) - timedelta(days=1),
            end
        )
        items = fetch_gdelt(keywords, current.isoformat(), month_end.isoformat())
        all_items.extend(items)
        current = month_end + timedelta(days=1)
        time.sleep(1)

    # PIB
    pib_items = fetch_pib(keywords, from_date, to_date)
    all_items.extend(pib_items)

    print(f"  Total raw: {len(all_items)}")

    # Dedup by title
    seen = set()
    unique = []
    for it in all_items:
        key = re.sub(r"[^a-z0-9]", "", it["title"].lower())[:40]
        if key not in seen and it["title"].strip():
            seen.add(key)
            unique.append(it)
    print(f"  After title dedup: {len(unique)}")

    if skip_ai:
        # Without AI, just save raw headlines (old format for now)
        added = 0
        for item in unique[:max_items]:
            title = clean_title(item["title"])
            if not title or len(title) < 10:
                continue
            item_id = make_id(category, title, item["pub_date"])
            slug = item_id.lower().replace("_", "-")
            if (CONTENT_DIR / f"{slug}.md").exists():
                continue
            # Write minimal entry without exam card
            ai_stub = {
                "exam_fact": title,
                "summary": "",
                "category": category,
                "is_telangana_focus": False,
                "event_date": item["pub_date"],
                "event_key": "",
                "mcq": {"question": "", "options": ["", "", "", ""], "answer": 0, "explanation": ""},
                "extra_topics": [],
            }
            path = write_exam_card(item, ai_stub, category, section, topic, note_ids)
            if path:
                added += 1
                print(f"  + {title[:55]}")
        print(f"  Added (no AI): {added}")
        return added

    # Phase 1: Score headlines
    scored = ai_score_headlines(unique, topic)
    print(f"  After AI scoring: {len(scored)}")

    # Phase 2: Read articles and extract exam facts
    added = 0
    for item in scored[:max_items]:
        title = clean_title(item["title"])
        print(f"  Reading: {title[:50]}...")

        ai = ai_extract_from_article(item, category, topic)
        if not ai:
            print(f"    No exam fact - skipped")
            continue

        path = write_exam_card(item, ai, category, section, topic, note_ids)
        if path:
            added += 1
            print(f"    SAVED: {ai.get('exam_fact', '')[:55]}")
        time.sleep(0.5)  # Rate limit article fetches

    print(f"  Category done: {added} exam cards")
    return added


# -- Main entry point ---------------------------------------------------------

def main():
    args = parse_args()
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    if args.all:
        # Run all categories
        total = 0
        for cat_config in ALL_CATEGORIES:
            count = backfill_category(
                cat_config, args.from_date, args.to_date,
                args.max, args.no_ai
            )
            total += count
            time.sleep(2)  # Pause between categories

        print(f"\n{'='*60}")
        print(f"All categories done: {total} exam cards total")
        print(f"Run: git add content/current-affairs/ && git commit -m 'ca: full backfill Jan 2025 to today' && git push")

    elif args.category:
        # Single category
        cat_config = {
            "category": args.category,
            "section": args.section or "General Knowledge",
            "topic": args.topic or args.category.title(),
            "note_ids": args.note_ids.split(",") if args.note_ids else [],
            "keywords": args.keywords or args.category,
        }
        count = backfill_category(
            cat_config, args.from_date, args.to_date,
            args.max, args.no_ai
        )
        print(f"\nDone: {count} exam cards")
        print(f"Run: git add content/current-affairs/ && git commit -m 'ca: backfill {args.category}' && git push")

    else:
        print("Error: specify --all or --category")
        print("  --all: backfill all 12 PYQ categories")
        print("  --category appointments: backfill one category")


if __name__ == "__main__":
    main()
