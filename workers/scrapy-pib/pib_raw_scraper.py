#!/usr/bin/env python3
"""
PIB Raw Article Scraper - Hardened Edition

Key architecture decisions (from GPT analysis):
  - Pacer: no lock held during sleep (was freezing all workers)
  - allow_redirects=False: dead PRIDs classified immediately (no 4s wait)
  - timeout=(1.5, 4.0): connect timeout 1.5s kills dead PRIDs fast; read timeout 4s for valid pages
  - Single attempt per PRID in dense scan (no retry loop for dead IDs)
  - Per-thread requests.Session (thread-safe, no shared state)
  - Dense range: only from last-prev-month-anchor to max-target-anchor (not full 2-month range)
  - Probes table: records every PRID outcome so failed GitHub Actions jobs can resume
  - Stable UA (not browser impersonation rotation)

Usage:
  python3 workers/scrapy-pib/pib_raw_scraper.py --from 2025-05-01 --to 2025-05-31 --scan-from 2025-04-01
  python3 workers/scrapy-pib/pib_raw_scraper.py --stats
  python3 workers/scrapy-pib/pib_raw_scraper.py --export pib_raw.csv
"""
from __future__ import annotations

import argparse, csv, random, re, sqlite3, threading, time, unicodedata
from collections import Counter
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from typing import Optional
import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Paths & constants
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
DB_PATH    = SCRIPT_DIR / "pib_raw.db"

# PIB redirects the bare domain. Requests are deliberately made to the
# canonical host because fetch_prid does not follow arbitrary redirects.
PIB_BASE    = "https://www.pib.gov.in"
ARTICLE_URL = f"{PIB_BASE}/PressReleasePage.aspx?PRID={{}}&reg=3&lang=1"
PREFLIGHT_PRID = 2_093_213  # Known English PIB Delhi release: 15 Jan 2025.

# Browser UA is required — PIB's WAF returns HTTP 403 on non-browser UAs.
# Rotating UAs is intentionally avoided (one stable Chrome UA per run is enough).
SCRAPER_UA = (
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
)
SCRAPER_HEADERS = {
    "User-Agent":      SCRAPER_UA,
    "Accept":          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "Referer":         "https://www.pib.gov.in/",
}

PRID_ANCHOR_START_DATE = date(2025, 1, 1);  PRID_ANCHOR_START = 2_090_000
PRID_ANCHOR_END_DATE   = date(2026, 8, 9);  PRID_ANCHOR_END   = 2_296_000
PRID_PADDING   = 10_000
MAX_TEXT_CHARS = 12_000

MONTHS = {"jan":1,"january":1,"feb":2,"february":2,"mar":3,"march":3,"apr":4,"april":4,"may":5,
          "jun":6,"june":6,"jul":7,"july":7,"aug":8,"august":8,"sep":9,"sept":9,"september":9,
          "oct":10,"october":10,"nov":11,"november":11,"dec":12,"december":12}

POSTED_ON_RE = re.compile(
    r"Posted\s+On\s*:\s*(\d{1,2})\s+([A-Za-z]+)\s+(20\d{2})"
    r"(?:\s+\d{1,2}:\d{2}\s*(?:AM|PM)?)?\s+by\s+(.+)$", re.IGNORECASE)

# ---------------------------------------------------------------------------
# Database schema  (articles + probes table for cross-run resumability)
# ---------------------------------------------------------------------------
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
CREATE INDEX IF NOT EXISTS idx_pub_date  ON articles(pub_date);
CREATE INDEX IF NOT EXISTS idx_ministry  ON articles(ministry);

-- Probe ledger: every PRID we have attempted, with outcome.
-- Allows resuming across failed GitHub Actions runs.
CREATE TABLE IF NOT EXISTS probes (
    prid        INTEGER PRIMARY KEY,
    state       TEXT NOT NULL,   -- stored | filtered | terminal | transient | throttled
    attempts    INTEGER DEFAULT 1,
    probed_at   TEXT DEFAULT (datetime('now'))
);
"""

@dataclass
class ArticleRecord:
    prid: int; title: str; pub_date: date
    ministry: str; office: str; full_text: str; url: str

@dataclass
class FetchResult:
    prid:  int
    url:   str
    soup:  Optional[BeautifulSoup]
    state: str  # ok | redirect | terminal | transient | throttled
    status_code: Optional[int] = None
    location: str = ""

# ---------------------------------------------------------------------------
# Database helpers
# ---------------------------------------------------------------------------
def open_db() -> sqlite3.Connection:
    con = sqlite3.connect(DB_PATH, timeout=30.0, check_same_thread=False)
    con.executescript(SCHEMA)
    con.execute("PRAGMA journal_mode=WAL")
    return con

def probe_due(con: sqlite3.Connection, prid: int) -> bool:
    """Returns True if this PRID has never been successfully processed."""
    row = con.execute(
        "SELECT state FROM probes WHERE prid=?", (prid,)
    ).fetchone()
    if not row:
        return True
    # Re-attempt transient/throttled; skip stored/filtered/terminal
    return row[0] in ("transient", "throttled")

def mark_probe(con: sqlite3.Connection, prid: int, state: str) -> None:
    con.execute("""
        INSERT INTO probes(prid, state) VALUES(?,?)
        ON CONFLICT(prid) DO UPDATE SET
            state=excluded.state,
            attempts=attempts+1,
            probed_at=datetime('now')
    """, (prid, state))

def insert_article(con: sqlite3.Connection, rec: ArticleRecord) -> None:
    con.execute(
        "INSERT OR IGNORE INTO articles "
        "(prid,title,pub_date,ministry,office,full_text,url,word_count) "
        "VALUES (?,?,?,?,?,?,?,?)",
        (rec.prid, rec.title, rec.pub_date.isoformat(), rec.ministry, rec.office,
         rec.full_text, rec.url, len(rec.full_text.split())))
    mark_probe(con, rec.prid, "stored")
    con.commit()

# ---------------------------------------------------------------------------
# Pacer — NO lock held during sleep (was the bug that froze all workers)
# ---------------------------------------------------------------------------
class Pacer:
    def __init__(self, rps: float):
        self.interval       = 1.0 / max(rps, 0.1)
        self.lock           = threading.Lock()
        self.next_at        = 0.0
        self.cooldown_until = 0.0

    def acquire(self) -> None:
        with self.lock:
            now       = time.monotonic()
            scheduled = max(now, self.next_at, self.cooldown_until)
            self.next_at = scheduled + self.interval
        # Sleep OUTSIDE the lock so other workers are not frozen
        sleep_for = scheduled - time.monotonic()
        if sleep_for > 0:
            time.sleep(sleep_for)

    def cooldown(self, seconds: float) -> None:
        with self.lock:
            self.cooldown_until = max(
                self.cooldown_until, time.monotonic() + seconds
            )

# ---------------------------------------------------------------------------
# Per-thread session storage
# ---------------------------------------------------------------------------
_thread_local = threading.local()

def _session() -> requests.Session:
    """One Session per worker thread — thread-safe, keeps TCP connections alive."""
    if not hasattr(_thread_local, "session"):
        s = requests.Session()
        s.headers.update(SCRAPER_HEADERS)
        _thread_local.session = s
    return _thread_local.session

# ---------------------------------------------------------------------------
# Preflight — verify PIB is reachable before burning 20 min on coarse scan
# ---------------------------------------------------------------------------
def preflight() -> None:
    """Fetch a known PRID and assert it parses correctly.
    Retries up to 3 times on transient network errors before giving up."""
    url = ARTICLE_URL.format(PREFLIGHT_PRID)
    print(f"[Preflight] Checking PRID {PREFLIGHT_PRID} ...", flush=True)
    last_exc = None
    for attempt in range(1, 4):
        try:
            resp = requests.get(url, timeout=(8, 20), headers=SCRAPER_HEADERS)
            last_exc = None
            break
        except Exception as exc:
            last_exc = exc
            print(f"[Preflight] Attempt {attempt}/3 failed: {exc}", flush=True)
            if attempt < 3:
                time.sleep(10 * attempt)  # 10s, 20s backoff

    if last_exc is not None:
        raise RuntimeError(f"[Preflight FAIL] Network error after 3 attempts: {last_exc}") from last_exc

    if resp.status_code == 403:
        # 403 = WAF blocking our UA or IP. Log clearly but let coarse scan proceed
        # so we can see if it's a transient block or total block.
        print(f"[Preflight WARN] HTTP 403 — WAF may be blocking. "
              f"Headers sent: {SCRAPER_HEADERS['User-Agent']}", flush=True)
        print(f"[Preflight WARN] Proceeding to coarse scan — "
              f"if 0 clusters found, IP range is blocked.", flush=True)
        return

    if resp.status_code != 200:
        raise RuntimeError(
            f"[Preflight FAIL] HTTP {resp.status_code} — "
            f"Location: {resp.headers.get('Location', 'n/a')}"
        )
    soup = BeautifulSoup(resp.text, "lxml")
    pub_date = extract_date_only(soup)
    if pub_date is None:
        raise RuntimeError(
            "[Preflight FAIL] Page parsed but no date found — HTML structure may have changed"
        )
    print(f"[Preflight OK] PRID {PREFLIGHT_PRID} → {pub_date} (HTTP 200)", flush=True)

# ---------------------------------------------------------------------------
# Fetch
# NOTE: allow_redirects=True (default) is intentional.
# PIB redirects pib.gov.in → www.pib.gov.in on ALL requests including valid ones.
# allow_redirects=False would classify every valid article as "redirect" → 0 clusters.
# ---------------------------------------------------------------------------
def fetch_prid(prid: int, pacer: Pacer) -> FetchResult:
    url = ARTICLE_URL.format(prid)
    pacer.acquire()

    try:
        resp = _session().get(
            url,
            timeout=(3, 8),   # connect 3s, read 8s — PIB is a slow Indian govt server
            allow_redirects=True,
        )
    except (requests.Timeout, requests.ConnectionError, OSError):
        # Timeout on non-existent PRID is EXPECTED — not a rate-limit signal
        return FetchResult(prid, url, None, "transient")
    except Exception:
        return FetchResult(prid, url, None, "transient")

    if resp.status_code in (429, 503):
        retry_after = resp.headers.get("Retry-After", "")
        delay = float(retry_after) if retry_after.isdigit() else 60.0
        pacer.cooldown(delay + random.uniform(2, 8))
        print(f"  [THROTTLE] HTTP {resp.status_code} on PRID {prid}. Cooling {delay:.0f}s", flush=True)
        return FetchResult(prid, url, None, "throttled", resp.status_code)

    if 300 <= resp.status_code < 400:
        return FetchResult(
            prid, url, None, "redirect", resp.status_code,
            resp.headers.get("Location", ""),
        )

    if 400 <= resp.status_code < 500:
        return FetchResult(prid, url, None, "terminal", resp.status_code)

    if resp.status_code >= 500:
        return FetchResult(prid, url, None, "transient", resp.status_code)

    return FetchResult(prid, url, BeautifulSoup(resp.text, "lxml"), "ok", resp.status_code)

# ---------------------------------------------------------------------------
# Parsing helpers
# ---------------------------------------------------------------------------
def latin_ratio(text: str) -> float:
    letters = [c for c in text if c.isalpha()]
    return 0.0 if not letters else (
        sum(unicodedata.name(c, "").startswith("LATIN") for c in letters) / len(letters)
    )

def extract_date_only(soup: BeautifulSoup) -> Optional[date]:
    if not soup: return None
    meta_div = soup.find("div", class_=re.compile(r"PrDateTime|ReleaseDateSubHead", re.IGNORECASE))
    if not meta_div: return None
    m = POSTED_ON_RE.search(meta_div.get_text(" ", strip=True))
    if not m: return None
    month = MONTHS.get(m.group(2).casefold())
    if not month: return None
    try: return date(int(m.group(3)), month, int(m.group(1)))
    except ValueError: return None


def preflight_pib(pacer: Pacer) -> None:
    """Fail before a full scan when PIB is redirecting or blocking requests."""
    result = fetch_prid(PREFLIGHT_PRID, pacer)
    published = extract_date_only(result.soup) if result.soup else None
    if result.state != "ok" or not published:
        raise RuntimeError(
            "PIB preflight failed for known PRID "
            f"{PREFLIGHT_PRID}: state={result.state}, "
            f"http_status={result.status_code}, redirect_to={result.location!r}."
        )
    print(
        f"[Preflight] PRID {PREFLIGHT_PRID} returned {published} "
        f"(HTTP {result.status_code})",
        flush=True,
    )

def full_parse(prid: int, soup: BeautifulSoup, url: str) -> Optional[ArticleRecord]:
    if not soup: return None

    title_node = soup.find("h2", id="Titleh2")
    if not title_node:
        og = soup.find("meta", attrs={"property": "og:title"})
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

    sample = " ".join(p.get_text(" ", strip=True) for p in soup.find_all("p")[:5]
                      if len(p.get_text(strip=True)) > 20)
    if latin_ratio(sample) < 0.7: return None

    ministry = ""
    tag = soup.find("div", class_=re.compile(r"ministry|dept", re.IGNORECASE))
    if tag:
        t = tag.get_text(" ", strip=True)
        if t and len(t) < 120: ministry = t

    for tag in soup(["script","style","nav","footer","aside","iframe","noscript"]): tag.decompose()
    content = (soup.find("div", id=re.compile(r"content|body|main", re.IGNORECASE))
               or soup.find("div", class_=re.compile(r"content|body|release|press", re.IGNORECASE))
               or soup.find("main") or soup.body)
    if not content: return None

    full_text = "\n".join(p.get_text(strip=True) for p in content.find_all("p")
                          if len(p.get_text(strip=True)) > 20)
    if not full_text: return None
    if len(full_text) > MAX_TEXT_CHARS: full_text = full_text[:MAX_TEXT_CHARS]

    return ArticleRecord(prid=prid, title=title, pub_date=pub_date,
                         ministry=ministry, office=office, full_text=full_text, url=url)

# ---------------------------------------------------------------------------
# PRID estimation
# ---------------------------------------------------------------------------
def estimate_prid(target: date) -> int:
    total_days  = (PRID_ANCHOR_END_DATE - PRID_ANCHOR_START_DATE).days
    total_prids = PRID_ANCHOR_END - PRID_ANCHOR_START
    return PRID_ANCHOR_START + round(
        (target - PRID_ANCHOR_START_DATE).days * total_prids / total_days
    )

# ---------------------------------------------------------------------------
# Main scan logic
# ---------------------------------------------------------------------------
def scan_and_store(
    from_date:  date,
    to_date:    date,
    scan_from:  Optional[date],
    workers:    int,
    rps:        float,
    coarse_step: int,
    con:        sqlite3.Connection,
) -> dict:
    prid_start_date = scan_from if scan_from else from_date
    start_prid = max(1, estimate_prid(prid_start_date) - PRID_PADDING)
    end_prid   = estimate_prid(to_date) + PRID_PADDING
    pacer      = Pacer(rps)

    print(f"\n{'='*60}\nPIB Raw Scraper (hardened)\n{'='*60}")
    print(f"Save range : {from_date} to {to_date}")
    print(f"Scan from  : {prid_start_date}  (PRID estimation anchor)")
    print(f"PRIDs      : {start_prid} to {end_prid}")
    print(f"Workers    : {workers}  |  RPS cap: {rps}")
    print(f"Output DB  : {DB_PATH}\n{'='*60}", flush=True)

    stats = {"saved": 0, "terminal": 0, "transient": 0, "filtered": 0, "skipped": 0}
    preflight()   # Verify PIB reachable on known PRID before wasting a coarse scan

    # ---- STEP 1: Coarse scan (all dates in scan window) ----
    coarse_prids = list(range(start_prid, end_prid + 1, coarse_step))
    date_clusters: dict[date, list[int]] = {}
    coarse_states: Counter[str] = Counter()
    coarse_without_date = 0

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(fetch_prid, p, pacer): p for p in coarse_prids}
        for fut in as_completed(futures):
            res = fut.result()
            coarse_states[res.state] += 1
            if res.state == "ok" and res.soup:
                pub_date = extract_date_only(res.soup)
                if pub_date and prid_start_date <= pub_date <= to_date:
                    date_clusters.setdefault(pub_date, []).append(res.prid)
                elif not pub_date:
                    coarse_without_date += 1

    print(f"\n[Coarse] Found {len(date_clusters)} date clusters "
          f"across {len(coarse_prids)} probes", flush=True)
    print(
        f"[Coarse] States: {dict(sorted(coarse_states.items()))}; "
        f"200 responses without Posted On metadata: {coarse_without_date}",
        flush=True,
    )

    if not date_clusters:
        raise RuntimeError(
            "No date clusters found after a successful PIB preflight. "
            f"Coarse states: {dict(sorted(coarse_states.items()))}"
        )

    # ---- STEP 2: Compute a TIGHT dense range ----
    # Separate previous-month anchors from target-month anchors.
    # Use max(prev_month) as the START so we bridge right into target month Day 1.
    # Use max(target_month) + buffer as END.
    target_anchors = [p for d, ancs in date_clusters.items() for p in ancs if from_date <= d <= to_date]

    if target_anchors:
        dense_low  = max(1, min(target_anchors) - 600)
        dense_high = max(target_anchors) + 600
    else:
        dense_low  = max(1, estimate_prid(from_date) - 2000)
        dense_high = estimate_prid(to_date) + 2000
        print("[!] No target-month clusters found in coarse scan. Using estimated PRID range fallback.", flush=True)

    # ---- STEP 3: Dense scan — ONE contiguous PRID range ----
    todo = [p for p in range(dense_low, dense_high + 1) if probe_due(con, p)]
    skipped = (dense_high - dense_low + 1) - len(todo)
    stats["skipped"] = skipped

    print(f"[Dense] {len(todo)} PRIDs to probe "
          f"(PRID {dense_low}–{dense_high}, {skipped} already done)", flush=True)

    db_lock = threading.Lock()

    def process(prid: int):
        res = fetch_prid(prid, pacer)

        if res.state in ("transient", "throttled"):
            with db_lock:
                mark_probe(con, prid, res.state)
                con.commit()
            return res.state

        if res.state != "ok":
            with db_lock:
                mark_probe(con, prid, "terminal")
                con.commit()
            return "terminal"

        rec = full_parse(prid, res.soup, res.url)
        if rec and from_date <= rec.pub_date <= to_date:
            with db_lock:
                insert_article(con, rec)
            print(f"  [SAVED] {rec.pub_date} | {prid} | {rec.title[:65]}", flush=True)
            return "saved"

        with db_lock:
            mark_probe(con, prid, "filtered")
            con.commit()
        return "filtered"

    with ThreadPoolExecutor(max_workers=workers) as pool:
        futures = {pool.submit(process, p): p for p in todo}
        for fut in as_completed(futures):
            outcome = fut.result()
            stats[outcome] = stats.get(outcome, 0) + 1

    return stats

# ---------------------------------------------------------------------------
# CLI helpers
# ---------------------------------------------------------------------------
def cmd_stats(con: sqlite3.Connection) -> None:
    total  = con.execute("SELECT COUNT(*) FROM articles").fetchone()[0]
    oldest = con.execute("SELECT MIN(pub_date) FROM articles").fetchone()[0]
    newest = con.execute("SELECT MAX(pub_date) FROM articles").fetchone()[0]
    probes = con.execute("SELECT COUNT(*) FROM probes").fetchone()[0]
    retryable = con.execute(
        "SELECT COUNT(*) FROM probes WHERE state IN ('transient','throttled')"
    ).fetchone()[0]
    size   = DB_PATH.stat().st_size / (1024*1024) if DB_PATH.exists() else 0

    print(f"\n=== PIB Raw DB ===")
    print(f"Articles : {total:,}  |  Range: {oldest} to {newest}")
    print(f"Probes   : {probes:,}  |  Retryable: {retryable}")
    print(f"Size     : {size:.1f} MB  |  Path: {DB_PATH}")
    print("\nTop ministries:")
    for m, c in con.execute("SELECT ministry,COUNT(*) n FROM articles WHERE ministry!='' "
                            "GROUP BY ministry ORDER BY n DESC LIMIT 10"):
        print(f"  {c:5d}  {m}")

def cmd_export(con: sqlite3.Connection, out_path: str) -> None:
    rows = con.execute(
        "SELECT prid,title,pub_date,ministry,office,full_text,url,word_count,scraped_at "
        "FROM articles ORDER BY pub_date,prid"
    ).fetchall()
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["prid","title","pub_date","ministry","office",
                    "full_text","url","word_count","scraped_at"])
        w.writerows(rows)
    print(f"Exported {len(rows):,} articles to {out_path}")

def main() -> None:
    parser = argparse.ArgumentParser(description="PIB hardened raw scraper → SQLite")
    parser.add_argument("--from",      dest="from_date",  default="2025-01-01",
                        help="Start date to SAVE (YYYY-MM-DD)")
    parser.add_argument("--to",        dest="to_date",    default=datetime.now().strftime("%Y-%m-%d"),
                        help="End date to SAVE (YYYY-MM-DD)")
    parser.add_argument("--scan-from", dest="scan_from",  default=None,
                        help="Earlier date for PRID scan anchor — set 1 month before --from")
    parser.add_argument("--workers",     type=int,   default=10)
    parser.add_argument("--rps",         type=float, default=15.0,
                        help="Max requests/sec per job (default 15; each job is a separate IP)")
    parser.add_argument("--coarse-step", type=int,   default=80)
    parser.add_argument("--stats",  action="store_true")
    parser.add_argument("--export", metavar="FILE")
    args = parser.parse_args()

    con = open_db()
    if args.stats:  cmd_stats(con); return
    if args.export: cmd_export(con, args.export); return

    from_date = datetime.strptime(args.from_date, "%Y-%m-%d").date()
    to_date   = datetime.strptime(args.to_date,   "%Y-%m-%d").date()
    scan_from = datetime.strptime(args.scan_from,  "%Y-%m-%d").date() if args.scan_from else None

    stats = scan_and_store(from_date, to_date, scan_from, args.workers, args.rps, args.coarse_step, con)

    print(f"\n{'='*60}")
    print(f"DONE  |  Saved: {stats.get('saved',0)}  "
          f"Terminal: {stats.get('terminal',0)}  "
          f"Transient: {stats.get('transient',0)}  "
          f"Filtered: {stats.get('filtered',0)}  "
          f"Skipped(DB): {stats.get('skipped',0)}")
    print('='*60)
    cmd_stats(con)

if __name__ == "__main__":
    main()
