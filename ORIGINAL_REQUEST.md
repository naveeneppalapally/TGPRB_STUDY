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
