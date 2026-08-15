import { createError, defineEventHandler, getRouterParam } from 'h3'
import drainageSystem from '~/content/data/flashcards/geography/drainage-system.json'
import mountainsInIndia from '~/content/data/flashcards/geography/mountains-in-india.json'
import damsInIndia from '~/content/data/flashcards/geography/dams-in-india.json'
import irrigationInIndia from '~/content/data/flashcards/geography/irrigation-in-india.json'
import forestsInIndia from '~/content/data/flashcards/geography/forests-in-india.json'
import unionExecutiveAndLegislature from '~/content/data/flashcards/polity/union-executive-and-legislature.json'
import telanganaStatehoodMovement from '~/content/data/flashcards/telangana/telangana-statehood-movement.json'

interface FlashcardRecord {
  id: string
  front: string
  back: string
  exam_section: string
  topic: string
  subtopic: string
  source_note_id: string
}

const DECKS: Record<string, unknown> = {
  'NOTE-GEO-DRAINAGE': drainageSystem,
  'NOTE-GEO-MOUNTAINS': mountainsInIndia,
  'NOTE-GEO-DAMS': damsInIndia,
  'NOTE-GEO-IRRIGATION': irrigationInIndia,
  'NOTE-GEO-FORESTS': forestsInIndia,
  'NOTE-POL-UNION-EXEC': unionExecutiveAndLegislature,
  'NOTE-TEL-MOVEMENT': telanganaStatehoodMovement,
}

const DECK_META: Record<string, { exam_section: string; topic: string }> = {
  'NOTE-GEO-DRAINAGE': { exam_section: 'Geography', topic: 'Drainage System of India' },
  'NOTE-GEO-MOUNTAINS': { exam_section: 'Geography', topic: 'Mountains of India' },
  'NOTE-GEO-DAMS': { exam_section: 'Geography', topic: 'Dams in India' },
  'NOTE-GEO-IRRIGATION': { exam_section: 'Geography', topic: 'Irrigation in India' },
  'NOTE-GEO-FORESTS': { exam_section: 'Geography', topic: 'Forests of India' },
  'NOTE-POL-UNION-EXEC': { exam_section: 'Polity', topic: 'Union Executive and Legislature' },
  'NOTE-TEL-MOVEMENT': { exam_section: 'Telangana', topic: 'Telangana Statehood Movement' },
}

function normalizeCards(noteId: string, deck: unknown): FlashcardRecord[] {
  const rawCards = Array.isArray(deck)
    ? deck
    : deck && typeof deck === 'object' && Array.isArray((deck as { cards?: unknown }).cards)
      ? (deck as { cards: unknown[] }).cards
      : []
  const meta = DECK_META[noteId] ?? { exam_section: 'General', topic: noteId }

  return rawCards.map((raw, index) => {
    const card = raw as Partial<FlashcardRecord> & { key_fact?: string; tags?: string[] }
    return {
      id: card.id ?? `${noteId}-${index + 1}`,
      front: card.front ?? '',
      back: card.back ?? card.key_fact ?? '',
      exam_section: card.exam_section ?? meta.exam_section,
      topic: card.topic ?? meta.topic,
      subtopic: card.subtopic ?? card.tags?.[0] ?? 'Atomic fact',
      source_note_id: card.source_note_id ?? noteId,
    }
  }).filter(card => card.front && card.back)
}

export default defineEventHandler((event) => {
  const noteId = getRouterParam(event, 'noteId')
  if (!noteId || !DECKS[noteId]) {
    throw createError({
      statusCode: 404,
      statusMessage: `No flashcard deck found for note-id "${noteId}"`,
    })
  }

  return {
    note_id: noteId,
    cards: normalizeCards(noteId, DECKS[noteId]),
  }
})
