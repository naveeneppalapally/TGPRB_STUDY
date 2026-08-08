/**
 * Tracks per-topic last-seen timestamps in localStorage.
 * Used by CurrentAffairsStrip to show 'New since your last visit' badges.
 */
export function useTopicVisits() {
  const STORAGE_PREFIX = 'tgprb:ca:last-seen:'

  function getLastVisit(noteId: string): Date | null {
    if (!import.meta.client) return null
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${noteId}`)
    return stored ? new Date(stored) : null
  }

  function markCaughtUp(noteId: string): void {
    if (!import.meta.client) return
    localStorage.setItem(`${STORAGE_PREFIX}${noteId}`, new Date().toISOString())
  }

  function getNewCount(noteId: string, entries: any[]): number {
    const lastVisit = getLastVisit(noteId)
    if (!lastVisit) return 0 // First visit - don't overwhelm with entire backlog
    return entries.filter((e: any) => {
      const publishedAt = e.meta?.published_at || e.meta?.date
      if (!publishedAt) return false
      return new Date(publishedAt) > lastVisit
    }).length
  }

  function getNewEntries(noteId: string, entries: any[]): any[] {
    const lastVisit = getLastVisit(noteId)
    if (!lastVisit) return [] // First visit
    return entries.filter((e: any) => {
      const publishedAt = e.meta?.published_at || e.meta?.date
      if (!publishedAt) return false
      return new Date(publishedAt) > lastVisit
    })
  }

  function isFirstVisit(noteId: string): boolean {
    if (!import.meta.client) return true
    return !localStorage.getItem(`${STORAGE_PREFIX}${noteId}`)
  }

  return { getLastVisit, markCaughtUp, getNewCount, getNewEntries, isFirstVisit }
}
