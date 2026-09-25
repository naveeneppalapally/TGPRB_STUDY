#!/usr/bin/env python3
"""
backfill_ca_ids.py - one-time repair of truncated current-affairs card ids.

Why this exists
---------------
pib_scraper.py built the frontmatter id as:

    item_id = f"CA-PIB-{slug.upper().replace('-', '_')[:40]}"

The slug ends with the PIB publication date, so the 40-character cut removed the
final digit of the date. Cards published on consecutive days (for example
2026-09-08 and 2026-09-09) therefore received the same id, which collided in the
UI (duplicate Vue keys, duplicate DOM ids) and merged unrelated user state
(read status, bookmarks, MCQ scores).

The generator no longer truncates. This script repairs the existing files by
deriving the id from the filename, which is already the full unique slug.

Usage
-----
    python3 scripts/pib_ca_pipeline/backfill_ca_ids.py --dry-run
    python3 scripts/pib_ca_pipeline/backfill_ca_ids.py
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content" / "current-affairs"

ID_LINE = re.compile(r'^id:\s*"?([^"\n]+)"?\s*$', re.MULTILINE)

# Only ids produced by the PIB pipeline are repaired. Hand-authored cards use
# their own scheme (for example CA-GEO-...) and must never be rewritten.
PIPELINE_PREFIX = "CA-PIB-"


def expected_id(path: Path) -> str:
    """CA-PIB- plus the filename slug, uppercased with hyphens as underscores."""
    stem = path.stem
    return f"CA-PIB-{stem.upper().replace('-', '_')}"


def current_id(text: str) -> str | None:
    match = ID_LINE.search(text)
    return match.group(1).strip() if match else None


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    files = sorted(CONTENT_DIR.glob("*.md"))
    if not files:
        print(f"No card files found in {CONTENT_DIR}", file=sys.stderr)
        return 1

    before_ids: list[str] = []
    after_ids: list[str] = []
    changed = 0
    missing_id = 0
    curated = 0

    for path in files:
        text = path.read_text(encoding="utf-8")
        old = current_id(text)
        if old is None:
            missing_id += 1
            continue
        before_ids.append(old)

        # Hand-authored ids keep their own scheme (for example CA-GEO-...).
        if not old.startswith(PIPELINE_PREFIX):
            curated += 1
            after_ids.append(old)
            continue

        new = expected_id(path)
        after_ids.append(new)
        if old == new:
            continue
        changed += 1
        if args.dry_run:
            print(f"[dry-run] {path.name}\n    {old}\n -> {new}")
        else:
            updated = ID_LINE.sub(f'id: "{new}"', text, count=1)
            path.write_text(updated, encoding="utf-8")

    def dupes(ids: list[str]) -> int:
        return len(ids) - len(set(ids))

    print()
    print(f"files scanned      : {len(files)}")
    print(f"files with an id   : {len(before_ids)}")
    print(f"missing id field   : {missing_id}")
    print(f"curated ids skipped: {curated}")
    print(f"ids changed        : {changed}")
    print(f"duplicate ids before: {dupes(before_ids)}")
    print(f"duplicate ids after : {dupes(after_ids)}")
    if args.dry_run:
        print("\nDry run only. Re-run without --dry-run to apply.")
    else:
        print("\nApplied.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
