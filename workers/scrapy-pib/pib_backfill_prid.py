#!/usr/bin/env python3
"""
PIB historical backfill using PRID range scanning.

PIB's allRel.aspx date postback is unreliable outside a real browser. This
script avoids that filter entirely. It samples the roughly increasing
PRID space, uses Posted On metadata to find date clusters, then scans only
the cluster around a matching date densely enough to collect its articles.

The article page can contain several language versions or regional releases
with adjacent PRIDs. Only English articles whose metadata says "by PIB Delhi"
are passed to the existing TGPRB Gemini extraction and Markdown card writer.

Usage:
  python3 workers/scrapy-pib/pib_backfill_prid.py --from 2025-01-01 --to 2025-01-31 --dry-run
  python3 workers/scrapy-pib/pib_backfill_prid.py --from 2025-01-01 --to 2026-08-09

The defaults are intentionally conservative. Use --coarse-step to trade
requests for coverage, and --start-prid/--end-prid to override the estimated
PRID bounds when backfilling a different period.
"""

from __future__ import annotations

import argparse
import re
import sys
import time
import unicodedata
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path
from typing import Callable

import requests
from bs4 import BeautifulSoup


# Run from the repository root so the imported pipeline keeps its existing
# relative paths for content/current-affairs and pages/notes.
REPO_ROOT = Path(__file__).resolve().parents[2]
SCRIPT_DIR = Path(__file__).resolve().parent
if str(SCRIPT_DIR) not in sys.path:
    sys.path.insert(0, str(SCRIPT_DIR))

# The scraper directory contains a hyphen, so it is a script directory rather
# than an importable Python package. Import the existing pipeline module from
# that directory and reuse its public extraction/writer functions.
import pib_scraper as pipeline


ARTICLE_URL = f"{pipeline.PIB_BASE.rstrip('/')}/PressReleasePage.aspx?PRID={{}}&reg=3&lang=1"

# User-provided anchors for the current PIB PRID sequence.
PRID_ANCHOR_START_DATE = date(2025, 1, 1)
PRID_ANCHOR_START = 2_090_000
PRID_ANCHOR_END_DATE = date(2026, 8, 9)
PRID_ANCHOR_END = 2_296_000
PRID_PADDING = 5_000

MONTHS = {
    "jan": 1,
    "january": 1,
    "feb": 2,
    "february": 2,
    "mar": 3,
    "march": 3,
    "apr": 4,
    "april": 4,
    "may": 5,
    "jun": 6,
    "june": 6,
    "jul": 7,
    "july": 7,
    "aug": 8,
    "august": 8,
    "sep": 9,
    "sept": 9,
    "september": 9,
    "oct": 10,
    "october": 10,
    "nov": 11,
    "november": 11,
    "dec": 12,
    "december": 12,
}

POSTED_ON_RE = re.compile(
    r"Posted\s+On\s*:\s*"
    r"(\d{1,2})\s+([A-Za-z]+)\s+(20\d{2})"
    r"(?:\s+\d{1,2}:\d{2}\s*(?:AM|PM)?)?"
    r"\s+by\s+(.+)$",
    re.IGNORECASE,
)


@dataclass(slots=True)
class ArticleProbe:
    prid: int
    url: str
    title: str = ""
    published: date | None = None
    office: str = ""
    ministry: str = ""
    article_text: str = ""
    is_english: bool = False
    status: str = "missing"
    error: str = ""

    @property
    def is_pib_delhi(self) -> bool:
        return self.office.casefold() == "pib delhi"

    @property
    def is_valid(self) -> bool:
        return bool(
            self.published
            and self.title
            and self.article_text
            and self.is_english
            and self.is_pib_delhi
        )


def parse_date_arg(value: str) -> date:
    try:
        return datetime.strptime(value, "%Y-%m-%d").date()
    except ValueError as exc:
        raise argparse.ArgumentTypeError(
            f"Invalid date {value!r}; expected YYYY-MM-DD"
        ) from exc


def estimate_prid(target_date: date) -> int:
    """Estimate a PRID from the two known sequence anchors."""
    total_days = (PRID_ANCHOR_END_DATE - PRID_ANCHOR_START_DATE).days
    total_prids = PRID_ANCHOR_END - PRID_ANCHOR_START
    days_from_start = (target_date - PRID_ANCHOR_START_DATE).days
    return PRID_ANCHOR_START + round(days_from_start * total_prids / total_days)


def resolve_prid_bounds(
    from_date: date,
    to_date: date,
    start_prid: int | None,
    end_prid: int | None,
) -> tuple[int, int]:
    estimated_start = estimate_prid(from_date) - PRID_PADDING
    estimated_end = estimate_prid(to_date) + PRID_PADDING

    # The anchors are approximate. Keep the padding below the first anchor so
    # a release near the requested range boundary cannot be clipped.
    start = start_prid if start_prid is not None else max(1, estimated_start)
    end = end_prid if end_prid is not None else max(start, estimated_end)
    return start, end


def _latin_ratio(text: str) -> float:
    letters = [char for char in text if char.isalpha()]
    if not letters:
        return 0.0
    latin = sum(
        unicodedata.name(char, "").startswith("LATIN")
        for char in letters
    )
    return latin / len(letters)


def _find_article_content(soup: BeautifulSoup):
    return (
        soup.find("div", id=re.compile(r"content|body|main", re.IGNORECASE))
        or soup.find("div", class_=re.compile(r"content|body|release|press", re.IGNORECASE))
        or soup.find("main")
        or soup.body
    )


def _extract_title(soup: BeautifulSoup) -> str:
    title_node = soup.find("h2", id="Titleh2")
    if title_node:
        return title_node.get_text(" ", strip=True)

    og_title = soup.find("meta", attrs={"property": "og:title"})
    if og_title and og_title.get("content"):
        return og_title["content"].strip()

    return ""


def _extract_ministry(soup: BeautifulSoup) -> str:
    candidates = [
        soup.find("div", class_=re.compile(r"ministry|dept|department", re.IGNORECASE)),
        soup.find("span", class_=re.compile(r"ministry|dept", re.IGNORECASE)),
        soup.find("td", class_=re.compile(r"ministry", re.IGNORECASE)),
    ]
    for candidate in candidates:
        if candidate:
            text = candidate.get_text(" ", strip=True)
            if text and len(text) < 100:
                return text

    breadcrumb = soup.find(class_=re.compile(r"breadcrumb", re.IGNORECASE))
    if breadcrumb:
        crumbs = breadcrumb.get_text(" > ", strip=True)
        if " > " in crumbs:
            return crumbs.split(">")[-2].strip()

    return ""


def _extract_posted_metadata(soup: BeautifulSoup) -> tuple[date | None, str]:
    metadata = soup.find(
        "div",
        class_=re.compile(r"PrDateTime|ReleaseDateSubHead", re.IGNORECASE),
    )
    if not metadata:
        return None, ""

    text = metadata.get_text(" ", strip=True)
    match = POSTED_ON_RE.search(text)
    if not match:
        return None, ""

    day = int(match.group(1))
    month = MONTHS.get(match.group(2).casefold())
    year = int(match.group(3))
    if not month:
        return None, ""

    try:
        published = date(year, month, day)
    except ValueError:
        return None, ""

    office_match = re.search(
        r"\bby\s+(PIB\s+[A-Za-z]+(?:\s+(?:and|&)\s+[A-Za-z]+)?)\b",
        text,
        re.IGNORECASE,
    )
    office = office_match.group(1).strip() if office_match else ""
    return published, office


def _language_sample(content) -> str:
    paragraphs: list[str] = []
    for paragraph in content.find_all("p") if content else []:
        if paragraph.find_parent("blockquote"):
            continue
        text = paragraph.get_text(" ", strip=True)
        if len(text) > 20:
            paragraphs.append(text)
        if len(paragraphs) == 3:
            break
    return " ".join(paragraphs)


def _extract_article_text(soup: BeautifulSoup) -> str:
    """Mirror the existing parser without making a second HTTP request."""
    for tag in soup(["script", "style", "nav", "footer", "aside", "iframe", "noscript", "header", "menu"]):
        tag.decompose()

    content = _find_article_content(soup)
    if not content:
        return ""

    paragraphs = content.find_all("p")
    text = "\n".join(
        paragraph.get_text(strip=True)
        for paragraph in paragraphs
        if len(paragraph.get_text(strip=True)) > 20
    )
    if len(text) > 4000:
        text = text[:4000] + "..."
    return text


class PRIDFetcher:
    def __init__(self, delay: float, timeout: float = 30, retries: int = 2):
        self.session = requests.Session()
        self.session.headers.update(pipeline.HEADERS)
        self.delay = max(0.0, delay)
        self.timeout = timeout
        self.retries = max(1, retries)
        self.last_request_at = 0.0
        self.cache: dict[int, ArticleProbe] = {}
        self.requests_made = 0

    def _wait(self) -> None:
        elapsed = time.monotonic() - self.last_request_at
        if self.last_request_at and elapsed < self.delay:
            time.sleep(self.delay - elapsed)
        self.last_request_at = time.monotonic()

    def fetch(self, prid: int) -> ArticleProbe:
        if prid in self.cache:
            return self.cache[prid]

        url = ARTICLE_URL.format(prid)
        last_error = ""

        for attempt in range(1, self.retries + 1):
            try:
                self._wait()
                response = self.session.get(url, timeout=self.timeout)
                self.requests_made += 1
                response.raise_for_status()

                soup = BeautifulSoup(response.text, "html.parser")
                title = _extract_title(soup)
                published, office = _extract_posted_metadata(soup)
                if not title or not published:
                    record = ArticleProbe(
                        prid=prid,
                        url=url,
                        status="missing",
                    )
                    self.cache[prid] = record
                    return record

                content = _find_article_content(soup)
                sample = _language_sample(content)
                language_links = {
                    link.get_text(" ", strip=True).casefold()
                    for link in soup.select("a.ReleaseLang")
                }

                # A non-English release often exposes a separate English
                # translation link and places the regional-language text first.
                is_english = (
                    "english" not in language_links
                    and _latin_ratio(title) >= 0.75
                    and (not sample or _latin_ratio(sample) >= 0.75)
                )

                ministry = _extract_ministry(soup)
                article_text = _extract_article_text(soup)
                record = ArticleProbe(
                    prid=prid,
                    url=url,
                    title=title,
                    published=published,
                    office=office,
                    ministry=ministry,
                    article_text=article_text,
                    is_english=is_english,
                    status="valid" if is_english and office.casefold() == "pib delhi" else "filtered",
                )
                self.cache[prid] = record
                return record
            except requests.RequestException as exc:
                last_error = str(exc)
                if attempt < self.retries:
                    time.sleep(min(10.0, 2.0 * attempt))
            except Exception as exc:
                last_error = str(exc)
                break

        record = ArticleProbe(prid=prid, url=url, status="error", error=last_error)
        self.cache[prid] = record
        return record


class PRIDScanner:
    def __init__(
        self,
        fetcher: PRIDFetcher,
        start_prid: int,
        end_prid: int,
        coarse_step: int = 50,
        cluster_probe_step: int = 50,
        max_cluster_span: int = 2_000,
        future_streak: int = 8,
    ):
        self.fetcher = fetcher
        self.start_prid = start_prid
        self.end_prid = end_prid
        self.coarse_step = max(1, coarse_step)
        self.cluster_probe_step = max(1, cluster_probe_step)
        self.max_cluster_span = max(self.cluster_probe_step, max_cluster_span)
        self.future_streak_limit = max(1, future_streak)
        self.expanded: list[tuple[int, int, date]] = []

    def _find_cluster_edge(
        self,
        center: int,
        direction: int,
        target_date: date,
    ) -> tuple[int, int]:
        """Return the last same-date probe and the first outer probe."""
        last_same = center
        distance = self.cluster_probe_step

        while distance <= self.max_cluster_span:
            probe_id = center + direction * distance
            if probe_id < self.start_prid or probe_id > self.end_prid:
                return last_same, probe_id

            record = self.fetcher.fetch(probe_id)
            if record.published == target_date:
                last_same = probe_id
                distance *= 2
                continue

            # Empty PRIDs occur. Keep looking through holes before deciding
            # that the date cluster has ended.
            if record.published is None:
                distance *= 2
                continue

            return last_same, probe_id

        return last_same, center + direction * self.max_cluster_span

    def _cluster_range(self, center: int, target_date: date) -> tuple[int, int]:
        left_same, left_outer = self._find_cluster_edge(center, -1, target_date)
        right_same, right_outer = self._find_cluster_edge(center, 1, target_date)
        low = max(self.start_prid, min(left_same, left_outer))
        high = min(self.end_prid, max(right_same, right_outer))
        return low, high

    def _already_expanded(self, prid: int, target_date: date) -> bool:
        return any(
            day == target_date and low <= prid <= high
            for low, high, day in self.expanded
        )

    def _expand_and_emit(
        self,
        center: int,
        target_date: date,
        emit: Callable[[ArticleProbe], None],
    ) -> tuple[int, int]:
        if self._already_expanded(center, target_date):
            for low, high, day in self.expanded:
                if day == target_date and low <= center <= high:
                    return low, high

        low, high = self._cluster_range(center, target_date)
        self.expanded.append((low, high, target_date))
        print(f"  [PRID] Expanding {target_date} cluster {low}-{high} ({high - low + 1} IDs)")

        for prid in range(low, high + 1):
            record = self.fetcher.fetch(prid)
            if record.published == target_date and record.is_valid:
                emit(record)

        return low, high

    def scan(
        self,
        from_date: date,
        to_date: date,
        emit: Callable[[ArticleProbe], None],
    ) -> None:
        current = self.start_prid
        future_streak = 0
        coarse_probes = 0

        while current <= self.end_prid:
            record = self.fetcher.fetch(current)
            coarse_probes += 1

            if record.published:
                if record.published > to_date:
                    future_streak += 1
                    if future_streak >= self.future_streak_limit:
                        print(
                            f"[PRID] Stopping after {future_streak} consecutive probes "
                            f"past {to_date} at PRID {current}"
                        )
                        break
                else:
                    future_streak = 0

                if from_date <= record.published <= to_date:
                    low, high = self._expand_and_emit(current, record.published, emit)
                    current = max(current + self.coarse_step, high + 1)
                    continue

                # Keep the configured coarse step here. PRIDs are broadly
                # chronological but not strictly monotonic, so a date-based
                # leap could jump over a small cluster at the range boundary.
                if record.published < from_date:
                    current += self.coarse_step
                    continue

            current += self.coarse_step

            if coarse_probes % 100 == 0:
                print(
                    f"[PRID] coarse probes={coarse_probes} current={current} "
                    f"http_requests={self.fetcher.requests_made}"
                )


def process_article(
    record: ArticleProbe,
    client,
    extra_topics_guidance: str,
    dry_run: bool,
    per_day_count: dict[date, int],
    max_per_day: int,
) -> str:
    if dry_run:
        print(f"    [DRY] {record.prid} {record.title[:80]}")
        return "dry"

    if max_per_day > 0 and per_day_count.get(record.published, 0) >= max_per_day:
        return "day-limit"

    category = pipeline.infer_category_from_ministry(record.ministry)
    ai = pipeline.extract_exam_fact(
        record.article_text,
        record.title,
        client,
        extra_topics_guidance=extra_topics_guidance,
    )
    if not ai:
        return "no-fact"

    if ai.get("category") not in pipeline.VALID_CATEGORIES:
        ai["category"] = category

    release = {
        "title": record.title,
        "url": record.url,
        "date_iso": record.published.isoformat(),
    }
    path = pipeline.write_exam_card(release, ai, record.ministry)
    if not path:
        return "duplicate"

    per_day_count[record.published] = per_day_count.get(record.published, 0) + 1
    print(f"    [SAVED] {path.name} from PRID {record.prid}")
    return "saved"


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Backfill English PIB Delhi releases by scanning PRID ranges"
    )
    parser.add_argument("--from", dest="from_date", type=parse_date_arg, default=date(2025, 1, 1))
    parser.add_argument("--to", dest="to_date", type=parse_date_arg, default=date.today())
    parser.add_argument("--start-prid", type=int, default=None)
    parser.add_argument("--end-prid", type=int, default=None)
    parser.add_argument("--coarse-step", type=int, default=50)
    parser.add_argument("--cluster-probe-step", type=int, default=50)
    parser.add_argument("--max-cluster-span", type=int, default=2_000)
    parser.add_argument("--future-streak", type=int, default=8)
    parser.add_argument("--delay", type=float, default=pipeline.DELAY_BETWEEN_REQUESTS)
    parser.add_argument("--max-per-day", type=int, default=30)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    if args.from_date > args.to_date:
        parser.error("--from must be on or before --to")

    start_prid, end_prid = resolve_prid_bounds(
        args.from_date,
        args.to_date,
        args.start_prid,
        args.end_prid,
    )
    if start_prid > end_prid:
        parser.error("start PRID must be on or before end PRID")

    # Match the existing pipeline's note discovery and prompt construction.
    note_registry = pipeline.discover_note_registry()
    pipeline.apply_registry_to_category_note_ids(note_registry)
    extra_topics_guidance = pipeline.build_dynamic_prompt_section(note_registry)
    print(f"[Registry] Found {len(note_registry)} topic pages")

    client = None if args.dry_run else pipeline.get_gemini_client()
    if not args.dry_run and not client:
        print("[ERROR] No Gemini client. Set GEMINI_API_KEY or GCP credentials.")
        raise SystemExit(1)

    print("=" * 60)
    print("PIB PRID Backfill")
    print("=" * 60)
    print(f"Dates      : {args.from_date} to {args.to_date}")
    print(f"PRIDs      : {start_prid} to {end_prid}")
    print(f"Coarse step: {args.coarse_step}")
    print(f"Dry run    : {args.dry_run}")
    print("=" * 60)

    fetcher = PRIDFetcher(delay=args.delay)
    scanner = PRIDScanner(
        fetcher=fetcher,
        start_prid=start_prid,
        end_prid=end_prid,
        coarse_step=args.coarse_step,
        cluster_probe_step=args.cluster_probe_step,
        max_cluster_span=args.max_cluster_span,
        future_streak=args.future_streak,
    )

    per_day_count: dict[date, int] = {}
    stats = {"saved": 0, "dry": 0, "no-fact": 0, "duplicate": 0, "day-limit": 0}

    def emit(record: ArticleProbe) -> None:
        result = process_article(
            record,
            client,
            extra_topics_guidance,
            args.dry_run,
            per_day_count,
            args.max_per_day,
        )
        stats[result] = stats.get(result, 0) + 1

    scanner.scan(args.from_date, args.to_date, emit)

    print("=" * 60)
    print("DONE")
    print(f"HTTP probes : {fetcher.requests_made}")
    print(f"Clusters    : {len(scanner.expanded)}")
    print(f"Saved       : {stats.get('saved', 0)}")
    print(f"No fact     : {stats.get('no-fact', 0)}")
    print(f"Duplicates  : {stats.get('duplicate', 0)}")
    print(f"Day limits  : {stats.get('day-limit', 0)}")
    print("=" * 60)


if __name__ == "__main__":
    # Existing pipeline functions use repository-relative paths.
    import os

    os.chdir(REPO_ROOT)
    main()
