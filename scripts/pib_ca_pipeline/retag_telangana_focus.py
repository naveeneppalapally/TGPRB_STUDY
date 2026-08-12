"""
One-off deterministic cleanup: the Gemini extraction prompt originally set
is_telangana_focus: true for ANY mention of Telangana anywhere in the article
body (including a Telangana official merely attending a national event, or
Telangana being one of several states in a list). That produced ~68% of cards
flagged as TG focus, which defeats the point of the badge (AGENTS.md requires
Telangana-specific events to "stand out clearly", which only works if most
cards are NOT flagged).

This script re-derives is_telangana_focus from the CORE fact fields only
(headline, exam_fact, topic, category) rather than the full article text,
matching the tightened rule now in EXTRACTION_SYSTEM_PROMPT for future runs.
No Gemini calls: pure regex over already-extracted frontmatter fields.
"""
import os
import re
import glob

CA_DIR = 'content/current-affairs'

TG_KEYWORDS = [
    'telangana', 'hyderabad', 'warangal', 'karimnagar', 'nizamabad',
    'nalgonda', 'khammam', 'tgsrtc', 'tgprb', 'secunderabad', 'siddipet',
    'adilabad', 'mahbubnagar', 'rangareddy',
]
TG_RE = re.compile('|'.join(re.escape(k) for k in TG_KEYWORDS), re.IGNORECASE)

FIELD_RE = re.compile(r'^(headline|exam_fact|topic|category|is_telangana_focus):\s*(.*)$')


def parse_frontmatter_fields(text: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    for line in text.splitlines():
        m = FIELD_RE.match(line)
        if m:
            fields[m.group(1)] = m.group(2).strip()
    return fields


def core_fact_text(fields: dict[str, str]) -> str:
    parts = []
    for key in ('headline', 'exam_fact', 'topic'):
        v = fields.get(key, '')
        parts.append(v.strip('"'))
    return ' '.join(parts)


def main():
    files = sorted(glob.glob(os.path.join(CA_DIR, '*.md')))
    flipped_to_false = 0
    flipped_to_true = 0
    unchanged = 0

    for path in files:
        with open(path, encoding='utf-8') as f:
            content = f.read()

        fields = parse_frontmatter_fields(content)
        was_true = fields.get('is_telangana_focus', '').strip().lower() == 'true'
        category = fields.get('category', '').strip('"').lower()

        # Category "telangana" is inherently TG-focused regardless of wording.
        should_be_true = category == 'telangana' or bool(TG_RE.search(core_fact_text(fields)))

        if was_true and not should_be_true:
            content = re.sub(r'^is_telangana_focus:\s*true\s*$', 'is_telangana_focus: false', content, flags=re.MULTILINE)
            flipped_to_false += 1
        elif not was_true and should_be_true:
            content = re.sub(r'^is_telangana_focus:\s*false\s*$', 'is_telangana_focus: true', content, flags=re.MULTILINE)
            flipped_to_true += 1
        else:
            unchanged += 1
            continue

        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

    total = len(files)
    print(f"Total cards scanned   : {total}")
    print(f"Flipped true -> false : {flipped_to_false}")
    print(f"Flipped false -> true : {flipped_to_true}")
    print(f"Unchanged             : {unchanged}")


if __name__ == '__main__':
    main()
