# AGENTS.md - TSLPRB StudyOS

Persistent rules for every agent working in this repo. Read this before any task. The full build spec (schema, tier template, build order) lives in `docs/build-prompt.md` - reference it, don't restate it.

## Architecture - never substitute
- Nuxt 3 + Nuxt Content. Never Astro, Next.js/Nextra.
- Nuxt UI (`@nuxt/ui`) for all components. No hand-rolled design-token system.
- Cloudflare Pages (app) + Cloudinary (media/images). Supabase for auth/review-state/FSRS data only - never media.
- FSRS via `ts-fsrs`. Never hand-roll SM-2 or Leitner.
- No PWA, no service workers, no offline caching.
- No Framer Motion, no bespoke animation elsewhere. GSAP only for topics that pass the visual rule below. Plain CSS/Nuxt UI defaults for everything else.
- Never invoke `image-to-code`, `imagegen-frontend-web`, or `imagegen-frontend-mobile` skills on this project. No reference-image-first design workflow.

## Images - strict rules, never break these

### Rule 1: Never put images in git directly
`public/images/` is in `.gitignore`. Never place image files there and commit them.
Never commit `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` files directly to the repo root or any subfolder except `assets-to-upload/`.

### Rule 2: Use assets-to-upload/ as the staging folder
All images that need to go to Cloudinary must be placed in `assets-to-upload/<subject>/filename.ext`.

Examples:
- `assets-to-upload/geography/himalayan-rivers-map.webp`
- `assets-to-upload/polity-const/parliamentary-structure.png`
- `assets-to-upload/history/timeline-1857.jpg`

### Rule 3: Write code references BEFORE the image exists
When writing a Vue component that needs an image, write the `src` as a local path placeholder:
```html
<img src="/images/geography/himalayan-rivers-map.webp" alt="..." />
```
The subject folder and filename must exactly match what you will put in `assets-to-upload/`.

### Rule 4: Push code and image together in one commit
```bash
git add pages/notes/geography/himalayan-rivers.vue     # the component with src="/images/..."
git add assets-to-upload/geography/himalayan-rivers-map.webp  # the actual image
git commit -m "add: himalayan rivers note + map"
git push
```

GitHub Actions will automatically:
1. Detect the image in `assets-to-upload/`
2. Convert it to WebP (if PNG/JPG)
3. Upload it to Cloudinary
4. Rewrite `src="/images/geography/himalayan-rivers-map.webp"` to the Cloudinary URL in all `.vue/.ts/.md` files
5. Delete the file from `assets-to-upload/`
6. Commit the rewritten URLs back to the repo

### Rule 5: Bulk uploads are fine - one push handles everything
You can push 10 images and 10 components in one commit. The workflow processes all of them in a single run. Never push images one by one.

### Rule 6: Filename must match exactly
The filename in `assets-to-upload/subject/name.ext` must match the filename used in `src="/images/subject/name.ext"` (extension can differ - PNG source becomes WebP on Cloudinary, the script handles the rename).

### Rule 7: After the Action completes, always git pull
The Action commits back rewritten URLs. Always run `git pull` after a push that included images before continuing work.

### Rule 8: local dev works without images on Cloudinary
During local development, put a temporary copy in `public/images/subject/name.webp` for preview. This folder is gitignored so it will not be committed. The actual Cloudinary upload happens on push via the Action.

## Source data - trust hierarchy, never invert it
- `Extracted_Text/` is the only ground truth. Always re-derive tier counts and question content from here, never hardcode numbers from a prior analysis.
- `Deep_Analysis.txt` is a QA cross-check only, never a data source. Its "no negative marking / guess (2) or (3)" guidance and its cutoff numbers are confirmed wrong - never build either into the app.
- `Topic_Banks/` is a draft tagging only. A question counts toward a tier or a note only after it has a `verified_topic_id`, not just its original folder tag.
- The 2026 exam has a real 20% negative-marking penalty. Never build any "always guess" feature or copy that implies free guessing.

## Content generation - never deviate
- Tier is computed per topic from its real, verified PYQ count - never assumed from the subject's general weight. Tier 1 (10+): full note. Tier 2 (3-9): compact note. Tier 3 (<3): flashcards only, no note.
- The visual rule is independent of tier: any topic - even Tier 2 - keeps a map/diagram if its facts are genuinely spatial, chronological, or hierarchical. A flat list never gets one, regardless of tier.
- A note's comprehension-gate MCQs never enter the FSRS queue directly. Passing the gate is what unlocks the note's atomic flashcards and its real PYQs into the queue.
- Prefer real, verified PYQs everywhere. Any synthetic/practice question must be explicitly labeled as such - never presented as a real PYQ.
- Current affairs are a separate content type, never edited into a note's markdown file.
- **A topic is not done until its tagged current-affairs entries visibly render on its live note page** - not just exist as a content file. Check this in the browser for every topic, the same way you would check the gate.

## Product logic - never deviate
- The due-review count is the homepage's dominant element - never one of several equal-weight stat cells.
- The subject list ranks by real PYQ weightage - never a static alphabetical list.

## Process
- This file is the standing constitution. Task prompts should point back to a section here ("per the image rules in AGENTS.md"), not restate it.
- `docs/build-prompt.md` holds the full one-time spec (schema, Tier-1 template, settings, deployment). Update it when an architecture decision actually changes - not for routine topic-by-topic work.
- No em-dashes anywhere in the codebase. Use standard hyphens only. The `predev`/`prebuild` hooks enforce this automatically.
