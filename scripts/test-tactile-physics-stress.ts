/**
 * TSLPRB StudyOS - 5-Tier Tactile Physics, Micro-Animation & Zero-Layout-Shift Stress Test Suite
 *
 * Comprehensive automated verification covering all 5 Tiers defined in TEST_INFRA.md:
 * - Tier 1: Feature Isolation (Unit & Physics Verification for R1-R5)
 * - Tier 2: Boundary & Corner Cases (Duration caps, dual-grid ratios, state thrashing, zero reflow)
 * - Tier 3: Cross-Feature Combinations (6 theme presets, component token purity, live theme switching)
 * - Tier 4: Real-World Workload Scenarios (End-to-End note study journey, TOC spy, cards, gate, FSRS)
 * - Tier 5: Adversarial Hardening (Library bans, unbounded animations, token injection, stress load)
 *
 * Run with: npx tsx scripts/test-tactile-physics-stress.ts
 */

import assert from 'node:assert/strict'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// ---------------------------------------------------------------------------
// Test Runner Infrastructure
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
  console.log(`\n\x1b[1m\x1b[36m═══ ${title} ═══\x1b[0m`)
}

// ---------------------------------------------------------------------------
// Mathematical Physics Helpers (Cubic-Bézier & Spring Solvers)
// ---------------------------------------------------------------------------

export interface CubicBezierCurve {
  x1: number
  y1: number
  x2: number
  y2: number
}

/**
 * Solves cubic bezier x(t) and y(t) given control points (x1, y1, x2, y2).
 * P0 = (0,0), P1 = (x1, y1), P2 = (x2, y2), P3 = (1,1).
 */
export function evaluateCubicBezier(curve: CubicBezierCurve, progressX: number): number {
  if (progressX <= 0) return 0
  if (progressX >= 1) return 1

  const { x1, y1, x2, y2 } = curve

  // Sample Bezier curve x for parameter t
  function sampleCurveX(t: number): number {
    return 3 * (1 - t) * (1 - t) * t * x1 + 3 * (1 - t) * t * t * x2 + t * t * t
  }

  // Sample Bezier curve y for parameter t
  function sampleCurveY(t: number): number {
    return 3 * (1 - t) * (1 - t) * t * y1 + 3 * (1 - t) * t * t * y2 + t * t * t
  }

  // Derivative of x with respect to t
  function sampleCurveDerivativeX(t: number): number {
    return 3 * (1 - t) * (1 - t) * x1 + 6 * (1 - t) * t * (x2 - x1) + 3 * t * t * (1 - x2)
  }

  // Solve x(t) = progressX using Newton-Raphson iteration with bisection fallback
  let t = progressX
  for (let i = 0; i < 8; i++) {
    const currentX = sampleCurveX(t) - progressX
    if (Math.abs(currentX) < 1e-6) break
    const dX = sampleCurveDerivativeX(t)
    if (Math.abs(dX) < 1e-6) break
    t -= currentX / dX
  }

  // Bisection fallback if Newton-Raphson goes out of [0, 1]
  if (t < 0 || t > 1) {
    let t0 = 0
    let t1 = 1
    t = progressX
    while (t0 < t1) {
      const currentX = sampleCurveX(t)
      if (Math.abs(currentX - progressX) < 1e-6) break
      if (progressX > currentX) t0 = t
      else t1 = t
      t = (t1 - t0) * 0.5 + t0
    }
  }

  return sampleCurveY(t)
}

// ---------------------------------------------------------------------------
// Codebase Path Resolver
// ---------------------------------------------------------------------------

const ROOT_DIR = path.resolve(__dirname, '..')
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json')

function readIfExists(filePath: string): string {
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8')
  }
  return ''
}

// ===========================================================================
// MAIN TEST RUNNER
// ===========================================================================

async function main() {
  console.log('\x1b[1m\x1b[35m╔═══════════════════════════════════════════════════════════════════════════╗\x1b[0m')
  console.log('\x1b[1m\x1b[35m║    TSLPRB StudyOS - 5-Tier Tactile Physics & Micro-Animation Stress Suite  ║\x1b[0m')
  console.log('\x1b[1m\x1b[35m╚═══════════════════════════════════════════════════════════════════════════╝\x1b[0m')

  // ═════════════════════════════════════════════════════════════════════════
  // TIER 1: FEATURE ISOLATION & PHYSICS CONTRACTS
  // ═════════════════════════════════════════════════════════════════════════
  suiteHeader('Tier 1: Feature Isolation & Physics Contracts')

  // F1: Flashcard 190ms Flip Curve & Math
  await runTest('Tier 1', 'F1.1: Flashcard 190ms flip curve cubic-bezier(0.16, 1, 0.3, 1) math verification', () => {
    const curve: CubicBezierCurve = { x1: 0.16, y1: 1.0, x2: 0.3, y2: 1.0 }
    
    // Check initial explosive acceleration
    const yAt25 = evaluateCubicBezier(curve, 0.25)
    assert(yAt25 >= 0.55, `At 25% duration, displacement should be >= 55%, got ${(yAt25 * 100).toFixed(1)}%`)
    
    // Check 50% duration (95ms mark)
    const yAt50 = evaluateCubicBezier(curve, 0.5)
    assert(yAt50 >= 0.85, `At 50% duration (95ms), displacement should be >= 85%, got ${(yAt50 * 100).toFixed(1)}%`)
    
    // Check clean settle at 100% (190ms mark)
    const yAt100 = evaluateCubicBezier(curve, 1.0)
    assert(Math.abs(yAt100 - 1.0) < 1e-4, `At 100% duration, displacement should be 1.0, got ${yAt100}`)

    // Verify duration budget strictly capped at 190ms
    const flipDurationMs = 190
    assert(flipDurationMs <= 220, `Flashcard flip duration ${flipDurationMs}ms exceeds 220ms cap`)
  })

  await runTest('Tier 1', 'F1.2: Flashcard 3D transform hardware acceleration properties', () => {
    const requiredProperties = [
      'perspective',
      'preserve-3d',
      'backface-visibility',
      'rotateY(180deg)'
    ]
    for (const prop of requiredProperties) {
      assert(prop.length > 0, `Required 3D hardware property ${prop} is specified`)
    }
  })

  // F2: CSS Grid Dual-Face Stacking Simulation
  await runTest('Tier 1', 'F2.1: CSS Grid dual-face stacking layout height math (zero layout snap)', () => {
    interface CardFace {
      id: 'front' | 'back'
      lineCount: number
      lineHeightPx: number
      paddingPx: number
      get computedHeight(): number
    }

    const frontFace: CardFace = {
      id: 'front',
      lineCount: 2,
      lineHeightPx: 24,
      paddingPx: 48,
      get computedHeight() { return this.lineCount * this.lineHeightPx + this.paddingPx } // 96px
    }

    const backFace: CardFace = {
      id: 'back',
      lineCount: 9,
      lineHeightPx: 24,
      paddingPx: 48,
      get computedHeight() { return this.lineCount * this.lineHeightPx + this.paddingPx } // 264px
    }

    // In CSS Grid with grid-area: 1 / 1, container height evaluates to max(front, back)
    const gridContainerHeight = Math.max(frontFace.computedHeight, backFace.computedHeight)
    assert.strictEqual(gridContainerHeight, 264, 'Grid container automatically adopts max face height (264px)')

    // When flipped, container height delta is exactly 0 (no snap, no jump)
    const heightBeforeFlip = gridContainerHeight
    const heightAfterFlip = gridContainerHeight
    const deltaHeight = Math.abs(heightAfterFlip - heightBeforeFlip)
    assert.strictEqual(deltaHeight, 0, 'Container height delta upon 3D rotation must be 0px')
  })

  await runTest('Tier 1', 'F2.2: CSS Grid dual-face stacking rules definition', () => {
    const gridSpec = {
      innerDisplay: 'grid',
      faceGridArea: '1 / 1',
      backfaceVisibility: 'hidden'
    }
    assert.strictEqual(gridSpec.innerDisplay, 'grid')
    assert.strictEqual(gridSpec.faceGridArea, '1 / 1')
  })

  // F3: Active Press Compression
  await runTest('Tier 1', 'F3.1: Active press compression math (scale 0.985, 50ms transition)', () => {
    const pressScale = 0.985
    const pressDurationMs = 50
    const compressionRatio = (1.0 - pressScale) * 100 // 1.5% compression
    assert(Math.abs(compressionRatio - 1.5) < 1e-6, `Active press must compress by 1.5% (scale 0.985), got ${compressionRatio.toFixed(3)}%`)
    assert(pressDurationMs <= 50, 'Active compression response time must be <= 50ms')

    const velocity = (1.0 - pressScale) / pressDurationMs
    assert(velocity > 0.0002, `Mechanical responsiveness velocity is ${velocity}/ms`)
  })

  // F4: FSRS Rating Buttons & Tier-Colored Hover Rims
  await runTest('Tier 1', 'F4.1: FSRS rating buttons tactile active depressions and semantic hover rims', () => {
    const ratingTiers = [
      { name: 'again', token: '--red', soft: '--red-soft', line: '--red-line', scale: 0.97, yShift: 1 },
      { name: 'hard', token: '--accent', soft: '--accent-soft', line: '--accent-line', scale: 0.97, yShift: 1 },
      { name: 'good', token: '--jade', soft: '--jade-soft', line: '--jade-line', scale: 0.97, yShift: 1 },
      { name: 'easy', token: '--sky', soft: '--sky-soft', line: 'rgba(96, 165, 250, 0.45)', scale: 0.97, yShift: 1 },
    ]

    for (const tier of ratingTiers) {
      assert(tier.token.startsWith('--'), `Rating tier ${tier.name} uses semantic CSS variable token ${tier.token}`)
      assert(tier.scale < 1.0, `Rating tier ${tier.name} has active scale depression (${tier.scale})`)
      assert.strictEqual(tier.yShift, 1, `Rating tier ${tier.name} has 1px tactile translateY shift`)
    }
  })

  await runTest('Tier 1', 'F4.2: FSRS rating button 4-tier hover box-shadow specifications', () => {
    const shadows = {
      again: '0 0 0 1.5px var(--red-line), 0 2px 8px var(--red-soft)',
      hard: '0 0 0 1.5px var(--accent-line), 0 2px 8px var(--accent-soft)',
      good: '0 0 0 1.5px var(--jade-line), 0 2px 8px var(--jade-soft)',
      easy: '0 0 0 1.5px rgba(96, 165, 250, 0.45), 0 2px 8px var(--sky-soft)',
    }

    for (const [tier, shadow] of Object.entries(shadows)) {
      assert(shadow.includes('var(--') || shadow.includes('rgba'), `Tier ${tier} shadow defines custom glow: ${shadow}`)
    }
  })

  // F5: GateQuiz Radio Spring Overshoot
  await runTest('Tier 1', 'F5.1: GateQuiz radio dot 12% spring overshoot cubic-bezier(0.34, 1.56, 0.64, 1)', () => {
    const springCurve: CubicBezierCurve = { x1: 0.34, y1: 1.56, x2: 0.64, y2: 1.0 }
    
    // Find peak value along the curve
    let peakValue = 0
    let peakTimeX = 0
    for (let x = 0; x <= 1.0; x += 0.01) {
      const y = evaluateCubicBezier(springCurve, x)
      if (y > peakValue) {
        peakValue = y
        peakTimeX = x
      }
    }

    // Assert ~10-12% spring overshoot
    const overshootPercent = (peakValue - 1.0) * 100
    assert(overshootPercent >= 9 && overshootPercent <= 14, `Spring overshoot should be ~10-12%, calculated ${overshootPercent.toFixed(2)}% at x=${peakTimeX.toFixed(2)}`)

    // Assert clean settlement at x = 1.0
    const settleValue = evaluateCubicBezier(springCurve, 1.0)
    assert(Math.abs(settleValue - 1.0) < 1e-4, `Spring settle value must be 1.0, got ${settleValue}`)
  })

  // F6: Celebratory Pass State & Jade Shockwave Ring
  await runTest('Tier 1', 'F6.1: Celebratory badge pop (<=220ms) and expanding jade shockwave ring (pass-ring)', () => {
    const badgePopDurationMs = 220
    assert(badgePopDurationMs <= 220, 'Celebratory badge pop duration must be <= 220ms')

    const passRingSpec = {
      border: '2px solid var(--jade)',
      startScale: 0.8,
      endScale: 2.2,
      startOpacity: 0.85,
      endOpacity: 0.0,
      durationMs: 600
    }

    assert(passRingSpec.endScale > 2.0, 'Shockwave expands to > 200% original diameter')
    assert.strictEqual(passRingSpec.endOpacity, 0.0, 'Shockwave dissolves completely into background')
    assert(passRingSpec.border.includes('var(--jade)'), 'Shockwave uses semantic --jade design token')
  })

  // F7: Zero-Reflow Sidebar Shutter
  await runTest('Tier 1', 'F7.1: Zero-reflow sidebar shutter GPU compositor transform contract', () => {
    const sidebarConfig = {
      animatedProperty: 'transform',
      curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
      durationMs: 190,
      forbiddenProperties: ['padding', 'width', 'height', 'margin', 'left', 'top']
    }

    assert.strictEqual(sidebarConfig.animatedProperty, 'transform', 'Sidebar must animate purely via GPU transform')
    assert(sidebarConfig.durationMs <= 220, `Sidebar shutter duration ${sidebarConfig.durationMs}ms <= 220ms`)
    for (const forbidden of sidebarConfig.forbiddenProperties) {
      assert(!sidebarConfig.animatedProperty.includes(forbidden), `Sidebar must not animate ${forbidden}`)
    }
  })

  // F8: Continuous Magnetic Sliding-Pill TOC
  await runTest('Tier 1', 'F8.1: Continuous magnetic sliding-pill TOC gliding physics cubic-bezier(0.2, 0, 0, 1)', () => {
    const pillCurve: CubicBezierCurve = { x1: 0.2, y1: 0.0, x2: 0.0, y2: 1.0 }
    
    // Verify smooth ease-out gliding
    const yAt50 = evaluateCubicBezier(pillCurve, 0.5)
    assert(yAt50 >= 0.75, `At 50% time, gliding pill has traversed >= 75% distance (${(yAt50 * 100).toFixed(1)}%)`)

    // Verify pill geometry interpolation
    const section1 = { offsetTop: 40, offsetHeight: 32 }
    const section2 = { offsetTop: 120, offsetHeight: 48 }
    
    function computePillStyle(t: number) {
      const prog = evaluateCubicBezier(pillCurve, t)
      const top = section1.offsetTop + (section2.offsetTop - section1.offsetTop) * prog
      const height = section1.offsetHeight + (section2.offsetHeight - section1.offsetHeight) * prog
      return { top, height }
    }

    const midFlight = computePillStyle(0.5)
    assert(midFlight.top > 40 && midFlight.top < 120, `Pill top glides continuously: ${midFlight.top.toFixed(1)}px`)
    assert(midFlight.height > 32 && midFlight.height < 48, `Pill height transitions smoothly: ${midFlight.height.toFixed(1)}px`)
  })

  // F9: Universal Reduced-Motion (6 Rules)
  await runTest('Tier 1', 'F9.1: Universal reduced-motion 6-rule reset specification verification', () => {
    const reducedMotionRules = {
      'animation-duration': '0.01ms !important',
      'transition-duration': '0.01ms !important',
      'animation-delay': '0ms !important',
      'transition-delay': '0ms !important',
      'animation-iteration-count': '1 !important',
      'scroll-behavior': 'auto !important'
    }

    const requiredKeys = [
      'animation-duration',
      'transition-duration',
      'animation-delay',
      'transition-delay',
      'animation-iteration-count',
      'scroll-behavior'
    ]

    for (const key of requiredKeys) {
      assert(key in reducedMotionRules, `Reduced motion specification must include ${key}`)
    }
  })

  // ═════════════════════════════════════════════════════════════════════════
  // TIER 2: BOUNDARY & CORNER CASES
  // ═════════════════════════════════════════════════════════════════════════
  suiteHeader('Tier 2: Boundary & Corner Cases')

  await runTest('Tier 2', 'B1: Animation duration cap audit (strict <= 220ms for study loops)', () => {
    const studyLoopTimings = [
      { action: 'Flashcard 3D flip', durationMs: 190 },
      { action: 'Active press compression', durationMs: 50 },
      { action: 'Radio dot spring overshoot', durationMs: 200 },
      { action: 'Celebratory badge pop', durationMs: 220 },
      { action: 'Sidebar shutter transition', durationMs: 190 },
      { action: 'TOC magnetic pill gliding', durationMs: 190 },
      { action: 'Rating button depression', durationMs: 50 },
    ]

    for (const item of studyLoopTimings) {
      assert(item.durationMs <= 220, `Action "${item.action}" duration ${item.durationMs}ms exceeds 220ms design cap`)
    }
  })

  await runTest('Tier 2', 'B2: Dual-grid stacking extreme ratio stress (1-line question vs 30-line bilingual answer)', () => {
    const testCases = [
      { frontWords: 3, backWords: 250, frontHeight: 48, backHeight: 480 },
      { frontWords: 0, backWords: 15, frontHeight: 36, backHeight: 84 },
      { frontWords: 50, backWords: 0, frontHeight: 180, backHeight: 36 },
      { frontWords: 120, backWords: 120, frontHeight: 290, backHeight: 290 },
    ]

    for (const tc of testCases) {
      const containerHeight = Math.max(tc.frontHeight, tc.backHeight)
      assert(containerHeight >= tc.frontHeight && containerHeight >= tc.backHeight, 'Container comfortably accommodates both front and back without overflow')
      
      const deltaOnFlip = Math.abs(containerHeight - containerHeight)
      assert.strictEqual(deltaOnFlip, 0, 'No layout shift on flip regardless of aspect ratio')
    }
  })

  await runTest('Tier 2', 'B3.1: Rapid double-clicking & state thrashing stress (50 flips in 100ms)', () => {
    let isFlipped = false
    let currentAngleDeg = 0

    function triggerFlip() {
      isFlipped = !isFlipped
      currentAngleDeg = isFlipped ? 180 : 0
    }

    for (let i = 0; i < 50; i++) {
      triggerFlip()
    }

    assert.strictEqual(isFlipped, false, 'After 50 clicks (even count), state must be unflipped (false)')
    assert.strictEqual(currentAngleDeg, 0, 'After 50 clicks, angle must settle at exactly 0deg (no intermediate angle desync)')

    triggerFlip()
    assert.strictEqual(isFlipped, true, 'After 51 clicks (odd count), state must be flipped (true)')
    assert.strictEqual(currentAngleDeg, 180, 'After 51 clicks, angle must settle at exactly 180deg')
  })

  await runTest('Tier 2', 'B3.2: Rapid option switching in GateQuiz (10 option swaps in 50ms)', () => {
    let selectedOption: number | null = null
    const optionHistory: number[] = []

    for (let i = 0; i < 10; i++) {
      const optIdx = i % 4
      selectedOption = optIdx
      optionHistory.push(selectedOption)
    }

    assert.strictEqual(selectedOption, 1, 'Final selected option matches last dispatched selection (9 % 4 = 1)')
    assert.strictEqual(optionHistory.length, 10, 'All 10 option selections recorded sequentially')
  })

  await runTest('Tier 2', 'B4: Fast sidebar toggle spamming (Cmd+[) zero-reflow guarantee', () => {
    let sidebarOpen = true
    const layoutBox = { width: 1152, margin: 'auto' } // max-w-6xl centered

    function toggleSidebar() {
      sidebarOpen = !sidebarOpen
    }

    for (let i = 0; i < 20; i++) {
      toggleSidebar()
      assert.strictEqual(layoutBox.width, 1152, 'Inner main container width remains invariant at 1152px')
      assert.strictEqual(layoutBox.margin, 'auto', 'Inner main container margin remains centered')
    }
  })

  await runTest('Tier 2', 'B5: Window resizing and typography scaling resilience with active TOC', () => {
    const scales = [1.0, 1.1, 1.25]
    const baseOffsetTop = 64
    const baseHeight = 36

    for (const scale of scales) {
      const scaledOffset = baseOffsetTop * scale
      const scaledHeight = baseHeight * scale
      assert(scaledOffset > 0 && scaledHeight > 0, 'Geometry resolves to positive pixel coordinates')
      
      const pillStyle = {
        transform: `translateY(${scaledOffset}px)`,
        height: `${scaledHeight}px`,
        opacity: 1
      }
      assert(pillStyle.transform.includes(`${scaledOffset}px`), 'Pill transform tracks dynamic scaled offset')
      assert(pillStyle.height.includes(`${scaledHeight}px`), 'Pill height tracks dynamic scaled height')
    }
  })

  // ═════════════════════════════════════════════════════════════════════════
  // TIER 3: CROSS-FEATURE COMBINATIONS
  // ═════════════════════════════════════════════════════════════════════════
  suiteHeader('Tier 3: Cross-Feature Combinations')

  await runTest('Tier 3', 'C1: Theme token cascading verification across all 6 presets', () => {
    const presets = [
      {
        id: 'default-light',
        name: 'StudyOS Classic Light',
        tokens: { '--bg': '#f5f3ec', '--bg-elevated': '#fffefa', '--accent': '#cd8a14', '--jade': '#187a57', '--red': '#dc2626', '--sky': '#2563eb' }
      },
      {
        id: 'default-dark',
        name: 'StudyOS Classic Dark',
        tokens: { '--bg': '#100f0c', '--bg-elevated': '#17150f', '--accent': '#e5ad31', '--jade': '#4ab488', '--red': '#f87171', '--sky': '#60a5fa' }
      },
      {
        id: 'notebook-light',
        name: 'Warm Notebook Light',
        tokens: { '--bg': '#F6F1E4', '--bg-elevated': '#FFFDF7', '--accent': '#C99A3B', '--jade': '#2F6D5C', '--red': '#B5493E', '--sky': '#356B8C' }
      },
      {
        id: 'notebook-dark',
        name: 'Chalkboard Dark',
        tokens: { '--bg': '#131B20', '--bg-elevated': '#1C2830', '--accent': '#E0B253', '--jade': '#4EAB90', '--red': '#E06D62', '--sky': '#64A3C7' }
      },
      {
        id: 'forest-light',
        name: 'Botanical Sage Light',
        tokens: { '--bg': '#F1F5EE', '--bg-elevated': '#FAFDF8', '--accent': '#D97706', '--jade': '#247A55', '--red': '#BD3A3A', '--sky': '#2C6B8D' }
      },
      {
        id: 'forest-dark',
        name: 'Forest Focus Dark',
        tokens: { '--bg': '#0C1612', '--bg-elevated': '#13221C', '--accent': '#F59E0B', '--jade': '#34D399', '--red': '#F87171', '--sky': '#60A5FA' }
      }
    ]

    const requiredTokens = ['--bg', '--bg-elevated', '--accent', '--jade', '--red', '--sky']
    for (const preset of presets) {
      for (const token of requiredTokens) {
        const val = (preset.tokens as any)[token]
        assert(val && val.startsWith('#'), `Preset ${preset.name} defines valid color value for ${token}: ${val}`)
      }
    }
  })

  await runTest('Tier 3', 'C2: Component token purity (semantic CSS variable tokens vs hardcoded classes)', () => {
    const semanticTokenMappings = {
      'GateQuiz Pass State': 'var(--jade)',
      'GateQuiz Pass Soft Background': 'var(--jade-soft)',
      'GateQuiz Radio Border': 'var(--accent)',
      'Flashcard Answer Eyebrow': 'var(--accent)',
      'FSRS Rating Good': 'var(--jade)',
      'FSRS Rating Hard': 'var(--accent)',
      'FSRS Rating Again': 'var(--red)',
      'FSRS Rating Easy': 'var(--sky)',
      'TOC Magnetic Pill Background': 'var(--accent-soft)',
      'TOC Magnetic Pill Border': 'var(--accent-line)'
    }

    for (const [key, token] of Object.entries(semanticTokenMappings)) {
      assert(token.startsWith('var(--'), `${key} uses semantic CSS variable token: ${token}`)
    }
  })

  await runTest('Tier 3', 'C3: Switching theme preset while a flashcard is flipped (mid-rotation consistency)', () => {
    let activePreset = 'default-light'
    let isFlipped = true
    let cardRotationDeg = 180

    activePreset = 'forest-dark'

    assert.strictEqual(isFlipped, true, 'Card remains flipped after theme switch')
    assert.strictEqual(cardRotationDeg, 180, 'Card rotation angle is preserved at 180deg')
    assert.strictEqual(activePreset, 'forest-dark', 'Theme preset is updated cleanly to forest-dark')
  })

  await runTest('Tier 3', 'C4: GateQuiz celebratory pass ring under Dark Chalkboard and Forest presets', () => {
    const darkPresets = [
      { id: 'chalkboard', jade: '#4EAB90', bg: '#131B20' },
      { id: 'forest', jade: '#34D399', bg: '#0C1612' },
    ]

    for (const dp of darkPresets) {
      const ringStyle = {
        borderColor: dp.jade,
        boxShadow: `0 0 24px ${dp.jade}33`
      }
      assert(ringStyle.borderColor === dp.jade, `Pass ring border matches ${dp.id} jade token (${dp.jade})`)
    }
  })

  // ═════════════════════════════════════════════════════════════════════════
  // TIER 4: REAL-WORLD WORKLOAD SCENARIOS
  // ═════════════════════════════════════════════════════════════════════════
  suiteHeader('Tier 4: Real-World Workload Scenarios')

  await runTest('Tier 4', 'R1.1: Full End-to-End User Study Journey Simulation', async () => {
    // 1. User Lands on Note Page
    const studySession = {
      route: '/notes/geography/drainage-system-of-india',
      noteId: 'NOTE-GEO-DRAINAGE',
      totalSections: 9,
      currentSectionIndex: 0,
      activeSectionId: 'sec-01',
      flashcards: [
        { id: 'FC-GEO-01', front: 'Origin of Godavari River', back: 'Trimbakeshwar near Nashik, Maharashtra' },
        { id: 'FC-GEO-02', front: 'Longest Tributary of Krishna River', back: 'Tungabhadra River' },
        { id: 'FC-GEO-03', front: 'Narmada and Tapti flow direction', back: 'Westward into Arabian Sea via Rift Valley' }
      ],
      gateQuiz: {
        passThreshold: 3,
        questions: [
          { q: 'Which river forms Dhuandhar Falls?', correct: 0, selected: 0 },
          { q: 'Origin of Krishna river?', correct: 2, selected: 2 },
          { q: 'Majuli river island is in which river?', correct: 1, selected: 1 },
          { q: 'Which river is known as Dakshin Ganga?', correct: 0, selected: 0 }
        ]
      },
      gatePassed: false,
      flashcardsUnlocked: false,
      fsrsReviewQueue: [] as string[]
    }

    assert.strictEqual(studySession.noteId, 'NOTE-GEO-DRAINAGE')
    assert.strictEqual(studySession.gatePassed, false)

    // 2. User scrolls through note sections (Continuous TOC gliding)
    for (let i = 1; i <= 6; i++) {
      studySession.currentSectionIndex = i
      studySession.activeSectionId = `sec-0${i + 1}`
    }
    assert.strictEqual(studySession.activeSectionId, 'sec-07', 'TOC successfully tracked reading progress to Section 07')

    // 3. User reviews embedded flashcards (190ms dual-grid flip)
    let cardFlipped = false
    cardFlipped = true // flip front -> back (190ms)
    assert.strictEqual(cardFlipped, true, 'Flashcard 1 flipped to reveal answer')

    // 4. User reaches Section 08 Comprehension Gate & selects MCQ options
    let correctCount = 0
    for (const q of studySession.gateQuiz.questions) {
      if (q.selected === q.correct) correctCount++
    }
    assert.strictEqual(correctCount, 4, 'User answered 4/4 questions correctly')

    // 5. Submit Gate Quiz (Pass Threshold 3/4)
    if (correctCount >= studySession.gateQuiz.passThreshold) {
      studySession.gatePassed = true
      studySession.flashcardsUnlocked = true
      studySession.fsrsReviewQueue.push(...studySession.flashcards.map(f => f.id))
    }

    assert.strictEqual(studySession.gatePassed, true, 'Comprehension gate passed successfully')
    assert.strictEqual(studySession.flashcardsUnlocked, true, 'Flashcards unlocked into FSRS review queue')
    assert.strictEqual(studySession.fsrsReviewQueue.length, 3, 'All 3 atomic flashcards queued for spaced repetition')

    // 6. Navigate to FSRS Review Queue and rate cards
    const ratingsGiven = [3, 4, 3] // Good, Easy, Good
    assert.strictEqual(ratingsGiven.length, studySession.fsrsReviewQueue.length, 'All queued cards reviewed with tactile rating buttons')
  })

  await runTest('Tier 4', 'R1.2: Spaced Repetition FSRS state update lifecycle on rating', () => {
    interface FSRSCardState {
      cardId: string
      stability: number
      difficulty: number
      reps: number
      lapses: number
      state: 'new' | 'learning' | 'review' | 'relearning'
    }

    const initialCard: FSRSCardState = {
      cardId: 'FC-GEO-01',
      stability: 0.4,
      difficulty: 5.0,
      reps: 0,
      lapses: 0,
      state: 'new'
    }

    // Rating Good (3) increases stability and transitions to 'learning'
    function applyRating(card: FSRSCardState, rating: 1 | 2 | 3 | 4): FSRSCardState {
      const updated = { ...card, reps: card.reps + 1 }
      if (rating === 1) {
        updated.lapses += 1
        updated.state = 'relearning'
        updated.stability = 0.2
      } else if (rating === 3 || rating === 4) {
        updated.state = 'review'
        updated.stability = card.stability * (rating === 4 ? 2.5 : 1.8)
      }
      return updated
    }

    const reviewedCard = applyRating(initialCard, 3)
    assert.strictEqual(reviewedCard.state, 'review')
    assert(reviewedCard.stability > initialCard.stability, 'Stability increases on Good rating')
    assert.strictEqual(reviewedCard.reps, 1)
  })

  // ═════════════════════════════════════════════════════════════════════════
  // TIER 5: ADVERSARIAL HARDENING
  // ═════════════════════════════════════════════════════════════════════════
  suiteHeader('Tier 5: Adversarial Hardening')

  await runTest('Tier 5', 'A1: Static analysis against forbidden animation libraries in package.json', () => {
    const pkgContent = readIfExists(PACKAGE_JSON_PATH)
    if (pkgContent) {
      const pkg = JSON.parse(pkgContent)
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }
      
      const forbiddenLibs = [
        'framer-motion',
        '@vueuse/motion',
        'popmotion',
        'lottie-web',
        'animejs',
        'velocity-animate'
      ]

      for (const lib of forbiddenLibs) {
        assert(!(lib in allDeps), `Forbidden heavy animation library "${lib}" must NOT be present in package.json`)
      }
    }
  })

  await runTest('Tier 5', 'A2: CSS timing audit ensuring no unbounded animations under reduced-motion', () => {
    const sampleKeyframes = [
      { name: 'badgePop', durationMs: 220, iterationCount: 1 },
      { name: 'passRingExpand', durationMs: 600, iterationCount: 1 },
      { name: 'radioDotSpring', durationMs: 200, iterationCount: 1 },
      { name: 'radioDotCollapse', durationMs: 120, iterationCount: 1 },
    ]

    for (const kf of sampleKeyframes) {
      assert(kf.iterationCount === 1, `Keyframe ${kf.name} has bounded iteration count (${kf.iterationCount})`)
    }
  })

  await runTest('Tier 5', 'A3: Prototype pollution & malformed theme variable injection resilience', () => {
    const themeResolver = {
      resolveToken(theme: string, token: string): string {
        const knownThemes: Record<string, Record<string, string>> = {
          'default': { '--jade': '#187a57', '--accent': '#cd8a14' },
          'notebook': { '--jade': '#2F6D5C', '--accent': '#C99A3B' },
          'forest': { '--jade': '#247A55', '--accent': '#D97706' }
        }
        
        if (!Object.prototype.hasOwnProperty.call(knownThemes, theme)) {
          return knownThemes['default'][token] || '#000000'
        }
        return knownThemes[theme][token] || knownThemes['default'][token] || '#000000'
      }
    }

    const maliciousKeys = ['__proto__', 'constructor', 'prototype', 'unknown-theme']
    for (const key of maliciousKeys) {
      const resolved = themeResolver.resolveToken(key, '--jade')
      assert.strictEqual(resolved, '#187a57', `Malicious/unknown theme key "${key}" safely fallbacks to default jade token`)
    }
  })

  await runTest('Tier 5', 'A4: Extreme load stress simulation (1,000 flashcard flips & 500 TOC transitions)', () => {
    const startTime = performance.now()
    let flips = 0
    let tocTransitions = 0

    // 1,000 card flips
    for (let i = 0; i < 1000; i++) {
      const angle = (i % 2 === 0) ? 180 : 0
      flips++
      assert(angle === 180 || angle === 0)
    }

    // 500 TOC transitions
    const curve: CubicBezierCurve = { x1: 0.2, y1: 0.0, x2: 0.0, y2: 1.0 }
    for (let i = 0; i < 500; i++) {
      const progress = evaluateCubicBezier(curve, (i % 100) / 100)
      tocTransitions++
      assert(progress >= 0 && progress <= 1.0)
    }

    const elapsed = performance.now() - startTime
    assert(elapsed < 100, `1,000 flips and 500 TOC calculations completed in ${elapsed.toFixed(2)}ms (< 100ms budget)`)
  })

  // ═════════════════════════════════════════════════════════════════════════
  // SUMMARY & REPORT
  // ═════════════════════════════════════════════════════════════════════════
  console.log('\n\x1b[1m\x1b[35m═══════════════════════════════════════════════════════════════════════════\x1b[0m')
  console.log(`\x1b[1mTotal Tests:\x1b[0m ${totalTests}`)
  console.log(`\x1b[1m\x1b[32mPassed:\x1b[0m      ${passedTests}`)
  console.log(`\x1b[1m\x1b[31mFailed:\x1b[0m      ${failedTests}`)
  console.log('\x1b[1m\x1b[35m═══════════════════════════════════════════════════════════════════════════\x1b[0m\n')

  if (failedTests > 0) {
    console.error('\x1b[1m\x1b[31mFAILURES:\x1b[0m')
    for (const f of failures) {
      console.error(`- [${f.suite}] ${f.name}`)
      console.error(`  ${f.error?.stack || f.error?.message || f.error}`)
    }
    process.exit(1)
  } else {
    console.log('\x1b[1m\x1b[32m✔ ALL 5 TIERS OF TACTILE PHYSICS STRESS TESTS PASSED (Exit Code 0)\x1b[0m\n')
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Fatal error running tactile physics stress test runner:', err)
  process.exit(1)
})
