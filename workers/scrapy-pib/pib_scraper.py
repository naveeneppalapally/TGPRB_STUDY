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
PIB_BASE    = "https://pib.gov.in"
# ?reg=3&lang=1 = English language releases (confirmed by testing)
PIB_ENGLISH = f"{PIB_BASE}/allRel.aspx?reg=3&lang=1"

def get_pib_releases_for_date(target_date: date) -> list[dict]:
    """
    Fetch all English press releases from PIB for a specific date.
    Uses ?reg=3&lang=1 to get English-language releases (verified by testing).
    Returns list of {title, url, ministry, date_iso}
    """
    date_str = target_date.strftime("%d/%m/%Y")
    date_iso = target_date.isoformat()

    try:
        # GET the English page first to obtain ASP.NET form tokens
        resp = requests.get(PIB_ENGLISH, headers=HEADERS, timeout=20)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "html.parser")

        def _val(id_: str) -> str:
            el = soup.find("input", {"id": id_})
            return el.get("value", "") if el else ""

        # POST with date range + English lang field
        form_data = {
            "__VIEWSTATE":          _val("__VIEWSTATE"),
            "__VIEWSTATEGENERATOR": _val("__VIEWSTATEGENERATOR"),
            "__EVENTVALIDATION":    _val("__EVENTVALIDATION"),
            "__EVENTTARGET":        "",
            "__EVENTARGUMENT":      "",
            # Language: 1 = English (confirmed from <select id='Bar1_ddlLang'>)
            "ctl00$Bar1$ddlLang":                         "1",
            "ctl00$ContentPlaceHolder1$txtsdate":         date_str,
            "ctl00$ContentPlaceHolder1$txtedate":         date_str,
            "ctl00$ContentPlaceHolder1$ddlMinistry":      "0",
            "ctl00$ContentPlaceHolder1$ddlstate":         "0",
            "ctl00$ContentPlaceHolder1$Button1":          "Submit",
        }

        time.sleep(DELAY_BETWEEN_REQUESTS)
        post_resp = requests.post(PIB_ENGLISH, data=form_data, headers=HEADERS, timeout=30)
        post_resp.raise_for_status()
        result_soup = BeautifulSoup(post_resp.text, "html.parser")

    except Exception as e:
        print(f"  [PIB] Listing page error for {date_iso}: {e}")
        return []

    # Extract press release links from the results table
    releases = []
    # PIB results are typically in a table or div with links to PressReleasePage.aspx
    for link in result_soup.find_all("a", href=True):
        href = link["href"]
        if "PressReleasePage.aspx" in href or "PressReleseDetail.aspx" in href:
            title = link.get_text(strip=True)
            if not title or len(title) < 10:
                continue
            full_url = href if href.startswith("http") else f"{PIB_BASE}/{href.lstrip('/')}"
            # Try to find the ministry from surrounding context
            ministry = ""
            parent = link.find_parent("td") or link.find_parent("div") or link.find_parent("li")
            if parent:
                prev = parent.find_previous_sibling()
                if prev:
                    ministry = prev.get_text(strip=True)[:80]
            releases.append({
                "title":    title,
                "url":      full_url,
                "ministry": ministry,
                "date_iso": date_iso,
            })

    return releases


def get_pib_releases_via_rss(target_date: date) -> list[dict]:
    """
    Fallback: use PIB's RSS feed (most recent ~50 releases) if archive POST fails.
    Only useful for recent dates (last 2-3 weeks).
    """
    date_iso = target_date.isoformat()
    rss_url = f"{PIB_BASE}/rss.aspx"
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
def fetch_pib_article_text(url: str) -> tuple[str, str]:
    """
    Fetch and extract text + ministry from a PIB press release page.
    Returns (article_text, ministry_name).

    PIB article pages have a clear structure:
    - Title in h2 or strong
    - Ministry name in a specific div
    - Body text in paragraphs
    """
    try:
        resp = requests.get(url, headers=HEADERS, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        print(f"    [Fetch] Failed: {e}")
        return "", ""

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

        # Remove noise elements
        for tag in soup(["script", "style", "nav", "footer", "aside",
                         "iframe", "noscript", "form", "header", "menu"]):
            tag.decompose()

        # PIB articles are usually in the main content div
        content = (
            soup.find("div", id=re.compile(r"content|body|main", re.I))
            or soup.find("div", class_=re.compile(r"content|body|release|press", re.I))
            or soup.find("main")
            or soup.body
        )

        if not content:
            return "", ministry

        # Extract paragraphs - PIB body text is well-structured
        paragraphs = content.find_all("p")
        text = "\n".join(p.get_text(strip=True) for p in paragraphs if len(p.get_text(strip=True)) > 20)

        # Cap at 4000 chars - PIB releases can be long
        if len(text) > 4000:
            text = text[:4000] + "..."

        return text, ministry

    except Exception as e:
        print(f"    [Parse] Error: {e}")
        return "", ""


# ---------------------------------------------------------------------------
# Gemini extraction - reads real text, never generates
# ---------------------------------------------------------------------------
EXTRACT_PROMPT = """You are an exam-card extractor for TGPRB (Telangana Police Recruitment Board) exams.

You will receive the FULL TEXT of an official PIB (Press Information Bureau) press release.
Your job is to extract one testable exam fact from this actual text.

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

STEP 3 - EXTRACT one card. Rules:
- exam_fact: One precise, cloze-ready sentence. Mirror TGPRB PYQ style:
    GOOD: "Tushar Mehta was appointed as Solicitor General of India on 30 June 2022."
    GOOD: "India's Small Satellite Launch Vehicle (SSLV) achieved its first successful launch in February 2023."
    GOOD: "Zakir Hussain was awarded the Padma Vibhushan in 2023 in the field of Art."
    BAD:  "The government has taken several steps to improve space technology." (too vague)
- difficulty: "F" if famous/easy (World Cup winner, PM-level), "M" if needs preparation, "O" if obscure (exact figure, committee head)
- exam_depth: "constable" if it tests direct recognition (winner, place, scheme name), "si" if it tests exact detail (report figure, portfolio match, commission tenure), "both" if fits both
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

If testable fact found, return ONLY this JSON (no markdown fences, no extra text):
{{
  "exam_fact": "One precise testable sentence from the actual text.",
  "summary": "2-3 sentences: what happened, why it matters for the exam, what TGPRB typically asks from this type of event.",
  "event_date": "YYYY-MM-DD",
  "category": "appointments|international|economy|awards|sports|telangana|schemes|defence|science|judiciary|environment|books",
  "difficulty": "F|M|O",
  "exam_depth": "constable|si|both",
  "is_telangana_focus": false,
  "event_key": "VERB-NOUN-YEAR like ZAKIR-PADMA-VIB-2023 or SSLV-FIRST-LAUNCH-2023 or TUSHAR-SG-2022",
  "extra_topics": [],
  "mcq": {{
    "question": "Short direct question. E.g.: 'Who was awarded the Padma Vibhushan in 2023 in the field of Art?'",
    "options": ["Correct answer (always index 0)", "Plausible wrong - same type", "Plausible wrong - same type", "Plausible wrong - same type"],
    "answer": 0,
    "explanation": "One sentence from the article text confirming the correct answer."
  }}
}}

If no testable fact, return exactly: null"""


def extract_exam_fact(article_text: str, title: str, client,
                      extra_topics_guidance: str = "    - Otherwise leave as empty array []") -> dict | None:
    """
    Use Gemini to extract an exam fact from the real PIB article text.
    Gemini reads actual text and extracts - never generates.
    extra_topics_guidance: auto-built from discover_note_registry() at startup.
    """
    if not client or not article_text.strip():
        return None

    try:
        prompt = EXTRACT_PROMPT.format(
            article_text=article_text[:4000],
            extra_topics_guidance=extra_topics_guidance,
        )
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        text = response.text.strip()

        if text.lower() == "null" or not text or text == "{}":
            return None

        # Strip markdown code fences if present
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()

        ai = json.loads(text)

        # Validate required fields
        if not ai.get("exam_fact") or not ai.get("mcq"):
            return None

        mcq = ai.get("mcq", {})
        if not isinstance(mcq, dict) or len(mcq.get("options", [])) != 4:
            return None

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
    """Write a single exam card markdown file."""
    title = release["title"].strip()
    if not title or len(title) < 10:
        return None

    category = ai.get("category", DEFAULT_CATEGORY)
    note_ids = CATEGORY_NOTE_IDS.get(category, [])
    event_key = ai.get("event_key", "")

    # Deduplication by event_key
    if event_key and event_key_exists(event_key):
        print(f"    [Skip] Duplicate event_key: {event_key}")
        return None

    date_str = ai.get("event_date") or release["date_iso"]
    slug = make_slug(category, title, date_str)
    out_path = CONTENT_DIR / f"{slug}.md"

    if out_path.exists():
        return None

    item_id = f"CA-PIB-{slug.upper().replace('-', '_')[:40]}"
    related = "\n".join(f'  - "{t}"' for t in note_ids) if note_ids else '  - ""'

    mcq = ai.get("mcq", {})
    mcq_options = "\n".join(
        f'    - "{escape_yaml(opt)}"' for opt in mcq.get("options", [])
    )
    is_tg = bool(ai.get("is_telangana_focus", False))

    difficulty  = ai.get("difficulty", "M")
    exam_depth  = ai.get("exam_depth", "both")

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
exam_fact: "{escape_yaml(ai.get('exam_fact', ''))}"
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
mcq:
  question: "{escape_yaml(mcq.get('question', ''))}"
  options:
{mcq_options}
  answer: {mcq.get('answer', 0)}
  explanation: "{escape_yaml(mcq.get('explanation', ''))}"
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
    Scrape PIB press releases for every date in range.
    Returns stats: {total_fetched, total_saved, total_skipped}
    """
    # ── Auto-discover all NOTE-IDs from pages/notes/**/*.vue ──────────────
    # Every topic the AI builds gets picked up here automatically.
    # No manual editing of pib_scraper.py needed when a new topic is added.
    note_registry = discover_note_registry()
    apply_registry_to_category_note_ids(note_registry)
    extra_topics_guidance = build_dynamic_prompt_section(note_registry)

    print(f"[Registry] Found {len(note_registry)} topic pages: {', '.join(sorted(note_registry.keys()))}")
    # ─────────────────────────────────────────────────────────────────────

    client = get_gemini_client()
    if not client and not dry_run:
        print("[WARN] No Gemini client. Run with --dry-run or set GEMINI_API_KEY.")
        print("       Without AI, no exam facts will be extracted.")

    stats = {"days": 0, "releases_found": 0, "ai_extracted": 0, "saved": 0, "skipped": 0}
    current = from_date

    while current <= to_date:
        print(f"\n[{current}] Fetching PIB releases...")

        # Try archive page first, fall back to RSS for recent dates
        releases = get_pib_releases_for_date(current)
        if not releases:
            # Fallback to RSS for recent dates (last 30 days)
            if (date.today() - current).days <= 30:
                print(f"  Archive returned 0 - trying RSS fallback...")
                releases = get_pib_releases_via_rss(current)

        print(f"  Found {len(releases)} releases")
        stats["days"] += 1
        stats["releases_found"] += len(releases)

        if dry_run:
            for r in releases[:5]:
                print(f"    [DRY] {r['title'][:70]}")
            current += timedelta(days=1)
            continue

        # Process up to max_per_day releases
        saved_today = 0
        for release in releases[:max_per_day]:
            title = release["title"]
            print(f"  -> {title[:65]}...")

            # Fetch full article text from PIB
            article_text, ministry = fetch_pib_article_text(release["url"])
            time.sleep(DELAY_BETWEEN_REQUESTS)

            if not article_text:
                print(f"     [Skip] No article text")
                stats["skipped"] += 1
                continue

            if not ministry and release.get("ministry"):
                ministry = release["ministry"]

            # Infer category from ministry
            category = infer_category_from_ministry(ministry)

            # Extract exam fact via Gemini (extraction only, not generation)
            if client:
                ai = extract_exam_fact(article_text, title, client,
                                       extra_topics_guidance=extra_topics_guidance)
            else:
                ai = None

            if not ai:
                print(f"     [Skip] No testable exam fact")
                stats["skipped"] += 1
                continue

            # Override category from ministry if AI picked a different one
            if ai.get("category") in VALID_CATEGORIES:
                category = ai["category"]
            else:
                ai["category"] = category

            # Write the exam card
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
        # Slightly longer pause between days to avoid overloading PIB
        time.sleep(2)

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
