import assert from 'node:assert/strict'
import { createEmptyCard } from 'ts-fsrs'
import {
  createOfflineSyncEngine,
  InMemoryMutationStore,
  mergeBookmarkState,
  mergeTopicState,
  reconcileFSRSReviewLog,
  serializeFSRSCard,
  type FSRSCardSeed,
  type FSRSReviewMutation,
  type OfflineMutation,
} from '../composables/useOfflineSync'

function makeReviewEvent(
  id: string,
  seed: FSRSCardSeed,
  reviewTime: string,
  clientTimestamp: string,
): FSRSReviewMutation {
  return {
    id,
    type: 'fsrs_review',
    payload: {
      card_id: seed.card_id,
      rating: 3,
      state: 2,
      elapsed_days: 1,
      review_time: reviewTime,
      card_seed: seed,
    },
    client_timestamp: clientTimestamp,
    synced: false,
    retry_count: 0,
    next_retry_at: null,
  }
}

async function testOfflineBufferingAndReconnection(): Promise<void> {
  const previousWindow = Object.getOwnPropertyDescriptor(globalThis, 'window')
  const browserWindow = new EventTarget()
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    writable: true,
    value: browserWindow,
  })

  const store = new InMemoryMutationStore()
  const received: OfflineMutation[][] = []
  let online = false
  const engine = createOfflineSyncEngine({
    getUserId: () => 'f9d4084d-575f-4e5e-a0fb-7b31f8ce14d5',
    store,
    isOnline: () => online,
    batchSize: 2,
    now: () => new Date('2026-08-12T09:00:00.000Z'),
    adapter: {
      async sync(_userId, mutations) {
        received.push(mutations)
        return { syncedIds: mutations.map((mutation) => mutation.id) }
      },
    },
  })

  try {
    engine.start()
    engine.queueTopicVisit({ topic_id: 'NOTE-GEO-DRAINAGE', last_seen_at: '2026-08-12T08:55:00.000Z' })
    engine.queueGatePassed({ topic_id: 'NOTE-GEO-DRAINAGE', passed: true })
    engine.queueBookmark({ content_id: 'PYQ-2023-101', bookmarked: true, updated_at: '2026-08-12T08:56:00.000Z' })

    assert.equal(engine.pendingCount.value, 3)
    const offlineResult = await engine.flush()
    assert.equal(offlineResult.status, 'offline')
    assert.equal((await store.listAllPending()).length, 3)
    assert.equal(received.length, 0)

    online = true
    browserWindow.dispatchEvent(new Event('online'))
    for (let attempt = 0; attempt < 20 && received.length < 2; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 0))
    }

    assert.equal(received.length, 2)
    assert.deepEqual(received.map((batch) => batch.length), [2, 1])
    assert.equal((await store.listAllPending()).length, 0)
    assert.equal(engine.pendingCount.value, 0)
  } finally {
    engine.stop()
    if (previousWindow) {
      Object.defineProperty(globalThis, 'window', previousWindow)
    } else {
      Reflect.deleteProperty(globalThis, 'window')
    }
  }
}

async function testRetryBackoff(): Promise<void> {
  const store = new InMemoryMutationStore()
  let currentTime = new Date('2026-08-12T09:00:00.000Z')
  const engine = createOfflineSyncEngine({
    getUserId: () => 'f9d4084d-575f-4e5e-a0fb-7b31f8ce14d5',
    store,
    isOnline: () => true,
    random: () => 0.5,
    now: () => currentTime,
    adapter: {
      async sync() {
        throw new Error('Network unavailable')
      },
    },
  })

  engine.queueTopicVisit({ topic_id: 'NOTE-POL-CONSTITUTION', last_seen_at: '2026-08-12T09:00:00.000Z' })
  const result = await engine.flush()

  assert.equal(result.status, 'retry_scheduled')
  assert.equal(result.retryAfterMs, 1_000)
  const pending = await store.listAllPending()
  assert.equal(pending.length, 1)
  assert.equal(pending[0].retry_count, 1)
  assert.equal(pending[0].next_retry_at, '2026-08-12T09:00:01.000Z')

  currentTime = new Date('2026-08-12T09:00:01.000Z')
  const secondResult = await engine.flush()
  assert.equal(secondResult.status, 'retry_scheduled')
  assert.equal(secondResult.retryAfterMs, 2_000)
  const retried = await store.listAllPending()
  assert.equal(retried[0].retry_count, 2)
  assert.equal(retried[0].next_retry_at, '2026-08-12T09:00:03.000Z')
}

async function testMaximumBatchSize(): Promise<void> {
  const store = new InMemoryMutationStore()
  const received: OfflineMutation[][] = []
  let online = false
  const engine = createOfflineSyncEngine({
    getUserId: () => 'f9d4084d-575f-4e5e-a0fb-7b31f8ce14d5',
    store,
    isOnline: () => online,
    batchSize: 500,
    now: () => new Date('2026-08-12T10:00:00.000Z'),
    adapter: {
      async sync(_userId, mutations) {
        received.push(mutations)
        return { syncedIds: mutations.map((mutation) => mutation.id) }
      },
    },
  })

  for (let index = 0; index < 51; index++) {
    engine.queueBookmark({
      content_id: `PYQ-BATCH-${index}`,
      bookmarked: true,
      updated_at: '2026-08-12T10:00:00.000Z',
    })
  }

  online = true
  const result = await engine.flush()
  assert.equal(result.syncedCount, 51)
  assert.deepEqual(received.map((batch) => batch.length), [50, 1])
}

function testConflictResolution(): void {
  const topic = mergeTopicState(
    { topic_id: 'NOTE-TEL-GENERAL', gate_passed: false, last_seen_at: '2026-08-12T08:00:00.000Z' },
    { topic_id: 'NOTE-TEL-GENERAL', gate_passed: true, last_seen_at: '2026-08-12T08:30:00.000Z' },
  )
  assert.deepEqual(topic, {
    topic_id: 'NOTE-TEL-GENERAL',
    gate_passed: true,
    last_seen_at: '2026-08-12T08:30:00.000Z',
    updated_at: undefined,
  })

  const bookmark = mergeBookmarkState(
    {
      content_id: 'PYQ-2023-101',
      bookmarked: false,
      updated_at: '2026-08-12T08:00:00.000Z',
      event_id: '00000000-0000-4000-8000-000000000001',
    },
    {
      content_id: 'PYQ-2023-101',
      bookmarked: true,
      updated_at: '2026-08-12T08:00:00.000Z',
      event_id: '00000000-0000-4000-8000-000000000002',
    },
  )
  assert.equal(bookmark?.bookmarked, true)

  const baseCard = createEmptyCard(new Date('2026-08-01T09:00:00.000Z'))
  const seed: FSRSCardSeed = {
    card_id: '11111111-1111-4111-8111-111111111111',
    initial_card: serializeFSRSCard(baseCard),
    created_at: '2026-08-01T09:00:00.000Z',
  }
  const earlier = makeReviewEvent(
    '00000000-0000-4000-8000-000000000001',
    seed,
    '2026-08-01T09:05:00.000Z',
    '2026-08-01T09:05:01.000Z',
  )
  const later = makeReviewEvent(
    '00000000-0000-4000-8000-000000000002',
    seed,
    '2026-08-02T09:05:00.000Z',
    '2026-08-02T09:05:01.000Z',
  )

  const desktopOrder = reconcileFSRSReviewLog(seed, [later, earlier, earlier])
  const mobileOrder = reconcileFSRSReviewLog(seed, [earlier, later])
  assert.deepEqual(desktopOrder.orderedEventIds, [earlier.id, later.id])
  assert.deepEqual(desktopOrder.card, mobileOrder.card)
  assert.equal(desktopOrder.card.reps, 2)
}

await testOfflineBufferingAndReconnection()
await testRetryBackoff()
await testMaximumBatchSize()
testConflictResolution()

console.log('Offline sync tests passed.')
