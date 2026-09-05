/**
 * Study screen schema - the 3-zone reading surface (rail / stage / dock).
 *
 * A chapter is a list of sections. One section = one "step" on the stage
 * (roughly one screen of content). Everything the dock shows (PYQs, cards,
 * notes, traps) is bound to exactly one section id.
 */

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

/** Resolved PYQ, shaped for the dock (server fills this from the master file). */
export interface StudyPyq {
  uid: string
  question: string
  options: string[]
  /** 0-based */
  answer: number
  explanation: string
  difficulty?: string
  /** e.g. "Constable 2022 Prelims" - first occurrence */
  paper: string
  /** All occurrences, e.g. ["Constable 2015 Prelims", "Constable 2016 Mains"] */
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
  /** Short label for the rail */
  short: string
  estMinutes: number
  blocks: StudyBlock[]
  pyqs: StudyPyqRef[]
  cards: StudyCard[]
  traps: StudyTrap[]
}

export interface StudyChapter {
  /** URL slug, e.g. "parliament" */
  slug: string
  /** Canonical NOTE ID from data/topics_master.json */
  noteId: string
  subject: string
  subjectSlug: string
  title: string
  summary: string
  sections: StudySection[]
}

/** Section with PYQ refs replaced by resolved questions (API response shape). */
export interface StudySectionResolved extends Omit<StudySection, 'pyqs'> {
  pyqs: StudyPyq[]
}

export interface StudyChapterResolved extends Omit<StudyChapter, 'sections'> {
  sections: StudySectionResolved[]
}

// ---------------------------------------------------------------------------
// Session state (persisted per chapter in localStorage)
// ---------------------------------------------------------------------------

export type DockTab = 'pyq' | 'cards' | 'notes' | 'traps'
export type TrayHeight = 'peek' | 'half' | 'full'

export interface SectionProgress {
  read: boolean
  /** uid -> chosen option index */
  answers: Record<string, number>
  /** card id -> true = knew it, false = did not */
  cards: Record<string, boolean>
  /** trap id -> correct count out of statements */
  traps: Record<string, { correct: number; total: number }>
}
