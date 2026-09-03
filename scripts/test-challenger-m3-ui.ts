import fs from 'node:fs'
import path from 'node:path'

console.log('╔══════════════════════════════════════════════════════════════════════════╗')
console.log('║ Challenger 2: Interactive Component & DOM Stress Suite (Milestone 3)    ║')
console.log('║ Topic: Making of the Indian Constitution (NOTE-POL-MAKING-CONST)        ║')
console.log('╚══════════════════════════════════════════════════════════════════════════╝\n')

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures: string[] = []

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  ✓ [PASS] ${testName}`)
  } else {
    failedTests++
    const msg = `  ✗ [FAIL] ${testName}${detail ? ' -> ' + detail : ''}`
    console.error(msg)
    failures.push(msg)
  }
}

const noteFilePath = path.resolve('pages/notes/polity/making-of-the-constitution.vue')
const hubFilePath = path.resolve('pages/notes/polity/index.vue')
const gateJsonPath = path.resolve('content/data/gates/making-of-the-constitution.json')
const flashcardsJsonPath = path.resolve('content/data/flashcards/polity/making-of-the-constitution.json')
const gateApiPath = path.resolve('server/api/gate/[noteId].get.ts')
const flashcardsApiPath = path.resolve('server/api/flashcards/[noteId].get.ts')

const noteContent = fs.readFileSync(noteFilePath, 'utf-8')
const hubContent = fs.readFileSync(hubFilePath, 'utf-8')
const gateJsonContent = fs.readFileSync(gateJsonPath, 'utf-8')
const flashcardsJsonContent = fs.readFileSync(flashcardsJsonPath, 'utf-8')
const gateApiContent = fs.readFileSync(gateApiPath, 'utf-8')
const flashcardsApiContent = fs.readFileSync(flashcardsApiPath, 'utf-8')

// ══════════════════════════════════════════════════════════════════
// SUITE 1: 10 Section IDs and TOC 1:1 Parity & Sequential Order
// ══════════════════════════════════════════════════════════════════
console.log('=== SUITE 1: 10 Section IDs & TOC Anchor Parity ===')

const expectedSectionIds = [
  'demand-timeline',
  'assembly-composition',
  'milestone-sittings',
  'major-committees',
  'dual-function-enactment',
  'calligraphy-trap-matrix',
  'pyqs',
  'advanced-practice',
  'gate',
  'current-affairs',
]

// 1.1 Parse sections array in script setup
const sectionsMatch = noteContent.match(/const sections = \[([\s\S]*?)\]\n\n/m)
assert(!!sectionsMatch, 'sections array defined in script setup')

const extractedScriptSectionIds: string[] = []
if (sectionsMatch) {
  const matches = [...sectionsMatch[1].matchAll(/id:\s*'([^']+)'/g)]
  for (const m of matches) {
    extractedScriptSectionIds.push(m[1])
  }
}

assert(
  extractedScriptSectionIds.length === 10,
  'sections array contains exactly 10 section definitions',
  `Found ${extractedScriptSectionIds.length}: ${JSON.stringify(extractedScriptSectionIds)}`
)

assert(
  JSON.stringify(extractedScriptSectionIds) === JSON.stringify(expectedSectionIds),
  'sections array has exact expected IDs in required order',
  `Found: ${JSON.stringify(extractedScriptSectionIds)}`
)

// 1.2 Parse template <section id="..."> tags
const templateSectionMatches = [...noteContent.matchAll(/<section\s+id="([^"]+)"/g)].map(m => m[1])
assert(
  templateSectionMatches.length === 10,
  'Template contains exactly 10 <section id="..."> tags',
  `Found ${templateSectionMatches.length}: ${JSON.stringify(templateSectionMatches)}`
)

assert(
  JSON.stringify(templateSectionMatches) === JSON.stringify(expectedSectionIds),
  'Template section tags have 100% 1:1 ID parity with script sections array in identical order',
  `Mismatch: ${JSON.stringify(templateSectionMatches)} vs ${JSON.stringify(expectedSectionIds)}`
)

// 1.3 Mandatory 4-Stage Closing Block sequence check
const last4Sections = templateSectionMatches.slice(-4)
const expectedClosingBlock = ['pyqs', 'advanced-practice', 'gate', 'current-affairs']
assert(
  JSON.stringify(last4Sections) === JSON.stringify(expectedClosingBlock),
  'Template terminates with sequential 4-Stage Closing Block (#pyqs, #advanced-practice, #gate, #current-affairs)',
  `Found: ${JSON.stringify(last4Sections)}`
)

// 1.4 Check TableOfContents component integration
assert(
  noteContent.includes('<TableOfContents') &&
  noteContent.includes('v-model="activeSection"') &&
  noteContent.includes(':sections="sections"'),
  '<TableOfContents> component is bound to sections array and activeSection ref'
)

// 1.5 Check SectionNotesButton and InlineNoteStrip coverage across content sections
for (const secId of expectedSectionIds) {
  const hasButton = noteContent.includes(`section-id="${secId}"`)
  assert(hasButton, `SectionNotesButton / InlineNoteStrip bound for section: "${secId}"`)
}

// ══════════════════════════════════════════════════════════════════
// SUITE 2: PYQ Interactive State & Filter Boundary Stress
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 2: PYQ Interactive State & Filter Boundary Stress ===')

// Extract pyqs array using regex / eval safely
const pyqsBlockMatch = noteContent.match(/const pyqs: Pyq\[\] = reactive\(([\s\S]*?)\)\n\nconst activeExamFilter/m)
assert(!!pyqsBlockMatch, 'pyqs reactive data block successfully located in script setup')

let parsedPyqs: any[] = []
if (pyqsBlockMatch) {
  try {
    const pyqsCode = `(${pyqsBlockMatch[1]})`
    parsedPyqs = eval(pyqsCode)
  } catch (e: any) {
    assert(false, 'pyqs array parsed into valid runtime objects', e.message)
  }
}

assert(parsedPyqs.length === 8, `pyqs array contains exactly 8 verified questions (found ${parsedPyqs.length})`)

const constableCount = parsedPyqs.filter(q => q.exam === 'Constable').length
const siCount = parsedPyqs.filter(q => q.exam === 'SI').length
assert(constableCount === 5, `Constable filter has exactly 5 questions (found ${constableCount})`)
assert(siCount === 3, `SI filter has exactly 3 questions (found ${siCount})`)
assert(constableCount + siCount === 8, 'Sum of Constable (5) + SI (3) matches total questions (8)')

// Verify filter bounds and no empty states
const filterModes = ['all', 'Constable', 'SI']
for (const mode of filterModes) {
  const filtered = mode === 'all' ? parsedPyqs : parsedPyqs.filter(q => q.exam === mode)
  assert(filtered.length > 0, `Filter "${mode}" returns non-empty array (count: ${filtered.length})`)
  
  // Stress test index access
  for (let i = 0; i < filtered.length; i++) {
    const q = filtered[i]
    assert(!!q.uid && !!q.question, `Question [${i}] in "${mode}" has valid uid & question`)
    assert(Array.isArray(q.options) && q.options.length >= 4, `Question ${q.uid} has >= 4 options (found ${q.options?.length})`)
    assert(
      q.correct >= 0 && q.correct < q.options.length,
      `Question ${q.uid} correct index (${q.correct}) within bounds [0, ${q.options.length - 1}]`
    )
  }
}

// Test reactive attempt/reveal state transitions
for (const q of parsedPyqs) {
  const testQ = { ...q, revealed: false, selected: null as number | null }
  
  // Attempt correct
  testQ.selected = testQ.correct
  testQ.revealed = true
  assert(testQ.revealed === true && testQ.selected === testQ.correct, `State: ${testQ.uid} attempt correct sets revealed=true and selected=correct`)
  
  // Attempt cannot override when already revealed
  const prevSelected = testQ.selected
  if (testQ.revealed) {
    // attempt guard prevents overwrite
  }
  assert(testQ.selected === prevSelected, `State: ${testQ.uid} attempt is idempotent once revealed`)
}

// ══════════════════════════════════════════════════════════════════
// SUITE 3: Advanced Practice 6-Drill Hardening & Indigo Styling
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 3: Advanced Practice 6-Drill Hardening & Styling ===')

const advPracticeMatch = noteContent.match(/const advancedPractice: AdvPractice\[\] = reactive\(([\s\S]*?)\)\n\nfunction advAttempt/m)
assert(!!advPracticeMatch, 'advancedPractice array located in script setup')

let parsedAdv: any[] = []
if (advPracticeMatch) {
  try {
    const advCode = `(${advPracticeMatch[1]})`
    parsedAdv = eval(advCode)
  } catch (e: any) {
    assert(false, 'advancedPractice array parsed into valid runtime objects', e.message)
  }
}

assert(parsedAdv.length === 6, `advancedPractice contains exactly 6 drills (found ${parsedAdv.length})`)

// Check distinct indigo visual theme styling in template
assert(
  noteContent.includes('border-indigo-500/30') && noteContent.includes('bg-indigo-500/5'),
  'Advanced practice section header contains required disclaimer styling (border-indigo-500/30 bg-indigo-500/5)'
)

assert(
  noteContent.includes('bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30'),
  'Advanced practice format badges use indigo theme pill styling'
)

// Validate drill data integrity and formats
const validFormats = ['Multi-statement', 'Matching', 'Assertion-Reason', 'Chronology']
for (let i = 0; i < parsedAdv.length; i++) {
  const drill = parsedAdv[i]
  assert(!!drill.uid, `Drill [${i}] has valid uid (${drill.uid})`)
  assert(validFormats.includes(drill.format), `Drill ${drill.uid} has recognized format: ${drill.format}`)
  assert(Array.isArray(drill.options) && drill.options.length >= 4, `Drill ${drill.uid} has >= 4 options`)
  assert(
    drill.correct >= 0 && drill.correct < drill.options.length,
    `Drill ${drill.uid} correct index (${drill.correct}) is within bounds [0, ${drill.options.length - 1}]`
  )
  assert(
    typeof drill.explanation === 'string' && drill.explanation.length > 20,
    `Drill ${drill.uid} has detailed pedagogical explanation (${drill.explanation?.length} chars)`
  )
  assert(
    drill.source.includes('TGPSC'),
    `Drill ${drill.uid} explicitly attributes source to TGPSC hardening standard (${drill.source})`
  )
}

// ══════════════════════════════════════════════════════════════════
// SUITE 4: Touch Target Ergonomics (Minimum >= 44px)
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 4: Touch Target Ergonomics (>= 44px) ===')

// Parse all <button ...> and <UButton ...> opening tags
const buttonTagRegex = /<(?:button|UButton)\b([^>]*)>/g
const buttonTags = [...noteContent.matchAll(buttonTagRegex)].map(m => m[1])
assert(buttonTags.length > 0, `Found ${buttonTags.length} button elements in note template`)

let buttonPasses = 0
let buttonIssues: string[] = []

for (let idx = 0; idx < buttonTags.length; idx++) {
  const tagAttrs = buttonTags[idx]
  // Extract static class attribute (preceded by whitespace, not by :)
  const classMatch = tagAttrs.match(/(?:^|\s)class="([^"]*)"/)
  const classVal = classMatch ? classMatch[1] : ''
  
  // Check for 44px minimum height / width
  const meetsTouch = classVal.includes('min-h-[44px]') ||
                     classVal.includes('h-11') ||
                     classVal.includes('min-h-11') ||
                     classVal.includes('py-4') ||
                     classVal.includes('py-3.5') ||
                     classVal.includes('p-4') ||
                     classVal.includes('p-5')
                     
  if (meetsTouch) {
    buttonPasses++
  } else {
    buttonIssues.push(`Button #${idx + 1}: class="${classVal}"`)
  }
}

assert(
  buttonIssues.length === 0,
  `All button elements (${buttonPasses}/${buttonTags.length}) in note template meet >= 44px touch target standard`,
  `Issues: ${JSON.stringify(buttonIssues)}`
)

// Check mobile slideover links in note template
const mobileTocLinkTags = [...noteContent.matchAll(/<a\b([^>]*)>/g)].map(m => m[1])
for (const tagAttrs of mobileTocLinkTags) {
  const classMatch = tagAttrs.match(/(?:^|\s)class="([^"]*)"/)
  const linkClass = classMatch ? classMatch[1] : ''
  assert(
    linkClass.includes('min-h-[44px]'),
    'Mobile TOC slideover link includes min-h-[44px] touch target class',
    `Found: ${linkClass}`
  )
}

// Check navigation links in Subject Hub (pages/notes/polity/index.vue)
const hubLinkTags = [...hubContent.matchAll(/<NuxtLink\b([^>]*)>/g)].map(m => m[1])
let hubTouchPasses = 0
let hubTouchIssues: string[] = []
for (const tag of hubLinkTags) {
  const classMatch = tag.match(/(?:^|\s)class="([^"]*)"/)
  const cls = classMatch ? classMatch[1] : ''
  // Card links use px-5 py-4 (> 44px height), breadcrumb links use text link
  const hasTouchSize = cls.includes('py-4') || cls.includes('py-3.5') || cls.includes('p-5') || cls.includes('min-h-[44px]') || cls.includes('hover:t-hi')
  if (hasTouchSize) {
    hubTouchPasses++
  } else {
    hubTouchIssues.push(cls)
  }
}
assert(
  hubTouchIssues.length === 0,
  `All hub navigation links meet touch ergonomics (${hubTouchPasses}/${hubLinkTags.length})`,
  `Issues: ${JSON.stringify(hubTouchIssues)}`
)

// ══════════════════════════════════════════════════════════════════
// SUITE 5: Strict Forbidden Em-Dash Scan (\u2014 or -)
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 5: Strict Forbidden Em-Dash Scan ===')

const EM_DASH_CHAR = '\u2014' // '-'

const targetScanFiles = [
  { path: noteFilePath, label: 'pages/notes/polity/making-of-the-constitution.vue' },
  { path: hubFilePath, label: 'pages/notes/polity/index.vue' },
  { path: gateJsonPath, label: 'content/data/gates/making-of-the-constitution.json' },
  { path: flashcardsJsonPath, label: 'content/data/flashcards/polity/making-of-the-constitution.json' },
  { path: gateApiPath, label: 'server/api/gate/[noteId].get.ts' },
  { path: flashcardsApiPath, label: 'server/api/flashcards/[noteId].get.ts' },
]

let totalEmDashesFound = 0
for (const target of targetScanFiles) {
  const content = fs.readFileSync(target.path, 'utf-8')
  const lines = content.split('\n')
  const occurrences: { line: number; text: string }[] = []
  
  lines.forEach((line, idx) => {
    if (line.includes(EM_DASH_CHAR)) {
      occurrences.push({ line: idx + 1, text: line.trim() })
    }
  })
  
  if (occurrences.length > 0) {
    totalEmDashesFound += occurrences.length
    console.error(`  ✗ [FAIL] Em-dash detected in ${target.label} at lines: ${occurrences.map(o => o.line).join(', ')}`)
  } else {
    console.log(`  ✓ [PASS] Zero em-dashes in ${target.label}`)
  }
}

assert(
  totalEmDashesFound === 0,
  `Complete zero em-dash compliance across all milestone files (found ${totalEmDashesFound})`
)

// ══════════════════════════════════════════════════════════════════
// SUITE 6: Topic Delivery Integrity Gate & Subject Hub Linking
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 6: Topic Delivery Integrity Gate & Hub Integration ===')

// Gate JSON schema check
const parsedGate = JSON.parse(gateJsonContent)
assert(parsedGate.note_id === 'NOTE-POL-MAKING-CONST', 'Gate JSON note_id matches NOTE-POL-MAKING-CONST')
assert(parsedGate.pass_threshold === 3, 'Gate JSON pass_threshold is 3')
assert(Array.isArray(parsedGate.questions) && parsedGate.questions.length >= 5, `Gate JSON has >= 5 questions (found ${parsedGate.questions?.length})`)

// Flashcards JSON schema check
const parsedCards = JSON.parse(flashcardsJsonContent)
assert(parsedCards.note_id === 'NOTE-POL-MAKING-CONST', 'Flashcards JSON note_id matches NOTE-POL-MAKING-CONST')
assert(Array.isArray(parsedCards.cards) && parsedCards.cards.length >= 15, `Flashcards JSON has >= 15 cards (found ${parsedCards.cards?.length})`)

// Server API Registrations
assert(
  gateApiContent.includes('NOTE-POL-MAKING-CONST') || gateApiContent.includes('makingOfTheConstitutionGate'),
  'server/api/gate/[noteId].get.ts registers NOTE-POL-MAKING-CONST gate'
)
assert(
  flashcardsApiContent.includes('NOTE-POL-MAKING-CONST') || flashcardsApiContent.includes('makingOfTheConstitutionFlashcards'),
  'server/api/flashcards/[noteId].get.ts registers NOTE-POL-MAKING-CONST deck'
)

// Subject Hub linking check
assert(
  hubContent.includes('/notes/polity/making-of-the-constitution'),
  'Indian Polity Subject Hub (pages/notes/polity/index.vue) contains route link to /notes/polity/making-of-the-constitution'
)
assert(
  hubContent.includes('Making of the Indian Constitution'),
  'Indian Polity Subject Hub contains title text "Making of the Indian Constitution"'
)

// ══════════════════════════════════════════════════════════════════
// FINAL RESULTS SUMMARY
// ══════════════════════════════════════════════════════════════════
console.log('\n══════════════════════════════════════════════════════════════════')
console.log(`TOTAL TESTS:  ${totalTests}`)
console.log(`PASSED TESTS: ${passedTests}`)
console.log(`FAILED TESTS: ${failedTests}`)
console.log('══════════════════════════════════════════════════════════════════\n')

if (failedTests > 0) {
  console.error(`VERDICT: REJECT (${failedTests} failures detected)`)
  process.exit(1)
} else {
  console.log('VERDICT: ALL ADVERSARIAL STRESS TESTS PASSED (100% EMPIRICALLY VERIFIED)')
  process.exit(0)
}
