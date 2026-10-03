import { canonicalNoteId } from '../utils/note-id'
import { onMounted, computed, watch } from 'vue'
import { useSupabaseClient, useSupabaseUser, useState } from '#imports'

export type FlashcardUnlockMode = 'gate' | 'direct'

const STORAGE_KEY = 'studyos-flashcard-unlock-mode'
const GATE_PREFIX = 'studyos:gate-passed:'

/**
 * Controls how atomic flashcards become available.
 * Scoped per user so User A and User B have separate unlock progress.
 */
export function useFlashcardUnlock() {
  const supabase = useSupabaseClient<any>()
  const user = useSupabaseUser()

  const mode = useState<FlashcardUnlockMode>('studyos-flashcard-unlock-mode', () => 'gate')
  const revision = useState<number>('studyos-gate-revision', () => 0)
  const owner = computed(() => user.value?.id || 'guest')
  const storageKey = computed(() => `${STORAGE_KEY}:${owner.value}`)

  function getUserKey(noteId: string): string {
    const uid = user.value?.id || 'guest'
    return `${GATE_PREFIX}${uid}:${canonicalNoteId(noteId) || noteId}`
  }

  function hydrateMode() {
    if (!import.meta.client) return
    const stored = localStorage.getItem(storageKey.value) || (owner.value === 'guest' ? localStorage.getItem(STORAGE_KEY) : null)
    mode.value = stored === 'direct' ? 'direct' : 'gate'
    revision.value++
  }
  onMounted(hydrateMode)
  watch(owner, hydrateMode, { flush: 'sync' })

  function setMode(nextMode: FlashcardUnlockMode) {
    mode.value = nextMode
    if (import.meta.client) localStorage.setItem(storageKey.value, nextMode)
  }

  function isGatePassed(noteId: string): boolean {
    void revision.value
    if (!import.meta.client || !canonicalNoteId(noteId)) return false

    // Check user-scoped key
    const userScoped = localStorage.getItem(getUserKey(noteId)) === 'true'
    if (userScoped) return true

    // Check legacy key for backwards compatibility
    return !user.value && localStorage.getItem(`${GATE_PREFIX}${noteId}`) === 'true'
  }

  function hasPassedQuizLocally(noteId: string): boolean {
    return isGatePassed(noteId)
  }

  async function checkCloudGatePassed(noteId: string): Promise<boolean> {
    if (!user.value || !noteId) return isGatePassed(noteId)
    try {
      const owner = user.value.id
      const { data } = await supabase
        .from('gate_results')
        .select('passed')
        .eq('user_id', user.value.id)
        .eq('note_id', noteId)
        .eq('passed', true)
        .maybeSingle()

      if (user.value?.id !== owner) return false
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
      revision.value++
    }
  }

  function resetGate(noteId: string) {
    if (import.meta.client && noteId) {
      localStorage.removeItem(getUserKey(noteId))
      if (owner.value === 'guest') localStorage.removeItem(`${GATE_PREFIX}${noteId}`)
      revision.value++
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
    storageKey,
    refresh: hydrateMode,
  }
}
