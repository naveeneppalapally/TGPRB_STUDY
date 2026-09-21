/**
 * Tactile Micro-Animations, Zero-Layout-Shift Physics & Reduced-Motion Test Suite
 *
 * Verifies:
 * 1. R1: Flashcard 190ms dual-grid stack & tactile FSRS rating buttons
 * 2. R2: Tactile GateQuiz option key-switch, spring radio dot & celebratory pass state
 * 3. R5: Universal reduced-motion 6-rule reset, DrainageMap GSAP bypass & useCollapse robustness
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

let totalTests = 0
let passedTests = 0
let failedTests = 0

function assert(condition: boolean, testId: string, message: string) {
  totalTests++
  if (condition) {
    passedTests++
    console.log(`  [PASS] ${testId}: ${message}`)
  } else {
    failedTests++
    console.error(`  [FAIL] ${testId}: ${message}`)
  }
}

console.log('Starting Tactile Micro-Animations & Reduced-Motion Invariant Suite...\n')

// =========================================================================
// SUITE 1: R1 Flashcard 190ms Dual-Grid Stack & Tactile FSRS Rating
// =========================================================================
console.log('=== SUITE 1: R1 Flashcard 190ms Dual-Grid Stack & Tactile FSRS Rating ===')
const mainCss = fs.readFileSync(path.join(ROOT, 'assets/css/main.css'), 'utf-8')

// Check 190ms flip curve
assert(
  mainCss.includes('190ms cubic-bezier(0.16, 1, 0.3, 1)') && mainCss.includes('.flip-card-inner'),
  'S1.1',
  'main.css defines .flip-card-inner with 190ms cubic-bezier(0.16, 1, 0.3, 1) transition'
)

// Check CSS Grid dual-face stacking
assert(
  mainCss.includes('display: grid') &&
  mainCss.includes('grid-template-columns: 1fr') &&
  mainCss.includes('grid-template-rows: 1fr') &&
  mainCss.includes('grid-area: 1 / 1'),
  'S1.2',
  'main.css implements CSS Grid dual-face stacking (grid-area: 1 / 1 on faces) to eliminate layout shift'
)

// Check active press compression on .flip-card:active
assert(
  mainCss.includes('.flip-card:active') && mainCss.includes('transform: scale(0.985)'),
  'S1.3',
  'main.css implements 50ms active press compression scale(0.985) on .flip-card:active'
)

// Check FSRS rating buttons tactile depression
assert(
  mainCss.includes('.btn-again:active') &&
  mainCss.includes('scale(0.97)') &&
  mainCss.includes('translateY(1px)'),
  'S1.4',
  'main.css rating buttons implement active depression scale(0.97) translateY(1px)'
)

// Check tier-colored hover rims on rating buttons
assert(
  mainCss.includes('var(--red-soft)') &&
  mainCss.includes('var(--accent-soft)') &&
  mainCss.includes('var(--jade-soft)') &&
  mainCss.includes('var(--sky-soft)'),
  'S1.5',
  'main.css rating buttons define tier-colored hover rims mapped to semantic tokens (--red, --accent, --jade, --sky)'
)

// Check pages/review.vue scoped rate-btn styles
const reviewVue = fs.readFileSync(path.join(ROOT, 'pages/review.vue'), 'utf-8')
assert(
  reviewVue.includes('.rate-btn:active') &&
  reviewVue.includes('scale(0.97)') &&
  reviewVue.includes('var(--jade-soft)'),
  'S1.6',
  'pages/review.vue implements tactile active depression and semantic token hover rims on .rate-btn'
)

// Check FlashcardDeck.vue and FlashcardReview.vue adoption of dual-grid flip-card
const deckVue = fs.readFileSync(path.join(ROOT, 'components/FlashcardDeck.vue'), 'utf-8')
const reviewCompVue = fs.readFileSync(path.join(ROOT, 'components/FlashcardReview.vue'), 'utf-8')

assert(
  deckVue.includes('flip-card') && deckVue.includes('flip-card-inner') && deckVue.includes('flip-card-face'),
  'S1.7',
  'components/FlashcardDeck.vue integrates dual-grid 3D flip card classes'
)

assert(
  reviewCompVue.includes('flip-card') && reviewCompVue.includes('flip-card-inner') && reviewCompVue.includes('flip-card-face'),
  'S1.8',
  'components/FlashcardReview.vue integrates dual-grid 3D flip card classes'
)

assert(
  reviewVue.includes('flip-card') && reviewVue.includes('flip-card-inner') && reviewVue.includes('flip-card-face'),
  'S1.9',
  'pages/review.vue integrates dual-grid 3D flip card classes'
)

// =========================================================================
// SUITE 2: R2 Tactile GateQuiz Option Selection & Celebratory Pass State
// =========================================================================
console.log('\n=== SUITE 2: R2 Tactile GateQuiz Option Selection & Celebratory Pass State ===')
const gateQuizVue = fs.readFileSync(path.join(ROOT, 'components/GateQuiz.vue'), 'utf-8')

// Check mechanical key-switch press feedback on .opt:active
assert(
  gateQuizVue.includes('.opt:active') && gateQuizVue.includes('scale(0.985)'),
  'S2.1',
  'components/GateQuiz.vue implements mechanical key-switch press feedback scale(0.985) on .opt:active'
)

// Check radio dot 12% spring overshoot animation
assert(
  gateQuizVue.includes('cubic-bezier(0.34, 1.56, 0.64, 1)') &&
  gateQuizVue.includes('200ms') &&
  gateQuizVue.includes('radioDotSpring'),
  'S2.2',
  'components/GateQuiz.vue implements 12% spring overshoot radio dot with cubic-bezier(0.34, 1.56, 0.64, 1)'
)

// Check celebratory pass badge pop (220ms)
assert(
  gateQuizVue.includes('badgePop') &&
  gateQuizVue.includes('220ms') &&
  gateQuizVue.includes('celebrate-badge'),
  'S2.3',
  'components/GateQuiz.vue implements 220ms celebratory badge pop on pass'
)

// Check expanding jade shockwave ring
assert(
  gateQuizVue.includes('pass-ring') &&
  gateQuizVue.includes('passRingExpand') &&
  gateQuizVue.includes('var(--jade)'),
  'S2.4',
  'components/GateQuiz.vue implements expanding jade shockwave ring (pass-ring) with var(--jade) tokens'
)

// Check zero hardcoded emerald/green classes in GateQuiz.vue and review.vue
const emeraldGreenRegex = /text-(emerald|green)-\d+|bg-(emerald|green)-\d+|border-(emerald|green)-\d+/
assert(
  !emeraldGreenRegex.test(gateQuizVue),
  'S2.5',
  'components/GateQuiz.vue has zero hardcoded emerald-* or green-* Tailwind classes'
)

assert(
  !emeraldGreenRegex.test(reviewVue),
  'S2.6',
  'pages/review.vue has zero hardcoded emerald-* or green-* Tailwind classes'
)

// =========================================================================
// SUITE 3: R5 Universal Reduced-Motion Accessibility & Theme Invariants
// =========================================================================
console.log('\n=== SUITE 3: R5 Universal Reduced-Motion Accessibility & Invariants ===')

// Check all 6 reset rules in @media (prefers-reduced-motion: reduce)
const reducedMotionIndex = mainCss.indexOf('@media (prefers-reduced-motion: reduce)')
const reducedSection = reducedMotionIndex !== -1 ? mainCss.slice(reducedMotionIndex, reducedMotionIndex + 450) : ''

assert(
  reducedSection.includes('animation-duration: 0.01ms !important'),
  'S3.1',
  'main.css reduced-motion overrides animation-duration to 0.01ms !important'
)

assert(
  reducedSection.includes('animation-iteration-count: 1 !important'),
  'S3.2',
  'main.css reduced-motion overrides animation-iteration-count to 1 !important'
)

assert(
  reducedSection.includes('animation-delay: 0ms !important'),
  'S3.3',
  'main.css reduced-motion overrides animation-delay to 0ms !important'
)

assert(
  reducedSection.includes('transition-duration: 0.01ms !important'),
  'S3.4',
  'main.css reduced-motion overrides transition-duration to 0.01ms !important'
)

assert(
  reducedSection.includes('transition-delay: 0ms !important'),
  'S3.5',
  'main.css reduced-motion overrides transition-delay to 0ms !important'
)

assert(
  reducedSection.includes('scroll-behavior: auto !important'),
  'S3.6',
  'main.css reduced-motion overrides scroll-behavior to auto !important'
)

// Check DrainageMap.vue prefers-reduced-motion GSAP bypass
const drainageVue = fs.readFileSync(path.join(ROOT, 'components/DrainageMap.vue'), 'utf-8')
assert(
  drainageVue.includes('prefers-reduced-motion') &&
  drainageVue.includes('isReducedMotion') &&
  drainageVue.includes('strokeDashoffset: 0'),
  'S3.7',
  'components/DrainageMap.vue implements runtime prefers-reduced-motion check for instantaneous GSAP completion'
)

// Check useCollapse.ts robustness against transitionend hangs
const collapseTs = fs.readFileSync(path.join(ROOT, 'composables/useCollapse.ts'), 'utf-8')
assert(
  collapseTs.includes('transitionend') &&
  collapseTs.includes('setTimeout') &&
  collapseTs.includes('clearTimeout'),
  'S3.8',
  'composables/useCollapse.ts includes fallback timers to prevent transition hangs under reduced-motion'
)

// =========================================================================
// SUMMARY
// =========================================================================
console.log('\n========================================================')
console.log('TACTILE MICRO-ANIMATIONS & REDUCED-MOTION TEST COMPLETE')
console.log(`Total Tests:  ${totalTests}`)
console.log(`Passed:       ${passedTests}`)
console.log(`Failed:       ${failedTests}`)
console.log('========================================================\n')

if (failedTests > 0) {
  process.exit(1)
} else {
  console.log('ALL TACTILE MICRO-ANIMATION & REDUCED MOTION INVARIANTS PASSED (Exit Code 0).\n')
}
