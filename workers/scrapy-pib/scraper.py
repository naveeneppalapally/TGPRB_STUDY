"""
TGPRB Current Affairs Scraper
──────────────────────────────────────────────────────────────────────────────
Runs as a GitHub Actions cron job daily at 7am IST.
Fetches Google News RSS for each TGPRB exam topic,
creates content/current-affairs/*.md files locally,
and sends a Telegram summary.

No external dependencies except 'requests'.
"""

import os
import re
import requests
from datetime import datetime, timezone, timedelta
from pathlib import Path


# ── Config ────────────────────────────────────────────────────────────────────
CONTENT_DIR  = Path("content/current-affairs")
MAX_AGE_DAYS = 30
TELEGRAM_BOT = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT = os.environ.get("TELEGRAM_CHAT_ID", "")

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


def write_md(item_id: str, meta: dict, title: str, date_str: str, link: str) -> Path:
    related = "\n".join(f'  - "{t}"' for t in meta["related_topic_ids"])
    content = f"""---
id: "{item_id}"
type: "current_affair"
exam_section: "{meta['exam_section']}"
topic: "{meta['topic']}"
related_topic_ids:
{related}
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

        for item in items:
            if not is_recent(item["pub_date"]):
                skipped += 1
                continue

            title = clean_title(item["title"])
            if not title or len(title) < 10:
                continue

            dt       = parse_date(item["pub_date"])
            date_str = dt.strftime("%Y-%m-%d")
            item_id  = make_id(meta["exam_section"], title, date_str)
            slug     = item_id.lower().replace("_", "-")

            if already_exists(slug):
                skipped += 1
                continue

            path = write_md(item_id, meta, title, date_str, item["link"])
            added.append((meta["topic"], title, item["link"]))
            print(f"  + {item_id}")

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
