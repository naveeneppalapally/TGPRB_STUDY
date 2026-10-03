import { defineEventHandler, getRouterParam, createError } from 'h3'
import { cardsFor, canonicalNoteId, LEARNING_ASSETS } from '../../utils/learning-content'
export default defineEventHandler(event => {
  const id = canonicalNoteId(getRouterParam(event, 'noteId') || '')
  if (!id || !LEARNING_ASSETS[id]) throw createError({ statusCode: 404, statusMessage: 'Unknown flashcard deck' })
  return { note_id: id, cards: cardsFor(id) }
})
