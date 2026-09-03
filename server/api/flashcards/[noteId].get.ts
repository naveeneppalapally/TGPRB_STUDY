import { createError, defineEventHandler, getRouterParam } from 'h3'
import drainageSystem from '~/content/data/flashcards/geography/drainage-system.json'
import mountainsInIndia from '~/content/data/flashcards/geography/mountains-in-india.json'
import damsInIndia from '~/content/data/flashcards/geography/dams-in-india.json'
import irrigationInIndia from '~/content/data/flashcards/geography/irrigation-in-india.json'
import forestsInIndia from '~/content/data/flashcards/geography/forests-in-india.json'
import constitutionalFrameworkAndPreamble from '~/content/data/flashcards/polity/constitutional-framework-and-preamble.json'
import unionExecutiveAndLegislature from '~/content/data/flashcards/polity/union-executive-and-legislature.json'
import makingOfTheConstitutionFlashcards from '~/content/data/flashcards/polity/making-of-the-constitution.json'
import telanganaStatehoodMovement from '~/content/data/flashcards/telangana/telangana-statehood-movement.json'

interface FlashcardRecord {
  id: string
  front: string
  back: string
  key_fact?: string
  tags?: string[]
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
  'NOTE-POL-CONST-FRAME': constitutionalFrameworkAndPreamble,
  'NOTE-POL-MAKING-CONST': makingOfTheConstitutionFlashcards,
  'NOTE-POL-UNION-EXEC': unionExecutiveAndLegislature,
  'NOTE-TEL-MOVEMENT': telanganaStatehoodMovement,
}

const DECK_META: Record<string, { exam_section: string; topic: string }> = {
  'NOTE-GEO-DRAINAGE': { exam_section: 'Geography', topic: 'Drainage System of India' },
  'NOTE-GEO-MOUNTAINS': { exam_section: 'Geography', topic: 'Mountains of India' },
  'NOTE-GEO-DAMS': { exam_section: 'Geography', topic: 'Dams in India' },
  'NOTE-GEO-IRRIGATION': { exam_section: 'Geography', topic: 'Irrigation in India' },
  'NOTE-GEO-FORESTS': { exam_section: 'Geography', topic: 'Forests of India' },
  'NOTE-POL-CONST-FRAME': { exam_section: 'Polity', topic: 'Constitutional Framework & Preamble' },
  'NOTE-POL-MAKING-CONST': { exam_section: 'Polity', topic: 'Making of the Indian Constitution' },
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
      key_fact: card.key_fact,
      tags: card.tags,
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

  const deck = DECKS[noteId]
  return {
    note_id: noteId,
    topic_id: (deck as { topic_id?: string })?.topic_id,
    cards: normalizeCards(noteId, deck),
  }
})
