"""Read-only, local schema gate for all CA writers and workflows."""
import sys
from pathlib import Path
import yaml
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from scripts.pib_ca_pipeline.card_contract import validate_card, KNOWN, CONTRACT

errors = []
ids = set()
for file in sorted(Path('content/current-affairs').glob('*.md')):
    try:
        card = yaml.safe_load(file.read_text().split('---',2)[1])
        validate_card(card)
        if card['id'] in ids: raise ValueError('Duplicate card ID')
        ids.add(card['id'])
        if card.get('mcq'): raise ValueError('Legacy mcq forbidden')
        if card.get('exam_section') not in CONTRACT['sections']: raise ValueError('Invalid section')
        if any(id not in KNOWN for id in card['related_topic_ids']): raise ValueError('Noncanonical tag')
        if not card.get('source_url') or not card.get('date'): raise ValueError('Missing provenance')
    except Exception as exc: errors.append(f'{file}: {exc}')
if errors:
    print('\n'.join(errors), file=sys.stderr)
    sys.exit(1)
print(f'PASS: {len(ids)} CA cards satisfy the shared local contract')
