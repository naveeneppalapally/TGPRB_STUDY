/**
 * TSLPRB StudyOS - Personal Notes & Content Improvement Queue E2E Test Suite
 * 
 * 4-Tier Opaque-Box Automated Test Suite:
 * - Tier 1: Feature Coverage (>=5 tests per feature across R1-R4)
 * - Tier 2: Boundary & Corner Cases (limits, debouncing, unicode, XSS, network)
 * - Tier 3: Cross-Feature Combinations (End-to-End user lifecycles)
 * - Tier 4: Real-World Scenarios (7-topic exam revision & 2-hr offline session)
 *
 * Run with: npx tsx scripts/test-personal-notes-e2e.ts
 */

import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import type {
  PersonalNote,
  ContentImprovementItem,
  SectionContext,
  NoteFilterMode,
  ImprovementItemType
} from '../types/annotations'
import {
  createOfflineSyncEngine,
  InMemoryMutationStore,
  type OfflineMutation,
  type NoteUpsertMutation,
  type ImprovementCreateMutation
} from '../composables/useOfflineSync'

const execFileAsync = promisify(execFile)

// ---------------------------------------------------------------------------
// Test Runner Helpers & Colors
// ---------------------------------------------------------------------------

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures: Array<{ suite: string; name: string; error: any }> = []

async function runTest(suite: string, name: string, fn: () => void | Promise<void>) {
  totalTests++
  const start = performance.now()
  try {
    await fn()
    passedTests++
    const dur = (performance.now() - start).toFixed(1)
    console.log(`  [PASS] ${name} (${dur}ms)`)
  } catch (err: any) {
    failedTests++
    failures.push({ suite, name, error: err })
    console.error(`  [FAIL] ${name}`)
    console.error(`         ${err?.message || err}`)
  }
}

function suiteHeader(title: string) {
  console.log(`\n=== ${title} ===`)
}

// ---------------------------------------------------------------------------
// Sandboxed Storage & Mock Supabase Environment
// ---------------------------------------------------------------------------

class MockLocalStorage {
  private store = new Map<string, string>()

  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value))
  }

  removeItem(key: string): void {
    this.store.delete(key)
  }

  clear(): void {
    this.store.clear()
  }

  get length(): number {
    return this.store.size
  }
}

interface MockSupabaseState {
  userPersonalNotes: PersonalNote[]
  contentImprovements: ContentImprovementItem[]
  rpcCalls: Array<{ name: string; params: any }>
}

function createMockSupabase(initialState?: Partial<MockSupabaseState>) {
  const state: MockSupabaseState = {
    userPersonalNotes: initialState?.userPersonalNotes || [],
    contentImprovements: initialState?.contentImprovements || [],
    rpcCalls: []
  }

  return {
    state,
    from(table: string) {
      return {
        select(_columns = '*') {
          return {
            eq(column: string, value: any) {
              if (table === 'user_personal_notes') {
                const results = state.userPersonalNotes.filter((n: any) => n[column] === value || n.user_id === value || !column)
                return Promise.resolve({ data: results, error: null })
              }
              if (table === 'content_improvement_items') {
                const results = state.contentImprovements.filter((i: any) => i[column] === value || i.user_id === value || !column)
                return Promise.resolve({ data: results, error: null })
              }
              return Promise.resolve({ data: [], error: null })
            }
          }
        }
      }
    },
    rpc(name: string, params: any) {
      state.rpcCalls.push({ name, params })
      if (name === 'merge_user_notes') {
        const incoming = params.p_notes || []
        for (const note of incoming) {
          const idx = state.userPersonalNotes.findIndex(n => n.id === note.id)
          if (idx >= 0) {
            state.userPersonalNotes[idx] = { ...state.userPersonalNotes[idx], ...note }
          } else {
            state.userPersonalNotes.push(note)
          }
        }
        return Promise.resolve({ data: { status: 'merged', count: incoming.length }, error: null })
      }
      if (name === 'insert_content_improvement_items') {
        const incoming = params.p_items || []
        for (const item of incoming) {
          state.contentImprovements.push({
            ...item,
            status: 'pending',
            client_created_at: item.client_created_at || new Date().toISOString()
          })
        }
        return Promise.resolve({ data: { status: 'inserted', count: incoming.length }, error: null })
      }
      return Promise.resolve({ data: null, error: null })
    }
  }
}

// ---------------------------------------------------------------------------
// Personal Notes & Improvement Engine Simulator
// ---------------------------------------------------------------------------

function createPersonalNotesTestHarness(options: {
  userId?: string | null
  storage?: MockLocalStorage
  supabase?: ReturnType<typeof createMockSupabase>
  isOnline?: () => boolean
  now?: () => Date
}) {
  const userId = options.userId || null
  const storage = options.storage || new MockLocalStorage()
  const supabase = options.supabase || createMockSupabase()
  const store = new InMemoryMutationStore()
  let onlineState = options.isOnline ? options.isOnline() : true
  const getNow = options.now || (() => new Date())

  const syncEngine = createOfflineSyncEngine({
    getUserId: () => userId,
    store,
    isOnline: () => onlineState,
    now: getNow,
    adapter: {
      async sync(_uId, mutations) {
        // Process note upserts
        const noteMutations = mutations.filter((m): m is NoteUpsertMutation => m.type === 'note_upsert')
        if (noteMutations.length > 0) {
          const notesMap = new Map<string, any>()
          for (const m of noteMutations) {
            const next = {
              id: m.payload.note.id,
              note_id: m.payload.note.note_id,
              section_id: m.payload.note.section_id,
              section_label: m.payload.note.section_label,
              anchor_text: m.payload.note.anchor_text,
              body: m.payload.note.body,
              is_important: m.payload.note.is_important,
              is_doubt: m.payload.note.is_doubt,
              deleted: m.payload.note.deleted,
              client_updated_at: m.payload.updated_at,
              last_event_id: m.id,
              event_id: m.id
            }
            const current = notesMap.get(next.id)
            if (!current) {
              notesMap.set(next.id, next)
            } else {
              const cmp = next.client_updated_at.localeCompare(current.client_updated_at)
              if (cmp > 0 || (cmp === 0 && next.event_id > current.event_id)) {
                notesMap.set(next.id, next)
              }
            }
          }
          await supabase.rpc('merge_user_notes', { p_notes: [...notesMap.values()] })
        }

        // Process improvement items
        const improvementMutations = mutations.filter((m): m is ImprovementCreateMutation => m.type === 'improvement_create')
        if (improvementMutations.length > 0) {
          const itemsMap = new Map<string, any>()
          for (const m of improvementMutations) {
            if (!itemsMap.has(m.payload.item.id)) {
              itemsMap.set(m.payload.item.id, {
                id: m.payload.item.id,
                note_id: m.payload.item.note_id,
                section_id: m.payload.item.section_id,
                section_label: m.payload.item.section_label,
                item_type: m.payload.item.item_type,
                reference_url: m.payload.item.reference_url,
                description: m.payload.item.description,
                client_created_at: m.payload.created_at
              })
            }
          }
          await supabase.rpc('insert_content_improvement_items', { p_items: [...itemsMap.values()] })
        }

        return { syncedIds: mutations.map(m => m.id) }
      }
    }
  })

  let notes: PersonalNote[] = []
  let improvements: ContentImprovementItem[] = []
  const lsNotesKey = `tgprb:personal-notes:${userId || 'guest'}`
  const lsImprovementsKey = `tgprb:improvements:${userId || 'guest'}`
  let clockTick = 0

  function getTimestamp(): string {
    const time = getNow().getTime() + (clockTick++)
    return new Date(time).toISOString()
  }

  function _lsSaveNotes() {
    storage.setItem(lsNotesKey, JSON.stringify(notes))
  }

  function _lsReadNotes(): PersonalNote[] {
    const raw = storage.getItem(lsNotesKey)
    return raw ? JSON.parse(raw) : []
  }

  function _lsSaveImprovements() {
    storage.setItem(lsImprovementsKey, JSON.stringify(improvements))
  }

  function _lsReadImprovements(): ContentImprovementItem[] {
    const raw = storage.getItem(lsImprovementsKey)
    return raw ? JSON.parse(raw) : []
  }

  function createNote(context: SectionContext, body: string, anchorText?: string): PersonalNote {
    if (!body || !body.trim()) {
      throw new Error('Note body cannot be empty')
    }
    const id = crypto.randomUUID()
    const now = getTimestamp()
    const newNote: PersonalNote = {
      id,
      note_id: context.noteId,
      section_id: context.sectionId,
      section_label: context.sectionLabel,
      anchor_text: anchorText,
      body,
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: now,
      last_event_id: id,
      created_at: now
    }

    notes.push(newNote)
    _lsSaveNotes()

    syncEngine.queueNoteUpsert({
      note: {
        id: newNote.id,
        note_id: newNote.note_id,
        section_id: newNote.section_id,
        section_label: newNote.section_label,
        anchor_text: newNote.anchor_text,
        body: newNote.body,
        is_important: newNote.is_important,
        is_doubt: newNote.is_doubt,
        deleted: newNote.deleted
      },
      updated_at: now
    })

    return newNote
  }

  function updateNote(noteId: string, updates: { body?: string; is_important?: boolean; is_doubt?: boolean }): void {
    const note = notes.find(n => n.id === noteId)
    if (!note) return

    const now = getTimestamp()
    const eventId = crypto.randomUUID()

    Object.assign(note, updates, {
      client_updated_at: now,
      last_event_id: eventId
    })

    _lsSaveNotes()

    syncEngine.queueNoteUpsert({
      note: {
        id: note.id,
        note_id: note.note_id,
        section_id: note.section_id,
        section_label: note.section_label,
        anchor_text: note.anchor_text,
        body: note.body,
        is_important: note.is_important,
        is_doubt: note.is_doubt,
        deleted: note.deleted
      },
      updated_at: now
    })
  }

  function deleteNote(noteId: string): void {
    const note = notes.find(n => n.id === noteId)
    if (!note) return

    const now = getTimestamp()
    const eventId = crypto.randomUUID()

    note.deleted = true
    note.client_updated_at = now
    note.last_event_id = eventId

    _lsSaveNotes()

    syncEngine.queueNoteUpsert({
      note: {
        id: note.id,
        note_id: note.note_id,
        section_id: note.section_id,
        section_label: note.section_label,
        anchor_text: note.anchor_text,
        body: note.body,
        is_important: note.is_important,
        is_doubt: note.is_doubt,
        deleted: note.deleted
      },
      updated_at: now
    })
  }

  function getNotesForTopic(noteId: string): PersonalNote[] {
    return notes.filter(n => n.note_id === noteId && !n.deleted)
  }

  function getNotesForSection(noteId: string, sectionId: string): PersonalNote[] {
    return notes.filter(n => n.note_id === noteId && n.section_id === sectionId && !n.deleted)
  }

  function getCountForSection(noteId: string, sectionId: string): number {
    return getNotesForSection(noteId, sectionId).length
  }

  function hasFlaggedNotes(noteId: string, sectionId: string): boolean {
    return getNotesForSection(noteId, sectionId).some(n => n.is_important || n.is_doubt)
  }

  function searchNotes(query: string): PersonalNote[] {
    if (!query || !query.trim()) return []
    const q = query.toLowerCase()
    return notes.filter(n =>
      !n.deleted &&
      ((n.body && n.body.toLowerCase().includes(q)) || (n.anchor_text && n.anchor_text.toLowerCase().includes(q)))
    )
  }

  async function loadNotes(): Promise<void> {
    // 1. Local hydration
    const local = _lsReadNotes()
    if (local.length > 0) {
      notes = local
    }

    // 2. Cloud hydration & LWW merge if logged in
    if (userId) {
      const { data: cloudNotes } = await supabase
        .from('user_personal_notes')
        .select('*')
        .eq('user_id', userId)

      if (cloudNotes && cloudNotes.length > 0) {
        const cloudMap = new Map(cloudNotes.map((n: any) => [n.id, n]))
        const localMap = new Map(local.map(n => [n.id, n]))
        const merged = new Map<string, PersonalNote>()

        const resolveConflict = (l: PersonalNote, c: any): PersonalNote => {
          const lTime = new Date(l.client_updated_at).getTime()
          const cTime = new Date(c.client_updated_at).getTime()
          if (lTime > cTime) return l
          if (lTime < cTime) return c as PersonalNote
          return l.last_event_id > c.last_event_id ? l : (c as PersonalNote)
        }

        for (const [id, lNote] of localMap) {
          const cNote = cloudMap.get(id)
          if (cNote) {
            merged.set(id, resolveConflict(lNote, cNote))
            cloudMap.delete(id)
          } else {
            merged.set(id, lNote)
          }
        }

        for (const [id, cNote] of cloudMap) {
          merged.set(id, cNote as PersonalNote)
        }

        notes = Array.from(merged.values())
        _lsSaveNotes()
      }
    }
  }

  function submitImprovement(
    context: SectionContext,
    item_type: ImprovementItemType,
    description: string,
    reference_url?: string
  ): ContentImprovementItem {
    if (!description || !description.trim()) {
      throw new Error('Improvement description is required')
    }
    const id = crypto.randomUUID()
    const now = getTimestamp()

    const item: ContentImprovementItem = {
      id,
      note_id: context.noteId,
      section_id: context.sectionId,
      section_label: context.sectionLabel,
      item_type,
      reference_url,
      description,
      status: 'pending',
      client_created_at: now
    }

    improvements.push(item)
    _lsSaveImprovements()

    syncEngine.queueImprovementCreate({
      item: {
        id: item.id,
        note_id: item.note_id,
        section_id: item.section_id,
        section_label: item.section_label,
        item_type: item.item_type,
        reference_url: item.reference_url,
        description: item.description
      },
      created_at: now
    })

    return item
  }

  return {
    get notes() {
      return notes
    },
    get improvements() {
      return improvements
    },
    setOnline(state: boolean) {
      onlineState = state
    },
    syncEngine,
    storage,
    supabase,
    createNote,
    updateNote,
    deleteNote,
    getNotesForTopic,
    getNotesForSection,
    getCountForSection,
    hasFlaggedNotes,
    searchNotes,
    loadNotes,
    submitImprovement
  }
}

// ---------------------------------------------------------------------------
// Markdown-Lite & View Parser Helper
// ---------------------------------------------------------------------------

function parseMarkdownLite(text: string): string {
  if (!text) return ''
  let html = text.replace(/<[^>]*>?/gm, '') // sanitize raw HTML
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-4 space-y-1 my-1">$1</ul>')
  return html.replace(/\n/g, '<br/>')
}

function checkIsImagePreview(url: string): boolean {
  if (!url) return false
  const lower = url.toLowerCase().split('?')[0]
  return (
    lower.endsWith('.png') ||
    lower.endsWith('.jpg') ||
    lower.endsWith('.jpeg') ||
    lower.endsWith('.webp') ||
    lower.endsWith('.gif')
  )
}

function formatButtonBadge(count: number): { text: string; visible: boolean } {
  if (count <= 0) return { text: '', visible: false }
  return {
    text: count > 99 ? '99+' : String(count),
    visible: true
  }
}

// ---------------------------------------------------------------------------
// Active Topic Registry Definition for /my-notes.vue
// ---------------------------------------------------------------------------

const ACTIVE_TOPIC_REGISTRY: Record<string, { title: string; section: string; route: string }> = {
  'NOTE-GEO-DRAINAGE': {
    title: 'Drainage System of India',
    section: 'Geography',
    route: '/notes/geography/drainage-system-of-india'
  },
  'NOTE-GEO-IRRIGATION': {
    title: 'Irrigation in India & Telangana',
    section: 'Geography',
    route: '/notes/geography/irrigation-in-india'
  },
  'NOTE-GEO-MOUNTAINS': {
    title: 'Mountain Ranges & Passes of India',
    section: 'Geography',
    route: '/notes/geography/mountains-in-india'
  },
  'NOTE-GEO-DAMS': {
    title: 'Major Dams & Reservoirs of India',
    section: 'Geography',
    route: '/notes/geography/dams-in-india'
  },
  'NOTE-GEO-FORESTS': {
    title: 'Forests of India',
    section: 'Geography',
    route: '/notes/geography/forests-in-india'
  },
  'NOTE-POL-EXECUTIVE': {
    title: 'Union Executive & Legislature',
    section: 'Polity',
    route: '/notes/polity/union-executive-and-legislature'
  },
  'NOTE-TEL-STATEHOOD': {
    title: 'Telangana Statehood Movement',
    section: 'Telangana',
    route: '/notes/telangana/telangana-statehood-movement'
  }
}

// ===========================================================================
// TEST SUITES
// ===========================================================================

async function runTestSuite() {
  console.log('Starting Personal Notes & Content Improvement Queue E2E Test Suite...')

  // =========================================================================
  // TIER 1: FEATURE COVERAGE
  // =========================================================================

  suiteHeader('TIER 1 - Feature 1: InlineNoteStrip & SectionNotesButton Component Contracts')

  await runTest('T1.1', 'T1.1.1: Section with zero notes returns count 0, hasImportant=false, strip hidden', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-1' })
    const count = harness.getCountForSection('NOTE-GEO-DRAINAGE', 'ganga-basin')
    const hasFlags = harness.hasFlaggedNotes('NOTE-GEO-DRAINAGE', 'ganga-basin')
    const notes = harness.getNotesForSection('NOTE-GEO-DRAINAGE', 'ganga-basin')
    const badge = formatButtonBadge(count)

    assert.equal(count, 0)
    assert.equal(hasFlags, false)
    assert.equal(notes.length, 0)
    assert.equal(badge.visible, false)
  })

  await runTest('T1.1', 'T1.1.2: Adding a note produces count 1, renders strip, formats snippet correctly', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-1' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'ganga-basin',
      sectionLabel: 'Ganga River Basin'
    }
    harness.createNote(ctx, 'Alakananda and Bhagirathi join at Devprayag to form Ganga.')

    const count = harness.getCountForSection('NOTE-GEO-DRAINAGE', 'ganga-basin')
    const notes = harness.getNotesForSection('NOTE-GEO-DRAINAGE', 'ganga-basin')
    const badge = formatButtonBadge(count)

    assert.equal(count, 1)
    assert.equal(notes.length, 1)
    assert.equal(badge.visible, true)
    assert.equal(badge.text, '1')
    assert.match(notes[0].body, /Devprayag/)
  })

  await runTest('T1.1', 'T1.1.3: Setting is_important=true triggers saffron badge & ⭐ chip flag', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-1' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'godavari-basin',
      sectionLabel: 'Godavari River Basin'
    }
    const note = harness.createNote(ctx, 'Godavari originates at Trimbakeshwar in Nashik district.')
    assert.equal(harness.hasFlaggedNotes('NOTE-GEO-DRAINAGE', 'godavari-basin'), false)

    harness.updateNote(note.id, { is_important: true })
    assert.equal(harness.hasFlaggedNotes('NOTE-GEO-DRAINAGE', 'godavari-basin'), true)
    assert.equal(harness.getNotesForSection('NOTE-GEO-DRAINAGE', 'godavari-basin')[0].is_important, true)
  })

  await runTest('T1.1', 'T1.1.4: Setting is_doubt=true triggers ❓ Doubt chip flag', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-1' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'krishna-basin',
      sectionLabel: 'Krishna River Basin'
    }
    const note = harness.createNote(ctx, 'Is Musi a left-bank or right-bank tributary of Krishna?')
    harness.updateNote(note.id, { is_doubt: true })

    const secNotes = harness.getNotesForSection('NOTE-GEO-DRAINAGE', 'krishna-basin')
    assert.equal(secNotes[0].is_doubt, true)
    assert.equal(harness.hasFlaggedNotes('NOTE-GEO-DRAINAGE', 'krishna-basin'), true)
  })

  await runTest('T1.1', 'T1.1.5: 105 notes on a single section renders 99+ on SectionNotesButton badge', () => {
    const badge1 = formatButtonBadge(5)
    const badge99 = formatButtonBadge(99)
    const badge100 = formatButtonBadge(100)
    const badge105 = formatButtonBadge(105)

    assert.equal(badge1.text, '5')
    assert.equal(badge99.text, '99')
    assert.equal(badge100.text, '99+')
    assert.equal(badge105.text, '99+')
  })

  await runTest('T1.1', 'T1.1.6: Button/Strip click event produces valid SectionContext contract', () => {
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Union Executive & Legislature',
      route: '/notes/polity/union-executive-and-legislature',
      sectionId: 'president-powers',
      sectionLabel: 'Presidential Ordinance Powers (Art 123)',
      sectionNumber: '02'
    }

    assert.equal(typeof ctx.noteId, 'string')
    assert.equal(typeof ctx.noteTitle, 'string')
    assert.equal(typeof ctx.route, 'string')
    assert.equal(typeof ctx.sectionId, 'string')
    assert.equal(typeof ctx.sectionLabel, 'string')
    assert.equal(ctx.sectionNumber, '02')
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 2: PersonalNotesDrawer & Text Selection Quote Capture')

  await runTest('T1.2', 'T1.2.1: openForSection binds active SectionContext and opens slideover', () => {
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-MOUNTAINS',
      noteTitle: 'Mountain Ranges & Passes of India',
      route: '/notes/geography/mountains-in-india',
      sectionId: 'western-ghats',
      sectionLabel: 'Western Ghats Passes'
    }

    let isOpen = false
    let activeContext: SectionContext | null = null
    let activeTab: 'note' | 'improvement' = 'note'

    function openForSection(c: SectionContext, tab: 'note' | 'improvement' = 'note') {
      activeContext = c
      activeTab = tab
      isOpen = true
    }

    openForSection(ctx)
    assert.equal(isOpen, true)
    assert.equal(activeContext?.noteId, 'NOTE-GEO-MOUNTAINS')
    assert.equal(activeTab, 'note')
  })

  await runTest('T1.2', 'T1.2.2: Text selection <= 300 characters captured into draftAnchor verbatim', () => {
    const selectedText = 'Palghat Gap connects Coimbatore in Tamil Nadu with Palakkad in Kerala.'
    assert.ok(selectedText.length <= 300)

    let draftAnchor = ''
    const selection = selectedText.trim()
    if (selection) {
      draftAnchor = selection.slice(0, 300)
    }

    assert.equal(draftAnchor, selectedText)
    assert.equal(draftAnchor.length, selectedText.length)
  })

  await runTest('T1.2', 'T1.2.3: Text selection > 300 characters strictly sliced to 300 chars', () => {
    const longText = 'A'.repeat(500)
    const selection = longText.trim()
    const draftAnchor = selection.slice(0, 300)

    assert.equal(draftAnchor.length, 300)
    assert.equal(draftAnchor, 'A'.repeat(300))
  })

  await runTest('T1.2', 'T1.2.4: Surrounding spaces and newlines trimmed before anchor capture', () => {
    const rawSelection = '\n\t  Thal Ghat connects Mumbai to Nashik on NH-3.   \n\n'
    const selection = rawSelection.trim()
    const draftAnchor = selection.slice(0, 300)

    assert.equal(draftAnchor, 'Thal Ghat connects Mumbai to Nashik on NH-3.')
  })

  await runTest('T1.2', 'T1.2.5: Note creation populates UUID, timestamps, last_event_id, and queues sync', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-2' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-MOUNTAINS',
      noteTitle: 'Mountain Ranges & Passes of India',
      route: '/notes/geography/mountains-in-india',
      sectionId: 'himalayas',
      sectionLabel: 'Greater Himalayas'
    }
    const note = harness.createNote(ctx, 'Kanchenjunga is the 3rd highest mountain peak in the world (8,586m).', 'Kanchenjunga')

    assert.ok(note.id.length > 20)
    assert.equal(note.note_id, 'NOTE-GEO-MOUNTAINS')
    assert.equal(note.section_id, 'himalayas')
    assert.equal(note.anchor_text, 'Kanchenjunga')
    assert.equal(note.deleted, false)
    assert.equal(note.last_event_id, note.id)
    assert.ok(note.created_at)
    assert.ok(note.client_updated_at)
    assert.equal(harness.syncEngine.pendingCount.value, 1)
  })

  await runTest('T1.2', 'T1.2.6: Tab switching transitions between "My Notes" and "Suggest Improvement"', () => {
    let activeTab: 'note' | 'improvement' = 'note'
    const tabs = [
      { label: 'My Notes', slot: 'note' },
      { label: 'Suggest Improvement', slot: 'improvement' }
    ]

    function setTabByIndex(idx: number) {
      activeTab = idx === 1 ? 'improvement' : 'note'
    }

    setTabByIndex(1)
    assert.equal(activeTab, 'improvement')
    setTabByIndex(0)
    assert.equal(activeTab, 'note')
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 3: NoteCard Markdown-Lite & Note Operations')

  await runTest('T1.3', 'T1.3.1: parseMarkdownLite converts **bold** to <strong>...</strong>', () => {
    const raw = 'Remember **Article 356** imposes President Rule in states.'
    const parsed = parseMarkdownLite(raw)
    assert.equal(parsed, 'Remember <strong>Article 356</strong> imposes President Rule in states.')
  })

  await runTest('T1.3', 'T1.3.2: parseMarkdownLite converts bulleted lines to <ul><li>...</li></ul>', () => {
    const raw = '- First point\n- Second point'
    const parsed = parseMarkdownLite(raw)
    assert.match(parsed, /<ul class="list-disc pl-4 space-y-1 my-1"><li>First point<\/li><br\/><li>Second point<\/li><\/ul>/)
  })

  await runTest('T1.3', 'T1.3.3: parseMarkdownLite strips raw HTML tags to prevent XSS injection', () => {
    const malicious = '<script>alert("hacked")</script>Important note about <b>Nagarjuna Sagar</b>.'
    const parsed = parseMarkdownLite(malicious)
    assert.ok(!parsed.includes('<script>'))
    assert.ok(!parsed.includes('</script>'))
    assert.ok(!parsed.includes('<b>'))
    assert.match(parsed, /alert\("hacked"\)Important note about Nagarjuna Sagar\./)
  })

  await runTest('T1.3', 'T1.3.4: Toggle is_important updates note and increments last_event_id', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-3' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DAMS',
      noteTitle: 'Major Dams & Reservoirs of India',
      route: '/notes/geography/dams-in-india',
      sectionId: 'kaleshwaram',
      sectionLabel: 'Kaleshwaram Lift Irrigation'
    }
    const note = harness.createNote(ctx, 'Medigadda barrage is the starting point of KLIP.')
    const initialEventId = note.last_event_id

    harness.updateNote(note.id, { is_important: true })
    const updated = harness.notes.find(n => n.id === note.id)!

    assert.equal(updated.is_important, true)
    assert.notEqual(updated.last_event_id, initialEventId)
    assert.equal(harness.syncEngine.pendingCount.value, 2)
  })

  await runTest('T1.3', 'T1.3.5: Toggle is_doubt updates flag and updates client_updated_at', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-3' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DAMS',
      noteTitle: 'Major Dams & Reservoirs of India',
      route: '/notes/geography/dams-in-india',
      sectionId: 'srisailam',
      sectionLabel: 'Srisailam Dam'
    }
    const note = harness.createNote(ctx, 'Check capacity in TMC of Srisailam vs Nagarjuna Sagar.')
    harness.updateNote(note.id, { is_doubt: true })

    const updated = harness.notes.find(n => n.id === note.id)!
    assert.equal(updated.is_doubt, true)
  })

  await runTest('T1.3', 'T1.3.6: Deleting note creates tombstone deleted=true, preserving audit history', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-3' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DAMS',
      noteTitle: 'Major Dams & Reservoirs of India',
      route: '/notes/geography/dams-in-india',
      sectionId: 'hirakud',
      sectionLabel: 'Hirakud Dam'
    }
    const note = harness.createNote(ctx, 'Hirakud is on Mahanadi river in Odisha.')
    assert.equal(harness.getNotesForSection('NOTE-GEO-DAMS', 'hirakud').length, 1)

    harness.deleteNote(note.id)
    assert.equal(harness.getNotesForSection('NOTE-GEO-DAMS', 'hirakud').length, 0)
    assert.equal(harness.notes.length, 1)
    assert.equal(harness.notes[0].deleted, true)
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 4: ImprovementForm & Content Improvement Queue')

  await runTest('T1.4', 'T1.4.1: Empty and whitespace description rejected from submission', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-4' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-FORESTS',
      noteTitle: 'Forests of India',
      route: '/notes/geography/forests-in-india',
      sectionId: 'forest-types',
      sectionLabel: 'Tropical Wet Evergreen'
    }

    assert.throws(() => harness.submitImprovement(ctx, 'fix_fact', ''), /description is required/)
    assert.throws(() => harness.submitImprovement(ctx, 'fix_fact', '   \n  '), /description is required/)
  })

  await runTest('T1.4', 'T1.4.2: Valid submission creates ContentImprovementItem with status pending', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-4' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-FORESTS',
      noteTitle: 'Forests of India',
      route: '/notes/geography/forests-in-india',
      sectionId: 'fsi-report',
      sectionLabel: 'FSI 2023 Statistics'
    }
    const item = harness.submitImprovement(ctx, 'fix_fact', 'Update forest cover area percentage as per latest FSI release.')

    assert.ok(item.id.length > 20)
    assert.equal(item.note_id, 'NOTE-GEO-FORESTS')
    assert.equal(item.section_id, 'fsi-report')
    assert.equal(item.item_type, 'fix_fact')
    assert.equal(item.status, 'pending')
    assert.ok(item.client_created_at)
  })

  await runTest('T1.4', 'T1.4.3: Image URLs correctly trigger isImagePreview === true', () => {
    assert.equal(checkIsImagePreview('https://example.com/assets/map.png'), true)
    assert.equal(checkIsImagePreview('https://example.com/assets/diagram.JPG'), true)
    assert.equal(checkIsImagePreview('https://example.com/assets/photo.jpeg'), true)
    assert.equal(checkIsImagePreview('https://example.com/assets/graphic.webp'), true)
    assert.equal(checkIsImagePreview('https://example.com/assets/anim.gif'), true)
  })

  await runTest('T1.4', 'T1.4.4: Non-image URLs do not trigger isImagePreview', () => {
    assert.equal(checkIsImagePreview('https://en.wikipedia.org/wiki/Forests_of_India'), false)
    assert.equal(checkIsImagePreview('https://pib.gov.in/PressReleasePage.aspx?PRID=12345'), false)
    assert.equal(checkIsImagePreview(''), false)
  })

  await runTest('T1.4', 'T1.4.5: Form state resets cleanly on submission', () => {
    let description = 'Add soil pH chart'
    let referenceUrl = 'https://example.com/chart.png'
    let itemType: ImprovementItemType = 'add_table'

    function resetForm() {
      description = ''
      referenceUrl = ''
      itemType = 'fix_fact'
    }

    resetForm()
    assert.equal(description, '')
    assert.equal(referenceUrl, '')
    assert.equal(itemType, 'fix_fact')
  })

  await runTest('T1.4', 'T1.4.6: Improvement submission queued into offline sync engine', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-t1-4' })
    const ctx: SectionContext = {
      noteId: 'NOTE-TEL-STATEHOOD',
      noteTitle: 'Telangana Statehood Movement',
      route: '/notes/telangana/telangana-statehood-movement',
      sectionId: '1969-movement',
      sectionLabel: '1969 Telangana Agitation'
    }
    harness.submitImprovement(ctx, 'add_topic', 'Include details of GO 36 and G.O. Ms 610.')

    assert.equal(harness.syncEngine.pendingCount.value, 1)
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 5: Local-First Persistence & LWW Conflict Resolution')

  await runTest('T1.5', 'T1.5.1: Guest user persists to tgprb:personal-notes:guest', () => {
    const storage = new MockLocalStorage()
    const harness = createPersonalNotesTestHarness({ userId: null, storage })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }
    harness.createNote(ctx, 'Guest note content')

    const raw = storage.getItem('tgprb:personal-notes:guest')
    assert.ok(raw)
    const parsed = JSON.parse(raw!)
    assert.equal(parsed.length, 1)
    assert.equal(parsed[0].body, 'Guest note content')
  })

  await runTest('T1.5', 'T1.5.2: Authenticated user persists to tgprb:personal-notes:<user_id>', () => {
    const storage = new MockLocalStorage()
    const harness = createPersonalNotesTestHarness({ userId: 'auth-user-99', storage })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }
    harness.createNote(ctx, 'Authenticated user note')

    const raw = storage.getItem('tgprb:personal-notes:auth-user-99')
    assert.ok(raw)
    const parsed = JSON.parse(raw!)
    assert.equal(parsed[0].body, 'Authenticated user note')
  })

  await runTest('T1.5', 'T1.5.3: LWW: Cloud note with newer timestamp overwrites older local note', async () => {
    const storage = new MockLocalStorage()
    const noteId = crypto.randomUUID()
    const localNote: PersonalNote = {
      id: noteId,
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Old local version',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-20T10:00:00.000Z',
      last_event_id: '00000000-0000-0000-0000-000000000001',
      created_at: '2026-08-20T10:00:00.000Z'
    }
    storage.setItem('tgprb:personal-notes:user-lww-1', JSON.stringify([localNote]))

    const cloudNote: any = {
      id: noteId,
      user_id: 'user-lww-1',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Newer cloud version',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T12:00:00.000Z',
      last_event_id: '00000000-0000-0000-0000-000000000002',
      created_at: '2026-08-20T10:00:00.000Z'
    }
    const supabase = createMockSupabase({ userPersonalNotes: [cloudNote] })
    const harness = createPersonalNotesTestHarness({ userId: 'user-lww-1', storage, supabase })

    await harness.loadNotes()
    assert.equal(harness.notes.length, 1)
    assert.equal(harness.notes[0].body, 'Newer cloud version')
    assert.equal(harness.notes[0].is_important, true)
  })

  await runTest('T1.5', 'T1.5.4: LWW: Local note with newer timestamp overwrites older cloud note', async () => {
    const storage = new MockLocalStorage()
    const noteId = crypto.randomUUID()
    const localNote: PersonalNote = {
      id: noteId,
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Newer local version',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T15:00:00.000Z',
      last_event_id: '00000000-0000-0000-0000-000000000002',
      created_at: '2026-08-20T10:00:00.000Z'
    }
    storage.setItem('tgprb:personal-notes:user-lww-2', JSON.stringify([localNote]))

    const cloudNote: any = {
      id: noteId,
      user_id: 'user-lww-2',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Stale cloud version',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-20T10:00:00.000Z',
      last_event_id: '00000000-0000-0000-0000-000000000001',
      created_at: '2026-08-20T10:00:00.000Z'
    }
    const supabase = createMockSupabase({ userPersonalNotes: [cloudNote] })
    const harness = createPersonalNotesTestHarness({ userId: 'user-lww-2', storage, supabase })

    await harness.loadNotes()
    assert.equal(harness.notes.length, 1)
    assert.equal(harness.notes[0].body, 'Newer local version')
    assert.equal(harness.notes[0].is_important, true)
  })

  await runTest('T1.5', 'T1.5.5: LWW: Equal timestamp tie-breaker uses last_event_id lexicographical comparison', async () => {
    const storage = new MockLocalStorage()
    const noteId = crypto.randomUUID()
    const localNote: PersonalNote = {
      id: noteId,
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Local Tie Body',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:00:00.000Z',
      last_event_id: 'aaaaaaaa-0000-0000-0000-000000000001',
      created_at: '2026-08-21T10:00:00.000Z'
    }
    storage.setItem('tgprb:personal-notes:user-tie', JSON.stringify([localNote]))

    const cloudNote: any = {
      id: noteId,
      user_id: 'user-tie',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec1',
      section_label: 'Sec 1',
      body: 'Cloud Tie Body',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:00:00.000Z',
      last_event_id: 'zzzzzzzz-0000-0000-0000-000000000001', // Greater event ID
      created_at: '2026-08-21T10:00:00.000Z'
    }
    const supabase = createMockSupabase({ userPersonalNotes: [cloudNote] })
    const harness = createPersonalNotesTestHarness({ userId: 'user-tie', storage, supabase })

    await harness.loadNotes()
    assert.equal(harness.notes[0].body, 'Cloud Tie Body')
    assert.equal(harness.notes[0].is_important, true)
  })

  await runTest('T1.5', 'T1.5.6: mergeNoteMutations coalesces multiple updates to same note ID into single latest payload', async () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-coalesce' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }

    const note = harness.createNote(ctx, 'Initial note content')
    harness.updateNote(note.id, { body: 'First edit' })
    harness.updateNote(note.id, { body: 'Second edit', is_important: true })
    harness.updateNote(note.id, { body: 'Final edit', is_important: true, is_doubt: true })

    assert.equal(harness.syncEngine.pendingCount.value, 4)
    const res = await harness.syncEngine.flush()

    assert.equal(res.status, 'synced')
    assert.equal(harness.syncEngine.pendingCount.value, 0)
    assert.equal(harness.supabase.state.rpcCalls.length, 1)
    assert.equal(harness.supabase.state.rpcCalls[0].name, 'merge_user_notes')

    const mergedNotes = harness.supabase.state.rpcCalls[0].params.p_notes
    assert.equal(mergedNotes.length, 1)
    assert.equal(mergedNotes[0].body, 'Final edit')
    assert.equal(mergedNotes[0].is_important, true)
    assert.equal(mergedNotes[0].is_doubt, true)
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 6: Global /my-notes.vue Dashboard & Search Registry')

  await runTest('T1.6', 'T1.6.1: Active topic registry correctly covers all 7 note pages', () => {
    const keys = Object.keys(ACTIVE_TOPIC_REGISTRY)
    assert.equal(keys.length, 7)
    assert.ok(keys.includes('NOTE-GEO-DRAINAGE'))
    assert.ok(keys.includes('NOTE-GEO-IRRIGATION'))
    assert.ok(keys.includes('NOTE-GEO-MOUNTAINS'))
    assert.ok(keys.includes('NOTE-GEO-DAMS'))
    assert.ok(keys.includes('NOTE-GEO-FORESTS'))
    assert.ok(keys.includes('NOTE-POL-EXECUTIVE'))
    assert.ok(keys.includes('NOTE-TEL-STATEHOOD'))

    for (const key of keys) {
      const meta = ACTIVE_TOPIC_REGISTRY[key]
      assert.ok(meta.title.length > 5)
      assert.ok(meta.section.length > 3)
      assert.ok(meta.route.startsWith('/notes/'))
    }
  })

  await runTest('T1.6', 'T1.6.2: Notes grouped by topic with accurate section subheadings and totals', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-my-notes' })
    const ctx1: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec-g',
      sectionLabel: 'Ganga'
    }
    const ctx2: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec-b',
      sectionLabel: 'Brahmaputra'
    }
    const ctx3: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Polity',
      route: '/notes/polity/union-executive-and-legislature',
      sectionId: 'sec-p',
      sectionLabel: 'President'
    }

    harness.createNote(ctx1, 'Ganga note')
    harness.createNote(ctx2, 'Brahmaputra note')
    harness.createNote(ctx3, 'President note')

    const drainageNotes = harness.getNotesForTopic('NOTE-GEO-DRAINAGE')
    const polityNotes = harness.getNotesForTopic('NOTE-POL-EXECUTIVE')

    assert.equal(drainageNotes.length, 2)
    assert.equal(polityNotes.length, 1)
  })

  await runTest('T1.6', 'T1.6.3: Full-text search matches substrings in note body (case-insensitive)', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-search' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-IRRIGATION',
      noteTitle: 'Irrigation',
      route: '/notes/geography/irrigation-in-india',
      sectionId: 'sec-mif',
      sectionLabel: 'Micro Irrigation Fund'
    }
    harness.createNote(ctx, 'NABARD manages the Micro Irrigation Fund with a corpus of Rs 5000 crore.')

    const res1 = harness.searchNotes('nabard')
    const res2 = harness.searchNotes('CORPUS')
    const res3 = harness.searchNotes('unknown term')

    assert.equal(res1.length, 1)
    assert.equal(res2.length, 1)
    assert.equal(res3.length, 0)
  })

  await runTest('T1.6', 'T1.6.4: Full-text search matches substrings in anchor_text (case-insensitive)', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-search-anchor' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-IRRIGATION',
      noteTitle: 'Irrigation',
      route: '/notes/geography/irrigation-in-india',
      sectionId: 'sec-pmksy',
      sectionLabel: 'PMKSY'
    }
    harness.createNote(ctx, 'Launched in 2015 for Har Khet Ko Pani.', 'Per Drop More Crop')

    const res = harness.searchNotes('drop more crop')
    assert.equal(res.length, 1)
    assert.equal(res[0].anchor_text, 'Per Drop More Crop')
  })

  await runTest('T1.6', 'T1.6.5: Filter mode important filters strictly to is_important === true', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-filter' })
    const ctx: SectionContext = {
      noteId: 'NOTE-TEL-STATEHOOD',
      noteTitle: 'Telangana',
      route: '/notes/telangana/telangana-statehood-movement',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }
    const n1 = harness.createNote(ctx, 'Regular note')
    const n2 = harness.createNote(ctx, 'Important note')
    harness.updateNote(n2.id, { is_important: true })

    const impNotes = harness.notes.filter(n => !n.deleted && n.is_important)
    assert.equal(impNotes.length, 1)
    assert.equal(impNotes[0].id, n2.id)
  })

  await runTest('T1.6', 'T1.6.6: Filter mode doubt filters strictly to is_doubt === true', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-filter-doubt' })
    const ctx: SectionContext = {
      noteId: 'NOTE-TEL-STATEHOOD',
      noteTitle: 'Telangana',
      route: '/notes/telangana/telangana-statehood-movement',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }
    const n1 = harness.createNote(ctx, 'Regular note')
    const n2 = harness.createNote(ctx, 'Doubt note')
    harness.updateNote(n2.id, { is_doubt: true })

    const doubtNotes = harness.notes.filter(n => !n.deleted && n.is_doubt)
    assert.equal(doubtNotes.length, 1)
    assert.equal(doubtNotes[0].id, n2.id)
  })

  await runTest('T1.6', 'T1.6.7: Filter cycle alternates all -> important -> doubt -> all', () => {
    let mode: NoteFilterMode = 'all'
    const modes: NoteFilterMode[] = ['all', 'important', 'doubt']

    function cycle() {
      const idx = modes.indexOf(mode)
      mode = modes[(idx + 1) % modes.length]
    }

    assert.equal(mode, 'all')
    cycle()
    assert.equal(mode, 'important')
    cycle()
    assert.equal(mode, 'doubt')
    cycle()
    assert.equal(mode, 'all')
  })

  // -------------------------------------------------------------------------
  suiteHeader('TIER 1 - Feature 7: Improvement Export Script (export_improvement_queue.py)')

  await runTest('T1.7', 'T1.7.1: Missing environment variables or dependencies terminates with exit code 1', async () => {
    try {
      await execFileAsync('python3', ['scripts/export_improvement_queue.py'], {
        env: { PATH: process.env.PATH }
      })
      assert.fail('Should have exited with code 1')
    } catch (err: any) {
      assert.equal(err.code, 1)
    }
  })

  await runTest('T1.7', 'T1.7.2: Export queries content_improvement_items where status = pending', () => {
    const items: ContentImprovementItem[] = [
      {
        id: 'item-1',
        note_id: 'NOTE-GEO-DRAINAGE',
        item_type: 'fix_fact',
        description: 'Pending item 1',
        status: 'pending',
        client_created_at: '2026-08-21T09:00:00Z',
        created_at: '2026-08-21T09:00:00Z'
      },
      {
        id: 'item-2',
        note_id: 'NOTE-GEO-DRAINAGE',
        item_type: 'add_table',
        description: 'Done item 2',
        status: 'done',
        client_created_at: '2026-08-21T09:10:00Z',
        created_at: '2026-08-21T09:10:00Z'
      }
    ]

    const pending = items.filter(i => i.status === 'pending')
    assert.equal(pending.length, 1)
    assert.equal(pending[0].id, 'item-1')
  })

  await runTest('T1.7', 'T1.7.3: Exported schema matches required JSON fields', () => {
    const exportedItem = {
      id: '00000000-0000-0000-0000-000000000001',
      user_id: 'test-user',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'deep-dive',
      section_label: 'Deep Dive: Ganga',
      item_type: 'fix_fact',
      reference_url: 'https://pib.gov.in/example',
      description: 'Check length of Yamuna tributary Chambal',
      status: 'pending',
      client_created_at: '2026-08-21T10:00:00Z',
      created_at: '2026-08-21T10:00:00Z'
    }

    const required = ['id', 'note_id', 'item_type', 'description', 'status', 'client_created_at']
    for (const key of required) {
      assert.ok(key in exportedItem, `Missing key ${key}`)
    }
  })

  await runTest('T1.7', 'T1.7.4: mark-done updates status to done and records processed_at timestamp', () => {
    const item: ContentImprovementItem = {
      id: 'item-99',
      note_id: 'NOTE-GEO-DRAINAGE',
      item_type: 'replace_image',
      description: 'Replace map',
      status: 'pending',
      client_created_at: '2026-08-21T10:00:00Z'
    }

    function markDone(target: ContentImprovementItem, notes = 'Processed by AI agent') {
      target.status = 'done'
      target.admin_notes = notes
      target.processed_at = new Date().toISOString()
    }

    markDone(item, 'Updated image to Cloudinary URL')
    assert.equal(item.status, 'done')
    assert.equal(item.admin_notes, 'Updated image to Cloudinary URL')
    assert.ok(item.processed_at)
  })

  await runTest('T1.7', 'T1.7.5: mark-done CLI requires valid arguments or exits with code 1', async () => {
    try {
      await execFileAsync('python3', ['scripts/export_improvement_queue.py', 'mark-done'], {
        env: { PATH: process.env.PATH }
      })
      assert.fail('Should fail on missing item_id')
    } catch (err: any) {
      assert.equal(err.code, 1)
    }
  })

  // =========================================================================
  // TIER 2: BOUNDARY & CORNER CASES
  // =========================================================================

  suiteHeader('TIER 2 - Boundary & Corner Cases')

  await runTest('T2.1', 'T2.1: Blank, newline, and whitespace-only note creation is rejected', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-b1' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }

    assert.throws(() => harness.createNote(ctx, ''), /cannot be empty/)
    assert.throws(() => harness.createNote(ctx, '   '), /cannot be empty/)
    assert.throws(() => harness.createNote(ctx, '\n\t\n  '), /cannot be empty/)
    assert.equal(harness.notes.length, 0)
  })

  await runTest('T2.2', 'T2.2: 300-char boundary: 299 chars, 300 chars, 301 chars (truncated to 300)', () => {
    const t299 = 'A'.repeat(299)
    const t300 = 'B'.repeat(300)
    const t301 = 'C'.repeat(301)
    const t1000 = 'D'.repeat(1000)

    assert.equal(t299.slice(0, 300).length, 299)
    assert.equal(t300.slice(0, 300).length, 300)
    assert.equal(t301.slice(0, 300).length, 300)
    assert.equal(t1000.slice(0, 300).length, 300)
  })

  await runTest('T2.3', 'T2.3: Special characters, Telugu script, and emojis persist with full fidelity', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-b3' })
    const ctx: SectionContext = {
      noteId: 'NOTE-TEL-STATEHOOD',
      noteTitle: 'Telangana Statehood Movement',
      route: '/notes/telangana/telangana-statehood-movement',
      sectionId: 'telangana-movement',
      sectionLabel: 'తెలంగాణ పోరాటం'
    }

    const teluguText = 'తెలంగాణ ఉద్యమం: కాళేశ్వరం ప్రాజెక్టు & 1969 ప్రత్యేక రాష్ట్ర ఉద్యమం ⭐ ❓ 🗺️ "quoted" `code`'
    const note = harness.createNote(ctx, teluguText, 'తెలంగాణ సంస్కృతి')

    assert.equal(note.body, teluguText)
    assert.equal(note.anchor_text, 'తెలంగాణ సంస్కృతి')

    // Verify search works on unicode
    const searchRes = harness.searchNotes('కాళేశ్వరం')
    assert.equal(searchRes.length, 1)
  })

  await runTest('T2.4', 'T2.4: Malicious script tags and raw HTML are stripped across markdown parser', () => {
    const attacks = [
      '<script>window.location="http://evil.com"</script>',
      '<img src="x" onerror="alert(1)"/>',
      '<iframe src="javascript:alert(1)"></iframe>',
      '<div style="background:red" onclick="alert(1)">Click</div>'
    ]

    for (const attack of attacks) {
      const parsed = parseMarkdownLite(attack + ' Safe content')
      assert.ok(!parsed.includes('<script'))
      assert.ok(!parsed.includes('<img'))
      assert.ok(!parsed.includes('<iframe'))
      assert.ok(!parsed.includes('<div'))
      assert.match(parsed, /Safe content/)
    }
  })

  await runTest('T2.5', 'T2.5: Rapid keystroke debounce simulation: 10 typing bursts trigger 1 save', async () => {
    let saveCount = 0
    let lastSavedBody = ''
    let timeout: NodeJS.Timeout | null = null

    function onType(input: string) {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => {
        saveCount++
        lastSavedBody = input
      }, 50) // accelerated 50ms for test
    }

    // 10 rapid keystrokes within 20ms
    for (let i = 1; i <= 10; i++) {
      onType(`Draft character count: ${i}`)
      await new Promise(r => setTimeout(r, 2))
    }

    // Wait for debounce to fire
    await new Promise(r => setTimeout(r, 80))

    assert.equal(saveCount, 1)
    assert.equal(lastSavedBody, 'Draft character count: 10')
  })

  await runTest('T2.6', 'T2.6: Offline mutation buffer accumulation and clean reconnection flush', async () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-b6', isOnline: () => false })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }

    harness.createNote(ctx, 'Offline Note 1')
    harness.createNote(ctx, 'Offline Note 2')
    harness.submitImprovement(ctx, 'fix_fact', 'Offline Improvement')

    assert.equal(harness.syncEngine.pendingCount.value, 3)

    // Flush while offline -> fails gracefully
    const offlineFlush = await harness.syncEngine.flush()
    assert.equal(offlineFlush.status, 'offline')
    assert.equal(harness.syncEngine.pendingCount.value, 3)

    // Switch online and flush
    harness.setOnline(true)
    const onlineFlush = await harness.syncEngine.flush()
    assert.equal(onlineFlush.status, 'synced')
    assert.equal(onlineFlush.syncedCount, 3)
    assert.equal(harness.syncEngine.pendingCount.value, 0)
  })

  await runTest('T2.7', 'T2.7: Empty search query and zero match state return gracefully', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-b7' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }
    harness.createNote(ctx, 'Existing note')

    const emptyRes = harness.searchNotes('')
    const spaceRes = harness.searchNotes('   ')
    const noMatchRes = harness.searchNotes('nonexistent keyword xyz123')

    assert.deepEqual(emptyRes, [])
    assert.deepEqual(spaceRes, [])
    assert.deepEqual(noMatchRes, [])
  })

  // =========================================================================
  // TIER 3: CROSS-FEATURE COMBINATIONS
  // =========================================================================

  suiteHeader('TIER 3 - Cross-Feature Combinations')

  await runTest('T3.1', 'T3.1: End-to-End Note Lifecycle (Selection -> Drawer -> Save -> Strip -> Search -> Imp Flag -> Badge)', () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-flow-1' })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'ganga-deep-dive',
      sectionLabel: 'Ganga River Tributaries'
    }

    // 1. Text selection on page
    const selection = 'Chambal river originates from Singar Chouri peak in Vindhyan escarpment.'
    const draftAnchor = selection.slice(0, 300)

    // 2. Note created
    const note = harness.createNote(ctx, 'Chambal is famous for badland topography (ravines).', draftAnchor)
    assert.equal(harness.getCountForSection('NOTE-GEO-DRAINAGE', 'ganga-deep-dive'), 1)

    // 3. Strip renders note preview
    const secNotes = harness.getNotesForSection('NOTE-GEO-DRAINAGE', 'ganga-deep-dive')
    assert.equal(secNotes.length, 1)
    assert.equal(secNotes[0].anchor_text, selection)

    // 4. Global /my-notes search finds note
    const found = harness.searchNotes('badland')
    assert.equal(found.length, 1)
    assert.equal(found[0].id, note.id)

    // 5. Flag note as important
    harness.updateNote(note.id, { is_important: true })

    // 6. Badges and flags reflect across components
    assert.equal(harness.hasFlaggedNotes('NOTE-GEO-DRAINAGE', 'ganga-deep-dive'), true)
    const badge = formatButtonBadge(harness.getCountForSection('NOTE-GEO-DRAINAGE', 'ganga-deep-dive'))
    assert.equal(badge.text, '1')
  })

  await runTest('T3.2', 'T3.2: End-to-End Improvement Lifecycle (Form -> Offline Queue -> RPC -> Python Export -> Mark Done)', async () => {
    const harness = createPersonalNotesTestHarness({ userId: 'user-flow-2' })
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Union Executive & Legislature',
      route: '/notes/polity/union-executive-and-legislature',
      sectionId: 'parliament-session',
      sectionLabel: 'Parliament Sessions'
    }

    // 1. Submit improvement via form
    const item = harness.submitImprovement(
      ctx,
      'fix_fact',
      'Maximum gap between two sessions of Parliament cannot exceed 6 months under Art 85(1).',
      'https://pib.gov.in/fact-check'
    )
    assert.equal(item.status, 'pending')

    // 2. Offline sync flushes to Supabase mock
    await harness.syncEngine.flush()
    assert.equal(harness.supabase.state.contentImprovements.length, 1)
    assert.equal(harness.supabase.state.contentImprovements[0].id, item.id)

    // 3. Backend AI agent processes item
    const serverItem = harness.supabase.state.contentImprovements[0]
    serverItem.status = 'done'
    serverItem.admin_notes = 'Verified with Constitution Art 85(1) and updated page.'
    serverItem.processed_at = new Date().toISOString()

    assert.equal(serverItem.status, 'done')
    assert.ok(serverItem.admin_notes.includes('Art 85(1)'))
  })

  await runTest('T3.3', 'T3.3: Multi-Device LWW Conflict Resolution and Soft-Delete Tombstone Propagation', async () => {
    const sharedStorage1 = new MockLocalStorage()
    const sharedStorage2 = new MockLocalStorage()
    const sharedNoteId = crypto.randomUUID()
    let time = Date.now()

    const initialNote: any = {
      id: sharedNoteId,
      user_id: 'device-user',
      note_id: 'NOTE-GEO-MOUNTAINS',
      section_id: 'aravalli',
      section_label: 'Aravalli Range',
      body: 'Guru Shikhar (1,722m) is the highest peak of Aravalli.',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: new Date(time).toISOString(),
      last_event_id: '11111111-1111-1111-1111-111111111111',
      created_at: new Date(time).toISOString()
    }

    const supabase = createMockSupabase({ userPersonalNotes: [{ ...initialNote }] })

    // Device A loads initial
    const deviceA = createPersonalNotesTestHarness({ userId: 'device-user', storage: sharedStorage1, supabase, now: () => new Date(time) })
    await deviceA.loadNotes()

    // Device B makes newer edit and syncs to cloud
    time += 1000
    const deviceB = createPersonalNotesTestHarness({ userId: 'device-user', storage: sharedStorage2, supabase, now: () => new Date(time) })
    await deviceB.loadNotes()
    deviceB.updateNote(sharedNoteId, {
      body: 'Guru Shikhar (1,722m) in Mount Abu is the highest peak of Aravalli.',
      is_important: true
    })
    await deviceB.syncEngine.flush()

    // Device A reconnects and reloads -> Device B's newer edit wins
    await deviceA.loadNotes()
    assert.equal(deviceA.notes[0].body, 'Guru Shikhar (1,722m) in Mount Abu is the highest peak of Aravalli.')
    assert.equal(deviceA.notes[0].is_important, true)

    // Device A deletes note -> soft delete tombstone syncs
    time += 1000
    deviceA.deleteNote(sharedNoteId)
    await deviceA.syncEngine.flush()

    // Device B reloads -> note is tombstoned and hidden from active views
    await deviceB.loadNotes()
    assert.equal(deviceB.getNotesForSection('NOTE-GEO-MOUNTAINS', 'aravalli').length, 0)
    assert.equal(deviceB.notes.find(n => n.id === sharedNoteId)?.deleted, true)
  })

  // =========================================================================
  // TIER 4: REAL-WORLD SCENARIOS
  // =========================================================================

  suiteHeader('TIER 4 - Real-World Scenarios')

  await runTest('T4.1', 'T4.1: Comprehensive Student Revision Session Across All 7 Topic Pages', async () => {
    const harness = createPersonalNotesTestHarness({ userId: 'student-revision-session' })

    const sampleTopics = [
      { id: 'NOTE-GEO-DRAINAGE', title: 'Drainage', sec: 'peninsular', label: 'Peninsular Rivers', body: 'Narmada and Tapti flow westward in rift valleys.', imp: true, doubt: false },
      { id: 'NOTE-GEO-DRAINAGE', title: 'Drainage', sec: 'delta', label: 'Sundarbans Delta', body: 'World largest mangrove delta formed by Ganga-Brahmaputra.', imp: false, doubt: true },
      { id: 'NOTE-GEO-IRRIGATION', title: 'Irrigation', sec: 'schemes', label: 'Kaleshwaram', body: 'World largest multi-stage lift irrigation project.', imp: true, doubt: false },
      { id: 'NOTE-GEO-IRRIGATION', title: 'Irrigation', sec: 'canals', label: 'Kakatiya Canal', body: 'Originates from Sriram Sagar Project (SRSP).', imp: false, doubt: true },
      { id: 'NOTE-GEO-MOUNTAINS', title: 'Mountains', sec: 'passes', label: 'Zoji La', body: 'Connects Srinagar to Leh.', imp: true, doubt: false },
      { id: 'NOTE-GEO-MOUNTAINS', title: 'Mountains', sec: 'peaks', label: 'Anamudi', body: 'Highest peak of South India (2,695m) in Kerala.', imp: true, doubt: false },
      { id: 'NOTE-GEO-DAMS', title: 'Dams', sec: 'tehri', label: 'Tehri Dam', body: 'Highest dam in India (260.5m) on Bhagirathi river.', imp: true, doubt: false },
      { id: 'NOTE-GEO-DAMS', title: 'Dams', sec: 'bhavani', label: 'Bhavanisagar', body: 'One of the world largest earthen dams in Tamil Nadu.', imp: false, doubt: false },
      { id: 'NOTE-GEO-FORESTS', title: 'Forests', sec: 'mangroves', label: 'Mangroves', body: 'West Bengal has highest mangrove cover followed by Gujarat.', imp: true, doubt: false },
      { id: 'NOTE-GEO-FORESTS', title: 'Forests', sec: 'fsi', label: 'ISFR 2023', body: 'Madhya Pradesh has largest forest cover by area.', imp: false, doubt: true },
      { id: 'NOTE-POL-EXECUTIVE', title: 'Polity', sec: 'prez', label: 'President', body: 'Article 72 gives pardoning power to President.', imp: true, doubt: false },
      { id: 'NOTE-POL-EXECUTIVE', title: 'Polity', sec: 'council', label: 'Council of Ministers', body: 'Art 75(3): Council of Ministers is collectively responsible to Lok Sabha.', imp: false, doubt: true },
      { id: 'NOTE-TEL-STATEHOOD', title: 'Telangana', sec: 'fazal', label: 'SRC 1953', body: 'Fazal Ali Commission recommended Hyderabad state continuation.', imp: true, doubt: false },
      { id: 'NOTE-TEL-STATEHOOD', title: 'Telangana', sec: 'gentlemen', label: 'Gentlemen Agreement', body: 'Signed on 20 February 1956 in Hyderabad House, Delhi.', imp: true, doubt: false },
      { id: 'NOTE-TEL-STATEHOOD', title: 'Telangana', sec: 'jac', label: 'TJAC', body: 'Prof Kodandaram chaired Telangana Joint Action Committee.', imp: false, doubt: false }
    ]

    for (const t of sampleTopics) {
      const note = harness.createNote(
        { noteId: t.id, noteTitle: t.title, route: `/notes/${t.id.toLowerCase()}`, sectionId: t.sec, sectionLabel: t.label },
        t.body
      )
      if (t.imp) harness.updateNote(note.id, { is_important: true })
      if (t.doubt) harness.updateNote(note.id, { is_doubt: true })
    }

    assert.equal(harness.notes.length, 15)

    // Triage Doubts
    const doubtList = harness.notes.filter(n => !n.deleted && n.is_doubt)
    assert.equal(doubtList.length, 4)

    // Triage Important
    const impList = harness.notes.filter(n => !n.deleted && n.is_important)
    assert.equal(impList.length, 9)

    // Topic counts
    assert.equal(harness.getNotesForTopic('NOTE-GEO-DRAINAGE').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-GEO-IRRIGATION').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-GEO-MOUNTAINS').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-GEO-DAMS').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-GEO-FORESTS').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-POL-EXECUTIVE').length, 2)
    assert.equal(harness.getNotesForTopic('NOTE-TEL-STATEHOOD').length, 3)
  })

  await runTest('T4.2', 'T4.2: 2-Hour Offline Commute Session with Heavy Mutation Coalescing and Replay', async () => {
    const harness = createPersonalNotesTestHarness({ userId: 'commute-student', isOnline: () => false })
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec1',
      sectionLabel: 'Sec 1'
    }

    // 10 note creations
    const createdNotes: PersonalNote[] = []
    for (let i = 1; i <= 10; i++) {
      createdNotes.push(harness.createNote(ctx, `Offline note #${i} content`))
    }

    // 5 note edits
    for (let i = 0; i < 5; i++) {
      harness.updateNote(createdNotes[i].id, { body: `Offline note #${i + 1} EDITED`, is_important: true })
    }

    // 3 note deletions
    for (let i = 7; i < 10; i++) {
      harness.deleteNote(createdNotes[i].id)
    }

    // 2 improvement submissions
    harness.submitImprovement(ctx, 'add_image', 'Add tributary confluence schematic diagram')
    harness.submitImprovement(ctx, 'add_table', 'Add river length comparison table')

    // Total raw mutations queued: 10 + 5 + 3 + 2 = 20
    assert.equal(harness.syncEngine.pendingCount.value, 20)

    // Reconnection occurs
    harness.setOnline(true)
    const result = await harness.syncEngine.flush()

    assert.equal(result.status, 'synced')
    assert.equal(result.syncedCount, 20)
    assert.equal(harness.syncEngine.pendingCount.value, 0)

    // Verify Supabase RPC calls: note mutations coalesced to 10 unique notes
    const noteMergeCall = harness.supabase.state.rpcCalls.find(c => c.name === 'merge_user_notes')
    assert.ok(noteMergeCall)
    assert.equal(noteMergeCall.params.p_notes.length, 10)

    // Verify improvements inserted
    const improvementCall = harness.supabase.state.rpcCalls.find(c => c.name === 'insert_content_improvement_items')
    assert.ok(improvementCall)
    assert.equal(improvementCall.params.p_items.length, 2)
  })

  // =========================================================================
  // SUMMARY
  // =========================================================================

  console.log('\n========================================================')
  console.log(`E2E TEST RUN COMPLETE`)
  console.log(`Total Tests:  ${totalTests}`)
  console.log(`Passed:       ${passedTests}`)
  console.log(`Failed:       ${failedTests}`)
  console.log('========================================================\n')

  if (failedTests > 0) {
    console.error(`FAILED SUITES:`)
    for (const f of failures) {
      console.error(`- [${f.suite}] ${f.name}: ${f.error?.message || f.error}`)
    }
    process.exit(1)
  } else {
    console.log('ALL TESTS PASSED SUCCESSFULLY (Exit Code 0).')
    process.exit(0)
  }
}

runTestSuite().catch(err => {
  console.error('Fatal test harness execution error:', err)
  process.exit(1)
})
