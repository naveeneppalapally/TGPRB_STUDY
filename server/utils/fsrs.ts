/**
 * server/utils/fsrs.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * FSRS helper utilities: converts between Supabase DB rows and ts-fsrs objects.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { createEmptyCard, fsrs, generatorParameters, Rating, type Card } from 'ts-fsrs'

// Initialize FSRS scheduler with default parameters
const params = generatorParameters()
export const scheduler = fsrs(params)

/** DB row shape (matches the review_cards table exactly) */
export interface DbCard {
  id: string
  user_id: string
  content_id: string
  content_type: 'pyq' | 'atomic_flashcard'
  difficulty: number
  stability: number
  retrievability: number
  state: number
  due: string
  last_review: string | null
  reps: number
  lapses: number
  elapsed_days: number
  scheduled_days: number
  exam_section: string
  topic: string
  created_at: string
  updated_at: string
}

/** Convert a DB row to a ts-fsrs Card object for scheduling */
export function dbRowToCard(row: DbCard): Card {
  return {
    due:            new Date(row.due),
    stability:      row.stability,
    difficulty:     row.difficulty,
    elapsed_days:   row.elapsed_days,
    scheduled_days: row.scheduled_days,
    reps:           row.reps,
    lapses:         row.lapses,
    state:          row.state as any,
    last_review:    row.last_review ? new Date(row.last_review) : new Date(0),
  }
}

/** Convert ts-fsrs scheduling result back to DB fields for update */
export function cardToDbFields(card: Card) {
  return {
    difficulty:     card.difficulty,
    stability:      card.stability,
    elapsed_days:   card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps:           card.reps,
    lapses:         card.lapses,
    state:          card.state,
    due:            card.due.toISOString(),
    last_review:    card.last_review.toISOString(),
  }
}

/** Map API rating (1-4) to ts-fsrs Rating enum */
export function toFsrsRating(rating: number): Rating {
  const map: Record<number, Rating> = {
    1: Rating.Again,
    2: Rating.Hard,
    3: Rating.Good,
    4: Rating.Easy,
  }
  return map[rating] ?? Rating.Good
}

/** Create a fresh card for a newly unlocked content item */
export function newCard(): Card {
  return createEmptyCard()
}
