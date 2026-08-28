# Project: TSLPRB StudyOS 7-Topic Remediation

## Architecture
- Nuxt 3 + Nuxt UI (`@nuxt/ui`) + Nuxt Content
- Strict 4-Stage Closing Block on every topic note: `#pyqs` -> `#advanced-practice` -> `#gate` -> `#current-affairs`
- Sticky Right-Sidebar TOC (`<aside class="hidden w-52 shrink-0 xl:block">`)
- Images in `assets-to-upload/<subject>/` and preview in `public/images/<subject>/`
- Single source of truth for PYQ: `data/pyq_enriched_master.json`

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Fix Broken Cloudinary URLs | Strip duplicated prefixes in `irrigation-in-india.vue` | M1 | audit-report |
| 2 | Eliminate Fabricated PYQ | Replace `PYQ-DAM-10` in `dams-in-india.vue` with verified PYQ from master JSON | M1 | audit-report |
| 3 | Remove Watermarked Map | Replace `india-biosphere-reserves-map.png` in `forests-in-india.vue` with clean 18-reserve map | M1 | audit-report |
| 4 | Normalize CA Frontmatter | Strip escaped backslashes from `related_topic_ids` in all 827 CA markdown files | M1 | audit-report |
| 5 | Polity Structural Alignment | Implement #pyqs (26), #advanced-practice (5), 4-stage closing, sticky TOC in `union-executive-and-legislature.vue` | M2 | audit-report |
| 6 | Telangana Movement Structural Alignment | Implement #pyqs (42), #advanced-practice (5), 4-stage closing, sticky TOC in `telangana-statehood-movement.vue`, shuffle gate keys | M2 | audit-report |
| 7 | Indira Gandhi Canal Schematic | Replace ditch photo with high-resolution annotated alignment schematic | M3 | audit-report |
| 8 | Drainage River Basin Maps | Replace watermarked/doodle diagrams (Godavari, Krishna, Mahanadi, Cauvery, Narmada, Tapi) with cartographic maps | M3 | audit-report |
| 9 | Mountain Passes & Summits Map | Add high-contrast Mountain Passes and Eight-Thousander summit locator map in Section 01 of `mountains-in-india.vue` | M3 | audit-report |
| 10 | Zero Leftovers Cleanup | Delete unreferenced candidate images in `public/images/geography/` | M3 | audit-report |
| 11 | Canonical Master UIDs | Map synthetic IDs (`PYQ-DAM-xx`, `PYQ-IRR-xx`, `PYQ-MNT-xx`) to canonical `PYQ-xxxx` IDs from master JSON | M4 | audit-report |
| 12 | Re-align Forest PYQs | Restore official paper setting names, exam years, distractors for 10 PYQs in `forests-in-india.vue` | M4 | audit-report |
| 13 | Statistical Citations | Add data-year and >2023 caution captions to ISFR 2021, Minor Irrigation Census, ECI stats | M4 | audit-report |
| 14 | Full Prebuild & Build Verification | Run `npm run prebuild` (0 em-dashes) and `npm test` (54/54) and production build | M5 | audit-report |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Phase 1: P0 Immediate Integrity Blockers | Fix URLs, eliminate fabricated PYQ, unwatermarked biosphere map, normalize CA frontmatter | none | DONE |
| M2 | Phase 2: P1 Structural Alignment (Polity & TG Movement) | #pyqs, #advanced-practice, 4-stage closing, sticky TOC, gate answer key fix | M1 | DONE |
| M3 | Phase 3: P2 Visual Architecture Upgrades & Cleanup | Indira Gandhi canal schematic, Godavari/Mahanadi/Narmada/Tapi basin maps, mountain passes map, zero leftovers | M1 | DONE |
| M4 | Phase 4: P3 PYQ Re-grounding & Citation Integrity | Canonical UIDs, Forest PYQ alignment, statistical captions | M2, M3 | DONE |
| M5 | Phase 5: Verification & Quality Gate | Prebuild 0 em-dashes, nuxi build routes clean, challenger verification, forensic audit | M4 | DONE |

## Code Layout
- `pages/notes/geography/irrigation-in-india.vue`
- `pages/notes/geography/dams-in-india.vue`
- `pages/notes/geography/forests-in-india.vue`
- `pages/notes/geography/drainage-system-of-india.vue`
- `pages/notes/geography/mountains-in-india.vue`
- `pages/notes/polity/union-executive-and-legislature.vue`
- `pages/notes/telangana/telangana-statehood-movement.vue`
- `components/visual/MovementTimeline.vue`
- `content/current-affairs/*.md`
- `content/data/gates/*.json`
- `assets-to-upload/geography/`
- `public/images/geography/`
- `data/pyq_enriched_master.json`
