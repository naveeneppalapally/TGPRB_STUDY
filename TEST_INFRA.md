# E2E Test Infra: TSLPRB StudyOS Tactile Micro-Animations & Physics

## Test Philosophy
- Requirement-driven and physics-verified.
- Automated verification of zero layout shifts (CLS = 0), strict animation timing caps (<= 220ms), tactile press compression (50ms), CSS Grid dual-face stacking, theme compatibility across all 6 presets, and universal reduced-motion accessibility.
- Methodology: Category-Partition + Boundary Value Analysis + Pairwise Combinatorial + Real-World Workload + Adversarial Hardening.

---

## Feature Inventory
| # | Feature | Source | Tier 1 | Tier 2 | Tier 3 | Tier 4 |
|---|---|---|:---:|:---:|:---:|:---:|
| F1 | Flashcard 190ms Snappy Flip | ORIGINAL_REQUEST §R1 | ✓ | ✓ | ✓ | ✓ |
| F2 | Flashcard Dual-Grid Stack | ORIGINAL_REQUEST §R1 | ✓ | ✓ | ✓ | ✓ |
| F3 | Tactile FSRS Ratings & Press | ORIGINAL_REQUEST §R1 | ✓ | ✓ | ✓ | ✓ |
| F4 | GateQuiz Key-Switch Press | ORIGINAL_REQUEST §R2 | ✓ | ✓ | ✓ | ✓ |
| F5 | GateQuiz Radio Spring Overshoot | ORIGINAL_REQUEST §R2 | ✓ | ✓ | ✓ | ✓ |
| F6 | Celebratory Pass State & Shockwave | ORIGINAL_REQUEST §R2 | ✓ | ✓ | ✓ | ✓ |
| F7 | Zero-Reflow Sidebar Shutter | ORIGINAL_REQUEST §R3 | ✓ | ✓ | ✓ | ✓ |
| F8 | Continuous Magnetic Sliding-Pill TOC | ORIGINAL_REQUEST §R4 | ✓ | ✓ | ✓ | ✓ |
| F9 | Universal Reduced-Motion (6 rules) | ORIGINAL_REQUEST §R5 | ✓ | ✓ | ✓ | ✓ |
| F10 | 6 Theme Presets Compatibility | ORIGINAL_REQUEST Acceptance | ✓ | ✓ | ✓ | ✓ |
| F11 | Clean Build & Zero Regressions | ORIGINAL_REQUEST Acceptance | ✓ | ✓ | ✓ | ✓ |

---

## Test Architecture
- **Test Runner**: Node / `tsx` executing `scripts/test-tactile-physics-stress.ts` and `npm test`.
- **Invocation**: `npx tsx scripts/test-tactile-physics-stress.ts` and `npm test` and `npm run build`.
- **Pass/Fail Semantics**: 100% assertions must pass with exit code 0. Zero compiler warnings or TypeScript errors.

---

## Test Tiers & Scenarios

### Tier 1: Feature Coverage (Isolation Verification)
1. `.flip-card-inner` transition duration is strictly 190ms and timing function is `cubic-bezier(0.16, 1, 0.3, 1)`.
2. `.flip-card-face` has `grid-area: 1 / 1` and `.flip-card-inner` has `display: grid`.
3. `.btn-again`, `.btn-hard`, `.btn-good`, `.btn-easy` have `:active` depressions and semantic hover rims.
4. `.opt` in `GateQuiz.vue` has `:active { transform: scale(0.985); }`.
5. `GateQuiz.vue` radio dot has spring animation with `cubic-bezier(0.34, 1.56, 0.64, 1)`.
6. `GateQuiz.vue` contains celebratory badge pop and `.pass-ring` expanding jade shockwave.
7. `layouts/default.vue` contains zero `transition-[padding]` and uses GPU `transform` for sidebar shutter.
8. TOC contains continuous floating pill gliding with `cubic-bezier(0.2, 0, 0, 1)`.
9. `assets/css/main.css` reduced motion query contains all 6 reset rules.

### Tier 2: Boundary & Corner Cases
1. Long multi-line answer vs 1-line question in flashcard: container height maintains `max(front, back)` with zero height snap.
2. Rapid double-clicking on flashcards: no animation desync or stuck intermediate 3D angle.
3. Rapid clicking between GateQuiz options: smooth spring overshoot re-triggering without DOM glitching.
4. Fast sidebar toggle spamming (`⌘[`): zero text reflow or layout recalculation.
5. Window resizing with active TOC: `ResizeObserver` recalculates pill position and height accurately.

### Tier 3: Cross-Feature Combinations
1. Switching theme preset while a flashcard is flipped: color tokens and 3D backface remain seamless.
2. Toggling sidebar while scrolling through note page: TOC pill remains aligned to active section.
3. GateQuiz pass celebratory ring rendering under Dark Mode Chalkboard and Forest presets: jade shockwave ring color cascading.

### Tier 4: Real-World Workload Scenarios
1. Complete note study flow: Landing on note page -> scrolling sections with continuous magnetic TOC pill -> reviewing embedded flashcards with 190ms dual-grid flip -> passing GateQuiz with celebratory jade shockwave pop -> navigating to FSRS review queue with tactile rating buttons.

### Tier 5: Adversarial Hardening
1. Static analysis of all CSS/Vue files for any transition duration exceeding 220ms in study loops.
2. Static analysis for any layout-triggering animated properties (`padding`, `margin`, `width`, `height`, `top`, `left`).
3. Verification that all 6 theme modes render valid hex/rgb tokens with zero missing CSS variables.
