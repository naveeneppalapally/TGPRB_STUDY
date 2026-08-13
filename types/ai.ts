export type AiExamProfile = 'constable' | 'si'

export type AiAssistantAction =
  | 'explain'
  | 'mnemonic'
  | 'exam-traps'
  | 'compare'
  | 'review-plan'

export interface AiQuizState {
  incorrect_question_ids?: string[]
  gate_score?: number
  gate_total?: number
}

export interface AiConversationTurn {
  role: 'user' | 'assistant'
  text: string
}

/**
 * Browser-to-server payload. The server ignores any client supplied study
 * material and rebuilds the grounding context from the canonical note registry
 * and verified PYQ source before it calls Gemini.
 */
export interface AiExplainRequest {
  note_id: string
  question: string
  action?: AiAssistantAction
  exam_profile: AiExamProfile
  source_question_id?: string
  selected_text?: string
  quiz_state?: AiQuizState
  conversation?: AiConversationTurn[]
}

export interface AiPromptChip {
  label: string
  prompt: string
  action?: AiAssistantAction
}

export interface AiVerifiedPyq {
  uid: string
  topic_id: string
  question_text: string
  options: string[]
  correct_option_index: number
  explanation: string
  occurrences: Array<{
    source_file: string
    q_no?: number
  }>
}

export interface AiNoteChunk {
  id: string
  label: string
  text: string
  keywords: string[]
}

export interface AiFlashcardSuggestion {
  id: string
  front: string
  subtopic: string
}

/**
 * Server-assembled payload sent to Gemini. It is intentionally compact: it is
 * a small RAG packet rather than the full note or the complete PYQ corpus.
 */
export interface AiGroundingPayload {
  note: {
    id: string
    title: string
    exam_section: string
    chunks: Array<Pick<AiNoteChunk, 'id' | 'label' | 'text'>>
  }
  verified_pyqs: AiVerifiedPyq[]
  quiz_state: Required<AiQuizState>
  target_exam_profile: AiExamProfile
}
