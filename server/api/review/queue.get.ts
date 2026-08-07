import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  // TODO: Wire up Supabase
  // 1. Get user from auth header
  // 2. Query review_cards WHERE user_id = ? AND due <= NOW()
  // 3. Order by due ASC (most overdue first)
  // 4. Return interleaved across subjects (never one subject in isolation)

  // For now, return empty queue (flashcards are loaded client-side in demo)
  return {
    cards: [],
    total_due: 0,
    message: 'Queue endpoint (mock - Supabase not configured yet)',
  }
})
