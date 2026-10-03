> Current implementation: delivery paths and PYQ selectors live in `data/topics_master.json`; explicit imports live in `server/utils/learning-content.ts` and `server/utils/study-chapters.ts`. Prebuild regenerates canonical bundles and subject statistics. APIs normalize aliases once. Direct mode is an intentional self-study option. The in-app AI assistant has been removed. Current Affairs YAML is validated by field types, not line count. See `docs/audit-remediation-2026-10-02.md` for migration and verification details.

# Current Affairs Pipeline - TSLPRB StudyOS

This document provides the complete, authoritative technical specification for the Current Affairs (CA) harvesting, scoring, extraction, topic mapping, and delivery pipeline in TSLPRB StudyOS.

This specification is the direct technical implementation companion to `AGENTS.md`.

---

## 1. End-to-End System Architecture

Two ingestion paths share the same local content contract: the raw SQLite/scorer/extractor path below, and the scheduled direct scraper in `.github/workflows/pib-daily.yml`. Both use the closed NOTE-ID registry and reject invalid answer indices or more than two MCQs before writing a card. The configured Gemini model and the model that actually succeeded can differ in the direct scraper, which supports a fallback pool; new cards record `extraction_model`.

### 1.1 Architecture Flowchart

```
+-------------------------------------------------------------------------+
|                  PIB Raw Ingestion (workers/scrapy-pib)                  |
|  - Crawls pib.gov.in with browser headers & canonical host redirect     |
|  - Workflow plans monthly chunks covering a rolling 365-day window     |
|  - Master location: PIB_DB_PATH, or the historical default below        |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|             Exam Relevance Scorer (scripts/pib_ca_pipeline/pib_scorer.py)|
|  - Applies HARD_REJECT_PATTERNS (tenders, condolences, greetings)        |
|  - Computes weighted score across 12 PYQ categories                      |
|  - Emits scored candidate manifest: data/pib_scored_manifest.json       |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|        LLM Card Extraction (scripts/pib_ca_pipeline/extract_ca_cards.py)|
|  - Filters score >= 2.0 OR is_telangana_focus                            |
|  - Configured Gemini structured JSON extraction via Vertex AI           |
|  - Enforces closed enum related_topic_ids from data/topics_master.json   |
|  - Writes structured Markdown cards to: content/current-affairs/*.md    |
|  - PRID ledger distinguishes terminal outcomes from retryable failures  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|      Deterministic Retagging (scripts/pib_ca_pipeline/retag_telangana_focus.py)|
|  - Pure regex re-derivation of is_telangana_focus from core facts       |
|  - Derives the flag from factual text, without a required target ratio  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|      Deterministic Sync Pipeline (scripts/pib_ca_pipeline/sync_ca_topics.py)|
|  - Normalizes legacy aliases to canonical NOTE-IDs                      |
|  - Regex word-boundary (\b) matching across data/topics_master.json kws  |
|  - Invoked via: npm run sync:ca-topics                                  |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|            Client Delivery Layer (components/CurrentAffairsStrip.vue)   |
|  - Filters cards by note-id prop                                        |
|  - useTopicVisits: localStorage (instant) + Supabase (cloud sync)        |
|  - Saffron highlight for "New since last visit" vs collapsed "Earlier"  |
|  - Tier 2 Subject Digest Fallback if direct topic cards < 3             |
+-------------------------------------------------------------------------+
```

---

## 2. Scrapy PIB Crawler Architecture & SQLite Database Schema

### 2.1 Crawler Design Invariants
- **Target URL**: `https://www.pib.gov.in/PressReleasePage.aspx?PRID={prid}&reg=3&lang=1`
- **Canonical Host**: Bare domain `pib.gov.in` issues HTTP 301 redirects. The scraper directly targets `www.pib.gov.in` with `allow_redirects=False` to detect dead PRIDs instantly.
- **WAF Avoidance**: PIB WAF returns HTTP 403 on non-browser user agents. A stable Chrome Linux User-Agent and browser headers (`Referer: https://www.pib.gov.in/`) are used consistently.
- **Timeout Tuning**: Connect timeout of 1.5s (drops invalid PRIDs fast) and read timeout of 4.0s (fetches full HTML).
- **Concurrency**: Thread-safe `requests.Session` per thread with non-locking pace control.

### 2.2 SQLite Schema (`PIB_DB_PATH`)

The scorer and manual extractor default to `workers/scrapy-pib/pib_master_2025_2026.db`. This historical basename is a compatibility path, not a year filter. A downloaded master artifact can live anywhere when `PIB_DB_PATH` points to it. The raw workflow deduplicates by PRID in SQLite and exports its CSV from the same database. Malformed chunk schemas fail the merge.

The master database stores every retrieved press release:

```sql
CREATE TABLE articles (
    prid INTEGER PRIMARY KEY,
    title TEXT,
    pub_date TEXT,
    ministry TEXT,
    office TEXT,
    full_text TEXT,
    url TEXT,
    word_count INTEGER,
    scraped_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(pub_date);
CREATE INDEX IF NOT EXISTS idx_articles_ministry ON articles(ministry);
```

#### Field Specifications:
- `prid`: Press Release ID (unique primary key from PIB URL).
- `title`: Official title of the release.
- `pub_date`: Release date in ISO `YYYY-MM-DD` format.
- `ministry`: Publishing Ministry or Department (e.g., "Ministry of Defence", "Prime Minister's Office").
- `office`: Regional PIB bureau or office (e.g., "PIB Delhi", "PIB Hyderabad").
- `full_text`: Cleaned, whitespace-normalized article body.
- `url`: Canonical source URL.
- `word_count`: Number of words in `full_text`.
- `scraped_at`: Timestamp of crawler execution.

---

## 3. Full YAML Frontmatter Schema (`content/current-affairs/*.md`)

Every current affairs card generated by the pipeline is stored as an individual Markdown file with standard YAML frontmatter. The following example illustrates fields only; verify numerical content against the linked official release before publishing exam material.

```yaml
---
id: "CA-ENV-INDIA-FOREST-COVER-20260809"
type: "current_affair"
category: "environment"
exam_section: "Geography"
topic: "Forests of India"
related_topic_ids:
  - "NOTE-GEO-FORESTS"
source_topic_ids:
  - "NOTE-GEO-FORESTS"
keyword_topic_ids:
  - "NOTE-GEO-FORESTS"
is_telangana_focus: false
difficulty: "M"
exam_depth: "both"
headline: "Verified forest-cover finding from an official release"
exam_fact: "Insert the verified figure and its report year here."
summary: "Add contextual facts verified against the official release."
event_date: "2026-08-09"
published_at: "2026-08-09T07:30:00+05:30"
date: "2026-08-09"
retrieved_at: "2026-08-10T00:00:00+00:00"
event_date_basis: "publication_proxy"
extraction_model: "configured-model-used"
source_name: "PIB"
source_type: "official"
ministry: "Ministry of Environment Forest and Climate Change"
canonical_source_url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2093213&reg=3&lang=1"
source_url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2093213&reg=3&lang=1"
event_key: "FOREST-COVER-SCHEMA-EXAMPLE"
mcqs:
  - question: "Which verified report figure is stated in the source?"
    options:
      - "Verified figure"
      - "Alternative figure 1"
      - "Alternative figure 2"
      - "Alternative figure 3"
    answer: 0
    explanation: "The linked official release states the selected figure and report year."
  - question: "Which body releases the India State of Forest Report?"
    options:
      - "Forest Survey of India"
      - "Wildlife Institute of India"
      - "Botanical Survey of India"
      - "ICFRE"
    answer: 0
    explanation: "The India State of Forest Report (ISFR) is published biennially by the Forest Survey of India (FSI), Dehradun."
---
```

### 3.1 Field-by-Field Specifications

| Field | Type | Allowed Values / Constraints |
|---|---|---|
| `id` | string | Stable identity: new PIB cards include PRID; preserve existing IDs and review aliases when splitting legacy cards. |
| `type` | string | Strictly `"current_affair"` |
| `category` | string | One of 12 categories in `data/ca_contract.json`; UI labels are separate display metadata. |
| `exam_section` | string | One of: `Polity`, `Geography`, `Economy`, `General Studies`, `Science & Technology`, `History`, `Telangana` |
| `topic` | string | Short human-readable topic name |
| `related_topic_ids` | array | Array of canonical `NOTE-{SECTION}-{TOPIC}` strings from `data/topics_master.json` |
| `source_topic_ids` | array | Closed canonical IDs supplied by extraction/category defaults. |
| `curated_topic_ids` | optional array | Explicit human topic assignments, preserved by keyword reconciliation. |
| `keyword_topic_ids` | array | Current deterministic keyword matches, recomputed by sync. |
| `is_telangana_focus`| boolean | `true` only if Telangana / Hyderabad is central to the core exam fact |
| `difficulty` | string | `"F"` (Famous/Easy), `"M"` (Medium), `"O"` (Obscure/Hard) |
| `exam_depth` | string | `"constable"`, `"si"`, or `"both"` |
| `headline` | string | 1-sentence factual headline without em-dashes |
| `exam_fact` | string | Single pinpoint testable fact |
| `summary` | string | 2-3 sentence contextual background |
| `event_date` | string | ISO date; writers currently use the authoritative publication date as an explicitly labeled proxy. |
| `event_date_basis` | string | New writers record `publication_proxy`; use `source_event` only for an independently verified event date. |
| `retrieved_at` | string | Independent retrieval timestamp; never substitute it for source publication. |
| `extraction_model` | string | Actual model used by extraction; legacy cards may have no recorded value. |
| `published_at` | string | ISO timestamp with timezone `YYYY-MM-DDTHH:mm:ss+05:30` |
| `date` | string | ISO date `YYYY-MM-DD` |
| `source_name` | string | `"PIB"`, `"Telangana Official"`, `"Telangana Today"` |
| `source_type` | string | `"official"` or `"media"` |
| `ministry` | string | Ministry name or `"Government of India"` |
| `canonical_source_url` | string | Full URL to source release |
| `source_url` | string | Full URL to source release |
| `event_key` | string | Identifier tag for deduplication |
| `mcqs` | array | Array of 1 to 2 MCQ objects. Legacy single `mcq:` object is forbidden. |
| `mcqs[].question` | string | Question text in who/what/where/which format |
| `mcqs[].options` | array | Exactly 4 distinct plausible options |
| `mcqs[].answer` | number | 0-indexed integer (0 to 3) |
| `mcqs[].explanation` | string | 1-2 sentence explanation citing the fact |

---

## 4. The 5-Pillar Topic Mapping Architecture

To solve current affairs topic mapping permanently across all present and future study topics, the pipeline enforces a 5-pillar architecture:

### Pillar 1: `data/topics_master.json` (Single Source of Truth)
- Central JSON registry of all study topics across TSLPRB StudyOS.
- Defines the closed universe of canonical `NOTE-ID`s.
- Every topic entry requires 5 mandatory fields:
  ```json
  {
    "id": "NOTE-GEO-DRAINAGE",
    "subject": "Geography",
    "title": "Drainage System of India",
    "keywords": [
      "godavari", "krishna", "tributary", "origin", "river basin",
      "peninsular rivers", "himalayan rivers", "drainage system"
    ],
    "aliases": ["NOTE-GEO-RIVERS"]
  }
  ```

### Pillar 2: Closed Enum Extraction (`extract_ca_cards.py`)
- `extract_ca_cards.py` reads `data/topics_master.json` directly.
- The Gemini structured output schema defines `related_topic_ids: List[ValidNoteId]`, where `ValidNoteId` is a typed `Literal` enum containing strictly registered topic IDs.
- The system prompt presents the complete registered topic list. Hallucinated, misspelled, or arbitrary topic IDs are rejected by Pydantic validation before touching disk.

### Pillar 3: Deterministic Sync Pipeline (`sync_ca_topics.py` & `npm run sync:ca-topics`)
- Idempotent script scanning all `content/current-affairs/*.md` files against `data/topics_master.json`.
- **Legacy Alias Normalization**: Maps legacy or alternate IDs (`NOTE-GEO-RIVERS`) to canonical IDs (`NOTE-GEO-DRAINAGE`).
- **Compiled Word-Boundary Regex**: For each topic, all keywords are compiled into a single disjunction regex with word boundaries:
  ```python
  pattern = re.compile(r'\b(?:' + '|'.join(re.escape(k) for k in kws) + r')\b')
  ```
  This eliminates substring false positives (e.g., matching "war" inside "software").
- Recomputes `keyword_topic_ids` from headline, exam fact, summary and topic only, excluding metadata and MCQ distractors. Combines source, curated and current keyword assignments into `related_topic_ids` while normalizing aliases. Unknown IDs are removed, not perpetuated. Legacy related tags are retained as an unverified baseline unless they were already marked as derived.

### Pillar 4: Tier 2 Subject Digest Fallback (`CurrentAffairsStrip.vue`)
- `CurrentAffairsStrip.vue` imports `data/topics_master.json` directly to resolve aliases.
- If a topic has fewer than 3 directly tagged cards, it automatically activates the **Subject Digest Fallback**.
- In fallback mode, it pulls recent high-yield current affairs from the broader subject section (e.g., `POLITY DIGEST`, `GEOGRAPHY DIGEST`, `TELANGANA DIGEST`).
- Renders an informative subject digest chip in the strip header when fallback records exist. Availability still depends on source content; a fallback cannot manufacture coverage.

### Pillar 5: Gatekeeper Enforcement (`scripts/verify-topic-integrity.ts`)
- Automated contract verification executed in `prebuild`, `predev`, and `npm test`.
- Asserts that every note page's `note-id` is registered in `data/topics_master.json` and uses canonical topic IDs (never aliases).
- Asserts that every note page has at least 1 verified tagged current affairs card in `content/current-affairs/*.md`.

---

## 5. Tooling & CLI Reference

### 5.1 Pipeline Execution Commands

| Command | Purpose |
|---|---|
| `python3 scripts/pib_ca_pipeline/pib_scorer.py` | Scores all raw PIB articles in SQLite database; produces `data/pib_scored_manifest.json`. |
| `python3 scripts/pib_ca_pipeline/extract_ca_cards.py [N]` | Extracts up to `N` cards using `GEMINI_MODEL`; validates manifest freshness and skips terminal PRIDs, including archived cards. |
| `python3 scripts/pib_ca_pipeline/retag_telangana_focus.py` | Deterministically re-derives `is_telangana_focus` from headline, exam_fact and topic fields. |
| `npm run sync:ca-topics` | Synchronizes keywords and normalizes aliases across all Markdown cards. Run after editing `data/topics_master.json`. |
| `python3 scripts/pib_ca_pipeline/verify_ca_cards.py` | Validates every active card's full frontmatter contract. |
| `npm run test:ca` | Runs writer, validation, retry, provenance and rollover regression fixtures without network requests. |

### 5.1.1 Recovery and Freshness

`data/ca_ingestion_state.json` (or `PIB_STATE_PATH`) records PRID outcomes. Written, irrelevant and duplicate outcomes are terminal; source, model and validation failures remain retryable. The daily workflow persists this ledger and advances its completed-day cursor only after the whole day succeeds. Its overlap window catches late releases and it resumes after long outages. A failed archive request is not an empty successful day. Validated card changes can be committed by the workflow; failed validation prevents card publication while retaining retry state.

The daily scraper uses the AI Studio Developer API through the GitHub Actions secret `GEMINI_API_KEY`; it does not pass Vertex credentials. Runs are scheduled or manually dispatched, not triggered by application pushes. When no completed cursor exists, `backfill_from_date` preserves the requested historical starting point. Existing source cards and archived releases are checked before AI extraction to conserve quota. Queued runs check out current `main`, including earlier bot commits. Extraction stops after 20 minutes within the 30-minute job budget so validation and publication can run. Each run preserves a seven-day recovery artifact containing cards and the outcome ledger before attempting the bot commit. A timeout, quota failure or canceled run is not proof of complete coverage; inspect the saved cursor and retryable outcomes before resuming.

The scorer uses `PIB_REFERENCE_DATE` rather than a preferred calendar year. The manual extractor checks the manifest's database size/mtime, reference date and content hash before use. Model availability and PIB WAF behavior still require live operational checks; fixture success cannot establish them.

### 5.2 Source Hierarchy & PYQ-Derived Rationale

1. **PIB (`pib.gov.in`) (Primary Official)**:
   - Analysis of 10 official papers (2015-2023) shows PIB-sourced content covers appointments (22 questions), awards (16), defence (10), science (6), schemes (13).
   - PIB copyright permits reproduction for educational use.
2. **Telangana State Official / Budget (Secondary / Manual)**:
   - State sports results, local Hyderabad inaugurations, TG police announcements, and state budget items are authored manually or extracted from Telangana Today.
3. **Excluded Sources**:
   - GDELT rate-limits aggressively (HTTP 429).
   - Google News RSS returns stale or low-quality aggregated links.
   - Both are permanently deprecated.

### 5.3 PYQ-Based Lookback Rules
- **85%** of CA questions: Events from the **last 6 months** prior to exam date.
- **10%** of CA questions: Events from **7 to 12 months** prior.
- **5%** of CA questions: High-profile events from **13 to 24 months** prior.
- Scraper lookback window (`MAX_AGE_DAYS`) is maintained at 365 days (1 year) and never reduced below 180 days.
