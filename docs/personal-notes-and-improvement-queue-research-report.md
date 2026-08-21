# Research report: Personal Notes and Content Improvement Queue

This report is based on the existing project rules and code. No application code is changed by this document.

## Executive recommendation

Build one contextual pencil action with two tabs:

- `My Note`
- `Suggest Improvement`

Use two separate data models and two public composables, while reusing the existing local-first sync engine, Nuxt UI components, section styling, authentication, and slideover patterns.

The most important product decision is preserving context. Every note and improvement request should remember the exact note page, section key, section title, and route where it was created.

## 1. What makes the features useful?

### Personal Notes

Personal notes should be short revision aids, not a second textbook.

Recommended behavior:

- Support plain text plus lightweight Markdown-style formatting for bold text, bullets, and short numbered lists.
- Avoid a full rich-text editor. It would make writing feel heavy and add unnecessary complexity.
- Autosave locally after a short debounce, then sync in the background.
- Show `Saved locally` or `Synced` status.
- Support multiple notes per section.
- Add independent `Important` and `Doubt` flags. A note can be both.
- Store created and updated timestamps.
- Filter by all notes, important notes, doubts, and recently updated notes.
- Show a subtle note indicator beside sections that already contain notes.

The drawer should open directly in the context where the user clicked. Its header should show a breadcrumb such as:

> Drainage System of India / Deep Dive / Ganga System

This contextual connection is the primary advantage over Google Docs.

The drawer should also offer:

- `Open section`
- `Add another note`
- `Delete`
- `Mark important`
- `Mark as doubt`

The initial state should be a focused textarea, not a large form. Metadata controls should remain secondary.

### Content Improvement Queue

This should capture an actionable change request, not just a URL.

Minimum useful fields:

- Automatically captured note page
- Automatically captured section
- Request type: replace visual, add missing content, correct content, clarify content, improve layout, or other
- Short summary
- Detailed description
- What should change and where
- Reference URL
- Reference type: image, article, document, or other
- Priority: low, normal, or high

Example:

> Replace the current Ganga map with this labeled basin map. Place it directly after the Ganga tributary summary. The current map does not show left-bank and right-bank tributaries clearly.

If the URL is an image, show a thumbnail preview. If it is a normal page, show the domain and link preview status. Do not automatically download the image into the repository just because a student submitted a URL.

Recommended statuses:

- `pending`
- `in_progress`
- `done`
- `skipped`
- `archived`

Processed items should remain available with resolution notes, processing date, agent or processor reference, commit or PR reference, and a reason if skipped.

## 2. Existing patterns to reuse

The note structure is already well defined in [`drainage-system-of-india.vue`](../pages/notes/geography/drainage-system-of-india.vue):

- Top-level sections use `id`, `scroll-mt-20`, and `.sec-head`.
- Section numbers, titles, rules, and metadata are consistent.
- The right-side TOC is generated from the `sections` array.
- The TOC and scrollspy currently operate only on top-level sections.
- `Ganga System` is an `h4` nested inside `Deep Dive`, not a top-level TOC section.

The persistence model can reuse:

- Local-first behavior from [`useTopicVisits.ts`](../composables/useTopicVisits.ts)
- User-scoped keys from [`useFlashcardUnlock.ts`](../composables/useFlashcardUnlock.ts)
- Identity from [`useAuth.ts`](../composables/useAuth.ts)
- IndexedDB and retry behavior from [`useOfflineSync.ts`](../composables/useOfflineSync.ts)
- LWW conflict handling from the existing bookmark implementation
- RLS and RPC conventions from [`offline_sync_schema.sql`](../server/database/offline_sync_schema.sql)

The UI can reuse:

- `USlideover` layout from [`WhatsNewSlideover.vue`](../components/WhatsNewSlideover.vue)
- Header, scrollable body, and footer structure from [`AiAssistantDrawer.vue`](../components/AiAssistantDrawer.vue)
- Nuxt UI buttons, inputs, textareas, tabs, badges, and notifications
- Account and guest-state patterns from [`settings.vue`](../pages/settings.vue)
- Filtering and grouped result patterns from [`current-affairs.vue`](../pages/current-affairs.vue)

### New pieces needed

Recommended new components and composables:

- `components/SectionAnnotationButton.vue`
- `components/SectionAnnotationSlideover.vue`
- `components/PersonalNoteEditor.vue`
- `components/ImprovementRequestForm.vue`
- `composables/useSectionAnnotation.ts`
- `composables/usePersonalNotes.ts`
- `composables/useImprovementQueue.ts`
- `pages/my-notes.vue`
- Optional later: `pages/my-improvements.vue`
- Shared types in `types/annotations.ts`

The existing `useAiAssistant()` request bus is a useful model for `useSectionAnnotation()`. It can open one contextual drawer from multiple section buttons.

## 3. Proposed database structure

### Personal notes table

Suggested table: `public.user_personal_notes`

| Column | Purpose |
|---|---|
| `id UUID PRIMARY KEY` | Stable client-generated note ID |
| `user_id UUID NOT NULL` | Owner referencing `auth.users` |
| `context_note_id TEXT NOT NULL` | Example: `NOTE-GEO-DRAINAGE` |
| `context_route TEXT NOT NULL` | Original note route |
| `section_key TEXT NOT NULL` | Stable key such as `deep-dive:ganga-system` |
| `section_title TEXT NOT NULL` | Display snapshot |
| `section_number TEXT` | Optional top-level section number |
| `body_markdown TEXT NOT NULL` | Lightweight formatted note content |
| `is_important BOOLEAN DEFAULT FALSE` | Revision priority flag |
| `is_doubt BOOLEAN DEFAULT FALSE` | Doubt filter flag |
| `client_created_at TIMESTAMPTZ NOT NULL` | Local creation time |
| `client_updated_at TIMESTAMPTZ NOT NULL` | LWW timestamp |
| `last_event_id UUID NOT NULL` | Conflict tie-breaker |
| `deleted_at TIMESTAMPTZ` | Soft-delete tombstone |
| `updated_at TIMESTAMPTZ DEFAULT NOW()` | Server update timestamp |

Recommended indexes:

- `(user_id, context_note_id, section_key)`
- `(user_id, client_updated_at DESC)`
- Optional full-text index over section title and note body

Recommended behavior:

- RLS allows users to access only their own notes.
- Updates use timestamp plus event-ID LWW semantics, like `user_bookmarks`.
- Add `merge_user_personal_notes(JSONB)` using `auth.uid()`.
- Never accept `user_id` as an authority from the browser.

### Content improvement queue table

Suggested table: `public.content_improvement_requests`

| Column | Purpose |
|---|---|
| `id UUID PRIMARY KEY` | Idempotent request ID |
| `user_id UUID NOT NULL` | Submitting student |
| `context_note_id TEXT NOT NULL` | Related note |
| `context_route TEXT NOT NULL` | Related route |
| `section_key TEXT NOT NULL` | Exact section or subsection |
| `section_title TEXT NOT NULL` | Human-readable context |
| `request_type TEXT NOT NULL` | Replace, add, correct, clarify, layout, or other |
| `summary TEXT NOT NULL` | One-line request |
| `details TEXT NOT NULL` | Actionable explanation |
| `placement_hint TEXT` | Where and how to apply the change |
| `reference_url TEXT` | Student-supplied source |
| `reference_kind TEXT` | Image, article, document, or other |
| `preview_image_url TEXT` | Optional thumbnail URL |
| `priority SMALLINT DEFAULT 2` | 1 low, 2 normal, 3 high |
| `status TEXT DEFAULT 'pending'` | Workflow status |
| `resolution_notes TEXT` | What the processor did |
| `processor_ref TEXT` | Commit, PR, or agent reference |
| `processed_at TIMESTAMPTZ` | Completion timestamp |
| `archived_at TIMESTAMPTZ` | Historical archive timestamp |
| `client_created_at TIMESTAMPTZ NOT NULL` | Local creation time |
| `created_at TIMESTAMPTZ DEFAULT NOW()` | Server creation time |
| `updated_at TIMESTAMPTZ DEFAULT NOW()` | Server update time |

Improvement requests should be primarily append-only. The student submits a request once; the processing agent owns status and resolution fields.

Recommended policies:

- Students can insert and read their own requests.
- Students should not be able to mark requests as `done`.
- A secure server-side processor or service-role workflow updates status.
- Processed requests remain archived rather than deleted.

Use an idempotent insert RPC such as `insert_content_improvement_requests(JSONB)`, using the request ID to prevent duplicates after retries.

## 4. Composables and synchronization

Use two public composables.

### `usePersonalNotes()`

Responsible for loading notes, loading notes for a section, creating, updating, deleting, filtering, searching, and cloud synchronization.

### `useImprovementQueue()`

Responsible for creating improvement requests, loading the student’s submitted requests, filtering by status and priority, showing preview metadata, refreshing processing status, and archiving or cancelling pending requests if desired.

Do not combine these into one large `useAnnotations()` composable. Personal notes are editable private documents. Improvement requests are workflow records with different permissions and lifecycle rules.

### Extend `useOfflineSync`

The existing bookmark mutation is not suitable for notes. It only represents a boolean state for one content ID.

Add separate mutation types such as:

- `personal_note`
- `improvement_request`

The adapter should call:

- `merge_user_personal_notes`
- `insert_content_improvement_requests`

Personal-note mutations should carry a complete note snapshot and use LWW conflict resolution. Improvement-request mutations should carry a new request and use idempotent insert behavior.

Important privacy issue: the current offline queue is not partitioned by user. It retains anonymous mutations until a user signs in. For private notes, choose one of these policies:

1. Require sign-in before permanent note saving.
2. Allow guest notes locally but require explicit migration after sign-in.
3. Partition the local mutation queue by account identity.

Option 2 is the best balance. Never silently transfer guest personal notes to another account.

Because autosave can create many mutations, coalesce unsynced personal-note snapshots by note ID or enqueue only after a pause or blur. Otherwise, every typing pause becomes a durable mutation.

## 5. Pencil icon integration

Do not alter section numbering or add pencils to the TOC.

For top-level headers, preserve the current structure:

```html
<header class="sec-head">
  <span class="sec-num">01</span>

  <div class="flex min-w-0 items-baseline gap-2">
    <h2 class="sec-title">The Map</h2>
    <SectionAnnotationButton
      note-id="NOTE-GEO-DRAINAGE"
      section-key="map"
      section-title="The Map"
    />
  </div>

  <span class="sec-rule" />
  <span class="sec-meta hidden sm:block">dual-code · spatial</span>
</header>
```

Use a Nuxt UI `UButton` with:

- `i-heroicons-pencil-square`
- `variant="ghost"`
- `color="gray"`
- `size="xs"`
- Accessible `aria-label`
- Tooltip or `title`
- Accent hover state only

For Ganga, add the same control beside the existing `h4`. Give it a stable key such as `deep-dive:ganga-system`. Keep the existing map button separate.

The section context should be structured data, not inferred only from visible text:

```ts
{
  noteId: 'NOTE-GEO-DRAINAGE',
  route: '/notes/geography/drainage-system-of-india',
  sectionKey: 'deep-dive:ganga-system',
  sectionTitle: 'Ganga System',
  noteTitle: 'Drainage System of India'
}
```

A shared `useSectionAnnotation()` request bus can open one global `SectionAnnotationSlideover`. This avoids rendering a separate drawer for every section. The existing floating AI button should remain unchanged.

## 6. My Notes page

Create `/my-notes` and add it to the `Overview` links in `layouts/default.vue`, alongside Dashboard and Review Queue.

Follow the compact header and card style of `settings.vue`, but use a wider content area because grouped notes need space.

Recommended layout:

- Breadcrumb
- `My Notes` heading
- Short explanation
- Summary chips for total notes, important notes, doubts, and topics covered
- Search input
- Filter buttons
- Sort control
- Topic groups
- Section groups inside each topic

Each note card should show:

- Topic title
- Section title
- Short excerpt
- Important or doubt labels
- Updated timestamp
- `Open section` action
- Optional `Edit` action

Example:

```text
Drainage System of India
  Deep Dive
    Ganga System
      Important · Updated 21 Aug
      “Remember Devprayag joins Bhagirathi and Alaknanda...”
      Open section
```

Opening a note should navigate to the original route with a focus query such as:

```text
/notes/geography/drainage-system-of-india?focusSection=deep-dive:ganga-system&note=<id>
```

The note page can then scroll to the stable section anchor, briefly highlight the section, and open the contextual drawer.

### Command palette

The command palette is defined in `layouts/default.vue`. Add a static `My Notes` page command and a client-hydrated `My Notes` search group containing note excerpts and section names.

Do not put private note content into the static SSR command list. Load the user-specific search index after authentication. Selecting a result should navigate to the original section, not merely open `/my-notes`.

A small `My Suggestions` view can later be added as a tab or secondary page so students can see whether their requests are pending or completed. The maintainer queue itself should not be exposed globally.

## 7. Processing by a later AI coding agent

The in-app `AiAssistantDrawer` is a study assistant. It treats existing cards as protected and cannot add unverified FSRS cards. It should not be repurposed as a website editing agent.

Use a separate maintainer workflow:

1. The agent requests pending improvement items through a protected server endpoint or CLI export.
2. Items are sorted by priority and age.
3. The agent claims one item by changing it to `in_progress`.
4. The returned record includes the note route, stable section key, section title, student description, placement instruction, reference URL, thumbnail, and priority.
5. The agent inspects the current repository code before editing.
6. For images, it follows the repository’s strict sourcing and visual inspection rules, stages selected assets under `assets-to-upload/`, and does not commit `public/images/`.
7. The agent runs relevant checks, including `npm run prebuild`, and verifies the page in the browser.
8. On success, it records `status = done`, a resolution summary, commit SHA or PR reference, and processing timestamp.
9. If the request is invalid or unsupported, it records `status = skipped` and explains why.
10. Processed records remain archived for traceability.

The secure processing endpoint must never trust a browser-supplied user ID. For an aggregated maintainer queue, use a server-side service-role client or tightly protected admin route. The existing server helper already distinguishes user-scoped access from service-role access.

## Final recommendation

Build two separate data models, two public composables, shared section context, and one reusable slideover opened by contextual pencil buttons.

The feature becomes meaningfully better than an external notebook when every note remains visibly attached to the exact page section where it was written, can be reopened from revision search, and can be filtered by important or doubt status.
