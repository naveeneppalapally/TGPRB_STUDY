import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate input
  if (!body.card_id || !body.rating || body.rating < 1 || body.rating > 4) {
    throw createError({
      statusCode: 400,
      message: 'Missing card_id or invalid rating (must be 1-4)',
    })
  }

  // TODO: Wire up Supabase
  // 1. Fetch current card state from review_cards
  // 2. Convert to ts-fsrs Card object using dbRowToCard()
  // 3. Grade with gradeCard(card, rating)
  // 4. Convert back with cardToDbFields()
  // 5. Update review_cards row
  // 6. Insert into review_log

  // For now, return a mock response
  return {
    success: true,
    next_due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // mock: 3 days
    message: 'Card graded (mock - Supabase not configured yet)',
  }
})
