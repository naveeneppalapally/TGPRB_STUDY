# Exam evidence and practice policy

Moved from AGENTS.md on 15 October 2026. These historical counts and research claims are retained for traceability, not newly reverified by this documentation change. Consult the linked audit and original papers before presenting the figures. The master dataset is the implementation authority, not proof that every stored key is verified. Check the current official notification before changing scoring assumptions.

### Trust Hierarchy:
- `data/pyq_enriched_master.json`: Single source of truth for all PYQ data (3,129 stored question records as of 15 October 2026; occurrences reference 25 structured paper files, 2015-2023). Derive topic weights, tier counts, and questions strictly from here.
- `extracted_question_paper_json/`: 25 structured question paper files.
- `docs/forensic-paper-setting-evolution-audit-2026-08-15.md` & `data/research/paper-format-audit-2026-08-15.json`: Repository empirical format audit across 7 papers (1,350 questions).
- **Exam Penalty**: 2026 exam has an active 20% negative-marking penalty. Never build any "always guess" feature.

### Paper-Setting Evidence & Three Invariant Rules:
1. **TGPRB 2022-2023 is 92-93.5% direct factual MCQs.** TGPRB papers became *more* direct between 2018 and 2023. Never claim TGPRB has adopted multi-statement formats.
2. **TGPSC Group-I 2024 is an advanced practice hedge only** (46.7% direct, 31.3% multi-statement). Model multi-statement, matching, and assertion-reason drills as supplementary hardening labeled strictly as "TGPSC-Style Advanced Practice".
3. **No confirmed shared faculty panel between TGPSC and TGPRB.** Never state shared paper-setters as fact.

### Dual-Stratification Rule:
| Layer | Input Papers | Product Role |
|---|---|---|
| Fact & Concept Inventory | TSLPRB 2015-2023 (all 25 papers) | Primary training format. Extract atomic facts, distractor families, maps, timelines. |
| Format & Hardening Layer | TGPSC Group-I 2024 | Supplementary hardening drills (multi-statement, matching, assertion-reason). Label as advanced practice. |
| Calibration Layer | 2026 SI notification + actual marking | 20% negative marking penalty and current official syllabus. |
