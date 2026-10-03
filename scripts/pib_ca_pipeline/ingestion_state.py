"""Durable terminal/retryable outcomes, shared by both PIB writers."""
import json
import os
from pathlib import Path
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[2]
STATE_PATH = Path(os.environ.get('PIB_STATE_PATH', ROOT / 'data/ca_ingestion_state.json'))

def load_state():
    if not STATE_PATH.exists():
        return {'outcomes': {}, 'last_completed_date': None}
    return json.loads(STATE_PATH.read_text())

def save_state(state):
    STATE_PATH.parent.mkdir(parents=True, exist_ok=True)
    temporary = STATE_PATH.with_suffix('.tmp')
    temporary.write_text(json.dumps(state, indent=2, sort_keys=True) + '\n')
    temporary.replace(STATE_PATH)

def terminal(state, prid):
    return state['outcomes'].get(str(prid), {}).get('status') in {'written', 'irrelevant', 'duplicate'}

def outcome(state, prid, status, detail=''):
    state['outcomes'][str(prid)] = {'status': status, 'detail': detail, 'at': datetime.now(timezone.utc).isoformat()}
    save_state(state)
