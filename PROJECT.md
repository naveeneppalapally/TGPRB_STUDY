# Project: Warm Notebook & Chalkboard Theme Preset Integration

## Architecture
TSLPRB StudyOS utilizes a token-driven CSS variable architecture built on Nuxt 3, Nuxt UI v2, and Tailwind CSS.
- **Theme Preset System**: Allows switching between "StudyOS Classic (Default)" and "Warm Notebook & Chalkboard (Signature Preset)".
- **State Flow**: User selects preset in `pages/settings.vue` -> `composables/useThemePreset.ts` updates `useState('studyos-theme-preset')` and `localStorage['studyos-theme-preset']` -> synchronizes `.theme-notebook` class on `document.documentElement` (`<html>`).
- **CSS Architecture**: `assets/css/main.css` defines token overrides under `.theme-notebook` (Light Mode: Warm Ruled Paper `#F6F1E4`, `#20303A` ink, `#C99A3B` gold, `#2F6D5C` sage) and `.dark.theme-notebook` (Dark Mode: Slate Chalkboard `#131B20`/`#182620`, `#F1EFE8` chalk, `#E0B253` yellow chalk, `#4EAB90` mint chalk). Tactile neo-brutalist components feature 1.5px/2px ink borders, hard offset box-shadows, and push-down button active states (`translate(2px, 2px)`).
- **Zero-FOUC Boot**: `plugins/theme-preset.client.ts` runs on client initialization, reading `localStorage` and applying `.theme-notebook` before first paint.
- **Typography Architecture**: Google Font `'Patrick Hand'` registered in `nuxt.config.ts`, `layouts/default.vue`, and `tailwind.config.ts` (`fontFamily.hand`), applied to section titles, note titles, step badges, and handwriting accents.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Light Mode Design Tokens | Complete `.theme-notebook` CSS variables for warm paper, ink text, gold, sage, terracotta | M1 | Survey / heads_and_legs.html |
| 2 | Dark Mode Chalkboard Tokens | Complete `.dark.theme-notebook` CSS variables for slate chalkboard, chalk text, yellow & mint chalk | M1 | Survey / heads_and_legs.html |
| 3 | Google Fonts Registration | Register 'Patrick Hand' in `nuxt.config.ts`, `layouts/default.vue`, and `tailwind.config.ts` | M1 | Survey |
| 4 | Tactile Neo-Brutalist CSS | Ruled lines background (`repeating-linear-gradient`), 2px borders, hard offset shadows, tactile buttons | M1 | Survey / heads_and_legs.html |
| 5 | Composable `useThemePreset` | Reactive `useState` theme preset store, SSR safety, localStorage persistence, classList toggler | M2 | Survey |
| 6 | Zero-FOUC Client Plugin | `plugins/theme-preset.client.ts` client boot plugin to attach `.theme-notebook` before paint | M2 | Survey |
| 7 | Settings UI Theme Cards Grid | 2-card interactive preset selector under Appearance with dynamic color swatches and signature badge | M3 | Survey |
| 8 | Settings Live Theme Preview | Interactive preview box in Settings reflecting active preset styling, button, and typography | M3 | Survey |
| 9 | Prebuild Compliance | Zero em-dashes verification via `npm run prebuild` (exit code 0) | M4 | Repository Rules |
| 10 | Production Build Verification | Full type-checking and SSR bundle compilation via `npx nuxi build` (exit code 0) | M4 | Repository Rules |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Tokens, CSS & Typography | `assets/css/main.css`, `nuxt.config.ts`, `layouts/default.vue`, `tailwind.config.ts` | none | DONE |
| M2 | Composable, Plugin & State | `composables/useThemePreset.ts`, `plugins/theme-preset.client.ts` | none | DONE |
| M3 | Settings UI Integration | `pages/settings.vue` | M1, M2 | DONE |
| M4 | Verification & Build | Full prebuild audit & `npx nuxi build` | M1, M2, M3 | DONE |

## Interface Contracts
### `composables/useThemePreset.ts`
- `type ThemePreset = 'default' | 'notebook'`
- `export function useThemePreset(): { preset: Ref<ThemePreset>, hydrated: Ref<boolean>, setPreset: (preset: ThemePreset) => void, togglePreset: () => void, isNotebook: ComputedRef<boolean>, presets: ThemePresetOption[] }`
- Storage Key: `'studyos-theme-preset'`
- HTML Root Class: `'theme-notebook'`

### CSS Variable Contracts (`assets/css/main.css`)
- `.theme-notebook`: Overrides `--bg`, `--bg-elevated`, `--bg-subtle`, `--bg-inset`, `--line`, `--line-strong`, `--text-1`, `--text-2`, `--text-3`, `--accent`, `--accent-strong`, `--accent-soft`, `--accent-line`, `--jade`, `--jade-soft`, `--jade-line`, `--red`, `--red-soft`, `--red-line`, `--sky`, `--sky-soft`, `--ink-card`, `--ink-card-line`, `--ink-card-text`, `--radius`, `--paper-line`.
- `.dark.theme-notebook`, `.dark .theme-notebook`: Specificity `(0,2,0)` overrides dark mode tokens for chalkboard aesthetic.
- Utility Classes: `.font-hand`, `.theme-notebook body`, `.theme-notebook .panel`, `.theme-notebook .btn-primary`, `.theme-notebook .opt`.

## Code Layout
- `assets/css/main.css`: Core design tokens, theme presets, and component styles.
- `nuxt.config.ts`: App-level head links, Google Fonts preconnect & stylesheets.
- `layouts/default.vue`: Layout font links.
- `tailwind.config.ts`: Extended fontFamily definitions.
- `composables/useThemePreset.ts`: Reactive theme preset composable.
- `plugins/theme-preset.client.ts`: Client-side startup plugin.
- `pages/settings.vue`: Appearance settings UI with preset selector and live preview.
