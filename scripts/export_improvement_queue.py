#!/usr/bin/env python3
"""
Export pending content improvement items from Supabase for AI agent processing.

Usage:
    python3 scripts/export_improvement_queue.py

Output: Prints JSON array of pending items to stdout.
        Each item includes note_id, section_id, section_label, item_type,
        description, reference_url, and the submitter's user_id.

The agent reads this output and processes each item by editing the relevant
Vue note page. After processing, the agent updates the item's status to 'done'
via the Supabase service role.
"""

import json
import os
import sys
from datetime import datetime

try:
    from supabase import create_client
except ImportError:
    print("Error: supabase-py not installed. Run: pip install supabase", file=sys.stderr)
    sys.exit(1)

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("Error: SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables required.", file=sys.stderr)
    sys.exit(1)

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


def export_pending():
    """Fetch all pending improvement items, ordered oldest first."""
    result = supabase.table("content_improvement_items") \
        .select("id, user_id, note_id, section_id, section_label, item_type, reference_url, description, status, client_created_at, created_at") \
        .eq("status", "pending") \
        .order("created_at", desc=False) \
        .execute()

    items = result.data or []
    print(f"Found {len(items)} pending improvement item(s).", file=sys.stderr)
    print(json.dumps(items, indent=2, default=str))


def mark_done(item_id: str, admin_notes: str = ""):
    """Mark an item as done (called by the agent after processing)."""
    result = supabase.table("content_improvement_items") \
        .update({
            "status": "done",
            "admin_notes": admin_notes,
            "processed_at": datetime.utcnow().isoformat()
        }) \
        .eq("id", item_id) \
        .execute()

    if result.data:
        print(f"Marked {item_id} as done.", file=sys.stderr)
    else:
        print(f"Warning: no row matched id={item_id}.", file=sys.stderr)


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "mark-done":
        if len(sys.argv) < 3:
            print("Usage: export_improvement_queue.py mark-done <item_id> [admin_notes]", file=sys.stderr)
            sys.exit(1)
        notes = sys.argv[3] if len(sys.argv) > 3 else "Processed by AI agent"
        mark_done(sys.argv[2], notes)
    else:
        export_pending()
