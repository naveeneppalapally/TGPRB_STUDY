import { onMounted } from 'vue'
import { useSupabaseClient, useSupabaseUser, useState } from '#imports'

export type FlashcardUnlockMode = 'gate' | 'direct'

const STORAGE_KEY = 'studyos-flashcard-unlock-mode'
const GATE_PREFIX = 'studyos:gate-passed:'

/**
 * Controls how atomic flashcards become available.
 * Scoped per user so User A and User B have separate unlock progress.
 */
export function useFlashcardUnlock() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  const mode = useState<FlashcardUnlockMode>('studyos-flashcard-unlock-mode', () => 'gate')
  const hydrated = useState<boolean>('studyos-flashcard-unlock-hydrated', () => false)

  function getUserKey(noteId: string): string {
    const uid = user.value?.id || 'guest'
    return `${GATE_PREFIX}${uid}:${noteId}`
  }

  onMounted(() => {
    if (hydrated.value || !import.meta.client) return
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'gate' || stored === 'direct') mode.value = stored
    hydrated.value = true
  })

  function setMode(nextMode: FlashcardUnlockMode) {
    mode.value = nextMode
    if (import.meta.client) localStorage.setItem(STORAGE_KEY, nextMode)
  }

  function isGatePassed(noteId: string): boolean {
    if (mode.value === 'direct') return true
    if (!import.meta.client || !noteId) return false

    // Check user-scoped key
    const userScoped = localStorage.getItem(getUserKey(noteId)) === 'true'
    if (userScoped) return true

    // Check legacy key for backwards compatibility
    return localStorage.getItem(`${GATE_PREFIX}${noteId}`) === 'true'
  }

  function hasPassedQuizLocally(noteId: string): boolean {
    return isGatePassed(noteId)
  }

  async function checkCloudGatePassed(noteId: string): Promise<boolean> {
    if (!user.value || !noteId) return isGatePassed(noteId)
    try {
      const { data } = await supabase
        .from('gate_results')
        .select('passed')
        .eq('user_id', user.value.id)
        .eq('note_id', noteId)
        .eq('passed', true)
        .maybeSingle()

      if (data?.passed) {
        markGatePassed(noteId)
        return true
      }
    } catch {
      // Ignore network errors and fallback to local
    }
    return isGatePassed(noteId)
  }

  function markGatePassed(noteId: string) {
    if (import.meta.client && noteId) {
      localStorage.setItem(getUserKey(noteId), 'true')
    }
  }

  function resetGate(noteId: string) {
    if (import.meta.client && noteId) {
      localStorage.removeItem(getUserKey(noteId))
      localStorage.removeItem(`${GATE_PREFIX}${noteId}`)
    }
  }

  return {
    mode,
    setMode,
    isGatePassed,
    hasPassedQuizLocally,
    checkCloudGatePassed,
    markGatePassed,
    resetGate,
    storageKey: STORAGE_KEY,
  }
}
