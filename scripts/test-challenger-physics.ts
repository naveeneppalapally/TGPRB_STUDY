/**
 * Empirical Challenger Verification Harness
 * Tests physics invariants, interruptibility vectors, state desync, and timing budgets.
 */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface TestResult {
  suite: string
  name: string
  passed: boolean
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS'
  details: string
}

const results: TestResult[] = []

function assertTest(
  suite: string,
  name: string,
  condition: boolean,
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASS',
  passDetails: string,
  failDetails: string
) {
  results.push({
    suite,
    name,
    passed: condition,
    severity: condition ? 'PASS' : severity,
    details: condition ? passDetails : failDetails,
  })
}

const specPath = resolve(process.cwd(), '.agents/worker_spec_1/MASTER_SPECIFICATION.md')
const specContent = readFileSync(specPath, 'utf-8')
const mainCssPath = resolve(process.cwd(), 'assets/css/main.css')
const mainCssContent = readFileSync(mainCssPath, 'utf-8')

// =========================================================================
// SUITE 1: Vector Interruptibility & Transition Property Coverage
// =========================================================================

// Test 1.1: SegmentedControl Pill Transition Property
const segmentedControlMatch = specContent.match(/### Surface 7: `components\/ui\/SegmentedControl\.vue`[\s\S]*?```vue([\s\S]*?)```/)
const segmentedControlVue = segmentedControlMatch ? segmentedControlMatch[1] : ''

const hasPillWidthTransition = segmentedControlVue.includes('transition-[transform,width]') ||
  segmentedControlVue.includes('transition-all') ||
  (segmentedControlVue.includes('transition-[transform') && segmentedControlVue.includes('transition-[width]'))

assertTest(
  'Suite 1: Vector Interruptibility',
  '1.1 SegmentedControl sliding pill transitions width alongside transform for variable-width tab labels',
  hasPillWidthTransition,
  'HIGH',
  'Pill smoothly animates width and transform together.',
  'DEFECT (HIGH): SegmentedControl sliding pill uses `transition-transform duration-160`. When switching between tabs of different widths (e.g. "SI (150m)" vs "Constable (100m)"), the width snaps instantly at t=0 while position translates over 160ms. Fix: change to `transition-[transform,width] duration-160`.'
)

// Test 1.2: 3D Flip Card Interruptibility
const flipCardUsesTransition = mainCssContent.includes('.flip-card-inner') &&
  mainCssContent.includes('transition: transform 190ms cubic-bezier(0.16, 1, 0.3, 1)')

assertTest(
  'Suite 1: Vector Interruptibility',
  '1.2 3D Flip Card uses continuous CSS transition for interruptibility',
  flipCardUsesTransition,
  'CRITICAL',
  'CSS transition on .flip-card-inner enables continuous matrix interpolation on rapid double-click (30ms interval).',
  'DEFECT: Flip card missing continuous CSS transition in main.css.'
)

// Test 1.3: Desktop Sidebar Transition Thrashing
const defaultLayoutMatch = specContent.match(/### Surface 4: `layouts\/default\.vue`[\s\S]*?```vue([\s\S]*?)```/)
const defaultLayoutVue = defaultLayoutMatch ? defaultLayoutMatch[1] : ''
const usesPaddingLeftTransition = defaultLayoutVue.includes('transition: padding-left') || defaultLayoutVue.includes('transition-[padding')

assertTest(
  'Suite 1: Vector Interruptibility',
  '1.3 layouts/default.vue eliminates layout-thrashing padding-left transition',
  !usesPaddingLeftTransition,
  'MEDIUM',
  'No padding-left transition in layout.',
  'DEFECT (MEDIUM): layouts/default.vue animates `transition: padding-left 180ms` on .content-shell. While visually smooth, animating padding triggers layout reflow on every frame on desktop. Blueprint claim of eliminating padding transition reflow is contradicted by its CSS.'
)

// Test 1.4: GateQuiz Parallel vs Sequential Slide Latency
const gateQuizMatch = specContent.match(/### Surface 3: `components\/GateQuiz\.vue`[\s\S]*?```vue([\s\S]*?)```/)
const gateQuizVue = gateQuizMatch ? gateQuizMatch[1] : ''
const usesOutInTransitionInQuiz = gateQuizVue.includes('mode="out-in"')

assertTest(
  'Suite 1: Vector Interruptibility',
  '1.4 GateQuiz question transition latency (mode="out-in" creates 280ms total cycle)',
  !usesOutInTransitionInQuiz,
  'LOW',
  'GateQuiz uses parallel cross-fade slide.',
  'CAVEAT / LATENCY NOTE (LOW): GateQuiz uses `<Transition :name="slideDir" mode="out-in">` with 140ms enter + 140ms leave. Total transition duration is 280ms. While clean, rapid double-clicking of Next buffers until leave completes.'
)

// =========================================================================
// SUITE 2: Decoupled Flip State vs Text Swapping & Answer Leaks
// =========================================================================

// Test 2.1: FlashcardReview.vue Answer Leak Verification
const flashcardReviewMatch = specContent.match(/### Surface 2: `components\/FlashcardReview\.vue`[\s\S]*?```vue([\s\S]*?)```/)
const flashcardReviewVue = flashcardReviewMatch ? flashcardReviewMatch[1] : ''

const hasKeyedTransitionInReview = flashcardReviewVue.includes('<Transition') &&
  (flashcardReviewVue.includes(':key="card.id"') || flashcardReviewVue.includes(':key="currentIndex"'))

assertTest(
  'Suite 2: Decoupled Flip State vs Text Swapping',
  '2.1 FlashcardReview.vue isolates back-face content during in-flight un-flip on card advance',
  hasKeyedTransitionInReview,
  'CRITICAL',
  'Card advance unmounts/transitions with unique key, preventing back-face answer leaks.',
  'CRITICAL DEFECT: FlashcardReview.vue lacks a `:key="card.id"` Transition wrapper. When `submitRating()` runs, `flipped = false` starts a 190ms rotation back from 180deg to 0deg. As parent advances to next card immediately, `card.back` renders the NEXT card answer on the still-visible back face between 180deg and 90deg (first ~95ms of flip). Student sees answer before question!'
)

// Test 2.2: FlashcardDeck.vue Decoupled Navigation Safety
const flashcardDeckMatch = specContent.match(/### Surface 1: `components\/FlashcardDeck\.vue`[\s\S]*?```vue([\s\S]*?)```/)
const flashcardDeckVue = flashcardDeckMatch ? flashcardDeckMatch[1] : ''
const deckHasKeyedTransition = flashcardDeckVue.includes('<Transition :name="glideDirection"') &&
  flashcardDeckVue.includes(':key="currentIndex"')

assertTest(
  'Suite 2: Decoupled Flip State vs Text Swapping',
  '2.2 FlashcardDeck.vue isolates card faces via keyed directional glide transition',
  deckHasKeyedTransition,
  'CRITICAL',
  'FlashcardDeck uses `:key="currentIndex"` in `<Transition mode="out-in">`, correctly unmounting the old card before mounting the new card.',
  'FlashcardDeck missing keyed transition.'
)

// =========================================================================
// SUITE 3: Synchronous vs Asynchronous State Updates in PersonalNotesDrawer
// =========================================================================

// Test 3.1: PersonalNotesDrawer Sync Status Accuracy
const notesDrawerMatch = specContent.match(/#### `components\/notes\/PersonalNotesDrawer\.vue`:[\s\S]*?```vue([\s\S]*?)```/)
const notesDrawerVue = notesDrawerMatch ? notesDrawerMatch[1] : ''

const hasFakeSyncTimeout = notesDrawerVue.includes("setTimeout(() => { syncStatus.value = 'Synced' }, 1000)")
const usesRealOfflineSync = notesDrawerVue.includes('useOfflineSync') || notesDrawerVue.includes('pendingCount') || notesDrawerVue.includes('isSyncing')

assertTest(
  'Suite 3: Sync vs Async State Updates',
  '3.1 PersonalNotesDrawer reflects actual offline sync engine state rather than hardcoded timer',
  !hasFakeSyncTimeout && usesRealOfflineSync,
  'HIGH',
  'PersonalNotesDrawer binds sync status to real offline sync engine state.',
  'DEFECT (HIGH): PersonalNotesDrawer.vue uses hardcoded `setTimeout(() => { syncStatus.value = "Synced" }, 1000)`. It falsely displays "Synced" even when offline, unauthenticated (guest), or during network backoff retries.'
)

// Test 3.2: Semantic Color Token Compliance in PersonalNotesDrawer
const usesHardcodedEmerald = notesDrawerVue.includes('bg-emerald-') || notesDrawerVue.includes('text-emerald-')

assertTest(
  'Suite 3: Sync vs Async State Updates',
  '3.2 PersonalNotesDrawer complies with design system semantic token rules (var(--jade))',
  !usesHardcodedEmerald,
  'MEDIUM',
  'PersonalNotesDrawer uses semantic tokens.',
  'DEFECT (MEDIUM): PersonalNotesDrawer uses hardcoded `bg-emerald-500/15 text-emerald-600 dark:text-emerald-400` instead of semantic jade tokens (`bg-jade-soft text-jade` / `var(--jade)`).'
)

// =========================================================================
// SUITE 4: Mathematical Physics & Zero Layout Shift Checks
// =========================================================================

// Test 4.1: Pre-reserved Action Dock Height in FlashcardReview
const hasPreReservedDock = flashcardReviewVue.includes('min-h-[84px]') &&
  flashcardReviewVue.includes('grid-template-rows')

assertTest(
  'Suite 4: ZLS Mathematical Bounding',
  '4.1 FlashcardReview pre-reserves 84px action dock via fractional grid rows',
  hasPreReservedDock,
  'HIGH',
  'Rating buttons dock is bounded to min-h-[84px] within fractional grid track, ensuring CLS = 0.',
  'FlashcardReview lacks pre-reserved rating dock bounds.'
)

// Test 4.2: InlineNoteStrip Fractional Track Expansion
const inlineStripMatch = specContent.match(/#### `components\/notes\/InlineNoteStrip\.vue`:[\s\S]*?```vue([\s\S]*?)```/)
const inlineStripVue = inlineStripMatch ? inlineStripMatch[1] : ''
const inlineStripHasZlsGrid = inlineStripVue.includes('grid transition-[grid-template-rows,opacity]') &&
  inlineStripVue.includes('grid-rows-[1fr]') &&
  inlineStripVue.includes('grid-rows-[0fr]')

assertTest(
  'Suite 4: ZLS Mathematical Bounding',
  '4.2 InlineNoteStrip.vue wraps dynamic snippet in fractional grid expansion',
  inlineStripHasZlsGrid,
  'HIGH',
  'InlineNoteStrip uses pure CSS Grid fractional row expansion (0fr -> 1fr), preventing reading canvas layout shifts.',
  'InlineNoteStrip missing fractional row expansion.'
)

// Print results
console.log('\n========================================================')
console.log('CHALLENGER EMPIRICAL VERIFICATION HARNESS RESULTS')
console.log('========================================================\n')

let passCount = 0
let failCount = 0

for (const r of results) {
  if (r.passed) {
    passCount++
    console.log(`[PASS] [${r.severity}] ${r.suite} -> ${r.name}`)
    console.log(`       ${r.details}\n`)
  } else {
    failCount++
    console.log(`[FAIL] [${r.severity}] ${r.suite} -> ${r.name}`)
    console.log(`       ${r.details}\n`)
  }
}

console.log('========================================================')
console.log(`TOTAL TESTS: ${results.length} | PASSED: ${passCount} | FAILED: ${failCount}`)
console.log('========================================================\n')
