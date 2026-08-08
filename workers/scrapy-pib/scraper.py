"""
TGPRB Current Affairs Scraper
──────────────────────────────────────────────────────────────────────────────
Runs as a GitHub Actions cron job daily at 7am IST.
Fetches Google News RSS for each TGPRB exam topic,
filters headlines with Gemini 3.6 Flash (Vertex AI) for exam relevance,
creates content/current-affairs/*.md files locally,
and sends a Telegram summary.
"""

import os
import re
import json
import tempfile
import requests
from datetime import datetime, timezone
from pathlib import Path


# ── Config ────────────────────────────────────────────────────────────────────
CONTENT_DIR   = Path("content/current-affairs")
MAX_AGE_DAYS  = 30
TELEGRAM_BOT  = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT = os.environ.get("TELEGRAM_CHAT_ID", "")
GCP_PROJECT   = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS_JSON = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
AI_SCORE_MIN  = 6   # Drop articles scoring below this (0-10)

# ── Vertex AI setup ───────────────────────────────────────────────────────────
_vertex_client = None

def get_vertex_client():
    """Lazy-init Vertex AI client. Returns None if credentials not available."""
    global _vertex_client
    if _vertex_client is not None:
        return _vertex_client

    if not GCP_CREDS_JSON or not GCP_PROJECT:
        print("  [AI Filter] Vertex AI not configured - skipping AI scoring")
        return None

    try:
        # Write credentials JSON to a temp file (required by google-auth)
        creds_data = json.loads(GCP_CREDS_JSON)
        tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
        json.dump(creds_data, tmp)
        tmp.flush()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name

        import vertexai
        from vertexai.generative_models import GenerativeModel
        vertexai.init(project=GCP_PROJECT, location="us-central1")
        _vertex_client = GenerativeModel("gemini-3.6-flash")
        print("  [AI Filter] Vertex AI ready - using gemini-3.6-flash")
        return _vertex_client
    except Exception as e:
        print(f"  [AI Filter] Vertex AI init error: {e}")
        return None


def ai_score_headlines(items: list[dict], topic: str) -> list[dict]:
    """
    Score headlines using Gemini 3.6 Flash for TGPRB exam relevance,
    identify Telangana state focus, and map secondary topic IDs.
    """
    client = get_vertex_client()
    if not client or not items:
        return items

    headlines = "\n".join(
        f"{i+1}. {item['title']}" for i, item in enumerate(items)
    )

    prompt = f"""You are an expert evaluator for Telangana TGPRB/TSPSC Police Constable & SI Exams.

Primary Topic: {topic}

Evaluate each headline below:
1. "score": integer 0-10 for exam relevance (8-10=high policy/geography/exam fact, 5-7=general context, 0-4=coaching listicle/sports/irrelevant).
2. "is_telangana_focus": boolean (true if the news specifically relates to Telangana state, TS schemes, TS rivers/dams like Kaleshwaram/Srisailam, TS police/governance, or TG geography).
3. "extra_topics": array of strings. Available extra topic IDs:
   - "NOTE-TEL-GENERAL" (if news relates to Telangana)
   - "NOTE-GEO-DRAINAGE" (if news relates to rivers, dams, floods, water projects)
   - "NOTE-GEO-ENVIRONMENT" (if news relates to forests, wildlife, pollution, climate)
   - "NOTE-POL-CONSTITUTION" (if news relates to polity, courts, parliament)
   - "NOTE-ECO-GENERAL" (if news relates to RBI, budget, economy, GST)

Headlines:
{headlines}

Reply ONLY with a valid JSON array of objects in order.
Example format:
[
  {{"score": 9, "is_telangana_focus": true, "extra_topics": ["NOTE-TEL-GENERAL", "NOTE-GEO-DRAINAGE"]}},
  {{"score": 2, "is_telangana_focus": false, "extra_topics": []}}
]"""

    try:
        response = client.generate_content(prompt)
        text = response.text.strip()
        # Clean potential markdown code blocks
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
        
        parsed = json.loads(text)
        if not isinstance(parsed, list) or len(parsed) != len(items):
            print(f"  [AI Filter] JSON parsing array length mismatch ({len(parsed) if isinstance(parsed, list) else 'not list'} vs {len(items)})")
            return items

        filtered = []
        for item, ai_meta in zip(items, parsed):
            score = ai_meta.get("score", 7)
            if score >= AI_SCORE_MIN:
                item['ai_score'] = score
                item['is_telangana_focus'] = bool(ai_meta.get("is_telangana_focus", False))
                item['extra_topics'] = ai_meta.get("extra_topics", [])
                filtered.append(item)
            else:
                print(f"  [AI Filter] Dropped (score {score}): {item['title'][:60]}")

        print(f"  [AI Filter] Kept {len(filtered)}/{len(items)} after scoring")
        return filtered

    except Exception as e:
        print(f"  [AI Filter] Scoring error: {e}")
        return items  # On error, keep all


# ── Topic feeds ───────────────────────────────────────────────────────────────
TOPIC_FEEDS = [
    {
        "url": "https://news.google.com/rss/search?q=India+river+dam+flood+irrigation+Godavari+Krishna+Ganga&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Geography",
        "topic": "Drainage System of India",
        "related_topic_ids": ["NOTE-GEO-DRAINAGE"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+constitution+parliament+supreme+court+amendment+fundamental+rights&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "Indian Constitution",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+GDP+inflation+RBI+repo+rate+budget+fiscal+GST+economy+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Economy",
        "topic": "Indian Economy",
        "related_topic_ids": ["NOTE-ECO-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+environment+wildlife+forest+climate+cyclone+national+park+biodiversity&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Geography",
        "topic": "Environment and Ecology",
        "related_topic_ids": ["NOTE-GEO-ENVIRONMENT"],
    },
    {
        "url": "https://news.google.com/rss/search?q=Telangana+government+scheme+mission+development+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Telangana",
        "topic": "Telangana State",
        "related_topic_ids": ["NOTE-TEL-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+ISRO+space+missile+AI+technology+semiconductor+defence&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Science & Technology",
        "topic": "Science and Technology",
        "related_topic_ids": ["NOTE-SCI-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+history+heritage+archaeological+UNESCO+monument+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "History",
        "topic": "Indian History",
        "related_topic_ids": ["NOTE-HIS-GENERAL"],
    },
]


# ── Helpers ───────────────────────────────────────────────────────────────────

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
    # Remove " - Source Name" suffix Google News adds
    raw = re.sub(r"\s+-\s+[^-]+$", "", raw).strip()
    raw = raw.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    return raw.replace('"', "'")


def make_id(section: str, title: str, date_str: str) -> str:
    sec = re.sub(r"[^A-Z]", "", section.upper())[:3]
    slug = re.sub(r"[^A-Z0-9]+", "-", title.upper()[:25]).strip("-")
    return f"CA-{sec}-{slug}-{date_str.replace('-', '')}"


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


def already_exists(slug: str) -> bool:
    return (CONTENT_DIR / f"{slug}.md").exists()


def write_md(item_id: str, meta: dict, title: str, date_str: str, link: str, is_tg_focus: bool = False, extra_topics: list = None) -> Path:
    all_topics = list(dict.fromkeys(meta["related_topic_ids"] + (extra_topics or [])))
    related = "\n".join(f'  - "{t}"' for t in all_topics)
    tg_focus_str = "true" if is_tg_focus else "false"
    content = f"""---
id: "{item_id}"
type: "current_affair"
exam_section: "{meta['exam_section']}"
topic: "{meta['topic']}"
related_topic_ids:
{related}
is_telangana_focus: {tg_focus_str}
headline: "{title}"
date: "{date_str}"
source_url: "{link}"
---
"""
    slug = item_id.lower().replace("_", "-")
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


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    added   = []
    skipped = 0

    for meta in TOPIC_FEEDS:
        print(f"\n[{meta['topic']}]")
        items = fetch_feed(meta["url"])
        print(f"  Fetched {len(items)} items")

        # Filter by date first
        recent = [i for i in items if is_recent(i["pub_date"])]

        # AI scoring - drop low-relevance headlines via Gemini 3.6 Flash
        recent = ai_score_headlines(recent, meta["topic"])

        for item in recent:
            title = clean_title(item["title"])
            if not title or len(title) < 10:
                skipped += 1
                continue

            dt       = parse_date(item["pub_date"])
            date_str = dt.strftime("%Y-%m-%d")
            item_id  = make_id(meta["exam_section"], title, date_str)
            slug     = item_id.lower().replace("_", "-")

            if already_exists(slug):
                skipped += 1
                continue

            is_tg = item.get("is_telangana_focus", False)
            extra_t = item.get("extra_topics", [])
            path = write_md(item_id, meta, title, date_str, item["link"], is_tg_focus=is_tg, extra_topics=extra_t)
            added.append((meta["topic"], title, item["link"]))
            print(f"  + {item_id}{' [TG Focus]' if is_tg else ''}")

    # Summary
    print(f"\nDone: {len(added)} added, {skipped} skipped")

    if not added:
        print("Nothing new today.")
        return

    # Telegram notification
    msg = f"<b>TGPRB StudyOS - Current Affairs ({datetime.now().strftime('%d %b %Y')})</b>\n\n"
    msg += f"<b>{len(added)} new item(s) added:</b>\n"
    for topic, title, link in added[:10]:  # max 10 in message
        msg += f"\n- [{topic}] {title[:70]}\n"
        msg += f'  <a href="{link}">Read more</a>\n'
    if len(added) > 10:
        msg += f"\n...and {len(added) - 10} more."
    msg += "\nCloudflare Pages will redeploy automatically."
    send_telegram(msg)


if __name__ == "__main__":
    main()
