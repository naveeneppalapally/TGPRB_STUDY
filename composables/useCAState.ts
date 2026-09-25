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
import { Rating } from 'ts-fsrs'
import { useSupabaseClient, useSupabaseUser, useState } from '#imports'
import { createSupabaseOfflineSyncAdapter, useOfflineSync, serializeFSRSCard } from '@/composables/useOfflineSync'
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
const FSRS_KEY = (uid: string) => `studyos:fsrs:card-states:${uid}`
const FSRS_LEGACY_KEY = 'studyos:fsrs:card-states'

export function useCAState() {
  const user = useSupabaseUser()
  const supabase = useSupabaseClient()
  const offlineSync = useOfflineSync({
    getUserId: () => user.value?.id,
    adapter: createSupabaseOfflineSyncAdapter(supabase),
  })
  const engine = useFSRSEngine()

  const uid = computed(() => user.value?.id || 'guest')

  // Shared across every component that calls useCAState in this session.
  const readIds = useState<string[]>('ca:read', () => [])
  const bookmarkIds = useState<string[]>('ca:bookmarks', () => [])
  const attempts = useState<Record<string, CACardAttempts>>('ca:attempts', () => ({}))
  const lastVisit = useState<Date | null>('ca:last-visit', () => null)
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
      // Storage full or blocked - state stays in memory for this session
    }
  }

  function loadFsrsStates(): Record<string, any> {
    if (!import.meta.client) return {}
    try {
      const key = FSRS_KEY(uid.value)
      let raw = localStorage.getItem(key)
      if (!raw && uid.value === 'guest') {
        raw = localStorage.getItem(FSRS_LEGACY_KEY)
      }
      return raw ? JSON.parse(raw) : {}
    } catch {
      return {}
    }
  }

  function saveFsrsStates(states: Record<string, any>): void {
    if (!import.meta.client) return
    try {
      localStorage.setItem(FSRS_KEY(uid.value), JSON.stringify(states))
    } catch {
      // Storage full or blocked
    }
  }

  // ---------------------------------------------------------------------------
  // Hydration (once per user, re-runs on login/logout)
  // ---------------------------------------------------------------------------

  function hydrate(): void {
    if (!import.meta.client) return
    const id = uid.value
    if (hydratedFor.value === id) return
    hydratedFor.value = id
    readIds.value = readJson<string[]>(READ_KEY(id), [])
    bookmarkIds.value = readJson<string[]>(BOOKMARK_KEY(id), [])
    attempts.value = readJson<Record<string, CACardAttempts>>(ATTEMPT_KEY(id), {})
    const seen = readJson<string>(LAST_SEEN_KEY(id), '')
    lastVisit.value = seen ? new Date(seen) : null
  }

  if (import.meta.client) {
    hydrate()
    watch(uid, () => hydrate())
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

  function saveCaFsrsCard(
    cardId: string,
    studyCard: any,
    display: { front: string, back: string, exam_section: string, topic: string, subtopic: string },
  ): void {
    const existing = loadFsrsStates()
    const prev = existing[cardId]
    existing[cardId] = {
      ...prev,
      ...display,
      id: studyCard.id,
      contentId: studyCard.contentId,
      contentType: studyCard.contentType,
      studyType: studyCard.studyType,
      unlocked: true,
      targetRetention: studyCard.targetRetention,
      verifiedPyqCount: studyCard.verifiedPyqCount,
      fsrs: {
        ...studyCard.fsrs,
        due: studyCard.fsrs.due.toISOString(),
        last_review: studyCard.fsrs.last_review ? studyCard.fsrs.last_review.toISOString() : undefined,
      },
    }
    saveFsrsStates(existing)
  }

  function hydrateExistingStudyCard(saved: any): any {
    return {
      id: saved.id,
      contentId: saved.contentId,
      contentType: saved.contentType,
      studyType: saved.studyType,
      unlocked: true,
      verifiedPyqCount: saved.verifiedPyqCount ?? 0,
      targetRetention: saved.targetRetention ?? 0.9,
      fsrs: {
        ...saved.fsrs,
        due: new Date(saved.fsrs.due),
        last_review: saved.fsrs.last_review ? new Date(saved.fsrs.last_review) : undefined,
      },
    }
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

    // 2. FSRS: wrong answers create a review card; correct answers graduate an
    //    existing one. A first-try correct answer creates nothing.
    const fsrsCardId = `ca-mcq-${cardId}-q${mcqIndex}`
    const saved = loadFsrsStates()
    const existingCard = saved[fsrsCardId]

    if (!correct || existingCard) {
      const studyCard = existingCard
        ? hydrateExistingStudyCard(existingCard)
        : engine.createNewCard('current_affair', {
            id: fsrsCardId,
            contentId: fsrsCardId,
            contentType: 'atomic_flashcard',
            unlocked: true,
            verifiedPyqCount: 0,
            sourceCurrentAffairId: cardId,
            eventDate: card.meta?.event_date || card.meta?.date,
            now,
          })

      const grade = correct ? Rating.Good : Rating.Again
      const preReviewFsrs = studyCard.fsrs
      const result = engine.scheduleReview(studyCard, grade, now)

      const correctText = mcq.options?.[mcq.answer] ?? ''
      const explanation = mcq.explanation ? ` - ${mcq.explanation}` : ''
      saveCaFsrsCard(fsrsCardId, result.card, {
        front: mcq.question ?? '',
        back: `${correctText}${explanation}`,
        exam_section: card.meta?.exam_section || 'Current Affairs',
        topic: 'Current Affairs',
        subtopic: card.meta?.headline || '',
      })

      offlineSync.queueFSRSReview({
        card_id: fsrsCardId,
        rating: correct ? 3 : 1,
        state: result.card.fsrs.state,
        elapsed_days: result.card.fsrs.elapsed_days,
        review_time: nowIso,
        card_seed: {
          card_id: fsrsCardId,
          initial_card: serializeFSRSCard(preReviewFsrs),
          created_at: nowIso,
        },
      })
    }

    return { correct }
  }

  return {
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

