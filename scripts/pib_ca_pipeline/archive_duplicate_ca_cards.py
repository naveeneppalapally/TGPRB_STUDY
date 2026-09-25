#!/usr/bin/env python3
"""
archive_duplicate_ca_cards.py - keep one card per news event.

The PIB pipeline runs daily and can re-extract the same press release on
consecutive days. Those re-extractions share a headline and an exam fact but
carry different summaries and different MCQ sets, so they are not byte-identical
copies. Deleting them would destroy usable questions, so the lower-value variant
is moved out of the Nuxt Content collection instead of deleted.

Canonical selection order:
  1. Most MCQs (more practice value)
  2. Earliest event_date (closest to first publication)
  3. Filename, alphabetically (deterministic tiebreak)

Dedup key: the PIB PRID inside canonical_source_url. The PRID is stable, so it
identifies the same press release even when the AI assigned a different category,
headline wording, or event_key on a later run. Cards without a PRID fall back to
a normalized-headline key.

Usage
-----
    python3 scripts/pib_ca_pipeline/archive_duplicate_ca_cards.py --dry-run
    python3 scripts/pib_ca_pipeline/archive_duplicate_ca_cards.py
"""
from __future__ import annotations

import argparse
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content" / "current-affairs"
ARCHIVE_DIR = ROOT / "data" / "ca_duplicate_archive"

FIELD = re.compile(r'^{key}:\s*"?([^"\n]*)"?\s*$', re.MULTILINE)
PRID = re.compile(r"PRID=(\d+)", re.IGNORECASE)


def field(text: str, key: str) -> str:
    match = re.search(FIELD.pattern.format(key=key), text, re.MULTILINE)
    return match.group(1).strip() if match else ""


def normalized_title(text: str) -> str:
    return re.sub(r"[^a-z0-9]+", " ", field(text, "headline").lower()).strip()


def dedup_key(text: str) -> str:
    """
    Same press release AND same headline means the same card was re-extracted.

    A shared PRID alone is not enough: one release can legitimately yield two
    cards with different headlines and different facts (for example a curated
    Ken-Betwa card and a pipeline card about the 30-project NPP progress). Those
    are kept. Only an identical release plus identical headline is a duplicate.
    """
    prid_match = PRID.search(field(text, "canonical_source_url") or field(text, "source_url"))
    prid = prid_match.group(1) if prid_match else "noprid"
    return f"{prid}|{normalized_title(text)}"


def same_release_different_headline(groups: dict[str, list[dict]]) -> list[str]:
    """PRIDs that appear under more than one headline. Reported, never archived."""
    by_prid: dict[str, set[str]] = {}
    for key, variants in groups.items():
        prid = key.split("|", 1)[0]
        if prid == "noprid":
            continue
        by_prid.setdefault(prid, set()).add(key)
    return sorted(p for p, keys in by_prid.items() if len(keys) > 1)


def mcq_count(text: str) -> int:
    """Count top-level mcq entries under the mcqs array."""
    tail = text.split("\nmcqs:", 1)
    if len(tail) < 2:
        return 0
    return len(re.findall(r"^\s*-\s+exam_fact:", tail[1], re.MULTILINE))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    files = sorted(CONTENT_DIR.glob("*.md"))
    groups: dict[str, list[dict]] = {}

    for path in files:
        text = path.read_text(encoding="utf-8")
        groups.setdefault(dedup_key(text), []).append({
            "path": path,
            "date": field(text, "event_date") or field(text, "date"),
            "mcqs": mcq_count(text),
        })

    dup_groups = {k: v for k, v in groups.items() if len(v) > 1}
    if not dup_groups:
        print("No duplicate events found.")
        return 0

    archived = 0
    print(f"Duplicate event groups: {len(dup_groups)}\n")

    for key, variants in dup_groups.items():
        ranked = sorted(
            variants,
            key=lambda v: (-v["mcqs"], v["date"] or "9999-99-99", v["path"].name),
        )
        keep = ranked[0]
        print(f"KEEP   {keep['path'].name}  ({keep['mcqs']} mcqs, {keep['date']})")
        for loser in ranked[1:]:
            print(f"  ARCH {loser['path'].name}  ({loser['mcqs']} mcqs, {loser['date']})")
            archived += 1
            if not args.dry_run:
                ARCHIVE_DIR.mkdir(parents=True, exist_ok=True)
                shutil.move(str(loser["path"]), str(ARCHIVE_DIR / loser["path"].name))
        print()

    print(f"files archived: {archived}")

    flagged = same_release_different_headline(groups)
    if flagged:
        print()
        print("Same PIB release, different headline (kept, not archived):")
        for prid in flagged:
            print(f"  PRID {prid}")
        print("  These are distinct extractions from one release. Review by hand before removing.")

    if args.dry_run:
        print("\nDry run only. Re-run without --dry-run to apply.")
    else:
        print(f"Archived copies live in {ARCHIVE_DIR.relative_to(ROOT)} and stay in git.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
