import { onScopeDispose, ref, type Ref } from 'vue'
import {
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
} from 'ts-fsrs'
import type { SupabaseClient } from '@supabase/supabase-js'

/**
 * Browser-only local-first mutation transport. It uses IndexedDB when
 * available, falls back to localStorage, and deliberately does not register a
 * service worker or cache application content.
 */

export type OfflineMutationType = 'fsrs_review' | 'gate_passed' | 'topic_visit' | 'bookmark' | 'note_upsert' | 'improvement_create'
export type FSRSRating = 1 | 2 | 3 | 4

export interface SerializableFSRSCard {
  due: string
  stability: number
  difficulty: number
  elapsed_days: number
  scheduled_days: number
  reps: number
  lapses: number
  state: number
  last_review: string | null
}

/** The immutable card state from before its first review. */
export interface FSRSCardSeed {
  card_id: string
  initial_card: SerializableFSRSCard
  created_at: string
}

export interface FSRSReviewPayload {
  card_id: string
  rating: FSRSRating
  /** Local state recorded for observability. Reconciliation replays rating history. */
  state: number
  elapsed_days: number
  review_time: string
  card_seed: FSRSCardSeed
}

export interface GatePassedPayload {
  topic_id: string
  passed: true
  last_seen_at?: string
}

export interface TopicVisitPayload {
  topic_id: string
  last_seen_at: string
}

export interface BookmarkPayload {
  content_id: string
  bookmarked: boolean
  updated_at: string
}

export interface NoteUpsertPayload {
  note: {
    id: string
    note_id: string
    section_id: string
    section_label: string
    anchor_text?: string
    body: string
    is_important: boolean
    is_doubt: boolean
    deleted: boolean
  }
  updated_at: string
}

export interface ImprovementCreatePayload {
  item: {
    id: string
    note_id: string
    section_id?: string
    section_label?: string
    item_type: string
    reference_url?: string
    description: string
  }
  created_at: string
}

export interface OfflineMutationBase<TType extends OfflineMutationType, TPayload> {
  id: string
  type: TType
  payload: TPayload
  client_timestamp: string
  synced: boolean
  retry_count: number
  next_retry_at: string | null
}

export type FSRSReviewMutation = OfflineMutationBase<'fsrs_review', FSRSReviewPayload>
export type GatePassedMutation = OfflineMutationBase<'gate_passed', GatePassedPayload>
export type TopicVisitMutation = OfflineMutationBase<'topic_visit', TopicVisitPayload>
export type BookmarkMutation = OfflineMutationBase<'bookmark', BookmarkPayload>
export type NoteUpsertMutation = OfflineMutationBase<'note_upsert', NoteUpsertPayload>
export type ImprovementCreateMutation = OfflineMutationBase<'improvement_create', ImprovementCreatePayload>

export type OfflineMutation =
  | FSRSReviewMutation
  | GatePassedMutation
  | TopicVisitMutation
  | BookmarkMutation
  | NoteUpsertMutation
  | ImprovementCreateMutation

type MutationPayloadByType = {
  fsrs_review: FSRSReviewPayload
  gate_passed: GatePassedPayload
  topic_visit: TopicVisitPayload
  bookmark: BookmarkPayload
  note_upsert: NoteUpsertPayload
  improvement_create: ImprovementCreatePayload
}

type MutationByType<TType extends OfflineMutationType> = Extract<OfflineMutation, { type: TType }>

export interface TopicState {
  topic_id: string
  gate_passed: boolean
  last_seen_at: string | null
  updated_at?: string
}

export interface BookmarkState {
  content_id: string
  bookmarked: boolean
  updated_at: string
  event_id: string
}

export interface MutationStore {
  put(mutation: OfflineMutation): Promise<void>
  listPending(limit: number, now: Date): Promise<OfflineMutation[]>
  listAllPending(): Promise<OfflineMutation[]>
  markSynced(ids: string[]): Promise<void>
  scheduleRetry(ids: string[], retryCount: number, nextRetryAt: Date): Promise<void>
}

export interface OfflineSyncAdapter {
  sync(userId: string, mutations: OfflineMutation[]): Promise<{ syncedIds: string[] }>
}

export type OfflineSyncStatus = 'synced' | 'idle' | 'offline' | 'unauthenticated' | 'retry_scheduled'

export interface OfflineSyncResult {
  status: OfflineSyncStatus
  syncedCount: number
  pendingCount: number
  retryAfterMs?: number
  error?: Error
}

export interface OfflineSyncOptions {
  /** Return null for anonymous users. Their local queue remains durable until sign-in. */
  getUserId: () => string | null | undefined
  adapter: OfflineSyncAdapter
  store?: MutationStore
  /** Injected in tests. Defaults to navigator.onLine in a browser. */
  isOnline?: () => boolean
  now?: () => Date
  random?: () => number
  batchSize?: number
  autoStart?: boolean
}

export interface OfflineSyncEngine {
  pendingCount: Ref<number>
  isSyncing: Ref<boolean>
  lastError: Ref<Error | null>
  initialize(): Promise<void>
  start(): void
  stop(): void
  enqueue<TType extends OfflineMutationType>(
    type: TType,
    payload: MutationPayloadByType[TType],
  ): MutationByType<TType>
  queueFSRSReview(payload: FSRSReviewPayload): FSRSReviewMutation
  queueGatePassed(payload: GatePassedPayload): GatePassedMutation
  queueTopicVisit(payload: TopicVisitPayload): TopicVisitMutation
  queueBookmark(payload: BookmarkPayload): BookmarkMutation
  queueNoteUpsert(payload: NoteUpsertPayload): NoteUpsertMutation
  queueImprovementCreate(payload: ImprovementCreatePayload): ImprovementCreateMutation
  flush(): Promise<OfflineSyncResult>
}

const DB_NAME = 'tslprb-studyos-offline'
const STORE_NAME = 'mutations'
const LOCAL_STORAGE_KEY = 'tslprb:offline:mutations:v1'
const MAX_BATCH_SIZE = 50
const MAX_RETRY_DELAY_MS = 30_000

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

function cloneMutation<T extends OfflineMutation>(mutation: T): T {
  return JSON.parse(JSON.stringify(mutation)) as T
}

function validDate(value: string, field: string): void {
  if (Number.isNaN(new Date(value).getTime())) {
    throw new Error(`${field} must be an ISO-8601 date string`)
  }
}

function assertReviewRating(rating: number): asserts rating is FSRSRating {
  if (!Number.isInteger(rating) || rating < Rating.Again || rating > Rating.Easy) {
    throw new Error('FSRS rating must be an integer from 1 through 4')
  }
}

function validatePayload(type: OfflineMutationType, payload: MutationPayloadByType[OfflineMutationType]): void {
  if (type === 'fsrs_review') {
    const review = payload as FSRSReviewPayload
    if (!review.card_id || !review.card_seed?.card_id) throw new Error('fsrs_review requires card_id and card_seed')
    if (review.card_id !== review.card_seed.card_id) throw new Error('fsrs_review card_id must match card_seed.card_id')
    assertReviewRating(review.rating)
    validDate(review.review_time, 'review_time')
    validDate(review.card_seed.created_at, 'card_seed.created_at')
    validDate(review.card_seed.initial_card.due, 'card_seed.initial_card.due')
    if (review.card_seed.initial_card.last_review) validDate(review.card_seed.initial_card.last_review, 'card_seed.initial_card.last_review')
    return
  }

  if (type === 'gate_passed') {
    const gate = payload as GatePassedPayload
    if (!gate.topic_id || gate.passed !== true) throw new Error('gate_passed requires topic_id and passed: true')
    if (gate.last_seen_at) validDate(gate.last_seen_at, 'last_seen_at')
    return
  }

  if (type === 'topic_visit') {
    const visit = payload as TopicVisitPayload
    if (!visit.topic_id) throw new Error('topic_visit requires topic_id')
    validDate(visit.last_seen_at, 'last_seen_at')
    return
  }

  if (type === 'bookmark') {
    const bookmark = payload as BookmarkPayload
    if (!bookmark.content_id) throw new Error('bookmark requires content_id')
    validDate(bookmark.updated_at, 'updated_at')
    return
  }

  if (type === 'note_upsert') {
    const note = payload as NoteUpsertPayload
    if (!note.note?.id) throw new Error('note_upsert requires note.id')
    if (!note.note.note_id) throw new Error('note_upsert requires note.note_id')
    if (!note.note.section_id) throw new Error('note_upsert requires note.section_id')
    if (typeof note.note.body !== 'string') throw new Error('note_upsert requires note.body')
    validDate(note.updated_at, 'updated_at')
    return
  }

  if (type === 'improvement_create') {
    const improvement = payload as ImprovementCreatePayload
    if (!improvement.item?.id) throw new Error('improvement_create requires item.id')
    if (!improvement.item.note_id) throw new Error('improvement_create requires item.note_id')
    if (!improvement.item.item_type) throw new Error('improvement_create requires item.item_type')
    if (!improvement.item.description) throw new Error('improvement_create requires item.description')
    validDate(improvement.created_at, 'created_at')
    return
  }
}

function createEventId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  // A UUIDv4-compatible fallback for older webviews. It remains client-local
  // and is only used when crypto.randomUUID is unavailable.
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
    const random = Math.floor(Math.random() * 16)
    const value = character === 'x' ? random : (random & 0x3) | 0x8
    return value.toString(16)
  })
}

function sortMutations(mutations: OfflineMutation[]): OfflineMutation[] {
  return [...mutations].sort((left, right) => {
    const byTime = left.client_timestamp.localeCompare(right.client_timestamp)
    return byTime !== 0 ? byTime : left.id.localeCompare(right.id)
  })
}

/** In-memory implementation for SSR and deterministic tests. */
export class InMemoryMutationStore implements MutationStore {
  private mutations = new Map<string, OfflineMutation>()

  async put(mutation: OfflineMutation): Promise<void> {
    this.mutations.set(mutation.id, cloneMutation(mutation))
  }

  async listPending(limit: number, now: Date): Promise<OfflineMutation[]> {
    return sortMutations([...this.mutations.values()]
      .filter((mutation) => !mutation.synced)
      .filter((mutation) => !mutation.next_retry_at || new Date(mutation.next_retry_at).getTime() <= now.getTime()))
      .slice(0, limit)
      .map(cloneMutation)
  }

  async listAllPending(): Promise<OfflineMutation[]> {
    return sortMutations([...this.mutations.values()]
      .filter((mutation) => !mutation.synced)
      .map(cloneMutation))
  }

  async markSynced(ids: string[]): Promise<void> {
    for (const id of ids) {
      const mutation = this.mutations.get(id)
      if (!mutation) continue
      this.mutations.set(id, { ...mutation, synced: true, next_retry_at: null })
    }
  }

  async scheduleRetry(ids: string[], retryCount: number, nextRetryAt: Date): Promise<void> {
    for (const id of ids) {
      const mutation = this.mutations.get(id)
      if (!mutation) continue
      this.mutations.set(id, {
        ...mutation,
        retry_count: retryCount,
        next_retry_at: nextRetryAt.toISOString(),
      })
    }
  }
}

class LocalStorageMutationStore implements MutationStore {
  private read(): OfflineMutation[] {
    if (!isBrowser() || typeof localStorage === 'undefined') return []
    try {
      const value = localStorage.getItem(LOCAL_STORAGE_KEY)
      return value ? JSON.parse(value) as OfflineMutation[] : []
    } catch {
      return []
    }
  }

  private write(mutations: OfflineMutation[]): void {
    if (!isBrowser() || typeof localStorage === 'undefined') return
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mutations))
  }

  async put(mutation: OfflineMutation): Promise<void> {
    const values = this.read().filter((item) => item.id !== mutation.id)
    values.push(cloneMutation(mutation))
    this.write(values)
  }

  async listPending(limit: number, now: Date): Promise<OfflineMutation[]> {
    return sortMutations(this.read()
      .filter((mutation) => !mutation.synced)
      .filter((mutation) => !mutation.next_retry_at || new Date(mutation.next_retry_at).getTime() <= now.getTime()))
      .slice(0, limit)
  }

  async listAllPending(): Promise<OfflineMutation[]> {
    return sortMutations(this.read().filter((mutation) => !mutation.synced))
  }

  async markSynced(ids: string[]): Promise<void> {
    const wanted = new Set(ids)
    this.write(this.read().map((mutation) => wanted.has(mutation.id)
      ? { ...mutation, synced: true, next_retry_at: null }
      : mutation))
  }

  async scheduleRetry(ids: string[], retryCount: number, nextRetryAt: Date): Promise<void> {
    const wanted = new Set(ids)
    this.write(this.read().map((mutation) => wanted.has(mutation.id)
      ? { ...mutation, retry_count: retryCount, next_retry_at: nextRetryAt.toISOString() }
      : mutation))
  }
}

class IndexedDBMutationStore implements MutationStore {
  private database: Promise<IDBDatabase> | null = null

  private open(): Promise<IDBDatabase> {
    if (this.database) return this.database

    this.database = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1)
      request.onupgradeneeded = () => {
        const database = request.result
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          database.createObjectStore(STORE_NAME, { keyPath: 'id' })
        }
      }
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error ?? new Error('Unable to open IndexedDB'))
    })

    return this.database
  }

  private async request<T>(mode: IDBTransactionMode, action: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
    const database = await this.open()
    return new Promise<T>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, mode)
      const request = action(transaction.objectStore(STORE_NAME))
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'))
      transaction.onerror = () => reject(transaction.error ?? new Error('IndexedDB transaction failed'))
    })
  }

  async put(mutation: OfflineMutation): Promise<void> {
    await this.request('readwrite', (store) => store.put(cloneMutation(mutation)))
  }

  private async all(): Promise<OfflineMutation[]> {
    return this.request<OfflineMutation[]>('readonly', (store) => store.getAll())
  }

  async listPending(limit: number, now: Date): Promise<OfflineMutation[]> {
    const mutations = await this.all()
    return sortMutations(mutations
      .filter((mutation) => !mutation.synced)
      .filter((mutation) => !mutation.next_retry_at || new Date(mutation.next_retry_at).getTime() <= now.getTime()))
      .slice(0, limit)
  }

  async listAllPending(): Promise<OfflineMutation[]> {
    return sortMutations((await this.all()).filter((mutation) => !mutation.synced))
  }

  async markSynced(ids: string[]): Promise<void> {
    const wanted = new Set(ids)
    const mutations = await this.all()
    await Promise.all(mutations
      .filter((mutation) => wanted.has(mutation.id))
      .map((mutation) => this.put({ ...mutation, synced: true, next_retry_at: null })))
  }

  async scheduleRetry(ids: string[], retryCount: number, nextRetryAt: Date): Promise<void> {
    const wanted = new Set(ids)
    const mutations = await this.all()
    await Promise.all(mutations
      .filter((mutation) => wanted.has(mutation.id))
      .map((mutation) => this.put({
        ...mutation,
        retry_count: retryCount,
        next_retry_at: nextRetryAt.toISOString(),
      })))
  }
}

class FallbackMutationStore implements MutationStore {
  private useFallback = false

  constructor(
    private readonly primary: MutationStore,
    private readonly fallback: MutationStore,
  ) {}

  private async run<T>(operation: (store: MutationStore) => Promise<T>): Promise<T> {
    if (this.useFallback) return operation(this.fallback)
    try {
      return await operation(this.primary)
    } catch {
      this.useFallback = true
      return operation(this.fallback)
    }
  }

  put(mutation: OfflineMutation): Promise<void> {
    return this.run((store) => store.put(mutation))
  }

  listPending(limit: number, now: Date): Promise<OfflineMutation[]> {
    return this.run((store) => store.listPending(limit, now))
  }

  listAllPending(): Promise<OfflineMutation[]> {
    return this.run((store) => store.listAllPending())
  }

  markSynced(ids: string[]): Promise<void> {
    return this.run((store) => store.markSynced(ids))
  }

  scheduleRetry(ids: string[], retryCount: number, nextRetryAt: Date): Promise<void> {
    return this.run((store) => store.scheduleRetry(ids, retryCount, nextRetryAt))
  }
}

/** Uses IndexedDB when possible, localStorage when IndexedDB is unavailable, and memory during SSR. */
export function createBrowserMutationStore(): MutationStore {
  if (!isBrowser()) return new InMemoryMutationStore()
  const fallback = typeof localStorage === 'undefined' ? new InMemoryMutationStore() : new LocalStorageMutationStore()
  if (typeof indexedDB === 'undefined') return fallback
  return new FallbackMutationStore(new IndexedDBMutationStore(), fallback)
}

function isFsrsReview(mutation: OfflineMutation): mutation is FSRSReviewMutation {
  return mutation.type === 'fsrs_review'
}

function isTopicVisit(mutation: OfflineMutation): mutation is TopicVisitMutation {
  return mutation.type === 'topic_visit'
}

function isGatePassed(mutation: OfflineMutation): mutation is GatePassedMutation {
  return mutation.type === 'gate_passed'
}

function isBookmark(mutation: OfflineMutation): mutation is BookmarkMutation {
  return mutation.type === 'bookmark'
}

function isNoteUpsert(mutation: OfflineMutation): mutation is NoteUpsertMutation {
  return mutation.type === 'note_upsert'
}

function isImprovementCreate(mutation: OfflineMutation): mutation is ImprovementCreateMutation {
  return mutation.type === 'improvement_create'
}

function latestByTimestamp<T extends { updated_at: string, event_id: string }>(left: T, right: T): T {
  const timestamp = left.updated_at.localeCompare(right.updated_at)
  return timestamp > 0 || (timestamp === 0 && left.event_id.localeCompare(right.event_id) > 0) ? left : right
}

function toCard(seed: SerializableFSRSCard): Card {
  return {
    due: new Date(seed.due),
    stability: seed.stability,
    difficulty: seed.difficulty,
    elapsed_days: seed.elapsed_days,
    scheduled_days: seed.scheduled_days,
    reps: seed.reps,
    lapses: seed.lapses,
    state: seed.state as State,
    last_review: seed.last_review ? new Date(seed.last_review) : undefined,
  }
}

export function serializeFSRSCard(card: Card): SerializableFSRSCard {
  return {
    due: card.due.toISOString(),
    stability: card.stability,
    difficulty: card.difficulty,
    elapsed_days: card.elapsed_days,
    scheduled_days: card.scheduled_days,
    reps: card.reps,
    lapses: card.lapses,
    state: card.state,
    last_review: card.last_review ? card.last_review.toISOString() : null,
  }
}

/**
 * Append-only FSRS CRDT resolution. Duplicates collapse by event ID, then all
 * distinct ratings replay in a total order: review_time, client_timestamp, ID.
 * Both devices therefore reach the same card state from the same log history.
 */
export function reconcileFSRSReviewLog(
  seed: FSRSCardSeed,
  events: FSRSReviewMutation[],
  targetRetention = 0.9,
): { card: SerializableFSRSCard, orderedEventIds: string[] } {
  const unique = new Map<string, FSRSReviewMutation>()
  for (const event of events) {
    if (event.payload.card_id !== seed.card_id) continue
    unique.set(event.id, event)
  }

  const ordered = [...unique.values()].sort((left, right) => {
    const byReviewTime = left.payload.review_time.localeCompare(right.payload.review_time)
    if (byReviewTime !== 0) return byReviewTime
    const byClientTime = left.client_timestamp.localeCompare(right.client_timestamp)
    return byClientTime !== 0 ? byClientTime : left.id.localeCompare(right.id)
  })

  const scheduler = fsrs(generatorParameters({
    request_retention: targetRetention,
    enable_fuzz: false,
    enable_short_term: true,
  }))
  let card = toCard(seed.initial_card)

  for (const event of ordered) {
    assertReviewRating(event.payload.rating)
    validDate(event.payload.review_time, 'review_time')
    card = scheduler.next(card, new Date(event.payload.review_time), event.payload.rating as Grade).card
  }

  return { card: serializeFSRSCard(card), orderedEventIds: ordered.map((event) => event.id) }
}

/** Topic-state CRDT: passed is monotonic OR and last_seen_at is the latest timestamp. */
export function mergeTopicState(local: TopicState | null, cloud: TopicState | null): TopicState | null {
  if (!local) return cloud ? { ...cloud } : null
  if (!cloud) return { ...local }
  if (local.topic_id !== cloud.topic_id) throw new Error('Topic states must refer to the same topic')

  const localSeen = local.last_seen_at ? new Date(local.last_seen_at).getTime() : Number.NEGATIVE_INFINITY
  const cloudSeen = cloud.last_seen_at ? new Date(cloud.last_seen_at).getTime() : Number.NEGATIVE_INFINITY
  const lastSeen = localSeen >= cloudSeen ? local.last_seen_at : cloud.last_seen_at

  return {
    topic_id: local.topic_id,
    gate_passed: local.gate_passed || cloud.gate_passed,
    last_seen_at: lastSeen,
    updated_at: local.updated_at && cloud.updated_at
      ? (local.updated_at >= cloud.updated_at ? local.updated_at : cloud.updated_at)
      : local.updated_at ?? cloud.updated_at,
  }
}

/** Bookmark conflict resolution: timestamp LWW, then event-ID tie-breaker. */
export function mergeBookmarkState(local: BookmarkState | null, cloud: BookmarkState | null): BookmarkState | null {
  if (!local) return cloud ? { ...cloud } : null
  if (!cloud) return { ...local }
  if (local.content_id !== cloud.content_id) throw new Error('Bookmark states must refer to the same content')
  return latestByTimestamp(local, cloud)
}

function retryDelayMs(retryCount: number, random: () => number): number {
  const base = Math.min(MAX_RETRY_DELAY_MS, 1_000 * 2 ** Math.max(0, retryCount - 1))
  return Math.round(base * (0.75 + random() * 0.5))
}

/**
 * Low-level engine constructor. Kept separate from useOfflineSync so browser
 * buffering, reconnection, and conflict logic can be tested without Nuxt.
 */
export function createOfflineSyncEngine(options: OfflineSyncOptions): OfflineSyncEngine {
  const store = options.store ?? createBrowserMutationStore()
  const now = options.now ?? (() => new Date())
  const random = options.random ?? Math.random
  const batchSize = Math.min(MAX_BATCH_SIZE, Math.max(1, options.batchSize ?? MAX_BATCH_SIZE))
  const pendingCount = ref(0)
  const isSyncing = ref(false)
  const lastError = ref<Error | null>(null)
  const pendingWrites = new Map<string, Promise<void>>()
  let initialized = false
  let activeFlush: Promise<OfflineSyncResult> | null = null
  let retryTimer: ReturnType<typeof setTimeout> | null = null
  let started = false

  const isOnline = options.isOnline ?? (() => !isBrowser() || navigator.onLine)

  async function refreshPendingCount(): Promise<void> {
    const persisted = await store.listAllPending()
    const persistedIds = new Set(persisted.map((mutation) => mutation.id))
    const notYetPersisted = [...pendingWrites.keys()]
      .filter((id) => !persistedIds.has(id))
      .length
    pendingCount.value = persisted.length + notYetPersisted
  }

  async function initialize(): Promise<void> {
    if (initialized) return
    await refreshPendingCount()
    initialized = true
  }

  function persistWithoutBlocking(mutation: OfflineMutation): void {
    // Start the IndexedDB/localStorage operation immediately, but never await
    // it in the caller's interaction path. This issues the durable local write
    // before queueFSRSReview/queueTopicVisit/etc. returns.
    const write = store.put(mutation)
    pendingWrites.set(mutation.id, write)
    void write
      .catch((error: unknown) => {
        lastError.value = error instanceof Error ? error : new Error(String(error))
      })
      .finally(() => pendingWrites.delete(mutation.id))
  }

  function enqueue<TType extends OfflineMutationType>(
    type: TType,
    payload: MutationPayloadByType[TType],
  ): MutationByType<TType> {
    validatePayload(type, payload)
    const mutation = {
      id: createEventId(),
      type,
      payload,
      client_timestamp: now().toISOString(),
      synced: false,
      retry_count: 0,
      next_retry_at: null,
    } as MutationByType<TType>

    // This synchronous ref update is the UI's immediate local commit. The
    // IndexedDB write has already been issued and never blocks a flip, rating,
    // answer, bookmark, or caught-up action.
    pendingCount.value += 1
    persistWithoutBlocking(mutation)
    if (isOnline()) {
      void Promise.resolve().then(() => flush())
    }
    return mutation
  }

  async function flushInternal(): Promise<OfflineSyncResult> {
    await initialize()
    await Promise.all([...pendingWrites.values()])

    const userId = options.getUserId()
    if (!userId) {
      return { status: 'unauthenticated', syncedCount: 0, pendingCount: pendingCount.value }
    }
    if (!isOnline()) {
      return { status: 'offline', syncedCount: 0, pendingCount: pendingCount.value }
    }

    isSyncing.value = true
    lastError.value = null
    let syncedCount = 0
    let currentBatch: OfflineMutation[] = []

    try {
      while (true) {
        currentBatch = await store.listPending(batchSize, now())
        if (currentBatch.length === 0) break

        const response = await options.adapter.sync(userId, currentBatch)
        const currentIds = new Set(currentBatch.map((mutation) => mutation.id))
        const syncedIds = response.syncedIds.filter((id) => currentIds.has(id))
        if (syncedIds.length !== currentBatch.length) {
          throw new Error('Sync adapter did not acknowledge every event in the batch')
        }

        await store.markSynced(syncedIds)
        syncedCount += syncedIds.length
      }

      await refreshPendingCount()
      return { status: syncedCount > 0 ? 'synced' : 'idle', syncedCount, pendingCount: pendingCount.value }
    } catch (error: unknown) {
      const failure = error instanceof Error ? error : new Error(String(error))
      lastError.value = failure
      const retryCount = Math.max(1, ...currentBatch.map((mutation) => mutation.retry_count + 1))
      const delay = retryDelayMs(retryCount, random)
      const retryAt = new Date(now().getTime() + delay)

      if (currentBatch.length > 0) {
        await store.scheduleRetry(currentBatch.map((mutation) => mutation.id), retryCount, retryAt)
      }
      await refreshPendingCount()

      if (isBrowser()) {
        if (retryTimer) clearTimeout(retryTimer)
        retryTimer = setTimeout(() => {
          retryTimer = null
          void flush()
        }, delay)
      }

      return {
        status: 'retry_scheduled',
        syncedCount,
        pendingCount: pendingCount.value,
        retryAfterMs: delay,
        error: failure,
      }
    } finally {
      isSyncing.value = false
    }
  }

  function flush(): Promise<OfflineSyncResult> {
    if (!activeFlush) {
      activeFlush = flushInternal().finally(() => {
        activeFlush = null
      })
    }
    return activeFlush
  }

  const onOnline = () => {
    void flush()
  }

  function start(): void {
    if (started || !isBrowser()) return
    started = true
    window.addEventListener('online', onOnline)
    void initialize().then(() => {
      if (isOnline()) void flush()
    })
  }

  function stop(): void {
    if (!started || !isBrowser()) return
    window.removeEventListener('online', onOnline)
    started = false
    if (retryTimer) {
      clearTimeout(retryTimer)
      retryTimer = null
    }
  }

  if (options.autoStart) start()

  return {
    pendingCount,
    isSyncing,
    lastError,
    initialize,
    start,
    stop,
    enqueue,
    queueFSRSReview: (payload) => enqueue('fsrs_review', payload),
    queueGatePassed: (payload) => enqueue('gate_passed', payload),
    queueTopicVisit: (payload) => enqueue('topic_visit', payload),
    queueBookmark: (payload) => enqueue('bookmark', payload),
    queueNoteUpsert: (payload) => enqueue('note_upsert', payload),
    queueImprovementCreate: (payload) => enqueue('improvement_create', payload),
    flush,
  }
}

/** Vue lifecycle wrapper for the engine. */
export function useOfflineSync(options?: Partial<OfflineSyncOptions>): OfflineSyncEngine {
  if (!options || !options.getUserId || !options.adapter) {
    return {
      pendingCount: ref(0),
      isSyncing: ref(false),
      lastError: ref(null),
      initialize: async () => {},
      start: () => {},
      stop: () => {},
      enqueue: () => ({} as any),
    }
  }
  const engine = createOfflineSyncEngine({ ...options as OfflineSyncOptions, autoStart: options.autoStart ?? true })
  onScopeDispose(() => engine.stop())
  return engine
}

function assertSupabaseResult(result: { error: unknown }): void {
  if (result.error) {
    throw result.error instanceof Error ? result.error : new Error(String(result.error))
  }
}

function mergeTopicMutations(mutations: OfflineMutation[]): Array<{ topic_id: string, gate_passed: boolean, last_seen_at: string | null }> {
  const states = new Map<string, { topic_id: string, gate_passed: boolean, last_seen_at: string | null }>()

  for (const mutation of mutations) {
    if (!isTopicVisit(mutation) && !isGatePassed(mutation)) continue
    const topicId = mutation.payload.topic_id
    const existing = states.get(topicId)
    const lastSeenAt = isTopicVisit(mutation)
      ? mutation.payload.last_seen_at
      : mutation.payload.last_seen_at ?? null
    const latestSeen = !existing || !existing.last_seen_at || (lastSeenAt && lastSeenAt > existing.last_seen_at)
      ? lastSeenAt
      : existing.last_seen_at

    states.set(topicId, {
      topic_id: topicId,
      gate_passed: Boolean(existing?.gate_passed) || (isGatePassed(mutation) && mutation.payload.passed),
      last_seen_at: latestSeen,
    })
  }

  return [...states.values()]
}

function mergeBookmarkMutations(mutations: OfflineMutation[]): BookmarkState[] {
  const bookmarks = new Map<string, BookmarkState>()
  for (const mutation of mutations) {
    if (!isBookmark(mutation)) continue
    const next: BookmarkState = {
      content_id: mutation.payload.content_id,
      bookmarked: mutation.payload.bookmarked,
      updated_at: mutation.payload.updated_at,
      event_id: mutation.id,
    }
    const current = bookmarks.get(next.content_id)
    bookmarks.set(next.content_id, current ? latestByTimestamp(current, next) : next)
  }
  return [...bookmarks.values()]
}

/** Coalesce note mutations by note ID - only the latest version per note is synced. */
function mergeNoteMutations(mutations: OfflineMutation[]): Array<{
  id: string
  note_id: string
  section_id: string
  section_label: string
  anchor_text?: string
  body: string
  is_important: boolean
  is_doubt: boolean
  deleted: boolean
  client_updated_at: string
  event_id: string
}> {
  const notes = new Map<string, {
    id: string
    note_id: string
    section_id: string
    section_label: string
    anchor_text?: string
    body: string
    is_important: boolean
    is_doubt: boolean
    deleted: boolean
    client_updated_at: string
    event_id: string
  }>()

  for (const mutation of mutations) {
    if (!isNoteUpsert(mutation)) continue
    const next = {
      id: mutation.payload.note.id,
      note_id: mutation.payload.note.note_id,
      section_id: mutation.payload.note.section_id,
      section_label: mutation.payload.note.section_label,
      anchor_text: mutation.payload.note.anchor_text,
      body: mutation.payload.note.body,
      is_important: mutation.payload.note.is_important,
      is_doubt: mutation.payload.note.is_doubt,
      deleted: mutation.payload.note.deleted,
      client_updated_at: mutation.payload.updated_at,
      event_id: mutation.id,
    }
    const current = notes.get(next.id)
    if (!current) {
      notes.set(next.id, next)
    } else {
      // LWW: later timestamp wins, event_id breaks ties
      const cmp = next.client_updated_at.localeCompare(current.client_updated_at)
      if (cmp > 0 || (cmp === 0 && next.event_id > current.event_id)) {
        notes.set(next.id, next)
      }
    }
  }
  return [...notes.values()]
}

/** Dedup improvement items by ID - each item is fire-and-forget. */
function collectImprovementMutations(mutations: OfflineMutation[]): Array<{
  id: string
  note_id: string
  section_id?: string
  section_label?: string
  item_type: string
  reference_url?: string
  description: string
  client_created_at: string
}> {
  const items = new Map<string, {
    id: string
    note_id: string
    section_id?: string
    section_label?: string
    item_type: string
    reference_url?: string
    description: string
    client_created_at: string
  }>()

  for (const mutation of mutations) {
    if (!isImprovementCreate(mutation)) continue
    const item = mutation.payload.item
    if (!items.has(item.id)) {
      items.set(item.id, {
        id: item.id,
        note_id: item.note_id,
        section_id: item.section_id,
        section_label: item.section_label,
        item_type: item.item_type,
        reference_url: item.reference_url,
        description: item.description,
        client_created_at: mutation.payload.created_at,
      })
    }
  }
  return [...items.values()]
}

/**
 * Supabase transport for the schema in server/database/offline_sync_schema.sql.
 * Every write is idempotent: append-only review events use INSERT ... DO
 * NOTHING through RPCs, while topic and bookmark mutations use merge RPCs.
 */
export function createSupabaseOfflineSyncAdapter(supabase: SupabaseClient<any>): OfflineSyncAdapter {
  return {
    async sync(userId: string, mutations: OfflineMutation[]): Promise<{ syncedIds: string[] }> {
      const reviews = mutations.filter(isFsrsReview)
      if (reviews.length > 0) {
        const seeds = new Map<string, FSRSCardSeed>()
        for (const review of reviews) seeds.set(review.payload.card_id, review.payload.card_seed)

        const seedResult = await supabase.rpc('insert_user_review_card_seeds', {
          p_seeds: [...seeds.values()].map((seed) => ({
            card_id: seed.card_id,
            initial_card: seed.initial_card,
            created_at: seed.created_at,
          })),
        })
        assertSupabaseResult(seedResult)

        const logResult = await supabase.rpc('insert_user_review_logs', {
          p_logs: reviews.map((event) => ({
            id: event.id,
            card_id: event.payload.card_id,
            rating: event.payload.rating,
            state: event.payload.state,
            elapsed_days: event.payload.elapsed_days,
            review_time: event.payload.review_time,
            client_created_at: event.client_timestamp,
          })),
        })
        assertSupabaseResult(logResult)
      }

      const topicStates = mergeTopicMutations(mutations)
      if (topicStates.length > 0) {
        const topicResult = await supabase.rpc('merge_user_topic_states', { p_states: topicStates })
        assertSupabaseResult(topicResult)
      }

      const bookmarks = mergeBookmarkMutations(mutations)
      if (bookmarks.length > 0) {
        const bookmarkResult = await supabase.rpc('merge_user_bookmarks', { p_bookmarks: bookmarks })
        assertSupabaseResult(bookmarkResult)
      }

      const notes = mergeNoteMutations(mutations)
      if (notes.length > 0) {
        const noteResult = await supabase.rpc('merge_user_notes', { p_notes: notes })
        assertSupabaseResult(noteResult)
      }

      const improvements = collectImprovementMutations(mutations)
      if (improvements.length > 0) {
        const improvementResult = await supabase.rpc('insert_content_improvement_items', { p_items: improvements })
        assertSupabaseResult(improvementResult)
      }

      return { syncedIds: mutations.map((mutation) => mutation.id) }
    },
  }
}
