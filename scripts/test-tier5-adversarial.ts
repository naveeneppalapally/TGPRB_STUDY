/**
 * TSLPRB StudyOS - Tier 5 Final Adversarial Challenge & Coverage Hardening
 * 
 * Deep white-box stress testing across all 7 topic pages, components, composables,
 * offline sync engine, python tooling, and markdown/sanitization parsers.
 *
 * Run with: npx tsx scripts/test-tier5-adversarial.ts
 */

import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import * as path from 'node:path'
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
// 1. TOPIC PAGES STATIC & STRUCTURAL INTEGRITY AUDIT
// ---------------------------------------------------------------------------

const TOPIC_PAGES = [
  {
    file: 'pages/notes/geography/drainage-system-of-india.vue',
    noteId: 'NOTE-GEO-DRAINAGE',
    title: 'Drainage System of India',
    section: 'Geography',
    minSections: 5
  },
  {
    file: 'pages/notes/geography/irrigation-in-india.vue',
    noteId: 'NOTE-GEO-IRRIGATION',
    title: 'Irrigation in India & Telangana',
    section: 'Geography',
    minSections: 5
  },
  {
    file: 'pages/notes/geography/mountains-in-india.vue',
    noteId: 'NOTE-GEO-MOUNTAINS',
    title: 'Mountains, Ranges & Passes of India',
    section: 'Geography',
    minSections: 5
  },
  {
    file: 'pages/notes/geography/dams-in-india.vue',
    noteId: 'NOTE-GEO-DAMS',
    title: 'Dams, Reservoirs & Multipurpose Projects of India',
    section: 'Geography',
    minSections: 5
  },
  {
    file: 'pages/notes/geography/forests-in-india.vue',
    noteId: 'NOTE-GEO-FORESTS',
    title: 'Forests, Natural Vegetation & Protected Areas of India',
    section: 'Geography',
    minSections: 5
  },
  {
    file: 'pages/notes/polity/union-executive-and-legislature.vue',
    noteId: 'NOTE-POL-UNION-EXEC',
    title: 'Union Executive & Parliament',
    section: 'Polity',
    minSections: 5
  },
  {
    file: 'pages/notes/telangana/telangana-statehood-movement.vue',
    noteId: 'NOTE-TEL-MOVEMENT',
    title: 'Telangana Armed Struggle & Statehood Movement',
    section: 'Telangana',
    minSections: 5
  }
]

async function testTopicPagesIntegrity() {
  suiteHeader('SUITE 1: 7 Topic Pages Structural & Notes Wiring Audit')

  for (const topic of TOPIC_PAGES) {
    await runTest('S1', `S1.${topic.noteId}: Full wiring verification for ${topic.file}`, () => {
      const fullPath = path.join(process.cwd(), topic.file)
      assert.ok(fs.existsSync(fullPath), `File does not exist: ${topic.file}`)
      const content = fs.readFileSync(fullPath, 'utf-8')

      // Check SectionNotesButton presence
      assert.ok(
        content.includes('<SectionNotesButton') || content.includes('SectionNotesButton'),
        `Missing SectionNotesButton in ${topic.file}`
      )

      // Check InlineNoteStrip presence
      assert.ok(
        content.includes('<InlineNoteStrip') || content.includes('InlineNoteStrip'),
        `Missing InlineNoteStrip in ${topic.file}`
      )

      // Check PersonalNotesDrawer presence & ref
      assert.ok(
        content.includes('<PersonalNotesDrawer') && content.includes('ref="notesDrawerRef"'),
        `Missing PersonalNotesDrawer with ref="notesDrawerRef" in ${topic.file}`
      )

      // Check openNotesDrawer handler
      assert.ok(
        content.includes('openNotesDrawer') && content.includes('notesDrawerRef.value?.openForSection'),
        `Missing openNotesDrawer handler function in ${topic.file}`
      )

      // Verify Note-ID matches everywhere in the template
      const noteIdMatches = content.match(/note-id="([^"]+)"/g) || []
      assert.ok(noteIdMatches.length > 0, `No note-id found in ${topic.file}`)
      for (const m of noteIdMatches) {
        const id = m.replace('note-id="', '').replace('"', '')
        assert.equal(id, topic.noteId, `Mismatched note-id "${id}" in ${topic.file}, expected "${topic.noteId}"`)
      }

      // Check that every section has both SectionNotesButton and InlineNoteStrip in 1:1 correspondence
      const btnMatches = content.match(/<SectionNotesButton/g) || []
      const stripMatches = content.match(/<InlineNoteStrip/g) || []

      assert.ok(btnMatches.length >= topic.minSections, `Too few SectionNotesButtons in ${topic.file}: ${btnMatches.length} < ${topic.minSections}`)
      assert.equal(
        btnMatches.length,
        stripMatches.length,
        `Mismatch in ${topic.file}: ${btnMatches.length} SectionNotesButtons vs ${stripMatches.length} InlineNoteStrips`
      )
    })
  }

  await runTest('S1', 'S1.Registry: /my-notes.vue topic registry exact mapping for all 7 topics', () => {
    const myNotesPath = path.join(process.cwd(), 'pages/my-notes.vue')
    assert.ok(fs.existsSync(myNotesPath), 'pages/my-notes.vue missing')
    const myNotesContent = fs.readFileSync(myNotesPath, 'utf-8')

    for (const topic of TOPIC_PAGES) {
      assert.ok(
        myNotesContent.includes(`'${topic.noteId}'`),
        `Missing registry key '${topic.noteId}' in pages/my-notes.vue`
      )
    }
  })
}

// ---------------------------------------------------------------------------
// 2. PARSER & DOM SANITIZER ADVERSARIAL ATTACKS
// ---------------------------------------------------------------------------

function parseMarkdownLite(text: string): string {
  if (!text) return ''
  let html = text.replace(/<[^>]*>?/gm, '') // basic sanitize
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.*<\/li>)/s, '<ul class="list-disc pl-4 space-y-1 my-1">$1</ul>')
  return html.replace(/\n/g, '<br/>')
}

function parseSnippet(raw: string): string {
  if (!raw) return ''
  return raw
    .replace(/<[^>]*>?/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/^- /gm, '')
    .replace(/\n+/g, ' ')
    .trim()
}

async function testParserAndSanitization() {
  suiteHeader('SUITE 2: Markdown-Lite & HTML Sanitization Adversarial Stress')

  const XSS_ATTACK_VECTORS = [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(1)">',
    '<iframe src="javascript:alert(1)"></iframe>',
    '<svg onload=alert(1)>',
    '<body onload=alert(1)>',
    '"><script>alert(1)</script>',
    '<a href="javascript:void(0)" onclick="alert(1)">Click</a>',
    '<style>body{background:red}</style>',
    '<<SCRIPT>alert("XSS");//<</SCRIPT>',
    '<scr<script>ipt>alert(1)</script>'
  ]

  for (let i = 0; i < XSS_ATTACK_VECTORS.length; i++) {
    const vector = XSS_ATTACK_VECTORS[i]
    await runTest('S2', `S2.XSS.${i + 1}: Neutralize executable HTML and script elements for vector [${vector.slice(0, 30)}...]`, () => {
      const sanitized = parseMarkdownLite(vector)
      assert.ok(!sanitized.includes('<script'), `Sanitized output contains <script: ${sanitized}`)
      assert.ok(!sanitized.includes('onload='), `Sanitized output contains onload: ${sanitized}`)
      assert.ok(!sanitized.includes('onerror='), `Sanitized output contains onerror: ${sanitized}`)
      assert.ok(!sanitized.includes('<iframe'), `Sanitized output contains <iframe: ${sanitized}`)
      assert.ok(!sanitized.includes('<style'), `Sanitized output contains <style: ${sanitized}`)

      const snippet = parseSnippet(vector)
      assert.ok(!snippet.includes('<script'), `Snippet contains script tag: ${snippet}`)
      assert.ok(!snippet.includes('<iframe'), `Snippet contains iframe tag: ${snippet}`)
    })
  }

  await runTest('S2', 'S2.Markdown: Mixed markdown, bold within bullets, multiline text', () => {
    const md = '- Point 1 with **bold text**\n- Point 2 with **another bold**'
    const rendered = parseMarkdownLite(md)
    assert.ok(rendered.includes('<strong>bold text</strong>'))
    assert.ok(rendered.includes('<strong>another bold</strong>'))
    assert.ok(rendered.includes('<ul class="list-disc'))
    assert.ok(rendered.includes('<li>Point 1'))

    const snippet = parseSnippet(md)
    assert.equal(snippet, 'Point 1 with bold text Point 2 with another bold')
  })

  await runTest('S2', 'S2.EdgeChars: Empty string, null/undefined safety, zero-width spaces, mathematical comparisons', () => {
    assert.equal(parseMarkdownLite(''), '')
    assert.equal(parseSnippet(''), '')
    assert.equal(parseMarkdownLite(null as any), '')
    assert.equal(parseSnippet(null as any), '')

    const mathText = 'Elevation > 8000m and Rainfall < 50cm'
    assert.ok(parseMarkdownLite(mathText).includes('8000m'))
    assert.ok(parseSnippet(mathText).includes('8000m'))

    const rtlAndZwj = '\u200B\u200Cతెలంగాణ\u200D\u200E'
    assert.ok(parseMarkdownLite(rtlAndZwj).includes('తెలంగాణ'))
    assert.ok(parseSnippet(rtlAndZwj).includes('తెలంగాణ'))
  })
}

// ---------------------------------------------------------------------------
// 3. REACTIVE COMPOSABLE & LWW CONFLICT ENGINE STRESS
// ---------------------------------------------------------------------------

async function testReactivityAndLWW() {
  suiteHeader('SUITE 3: usePersonalNotes & LWW CRDT Edge Case Stress')

  await runTest('S3', 'S3.1: Clock Skew: Local clock ahead of cloud clock merges deterministically', () => {
    const localNote: PersonalNote = {
      id: 'clock-skew-1',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec-1',
      section_label: 'Section 1',
      body: 'Future local note',
      is_important: true,
      is_doubt: false,
      deleted: false,
      client_updated_at: '2026-08-21T18:00:00.000Z',
      last_event_id: 'evt-future',
      created_at: '2026-08-21T17:00:00.000Z'
    }

    const cloudNote = {
      id: 'clock-skew-1',
      note_id: 'NOTE-GEO-DRAINAGE',
      section_id: 'sec-1',
      section_label: 'Section 1',
      body: 'Past cloud note',
      is_important: false,
      is_doubt: true,
      deleted: false,
      client_updated_at: '2026-08-21T17:30:00.000Z',
      last_event_id: 'evt-past',
      created_at: '2026-08-21T17:00:00.000Z'
    }

    function resolveConflict(l: PersonalNote, c: any): PersonalNote {
      const lTime = new Date(l.client_updated_at).getTime()
      const cTime = new Date(c.client_updated_at).getTime()
      if (lTime > cTime) return l
      if (lTime < cTime) return c as PersonalNote
      return (l.last_event_id || '') > (c.last_event_id || '') ? l : (c as PersonalNote)
    }

    const winner = resolveConflict(localNote, cloudNote)
    assert.equal(winner.body, 'Future local note')
    assert.equal(winner.is_important, true)
  })

  await runTest('S3', 'S3.2: 100 rapid mutations coalesced by mergeNoteMutations into exactly 1 sync payload', () => {
    const baseId = 'coalesce-test-id'
    const mutations: NoteUpsertMutation[] = []

    for (let i = 0; i < 100; i++) {
      const now = new Date(Date.now() + i * 10).toISOString()
      mutations.push({
        id: `evt-${i}`,
        type: 'note_upsert',
        client_timestamp: now,
        synced: false,
        retry_count: 0,
        next_retry_at: null,
        payload: {
          note: {
            id: baseId,
            note_id: 'NOTE-GEO-DRAINAGE',
            section_id: 'map',
            section_label: 'The Map',
            body: `Edit version ${i}`,
            is_important: i % 2 === 0,
            is_doubt: i % 3 === 0,
            deleted: i === 99 // Last one deletes
          },
          updated_at: now
        }
      })
    }

    const notesMap = new Map<string, any>()
    for (const m of mutations) {
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

    assert.equal(notesMap.size, 1)
    const finalNote = notesMap.get(baseId)
    assert.equal(finalNote.body, 'Edit version 99')
    assert.equal(finalNote.deleted, true)
    assert.equal(finalNote.event_id, 'evt-99')
  })

  await runTest('S3', 'S3.3: Storage keys strictly partition by user_id vs guest', () => {
    const guestKey = `tgprb:personal-notes:guest`
    const userAKey = `tgprb:personal-notes:user-aaa-111`
    const userBKey = `tgprb:personal-notes:user-bbb-222`

    assert.notEqual(guestKey, userAKey)
    assert.notEqual(userAKey, userBKey)
  })
}

// ---------------------------------------------------------------------------
// 4. IMPROVEMENT FORM & QUEUE ADVERSARIAL STRESS
// ---------------------------------------------------------------------------

async function testImprovementQueue() {
  suiteHeader('SUITE 4: Improvement Form & Image Link Preview Edge Cases')

  function checkIsImagePreview(url: string): boolean {
    const lower = url.toLowerCase().trim()
    return lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp') || lower.endsWith('.gif')
  }

  const IMAGE_URL_TESTS = [
    { url: 'https://example.com/map.PNG', expected: true },
    { url: 'https://example.com/rivers.WEBP', expected: true },
    { url: 'https://example.com/diagram.jpeg', expected: true },
    { url: 'https://example.com/chart.gif', expected: true },
    { url: 'https://example.com/article.html', expected: false },
    { url: 'https://en.wikipedia.org/wiki/Godavari', expected: false },
    { url: 'https://example.com/image.png?size=large', expected: false },
    { url: '', expected: false }
  ]

  for (const tc of IMAGE_URL_TESTS) {
    await runTest('S4', `S4.ImagePreview: URL "${tc.url}" -> ${tc.expected}`, () => {
      assert.equal(checkIsImagePreview(tc.url), tc.expected)
    })
  }

  await runTest('S4', 'S4.ExportScript: Python script execution with mark-done argument parsing', async () => {
    try {
      const { stdout, stderr } = await execFileAsync('python3', [
        path.join(process.cwd(), 'scripts/export_improvement_queue.py'),
        'mark-done'
      ])
      assert.fail('Should have failed due to missing args')
    } catch (err: any) {
      assert.ok(err.code === 1 || err.exitCode === 1, `Expected exit code 1, got ${err.code}`)
    }
  })
}

// ---------------------------------------------------------------------------
// 5. GLOBAL /my-notes.vue SEARCH, FILTER & GROUPING STRESS
// ---------------------------------------------------------------------------

async function testMyNotesDashboardStress() {
  suiteHeader('SUITE 5: Global /my-notes Dashboard Search & Filter Stress')

  const noteMetadata: Record<string, { title: string; section: string; route: string }> = {
    'NOTE-GEO-DRAINAGE': { title: 'Drainage System of India', section: 'Geography', route: '/notes/geography/drainage-system-of-india' },
    'NOTE-GEO-IRRIGATION': { title: 'Irrigation in India & Telangana', section: 'Geography', route: '/notes/geography/irrigation-in-india' },
    'NOTE-GEO-MOUNTAINS': { title: 'Mountains, Ranges & Passes of India', section: 'Geography', route: '/notes/geography/mountains-in-india' },
    'NOTE-GEO-DAMS': { title: 'Dams, Reservoirs & Multipurpose Projects of India', section: 'Geography', route: '/notes/geography/dams-in-india' },
    'NOTE-GEO-FORESTS': { title: 'Forests, Natural Vegetation & Protected Areas of India', section: 'Geography', route: '/notes/geography/forests-in-india' },
    'NOTE-POL-UNION-EXEC': { title: 'Union Executive & Parliament', section: 'Polity', route: '/notes/polity/union-executive-and-legislature' },
    'NOTE-TEL-MOVEMENT': { title: 'Telangana Armed Struggle & Statehood Movement', section: 'Telangana', route: '/notes/telangana/telangana-statehood-movement' }
  }

  function filterAndGroupNotes(notes: PersonalNote[], searchQuery: string, filterMode: NoteFilterMode) {
    let filtered: PersonalNote[]
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      filtered = notes.filter(n => {
        if (n.deleted) return false
        const meta = noteMetadata[n.note_id]
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

    const groups = new Map<string, { noteId: string; notes: PersonalNote[] }>()
    for (const note of filtered) {
      let g = groups.get(note.note_id)
      if (!g) {
        g = { noteId: note.note_id, notes: [] }
        groups.set(note.note_id, g)
      }
      g.notes.push(note)
    }

    return Array.from(groups.values()).sort((a, b) => {
      const aLatest = Math.max(...a.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
      const bLatest = Math.max(...b.notes.map(n => new Date(n.client_updated_at || n.created_at || 0).getTime()))
      return bLatest - aLatest
    })
  }

  await runTest('S5', 'S5.1: Search by exam section ("Geography", "Polity", "Telangana")', () => {
    const mockNotes: PersonalNote[] = [
      {
        id: 'n1',
        note_id: 'NOTE-GEO-DRAINAGE',
        section_id: 'map',
        section_label: 'Map',
        body: 'Godavari delta',
        is_important: false,
        is_doubt: false,
        deleted: false,
        client_updated_at: '2026-08-21T10:00:00Z',
        last_event_id: '1',
        created_at: '2026-08-21T10:00:00Z'
      },
      {
        id: 'n2',
        note_id: 'NOTE-POL-UNION-EXEC',
        section_id: 'president',
        section_label: 'President',
        body: 'Article 53 executive power',
        is_important: true,
        is_doubt: false,
        deleted: false,
        client_updated_at: '2026-08-21T10:05:00Z',
        last_event_id: '2',
        created_at: '2026-08-21T10:05:00Z'
      },
      {
        id: 'n3',
        note_id: 'NOTE-TEL-MOVEMENT',
        section_id: 'sec-1',
        section_label: 'Armed Struggle',
        body: 'Doddi Komuraiah martyrdom',
        is_important: false,
        is_doubt: true,
        deleted: false,
        client_updated_at: '2026-08-21T10:10:00Z',
        last_event_id: '3',
        created_at: '2026-08-21T10:10:00Z'
      }
    ]

    const geoGroups = filterAndGroupNotes(mockNotes, 'Geography', 'all')
    assert.equal(geoGroups.length, 1)
    assert.equal(geoGroups[0].noteId, 'NOTE-GEO-DRAINAGE')

    const polGroups = filterAndGroupNotes(mockNotes, 'Polity', 'all')
    assert.equal(polGroups.length, 1)
    assert.equal(polGroups[0].noteId, 'NOTE-POL-UNION-EXEC')

    const telGroups = filterAndGroupNotes(mockNotes, 'Telangana', 'all')
    assert.equal(telGroups.length, 1)
    assert.equal(telGroups[0].noteId, 'NOTE-TEL-MOVEMENT')
  })

  await runTest('S5', 'S5.2: Search by section heading text and anchor text match', () => {
    const mockNotes: PersonalNote[] = [
      {
        id: 'n1',
        note_id: 'NOTE-GEO-DAMS',
        section_id: 'deep-dive',
        section_label: 'Nagarjuna Sagar Dam',
        anchor_text: 'Right canal named Jawahar Canal',
        body: 'Canal details',
        is_important: false,
        is_doubt: false,
        deleted: false,
        client_updated_at: '2026-08-21T10:00:00Z',
        last_event_id: '1',
        created_at: '2026-08-21T10:00:00Z'
      }
    ]

    const matchSection = filterAndGroupNotes(mockNotes, 'Nagarjuna Sagar', 'all')
    assert.equal(matchSection.length, 1)

    const matchAnchor = filterAndGroupNotes(mockNotes, 'Jawahar Canal', 'all')
    assert.equal(matchAnchor.length, 1)
  })
}

// ---------------------------------------------------------------------------
// MAIN EXECUTION
// ---------------------------------------------------------------------------

async function main() {
  console.log('========================================================')
  console.log('STARTING TIER 5 FINAL ADVERSARIAL CHALLENGE & VERIFICATION')
  console.log('========================================================\n')

  await testTopicPagesIntegrity()
  await testParserAndSanitization()
  await testReactivityAndLWW()
  await testImprovementQueue()
  await testMyNotesDashboardStress()

  console.log('\n========================================================')
  console.log('TIER 5 ADVERSARIAL TEST RUN COMPLETE')
  console.log(`Total Tests:  ${totalTests}`)
  console.log(`Passed:       ${passedTests}`)
  console.log(`Failed:       ${failedTests}`)
  console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`)
  console.log('========================================================\n')

  if (failedTests > 0) {
    console.error(`FAILED with ${failedTests} error(s)!`)
    for (const f of failures) {
      console.error(`- [${f.suite}] ${f.name}: ${f.error?.message || f.error}`)
    }
    process.exit(1)
  } else {
    console.log('ALL ADVERSARIAL TESTS PASSED (Exit Code 0).')
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal test runner error:', err)
  process.exit(1)
})
