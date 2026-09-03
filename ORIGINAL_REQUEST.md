# Original User Request

## 2026-09-01T17:07:26Z

Perform a comprehensive multi-device UI/UX audit, responsive layout inspection, theme consistency check (6 states), and edge-case bug hunt across the entire TSLPRB StudyOS application, producing a prioritized defect and triage report with exact source line references and fix recipes.

Working directory: /home/naveen/Documents/TGPRB
Integrity mode: development

## Requirements

### R1. Multi-Device Responsive & Layout Stress Audit (360px – 1440px)
- Audit all views (Note pages, Navigation bar, TOC sidebar, GateQuiz, CurrentAffairs carousel, Flashcards, Settings, Personal Notes drawer, and PYQ drill views) across 5 standard breakpoints:
  - Mobile (360px, 390px, 414px)
  - Tablet & Split-view (768px, 1024px)
  - Desktop (1440px)
- Detect horizontal overflow/scroll leaks, text clipping, flex/grid wrapping errors, and modal/drawer overlay clipping.
- Audit touch ergonomics: verify interactive elements (buttons, option pills, note flags, drawer handles, chips) meet minimum 44×44px touch targets with adequate thumb-reach spacing.

### R2. Theme Consistency & Visual Glitch Audit (6 States)
- Audit all three theme presets across both light and dark modes:
  1. **StudyOS Classic** (Light & Dark)
  2. **Botanical Sage & Forest** (Matcha Light & Midnight Spruce Dark)
  3. **Warm Notebook & Chalkboard** (Ruled Paper Light & Slate Chalkboard Dark)
- Detect hardcoded non-semantic CSS / Tailwind classes (e.g., raw `bg-white`, `text-stone-900`, `border-gray-200`) that fail to adapt across themes or break dark mode.
- Audit WCAG 2.1 AA/AAA contrast ratios for secondary metadata, date labels, chips, badges, muted text, and active/focus states.
- Verify border borders, shadows, elevation layers, and subtle gradients render cleanly without color artifacts or low-contrast borders.

### R3. Core User Flows, State Handling & Edge-Case Hunt
- Audit Sticky Navigation behavior, TOC scroll-spy accuracy and highlight sync during rapid scrolling.
- Audit GateQuiz interactive states (passing animation, retry state, feedback banner) and flashcard queue unlocking flow.
- Audit Settings view: instant theme switching feedback, reset preferences, font scaling behavior, and localStorage persistence upon hard refresh.
- Audit Personal Notes & Drawers: text highlight selection capture, drawer slide-over responsiveness on mobile, and note edit/delete state handling.
- Audit Search and filter empty states ("No notes found", "No PYQs match"), Telugu script / typography rendering, and search debounce input handling.

### R4. Structured Triage & Actionable Audit Report
- Deliver a categorized, comprehensive markdown report structured into:
  1. 🔴 **Critical Bugs / Layout Breaks** (Overlaps, horizontal scroll leaks, broken responsive states, broken flows)
  2. 🟡 **UI/UX Papercuts** (Contrast issues, touch target violations, awkward mobile padding/margins, missing hover/active feedback)
  3. 🟢 **Polish & Micro-Interaction Enhancements**
- For every reported finding, provide:
  - Exact component and file path (`path/to/file.vue:line`)
  - Triggering viewport(s) and theme state(s)
  - Reproduction scenario / visual manifestation
  - Concrete, code-ready fix recommendation

## Acceptance Criteria

### Completeness & Rigor
- [ ] Every major route, component, and drawer audited across all 5 viewports (360px, 390px, 768px, 1024px, 1440px).
- [ ] All 6 theme states (3 presets × 2 color modes) audited for token consistency and WCAG contrast.
- [ ] All findings include precise file paths, line numbers/selectors, reproducing conditions, and fix snippets.
- [ ] Report clearly separated into 🔴 Critical, 🟡 Papercuts, and 🟢 Polish tiers.
- [ ] Zero unverified speculative claims - all findings backed by codebase inspection or layout analysis.

## 2026-09-02T17:36:38Z

Build a comprehensive, high-yield study note page for topic `POL-CONST-FRAME` ("Constitutional Framework & Preamble") for TGPRB SI & Constable exam preparation in TSLPRB StudyOS.

Working directory: `/home/naveen/Documents/TGPRB`  
Integrity mode: development

## Requirements

### R1. Pedagogical Note Architecture
- Target route: `pages/notes/polity/constitutional-framework-and-preamble.vue` with NOTE ID: `NOTE-POL-CONST-FRAME`.
- Structure the content following the **Polity 4-Tier Architecture & Historical Evolution**:
  1. **Company Rule (1773–1858)**: Regulating Act 1773, Pitt's India Act 1784, Charter Acts (1813, 1833, 1853).
  2. **Crown Rule (1858–1947)**: GoI Act 1858, Indian Councils Acts (1861, 1892, 1909 Morley-Minto), GoI Act 1919 (Dyarchy in Provinces), GoI Act 1935 (Provincial Autonomy & All-India Federation), Indian Independence Act 1947.
  3. **Making of the Constitution**: Constituent Assembly milestones (Dec 9, 1946 to Jan 26, 1950), Drafting Committee under Dr. B.R. Ambedkar, Objective Resolution, Major Borrowed Sources.
  4. **The Preamble & Salient Features**: Preamble keywords order, 42nd Amendment 1976 additions (Socialist, Secular, Integrity), 12 Schedules breakdown.
  5. **TGPRB Exam Trap Matrix**: Side-by-side contrastive tables for high-frequency PYQ confusions (Dyarchy 1919 vs 1935, Governor-General of Bengal vs India vs Viceroy, Separate Electorates timeline).

### R2. Data Grounding & PYQ Integration
- Single source of truth: Query and integrate the 31 verified questions from `data/pyq_enriched_master.json` tagged with `topic_id: "POL-CONST-FRAME"`.
- Provide interactive filtering (e.g. SI vs Constable, Sub-topic tags) with verified question numbers and explanations.

### R3. Mandatory 4-Stage Practice & Evaluation Closing Block
- Register and implement the standardized closing sections in TOC:
  1. **PYQs (`#pyqs`)**: Interactive TGPRB verified questions.
  2. **Advanced Practice (`#advanced-practice`)**: TGPSC-style hardening drills (multi-statement and matching) with distinct indigo theme styling (`border-indigo-500/30 bg-indigo-500/5`).
  3. **Comprehension Gate (`#gate`)**: `<GateQuiz note-id="NOTE-POL-CONST-FRAME" />` (5 questions, pass 3/5).
  4. **Current Affairs (`#current-affairs`)**: `<CurrentAffairsStrip note-id="NOTE-POL-CONST-FRAME" />`.

### R4. Design System, Theming & Formatting Invariants
- Strict Zero Em-Dash Rule: Never use em-dashes (`-`). Use hyphens (`-`) or colons (`:`).
- Multi-theme compatibility: Must render cleanly across all 3 theme presets:
  - StudyOS Classic (`default`)
  - Botanical Sage & Forest Focus (`forest`)
  - Warm Notebook & Chalkboard (`notebook`)
  in both Light and Dark modes.

## Acceptance Criteria

### Content & Data Grounding
- [ ] Note page exists at `pages/notes/polity/constitutional-framework-and-preamble.vue` with `NOTE-POL-CONST-FRAME`.
- [ ] Incorporates all 31 verified PYQ records from `data/pyq_enriched_master.json` (`topic_id: POL-CONST-FRAME`).
- [ ] Includes the 4 mandatory closing sections: `#pyqs`, `#advanced-practice`, `#gate`, `#current-affairs`.

### Build & Invariants
- [ ] `npm run prebuild` completes with 0 em-dashes detected.
- [ ] Test suites pass cleanly (`npm test` and `scripts/test-theme-preset-stress.ts`).
- [ ] `npx nuxi build` completes with exit code 0.

## 2026-09-03T03:21:47Z

Implement the Master Design Engineering Blueprint across TSLPRB StudyOS to elevate the platform to top-tier interface craft (Linear, Raycast, Stripe Docs, Vercel Geist), achieving zero layout shift (CLS = 0.0000), instant tactile contact (45ms), quartic deceleration, and continuous GPU-composited gliders with zero external animation libraries.

Working directory: `/home/naveen/Documents/TGPRB`  
Integrity mode: development

## Requirements

### R1. Hardware-Composited Motion Tokens & Universal Reduced-Motion Safety
- Establish `assets/css/tokens-motion.css` defining the standardized timing budgets (`--motion-dur-contact: 45ms`, `--motion-dur-fast: 120ms`, `--motion-dur-glide: 140ms`, `--motion-dur-primary: 160ms`, `--motion-dur-card-flip: 190ms`, `--motion-dur-settle: 100ms`, `--motion-dur-odometer: 350ms`) and asymmetric quartic easing curves (`cubic-bezier(0.16, 1, 0.3, 1)`).
- Enforce strict universal `@media (prefers-reduced-motion: reduce)` overrides across all components.
- Integrate tokens into `assets/css/main.css`.

### R2. Zero-Reflow App Shell & Layout Containment
- In `layouts/default.vue`, eliminate document-wide CPU reflow caused by `transition-[padding]`.
- Convert the desktop layout shell into a pure CSS Grid shutter (`grid-template-columns: 256px 1fr` transitioning to `0px 1fr` via quartic easing) with CSS layout containment (`contain: layout`).
- Ensure sidebar child content retains a fixed width (`256px`) during track collapse to eliminate text line re-wrapping during animations.

### R3. Tactile 3D Flashcard Deck with Keyed Isolation & Pre-Reserved Dock
- In `components/FlashcardReview.vue`, implement 190ms 3D flip rotation (`perspective: 1200px`, `transform-style: preserve-3d`) with instant 45ms contact compression (`scale(0.985)`).
- Implement multi-face CSS Grid area stacking (`grid-area: 1 / 1`) to eliminate geometry changes between question and answer states.
- Eliminate answer leaks on rapid keyboard navigation by keying card instances and decoupling flip reset from card advance.
- Pre-reserve the FSRS rating dock using CSS Grid fractional track expansion (`grid-template-rows: 0fr -> 1fr`) to ensure CLS = 0.0000 when revealing rating buttons.

### R4. Tactile Comprehension Gate & Spring-Damped Selection
- In `components/GateQuiz.vue`, implement 45ms `:active` contact depression on quiz options.
- Add spring-damped radio dot indicator (`cubic-bezier(0.34, 1.56, 0.64, 1)` with 12% spring overshoot).
- Add celebratory pass shockwave ring (`pass-shockwave`) on successful 3/5 gate unlock.

### R5. Continuous Magnetic TOC Glider & Delta-Resistant Scrollspy
- In `components/TableOfContents.vue` (and note page table-of-contents surfaces), replace individual static highlights with a single GPU-composited magnetic indicator pill that glides continuously on `translate3d(0, y, 0)`.
- Implement a dual-zone `IntersectionObserver` with an internal state `Map` to prevent W3C delta-array loss and indicator jumping during rapid scroll-up.

### R6. Tabular Odometer Reels for Study Counters
- Implement `components/TactileOdometer.vue` supporting rolling digit reels (`tabular-nums`) with staggered 35ms quartic rolling delays for cards due, reviewed count, and streak metrics.

## Acceptance Criteria

### Interaction & Animation Quality
- [ ] Active press feedback registers in <= 45ms across flashcards, quiz options, and action buttons.
- [ ] No layout shifts occur on flashcard flip or rating dock reveal (CLS = 0.0000).
- [ ] Rapid keyboard card advance (repeated Space / 1-4) does not leak back-face answers mid-transition.
- [ ] Desktop sidebar collapse produces zero CPU reflows / padding recalculations on the document canvas.
- [ ] Table of contents magnetic pill glides smoothly without jitter during both down and up scrolling.
- [ ] With `prefers-reduced-motion: reduce` enabled, all flips, glides, and reels resolve instantly without motion.

### Architecture & Theme Invariants
- [ ] Zero external animation libraries added (no Framer Motion, no GSAP; pure modern CSS + Vue 3 transitions).
- [ ] Strict Zero Em-Dash Rule: `npm run prebuild` completes with 0 em-dashes found.
- [ ] All 3 theme presets (Classic, Botanical Sage, Warm Notebook) render cleanly in both Light and Dark modes.
- [ ] All existing automated tests pass (`npm test`, `scripts/test-theme-preset-stress.ts`, and `scripts/test-challenger-pol-ui.ts`).
- [ ] Production build (`npx nuxi build`) succeeds with exit code 0.

