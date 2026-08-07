import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate
  if (!body.note_id || body.score === undefined || body.total === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Missing note_id, score, or total',
    })
  }

  const passed = body.score >= (body.pass_threshold || 3)

  // TODO: Wire up Supabase
  // 1. Check if gate already completed (UNIQUE constraint prevents re-submission)
  // 2. Insert into gate_results
  // 3. If passed, create review_cards for all flashcards linked to this note

  return {
    success: true,
    passed,
    score: body.score,
    total: body.total,
    flashcards_unlocked: passed ? body.flashcard_count || 0 : 0,
    message: 'Gate submitted (mock - Supabase not configured yet)',
  }
})
