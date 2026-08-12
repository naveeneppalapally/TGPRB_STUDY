import os
import sys
import json
import sqlite3
import re
from datetime import datetime, UTC
from typing import List, Optional
from pydantic import BaseModel, Field

# Ensure imports work
sys.path.insert(0, os.path.abspath('.'))

from scripts.pyq_pipeline.run_pipeline import load_env, get_client
from google.genai import types

DB_PATH = 'workers/scrapy-pib/pib_master_2025_2026.db'
MANIFEST_PATH = 'data/pib_scored_manifest.json'
OUTPUT_DIR = 'content/current-affairs'

os.makedirs(OUTPUT_DIR, exist_ok=True)

class MCQSchema(BaseModel):
    question: str = Field(description="Exact exam-style question in who/what/where/which format")
    options: List[str] = Field(description="Exactly 4 plausible options", min_length=4, max_length=4)
    answer: int = Field(description="Zero-indexed correct option index (0 to 3)", ge=0, le=3)
    explanation: str = Field(description="Clear 1-2 sentence explanation of why the answer is correct based on the text")

class CACardSchema(BaseModel):
    is_exam_relevant: bool = Field(description="True if article contains a specific testable fact for competitive exams, False if routine news")
    category: str = Field(description="One of: appointments, international, economy, awards, sports, telangana, schemes, defence, judiciary, science, books, environment")
    exam_section: str = Field(description="One of: Polity, Geography, Economy, General Studies, Science & Technology, Telangana")
    topic: str = Field(description="Short, specific topic title")
    related_topic_ids: List[str] = Field(default=[], description="Matching note IDs e.g. NOTE-GEO-ENVIRONMENT, NOTE-POL-PARLIAMENT, NOTE-TEL-CULTURE")
    is_telangana_focus: bool = Field(description="True if article specifically mentions Telangana state, Hyderabad, or state initiatives")
    difficulty: str = Field(description="F for Famous/Easy, M for Medium, O for Obscure/Hard")
    headline: str = Field(description="One-sentence clear summary headline")
    exam_fact: str = Field(description="The single most pinpoint, testable fact from the release")
    summary: str = Field(description="2-3 sentence background context for students")
    mcqs: List[MCQSchema] = Field(description="1 to 2 exam-ready MCQs derived from the text", min_length=1)

EXTRACTION_SYSTEM_PROMPT = """
You are the Chief Psychometrician and Current Affairs Content Director for TSLPRB StudyOS (Telangana Police Constable & SI Exams).

Your job is to read an official government press release and determine if it contains an EXAM-TESTABLE FACT for competitive exams.

CRITICAL RULES:
1. Rejection: If the release is a routine speech, tender notice, administrative greeting, or vague announcement with NO specific testable fact (no specific name, rank, index, scheme benefit, venue, or budget figure), set `is_exam_relevant: false`.
2. Exam Fact: Must be a single pinpoint statement containing the exact testable figure, name, location, or parameter.
3. Category: Must be strictly one of: appointments, international, economy, awards, sports, telangana, schemes, defence, judiciary, science, books, environment.
4. Exam Section: Must be strictly one of: Polity, Geography, Economy, General Studies, Science & Technology, Telangana.
5. Telangana Focus: Set `is_telangana_focus: true` ONLY if Telangana, Hyderabad, Warangal, TG police, TG budget, or a Telangana state initiative is CENTRAL to the exam_fact/headline itself (the event happened in or is about Telangana). A passing mention of Telangana as one of several states in a list, or a Telangana official merely attending a national event, does NOT qualify. Set false in those cases.
6. MCQ:
   - Question must follow real TGPRB style (who, which, where, what rank, match).
   - Options MUST be 4 distinct, plausible options.
   - Answer index (0-3) must be the exact correct option.
   - Explanation must cite the fact from the text.
7. NO EM-DASHES (—). Use hyphens (-) or colons (:).
"""

def fetch_full_article(prid: int) -> Optional[dict]:
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT prid, title, pub_date, ministry, office, full_text, url FROM articles WHERE prid = ?', (prid,))
    row = c.fetchone()
    conn.close()
    if row:
        return {
            'prid': row[0], 'title': row[1], 'pub_date': row[2],
            'ministry': row[3], 'office': row[4], 'full_text': row[5], 'url': row[6]
        }
    return None

def write_ca_markdown(card_data: dict, full_art: dict) -> str:
    cat_upper = card_data['category'].upper()
    slug_title = re.sub(r'[^a-zA-Z0-9]+', '-', full_art['title'][:40]).strip('-').upper()
    date_str = full_art['pub_date'].replace('-', '')
    card_id = f"CA-{cat_upper}-{slug_title}-{date_str}"
    
    filename = f"{card_id}.md"
    filepath = os.path.join(OUTPUT_DIR, filename)

    frontmatter = {
        'id': card_id,
        'type': 'current_affair',
        'category': card_data['category'],
        'exam_section': card_data['exam_section'],
        'topic': card_data['topic'],
        'related_topic_ids': card_data.get('related_topic_ids', []),
        'is_telangana_focus': card_data['is_telangana_focus'],
        'difficulty': card_data['difficulty'],
        'exam_depth': 'both',
        'headline': card_data['headline'].replace('—', '-'),
        'exam_fact': card_data['exam_fact'].replace('—', '-'),
        'summary': card_data['summary'].replace('—', '-'),
        'event_date': full_art['pub_date'],
        'published_at': f"{full_art['pub_date']}T07:30:00+05:30",
        'date': full_art['pub_date'],
        'source_name': 'PIB',
        'source_type': 'official',
        'ministry': full_art['ministry'] or 'Government of India',
        'canonical_source_url': full_art['url'],
        'source_url': full_art['url'],
        'mcqs': card_data['mcqs']
    }

    # Format YAML
    yaml_lines = ["---"]
    for k, v in frontmatter.items():
        if isinstance(v, (dict, list)):
            yaml_lines.append(f"{k}: {json.dumps(v, ensure_ascii=False)}")
        elif isinstance(v, bool):
            yaml_lines.append(f"{k}: {'true' if v else 'false'}")
        else:
            # Escape quotes
            val_str = str(v).replace('"', '\\"')
            yaml_lines.append(f'{k}: "{val_str}"')
    yaml_lines.append("---")
    yaml_lines.append("")

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write("\n".join(yaml_lines))

    return filepath

def get_processed_prids() -> set:
    """Resume support: scan existing cards for PRIDs already extracted, so a
    re-run with a larger batch size does not re-spend Gemini calls on articles
    that already have a card on disk."""
    processed = set()
    prid_re = re.compile(r'PRID=(\d+)')
    if not os.path.isdir(OUTPUT_DIR):
        return processed
    for fname in os.listdir(OUTPUT_DIR):
        if not fname.endswith('.md'):
            continue
        try:
            with open(os.path.join(OUTPUT_DIR, fname), encoding='utf-8') as f:
                content = f.read()
            m = prid_re.search(content)
            if m:
                processed.add(int(m.group(1)))
        except Exception:
            continue
    return processed

def run_extraction_batch(max_cards: int = 50):
    env = load_env()
    client = get_client(env)

    if not os.path.exists(MANIFEST_PATH):
        print("Manifest not found! Run pib_scorer.py first.")
        return

    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)

    print(f"Loaded {len(manifest):,} scored articles from manifest.")

    # Filter candidates (Top scored, prioritizing Telangana focus and scores > 2.0)
    candidates = [m for m in manifest if m['score'] >= 2.0 or m['is_telangana_focus']]
    print(f"Found {len(candidates):,} priority candidates for extraction.")

    already_processed = get_processed_prids()
    if already_processed:
        candidates = [c for c in candidates if c['prid'] not in already_processed]
        print(f"Skipping {len(already_processed):,} already-processed PRIDs. {len(candidates):,} remain.")

    written = 0
    skipped = 0
    errors = 0

    for i, item in enumerate(candidates[:max_cards], 1):
        prid = item['prid']
        full_art = fetch_full_article(prid)
        if not full_art:
            continue

        prompt = f"""
ARTICLE TITLE: {full_art['title']}
MINISTRY: {full_art['ministry']}
PUBLISHED DATE: {full_art['pub_date']}
URL: {full_art['url']}

FULL ARTICLE TEXT:
{full_art['full_text'][:4000]}
"""

        try:
            response = client.models.generate_content(
                model='gemini-3.6-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    system_instruction=EXTRACTION_SYSTEM_PROMPT,
                    response_mime_type="application/json",
                    response_schema=CACardSchema,
                    temperature=0.1,
                )
            )

            card_data = json.loads(response.text)

            if not card_data.get('is_exam_relevant', False):
                skipped += 1
                continue

            filepath = write_ca_markdown(card_data, full_art)
            written += 1
            tg_flag = " [TG FOCUS]" if card_data['is_telangana_focus'] else ""
            print(f"  [{written:>2}/{max_cards}] Created: {os.path.basename(filepath)} ({card_data['category']}){tg_flag}")

        except Exception as e:
            errors += 1
            print(f"  [ERROR] PRID {prid}: {e}")

    print(f"\n============================================================")
    print(f"  CA EXTRACTION BATCH COMPLETE")
    print(f"============================================================")
    print(f"  Cards Written : {written}")
    print(f"  Irrelevant    : {skipped}")
    print(f"  Errors        : {errors}")

if __name__ == '__main__':
    batch_num = int(sys.argv[1]) if len(sys.argv) > 1 else 30
    run_extraction_batch(max_cards=batch_num)
