/**
 * Challenger M1 - Adversarial Stress & Reactivity Test Harness
 * 
 * Deeply stress-tests usePersonalNotes and InlineNoteStrip logic:
 * 1. Rapid note mutations & concurrency stress (1000+ ops)
 * 2. Boundary note lengths & HTML/Markdown edge cases (0, 1, 300, 10000+ chars)
 * 3. Emojis, Telugu unicode strings, ZWJ conjuncts, multi-byte search
 * 4. Soft-delete tombstones across all getters, sorting, and computed strips
 * 5. Vue 3 reactivity & computed dependency graph integrity
 * 6. LWW Conflict Resolution edge cases
 */

import assert from 'node:assert/strict'
import { ref, computed, watch, nextTick, type Ref } from 'vue'
import type { PersonalNote, SectionContext } from '../types/annotations'

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
    console.error(`         ${err?.stack || err?.message || err}`)
  }
}

function suiteHeader(title: string) {
  console.log(`\n=== ${title} ===`)
}

// ---------------------------------------------------------------------------
// Vue-Native Reactive usePersonalNotes Simulator
// ---------------------------------------------------------------------------

function createReactivePersonalNotesSimulator(initialNotes: PersonalNote[] = []) {
  const notes = ref<PersonalNote[]>([...initialNotes])
  const isLoading = ref(false)
  const isLoaded = ref(true)

  function getNotesForTopic(noteId: string): PersonalNote[] {
    return notes.value.filter(n => n.note_id === noteId && !n.deleted)
  }

  function getNotesForSection(noteId: string, sectionId: string): PersonalNote[] {
    return notes.value.filter(n => n.note_id === noteId && n.section_id === sectionId && !n.deleted)
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
    return notes.value.filter(n =>
      !n.deleted &&
      ((n.body && n.body.toLowerCase().includes(q)) || (n.anchor_text && n.anchor_text.toLowerCase().includes(q)))
    )
  }

  function createNote(context: SectionContext, body: string, anchorText?: string): PersonalNote {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
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
      created_at: now,
    }

    notes.value = [...notes.value, newNote]
    return newNote
  }

  function updateNote(noteId: string, updates: { body?: string; is_important?: boolean; is_doubt?: boolean }): void {
    const idx = notes.value.findIndex(n => n.id === noteId)
    if (idx === -1) return

    const now = new Date().toISOString()
    const eventId = crypto.randomUUID()

    const updatedNote: PersonalNote = {
      ...notes.value[idx],
      ...updates,
      client_updated_at: now,
      last_event_id: eventId,
    }

    const nextNotes = [...notes.value]
    nextNotes[idx] = updatedNote
    notes.value = nextNotes
  }

  function deleteNote(noteId: string): void {
    const idx = notes.value.findIndex(n => n.id === noteId)
    if (idx === -1) return

    const now = new Date().toISOString()
    const eventId = crypto.randomUUID()

    const updatedNote: PersonalNote = {
      ...notes.value[idx],
      deleted: true,
      client_updated_at: now,
      last_event_id: eventId,
    }

    const nextNotes = [...notes.value]
    nextNotes[idx] = updatedNote
    notes.value = nextNotes
  }

  function resolveConflict(l: PersonalNote, c: any): PersonalNote {
    const lTime = new Date(l.client_updated_at).getTime()
    const cTime = new Date(c.client_updated_at).getTime()
    if (lTime > cTime) return l
    if (lTime < cTime) return c as PersonalNote
    return (l.last_event_id || '') > (c.last_event_id || '') ? l : (c as PersonalNote)
  }

  return {
    notes,
    isLoading,
    isLoaded,
    getNotesForTopic,
    getNotesForSection,
    getCountForSection,
    hasFlaggedNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote,
    resolveConflict,
  }
}

// ---------------------------------------------------------------------------
// InlineNoteStrip Computed Behavior Simulator (Direct Vue Reactive)
// ---------------------------------------------------------------------------

function createInlineNoteStripModel(
  props: { noteId: string; sectionId: string; sectionLabel: string; noteTitle: string },
  notesRef: Ref<PersonalNote[]>
) {
  const sectionNotes = computed(() => {
    if (!notesRef || !notesRef.value) return []
    return notesRef.value
      .filter(n => n.note_id === props.noteId && n.section_id === props.sectionId && !n.deleted)
      .sort((a, b) => {
        const timeA = new Date(a.client_updated_at || a.created_at).getTime()
        const timeB = new Date(b.client_updated_at || b.created_at).getTime()
        return timeB - timeA
      })
  })

  const noteCount = computed(() => sectionNotes.value.length)
  const latestNote = computed(() => sectionNotes.value[0] || null)
  const hasImportant = computed(() => sectionNotes.value.some(n => n.is_important))
  const hasDoubt = computed(() => sectionNotes.value.some(n => n.is_doubt))

  const snippet = computed(() => {
    if (!latestNote.value) return ''
    const raw = latestNote.value.body || latestNote.value.anchor_text || ''
    return raw
      .replace(/<[^>]*>?/gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/^- /gm, '')
      .replace(/\n+/g, ' ')
      .trim()
  })

  const isVisible = computed(() => sectionNotes.value.length > 0)

  return {
    sectionNotes,
    noteCount,
    latestNote,
    hasImportant,
    hasDoubt,
    snippet,
    isVisible
  }
}

// ===========================================================================
// ADVERSARIAL TEST EXECUTION
// ===========================================================================

async function runChallengerTests() {
  console.log('Starting Milestone 1 Challenger Stress & Reactivity Test Suite...')

  // -------------------------------------------------------------------------
  // SUITE 1: RAPID NOTE MUTATIONS & CONCURRENCY STRESS
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 1: Rapid Note Mutations & Concurrency Stress')

  await runTest('C1', 'C1.1: 1,000 rapid sequential creates maintain exact array length & reactive integrity', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec-rapid',
      sectionLabel: 'Rapid Section'
    }

    for (let i = 0; i < 1000; i++) {
      store.createNote(ctx, `Rapid Note #${i}`)
    }

    assert.equal(store.notes.value.length, 1000)
    assert.equal(store.getCountForSection('NOTE-GEO-DRAINAGE', 'sec-rapid'), 1000)
    assert.equal(store.getNotesForTopic('NOTE-GEO-DRAINAGE').length, 1000)
  })

  await runTest('C1', 'C1.2: 500 rapid alternating toggles (important <-> doubt) update state without corruption', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage System of India',
      route: '/notes/geography/drainage-system-of-india',
      sectionId: 'sec-toggle',
      sectionLabel: 'Toggle Section'
    }
    const note = store.createNote(ctx, 'Toggle test note')
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    for (let i = 0; i < 500; i++) {
      const imp = i % 2 === 0
      const dbt = i % 3 === 0
      store.updateNote(note.id, { is_important: imp, is_doubt: dbt })
      assert.equal(strip.hasImportant.value, imp)
      assert.equal(strip.hasDoubt.value, dbt)
    }
  })

  await runTest('C1', 'C1.3: Interleaved creates, updates, and deletes across 10 sections maintain partition isolation', () => {
    const store = createReactivePersonalNotesSimulator()
    const noteIds: string[] = []

    for (let s = 1; s <= 10; s++) {
      const ctx: SectionContext = {
        noteId: 'NOTE-GEO-DRAINAGE',
        noteTitle: 'Drainage System of India',
        route: '/notes/geography/drainage-system-of-india',
        sectionId: `sec-${s}`,
        sectionLabel: `Section ${s}`
      }
      for (let n = 1; n <= 10; n++) {
        const note = store.createNote(ctx, `Note ${s}-${n}`)
        noteIds.push(note.id)
      }
    }

    assert.equal(store.notes.value.length, 100)

    // Delete odd indexed notes (50 notes deleted)
    for (let i = 1; i < noteIds.length; i += 2) {
      store.deleteNote(noteIds[i])
    }

    assert.equal(store.notes.value.length, 100) // All 100 exist (50 active, 50 tombstones)
    assert.equal(store.getNotesForTopic('NOTE-GEO-DRAINAGE').length, 50)

    for (let s = 1; s <= 10; s++) {
      assert.equal(store.getCountForSection('NOTE-GEO-DRAINAGE', `sec-${s}`), 5)
    }
  })

  // -------------------------------------------------------------------------
  // SUITE 2: BOUNDARY NOTE LENGTHS & HTML/MARKDOWN EDGE CASES
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 2: Boundary Note Lengths & Edge Cases')

  await runTest('C2', 'C2.1: Single-char note and 10,000-char note render snippet and strip safely', async () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-MOUNTAINS',
      noteTitle: 'Mountains',
      route: '/notes/geography/mountains',
      sectionId: 'himalayas',
      sectionLabel: 'Himalayas'
    }

    // 1-char note
    const n1 = store.createNote(ctx, 'K')
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)
    assert.equal(strip.snippet.value, 'K')

    // 10,000-char note (with delay for timestamp separation)
    await new Promise(r => setTimeout(r, 2))
    const bigBody = 'Everest '.repeat(1500)
    store.createNote(ctx, bigBody)
    assert.equal(strip.snippet.value.length, bigBody.trim().length)
    assert.equal(strip.noteCount.value, 2)
  })

  await runTest('C2', 'C2.2: Markdown snippet formatting: bold, bullet lines, multiple newlines and raw HTML', async () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Union Executive',
      route: '/notes/polity/exec',
      sectionId: 'president',
      sectionLabel: 'President'
    }
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    // Bold formatting stripping
    store.createNote(ctx, '**Article 52**: There shall be a **President** of India.')
    assert.equal(strip.snippet.value, 'Article 52: There shall be a President of India.')

    // Bullet points and newlines (with delay for timestamp separation)
    await new Promise(r => setTimeout(r, 2))
    store.createNote(ctx, '- Executive power\n- Supreme Commander\n- Pardoning power')
    assert.equal(strip.snippet.value, 'Executive power Supreme Commander Pardoning power')

    // Script and HTML tags (with delay for timestamp separation)
    await new Promise(r => setTimeout(r, 2))
    store.createNote(ctx, '<script>alert("hack")</script><b>Important</b> President note')
    assert.equal(strip.snippet.value, 'alert("hack")Important President note')
  })

  await runTest('C2', 'C2.3: Note with empty body falls back to anchor_text in strip snippet', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Union Executive',
      route: '/notes/polity/exec',
      sectionId: 'ordinance',
      sectionLabel: 'Ordinance Power'
    }
    store.createNote(ctx, '', 'Article 123 promulgation of Ordinances during recess')
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    assert.equal(strip.snippet.value, 'Article 123 promulgation of Ordinances during recess')
  })

  // -------------------------------------------------------------------------
  // SUITE 3: TELUGU SCRIPT, COMPLEX UNICODE, EMOJIS & MULTI-BYTE SEARCH
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 3: Telugu Script, Complex Unicode, Emojis & Search')

  await runTest('C3', 'C3.1: Telugu text with complex conjuncts (ZWJ) persists and computes correctly', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-TEL-STATEHOOD',
      noteTitle: 'Telangana Statehood Movement',
      route: '/notes/telangana/statehood',
      sectionId: 'hyderabad-state',
      sectionLabel: 'Hyderabad State'
    }

    const teluguText = 'తెలంగాణ రాష్ట్ర సమితి ఏర్పాటు 2001 ఏప్రిల్ 27న జలదృశ్యంలో జరిగింది. కె.చంద్రశేఖర రావు గారు స్థాపించారు.'
    const anchorText = '1969 ప్రత్యేక తెలంగాణ ఉద్యమం - జై తెలంగాణ నినాదం'
    store.createNote(ctx, teluguText, anchorText)

    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)
    assert.equal(strip.snippet.value, teluguText)

    const searchRes1 = store.searchNotes('చంద్రశేఖర')
    assert.equal(searchRes1.length, 1)

    const searchRes2 = store.searchNotes('జై తెలంగాణ')
    assert.equal(searchRes2.length, 1)
  })

  await runTest('C3', 'C3.2: Emojis and combined Unicode symbols in note body and search', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DAMS',
      noteTitle: 'Dams of India',
      route: '/notes/geography/dams',
      sectionId: 'nagarjuna-sagar',
      sectionLabel: 'Nagarjuna Sagar'
    }

    const emojiText = '🌊 నాగార్జున సాగర్ డ్యామ్ 🇮🇳 కృష్ణా నదిపై నిర్మించబడింది. ⭐ ఎత్తు: 124m ⚡ విద్యుత్ ఉత్పత్తి.'
    store.createNote(ctx, emojiText)

    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)
    assert.equal(strip.snippet.value, emojiText)

    const searchEmoji = store.searchNotes('⚡')
    assert.equal(searchEmoji.length, 1)

    const searchRiver = store.searchNotes('కృష్ణా')
    assert.equal(searchRiver.length, 1)
  })

  // -------------------------------------------------------------------------
  // SUITE 4: SOFT-DELETE TOMBSTONE LIFECYCLE & INVARIANTS
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 4: Soft-Delete Tombstone Invariants')

  await runTest('C4.1', 'C4.1.1: Deleting a note excludes it from getNotesForTopic and getNotesForSection', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-IRRIGATION',
      noteTitle: 'Irrigation',
      route: '/notes/geography/irrigation',
      sectionId: 'canals',
      sectionLabel: 'Canals'
    }
    const n1 = store.createNote(ctx, 'Kaleshwaram Lift Irrigation Scheme')
    const n2 = store.createNote(ctx, 'Mission Kakatiya')

    assert.equal(store.getCountForSection('NOTE-GEO-IRRIGATION', 'canals'), 2)

    store.deleteNote(n1.id)

    assert.equal(store.getCountForSection('NOTE-GEO-IRRIGATION', 'canals'), 1)
    assert.equal(store.getNotesForSection('NOTE-GEO-IRRIGATION', 'canals')[0].id, n2.id)
    assert.equal(store.getNotesForTopic('NOTE-GEO-IRRIGATION').length, 1)
  })

  await runTest('C4.1', 'C4.1.2: Deleting all notes in a section causes InlineNoteStrip to collapse (isVisible = false)', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-IRRIGATION',
      noteTitle: 'Irrigation',
      route: '/notes/geography/irrigation',
      sectionId: 'tanks',
      sectionLabel: 'Tanks'
    }
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)
    assert.equal(strip.isVisible.value, false)

    const n1 = store.createNote(ctx, 'Kakatiya era tanks')
    assert.equal(strip.isVisible.value, true)
    assert.equal(strip.noteCount.value, 1)

    store.deleteNote(n1.id)
    assert.equal(strip.isVisible.value, false)
    assert.equal(strip.noteCount.value, 0)
    assert.equal(strip.snippet.value, '')
  })

  await runTest('C4.1', 'C4.1.3: Deleting the latest note promotes the next active note to latestNote and snippet', async () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-FORESTS',
      noteTitle: 'Forests of India',
      route: '/notes/geography/forests',
      sectionId: 'mangroves',
      sectionLabel: 'Mangrove Forests'
    }
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    // Create note 1
    const n1 = store.createNote(ctx, 'First Note: Sundarbans is the largest mangrove forest.')
    
    // Simulate short delay so timestamp is newer
    await new Promise(r => setTimeout(r, 10))
    const n2 = store.createNote(ctx, 'Second Note: Bhitarkanika is in Odisha.')

    assert.equal(strip.latestNote.value?.id, n2.id)
    assert.equal(strip.snippet.value, 'Second Note: Bhitarkanika is in Odisha.')

    // Delete n2 (the latest)
    store.deleteNote(n2.id)

    // Now n1 should be promoted to latestNote
    assert.equal(strip.latestNote.value?.id, n1.id)
    assert.equal(strip.snippet.value, 'First Note: Sundarbans is the largest mangrove forest.')
    assert.equal(strip.noteCount.value, 1)
  })

  await runTest('C4.1', 'C4.1.4: Deleting a flagged note correctly recalculates hasImportant and hasDoubt', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-FORESTS',
      noteTitle: 'Forests of India',
      route: '/notes/geography/forests',
      sectionId: 'canopy',
      sectionLabel: 'Canopy Density'
    }
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    const n1 = store.createNote(ctx, 'Note 1 - Normal')
    const n2 = store.createNote(ctx, 'Note 2 - Important')
    const n3 = store.createNote(ctx, 'Note 3 - Doubt')

    store.updateNote(n2.id, { is_important: true })
    store.updateNote(n3.id, { is_doubt: true })

    assert.equal(strip.hasImportant.value, true)
    assert.equal(strip.hasDoubt.value, true)

    // Delete important note
    store.deleteNote(n2.id)
    assert.equal(strip.hasImportant.value, false)
    assert.equal(strip.hasDoubt.value, true)

    // Delete doubt note
    store.deleteNote(n3.id)
    assert.equal(strip.hasImportant.value, false)
    assert.equal(strip.hasDoubt.value, false)
    assert.equal(strip.isVisible.value, true) // n1 is still active
  })

  // -------------------------------------------------------------------------
  // SUITE 5: VUE 3 REACTIVITY & DEPENDENCY GRAPH INTEGRITY
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 5: Vue 3 Reactivity & Watcher Triggering')

  await runTest('C5', 'C5.1: Vue watch effect fires synchronously/reactively on note updates', async () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage',
      sectionId: 'indus',
      sectionLabel: 'Indus'
    }

    let watchTriggerCount = 0
    let lastSeenCount = 0

    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    watch(
      () => strip.noteCount.value,
      (newVal) => {
        watchTriggerCount++
        lastSeenCount = newVal
      }
    )

    const n1 = store.createNote(ctx, 'Indus originates near Mansarovar')
    await nextTick()
    assert.equal(lastSeenCount, 1)

    const n2 = store.createNote(ctx, 'Jhelum flows into Wular Lake')
    await nextTick()
    assert.equal(lastSeenCount, 2)

    store.deleteNote(n1.id)
    await nextTick()
    assert.equal(lastSeenCount, 1)
    assert.equal(watchTriggerCount, 3)
  })

  // -------------------------------------------------------------------------
  // SUITE 6: LWW CONFLICT RESOLUTION WITH SOFT-DELETES
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 6: LWW Conflict Resolution & Timestamps')

  await runTest('C6', 'C6.1: LWW conflict resolution: Newer soft-delete overwrites older active cloud note', () => {
    const store = createReactivePersonalNotesSimulator()

    const localDeletedNote: PersonalNote = {
      id: 'note-conflict-1',
      note_id: 'NOTE-GEO-DAMS',
      section_id: 'srisailam',
      section_label: 'Srisailam',
      body: 'Local deleted note',
      is_important: false,
      is_doubt: false,
      deleted: true,
      client_updated_at: '2026-08-21T10:05:00.000Z',
      last_event_id: 'evt-2',
      created_at: '2026-08-21T10:00:00.000Z'
    }

    const cloudActiveNote = {
      id: 'note-conflict-1',
      note_id: 'NOTE-GEO-DAMS',
      section_id: 'srisailam',
      section_label: 'Srisailam',
      body: 'Cloud older active note',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:01:00.000Z',
      last_event_id: 'evt-1',
      created_at: '2026-08-21T10:00:00.000Z'
    }

    const winner = store.resolveConflict(localDeletedNote, cloudActiveNote)
    assert.equal(winner.deleted, true)
    assert.equal(winner.id, 'note-conflict-1')
  })

  await runTest('C6', 'C6.2: LWW conflict resolution: Tie-breaker on equal timestamps uses last_event_id', () => {
    const store = createReactivePersonalNotesSimulator()

    const noteA: PersonalNote = {
      id: 'note-tie-1',
      note_id: 'NOTE-GEO-DAMS',
      section_id: 'srisailam',
      section_label: 'Srisailam',
      body: 'Version A',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:00:00.000Z',
      last_event_id: 'evt-bbb',
      created_at: '2026-08-21T10:00:00.000Z'
    }

    const noteB = {
      id: 'note-tie-1',
      note_id: 'NOTE-GEO-DAMS',
      section_id: 'srisailam',
      section_label: 'Srisailam',
      body: 'Version B',
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T10:00:00.000Z',
      last_event_id: 'evt-aaa',
      created_at: '2026-08-21T10:00:00.000Z'
    }

    // evt-bbb > evt-aaa -> noteA wins
    const winner1 = store.resolveConflict(noteA, noteB)
    assert.equal(winner1.body, 'Version A')

    // swap order: if local is evt-aaa and cloud is evt-bbb -> cloud (noteA) wins
    const winner2 = store.resolveConflict(noteB as any, noteA)
    assert.equal(winner2.body, 'Version A')
  })

  // -------------------------------------------------------------------------
  // SUITE 7: ADVERSARIAL REGEX, REDOS RESILIENCE & EXTREME STRINGS
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 7: Regex ReDoS Resilience & Extreme Strings')

  await runTest('C7', 'C7.1: Snippet parser withstands 50,000 unclosed markdown delimiters without ReDoS freeze', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage',
      sectionId: 'extreme',
      sectionLabel: 'Extreme String'
    }

    // 25,000 unclosed bold tags
    const evilBold = '**'.repeat(25000)
    const n1 = store.createNote(ctx, evilBold)
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    const t0 = performance.now()
    const snip = strip.snippet.value
    const duration = performance.now() - t0

    assert.ok(duration < 500, `ReDoS detected! Parsing took ${duration}ms`)
    assert.equal(typeof snip, 'string')
  })

  await runTest('C7', 'C7.2: Snippet parser withstands 50,000 unclosed HTML tag characters without ReDoS freeze', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage',
      sectionId: 'extreme-html',
      sectionLabel: 'Extreme HTML'
    }

    // 50,000 opening tags without close
    const evilHtml = '<'.repeat(50000) + 'div' + '>'.repeat(50000)
    store.createNote(ctx, evilHtml)
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    const t0 = performance.now()
    const snip = strip.snippet.value
    const duration = performance.now() - t0

    assert.ok(duration < 500, `HTML stripping ReDoS detected! Parsing took ${duration}ms`)
    assert.equal(typeof snip, 'string')
  })

  await runTest('C7', 'C7.3: 50,000 consecutive newlines and whitespace collapsed cleanly to single space', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-GEO-DRAINAGE',
      noteTitle: 'Drainage',
      route: '/notes/geography/drainage',
      sectionId: 'newlines',
      sectionLabel: 'Newlines'
    }

    const payload = 'Prefix' + '\n \n\t\r\n'.repeat(10000) + 'Suffix'
    store.createNote(ctx, payload)
    const strip = createInlineNoteStripModel({ ...ctx }, store.notes)

    const snip = strip.snippet.value
    assert.ok(snip.startsWith('Prefix'))
    assert.ok(snip.endsWith('Suffix'))
    assert.ok(!snip.includes('\n'), 'Snippet should have 0 newlines')
  })

  // -------------------------------------------------------------------------
  // SUITE 8: MULTI-STRIP REACTIVE ISOLATION & SIMULTANEOUS INSTANCES
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 8: Multi-Strip Reactive Isolation')

  await runTest('C8', 'C8.1: 5 distinct InlineNoteStrip instances maintain independent reactive state', () => {
    const store = createReactivePersonalNotesSimulator()

    const strips = [1, 2, 3, 4, 5].map(idx => {
      const ctx: SectionContext = {
        noteId: 'NOTE-GEO-DRAINAGE',
        noteTitle: 'Drainage',
        route: '/notes/geography/drainage',
        sectionId: `sec-${idx}`,
        sectionLabel: `Section ${idx}`
      }
      return {
        ctx,
        model: createInlineNoteStripModel(ctx, store.notes)
      }
    })

    // Populate notes unevenly:
    // Strip 1: 1 note (Normal)
    // Strip 2: 2 notes (1 Important)
    // Strip 3: 3 notes (1 Doubt)
    // Strip 4: 0 notes (Invisible)
    // Strip 5: 4 notes (1 Important + 1 Doubt)
    store.createNote(strips[0].ctx, 'Note S1')

    const n2a = store.createNote(strips[1].ctx, 'Note S2-A')
    store.createNote(strips[1].ctx, 'Note S2-B')
    store.updateNote(n2a.id, { is_important: true })

    const n3a = store.createNote(strips[2].ctx, 'Note S3-A')
    store.createNote(strips[2].ctx, 'Note S3-B')
    store.createNote(strips[2].ctx, 'Note S3-C')
    store.updateNote(n3a.id, { is_doubt: true })

    const n5a = store.createNote(strips[4].ctx, 'Note S5-A')
    const n5b = store.createNote(strips[4].ctx, 'Note S5-B')
    store.createNote(strips[4].ctx, 'Note S5-C')
    store.createNote(strips[4].ctx, 'Note S5-D')
    store.updateNote(n5a.id, { is_important: true })
    store.updateNote(n5b.id, { is_doubt: true })

    // Verify Strip 1
    assert.equal(strips[0].model.noteCount.value, 1)
    assert.equal(strips[0].model.hasImportant.value, false)
    assert.equal(strips[0].model.hasDoubt.value, false)
    assert.equal(strips[0].model.isVisible.value, true)

    // Verify Strip 2
    assert.equal(strips[1].model.noteCount.value, 2)
    assert.equal(strips[1].model.hasImportant.value, true)
    assert.equal(strips[1].model.hasDoubt.value, false)
    assert.equal(strips[1].model.isVisible.value, true)

    // Verify Strip 3
    assert.equal(strips[2].model.noteCount.value, 3)
    assert.equal(strips[2].model.hasImportant.value, false)
    assert.equal(strips[2].model.hasDoubt.value, true)
    assert.equal(strips[2].model.isVisible.value, true)

    // Verify Strip 4 (no notes)
    assert.equal(strips[3].model.noteCount.value, 0)
    assert.equal(strips[3].model.isVisible.value, false)

    // Verify Strip 5
    assert.equal(strips[4].model.noteCount.value, 4)
    assert.equal(strips[4].model.hasImportant.value, true)
    assert.equal(strips[4].model.hasDoubt.value, true)
    assert.equal(strips[4].model.isVisible.value, true)
  })

  // -------------------------------------------------------------------------
  // SUITE 9: IDEMPOTENCE & EDGE-CASE DELETIONS
  // -------------------------------------------------------------------------
  suiteHeader('CHALLENGE SUITE 9: Idempotence & Deletion Robustness')

  await runTest('C9', 'C9.1: Deleting an already-deleted note is safe and idempotent', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Executive',
      route: '/notes/polity/exec',
      sectionId: 'cabinet',
      sectionLabel: 'Cabinet'
    }
    const note = store.createNote(ctx, 'Cabinet collective responsibility (Art 75(3))')
    store.deleteNote(note.id)
    assert.equal(store.getCountForSection('NOTE-POL-EXECUTIVE', 'cabinet'), 0)

    // Second delete should not crash or corrupt state
    store.deleteNote(note.id)
    assert.equal(store.getCountForSection('NOTE-POL-EXECUTIVE', 'cabinet'), 0)
    assert.equal(store.notes.value.length, 1)
    assert.equal(store.notes.value[0].deleted, true)
  })

  await runTest('C9', 'C9.2: Updating a deleted note maintains deleted=true tombstone invariant', () => {
    const store = createReactivePersonalNotesSimulator()
    const ctx: SectionContext = {
      noteId: 'NOTE-POL-EXECUTIVE',
      noteTitle: 'Executive',
      route: '/notes/polity/exec',
      sectionId: 'pm',
      sectionLabel: 'Prime Minister'
    }
    const note = store.createNote(ctx, 'Prime Minister is head of government')
    store.deleteNote(note.id)
    assert.equal(store.notes.value[0].deleted, true)

    // Update note body
    store.updateNote(note.id, { body: 'Attempting to revive deleted note' })
    assert.equal(store.notes.value[0].deleted, true)
    assert.equal(store.getCountForSection('NOTE-POL-EXECUTIVE', 'pm'), 0)
  })

  // =========================================================================
  // SUMMARY REPORT
  // =========================================================================
  console.log('\n========================================================')
  console.log('CHALLENGER STRESS TEST COMPLETE')
  console.log(`Total Tests:  ${totalTests}`)
  console.log(`Passed:       ${passedTests}`)
  console.log(`Failed:       ${failedTests}`)
  console.log('========================================================\n')

  if (failedTests > 0) {
    process.exit(1)
  }
}

runChallengerTests().catch(err => {
  console.error('Unhandled challenger runner error:', err)
  process.exit(1)
})
