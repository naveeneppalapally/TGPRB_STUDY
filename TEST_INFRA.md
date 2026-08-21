# Personal Notes & Content Improvement Queue: Test Architecture & Infrastructure

This document specifies the opaque-box test architecture, testing methodology, and execution framework for the Personal Notes and Content Improvement Queue system in TSLPRB StudyOS.

---

## 1. Test Architecture Overview

The testing suite verifies the end-to-end reliability, local-first persistence, reactive synchronization, and fault-tolerant mutation queueing across all layers of the Personal Notes and Content Improvement Queue system.

### Test Execution Layer
- **Runner**: Node.js + `tsx` executable harness (`npx tsx scripts/test-personal-notes-e2e.ts`).
- **Environment**: Headless Node runtime with simulated browser DOM APIs (`window`, `localStorage`, `getSelection()`, `EventTarget`), reactive Vue state, in-memory mutation stores, and mocked Supabase RPC endpoints.
- **Independence & Isolation**: Every test scenario provisions an isolated environment, unique user identifiers, separate storage partitions, and cleans up after execution.
- **Zero Em-Dash Policy**: Strictly compliant with `scripts/ban-em-dash.ts`.

```
+-------------------------------------------------------------------------+
|                              TEST TIERS                                 |
+--------------------+--------------------+-------------------------------+
| Tier 1: Features   | >=5 tests/feature  | Direct contract verification  |
| Tier 2: Boundaries | Edge conditions    | 300-char limits, Unicode, XSS |
| Tier 3: Cross-Flow | Multi-module E2E   | Note -> Search -> Queue Sync  |
| Tier 4: Real-World | Complex scenarios  | 7-Topic Revision & 2hr Offline|
+--------------------+--------------------+-------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                          EXECUTION HARNESS                              |
|               `scripts/test-personal-notes-e2e.ts`                      |
|  - Mock Supabase RPCs (merge_user_notes, insert_content_improvement)    |
|  - Headless Browser & LocalStorage Sandboxes                            |
|  - CRDT Dual-Key LWW Merge Engine                                       |
|  - Markdown-Lite Parser & DOM Sanitizer                                 |
|  - Python AI Queue Export CLI Harness                                   |
+-------------------------------------------------------------------------+
```

---

## 2. 4-Tier Test Matrix Specification

### Tier 1: Feature Coverage (>=5 Tests per Feature)

#### Feature 1: InlineNoteStrip & SectionNotesButton Component Contracts
- **T1.1.1**: Section without notes returns zero count and suppresses `InlineNoteStrip` (`v-if="sectionNotes.length > 0"`).
- **T1.1.2**: Adding note renders `InlineNoteStrip` with text snippet and updates `SectionNotesButton` count badge.
- **T1.1.3**: Flagging note with `is_important: true` renders ⭐ Imp chip on strip and saffron badge styling on button.
- **T1.1.4**: Flagging note with `is_doubt: true` renders ❓ Doubt chip on strip.
- **T1.1.5**: Count exceeding 99 notes renders `99+` badge on `SectionNotesButton`.
- **T1.1.6**: Click on `SectionNotesButton` or `InlineNoteStrip` emits complete `SectionContext` payload (`noteId`, `sectionId`, `sectionLabel`, `noteTitle`, `route`).

#### Feature 2: PersonalNotesDrawer & Text Selection Quote Capture
- **T1.2.1**: `openForSection(context)` binds active section context to slideover header and tabs.
- **T1.2.2**: Text selection `<= 300` characters is accurately captured into `draftAnchor`.
- **T1.2.3**: Text selection `> 300` characters is strictly sliced to 300 characters.
- **T1.2.4**: Leading and trailing whitespaces in browser text selections are trimmed before capture.
- **T1.2.5**: Saving a note populates `id` (UUID), `created_at`, `client_updated_at`, `last_event_id`, and syncs via offline queue.
- **T1.2.6**: Tab switching seamlessly transitions between "My Notes" and "Suggest Improvement" views.

#### Feature 3: NoteCard Markdown-Lite & Note Operations
- **T1.3.1**: `parseMarkdownLite` converts `**bold**` delimiters to `<strong>...</strong>`.
- **T1.3.2**: `parseMarkdownLite` converts `- bullet` lists to `<ul><li>...</li></ul>` structures.
- **T1.3.3**: `parseMarkdownLite` strips raw HTML tags to prevent XSS injection.
- **T1.3.4**: Toggle `is_important` updates reactive state and dispatches offline mutation with updated timestamp.
- **T1.3.5**: Toggle `is_doubt` updates reactive state and dispatches offline mutation with updated timestamp.
- **T1.3.6**: Deleting a note sets `deleted: true` (tombstone) rather than hard deletion, preserving auditability.

#### Feature 4: ImprovementForm & Content Improvement Queue
- **T1.4.1**: Submitting with empty or whitespace-only description is blocked and rejected.
- **T1.4.2**: Valid submission creates `ContentImprovementItem` with status `pending`, UUID, and timestamp.
- **T1.4.3**: Image URLs (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`) activate `isImagePreview` computed flag.
- **T1.4.4**: Non-image URLs (e.g. articles, Wikipedia links) do not trigger image preview rendering.
- **T1.4.5**: Form input fields (`description`, `referenceUrl`, `itemType`) reset cleanly after submission.
- **T1.4.6**: Submissions are queued for Supabase sync via `insert_content_improvement_items` RPC.

#### Feature 5: Local-First Persistence & LWW CRDT Conflict Resolution
- **T1.5.1**: Guest users persist data under `tgprb:personal-notes:guest` and `tgprb:improvements:guest`.
- **T1.5.2**: Authenticated users persist data under `tgprb:personal-notes:<user_id>`.
- **T1.5.3**: LWW: Cloud note with newer `client_updated_at` overwrites older local note.
- **T1.5.4**: LWW: Local note with newer `client_updated_at` overwrites older cloud note.
- **T1.5.5**: LWW: Matching timestamps resolve deterministically using `last_event_id` string comparison.
- **T1.5.6**: `mergeNoteMutations` coalesces rapid mutations on the same note ID into single latest payload.

#### Feature 6: Global `/my-notes.vue` Dashboard & Search Registry
- **T1.6.1**: Topic registry correctly maps all 7 active note pages across Geography, Polity, and Telangana.
- **T1.6.2**: Notes are grouped by topic with accurate section subheadings and total note counts.
- **T1.6.3**: Full-text search matches substrings in note body (case-insensitive).
- **T1.6.4**: Full-text search matches substrings in quoted `anchor_text` (case-insensitive).
- **T1.6.5**: Filter mode `important` filters strictly to `is_important === true`.
- **T1.6.6**: Filter mode `doubt` filters strictly to `is_doubt === true`.
- **T1.6.7**: Filter cycle rotates deterministically (`all` -> `important` -> `doubt` -> `all`).

#### Feature 7: Content Improvement Backlog Export Tooling (`export_improvement_queue.py`)
- **T1.7.1**: Missing `SUPABASE_URL` or `SUPABASE_SERVICE_KEY` environment variables exit with code 1 and error message.
- **T1.7.2**: Export function queries `content_improvement_items` where `status = 'pending'` ordered by `created_at` ASC.
- **T1.7.3**: Export output outputs valid JSON array containing all required schema fields.
- **T1.7.4**: `mark-done` command accepts `<item_id>` and optional `[admin_notes]` and updates status to `done`.
- **T1.7.5**: `mark-done` without required arguments exits with code 1 and usage instructions.

---

### Tier 2: Boundary & Corner Cases

- **T2.1: Empty & Whitespace Note Handling**:
  - Blank string `""`, newline string `"\n\n\t "`, and empty bodies are prevented from creating notes.
- **T2.2: Exact 300-Character Selection Quote Boundary**:
  - Selection of 299 chars is preserved completely without truncation.
  - Selection of 300 chars is preserved completely without truncation.
  - Selection of 301 chars is truncated to exactly 300 characters.
  - Selection of 1,000 chars is truncated to exactly 300 characters.
- **T2.3: Special Characters, Telugu Script, & Unicode Support**:
  - Telugu script (e.g. `తెలంగాణ ఉద్యమం మరియు నదుల వ్యవస్థ`), emojis (⭐, ❓, 🗺️, ⚖️), quotes (`"`, `'`), backticks, newlines, and markdown symbols persist without data loss or encoding corruption.
- **T2.4: Malicious HTML & Script Tag Sanitization**:
  - Injected payloads (`<script>alert(1)</script>`, `<img src=x onerror=alert(1)>`, `<iframe src="...">`) are stripped by markdown-lite parser.
- **T2.5: Debounced Autosave Under Rapid Input**:
  - Rapid bursts of 10 keystrokes within 200ms trigger a single persistent write after 800ms debounce interval.
- **T2.6: Offline-to-Online Network State Reconnection**:
  - Mutations queued while offline (`isOnline() === false`) remain in queue until `'online'` event fires, then flush cleanly in batches.
- **T2.7: Empty Search & Zero State Handling**:
  - Searching for non-existent text returns empty group array with appropriate empty-state message.

---

### Tier 3: Cross-Feature Combinations

- **T3.1: End-to-End Note Lifecycle Across Components**:
  - Flow: Select text on note page -> Open drawer via `SectionNotesButton` -> Auto-capture quote -> Type note -> Debounced save -> `InlineNoteStrip` updates with snippet -> `/my-notes` groups and displays note -> Search query finds note -> Flag as important -> ⭐ badge propagates to strip, button, and dashboard.
- **T3.2: End-to-End Content Improvement Queue Lifecycle**:
  - Flow: Section context captured -> Switch to improvement tab -> Select `replace_image` -> Add image URL and description -> Submit -> Item saved locally and queued -> Network syncs to Supabase -> Python export script extracts item for agent -> Agent marks item done -> Item status reflects updated state.
- **T3.3: Multi-Device LWW Conflict Resolution & Tombstone Sync**:
  - Flow: Device A and Device B start with Note 1. Device A modifies note offline. Device B modifies note with newer timestamp and syncs. Device A reconnects and merges; Device B's newer version wins. Device A soft-deletes note; tombstone propagates and removes note from active counts and search queries across devices.

---

### Tier 4: Real-World Scenarios

- **T4.1: Comprehensive Student Revision Session Across All 7 Topics**:
  - Simulates a student studying for TGPRB SI exam:
    - Creates 15 notes across Geography (Drainage, Irrigation, Mountains, Dams, Forests), Polity (Union Executive), and Telangana (Statehood Movement).
    - Flags 6 notes as ⭐ Important, 4 notes as ❓ Doubt.
    - Uses `/my-notes` search and filter to isolate all Doubts for quick revision.
    - Confirms topic groupings, section titles, and total counts match exactly.
- **T4.2: Extended 2-Hour Offline Session with Heavy Mutation Replay**:
  - Simulates an offline commute session:
    - 10 new notes created across multiple sections.
    - 5 existing notes edited with updated text and flags.
    - 3 notes deleted.
    - 2 content improvements submitted.
    - Total 20 mutations coalesced by `mergeNoteMutations` and `collectImprovementMutations`.
    - Network reconnects: all mutations dispatched via minimal batch RPC calls, pending count drops to 0, zero state divergence.

---

## 3. Test Execution & Verification

### Running the Test Suite
```bash
# Run the complete automated Personal Notes E2E test suite
npx tsx scripts/test-personal-notes-e2e.ts

# Run prebuild checks (em-dash linter + AI context generator)
npm run prebuild

# Run offline sync unit tests
npm run test:offline-sync
```

### Success Criteria
1. `scripts/test-personal-notes-e2e.ts` executes all 4 Tiers with 100% pass rate and exit code 0.
2. `npm run prebuild` completes with 0 banned em-dashes.
3. Zero regressions in existing offline sync and exam strategy test suites.
