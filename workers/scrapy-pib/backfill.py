"""
TGPRB Per-Topic Historical Backfill
─────────────────────────────────────────────────────────────────────────────
Run once per topic to backfill current affairs from Jan 2025 to today.
Sources: GDELT (free archive, no API key) + PIB.gov.in direct archive.

Usage:
  python3 workers/scrapy-pib/backfill.py \
    --topic "Forests of India" \
    --note-id NOTE-GEO-FORESTS \
    --section "Geography" \
    --keywords "India forest wildlife deforestation national park" \
    --from 2025-01-01

Optional:
  --to 2025-12-31       (default: today)
  --max 100             (default: 100 total articles)
  --no-ai               (skip Gemini scoring, keep everything)
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


CONTENT_DIR  = Path("content/current-affairs")
GCP_PROJECT  = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS    = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
AI_SCORE_MIN = 6


# ── Argument parsing ──────────────────────────────────────────────────────────

def parse_args():
    p = argparse.ArgumentParser(description="Backfill current affairs for a topic")
    p.add_argument("--topic",    required=True, help='e.g. "Forests of India"')
    p.add_argument("--note-id",  required=True, help='e.g. NOTE-GEO-FORESTS')
    p.add_argument("--section",  required=True, help='e.g. Geography')
    p.add_argument("--keywords", required=True, help='Space-separated search keywords')
    p.add_argument("--from",     dest="from_date", default="2025-01-01", help="Start date YYYY-MM-DD")
    p.add_argument("--to",       dest="to_date",   default=date.today().isoformat(), help="End date YYYY-MM-DD")
    p.add_argument("--max",      type=int, default=100, help="Max total articles to save")
    p.add_argument("--no-ai",    action="store_true", help="Skip Gemini scoring")
    return p.parse_args()


# ── Vertex AI client ──────────────────────────────────────────────────────────

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
        import vertexai
        from vertexai.generative_models import GenerativeModel
        vertexai.init(project=GCP_PROJECT, location="us-central1")
        _vertex_client = GenerativeModel("gemini-3.6-flash")
        print("  [AI] Vertex AI ready - gemini-3.6-flash")
        return _vertex_client
    except Exception as e:
        print(f"  [AI] Init error: {e}")
        return None


def ai_filter(items: list[dict], topic: str) -> list[dict]:
    """Score and filter items, also detect Telangana focus."""
    client = get_vertex_client()
    if not client or not items:
        for item in items:
            item.setdefault("is_telangana_focus", False)
        return items

    headlines = "\n".join(f"{i+1}. {it['title']}" for i, it in enumerate(items))
    prompt = f"""You are an expert evaluator for Telangana TGPRB/TSPSC Police Constable & SI Exams.

Topic: {topic}

Evaluate each headline:
1. "score": 0-10 exam relevance (8-10=direct fact/policy, 5-7=general context, 0-4=irrelevant/listicle)
2. "is_telangana_focus": true if specifically about Telangana state
3. "extra_topics": array of any additionally relevant NOTE IDs:
   ["NOTE-TEL-GENERAL","NOTE-GEO-DRAINAGE","NOTE-GEO-ENVIRONMENT","NOTE-POL-CONSTITUTION","NOTE-ECO-GENERAL"]

Headlines:
{headlines}

Reply ONLY with a valid JSON array, one object per headline:
[{{"score":8,"is_telangana_focus":false,"extra_topics":[]}}]"""

    try:
        resp = client.generate_content(prompt)
        text = resp.text.strip()
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
        parsed = json.loads(text)
        if not isinstance(parsed, list) or len(parsed) != len(items):
            return items
        filtered = []
        for item, meta in zip(items, parsed):
            score = meta.get("score", 7)
            if score >= AI_SCORE_MIN:
                item["ai_score"] = score
                item["is_telangana_focus"] = bool(meta.get("is_telangana_focus", False))
                item["extra_topics"] = meta.get("extra_topics", [])
                filtered.append(item)
            else:
                print(f"    Dropped (score {score}): {item['title'][:60]}")
        return filtered
    except Exception as e:
        print(f"  [AI] Filter error: {e}")
        return items


# ── GDELT source ──────────────────────────────────────────────────────────────

def fetch_gdelt(keywords: str, from_date: str, to_date: str) -> list[dict]:
    """
    Query GDELT v2 API for articles in a date range.
    Returns list of {title, link, pub_date, source} dicts.
    """
    # GDELT date format: YYYYMMDDHHMMSS
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

    print(f"\n  [GDELT] Querying {from_date} to {to_date}...")
    try:
        resp = requests.get(url, timeout=20,
                            headers={"User-Agent": "TGPRBStudyBot/1.0"})
        resp.raise_for_status()
        data = resp.json()
        articles = data.get("articles", [])
        print(f"  [GDELT] Got {len(articles)} articles")
        results = []
        for a in articles:
            results.append({
                "title":    a.get("title", "").strip(),
                "link":     a.get("url", "").strip(),
                "pub_date": a.get("seendate", "")[:8],  # YYYYMMDD
                "source":   a.get("domain", ""),
            })
        return results
    except Exception as e:
        print(f"  [GDELT] Error: {e}")
        return []


def parse_gdelt_date(raw: str) -> str:
    """Convert GDELT seendate YYYYMMDD to YYYY-MM-DD."""
    if len(raw) >= 8:
        return f"{raw[:4]}-{raw[4:6]}-{raw[6:8]}"
    return date.today().isoformat()


# ── PIB source ────────────────────────────────────────────────────────────────

def fetch_pib(keywords: str, from_date: str, to_date: str) -> list[dict]:
    """
    Fetch PIB press releases by keyword using PIB search.
    PIB search URL: https://pib.gov.in/allRel.aspx (POST-based, complex)
    Use Google News site:pib.gov.in as a simpler proxy.
    """
    query = "+".join(keywords.split())
    # Google News site-restricted to PIB with date range
    url = (
        f"https://news.google.com/rss/search"
        f"?q={query}+site:pib.gov.in"
        f"&hl=en-IN&gl=IN&ceid=IN:en"
        f"&after={from_date}&before={to_date}"
    )
    print(f"\n  [PIB] Querying via Google News site:pib.gov.in...")
    try:
        resp = requests.get(url, timeout=15,
                            headers={"User-Agent": "TGPRBStudyBot/1.0"})
        resp.raise_for_status()
        import xml.etree.ElementTree as ET
        root = ET.fromstring(resp.content)
        items = []
        for item in root.findall(".//item"):
            items.append({
                "title":    item.findtext("title", "").strip(),
                "link":     item.findtext("link", "").strip(),
                "pub_date": item.findtext("pubDate", "").strip(),
                "source":   "pib.gov.in",
            })
        print(f"  [PIB] Got {len(items)} articles")
        return items
    except Exception as e:
        print(f"  [PIB] Error: {e}")
        return []


def parse_rss_date(raw: str) -> str:
    """Convert RSS pubDate string to YYYY-MM-DD."""
    for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"]:
        try:
            dt = datetime.strptime(raw.strip(), fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return date.today().isoformat()


# ── Output ────────────────────────────────────────────────────────────────────

def clean_title(raw: str) -> str:
    raw = re.sub(r"\s+-\s+[^-]+$", "", raw).strip()
    raw = raw.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    return raw.replace('"', "'")


def make_id(section: str, title: str, date_str: str) -> str:
    sec  = re.sub(r"[^A-Z]", "", section.upper())[:3]
    slug = re.sub(r"[^A-Z0-9]+", "-", title.upper()[:25]).strip("-")
    return f"CA-{sec}-{slug}-{date_str.replace('-', '')}"


def already_exists(slug: str) -> bool:
    return (CONTENT_DIR / f"{slug}.md").exists()


def write_md(item_id: str, note_id: str, section: str, topic: str,
             title: str, date_str: str, link: str,
             is_tg: bool = False, extra_topics: list = None) -> Path:
    all_topics = list(dict.fromkeys([note_id] + (extra_topics or [])))
    related    = "\n".join(f'  - "{t}"' for t in all_topics)
    content = f"""---
id: "{item_id}"
type: "current_affair"
exam_section: "{section}"
topic: "{topic}"
related_topic_ids:
{related}
is_telangana_focus: {"true" if is_tg else "false"}
headline: "{title}"
date: "{date_str}"
source_url: "{link}"
---
"""
    slug = item_id.lower().replace("_", "-")
    path = CONTENT_DIR / f"{slug}.md"
    path.write_text(content, encoding="utf-8")
    return path


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    args = parse_args()
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"\nBackfill: {args.topic} ({args.note_id})")
    print(f"Period:   {args.from_date} to {args.to_date}")
    print(f"Keywords: {args.keywords}")

    # Split date range into monthly chunks for better GDELT coverage
    start = datetime.strptime(args.from_date, "%Y-%m-%d").date()
    end   = datetime.strptime(args.to_date,   "%Y-%m-%d").date()

    all_items: list[dict] = []

    # -- GDELT: query month by month for better coverage
    current = start
    while current <= end:
        month_end = min(
            date(current.year, current.month % 12 + 1, 1) - timedelta(days=1)
            if current.month < 12
            else date(current.year + 1, 1, 1) - timedelta(days=1),
            end
        )
        items = fetch_gdelt(args.keywords, current.isoformat(), month_end.isoformat())
        for it in items:
            it["pub_date"] = parse_gdelt_date(it["pub_date"])
        all_items.extend(items)
        current = month_end + timedelta(days=1)
        time.sleep(1)  # Be polite to GDELT API

    # -- PIB: single query (Google News handles the range)
    pib_items = fetch_pib(args.keywords, args.from_date, args.to_date)
    for it in pib_items:
        it["pub_date"] = parse_rss_date(it["pub_date"])
    all_items.extend(pib_items)

    print(f"\nTotal raw articles: {len(all_items)}")

    # Deduplicate by title similarity (basic)
    seen_titles: set[str] = set()
    unique = []
    for it in all_items:
        key = re.sub(r"[^a-z0-9]", "", it["title"].lower())[:40]
        if key not in seen_titles and it["title"].strip():
            seen_titles.add(key)
            unique.append(it)
    print(f"After dedup: {len(unique)}")

    # AI filter
    if not args.no_ai:
        unique = ai_filter(unique, args.topic)
        print(f"After AI filter: {len(unique)}")

    # Write .md files
    added   = 0
    skipped = 0
    for item in unique[:args.max]:
        title = clean_title(item["title"])
        if not title or len(title) < 10:
            skipped += 1
            continue

        date_str = item["pub_date"] if item["pub_date"] else date.today().isoformat()
        item_id  = make_id(args.section, title, date_str)
        slug     = item_id.lower().replace("_", "-")

        if already_exists(slug):
            skipped += 1
            continue

        is_tg    = item.get("is_telangana_focus", False)
        extra_t  = item.get("extra_topics", [])

        write_md(item_id, args.note_id, args.section, args.topic,
                 title, date_str, item["link"], is_tg, extra_t)

        print(f"  + {item_id}{' [TG]' if is_tg else ''}")
        added += 1

    print(f"\nDone: {added} added, {skipped} skipped")
    print(f"Now run: git add content/current-affairs/ && git commit -m 'ca: backfill {args.topic}' && git push")


if __name__ == "__main__":
    main()
