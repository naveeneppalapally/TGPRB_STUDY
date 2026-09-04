import { defineEventHandler, getRouterParam, createError } from 'h3'
import drainageSystem from '~/content/data/gates/drainage-system.json'
import unionExecutiveAndLegislature from '~/content/data/gates/union-executive-and-legislature.json'
import telanganaStatehoodMovement from '~/content/data/gates/telangana-statehood-movement.json'
import irrigationInIndia from '~/content/data/gates/irrigation-in-india.json'
import mountainsInIndia from '~/content/data/gates/mountains-in-india.json'
import damsInIndia from '~/content/data/gates/dams-in-india.json'
import forestsOfIndia from '~/content/data/gates/forests-of-india.json'
import constitutionalFrameworkAndPreamble from '~/content/data/gates/constitutional-framework-and-preamble.json'
import historicalActsGate from '~/content/data/gates/historical-background-1773-1947.json'
import makingOfTheConstitutionGate from '~/content/data/gates/making-of-the-constitution.json'

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
  'NOTE-POL-HIST-ACTS': historicalActsGate,
  'NOTE-POL-CONST-FRAME': historicalActsGate,
  [(historicalActsGate as { note_id: string }).note_id]: historicalActsGate,
  [(constitutionalFrameworkAndPreamble as { note_id: string }).note_id]: constitutionalFrameworkAndPreamble,
  [(makingOfTheConstitutionGate as { note_id: string }).note_id]: makingOfTheConstitutionGate,
  'NOTE-POL-MAKING-CONST': makingOfTheConstitutionGate,
  [(unionExecutiveAndLegislature as { note_id: string }).note_id]: unionExecutiveAndLegislature,
  [(telanganaStatehoodMovement as { note_id: string }).note_id]: telanganaStatehoodMovement,
  [(irrigationInIndia as { note_id: string }).note_id]: irrigationInIndia,
  [(mountainsInIndia as { note_id: string }).note_id]: mountainsInIndia,
  [(damsInIndia as { note_id: string }).note_id]: damsInIndia,
  [(forestsOfIndia as { note_id: string }).note_id]: forestsOfIndia,
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
