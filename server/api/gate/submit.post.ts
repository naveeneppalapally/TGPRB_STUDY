import { defineEventHandler, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { newCard, cardToDbFields } from '~/server/utils/fsrs'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // Auth check
  const { data: { user } } = await client.auth.getUser()
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const body = await readBody(event)

  if (!body.note_id || body.score === undefined || body.total === undefined) {
    throw createError({
      statusCode: 400,
      message: 'Missing note_id, score, or total',
    })
  }

  const passed = body.score >= (body.pass_threshold ?? 3)

  // 1. Upsert gate result (UNIQUE constraint on user_id+note_id handles re-attempts)
  const { error: gateError } = await client
    .from('gate_results')
    .upsert({
      user_id:      user.id,
      note_id:      body.note_id,
      score:        body.score,
      total:        body.total,
      passed,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,note_id' })

  if (gateError) {
    throw createError({ statusCode: 500, message: gateError.message })
  }

  let flashcardsUnlocked = 0

  // 2. If passed, seed FSRS cards for all flashcards attached to this note
  if (passed && body.flashcard_ids?.length) {
    const flashcardIds: string[] = body.flashcard_ids

    // Check which cards already exist to avoid duplicates
    const { data: existing } = await client
      .from('review_cards')
      .select('content_id')
      .eq('user_id', user.id)
      .in('content_id', flashcardIds)

    const alreadySeeded = new Set((existing ?? []).map((r: any) => r.content_id))
    const toInsert = flashcardIds.filter(id => !alreadySeeded.has(id))

    if (toInsert.length > 0) {
      const now = new Date()
      const newCardFields = cardToDbFields(newCard())

      const rows = toInsert.map(id => ({
        user_id:      user.id,
        content_id:   id,
        content_type: 'atomic_flashcard' as const,
        exam_section: body.exam_section ?? '',
        topic:        body.topic        ?? '',
        ...newCardFields,
        due: now.toISOString(), // new cards are due immediately
      }))

      const { error: insertError } = await client
        .from('review_cards')
        .insert(rows)

      if (insertError) {
        throw createError({ statusCode: 500, message: insertError.message })
      }

      flashcardsUnlocked = rows.length
    }
  }

  return {
    success:             true,
    passed,
    score:               body.score,
    total:               body.total,
    flashcards_unlocked: flashcardsUnlocked,
  }
})
