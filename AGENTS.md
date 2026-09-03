# AGENTS.md - TSLPRB StudyOS

Persistent rules for every agent working in this repo. Read this before any task. The full build spec (schema, tier template, build order) lives in `docs/build-prompt.md` - reference it, don't restate it. The current affairs strategy, PYQ evidence, source priorities and UX requirements live in `docs/current-affairs-audit.md` - read it before touching anything in the CA pipeline.

> **Especially for gemini models:** Do not bias towards rapid task completion, please have deliberate engineering rigor.

## Architecture - never substitute
- Nuxt 3 + Nuxt Content. Never Astro, Next.js/Nextra.
- Nuxt UI (`@nuxt/ui`) for all components. No hand-rolled design-token system.
- Cloudflare Pages (app) + Cloudinary (media/images). Supabase for auth/review-state/FSRS data only - never media.
- FSRS via `ts-fsrs`. Never hand-roll SM-2 or Leitner.
- No PWA, no service workers, no offline caching.
- No Framer Motion, no bespoke animation elsewhere. GSAP only for topics that pass the visual rule below. Plain CSS/Nuxt UI defaults for everything else.
- **Image sourcing workflow - strict priority & Visual Exam-Utility Gate**:
  1. **Always search online first** (`search_web`, Wikipedia API, Wikimedia Commons, OpenStreetMap, NCERT, Survey of India, educational repositories, government portals): Real maps, topographic diagrams, satellite imagery, and authentic infographics must always be preferred.
  2. **Mandatory AI Visual Inspection**: The agent must inspect every downloaded image candidate against the **4-Point Visual Exam-Utility Gate**:
     - **Criterion 1 (Label Legibility)**: All key text, labels, and markers must be crystal clear and readable on both mobile and desktop screens.
     - **Criterion 2 (PYQ Alignment)**: The map/diagram must explicitly illustrate concepts tested in official PYQs (e.g., North-to-South range order KLZPS, pass connectors, river-dam alignments, state borders). Scenic photos without spatial context are secondary only.
     - **Criterion 3 (Spatial Clarity)**: Geographic boundaries, relative positions, elevations, and flow directions must be unmistakably clear.
     - **Criterion 4 (Zero Clutter)**: No watermark obstructions, microscopic fonts, or pixelated low-resolution artifacts.
     - *Inspection Action Loop*: If candidate fails the gate, discard it, search and inspect candidate 2. If no suitable annotated map exists online, generate a custom high-resolution annotated map.
  3. **Primary Anchor vs Secondary Cues**:
     - The top of Section 01 (Visual Architecture) MUST be anchored by a **comprehensive labeled spatial locator map or thematic diagram**.
     - Individual scenic photographs (e.g. mountain peaks, individual dams) serve as secondary supporting visual cues placed below or alongside the main locator maps, NEVER as the sole visual anchor.
  4. **Candidate Image Cleanup Rule (Zero Leftovers)**: When multiple image candidates are downloaded during research, inspect them with `view_file`. Only the selected winning candidate(s) that pass the 4-Point Visual Gate must be kept. ALL other unselected, discarded, or superseded image candidates in `assets-to-upload/` and `public/images/` must be immediately deleted before moving to the next phase. Never push unreferenced images.
  5. Place selected images in `assets-to-upload/<subject>/filename.webp` (and copy to `public/images/<subject>/filename.webp` for local preview) - same pipeline.

## Images - strict rules, never break these

### Rule 1: Never put images in git directly
`public/images/` is in `.gitignore`. Never place image files there and commit them.
Never commit `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` files directly to the repo root or any subfolder except `assets-to-upload/`.

### Rule 2: Use assets-to-upload/ as the staging folder
All images that need to go to Cloudinary must be placed in `assets-to-upload/<subject>/filename.ext`.

Examples:
- `assets-to-upload/geography/himalayan-rivers-map.webp`
- `assets-to-upload/polity-const/parliamentary-structure.png`
- `assets-to-upload/history/timeline-1857.jpg`

### Rule 3: Write code references BEFORE the image exists
When writing a Vue component that needs an image, write the `src` as a local path placeholder:
```html
<img src="/images/geography/himalayan-rivers-map.webp" alt="..." />
```
The subject folder and filename must exactly match what you will put in `assets-to-upload/`.

### Rule 4: Push code and image together in one commit
```bash
git add pages/notes/geography/himalayan-rivers.vue     # the component with src="/images/..."
git add assets-to-upload/geography/himalayan-rivers-map.webp  # the actual image
git commit -m "add: himalayan rivers note + map"
git push
```

GitHub Actions will automatically:
1. Detect the image in `assets-to-upload/`
2. Convert it to WebP (if PNG/JPG)
3. Upload it to Cloudinary
4. Rewrite `src="/images/geography/himalayan-rivers-map.webp"` to the Cloudinary URL in all `.vue/.ts/.md` files
5. Delete the file from `assets-to-upload/`
6. Commit the rewritten URLs back to the repo

### Rule 5: Bulk uploads are fine - one push handles everything
You can push 10 images and 10 components in one commit. The workflow processes all of them in a single run. Never push images one by one.

### Rule 6: Filename must match exactly
The filename in `assets-to-upload/subject/name.ext` must match the filename used in `src="/images/subject/name.ext"` (extension can differ - PNG source becomes WebP on Cloudinary, the script handles the rename).

### Rule 7: After the Action completes, always git pull
The Action commits back rewritten URLs. Always run `git pull` after a push that included images before continuing work.

### Rule 8: local dev works without images on Cloudinary
During local development, put a temporary copy in `public/images/subject/name.webp` for preview. This folder is gitignored so it will not be committed. The actual Cloudinary upload happens on push via the Action.

## Source data - trust hierarchy, never invert it
- `data/pyq_enriched_master.json` is the single source of truth for all PYQ data (3,129 verified questions across 10 official papers, 2015-2023). Always derive tier counts, topic weights, and question content from here. Never hardcode numbers.
- `extracted_question_paper_json/` contains the 25 clean structured JSON files (one per official exam paper) that were used to build `pyq_enriched_master.json`. Keep this as permanent ground truth reference.
- `docs/forensic-paper-setting-evolution-audit-2026-08-15.md` and `data/research/paper-format-audit-2026-08-15.json` are the verified empirical format audit across 7 papers (1,350 questions). Never contradict their findings without new primary-source evidence (e.g., a released 2026 TGPRB paper showing a format shift).
- `Extracted_Text/`, `Deep_Analysis.txt`, and `Topic_Banks/` are deleted legacy files. Do not reference or recreate them.
- The 2026 exam has a real 20% negative-marking penalty. Never build any "always guess" feature or copy that implies free guessing.

## Paper-setting format evidence - empirical, never speculative

The forensic audit (`docs/forensic-paper-setting-evolution-audit-2026-08-15.md`) classified 1,350 questions across 7 papers using a precedence-based mutual-exclusion classifier. These are the verified percentages:

| Paper | Direct 1-liner | Multi-statement | Matching | Chronology | Assertion/pair |
|---|---:|---:|---:|---:|---:|
| Constable 2016 Prelims | 65.0% | 8.0% | 14.5% | 3.5% | 9.0% |
| SI 2016 Mains GS | 60.5% | 20.5% | 12.0% | 1.5% | 5.5% |
| Constable 2018 Mains | 77.0% | 10.0% | 6.0% | 4.5% | 2.5% |
| SI 2018 Mains GS | 70.5% | 11.0% | 9.5% | 3.5% | 5.5% |
| SI 2022 Prelims | 92.0% | 0.0% | 0.5% | 3.0% | 4.5% |
| SI 2023 Mains GS | 93.5% | 0.0% | 3.5% | 1.5% | 1.5% |
| TGPSC Group-I 2024 | 46.7% | 31.3% | 10.7% | 7.3% | 4.0% |

### Three rules derived from this data - never violate

1. **TGPRB 2022-2023 is 92-93.5% direct factual MCQs.** Never claim TGPRB has adopted multi-statement formats. The data shows the opposite: TGPRB papers became *more* direct between 2018 and 2023, not less.
2. **TGPSC Group-I 2024 shows a real complexity shift** (46.7% direct, 31.3% multi-statement). This is a useful preparation hedge signal for 2026, but it is NOT a confirmed TGPRB blueprint. Present it as "TGPSC-style advanced practice" in student-facing content.
3. **No retrieved public document identifies a shared confidential faculty panel between TGPSC and TGPRB.** The UPSC newsletter confirms university/academic-body involvement in TGPSC work, but does not disclose roster membership or shared membership with TGPRB. Never state shared paper-setters as fact.

### Dual-stratification rule for content

| Layer | Input papers | Product role |
|---|---|---|
| Fact and concept inventory | TSLPRB 2015-2023 (all 25 papers) | Extract atomic facts, distractor families, maps, timelines, high-frequency concepts. Primary training format. |
| Format/complexity blueprint | TGPSC Group-I 2024 | Model multi-statement, matching, ordering, assertion-reason drills as *supplementary hardening*. Always label as advanced practice. |
| Calibration | 2026 SI notification + any future released TGPRB paper | Apply actual marking penalty, current syllabus, and only verified format changes. |

## Content generation - never deviate
- Tier is computed per topic from its real, verified PYQ count - never assumed from the subject's general weight. Tier 1 (10+): full note. Tier 2 (3-9): compact note. Tier 3 (<3): flashcards only, no note.
- The visual rule is independent of tier: any topic - even Tier 2 - keeps a map/diagram if its facts are genuinely spatial, chronological, or hierarchical. A flat list never gets one, regardless of tier.
- **Image placement flexibility**: Images, maps, and diagrams can be placed ANYWHERE on a note page where relevant (at the top, inside deep-dive sections, after river/subtopic tables, or next to specific facts). There are no rigid placement restrictions - place visuals wherever they best clarify exam content.
- **As many images as are useful - no limit**: No cap per topic, per section, or per note page. Each subtopic, each canal system, each dam, each zone, each historical event - if a visual helps the student understand or remember the exam content, add it. Always search online first; generate with `generate_image` only when nothing suitable exists or a custom annotated version is clearly better. Never reduce images to "keep the page clean".
- A note's comprehension-gate MCQs never enter the FSRS queue directly. Passing the gate is what unlocks the note's atomic flashcards and its real PYQs into the queue.
- Prefer real, verified PYQs everywhere. Any synthetic/practice question must be explicitly labeled as such - never presented as a real PYQ.
- **Synthetic multi-statement/matching questions must be labelled as "TGPSC-style advanced practice"** - never present them as reflecting the confirmed TGPRB format. The verified TGPRB format (2022-2023) is 92-93.5% direct factual MCQs. Multi-statement drills are supplementary hardening, not the primary question type.
- Current affairs are a separate content type, never edited into a note's markdown file.
- **A topic is not done until its tagged current-affairs entries visibly render on its live note page** - not just exist as a content file. Check this in the browser for every topic, the same way you would check the gate.
- **Mandatory Topic Delivery Integrity Gate (Zero Half-Baked Notes)**:
  A note page is NEVER complete just because its `.vue` file was authored. Every topic note page MUST satisfy the full contract:
  1. `content/data/gates/<topic>.json` with at least 5 factual MCQs, registered in `server/api/gate/[noteId].get.ts`.
  2. `content/data/flashcards/<subject>/<topic>.json` with at least 10 atomic flashcards, with `note_id` property, registered in `server/api/flashcards/[noteId].get.ts`.
  3. Both `<GateQuiz note-id="..." />` and `<CurrentAffairsStrip note-id="..." />` matching the registered `note-id`.
  4. Both 'gate' and 'current-affairs' registered in the TOC `sections` array.
  5. `npm run verify:integrity` MUST pass with exit code 0 before any note task is considered done.
- **Subject Banks navigation invariant**: All subject links in `layouts/default.vue` (`const subjects`) and `pages/index.vue` (`openSubject`) must route to Subject Hubs (`/notes/<subject>`), never directly bypassing to an individual note topic.

## Fact verification - never assume, always cite the data year

**AI knowledge cutoff warning**: When writing note content that includes statistical data (irrigation percentages, census figures, GDP numbers, scheme allocations, population data, scheme corpus amounts), the AI model's training data may be 1-3 years behind current official publications. Do NOT silently present stale data as current 2026 fact.

### Mandatory rules for statistical content in notes:
- Always cite the source and data year in a `text-body-xs t-lo` caption below the data (e.g. "Source: 4th Minor Irrigation Census 2017-18, Ministry of Jal Shakti").
- If the data year is older than 2023, add a note: "Verify against latest official publication before exam."
- For government scheme allocations (PMKSY corpus, MIF amounts, budget figures), always cite the Budget year or scheme launch year.
- Engineering constants (dam heights, river lengths, canal distances) are stable - no year flag needed.
- Population, census, and agricultural percentages change with each Census/Survey cycle. Flag these.

### Preferred 2026-verified sources (check these first):
- Ministry of Jal Shakti (jalshakti-dowr.gov.in) - Irrigation census, dam safety, canal data
- India Water Portal (indiawaterportal.org) - Independent secondary verification
- PIB press releases (pib.gov.in) - Scheme updates, new dam inaugurations, revised corpus
- Ministry of Finance Union Budget documents - Latest scheme allocation amounts
- NABARD annual reports - MIF disbursement data
- National Commission for Integrated Water Resources Development (NCIWRD) reports

### Example correct citation in note:
```html
<p class="mt-2 text-body-xs t-lo font-mono">
  Source: 4th Minor Irrigation Census 2017-18 (Ministry of Jal Shakti).
  5th Census data collection in progress as of 2025 - verify for exam.
</p>
```

### Subject-specific note scaffolds - mandatory reference
When building any topic note page, follow the subject scaffold from `docs/tslprb-pyq-processing-engine-research-report.md`:
- **Geography (6-Point Scaffold)**: 01. Location, 02. Origin/source, 03. Direction/extent, 04. States/regions, 05. Connections (dams/tributaries), 06. Key exam distinction.
- **History (5-Step Causal Chain)**: Cause -> Event -> Leader/Authority -> Outcome -> Next consequence.
- **Polity (4-Tier Architecture)**: Part -> Constitutional Area -> Article Range -> Landmark Articles.
- **Arithmetic (7-Step Drill)**: Formula/Condition -> 15-25 untimed examples -> changed-value variants -> mixed practice -> timed set -> error-log retest -> speed benchmark.
- **General Science**: Biology (diagram redraws), Physics (formula-condition-unit cards), Chemistry (contrastive pairs).
- **Telangana GK (2-Axis Framework)**: Spatial (district -> landmark) + Thematic (history -> movement -> culture -> governance -> schemes).

## Current Affairs system - read before building any note page

### How the system works (end to end)

```
workers/scrapy-pib/pib_master_2025_2026.db
  - 26,699 PIB press releases (Jan 2025 - Aug 2026)
  - Schema: articles(prid, title, pub_date, ministry, office, full_text, url)
        |
        v
scripts/pib_ca_pipeline/pib_scorer.py
  - Scores all 26,699 articles by exam relevance
  - Rejects tenders, condolences, ceremonial, Year-End Reviews
  - Outputs: data/pib_scored_manifest.json (prid, score, is_telangana_focus)
        |
        v
scripts/pib_ca_pipeline/extract_ca_cards.py
  - Reads scored manifest, filters score >= 2.0 OR is_telangana_focus
  - Calls Gemini 3.6 Flash (via Vertex AI Service Account) on each article
  - PRID-based resume support - re-runs skip already-processed articles
  - Writes structured markdown to content/current-affairs/*.md
  - Run: python3 scripts/pib_ca_pipeline/extract_ca_cards.py 500
        |
        v
content/current-affairs/*.md  (676 cards as of Aug 2026)
        |
        v
CurrentAffairsStrip.vue  (fetches all, filters by note-id prop)
  - Splits into "New since last visit" vs "Earlier" (client-side, onMounted only)
  - useTopicVisits: localStorage (instant) + Supabase (cloud sync)
        |
        v
Note page shows relevant strip automatically
```

For Telangana-specific events not on PIB (state sports, local inaugurations), create entries manually in `content/current-affairs/`.
To retag Telangana focus after bulk generation: `python3 scripts/pib_ca_pipeline/retag_telangana_focus.py`

### Frontmatter schema for content/current-affairs/*.md

```yaml
---
id: "CA-ENV-INDIA-FOREST-COVER-20260809"
type: "current_affair"
category: "environment"                      # one of 12 PYQ categories
exam_section: "Geography"
topic: "Forests of India"
related_topic_ids:
  - "NOTE-GEO-ENVIRONMENT"
  - "NOTE-GEO-FORESTS"                       # auto-tagged by pib_scraper.py
is_telangana_focus: false
difficulty: "M"                              # F=Easy, M=Medium, O=Hard
exam_depth: "both"                           # constable | si | both
headline: "India's forest cover increased by 1,445 sq km in 2023"
exam_fact: "India's total forest cover stood at 7,15,343 sq km as per FSI 2023."
summary: "Forest Survey of India 2023 report key finding..."
event_date: "2026-01-15"
published_at: "2026-08-09T07:30:00+05:30"
date: "2026-08-09"
source_name: "PIB"
source_type: "official"
ministry: "Ministry of Environment Forest and Climate Change"
canonical_source_url: "https://pib.gov.in/..."
source_url: "https://pib.gov.in/..."
event_key: "FSI-FOREST-COVER-2023"
mcqs:
  - question: "What was India's total forest cover according to FSI 2023?"
    options: ["7,15,343 sq km", "6,98,150 sq km", "7,28,000 sq km", "7,10,000 sq km"]
    answer: 0
    explanation: "FSI 2023 report placed total forest cover at 7,15,343 sq km."

Note: `mcqs` is always an array (1-2 items). `CACard.vue` supports multi-MCQ navigation.
Do NOT use legacy `mcq:` (single object) - only `mcqs:` (array) is supported.
---
```

### NOTE ID convention - never deviate

Every note page must have exactly one NOTE ID. Format: `NOTE-{SECTION}-{TOPIC}`

| Subject | Section code | Example NOTE IDs |
|---|---|---|
| Geography | GEO | NOTE-GEO-DRAINAGE, NOTE-GEO-ENVIRONMENT, NOTE-GEO-MOUNTAINS |
| Polity | POL | NOTE-POL-CONSTITUTION, NOTE-POL-PARLIAMENT |
| Economy | ECO | NOTE-ECO-GENERAL, NOTE-ECO-BANKING |
| Telangana | TEL | NOTE-TEL-GENERAL, NOTE-TEL-HISTORY |
| Science & Tech | SCI | NOTE-SCI-GENERAL, NOTE-SCI-SPACE |
| History | HIS | NOTE-HIS-GENERAL, NOTE-HIS-MODERN |
| Arithmetic | ARI | NOTE-ARI-GENERAL |

### Note Page Structure: Subject-Specific Scaffolds + 4-Stage Evaluation Block

Every Tier-1 and Tier-2 note page consists of two integrated layers:

1. **Content Layer (Subject-Specific Cognitive Scaffold)**:
   The pedagogical sections are structured according to the subject scaffold defined in `docs/tslprb-pyq-processing-engine-research-report.md` (e.g. Geography 6-Point Scaffold, History 5-Step Causal Chain, Polity 4-Tier Architecture, Arithmetic 7-Step Drill). Do not force an artificial, generic section template onto subjects that require distinct chronological or hierarchical scaffolds.

2. **Mandatory 4-Stage Practice & Evaluation Closing Block**:
   Every topic note page MUST terminate with these four standardized sections placed sequentially at the bottom and registered in the right-side Table of Contents (TOC) `sections` array:
   - **PYQs**: Real TGPRB verified questions (2015-2023) representing the confirmed 92-93.5% direct factual format.
   - **Advanced Practice**: TGPSC-style hardening drills (multi-statement, 4x4 matching, assertion-reason) in a distinct indigo visual theme (`border-indigo-500/30 bg-indigo-500/5`) with pedagogical disclaimer.
   - **Comprehension Gate**: `<GateQuiz>` component (pass 3/5 to unlock flashcards into FSRS).
   - **Current Affairs**: `<CurrentAffairsStrip>` carousel tagged to the topic.

Example bottom-of-page layout structure:

```html
<!-- ── 07 · Advanced Practice ───────────────────────────────────── -->
<section id="advanced-practice" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">07</span>
    <h2 class="sec-title">Advanced Practice</h2>
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">TGPSC-style hardening drills</span>
  </header>
  <!-- Indigo disclaimer + interactive cards -->
</section>

<!-- ── 08 · Comprehension Gate ─────────────────────────────────── -->
<section id="gate" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">08</span>
    <h2 class="sec-title">Comprehension Gate</h2>
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
  </header>
  <GateQuiz note-id="NOTE-GEO-DRAINAGE" />
</section>

<!-- ── 09 · Current Affairs ─────────────────────────────────────── -->
<section id="current-affairs" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">09</span>
    <h2 class="sec-title">Current Affairs</h2>
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">tagged to this topic</span>
  </header>
  <CurrentAffairsStrip note-id="NOTE-GEO-DRAINAGE" />
</section>
```

### Does the extractor auto-tag topics?

**Yes - Gemini reads each article and tags matching NOTE-IDs.** `extract_ca_cards.py` sends the full article text to Gemini 3.6 Flash, which reads the content and assigns matching `related_topic_ids` (e.g. `NOTE-GEO-DRAINAGE` for a river/dam article) from the known NOTE-ID list.

After bulk generation, run the Telangana retagger to normalize `is_telangana_focus`:
```bash
python3 scripts/pib_ca_pipeline/retag_telangana_focus.py
```
This deterministically sets `is_telangana_focus: true` only when Telangana is central to the core exam fact (not just a passing mention). Target: ~36% of cards, not 68%.

For Telangana-specific events not on PIB (state sports, local inaugurations, TG police), create entries manually in `content/current-affairs/`.

### News sources used - source hierarchy (never invert)

| Priority | Source | File | Covers |
|---|---|---|---|
| 1 (primary) | PIB (pib.gov.in) | `pib_scraper.py` | Appointments, awards, defence, ISRO, schemes, economy - ~65% of PYQ CA |
| 2 (manual only) | Telangana official | Manual entries | TG budget, local inaugurations, TGPRB notices, TG police |

**Why PIB first:** PYQ analysis of 10 papers shows PIB-sourced content covers appointments (22 questions), awards (16), defence (10), science (6), schemes (13) - all verifiable to official press releases. PIB copyright permits reproduction for educational use.

**Why not GDELT or Google News RSS:** GDELT rate-limits after 1-2 requests (429 errors). Google News RSS returns only 7 stale articles for PIB. Both removed permanently. PIB has its own date-wise archive at `pib.gov.in/allRel.aspx?reg=3&lang=1`.

Coverage gap: Sports results (boxing, cricket) and local Hyderabad events are NOT on PIB. Create these entries manually or from Telangana Today.

### PYQ-based timeline rules (never change these without PYQ evidence)

From analysis of Constable 2022, Constable 2023, SI 2022, SI 2023 papers:
- 85% of current affairs questions = events from last 6 months before exam date
- 10% = events from 7-12 months before exam date
- 5% = events from 13-24 months before exam date (max lookback)
- Events as recent as 3-4 weeks before exam date appear in questions
- Scraper MAX_AGE_DAYS is set to 365 (1 year). Do not reduce below 180.

High-yield PYQ categories (build feeds for these first if adding new ones):
1. Telangana-specific (state budget, inaugurations, schemes, local events)
2. National appointments (Governors, ministers, CEOs, CJI)
3. Sports and awards (Padma, Jnanpith, boxing, cricket)
4. ISRO / Space / Defence
5. International summits and bilateral agreements
6. Environment and wildlife (national parks, new species, UNESCO)


### Per-topic current affairs checklist (run when building any new note)

When building a new topic (e.g. Forests of India with NOTE-GEO-FORESTS):

**Step 1 - Wire the Gate and Current Affairs sections at the bottom of the page:**
Add the `<GateQuiz>` and `<CurrentAffairsStrip>` components inside their respective standard sections at the end of the template (before the footer navigation), matching the layout structure.

**Step 2 - Register sections in the TOC:**
Add `advanced-practice`, `gate`, and `current-affairs` to the `sections` array in the script block so they render in the right-side sticky TOC:
```ts
const sections = [
  // ... other sections
  { id: 'pyqs',              label: 'PYQs' },
  { id: 'advanced-practice', label: 'Advanced Practice' },
  { id: 'gate',              label: 'Comprehension Gate' },
  { id: 'current-affairs',   label: 'Current Affairs' },
]
```

**Step 3 - Setup the gate JSON:**
GateQuiz self-fetches from `server/api/gate/[noteId].get.ts`. You MUST:
1. Generate the gate JSON: `python3 scripts/note_pipeline/generate_gates_and_cards.py NOTE-GEO-FORESTS`
2. Save output to `content/data/gates/forests-of-india.json` (canonical schema: `note_id`, `pass_threshold`, `questions[].correct_answer`)
3. Add an import + registry entry in `server/api/gate/[noteId].get.ts`

**Step 4 - Complete Current Affairs Tagging (Strict Rule: Zero Omissions):**
- **Every single relevant card in `content/current-affairs/*.md` must be tagged** with `NOTE-{SECTION}-{TOPIC}`.
- **Never tag just an arbitrary 1-3 cards.** Scan the entire `content/current-affairs/` directory to attach all matching events (e.g. all relevant reports, schemes, appointments, summits, or state orders).
- If fewer than 3 matching cards exist in the database, extract new cards from PIB (`extract_ca_cards.py`) or create official state cards so the student gets comprehensive current coverage.

**Step 5 - Verify in browser:**
Open the note page. The CurrentAffairsStrip must render all tagged cards in the carousel.
A topic is not done until this is visible. If strip is empty, check:
- `note-id` prop matches the `related_topic_ids` in the `.md` files exactly
- `content.config.ts` has the `current_affair` collection defined
- `server/api/gate/[noteId].get.ts` has the gate registered
- Dev server restarted or refreshed after adding new `.md` files

### New-since-last-visit tracking

`useTopicVisits` composable tracks per-user last-seen timestamps:
- Layer 1: localStorage (instant, offline, no auth needed)
- Layer 2: Supabase `topic_visits` table (cloud sync when logged in)

Cards split automatically into "New since last visit" (saffron highlight) and "Earlier" (collapsed). First visit shows all cards under "Earlier" - never floods with backlog.

- The due-review count is the homepage's dominant element - never one of several equal-weight stat cells.
- The subject list ranks by real PYQ weightage - never a static alphabetical list.

## Key files added by the CA system build (Aug 2026)

| File | Purpose |
|---|---|
| `composables/useCACategories.ts` | Single source of truth for 12 CA categories (label, icon, color). Used by CACard.vue and pages/current-affairs.vue. Never duplicate category definitions elsewhere. |
| `server/api/gate/[noteId].get.ts` | SSR-safe gate registry. When adding a new topic gate, import its JSON here and add to the GATES map. |
| `content/data/gates/*.json` | Canonical gate schema: `{ note_id, pass_threshold, questions: [{ id, question, options, correct_answer, explanation }] }`. Never use legacy `topic_id`/`pass_score`/`answer` field names. |
| `scripts/pib_ca_pipeline/retag_telangana_focus.py` | Deterministic Telangana focus retagger. Run after bulk card generation. Target: ~36% of cards flagged, not 68%. |
| `data/pib_scored_manifest.json` | Scored manifest from pib_scorer.py. Input for extract_ca_cards.py. |

## Process
- This file is the standing constitution. Task prompts should point back to a section here ("per the image rules in AGENTS.md"), not restate it.
- `docs/build-prompt.md` holds the full one-time spec (schema, Tier-1 template, settings, deployment). Update it when an architecture decision actually changes - not for routine topic-by-topic work.
- No em-dashes anywhere in the codebase. Use standard hyphens only. The `predev`/`prebuild` hooks enforce this automatically.

## Standard Workflow: One-Line Topic Generation Directive

Whenever the user provides a prompt in the format:
`Topic - [Topic Name] ([Subject])` (e.g., `Topic - Forests of India (Geography)`), the agent must immediately execute the complete topic creation pipeline without asking any clarifying questions:

1. **PYQ Extraction & Tier Determination**: Query `data/pyq_enriched_master.json` for verified PYQs matching the topic to compute the Tier and load question content.
2. **Authentic Image Sourcing**: Search online first (Wikipedia/Wikimedia Commons/government portals) for real maps, diagrams, and photographs. Download directly to `assets-to-upload/[subject]/` and preview in `public/images/[subject]/`.
3. **Comprehensive Current Affairs Attachment (All Matching Cards)**: Scan the entire `content/current-affairs/*.md` database and tag **every matching card** to `NOTE-[SECTION]-[TOPIC]`. If no cards exist in the database, extract or create official cards from PIB/State sources. Every matching card must be attached - never an arbitrary subset.
4. **Generate Full Note Page**: Generate `pages/notes/[subject]/[topic-slug].vue` structuring the conceptual content according to the **Subject-Specific Scaffold** (e.g. Geography 6-point, History causal chain, Polity architecture), followed by the **Standard 4-Stage Closing Block** (Interactive PYQs, TGPSC-Style Advanced Practice, Comprehension Gate, Current Affairs).
5. **Comprehension Gate Setup**: Generate the 5-MCQ Gate Quiz JSON at `content/data/gates/[topic-slug].json` and register the NOTE-ID in `server/api/gate/[noteId].get.ts`.
6. **Navigation Updates**: Add the live topic link to `pages/notes/[subject]/index.vue` and check default layout sidebar navigation.
7. **Prebuild & Verification**: Run `npm run prebuild` (zero em-dashes check) and verify `HTTP 200` on the live URL. Verify that both `<GateQuiz>` and `<CurrentAffairsStrip>` render live data.
8. **Git Commit & Push**: Commit code and images together (`git push origin main`) and pull back after GitHub Action Cloudinary conversion.

## Content improvement queue - agent processing

When the user says **"Process improvement queue"** or **"Process my improvements"**, the agent must:

1. **Export pending items**: Run `python3 scripts/export_improvement_queue.py` to get all pending content improvement submissions as JSON.
2. **Process each item**: For each item, read the `note_id` and `section_id` to locate the exact Vue file and section. The `item_type` determines the action:
   - `replace_image` / `add_image`: Source the image per the Image Sourcing Workflow rules above, place in `assets-to-upload/`, and update the Vue template.
   - `fix_fact`: Verify the claim against official sources, then edit the relevant text.
   - `add_table`: Create a properly formatted data table in the specified section.
   - `add_topic`: Add a new subsection with exam-relevant content.
   - `other`: Read the description and apply judgment.
   - If `reference_url` is provided, use it as a starting point (download the image, read the article, etc.).
3. **Mark as done**: After processing each item, run `python3 scripts/export_improvement_queue.py mark-done <item_id> "Brief description of what was done"`.
4. **Never silently skip items**: If an item cannot be processed (bad URL, unclear description), mark it as `skipped` with an explanation in admin_notes rather than ignoring it.
