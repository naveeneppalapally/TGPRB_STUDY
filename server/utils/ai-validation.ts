import type { AiAssistantAction, AiConversationTurn, AiExamProfile, AiExplainRequest, AiQuizState } from '~/types/ai'

const ACTIONS = new Set<AiAssistantAction>(['explain', 'mnemonic', 'exam-traps', 'compare', 'review-plan'])
const EXAM_PROFILES = new Set<AiExamProfile>(['constable', 'si'])
const BULK_ANSWER_PATTERNS = [
  /\banswer\s+key\b/i,
  /\bgive\s+(me\s+)?(all|every|the)\s+answers?\b/i,
  /\bsolve\s+(all|every)\b/i,
  /\blist\s+(all|every)\s+correct\s+options?\b/i,
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value)
}

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, maxLength) : ''
}

function stringList(value: unknown, maximum: number) {
  if (!Array.isArray(value)) return []
  return [...new Set(value.map(item => text(item, 100)).filter(Boolean))].slice(0, maximum)
}

function quizState(value: unknown): AiQuizState | undefined {
  if (!isRecord(value)) return undefined
  const rawScore = typeof value.gate_score === 'number' ? value.gate_score : undefined
  const rawTotal = typeof value.gate_total === 'number' ? value.gate_total : undefined
  const score = Number.isInteger(rawScore) && rawScore >= 0 ? rawScore : undefined
  const total = Number.isInteger(rawTotal) && rawTotal >= 0 ? rawTotal : undefined
  const incorrect = stringList(value.incorrect_question_ids, 8)
  return score === undefined && total === undefined && incorrect.length === 0
    ? undefined
    : { incorrect_question_ids: incorrect, gate_score: score, gate_total: total }
}

function conversation(value: unknown): AiConversationTurn[] {
  if (!Array.isArray(value)) return []
  return value.slice(-4).flatMap((item): AiConversationTurn[] => {
    if (!isRecord(item)) return []
    const role = item.role === 'assistant' || item.role === 'user' ? item.role : null
    const entry = text(item.text, 450)
    return role && entry ? [{ role, text: entry }] : []
  })
}

export function parseAiExplainRequest(value: unknown): AiExplainRequest | null {
  if (!isRecord(value)) return null

  const noteId = text(value.note_id, 80)
  const question = text(value.question, 600)
  const action = ACTIONS.has(value.action as AiAssistantAction) ? value.action as AiAssistantAction : 'explain'
  const examProfile = EXAM_PROFILES.has(value.exam_profile as AiExamProfile)
    ? value.exam_profile as AiExamProfile
    : null

  if (!noteId || !question || !examProfile) return null

  return {
    note_id: noteId,
    question,
    action,
    exam_profile: examProfile,
    source_question_id: text(value.source_question_id, 80) || undefined,
    selected_text: text(value.selected_text, 500) || undefined,
    quiz_state: quizState(value.quiz_state),
    conversation: conversation(value.conversation),
  }
}

export function isBulkAnswerRequest(question: string) {
  return BULK_ANSWER_PATTERNS.some(pattern => pattern.test(question))
}
