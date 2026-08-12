import os
import sys
import json
import re
from datetime import datetime, UTC
from typing import List, Dict, Any

# Ensure imports work
sys.path.insert(0, os.path.abspath('.'))

from scripts.pyq_pipeline.run_pipeline import load_env, get_client
from google.genai import types

MASTER_ENRICHED_PATH = 'data/pyq_enriched_master.json'

def load_master_pyqs() -> List[Dict[str, Any]]:
    with open(MASTER_ENRICHED_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)

def get_pyqs_for_topic(topic_id: str, master: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    return [q for q in master if q.get('topic_id') == topic_id]

TOPIC_CONFIGS = {
    'TEL-MOVEMENT': {
        'subject_slug': 'telangana',
        'topic_slug': 'telangana-statehood-movement',
        'note_id': 'NOTE-TEL-MOVEMENT',
        'subject_name': 'Telangana State',
        'title': 'Telangana Armed Struggle & Statehood Movement',
        'visual_component': '<MovementTimeline mode="telangana" class="mb-10" />',
        'meta_desc': 'Complete high-yield note on Telangana Statehood Movement 1948-2014 for TGPRB Constable and SI exams.'
    },
    'TEL-HIS-CULTURE': {
        'subject_slug': 'telangana',
        'topic_slug': 'telangana-history-and-culture',
        'note_id': 'NOTE-TEL-HIS-CULTURE',
        'subject_name': 'Telangana State',
        'title': 'Telangana History, Heritage & Culture',
        'visual_component': '<MovementTimeline mode="heritage" class="mb-10" />',
        'meta_desc': 'Satavahanas, Kakatiyas, Qutb Shahis, Asaf Jahis, festivals, art, and heritage of Telangana for TGPRB.'
    },
    'POL-UNION-EXEC-LEG': {
        'subject_slug': 'polity',
        'topic_slug': 'union-executive-and-legislature',
        'note_id': 'NOTE-POL-UNION-EXEC',
        'subject_name': 'Indian Polity',
        'title': 'Union Executive & Parliament',
        'visual_component': '<ConstitutionalHierarchy mode="executive" class="mb-10" />',
        'meta_desc': 'President, Prime Minister, Cabinet, Lok Sabha, Rajya Sabha constitutional provisions for TGPRB Constable & SI.'
    },
    'POL-JUDICIARY-BODIES': {
        'subject_slug': 'polity',
        'topic_slug': 'judiciary-and-constitutional-bodies',
        'note_id': 'NOTE-POL-JUDICIARY-BODIES',
        'subject_name': 'Indian Polity',
        'title': 'Judiciary & Constitutional Bodies',
        'visual_component': '<ConstitutionalHierarchy mode="judiciary" class="mb-10" />',
        'meta_desc': 'Supreme Court, High Courts, Election Commission, CAG, UPSC, Finance Commission for TGPRB.'
    },
    'HIS-ANCIENT': {
        'subject_slug': 'history',
        'topic_slug': 'ancient-india-and-culture',
        'note_id': 'NOTE-HIS-ANCIENT',
        'subject_name': 'History',
        'title': 'Ancient India & Cultural Heritage',
        'visual_component': '',
        'meta_desc': 'Indus Valley, Vedic Age, Buddhism, Jainism, Mauryas, Guptas for TGPRB Constable & SI.'
    },
    'HIS-MODERN-MOV': {
        'subject_slug': 'history',
        'topic_slug': 'modern-india-and-freedom-movement',
        'note_id': 'NOTE-HIS-MODERN-MOV',
        'subject_name': 'History',
        'title': 'Modern India & Freedom Movement',
        'visual_component': '<MovementTimeline mode="freedom" class="mb-10" />',
        'meta_desc': '1857 Revolt, INC, Gandhian Era, Revolutionary Movement, Independence 1947 for TGPRB.'
    }
}

NOTE_GENERATION_PROMPT = """
You are the Chief Academic Director for TSLPRB StudyOS (Telangana Police Constable & SI Exams).

You are writing a full, high-yield Vue 3 note page component (`pages/notes/{subject_slug}/{topic_slug}.vue`) for the topic:
Topic Title: {title}
Note ID: {note_id}
Subject: {subject_name}
Verified PYQ Count: {pyq_count}

VERIFIED REAL PYQS FOR THIS TOPIC:
{pyq_summary}

STRICT ARCHITECTURAL REQUIREMENTS:
1. Output format: Provide valid Vue 3 `<template>` and `<script setup lang="ts">` code.
2. Structure & Styling:
   - Header with reading progress bar, breadcrumb, Title, Subtitle, and metadata chips.
   - Insert `<CurrentAffairsStrip note-id="{note_id}" class="mb-8" />` right after the header.
   - Insert coverage strip showing 4 to 6 ways TGPRB tests this topic.
   - Insert the visual component `{visual_component}` at the top of Section 01 if provided.
   - High-yield sections with callout boxes (emerald for facts, saffron for warnings, red for penalties), factual tables, memory mnemonics, and real PYQ anchors.
   - Gate Quiz component at the bottom: `<GateQuiz note-id="{note_id}" />`
3. NO EM-DASHES (—). Use standard hyphens (-) or colons (:) only. The build will fail if em-dashes are present.
4. Content Quality: Focus strictly on exam-relevant facts tested in TGPRB papers (dates, leaders, acts, articles, numbers, locations, committees).

Respond with the complete Vue file code only inside a ```vue ``` codeblock.
"""

def generate_note_page(topic_id: str):
    if topic_id not in TOPIC_CONFIGS:
        print(f"Error: {topic_id} not configured in TOPIC_CONFIGS.")
        return

    cfg = TOPIC_CONFIGS[topic_id]
    master = load_master_pyqs()
    pyqs = get_pyqs_for_topic(topic_id, master)

    print(f"\n============================================================")
    print(f"  GENERATING TIER-1 NOTE: {cfg['title']} ({len(pyqs)} PYQs)")
    print(f"============================================================")

    # Summarize PYQs
    pyq_summary_lines = []
    for i, q in enumerate(pyqs[:25], 1):
        pyq_summary_lines.append(f"{i}. [{q['uid']}] {q['question_text']}")
        if q.get('explanation'):
            pyq_summary_lines.append(f"   Ans: {q.get('correct_option_text','')} | Fact: {q['explanation'][:150]}")

    pyq_summary = "\n".join(pyq_summary_lines)

    prompt = NOTE_GENERATION_PROMPT.format(
        title=cfg['title'],
        note_id=cfg['note_id'],
        subject_name=cfg['subject_name'],
        subject_slug=cfg['subject_slug'],
        topic_slug=cfg['topic_slug'],
        pyq_count=len(pyqs),
        pyq_summary=pyq_summary,
        visual_component=cfg['visual_component']
    )

    env = load_env()
    client = get_client(env)

    print("  [Gemini 3.6 Flash] Requesting full Vue note component...")
    response = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            temperature=0.2,
        )
    )

    text = response.text
    # Extract vue block
    match = re.search(r'```vue\s*(.*?)\s*```', text, re.DOTALL)
    if match:
        code = match.group(1).strip()
    else:
        code = text.strip()

    # Sanitize any accidental em-dashes
    code = code.replace('—', '-')

    # Target directory
    out_dir = os.path.join('pages/notes', cfg['subject_slug'])
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, f"{cfg['topic_slug']}.vue")

    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(code)

    print(f"  ✓ Saved note page to: {out_file}")

if __name__ == '__main__':
    target = sys.argv[1] if len(sys.argv) > 1 else 'TEL-MOVEMENT'
    generate_note_page(target)
