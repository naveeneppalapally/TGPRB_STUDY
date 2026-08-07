// =============================================================================
// FSRS Wrapper - Spaced Repetition Scheduler
// Wraps ts-fsrs for our specific use case:
// - Card creation from content items
// - Grading with the 4-button scale
// - Interleaved queue building (never one subject in isolation)
// =============================================================================

import {
  FSRS,
  createEmptyCard,
  generatorParameters,
  type Card,
  type RecordLog,
  Rating,
  State,
} from 'ts-fsrs'

// Default FSRS parameters - tuned for exam prep (slightly aggressive intervals)
const params = generatorParameters({
  enable_fuzz: true,
  maximum_interval: 180, // Cap at 6 months - exam is finite
})

const fsrs = new FSRS(params)

/**
 * Create a fresh FSRS card for a new content item.
 */
export function createNewCard(): Card {
  return createEmptyCard()
}

/**
 * Grade a card with the given rating.
 * Returns the updated card state and the scheduling record.
 */
export function gradeCard(card: Card, rating: Rating): RecordLog {
  const now = new Date()
  const record = fsrs.repeat(card, now)
  return record[rating]
}

/**
 * Get the next review date for a card given a rating.
 * Useful for showing "If Good: next in 3 days" previews.
 */
export function previewSchedule(card: Card): Record<string, Date> {
  const now = new Date()
  const record = fsrs.repeat(card, now)
  return {
    again: record[Rating.Again].card.due,
    hard: record[Rating.Hard].card.due,
    good: record[Rating.Good].card.due,
    easy: record[Rating.Easy].card.due,
  }
}

/**
 * Convert a database row into a ts-fsrs Card object.
 */
export function dbRowToCard(row: {
  difficulty: number
  stability: number
  state: number
  due: string
  last_review?: string | null
  reps: number
  lapses: number
  elapsed_days: number
  scheduled_days: number
}): Card {
  return {
    difficulty: row.difficulty,
    stability: row.stability,
    state: row.state as State,
    due: new Date(row.due),
    last_review: row.last_review ? new Date(row.last_review) : undefined,
    reps: row.reps,
    lapses: row.lapses,
    elapsed_days: row.elapsed_days,
    scheduled_days: row.scheduled_days,
  } as Card
}

/**
 * Convert a ts-fsrs Card back to database-friendly fields.
 */
export function cardToDbFields(card: Card) {
  return {
    difficulty: card.difficulty,
    stability: card.stability,
    state: card.state,
    due: card.due.toISOString(),
    last_review: card.last_review
      ? (card.last_review as Date).toISOString()
      : null,
    reps: card.reps,
    lapses: card.lapses,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
  }
}

/**
 * Calculate retrievability for a card (0-1 probability of recall).
 * Used for display purposes - "85% chance you remember this".
 */
export function getRetrievability(card: Card): number {
  if (card.state === State.New) return 1
  const now = new Date()
  return fsrs.get_retrievability(card, now) ?? 0
}

// Re-export types and enums that components/API routes need
export { Rating, State }
export type { Card, RecordLog }
