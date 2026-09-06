# Current Affairs Pipeline - TSLPRB StudyOS

This document provides the complete, authoritative technical specification for the Current Affairs (CA) harvesting, scoring, extraction, topic mapping, and delivery pipeline in TSLPRB StudyOS.

This specification is the direct technical implementation companion to `AGENTS.md`.

---

## 1. End-to-End System Architecture

The Current Affairs pipeline ingests raw official press releases from the Press Information Bureau (PIB), filters them using forensic exam relevance heuristics, extracts structured exam facts and MCQs via Gemini 3.6 Flash using a closed topic enum, normalizes metadata deterministically, and renders dynamic topic-tagged cards with new-since-last-visit awareness.

### 1.1 Architecture Flowchart

```
+-------------------------------------------------------------------------+
|                  PIB Raw Ingestion (workers/scrapy-pib)                  |
|  - Crawls pib.gov.in with browser headers & canonical host redirect     |
|  - Ingests 26,699+ press releases (Jan 2025 - Aug 2026)                 |
|  - Stores in SQLite: workers/scrapy-pib/pib_master_2025_2026.db         |
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
|  - Gemini 3.6 Flash structured JSON extraction via Vertex AI             |
|  - Enforces closed enum related_topic_ids from data/topics_master.json   |
|  - Writes structured Markdown cards to: content/current-affairs/*.md    |
|  - PRID resume support skips already-extracted articles                 |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|      Deterministic Retagging (scripts/pib_ca_pipeline/retag_telangana_focus.py)|
|  - Pure regex re-derivation of is_telangana_focus from core facts       |
|  - Normalizes flag to ~36% target ratio (prevents UI flag clutter)       |
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

### 2.2 SQLite Schema (`workers/scrapy-pib/pib_master_2025_2026.db`)

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

Every current affairs card generated by the pipeline is stored as an individual Markdown file with standard YAML frontmatter:

```yaml
---
id: "CA-ENV-INDIA-FOREST-COVER-20260809"
type: "current_affair"
category: "environment"
exam_section: "Geography"
topic: "Forests of India"
related_topic_ids:
  - "NOTE-GEO-ENVIRONMENT"
  - "NOTE-GEO-FORESTS"
is_telangana_focus: false
difficulty: "M"
exam_depth: "both"
headline: "India's forest cover increased by 1,445 sq km in 2023"
exam_fact: "India's total forest cover stood at 7,15,343 sq km as per FSI 2023."
summary: "Forest Survey of India 2023 report key finding..."
event_date: "2026-01-15"
published_at: "2026-08-09T07:30:00+05:30"
date: "2026-08-09"
source_name: "PIB"
source_type: "official"
ministry: "Ministry of Environment Forest and Climate Change"
canonical_source_url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2093213&reg=3&lang=1"
source_url: "https://pib.gov.in/PressReleasePage.aspx?PRID=2093213&reg=3&lang=1"
event_key: "FSI-FOREST-COVER-2023"
mcqs:
  - question: "What was India's total forest cover according to FSI 2023?"
    options:
      - "7,15,343 sq km"
      - "6,98,150 sq km"
      - "7,28,000 sq km"
      - "7,10,000 sq km"
    answer: 0
    explanation: "FSI 2023 report placed total forest cover at 7,15,343 sq km."
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
| `id` | string | Format: `CA-{CATEGORY}-{SLUG}-{YYYYMMDD}` |
| `type` | string | Strictly `"current_affair"` |
| `category` | string | One of 12 categories: `appointments`, `international`, `economy`, `awards`, `sports`, `telangana`, `schemes`, `defence`, `judiciary`, `science`, `books`, `environment` (defined in `composables/useCACategories.ts`) |
| `exam_section` | string | One of: `Polity`, `Geography`, `Economy`, `General Studies`, `Science & Technology`, `History`, `Telangana` |
| `topic` | string | Short human-readable topic name |
| `related_topic_ids` | array | Array of canonical `NOTE-{SECTION}-{TOPIC}` strings from `data/topics_master.json` |
| `is_telangana_focus`| boolean | `true` only if Telangana / Hyderabad is central to the core exam fact |
| `difficulty` | string | `"F"` (Famous/Easy), `"M"` (Medium), `"O"` (Obscure/Hard) |
| `exam_depth` | string | `"constable"`, `"si"`, or `"both"` |
| `headline` | string | 1-sentence factual headline without em-dashes |
| `exam_fact` | string | Single pinpoint testable fact |
| `summary` | string | 2-3 sentence contextual background |
| `event_date` | string | ISO date `YYYY-MM-DD` of when event occurred |
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
- Updates `related_topic_ids` in place while preserving exact YAML formatting.

### Pillar 4: Tier 2 Subject Digest Fallback (`CurrentAffairsStrip.vue`)
- `CurrentAffairsStrip.vue` imports `data/topics_master.json` directly to resolve aliases.
- If a topic has fewer than 3 directly tagged cards, it automatically activates the **Subject Digest Fallback**.
- In fallback mode, it pulls recent high-yield current affairs from the broader subject section (e.g., `POLITY DIGEST`, `GEOGRAPHY DIGEST`, `TELANGANA DIGEST`).
- Renders an informative subject digest chip in the strip header, guaranteeing no student ever sees an empty container.

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
| `python3 scripts/pib_ca_pipeline/extract_ca_cards.py [N]` | Extracts up to `N` exam cards using Gemini 3.6 Flash from scored manifest; skips already processed PRIDs. |
| `python3 scripts/pib_ca_pipeline/retag_telangana_focus.py` | Deterministically re-derives `is_telangana_focus` from headline, exam_fact, and topic fields. Target: ~36% flagged. |
| `npm run sync:ca-topics` | Synchronizes keywords and normalizes aliases across all Markdown cards. Run after editing `data/topics_master.json`. |

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
