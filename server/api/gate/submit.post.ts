import { createError, defineEventHandler, readBody } from 'h3'
import { allReviewContent } from '../../utils/learning-content'
import { evaluateGate } from '../../utils/gate-validation'
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

  let result: ReturnType<typeof evaluateGate>
  try { result = evaluateGate(body) } catch (error) {
    throw createError({ statusCode: 400, message: (error as Error).message })
  }
  const { noteId, gate, score, passed } = result

  // 1. Upsert gate result (UNIQUE constraint on user_id+note_id handles re-attempts)
  const { error: gateError } = await client
    .from('gate_results')
    .upsert({
      user_id:      user.id,
      note_id:      noteId,
      score:        score,
      total:        gate.questions.length,
      passed,
      completed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,note_id' })

  if (gateError) {
    throw createError({ statusCode: 500, message: gateError.message })
  }
  if (passed) {
    const { error } = await client.rpc('merge_user_topic_states', { p_states: [{ topic_id: noteId, gate_passed: true, last_seen_at: null }] })
    if (error) throw createError({ statusCode: 500, message: 'Gate progress could not be synchronized' })
  }

  let flashcardsUnlocked = 0

  // 2. If passed, seed FSRS cards for all flashcards attached to this note
  if (passed) {
    const content = allReviewContent().filter(card => card.source_note_ids.includes(noteId!))
    const flashcardIds = content.map(card => card.id)

    // Check which cards already exist to avoid duplicates
    const { data: existing, error: lookupError } = await client
      .from('review_cards')
      .select('content_id')
      .eq('user_id', user.id)
      .in('content_id', flashcardIds)

    if (lookupError) throw createError({ statusCode: 500, message: 'Review membership lookup failed' })
    const alreadySeeded = new Set((existing ?? []).map((r: any) => r.content_id))
    const toInsert = flashcardIds.filter(id => !alreadySeeded.has(id))

    if (toInsert.length > 0) {
      const now = new Date()
      const newCardFields = cardToDbFields(newCard())

      const rows = toInsert.map(id => ({
        user_id:      user.id,
        content_id:   id,
        content_type: content.find(card => card.id === id)!.content_type,
        exam_section: content.find(card => card.id === id)!.exam_section,
        topic: content.find(card => card.id === id)!.topic,
        ...newCardFields,
        due: now.toISOString(), // new cards are due immediately
      }))

      const { error: insertError } = await client
        .from('review_cards')
        .upsert(rows, { onConflict: 'user_id,content_id', ignoreDuplicates: true })

      if (insertError) {
        throw createError({ statusCode: 500, message: insertError.message })
      }

      flashcardsUnlocked = rows.length
    }
  }

  return {
    success:             true,
    passed,
    score:               score,
    total:               gate.questions.length,
    flashcards_unlocked: flashcardsUnlocked,
  }
})
