# Audit remediation: 2 October 2026 audit

Implementation and verification continued on 3 October 2026. Baseline: `main` at `f66da229351b1e0818afc21c4043c35baab03854`.

The user authorized all 26 audit findings, removed the in-app AI assistant by product decision, and retained Direct mode as an explicit self-study option. Changes are in the working tree. No commit, push, deployment, live database migration, Cloudinary upload or live Gemini extraction was performed.

## Scope and interpretation

The audit identified concrete ownership, review, content-delivery and verification defects. Its recommendations were implemented around the existing Nuxt, Supabase, Cloudinary and FSRS architecture. Explicit server imports remain because they make edge bundles predictable. Registry-derived display cards and generated canonical data remove repeated edits without introducing a second application framework or a plugin registry.

Local implementation does not prove production correctness. Database changes below are release prerequisites. Browser account-transition tests exercise the real composables with controlled client identities and delayed REST responses; they do not authenticate real Supabase users or establish the live project's RLS configuration.

## Finding-by-finding changes

| Finding | Delivered change and repository evidence | Verification and remaining boundary |
|---|---|---|
| AUDIT-001 | `composables/useOfflineSync.ts`: mutation ownership is captured at creation; transport pins the originating session token; batches exclude other owners and quarantine ownerless legacy records. | Real queue and session-pinning fixtures in `scripts/test-audit-regressions.ts`. Live two-account/offline smoke test remains a release check. |
| AUDIT-002 | `server/utils/fsrs.ts`: fresh cards serialize a nullable last review; `server/api/gate/submit.post.ts` checks lookup failures and seeds canonical membership with duplicate-safe upserts. | Fresh-card serialization fixture. Authenticated gate/database round trip remains a release check. |
| AUDIT-003 | `composables/useReviewState.ts`: one shared account-scoped catalog, snapshots, immutable seeds and idempotent review events drive Daily Review, homepage/layout counts and CA reviews. Cloud histories are paginated and replayed deterministically. Legacy snapshots missing eligibility metadata keep their schedules and receive current catalog metadata. Explicit guest learning import covers reviews and gate-only progress, preserves existing account history and excludes private notes. | Real grading/reload and legacy-metadata browser fixture; replay, duplicate, metadata and pagination fixtures; SQL event/RLS fixture. Real second-device reconciliation remains unverified. |
| AUDIT-004 | `server/database/review_identity_migration.sql` and `offline_sync_schema.sql`: text content IDs replace UUID-only card identities while preserving existing UUID values and rows. | PostgreSQL fixture executes migration plus mixed CA/PYQ IDs and duplicate events. Live migration pending. |
| AUDIT-005 | `server/utils/gate-validation.ts`: server resolves canonical gate, checks the submitted answers and computes score/threshold. Client scores, thresholds and card lists are not authoritative. `AGENTS.md` records the Direct-mode exception. | Forged thresholds/scores, unknown notes and invalid answers are rejected in regression fixtures. Local self-study state is user-editable and is not an authorization boundary. |
| AUDIT-006 | Six chapters under `content/data/study/geography/` and `telangana/` complete all eight live Note/Study pairs. `NoteStudySwitch.vue`, canonical Study topbar and registry-derived hub cards connect them. Paragraphs/cards use selected canonical explanations; Study source lines resolve to their section's PYQs. | Integrity checks and mobile browser route/link checks. Pedagogical content still needs normal subject-matter review before exam publication. |
| AUDIT-007 | `scripts/verify-topic-integrity.ts`: parses Vue templates and TOCs, validates raw asset identity, executes shared registries, checks complete Study sections/source lines, both switches, both hub modalities, CA contract and route configuration. Its output names its scope. | Negative fixtures cover comments, dynamic unrelated IDs, absent switches/TOCs/hub cards, empty Study PYQs, missing source lines and fake configuration text. Runtime and factual checks remain separate. |
| AUDIT-008 | Both CA writers use `scripts/pib_ca_pipeline/card_contract.py`; category defaults are copied, NOTE IDs are closed, and `sync_ca_topics.py` reconciles source/curated/derived tags. Existing unknown assignments were normalized or dropped. | All active frontmatter validates; writer-default isolation and keyword reconciliation fixtures. Legacy source tags are a retained baseline, not newly proven human curation. |
| AUDIT-009 | Both writers validate locally before disk writes and reject fabricated fallback answer indices or more than two MCQs. 78 legacy third questions were moved into companion cards preserving review aliases and provenance. `utils/ca-review-id.ts` is shared by new attempts and metadata lookup so both reuse the complete original review ID. | Invalid index/category/depth/tag/MCQ-size fixtures, all 78 companion identity checks and YAML round trips. Schema validity does not establish that every answer agrees with its official release. |
| AUDIT-010 | `workers/scrapy-pib/pib_scraper.py`: archive failures are retryable failures, not successful empty days; source publication dates are preserved independently of retrieval time. New writers label event dates as publication proxies. | Empty-archive failure and writer date/provenance fixtures. Previously generated dates were not bulk corrected without source evidence. |
| AUDIT-011 | `ingestion_state.py`, scorer/extractor and both PIB workflows: terminal/retryable PRID ledger, archived-release resume, collision-resistant PRID-based new IDs, manifest freshness checks, relative-date scoring, cursor-based outage recovery and rolling month planning. Raw master CSV is exported from the deduplicated SQLite master. | Rollover, final-partial-month termination, relative recency, duplicate master rows, malformed chunk schema, terminal resume, exhausted model and archive failure fixtures. Live PIB WAF, credentials and model availability remain operational checks. |
| AUDIT-012 | `server/api/pyqs.get.ts`: canonical master is explicitly bundled into the dynamic edge API. Study API resolves only its generated static bundle. | Node/Cloudflare build and runtime archive total/filter checks. No checkout filesystem is required by these APIs. |
| AUDIT-013 | `pages/index.vue`, `layouts/default.vue`, `pages/review.vue` use the same reactive eligible due queue. Clock updates allow due counts to advance without route changes. | Browser hydration/grading and shared-store transition fixture. Content retirement excludes inactive catalog cards while retaining saved history. |
| AUDIT-014 | `composables/usePersonalNotes.ts`: captures account/key/generation, drops stale responses, merges current local edits after awaiting cloud results and recovers pending durable note payloads. | Real Study Notes panel fixture delays A's REST response until B has hydrated, verifies B stays clean and guest private notes return independently. |
| AUDIT-015 | `utils/review-state.ts`, `useReviewState.ts` and CA review-content API preserve/recover event date, source identity, retention, expiry and display metadata. Missing historical sources retain history and surface an error. | Metadata round-trip and expired-CA queue fixtures. Unresolvable historical source dates are excluded from active review rather than assumed maximally relevant. |
| AUDIT-016 | `useTopicVisits.ts`, `useStudySession.ts`, `useFlashcardUnlock.ts`, CA state and personal-note features scope state to guest/account and guard overlapping hydration. Direct mode remains account-specific. | Browser A/B/guest transition and ownership fixtures. Ownerless historical private records remain quarantined. |
| AUDIT-017 | Shared offline engine/status, IndexedDB transaction-completion acknowledgment, merged fallback recovery, retained failed pending writes, cross-tab flush serialization and deletion of acknowledged mutations. Personal Notes drawer shows real errors/pending/quarantined status. | Aborted transaction, unavailable/recovered storage, acknowledgment retention and owner/session tests. Browser storage quota failure cannot promise durable persistence; failures are surfaced. |
| AUDIT-018 | `utils/media-references.ts` and `scripts/auto-upload.ts`: exact subject-relative local paths, escaped literals, untouched remote URLs, idempotent rewrites and nonzero partial-upload failures. | Same basename in two subjects, already-remote URL and repeated rewrite fixtures. No live upload was made. |
| AUDIT-019 | `topics_master.json`, `generate-learning-data.ts`, generated subject/topic statistics and delivery helpers provide canonical selected PYQs, paths, state and hub/navigation metadata. Homepage suggested-note count is derived. Core exam displays use `TSLPRB_EXAM_RULES`. | Canonical count/sort assertions, parsed routes, hub/browser checks. Selected delivered PYQ counts are labeled as linked coverage; they do not predict future marks. |
| AUDIT-020 | `scripts/verify-topics.ts` delegates to actual integrity validation. `scripts/tier.ts` reports canonical topic counts without manufacturing verified identifiers or editing content. | Canonical statistics fixtures and read-only CLI checks. Legacy extracted teaching resources remain available. |
| AUDIT-021 | `utils/note-pyqs.ts` resolves official text/options/answers/explanations by UID; 20 existing distinct explanations are explicitly marked as teaching commentary. An old official explanation is never automatically promoted into commentary after a master correction. Prebuild generates live/Study bundles from the canonical master and checks equality. Runtime AI grounding was removed with the assistant. | Canonical bundle equality, explicit-commentary/stale-copy fixtures and unresolved UID/source-line checks. Flashcards, gates and teaching explanations remain intentional pedagogical transformations. |
| AUDIT-022 | `package.json`, `.nvmrc`, locked tooling and `.github/workflows/quality.yml`: semantic Vue/TS check, actual browser checks, PostgreSQL fixture, Node and Cloudflare builds, clean-install workflow and generated-data drift check. | Existing simulated tests are retained and explicitly described as simulated; new checks exercise the missing boundaries. Hosted CI has not run on these uncommitted changes. |
| AUDIT-023 | `utils/study-cloze.ts`: protects structural enumerators before formatting/entity and number processing, across digit counts. | Documented enumerator forms, bold enumerators, strong entities and hot-span fixtures. |
| AUDIT-024 | Removed uncalled `useMedia.ts`, R2 public config and unused S3 dependency; repaired malformed media metadata. Cloudinary staging and local previews remain. | Repository reference audit and rewrite fixtures. No external R2 bucket or deployed resource was deleted. |
| AUDIT-025 | `AGENTS.md`, authoring/pipeline/AI docs and read-only text checks describe current registries, `user_topic_states`, delivery exceptions and AI removal. Missing build-prompt reference is replaced by the actual authoring specification. Existing CSS theme is explicitly preserved. | Constitution references/commands, all relevant text character check and 16,000-byte size check. Root constitution is 15,917 bytes. |
| AUDIT-026 | `utils/note-id.ts` normalizes aliases once for client/server consumers; shared learning assets contain canonical keys only. | Historical alias and canonical gate/deck equality fixtures. Cloud legacy identity mapping retains stored review history. |

## Delivered inventory

- 23 canonical NOTE topics, with planned topics represented explicitly.
- 8 live notes, all paired with Study Mode, in 3 subject hubs.
- 9 Study chapters, including the existing Parliament Study-only pilot (`hasNote: false`).
- 9 registered gate/deck pairs.
- 136 distinct canonical PYQs in each generated live and Study bundle, selected from the unchanged 3,129-record canonical master.
- 1,433 active CA cards after preserving 78 legacy third questions as companion cards. Most CA file changes are tag/schema corrections; official source links and existing learning identity are retained.

| NOTE ID | Subject | Paired note and Study slug | Linked PYQs |
|---|---|---|---:|
| NOTE-POL-HIST-ACTS | Polity | historical-background-1773-1947 | 12 |
| NOTE-POL-MAKING-CONST | Polity | making-of-the-constitution | 9 |
| NOTE-GEO-DRAINAGE | Geography | drainage-system-of-india | 31 |
| NOTE-GEO-DAMS | Geography | dams-in-india | 10 |
| NOTE-GEO-MOUNTAINS | Geography | mountains-in-india | 10 |
| NOTE-GEO-FORESTS | Geography | forests-in-india | 10 |
| NOTE-GEO-IRRIGATION | Geography | irrigation-in-india | 10 |
| NOTE-TEL-MOVEMENT | Telangana | telangana-statehood-movement | 42 |

Per-topic PYQ selections can overlap. These counts are delivered coverage, not a claim that topic taxonomy and note boundaries are identical.

## Verification record

Repository checks use Node 22.23.3, installed temporarily outside the repository. `.nvmrc` selects Node 22 and package engines require at least 22.12. The host's Node 26 was not used for final validation. A real clean `npm ci` completed successfully with the lockfile, followed by rebuilding the permitted local workerd binary.

| Check | Result and scope |
|---|---|
| Clean `npm ci` | PASS, exit 0, locked dependencies installed under Node 22. |
| `npm test` | Final post-edit run PASS, exit 0: integrity, 54 existing simulated personal-note checks, offline sync, exam strategy and audit regressions. |
| `npm run typecheck` | Final post-edit run PASS, exit 0, semantic Vue/TypeScript check. |
| `npm run test:ca` | PASS, exit 0, 10 tests: both writers, schema, dates, retries, archive resume, keyword reconciliation and workflow/scorer rollover. |
| `verify_ca_cards.py` | PASS, exit 0, all 1,433 active cards. |
| PostgreSQL fixture | PASS, exit 0 using local PGlite PostgreSQL execution. CI uses PostgreSQL 16 and `tests/sql/sync.sql`. |
| Node build and browser | Final run PASS, exit 0 for both: all eight pairs, core page hydration, archive total/subject/year/exam/search/pagination, all 78 legacy CA identities, real grading/reload, legacy metadata backfill and delayed account response isolation. |
| Cloudflare build and browser | Final run PASS, exit 0 for both, using a fresh local workerd preview and the same runtime/browser assertions. Nitro reports 10.8 MB aggregate output, 2.53 MB gzip, including its listed chunks/maps. These are build statistics, not measured production startup or CPU time. |
| Text/size/diff checks | PASS: read-only U+2014 check across 4,933 text files, 15,917-byte constitution and `git diff --check`. |

The original default-heap Node build ran out of memory; the build passes with a 4 GB Node heap, now also configured in CI. An expanded browser run detected an old local preview worker serving obsolete asset hashes after a rebuild. Preview processes must be started from the completed build. The Cloudflare prerender public directory is explicitly selected per preset so an earlier Node build cannot shadow Cloudflare HTML. Tests assert actual hydration and report module-loading failures. A new rollover fixture exposed an unbounded final-partial-month loop in the updated workflow; that loop was fixed and the fixture now has a termination guard. A browser navigation timeout during resource contention was rerun after this correction and passed.

PASS does not cover a live database schema, authenticated second-device behavior, factual truth of every CA answer, live extraction/model availability, hosted upload Actions, or actual production Cloudflare deployment.

## Database and release sequence

These files are prepared, tested locally and not applied to Supabase. Inspect/backup the live schema and row counts before a migration, particularly existing review-seed foreign keys and identity columns. Do not run `tests/sql/sync.sql` against a live project; it creates an isolated fixture schema and roles.

1. For an existing UUID-based offline-sync installation, apply `server/database/review_identity_migration.sql` before refreshing `server/database/offline_sync_schema.sql`. The migration preserves UUID values as text and recreates the known seed foreign key. For a fresh project, apply the base app schema and updated offline-sync schema first; the identity migration is also safe on the already-text columns.
2. Apply `server/database/ca_attempts_schema.sql`. It creates owner-scoped attempt persistence and per-question reconciliation RPCs. Confirm authenticated RPC grants and live table RLS.
3. Compare row counts and inspect representative static/PYQ/CA seeds, logs and metadata. Retry duplicate mixed-content events and verify only one log remains per event. Verify A cannot read/write B's rows with actual account tokens.
4. In a preview deployment, pass a canonical gate, grade, reload, sign out/in, sign in on a second device, grade offline on both devices and reconcile. Check no private guest notes are imported; guest learning import remains an explicit user action.
5. Build and deploy the verified Cloudflare artifact with current environment configuration. Confirm dynamic archive filters, Study source jumps, homepage/review count agreement, account-specific sync status and current-affairs source/date display.
6. Run a controlled live PIB/Gemini extraction and Cloudinary upload with actual configured credentials; verify successful model/date provenance and artifact publication. Fixture checks do not establish provider availability.

On missing migration/RPC/network access, clients preserve local learning and show synchronization failure. Local snapshots and durable queued events remain separate from successful cloud acknowledgment. A staged database rollout is therefore required before declaring production remediation complete.

## Preserved decisions and known limits

Nuxt 3, existing Nuxt UI/CSS presentation, Cloudflare Pages, Cloudinary, Supabase ownership, ts-fsrs scheduling, verified PYQ source of truth, closed CA NOTE IDs and the prohibition on service workers remain. No cosmetic framework rewrite or destructive historical-data cleanup was performed.

The legacy RSS worker under `workers/current-affairs/` has no demonstrated active app integration. It is a historical candidate, not proof that an externally deployed worker no longer exists. Its external deletion was not authorized by this repository implementation.

Lockfile auditing still reports existing advisories (one moderate and eight high in the inspected result, including transitive development/build packages and the current Nuxt UI line). The native login forms now explicitly use POST to address the identified pre-hydration GET concern. This does not certify every advisory as unreachable or resolved. The suggested automatic Nuxt downgrade/major UI migration was not applied; dependency remediation needs version-specific compatibility review rather than `npm audit fix --force`.

Previously generated CA source dates/model names and tag provenance cannot be reconstructed reliably without the official releases. Those records were not silently relabeled as freshly verified. New pipeline records preserve retrieval/publication distinction and the actual extraction model; human factual review remains necessary.

## Implementation packages

All packages have repository changes; database-dependent closure requires the release sequence above.

- PACKAGE A, contract enforcement: AUDIT-007, AUDIT-022, AUDIT-023, AUDIT-026.
- PACKAGE B, account isolation and learning synchronization: AUDIT-001, AUDIT-002, AUDIT-003, AUDIT-004, AUDIT-005, AUDIT-013, AUDIT-014, AUDIT-015, AUDIT-016, AUDIT-017.
- PACKAGE C, registry/canonical consolidation: AUDIT-019, AUDIT-020, AUDIT-021.
- PACKAGE D, Study completion: AUDIT-006.
- PACKAGE E, Current Affairs reliability: AUDIT-008, AUDIT-009, AUDIT-010, AUDIT-011.
- PACKAGE F, edge archive: AUDIT-012.
- PACKAGE G, media cleanup: AUDIT-018, AUDIT-024.
- PACKAGE H, AI removal and documentation: AUDIT-021 grounding scope, AUDIT-025.

## Daily scraper operational check, 2026-10-03

GitHub run 36978262352 on 2026-10-02 was marked successful but saved zero cards: Gemini requests returned 401 UNAUTHENTICATED and the previous extractor treated failed extraction as irrelevant content. Daily runs use schedule or workflow_dispatch, not push. Code changes alone do not run the daily scraper.

The workflow referenced a nonexistent GCP_SA_KEY secret while the repository has GOOGLE_APPLICATION_CREDENTIALS_JSON. The reference now matches the configured secret, and explicit service-account credentials take priority over the API key. A regression test verifies both choices. All 11 Python pipeline tests pass locally. Provider failures remain retryable and cause a nonzero exit; live credential/model availability must be verified by a dispatched run after push.
