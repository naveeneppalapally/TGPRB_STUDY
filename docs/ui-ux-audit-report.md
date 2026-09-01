# TSLPRB StudyOS - Master Multi-Device UI/UX, Responsive Layout, 6-Theme Consistency & Core Flow Defect Audit Report

**Document ID:** AUDIT-UIUX-2026-09-01  
**Audited Platform:** TSLPRB StudyOS (Nuxt 3 + Nuxt UI + Tailwind CSS + Nuxt Content)  
**Authors / Synthesized Investigations:**
- **Explorer R1:** Responsive Layout (360px, 390px, 768px, 1024px, 1440px) & Touch Ergonomics
- **Explorer R2:** 6-State Theme Consistency, CSS Semantic Variables & WCAG 2.1 Contrast Ratios
- **Explorer R3:** Core User Flows, Sticky Navigation, TOC Scrollspy, GateQuiz, Flashcards, Settings, Personal Notes & Telugu Typography
- **Worker 1 (Compiler):** Synthesis, Code Verification & Actionable Remediation Roadmap

---

## 1. Executive Summary & Audit Metrics

A comprehensive, forensic multi-device UI/UX and architectural audit was performed across the entire TSLPRB StudyOS application. The audit systematically tested and verified every primary layout, note page, interactive study tool, visual diagram, navigation chrome, drawer/modal, and API endpoint across **5 responsive breakpoints** (360px, 390px, 768px, 1024px, 1440px) and **all 6 active theme states**.

### 1.1 Global Defect Ledger & Severity Summary

| Severity Level | Total Count | Definition & Impact Criteria | Primary Domain Breakdown |
|---|---|---|---|
| **Critical 🔴** | **13** | Direct data loss, broken core workflows, severe layout clipping/truncation rendering key exam content inaccessible, invisible text (contrast < 2.0:1), broken theme states. | 3 Responsive (R1), 5 Theme/Contrast (R2), 5 Core Flow/Logic (R3) |
| **Papercuts 🟡** | **19** | Responsive flex/grid wrapping collisions, TOC scrollspy index skew, touch target ergonomics (<44x44px), missing web fonts, 0ms search debounce, hardcoded color classes. | 6 Responsive & Touch (R1), 6 Theme Contamination (R2), 7 Flow & Typography (R3) |
| **Polish 🟢** | **7** | Non-semantic class cleanups, HTML markup formatting glitches, empty state visual fallbacks, secondary micro-contrast enhancements. | 2 Responsive (R1), 3 Theme Polish (R2), 2 Flow Polish (R3) |
| **Total Defects** | **39** | **Complete catalog of verified, actionable defects with exact line numbers and code-ready fix recipes.** | **All 4 Audit Tracks** |

### 1.2 Domain Breakdown Matrix

```
┌────────────────────────────────────────────────────────────────────────────┐
│                        DEFECTS BY DOMAIN & SEVERITY                        │
├──────────────────────────────┬──────────────┬──────────────┬───────────────┤
│ Domain                       │ Critical 🔴  │ Papercut 🟡  │ Polish 🟢     │
├──────────────────────────────┼──────────────┼──────────────┼───────────────┤
│ Responsive Layout & Mobile   │ 3            │ 5            │ 2             │
│ Touch Target Ergonomics      │ 0            │ 1 (10 items) │ 0             │
│ Theme Consistency & Contrast │ 5            │ 6            │ 3             │
│ Core User Flows & State      │ 5            │ 7            │ 2             │
├──────────────────────────────┼──────────────┼──────────────┼───────────────┤
│ Total                        │ 13           │ 19           │ 7             │
└──────────────────────────────┴──────────────┴──────────────┴───────────────┘
```

### 1.3 Key Architectural Findings & Root Causes

1. **Responsive Viewport Gaps (< 1280px)**: The Table of Contents across all 7 topic notes uses `<aside class="hidden xl:block">`, completely stripping section navigation for mobile and tablet students reading 2000-line master notes. Additionally, fixed SVG widths (`min-w-[560px]`) inside `overflow-hidden` containers physically truncate high-yield eastern river diagrams on small phones.
2. **Theme Preset Destructuring & Token Bypass**: In `pages/settings.vue`, omitting `isForest` from `useThemePreset()` breaks the active indicator for Botanical Sage. In notes (notably Polity and Telangana), ~300 hardcoded `slate-*` classes bypass CSS variables, producing dark-navy or sterile-white blocks in Forest and Notebook themes.
3. **Contrast Deficits in Component Code**: While the core CSS tokens in `main.css` are WCAG AA/AAA compliant, hardcoded hex values (e.g. `#f9d872` on light cards, `dark:bg-gray-400` with white text, and invalid `bg-saffron`) produce severe contrast failures (1.08:1 to 1.94:1).
4. **Interactive State & Storage Persistence Defects**: Personal note auto-save debouncing prematurely deletes active drafts during composition, GateQuiz omits `flashcard_ids` in its POST payload (breaking Supabase FSRS card seeding), and `AiAssistantDrawer` coerces `storageKey` to `"[object Object]"`.

---

## 2. Responsive Breakpoint Matrix (Requirement R1)

The application was stressed across 5 standard viewport widths representing the full spectrum of mobile, tablet, and desktop hardware:
- **360px** (Mobile Extra-Small: Galaxy S8/S9, budget Android devices)
- **390px** (Mobile Standard: iPhone 13 / 14 / 15 / 16)
- **768px** (Tablet Portrait: iPad Mini, iPad Air)
- **1024px** (Tablet Landscape / Small Desktop: iPad Pro, MacBook Air 13")
- **1440px** (Large Desktop: 24"+ Monitors, iMac)

| Page / Component | 360px (XS Mobile) | 390px (Mobile) | 768px (Tablet P) | 1024px (Tablet L) | 1440px (Desktop) | Responsive Status & Notes |
|---|---|---|---|---|---|---|
| **Global App Layout** (`layouts/default.vue`) | ⚠️ Margins OK, Touch <44px | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | Topbar icons and mobile drawer close button violate 44px touch target. |
| **Topic Notes TOC** (`pages/notes/**`) | ❌ **FAIL (Hidden)** | ❌ **FAIL (Hidden)** | ❌ **FAIL (Hidden)** | ❌ **FAIL (Hidden)** | ✅ Pass | TOC hidden on all viewports < 1280px (`xl:block`). No section jumping on mobile/tablet. |
| **Interactive River Map** (`InteractiveRiverMap.vue`) | ❌ **FAIL (Clipped)** | ❌ **FAIL (Clipped)** | ✅ Pass | ✅ Pass | ✅ Pass | `min-w-[560px]` inside `overflow-hidden` cuts off eastern India rivers. |
| **3D Flashcard Deck** (`FlashcardDeck.vue` / `main.css`) | ❌ **FAIL (Overflow)** | ⚠️ Tight Text | ✅ Pass | ✅ Pass | ✅ Pass | Long questions exceed 190px and spill vertically outside card boundary on 360px. |
| **Comprehension Gate** (`GateQuiz.vue`) | ⚠️ Header Collision | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | Header text wraps poorly on 360px without `flex-wrap`. Radio buttons align center on multi-line text. |
| **Current Affairs Carousel** (`CurrentAffairsStrip.vue`) | ⚠️ Small Dots | ⚠️ Small Dots | ✅ Pass | ✅ Pass | ✅ Pass | Carousel pagination dots (6x6px) fail touch target guidelines. |
| **Current Affairs Hub** (`pages/current-affairs.vue`) | ⚠️ Grid Truncated | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | 2-col category grid leaves only 67px for category titles on 360px, causing severe truncation. |
| **Settings Typography** (`pages/settings.vue`) | ⚠️ 86px Flex Squish | ⚠️ Tight | ✅ Pass | ✅ Pass | ✅ Pass | Segmented controls force label column down to 86px width on 360px. |
| **Personal Notes Drawer** (`PersonalNotesDrawer.vue`) | ✅ Full Width Slideover | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | Drawer width `w-screen sm:w-[28rem]` adapts well; workflow bug is logic-based. |
| **PYQ Archive & Filters** (`pages/pyq-archive.vue`) | ⚠️ Filter Row Wrap | ✅ Pass | ✅ Pass | ✅ Pass | ✅ Pass | Active filter pills wrap tightly; pagination controls undersized on mobile. |
| **Constitutional Hierarchy** (`ConstitutionalHierarchy.vue`) | ⚠️ Missing Scroll Cue | ⚠️ Missing Cue | ✅ Pass | ✅ Pass | ✅ Pass | `min-w-[800px]` scrolls horizontally, but lacks a visual affordance cue on touch devices. |
| **Telangana Movement Note** (`telangana-statehood-movement.vue`) | ❌ Literal `{ c.label }` | ❌ Literal `{ c.label }` | ❌ Literal `{ c.label }` | ❌ Literal `{ c.label }` | ❌ Literal `{ c.label }` | Vue single-brace interpolation syntax defect renders raw code strings across all viewports. |

---

## 3. Theme State & Contrast Verification Matrix (Requirement R2)

### 3.1 The 6 Theme States & Token Structure

TSLPRB StudyOS implements 6 distinct visual states through semantic CSS variables defined in `assets/css/main.css` and controlled via `composables/useThemePreset.ts` and `@nuxtjs/color-mode`:

1. **State 1: StudyOS Classic Light** (`:root`) - Crisp off-white eggshell canvas with dark charcoal typography and warm saffron accents.
2. **State 2: StudyOS Classic Dark** (`.dark`) - Deep obsidian black (`#100f0c`) with luminous cream text and golden amber accents.
3. **State 3: Botanical Sage & Forest Matcha Light** (`.theme-forest`) - Calming matcha cream canvas (`#F1F5EE`) with deep forest evergreen text (`#14271F`) and emerald accents.
4. **State 4: Midnight Spruce Dark** (`.dark.theme-forest`) - Deep pine-needle spruce dark (`#0C1612`) with mint highlight text (`#ECFDF5`).
5. **State 5: Warm Notebook & Ruled Paper Light** (`.theme-notebook`) - Warm parchment paper (`#F6F1E4`) with classic ink blue-gray text (`#20303A`) and pencil line styling.
6. **State 6: Slate Chalkboard Dark** (`.dark.theme-notebook`) - Slate schoolroom chalkboard dark (`#131B20`) with chalk white text (`#F1EFE8`).

### 3.2 Mathematical WCAG 2.1 Contrast Analysis

Contrast ratios are calculated according to the **WCAG 2.1 Relative Luminance Formula**:
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
where relative luminance $L = 0.2126 \cdot R' + 0.7152 \cdot G' + 0.0722 \cdot B'$ (with $sRGB$ gamma decompression).

#### Core Token Contrast Matrix

| Semantic Token Pair | Classic Light | Classic Dark | Forest Light | Forest Dark | Notebook Light | Notebook Dark | WCAG 2.1 AA (>=4.5:1) | WCAG 2.1 AAA (>=7.0:1) |
|---|---|---|---|---|---|---|---|---|
| `--text-1` on `--bg` | **14.88:1** | **17.81:1** | **14.07:1** | **18.73:1** | **10.63:1** | **16.63:1** | ✅ PASS | ✅ PASS |
| `--text-1` on `--bg-elevated` | **16.49:1** | **16.48:1** | **15.42:1** | **16.32:1** | **11.45:1** | **14.47:1** | ✅ PASS | ✅ PASS |
| `--text-2` on `--bg` | **5.45:1** | **9.57:1** | **6.68:1** | **9.60:1** | **5.27:1** | **9.38:1** | ✅ PASS | ⚠️ Mixed (Dark passes) |
| `--text-2` on `--bg-elevated` | **6.04:1** | **8.86:1** | **7.32:1** | **8.36:1** | **5.67:1** | **8.16:1** | ✅ PASS | ⚠️ Mixed |
| `--text-3` on `--bg` | **2.62:1** | **5.14:1** | **3.89:1** | **5.52:1** | **2.97:1** | **5.08:1** | ⚠️ UI labels only | ❌ FAIL (Body text) |
| `--accent-strong` on `--bg` | **4.40:1** | **12.63:1** | **5.39:1** | **12.44:1** | **3.74:1** | **11.48:1** | ✅ PASS (>=3:1 Large) | ⚠️ Dark passes AAA |
| `--accent` on `--bg` | **2.61:1** | **9.75:1** | **3.22:1** | **9.11:1** | **2.28:1** | **9.79:1** | ⚠️ Light: Borders/Icons | ✅ PASS in Dark |
| `--jade` on `--bg` | **4.55:1** | **9.03:1** | **4.61:1** | **12.18:1** | **4.69:1** | **8.78:1** | ✅ PASS | ⚠️ Dark passes AAA |
| `--red` on `--bg` | **4.51:1** | **6.02:1** | **4.91:1** | **6.02:1** | **4.62:1** | **5.38:1** | ✅ PASS | ⚠️ Passable for UI |

### 3.3 Component-Level Contrast Deficits & Code-Level Failures

| Component / Target File | Rendered Element & Surface | Measured Hex / Classes | Contrast Ratio | WCAG AA Deficit | Defect Severity |
|---|---|---|---|---|---|
| `pages/notes/geography/drainage-system-of-india.vue:775` | Active Filter Pill on Light Card | `#ffffff` on transparent (`#f5f3ec`) | **1.08:1** | -3.42:1 (Invisible) | 🔴 CRITICAL |
| `components/FlashcardReview.vue:10` | FSRS Section Badge on Light Card | `#f9d872` on `#fffefa` | **1.35:1** | -3.15:1 | 🔴 CRITICAL |
| `components/NoteRenderer.vue:15` | Current Affairs Chip on Light Surface | `#93bbfd` on `#fffefa` | **1.72:1** | -2.78:1 | 🔴 CRITICAL |
| `components/notes/SectionNotesButton.vue:54` | Section Note Count Badge in Dark Mode | `#ffffff` on `#9ca3af` (`gray-400`) | **1.94:1** | -2.56:1 | 🔴 CRITICAL |
| `components/NoteRenderer.vue:70` | Gate Passed Banner Title on Light Card | `#34d399` on `#fffefa` | **1.94:1** | -2.56:1 | 🔴 CRITICAL |
| `pages/review.vue:70` | Review Queue Hint Text | `#a1a1aa` (`zinc-400`) on `#fffefa` | **2.38:1** | -2.12:1 | 🟡 PAPERCUT |
| `components/visual/InteractiveRiverMap.vue:247` | Map Legend Secondary Text | `#78716c` (`stone-500`) on `#18181b` | **2.50:1** | -2.00:1 | 🟡 PAPERCUT |
| `components/RiskCalibrationDashboard.vue:140` | Calibration Stat Legend Text | `#64748b` (`slate-500`) on `#0c0d0e` | **3.18:1** | -1.32:1 | 🟡 PAPERCUT |

---

## 4. Master Prioritized Defect Catalog

### 4.1 Critical Defects (🔴) - Data Loss, Broken Workflows & Severe Truncation

---

#### DEF-CRIT-01: Auto-Save Debounce Erases User Input in Personal Notes Drawer
- **File & Line:** `components/notes/PersonalNotesDrawer.vue:82-91, 133`
- **Domain:** Personal Notes & Highlight Capture Workflow (R3)
- **Triggering Viewports & Themes:** All Viewports (360px–1440px), All 6 Themes
- **Reproduction Scenario & Impact:**
  1. Open any topic note (e.g. `/notes/geography/drainage-system-of-india`).
  2. Click "Add note" on any section header to open `PersonalNotesDrawer.vue`.
  3. Start typing: `"The Trimbakeshwar plateau is the origin of river Godavari..."`.
  4. Pause typing for 800ms to consult the map.
  5. `autoSaveTimeout` fires `saveNewNote()`, which calls `createNote`, and immediately sets `isAdding.value = false` and `draftBody.value = ''`.
  6. **Impact:** The input textarea disappears from the screen while the user is actively composing, saving an incomplete draft and destroying user input.
- **Exact Code-Ready Fix Recipe:**
  Remove `@input="onInput"` from the *new note creation* form in `PersonalNotesDrawer.vue`. New notes must only save on explicit button click or Ctrl/Cmd+Enter:
  ```html
  <!-- File: components/notes/PersonalNotesDrawer.vue:128-135 -->
  <!-- Remove @input="onInput" and add shortcut keys -->
  <UTextarea 
    v-model="draftBody"
    placeholder="Type your note here (Ctrl+Enter to save)..."
    autofocus
    :rows="3"
    class="w-full focus:ring-saffron-500"
    @keydown.ctrl.enter="saveNewNote"
    @keydown.meta.enter="saveNewNote"
  />
  ```

---

#### DEF-CRIT-02: Missing `flashcard_ids` in Gate Submission Body Breaks Cloud FSRS Seeding
- **File & Line:** `components/GateQuiz.vue:355-365` & `server/api/gate/submit.post.ts:44-55`
- **Domain:** Gate Quiz & Cloud FSRS Synchronization (R3)
- **Triggering Viewports & Themes:** All Viewports, All 6 Themes
- **Reproduction Scenario & Impact:**
  1. Sign in with an authenticated user account.
  2. Complete and pass the Comprehension Gate on `/notes/geography/drainage-system-of-india` (score 5/5).
  3. `GateQuiz.vue:355` makes a POST request to `/api/gate/submit` sending `{ note_id, score, total, pass_threshold }`.
  4. `server/api/gate/submit.post.ts:44` checks `if (passed && body.flashcard_ids?.length)`.
  5. Because `body.flashcard_ids` is undefined, the condition evaluates to `false`.
  6. **Impact:** Zero flashcards are seeded into the `review_cards` table in Supabase. When the user logs in from another device or opens `/review`, their cloud FSRS study queue is empty.
- **Exact Code-Ready Fix Recipe:**
  In `components/GateQuiz.vue`, load flashcard IDs and include them in the POST payload:
  ```ts
  // File: components/GateQuiz.vue:353-366
  try {
    let flashcardIds: string[] = []
    try {
      const fcData = await $fetch<{ cards: Array<{ id: string }> }>(`/api/flashcards/${assistantNoteId.value}`)
      if (fcData?.cards) {
        flashcardIds = fcData.cards.map(c => c.id)
      }
    } catch {}

    await $fetch('/api/gate/submit', {
      method: 'POST',
      body: {
        note_id: assistantNoteId.value,
        score: correct,
        total: quiz.value.questions.length,
        pass_threshold: quiz.value.pass_threshold,
        flashcard_ids: flashcardIds,
      },
    })
  } catch {
    // Offline or guest mode fallback
  }
  ```

---

#### DEF-CRIT-03: Single Missed Card Prematurely Terminates Review Session
- **File & Line:** `pages/review.vue:406-415`
- **Domain:** FSRS Study Queue & Card Scheduling (R3)
- **Triggering Viewports & Themes:** All Viewports, All 6 Themes
- **Reproduction Scenario & Impact:**
  1. Open `/review` with a session containing 1 due flashcard (or when down to the last card).
  2. Reveal answer and rate `Again` (key `1` or click "Again").
  3. In `review.vue:406`, the code checks `if (grade === Rating.Again && dueCards.value.length > 1)`.
  4. Because `dueCards.value.length === 1`, it executes the `else` branch: `dueCards.value.splice(currentIndex.value, 1)`.
  5. `dueCards.value.length` becomes 0.
  6. **Impact:** The session immediately terminates and displays "All Due Reviews Completed!", denying the student the required immediate re-test on the failed card.
- **Exact Code-Ready Fix Recipe:**
  ```ts
  // File: pages/review.vue:406-413
  if (grade === Rating.Again) {
    if (dueCards.value.length > 1) {
      dueCards.value.splice(currentIndex.value, 1)
      dueCards.value.push(finishedCard)
    } else {
      // Single card remaining: keep in place and flip back to front for immediate re-test
      flipped.value = false
      return
    }
  } else {
    dueCards.value.splice(currentIndex.value, 1)
  }
  ```

---

#### DEF-CRIT-04: Ref Object Coercion in `AiAssistantDrawer.vue` SessionStorage
- **File & Line:** `components/AiAssistantDrawer.vue:312, 316`
- **Domain:** AI Assistant & State Persistence (R3)
- **Triggering Viewports & Themes:** All Viewports, All 6 Themes
- **Reproduction Scenario & Impact:**
  1. Open the AI Assistant on Drainage Note and send a message.
  2. In `AiAssistantDrawer.vue`, `storageKey` is defined as a Vue `ComputedRef` (`const storageKey = computed(...)`).
  3. `sessionStorage.setItem(storageKey, ...)` passes the Ref object instead of `storageKey.value`.
  4. JavaScript converts the object to key `"[object Object]"`.
  5. **Impact:** Every topic note writes to the exact same `"[object Object]"` key, causing chat history from different subjects to overwrite and cross-contaminate.
- **Exact Code-Ready Fix Recipe:**
  ```ts
  // File: components/AiAssistantDrawer.vue:312, 316
  function clearChat() {
    messages.value = []
    suggestedCards.value = []
    errorMessage.value = ''
    if (import.meta.client) sessionStorage.removeItem(storageKey.value)
  }
  function saveMessages() {
    if (import.meta.client) sessionStorage.setItem(storageKey.value, JSON.stringify(messages.value.slice(-10)))
  }
  ```

---

#### DEF-CRIT-05: Substring Word-Boundary Collision in PYQ Archive Exam Filter
- **File & Line:** `server/api/pyqs.get.ts:61-66`
- **Domain:** PYQ Archive Search API (R3)
- **Triggering Viewports & Themes:** All Viewports, All 6 Themes
- **Reproduction Scenario & Impact:**
  1. Open `/pyq-archive` and select the "SI Papers" filter.
  2. In `server/api/pyqs.get.ts:65`, the filter executes `if (exam === 'si' && !occStr.includes('si')) return false`.
  3. Constable question occurrences frequently contain paper filenames such as `constable_2018_prelims_version_b.json`.
  4. Because `"version"` contains the substring `"si"`, `occStr.includes('si')` evaluates to `true`.
  5. **Impact:** Hundreds of Constable exam questions pollute the SI-filtered paper archive.
- **Exact Code-Ready Fix Recipe:**
  Enforce word boundaries with regex matching:
  ```ts
  // File: server/api/pyqs.get.ts:61-67
  const occStr = JSON.stringify(q.occurrences || []).toLowerCase()
  if (exam && exam !== 'all') {
    const isConstable = /(?:^|[_\s\/\-])constable(?:$|[_\s\/\-])/i.test(occStr)
    const isSI = /(?:^|[_\s\/\-])si(?:$|[_\s\/\-])/i.test(occStr)
    if (exam === 'constable' && !isConstable) return false
    if (exam === 'si' && !isSI) return false
  }
  ```

---

#### DEF-CRIT-06: InteractiveRiverMap SVG Truncation on Mobile Viewports (<560px)
- **File & Line:** `components/visual/InteractiveRiverMap.vue:189-192`
- **Domain:** Mobile Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`) & Mobile Standard (`390px`)
- **Reproduction Scenario & Impact:**
  1. Open `/notes/geography/drainage-system-of-india` on a mobile device (360px or 390px).
  2. The map container sets `<div class="overflow-hidden rounded-xl border ...">` containing an SVG with `class="h-auto w-full min-w-[560px]"`.
  3. The container forces `overflow-hidden` while the SVG requires 560px width.
  4. **Impact:** The entire eastern half of India's river systems (Brahmaputra, Mahanadi, Godavari estuary, Krishna, Cauvery, and Bay of Bengal outflows) is permanently cut off and inaccessible to mobile students.
- **Exact Code-Ready Fix Recipe:**
  ```html
  <!-- File: components/visual/InteractiveRiverMap.vue:189 -->
  <!-- Replace overflow-hidden with overflow-x-auto -->
  <div class="overflow-x-auto rounded-xl border border-white/10 bg-gradient-to-br from-slate-950 via-[#111417] to-slate-900 p-2 sm:p-4">
    <svg
      class="h-auto w-full min-w-[560px]"
      viewBox="0 0 760 860"
      role="img"
      aria-label="Interactive schematic map of India showing nine major river systems"
    >
  ```

---

#### DEF-CRIT-07: Absolute Position Flip Card Vertical Overflow on 360px Mobile
- **File & Line:** `components/FlashcardDeck.vue:48-62` and `assets/css/main.css:876-886`
- **Domain:** Mobile Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`) & Mobile Standard (`390px`)
- **Reproduction Scenario & Impact:**
  1. Open `/flashcards` on a 360px screen.
  2. `main.css:876` defines `.flip-card-face { position: absolute; inset: 0; }` without `overflow-y-auto`.
  3. `FlashcardDeck.vue` sets `min-h-[190px]` with 128px of nested horizontal padding, leaving only 232px width for text.
  4. When a card contains 3+ lines or bullet points, the text exceeds 190px height.
  5. **Impact:** Text spills out of the card boundary and overlaps the navigation buttons without scrollability.
- **Exact Code-Ready Fix Recipe:**
  ```css
  /* File: assets/css/main.css:876-886 */
  .flip-card-face {
    position: absolute;
    inset: 0;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  ```
  ```html
  <!-- File: components/FlashcardDeck.vue:53, 62 -->
  <div class="flip-card-face flip-card-front panel p-4 sm:p-8">
  ...
  <div class="flip-card-face flip-card-back panel b-strong p-4 sm:p-8">
  ```

---

#### DEF-CRIT-08: Complete Table of Contents Disappearance on All Viewports <1280px
- **File & Line:**
  - `pages/notes/geography/drainage-system-of-india.vue:1006`
  - `pages/notes/geography/dams-in-india.vue:1021`
  - `pages/notes/geography/mountains-in-india.vue:1167`
  - `pages/notes/geography/forests-in-india.vue:891`
  - `pages/notes/geography/irrigation-in-india.vue:955`
  - `pages/notes/polity/union-executive-and-legislature.vue:770`
  - `pages/notes/telangana/telangana-statehood-movement.vue:727`
- **Domain:** Mobile & Tablet Responsive Navigation (R1)
- **Triggering Viewports:** Mobile (`360px`, `390px`), Tablet Portrait (`768px`), Tablet Landscape (`1024px`)
- **Reproduction Scenario & Impact:**
  1. Open any topic note on an iPad (768px/1024px) or mobile device (360px/390px).
  2. The TOC sidebar is anchored with `<aside class="hidden w-52 shrink-0 xl:block">`.
  3. **Impact:** The TOC is completely removed from the DOM on all viewports <1280px. Students reading 2000-line master notes spanning 9 sections have zero section navigation, visual reading position indicators, or quick-jump controls.
- **Exact Code-Ready Fix Recipe:**
  Add a responsive floating TOC pill and slide-over menu for viewports `< xl`:
  ```html
  <!-- Floating TOC trigger for mobile/tablet -->
  <div class="fixed bottom-6 start-6 z-20 xl:hidden">
    <UButton
      icon="i-heroicons-list-bullet"
      label="Contents"
      color="gray"
      variant="solid"
      size="sm"
      class="rounded-full shadow-lg border b-line bg-elev t-hi font-semibold min-h-[44px] px-3.5"
      @click="mobileTocOpen = true"
    />
  </div>

  <USlideover v-model="mobileTocOpen" side="left" class="xl:hidden" :ui="{ width: 'w-72 max-w-full' }">
    <div class="p-5 flex flex-col h-full bg-base">
      <div class="flex items-center justify-between pb-3 border-b b-line mb-4">
        <p class="eyebrow">On this page</p>
        <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="mobileTocOpen = false" />
      </div>
      <nav class="space-y-1 overflow-y-auto flex-1">
        <a
          v-for="(section, i) in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs transition-colors min-h-[44px]"
          :class="activeSection === section.id ? 'bg-accent-soft t-hi font-semibold' : 't-lo hover:t-mid'"
          @click="mobileTocOpen = false; scrollTo(section.id)"
        >
          <span class="font-mono text-[11px] accent">{{ String(i + 1).padStart(2, '0') }}</span>
          <span>{{ section.label }}</span>
        </a>
      </nav>
    </div>
  </USlideover>
  ```

---

#### DEF-CRIT-09: Settings Theme Preset Preview Broken for Botanical Sage & Forest
- **File & Line:** `pages/settings.vue:420`
- **Domain:** Theme State Management (R2)
- **Triggering Viewports & Themes:** Theme 3 (Forest Light), Theme 4 (Midnight Spruce Dark)
- **Reproduction Scenario & Impact:**
  1. Open `/settings` and click "Botanical Sage & Forest Matcha".
  2. In `settings.vue:420`, `<script setup>` destructures `const { preset, isNotebook, currentPresetMeta, setPreset, presets: themePresets } = useThemePreset()`.
  3. `isForest` is omitted from the destructuring.
  4. In template lines 315 and 340, `:class="isForest ? ..."` evaluates `isForest` as `undefined`.
  5. **Impact:** The theme preview card fails to display emerald borders/badges, misleading users about the active theme state.
- **Exact Code-Ready Fix Recipe:**
  ```ts
  // File: pages/settings.vue:420
  const { preset, isNotebook, isForest, currentPresetMeta, setPreset, presets: themePresets } = useThemePreset()
  ```

---

#### DEF-CRIT-10: Selected Quiz Option Missing Highlight Tint in GateQuiz
- **File & Line:** `components/GateQuiz.vue:397`
- **Domain:** Theme Semantic Variables (R2)
- **Triggering Viewports & Themes:** All 6 Theme States
- **Reproduction Scenario & Impact:**
  1. Open `<GateQuiz>` and select an option.
  2. Line 397 defines `.opt-selected { border-color: var(--saffron); background: color-mix(in srgb, var(--saffron) 8%, transparent); }`.
  3. Neither `:root` nor any theme state defines `--saffron` (only `--accent` and `--accent-soft` exist).
  4. **Impact:** The browser rejects the invalid CSS rule, causing the selected option to render without background tint or border highlight.
- **Exact Code-Ready Fix Recipe:**
  ```css
  /* File: components/GateQuiz.vue:397 */
  .opt-selected {
    border-color: var(--accent);
    background: var(--accent-soft);
  }
  ```

---

#### DEF-CRIT-11: Active Filter Pills Render White Text on Transparent Background
- **File & Line:** `pages/notes/geography/drainage-system-of-india.vue:775` & `pages/pyq-archive.vue:79`
- **Domain:** Theme & Tailwind Configuration (R2)
- **Triggering Viewports & Themes:** All 3 Light Themes (Classic Light, Forest Light, Notebook Light)
- **Reproduction Scenario & Impact:**
  1. Open `/notes/geography/drainage-system-of-india` on a light theme and click any river filter pill (e.g. "Godavari").
  2. The button applies `:class="activeRiverFilter === rOpt.id ? 'bg-saffron text-white font-semibold shadow-sm' : '...'"`
  3. `tailwind.config.ts` defines `saffron` as an object ramp (`50` through `950`). `bg-saffron` is not generated.
  4. **Impact:** The background renders transparent, displaying `#ffffff` text on cream/matcha background (`#f5f3ec`) with a contrast ratio of **1.08:1** (completely invisible).
- **Exact Code-Ready Fix Recipe:**
  ```html
  <!-- File: pages/notes/geography/drainage-system-of-india.vue:775 -->
  :class="activeRiverFilter === rOpt.id ? 'bg-saffron-500 text-white font-semibold shadow-sm' : 'bg-elev t-mid hover:t-hi border b-line'"
  ```

---

#### DEF-CRIT-12: Unreadable Yellow Badge Text on Light Review Surfaces
- **File & Line:** `components/FlashcardReview.vue:10`
- **Domain:** WCAG 2.1 Contrast (R2)
- **Triggering Viewports & Themes:** All 3 Light Themes
- **Reproduction Scenario & Impact:**
  1. Open flashcard review in Classic Light, Forest Light, or Notebook Light.
  2. Line 10 sets inline style `<span class="badge" style="background: rgba(240, 180, 41, 0.15); color: #f9d872">`.
  3. Against `#fffefa`, `#f9d872` has a contrast ratio of **1.35:1** (failing WCAG AA 4.5:1).
  4. **Impact:** The exam section badge text is unreadable for all light mode users.
- **Exact Code-Ready Fix Recipe:**
  ```html
  <!-- File: components/FlashcardReview.vue:10 -->
  <span class="badge bg-saffron-500/15 text-saffron-600 dark:text-saffron-400 font-mono text-xs font-semibold">
    {{ card.exam_section }}
  </span>
  ```

---

#### DEF-CRIT-13: Inverted White Text on Light Gray Badge in Dark Mode
- **File & Line:** `components/notes/SectionNotesButton.vue:54`
- **Domain:** Dark Theme Contrast (R2)
- **Triggering Viewports & Themes:** All 3 Dark Themes (Classic Dark, Midnight Spruce, Slate Chalkboard)
- **Reproduction Scenario & Impact:**
  1. Enable Dark Mode and view section notes buttons with active note counts.
  2. Line 54 applies `:class="hasImportant ? 'bg-amber-500' : 'bg-gray-600 dark:bg-gray-400'"` with parent `text-white`.
  3. In dark mode, `#ffffff` on `gray-400` (`#9ca3af`) produces a **1.94:1** contrast ratio.
  4. **Impact:** The note count badge is illegible in dark themes.
- **Exact Code-Ready Fix Recipe:**
  ```html
  <!-- File: components/notes/SectionNotesButton.vue:53-55 -->
  <span
    v-if="noteCount > 0"
    class="absolute -top-1 -right-1 h-4 min-w-[1rem] rounded-full px-1 text-[9px] font-bold text-white flex items-center justify-center shadow-sm"
    :class="hasImportant ? 'bg-amber-500' : 'bg-stone-600 dark:bg-stone-700'"
  >
  ```

---

### 4.2 Papercuts & Medium Issues (🟡) - Layout Wrapping, Ergonomics & State Edge Cases

---

#### DEF-PCUT-01: Typography Segmented Control Flex Squeeze on 360px Mobile
- **File & Line:** `pages/settings.vue:73, 95, 117`
- **Domain:** Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`) & Mobile Standard (`390px`)
- **Reproduction Scenario & Impact:**
  In `settings.vue`, typography rows use `<div class="flex items-start justify-between gap-6">` with text on the left and a 170px segmented button on the right. On a 360px screen (280px card inner width), the label and description are crushed into an **86px column**, wrapping into 7–8 awkward single-word vertical lines.
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/settings.vue:73, 95, 117 -->
  <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
    <div>
      <p class="text-[15px] font-medium t-hi">Base text</p>
      <p class="mt-0.5 text-[13px] t-lo">Paragraphs, lists, and standard interface text.</p>
    </div>
    <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1 self-start sm:self-auto">
  ```

---

#### DEF-PCUT-02: GateQuiz Header Unwrapped Flex Layout Collides on 360px Mobile
- **File & Line:** `components/GateQuiz.vue:40-55`
- **Domain:** Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`)
- **Reproduction Scenario & Impact:**
  `GateQuiz.vue:40` uses `<div class="flex items-center justify-between px-5 py-3.5 border-b b-line">` without `flex-wrap`. Left title (~180px) and right subtitle (~170px) require 350px width, colliding on 360px devices.
- **Code Fix Recipe:**
  ```html
  <!-- File: components/GateQuiz.vue:40 -->
  <div class="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5 sm:py-3.5 border-b b-line">
  ```

---

#### DEF-PCUT-03: 2-Column Category Grid Word Truncation on 360px Mobile
- **File & Line:** `pages/current-affairs.vue:109-146`
- **Domain:** Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`)
- **Reproduction Scenario & Impact:**
  `current-affairs.vue` uses `<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">`. On 360px screens, each button has 140px width with only 67px available for category labels, truncating names into fragments ("Intern...", "Scienc...", "Enviro...").
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/current-affairs.vue:109 -->
  <div class="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
  ```

---

#### DEF-PCUT-04: Single-Brace Template Interpolation in Telangana Note
- **File & Line:** `pages/notes/telangana/telangana-statehood-movement.vue:59-60`
- **Domain:** Content Rendering & Template Syntax (R1)
- **Triggering Viewports & Themes:** All Viewports, All Themes
- **Reproduction Scenario & Impact:**
  Lines 59-60 use `{ String(i + 1).padStart(2, '0') }` and `{ c.label }`. Vue 3 renders raw literal strings instead of dynamic values.
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/notes/telangana/telangana-statehood-movement.vue:59-60 -->
  <span class="num font-mono">{{ String(i + 1).padStart(2, '0') }}</span>
  {{ c.label }}
  ```

---

#### DEF-PCUT-05: My Notes Filter Tabs Flexbox Overflow on 360px Mobile
- **File & Line:** `pages/my-notes.vue:45-74`
- **Domain:** Responsive Layout (R1)
- **Triggering Viewports:** Mobile Extra-Small (`360px`)
- **Reproduction Scenario & Impact:**
  Filter buttons `"All (X)"`, `"⭐ Important (Y)"`, and `"❓ Doubts (Z)"` combine for ~310px width without horizontal scrolling, overflowing narrow mobile viewports.
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/my-notes.vue:45 -->
  <div class="flex items-center gap-1 bg-sub border b-line rounded-lg p-1 w-full overflow-x-auto sm:w-auto shrink-0 scrollbar-none">
  ```

---

#### DEF-PCUT-06: Mobile Touch Target Ergonomics Violations (<44x44px Targets)
- **Domain:** Touch Ergonomics (WCAG 2.1 SC 2.5.5) (R1)
- **Triggering Viewports:** Mobile (`360px`, `390px`) and Tablet (`768px`)
- **Evaluated Violations & Fix Recipes:**
  1. `layouts/default.vue:38` (Mobile Drawer Close): Replace `size="xs"` with `size="sm" class="min-h-[44px] min-w-[44px] flex items-center justify-center"`.
  2. `layouts/default.vue:104, 146, 163, 178` (Topbar Actions): Add `min-h-[44px] min-w-[44px] p-2`.
  3. `components/GateQuiz.vue:140, 148, 157` (Gate Nav & Submit): Upgrade arrows to `h-11 w-11` (44x44px) and submit to `h-11 px-5`.
  4. `components/CurrentAffairsStrip.vue:42` (Carousel Dots): Wrap 6x6px dots in a button with `min-h-[44px] min-w-[28px] flex items-center justify-center`.
  5. `components/CurrentAffairsStrip.vue:60, 69, 80` (Carousel Nav): Upgrade buttons to `min-h-[44px] min-w-[44px]`.
  6. `components/CACard.vue:98, 110, 116` (Multi-MCQ Dots & Chevrons): Wrap dots in `min-h-[36px] min-w-[24px]` tap targets; chevrons `min-h-[44px]`.
  7. `components/notes/NoteCard.vue:94, 95` (Note Edit/Delete): Upgrade to `size="xs" class="min-h-[40px] min-w-[40px] p-2"`.
  8. `components/notes/SectionNotesButton.vue:46` (Section Note Add): Upgrade to `size="sm" class="min-h-[44px] min-w-[44px] p-2"`.
  9. `components/FlashcardReview.vue:46-59` & `main.css:818` (FSRS Rating Buttons): Add `min-height: 48px; display: flex; align-items: center; justify-content: center;` to `.btn-again, .btn-hard, .btn-good, .btn-easy`.
  10. `pages/pyq-archive.vue:69, 92, 217, 227` (Exam & Pagination Buttons): Upgrade to `min-h-[44px]` with flex centering.

---

#### DEF-PCUT-07: 184 Hardcoded Slate Classes in Polity Union Executive Note
- **File & Line:** `pages/notes/polity/union-executive-and-legislature.vue:100-1200`
- **Domain:** Theme Consistency (R2)
- **Triggering Themes:** Theme 3 (Forest Light), Theme 4 (Forest Dark), Theme 5 (Notebook Light), Theme 6 (Notebook Dark)
- **Reproduction Scenario & Impact:**
  The note hardcodes `bg-slate-800`, `border-slate-700`, `bg-slate-900`, `bg-white` across cards, hierarchy trees, and tables. In Midnight Spruce Dark (`#0C1612`), these render as bright blue-gray rectangular patches instead of dark forest spruce green. In Warm Notebook Light (`#F6F1E4`), cards render stark hospital white rather than warm ruled paper.
- **Code Fix Recipe:**
  Replace `bg-white dark:bg-slate-900` with `bg-elev`, `border-slate-200 dark:border-slate-800` with `border b-line`, `bg-slate-50 dark:bg-slate-800/60` with `bg-sub`, and `text-slate-400` with `t-lo`.

---

#### DEF-PCUT-08: 115 Hardcoded Slate Classes in Telangana Statehood Movement Note
- **File & Line:** `pages/notes/telangana/telangana-statehood-movement.vue:95-1300`
- **Domain:** Theme Consistency (R2)
- **Triggering Themes:** Themes 3, 4, 5, 6
- **Reproduction Scenario & Impact:**
  Identical theme isolation violation: 115 instances of hardcoded `slate-*` classes in phase cards, timeline milestones, and committee tables.
- **Code Fix Recipe:**
  Standardize on semantic classes `.bg-elev`, `.bg-sub`, `.b-line`, `.t-hi`, `.t-mid`, `.t-lo`.

---

#### DEF-PCUT-09: Pure White Map Backgrounds in Dark Mode on Drainage Note
- **File & Line:** `pages/notes/geography/drainage-system-of-india.vue:100, 115, 256, 302, 347, 418, 428, 438, 448, 503, 513`
- **Domain:** Dark Theme Visual Glitches (R2)
- **Triggering Themes:** All 3 Dark Themes
- **Reproduction Scenario & Impact:**
  11 map container cards specify `bg-white` without dark mode overrides. Dark mode students scrolling through the note are hit by blinding white containers.
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/notes/geography/drainage-system-of-india.vue -->
  <div class="mb-6 rounded-xl border b-line bg-elev p-4 text-center shadow-sm">
  ```

---

#### DEF-PCUT-10: Broken Class Names in Auth Login Form Mode Selector
- **File & Line:** `pages/auth/login.vue:28, 36`
- **Domain:** Theme Utilities (R2)
- **Triggering Themes:** All 6 Themes
- **Reproduction Scenario & Impact:**
  Mode selector uses `text-hi`, `text-lo`, `text-mid` which do not exist in the stylesheet (`.t-hi`, `.t-mid`, `.t-lo` are defined). Tab text fails to inherit proper contrast.
- **Code Fix Recipe:**
  ```html
  <!-- File: pages/auth/login.vue:28, 36 -->
  :class="method === 'magic_link' ? 'bg-elev t-hi shadow-sm' : 't-lo hover:t-mid'"
  ```

---

#### DEF-PCUT-11: Markdown Code Blocks Break Notebook & Forest Backgrounds
- **File & Line:** `components/content/ProseCode.vue:8`
- **Domain:** Theme Architecture (R2)
- **Triggering Themes:** Theme 3 (Forest Light), Theme 5 (Notebook Light)
- **Reproduction Scenario & Impact:**
  `<ProseCode>` renders `<pre class="border border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">`. In Notebook Light (`#F6F1E4`), standard markdown code blocks render as sterile cold gray (`#f9fafb`) instead of the warm notebook dark artifact (`var(--ink-card)`).
- **Code Fix Recipe:**
  ```html
  <!-- File: components/content/ProseCode.vue:8 -->
  <pre v-else class="overflow-x-auto rounded-lg border border-[var(--ink-card-line)] bg-[var(--ink-card)] p-4 text-sm text-[var(--ink-card-text)]">
  ```

---

#### DEF-PCUT-12: Hardcoded Low-Contrast Hex Colors in NoteRenderer Badges
- **File & Line:** `components/NoteRenderer.vue:15, 37, 70`
- **Domain:** Contrast Compliance (R2)
- **Triggering Themes:** All 3 Light Themes
- **Reproduction Scenario & Impact:**
  Inline styles `color: #93bbfd` (1.72:1), `color: #8d93ab` (2.97:1), and `color: #34d399` (1.94:1) fail WCAG AA contrast against light card backgrounds.
- **Code Fix Recipe:**
  Replace with semantic classes: `text-sky-600 dark:text-sky-400`, `t-lo font-mono`, and `text-emerald-600 dark:text-emerald-400`.

---

#### DEF-PCUT-13: Scrollspy Index Mismatch in Note Pages
- **File & Line:**
  - `pages/notes/geography/dams-in-india.vue:1084-1092`
  - `pages/notes/geography/mountains-in-india.vue:1230-1238`
  - `pages/notes/geography/irrigation-in-india.vue:1019-1027`
  - `pages/notes/polity/union-executive-and-legislature.vue:857-865`
  - `pages/notes/telangana/telangana-statehood-movement.vue:814-822`
- **Domain:** TOC & Navigation (R3)
- **Triggering Viewports:** Desktop (`1280px+`)
- **Reproduction Scenario & Impact:**
  The scroll handler builds `secEls = sections.map(...).filter(Boolean)`. If any section element is omitted or has a mismatched ID, index `i` of `secEls` no longer aligns with `sections[i]`, causing the TOC to highlight the wrong section.
- **Code Fix Recipe:**
  ```ts
  // Inspect sections directly with getBoundingClientRect()
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = document.getElementById(sections[i].id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= 120) {
        activeSection.value = sections[i].id
        break
      }
    }
  }
  ```

---

#### DEF-PCUT-14: IntersectionObserver Bottom Section Deadlock
- **File & Line:** `pages/notes/geography/drainage-system-of-india.vue:1111-1123`
- **Domain:** TOC & Scrollspy (R3)
- **Triggering Viewports:** Desktop (`1280px+`)
- **Reproduction Scenario & Impact:**
  `IntersectionObserver` uses `{ rootMargin: '-20% 0px -70% 0px' }`. When scrolling to the absolute bottom of the document, `#gate` and `#current-affairs` cannot reach the top 20% slice of the viewport, so the TOC remains permanently stuck on `#pyqs` or `#advanced-practice`.
- **Code Fix Recipe:**
  Add a bottom-scroll detector in `onScroll`:
  ```ts
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
    activeSection.value = 'current-affairs'
  }
  ```

---

#### DEF-PCUT-15: Completely Unwired TOC in `forests-in-india.vue`
- **File & Line:** `pages/notes/geography/forests-in-india.vue:897-905, 938-958`
- **Domain:** TOC & Navigation (R3)
- **Triggering Viewports:** Desktop (`1280px+`)
- **Reproduction Scenario & Impact:**
  TOC links in `forests-in-india.vue` lack `activeSection` ref, conditional `:class` styling, and scroll spy event listeners. The sidebar is completely inert.
- **Code Fix Recipe:**
  Add standard `activeSection = ref('visual')`, scroll handler, and `:class="activeSection === sec.id ? 'bg-accent-soft t-hi font-semibold' : 't-lo hover:t-mid'"`.

---

#### DEF-PCUT-16: PYQ Search Lacks Debounce, Flooding API on Keystrokes
- **File & Line:** `pages/pyq-archive.vue:27-32, 290-300`
- **Domain:** Search & Performance (R3)
- **Triggering Viewports & Themes:** All Viewports, All Themes
- **Reproduction Scenario & Impact:**
  `v-model="searchQuery"` is bound directly without debounce. Typing `"Godavari River"` fires 14 distinct API calls to `/api/pyqs` in under 2 seconds, creating network congestion and response race conditions.
- **Code Fix Recipe:**
  ```ts
  // File: pages/pyq-archive.vue
  const searchInput = ref('')
  const debouncedSearch = refDebounced(searchInput, 300)
  ```

---

#### DEF-PCUT-17: UTC Date Rollover Resets Daily Review Counter Mid-Study
- **File & Line:** `pages/review.vue:171, 246`
- **Domain:** FSRS Study Tracker & Timezones (R3)
- **Triggering Viewports & Themes:** All Viewports, All Themes
- **Reproduction Scenario & Impact:**
  Storage key uses UTC `new Date().toISOString().slice(0, 10)`. In Indian Standard Time (UTC+5:30), late-night study sessions crossing 5:30 AM IST abruptly change date keys, resetting "Reviewed today" counter from 45 back to 0.
- **Code Fix Recipe:**
  ```ts
  function getLocalDateKey(): string {
    const d = new Date()
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  ```

---

#### DEF-PCUT-18: 80% of Note Typography Ignores Settings Font Scaling Multipliers
- **File & Line:** `pages/settings.vue:64-162`, `tailwind.config.ts:34-41`, `pages/notes/**`
- **Domain:** Typography & Accessibility (R3)
- **Triggering Viewports & Themes:** All Viewports, All Themes
- **Reproduction Scenario & Impact:**
  `settings.vue` updates `--scale-heading` and `--scale-base`. However, note pages hardcode arbitrary pixel classes (`text-[14px]`, `text-[30px]`), completely bypassing the font scaling multiplier.
- **Code Fix Recipe:**
  Replace arbitrary font classes with semantic scale classes (`text-body`, `text-body-sm`, `text-h2`, `text-h3`).

---

#### DEF-PCUT-19: Missing Telugu Web Fonts & Matra Clipping Under Tight Leading
- **File & Line:** `nuxt.config.ts:86`, `layouts/default.vue:238`, `tailwind.config.ts:28, 34-36`
- **Domain:** Telugu Typography & Bilingual Layout (R3)
- **Triggering Viewports & Themes:** All Viewports, All Themes
- **Reproduction Scenario & Impact:**
  1. Google Fonts imports only Latin fonts; `Noto Sans Telugu` is absent. On non-Windows OS (Linux, Android, macOS), Telugu Unicode glyphs fallback to generic fonts, causing broken conjuncts (వత్తులు).
  2. Headings with `leading-[1.1]` clip upper and lower Telugu vowel signs (కొమ్ము `ు`, గుడి `ి`, ఏత్వం `ే`).
- **Code Fix Recipe:**
  1. Add `Noto+Sans+Telugu:wght@400;500;600;700` to Google Fonts link in `nuxt.config.ts` and `layouts/default.vue`.
  2. Extend `fontFamily.sans` in `tailwind.config.ts` to include `"Noto Sans Telugu"`.
  3. Ensure bilingual containers use `leading-relaxed` (`leading-[1.75]`) and minimum `py-1` padding.

---

### 4.3 Polish & Consistency Issues (🟢)

---

#### DEF-POL-01: Missing Mobile Horizontal Scroll Cue in ConstitutionalHierarchy
- **File & Line:** `components/visual/ConstitutionalHierarchy.vue:175-177`
- **Domain:** Visual Polish (R1)
- **Fix Recipe:** Add a mobile swipe affordance pill:
  ```html
  <div class="sm:hidden mb-2 flex items-center gap-1.5 font-mono text-[10.5px] t-lo">
    <UIcon name="i-heroicons-arrows-right-left" class="h-3.5 w-3.5 accent" />
    <span>Swipe horizontally to explore constitutional hierarchy</span>
  </div>
  ```

---

#### DEF-POL-02: Mermaid Diagrams Do Not Sync with Theme Preset Changes
- **File & Line:** `components/MermaidChart.vue:51-105`
- **Domain:** Theme Polish (R2)
- **Fix Recipe:** Watch `currentPreset` from `useThemePreset()` and re-render Mermaid SVG with sage green or warm notebook color maps when theme preset changes.

---

#### DEF-POL-03: Secondary Muted Text Micro-Contrast in Interactive Dark Artifacts
- **File & Line:** `components/visual/InteractiveRiverMap.vue:247`, `components/RiskCalibrationDashboard.vue:140`
- **Domain:** Contrast Polish (R2)
- **Fix Recipe:** Upgrade secondary text classes from `text-stone-500` / `text-slate-500` to `text-stone-400` (`#a8a29e`, contrast **6.8:1**) or `text-slate-400` (`#94a3b8`, contrast **6.4:1**).

---

#### DEF-POL-04: Flashcard Review Queue Low Contrast Hint
- **File & Line:** `pages/review.vue:70`
- **Domain:** Contrast Polish (R2)
- **Fix Recipe:** Replace `text-zinc-400` (`#a1a1aa`, 2.38:1) with `t-lo` (`var(--text-3)`, 3.0:1+ for secondary labels).

---

#### DEF-POL-05: Invalid List `<br/>` HTML in `NoteCard.vue`
- **File & Line:** `components/notes/NoteCard.vue:22-29`
- **Domain:** Markup Validation (R3)
- **Fix Recipe:** Refine markdown regex parser to prevent inserting `<br/>` tags between `<li>` elements.

---

#### DEF-POL-06: Current Affairs Strip Empty Container Flash
- **File & Line:** `components/CurrentAffairsStrip.vue:1-3`
- **Domain:** Layout Polish (R3)
- **Fix Recipe:** Ensure the parent section container is conditionally rendered with `v-if="items.length > 0"` to prevent rendering an empty border block when no CA cards match the topic.

---

#### DEF-POL-07: In-Place Computed Array Mutation in `WhatsNewSlideover.vue`
- **File & Line:** `components/WhatsNewSlideover.vue:174`
- **Domain:** Vue Reactivity Polish (R3)
- **Fix Recipe:** Replace `recentDates.value.sort(...)` with `[...recentDates.value].sort(...)` to prevent mutating computed refs in-place.

---

## 5. Mobile Touch Target Ergonomics Audit (WCAG 2.1 SC 2.5.5)

| # | Component / File & Line | Target Element | Current Dimensions | Failure Analysis | Code Fix Recipe |
|---|---|---|---|---|---|
| 1 | `layouts/default.vue:38` | Mobile Drawer Close | `size="xs"` (~24x24px) | Misses 44px hit target on phones. | Replace `size="xs"` with `size="sm" class="min-h-[44px] min-w-[44px] flex items-center justify-center"` |
| 2 | `layouts/default.vue:104, 146, 163, 178` | Topbar Hamburger, Search, Theme, Avatar | `size="sm"` (~32x32px) | Frequent miss-taps in header bar. | Add `min-h-[44px] min-w-[44px] p-2` to touch targets |
| 3 | `components/GateQuiz.vue:140, 148, 157` | Gate Nav Arrows & Submit Button | `h-8 w-8` (32x32px), `h-8` (32px) | Frustrating tap failure during quiz. | Update to `h-11 w-11` (44x44px) for arrows and `h-11 px-5` for submit |
| 4 | `components/CurrentAffairsStrip.vue:42` | Carousel Dot Pagination | `w-1.5 h-1.5` (6x6px hit area) | Nearly impossible to tap accurately. | Wrap dot in a `button` with `min-h-[44px] min-w-[28px] flex items-center justify-center` |
| 5 | `components/CurrentAffairsStrip.vue:60, 69, 80` | Carousel Next/Prev & Mark Read | `h-8 w-8` (32x32px), `h-8` (32px) | Violates touch target guidelines. | Update to `min-h-[44px] min-w-[44px]` for mobile buttons |
| 6 | `components/CACard.vue:98, 110, 116` | Multi-MCQ Dots & Chevrons | `h-2 w-2` (8px), `size="xs"` (24px) | Sub-target touch zone. | Wrap dots in `min-h-[36px] min-w-[24px]` tap targets; chevrons `size="sm" min-h-[44px]` |
| 7 | `components/notes/NoteCard.vue:94, 95` | Note Edit & Delete Buttons | `size="2xs"` (~20x20px) | Accidental delete / miss-click risk. | Upgrade to `size="xs" class="min-h-[40px] min-w-[40px] p-2"` on touch |
| 8 | `components/notes/SectionNotesButton.vue:46` | Section Note Add Button | `size="xs"` (~24x24px) | Hard to tap on mobile note margins. | Upgrade to `size="sm" class="min-h-[44px] min-w-[44px] p-2"` |
| 9 | `components/FlashcardReview.vue:46-59` & `main.css:818` | FSRS Spaced Repetition Buttons | `padding: 9px 0` (~36px height) | Rapid review fatigue on mobile. | Add `min-height: 48px; display: flex; align-items: center; justify-content: center;` to `.btn-again, .btn-hard, .btn-good, .btn-easy` |
| 10 | `pages/pyq-archive.vue:69, 92, 217, 227` | Exam Type, Year & Pagination | `py-1.5 text-xs` (~26-30px) | Dense button cluster causes mis-taps. | Update buttons to `min-h-[44px]` with flex alignment |

---

## 6. Implementation & Remediation Roadmap

To ensure a seamless, regression-free implementation across the application, fixes should be executed in four prioritized phases:

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    REMEDIATION IMPLEMENTATION PHASES                       │
├────────────────────────────────────────────────────────────────────────────┤
│ Phase 1: Core Logic, Data Integrity & Cloud FSRS Sync (DEF-CRIT 1-5)       │
│ ➔ Personal Notes composer save fix, GateQuiz flashcard_ids payload,        │
│    FSRS single-card 'Again' loop, AiAssistant storageKey, PYQ regex filter.│
├────────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Theme Token, CSS Variable & Contrast Repairs (DEF-CRIT 9-13)      │
│ ➔ Settings isForest destructuring, GateQuiz --saffron fix, bg-saffron      │
│    Tailwind ramp, FlashcardReview & SectionNotesButton contrast repairs.  │
├────────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Responsive Layouts, SVG Containers & TOC (DEF-CRIT 6-8, PCUT 1-6) │
│ ➔ RiverMap overflow-x-auto, FlashcardDeck flip height/scroll, mobile TOC   │
│    slide-over trigger, settings 360px flex wrap, 44px touch targets.       │
├────────────────────────────────────────────────────────────────────────────┤
│ Phase 4: Flow Enhancements, Telugu Typography & Polish (PCUT 7-19, POL 1-7)│
│ ➔ Google Fonts Noto Sans Telugu, Note hardcoded slate cleanup, scrollspy   │
│    index repair, search debounce, local IST date calculation.              │
└────────────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Core Logic, Data Integrity & Cloud FSRS Sync (Immediate Priority)
- **Scope:** `PersonalNotesDrawer.vue`, `GateQuiz.vue`, `pages/review.vue`, `AiAssistantDrawer.vue`, `server/api/pyqs.get.ts`.
- **Objectives:** Prevent user data loss, ensure all completed quizzes seed FSRS cards to Supabase, guarantee flashcard session retention algorithms, and eliminate search filter collisions.
- **Verification:** Run `npm run build` and test API responses for `/api/pyqs?exam=si` and `/api/gate/submit`.

### Phase 2: Theme Tokens, CSS Variables & Contrast Repairs
- **Scope:** `pages/settings.vue`, `components/GateQuiz.vue`, `pages/notes/**`, `components/FlashcardReview.vue`, `components/notes/SectionNotesButton.vue`, `components/NoteRenderer.vue`.
- **Objectives:** Achieve 100% WCAG 2.1 AA compliance across all 6 theme states and fix broken theme preview cards.
- **Verification:** Execute the automated token verification script across all `.vue` files to confirm zero instances of invalid classes (`bg-saffron`, `text-hi`, `var(--saffron)`).

### Phase 3: Responsive Layouts, SVG Diagram Containers & Mobile TOC
- **Scope:** `components/visual/InteractiveRiverMap.vue`, `components/FlashcardDeck.vue`, `assets/css/main.css`, all 7 topic note pages, `layouts/default.vue`.
- **Objectives:** Eliminate SVG map truncation, enable vertical scroll for long flashcards, provide mobile/tablet TOC slide-over menus, and enforce 44x44px touch targets.
- **Verification:** Test layouts in Chrome DevTools at 360px, 390px, 768px, 1024px, and 1440px.

### Phase 4: Core Flow Hardening, Telugu Typography & Visual Polish
- **Scope:** `nuxt.config.ts`, `tailwind.config.ts`, `pages/notes/polity/**`, `pages/notes/telangana/**`, `pages/pyq-archive.vue`, `components/MermaidChart.vue`, `components/WhatsNewSlideover.vue`.
- **Objectives:** Load `Noto Sans Telugu`, replace ~300 hardcoded `slate-*` classes with semantic tokens, wire unwired TOCs, add 300ms search debounce, and switch date trackers to IST local time.
- **Verification:** Verify font network requests in browser DevTools and inspect Telugu vowel matras across headings and questions.

---

## 7. Independent Verification Commands

To independently confirm all findings and fix implementations:

```bash
# 1. Verify absence of invalid Tailwind classes and undefined CSS variables
grep -rn "bg-saffron\"" pages/ components/
grep -rn "var(--saffron)" components/
grep -rn "text-hi\"\|text-lo\"" pages/ components/

# 2. Check for hardcoded non-semantic slate classes in notes
grep -rn "bg-slate-" pages/notes/

# 3. Test PYQ SI filter regex against Constable version strings
curl -s "http://localhost:3000/api/pyqs?exam=si&limit=10" | jq .

# 4. Verify Google Fonts configuration in nuxt.config.ts
grep -rn "Noto+Sans+Telugu" nuxt.config.ts layouts/default.vue

# 5. Full project compilation and type check
npm run build
```

---
*Report compiled and verified by Worker 1 (`teamwork_preview_worker_1`) on 2026-09-01.*
