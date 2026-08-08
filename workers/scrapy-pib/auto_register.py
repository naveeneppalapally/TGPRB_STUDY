"""
TGPRB Auto-Register New Topics
─────────────────────────────────────────────────────────────────────────────
Runs automatically in GitHub Actions on every push.

1. Scans all .vue files for CurrentAffairsStrip note-id="NOTE-*"
2. Reads current TOPIC_FEEDS from scraper.py
3. Finds NOTE IDs used in pages but missing from TOPIC_FEEDS
4. Uses Gemini 3.6 Flash to generate search keywords for each new topic
5. Injects the new TOPIC_FEEDS entries into scraper.py
6. Runs backfill.py for each new topic (Jan 2025 to today)

Usage (called by GitHub Actions, not manually):
  python3 workers/scrapy-pib/auto_register.py
"""

import os
import re
import json
import subprocess
import tempfile
from pathlib import Path

GCP_PROJECT  = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS    = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")

SCRAPER_PATH = Path("workers/scrapy-pib/scraper.py")
PAGES_DIR    = Path("pages")

# NOTE ID -> section code mapping
SECTION_MAP = {
    "GEO": "Geography",
    "POL": "Polity",
    "ECO": "Economy",
    "TEL": "Telangana",
    "SCI": "Science & Technology",
    "HIS": "History",
    "ARI": "Arithmetic",
}


# ── Step 1: Scan .vue files for NOTE IDs ─────────────────────────────────────

def find_note_ids_in_pages() -> dict[str, str]:
    """
    Returns dict of {note_id: vue_file_path} for all CurrentAffairsStrip usages.
    """
    pattern = re.compile(r'CurrentAffairsStrip[^>]+note-id=["\']([^"\']+)["\']')
    found = {}
    for vue_file in PAGES_DIR.rglob("*.vue"):
        content = vue_file.read_text(encoding="utf-8", errors="ignore")
        for match in pattern.finditer(content):
            note_id = match.group(1).strip()
            if note_id.startswith("NOTE-"):
                found[note_id] = str(vue_file)
    return found


# ── Step 2: Read current TOPIC_FEEDS from scraper.py ─────────────────────────

def find_registered_note_ids() -> set[str]:
    """
    Parse TOPIC_FEEDS in scraper.py and return all registered NOTE IDs.
    """
    content = SCRAPER_PATH.read_text(encoding="utf-8")
    # Find all related_topic_ids lists
    found = set(re.findall(r'"(NOTE-[A-Z0-9-]+)"', content))
    return found


# ── Step 3: Use Gemini to generate feed config for a new NOTE ID ─────────────

def get_vertex_client():
    if not GCP_CREDS or not GCP_PROJECT:
        return None
    try:
        creds_data = json.loads(GCP_CREDS)
        tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
        json.dump(creds_data, tmp)
        tmp.flush()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
        from google import genai
        return genai.Client(vertexai=True, project=GCP_PROJECT, location="us-central1")
    except Exception as e:
        print(f"  [Gemini] Init error: {e}")
        return None


def generate_feed_config(note_id: str, vue_path: str, client) -> dict | None:
    """
    Ask Gemini to generate topic name, section, and RSS search keywords
    for a given NOTE ID based on its ID and the page it's used in.
    """
    # Read the vue file to give Gemini context
    try:
        page_content = Path(vue_path).read_text(encoding="utf-8")[:2000]
    except Exception:
        page_content = ""

    # Parse section from NOTE ID
    parts = note_id.split("-")  # ['NOTE', 'GEO', 'FORESTS']
    section_code = parts[1] if len(parts) > 1 else "GEO"
    section = SECTION_MAP.get(section_code, "Geography")

    prompt = f"""You are configuring a Google News RSS scraper for TGPRB/TSPSC exam preparation (Telangana Police Constable & SI exams).

Note ID: {note_id}
Section: {section}
Page file path: {vue_path}

Page content (first 2000 chars):
{page_content}

Based on the Note ID and page content, generate a Google News RSS feed configuration.

Reply ONLY with a JSON object:
{{
  "topic_name": "Human readable topic name (e.g. Forests of India)",
  "keywords": "space separated Google News search keywords (4-8 words relevant for TGPRB exam, India-specific)",
  "extra_site_filters": "optional: site:thehindu.com OR site:pib.gov.in (leave empty string if not needed)"
}}

Focus on keywords that will return exam-relevant news (government schemes, official reports, scientific facts, policy changes).
Do NOT include coaching sites in keywords."""

    try:
        resp = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )
        text = resp.text.strip()
        if "```" in text:
            text = re.sub(r"^```(?:json)?|```$", "", text, flags=re.MULTILINE).strip()
        return json.loads(text)
    except Exception as e:
        print(f"  [Gemini] Config generation error for {note_id}: {e}")
        return None


# ── Step 4: Inject new TOPIC_FEEDS entry into scraper.py ─────────────────────

def inject_topic_feed(note_id: str, config: dict, section: str) -> bool:
    """
    Adds a new entry to TOPIC_FEEDS list in scraper.py.
    """
    content = SCRAPER_PATH.read_text(encoding="utf-8")

    # Build the new feed entry
    keywords = "+".join(config["keywords"].split())
    extra    = config.get("extra_site_filters", "").strip()
    query    = f"{keywords}+{'+'.join(extra.split())}" if extra else keywords

    new_entry = f"""    {{
        "url": "https://news.google.com/rss/search?q={query}&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "{section}",
        "topic": "{config['topic_name']}",
        "related_topic_ids": ["{note_id}"],
    }},"""

    # Find the end of TOPIC_FEEDS list and inject before closing ]
    marker = "]\n\n\n# ── Helpers"
    if marker not in content:
        # Try alternate marker
        marker = "]\n\n# ── Helpers"
    if marker not in content:
        print(f"  [Inject] Could not find TOPIC_FEEDS end marker in scraper.py")
        return False

    updated = content.replace(marker, f"\n{new_entry}\n{marker}", 1)
    SCRAPER_PATH.write_text(updated, encoding="utf-8")
    print(f"  [Inject] Added {note_id} to TOPIC_FEEDS")
    return True


# ── Step 5: Run backfill for new topic ────────────────────────────────────────

def run_backfill(note_id: str, config: dict, section: str):
    """Run backfill.py for the new topic from Jan 2025 to today."""
    cmd = [
        "python3", "workers/scrapy-pib/backfill.py",
        "--topic",    config["topic_name"],
        "--note-id",  note_id,
        "--section",  section,
        "--keywords", config["keywords"],
        "--from",     "2025-01-01",
    ]
    print(f"  [Backfill] Running: {' '.join(cmd)}")
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=300)
        print(result.stdout[-1000:] if result.stdout else "(no output)")
        if result.returncode != 0:
            print(f"  [Backfill] Error: {result.stderr[-500:]}")
    except subprocess.TimeoutExpired:
        print(f"  [Backfill] Timeout for {note_id}")
    except Exception as e:
        print(f"  [Backfill] Failed: {e}")


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("Auto-registering new topics...\n")

    # Find all NOTE IDs used in pages
    page_ids = find_note_ids_in_pages()
    print(f"Found {len(page_ids)} NOTE IDs in pages:")
    for nid, path in page_ids.items():
        print(f"  {nid} <- {path}")

    # Find already-registered IDs
    registered = find_registered_note_ids()
    print(f"\nAlready in TOPIC_FEEDS: {len(registered)}")

    # Find gaps
    new_ids = {nid: path for nid, path in page_ids.items() if nid not in registered}

    if not new_ids:
        print("\nNo new topics to register. All up to date.")
        return

    print(f"\nNew topics to register: {len(new_ids)}")
    for nid in new_ids:
        print(f"  + {nid}")

    # Init Gemini
    client = get_vertex_client()
    if not client:
        print("\n[Warning] Gemini not configured. Skipping auto-registration.")
        print("Manually add missing topics to TOPIC_FEEDS in workers/scrapy-pib/scraper.py")
        return

    for note_id, vue_path in new_ids.items():
        print(f"\n--- Registering {note_id} ---")

        parts = note_id.split("-")
        section_code = parts[1] if len(parts) > 1 else "GEO"
        section = SECTION_MAP.get(section_code, "Geography")

        # Generate feed config via Gemini
        config = generate_feed_config(note_id, vue_path, client)
        if not config:
            print(f"  Skipping {note_id} - could not generate config")
            continue

        print(f"  Topic:    {config['topic_name']}")
        print(f"  Keywords: {config['keywords']}")

        # Inject into scraper.py
        ok = inject_topic_feed(note_id, config, section)
        if not ok:
            continue

        # Run historical backfill
        run_backfill(note_id, config, section)

    print("\nDone. Commit scraper.py + content/current-affairs/ changes.")


if __name__ == "__main__":
    main()
