# Image pipeline and visual checks

Read when adding, replacing or validating images/maps, or changing the media pipeline. These rules are delegated by AGENTS.md.

### Strict Image Rules:
1. **Never commit local preview images**: `public/images/` is in `.gitignore`. Never place image files there and commit them.
2. **Staging Folder**: All images for Cloudinary must be placed in `assets-to-upload/<subject>/filename.webp`.
3. **Local Dev Preview**: Use a temporary copy in `public/images/<subject>/filename.webp` for local dev.
4. **Code References First**: Write `src="/images/<subject>/filename.webp"` before the image exists.
5. **Atomic Commit & Push**: Commit code and `assets-to-upload/` together in one commit. GitHub Actions converts images to WebP, uploads to Cloudinary, rewrites file paths, and commits back. Always run `git pull` after Actions run.

### Image Sourcing Workflow & 4-Point Visual Gate:
1. **Search Online First**: Search Wikimedia Commons, Wikipedia API, OpenStreetMap, NCERT, Survey of India, or government portals for authentic maps, topographic diagrams, satellite imagery, and authentic infographics.
2. **4-Point Visual Exam-Utility Gate**: Every image candidate must pass:
   - *Criterion 1 (Label Legibility)*: Key text and markers must be readable on mobile and desktop.
   - *Criterion 2 (PYQ Alignment)*: Must explicitly illustrate concepts tested in official PYQs (e.g. range order, pass connectors, river-dam alignments). Scenic photos are secondary only.
   - *Criterion 3 (Spatial Clarity)*: Boundaries, elevations, and directions must be unmistakably clear.
   - *Criterion 4 (Zero Clutter)*: No watermarks, microscopic fonts, or pixelated low-resolution artifacts.
3. **Primary Anchor vs Secondary Cues**: The top of Section 01 MUST be anchored by a comprehensive labeled spatial locator map or thematic diagram. Scenic photos serve as supporting visual cues only.
4. **Image Placement Flexibility**: Visuals, maps, and diagrams can be placed anywhere on a note page where relevant (top anchor, deep-dive subsections, data tables, or next to key facts). There are no rigid placement restrictions.
5. **As Many Images as Useful (No Cap)**: No arbitrary cap per topic or section. If a visual clarifies exam content, add it. Never reduce images to "keep the page clean".
6. **Candidate Image Cleanup Rule (Zero Leftovers)**: Only selected winning candidate(s) that pass the gate are kept. ALL discarded candidate files in `assets-to-upload/` and `public/images/` must be deleted before finalizing. Never push unreferenced image files.
