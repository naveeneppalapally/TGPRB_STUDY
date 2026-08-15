#!/usr/bin/env python3
"""Verify preserved research PDFs, checksums and text extractions."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
MANIFEST = ROOT / "data/research/primary-source-manifest-2026-08-15.json"
PDF_ROOT = ROOT / "data/research/source-pdfs"
TEXT_ROOT = ROOT / "data/research/source-text"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def check_artifact(item: dict[str, object], errors: list[str]) -> int:
    local = item.get("local_file")
    if not isinstance(local, str):
        directory = item.get("local_directory")
        if isinstance(directory, str):
            paths = sorted((ROOT / directory).glob("*.pdf"))
            if not paths:
                errors.append(f"no PDF files under {directory}")
            return len(paths)
        errors.append("manifest artifact has no local_file or local_directory")
        return 0

    pdf = ROOT / local
    if not pdf.is_file():
        errors.append(f"missing PDF: {local}")
        return 0
    expected = item.get("sha256")
    actual = sha256(pdf)
    if actual != expected:
        errors.append(f"checksum mismatch: {local}: {actual} != {expected}")

    text = TEXT_ROOT / pdf.relative_to(PDF_ROOT)
    text = text.with_suffix(".txt")
    if not text.is_file() or not text.read_text(errors="replace").strip():
        errors.append(f"missing or empty extracted text: {text.relative_to(ROOT)}")
    return 1


def main() -> None:
    manifest = json.loads(MANIFEST.read_text())
    errors: list[str] = []
    checked = 0
    for key in (
        "retrieved_official_key_artifacts",
        "retrieved_official_tgpsc_context_artifacts",
        "retrieved_nonofficial_reproductions",
    ):
        for item in manifest.get(key, []):
            checked += check_artifact(item, errors)

    pdfs = sorted(PDF_ROOT.rglob("*.pdf"))
    if len(pdfs) != checked:
        errors.append(f"manifest/file count mismatch: manifest checks {checked}, PDFs found {len(pdfs)}")

    em_dash = chr(0x2014)
    if any(em_dash in path.read_text(errors="replace") for path in TEXT_ROOT.rglob("*.txt")):
        errors.append("an extracted text artifact contains an em dash")

    result = {"checked_pdfs": checked, "errors": errors, "status": "passed" if not errors else "failed"}
    print(json.dumps(result, indent=2))
    if errors:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
