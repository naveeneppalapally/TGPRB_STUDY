export type FlashcardUnlockMode = 'gate' | 'direct'

const STORAGE_KEY = 'studyos-flashcard-unlock-mode'
const GATE_PREFIX = 'studyos:gate-passed:'

/**
 * Controls how atomic flashcards become available.
 *
 * The preference is local by design, matching the existing Settings storage
 * model. The shared useState value keeps Settings, note pages, and Review Queue
 * in sync during the current session.
 */
export function useFlashcardUnlock() {
  const mode = useState<FlashcardUnlockMode>('studyos-flashcard-unlock-mode', () => 'gate')
  const hydrated = useState<boolean>('studyos-flashcard-unlock-hydrated', () => false)

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
    return localStorage.getItem(`${GATE_PREFIX}${noteId}`) === 'true'
  }

  function hasPassedQuizLocally(noteId: string): boolean {
    if (!import.meta.client || !noteId) return false
    return localStorage.getItem(`${GATE_PREFIX}${noteId}`) === 'true'
  }

  function markGatePassed(noteId: string) {
    if (import.meta.client && noteId) {
      localStorage.setItem(`${GATE_PREFIX}${noteId}`, 'true')
    }
  }

  function resetGate(noteId: string) {
    if (import.meta.client && noteId) {
      localStorage.removeItem(`${GATE_PREFIX}${noteId}`)
    }
  }

  return {
    mode,
    setMode,
    isGatePassed,
    hasPassedQuizLocally,
    markGatePassed,
    resetGate,
    storageKey: STORAGE_KEY,
  }
}
