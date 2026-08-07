import { defineEventHandler, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { dbRowToCard, cardToDbFields, scheduler, toFsrsRating, type DbCard } from '~/server/utils/fsrs'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // Auth check
  const { data: { user } } = await client.auth.getUser()
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody(event)

  if (!body.card_id || !body.rating || body.rating < 1 || body.rating > 4) {
    throw createError({
      statusCode: 400,
      message: 'Missing card_id or invalid rating (must be 1-4)',
    })
  }

  // 1. Fetch the current card state - RLS ensures it belongs to this user
  const { data: row, error: fetchError } = await client
    .from('review_cards')
    .select('*')
    .eq('id', body.card_id)
    .eq('user_id', user.id)
    .single()

  if (fetchError || !row) {
    throw createError({ statusCode: 404, message: 'Card not found' })
  }

  // 2. Convert DB row to ts-fsrs Card, run the scheduler
  const card = dbRowToCard(row as DbCard)
  const fsrsRating = toFsrsRating(body.rating)
  const now = new Date()
  const result = scheduler.next(card, now, fsrsRating)
  const nextCard = result.card

  // 3. Convert result back to DB fields and update
  const updatedFields = cardToDbFields(nextCard)

  const { error: updateError } = await client
    .from('review_cards')
    .update(updatedFields)
    .eq('id', body.card_id)
    .eq('user_id', user.id)

  if (updateError) {
    throw createError({ statusCode: 500, message: updateError.message })
  }

  // 4. Append to review_log for analytics
  await client
    .from('review_log')
    .insert({
      user_id:              user.id,
      card_id:              body.card_id,
      rating:               body.rating,
      review_duration_ms:   body.duration_ms ?? null,
    })

  return {
    success:  true,
    next_due: nextCard.due.toISOString(),
    state:    nextCard.state,
    stability: nextCard.stability,
  }
})
