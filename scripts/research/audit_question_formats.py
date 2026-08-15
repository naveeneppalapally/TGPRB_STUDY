#!/usr/bin/env python3
"""Reproducible, mutually-exclusive question-format audit for the paper corpus.

The audit intentionally uses conservative rules and records representative questions for
human checking. A question is assigned exactly one primary format in the following
precedence: assertion/pair-counting, 4x4 matching, chronology/spatial sequence,
multi-statement, and direct one-liner. The precedence prevents a matching matrix which
also says "which statements" from being counted twice.

The local TSLPRB JSON files are the project ground-truth corpus. Group I 2024 is read
from an externally downloaded HTML transcription of a public scan because the official
candidate-login source was no longer publicly retrievable during this audit.
"""

from __future__ import annotations

import argparse
import html
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[2]

LOCAL_PAPERS = {
    "TSLPRB Constable 2016 Prelims": "Constable_2016_Prelims.json",
    "TSLPRB SI 2016 Mains GS": "SI_2016_Final_GS_Paper.json",
    "TSLPRB Constable 2018 Mains": "Constable_2018_Mains.json",
    "TSLPRB SI 2018 Mains GS": "SI_2018_Mains_Paper4_GS.json",
    "TSLPRB SI 2022 Prelims": "SI_2022_Prelims.json",
    "TSLPRB SI 2023 Mains GS": "SI_2023_Mains_General_Studies.json",
}

FORMATS = (
    "direct_one_liner",
    "multi_statement",
    "four_by_four_matching",
    "chronology_or_spatial_sequence",
    "assertion_reason_or_pair_counting",
)


def compact(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def classify(question: str) -> str:
    """Return one format label for a question using disclosed lexical rules."""
    text = compact(question).lower()

    pair_counting = (
        r"\bassertion\b",
        r"\breason\s*\(",
        r"\bhow many (?:of the )?(?:above|following).{0,80}\b(?:correct|incorrect|true|false)",
        r"\bnumber of (?:correct|incorrect) (?:statements|pairs)",
        r"\bwhich (?:of the )?(?:above|following) pairs?.{0,80}\b(?:correctly|incorrectly) matched",
        r"\bstatements?.{0,120}\b(?:assumptions?|conclusions?|arguments?)\b",
    )
    if any(re.search(pattern, text) for pattern in pair_counting):
        return "assertion_reason_or_pair_counting"

    is_matching = any(
        phrase in text
        for phrase in ("match the following", "match following", "right matching", "correct matching")
    )
    matrix_markers = sum(
        bool(re.search(pattern, question, flags=re.I))
        for pattern in (r"\b[abcd]\s*[.)]", r"\b[ivxlcdm]+\s*[.)]", r"\(i\)", r"\(a\)")
    )
    if is_matching and matrix_markers >= 2:
        return "four_by_four_matching"

    sequence_signals = (
        r"\bchronological(?:ly)?\b",
        r"\b(?:ascending|descending) order\b",
        r"\b(?:north|south|east|west)(?:ern)?\s+to\s+(?:north|south|east|west)(?:ern)?\b",
        r"\barrange\b.{0,100}\b(?:order|sequence)\b",
        r"\b(?:correct|proper) order\b",
        r"\bsequence\b",
    )
    if any(re.search(pattern, text) for pattern in sequence_signals):
        return "chronology_or_spatial_sequence"

    statement_signals = (
        r"\b(?:following|given|above) statements?\b",
        r"\bstatements?\s*[:\-]",
        r"\bwhich statements?\b",
        r"\bstatements? (?:is|are) (?:correct|true|false|incorrect)",
    )
    # A bare "which statement is true?" is still a direct one-liner.  Count it
    # as a statement set only where the stem visibly supplies at least two
    # separately lettered/numbered propositions.
    proposition_markers = len(
        re.findall(
            r"(?:^|\s)(?:\([A-Da-d]\)|[A-Da-d][.)]|(?:[Iivx]{1,3})[.)])\s",
            question,
        )
    )
    if any(re.search(pattern, text) for pattern in statement_signals) and proposition_markers >= 2:
        return "multi_statement"

    return "direct_one_liner"


def extract_scribd_questions(document: str) -> list[dict[str, Any]]:
    """Extract the first English 1..150 sequence from the public scan's HTML text."""
    document = re.sub(r"<script\b[^>]*>.*?</script>", " ", document, flags=re.I | re.S)
    document = re.sub(r"<style\b[^>]*>.*?</style>", " ", document, flags=re.I | re.S)
    document = compact(html.unescape(re.sub(r"<[^>]+>", " ", document)))
    anchor = document.find("1. Match the following Sahitya Akademi awardees")
    if anchor < 0:
        raise ValueError("Could not find the expected Group I question 1 anchor.")

    starts: list[tuple[int, int]] = []
    cursor = anchor
    for number in range(1, 151):
        match = re.search(rf"(?<![A-Za-z0-9]){number}\.\s", document[cursor:])
        if not match:
            raise ValueError(f"Could not find Group I question {number} after question {number - 1}.")
        start = cursor + match.start()
        starts.append((number, start))
        cursor = start + len(match.group(0))

    questions: list[dict[str, Any]] = []
    for position, (number, start) in enumerate(starts):
        end = starts[position + 1][1] if position + 1 < len(starts) else len(document)
        question = compact(document[start:end])
        # The public transcription places the English and Telugu page layers one after
        # another.  Remove its recurring English-page footer before looking for Telugu
        # text, otherwise a few stems retain a footer and the next-page question number.
        question = re.split(
            r"\s+TEST\s+224\s+R\s*\(\s*\d+\s*\)\s+Page\s+\d+\s+\[Link\]\s+\[Link\]",
            question,
            maxsplit=1,
            flags=re.I,
        )[0].strip()
        # Page transitions carry the Telugu duplicate after the English page. The first
        # Telugu glyph identifies that boundary without altering any English question.
        telugu = re.search(r"[\u0c00-\u0c7f]", question)
        if telugu:
            question = question[: telugu.start()].strip()
        questions.append({"q_no": number, "question": question})

    if len(questions) != 150 or any(not item["question"] for item in questions):
        raise ValueError("Group I extraction did not yield 150 non-empty English questions.")
    return questions


def audit(name: str, questions: list[dict[str, Any]], source_file: str) -> dict[str, Any]:
    counts: Counter[str] = Counter()
    examples: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in questions:
        label = classify(item["question"])
        counts[label] += 1
        if len(examples[label]) < 3:
            examples[label].append(
                {"q_no": item["q_no"], "excerpt": compact(item["question"])[:500]}
            )

    total = len(questions)
    return {
        "paper": name,
        "source_file": source_file,
        "total_questions": total,
        "counts": {label: counts[label] for label in FORMATS},
        "percentages": {label: round(100 * counts[label] / total, 1) for label in FORMATS},
        "representative_examples": {label: examples[label] for label in FORMATS},
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--group1-html", type=Path, required=True)
    parser.add_argument(
        "--output",
        type=Path,
        default=ROOT / "data/research/paper-format-audit-2026-08-15.json",
    )
    args = parser.parse_args()

    results = []
    base = ROOT / "extracted_question_paper_json"
    for name, filename in LOCAL_PAPERS.items():
        questions = json.loads((base / filename).read_text())
        results.append(audit(name, questions, f"extracted_question_paper_json/{filename}"))

    group1 = extract_scribd_questions(args.group1_html.read_text(errors="replace"))
    results.append(audit("TGPSC Group-I Prelims 2024", group1, str(args.group1_html)))

    output = {
        "audit_date": "2026-08-15",
        "method": {
            "unit": "one mutually-exclusive primary format per question",
            "precedence": [
                "assertion_reason_or_pair_counting",
                "four_by_four_matching",
                "chronology_or_spatial_sequence",
                "multi_statement",
                "direct_one_liner",
            ],
            "human_review_required": "Review all non-direct assignments and the stored examples before making causal claims.",
        },
        "papers": results,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n")
    print(json.dumps(output, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
