# AGENTS.md - TSLPRB StudyOS

Read this file before work. It contains repository-wide rules; load detailed guidance only when the task requires it. Work one topic at a time unless explicitly requested otherwise. Inspect existing implementation before changing it.

## Read the relevant guide

Paths below are relative to the repository root. Follow the applicable guide, not the entire document set.

| Task | Required guide |
|---|---|
| Create a topic; change factual claims, explanations, answers or recall prompts | `docs/topic-source-review-workflow.md` |
| Create/register a topic; change Note/Study structure, gates, decks or delivery contracts | `docs/topic-authoring-spec.md` |
| Add, replace or validate images/maps; change media uploads | `docs/image-pipeline.md` |
| Change current-affairs ingestion, schema, tagging or visit tracking | `docs/current-affairs-pipeline.md` |
| Process the content improvement queue | `docs/content-improvement-queue.md` |
| Change exam-format claims, weightage, scoring assumptions or practice policy | `docs/research/exam-evidence-policy-2026-10-15.md` and its cited evidence |
| Design subject-specific learning scaffolds | Relevant subject section in `docs/tslprb-pyq-processing-engine-research-report.md` |

Typo/formatting edits that preserve meaning do not require a full research audit. Layout-only changes need relevant UI checks, not unrelated factual research. Scope evidence and testing to the change; retain required CI gates.

## Architecture and product constraints

- Use Nuxt 3, Nuxt Content and Nuxt UI with the existing theme. Do not substitute frameworks or add a second design-token system.
- Cloudflare Pages hosts the app; Cloudinary stores media. Supabase stores auth and learning/user state, never media.
- Use `ts-fsrs`; do not implement a replacement scheduling algorithm.
- No PWA, service workers or custom offline caching. Do not restore in-app AI without explicit authorization.
- Use GSAP only for topics meeting the visual criteria; otherwise use Nuxt UI defaults/CSS. No Framer Motion.
- Subject links in `layouts/default.vue` and `pages/index.vue` must lead to subject hubs (`/notes/<subject>`).
- Keep due reviews the dominant homepage hero. Rank subjects by actual PYQ weightage, not alphabetical order.
- Keep both Note and Study modes for full topics, including their bidirectional navigation and required delivery assets. Respect registry exceptions described in the authoring spec.
- Passing the comprehension gate (at least 3/5) unlocks the topic's cards/PYQs. Gate MCQs do not enter FSRS. Direct mode is an explicit exception, never evidence of a gate pass.
- Never commit media under `public/images/`; use the image pipeline's staging/upload process.

## Evidence and content authority

- `data/topics_master.json` owns topic IDs, delivery metadata and PYQ selectors. `data/pyq_enriched_master.json` owns canonical question records. Generate derived bundles; do not patch generated data as a substitute for correcting its source.
- Canonical records are not independent verification of answer keys. Use primary sources for changed factual claims, preserve historical context and visibly flag unresolved evidence.
- Preserve historical wording/options. Correct a historical key only with documented evidence and retained identity/history.
- Derive counts and weightage from actual records. Do not invent forecast marks, question counts, complete coverage or shared paper-setter claims.
- Keep direct factual practice primary. Label synthetic hardening questions as "TGPSC-Style Advanced Practice"; do not present them as official PYQs.
- Never add an "always guess" feature. Verify official exam rules before changing scoring assumptions.

## State and review safeguards

- Bind durable mutations to their originating account and captured session. Quarantine ownerless legacy records.
- Guest learning import requires explicit user action; never import private notes automatically.
- Preserve stable content IDs, immutable seeds, idempotent review events, scheduling metadata and retired content history. Refresh wording without resetting progress.
- Hydrate all cloud pages; do not silently truncate review history.

## Verification and delivery

For application or study-content changes, run:

```sh
npm run prebuild
npm run typecheck
npm run verify:integrity
npm test
```

For current-affairs pipeline changes, also use the relevant validation and `npm run test:ca` described in its guide. For changed UI/interactions, verify relevant phone and desktop behavior. For state changes, verify account/session ownership and saved-progress retention. Static checks do not establish factual accuracy or visual quality.

For documentation-only edits, check links/paths, `git diff --check`, and:

```sh
node --import tsx scripts/verify-constitution-size.ts
node --import tsx scripts/ban-em-dash.ts
```

- No U+2014 em-dashes in repository text; use hyphens or colons. Preserve the existing automated check.
- Keep this file below the repository's 16,000-byte cap. This is a project policy, not an OpenAI-wide limit.
- Explain intended changes and reasons before editing; report verification results and material limits before handoff. Never silently skip a failed required gate or claim unperformed checks passed.
- Use reviewable changes and provide an available preview link for page updates. Merge/deploy when authorized; distinguish merge success from deployment success. After media Actions run, pull back generated Cloudinary rewrites as described in the image guide.
