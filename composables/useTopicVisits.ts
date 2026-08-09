/**
 * useTopicVisits - tracks per-topic last-seen timestamps.
 *
 * Storage strategy:
 *   Layer 1: localStorage  - instant, offline, no auth needed (always used)
 *   Layer 2: Supabase      - cloud sync when user is logged in
 *
 * When logged in, the two layers stay in sync:
 *   - On read: use whichever timestamp is newer
 *   - On markCaughtUp: write to localStorage immediately, then async to Supabase
 *
 * This means:
 *   - You and your friend both see "caught up" after either of you marks it
 *   - Works offline too - syncs next time online
 */

import { useSupabaseClient, useSupabaseUser } from '#imports'

const STORAGE_PREFIX = 'tgprb:ca:last-seen:'

export function useTopicVisits() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()

  // -------------------------------------------------------------------------
  // localStorage helpers
  // -------------------------------------------------------------------------

  function _lsGet(noteId: string): Date | null {
    if (!import.meta.client) return null
    const stored = localStorage.getItem(`${STORAGE_PREFIX}${noteId}`)
    return stored ? new Date(stored) : null
  }

  function _lsSet(noteId: string, ts: Date): void {
    if (!import.meta.client) return
    localStorage.setItem(`${STORAGE_PREFIX}${noteId}`, ts.toISOString())
  }

  // -------------------------------------------------------------------------
  // Supabase helpers
  // -------------------------------------------------------------------------

  async function _dbGet(noteId: string): Promise<Date | null> {
    if (!user.value) return null
    try {
      const { data } = await supabase
        .from('topic_visits')
        .select('last_seen_at')
        .eq('user_id', user.value.id)
        .eq('note_id', noteId)
        .maybeSingle()
      return data?.last_seen_at ? new Date(data.last_seen_at) : null
    }
    catch {
      return null
    }
  }

  async function _dbSet(noteId: string, ts: Date): Promise<void> {
    if (!user.value) return
    try {
      await supabase.from('topic_visits').upsert(
        {
          user_id: user.value.id,
          note_id: noteId,
          last_seen_at: ts.toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,note_id' },
      )
    }
    catch {
      // Silently fail - localStorage is the fallback
    }
  }

  // -------------------------------------------------------------------------
  // Public API
  // -------------------------------------------------------------------------

  /**
   * Get the last-seen timestamp for a topic.
   * Merges localStorage + Supabase, picks the newer one.
   * Returns null if this topic has never been marked caught up.
   */
  async function getLastVisit(noteId: string): Promise<Date | null> {
    const local = _lsGet(noteId)
    const cloud = await _dbGet(noteId)

    if (!local && !cloud) return null
    if (!local) return cloud
    if (!cloud) return local

    // Use whichever is newer
    const newer = local > cloud ? local : cloud

    // If cloud is newer than local, update local too
    if (cloud > local) {
      _lsSet(noteId, cloud)
    }

    return newer
  }

  /**
   * Mark a topic as caught up right now.
   * Writes to localStorage immediately (instant UI update),
   * then async writes to Supabase if logged in.
   */
  async function markCaughtUp(noteId: string): Promise<void> {
    const now = new Date()
    _lsSet(noteId, now)                   // instant
    await _dbSet(noteId, now)             // cloud sync (non-blocking via await but fast)
  }

  /**
   * How many entries are newer than the last visit.
   * Returns 0 on first visit (don't overwhelm with entire backlog).
   */
  async function getNewCount(noteId: string, entries: any[]): Promise<number> {
    const lastVisit = await getLastVisit(noteId)
    if (!lastVisit) return 0
    return entries.filter((e: any) => {
      const publishedAt = e.meta?.published_at || e.meta?.date
      return publishedAt ? new Date(publishedAt) > lastVisit : false
    }).length
  }

  /**
   * Get entries split into { newEntries, earlierEntries }.
   * On first visit: all entries go into earlierEntries (nothing marked new).
   */
  async function getSplitEntries(
    noteId: string,
    entries: any[],
  ): Promise<{ newEntries: any[], earlierEntries: any[], isFirstVisit: boolean }> {
    const lastVisit = await getLastVisit(noteId)

    if (!lastVisit) {
      // First visit - show everything as "earlier", nothing as "new"
      return { newEntries: [], earlierEntries: entries, isFirstVisit: true }
    }

    const newEntries: any[] = []
    const earlierEntries: any[] = []

    for (const e of entries) {
      const publishedAt = e.meta?.published_at || e.meta?.date
      if (publishedAt && new Date(publishedAt) > lastVisit) {
        newEntries.push(e)
      }
      else {
        earlierEntries.push(e)
      }
    }

    return { newEntries, earlierEntries, isFirstVisit: false }
  }

  return { getLastVisit, markCaughtUp, getNewCount, getSplitEntries }
}
