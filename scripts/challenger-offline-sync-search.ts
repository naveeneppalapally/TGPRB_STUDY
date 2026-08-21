/**
 * Challenger 2: Adversarial Stress Test Suite for Offline Sync Coalescing, LWW Conflict Resolution & Multi-Field Search
 * 
 * Run with: npx tsx scripts/challenger-offline-sync-search.ts
 */

import assert from 'node:assert/strict'
import type { PersonalNote, SectionContext, NoteFilterMode, ContentImprovementItem } from '../types/annotations'
import {
  createOfflineSyncEngine,
  InMemoryMutationStore,
  type OfflineMutation,
  type NoteUpsertMutation,
  type ImprovementCreateMutation,
} from '../composables/useOfflineSync'

// ---------------------------------------------------------------------------
// Sandboxed Test Helpers
// ---------------------------------------------------------------------------

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures: Array<{ name: string; error: any }> = []

async function runEmpiricalTest(name: string, fn: () => void | Promise<void>) {
  totalTests++
  const start = performance.now()
  try {
    await fn()
    passedTests++
    const dur = (performance.now() - start).toFixed(1)
    console.log(`  [PASS] ${name} (${dur}ms)`)
  } catch (err: any) {
    failedTests++
    failures.push({ name, error: err })
    console.error(`  [FAIL] ${name}`)
    console.error(`         ${err?.message || err}`)
  }
}

// ---------------------------------------------------------------------------
// 7 Topics Definition (Matching pages/my-notes.vue & pages/notes/**)
// ---------------------------------------------------------------------------
const ACTIVE_TOPIC_REGISTRY: Record<string, { title: string; section: string; route: string }> = {
  'NOTE-GEO-DRAINAGE': {
    title: 'Drainage System of India',
    section: 'Geography',
    route: '/notes/geography/drainage-system-of-india',
  },
  'NOTE-GEO-IRRIGATION': {
    title: 'Irrigation in India & Telangana',
    section: 'Geography',
    route: '/notes/geography/irrigation-in-india',
  },
  'NOTE-GEO-MOUNTAINS': {
    title: 'Mountains, Ranges & Passes of India',
    section: 'Geography',
    route: '/notes/geography/mountains-in-india',
  },
  'NOTE-GEO-DAMS': {
    title: 'Dams, Reservoirs & Multipurpose Projects of India',
    section: 'Geography',
    route: '/notes/geography/dams-in-india',
  },
  'NOTE-GEO-FORESTS': {
    title: 'Forests, Natural Vegetation & Protected Areas of India',
    section: 'Geography',
    route: '/notes/geography/forests-in-india',
  },
  'NOTE-POL-UNION-EXEC': {
    title: 'Union Executive & Parliament',
    section: 'Polity',
    route: '/notes/polity/union-executive-and-legislature',
  },
  'NOTE-TEL-MOVEMENT': {
    title: 'Telangana Armed Struggle & Statehood Movement',
    section: 'Telangana',
    route: '/notes/telangana/telangana-statehood-movement',
  },
}

// Coalescing logic from composables/useOfflineSync.ts
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
    if (mutation.type !== 'note_upsert') continue
    const payload = (mutation as NoteUpsertMutation).payload
    const next = {
      id: payload.note.id,
      note_id: payload.note.note_id,
      section_id: payload.note.section_id,
      section_label: payload.note.section_label,
      anchor_text: payload.note.anchor_text,
      body: payload.note.body,
      is_important: payload.note.is_important,
      is_doubt: payload.note.is_doubt,
      deleted: payload.note.deleted,
      client_updated_at: payload.updated_at,
      event_id: mutation.id,
    }
    const current = notes.get(next.id)
    if (!current) {
      notes.set(next.id, next)
    } else {
      const cmp = next.client_updated_at.localeCompare(current.client_updated_at)
      if (cmp > 0 || (cmp === 0 && next.event_id > current.event_id)) {
        notes.set(next.id, next)
      }
    }
  }
  return [...notes.values()]
}

// LWW Conflict Resolution logic from composables/usePersonalNotes.ts
function resolveConflict(l: PersonalNote, c: any): PersonalNote {
  const lTime = new Date(l.client_updated_at).getTime()
  const cTime = new Date(c.client_updated_at).getTime()
  if (lTime > cTime) return l
  if (lTime < cTime) return c as PersonalNote
  return (l.last_event_id || '') > (c.last_event_id || '') ? l : (c as PersonalNote)
}

// Search & Filter simulation from pages/my-notes.vue
function simulateMyNotesFilter(
  notes: PersonalNote[],
  searchQuery: string,
  filterMode: NoteFilterMode
): { groups: Array<{ noteId: string; noteTitle: string; examSection: string; notes: PersonalNote[] }>; totalCount: number; importantCount: number; doubtCount: number } {
  const totalCount = notes.filter(n => !n.deleted).length
  const importantCount = notes.filter(n => !n.deleted && n.is_important).length
  const doubtCount = notes.filter(n => !n.deleted && n.is_doubt).length

  let filtered: PersonalNote[]
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim()
    filtered = notes.filter(n => {
      if (n.deleted) return false
      const meta = ACTIVE_TOPIC_REGISTRY[n.note_id]
      const bodyMatch = Boolean(n.body && n.body.toLowerCase().includes(q))
      const anchorMatch = Boolean(n.anchor_text && n.anchor_text.toLowerCase().includes(q))
      const sectionMatch = Boolean(n.section_label && n.section_label.toLowerCase().includes(q))
      const titleMatch = Boolean(meta && meta.title.toLowerCase().includes(q))
      const examSectionMatch = Boolean(meta && meta.section.toLowerCase().includes(q))
      return bodyMatch || anchorMatch || sectionMatch || titleMatch || examSectionMatch
    })
  } else {
    filtered = notes.filter(n => !n.deleted)
  }

  if (filterMode === 'important') {
    filtered = filtered.filter(n => n.is_important)
  } else if (filterMode === 'doubt') {
    filtered = filtered.filter(n => n.is_doubt)
  }

  const groups = new Map<string, { noteId: string; noteTitle: string; examSection: string; route: string; notes: PersonalNote[] }>()
  for (const note of filtered) {
    let group = groups.get(note.note_id)
    if (!group) {
      const meta = ACTIVE_TOPIC_REGISTRY[note.note_id] || { title: note.note_id, section: 'General', route: '#' }
      group = {
        noteId: note.note_id,
        noteTitle: meta.title,
        examSection: meta.section,
        route: meta.route,
        notes: [],
      }
      groups.set(note.note_id, group)
    }
    group.notes.push(note)
  }

  const sortedGroups = Array.from(groups.values()).sort((a, b) => {
    const aLatest = Math.max(...a.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
    const bLatest = Math.max(...b.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
    return bLatest - aLatest
  })

  return { groups: sortedGroups, totalCount, importantCount, doubtCount }
}

// ---------------------------------------------------------------------------
// TEST RUNNER
// ---------------------------------------------------------------------------

async function main() {
  console.log('=================================================================')
  console.log('CHALLENGER 2: ADVERSARIAL STRESS & EMPIRICAL VERIFICATION SUITE')
  console.log('=================================================================\n')

  // -------------------------------------------------------------------------
  // SECTION A: OFFLINE SYNC MUTATION COALESCING ADVERSARIAL TESTS
  // -------------------------------------------------------------------------
  console.log('--- SECTION A: Mutation Coalescing Stress Tests ---')

  await runEmpiricalTest('A.1: 500 rapid mutations across 50 distinct notes coalesce to exactly 50 latest items', () => {
    const mutations: OfflineMutation[] = []
    const noteIds = Array.from({ length: 50 }, (_, i) => `note-uuid-${i}`)

    // Create 10 revisions per note with increasing timestamps
    for (let r = 0; r < 10; r++) {
      const timestamp = new Date(Date.UTC(2026, 7, 21, 10, r, 0)).toISOString()
      for (let i = 0; i < 50; i++) {
        const id = noteIds[i]
        const mutation: NoteUpsertMutation = {
          id: `evt-${r}-${i.toString().padStart(3, '0')}`,
          type: 'note_upsert',
          payload: {
            note: {
              id,
              note_id: 'NOTE-GEO-DRAINAGE',
              section_id: `sec-${i % 5}`,
              section_label: `Section ${i % 5}`,
              anchor_text: `Anchor ${r}`,
              body: `Body revision ${r} for note ${i}`,
              is_important: r % 2 === 1,
              is_doubt: r % 3 === 1,
              deleted: r === 9 && i % 4 === 0, // Some deleted on final revision
            },
            updated_at: timestamp,
          },
          client_timestamp: timestamp,
          synced: false,
          retry_count: 0,
          next_retry_at: null,
        }
        mutations.push(mutation)
      }
    }

    assert.equal(mutations.length, 500)
    const coalesced = mergeNoteMutations(mutations)
    assert.equal(coalesced.length, 50)

    for (let i = 0; i < 50; i++) {
      const note = coalesced.find(n => n.id === `note-uuid-${i}`)!
      assert.ok(note, `Note ${i} must exist in coalesced set`)
      assert.equal(note.body, `Body revision 9 for note ${i}`)
      assert.equal(note.is_important, true) // 9 % 2 === 1
      assert.equal(note.is_doubt, false)    // 9 % 3 === 0
      assert.equal(note.deleted, i % 4 === 0)
    }
  })

  await runEmpiricalTest('A.2: Coalescing invariance under random permutation of mutation stream', () => {
    const mutations: OfflineMutation[] = []
    const noteId = 'target-note-order-test'

    for (let r = 1; r <= 20; r++) {
      const ts = new Date(Date.UTC(2026, 7, 21, 12, r, 0)).toISOString()
      mutations.push({
        id: `evt-order-${r.toString().padStart(2, '0')}`,
        type: 'note_upsert',
        payload: {
          note: {
            id: noteId,
            note_id: 'NOTE-GEO-MOUNTAINS',
            section_id: 'himalayas',
            section_label: 'Himalayas',
            body: `Revision #${r}`,
            is_important: r === 20,
            is_doubt: false,
            deleted: false,
          },
          updated_at: ts,
        },
        client_timestamp: ts,
        synced: false,
        retry_count: 0,
        next_retry_at: null,
      })
    }

    // Baseline: strictly in-order
    const baseline = mergeNoteMutations(mutations)
    assert.equal(baseline.length, 1)
    assert.equal(baseline[0].body, 'Revision #20')
    assert.equal(baseline[0].is_important, true)

    // Permute 20 times and assert all permutations resolve to Revision #20
    for (let p = 0; p < 20; p++) {
      const shuffled = [...mutations].sort(() => Math.random() - 0.5)
      const result = mergeNoteMutations(shuffled)
      assert.equal(result.length, 1)
      assert.equal(result[0].body, 'Revision #20', `Permutation ${p} failed LWW coalescing`)
      assert.equal(result[0].is_important, true)
    }
  })

  await runEmpiricalTest('A.3: Edit -> Delete -> Resurrect -> Re-delete lifecycle coalescing', () => {
    const noteId = 'lifecycle-note-1'
    const mutations: OfflineMutation[] = [
      {
        id: 'evt-1',
        type: 'note_upsert',
        payload: {
          note: { id: noteId, note_id: 'NOTE-GEO-DAMS', section_id: 'srisailam', section_label: 'Srisailam', body: 'v1 Created', is_important: false, is_doubt: false, deleted: false },
          updated_at: '2026-08-21T10:00:00.000Z',
        },
        client_timestamp: '2026-08-21T10:00:00.000Z',
        synced: false, retry_count: 0, next_retry_at: null,
      },
      {
        id: 'evt-2',
        type: 'note_upsert',
        payload: {
          note: { id: noteId, note_id: 'NOTE-GEO-DAMS', section_id: 'srisailam', section_label: 'Srisailam', body: 'v1 Created', is_important: false, is_doubt: false, deleted: true },
          updated_at: '2026-08-21T10:05:00.000Z',
        },
        client_timestamp: '2026-08-21T10:05:00.000Z',
        synced: false, retry_count: 0, next_retry_at: null,
      },
      {
        id: 'evt-3',
        type: 'note_upsert',
        payload: {
          note: { id: noteId, note_id: 'NOTE-GEO-DAMS', section_id: 'srisailam', section_label: 'Srisailam', body: 'v3 Resurrected Note', is_important: true, is_doubt: false, deleted: false },
          updated_at: '2026-08-21T10:10:00.000Z',
        },
        client_timestamp: '2026-08-21T10:10:00.000Z',
        synced: false, retry_count: 0, next_retry_at: null,
      },
      {
        id: 'evt-4',
        type: 'note_upsert',
        payload: {
          note: { id: noteId, note_id: 'NOTE-GEO-DAMS', section_id: 'srisailam', section_label: 'Srisailam', body: 'v3 Resurrected Note', is_important: true, is_doubt: false, deleted: true },
          updated_at: '2026-08-21T10:15:00.000Z',
        },
        client_timestamp: '2026-08-21T10:15:00.000Z',
        synced: false, retry_count: 0, next_retry_at: null,
      },
    ]

    const result = mergeNoteMutations(mutations)
    assert.equal(result.length, 1)
    assert.equal(result[0].deleted, true)
    assert.equal(result[0].client_updated_at, '2026-08-21T10:15:00.000Z')
    assert.equal(result[0].body, 'v3 Resurrected Note')
  })

  await runEmpiricalTest('A.4: Multi-batch overflow (135 mutations with batch size 50)', async () => {
    let syncedMutationIds: string[] = []
    let callCount = 0

    const store = new InMemoryMutationStore()
    const engine = createOfflineSyncEngine({
      getUserId: () => 'test-user-batch',
      store,
      batchSize: 50,
      isOnline: () => true,
      adapter: {
        async sync(userId, batch) {
          callCount++
          syncedMutationIds.push(...batch.map(m => m.id))
          return { syncedIds: batch.map(m => m.id) }
        },
      },
    })

    await engine.initialize()

    // Enqueue 135 mutations
    for (let i = 0; i < 135; i++) {
      engine.queueNoteUpsert({
        note: {
          id: `note-${i}`,
          note_id: 'NOTE-GEO-DRAINAGE',
          section_id: 'sec',
          section_label: 'Sec',
          body: `Body ${i}`,
          is_important: false,
          is_doubt: false,
          deleted: false,
        },
        updated_at: new Date().toISOString(),
      })
    }

    assert.equal(engine.pendingCount.value, 135)
    const res = await engine.flush()

    assert.equal(res.status, 'synced')
    assert.equal(res.syncedCount, 135)
    assert.equal(engine.pendingCount.value, 0)
    // 135 items with batch size 50 -> 3 batches (50, 50, 35)
    assert.equal(callCount, 3)
    assert.equal(syncedMutationIds.length, 135)
  })

  // -------------------------------------------------------------------------
  // SECTION B: LWW CONFLICT RESOLUTION EMPIRICAL TESTS
  // -------------------------------------------------------------------------
  console.log('\n--- SECTION B: LWW Conflict Resolution Edge Cases ---')

  await runEmpiricalTest('B.1: Timezone offset normalization: +05:30 vs UTC Z resolution', () => {
    // 2026-08-21T15:30:00+05:30 = 2026-08-21T10:00:00Z
    // 2026-08-21T10:05:00Z is 5 minutes LATER in real time!
    const localNote: PersonalNote = {
      id: 'tz-note',
      note_id: 'NOTE-POL-UNION-EXEC',
      section_id: 'parliament',
      section_label: 'Parliament',
      body: 'Local note with IST +05:30 (15:30 IST = 10:00 UTC)',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T15:30:00.000+05:30',
      last_event_id: 'evt-local-001',
      created_at: '2026-08-21T10:00:00.000Z',
    }

    const cloudNote = {
      id: 'tz-note',
      note_id: 'NOTE-POL-UNION-EXEC',
      section_id: 'parliament',
      section_label: 'Parliament',
      body: 'Cloud note with UTC Z (10:05 UTC)',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:05:00.000Z',
      last_event_id: 'evt-cloud-001',
      created_at: '2026-08-21T10:00:00.000Z',
    }

    const resolved = resolveConflict(localNote, cloudNote)
    assert.equal(resolved.body, 'Cloud note with UTC Z (10:05 UTC)')
    assert.equal(resolved.is_important, true)
  })

  await runEmpiricalTest('B.2: Millisecond-level tie with last_event_id string comparison', () => {
    const identicalTime = '2026-08-21T12:00:00.500Z'

    const localNote: PersonalNote = {
      id: 'tie-note',
      note_id: 'NOTE-TEL-MOVEMENT',
      section_id: '1969',
      section_label: '1969 Agitation',
      body: 'Local tie body',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: identicalTime,
      last_event_id: 'alpha-event-id-999',
      created_at: identicalTime,
    }

    const cloudNote = {
      id: 'tie-note',
      note_id: 'NOTE-TEL-MOVEMENT',
      section_id: '1969',
      section_label: '1969 Agitation',
      body: 'Cloud tie body (omega wins)',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: identicalTime,
      last_event_id: 'omega-event-id-001',
      created_at: identicalTime,
    }

    const resolved = resolveConflict(localNote, cloudNote)
    // 'omega...' > 'alpha...' -> cloud wins
    assert.equal(resolved.body, 'Cloud tie body (omega wins)')
    assert.equal(resolved.last_event_id, 'omega-event-id-001')
  })

  await runEmpiricalTest('B.3: Tombstone preservation under newer cloud delete vs older local edit', () => {
    const localNote: PersonalNote = {
      id: 'tombstone-test',
      note_id: 'NOTE-GEO-FORESTS',
      section_id: 'sacred-groves',
      section_label: 'Sacred Groves',
      body: 'Older local edit',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T08:00:00.000Z',
      last_event_id: 'evt-1',
      created_at: '2026-08-21T07:00:00.000Z',
    }

    const cloudNote = {
      id: 'tombstone-test',
      note_id: 'NOTE-GEO-FORESTS',
      section_id: 'sacred-groves',
      section_label: 'Sacred Groves',
      body: 'Older local edit',
      is_important: true,
      is_doubt: false,
      deleted: true, // Newer cloud tombstone
      client_updated_at: '2026-08-21T09:00:00.000Z',
      last_event_id: 'evt-2',
      created_at: '2026-08-21T07:00:00.000Z',
    }

    const resolved = resolveConflict(localNote, cloudNote)
    assert.equal(resolved.deleted, true)
    assert.equal(resolved.client_updated_at, '2026-08-21T09:00:00.000Z')
  })

  // -------------------------------------------------------------------------
  // SECTION C: MULTI-FIELD SEARCH & FILTER TABS ACROSS ALL 7 TOPICS
  // -------------------------------------------------------------------------
  console.log('\n--- SECTION C: Multi-Field Search & Filter Tabs Across 7 Topics ---')

  const testNotesCorpus: PersonalNote[] = [
    // 1. NOTE-GEO-DRAINAGE (Geography)
    {
      id: 'note-drainage-1',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'peninsular',
      section_label: 'Peninsular Drainage System',
      anchor_text: 'Narmada flows in a rift valley between Vindhya and Satpura ranges',
      body: 'Key distinction: West flowing rivers do not form deltas, they form estuaries.',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:00:00.000Z',
      last_event_id: 'e1',
      created_at: '2026-08-21T10:00:00.000Z',
    },
    // 2. NOTE-GEO-IRRIGATION (Geography)
    {
      id: 'note-irrigation-1',
      note_id: 'NOTE-GEO-IRRIGATION',
      section_id: 'schemes',
      section_label: 'Mission Kakatiya & Minor Irrigation',
      anchor_text: 'Restoration of 46,531 chain tanks across Telangana',
      body: 'NABARD provided financial assistance under RIDF for tank desiltation.',
      is_important: false,
      is_doubt: true,
      deleted: false,
      client_updated_at: '2026-08-21T11:00:00.000Z',
      last_event_id: 'e2',
      created_at: '2026-08-21T11:00:00.000Z',
    },
    // 3. NOTE-GEO-MOUNTAINS (Geography)
    {
      id: 'note-mountains-1',
      note_id: 'NOTE-GEO-MOUNTAINS',
      section_id: 'passes',
      section_label: 'Himalayan Passes & Connectivity',
      anchor_text: 'Lipulekh Pass trijunction of India, Nepal and China in Uttarakhand',
      body: 'Kailash Mansarovar Yatra route goes via Lipulekh Pass.',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T12:00:00.000Z',
      last_event_id: 'e3',
      created_at: '2026-08-21T12:00:00.000Z',
    },
    // 4. NOTE-GEO-DAMS (Geography)
    {
      id: 'note-dams-1',
      note_id: 'NOTE-GEO-DAMS',
      section_id: 'kaleshwaram',
      section_label: 'KLIP Barrages & Pump Houses',
      anchor_text: 'Medigadda, Annaram and Sundilla barrages on Godavari',
      body: 'Check maximum flood discharge capacity at Laxmi Barrage (Medigadda).',
      is_important: false,
      is_doubt: true,
      deleted: false,
      client_updated_at: '2026-08-21T13:00:00.000Z',
      last_event_id: 'e4',
      created_at: '2026-08-21T13:00:00.000Z',
    },
    // 5. NOTE-GEO-FORESTS (Geography)
    {
      id: 'note-forests-1',
      note_id: 'NOTE-GEO-FORESTS',
      section_id: 'national-parks',
      section_label: 'Kasu Brahmananda Reddy (KBR) National Park',
      anchor_text: 'Urban national park situated in Jubilee Hills, Hyderabad',
      body: 'Area is approx 1.42 sq km, declared national park in 1998.',
      is_important: true,
      is_doubt: true, // Both imp and doubt
      deleted: false,
      client_updated_at: '2026-08-21T14:00:00.000Z',
      last_event_id: 'e5',
      created_at: '2026-08-21T14:00:00.000Z',
    },
    // 6. NOTE-POL-UNION-EXEC (Polity)
    {
      id: 'note-polity-1',
      note_id: 'NOTE-POL-UNION-EXEC',
      section_id: 'ordinance',
      section_label: 'Ordinance Making Power of President (Article 123)',
      anchor_text: 'Ordinance ceases to operate 6 weeks from reassembly of Parliament',
      body: 'Can only be promulgated when at least one House is NOT in session (RC Cooper case).',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T15:00:00.000Z',
      last_event_id: 'e6',
      created_at: '2026-08-21T15:00:00.000Z',
    },
    // 7. NOTE-TEL-MOVEMENT (Telangana)
    {
      id: 'note-telangana-1',
      note_id: 'NOTE-TEL-MOVEMENT',
      section_id: 'hyderabad-merger',
      section_label: 'Operation Polo & Police Action 1948',
      anchor_text: 'General J.N. Chaudhuri led the military operation on 13-17 September 1948',
      body: 'Mir Osman Ali Khan announced surrender on Hyderabad Radio on 17 Sep 1948.',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T16:00:00.000Z',
      last_event_id: 'e7',
      created_at: '2026-08-21T16:00:00.000Z',
    },
    // Deleted note (should never match anywhere)
    {
      id: 'note-deleted-1',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'tombstone',
      section_label: 'Deleted Ganga Note',
      anchor_text: 'Deleted anchor',
      body: 'Deleted body that matches everything secret keyword xyz',
      is_important: true,
      is_doubt: true,
      deleted: true,
      client_updated_at: '2026-08-21T17:00:00.000Z',
      last_event_id: 'e8',
      created_at: '2026-08-21T17:00:00.000Z',
    },
  ]

  await runEmpiricalTest('C.1: All 7 topics present and grouped with correct metadata and counts', () => {
    const result = simulateMyNotesFilter(testNotesCorpus, '', 'all')
    assert.equal(result.totalCount, 7) // 8 total minus 1 deleted
    assert.equal(result.importantCount, 4) // drainage, mountains, forests, polity
    assert.equal(result.doubtCount, 3)     // irrigation, dams, forests
    assert.equal(result.groups.length, 7)

    const topicIds = result.groups.map(g => g.noteId)
    assert.ok(topicIds.includes('NOTE-GEO-DRAINAGE'))
    assert.ok(topicIds.includes('NOTE-GEO-IRRIGATION'))
    assert.ok(topicIds.includes('NOTE-GEO-MOUNTAINS'))
    assert.ok(topicIds.includes('NOTE-GEO-DAMS'))
    assert.ok(topicIds.includes('NOTE-GEO-FORESTS'))
    assert.ok(topicIds.includes('NOTE-POL-UNION-EXEC'))
    assert.ok(topicIds.includes('NOTE-TEL-MOVEMENT'))
  })

  await runEmpiricalTest('C.2: Multi-field search across body, anchor_text, section_label, title, examSection', () => {
    // 1. Search by body term
    const r1 = simulateMyNotesFilter(testNotesCorpus, 'estuaries', 'all')
    assert.equal(r1.groups.length, 1)
    assert.equal(r1.groups[0].noteId, 'NOTE-GEO-DRAINAGE')

    // 2. Search by anchor_text term
    const r2 = simulateMyNotesFilter(testNotesCorpus, 'Lipulekh', 'all')
    assert.equal(r2.groups.length, 1)
    assert.equal(r2.groups[0].noteId, 'NOTE-GEO-MOUNTAINS')

    // 3. Search by section_label term
    const r3 = simulateMyNotesFilter(testNotesCorpus, 'Mission Kakatiya', 'all')
    assert.equal(r3.groups.length, 1)
    assert.equal(r3.groups[0].noteId, 'NOTE-GEO-IRRIGATION')

    // 4. Search by topic title term ("Executive")
    const r4 = simulateMyNotesFilter(testNotesCorpus, 'Executive', 'all')
    assert.equal(r4.groups.length, 1)
    assert.equal(r4.groups[0].noteId, 'NOTE-POL-UNION-EXEC')

    // 5. Search by subject/examSection ("Geography" matches 5 topics)
    const r5 = simulateMyNotesFilter(testNotesCorpus, 'Geography', 'all')
    assert.equal(r5.groups.length, 5)

    // 6. Search by deleted note body keyword returns 0 results
    const r6 = simulateMyNotesFilter(testNotesCorpus, 'secret keyword xyz', 'all')
    assert.equal(r6.groups.length, 0)
  })

  await runEmpiricalTest('C.3: Filter tabs: "important" tab strictly returns ⭐ notes', () => {
    const r = simulateMyNotesFilter(testNotesCorpus, '', 'important')
    assert.equal(r.groups.length, 4)
    const ids = r.groups.map(g => g.noteId)
    assert.deepEqual(ids.sort(), ['NOTE-GEO-DRAINAGE', 'NOTE-GEO-FORESTS', 'NOTE-GEO-MOUNTAINS', 'NOTE-POL-UNION-EXEC'].sort())
  })

  await runEmpiricalTest('C.4: Filter tabs: "doubt" tab strictly returns ❓ notes', () => {
    const r = simulateMyNotesFilter(testNotesCorpus, '', 'doubt')
    assert.equal(r.groups.length, 3)
    const ids = r.groups.map(g => g.noteId)
    assert.deepEqual(ids.sort(), ['NOTE-GEO-DAMS', 'NOTE-GEO-FORESTS', 'NOTE-GEO-IRRIGATION'].sort())
  })

  await runEmpiricalTest('C.5: Intersection of Search + Filter Tab (e.g. Search "Geography" + Doubt Tab)', () => {
    const r = simulateMyNotesFilter(testNotesCorpus, 'Geography', 'doubt')
    // Out of 5 Geography notes, 3 are doubts (irrigation, dams, forests)
    assert.equal(r.groups.length, 3)
    const ids = r.groups.map(g => g.noteId)
    assert.ok(ids.includes('NOTE-GEO-IRRIGATION'))
    assert.ok(ids.includes('NOTE-GEO-DAMS'))
    assert.ok(ids.includes('NOTE-GEO-FORESTS'))
    assert.ok(!ids.includes('NOTE-GEO-DRAINAGE')) // Drainage is important, not doubt
  })

  await runEmpiricalTest('C.6: Sort order: Groups sorted descending by latest note update timestamp', () => {
    const r = simulateMyNotesFilter(testNotesCorpus, '', 'all')
    // testNotesCorpus timestamps:
    // telangana: 16:00
    // polity: 15:00
    // forests: 14:00
    // dams: 13:00
    // mountains: 12:00
    // irrigation: 11:00
    // drainage: 10:00
    const groupIdsInOrder = r.groups.map(g => g.noteId)
    assert.deepEqual(groupIdsInOrder, [
      'NOTE-TEL-MOVEMENT',
      'NOTE-POL-UNION-EXEC',
      'NOTE-GEO-FORESTS',
      'NOTE-GEO-DAMS',
      'NOTE-GEO-MOUNTAINS',
      'NOTE-GEO-IRRIGATION',
      'NOTE-GEO-DRAINAGE',
    ])
  })

  // -------------------------------------------------------------------------
  // SUMMARY
  // -------------------------------------------------------------------------
  console.log('\n=================================================================')
  console.log('ADVERSARIAL STRESS TEST SUMMARY')
  console.log(`Total Empirical Tests: ${totalTests}`)
  console.log(`Passed:                ${passedTests}`)
  console.log(`Failed:                ${failedTests}`)
  console.log('=================================================================\n')

  if (failedTests > 0) {
    process.exit(1)
  } else {
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal execution error:', err)
  process.exit(1)
})
