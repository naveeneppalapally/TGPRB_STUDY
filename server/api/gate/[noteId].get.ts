import { defineEventHandler, getRouterParam, createError } from 'h3'
import drainageSystem from '~/content/data/gates/drainage-system.json'
import unionExecutiveAndLegislature from '~/content/data/gates/union-executive-and-legislature.json'
import telanganaStatehoodMovement from '~/content/data/gates/telangana-statehood-movement.json'
import irrigationInIndia from '~/content/data/gates/irrigation-in-india.json'

/**
 * Comprehension gate quiz registry, keyed by NOTE-ID.
 *
 * Each gate JSON lives in content/data/gates/*.json and follows the canonical
 * schema consumed by components/GateQuiz.vue:
 *   { note_id, pass_threshold, questions: [{ id, question, options, correct_answer, explanation }] }
 *
 * When scripts/note_pipeline/generate_gates_and_cards.py generates a new gate
 * for a topic, add its import + registry entry here (keyed by the exact
 * NOTE-ID used in that page's <GateQuiz note-id="..." /> tag).
 */
const GATES: Record<string, unknown> = {
  [(drainageSystem as { note_id: string }).note_id]: drainageSystem,
  [(unionExecutiveAndLegislature as { note_id: string }).note_id]: unionExecutiveAndLegislature,
  [(telanganaStatehoodMovement as { note_id: string }).note_id]: telanganaStatehoodMovement,
  [(irrigationInIndia as { note_id: string }).note_id]: irrigationInIndia,
}

export default defineEventHandler((event) => {
  const noteId = getRouterParam(event, 'noteId')

  const gate = noteId ? GATES[noteId] : undefined
  if (!gate) {
    throw createError({
      statusCode: 404,
      statusMessage: `No comprehension gate quiz found for note-id "${noteId}"`,
    })
  }

  return gate
})
