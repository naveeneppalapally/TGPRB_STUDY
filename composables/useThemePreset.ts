import { computed, onMounted } from 'vue'
import { useState } from '#imports'

export type ThemePreset = 'default' | 'graphite' | 'forest' | 'notebook'

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
export const THEME_PRESET_CLASSES = {
  default: '',
  graphite: 'theme-graphite',
  forest: 'theme-forest',
  notebook: 'theme-notebook',
} as const

export const THEME_PRESET_CLASS = 'theme-notebook'

export const THEME_PRESET_OPTIONS: ThemePresetOption[] = [
  {
    id: 'default',
    label: 'StudyOS Classic',
    subtitle: 'Warm creamy paper & saffron',
    description: 'Original academic interface with warm creamy paper tones, crisp hairlines, and marigold saffron accents.',
    icon: 'i-heroicons-academic-cap',
    swatches: {
      light: ['#f5f3ec', '#fffefa', '#e9e5d7', '#1c1917', '#cd8a14'],
      dark: ['#100f0c', '#17150f', '#0b0a08', '#f3efe4', '#e5ad31'],
    },
  },
  {
    id: 'graphite',
    label: 'Calm Paper & Graphite',
    subtitle: 'Neutral paper & tint-free graphite',
    description: 'Clean neutral paper, pure graphite dark mode with lifted text contrast, and restrained ochre accents.',
    badge: 'Calmer',
    icon: 'i-heroicons-document-text',
    swatches: {
      light: ['#f6f5f2', '#ffffff', '#e7e5e0', '#1e2024', '#b9781a'],
      dark: ['#16171a', '#1d1f23', '#111214', '#ececea', '#d9a441'],
    },
  },
  {
    id: 'forest',
    label: 'Botanical Sage & Forest',
    subtitle: 'Matcha green & eucalyptus jade',
    description: 'Calming matcha paper, deep evergreen pine ink, eucalyptus jade accents, and Nordic midnight spruce dark mode.',
    badge: 'Ergonomic',
    icon: 'i-heroicons-sparkles',
    swatches: {
      light: ['#F1F5EE', '#FAFDF8', '#D5E8DD', '#14271F', '#247A55'],
      dark: ['#0C1612', '#13221C', '#0F1B16', '#ECFDF5', '#34D399'],
    },
  },
  {
    id: 'notebook',
    label: 'Warm Notebook & Chalkboard',
    subtitle: 'Vintage ruled paper & chalkboard slate',
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

  const isGraphite = computed<boolean>(() => preset.value === 'graphite')
  const isNotebook = computed<boolean>(() => preset.value === 'notebook')
  const isForest = computed<boolean>(() => preset.value === 'forest')

  const currentPresetMeta = computed<ThemePresetOption>(() => {
    return THEME_PRESET_OPTIONS.find(p => p.id === preset.value) || THEME_PRESET_OPTIONS[0]
  })

  function syncHtmlClass(targetPreset: ThemePreset) {
    if (!import.meta.client) return
    const root = document.documentElement
    if (!root) return

    root.classList.remove('theme-notebook', 'theme-forest', 'theme-graphite')
    const cls = THEME_PRESET_CLASSES[targetPreset]
    if (cls) {
      root.classList.add(cls)
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
    if (preset.value === 'default') setPreset('graphite')
    else if (preset.value === 'graphite') setPreset('forest')
    else if (preset.value === 'forest') setPreset('notebook')
    else setPreset('default')
  }

  onMounted(() => {
    if (!import.meta.client) return
    if (!hydrated.value) {
      try {
        const stored = localStorage.getItem(THEME_PRESET_STORAGE_KEY)
        if (stored === 'notebook' || stored === 'forest' || stored === 'graphite' || stored === 'default') {
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
    isGraphite,
    isNotebook,
    isForest,
    currentPresetMeta,
    setPreset,
    togglePreset,
    presets: THEME_PRESET_OPTIONS,
  }
}
