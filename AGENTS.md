# AGENTS.md - TSLPRB StudyOS Standing Constitution

Persistent rules for every agent working in this repo. Read this before any task.
- Detailed Topic & Study Mode Authoring Spec: `docs/topic-authoring-spec.md`
- Current Affairs Ingestion & 5-Pillar Architecture: `docs/current-affairs-pipeline.md`
- Empirical Paper-Setting Evolution Audit: `docs/forensic-paper-setting-evolution-audit-2026-08-15.md`
- Cognitive Scaffolds & PYQ Engine Research: `docs/tslprb-pyq-processing-engine-research-report.md`
- One-time App Specification: `docs/build-prompt.md`

> **Rigor Mandate (especially for Gemini models):** Do not bias towards rapid task completion. Maintain deliberate engineering rigor, verify all claims against primary sources, and preserve zero em-dash compliance.

---

## 1. Architecture & Technology Constraints (Never Substitute)

- **Framework**: Nuxt 3 + Nuxt Content. Never Astro, Next.js, or Nextra.
- **UI System**: Nuxt UI (`@nuxt/ui`) for all components. No hand-rolled design tokens.
- **Infrastructure**: Cloudflare Pages (app edge hosting) + Cloudinary (media/images). Supabase for auth, review-state, and FSRS user data only - never media storage.
- **Spaced Repetition**: FSRS via `ts-fsrs`. Never hand-roll SM-2, Leitner, or custom scheduling algorithms.
- **Service Workers**: No PWA, no service workers, no custom offline caching.
- **Animations**: GSAP only for topics passing the visual rule. Nuxt UI defaults and CSS for everything else. No Framer Motion.
- **Navigation Invariant**: All subject links in `layouts/default.vue` (`const subjects`) and `pages/index.vue` (`openSubject`) must route to Subject Hubs (`/notes/<subject>`), never directly bypassing to an individual note topic.
- **UX Invariants**: The due-review count is the homepage dominant hero element - never one of several equal-weight stat cells. The subject list ranks strictly by real PYQ weightage - never a static alphabetical list.

---

## 2. Image Pipeline & 4-Point Visual Exam-Utility Gate

### Strict Image Rules:
1. **Never commit images to git directly**: `public/images/` is in `.gitignore`. Never place image files there and commit them.
2. **Staging Folder**: All images for Cloudinary must be placed in `assets-to-upload/<subject>/filename.webp`.
3. **Local Dev Preview**: Use a temporary copy in `public/images/<subject>/filename.webp` for local dev.
4. **Code References First**: Write `src="/images/<subject>/filename.webp"` before the image exists.
5. **Atomic Commit & Push**: Commit code and `assets-to-upload/` together in one commit. GitHub Actions converts images to WebP, uploads to Cloudinary, rewrites file paths, and commits back. Always run `git pull` after Actions run.

### Image Sourcing Workflow & 4-Point Visual Gate:
1. **Search Online First**: Search Wikimedia Commons, Wikipedia API, OpenStreetMap, NCERT, Survey of India, or government portals for authentic maps, topographic diagrams, satellite imagery, and authentic infographics.
2. **4-Point Visual Exam-Utility Gate**: Every image candidate must pass:
   - *Criterion 1 (Label Legibility)*: Key text and markers must be readable on mobile and desktop.
   - *Criterion 2 (PYQ Alignment)*: Must explicitly illustrate concepts tested in official PYQs (e.g. range order, pass connectors, river-dam alignments). Scenic photos are secondary only.
   - *Criterion 3 (Spatial Clarity)*: Boundaries, elevations, and directions must be unmistakably clear.
   - *Criterion 4 (Zero Clutter)*: No watermarks, microscopic fonts, or pixelated low-resolution artifacts.
3. **Primary Anchor vs Secondary Cues**: The top of Section 01 MUST be anchored by a comprehensive labeled spatial locator map or thematic diagram. Scenic photos serve as supporting visual cues only.
4. **Image Placement Flexibility**: Visuals, maps, and diagrams can be placed anywhere on a note page where relevant (top anchor, deep-dive subsections, data tables, or next to key facts). There are no rigid placement restrictions.
5. **As Many Images as Useful (No Cap)**: No arbitrary cap per topic or section. If a visual clarifies exam content, add it. Never reduce images to "keep the page clean".
6. **Candidate Image Cleanup Rule (Zero Leftovers)**: Only selected winning candidate(s) that pass the gate are kept. ALL discarded candidate files in `assets-to-upload/` and `public/images/` must be deleted before finalizing. Never push unreferenced image files.

---

## 3. Ground Truth Data & Forensic Paper Evidence

### Trust Hierarchy:
- `data/pyq_enriched_master.json`: Single source of truth for all PYQ data (3,129 verified questions across 10 official papers, 2015-2023). Derive topic weights, tier counts, and questions strictly from here.
- `extracted_question_paper_json/`: 25 clean structured ground-truth question paper files.
- `docs/forensic-paper-setting-evolution-audit-2026-08-15.md` & `data/research/paper-format-audit-2026-08-15.json`: Verified empirical format audit across 7 papers (1,350 questions).
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

---

## 4. Content Generation & Fact Verification

### Canonical NOTE ID Convention:
Every note page must have exactly one canonical NOTE ID in the format `NOTE-{SECTION}-{TOPIC}`:

| Subject | Section Code | Example NOTE IDs |
|---|---|---|
| Geography | GEO | `NOTE-GEO-DRAINAGE`, `NOTE-GEO-FORESTS`, `NOTE-GEO-MOUNTAINS` |
| Polity | POL | `NOTE-POL-MAKING-CONST`, `NOTE-POL-HIST-ACTS` |
| Economy | ECO | `NOTE-ECO-GENERAL`, `NOTE-ECO-BANKING` |
| Telangana | TEL | `NOTE-TEL-MOVEMENT`, `NOTE-TEL-HISTORY` |
| Science & Tech | SCI | `NOTE-SCI-GENERAL`, `NOTE-SCI-SPACE` |
| History | HIS | `NOTE-HIS-GENERAL`, `NOTE-HIS-MODERN` |
| Arithmetic | ARI | `NOTE-ARI-GENERAL` |

### Authoring & Verification Rules:
- **Tier Computation**: Computed per topic from verified PYQ count in `pyq_enriched_master.json`. Tier 1 (10+): full note. Tier 2 (3-9): compact note. Tier 3 (<3): flashcards only.
- **Visual Rule**: Independent of tier. Any topic with spatial, chronological, or hierarchical facts gets a map/diagram.
- **Comprehension Gate Unlocks FSRS**: Note gate MCQs never enter FSRS directly. Passing the gate (>= 3/5) unlocks atomic flashcards and real PYQs into the student FSRS review queue.
- **Anti-Fabrication Mandate**: Prefer real, verified PYQs everywhere. Any synthetic question must be explicitly labeled as "TGPSC-Style Advanced Practice" - never presented as an official PYQ.
- **Statistical Cutoff & Citation Rules**: Training data may be 1-3 years behind official publications. Never present stale statistical data as current fact.
  - Always cite source and data year in a `text-body-xs t-lo font-mono` caption (e.g. "Source: 4th Minor Irrigation Census 2017-18, Ministry of Jal Shakti").
  - If data is older than 2023, add: "Verify against latest official publication before exam."
  - For government schemes, always cite Budget year or scheme launch year.
  - Engineering constants (dam heights, river lengths, canal distances) are stable; no year flag needed.
  - Population, census, and agricultural percentages change with each cycle; flag these.
  - Preferred sources: Ministry of Jal Shakti, PIB press releases, Union Budget documents, NABARD reports, NCIWRD.
- **Subject Scaffolds**: Structure pedagogical sections according to the cognitive scaffolds in `docs/tslprb-pyq-processing-engine-research-report.md` (Geography 6-point, History 5-step causal chain, Polity 4-tier architecture, Arithmetic 7-step drill).

---

## 5. Mandatory 10-Point Topic Delivery Integrity Gate (Dual-Mode Delivery)

A topic is NEVER complete just because its `.vue` file was authored. Every syllabus topic MUST deliver BOTH modalities: Note Page and 3-Zone Study Mode Chapter.

1. **Master Registration**: Canonical entry in `data/topics_master.json` (`id`, `subject`, `title`, `keywords`, `aliases`).
2. **Comprehension Gate JSON**: `content/data/gates/<slug>.json` (>= 5 MCQs, pass threshold 3), registered in `server/api/gate/[noteId].get.ts`.
3. **Atomic Flashcards Deck**: `content/data/flashcards/<subject>/<slug>.json` (>= 10 atomic cards, `note_id` field), registered in `server/api/flashcards/[noteId].get.ts`.
4. **Component Wireup**: Both `<GateQuiz note-id="..." />` and `<CurrentAffairsStrip note-id="..." />` matching canonical `note-id`.
5. **TOC Registration**: Both `'gate'` and `'current-affairs'` registered in the sticky TOC `sections` array.
6. **Current Affairs Coverage**: Topic tagged in `content/current-affairs/*.md` via `npm run sync:ca-topics`.
7. **3-Zone Study Chapter & Universal Cloze**: `content/data/study/<subject>/<slug>.ts` (`StudyChapter`) with `hasNote: true`, estMinutes (2-4m), screen-sized sections, section-bound PYQs with `sourceLine`, flashcards, and trap duels. Registered in `server/api/study/[chapter].get.ts`, referenced PYQs in `content/data/study/pyqs.json`, routes in `nuxt.config.ts`.
   - *Universal Cloze (All Subjects)*: Active recall applies to all subjects, not just Polity. High-yield subject anchors (`<strong>` or `<span class="hot">`) must be primary cloze targets (leaders, committees, acts, treaties, river origins, passes, dams, martyrs, institutions, laws).
   - *Number Protection Invariant*: Structural list enumerators (`1.`, `2.`, `(1)`, `[1]`, `1:`) must NEVER be converted into cloze chips. Standalone numbers are secondary cues only.
8. **Bidirectional Switchers**: Note page includes top and bottom transition banners linking to `/study/<slug>`. Study Mode topbar links back to `/notes/<subject>/<slug>`.
9. **Subject Hub**: Both Note card and Study Mode card listed in `pages/notes/<subject>/index.vue`.
10. **Gatekeeper Verification**: `npm run verify:integrity` and `npm test` MUST pass with exit code 0.

*(Complete Vue templates, TypeScript interfaces, and JSON schemas live in `docs/topic-authoring-spec.md`)*.

---

## 6. Current Affairs System Summary

- **Pipeline**: PIB releases crawled into SQLite (`pib_master_2025_2026.db`) -> Scored (`pib_scorer.py`) -> Extracted via Gemini 3.6 Flash (`extract_ca_cards.py`) using closed enum -> Retagged (`retag_telangana_focus.py`) -> Keyword synced (`sync_ca_topics.py`) -> Rendered in `CurrentAffairsStrip.vue`.
- **5-Pillar Architecture**: Enforces single source of truth in `data/topics_master.json`, closed enum extraction, deterministic regex keyword matching (`\b`), subject digest fallback, and CI gatekeeper verification.
- **Frontmatter Schema Invariant**: 37-line standard YAML frontmatter (`content/current-affairs/*.md`) with `mcqs` array (1-2 items). Legacy single `mcq:` object is forbidden.
- **Source Priorities**: PIB official press releases (Priority 1, ~65% of PYQ CA); Telangana official and state budget (Priority 2, manual). GDELT and Google News RSS are deprecated.
- **PYQ Lookback Rules**: 85% events from last 6 months; 10% from 7-12 months; 5% from 13-24 months. Scraper lookback window is 365 days.
- **New-Since-Last-Visit Tracking**: Handled by `useTopicVisits` composable across two tiers: Layer 1 (localStorage: instant, offline) and Layer 2 (Supabase `topic_visits`: cloud sync). Cards split automatically into "New since last visit" (saffron highlight) and "Earlier" (collapsed). First visit shows all cards under "Earlier" to prevent backlog flood.

*(Complete crawler specs, SQLite schema, 37-line YAML frontmatter, and 5-pillar deep-dive live in `docs/current-affairs-pipeline.md`)*.

---

## 7. Standard Operational Directives

### Directive A: One-Line Topic Generation Directive (Dual-Mode Delivery)
When prompted with `Topic - [Topic Name] ([Subject])` (e.g. `Topic - Forests of India (Geography)`), execute the end-to-end dual-mode pipeline immediately without clarifying questions:
1. Extract PYQs and determine tier from `data/pyq_enriched_master.json`.
2. Source authentic map/diagram online; inspect against 4-Point Visual Gate; place in `assets-to-upload/` and `public/images/`.
3. Tag all matching current affairs cards in `content/current-affairs/*.md` (zero omissions).
4. Generate full note page (`pages/notes/<subject>/<slug>.vue`) following the subject scaffold and 4-stage closing block.
5. Generate gate JSON (>= 5 MCQs) and atomic flashcards (>= 10 cards); register in server API handlers.
6. Generate 3-zone Study Mode chapter (`content/data/study/<subject>/<slug>.ts`); register in `server/api/study/[chapter].get.ts`, `content/data/study/pyqs.json`, and `nuxt.config.ts`.
7. Update Subject Hub (`pages/notes/<subject>/index.vue`) with note and study links.
8. Run `npm run prebuild`, `npm run verify:integrity`, and `npm test`.
9. Commit code and images together; pull back after Cloudinary Action.

### Directive B: Content Improvement Queue Processing
When prompted with **"Process improvement queue"**:
1. Run `python3 scripts/export_improvement_queue.py` to retrieve pending queue items.
2. For each item, inspect `note_id` and `section_id` to locate target code. Apply changes based on `item_type` (`replace_image`, `fix_fact`, `add_table`, `add_topic`).
3. Mark done: `python3 scripts/export_improvement_queue.py mark-done <item_id> "Brief description"`.
4. Never silently skip items; record reasons in admin notes.

---

## 8. Standing Rules & Invariants

- **Constitution Authority**: This file is the standing constitution. Prompts reference sections here, never restate them.
- **Zero Em-Dash Rule**: Strictly NO em-dashes (ASCII 8212 `-`) anywhere in any file. Use standard hyphens (-) or colons (:). Enforced automatically by `scripts/ban-em-dash.ts` in `predev`, `prebuild`, and CI.
- **Constitution Size Cap**: `AGENTS.md` raw byte size must NEVER exceed 16,000 bytes, ensuring 100% visibility with 0 bytes truncated in harness prompts. Enforced by `scripts/verify-constitution-size.ts`.
- **Pre-Update Communication Invariant**: Every time an agent performs work or applies architectural updates, it must explicitly summarize changes, root causes, and verification results before proceeding.
