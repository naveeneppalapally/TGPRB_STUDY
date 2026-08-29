import { computed, onMounted } from 'vue'
import { useState } from '#imports'

export type ThemePreset = 'default' | 'notebook'

export interface ThemePresetOption {
  id: ThemePreset
  label: string
  subtitle: string
  description: string
  badge?: string
  icon: string
  swatches: {
    light: string[]
    dark: string[]
  }
}

export const THEME_PRESET_STORAGE_KEY = 'studyos-theme-preset'
export const THEME_PRESET_CLASS = 'theme-notebook'

export const THEME_PRESET_OPTIONS: ThemePresetOption[] = [
  {
    id: 'default',
    label: 'StudyOS Classic',
    subtitle: 'Academic modern & high density',
    description: 'Modern academic interface with crisp hairlines, neutral paper tones, and marigold saffron accents.',
    icon: 'i-heroicons-academic-cap',
    swatches: {
      light: ['#f5f3ec', '#fffefa', '#e7e2d6', '#1c1917', '#cd8a14'],
      dark: ['#100f0c', '#17150f', '#2c2820', '#f3efe4', '#e5ad31'],
    },
  },
  {
    id: 'notebook',
    label: 'Warm Notebook & Chalkboard',
    subtitle: 'Tactile vintage classroom & slate',
    description: 'Vintage ruled paper, dark slate chalkboard, Patrick Hand handwriting accents, and tactile ink borders.',
    badge: 'Signature',
    icon: 'i-heroicons-book-open',
    swatches: {
      light: ['#F6F1E4', '#FFFDF7', '#20303A', '#20303A', '#C99A3B'],
      dark: ['#141E24', '#1D2B33', 'rgba(243, 230, 198, 0.25)', '#F3E6C6', '#F3CE72'],
    },
  },
]

export const THEME_PRESETS = THEME_PRESET_OPTIONS

/**
 * SSR-safe composable for theme preset state management and document root synchronization.
 */
export function useThemePreset() {
  const preset = useState<ThemePreset>('studyos-theme-preset', () => 'default')
  const hydrated = useState<boolean>('studyos-theme-preset-hydrated', () => false)

  const isNotebook = computed<boolean>(() => preset.value === 'notebook')

  const currentPresetMeta = computed<ThemePresetOption>(() => {
    return THEME_PRESET_OPTIONS.find(p => p.id === preset.value) || THEME_PRESET_OPTIONS[0]
  })

  function syncHtmlClass(targetPreset: ThemePreset) {
    if (!import.meta.client) return
    const root = document.documentElement
    if (!root) return

    if (targetPreset === 'notebook') {
      root.classList.add(THEME_PRESET_CLASS)
    } else {
      root.classList.remove(THEME_PRESET_CLASS)
    }
  }

  function setPreset(nextPreset: ThemePreset) {
    preset.value = nextPreset
    if (import.meta.client) {
      try {
        localStorage.setItem(THEME_PRESET_STORAGE_KEY, nextPreset)
      } catch {
        // Ignore localStorage errors (e.g. privacy mode / disabled storage)
      }
      syncHtmlClass(nextPreset)
    }
  }

  function togglePreset() {
    setPreset(preset.value === 'notebook' ? 'default' : 'notebook')
  }

  onMounted(() => {
    if (!import.meta.client) return
    if (!hydrated.value) {
      try {
        const stored = localStorage.getItem(THEME_PRESET_STORAGE_KEY)
        if (stored === 'notebook' || stored === 'default') {
          preset.value = stored
        }
      } catch {
        // Storage access fallback
      }
      hydrated.value = true
    }
    syncHtmlClass(preset.value)
  })

  return {
    preset,
    hydrated,
    isNotebook,
    currentPresetMeta,
    setPreset,
    togglePreset,
    presets: THEME_PRESET_OPTIONS,
  }
}
