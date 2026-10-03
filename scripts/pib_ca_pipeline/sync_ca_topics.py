import os
import json
import re
import sys
import time

"""
TSLPRB StudyOS - Deterministic Current Affairs Topic Sync Pipeline
Scans all existing markdown cards in content/current-affairs/*.md against
data/topics_master.json keywords and aliases, retroactively normalizing aliases
and tagging cards with canonical NOTE-IDs.
"""

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
TOPICS_MASTER_PATH = os.path.join(ROOT, 'data/topics_master.json')
CA_DIR = os.path.join(ROOT, 'content/current-affairs')

def extract_existing_ids(content: str) -> set:
    ids = set()
    # 1. Flow JSON array: related_topic_ids: ["..."] or related_topic_ids: [...]
    m = re.search(r'related_topic_ids:\s*(\[[^\]]*\])', content)
    if m:
        try:
            parsed = json.loads(m.group(1))
            for item in parsed:
                ids.add(str(item).strip())
            return ids
        except Exception:
            # Fallback for single-quoted items
            raw_items = re.findall(r'["\']([^"\']+)["\']', m.group(1))
            for item in raw_items:
                ids.add(item.strip())
            return ids

    # 2. Block YAML list: related_topic_ids:\n  - "..."
    lines = content.split('\n')
    in_list = False
    for line in lines:
        if line.startswith('related_topic_ids:'):
            in_list = True
            continue
        if in_list:
            if line.startswith('  - ') or line.startswith('    - ') or line.startswith('- '):
                val = line.split('-', 1)[1].strip().strip('\"\'')
                if val:
                    ids.add(val)
            elif line.strip() == '' or line.startswith('---'):
                break
            elif re.match(r'^[a-zA-Z0-9_]+:', line):
                break
    return ids

def update_related_topic_ids_in_content(content: str, new_ids: list) -> str:
    new_line = f'related_topic_ids: {json.dumps(sorted(new_ids))}'
    
    # 1. Flow style JSON array: related_topic_ids: [...]
    if re.search(r'related_topic_ids:[ \t]*\[[^\]]*\]', content):
        return re.sub(r'related_topic_ids:[ \t]*\[[^\]]*\]', new_line, content, count=1)
    
    # 2. Block YAML list: each item line must start with hyphen
    block_pattern = r'related_topic_ids:(?:[ \t]*\r?\n[ \t]*-[^\r\n]*)+'
    if re.search(block_pattern, content):
        return re.sub(block_pattern, new_line, content, count=1)
    
    # 3. Simple bare line: related_topic_ids:
    if re.search(r'related_topic_ids:[ \t]*(?:\r?\n|$)', content):
        return re.sub(r'related_topic_ids:[ \t]*(?:\r?\n|$)', new_line + '\n', content, count=1)
    
    # 4. If missing, insert after topic:
    if re.search(r'(topic:[^\r\n]*\r?\n)', content):
        return re.sub(r'(topic:[^\r\n]*\r?\n)', r'\1' + new_line + '\n', content, count=1)
    
    return content

def resolve_tags(fields, compiled_keywords, alias_to_canonical, known_ids):
    normalize = lambda values: {alias_to_canonical.get(value, value) for value in values if alias_to_canonical.get(value, value) in known_ids}
    # Preserve legacy assignments as an unreviewed source baseline. Never claim
    # an old model/keyword tag was human-curated. New writers identify source tags.
    source = normalize(fields.get('source_topic_ids', set(fields.get('related_topic_ids', [])) - set(fields.get('keyword_topic_ids', []))))
    curated = normalize(fields.get('curated_topic_ids', []))
    text = ' '.join(str(fields.get(key, '')) for key in ['headline', 'exam_fact', 'summary', 'topic']).lower()
    derived = {canonical_id for canonical_id, pattern in compiled_keywords if pattern.search(text)}
    return source | curated | derived, derived


def run_sync():
    if not os.path.exists(TOPICS_MASTER_PATH):
        print(f"ERROR: topics_master.json not found at {TOPICS_MASTER_PATH}")
        sys.exit(1)

    if not os.path.exists(CA_DIR):
        print(f"ERROR: content/current-affairs not found at {CA_DIR}")
        sys.exit(1)

    with open(TOPICS_MASTER_PATH, 'r', encoding='utf-8') as f:
        topics = json.load(f)

    # Build lookup maps and single compiled disjunction regex per topic for high-speed matching
    alias_to_canonical = {}
    compiled_keywords = []

    for t in topics:
        canonical_id = t['id']
        for alias in t.get('aliases', []):
            alias_to_canonical[alias] = canonical_id
        
        # Compile all keywords into a single disjunction regex with word boundaries
        kws = [k.strip().lower() for k in t.get('keywords', []) if k.strip()]
        kws.sort(key=len, reverse=True)
        if kws:
            pattern = re.compile(r'\b(?:' + '|'.join(re.escape(k) for k in kws) + r')\b')
            compiled_keywords.append((canonical_id, pattern))

    files = sorted([f for f in os.listdir(CA_DIR) if f.endswith('.md')])
    print(f"Scanning {len(files)} current affairs cards against {len(topics)} registered topics...")

    t0 = time.time()
    total_scanned = 0
    updated_files = 0
    normalized_alias_count = 0
    topic_card_counts = {t['id']: 0 for t in topics}
    known_ids = set(topic_card_counts)

    for fname in files:
        fpath = os.path.join(CA_DIR, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            original_content = f.read()

        total_scanned += 1
        existing_ids = extract_existing_ids(original_content)

        # 1. Normalize legacy aliases to canonical NOTE-IDs
        normalized_ids = set()
        for ex_id in existing_ids:
            if ex_id in alias_to_canonical:
                normalized_ids.add(alias_to_canonical[ex_id])
                normalized_alias_count += 1
            elif ex_id in known_ids:
                normalized_ids.add(ex_id)

        import yaml
        fields = yaml.safe_load(original_content.split('---', 2)[1])
        current_ids, keyword_ids = resolve_tags(fields, compiled_keywords, alias_to_canonical, known_ids)

        # Track statistics for canonical topics
        for canonical_id in topic_card_counts:
            if canonical_id in current_ids:
                topic_card_counts[canonical_id] += 1

        updated_content = update_related_topic_ids_in_content(original_content, list(current_ids))
        new_keywords = 'keyword_topic_ids: ' + json.dumps(sorted(keyword_ids))
        if re.search(r'^keyword_topic_ids:.*$', updated_content, re.MULTILINE):
            updated_content = re.sub(r'^keyword_topic_ids:.*$', new_keywords, updated_content, flags=re.MULTILINE)
        else:
            updated_content = re.sub(r'^(related_topic_ids:.*)$', r'\1\n' + new_keywords, updated_content, count=1, flags=re.MULTILINE)
        if updated_content != original_content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            updated_files += 1

    t1 = time.time()
    print("\n" + "=" * 60)
    print("  CURRENT AFFAIRS TOPIC SYNC COMPLETE")
    print("=" * 60)
    print(f"  Total Cards Scanned      : {total_scanned}")
    print(f"  Files Updated            : {updated_files}")
    print(f"  Legacy Aliases Normalized: {normalized_alias_count}")
    print(f"  Sync Duration            : {t1 - t0:.2f}s")
    print("-" * 60)
    print("  Topic Coverage Distribution:")
    for t in topics:
        tid = t['id']
        count = topic_card_counts[tid]
        status = "[OK]" if count >= 3 else "[LOW]"
        print(f"    {status} {tid:24} : {count:3d} cards ({t['subject']})")
    print("=" * 60 + "\n")

if __name__ == '__main__':
    run_sync()
