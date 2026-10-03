"""Shared local validation for every CA writer. No model response is an answer key until validated."""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
CONTRACT = json.loads((ROOT / 'data/ca_contract.json').read_text())
TOPICS = json.loads((ROOT / 'data/topics_master.json').read_text())
KNOWN = {t['id'] for t in TOPICS}
ALIASES = {a: t['id'] for t in TOPICS for a in t.get('aliases', [])}

def canonical_tags(values):
    return sorted({ALIASES.get(v, v) for v in values if isinstance(v, str) and ALIASES.get(v, v) in KNOWN})

def validate_mcqs(mcqs):
    if not isinstance(mcqs, list) or not 1 <= len(mcqs) <= CONTRACT['maxMcqs']:
        raise ValueError('CA cards require 1-2 MCQs')
    for q in mcqs:
        if not isinstance(q, dict) or not all(isinstance(q.get(k), str) and q[k].strip() for k in ['question', 'explanation']):
            raise ValueError('MCQ question and explanation are required')
        options = q.get('options')
        if not isinstance(options, list) or len(options) != 4 or not all(isinstance(o, str) and o.strip() for o in options) or len(set(options)) != 4:
            raise ValueError('MCQs require four distinct nonempty options')
        if type(q.get('answer')) is not int or not 0 <= q['answer'] < 4:
            raise ValueError('Invalid MCQ answer index; never substitute an answer')
    return mcqs

def validate_extraction(card):
    if not isinstance(card, dict) or card.get('category') not in CONTRACT['categories']:
        raise ValueError('Invalid CA category')
    if card.get('difficulty', 'M') not in CONTRACT['difficulties'] or card.get('exam_depth', 'both') not in CONTRACT['depths']:
        raise ValueError('Invalid CA difficulty or depth')
    if 'exam_section' in card and card['exam_section'] not in CONTRACT['sections']:
        raise ValueError('Invalid CA exam section')
    if not isinstance(card.get('summary'), str) or not card['summary'].strip():
        raise ValueError('CA summary is required')
    validate_mcqs(card.get('mcqs'))
    for field in ['related_topic_ids', 'extra_topics']:
        values = card.get(field, [])
        if not isinstance(values, list) or any(v not in KNOWN and v not in ALIASES for v in values):
            raise ValueError('Unregistered CA NOTE ID')
    return card


def validate_card(card):
    """Validate the authored output as well as the model response."""
    from datetime import datetime
    validate_extraction(card)
    if not isinstance(card.get('id'), str) or card.get('type') != 'current_affair' or 'mcq' in card:
        raise ValueError('Invalid CA identity or legacy MCQ field')
    for field in ['headline', 'exam_fact', 'summary', 'source_url', 'canonical_source_url', 'source_name']:
        if not isinstance(card.get(field), str) or not card[field].strip():
            raise ValueError('Missing ' + field)
    if not card['source_url'].startswith('https://'):
        raise ValueError('CA provenance requires HTTPS')
    for field in ['date', 'event_date', 'published_at']:
        datetime.fromisoformat(str(card[field]).replace('Z', '+00:00'))
    for field in ['related_topic_ids', 'source_topic_ids', 'keyword_topic_ids', 'curated_topic_ids']:
        values = card.get(field, [])
        if not isinstance(values, list) or any(value not in KNOWN for value in values):
            raise ValueError('Noncanonical tags in ' + field)
    if 'related_topic_ids' not in card:
        raise ValueError('Missing related_topic_ids')
    return card
