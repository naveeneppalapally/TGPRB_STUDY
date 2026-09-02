# Project: TSLPRB StudyOS Tactile Micro-Animations & Zero-Layout-Shift Physics

## Architecture
TSLPRB StudyOS high-craft tactile micro-animations and zero-layout-shift physics layer built with Nuxt 3, Nuxt UI, and modern pure CSS / GPU-accelerated transforms.

### Key Architectural Pillars:
1. **GPU Compositor Acceleration**: All animation and transition logic runs exclusively on compositor properties (`transform`, `opacity`). Zero animating of box model geometry (`padding`, `width`, `height`, `margin`, `top`, `left`) to guarantee zero layout shifts (CLS = 0) and zero CPU text reflows.
2. **Snappy Micro-Motion Timing**: All repetitive study actions strictly capped under 220ms (Flashcard flip: 190ms `cubic-bezier(0.16, 1, 0.3, 1)`, active compression: 50ms `scale(0.985)`, radio dot spring overshoot: 200ms `cubic-bezier(0.34, 1.56, 0.64, 1)`, celebratory pass badge pop: 220ms, sidebar shutter: 190ms, TOC gliding pill: 190ms `cubic-bezier(0.2, 0, 0, 1)`).
3. **CSS Grid Dual-Face Stacking**: Flashcard faces share `grid-area: 1 / 1` in a single 3D grid cell, naturally evaluating container height to `max(height(front), height(back))` without height collapse, layout jumping, or internal scrolling.
4. **Universal Reduced-Motion Invariants**: Complete 6-property reset (`animation-duration: 0.01ms`, `transition-duration: 0.01ms`, `animation-delay: 0ms`, `transition-delay: 0ms`, `animation-iteration-count: 1`, `scroll-behavior: auto !important`) under `@media (prefers-reduced-motion: reduce)`, plus JS runtime guard for GSAP timelines to guarantee instantaneous state transitions without animation hangs or broken interaction logic.
5. **Theme Presets & Design Token Purity**: Full aesthetic fidelity across all 6 theme modes (Classic Light/Dark, Notebook Light/Dark, Forest Light/Dark) utilizing semantic CSS variables (`--jade`, `--accent`, `--red`, `--sky`, `--line`, `--bg-elevated`).

---

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---|---|---|---|
| F1 | Flashcard 190ms Snappy Flip | Accelerate flip from 500ms to 190ms using `cubic-bezier(0.16, 1, 0.3, 1)` | M1 | ORIGINAL_REQUEST §R1 |
| F2 | Flashcard Dual-Grid Stack | Implement CSS Grid `grid-area: 1 / 1` dual-face stacking to eliminate container height collapse and jumping | M1 | ORIGINAL_REQUEST §R1 |
| F3 | Flashcard Press & Tactile FSRS Ratings | 50ms active compression (`scale(0.985)`), rating button depressions (`scale(0.97)` / `translateY(1px)`), tier-colored hover rims (`--red`, `--accent`, `--jade`, `--sky`) | M1 | ORIGINAL_REQUEST §R1 |
| F4 | GateQuiz Key-Switch Press | Mechanical press feedback (`scale(0.985)` on pointer down / `:active`) on MCQ options | M2 | ORIGINAL_REQUEST §R2 |
| F5 | GateQuiz Radio Spring Overshoot | 12% spring overshoot animation on radio dot selection (`cubic-bezier(0.34, 1.56, 0.64, 1)`) | M2 | ORIGINAL_REQUEST §R2 |
| F6 | Celebratory Pass State & Jade Shockwave | 220ms celebratory badge pop with expanding concentric jade shockwave ring (`pass-ring`) dissolving smoothly | M2 | ORIGINAL_REQUEST §R2 |
| F7 | Zero-Reflow Sidebar Shutter | Remove `transition-[padding]`; implement GPU transform shutter (`transform: translateX(...)`) with fixed inner content bounds | M3 | ORIGINAL_REQUEST §R3 |
| F8 | Continuous Magnetic Sliding-Pill TOC | Replace discrete background swaps with a continuous floating pill gliding along Y-axis (`cubic-bezier(0.2, 0, 0, 1)`) with `ResizeObserver` resilience | M4 | ORIGINAL_REQUEST §R4 |
| F9 | Universal Reduced-Motion Accessibility | Complete 6-property reset in CSS and JS runtime guards for instantaneous 1ms transitions under `prefers-reduced-motion` | M5 | ORIGINAL_REQUEST §R5 |
| F10 | 6-Theme Presets Harmony & Color Purity | Ensure full compatibility of pass rings, tier rims, sliding pill, and borders across all 6 Light/Dark theme presets | M5 | ORIGINAL_REQUEST Acceptance |
| F11 | E2E Physics, Timing, & Build Verification | Automated test suite validating duration caps (<=220ms), layout shift immunity, theme stability, and full build pass | M6 | ORIGINAL_REQUEST Acceptance |

---

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|---|---|---|---|
| M1 | Flashcard 190ms Dual-Grid Stack & Tactile FSRS Rating | `assets/css/main.css`, `components/FlashcardDeck.vue`, `components/FlashcardReview.vue`, `pages/review.vue` | None | PLANNED |
| M2 | Tactile GateQuiz Option Selection & Celebratory Pass State | `components/GateQuiz.vue`, `assets/css/main.css` | None | PLANNED |
| M3 | Zero-Reflow Sidebar Shutter Transition | `layouts/default.vue` | None | PLANNED |
| M4 | Continuous Magnetic Sliding-Pill TOC | `pages/notes/**`, `components/NoteToc.vue` (if extracted) | None | PLANNED |
| M5 | Universal Reduced-Motion Accessibility & Theme Compatibility | `assets/css/main.css`, `components/DrainageMap.vue`, `composables/useCollapse.ts` | M1, M2, M3, M4 | PLANNED |
| M6 | Full E2E Test Suite, Verification & Hardening | `scripts/test-tactile-physics-stress.ts`, `npm test`, `npm run build` | M1, M2, M3, M4, M5 | PLANNED |

---

## Interface Contracts

### 1. Flashcard 3D Grid Contract (`assets/css/main.css` ↔ Components)
- `.flip-card`: `perspective: 1400px; display: block; width: 100%; transition: transform 50ms cubic-bezier(0.16, 1, 0.3, 1);`
- `.flip-card:active`: `transform: scale(0.985);`
- `.flip-card-inner`: `display: grid; grid-template-columns: 1fr; grid-template-rows: 1fr; width: 100%; transform-style: preserve-3d; transition: transform 190ms cubic-bezier(0.16, 1, 0.3, 1);`
- `.flip-card-face`: `grid-area: 1 / 1; backface-visibility: hidden; -webkit-backface-visibility: hidden; width: 100%; height: 100%;`
- `.flip-card-face.flip-card-back`: `transform: rotateY(180deg);`
- FSRS Rating buttons: `.btn-again`, `.btn-hard`, `.btn-good`, `.btn-easy` with `:active { transform: scale(0.97) translateY(1px); }` and semantic `:hover` box-shadow rims (`--red`, `--accent`, `--jade`, `--sky`).

### 2. GateQuiz Tactile Contract (`components/GateQuiz.vue`)
- `.opt`: `:active { transform: scale(0.985); transition: transform 50ms cubic-bezier(0.16, 1, 0.3, 1); }`
- Radio dot entry: `animation: radioDotSpring 200ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;`
- Radio dot exit: `animation: radioDotCollapse 120ms ease-in forwards;`
- Pass celebratory badge: `.celebrate-badge { animation: badgePop 220ms cubic-bezier(0.34, 1.56, 0.64, 1) both; }`
- Pass shockwave ring: `.pass-ring { border: 2px solid var(--jade); animation: passRingExpand 600ms cubic-bezier(0.16, 1, 0.3, 1) forwards; }`

### 3. Zero-Reflow Sidebar Shutter Contract (`layouts/default.vue`)
- Main container: `min-h-screen flex flex-col` with stable, centered layout container (`max-w-6xl mx-auto`). No `transition-[padding]`.
- Sidebar rail: `fixed inset-y-0 start-0 z-40 w-64 flex flex-col border-e b-line bg-elev transition-transform duration-190 ease-[cubic-bezier(0.16,1,0.3,1)]`
- Desktop transform toggle: `sidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'`

### 4. Continuous Magnetic Sliding-Pill TOC Contract (`pages/notes/**`)
- Container: `<nav class="relative space-y-0.5">`
- Floating Pill: `<div class="toc-pill absolute start-0 w-full rounded-md pointer-events-none transition-all duration-190" :style="pillStyle" aria-hidden="true" />`
- Pill styling: `background: var(--accent-soft); border: 1px solid var(--accent-line);`
- Gliding curve: `transition: transform 190ms cubic-bezier(0.2, 0, 0, 1), height 190ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms ease;`
- Links: `relative z-10 bg-transparent` with text color transition.

### 5. Universal Reduced-Motion Contract (`assets/css/main.css`)
```css
@media (prefers-reduced-motion: reduce) {
  html, body { scroll-behavior: auto !important; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0ms !important;
    transition-duration: 0.01ms !important;
    transition-delay: 0ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Code Layout
- `assets/css/main.css` - Global CSS architecture, 3D flip card rules, rating buttons, theme variables, reduced-motion media query.
- `components/FlashcardDeck.vue` - Note page flashcard deck component.
- `components/FlashcardReview.vue` - Standalone flashcard review component.
- `pages/review.vue` - Main FSRS review interface.
- `components/GateQuiz.vue` - Comprehension gate quiz with tactile option feedback and celebratory pass state.
- `layouts/default.vue` - Global layout with zero-reflow GPU shutter sidebar transition.
- `pages/notes/**` - 7 verified topic note pages with continuous magnetic sliding-pill TOC.
- `components/DrainageMap.vue` - River map with runtime reduced-motion guard for GSAP.
- `composables/useCollapse.ts` - Accordion/collapse composable with robust reduced-motion transitionend safety.
- `scripts/test-tactile-physics-stress.ts` - Automated test suite for micro-animation timing, CSS Grid stacking, zero layout shifts, themes, and reduced motion.
