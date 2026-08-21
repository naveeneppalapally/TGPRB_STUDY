# Project: Personal Notes & Content Improvement Queue System

## Architecture
- **Framework**: Nuxt 3 (SSR + Client Hydration) + Nuxt UI (`@nuxt/ui`) + Tailwind CSS.
- **State & Local-First Persistence**: `composables/usePersonalNotes.ts` with `localStorage` (keys `tgprb:personal-notes:<user_id|guest>`), 800ms debounced autosave, dual-key Last-Write-Wins (LWW) conflict resolution (`client_updated_at` + `last_event_id`).
- **Offline Sync & RPCs**: `composables/useOfflineSync.ts` with multi-tier mutation queue (IndexedDB -> LocalStorage -> Memory), mutation coalescing (`mergeNoteMutations`), targeting Supabase RPCs (`merge_user_notes`, `insert_content_improvement_items`).
- **Components**:
  - `components/notes/InlineNoteStrip.vue`: Collapsible preview strip under section headers when notes exist (⭐/❓ chips, snippet text, click opens drawer).
  - `components/notes/SectionNotesButton.vue`: Action button inside section headers with note count badge and importance indicator.
  - `components/notes/PersonalNotesDrawer.vue`: Responsive right slideover (`w-screen sm:w-[28rem]`) with 2 tabs ("My Notes" & "Suggest Improvement"), text selection quote capture (up to 300 chars), 800ms debouncing, and image link preview.
  - `components/notes/NoteCard.vue`: Card view with markdown-lite rendering, inline edit, ⭐/❓ toggles, and delete.
  - `components/notes/ImprovementForm.vue`: Form for issue reporting (`fix_fact`, `replace_image`, `add_image`, `add_table`, `add_topic`, `other`) with image preview and offline queue dispatch.
  - `pages/my-notes.vue`: Central notes dashboard with full-text search, ⭐/❓ filters, and topic grouping for all 7 active note pages.

## Feature Inventory
| # | Feature | Description | Milestone | Status |
|---|---------|-------------|-----------|--------|
| 1 | InlineNoteStrip Component | Compact collapsible strip under section headers with badge/snippet and drawer trigger | M1 | DONE |
| 2 | Shared Reactive State in usePersonalNotes | Shared reactive state across components for instant drawer/strip/button sync | M1 | DONE |
| 3 | Global /my-notes Topic Registry | Map all 7 active note pages with metadata in `pages/my-notes.vue` | M1 | DONE |
| 4 | Geography Note Pages Rollout | Roll out notes components across 5 Geography pages (drainage, irrigation, mountains, dams, forests) | M2 | DONE |
| 5 | Polity & Telangana Note Pages Rollout | Roll out notes components across Polity & Telangana pages | M3 | DONE |
| 6 | Script & Tooling Integrity Fixes | Fix `scripts/verify-topics.ts` type import and verify `export_improvement_queue.py` | M3 | DONE |
| 7 | E2E Testing Suite (Tiers 1-4) | Opaque-box test suite for notes, sync, queue, and rollout (54 tests) | E2E Track | DONE |
| 8 | E2E Verification & Adversarial Hardening (Tier 5) | Pass 100% E2E tests and harden with adversarial test cases | M4 (Final) | DONE |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Core Component & State Engine | Implement `InlineNoteStrip.vue`, reactive state in `usePersonalNotes.ts`, and expand `pages/my-notes.vue` registry | none | DONE |
| 2 | Universal Rollout: Geography | Integrate SectionNotesButton, InlineNoteStrip, PersonalNotesDrawer on 5 Geography note pages | M1 | DONE |
| 3 | Universal Rollout: Polity, Telangana & Tooling | Integrate notes on Polity & Telangana note pages + fix `scripts/verify-topics.ts` | M1 | DONE |
| E2E | E2E Testing Track | Requirement-driven test harness, test cases (Tiers 1-4), publish `TEST_READY.md` | none | DONE |
| 4 | Final Verification & Hardening | Pass 100% E2E tests (Tiers 1-4) + Tier 5 adversarial coverage hardening | M2, M3, E2E | DONE |

## Code Layout
- `components/notes/InlineNoteStrip.vue` (M1 - DONE)
- `composables/usePersonalNotes.ts` (M1 - DONE)
- `pages/my-notes.vue` (M1 - DONE)
- `pages/notes/geography/drainage-system-of-india.vue` (M2 - DONE)
- `pages/notes/geography/irrigation-in-india.vue` (M2 - DONE)
- `pages/notes/geography/mountains-in-india.vue` (M2 - DONE)
- `pages/notes/geography/dams-in-india.vue` (M2 - DONE)
- `pages/notes/geography/forests-in-india.vue` (M2 - DONE)
- `pages/notes/polity/union-executive-and-legislature.vue` (M3 - DONE)
- `pages/notes/telangana/telangana-statehood-movement.vue` (M3 - DONE)
- `scripts/verify-topics.ts` (M3 - DONE)
- `scripts/export_improvement_queue.py` (M3 - DONE)
- `nuxt.config.ts` (M4 - DONE)
