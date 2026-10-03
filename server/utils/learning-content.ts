import { canonicalNoteId } from '../../utils/note-id'
import topics from "../../data/topics_master.json"
import pyqs from "../../data/live_pyqs.json"
import gate0 from "../../content/data/gates/historical-background-1773-1947.json"
import deck0 from "../../content/data/flashcards/polity/historical-background-1773-1947.json"
import gate1 from "../../content/data/gates/making-of-the-constitution.json"
import deck1 from "../../content/data/flashcards/polity/making-of-the-constitution.json"
import gate2 from "../../content/data/gates/drainage-system.json"
import deck2 from "../../content/data/flashcards/geography/drainage-system.json"
import gate3 from "../../content/data/gates/dams-in-india.json"
import deck3 from "../../content/data/flashcards/geography/dams-in-india.json"
import gate4 from "../../content/data/gates/mountains-in-india.json"
import deck4 from "../../content/data/flashcards/geography/mountains-in-india.json"
import gate5 from "../../content/data/gates/forests-of-india.json"
import deck5 from "../../content/data/flashcards/geography/forests-in-india.json"
import gate6 from "../../content/data/gates/irrigation-in-india.json"
import deck6 from "../../content/data/flashcards/geography/irrigation-in-india.json"
import gate7 from "../../content/data/gates/telangana-statehood-movement.json"
import deck7 from "../../content/data/flashcards/telangana/telangana-statehood-movement.json"
import gate8 from "../../content/data/gates/union-executive-and-legislature.json"
import deck8 from "../../content/data/flashcards/polity/union-executive-and-legislature.json"

export const TOPICS = topics
export { canonicalNoteId } from '../../utils/note-id'

export const LEARNING_ASSETS = {
  "NOTE-POL-HIST-ACTS": { gate: gate0, deck: deck0 },
  "NOTE-POL-MAKING-CONST": { gate: gate1, deck: deck1 },
  "NOTE-GEO-DRAINAGE": { gate: gate2, deck: deck2 },
  "NOTE-GEO-DAMS": { gate: gate3, deck: deck3 },
  "NOTE-GEO-MOUNTAINS": { gate: gate4, deck: deck4 },
  "NOTE-GEO-FORESTS": { gate: gate5, deck: deck5 },
  "NOTE-GEO-IRRIGATION": { gate: gate6, deck: deck6 },
  "NOTE-TEL-MOVEMENT": { gate: gate7, deck: deck7 },
  "NOTE-POL-UNION-EXEC": { gate: gate8, deck: deck8 },
} as Record<string, { gate: Gate; deck: unknown }>
export interface Gate {
  note_id: string
  pass_threshold: number
  questions: Array<{ id: string | number; question: string; options: string[]; correct_answer: number; explanation: string }>
}
export interface ReviewContent {
  id: string
  front: string
  back: string
  exam_section: string
  topic: string
  subtopic: string
  source_note_id: string
  source_note_ids: string[]
  content_type: 'pyq' | 'atomic_flashcard'
  verified_pyq_count: number
}
export function gateFor(id: string): Gate | undefined {
  const canonical = canonicalNoteId(id)
  return canonical ? LEARNING_ASSETS[canonical]?.gate : undefined
}
export function cardsFor(id: string): ReviewContent[] {
  const canonical = canonicalNoteId(id)
  const topic = topics.find(t => t.id === canonical)
  const deck = canonical && LEARNING_ASSETS[canonical]?.deck
  if (!topic || !deck) return []
  const cards = Array.isArray(deck) ? deck : (deck as { cards: Record<string, unknown>[] }).cards
  return cards.map((card: any) => ({
    ...card,
    id: card.id,
    back: card.back || card.key_fact,
    exam_section: topic.subject,
    topic: topic.title,
    subtopic: card.subtopic || card.tags?.[0] || 'Atomic fact',
    source_note_id: topic.id,
    source_note_ids: [topic.id],
    content_type: 'atomic_flashcard' as const,
    verified_pyq_count: ('pyqUids' in topic ? topic.pyqUids?.length : 0) || 0,
  }))
}
export function allReviewContent(): ReviewContent[] {
  const result = Object.keys(LEARNING_ASSETS).flatMap(cardsFor)
  for (const q of pyqs) {
    const owners = topics.filter(t => 'pyqUids' in t && t.pyqUids?.includes(q.uid)).map(t => t.id)
    if (!owners.length) continue
    result.push({ id: q.uid, front: q.question_text, back: `${q.options[q.correct_option_index]} - ${q.explanation}`,
      exam_section: q.subject_name, topic: q.topic_name, subtopic: q.sub_topic || 'Verified PYQ',
      source_note_id: owners[0], source_note_ids: owners, content_type: 'pyq',
      verified_pyq_count: owners.reduce((n,id) => Math.max(n, topics.find(t => t.id===id && 'pyqUids' in t)?.pyqUids?.length || 0),0),
    })
  }
  return result
}
