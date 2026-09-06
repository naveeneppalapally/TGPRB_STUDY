# Topic Authoring Specification - TSLPRB StudyOS

This document provides the complete, authoritative technical specification for authoring study topics in TSLPRB StudyOS. Every topic must satisfy the Dual-Mode Delivery standard: delivering both a full Note Page (`pages/notes/<subject>/<slug>.vue`) and an interactive 3-Zone Study Mode Chapter (`content/data/study/<subject>/<slug>.ts`).

This specification is the direct technical implementation companion to `AGENTS.md`.

---

## 1. Mandatory 4-Stage Practice and Evaluation Closing Block

Every Tier-1 and Tier-2 topic note page in `pages/notes/<subject>/<slug>.vue` must terminate with the four standardized sections placed sequentially at the bottom of the template:

1. `#pyqs`: Verified TGPRB Previous Year Questions (2015-2023)
2. `#advanced-practice`: TGPSC-Style hardening drills (multi-statement, matching, assertion-reason)
3. `#gate`: Interactive Comprehension Gate Quiz (`<GateQuiz />`)
4. `#current-affairs`: Interactive Current Affairs Strip (`<CurrentAffairsStrip />`)

All four sections must be registered in the Table of Contents (TOC) `sections` array in `<script setup lang="ts">`.

### 1.1 Script Setup Implementation

```ts
import { ref, reactive, computed } from 'vue'

// 1. TOC Registration Invariant
const sections = [
  // ... earlier pedagogical content sections
  { id: 'pyqs', label: 'PYQs' },
  { id: 'advanced-practice', label: 'Advanced Practice' },
  { id: 'gate', label: 'Comprehension Gate' },
  { id: 'current-affairs', label: 'Current Affairs' },
]

// 2. Verified Real PYQ Schema & State
interface Pyq {
  uid: string
  exam: 'Constable' | 'SI'
  year: string
  tag: string
  source: string
  question: string
  options: string[]
  correct: number // 0-indexed
  explanation: string
  revealed: boolean
  selected: number | null
}

const pyqs: Pyq[] = reactive([
  {
    uid: 'PYQ-0766',
    exam: 'SI',
    year: '2016',
    tag: 'Constituent Assembly',
    source: 'SI 2016 Prelims : Q142',
    question: 'Who among the following was the temporary Chairman of the Constituent Assembly?',
    options: [
      'Dr. B.R. Ambedkar',
      'Dr. Rajendra Prasad',
      'Dr. Sachchidananda Sinha',
      'Pandit Jawaharlal Nehru'
    ],
    correct: 2,
    explanation: 'Dr. Sachchidananda Sinha was elected temporary Chairman on December 9, 1946 following French convention.',
    revealed: false,
    selected: null
  }
])

const activeExamFilter = ref<'all' | 'Constable' | 'SI'>('all')
const examFilters = [
  { label: 'All Exams', value: 'all' },
  { label: 'Constable', value: 'Constable' },
  { label: 'SI', value: 'SI' }
]

const filteredPyqs = computed(() => {
  if (activeExamFilter.value === 'all') return pyqs
  return pyqs.filter(q => q.exam === activeExamFilter.value)
})

const attemptedCount = computed(() => pyqs.filter(q => q.selected !== null).length)
const correctCount = computed(() => pyqs.filter(q => q.selected !== null && q.selected === q.correct).length)

function attempt(q: Pyq, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
  q.revealed = true
}

function reveal(q: Pyq) {
  q.revealed = true
}

function optionClass(q: Pyq, optIndex: number) {
  if (!q.revealed) return q.selected === optIndex ? 'opt-selected' : ''
  if (optIndex === q.correct) return 'opt-correct'
  if (q.selected === optIndex) return 'opt-wrong'
  return 'opt-dim'
}

// 3. TGPSC-Style Advanced Practice Schema & State
interface AdvPractice {
  uid: string
  question: string
  options: string[]
  correct: number
  explanation: string
  source: string
  format: 'Multi-statement' | 'Matching' | 'Assertion-Reason' | 'Chronology'
  revealed: boolean
  selected: number | null
}

const advancedPractice: AdvPractice[] = reactive([
  {
    uid: 'ADV-POL-MC-001',
    question: 'Consider the following statements:\n1. Statement one...\n2. Statement two...\nWhich of the statements given above is/are correct?',
    options: ['1 only', '2 only', 'Both 1 and 2', 'Neither 1 nor 2'],
    correct: 2,
    explanation: 'Both statements represent verified constitutional provisions.',
    source: 'TGPSC-Style Advanced Drill',
    format: 'Multi-statement',
    revealed: false,
    selected: null
  }
])

function advAttempt(q: AdvPractice, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
  q.revealed = true
}

function advReveal(q: AdvPractice) {
  q.revealed = true
}

function advOptionClass(q: AdvPractice, optIndex: number) {
  if (!q.revealed) return q.selected === optIndex ? 'opt-selected' : ''
  if (optIndex === q.correct) return 'opt-correct'
  if (q.selected === optIndex) return 'opt-wrong'
  return 'opt-dim'
}
```

### 1.2 Vue 3 Template Syntax

```html
<!-- ── 07 · Previous Year Questions ────────────────────────────── -->
<section id="pyqs" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">07</span>
    <h2 class="sec-title">Previous Year Questions</h2>
    <SectionNotesButton
      note-id="NOTE-POL-MAKING-CONST"
      section-id="pyqs"
      section-label="Previous Year Questions"
      note-title="Making of the Constitution"
      @open="openNotesDrawer"
    />
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">{{ filteredPyqs.length }} questions</span>
  </header>
  <InlineNoteStrip
    note-id="NOTE-POL-MAKING-CONST"
    section-id="pyqs"
    section-label="Previous Year Questions"
    note-title="Making of the Constitution"
    @open="openNotesDrawer"
  />

  <!-- Exam Filter Tabs -->
  <div class="mb-6 flex flex-wrap items-center justify-between gap-3">
    <div class="flex flex-wrap gap-2">
      <button
        v-for="f in examFilters"
        :key="f.value"
        type="button"
        class="chip min-h-[44px] px-3.5 transition-colors"
        :class="activeExamFilter === f.value ? 'chip-saffron font-semibold' : 'hover:t-hi'"
        @click="activeExamFilter = f.value"
      >
        {{ f.label }}
      </button>
    </div>
    <span class="text-xs font-mono t-lo">
      Score: {{ correctCount }} / {{ attemptedCount }} attempted
    </span>
  </div>

  <!-- Question Cards -->
  <div class="space-y-4">
    <article
      v-for="q in filteredPyqs"
      :key="q.uid"
      class="panel panel-pad transition-all duration-200 hover:b-strong"
    >
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <span class="chip chip-saffron chip-mono">{{ q.exam }} {{ q.year }}</span>
        <span class="chip chip-mono">{{ q.tag }}</span>
        <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
        <span
          v-if="q.revealed && q.selected !== null"
          class="chip chip-mono ms-auto sm:ms-0"
          :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
        >
          {{ q.selected === q.correct ? 'Correct' : 'Missed' }}
        </span>
      </div>

      <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          v-for="(opt, oi) in q.options"
          :key="oi"
          type="button"
          class="opt min-h-[44px] flex items-center gap-2 text-left"
          :class="optionClass(q, oi)"
          :disabled="q.revealed"
          @click="attempt(q, oi)"
        >
          <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
          <span class="flex-1 text-left">{{ opt }}</span>
          <UIcon
            v-if="q.revealed && oi === q.correct"
            name="i-heroicons-check-circle-solid"
            class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
          />
          <UIcon
            v-else-if="q.revealed && oi === q.selected"
            name="i-heroicons-x-circle-solid"
            class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
          />
        </button>
      </div>

      <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
        <p class="callout-title">
          <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
          Correct Answer: Option {{ 'ABCD'[q.correct] }} : {{ q.options[q.correct] }}
        </p>
        <p class="callout-body">{{ q.explanation }}</p>
        <AiAskButton
          class="mt-3"
          note-id="NOTE-POL-MAKING-CONST"
          :prompt="`Explain the historical reasoning and potential exam traps for this PYQ: ${q.question}`"
          :source-question-id="q.uid"
          :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
          label="Explain with AI"
        />
      </div>
      <button
        v-else
        type="button"
        class="mt-3 min-h-[44px] font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1"
        @click="reveal(q)"
      >
        <span>Reveal answer &amp; explanation</span>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
      </button>
    </article>
  </div>
</section>

<!-- ── 08 · Advanced Practice ──────────────────────────────────── -->
<section id="advanced-practice" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">08</span>
    <h2 class="sec-title">Advanced Practice</h2>
    <SectionNotesButton
      note-id="NOTE-POL-MAKING-CONST"
      section-id="advanced-practice"
      section-label="Advanced Practice"
      note-title="Making of the Constitution"
      @open="openNotesDrawer"
    />
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">{{ advancedPractice.length }} drills</span>
  </header>
  <InlineNoteStrip
    note-id="NOTE-POL-MAKING-CONST"
    section-id="advanced-practice"
    section-label="Advanced Practice"
    note-title="Making of the Constitution"
    @open="openNotesDrawer"
  />

  <!-- Indigo Disclaimer Invariant -->
  <div class="mb-5 rounded-xl border border-indigo-500/30 bg-indigo-500/5 p-4">
    <p class="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
      <UIcon name="i-heroicons-beaker" class="h-4 w-4" />
      TGPSC-Style Advanced Practice
    </p>
    <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
      These questions use <strong class="t-hi">multi-statement, matching, and assertion-reason</strong> formats
      from the TGPSC Group-I 2024 paper. TGPRB papers (2022-2023) remain
      <strong class="t-hi">92-93.5% direct factual MCQs</strong>. These drills harden your fact base
      against a potentially harder 2026 format.
    </p>
    <p class="mt-2 text-[11.5px] font-mono t-lo">
      Source: Forensic Paper-Setting Evolution Audit, Aug 2026 : 1,350 questions classified across 7 papers.
    </p>
  </div>

  <!-- Advanced Cards Deck -->
  <div class="space-y-4">
    <article
      v-for="q in advancedPractice"
      :key="q.uid"
      class="panel panel-pad transition-all duration-200 hover:b-strong"
    >
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <span class="inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-bold font-mono uppercase tracking-wider bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
          {{ q.format }}
        </span>
        <span class="chip chip-mono">TGPSC-Style Practice</span>
        <span class="font-mono text-[10.5px] tracking-tight t-lo ms-auto hidden sm:inline">{{ q.source }}</span>
        <span
          v-if="q.revealed && q.selected !== null"
          class="chip chip-mono ms-auto sm:ms-0"
          :class="q.selected === q.correct ? 'chip-jade' : 'chip-red'"
        >
          {{ q.selected === q.correct ? 'Correct' : 'Missed' }}
        </span>
      </div>

      <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">{{ q.question }}</p>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <button
          v-for="(opt, oi) in q.options"
          :key="oi"
          type="button"
          class="opt min-h-[44px] flex items-center gap-2 text-left"
          :class="advOptionClass(q, oi)"
          :disabled="q.revealed"
          @click="advAttempt(q, oi)"
        >
          <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
          <span class="flex-1 text-left">{{ opt }}</span>
          <UIcon
            v-if="q.revealed && oi === q.correct"
            name="i-heroicons-check-circle-solid"
            class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
          />
          <UIcon
            v-else-if="q.revealed && oi === q.selected"
            name="i-heroicons-x-circle-solid"
            class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
          />
        </button>
      </div>

      <div v-if="q.revealed" class="callout callout-jade mt-4 animate-fade-in">
        <p class="callout-title">
          <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
          Correct Answer: Option {{ 'ABCD'[q.correct] }} : {{ q.options[q.correct] }}
        </p>
        <p class="callout-body">{{ q.explanation }}</p>
        <AiAskButton
          class="mt-3"
          note-id="NOTE-POL-MAKING-CONST"
          :prompt="`Explain the reasoning for this TGPSC-style question and the exam trap: ${q.question}`"
          :source-question-id="q.uid"
          :quiz-state="{ incorrect_question_ids: q.selected === q.correct ? [] : [q.uid], gate_score: 0, gate_total: 0 }"
          label="Explain with AI"
        />
      </div>
      <button
        v-else
        type="button"
        class="mt-3 min-h-[44px] font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1"
        @click="advReveal(q)"
      >
        <span>Reveal answer &amp; explanation</span>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
      </button>
    </article>
  </div>
</section>

<!-- ── 09 · Comprehension Gate ─────────────────────────────────── -->
<section id="gate" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">09</span>
    <h2 class="sec-title">Comprehension Gate</h2>
    <SectionNotesButton
      note-id="NOTE-POL-MAKING-CONST"
      section-id="gate"
      section-label="Comprehension Gate"
      note-title="Making of the Constitution"
      @open="openNotesDrawer"
    />
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">pass 3/5 to unlock flashcards</span>
  </header>
  <InlineNoteStrip
    note-id="NOTE-POL-MAKING-CONST"
    section-id="gate"
    section-label="Comprehension Gate"
    note-title="Making of the Constitution"
    @open="openNotesDrawer"
  />
  <GateQuiz note-id="NOTE-POL-MAKING-CONST" />
</section>

<!-- ── 10 · Current Affairs ─────────────────────────────────────── -->
<section id="current-affairs" class="mb-14 scroll-mt-20">
  <header class="sec-head">
    <span class="sec-num">10</span>
    <h2 class="sec-title">Current Affairs</h2>
    <SectionNotesButton
      note-id="NOTE-POL-MAKING-CONST"
      section-id="current-affairs"
      section-label="Current Affairs"
      note-title="Making of the Constitution"
      @open="openNotesDrawer"
    />
    <span class="sec-rule" />
    <span class="sec-meta hidden sm:block">tagged to this topic</span>
  </header>
  <InlineNoteStrip
    note-id="NOTE-POL-MAKING-CONST"
    section-id="current-affairs"
    section-label="Current Affairs"
    note-title="Making of the Constitution"
    @open="openNotesDrawer"
  />
  <CurrentAffairsStrip note-id="NOTE-POL-MAKING-CONST" />
</section>

<!-- Study Mode Transition Banner (Bottom of Page) -->
<div class="mt-12 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-4 sm:p-5">
  <div class="flex items-center gap-3.5">
    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-saffron-500/15 text-saffron-600 dark:text-saffron-400">
      <UIcon name="i-heroicons-bolt" class="h-5 w-5" />
    </span>
    <div>
      <p class="text-sm font-bold t-hi">Ready to drill this chapter?</p>
      <p class="text-xs t-lo">Step-by-step 3-zone Study Mode with interactive dock, trap duels, and section PYQs.</p>
    </div>
  </div>
  <NuxtLink
    to="/study/making-of-the-constitution"
    class="btn btn-saffron min-h-[44px] px-4 text-xs font-semibold uppercase tracking-wider"
  >
    Launch Study Mode
  </NuxtLink>
</div>
```

---

## 2. 3-Zone Study Mode Chapter Specification

Study Mode (`/study/<slug>`) is a 3-zone reading surface:
- **Rail** (left): section progress, time estimate, step switching.
- **Stage** (middle): readable step canvas; exactly one section per screen.
- **Dock** (right on desktop, bottom tray on mobile): interactive learning companion strictly bound to the active section (`pyqs`, `cards`, `traps`, `notes`).

### 2.1 Complete TypeScript Schema (`types/study.ts`)

```ts
// ---------------------------------------------------------------------------
// Content blocks rendered on the stage
// ---------------------------------------------------------------------------

/** Paragraph. `lineId` lets a PYQ's "Source" button flash this exact line. */
export interface StudyParagraphBlock {
  type: 'p'
  lineId?: string
  /** Trusted authored HTML (bold, <span class="hot">, article refs). */
  html: string
}

export interface StudyCompareRow {
  label: string
  a: string
  b: string
  lineId?: string
}

/** Two-column contrast table (Rajya Sabha vs Lok Sabha etc.). */
export interface StudyCompareBlock {
  type: 'compare'
  caption?: string
  colA: string
  colB: string
  rows: StudyCompareRow[]
}

export interface StudyCalloutBlock {
  type: 'callout'
  tone: 'saffron' | 'jade' | 'red' | 'neutral'
  title: string
  html: string
  lineId?: string
}

export interface StudyTimelineEvent {
  year: string
  label: string
  lineId?: string
}

export interface StudyTimelineBlock {
  type: 'timeline'
  caption?: string
  events: StudyTimelineEvent[]
}

export type StudyBlock =
  | StudyParagraphBlock
  | StudyCompareBlock
  | StudyCalloutBlock
  | StudyTimelineBlock

// ---------------------------------------------------------------------------
// Dock content bound to a section
// ---------------------------------------------------------------------------

/** Reference to a verified PYQ in data/pyq_enriched_master.json */
export interface StudyPyqRef {
  uid: string
  /** lineId in this section that answers the question */
  sourceLine?: string
}

/** Resolved PYQ, shaped for the dock (server fills this from master index). */
export interface StudyPyq {
  uid: string
  question: string
  options: string[]
  /** 0-based */
  answer: number
  explanation: string
  difficulty?: string
  paper: string
  papers: string[]
  sourceLine?: string
}

export interface StudyCard {
  id: string
  front: string
  back: string
}

/** Confusing pair drilled as a left/right "duel". */
export interface StudyTrap {
  id: string
  left: string
  right: string
  /** One-line reason students mix these up */
  why: string
  statements: Array<{ text: string; side: 'left' | 'right' }>
}

// ---------------------------------------------------------------------------
// Section + chapter
// ---------------------------------------------------------------------------

export interface StudySection {
  id: string
  title: string
  short: string
  estMinutes: number
  blocks: StudyBlock[]
  pyqs: StudyPyqRef[]
  cards: StudyCard[]
  traps: StudyTrap[]
}

export interface StudyChapter {
  slug: string
  noteId: string
  subject: string
  subjectSlug: string
  title: string
  summary: string
  hasNote?: boolean
  sections: StudySection[]
}

export interface StudySectionResolved extends Omit<StudySection, 'pyqs'> {
  pyqs: StudyPyq[]
}

export interface StudyChapterResolved extends Omit<StudyChapter, 'sections'> {
  sections: StudySectionResolved[]
}

export type DockTab = 'pyq' | 'cards' | 'notes' | 'traps'
export type TrayHeight = 'peek' | 'half' | 'full'

export interface SectionProgress {
  read: boolean
  answers: Record<string, number>
  cards: Record<string, boolean>
  traps: Record<string, { correct: number; total: number }>
}
```

### 2.2 Cloudflare Pages Edge Runtime Resolution

1. Chapters reference PYQs only by `uid` and optional `sourceLine`.
2. `server/api/study/[chapter].get.ts` resolves these references at runtime against `data/pyq_enriched_master.json`.
3. To support Cloudflare Pages edge runtime where local filesystem access is not available:
   - All referenced PYQs must be appended to `content/data/study/pyqs.json`.
   - The chapter must be registered in the `CHAPTERS` map in `server/api/study/[chapter].get.ts`.
   - Both `/study/<slug>` and `/api/study/<slug>` must be added to `nitro.prerender.routes` in `nuxt.config.ts`.

---

## 3. Canonical JSON Schemas

### 3.1 Comprehension Gate (`content/data/gates/<slug>.json`)

Gates protect the FSRS queue. Students must pass with at least 3/5 (60%) to unlock the topic's atomic flashcards and real PYQs.

```json
{
  "note_id": "NOTE-GEO-DRAINAGE",
  "pass_threshold": 3,
  "questions": [
    {
      "id": "GATE-GEO-DRN-01",
      "question": "Which river originates from the Trimbak plateau in Nashik district?",
      "options": [
        "Krishna",
        "Godavari",
        "Mahanadi",
        "Cauvery"
      ],
      "correct_answer": 1,
      "explanation": "Godavari originates at Trimbakeshwar near Nashik, Maharashtra at an elevation of 1,067 m."
    }
  ]
}
```

**Schema Rules:**
- `note_id`: Must match the canonical `NOTE-{SECTION}-{TOPIC}` exactly.
- `pass_threshold`: Integer (standardized to `3`).
- `questions`: Array of at least 5 objects.
- `options`: Exactly 4 options per question.
- `correct_answer`: 0-indexed integer (0 to 3).
- `explanation`: Required factual justification.
- Zero em-dashes anywhere in text.

### 3.2 Atomic Flashcards (`content/data/flashcards/<subject>/<slug>.json`)

Atomic flashcards feed into `ts-fsrs`. Each card tests exactly ONE atomic fact.

```json
{
  "note_id": "NOTE-GEO-DRAINAGE",
  "topic_id": "GEO-DRAINAGE",
  "cards": [
    {
      "id": "FC-GEO-DRN-01",
      "front": "What is the total length of the Godavari river, making it the longest peninsular river?",
      "back": "1,465 km. It is also called Dakshin Ganga or Vriddha Ganga.",
      "key_fact": "Godavari total length is 1,465 km; longest peninsular river.",
      "tags": ["Godavari", "Drainage", "Peninsular Rivers"]
    }
  ]
}
```

**Schema Rules:**
- `note_id`: Must match canonical `NOTE-{SECTION}-{TOPIC}`.
- `cards`: Array of at least 10 cards.
- `front`: Crisp question / prompt.
- `back`: Concise factual answer.
- `key_fact`: Summary takeaway.
- Zero em-dashes.

---

## 4. Step-by-Step Topic Creation & CLI Reference

When adding any new topic to TSLPRB StudyOS, follow this strict pipeline:

### Step 1: Register in `data/topics_master.json`
Every topic must have exactly one canonical NOTE ID in the format `NOTE-{SECTION}-{TOPIC}`:

| Subject | Section Code | Example NOTE IDs |
|---|---|---|
| Geography | GEO | `NOTE-GEO-DRAINAGE`, `NOTE-GEO-FORESTS`, `NOTE-GEO-MOUNTAINS` |
| Polity | POL | `NOTE-POL-MAKING-CONST`, `NOTE-POL-HIST-ACTS` |
| Economy | ECO | `NOTE-ECO-GENERAL`, `NOTE-ECO-BANKING` |
| Telangana | TEL | `NOTE-TEL-MOVEMENT`, `NOTE-TEL-HISTORY` |
| Science & Tech | SCI | `NOTE-SCI-GENERAL`, `NOTE-SCI-SPACE` |
| History | HIS | `NOTE-HIS-GENERAL`, `NOTE-HIS-MODERN` |
| Arithmetic | ARI | `NOTE-ARI-GENERAL` |

Add entry with canonical ID, title, subject, 15-30 keywords, and legacy aliases:
```json
{
  "id": "NOTE-GEO-FORESTS",
  "subject": "Geography",
  "title": "Forests of India & ISFR Report",
  "keywords": ["forest cover", "isfr", "dehra dun", "mangroves", "canopy density"],
  "aliases": ["NOTE-GEO-FOREST"]
}
```

### Step 2: Sync Current Affairs Tags
Run deterministic keyword sync across all markdown cards:
```bash
npm run sync:ca-topics
```

### Step 3: Author Gate Quiz & Flashcards Deck
Generate using the AI authoring script or create manually:
```bash
python3 scripts/note_pipeline/generate_gates_and_cards.py NOTE-GEO-FORESTS forests-of-india geography "Forests of India"
```
Register gate in `server/api/gate/[noteId].get.ts`:
```ts
import forestsOfIndia from '~/content/data/gates/forests-of-india.json'
// In GATES map:
[(forestsOfIndia as { note_id: string }).note_id]: forestsOfIndia,
```
Register flashcards in `server/api/flashcards/[noteId].get.ts`:
```ts
import forestsDeck from '~/content/data/flashcards/geography/forests-in-india.json'
// In DECKS map:
['NOTE-GEO-FORESTS']: forestsDeck,
```

### Step 4: Author Note Page
Create `pages/notes/<subject>/<slug>.vue` structured according to the Subject-Specific Cognitive Scaffold and ending with the Mandatory 4-Stage Closing Block.

### Step 5: Author 3-Zone Study Mode Chapter
Create `content/data/study/<subject>/<slug>.ts` implementing `StudyChapter`.
Register chapter in `server/api/study/[chapter].get.ts`:
```ts
import forestsStudy from '~/content/data/study/geography/forests-in-india'
// In CHAPTERS map:
[forestsStudy.slug]: forestsStudy,
```
Append any referenced PYQs into `content/data/study/pyqs.json`.
Add pre-render routes in `nuxt.config.ts`:
```ts
'/study/forests-in-india',
'/api/study/forests-in-india',
```

### Step 6: Update Subject Hub
Add Note card and Study Mode card to `pages/notes/<subject>/index.vue`.

### Step 7: Enforce Integrity & Test
```bash
npm run prebuild
npm run verify:integrity
npm test
```
All checks must exit with code 0.

---

## 5. Subject-Specific Cognitive Scaffolds Reference

Every topic's pedagogical sections must follow the subject scaffold defined in `docs/tslprb-pyq-processing-engine-research-report.md`:

1. **Geography (6-Point Spatial Scaffold)**:
   - 01. Location & Physiography
   - 02. Origin / Source / Elevation
   - 03. Direction & Flow Extent
   - 04. States / Districts / Regions traversed
   - 05. Connections (Dams, tributaries, canals, passes)
   - 06. Key Exam Distinction / Traps
2. **History (5-Step Causal Chain)**:
   - Cause -> Event -> Leader / Authority -> Outcome -> Next Consequence.
3. **Polity (4-Tier Constitutional Architecture)**:
   - Part -> Constitutional Area -> Article Range -> Landmark Articles & Cases.
4. **Arithmetic (7-Step Drill)**:
   - Formula/Condition -> 15-25 Untimed Examples -> Changed-Value Variants -> Mixed Practice -> Timed Set -> Error-Log Retest -> Speed Benchmark.
5. **General Science**:
   - Biology: Diagram redraws with exam callouts.
   - Physics: Formula-condition-unit cards.
   - Chemistry: Contrastive pairs (e.g. baking soda vs washing soda).
6. **Telangana GK (2-Axis Framework)**:
   - Spatial: District -> Landmark -> Infrastructure.
   - Thematic: History -> Movement -> Culture -> Governance -> Schemes.
