import type { AiAssistantAction, AiExamProfile, AiQuizState } from '~/types/ai'

export interface AiAssistantRequest {
  id: string
  noteId: string
  question: string
  action: AiAssistantAction
  examProfile: AiExamProfile
  sourceQuestionId?: string
  quizState?: AiQuizState
}

/**
 * A page-local assistant request bus. `useState` is request-scoped during SSR
 * and becomes a shared reactive value in the browser, so contextual PYQ and
 * gate controls can open the single note-level drawer without global mutable
 * server state.
 */
export function useAiAssistant() {
  const pendingRequest = useState<AiAssistantRequest | null>(
    'studyos-ai-assistant-request',
    () => null,
  )

  function ask(request: Omit<AiAssistantRequest, 'id'>) {
    pendingRequest.value = {
      ...request,
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `req_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    }
  }

  function clearRequest(id?: string) {
    if (!id || pendingRequest.value?.id === id) pendingRequest.value = null
  }

  return { pendingRequest, ask, clearRequest }
}
