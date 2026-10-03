import { computed, onMounted, onScopeDispose, watch } from 'vue'
import { useState, useSupabaseClient, useSupabaseUser } from '#imports'
import { useFSRSEngine, type StudyCard, type FSRSGrade } from './useFSRSEngine'
import { createSupabaseOfflineSyncAdapter, useOfflineSync, reconcileFSRSReviewLog, type FSRSCardSeed, type FSRSReviewMutation } from './useOfflineSync'
import { saveStudyCard, restoreStudyCard, type SavedStudyCard } from '../utils/review-state'
import { readAllRows } from '../utils/supabase-pages'
import { useFlashcardUnlock } from './useFlashcardUnlock'

interface CatalogCard {
  id: string; front: string; back: string; exam_section: string; topic: string; subtopic: string
  source_note_id: string; source_note_ids?: string[]; content_type?: 'pyq' | 'atomic_flashcard'; verified_pyq_count?: number
}

/** One account-scoped snapshot, immutable seed and event history for all review surfaces. */
export function useReviewState() {
  const user = useSupabaseUser()
  const client = useSupabaseClient<any>()
  const owner = computed(() => user.value?.id || 'guest')
  const stateKey = (id: string) => `studyos:fsrs:card-states:${id}`
  const seedKey = (id: string) => `studyos:fsrs:seeds:${id}`
  const logKey = (id: string) => `studyos:fsrs:events:${id}`
  const catalog = useState<CatalogCard[]>('review:catalog', () => [])
  const saved = useState<Record<string, SavedStudyCard>>('review:saved', () => ({}))
  const seeds = useState<Record<string, FSRSCardSeed>>('review:seeds', () => ({}))
  const events = useState<FSRSReviewMutation[]>('review:events', () => [])
  const hydratedFor = useState<string>('review:owner', () => '')
  const loading = useState<boolean>('review:loading', () => false)
  const generation = useState<number>('review:generation', () => 0)
  const error = useState<string | null>('review:error', () => null)
  const clock = useState<number>('review:clock', () => Date.now())
  const engine = useFSRSEngine()
  const unlock = useFlashcardUnlock()
  const sync = useOfflineSync({ getUserId: () => user.value?.id, adapter: createSupabaseOfflineSyncAdapter(client) })

  function read<T>(key: string, fallback: T): T {
    try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
  }
  function persist() {
    if (!import.meta.client || hydratedFor.value !== owner.value) return
    try {
      localStorage.setItem(stateKey(owner.value), JSON.stringify(saved.value))
      localStorage.setItem(seedKey(owner.value), JSON.stringify(seeds.value))
      localStorage.setItem(logKey(owner.value), JSON.stringify(events.value))
    } catch { error.value = 'Review progress could not be saved on this device.' }
  }
  const eligibleCatalog = computed(() => catalog.value.filter(c => unlock.mode.value === 'direct' ||
    (c.source_note_ids || [c.source_note_id]).some(id => unlock.isGatePassed(id))))
  const cards = computed(() => Object.values(saved.value).filter(s =>
    s.studyType === 'current_affair' && !!s.eventDate || eligibleCatalog.value.some(c => c.id === s.id)).map(restoreStudyCard))
  const due = computed(() => engine.buildDueQueue(cards.value, new Date(clock.value)))
  const dueCount = computed(() => due.value.length)
  const reviewedTotal = computed(() => cards.value.reduce((n, card) => n + card.fsrs.reps, 0))

  function seedMissing() {
    for (const c of eligibleCatalog.value) {
      const card = engine.createNewCard('static', { id: c.id, contentId: c.id, contentType: c.content_type || 'atomic_flashcard', unlocked: true, verifiedPyqCount: c.verified_pyq_count || 0 })
      // Older snapshots omitted unlocked/display metadata. Keep their schedule
      // and fill current catalog identity; eligibility was checked above.
      saved.value[c.id] = { ...saveStudyCard(card), ...saved.value[c.id], ...c, unlocked: true }
    }
    saved.value = { ...saved.value }
    persist()
  }
  async function hydrate(force = false) {
    if (!import.meta.client || (!force && hydratedFor.value === owner.value)) return
    const id = owner.value
    const run = ++generation.value
    loading.value = true
    error.value = null
    hydratedFor.value = id
    saved.value = read(stateKey(id), id === 'guest' ? read('studyos:fsrs:card-states', {}) : {})
    seeds.value = read(seedKey(id), {})
    events.value = read(logKey(id), [])
    try {
      if (!catalog.value.length) {
        const result = await $fetch<{ cards: CatalogCard[] }>('/api/flashcards')
        catalog.value = result.cards
      }
      if (owner.value !== id || generation.value !== run) return
      const pending = (await sync.pendingMutations()).filter((item): item is FSRSReviewMutation => item.type === 'fsrs_review')
      if (owner.value !== id || generation.value !== run) return
      events.value = [...new Map([...pending, ...events.value].map(item => [item.id, item])).values()]
      for (const event of events.value) seeds.value[event.payload.card_id] ||= event.payload.card_seed
      if (id !== 'guest') {
        await sync.flush()
        const [seedResult, logResult, topics, legacy, gates] = await Promise.all([
          readAllRows<any>((from,to) => client.from('user_review_card_seeds').select('*').eq('user_id', id).order('card_id').range(from,to)),
          readAllRows<any>((from,to) => client.from('user_review_logs').select('*').eq('user_id', id).order('id').range(from,to)),
          readAllRows<any>((from,to) => client.from('user_topic_states').select('*').eq('user_id', id).order('topic_id').range(from,to)),
          readAllRows<any>((from,to) => client.from('review_cards').select('*').eq('user_id', id).order('id').range(from,to)),
          client.from('gate_results').select('note_id,passed').eq('user_id', id).eq('passed', true),
        ])
        if (owner.value !== id || generation.value !== run) return
        for (const gate of gates.data || []) unlock.markGatePassed(gate.note_id)
        for (const t of topics.data || []) if (t.gate_passed) unlock.markGatePassed(t.topic_id)
        for (const row of legacy.data || []) {
          const c = catalog.value.find(c => c.id === row.content_id)
          if (!c || seeds.value[c.id]) continue
          const localTime = saved.value[c.id]?.fsrs.last_review || ''
          if (saved.value[c.id] && localTime >= (row.last_review || '')) continue
          const card = engine.createNewCard('static', { id: c.id, contentId: c.id, contentType: c.content_type || 'atomic_flashcard', unlocked: true, verifiedPyqCount: c.verified_pyq_count || 0 })
          saved.value[c.id] = { ...saveStudyCard(card), ...c, fsrs: { ...card.fsrs, ...row, last_review: row.last_review || null, due: row.due } }
        }
        if (seedResult.error || logResult.error || topics.error) throw new Error('Cloud review history is unavailable. Local progress is preserved.')
        const legacyIdentity = new Map((legacy.data || []).map(row => [row.id, row.content_id]))
        const cloudSeeds: Record<string, FSRSCardSeed> = {}
        for (const row of seedResult.data || []) {
          const cardId = legacyIdentity.get(row.card_id) || row.card_id
          if (cloudSeeds[cardId] && cloudSeeds[cardId].created_at <= row.created_at) continue
          cloudSeeds[cardId] = { card_id: cardId, initial_card: row.initial_card, created_at: row.created_at, metadata: row.metadata || {} }
        }
        // The immutable cloud seed wins over a competing local seed. All devices
        // then replay both acknowledged and still-pending events from that seed.
        seeds.value = { ...seeds.value, ...cloudSeeds }
        const unique = new Map(events.value.map(e => [e.id, e]))
        for (const row of logResult.data || []) {
          const cardId = legacyIdentity.get(row.card_id) || row.card_id
          const seed = seeds.value[cardId]
          if (!seed) continue
          unique.set(row.id, { id: row.id, owner_id: id, type: 'fsrs_review', payload: { ...row, card_id: cardId, card_seed: seed }, client_timestamp: row.client_created_at, synced: true, retry_count: 0, next_retry_at: null })
        }
        events.value = [...unique.values()]
      }
      for (const seed of Object.values(seeds.value)) {
          const metadata = { ...seed.metadata, ...saved.value[seed.card_id] } as SavedStudyCard
          if (!metadata.id) {
            const c = catalog.value.find(c => c.id === seed.card_id)
            if (!c) continue
            Object.assign(metadata, c, { contentId: c.id, contentType: c.content_type || 'atomic_flashcard', studyType: 'static', targetRetention: 0.9, unlocked: true, verifiedPyqCount: c.verified_pyq_count || 0 })
          }
          saved.value[seed.card_id] = { ...metadata, fsrs: reconcileFSRSReviewLog(seed, events.value, metadata.targetRetention || 0.9).card }
        }
      const missingMetadata = Object.values(saved.value).filter(card=>card.studyType==='current_affair' && (!card.eventDate || !card.front))
      for (let offset=0;offset<missingMetadata.length;offset+=100) {
        const result = await $fetch<{cards:Array<Partial<SavedStudyCard> & {id:string}>}>('/api/ca/review-content',{method:'POST',body:{ids:missingMetadata.slice(offset,offset+100).map(card=>card.id)}})
        if (owner.value!==id || generation.value!==run) return
        for (const metadata of result.cards) saved.value[metadata.id] = { ...saved.value[metadata.id], ...metadata }
      }
      if (missingMetadata.some(card=>!saved.value[card.id].eventDate)) error.value = 'Some older Current Affairs reviews have no matching source. Their saved progress is retained.'
      seedMissing()
    } catch (e) {
      if (owner.value === id && generation.value === run) error.value = e instanceof Error ? e.message : 'Review synchronization failed'
    } finally {
      if (owner.value === id && generation.value === run) { loading.value = false; seedMissing(); clock.value = Date.now() }
    }
  }
  function record(card: StudyCard, rating: FSRSGrade, at = new Date(), display?: Partial<CatalogCard>) {
    if (hydratedFor.value !== owner.value) return
    // Merge other-tab events before a synchronous local write can replace them.
    const diskEvents = read<FSRSReviewMutation[]>(logKey(owner.value), [])
    events.value = [...new Map([...diskEvents, ...events.value].map(e => [e.id, e])).values()]
    seeds.value = { ...read<Record<string, FSRSCardSeed>>(seedKey(owner.value), {}), ...seeds.value }
    const snapshot = { ...saved.value[card.id], ...saveStudyCard(card), ...display }
    const seed = seeds.value[card.id] || { card_id: card.id, initial_card: snapshot.fsrs, created_at: at.toISOString(), metadata: snapshot }
    seeds.value[card.id] = seed
    const replayed = reconcileFSRSReviewLog(seed, events.value, snapshot.targetRetention || 0.9).card
    const result = engine.scheduleReview({ ...card, fsrs: restoreStudyCard({ ...snapshot, fsrs: replayed }).fsrs }, rating, at)
    const event = sync.queueFSRSReview({ card_id: card.id, rating, state: result.card.fsrs.state, elapsed_days: result.card.fsrs.elapsed_days, review_time: at.toISOString(), card_seed: seed })
    events.value = [...events.value, event]
    saved.value = { ...saved.value, [card.id]: { ...snapshot, ...saveStudyCard(result.card) } }
    persist()
    clock.value = at.getTime()
    return result
  }
  const onStorage = (event: StorageEvent) => {
    if (event.key?.startsWith(`studyos:gate-passed:${owner.value}:`) || event.key === `studyos-flashcard-unlock-mode:${owner.value}`) unlock.refresh()
    if (event.key?.endsWith(`:${owner.value}`) || event.key?.startsWith(`studyos:gate-passed:${owner.value}:`)) void hydrate(true)
  }
  const onChange = () => { seedMissing(); void hydrate(true) }
  let timer: ReturnType<typeof setInterval> | undefined
  onMounted(() => {
    void hydrate()
    window.addEventListener('storage', onStorage)
    window.addEventListener('studyos:learning-changed', onChange)
    window.addEventListener('online', onChange)
    timer = setInterval(() => { clock.value = Date.now() }, 30_000)
  })
  onScopeDispose(() => { clearInterval(timer); if (import.meta.client) { window.removeEventListener('storage', onStorage); window.removeEventListener('studyos:learning-changed', onChange); window.removeEventListener('online', onChange) } })
  watch(owner, () => { void hydrate(true) }, { flush: 'sync' })
  watch(unlock.mode, seedMissing)
  const guestPassedNotes = () => [...new Set(catalog.value.flatMap(card => card.source_note_ids || [card.source_note_id]))]
    .filter(note => localStorage.getItem(`studyos:gate-passed:guest:${note}`) === 'true')
  const hasGuestProgress = computed(() => import.meta.client && owner.value !== 'guest' && !localStorage.getItem('studyos:guest-progress-imported') &&
    (Object.values(read<Record<string, SavedStudyCard>>(stateKey('guest'), {})).some(card => card.fsrs.reps > 0) || guestPassedNotes().length > 0))
  function importGuestProgress() {
    if (!hasGuestProgress.value || loading.value || hydratedFor.value !== owner.value) return
    const guest = read<Record<string, SavedStudyCard>>(stateKey('guest'), {})
    const existingHistory = new Set([...Object.keys(seeds.value), ...events.value.map(event => event.payload.card_id), ...Object.values(saved.value).filter(card => card.fsrs.reps > 0).map(card => card.id)])
    const imported = Object.fromEntries(Object.entries(guest).filter(([id]) => !existingHistory.has(id)))
    saved.value = { ...saved.value, ...imported }
    const guestSeeds = read<Record<string, FSRSCardSeed>>(seedKey('guest'), {})
    for (const event of read<FSRSReviewMutation[]>(logKey('guest'), [])) {
      if (!imported[event.payload.card_id]) continue
      const seed = guestSeeds[event.payload.card_id] || event.payload.card_seed
      seeds.value[seed.card_id] = seed
      events.value.push(sync.queueFSRSReview({ ...event.payload, card_seed: seed }))
    }
    for (const note of guestPassedNotes()) {
      unlock.markGatePassed(note)
      sync.queueGatePassed({ topic_id: note, passed: true })
    }
    localStorage.setItem('studyos:guest-progress-imported', owner.value)
    persist()
    void hydrate(true)
  }
  return { saved, cards, due, dueCount, reviewedTotal, catalog, loading, error, hydrate, record, sync, hasGuestProgress, importGuestProgress }
}
