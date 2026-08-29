# Original User Request

## Initial Request - 2026-08-29T06:39:34Z

Implement the signature "Warm Notebook & Chalkboard" theme preset (derived from `/home/naveen/Downloads/heads_and_legs.html`) into the TSLPRB StudyOS platform as a selectable theme in Settings.

Requirements:
1. R1: Theme Palette & Design Tokens (assets/css/main.css) - .theme-notebook CSS variables for Light Mode & Dark Mode.
2. R2: Tactile Neo-Brutalist Component Styling under .theme-notebook.
3. R3: Typography & Google Fonts - register 'Patrick Hand' in nuxt.config.ts, apply appropriately.
4. R4: Composable, State & SSR Plugin - composables/useThemePreset.ts, plugins/theme-preset.client.ts, localStorage persistence & html class sync.
5. R5: Settings UI Integration (pages/settings.vue) - Theme Presets card grid under Appearance, live swatches, live preview.
6. R6: Verification & Build - `npm run prebuild` (0 em-dashes), `npx nuxi build` exit code 0.
