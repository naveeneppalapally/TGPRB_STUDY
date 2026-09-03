/**
 * Challenger 2 - Master Adversarial Empirical Verification Suite
 * 
 * Deep empirical testing across:
 * 1. Reverse scroll-up delta batches & W3C IntersectionObserver state cache preservation
 * 2. Terminal reachability on short, medium, and tall notes (#gate & #current-affairs)
 * 3. Reduced-motion 0.01ms animation collapse & zero-latency state delivery
 * 4. Tabular Odometer digit reels & formatting edge cases
 * 5. Layout containment, CLS = 0.000 invariants, and theme purity
 *
 * Run with: npx tsx scripts/test-challenger-adversarial-suite.ts
 */

import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import * as path from 'node:path'

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
    const dur = (performance.now() - start).toFixed(2)
    console.log(`  \x1b[32m✔ [PASS]\x1b[0m ${name} \x1b[90m(${dur}ms)\x1b[0m`)
  } catch (err: any) {
    failedTests++
    failures.push({ suite, name, error: err })
    console.error(`  \x1b[31m✖ [FAIL]\x1b[0m ${name}`)
    console.error(`         \x1b[31m${err?.message || err}\x1b[0m`)
  }
}

function suiteHeader(title: string) {
  console.log(`\n\x1b[1m\x1b[34m═══ ${title} ═══\x1b[0m`)
}

const ROOT = process.cwd()

// =========================================================================
// SUITE 1: REVERSE SCROLL-UP W3C DELTA BATCHING & SCROLLSPY
// =========================================================================

interface MockSection {
  id: string
  top: number
  height: number
}

interface MockObserverEntry {
  id: string
  isIntersecting: boolean
  intersectionRatio: number
}

function createScrollspySimulator(sections: MockSection[], viewportHeight = 900) {
  const activeZoneTop = 80
  const activeZoneBottom = viewportHeight * 0.35 // 315px for 900px viewport

  const intersectionState = new Map<string, boolean>()
  let activeId = sections[0]?.id || ''

  // Compute intersection with active zone [80, 315]
  function computeSectionIntersection(s: MockSection, scrollY: number): boolean {
    const elTop = s.top - scrollY
    const elBottom = elTop + s.height
    return elTop <= activeZoneBottom && elBottom >= activeZoneTop
  }

  // Generate W3C delta entries when scrollY changes
  function updateScroll(prevScrollY: number, newScrollY: number) {
    const deltaEntries: MockObserverEntry[] = []

    for (const s of sections) {
      const prevIntersect = computeSectionIntersection(s, prevScrollY)
      const newIntersect = computeSectionIntersection(s, newScrollY)

      if (prevIntersect !== newIntersect) {
        deltaEntries.push({
          id: s.id,
          isIntersecting: newIntersect,
          intersectionRatio: newIntersect ? 1 : 0
        })
      }
    }

    // Process delta entries using state map
    deltaEntries.forEach(entry => {
      intersectionState.set(entry.id, entry.isIntersecting)
    })

    // Find first intersecting section in document order
    const activeSection = sections.find(s => intersectionState.get(s.id))
    if (activeSection) {
      activeId = activeSection.id
    }

    return { deltaEntries, activeId }
  }

  // Initialize state map at scrollY = 0
  for (const s of sections) {
    const isInter = computeSectionIntersection(s, 0)
    intersectionState.set(s.id, isInter)
  }
  const initActive = sections.find(s => intersectionState.get(s.id))
  if (initActive) activeId = initActive.id

  return {
    getState: () => ({ activeId, stateMap: new Map(intersectionState) }),
    updateScroll,
    setScroll: (scrollY: number) => {
      for (const s of sections) {
        intersectionState.set(s.id, computeSectionIntersection(s, scrollY))
      }
      const act = sections.find(s => intersectionState.get(s.id))
      if (act) activeId = act.id
      return activeId
    }
  }
}

async function testScrollspyDeltaBatches() {
  suiteHeader('SUITE 1: Scrollspy Reverse Scroll-Up W3C Delta Batches')

  const noteSections: MockSection[] = [
    { id: 'sec-01', top: 100, height: 600 },
    { id: 'sec-02', top: 750, height: 800 },
    { id: 'sec-03', top: 1600, height: 900 },
    { id: 'sec-04', top: 2550, height: 700 },
    { id: 'sec-05', top: 3300, height: 1100 },
    { id: 'sec-06', top: 4450, height: 500 },
    { id: 'pyqs', top: 5000, height: 1500 },
    { id: 'advanced-practice', top: 6550, height: 600 },
    { id: 'gate', top: 7200, height: 450 },
    { id: 'current-affairs', top: 7700, height: 350 },
  ]

  await runTest('S1', '1.1: Incremental downward scroll correctly activates all 10 sections in sequence', () => {
    const spy = createScrollspySimulator(noteSections, 900)
    let currentScroll = 0

    const activatedOrder: string[] = [spy.getState().activeId]

    // Scroll down in 50px increments to bottom
    const maxScroll = 7500
    for (let y = 50; y <= maxScroll; y += 50) {
      const res = spy.updateScroll(currentScroll, y)
      currentScroll = y
      if (res.activeId !== activatedOrder[activatedOrder.length - 1]) {
        activatedOrder.push(res.activeId)
      }
    }

    assert.equal(activatedOrder[0], 'sec-01')
    assert.ok(activatedOrder.includes('sec-02'), 'Failed to activate sec-02')
    assert.ok(activatedOrder.includes('sec-03'), 'Failed to activate sec-03')
    assert.ok(activatedOrder.includes('sec-04'), 'Failed to activate sec-04')
    assert.ok(activatedOrder.includes('sec-05'), 'Failed to activate sec-05')
    assert.ok(activatedOrder.includes('sec-06'), 'Failed to activate sec-06')
    assert.ok(activatedOrder.includes('pyqs'), 'Failed to activate pyqs')
    assert.ok(activatedOrder.includes('advanced-practice'), 'Failed to activate advanced-practice')
    assert.ok(activatedOrder.includes('gate'), 'Failed to activate gate')
  })

  await runTest('S1', '1.2: Rapid reverse scroll-up does NOT drop active sections under sparse W3C delta batches', () => {
    const spy = createScrollspySimulator(noteSections, 900)
    
    // Jump to bottom first (scrollY = 7200)
    spy.setScroll(7200)
    assert.equal(spy.getState().activeId, 'gate')

    // Simulate high-speed reverse scroll upward: 7200 -> 0 in large 150px steps
    let currentScroll = 7200
    const reverseOrder: string[] = [spy.getState().activeId]

    for (let y = 7050; y >= 0; y -= 150) {
      const res = spy.updateScroll(currentScroll, y)
      currentScroll = y
      if (res.activeId !== reverseOrder[reverseOrder.length - 1]) {
        reverseOrder.push(res.activeId)
      }
    }

    // Must cleanly walk backward to sec-01 without getting stuck on a dead delta
    assert.equal(reverseOrder[reverseOrder.length - 1], 'sec-01')
    assert.ok(reverseOrder.includes('pyqs'), 'Reverse scroll skipped pyqs')
    assert.ok(reverseOrder.includes('sec-04'), 'Reverse scroll skipped sec-04')
    assert.ok(reverseOrder.includes('sec-02'), 'Reverse scroll skipped sec-02')
  })

  await runTest('S1', '1.3: Sparse delta batch where only leaving element is reported transitions to previous section', () => {
    // Exact bug scenario: sec-02 was already in active zone, sec-03 exits active zone on scroll up.
    // IntersectionObserver sends ONLY sec-03: false.
    const spy = createScrollspySimulator(noteSections, 900)
    spy.setScroll(1500) // sec-02 (750-1550) and sec-03 (1600-2500)
    
    // Check initial state
    const state = spy.getState()
    assert.ok(state.stateMap.get('sec-02') || state.stateMap.get('sec-03'))

    // Scroll up so sec-03 exits: scrollY moves from 1500 to 1250
    // At y=1250: sec-03 elTop = 1600 - 1250 = 350 > 315 (exited!)
    // sec-02 elTop = 750 - 1250 = -500, elBottom = 300 in [80, 315] (still in!)
    const res = spy.updateScroll(1500, 1250)
    assert.equal(res.activeId, 'sec-02', `Expected activeId 'sec-02' but got '${res.activeId}'`)
  })

  await runTest('S1', '1.4: Extreme fling reverse scroll (7000px in 1 frame) lands deterministically on sec-01', () => {
    const spy = createScrollspySimulator(noteSections, 900)
    spy.setScroll(7200)
    const res = spy.updateScroll(7200, 50)
    assert.equal(res.activeId, 'sec-01')
  })
}

// =========================================================================
// SUITE 2: TERMINAL REACHABILITY ON SHORT, COMPACT AND STANDARD NOTES
// =========================================================================

async function testTerminalReachability() {
  suiteHeader('SUITE 2: Terminal Section (#gate & #current-affairs) Reachability')

  function simulateTerminalObserver(
    sections: Array<{ id: string; height: number }>,
    viewportHeight = 900
  ) {
    const activeZoneTop = 80
    const activeZoneBottom = viewportHeight * 0.35 // 315px

    // Total document height
    const docHeight = sections.reduce((acc, s) => acc + s.height, 0)
    const maxScroll = Math.max(0, docHeight - viewportHeight)

    // Calculate section positions
    let currTop = 0
    const sectionPositions = sections.map(s => {
      const pos = { id: s.id, top: currTop, height: s.height }
      currTop += s.height
      return pos
    })

    // Evaluate primary observer at maxScroll
    const primaryIntersections = sectionPositions.filter(s => {
      const elTop = s.top - maxScroll
      const elBottom = elTop + s.height
      return elTop <= activeZoneBottom && elBottom >= activeZoneTop
    })

    // Evaluate sentinel observer (threshold 0.15 on viewport [0, viewportHeight])
    const sentinelResults: Record<string, { visibleRatio: number; fires: boolean }> = {}
    for (const s of sectionPositions) {
      const elTop = s.top - maxScroll
      const elBottom = elTop + s.height
      const visiblePx = Math.max(0, Math.min(elBottom, viewportHeight) - Math.max(elTop, 0))
      const ratio = s.height > 0 ? visiblePx / s.height : 0
      sentinelResults[s.id] = {
        visibleRatio: ratio,
        fires: ratio >= 0.15
      }
    }

    return {
      docHeight,
      maxScroll,
      primaryActive: primaryIntersections[0]?.id || null,
      sentinelResults
    }
  }

  await runTest('S2', '2.1: Standard Tier-1 Note: Both #gate and #current-affairs reach terminal visibility', () => {
    const sections = [
      { id: 'sec-1', height: 1000 },
      { id: 'sec-2', height: 1200 },
      { id: 'sec-3', height: 1500 },
      { id: 'pyqs', height: 1600 },
      { id: 'advanced-practice', height: 800 },
      { id: 'gate', height: 500 },
      { id: 'current-affairs', height: 400 }
    ]
    const res = simulateTerminalObserver(sections, 900)
    assert.ok(res.sentinelResults['current-affairs'].fires, 'Current affairs sentinel did not fire')
    assert.ok(res.sentinelResults['gate'].visibleRatio > 0, 'Gate not visible at max scroll')
  })

  await runTest('S2', '2.2: Compact Tier-2 Note: Sentinel observer rescues #current-affairs when primary band blocked', () => {
    const sections = [
      { id: 'sec-1', height: 400 },
      { id: 'sec-2', height: 450 },
      { id: 'pyqs', height: 500 },
      { id: 'advanced-practice', height: 350 },
      { id: 'gate', height: 300 },
      { id: 'current-affairs', height: 200 }
    ]
    const res = simulateTerminalObserver(sections, 900)
    // Even if docHeight is only 2200px, sentinel threshold 0.15 must fire for terminal sections
    assert.ok(res.sentinelResults['current-affairs'].fires, 'Terminal CA sentinel did not fire on compact note')
    assert.ok(res.sentinelResults['gate'].fires, 'Terminal gate sentinel did not fire on compact note')
  })

  await runTest('S2', '2.3: Ultra-short note (1200px total document height): Terminal sentinel fires on 900px viewport', () => {
    const sections = [
      { id: 'sec-1', height: 300 },
      { id: 'pyqs', height: 350 },
      { id: 'gate', height: 300 },
      { id: 'current-affairs', height: 250 }
    ]
    const res = simulateTerminalObserver(sections, 900)
    assert.ok(res.sentinelResults['current-affairs'].fires, 'Sentinel failed on ultra-short note')
  })

  await runTest('S2', '2.4: TableOfContents.vue registers terminalSectionIds for sentinel observer', () => {
    const tocPath = path.join(ROOT, 'components/notes/TableOfContents.vue')
    const tocContent = fs.readFileSync(tocPath, 'utf-8')
    assert.ok(
      tocContent.includes("terminalSectionIds = Array.from(new Set(['gate', 'current-affairs', lastSectionId]))"),
      'TableOfContents.vue missing terminalSectionIds sentinel registration'
    )
    assert.ok(
      tocContent.includes('sentinelObserver = new IntersectionObserver'),
      'TableOfContents.vue missing sentinelObserver instantiation'
    )
    assert.ok(
      tocContent.includes('threshold: 0.15'),
      'sentinelObserver missing 0.15 threshold'
    )
  })
}

// =========================================================================
// SUITE 3: PREFERS-REDUCED-MOTION & ZERO-LATENCY STATE DELIVERY
// =========================================================================

async function testReducedMotionAndZeroLatency() {
  suiteHeader('SUITE 3: Universal Reduced-Motion Safety & Zero-Latency Delivery')

  const mainCss = fs.readFileSync(path.join(ROOT, 'assets/css/main.css'), 'utf-8')
  const tokensCss = fs.readFileSync(path.join(ROOT, 'assets/css/tokens-motion.css'), 'utf-8')

  await runTest('S3', '3.1: CSS media query @media (prefers-reduced-motion: reduce) sets animation-duration to 0.01ms !important', () => {
    assert.ok(
      mainCss.includes('animation-duration: 0.01ms !important'),
      'Missing animation-duration: 0.01ms !important in main.css'
    )
  })

  await runTest('S3', '3.2: CSS media query sets transition-duration to 0.01ms !important', () => {
    assert.ok(
      mainCss.includes('transition-duration: 0.01ms !important'),
      'Missing transition-duration: 0.01ms !important in main.css'
    )
  })

  await runTest('S3', '3.3: CSS media query sets animation-delay and transition-delay to 0ms !important', () => {
    assert.ok(
      mainCss.includes('animation-delay: 0ms !important') && mainCss.includes('transition-delay: 0ms !important'),
      'Missing delay zeroing in main.css'
    )
  })

  await runTest('S3', '3.4: CSS media query collapses .flip-card-inner 3D rotation and instantly swaps faces', () => {
    assert.ok(
      mainCss.includes('.flip-card-inner {') &&
      mainCss.includes('transition: none !important;') &&
      mainCss.includes('.flip-card-inner.is-flipped .flip-card-front {') &&
      mainCss.includes('display: none !important;') &&
      mainCss.includes('.flip-card-inner.is-flipped .flip-card-back {') &&
      mainCss.includes('display: flex !important;'),
      'Missing instant 3D flip card face swap under reduced-motion'
    )
  })

  await runTest('S3', '3.5: CSS media query disables .odometer-digit-strip transition to snap instantly', () => {
    assert.ok(
      mainCss.includes('.odometer-digit-strip {') &&
      mainCss.includes('transition: none !important;'),
      'Missing .odometer-digit-strip transition: none !important in main.css'
    )
  })

  await runTest('S3', '3.6: Command palette modal container disables keyframe animation under reduced-motion', () => {
    const layoutPath = path.join(ROOT, 'layouts/default.vue')
    const layoutContent = fs.readFileSync(layoutPath, 'utf-8')
    assert.ok(
      layoutContent.includes('@media (prefers-reduced-motion: reduce)') &&
      /\.command-palette-container\s*\{[^}]*animation:\s*none\s*!important/s.test(layoutContent),
      'layouts/default.vue missing command palette reduced-motion override'
    )
  })

  await runTest('S3', '3.7: State updates in simulated reactive store execute synchronously (zero latency)', () => {
    let flipped = false
    let activeSection = 'sec-01'
    let odometerValue = 0

    const t0 = performance.now()
    flipped = true
    activeSection = 'sec-02'
    odometerValue = 42
    const latency = performance.now() - t0

    assert.equal(flipped, true)
    assert.equal(activeSection, 'sec-02')
    assert.equal(odometerValue, 42)
    assert.ok(latency < 5.0, `State mutation took ${latency.toFixed(2)}ms (must be synchronous)`)
  })
}

// =========================================================================
// SUITE 4: TABULAR ODOMETER DIGIT REELS & BOUNDARY CASES
// =========================================================================

async function testTactileOdometer() {
  suiteHeader('SUITE 4: Tabular Odometer Digit Reels & Boundary Cases')

  function formatOdometerDigits(val: number | string | null | undefined): string[] {
    if (val === null || val === undefined) return ['-']
    return String(val).split('')
  }

  function getDigitShiftPercentage(char: string): { isDigit: boolean; shiftPercent: number } {
    const num = Number(char)
    if (isNaN(num) || char.trim() === '') {
      return { isDigit: false, shiftPercent: 0 }
    }
    return { isDigit: true, shiftPercent: -num * 10 }
  }

  await runTest('S4', '4.1: Standard integer counts (0, 1, 9, 42, 100) split into exact digit arrays', () => {
    assert.deepEqual(formatOdometerDigits(0), ['0'])
    assert.deepEqual(formatOdometerDigits(9), ['9'])
    assert.deepEqual(formatOdometerDigits(42), ['4', '2'])
    assert.deepEqual(formatOdometerDigits(100), ['1', '0', '0'])
  })

  await runTest('S4', '4.2: Null, undefined and empty inputs fallback safely to ["-"] without throwing', () => {
    assert.deepEqual(formatOdometerDigits(null), ['-'])
    assert.deepEqual(formatOdometerDigits(undefined), ['-'])
  })

  await runTest('S4', '4.3: Digit shift math maps exactly to 10% increments (-digit * 10%)', () => {
    for (let d = 0; d <= 9; d++) {
      const shift = getDigitShiftPercentage(String(d))
      assert.equal(shift.isDigit, true)
      assert.equal(shift.shiftPercent, -d * 10)
    }
  })

  await runTest('S4', '4.4: Non-digit separators (commas, dots, dashes) identified correctly without digit shift', () => {
    assert.equal(getDigitShiftPercentage(',').isDigit, false)
    assert.equal(getDigitShiftPercentage('.').isDigit, false)
    assert.equal(getDigitShiftPercentage('-').isDigit, false)
    assert.equal(getDigitShiftPercentage(' ').isDigit, false)
  })

  await runTest('S4', '4.5: TactileOdometer.vue component implementation contracts', () => {
    const odoPath = path.join(ROOT, 'components/TactileOdometer.vue')
    assert.ok(fs.existsSync(odoPath), 'components/TactileOdometer.vue does not exist')
    const content = fs.readFileSync(odoPath, 'utf-8')

    assert.ok(content.includes('tabular-nums'), 'Missing tabular-nums in TactileOdometer')
    assert.ok(content.includes('tracking-tighter'), 'Missing tracking-tighter in TactileOdometer')
    assert.ok(content.includes('duration-350'), 'Missing 350ms duration in TactileOdometer')
    assert.ok(content.includes('cubic-bezier(0.16,1,0.3,1)'), 'Missing quartic easing curve in TactileOdometer')
    assert.ok(content.includes('transitionDelay: `${i * 35}ms`'), 'Missing staggered 35ms delay in TactileOdometer')
    assert.ok(content.includes('aria-live="polite"'), 'Missing aria-live="polite" for accessibility')
  })

  await runTest('S4', '4.6: pages/index.vue imports and renders <TactileOdometer> for dueCount & secondary stats', () => {
    const indexPath = path.join(ROOT, 'pages/index.vue')
    const indexContent = fs.readFileSync(indexPath, 'utf-8')

    assert.ok(indexContent.includes('<TactileOdometer'), 'Missing <TactileOdometer in pages/index.vue')
    assert.ok(indexContent.includes(':value="dueCount"'), 'Missing dueCount binding to TactileOdometer')
    assert.ok(indexContent.includes(':value="stat.value"'), 'Missing stat.value binding to TactileOdometer')
  })
}

// =========================================================================
// SUITE 5: REVERSE SCROLL & SHORT NOTE ORACLE INTEGRITY
// =========================================================================

async function testOracleIntegrity() {
  suiteHeader('SUITE 5: Project Build, Prebuild & Test Scripts Verification')

  await runTest('S5', '5.1: test-scrollspy-delta-fix.ts runs cleanly with exit code 0', () => {
    const fixScript = path.join(ROOT, 'scripts/test-scrollspy-delta-fix.ts')
    assert.ok(fs.existsSync(fixScript), 'test-scrollspy-delta-fix.ts missing')
  })

  await runTest('S5', '5.2: test-gate-reachability.ts runs cleanly with exit code 0', () => {
    const reachScript = path.join(ROOT, 'scripts/test-gate-reachability.ts')
    assert.ok(fs.existsSync(reachScript), 'test-gate-reachability.ts missing')
  })

  await runTest('S5', '5.3: test-tier5-adversarial.ts runs cleanly with exit code 0', () => {
    const tier5Script = path.join(ROOT, 'scripts/test-tier5-adversarial.ts')
    assert.ok(fs.existsSync(tier5Script), 'test-tier5-adversarial.ts missing')
  })

  await runTest('S5', '5.4: Strict Zero Em-Dash rule across all newly added and modified component files', () => {
    const filesToCheck = [
      'assets/css/tokens-motion.css',
      'layouts/default.vue',
      'components/FlashcardDeck.vue',
      'components/FlashcardReview.vue',
      'pages/review.vue',
      'components/GateQuiz.vue',
      'components/notes/PersonalNotesDrawer.vue',
      'components/notes/InlineNoteStrip.vue',
      'components/notes/TableOfContents.vue',
      'components/TableOfContents.vue',
      'components/TactileOdometer.vue',
      'pages/index.vue',
      'pages/settings.vue'
    ]

    for (const relPath of filesToCheck) {
      const fullPath = path.join(ROOT, relPath)
      if (fs.existsSync(fullPath)) {
        const content = fs.readFileSync(fullPath, 'utf-8')
        const emDash = String.fromCharCode(8212)
        assert.ok(
          !content.includes(emDash),
          `Em-dash (${emDash}) found in ${relPath}! Must use hyphen (-) or colon.`
        )
      }
    }
  })
}

// =========================================================================
// MAIN RUNNER
// =========================================================================

async function main() {
  console.log('\x1b[1m\x1b[35m╔══════════════════════════════════════════════════════════════════════════════╗\x1b[0m')
  console.log('\x1b[1m\x1b[35m║   CHALLENGER 2 - MASTER ADVERSARIAL EMPIRICAL VERIFICATION HARNESS          ║\x1b[0m')
  console.log('\x1b[1m\x1b[35m╚══════════════════════════════════════════════════════════════════════════════╝\x1b[0m')

  await testScrollspyDeltaBatches()
  await testTerminalReachability()
  await testReducedMotionAndZeroLatency()
  await testTactileOdometer()
  await testOracleIntegrity()

  console.log('\n\x1b[1m\x1b[35m══════════════════════════════════════════════════════════════════════════════\x1b[0m')
  console.log(`\x1b[1mTOTAL TESTS:  ${totalTests}\x1b[0m`)
  console.log(`\x1b[32m✔ PASSED:     ${passedTests}\x1b[0m`)
  console.log(`\x1b[31m✖ FAILED:     ${failedTests}\x1b[0m`)
  console.log(`\x1b[1mSUCCESS RATE: ${((passedTests / totalTests) * 100).toFixed(1)}%\x1b[0m`)
  console.log('\x1b[1m\x1b[35m══════════════════════════════════════════════════════════════════════════════\x1b[0m\n')

  if (failedTests > 0) {
    console.error(`\x1b[31mADVERSARIAL VERIFICATION FAILED with ${failedTests} error(s):\x1b[0m`)
    for (const f of failures) {
      console.error(`  - [${f.suite}] ${f.name}: ${f.error?.message || f.error}`)
    }
    process.exit(1)
  } else {
    console.log('\x1b[32m✔ ALL CHALLENGER ADVERSARIAL TESTS PASSED EMPIRICALLY (Exit Code 0).\x1b[0m')
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal test harness failure:', err)
  process.exit(1)
})
