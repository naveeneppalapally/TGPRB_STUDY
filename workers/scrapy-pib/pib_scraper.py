"""
PIB Archive Scraper - TGPRB Exam Card Builder
==============================================
Scrapes pib.gov.in date-wise archive pages to get official press releases
from any date range and converts them into exam cards.

PIB is the ground-truth source for ~65% of TGPRB CA questions:
  - Appointments (22 questions, 8/10 papers)
  - Awards & Honours (16 questions, 8/10 papers)
  - Defence & Security (10 questions, 7/10 papers)
  - Science & Space / ISRO (6 questions, 6/10 papers)
  - Government Schemes (13 questions, 7/10 papers)
  - Economy (partial - official reports/RBI press releases)

Legal: PIB copyright policy explicitly permits reproduction for
       public-interest, educational, non-commercial use with attribution.
       PIB has no robots.txt restrictions.

Usage:
  # Full backfill Jan 2025 to today:
  python3 workers/scrapy-pib/pib_scraper.py --from 2025-01-01

  # Single month:
  python3 workers/scrapy-pib/pib_scraper.py --from 2025-01-01 --to 2025-01-31

  # Single ministry/category:
  python3 workers/scrapy-pib/pib_scraper.py --from 2025-01-01 --ministry "Ministry of Home Affairs"

  # Dry run (no AI, no file writes):
  python3 workers/scrapy-pib/pib_scraper.py --from 2025-01-01 --dry-run
"""

import os
import re
import sys
import json
import time
import argparse
import tempfile
import requests
from datetime import date, datetime, timedelta
from pathlib import Path
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET


# ---------------------------------------------------------------------------
# Load .env if present
# ---------------------------------------------------------------------------
def _load_env_file():
    for env_path in [Path(".env"), Path("../../.env"), Path("../.env")]:
        if env_path.exists():
            try:
                for line in env_path.read_text(encoding="utf-8").splitlines():
                    line = line.strip()
                    if line and not line.startswith("#") and "=" in line:
                        k, v = line.split("=", 1)
                        k, v = k.strip(), v.strip().strip("'\"")
                        if k and not os.environ.get(k):
                            os.environ[k] = v
            except Exception:
                pass

_load_env_file()

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
CONTENT_DIR    = Path("content/current-affairs")
GCP_PROJECT    = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS      = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
AI_SCORE_MIN   = 6
DELAY_BETWEEN_REQUESTS = 1.5  # seconds - be polite to PIB servers

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

# ---------------------------------------------------------------------------
# PYQ-aligned category mapping
# Maps PIB ministry/department → exam category
# Based on audit Section A2 frequency ranking
# ---------------------------------------------------------------------------
MINISTRY_CATEGORY_MAP = {
    # Appointments (rank 1, 22 questions)
    "Ministry of Home Affairs":                   "appointments",
    "Ministry of External Affairs":               "appointments",
    "Department of Personnel and Training":       "appointments",
    "Ministry of Personnel, Public Grievances":   "appointments",
    "President Secretariat":                      "appointments",
    "Prime Minister's Office":                    "appointments",
    "Ministry of Law and Justice":                "appointments",
    "Supreme Court":                              "judiciary",

    # Defence & Security (rank 8, 10 questions)
    "Ministry of Defence":                        "defence",
    "Department of Defence":                      "defence",
    "Indian Army":                                "defence",
    "Indian Navy":                                "defence",
    "Indian Air Force":                           "defence",
    "DRDO":                                       "defence",
    "Defence Research and Development":           "defence",
    "Coast Guard":                                "defence",
    "Ministry of Ports, Shipping":                "defence",

    # Science & Space (rank 10, 6 questions)
    "Department of Space":                        "science",
    "ISRO":                                       "science",
    "Department of Science and Technology":       "science",
    "Ministry of Science and Technology":         "science",
    "Department of Biotechnology":                "science",
    "Ministry of Electronics":                    "science",
    "MeitY":                                      "science",

    # Economy (rank 3, 18 questions)
    "Ministry of Finance":                        "economy",
    "Department of Economic Affairs":             "economy",
    "Reserve Bank of India":                      "economy",
    "Ministry of Commerce":                       "economy",
    "NITI Aayog":                                 "economy",
    "Ministry of Corporate Affairs":              "economy",
    "SEBI":                                       "economy",

    # Awards & Honours (rank 4, 16 questions)
    "Ministry of Culture":                        "awards",
    "Sahitya Akademi":                            "awards",
    "Ministry of Youth Affairs and Sports":       "awards",
    "Sports Authority of India":                  "awards",
    "Indian Council for Cultural Relations":      "awards",

    # Government Schemes (rank 7, 13 questions)
    "Ministry of Rural Development":              "schemes",
    "Ministry of Education":                      "schemes",
    "Ministry of Health and Family Welfare":      "schemes",
    "Ministry of Housing and Urban Affairs":      "schemes",
    "Ministry of Agriculture":                    "schemes",
    "Ministry of Skill Development":              "schemes",
    "Ministry of Women and Child Development":    "schemes",
    "Ministry of Social Justice":                 "schemes",
    "Ministry of Tribal Affairs":                 "schemes",

    # International (rank 1=tie, 22 questions)
    "Ministry of External Affairs - Press":       "international",
    "MEA":                                        "international",

    # Environment (rank 12, 4 questions)
    "Ministry of Environment":                    "environment",
    "MoEFCC":                                     "environment",
    "National Disaster Management Authority":     "environment",
    "NDMA":                                       "environment",

    # Judiciary (rank 9, 7 questions)
    "Ministry of Law":                            "judiciary",
    "Department of Justice":                      "judiciary",
}

# Default category when ministry not mapped
DEFAULT_CATEGORY = "schemes"

VALID_CATEGORIES = [
    "appointments", "international", "economy", "awards", "sports",
    "telangana", "schemes", "defence", "science", "judiciary",
    "environment", "books",
]

# Related NOTE IDs per category (for CurrentAffairsStrip wiring)
CATEGORY_NOTE_IDS = {
    "appointments":  ["NOTE-POL-CONSTITUTION"],
    "international": ["NOTE-POL-CONSTITUTION"],
    "economy":       ["NOTE-ECO-GENERAL"],
    "awards":        [],
    "sports":        [],
    "telangana":     ["NOTE-TEL-GENERAL"],
    "schemes":       ["NOTE-POL-CONSTITUTION"],
    "defence":       [],
    "science":       ["NOTE-SCI-GENERAL"],
    "judiciary":     ["NOTE-POL-CONSTITUTION"],
    "environment":   ["NOTE-GEO-ENVIRONMENT"],
    "books":         [],
}


# ---------------------------------------------------------------------------
# Auto-discovery: scan pages/notes/**/*.vue for CurrentAffairsStrip note-ids
# Runs once at startup. No manual editing needed when a new topic is built.
# ---------------------------------------------------------------------------

# NOTE-ID segment → plain English keywords for Gemini prompt
# e.g. "FORESTS" → "forests deforestation national park tree cover wildlife"
_SEGMENT_KEYWORDS: dict[str, str] = {
    "DRAINAGE":     "rivers drainage basin dams tributaries Godavari Krishna Ganga",
    "ENVIRONMENT":  "environment pollution climate UNESCO wildlife species",
    "FORESTS":      "forests deforestation national park tree cover wildlife sanctuary",
    "MOUNTAINS":    "mountains Himalayas peaks glaciers passes altitude",
    "GEOGRAPHY":    "geography physical features landforms soil",
    "CLIMATE":      "climate monsoon rainfall drought flood cyclone",
    "CONSTITUTION": "constitution parliament law amendment fundamental rights",
    "PARLIAMENT":   "parliament Lok Sabha Rajya Sabha speaker session",
    "FEDERALISM":   "federalism states centre concurrent list",
    "JUDICIARY":    "Supreme Court High Court judgment CJI constitution bench",
    "POLITY":       "polity governance parliament election commission",
    "BANKING":      "banking RBI repo rate inflation monetary policy",
    "GENERAL":      "economy GDP budget finance scheme",
    "ECO":          "economy GDP finance budget trade",
    "SPACE":        "ISRO space satellite launch vehicle mission",
    "SCI":          "science technology ISRO DRDO research innovation",
    "HISTORY":      "history ancient medieval modern India freedom struggle",
    "MODERN":       "modern history freedom struggle independence 1857",
    "TEL":          "Telangana Hyderabad state government scheme TG police",
    "SPORTS":       "sports cricket boxing kabaddi athletics medal championship",
    "DEFENCE":      "defence army navy air force missile exercise DRDO",
    "AWARDS":       "awards Padma Nobel Jnanpith Dronacharya Arjuna honour",
    "INTERNATIONAL":"summit bilateral agreement UN MEA foreign affairs",
    "ARITHMETIC":   "",  # no CA relevance
    "ARI":          "",
}

# Category → list of NOTE-IDs that all articles in that category should get
# This gets EXTENDED at startup by _discover_note_registry()
_EXTRA_CATEGORY_NOTE_IDS: dict[str, list[str]] = {}


def _note_id_to_keywords(note_id: str) -> str:
    """
    Derive search keywords from a NOTE-ID.
    NOTE-GEO-FORESTS → 'forests deforestation national park tree cover wildlife sanctuary'
    NOTE-TEL-GENERAL → 'Telangana Hyderabad state government scheme TG police'
    """
    parts = note_id.replace("NOTE-", "").split("-")
    keywords: list[str] = []
    for part in parts:
        kw = _SEGMENT_KEYWORDS.get(part.upper(), "")
        if kw:
            keywords.append(kw)
        else:
            # Fallback: use the segment itself as a keyword
            keywords.append(part.lower())
    return " ".join(keywords)


def _note_id_to_category(note_id: str) -> str:
    """
    Map a NOTE-ID to the most relevant CA category.
    NOTE-GEO-FORESTS → 'environment'
    NOTE-POL-CONSTITUTION → 'schemes' (default for polity)
    NOTE-SCI-SPACE → 'science'
    """
    upper = note_id.upper()
    if "GEO-DRAINAGE" in upper or "GEO-RIVERS" in upper:
        return "environment"
    if "GEO" in upper:
        return "environment"
    if "TEL" in upper:
        return "telangana"
    if "POL" in upper or "CONST" in upper or "PARL" in upper:
        return "schemes"
    if "ECO" in upper:
        return "economy"
    if "SCI" in upper or "SPACE" in upper:
        return "science"
    if "HIS" in upper:
        return "schemes"
    return "schemes"


def discover_note_registry() -> dict[str, dict]:
    """
    Scans pages/notes/**/*.vue for <CurrentAffairsStrip note-id="NOTE-XXX" />
    Returns: { "NOTE-GEO-FORESTS": { "keywords": "...", "category": "environment" } }

    Called once at startup. Automatically picks up every new topic page
    the AI builds - no manual config needed.
    """
    registry: dict[str, dict] = {}
    pages_dir = Path("pages/notes")

    if not pages_dir.exists():
        return registry

    pattern = re.compile(r'note-id=["\']([\w-]+)["\']')

    for vue_file in pages_dir.rglob("*.vue"):
        try:
            text = vue_file.read_text(encoding="utf-8")
            for match in pattern.finditer(text):
                note_id = match.group(1)
                if note_id.startswith("NOTE-") and note_id not in registry:
                    registry[note_id] = {
                        "keywords": _note_id_to_keywords(note_id),
                        "category": _note_id_to_category(note_id),
                        "source_file": str(vue_file),
                    }
        except Exception:
            continue

    return registry


def build_dynamic_prompt_section(registry: dict[str, dict]) -> str:
    """
    Builds the extra_topics guidance block for the Gemini prompt
    from the auto-discovered registry.

    Example output:
      - If about forests, deforestation, national park -> add "NOTE-GEO-FORESTS"
      - If about rivers, drainage, dams, tributaries   -> add "NOTE-GEO-DRAINAGE"
    """
    if not registry:
        return "    - Otherwise leave as empty array []"

    lines = []
    for note_id, meta in sorted(registry.items()):
        kw = meta.get("keywords", "").strip()
        if kw:
            lines.append(f'    - If about {kw[:60]} -> add "{note_id}"')
    lines.append("    - Otherwise leave as empty array []")
    return "\n".join(lines)


def apply_registry_to_category_note_ids(registry: dict[str, dict]) -> None:
    """
    Merges discovered NOTE-IDs into CATEGORY_NOTE_IDS so that
    when Gemini assigns a category, the card is also tagged with
    the relevant specific topic NOTE-IDs automatically.
    """
    for note_id, meta in registry.items():
        cat = meta["category"]
        if cat in CATEGORY_NOTE_IDS:
            if note_id not in CATEGORY_NOTE_IDS[cat]:
                CATEGORY_NOTE_IDS[cat].append(note_id)
        else:
            CATEGORY_NOTE_IDS[cat] = [note_id]


# ---------------------------------------------------------------------------
# Gemini client - extraction only, never generates facts
# ---------------------------------------------------------------------------
_gemini_client = None

def get_gemini_client():
    """
    Returns a Gemini client. Tries:
    1. GEMINI_API_KEY (local dev)
    2. Vertex AI via GCP_CREDS JSON (GitHub Actions)
    3. Vertex AI via ADC
    """
    global _gemini_client
    if _gemini_client is not None:
        return _gemini_client

    try:
        from google import genai

        if GEMINI_API_KEY:
            _gemini_client = genai.Client(api_key=GEMINI_API_KEY)
            print("[AI] Gemini ready via API key")
            return _gemini_client

        if GCP_CREDS and GCP_PROJECT:
            creds_data = json.loads(GCP_CREDS)
            tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
            json.dump(creds_data, tmp)
            tmp.flush()
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
            _gemini_client = genai.Client(vertexai=True, project=GCP_PROJECT, location="global")
            print("[AI] Vertex AI ready via service account JSON")
            return _gemini_client

        if GCP_PROJECT:
            _gemini_client = genai.Client(vertexai=True, project=GCP_PROJECT, location="global")
            print("[AI] Vertex AI ready via ADC")
            return _gemini_client

        print("[AI] No credentials. Set GEMINI_API_KEY or GOOGLE_CLOUD_PROJECT.")
        return None
    except Exception as e:
        print(f"[AI] Init error: {e}")
        return None


# ---------------------------------------------------------------------------
# PIB archive page scraping
# ---------------------------------------------------------------------------
PIB_BASE    = "https://www.pib.gov.in"
# ?reg=3&lang=1 = English language releases (confirmed by testing)
PIB_ENGLISH = f"{PIB_BASE}/allRel.aspx?reg=3&lang=1"

# Months lookup for parsing article publish dates
_MONTH_MAP = {
    "january": 1, "february": 2, "march": 3, "april": 4,
    "may": 5, "june": 6, "july": 7, "august": 8,
    "september": 9, "october": 10, "november": 11, "december": 12,
}

def _extract_article_date(soup: BeautifulSoup) -> str | None:
    """
    Extract the publish date from a PIB article page.
    Returns ISO date string (YYYY-MM-DD) or None.
    PIB articles show the date as e.g. 'Posted On: 15 JAN 2025 5:13PM'
    or in the article header as '15 January 2025'.
    """
    text = soup.get_text(" ", strip=True)

    # Pattern 1: 'Posted On: 15 JAN 2025'
    m = re.search(
        r'Posted\s+On[:\s]+([\d]{1,2})\s+([A-Za-z]+)\s+(20\d\d)',
        text, re.I
    )
    if m:
        try:
            day = int(m.group(1))
            month = _MONTH_MAP.get(m.group(2).lower())
            year = int(m.group(3))
            if month:
                return date(year, month, day).isoformat()
        except Exception:
            pass

    # Pattern 2: Generic 'DD Month YYYY' in article body
    m2 = re.search(
        r'\b(\d{1,2})\s+(January|February|March|April|May|June|July|August'
        r'|September|October|November|December)\s+(20\d\d)\b',
        text, re.I
    )
    if m2:
        try:
            day = int(m2.group(1))
            month = _MONTH_MAP.get(m2.group(2).lower())
            year = int(m2.group(3))
            if month:
                return date(year, month, day).isoformat()
        except Exception:
            pass

    return None


def _serialize_form(soup: BeautifulSoup) -> dict:
    """
    Serialize ALL inputs and selects from the PIB form.
    Matches exactly what a browser sends - all 16 fields.
    """
    form = soup.find("form", id="form1") or soup
    data: dict[str, str] = {}

    for inp in form.find_all("input"):
        name = inp.get("name")
        typ  = (inp.get("type") or "text").lower()
        if not name or typ in {"submit", "button", "image", "reset", "file"}:
            continue
        if typ in {"checkbox", "radio"} and not inp.has_attr("checked"):
            continue
        data[name] = inp.get("value", "")

    for sel in form.find_all("select"):
        name = sel.get("name")
        if not name:
            continue
        selected = sel.find("option", selected=True) or sel.find("option")
        data[name] = selected.get("value", "") if selected else ""

    return data


def get_pib_releases_for_date(target_date: date, max_retries: int = 5) -> list[dict]:
    """
    Fetch English press releases from PIB for a specific date.

    Serializes the complete HTML form (all 16 fields) before POSTing,
    adds Referer header, and verifies the response actually shows the
    requested date in the dropdowns before accepting it.
    Retries with a fresh GET if the server returns the wrong date.

    Returns list of {title, url, date_iso}
    """
    date_iso  = target_date.isoformat()
    day_str   = str(target_date.day)
    month_str = str(target_date.month)
    year_str  = str(target_date.year)

    for attempt in range(1, max_retries + 1):
        session = requests.Session()
        session.headers.update(HEADERS)

        try:
            # Fresh GET on every attempt to get a clean viewstate
            resp = session.get(PIB_ENGLISH, timeout=20)
            resp.raise_for_status()
            soup = BeautifulSoup(resp.text, "html.parser")

            # Serialize ALL form fields (the complete 16-field set)
            form_data = _serialize_form(soup)

            # Override with the target date and the postback trigger
            form_data.update({
                "__EVENTTARGET":   "ctl00$ContentPlaceHolder1$ddlday",
                "__EVENTARGUMENT": "",
                "ctl00$ContentPlaceHolder1$ddlday":   day_str,
                "ctl00$ContentPlaceHolder1$ddlMonth": month_str,
                "ctl00$ContentPlaceHolder1$ddlYear":  year_str,
            })

            time.sleep(DELAY_BETWEEN_REQUESTS)
            post_resp = session.post(
                PIB_ENGLISH, data=form_data,
                headers={**HEADERS, "Referer": resp.url},
                timeout=30,
            )
            post_resp.raise_for_status()
            result_soup = BeautifulSoup(post_resp.text, "html.parser")

        except Exception as e:
            print(f"  [PIB] Request error (attempt {attempt}): {e}")
            time.sleep(2)
            continue

        # Verify the response actually reflects the target date
        def _selected(sel_name: str) -> str:
            sel = result_soup.find("select", {"name": sel_name})
            if not sel:
                return ""
            opt = sel.find("option", selected=True)
            return opt.get("value", "") if opt else ""

        got_day   = _selected("ctl00$ContentPlaceHolder1$ddlday")
        got_month = _selected("ctl00$ContentPlaceHolder1$ddlMonth")
        got_year  = _selected("ctl00$ContentPlaceHolder1$ddlYear")

        if got_day != day_str or got_month != month_str or got_year != year_str:
            print(f"  [PIB] Attempt {attempt}: server returned {got_day}/{got_month}/{got_year} "
                  f"instead of {day_str}/{month_str}/{year_str} - retrying...")
            time.sleep(2 + attempt * 2)  # Escalating delay: 4s, 6s, 8s, 10s, 12s
            continue

        # Date verified - extract release links
        releases: list[dict] = []
        seen_prids: set[str] = set()

        for link in result_soup.find_all("a", href=True):
            href = link["href"]
            if "PressReleasePage.aspx" not in href and "PressReleaseDetail.aspx" not in href and "PressReleseDetail.aspx" not in href:
                continue
            title = link.get_text(strip=True)
            if not title or len(title) < 10:
                continue

            full_url = href if href.startswith("http") else f"{PIB_BASE}/{href.lstrip('/')}"
            if "reg=" not in full_url:
                full_url += "&reg=3&lang=1"

            prid_match = re.search(r"PRID=(\d+)", full_url)
            prid = prid_match.group(1) if prid_match else full_url
            if prid in seen_prids:
                continue
            seen_prids.add(prid)

            releases.append({"title": title, "url": full_url, "date_iso": date_iso})

        print(f"  [PIB] {date_iso}: {len(releases)} releases (verified)")
        return releases

    print(f"  [PIB] All {max_retries} attempts failed for {date_iso} - skipping")
    return []


def get_pib_releases_via_rss(target_date: date) -> list[dict]:
    """
    Fallback: use PIB's RSS feed (most recent ~50 releases) if archive POST fails.
    Only useful for recent dates (last 2-3 weeks).
    """
    date_iso = target_date.isoformat()
    rss_url = f"{PIB_BASE}/RssMain.aspx?ModId=6&Lang=1&Regid=3"
    try:
        resp = requests.get(rss_url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        root = ET.fromstring(resp.content)
    except Exception as e:
        print(f"  [PIB-RSS] Error: {e}")
        return []

    releases = []
    for item in root.findall(".//item"):
        title = item.findtext("title", "").strip()
        link  = item.findtext("link", "").strip()
        raw_date = item.findtext("pubDate", "")
        pub_date = date.today().isoformat()
        for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"]:
            try:
                pub_date = datetime.strptime(raw_date.strip(), fmt).strftime("%Y-%m-%d")
                break
            except ValueError:
                continue

        if pub_date != date_iso:
            continue  # Only keep items from target date

        if title and link:
            releases.append({
                "title":    title,
                "url":      link,
                "ministry": "",
                "date_iso": date_iso,
            })

    return releases


# ---------------------------------------------------------------------------
# Article text extraction
# ---------------------------------------------------------------------------
def fetch_pib_article_text(url: str) -> tuple[str, str, str | None]:
    """
    Fetch and extract text + ministry + publish_date from a PIB press release page.
    Returns (article_text, ministry_name, date_iso_or_None).

    PIB has two article page types:
    - PressReleaseDetail.aspx  = listing/Hindi page (NO English body text)
    - PressReleasePage.aspx    = actual English article page (correct one to fetch)
    Always convert to PressReleasePage.aspx before fetching.
    """
    # ---- Convert Detail URL -> Page URL (English article) ----
    article_url = url.replace("PressReleaseDetail.aspx", "PressReleasePage.aspx")
    article_url = article_url.replace("PressReleseDetail.aspx", "PressReleasePage.aspx")

    try:
        resp = requests.get(article_url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        print(f"    [Fetch] Failed: {e}")
        return "", "", None

    try:
        soup = BeautifulSoup(resp.text, "html.parser")

        # Extract ministry name from PIB-specific elements
        ministry = ""
        ministry_candidates = [
            soup.find("div", class_=re.compile(r"ministry|dept|department", re.I)),
            soup.find("span", class_=re.compile(r"ministry|dept", re.I)),
            soup.find("td", class_=re.compile(r"ministry", re.I)),
        ]
        for mc in ministry_candidates:
            if mc:
                text = mc.get_text(strip=True)
                if text and len(text) < 100:
                    ministry = text
                    break

        # If no ministry found, look for it in breadcrumbs or meta
        if not ministry:
            breadcrumb = soup.find(class_=re.compile(r"breadcrumb", re.I))
            if breadcrumb:
                crumbs = breadcrumb.get_text(" > ", strip=True)
                ministry = crumbs.split(">")[-2].strip() if " > " in crumbs else ""

        # Extract real publish date before decomposing anything
        real_date = _extract_article_date(soup)

        # Remove noise elements (DO NOT include 'form' - PIB body is inside <form id="form1">)
        for tag in soup(["script", "style", "nav", "footer", "aside",
                         "iframe", "noscript", "header", "menu"]):
            tag.decompose()

        # Strategy 1: PIB PressReleasePage uses ContentPlaceHolder1_PNLrEL div
        pnl = soup.find(id="ContentPlaceHolder1_PNLrEL")
        if pnl:
            paras = pnl.find_all("p")
            text = "\n".join(p.get_text(strip=True) for p in paras if len(p.get_text(strip=True)) > 20)
            if text:
                if len(text) > 12000:
                    text = text[:12000] + "..."
                return text, ministry, real_date

        # Strategy 2: look for content div patterns
        content = (
            soup.find("div", id=re.compile(r"content|body|main", re.I))
            or soup.find("div", class_=re.compile(r"content|body|release|press", re.I))
            or soup.find("main")
            or soup.body
        )

        if not content:
            return "", ministry, real_date

        # Extract paragraphs
        paragraphs = content.find_all("p")
        text = "\n".join(p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20)

        if len(text) > 12000:
            text = text[:12000] + "..."

        return text, ministry, real_date

    except Exception as e:
        print(f"    [Parse] Error: {e}")
        return "", "", None



# ---------------------------------------------------------------------------
# Gemini extraction - reads real text, never generates
# ---------------------------------------------------------------------------
EXTRACT_PROMPT = """You are an exam-card extractor for TGPRB (Telangana Police Recruitment Board) exams.

You will receive the FULL TEXT of an official PIB (Press Information Bureau) press release.
Your job is to extract up to 3 distinct, testable exam facts from this text.

STRICT RULES:

STEP 1 - REJECT immediately (return null) if the release is:
- A tender, e-auction, procurement notice, or bid invitation
- A condolence or obituary message
- A ceremonial greeting (Republic Day, Independence Day wishes)
- A generic administrative circular with no specific fact
- A "Year End Review" or "achievements" compilation (too broad)
- A pure procedural government order with no testable fact
- A press conference notice or schedule announcement

STEP 2 - CHECK if this has a PYQ-proven testable fact. TGPRB exams test these categories (PYQ frequency rank):
  1. appointments     - Who was appointed as what post (Governors, Secretaries, DGs, CJI, judges, RBI Governor, ISRO chief)
  2. international    - India-linked summit outcomes, bilateral agreements, India's position in international bodies
  3. economy          - RBI repo rate, GDP figures, inflation data, index rankings, budget amounts
  4. awards           - Padma awards, Jnanpith, Nobel, Dronacharya, Arjuna, Khel Ratna - awardee + category + year
  5. sports           - Winner, medal, trophy, championship result - especially India/Telangana athletes
  6. telangana        - TG schemes, budgets, inaugurations, Telangana police facts, TG appointments
  7. schemes          - Scheme name, launch date, launch location, nodal ministry, key benefit
  8. defence          - Named exercise, missile system, new induction, decommission, DRDO achievement
  9. science          - ISRO mission name + vehicle + payload + date, DRDO tech, biotech milestones
  10. judiciary       - Supreme Court judgment, new High Court, commission appointment, NJAC-type events
  11. environment     - New national park, species discovery, cyclone name + state, UNESCO listing
  12. books           - Book title + author, literary award + awardee

If the release has NONE of the above clearly, return null.

STEP 3 - EXTRACT up to 3 MCQs. Rules:
- Each MCQ must test a DIFFERENT, INDEPENDENT fact. Do not create two questions that test the same relationship.
  BAD pair: "Who received the Arjuna Award?" + "What award did Anitha Rao receive?" (same fact, inverted)
  GOOD pair: "Who received the Arjuna Award?" + "What was the budget allocated for the scheme?"
- If the article has only one testable fact, return exactly 1 MCQ. Never pad with weak questions.
- For award lists: extract the 2-3 most important/famous awardees, not all of them.
- exam_fact per MCQ: One precise, cloze-ready sentence. Mirror TGPRB PYQ style:
    GOOD: "Tushar Mehta was appointed as Solicitor General of India on 30 June 2022."
    GOOD: "India's SSLV achieved its first successful launch in February 2023."
    BAD:  "The government has taken several steps to improve space technology." (too vague)
- difficulty: "F" if famous/easy (World Cup winner, PM-level), "M" if needs preparation, "O" if obscure (exact figure, committee head)
- exam_depth: "constable" if it tests direct recognition (winner, place, scheme name), "si" if it tests exact detail (report figure, portfolio match, commission tenure), "both" if fits both
- ANSWER POSITION: Place the correct answer at a RANDOM position (0, 1, 2, or 3). Do NOT always put it at index 0.
  Vary it across questions. Set "answer" to the index of the correct option.
- MCQ wrong options MUST be same TYPE as correct answer:
    If answer is a person's name -> wrong options = other plausible real names in same domain
    If answer is a country -> wrong options = other real countries
    If answer is a number/rank -> wrong options = nearby plausible numbers
    If answer is a state -> wrong options = other Indian states
    NEVER use generic filler like "None of the above" as an option
- extra_topics: list of NOTE-IDs this article is ALSO relevant to (beyond the primary category's default).
  Use the list below - these are ALL the topic pages that currently exist in the app.
  Match based on the article content:
{extra_topics_guidance}
- is_telangana_focus: true ONLY if the event is primarily about Telangana state/Hyderabad city

STRICT RULE: Extract facts ONLY from the provided text. NEVER generate or invent names, figures, or dates.

Press release text:
---
{article_text}
---

If testable facts found, return ONLY this JSON (no markdown fences, no extra text):
{{
  "summary": "2-3 sentences: what happened, why it matters for the exam.",
  "category": "appointments|international|economy|awards|sports|telangana|schemes|defence|science|judiciary|environment|books",
  "difficulty": "F|M|O",
  "exam_depth": "constable|si|both",
  "is_telangana_focus": false,
  "event_key": "VERB-NOUN-YEAR like ZAKIR-PADMA-VIB-2023 or SSLV-FIRST-LAUNCH-2023",
  "extra_topics": [],
  "mcqs": [
    {{
      "exam_fact": "One precise testable sentence from the actual text.",
      "question": "Short direct question?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": 2,
      "explanation": "One sentence from the article text confirming the correct answer."
    }}
  ]
}}

If no testable fact, return exactly: null"""


def extract_exam_fact(article_text: str, title: str, client,
                      extra_topics_guidance: str = "    - Otherwise leave as empty array []") -> dict | None:
    """
    Use Gemini to extract exam facts (up to 3 MCQs) from the real PIB article text.
    Gemini reads actual text and extracts - never generates.
    extra_topics_guidance: auto-built from discover_note_registry() at startup.
    """
    if not client or not article_text.strip():
        return None

    try:
        prompt = EXTRACT_PROMPT.format(
            article_text=article_text[:12000],
            extra_topics_guidance=extra_topics_guidance,
        )
        model_name = os.environ.get("GEMINI_MODEL", "gemini-2.5-flash")
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
            )
        except Exception:
            # Fallback to gemini-2.0-flash or gemini-1.5-flash for broader key compatibility
            try:
                response = client.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=prompt,
                )
            except Exception:
                response = client.models.generate_content(
                    model="gemini-1.5-flash",
                    contents=prompt,
                )
        text = response.text.strip()

        if text.lower() == "null" or not text or text == "{}":
            return None

        # Strip markdown code fences if present
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()

        ai = json.loads(text)

        # Backward compat: wrap legacy single mcq into mcqs array
        if "mcq" in ai and "mcqs" not in ai:
            legacy_mcq = ai.pop("mcq")
            legacy_mcq["exam_fact"] = ai.get("exam_fact", "")
            ai["mcqs"] = [legacy_mcq]

        # Validate mcqs array
        mcqs = ai.get("mcqs")
        if not mcqs or not isinstance(mcqs, list):
            return None

        # Validate each MCQ in the array
        valid_mcqs = []
        for mcq in mcqs[:3]:  # cap at 3
            if not isinstance(mcq, dict):
                continue
            if not mcq.get("question") or len(mcq.get("options", [])) != 4:
                continue
            if not mcq.get("exam_fact"):
                continue
            # Ensure answer index is valid
            answer = mcq.get("answer", 0)
            if not isinstance(answer, int) or answer < 0 or answer > 3:
                mcq["answer"] = 0
            valid_mcqs.append(mcq)

        if not valid_mcqs:
            return None

        ai["mcqs"] = valid_mcqs
        # Set top-level exam_fact from first MCQ for backward compat
        ai["exam_fact"] = valid_mcqs[0].get("exam_fact", "")

        # Validate category
        if ai.get("category") not in VALID_CATEGORIES:
            ai["category"] = DEFAULT_CATEGORY

        return ai

    except json.JSONDecodeError as e:
        print(f"    [AI] JSON parse error: {e}")
        return None
    except Exception as e:
        print(f"    [AI] Extract error: {e}")
        return None


# ---------------------------------------------------------------------------
# Output - write exam card markdown
# ---------------------------------------------------------------------------
def escape_yaml(text: str) -> str:
    if not text:
        return ""
    return text.replace("\\", "\\\\").replace('"', '\\"').replace("\n", " ").strip()


def make_slug(category: str, title: str, date_str: str) -> str:
    cat = re.sub(r"[^A-Z]", "", category.upper())[:3]
    slug = re.sub(r"[^A-Z0-9]+", "-", title.upper()[:25]).strip("-")
    return f"ca-{cat.lower()}-{slug.lower()}-{date_str.replace('-', '')}"


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


def write_exam_card(release: dict, ai: dict, ministry: str) -> Path | None:
    """Write a single exam card markdown file with up to 3 MCQs."""
    title = release["title"].strip()
    if not title or len(title) < 10:
        return None

    category = ai.get("category", DEFAULT_CATEGORY)
    note_ids = CATEGORY_NOTE_IDS.get(category, [])
    event_key = ai.get("event_key", "")

    # Merge extra_topics from AI response into note_ids
    extra = ai.get("extra_topics", [])
    if isinstance(extra, list):
        for t in extra:
            if t and t not in note_ids:
                note_ids.append(t)

    # Deduplication by event_key
    if event_key and event_key_exists(event_key):
        print(f"    [Skip] Duplicate event_key: {event_key}")
        return None

    # Always use PIB publication date - never trust Gemini's extracted event_date
    # (Gemini often pulls a date mentioned inside the article body, not the pub date)
    date_str = release["date_iso"]
    slug = make_slug(category, title, date_str)
    out_path = CONTENT_DIR / f"{slug}.md"

    if out_path.exists():
        return None

    item_id = f"CA-PIB-{slug.upper().replace('-', '_')[:40]}"
    related = "\n".join(f'  - "{t}"' for t in note_ids) if note_ids else '  - ""'

    is_tg = bool(ai.get("is_telangana_focus", False))
    difficulty  = ai.get("difficulty", "M")
    exam_depth  = ai.get("exam_depth", "both")

    # Build mcqs YAML block
    mcqs = ai.get("mcqs", [])
    mcqs_yaml_parts = []
    for mcq in mcqs:
        opts = "\n".join(f'      - "{escape_yaml(o)}"' for o in mcq.get("options", []))
        mcqs_yaml_parts.append(
            f'  - exam_fact: "{escape_yaml(mcq.get("exam_fact", ""))}"\n'
            f'    question: "{escape_yaml(mcq.get("question", ""))}"\n'
            f'    options:\n{opts}\n'
            f'    answer: {mcq.get("answer", 0)}\n'
            f'    explanation: "{escape_yaml(mcq.get("explanation", ""))}"'
        )
    mcqs_yaml = "\n".join(mcqs_yaml_parts)

    # Top-level exam_fact from first MCQ for backward compat
    top_exam_fact = escape_yaml(mcqs[0].get("exam_fact", "")) if mcqs else ""

    content = f"""---
id: "{item_id}"
type: "current_affair"
category: "{category}"
exam_section: "{_category_to_section(category)}"
topic: "{_category_to_topic(category)}"
related_topic_ids:
{related}
is_telangana_focus: {"true" if is_tg else "false"}
difficulty: "{difficulty}"
exam_depth: "{exam_depth}"
headline: "{escape_yaml(title)}"
exam_fact: "{top_exam_fact}"
summary: "{escape_yaml(ai.get('summary', ''))}"
event_date: "{date_str}"
published_at: "{release['date_iso']}"
date: "{release['date_iso']}"
source_name: "PIB"
source_type: "official"
ministry: "{escape_yaml(ministry or '')}"
canonical_source_url: "{release['url']}"
source_url: "{release['url']}"
event_key: "{escape_yaml(event_key)}"
mcqs:
{mcqs_yaml}
---
"""
    CONTENT_DIR.mkdir(parents=True, exist_ok=True)
    out_path.write_text(content, encoding="utf-8")
    return out_path


def _category_to_section(category: str) -> str:
    return {
        "appointments": "Polity",
        "international": "Polity",
        "economy": "Economy",
        "awards": "General Knowledge",
        "sports": "General Knowledge",
        "telangana": "Telangana",
        "schemes": "Polity",
        "defence": "General Knowledge",
        "science": "Science & Technology",
        "judiciary": "Polity",
        "environment": "Geography",
        "books": "General Knowledge",
    }.get(category, "General Knowledge")


def _category_to_topic(category: str) -> str:
    return {
        "appointments": "Appointments and Office-Holders",
        "international": "International Affairs",
        "economy": "Indian Economy",
        "awards": "Awards and Honours",
        "sports": "Sports Results",
        "telangana": "Telangana State",
        "schemes": "Government Schemes",
        "defence": "Defence and Security",
        "science": "Science and Space",
        "judiciary": "Judiciary and Law",
        "environment": "Environment",
        "books": "Books and Literary Events",
    }.get(category, "General Knowledge")


# ---------------------------------------------------------------------------
# Main scraping loop
# ---------------------------------------------------------------------------
def infer_category_from_ministry(ministry: str) -> str:
    """Map ministry name to PYQ category."""
    if not ministry:
        return DEFAULT_CATEGORY
    ministry_lower = ministry.lower()
    for key, cat in MINISTRY_CATEGORY_MAP.items():
        if key.lower() in ministry_lower or ministry_lower in key.lower():
            return cat
    # Keyword fallbacks
    if any(w in ministry_lower for w in ["defence", "army", "navy", "air force", "drdo"]):
        return "defence"
    if any(w in ministry_lower for w in ["space", "isro", "science", "technology"]):
        return "science"
    if any(w in ministry_lower for w in ["finance", "economic", "rbi", "sebi"]):
        return "economy"
    if any(w in ministry_lower for w in ["external", "mea", "foreign"]):
        return "international"
    if any(w in ministry_lower for w in ["culture", "award", "sport", "youth"]):
        return "awards"
    if any(w in ministry_lower for w in ["law", "justice", "court"]):
        return "judiciary"
    if any(w in ministry_lower for w in ["environment", "forest", "wildlife"]):
        return "environment"
    return DEFAULT_CATEGORY


def scrape_date_range(from_date: date, to_date: date, dry_run: bool = False,
                      max_per_day: int = 30) -> dict:
    """
    Scrape PIB press releases for every date in [from_date, to_date].

    Uses ASP.NET Web Forms POST (ddlday trigger) to fetch historical dates.
    Each day is fetched independently with a fresh session.
    """
    # Auto-discover all NOTE-IDs from pages/notes/**/*.vue
    note_registry = discover_note_registry()
    apply_registry_to_category_note_ids(note_registry)
    extra_topics_guidance = build_dynamic_prompt_section(note_registry)
    print(f"[Registry] Found {len(note_registry)} topic pages: {', '.join(sorted(note_registry.keys()))}")

    client = get_gemini_client()
    if not client and not dry_run:
        print("[WARN] No Gemini client. Run with --dry-run or set GEMINI_API_KEY.")

    stats = {"days": 0, "releases_found": 0, "ai_extracted": 0, "saved": 0, "skipped": 0}
    current = from_date

    while current <= to_date:
        print(f"\n[{current}] Fetching PIB releases...")

        releases = get_pib_releases_for_date(current)

        # Fallback to RSS if archive POST returned 0 (e.g. holiday, today's page not yet updated)
        if not releases:
            print(f"  [PIB] Archive returned 0 for {current} - trying RSS fallback...")
            rss_releases = get_pib_releases_via_rss(current)
            if rss_releases:
                print(f"  [PIB-RSS] Found {len(rss_releases)} releases via RSS for {current}")
                releases = rss_releases
            else:
                # Last resort: if today/yesterday, try the day after (PIB sometimes posts
                # next-day for holidays/Independence Day)
                next_day = current + timedelta(days=1)
                if next_day <= date.today():
                    print(f"  [PIB] Trying adjacent date {next_day} (holiday shift)...")
                    alt_releases = get_pib_releases_for_date(next_day)
                    if alt_releases:
                        # Re-tag them with the originally requested date
                        for r in alt_releases:
                            r["date_iso"] = current.isoformat()
                        releases = alt_releases
                        print(f"  [PIB] Found {len(releases)} releases on adjacent date - accepted")

        print(f"  Found {len(releases)} releases")
        stats["days"] += 1
        stats["releases_found"] += len(releases)

        if dry_run:
            for r in releases[:5]:
                print(f"    [DRY] {r['title'][:70]}")
            current += timedelta(days=1)
            continue

        saved_today = 0
        for release in releases[:max_per_day]:
            title = release["title"]
            print(f"  -> {title[:65]}...")

            article_text, ministry, real_date = fetch_pib_article_text(release["url"])
            time.sleep(DELAY_BETWEEN_REQUESTS)

            if not article_text:
                print(f"     [Skip] No article text")
                stats["skipped"] += 1
                continue

            # Use real publish date from the article page
            if real_date:
                release["date_iso"] = real_date

            if not ministry and release.get("ministry"):
                ministry = release["ministry"]

            category = infer_category_from_ministry(ministry)

            if client:
                ai = extract_exam_fact(article_text, title, client,
                                       extra_topics_guidance=extra_topics_guidance)
            else:
                ai = None

            if not ai:
                print(f"     [Skip] No testable exam fact")
                stats["skipped"] += 1
                continue

            if ai.get("category") in VALID_CATEGORIES:
                category = ai["category"]
            else:
                ai["category"] = category

            path = write_exam_card(release, ai, ministry)
            if path:
                print(f"     [SAVED] {path.name}")
                print(f"             Fact: {ai['exam_fact'][:80]}")
                stats["saved"] += 1
                saved_today += 1
                stats["ai_extracted"] += 1
            else:
                stats["skipped"] += 1

            time.sleep(DELAY_BETWEEN_REQUESTS)

        print(f"  Day done: {saved_today} cards saved")
        current += timedelta(days=1)
        time.sleep(2)  # polite pause between days

    return stats


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="PIB Archive Scraper for TGPRB exam cards")
    parser.add_argument("--from",  dest="from_date", default="2025-01-01",
                        help="Start date YYYY-MM-DD (default: 2025-01-01)")
    parser.add_argument("--to",    dest="to_date",   default=date.today().isoformat(),
                        help="End date YYYY-MM-DD (default: today)")
    parser.add_argument("--ministry", default="",
                        help="Filter by ministry name (optional)")
    parser.add_argument("--max-per-day", type=int, default=30,
                        help="Max releases to process per day (default: 30)")
    parser.add_argument("--dry-run", action="store_true",
                        help="List releases without fetching articles or calling AI")
    args = parser.parse_args()

    from_date = datetime.strptime(args.from_date, "%Y-%m-%d").date()
    to_date   = datetime.strptime(args.to_date,   "%Y-%m-%d").date()
    total_days = (to_date - from_date).days + 1

    print("=" * 60)
    print("PIB Archive Scraper - TGPRB Exam Card Builder")
    print("=" * 60)
    print(f"Date range : {from_date} to {to_date} ({total_days} days)")
    print(f"Max/day    : {args.max_per_day}")
    print(f"Dry run    : {args.dry_run}")
    print(f"Output dir : {CONTENT_DIR.resolve()}")
    print("=" * 60)

    if not args.dry_run and not (GEMINI_API_KEY or GCP_CREDS or GCP_PROJECT):
        print("\n[ERROR] No Gemini credentials found.")
        print("Set GEMINI_API_KEY for local runs or ensure GCP secrets are set.")
        print("Use --dry-run to test without AI.")
        sys.exit(1)

    stats = scrape_date_range(from_date, to_date, args.dry_run, args.max_per_day)

    print("\n" + "=" * 60)
    print("DONE")
    print(f"  Days processed     : {stats['days']}")
    print(f"  Releases found     : {stats['releases_found']}")
    print(f"  Exam cards saved   : {stats['saved']}")
    print(f"  Skipped (no fact)  : {stats['skipped']}")
    print("=" * 60)


if __name__ == "__main__":
    main()
