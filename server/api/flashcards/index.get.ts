import { defineEventHandler } from 'h3'
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

interface DeckMeta {
  noteId: string
  examSection: string
  topic: string
  deck: unknown
}

const DECKS: DeckMeta[] = [
  {
    noteId: 'NOTE-GEO-DRAINAGE',
    examSection: 'Geography',
    topic: 'Drainage System of India',
    deck: drainageSystem,
  },
  {
    noteId: 'NOTE-GEO-MOUNTAINS',
    examSection: 'Geography',
    topic: 'Mountains of India',
    deck: mountainsInIndia,
  },
  {
    noteId: 'NOTE-GEO-DAMS',
    examSection: 'Geography',
    topic: 'Dams in India',
    deck: damsInIndia,
  },
  {
    noteId: 'NOTE-GEO-IRRIGATION',
    examSection: 'Geography',
    topic: 'Irrigation in India',
    deck: irrigationInIndia,
  },
  {
    noteId: 'NOTE-GEO-FORESTS',
    examSection: 'Geography',
    topic: 'Forests of India',
    deck: forestsInIndia,
  },
  {
    noteId: 'NOTE-POL-UNION-EXEC',
    examSection: 'Polity',
    topic: 'Union Executive and Legislature',
    deck: unionExecutiveAndLegislature,
  },
  {
    noteId: 'NOTE-TEL-MOVEMENT',
    examSection: 'Telangana',
    topic: 'Telangana Statehood Movement',
    deck: telanganaStatehoodMovement,
  },
]

function normalizeDeck(meta: DeckMeta): FlashcardRecord[] {
  const rawCards = Array.isArray(meta.deck)
    ? meta.deck
    : meta.deck && typeof meta.deck === 'object' && Array.isArray((meta.deck as { cards?: unknown }).cards)
      ? (meta.deck as { cards: unknown[] }).cards
      : []

  return rawCards.map((raw, index) => {
    const card = raw as Partial<FlashcardRecord> & { key_fact?: string; tags?: string[] }
    return {
      id: card.id ?? `${meta.noteId}-${index + 1}`,
      front: card.front ?? '',
      back: card.back ?? card.key_fact ?? '',
      exam_section: card.exam_section ?? meta.examSection,
      topic: card.topic ?? meta.topic,
      subtopic: card.subtopic ?? card.tags?.[0] ?? 'Atomic fact',
      source_note_id: card.source_note_id ?? meta.noteId,
    }
  }).filter(card => card.front && card.back)
}

export default defineEventHandler(() => ({
  cards: DECKS.flatMap(normalizeDeck),
}))
