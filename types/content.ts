// =============================================================================
// TSLPRB StudyOS - Content Schema
// The beating heart of how every piece of content is typed and tracked.
// =============================================================================

/**
 * Core content item - everything in the system is one of these.
 * Notes teach. PYQs test. Flashcards drill. Current affairs stay fresh.
 */
export interface ContentItem {
  /** Unique ID, e.g. "NOTE-GEO-DRAINAGE" or "PYQ-2018-M-144" */
  id: string

  /** What kind of beast this is */
  type: 'note' | 'pyq' | 'atomic_flashcard' | 'current_affair'

  /** Top-level exam section: "Geography", "Polity", "Arithmetic", etc. */
  exam_section: string

  /** Topic name: "Drainage System of India" */
  topic: string

  /** Subtopic: "Peninsular River Systems" */
  subtopic: string

  /** Cross-reference IDs - powers the "related topics" links in the UI */
  related_topic_ids: string[]

  /** FSRS scheduling data - only on pyq + atomic_flashcard types */
  fsrs_data?: FSRSData
}

/**
 * FSRS state for a single reviewable card.
 * Maps directly to what ts-fsrs tracks internally.
 */
export interface FSRSData {
  difficulty: number
  stability: number
  retrievability: number
}

/**
 * Media asset metadata - every image/diagram/scan gets one of these.
 * We track provenance so we can do a pre-release license sweep.
 */
export interface MediaAsset {
  /** R2 URL: r2://bucket/path/to/image.png */
  asset_url: string

  /** Where we got it from */
  source_domain: string

  /** License status - "needs_replacement_before_release" means find a replacement */
  rights_status: 'original' | 'public_domain' | 'needs_replacement_before_release'

  /** Accessibility text */
  alt_text: string
}

// =============================================================================
// PYQ-specific types - for the ingestion pipeline
// =============================================================================

/** Raw parsed question from the OCR files */
export interface ParsedPYQ {
  /** Source file this was extracted from */
  source_file: string

  /** Exam type */
  exam: 'Constable' | 'SI'

  /** Year the exam was held */
  year: number

  /** Which stage */
  stage: 'Prelims' | 'Mains'

  /** SI Mains only - which paper part */
  part_code?: 'P1' | 'P2' | 'P3' | 'P4'

  /** SI Mains only - human-readable part name */
  part_name?: 'English' | 'Telugu' | 'Arithmetic' | 'GS'

  /** Original question number in the paper */
  question_number: number

  /** The question text (English, cleaned of OCR artifacts) */
  question_text: string

  /** Answer options - usually 4 */
  options: string[]

  /** Correct answer index (1-based, matching the paper's numbering) */
  correct_answer?: number

  /** Topic assignment from Topic_Banks seed (unverified) */
  seed_topic?: string

  /** Verified topic ID - only counts toward tier/note after this is set */
  verified_topic_id?: string

  /** Whether this is a duplicate of another question */
  is_duplicate: boolean

  /** If duplicate, which question ID is the canonical version */
  duplicate_of?: string

  /** Content hash for deduplication */
  content_hash: string
}

/** Filename parse result */
export interface ParsedFilename {
  exam: 'Constable' | 'SI'
  year: number
  stage: 'Prelims' | 'Mains'
  part_code?: string
  part_name?: string
}

/** Tier assignment for a topic/subtopic pair */
export interface TierAssignment {
  topic: string
  subtopic: string
  exam_section: string
  verified_pyq_count: number
  tier: 1 | 2 | 3
}

// =============================================================================
// Review state types - for Supabase + FSRS
// =============================================================================

/** A card in the FSRS review system */
export interface ReviewCard {
  id: string
  user_id: string
  content_id: string
  content_type: 'pyq' | 'atomic_flashcard'

  // FSRS state
  difficulty: number
  stability: number
  retrievability: number
  state: number // ts-fsrs State enum value
  due: string   // ISO timestamp
  last_review?: string
  reps: number
  lapses: number
  elapsed_days: number
  scheduled_days: number

  // Metadata
  exam_section: string
  topic: string
  created_at: string
  updated_at: string
}

/** Comprehension gate result - graded once, never enters FSRS */
export interface GateResult {
  id: string
  user_id: string
  note_id: string
  score: number
  total: number
  passed: boolean
  completed_at: string
}

/** Single review log entry for analytics */
export interface ReviewLogEntry {
  id: string
  user_id: string
  card_id: string
  rating: 1 | 2 | 3 | 4 // Again | Hard | Good | Easy
  review_duration_ms?: number
  reviewed_at: string
}

// =============================================================================
// Comprehension gate types
// =============================================================================

/** A comprehension gate quiz attached to a note */
export interface GateQuiz {
  note_id: string
  questions: GateQuestion[]
  pass_threshold: number // e.g. 3 out of 5
}

export interface GateQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number // 0-indexed
  explanation?: string
}

// =============================================================================
// Atomic flashcard type
// =============================================================================

export interface AtomicFlashcard extends ContentItem {
  type: 'atomic_flashcard'
  front: string  // Question side
  back: string   // Answer side
  source_note_id: string // Which note generated this card
}

// =============================================================================
// Current affair type
// =============================================================================

export interface CurrentAffair extends ContentItem {
  type: 'current_affair'
  headline: string
  body: string
  date: string // ISO date
  source_url?: string
}
