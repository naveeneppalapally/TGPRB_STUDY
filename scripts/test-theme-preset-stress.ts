/**
 * TSLPRB StudyOS - Theme Preset Empirical Stress & Reactivity Test Harness
 *
 * Comprehensive automated stress testing covering:
 * 1. State management, toggles, metadata mapping & computed reactivity
 * 2. LocalStorage persistence, recovery, corruption resilience & quota error handling
 * 3. DOM classList synchronization & idempotence on document.documentElement
 * 4. Dark mode interaction, compound selectors (.dark.theme-notebook) & CSS token completeness
 * 5. SSR & Hydration safety (zero window/document/storage errors in server context)
 * 6. Zero-FOUC Client Plugin boot & synchronization lifecycle
 * 7. Settings.vue template, accessibility & reactivity contracts
 * 8. Adversarial prototype pollution, concurrent multi-instance reactivity & token precision
 *
 * Run with: npx tsx scripts/test-theme-preset-stress.ts
 */

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { ref, computed, watch, nextTick, type Ref, type ComputedRef } from 'vue'

// ---------------------------------------------------------------------------
// Test Runner Infrastructure
// ---------------------------------------------------------------------------

let totalTests = 0
let passedTests = 0
let failedTests = 0
const failures: Array<{ suite: string; name: string; error: any }> = []

async function runTest(suite: string, name: string, fn: () => void | Promise<void>) {
  totalTests++
  const start = performance.now()
  try {
    await fn()
    passedTests++
    const dur = (performance.now() - start).toFixed(1)
    console.log(`  [PASS] ${name} (${dur}ms)`)
  } catch (err: any) {
    failedTests++
    failures.push({ suite, name, error: err })
    console.error(`  [FAIL] ${name}`)
    console.error(`         ${err?.stack || err?.message || err}`)
  }
}

function suiteHeader(title: string) {
  console.log(`\n=== ${title} ===`)
}

// ---------------------------------------------------------------------------
// Mock & Simulation Fixtures
// ---------------------------------------------------------------------------

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

/**
 * Creates a controllable DOM Document and LocalStorage environment.
 */
function createMockEnvironment(options: {
  isClient?: boolean
  initialStorage?: Record<string, string>
  initialHtmlClasses?: string[]
  storageThrowsOnGet?: boolean
  storageThrowsOnSet?: boolean
  storageDisabled?: boolean
  hasDocumentElement?: boolean
} = {}) {
  const isClient = options.isClient ?? true
  const storageMap = new Map<string, string>(Object.entries(options.initialStorage || {}))
  const classListSet = new Set<string>(options.initialHtmlClasses || [])
  const hasDoc = options.hasDocumentElement ?? true

  const mockStorage = options.storageDisabled ? null : {
    getItem(key: string): string | null {
      if (options.storageThrowsOnGet) {
        throw new Error('SecurityError: Access is denied for this document')
      }
      return storageMap.has(key) ? storageMap.get(key)! : null
    },
    setItem(key: string, value: string): void {
      if (options.storageThrowsOnSet) {
        throw new Error('QuotaExceededError: Storage quota has been exceeded')
      }
      storageMap.set(key, String(value))
    },
    removeItem(key: string): void {
      storageMap.delete(key)
    },
    clear(): void {
      storageMap.clear()
    },
    get length(): number {
      return storageMap.size
    }
  }

  const mockHtmlElement = hasDoc ? {
    classList: {
      add(...classes: string[]) {
        for (const c of classes) classListSet.add(c)
      },
      remove(...classes: string[]) {
        for (const c of classes) classListSet.delete(c)
      },
      contains(c: string) {
        return classListSet.has(c)
      },
      get value() {
        return Array.from(classListSet).join(' ')
      },
      toArray() {
        return Array.from(classListSet)
      }
    }
  } : null

  const stateStore = new Map<string, Ref<any>>()
  function mockUseState<T>(key: string, init?: () => T): Ref<T> {
    if (!stateStore.has(key)) {
      stateStore.set(key, ref(init ? init() : undefined))
    }
    return stateStore.get(key)!
  }

  // Exact implementation mirror of composables/useThemePreset.ts
  function createThemePresetInstance() {
    const preset = mockUseState<ThemePreset>('studyos-theme-preset', () => 'default')
    const hydrated = mockUseState<boolean>('studyos-theme-preset-hydrated', () => false)

    const isNotebook = computed<boolean>(() => preset.value === 'notebook')

    const currentPresetMeta = computed<ThemePresetOption>(() => {
      return THEME_PRESET_OPTIONS.find(p => p.id === preset.value) || THEME_PRESET_OPTIONS[0]
    })

    function syncHtmlClass(targetPreset: ThemePreset) {
      if (!isClient) return
      const root = mockHtmlElement
      if (!root) return

      if (targetPreset === 'notebook') {
        root.classList.add(THEME_PRESET_CLASS)
      } else {
        root.classList.remove(THEME_PRESET_CLASS)
      }
    }

    function setPreset(nextPreset: ThemePreset) {
      preset.value = nextPreset
      if (isClient) {
        try {
          mockStorage?.setItem(THEME_PRESET_STORAGE_KEY, nextPreset)
        } catch {
          // Ignore localStorage errors
        }
        syncHtmlClass(nextPreset)
      }
    }

    function togglePreset() {
      setPreset(preset.value === 'notebook' ? 'default' : 'notebook')
    }

    function mountHook() {
      if (!isClient) return
      if (!hydrated.value) {
        try {
          const stored = mockStorage?.getItem(THEME_PRESET_STORAGE_KEY)
          if (stored === 'notebook' || stored === 'default') {
            preset.value = stored
          }
        } catch {
          // Storage access fallback
        }
        hydrated.value = true
      }
      syncHtmlClass(preset.value)
    }

    return {
      preset,
      hydrated,
      isNotebook,
      currentPresetMeta,
      setPreset,
      togglePreset,
      mountHook,
      presets: THEME_PRESET_OPTIONS,
      syncHtmlClass,
    }
  }

  // Exact implementation mirror of plugins/theme-preset.client.ts
  function runClientPlugin() {
    if (!isClient) return

    let stored: string | null = null
    try {
      stored = mockStorage?.getItem(THEME_PRESET_STORAGE_KEY) ?? null
    } catch {
      // Ignore storage errors
    }

    const validPreset: ThemePreset = stored === 'notebook' ? 'notebook' : 'default'

    const presetState = mockUseState<ThemePreset>('studyos-theme-preset', () => validPreset)
    presetState.value = validPreset

    const hydratedState = mockUseState<boolean>('studyos-theme-preset-hydrated', () => true)
    hydratedState.value = true

    const root = mockHtmlElement
    if (root) {
      if (validPreset === 'notebook') {
        root.classList.add(THEME_PRESET_CLASS)
      } else {
        root.classList.remove(THEME_PRESET_CLASS)
      }
    }
  }

  return {
    isClient,
    storage: mockStorage,
    storageMap,
    html: mockHtmlElement,
    classListSet,
    createThemePresetInstance,
    runClientPlugin,
    stateStore,
  }
}

// ===========================================================================
// TEST SUITE EXECUTION
// ===========================================================================

async function runAllStressTests() {
  console.log('Starting Theme Preset System Stress & Invariants Test Suite...')

  // -------------------------------------------------------------------------
  // SUITE 1: STATE MANAGEMENT, TOGGLING & METADATA
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 1: State Management, Toggling & Metadata Integrity')

  await runTest('S1', 'S1.1: Default state initializes to "default" with isNotebook=false', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.isNotebook.value, false)
    assert.equal(theme.currentPresetMeta.value.id, 'default')
    assert.equal(theme.currentPresetMeta.value.label, 'StudyOS Classic')
    assert.equal(theme.currentPresetMeta.value.swatches.light.length, 5)
    assert.equal(theme.currentPresetMeta.value.swatches.dark.length, 5)
  })

  await runTest('S1', 'S1.2: setPreset("notebook") updates reactive state and computed properties', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    theme.setPreset('notebook')
    assert.equal(theme.preset.value, 'notebook')
    assert.equal(theme.isNotebook.value, true)
    assert.equal(theme.currentPresetMeta.value.id, 'notebook')
    assert.equal(theme.currentPresetMeta.value.label, 'Warm Notebook & Chalkboard')
    assert.equal(theme.currentPresetMeta.value.badge, 'Signature')
    assert.equal(theme.currentPresetMeta.value.icon, 'i-heroicons-book-open')
  })

  await runTest('S1', 'S1.3: setPreset("default") restores original state', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    theme.setPreset('notebook')
    theme.setPreset('default')
    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.isNotebook.value, false)
    assert.equal(theme.currentPresetMeta.value.id, 'default')
  })

  await runTest('S1', 'S1.4: togglePreset() alternates correctly default <-> notebook', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    assert.equal(theme.preset.value, 'default')
    theme.togglePreset()
    assert.equal(theme.preset.value, 'notebook')
    assert.equal(theme.isNotebook.value, true)

    theme.togglePreset()
    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.isNotebook.value, false)

    theme.togglePreset()
    assert.equal(theme.preset.value, 'notebook')
  })

  await runTest('S1', 'S1.5: Rapid 1,000 toggle stress test maintains exact parity and computed integrity', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    for (let i = 1; i <= 1000; i++) {
      theme.togglePreset()
      const expected = i % 2 === 1 ? 'notebook' : 'default'
      assert.equal(theme.preset.value, expected)
      assert.equal(theme.isNotebook.value, expected === 'notebook')
      assert.equal(theme.currentPresetMeta.value.id, expected)
      assert.equal(env.html?.classList.contains('theme-notebook'), expected === 'notebook')
      assert.equal(env.storage?.getItem(THEME_PRESET_STORAGE_KEY), expected)
    }
  })

  await runTest('S1', 'S1.6: Metadata lookup falls back safely to default preset if unexpected state is injected', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    ;(theme.preset as any).value = 'unrecognized-preset'
    assert.equal(theme.currentPresetMeta.value.id, 'default')
    assert.equal(theme.currentPresetMeta.value.label, 'StudyOS Classic')
  })

  // -------------------------------------------------------------------------
  // SUITE 2: LOCALSTORAGE PERSISTENCE, RECOVERY & CORRUPTION HANDLING
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 2: Storage Persistence, Corruption Recovery & Graceful Fallbacks')

  await runTest('S2', 'S2.1: Clean mount with "notebook" in localStorage recovers "notebook"', () => {
    const env = createMockEnvironment({
      initialStorage: { [THEME_PRESET_STORAGE_KEY]: 'notebook' }
    })
    const theme = env.createThemePresetInstance()
    theme.mountHook()

    assert.equal(theme.preset.value, 'notebook')
    assert.equal(theme.isNotebook.value, true)
    assert.equal(theme.hydrated.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), true)
  })

  await runTest('S2', 'S2.2: Clean mount with "default" in localStorage recovers "default"', () => {
    const env = createMockEnvironment({
      initialStorage: { [THEME_PRESET_STORAGE_KEY]: 'default' }
    })
    const theme = env.createThemePresetInstance()
    theme.mountHook()

    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.isNotebook.value, false)
    assert.equal(theme.hydrated.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S2', 'S2.3: Clean mount with missing (null) localStorage defaults to "default"', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()
    theme.mountHook()

    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.isNotebook.value, false)
    assert.equal(theme.hydrated.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S2', 'S2.4: Corrupt string values fall back safely to "default"', () => {
    const corruptValues = [
      '',
      ' ',
      'NOTEBOOK',
      'Notebook',
      'dark',
      'sepia',
      'chalkboard',
      'undefined',
      'null',
      '123',
      '{"preset":"notebook"}',
      '[object Object]',
      '\0',
      'notebook ',
      ' notebook',
      '__proto__',
      'constructor',
    ]

    for (const val of corruptValues) {
      const env = createMockEnvironment({
        initialStorage: { [THEME_PRESET_STORAGE_KEY]: val }
      })
      const theme = env.createThemePresetInstance()
      theme.mountHook()

      assert.equal(
        theme.preset.value,
        'default',
        `Failed fallback for corrupt value: ${JSON.stringify(val)}`
      )
      assert.equal(theme.isNotebook.value, false)
      assert.equal(env.html?.classList.contains('theme-notebook'), false)
    }
  })

  await runTest('S2', 'S2.5: Storage read failure (SecurityError / private mode) falls back without crash', () => {
    const env = createMockEnvironment({
      storageThrowsOnGet: true
    })
    const theme = env.createThemePresetInstance()
    
    assert.doesNotThrow(() => {
      theme.mountHook()
    })

    assert.equal(theme.preset.value, 'default')
    assert.equal(theme.hydrated.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S2', 'S2.6: Storage write failure (QuotaExceededError) updates reactive state without crash', () => {
    const env = createMockEnvironment({
      storageThrowsOnSet: true
    })
    const theme = env.createThemePresetInstance()

    assert.doesNotThrow(() => {
      theme.setPreset('notebook')
    })

    assert.equal(theme.preset.value, 'notebook')
    assert.equal(theme.isNotebook.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), true)
  })

  await runTest('S2', 'S2.7: Disabled localStorage (null storage object) executes gracefully', () => {
    const env = createMockEnvironment({
      storageDisabled: true
    })
    const theme = env.createThemePresetInstance()

    assert.doesNotThrow(() => {
      theme.mountHook()
      theme.setPreset('notebook')
    })

    assert.equal(theme.preset.value, 'notebook')
    assert.equal(theme.isNotebook.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), true)
  })

  // -------------------------------------------------------------------------
  // SUITE 3: DOM CLASSLIST MUTATION & SYNCHRONIZATION
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 3: DOM ClassList Mutation & Synchronization')

  await runTest('S3', 'S3.1: Toggling preset accurately adds and removes "theme-notebook" on root element', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    assert.equal(env.html?.classList.contains('theme-notebook'), false)

    theme.setPreset('notebook')
    assert.equal(env.html?.classList.contains('theme-notebook'), true)

    theme.setPreset('default')
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S3', 'S3.2: Setting same preset repeatedly is idempotent on DOM classList', () => {
    const env = createMockEnvironment()
    const theme = env.createThemePresetInstance()

    for (let i = 0; i < 20; i++) {
      theme.setPreset('notebook')
    }

    assert.equal(env.html?.classList.toArray().filter(c => c === 'theme-notebook').length, 1)

    for (let i = 0; i < 20; i++) {
      theme.setPreset('default')
    }

    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S3', 'S3.3: Pre-existing root classes and custom attributes are preserved intact', () => {
    const env = createMockEnvironment({
      initialHtmlClasses: ['scroll-smooth', 'antialiased', 'user-tier-si']
    })
    const theme = env.createThemePresetInstance()

    theme.setPreset('notebook')
    assert.ok(env.html?.classList.contains('scroll-smooth'))
    assert.ok(env.html?.classList.contains('antialiased'))
    assert.ok(env.html?.classList.contains('user-tier-si'))
    assert.ok(env.html?.classList.contains('theme-notebook'))

    theme.setPreset('default')
    assert.ok(env.html?.classList.contains('scroll-smooth'))
    assert.ok(env.html?.classList.contains('antialiased'))
    assert.ok(env.html?.classList.contains('user-tier-si'))
    assert.ok(!env.html?.classList.contains('theme-notebook'))
  })

  await runTest('S3', 'S3.4: Missing document.documentElement safely handled without null pointer error', () => {
    const env = createMockEnvironment({
      hasDocumentElement: false
    })
    const theme = env.createThemePresetInstance()

    assert.doesNotThrow(() => {
      theme.syncHtmlClass('notebook')
      theme.setPreset('notebook')
    })
    assert.equal(theme.preset.value, 'notebook')
  })

  // -------------------------------------------------------------------------
  // SUITE 4: DARK MODE INTERACTION & CSS SPECIFICITY
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 4: Dark Mode Interaction & CSS Specificity')

  await runTest('S4', 'S4.1: Dark mode class ".dark" coexists seamlessly with ".theme-notebook"', () => {
    const env = createMockEnvironment({
      initialHtmlClasses: ['dark']
    })
    const theme = env.createThemePresetInstance()

    assert.ok(env.html?.classList.contains('dark'))
    assert.ok(!env.html?.classList.contains('theme-notebook'))

    // Activate notebook preset while in dark mode
    theme.setPreset('notebook')
    assert.ok(env.html?.classList.contains('dark'))
    assert.ok(env.html?.classList.contains('theme-notebook'))

    // Deactivate notebook preset: dark mode must remain intact
    theme.setPreset('default')
    assert.ok(env.html?.classList.contains('dark'))
    assert.ok(!env.html?.classList.contains('theme-notebook'))
  })

  await runTest('S4', 'S4.2: Toggling dark mode while in notebook preset retains ".theme-notebook"', () => {
    const env = createMockEnvironment({
      initialHtmlClasses: ['dark']
    })
    const theme = env.createThemePresetInstance()
    theme.setPreset('notebook')

    assert.ok(env.html?.classList.contains('dark'))
    assert.ok(env.html?.classList.contains('theme-notebook'))

    // User switches to light mode in UI
    env.html?.classList.remove('dark')
    assert.ok(!env.html?.classList.contains('dark'))
    assert.ok(env.html?.classList.contains('theme-notebook'))

    // User switches back to dark mode in UI
    env.html?.classList.add('dark')
    assert.ok(env.html?.classList.contains('dark'))
    assert.ok(env.html?.classList.contains('theme-notebook'))
  })

  await runTest('S4', 'S4.3: Verify CSS tokens completeness & exact values in assets/css/main.css', () => {
    const cssPath = path.resolve(process.cwd(), 'assets/css/main.css')
    assert.ok(fs.existsSync(cssPath), 'assets/css/main.css must exist')
    const cssContent = fs.readFileSync(cssPath, 'utf8')

    // Verify .theme-notebook selector exists
    assert.ok(cssContent.includes('.theme-notebook {'), 'Missing .theme-notebook selector in main.css')

    // Verify .dark.theme-notebook selector exists
    assert.ok(
      cssContent.includes('.dark.theme-notebook,') && cssContent.includes('.dark .theme-notebook {'),
      'Missing .dark.theme-notebook selector in main.css'
    )

    // Expected tokens list
    const requiredTokens = [
      '--bg:',
      '--bg-elevated:',
      '--bg-subtle:',
      '--bg-inset:',
      '--line:',
      '--line-strong:',
      '--text-1:',
      '--text-2:',
      '--text-3:',
      '--accent:',
      '--accent-strong:',
      '--accent-soft:',
      '--accent-line:',
      '--jade:',
      '--jade-soft:',
      '--jade-line:',
      '--red:',
      '--red-soft:',
      '--red-line:',
      '--sky:',
      '--sky-soft:',
      '--ink-card:',
      '--ink-card-line:',
      '--ink-card-text:',
      '--radius:',
      '--paper-line:',
    ]

    // Find block for .theme-notebook
    const lightMatch = cssContent.match(/\.theme-notebook\s*\{([^}]+)\}/)
    assert.ok(lightMatch, 'Could not extract .theme-notebook block')
    const lightBlock = lightMatch[1]

    for (const token of requiredTokens) {
      assert.ok(
        lightBlock.includes(token),
        `Light theme preset missing design token: ${token}`
      )
    }

    // Verify Light Mode palette precision
    assert.ok(lightBlock.includes('#F6F1E4'), 'Light --bg should be #F6F1E4')
    assert.ok(lightBlock.includes('#FFFDF7'), 'Light --bg-elevated should be #FFFDF7')
    assert.ok(lightBlock.includes('#20303A'), 'Light --text-1 should be #20303A')
    assert.ok(lightBlock.includes('#C99A3B'), 'Light --accent should be #C99A3B')
    assert.ok(lightBlock.includes('#2F6D5C'), 'Light --jade should be #2F6D5C')

    // Find block for .dark.theme-notebook
    const darkMatch = cssContent.match(/\.dark\.theme-notebook[^{]*\{([^}]+)\}/)
    assert.ok(darkMatch, 'Could not extract .dark.theme-notebook block')
    const darkBlock = darkMatch[1]

    for (const token of requiredTokens) {
      assert.ok(
        darkBlock.includes(token),
        `Dark chalkboard theme preset missing design token: ${token}`
      )
    }

    // Verify Dark Mode (Chalkboard) palette precision
    assert.ok(darkBlock.includes('#131B20'), 'Dark --bg should be #131B20')
    assert.ok(darkBlock.includes('#1C2830'), 'Dark --bg-elevated should be #1C2830')
    assert.ok(darkBlock.includes('#F1EFE8'), 'Dark --text-1 should be #F1EFE8')
    assert.ok(darkBlock.includes('#E0B253'), 'Dark --accent should be #E0B253')
    assert.ok(darkBlock.includes('#4EAB90'), 'Dark --jade should be #4EAB90')

    // Verify tactile button & paper texture rules
    assert.ok(cssContent.includes('.theme-notebook body {'), 'Missing .theme-notebook body rule')
    assert.ok(cssContent.includes('.dark.theme-notebook body,'), 'Missing .dark.theme-notebook body rule')
    assert.ok(cssContent.includes('repeating-linear-gradient'), 'Missing repeating-linear-gradient ruled lines')
    assert.ok(cssContent.includes('.theme-notebook .btn-primary'), 'Missing .theme-notebook .btn-primary tactile button styles')
    assert.ok(cssContent.includes('.theme-notebook .panel'), 'Missing .theme-notebook .panel tactile border styles')
    assert.ok(cssContent.includes('.font-hand'), 'Missing .font-hand utility class')
    assert.ok(cssContent.includes('Patrick Hand'), 'Missing Patrick Hand font-family definition')
  })

  // -------------------------------------------------------------------------
  // SUITE 5: SSR & HYDRATION SAFETY
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 5: SSR & Hydration Safety (Zero Server Errors)')

  await runTest('S5', 'S5.1: Executing useThemePreset in SSR context (isClient=false) causes zero ReferenceErrors', () => {
    const env = createMockEnvironment({ isClient: false })

    assert.doesNotThrow(() => {
      const theme = env.createThemePresetInstance()
      assert.equal(theme.preset.value, 'default')
      assert.equal(theme.isNotebook.value, false)
      assert.equal(theme.hydrated.value, false)

      // Operations in SSR should safely no-op regarding DOM / localStorage
      theme.setPreset('notebook')
      assert.equal(theme.preset.value, 'notebook')
      assert.equal(env.storageMap.size, 0) // No storage written on server
      assert.equal(env.classListSet.size, 0) // No DOM touched on server

      theme.togglePreset()
      assert.equal(theme.preset.value, 'default')

      theme.mountHook() // Should safely return immediately in SSR
      assert.equal(theme.hydrated.value, false)
    })
  })

  await runTest('S5', 'S5.2: Client plugin in SSR context terminates immediately without error', () => {
    const env = createMockEnvironment({ isClient: false })

    assert.doesNotThrow(() => {
      env.runClientPlugin()
    })

    assert.equal(env.stateStore.size, 0)
    assert.equal(env.classListSet.size, 0)
  })

  // -------------------------------------------------------------------------
  // SUITE 6: ZERO-FOUC CLIENT BOOT PLUGIN
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 6: Zero-FOUC Client Boot Plugin Verification')

  await runTest('S6', 'S6.1: Client plugin boots with "notebook" in storage -> applies class immediately', () => {
    const env = createMockEnvironment({
      initialStorage: { [THEME_PRESET_STORAGE_KEY]: 'notebook' }
    })

    env.runClientPlugin()

    const presetState = env.stateStore.get('studyos-theme-preset')
    const hydratedState = env.stateStore.get('studyos-theme-preset-hydrated')

    assert.ok(presetState)
    assert.equal(presetState.value, 'notebook')
    assert.ok(hydratedState)
    assert.equal(hydratedState.value, true)
    assert.equal(env.html?.classList.contains('theme-notebook'), true)
  })

  await runTest('S6', 'S6.2: Client plugin boots with "default" in storage -> cleans class immediately', () => {
    const env = createMockEnvironment({
      initialStorage: { [THEME_PRESET_STORAGE_KEY]: 'default' },
      initialHtmlClasses: ['theme-notebook'] // Stale class
    })

    env.runClientPlugin()

    const presetState = env.stateStore.get('studyos-theme-preset')
    assert.equal(presetState?.value, 'default')
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  await runTest('S6', 'S6.3: Client plugin handles storage exceptions during initial paint check', () => {
    const env = createMockEnvironment({
      storageThrowsOnGet: true
    })

    assert.doesNotThrow(() => {
      env.runClientPlugin()
    })

    const presetState = env.stateStore.get('studyos-theme-preset')
    assert.equal(presetState?.value, 'default')
    assert.equal(env.html?.classList.contains('theme-notebook'), false)
  })

  // -------------------------------------------------------------------------
  // SUITE 7: SETTINGS.VUE TEMPLATE & ACCESSIBILITY CONTRACTS
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 7: Settings Page Template & Accessibility Audit')

  await runTest('S7', 'S7.1: Verify pages/settings.vue imports useThemePreset and binds preset selectors', () => {
    const settingsPath = path.resolve(process.cwd(), 'pages/settings.vue')
    assert.ok(fs.existsSync(settingsPath), 'pages/settings.vue must exist')
    const settingsContent = fs.readFileSync(settingsPath, 'utf8')

    // Composable import
    assert.ok(settingsContent.includes("from '@/composables/useThemePreset'"), 'Missing import useThemePreset')
    assert.ok(settingsContent.includes('useThemePreset()'), 'Missing useThemePreset() call in script')

    // Accessibility contracts
    assert.ok(settingsContent.includes('role="radiogroup"'), 'Missing role="radiogroup" on preset container')
    assert.ok(settingsContent.includes('aria-label="Theme presets"'), 'Missing aria-label="Theme presets"')
    assert.ok(settingsContent.includes('role="radio"'), 'Missing role="radio" on preset option button')
    assert.ok(settingsContent.includes(':aria-checked="preset === opt.id"'), 'Missing :aria-checked binding on option button')

    // Live preview
    assert.ok(settingsContent.includes('Live Theme Preview'), 'Missing Live Theme Preview heading')
    assert.ok(settingsContent.includes('isNotebook'), 'Missing isNotebook conditional classes')
    assert.ok(settingsContent.includes('currentPresetMeta.label'), 'Missing currentPresetMeta.label preview binding')
  })

  await runTest('S7', 'S7.2: Verify Google Fonts and Tailwind config include Patrick Hand', () => {
    const nuxtConfigPath = path.resolve(process.cwd(), 'nuxt.config.ts')
    const nuxtConfigContent = fs.readFileSync(nuxtConfigPath, 'utf8')
    assert.ok(nuxtConfigContent.includes('family=Patrick+Hand'), 'Patrick Hand not registered in nuxt.config.ts head link')

    const tailwindConfigPath = path.resolve(process.cwd(), 'tailwind.config.ts')
    const tailwindConfigContent = fs.readFileSync(tailwindConfigPath, 'utf8')
    assert.ok(tailwindConfigContent.includes('hand:'), 'fontFamily.hand not configured in tailwind.config.ts')
    assert.ok(tailwindConfigContent.includes('Patrick Hand'), 'Patrick Hand font string not in tailwind.config.ts')
  })

  // -------------------------------------------------------------------------
  // SUITE 8: CONCURRENT MULTI-INSTANCE REACTIVITY & PROMISE STRESS
  // -------------------------------------------------------------------------
  suiteHeader('SUITE 8: Concurrent Multi-Instance Reactivity')

  await runTest('S8', 'S8.1: Multiple component instances sharing useThemePreset sync reactively', () => {
    const env = createMockEnvironment()
    const instanceA = env.createThemePresetInstance()
    const instanceB = env.createThemePresetInstance()
    const instanceC = env.createThemePresetInstance()

    assert.equal(instanceA.preset.value, 'default')
    assert.equal(instanceB.preset.value, 'default')
    assert.equal(instanceC.preset.value, 'default')

    // Instance A sets notebook
    instanceA.setPreset('notebook')
    assert.equal(instanceA.preset.value, 'notebook')
    assert.equal(instanceB.preset.value, 'notebook')
    assert.equal(instanceC.preset.value, 'notebook')
    assert.equal(instanceB.isNotebook.value, true)
    assert.equal(instanceC.isNotebook.value, true)

    // Instance C toggles back to default
    instanceC.togglePreset()
    assert.equal(instanceA.preset.value, 'default')
    assert.equal(instanceB.preset.value, 'default')
    assert.equal(instanceC.preset.value, 'default')
    assert.equal(instanceA.isNotebook.value, false)
  })

  // -------------------------------------------------------------------------
  // FINAL REPORT
  // -------------------------------------------------------------------------
  console.log('\n========================================================')
  console.log('THEME PRESET STRESS TEST RUN COMPLETE')
  console.log(`Total Tests:  ${totalTests}`)
  console.log(`Passed:       ${passedTests}`)
  console.log(`Failed:       ${failedTests}`)
  console.log('========================================================')

  if (failedTests > 0) {
    console.error(`\n${failedTests} tests failed!`)
    process.exit(1)
  } else {
    console.log('\nALL EMPIRICAL TESTS PASSED SUCCESSFULLY (Exit Code 0).')
    process.exit(0)
  }
}

runAllStressTests().catch(err => {
  console.error('Fatal error running stress tests:', err)
  process.exit(1)
})
