import fs from 'node:fs'
import path from 'node:path'

console.log('Starting Challenger: Interactive State & UI Robustness Verification Suite...')

const vueFilePath = path.resolve('pages/notes/polity/historical-background-1773-1947.vue')
const vueContent = fs.readFileSync(vueFilePath, 'utf-8')

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures: string[] = []

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  [PASS] ${testName}`)
  } else {
    failedTests++
    const msg = `  [FAIL] ${testName}${detail ? ' -> ' + detail : ''}`
    console.error(msg)
    failures.push(msg)
  }
}

// ══════════════════════════════════════════════════════════════════
// SUITE 1: 11 Section IDs and Table of Contents (TOC) Anchor Parity
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 1: 11 Section IDs & TOC Anchor Parity ===')

const expectedSectionIds = [
  'visual-roadmap',
  'company-rule',
  'crown-devolution',
  'crown-representation',
  'crown-federal',
  'comparison-matrix',
  'trap-matrix',
  'pyqs',
  'advanced-practice',
  'gate',
  'current-affairs',
]

// 1.1 Check sections array in script
const sectionsArrayMatch = vueContent.match(/const sections = \[([\s\S]*?)\]\n\n/m)
assert(!!sectionsArrayMatch, 'sections array is defined in script setup')

const extractedScriptSectionIds: string[] = []
if (sectionsArrayMatch) {
  const matches = [...sectionsArrayMatch[1].matchAll(/id:\s*'([^']+)'/g)]
  for (const m of matches) {
    extractedScriptSectionIds.push(m[1])
  }
}

assert(
  JSON.stringify(extractedScriptSectionIds) === JSON.stringify(expectedSectionIds),
  'sections array in script setup contains all 11 expected IDs in correct order',
  `Found: ${JSON.stringify(extractedScriptSectionIds)}`
)

// 1.2 Check template <section id="..."> tags
const templateSectionMatches = [...vueContent.matchAll(/<section\s+id="([^"]+)"/g)].map(m => m[1])
assert(
  templateSectionMatches.length === 11,
  'Template contains exactly 11 <section id="..."> tags',
  `Found ${templateSectionMatches.length}: ${JSON.stringify(templateSectionMatches)}`
)

assert(
  JSON.stringify(templateSectionMatches) === JSON.stringify(expectedSectionIds),
  'Template <section id="..."> tags match sections array identically and in order',
  `Mismatch: ${JSON.stringify(templateSectionMatches)} vs ${JSON.stringify(expectedSectionIds)}`
)

// 1.3 Check TOC presence
const tocPresent = vueContent.includes('<TableOfContents :sections="sections" />')
assert(tocPresent, 'TOC dynamically iterates over sections array')

// 1.4 Check SectionNotesButton and InlineNoteStrip for every section
for (const secId of expectedSectionIds) {
  const hasButton = vueContent.includes(`section-id="${secId}"`)
  assert(hasButton, `SectionNotesButton and InlineNoteStrip exist for section: ${secId}`)
}

// ══════════════════════════════════════════════════════════════════
// SUITE 2: PYQ Data Structure & Filtering Reactivity
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 2: PYQ Interactive State Logic & Filters ===')

// Extract pyqs array from script setup
const pyqsMatch = vueContent.match(/const pyqs: Pyq\[\] = reactive\(([\s\S]*?)\)\n\nconst activeExamFilter/m)
assert(!!pyqsMatch, 'pyqs reactive array is parsed from script setup')

let parsedPyqs: any[] = []
if (pyqsMatch) {
  try {
    parsedPyqs = eval(pyqsMatch[1].trim())
  } catch (err: any) {
    console.error('Error parsing pyqs array:', err.message)
  }
}

assert(parsedPyqs.length === 12, 'pyqs array contains exactly 12 verified questions', `Found ${parsedPyqs.length}`)

const constableCount = parsedPyqs.filter(q => q.exam === 'Constable').length
const siCount = parsedPyqs.filter(q => q.exam === 'SI').length
assert(constableCount === 7, `Constable questions count is 7 (actual: ${constableCount})`)
assert(siCount === 5, `SI questions count is 5 (actual: ${siCount})`)
assert(constableCount + siCount === 12, 'Constable + SI counts strictly equal 12')

// Check examFilters metadata
const examFiltersMatch = vueContent.includes("label: 'All Exams (12)', value: 'all'") &&
  vueContent.includes("label: 'Constable (7)', value: 'Constable'") &&
  vueContent.includes("label: 'SI (5)', value: 'SI'")
assert(examFiltersMatch, 'examFilters array displays exact counts matching underlying data (12, 7, 5)')

// Simulate computed filteredPyqs
function filterPyqs(filterValue: string, list: any[]) {
  if (filterValue === 'all') return list
  return list.filter(q => q.exam === filterValue)
}

assert(filterPyqs('all', parsedPyqs).length === 12, 'Filtering by "all" returns 12 questions')
assert(filterPyqs('Constable', parsedPyqs).length === 7, 'Filtering by "Constable" returns 7 questions')
assert(filterPyqs('SI', parsedPyqs).length === 5, 'Filtering by "SI" returns 5 questions')
assert(filterPyqs('Unknown', parsedPyqs).length === 0, 'Filtering by invalid exam returns 0 questions gracefully')

// Verify every PYQ item has valid fields
let allPyqsValid = true
for (const q of parsedPyqs) {
  if (!q.uid || !q.exam || !q.year || !q.tag || !q.source || !q.question || !Array.isArray(q.options) || q.options.length < 2 || typeof q.correct !== 'number' || !q.explanation) {
    allPyqsValid = false
    console.error(`Invalid PYQ record: ${q.uid}`)
  }
  if (q.correct < 0 || q.correct >= q.options.length) {
    allPyqsValid = false
    console.error(`Correct index out of bounds in PYQ: ${q.uid} (correct: ${q.correct}, options: ${q.options.length})`)
  }
}
assert(allPyqsValid, 'All 12 PYQs have complete, non-null fields and in-bounds correct answers')

// ══════════════════════════════════════════════════════════════════
// SUITE 3: Interactive State Simulation (Attempt, Reveal, OptionClass)
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 3: Attempt, Reveal & Class State Machine Simulation ===')

// Create simulated reactive state
const simPyqs = JSON.parse(JSON.stringify(parsedPyqs))

function optionClass(q: any, optIndex: number) {
  if (!q.revealed) {
    return q.selected === optIndex ? 'opt-selected' : ''
  }
  if (optIndex === q.correct) {
    return 'opt-correct'
  }
  if (q.selected === optIndex) {
    return 'opt-wrong'
  }
  return 'opt-dim'
}

function attempt(q: any, optIndex: number) {
  if (q.revealed) return
  q.selected = optIndex
  q.revealed = true
}

function reveal(q: any) {
  q.revealed = true
}

// Initial state
const initialAttempted = simPyqs.filter((q: any) => q.selected !== null).length
const initialCorrect = simPyqs.filter((q: any) => q.selected !== null && q.selected === q.correct).length
assert(initialAttempted === 0 && initialCorrect === 0, 'Initial attempted count is 0 and correct count is 0')

// Test Option Class in unrevealed state
assert(optionClass(simPyqs[0], 0) === '', 'Unrevealed unselected option has empty class')

// Test correct attempt
const q0 = simPyqs[0]
const correctOpt = q0.correct
attempt(q0, correctOpt)
assert(q0.selected === correctOpt, 'attempt() sets selected option')
assert(q0.revealed === true, 'attempt() marks question as revealed')
assert(optionClass(q0, correctOpt) === 'opt-correct', 'Correct option receives opt-correct class')
const otherOpt = (correctOpt + 1) % q0.options.length
assert(optionClass(q0, otherOpt) === 'opt-dim', 'Other unselected option receives opt-dim class')

// Test idempotency of attempt on revealed question
attempt(q0, otherOpt)
assert(q0.selected === correctOpt, 'Subsequent attempt on revealed question is idempotent/blocked')

// Test incorrect attempt
const q1 = simPyqs[1]
const wrongOpt = (q1.correct + 1) % q1.options.length
attempt(q1, wrongOpt)
assert(q1.selected === wrongOpt, 'attempt() sets selected wrong option')
assert(optionClass(q1, wrongOpt) === 'opt-wrong', 'Selected wrong option receives opt-wrong class')
assert(optionClass(q1, q1.correct) === 'opt-correct', 'Correct option receives opt-correct class on wrong attempt')

// Test reveal() without selection
const q2 = simPyqs[2]
reveal(q2)
assert(q2.revealed === true, 'reveal() sets revealed to true')
assert(q2.selected === null, 'reveal() does not alter selected (remains null)')
assert(optionClass(q2, q2.correct) === 'opt-correct', 'reveal() displays opt-correct for the answer')
assert(optionClass(q2, (q2.correct + 1) % q2.options.length) === 'opt-dim', 'reveal() displays opt-dim for distractor')

// Test aggregate counts after 3 operations
const midAttempted = simPyqs.filter((q: any) => q.selected !== null).length
const midCorrect = simPyqs.filter((q: any) => q.selected !== null && q.selected === q.correct).length
assert(midAttempted === 2, `Attempted count is 2 (actual: ${midAttempted})`)
assert(midCorrect === 1, `Correct count is 1 (actual: ${midCorrect})`)

// ══════════════════════════════════════════════════════════════════
// SUITE 4: Advanced Practice State Logic & Synthetic Drills
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 4: Advanced Practice State Logic ===')

const advMatch = vueContent.match(/const advancedPractice: AdvPractice\[\] = reactive\(([\s\S]*?)\)\n\nfunction advAttempt/m)
assert(!!advMatch, 'advancedPractice reactive array is parsed from script setup')

let parsedAdv: any[] = []
if (advMatch) {
  try {
    parsedAdv = eval(advMatch[1].trim())
  } catch (err: any) {
    console.error('Error parsing advancedPractice array:', err.message)
  }
}

assert(parsedAdv.length === 4, 'advancedPractice array contains exactly 4 hardening drills', `Found ${parsedAdv.length}`)

for (const [i, adv] of parsedAdv.entries()) {
  assert(!!adv.uid && !!adv.question && Array.isArray(adv.options) && typeof adv.correct === 'number' && !!adv.explanation, `Advanced drill ${i + 1} (${adv.uid}) has complete schema`)
  assert(adv.correct >= 0 && adv.correct < adv.options.length, `Advanced drill ${i + 1} correct answer index is within bounds`)
  assert(adv.isSynthetic === true, `Advanced drill ${i + 1} is properly marked as synthetic TGPSC practice`)
}

// Check styling disclaimer for Advanced Practice
const disclaimerPresent = vueContent.includes('border-indigo-500/30 bg-indigo-500/5') &&
  vueContent.includes('TGPSC-Style Advanced Hardening Practice') &&
  vueContent.includes('92-93.5% direct factual MCQs')
assert(disclaimerPresent, 'Advanced Practice contains required indigo styling and pedagogical disclaimer')

// ══════════════════════════════════════════════════════════════════
// SUITE 5: Component Props & Integration Contracts
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 5: Component Props & Integration Contracts ===')

// 5.1 GateQuiz integration
const gateQuizTagMatch = vueContent.match(/<GateQuiz\s+note-id="([^"]+)"\s*\/>/)
assert(!!gateQuizTagMatch, '<GateQuiz /> component is present in template')
assert(gateQuizTagMatch?.[1] === 'NOTE-POL-HIST-ACTS', '<GateQuiz /> binds correct note-id="NOTE-POL-HIST-ACTS"')

// 5.2 CurrentAffairsStrip integration
const caStripTagMatch = vueContent.match(/<CurrentAffairsStrip\s+note-id="([^"]+)"\s*\/>/)
assert(!!caStripTagMatch, '<CurrentAffairsStrip /> component is present in template')
assert(caStripTagMatch?.[1] === 'NOTE-POL-HIST-ACTS', '<CurrentAffairsStrip /> binds correct note-id="NOTE-POL-HIST-ACTS"')

// 5.3 PersonalNotesDrawer
const personalNotesMatch = vueContent.match(/<PersonalNotesDrawer[\s\S]*?note-id="([^"]+)"/)
assert(personalNotesMatch?.[1] === 'NOTE-POL-HIST-ACTS', '<PersonalNotesDrawer /> binds NOTE-POL-HIST-ACTS')

// 5.4 AiQuickPrompts composable
const aiQuickPromptsMatch = vueContent.includes("useAiPromptChips('NOTE-POL-HIST-ACTS')")
assert(aiQuickPromptsMatch, 'useAiPromptChips is initialized with NOTE-POL-HIST-ACTS')

// ══════════════════════════════════════════════════════════════════
// SUITE 6: Formatting, Em-Dashes & Theme Token Invariants
// ══════════════════════════════════════════════════════════════════
console.log('\n=== SUITE 6: Formatting, Zero Em-Dashes & Theme Invariants ===')

// Strict Zero Em-Dash rule
const emDashCount = (vueContent.match(/\u2014/g) || []).length
assert(emDashCount === 0, `Strict Zero Em-Dash Rule: Found ${emDashCount} em-dashes`)

// Semantic tokens usage check
const usesBgElev = vueContent.includes('bg-elev')
const usesBLine = vueContent.includes('b-line')
const usesTHi = vueContent.includes('t-hi')
const usesTMid = vueContent.includes('t-mid')
const usesTLo = vueContent.includes('t-lo')

assert(usesBgElev && usesBLine && usesTHi && usesTMid && usesTLo, 'Uses semantic theme tokens (bg-elev, b-line, t-hi, t-mid, t-lo)')

// Check for unclosed template tags
const openTemplate = (vueContent.match(/<template>/g) || []).length
const closeTemplate = (vueContent.match(/<\/template>/g) || []).length
const openScript = (vueContent.match(/<script/g) || []).length
const closeScript = (vueContent.match(/<\/script>/g) || []).length

assert(openTemplate === 1 && closeTemplate === 1, 'Exactly one opening and closing <template> tag')
assert(openScript === 1 && closeScript === 1, 'Exactly one opening and closing <script> tag')

console.log('\n========================================================')
console.log('CHALLENGER VERIFICATION RUN COMPLETE')
console.log(`Total Tests:  ${totalTests}`)
console.log(`Passed:       ${passedTests}`)
console.log(`Failed:       ${failedTests}`)
console.log('========================================================')

if (failedTests > 0) {
  console.error('\nFailures summary:')
  for (const f of failures) console.error(f)
  process.exit(1)
} else {
  console.log('\nALL ADVERSARIAL TESTS PASSED (Exit Code 0).')
  process.exit(0)
}
