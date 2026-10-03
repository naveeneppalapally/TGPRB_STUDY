import { canonicalNoteId, gateFor } from './learning-content'

export function evaluateGate(body: unknown) {
  const request = body as { note_id?: unknown; answers?: unknown } | null
  const noteId = typeof request?.note_id === 'string' ? canonicalNoteId(request.note_id) : undefined
  const gate = noteId ? gateFor(noteId) : undefined
  const answers = request?.answers
  if (!gate || !Array.isArray(answers) || answers.length !== gate.questions.length ||
    answers.some((value, index) => !Number.isInteger(value) || value < 0 || value >= gate.questions[index].options.length)) {
    throw new Error('A registered note and one valid answer per gate question are required')
  }
  const score = gate.questions.filter((q, index) => answers[index] === q.correct_answer).length
  return { noteId: noteId!, gate, score, passed: score >= gate.pass_threshold }
}
