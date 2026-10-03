/**
 * useCAState - local-first reading state for the Current Affairs feed.
 *
 * Tracks three things per user (guest or authenticated):
 *   1. Feed-level last-visit timestamp plus per-card read state
 *   2. Bookmarks (saved cards)
 *   3. MCQ attempts, where wrong answers are fed into the FSRS review queue
 *
 * Storage strategy (mirrors useTopicVisits):
 *   Layer 1: localStorage - instant, offline, no auth needed
 *   Layer 2: offline-sync mutation queue -> Supabase when signed in
 */
import { mergeCAAttempts } from '../utils/ca-attempts'
import { caReviewId } from '../utils/ca-review-id'
import { readAllRows } from '../utils/supabase-pages'
import { Rating } from 'ts-fsrs'
import { useSupabaseClient, useSupabaseUser, useState } from '#imports'
import { createSupabaseOfflineSyncAdapter, useOfflineSync,  } from '@/composables/useOfflineSync'
import { useReviewState } from './useReviewState'
import { restoreStudyCard } from '../utils/review-state'
import { useFSRSEngine } from '@/composables/useFSRSEngine'

export interface CAMcqAttempt {
  selected: number
  correct: boolean
  at: string
}

export interface CACardAttempts {
  score: number
  total: number
  lastAt: string
  /** Index-aligned array: perQuestion[i] is the attempt for mcqs[i]. */
  perQuestion: (CAMcqAttempt | undefined)[]
}

const READ_KEY = (uid: string) => `tgprb:ca:read:${uid}`
const BOOKMARK_KEY = (uid: string) => `tgprb:ca:bookmarks:${uid}`
const ATTEMPT_KEY = (uid: string) => `tgprb:ca:attempts:${uid}`
const LAST_SEEN_KEY = (uid: string) => `tgprb:ca:feed:last-seen:${uid}`

export function useCAState() {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient<any>()
  const offlineSync = useOfflineSync({
    getUserId: () => user.value?.id,
    adapter: createSupabaseOfflineSyncAdapter(supabase),
  })
  const engine = useFSRSEngine()
  const reviewState = useReviewState()

  const uid = computed(() => user.value?.id || 'guest')

  // Shared across every component that calls useCAState in this session.
  const readIds = useState<string[]>('ca:read', () => [])
  const bookmarkIds = useState<string[]>('ca:bookmarks', () => [])
  const attempts = useState<Record<string, CACardAttempts>>('ca:attempts', () => ({}))
  const lastVisit = useState<Date | null>('ca:last-visit', () => null)
  const generation = useState<number>('ca:load-generation',()=>0)
  const hydratedFor = useState<string>('ca:hydrated-for', () => '')

  // ---------------------------------------------------------------------------
  // Persistence helpers
  // ---------------------------------------------------------------------------

  function readJson<T>(key: string, fallback: T): T {
    if (!import.meta.client) return fallback
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
      return fallback
    }
  }

  function writeJson(key: string, value: unknown): void {
    if (!import.meta.client) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      console.error('[CA state] Local storage failed; pending changes remain in the sync queue')
    }
  }

  // ---------------------------------------------------------------------------
  // Hydration (once per user, re-runs on login/logout)
  // ---------------------------------------------------------------------------

  async function hydrate(force = false): Promise<void> {
    if (!import.meta.client) return
    const id = uid.value
    if (!force && hydratedFor.value === id) return
    const run = ++generation.value
    hydratedFor.value = id
    readIds.value = readJson<string[]>(READ_KEY(id), [])
    bookmarkIds.value = readJson<string[]>(BOOKMARK_KEY(id), [])
    attempts.value = readJson<Record<string, CACardAttempts>>(ATTEMPT_KEY(id), {})
    const seen = readJson<string>(LAST_SEEN_KEY(id), '')
    lastVisit.value = seen ? new Date(seen) : null
    if (id === 'guest') return
    await offlineSync.flush()
    const [visits, bookmarks, history] = await Promise.all([
      readAllRows<any>((from,to) => supabase.from('user_topic_states').select('*').eq('user_id', id).order('topic_id').range(from,to)),
      readAllRows<any>((from,to) => supabase.from('user_bookmarks').select('*').eq('user_id', id).order('content_id').range(from,to)),
      readAllRows<any>((from,to) => supabase.from('user_ca_attempts').select('*').eq('user_id', id).order('content_id').range(from,to)),
    ])
    if (uid.value !== id || generation.value !== run) return
    for (const row of visits.data || []) {
      if (row.topic_id === 'ca-feed' && row.last_seen_at && (!lastVisit.value || new Date(row.last_seen_at) > lastVisit.value)) lastVisit.value = new Date(row.last_seen_at)
      if (row.topic_id.startsWith('ca:') && !readIds.value.includes(row.topic_id.slice(3))) readIds.value.push(row.topic_id.slice(3))
    }
    // Flush acknowledges local choices before applying remote bookmark state.
    if (!bookmarks.error && !offlineSync.pendingCount.value) bookmarkIds.value = (bookmarks.data || []).filter(row => row.bookmarked).map(row => row.content_id)
    for (const row of history.data || []) {
      const local = attempts.value[row.content_id]
      attempts.value[row.content_id] = local ? mergeCAAttempts(local, row.attempts) as CACardAttempts : row.attempts
    }
    writeJson(READ_KEY(id), readIds.value)
    writeJson(BOOKMARK_KEY(id), bookmarkIds.value)
    writeJson(ATTEMPT_KEY(id), attempts.value)
    if (lastVisit.value) writeJson(LAST_SEEN_KEY(id), lastVisit.value.toISOString())
  }

  if (import.meta.client) {
    void hydrate()
    watch(uid, () => { void hydrate() }, { flush: 'sync' })
    const onOnline = () => { void hydrate(true) }
    window.addEventListener('online', onOnline)
    onScopeDispose(() => window.removeEventListener('online', onOnline))
  }

  // ---------------------------------------------------------------------------
  // Feed level: last visit + new-since-last-visit
  // ---------------------------------------------------------------------------

  function isNewSinceLastVisit(entry: any): boolean {
    if (!lastVisit.value) return false
    const publishedAt = entry?.meta?.published_at || entry?.meta?.date
    if (!publishedAt) return false
    const t = new Date(publishedAt).getTime()
    return !Number.isNaN(t) && t > lastVisit.value.getTime()
  }

  function newCount(entries: any[]): number {
    return entries.filter(isNewSinceLastVisit).length
  }

  function markAllRead(): void {
    const now = new Date()
    lastVisit.value = now
    if (import.meta.client) {
      try {
        localStorage.setItem(LAST_SEEN_KEY(uid.value), now.toISOString())
      } catch {
        // Storage blocked
      }
    }
    offlineSync.queueTopicVisit({ topic_id: 'ca-feed', last_seen_at: now.toISOString() })
  }
  // ---------------------------------------------------------------------------
  // Per-card read state
  // ---------------------------------------------------------------------------

  const readSet = computed(() => new Set(readIds.value))

  function isRead(cardId: string): boolean {
    return readSet.value.has(String(cardId))
  }

  function markRead(cardId: string): void {
    const id = String(cardId)
    if (readSet.value.has(id)) return
    readIds.value = [...readIds.value, id]
    writeJson(READ_KEY(uid.value), readIds.value)
    offlineSync.queueTopicVisit({ topic_id: `ca:${id}`, last_seen_at: new Date().toISOString() })
  }

  const readCount = computed(() => readIds.value.length)

  // ---------------------------------------------------------------------------
  // Bookmarks
  // ---------------------------------------------------------------------------

  const bookmarkSet = computed(() => new Set(bookmarkIds.value))

  function isBookmarked(cardId: string): boolean {
    return bookmarkSet.value.has(String(cardId))
  }

  function toggleBookmark(cardId: string): void {
    const id = String(cardId)
    const next = !bookmarkSet.value.has(id)
    bookmarkIds.value = next
      ? [...bookmarkIds.value, id]
      : bookmarkIds.value.filter(b => b !== id)
    writeJson(BOOKMARK_KEY(uid.value), bookmarkIds.value)
    offlineSync.queueBookmark({
      content_id: id,
      bookmarked: next,
      updated_at: new Date().toISOString(),
    })
  }

  const bookmarkedIds = computed(() => bookmarkSet.value)
  const bookmarkCount = computed(() => bookmarkIds.value.length)

  // ---------------------------------------------------------------------------
  // MCQ attempts + FSRS feed (wrong answers enter the /review queue)
  // ---------------------------------------------------------------------------

  function getAttempt(cardId: string): CACardAttempts | null {
    return attempts.value[String(cardId)] ?? null
  }

  function recordAttempt(card: any, mcqIndex: number, selectedIdx: number): { correct: boolean } {
    const mcqs = Array.isArray(card?.meta?.mcqs) ? card.meta.mcqs : []
    const mcq = mcqs[mcqIndex]
    if (!mcq) return { correct: false }

    const correct = selectedIdx === mcq.answer
    const now = new Date()
    const nowIso = now.toISOString()

    // 1. Persist attempt history
    const cardId = String(card.id)
    const prev = attempts.value[cardId]
    const perQuestion = [...(prev?.perQuestion ?? [])]
    perQuestion[mcqIndex] = { selected: selectedIdx, correct, at: nowIso }
    const score = perQuestion.filter(a => a?.correct).length
    attempts.value = {
      ...attempts.value,
      [cardId]: {
        score,
        total: mcqs.length,
        lastAt: nowIso,
        perQuestion,
      },
    }
    writeJson(ATTEMPT_KEY(uid.value), attempts.value)
    offlineSync.queueCAAttempt({ content_id: cardId, attempts: attempts.value[cardId], updated_at: nowIso })

    // 2. FSRS: wrong answers create a review card; correct answers graduate an
    //    existing one. A first-try correct answer creates nothing.
    const fsrsCardId = caReviewId(cardId, mcqIndex, card.meta.legacy_review_id)
    const existingCard = reviewState.saved.value[fsrsCardId]

    if (!correct || existingCard) {
      const studyCard = existingCard
        ? restoreStudyCard(existingCard)
        : engine.createNewCard('current_affair', {
            id: fsrsCardId,
            contentId: fsrsCardId,
            contentType: 'atomic_flashcard',
            unlocked: true,
            verifiedPyqCount: 0,
            sourceCurrentAffairId: cardId,
            eventDate: card.meta?.event_date || card.meta?.date,
            validUntil: card.meta?.valid_until,
            now,
          })

      const grade = correct ? Rating.Good : Rating.Again

      const correctText = mcq.options?.[mcq.answer] ?? ''
      const explanation = mcq.explanation ? ` - ${mcq.explanation}` : ''
      reviewState.record(studyCard, grade, now, {
        front: mcq.question ?? '',
        back: `${correctText}${explanation}`,
        exam_section: card.meta?.exam_section || 'Current Affairs',
        topic: 'Current Affairs',
        subtopic: card.meta?.headline || '',
      })


    }

    return { correct }
  }

  return {
    hydrate,
    lastVisit,
    isNewSinceLastVisit,
    newCount,
    markAllRead,
    isRead,
    markRead,
    readCount,
    isBookmarked,
    toggleBookmark,
    bookmarkedIds,
    bookmarkCount,
    getAttempt,
    recordAttempt,
  }
}
