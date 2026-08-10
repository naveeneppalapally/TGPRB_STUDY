#!/usr/bin/env python3
"""
PIB Raw Article Scraper - stores ALL PIB articles into a local SQLite database.

Multi-threaded raw scraper (NO Gemini, NO API costs).
Stores every English PIB Delhi article:
  prid, title, pub_date, ministry, office, full_text, url, word_count

Resumable: already-scraped PRIDs are skipped on re-run.

Usage:
  python3 workers/scrapy-pib/pib_raw_scraper.py                        # full 20 months
  python3 workers/scrapy-pib/pib_raw_scraper.py --from 2025-01-01 --to 2025-06-30 --workers 15
  python3 workers/scrapy-pib/pib_raw_scraper.py --stats
  python3 workers/scrapy-pib/pib_raw_scraper.py --export pib_raw.csv

Output: workers/scrapy-pib/pib_raw.db  (SQLite, ~500MB for 20 months)
"""
from __future__ import annotations
import argparse, csv, re, sqlite3, time, unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
import requests
from bs4 import BeautifulSoup

SCRIPT_DIR = Path(__file__).resolve().parent
DB_PATH    = SCRIPT_DIR / "pib_raw.db"

PIB_BASE    = "https://pib.gov.in"
ARTICLE_URL = f"{PIB_BASE}/PressReleasePage.aspx?PRID={{}}&reg=3&lang=1"
HEADERS     = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/124.0", "Accept-Language": "en-US,en;q=0.9"}

PRID_ANCHOR_START_DATE = date(2025, 1, 1);  PRID_ANCHOR_START = 2_090_000
PRID_ANCHOR_END_DATE   = date(2026, 8, 9);  PRID_ANCHOR_END   = 2_296_000
PRID_PADDING   = 3_000
MAX_TEXT_CHARS = 12_000

MONTHS = {"jan":1,"january":1,"feb":2,"february":2,"mar":3,"march":3,"apr":4,"april":4,"may":5,
          "jun":6,"june":6,"jul":7,"july":7,"aug":8,"august":8,"sep":9,"sept":9,"september":9,
          "oct":10,"october":10,"nov":11,"november":11,"dec":12,"december":12}

POSTED_ON_RE = re.compile(
    r"Posted\s+On\s*:\s*(\d{1,2})\s+([A-Za-z]+)\s+(20\d{2})"
    r"(?:\s+\d{1,2}:\d{2}\s*(?:AM|PM)?)?\s+by\s+(.+)$", re.IGNORECASE)

SCHEMA = """
CREATE TABLE IF NOT EXISTS articles (
    prid       INTEGER PRIMARY KEY,
    title      TEXT NOT NULL,
    pub_date   TEXT NOT NULL,
    ministry   TEXT DEFAULT '',
    office     TEXT DEFAULT '',
    full_text  TEXT NOT NULL,
    url        TEXT NOT NULL,
    word_count INTEGER DEFAULT 0,
    scraped_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pub_date ON articles(pub_date);
CREATE INDEX IF NOT EXISTS idx_ministry ON articles(ministry);
"""

@dataclass
class ArticleRecord:
    prid: int; title: str; pub_date: date
    ministry: str; office: str; full_text: str; url: str

def open_db():
    con = sqlite3.connect(DB_PATH, timeout=30.0)
    con.executescript(SCHEMA)
    con.execute("PRAGMA journal_mode=WAL")
    return con

def already_scraped(con, prid):
    return con.execute("SELECT 1 FROM articles WHERE prid=?", (prid,)).fetchone() is not None

def insert_article(con, rec: ArticleRecord):
    con.execute(
        "INSERT OR IGNORE INTO articles (prid,title,pub_date,ministry,office,full_text,url,word_count) VALUES (?,?,?,?,?,?,?,?)",
        (rec.prid, rec.title, rec.pub_date.isoformat(), rec.ministry, rec.office,
         rec.full_text, rec.url, len(rec.full_text.split())))
    con.commit()

def latin_ratio(text):
    letters = [c for c in text if c.isalpha()]
    return 0.0 if not letters else sum(unicodedata.name(c,"").startswith("LATIN") for c in letters)/len(letters)

def fetch_prid(session: requests.Session, prid: int) -> tuple[int, BeautifulSoup | None, str]:
    url = ARTICLE_URL.format(prid)
    try:
        resp = session.get(url, timeout=15)
        if resp.status_code != 200:
            return prid, None, url
        return prid, BeautifulSoup(resp.text, "lxml"), url
    except Exception:
        return prid, None, url

def extract_date_only(soup: BeautifulSoup) -> date | None:
    if not soup: return None
    meta_div = soup.find("div", class_=re.compile(r"PrDateTime|ReleaseDateSubHead", re.IGNORECASE))
    if not meta_div: return None
    m = POSTED_ON_RE.search(meta_div.get_text(" ", strip=True))
    if not m: return None
    month = MONTHS.get(m.group(2).casefold())
    if not month: return None
    try: return date(int(m.group(3)), month, int(m.group(1)))
    except ValueError: return None

def full_parse(prid: int, soup: BeautifulSoup, url: str) -> ArticleRecord | None:
    if not soup: return None
    title_node = soup.find("h2", id="Titleh2")
    if not title_node:
        og = soup.find("meta", attrs={"property":"og:title"})
        title = og["content"].strip() if og and og.get("content") else ""
    else:
        title = title_node.get_text(" ", strip=True)
    if not title or len(title) < 10: return None

    meta_div = soup.find("div", class_=re.compile(r"PrDateTime|ReleaseDateSubHead", re.IGNORECASE))
    if not meta_div: return None
    meta_text = meta_div.get_text(" ", strip=True)
    m = POSTED_ON_RE.search(meta_text)
    if not m: return None
    month = MONTHS.get(m.group(2).casefold())
    if not month: return None
    try: pub_date = date(int(m.group(3)), month, int(m.group(1)))
    except ValueError: return None
    om = re.search(r"\bby\s+(PIB\s+[A-Za-z]+)\b", meta_text, re.IGNORECASE)
    office = om.group(1).strip() if om else ""

    if office.casefold() != "pib delhi": return None
    sample = " ".join(p.get_text(" ", strip=True) for p in soup.find_all("p")[:5] if len(p.get_text(strip=True))>20)
    if latin_ratio(sample) < 0.7: return None

    ministry = ""
    for tag in [soup.find("div", class_=re.compile(r"ministry|dept",re.IGNORECASE))]:
        if tag:
            t = tag.get_text(" ", strip=True)
            if t and len(t) < 120: ministry = t; break

    for tag in soup(["script","style","nav","footer","aside","iframe","noscript"]): tag.decompose()
    content = (soup.find("div", id=re.compile(r"content|body|main",re.IGNORECASE))
               or soup.find("div", class_=re.compile(r"content|body|release|press",re.IGNORECASE))
               or soup.find("main") or soup.body)
    if not content: return None
    full_text = "\n".join(p.get_text(strip=True) for p in content.find_all("p") if len(p.get_text(strip=True))>20)
    if not full_text: return None
    if len(full_text) > MAX_TEXT_CHARS: full_text = full_text[:MAX_TEXT_CHARS]

    return ArticleRecord(prid=prid, title=title, pub_date=pub_date, ministry=ministry, office=office, full_text=full_text, url=url)

def estimate_prid(target: date) -> int:
    total_days  = (PRID_ANCHOR_END_DATE - PRID_ANCHOR_START_DATE).days
    total_prids = PRID_ANCHOR_END - PRID_ANCHOR_START
    return PRID_ANCHOR_START + round((target - PRID_ANCHOR_START_DATE).days * total_prids / total_days)

def scan_and_store(from_date: date, to_date: date, workers: int, coarse_step: int, con: sqlite3.Connection):
    start_prid = max(1, estimate_prid(from_date) - PRID_PADDING)
    end_prid   = estimate_prid(to_date) + PRID_PADDING

    print(f"\n{'='*60}\nPIB Multi-Threaded Raw Scraper ({workers} workers)\n{'='*60}")
    print(f"Dates      : {from_date} to {to_date}")
    print(f"PRIDs      : {start_prid} to {end_prid}")
    print(f"Coarse step: {coarse_step}")
    print(f"Output DB  : {DB_PATH}\n{'='*60}", flush=True)

    stats = {"saved": 0, "skipped_db": 0, "probes": 0}

    # STEP 1: Fast multi-threaded coarse scan
    coarse_prids = list(range(start_prid, end_prid + 1, coarse_step))
    date_clusters: dict[date, list[int]] = {}

    session = requests.Session(); session.headers.update(HEADERS)
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(fetch_prid, session, p): p for p in coarse_prids}
        for fut in as_completed(futures):
            stats["probes"] += 1
            prid, soup, _ = fut.result()
            if soup:
                pub_date = extract_date_only(soup)
                if pub_date and from_date <= pub_date <= to_date:
                    date_clusters.setdefault(pub_date, []).append(prid)

    print(f"\n[Coarse] Found {len(date_clusters)} date clusters across {len(coarse_prids)} probes", flush=True)
    if not date_clusters:
        print("[!] No date clusters found.")
        return stats

    # STEP 2: Dense multi-threaded scan per cluster
    to_scan: list[int] = []
    for cluster_date, anchors in sorted(date_clusters.items()):
        low = min(anchors) - 120; high = max(anchors) + 120
        for p in range(low, high + 1):
            if not already_scraped(con, p) and p not in to_scan:
                to_scan.append(p)

    print(f"[Dense] Scanning {len(to_scan)} candidate PRIDs using {workers} threads...", flush=True)

    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(fetch_prid, session, p): p for p in to_scan}
        for fut in as_completed(futures):
            stats["probes"] += 1
            prid, soup, url = fut.result()
            if not soup: continue
            rec = full_parse(prid, soup, url)
            if rec and from_date <= rec.pub_date <= to_date:
                insert_article(con, rec)
                stats["saved"] += 1
                print(f"  [SAVED] {rec.pub_date} | {rec.prid} | {rec.title[:65]}", flush=True)

    return stats

def cmd_stats(con):
    total  = con.execute("SELECT COUNT(*) FROM articles").fetchone()[0]
    oldest = con.execute("SELECT MIN(pub_date) FROM articles").fetchone()[0]
    newest = con.execute("SELECT MAX(pub_date) FROM articles").fetchone()[0]
    size   = DB_PATH.stat().st_size/(1024*1024) if DB_PATH.exists() else 0
    print(f"\n=== PIB Raw DB ===\nArticles : {total:,}\nRange    : {oldest} to {newest}\nSize     : {size:.1f} MB\nPath     : {DB_PATH}")
    print("\nTop ministries:")
    for min_name, count in con.execute("SELECT ministry,COUNT(*) n FROM articles WHERE ministry!='' GROUP BY ministry ORDER BY n DESC LIMIT 10"):
        print(f"  {count:5d}  {min_name}")

def cmd_export(con, out_path):
    rows = con.execute("SELECT prid,title,pub_date,ministry,office,full_text,url,word_count,scraped_at FROM articles ORDER BY pub_date,prid").fetchall()
    with open(out_path,"w",newline="",encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(["prid","title","pub_date","ministry","office","full_text","url","word_count","scraped_at"]); w.writerows(rows)
    print(f"Exported {len(rows):,} articles to {out_path}")

def main():
    parser = argparse.ArgumentParser(description="PIB multi-threaded raw scraper -> SQLite")
    parser.add_argument("--from",  dest="from_date", default="2025-01-01")
    parser.add_argument("--to",    dest="to_date",   default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--workers", type=int, default=15, help="Concurrent worker threads (default: 15)")
    parser.add_argument("--coarse-step", type=int, default=80)
    parser.add_argument("--stats",  action="store_true")
    parser.add_argument("--export", metavar="FILE")
    args = parser.parse_args()

    con = open_db()
    if args.stats:  cmd_stats(con); return
    if args.export: cmd_export(con, args.export); return

    from_date = datetime.strptime(args.from_date, "%Y-%m-%d").date()
    to_date   = datetime.strptime(args.to_date,   "%Y-%m-%d").date()
    stats = scan_and_store(from_date, to_date, args.workers, args.coarse_step, con)
    print(f"\n{'='*60}\nDONE\nProbes : {stats['probes']}\nSaved  : {stats['saved']}\n{'='*60}")
    cmd_stats(con)

if __name__ == "__main__":
    main()
