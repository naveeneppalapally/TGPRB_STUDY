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
- `Extracted_Text/` is the only ground truth. Always re-derive tier counts and question content from here, never hardcode numbers from a prior analysis.
- `Deep_Analysis.txt` is a QA cross-check only, never a data source. Its "no negative marking / guess (2) or (3)" guidance and its cutoff numbers are confirmed wrong - never build either into the app.
- `Topic_Banks/` is a draft tagging only. A question counts toward a tier or a note only after it has a `verified_topic_id`, not just its original folder tag.
- The 2026 exam has a real 20% negative-marking penalty. Never build any "always guess" feature or copy that implies free guessing.

## Content generation - never deviate
- Tier is computed per topic from its real, verified PYQ count - never assumed from the subject's general weight. Tier 1 (10+): full note. Tier 2 (3-9): compact note. Tier 3 (<3): flashcards only, no note.
- The visual rule is independent of tier: any topic - even Tier 2 - keeps a map/diagram if its facts are genuinely spatial, chronological, or hierarchical. A flat list never gets one, regardless of tier.
- A note's comprehension-gate MCQs never enter the FSRS queue directly. Passing the gate is what unlocks the note's atomic flashcards and its real PYQs into the queue.
- Prefer real, verified PYQs everywhere. Any synthetic/practice question must be explicitly labeled as such - never presented as a real PYQ.
- Current affairs are a separate content type, never edited into a note's markdown file.
- **A topic is not done until its tagged current-affairs entries visibly render on its live note page** - not just exist as a content file. Check this in the browser for every topic, the same way you would check the gate.

## Current Affairs system - read before building any note page

### How the system works (end to end)

```
PIB archive (pib.gov.in/allRel.aspx?reg=3&lang=1)
        |
        v
workers/scrapy-pib/pib_scraper.py
  - Fetches every English press release date-by-date
  - Gemini reads full article text (extraction only, never generates)
  - Step 1: Rejects tenders, condolences, ceremonial, Year-End Reviews
  - Step 2: Checks against 12 PYQ-proven categories
  - Step 3: Extracts exam_fact, mcq, difficulty (F/M/O), exam_depth
  - Auto-discovers all NOTE-IDs from pages/notes/**/*.vue at startup
  - Tags each card with matching NOTE-IDs automatically
        |
        v
content/current-affairs/*.md  (committed by GitHub Actions daily at 7am IST)
        |
        v
CurrentAffairsStrip.vue  (fetches all, filters by note-id prop)
  - Splits into "New since last visit" vs "Earlier"
  - useTopicVisits: localStorage (instant) + Supabase (cloud sync)
        |
        v
Note page shows relevant strip automatically
```

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
mcq:
  question: "What was India's total forest cover according to FSI 2023?"
  options: ["7,15,343 sq km", "6,98,150 sq km", "7,28,000 sq km", "7,10,000 sq km"]
  answer: 0
  explanation: "FSI 2023 report placed total forest cover at 7,15,343 sq km."
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

### Does the scraper cover all topics automatically?

**Yes - via auto-discovery.** `pib_scraper.py` scans `pages/notes/**/*.vue` at startup and finds every `<CurrentAffairsStrip note-id="NOTE-XXX" />`. No manual config needed when a new topic is built.

How it works:
1. `discover_note_registry()` scans all note pages, builds `{NOTE-ID: keywords}` map
2. `apply_registry_to_category_note_ids()` adds discovered IDs to the category routing table
3. `build_dynamic_prompt_section()` injects the full NOTE-ID list into Gemini's prompt
4. Gemini reads the article and tags it with matching NOTE-IDs from the list

For Telangana-specific events (budget, local inaugurations, TG police, sports) not covered by PIB, create entries manually in `content/current-affairs/`.

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
That is all the scraper needs. It auto-discovers this NOTE-ID on the next run.

**Step 2 - Run the PIB historical backfill (Jan 2025 to today):**

Go to GitHub Actions -> PIB Backfill (Manual) -> Run workflow:
- `from_date`: 2025-01-01
- `to_date`: (leave blank, defaults to today)
- `max_per_day`: 30

The scraper auto-discovers NOTE-GEO-FORESTS from the Vue file and tags matching articles automatically. No editing of `pib_scraper.py` needed.

After this: the daily scraper (`pib-daily.yml`, runs 7am IST) keeps the strip updated forever.

**Step 3 - Verify in browser:**
Open the note page. The CurrentAffairsStrip must render at least one card.
A topic is not done until this is visible. If strip is empty, check:
- note-id prop matches the related_topic_ids in the .md files exactly
- content.config.ts has the current_affair collection defined
- Dev server restarted after adding new .md files

### New-since-last-visit tracking

`useTopicVisits` composable tracks per-user last-seen timestamps:
- Layer 1: localStorage (instant, offline, no auth needed)
- Layer 2: Supabase `topic_visits` table (cloud sync when logged in)

Cards split automatically into "New since last visit" (saffron highlight) and "Earlier" (collapsed). First visit shows all cards under "Earlier" - never floods with backlog.


- The due-review count is the homepage's dominant element - never one of several equal-weight stat cells.
- The subject list ranks by real PYQ weightage - never a static alphabetical list.

## Process
- This file is the standing constitution. Task prompts should point back to a section here ("per the image rules in AGENTS.md"), not restate it.
- `docs/build-prompt.md` holds the full one-time spec (schema, Tier-1 template, settings, deployment). Update it when an architecture decision actually changes - not for routine topic-by-topic work.
- No em-dashes anywhere in the codebase. Use standard hyphens only. The `predev`/`prebuild` hooks enforce this automatically.
