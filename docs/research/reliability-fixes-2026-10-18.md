# Repository reliability fixes, 18 October 2026

Scope: repair existing workflows. No topics, historical question wording,
options, answer keys, stable IDs or saved review schedules were changed.

## Notes and synchronization

- Note and feedback validation share the database's 10,000 and 4,000 Unicode
  character limits. Oversized drafts remain editable; they are not truncated.
- Legacy invalid events and permanent PostgreSQL data errors are retained on
  device with a rejection reason. Valid events continue. Network and session
  failures retain their existing backoff behavior.
- An accepted explicit edit/delete supersedes rejected older versions of that
  note, for the same account only. Private guest notes are never auto-imported.
- Recovered primary storage retires stale fallback copies only after a durable
  write, so rejected events remain quarantined rather than looping in replay.
- Valid pending note edits save when changing drawer tabs or closing the drawer.
  Cleanup checks the originating account and deletion state before saving.
- Feedback requires sign-in and reports that it is queued, without claiming
  that a local write reached the review team. Existing guest events remain local.

## Archive integrity and provenance

The full 3,129-record master is inspected during prebuild. Seventeen extracted
records have incomplete, duplicated or incorrectly grouped choices. Their exact
historical fields and source occurrences are fingerprinted in
`data/pyq_review_issues.json`. Unknown defects and changed exceptions fail the
integrity gate. Known incomplete records stay visible with a warning and cannot
be graded or reveal an unsupported answer. This is a structural check, not an
independent factual verification of the other answer keys.

The extracted SI 2018 questions 189-191 have no choices in either
`extracted_question_paper_json/SI_2018_Mains_Paper1.json` or
`extracted_question_paper_json/SI_2018_Mains_Paper3.json`. Questions 184-188 have
statement text where the answer choices should be. The other exceptions include
duplicated choices and the eight-entry extraction for PYQ-1551. Restore only
after inspecting the original paper's common instructions/options and final key;
do not infer choices or keys from the generated explanations.

Exam and year filters now match the same source occurrence. The returned label
uses that occurrence. For example, SI + 2015 returns zero records rather than
four records assembled from unrelated Constable/SI occurrences.

## Diagram publication remains pending

All 79 image-marked questions have an original source crop recorded in
`data/pyq_media.json`. The UI renders published Cloudinary images and disables
practice while a required diagram is absent, loading or has failed to load.
It supports retrying a failed diagram without exposing its answer.

The original PNG crops remain in `extracted_question_paper_json/images/`.
Cloudinary credentials are absent in this development environment, so no images
were uploaded and no public CDN URLs were invented. After visual/source review,
stage one existing crop with:

```sh
node --import tsx scripts/stage-pyq-image.ts PYQ-0080 --dry-run
node --import tsx scripts/stage-pyq-image.ts PYQ-0080
```

This uses ffmpeg to produce `assets-to-upload/pyqs/PYQ-0080.webp`. Follow
`docs/image-pipeline.md` for source/rights checks, review, publication and pulling
the bot's rewritten URLs. The existing upload workflow now rewrites the media
manifest too. Keep the missing-diagram notice until publication succeeds.

## Regression coverage

- `npm test`: production archive/validation functions and the actual sync engine
  plus Supabase adapter, including permanent errors, legacy oversized events,
  accepted corrections, fallback recovery and account ownership.
- `npm run test:browser`: the existing application suite plus phone and desktop
  checks for archive quarantine/filters, diagram loading/failure, note limits,
  saved notes, pending edit dismissal, deletion safety, guest feedback gating
  and account-owned queued feedback.
- `tests/sql/sync.sql`: the actual personal-note/feedback schema and RPCs,
  repeatable schema installation, Unicode limits, rejected writes, stale updates,
  tombstones, duplicate feedback, authentication and cross-account reads. Run
  only against an empty isolated test database.

## Validation results

Validated with Node 22.23.3 on 18 October 2026:

- Prebuild, type checking, integrity verification, npm tests and diff checks passed.
- Node and Cloudflare Pages production builds passed.
- The existing application browser suite and the added 390px/1440px regression
  checks passed on both Node and the local Cloudflare runtime. Diagram network
  responses in the added tests are explicit fixtures, not published exam assets.
- The expanded SQL fixture passed against an isolated PostgreSQL 16 container;
  the container and its fixture volume were removed afterward.
- The staging helper's dry run resolved the existing PYQ-0080 crop successfully.
- The topic registry, canonical question master and generated learning bundles
  are unchanged. Live Supabase and Cloudinary publication were not exercised.
