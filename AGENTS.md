# AGENTS.md - TSLPRB StudyOS

Persistent rules for every agent working in this repo. Read this before any task. The full build spec (schema, tier template, build order) lives in `docs/build-prompt.md` - reference it, don't restate it. The current affairs strategy, PYQ evidence, source priorities and UX requirements live in `docs/current-affairs-audit.md` - read it before touching anything in the CA pipeline.

## Architecture - never substitute
- Nuxt 3 + Nuxt Content. Never Astro, Next.js/Nextra.
- Nuxt UI (`@nuxt/ui`) for all components. No hand-rolled design-token system.
- Cloudflare Pages (app) + Cloudinary (media/images). Supabase for auth/review-state/FSRS data only - never media.
- FSRS via `ts-fsrs`. Never hand-roll SM-2 or Leitner.
- No PWA, no service workers, no offline caching.
- No Framer Motion, no bespoke animation elsewhere. GSAP only for topics that pass the visual rule below. Plain CSS/Nuxt UI defaults for everything else.
- Never invoke `image-to-code`, `imagegen-frontend-web`, or `imagegen-frontend-mobile` skills on this project. No reference-image-first design workflow.

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
- `extracted_questioin_paper_json/` contains the 25 clean structured JSON files (one per official exam paper) that were used to build `pyq_enriched_master.json`. Keep this as permanent ground truth reference.
- `Extracted_Text/`, `Deep_Analysis.txt`, and `Topic_Banks/` are deleted legacy files. Do not reference or recreate them.
- The 2026 exam has a real 20% negative-marking penalty. Never build any "always guess" feature or copy that implies free guessing.

## Content generation - never deviate
- Tier is computed per topic from its real, verified PYQ count - never assumed from the subject's general weight. Tier 1 (10+): full note. Tier 2 (3-9): compact note. Tier 3 (<3): flashcards only, no note.
- The visual rule is independent of tier: any topic - even Tier 2 - keeps a map/diagram if its facts are genuinely spatial, chronological, or hierarchical. A flat list never gets one, regardless of tier.
- **Image placement flexibility**: Images, maps, and diagrams can be placed ANYWHERE on a note page where relevant (at the top, inside deep-dive sections, after river/subtopic tables, or next to specific facts). There are no rigid placement restrictions - place visuals wherever they best clarify exam content.
- **No maximum image count per topic**: There is no cap on the number of images, maps, or diagrams per topic or per note page. If a subtopic (e.g. each individual river system - Ganga, Brahmaputra, Godavari, Krishna, Cauvery, Narmada, Tapi, Mahanadi, Indus) has a relevant exam diagram that helps the student understand spatial facts, tributaries, dams, or flow direction - add it. One image per subtopic is encouraged whenever a visual exists. Never skip an image because "there are already enough images on the page."
- A note's comprehension-gate MCQs never enter the FSRS queue directly. Passing the gate is what unlocks the note's atomic flashcards and its real PYQs into the queue.
- Prefer real, verified PYQs everywhere. Any synthetic/practice question must be explicitly labeled as such - never presented as a real PYQ.
- Current affairs are a separate content type, never edited into a note's markdown file.
- **A topic is not done until its tagged current-affairs entries visibly render on its live note page** - not just exist as a content file. Check this in the browser for every topic, the same way you would check the gate.

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

### Wiring CurrentAffairsStrip to a new note page

Every Tier-1 and Tier-2 note page MUST include the strip. Add it after the closing `</header>` of the title block, before the coverage strip:

```html
<!-- Current Affairs for this note -->
<CurrentAffairsStrip note-id="NOTE-GEO-DRAINAGE" class="mb-8" />
```

Replace `NOTE-GEO-DRAINAGE` with the exact NOTE ID for that page. The component auto-filters and shows only matching entries. If no entries exist yet, it renders nothing (v-if guard).

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

**Step 1 - Wire the strip on the note page:**
```html
<CurrentAffairsStrip note-id="NOTE-GEO-FORESTS" class="mb-8" />
```

**Step 2 - Wire the gate on the note page:**
```html
<GateQuiz note-id="NOTE-GEO-FORESTS" />
```
GateQuiz self-fetches from `server/api/gate/[noteId].get.ts`. When adding a new note, you MUST:
1. Generate the gate JSON: `python3 scripts/note_pipeline/generate_gates_and_cards.py NOTE-GEO-FORESTS`
2. Save output to `content/data/gates/forests-of-india.json` (canonical schema: `note_id`, `pass_threshold`, `questions[].correct_answer`)
3. Add an import + registry entry in `server/api/gate/[noteId].get.ts`

**Step 3 - Run CA extraction to get tagged cards:**
```bash
python3 scripts/pib_ca_pipeline/extract_ca_cards.py 500
```
Gemini will auto-tag articles matching NOTE-GEO-FORESTS with `related_topic_ids`. PRID-based resume means re-runs are safe and cheap.

**Step 4 - Verify in browser:**
Open the note page. The CurrentAffairsStrip must render at least one card.
A topic is not done until this is visible. If strip is empty, check:
- note-id prop matches the related_topic_ids in the .md files exactly
- content.config.ts has the current_affair collection defined
- `server/api/gate/[noteId].get.ts` has the gate registered
- Dev server restarted after adding new .md files

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
