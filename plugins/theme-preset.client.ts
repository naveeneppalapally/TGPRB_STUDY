import { defineNuxtPlugin, useState } from '#imports'
import type { ThemePreset } from '~/composables/useThemePreset'
import { THEME_PRESET_STORAGE_KEY, THEME_PRESET_CLASS } from '~/composables/useThemePreset'

/**
 * Client plugin executed early during boot to eliminate flash of unstyled content (FOUC).
 * Reads the persisted preset from localStorage and immediately applies or removes the
 * theme class on document.documentElement before first paint.
 */
export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  let stored: string | null = null
  try {
    stored = localStorage.getItem(THEME_PRESET_STORAGE_KEY)
  } catch {
    // Ignore storage errors during initialization
  }

  const validPreset: ThemePreset = (stored === 'notebook' || stored === 'forest') ? stored : 'default'

  const presetState = useState<ThemePreset>('studyos-theme-preset', () => validPreset)
  presetState.value = validPreset

  const hydratedState = useState<boolean>('studyos-theme-preset-hydrated', () => true)
  hydratedState.value = true

  const root = document.documentElement
  if (root) {
    root.classList.remove('theme-notebook', 'theme-forest')
    if (validPreset === 'notebook') {
      root.classList.add('theme-notebook')
    } else if (validPreset === 'forest') {
      root.classList.add('theme-forest')
    }
  }
})
