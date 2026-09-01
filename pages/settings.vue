<template>
  <div class="mx-auto max-w-2xl">
    <!-- Page header -->
    <header class="mb-8 border-b b-line pb-6">
      <div class="mb-2 flex items-center gap-2 text-[12px] t-lo">
        <NuxtLink to="/" class="hover:t-hi transition-colors">Dashboard</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
        <span class="t-mid">Settings</span>
      </div>
      <h1 class="font-display text-h1 font-bold tracking-tight t-hi">Settings</h1>
      <p class="mt-1 text-[14px] t-mid">Manage your study account, sync preferences, and interface settings.</p>
    </header>

    <!-- Account & Sync Section -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Account & Sync</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5">
        <div v-if="isLoggedIn" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-saffron-500 text-sm font-bold text-white uppercase shadow-sm">
              {{ (displayName || 'U')[0] }}
            </span>
            <div>
              <p class="text-[15px] font-medium t-hi">{{ displayName }}</p>
              <p class="text-[12px] t-lo">{{ userEmail }}</p>
              <span class="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                <UIcon name="i-heroicons-check-circle" class="h-3.5 w-3.5" />
                Cloud sync active (Separate tracker profile)
              </span>
            </div>
          </div>

          <UButton
            color="gray"
            variant="outline"
            size="sm"
            label="Sign Out"
            icon="i-heroicons-arrow-left-on-rectangle"
            :loading="authLoading"
            @click="handleSignOut"
          />
        </div>

        <div v-else class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p class="text-[15px] font-medium t-hi">Guest Session</p>
            <p class="mt-0.5 text-[13px] t-lo">
              Sign in with your email to keep your FSRS review queue, topic progress, and gates separate from other users.
            </p>
          </div>

          <UButton
            to="/auth/login"
            color="primary"
            size="sm"
            label="Sign In / Register"
            icon="i-heroicons-arrow-right-on-rectangle"
            class="shrink-0 font-semibold"
          />
        </div>
      </div>
    </section>

    <!-- Typography -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Typography</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5">
        
        <!-- Controls Grid -->
        <div class="grid gap-6">
          
          <!-- Base Text -->
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Base text</p>
              <p class="mt-0.5 text-[13px] t-lo">Paragraphs, lists, and standard interface text.</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1 self-start sm:self-auto">
              <button
                v-for="opt in sizeOptions"
                :key="'base'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleBase === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('base', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Headings -->
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Headings</p>
              <p class="mt-0.5 text-[13px] t-lo">Main page titles and top-level sections (H1, H2).</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1 self-start sm:self-auto">
              <button
                v-for="opt in sizeOptions"
                :key="'head'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleHeading === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('heading', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Subheadings -->
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Subheadings</p>
              <p class="mt-0.5 text-[13px] t-lo">Deep dive titles and subsection headers (H3, H4).</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1 self-start sm:self-auto">
              <button
                v-for="opt in sizeOptions"
                :key="'sub'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleSubheading === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('subheading', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
          
        </div>

        <!-- Live preview -->
        <div class="mt-6 rounded-lg border b-line bg-base px-4 py-4">
          <p class="mb-2 text-[11px] uppercase tracking-widest t-lo font-mono">Live Preview</p>
          <div class="space-y-3">
            <p class="font-display font-bold t-hi text-h2">
              The Godavari Basin
            </p>
            <p class="font-semibold t-hi text-h3">
              Geographical Extent
            </p>
            <p class="t-mid text-body">
              The Godavari basin extends over states of Maharashtra, Andhra Pradesh, Chhattisgarh and Odisha in addition to smaller parts in Madhya Pradesh, Karnataka and Union territory of Puducherry.
            </p>
            <p class="font-semibold t-hi text-h4 mt-2">
              Key Tributaries
            </p>
            <p class="t-mid text-body-sm">
              The Pravara, Purna, Manjra, Penganga, Wardha, Wainganga, Pranhita (combined flow of Wainganga, Penganga, Wardha), Indravati, Maner and the Sabri.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Flashcard unlock mode -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Flashcard unlocking</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5">
        <div class="mb-4">
          <p class="text-[15px] font-medium t-hi">How should atomic flashcards unlock?</p>
          <p class="mt-0.5 text-[13px] t-lo">This preference applies to note pages and the review queue on this device.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Flashcard unlock mode">
          <button
            v-for="option in flashcardUnlockOptions"
            :key="option.value"
            type="button"
            class="rounded-lg border p-4 text-left transition-colors"
            :class="flashcardUnlockMode === option.value
              ? 'border-saffron-500 bg-saffron-50 dark:bg-saffron-950/30'
              : 'b-line bg-sub hover:border-saffron-300 dark:hover:border-saffron-800'"
            role="radio"
            :aria-checked="flashcardUnlockMode === option.value"
            @click="setFlashcardUnlockMode(option.value)"
          >
            <span class="flex items-center gap-2 text-[14px] font-semibold t-hi">
              <UIcon :name="option.icon" class="h-4 w-4" :class="flashcardUnlockMode === option.value ? 'accent' : 't-lo'" />
              {{ option.label }}
            </span>
            <span class="mt-1 block text-[12px] leading-relaxed t-lo">{{ option.description }}</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Appearance & Theme Section -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Appearance & Theme</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5 space-y-6">
        
        <!-- Color Mode -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b b-line">
          <div>
            <p class="text-[15px] font-medium t-hi">Color mode</p>
            <p class="mt-0.5 text-[13px] t-lo">Switch between light and dark themes.</p>
          </div>
          <ClientOnly>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1">
              <button
                v-for="mode in ['light', 'dark']"
                :key="mode"
                type="button"
                class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="colorMode.value === mode
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="colorMode.preference = mode"
              >
                <UIcon
                  :name="mode === 'light' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                  class="h-3.5 w-3.5"
                />
                {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
              </button>
            </div>
          </ClientOnly>
        </div>

        <!-- Theme Presets Selection Grid -->
        <div>
          <div class="mb-4">
            <p class="text-[15px] font-medium t-hi">Theme Presets</p>
            <p class="mt-0.5 text-[13px] t-lo">Choose your study interface aesthetic and tactile styling.</p>
          </div>

          <ClientOnly>
            <div class="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Theme presets">
              <button
                v-for="opt in themePresets"
                :key="opt.id"
                type="button"
                class="group rounded-lg border p-4 text-left transition-all duration-150 flex flex-col justify-between"
                :class="preset === opt.id
                  ? 'border-saffron-500 bg-saffron-50/60 dark:bg-saffron-950/30 shadow-sm ring-1 ring-saffron-500/30'
                  : 'b-line bg-sub hover:border-saffron-300 dark:hover:border-saffron-800'"
                role="radio"
                :aria-checked="preset === opt.id"
                @click="setPreset(opt.id)"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2 flex-wrap">
                      <UIcon
                        :name="opt.icon"
                        class="h-4 w-4 shrink-0"
                        :class="preset === opt.id ? 'text-saffron-600 dark:text-saffron-400' : 't-lo'"
                      />
                      <span class="text-[14px] font-semibold t-hi">{{ opt.label }}</span>
                      <span
                        v-if="opt.badge"
                        class="rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono"
                        :class="opt.id === 'forest'
                          ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'"
                      >
                        {{ opt.badge }}
                      </span>
                    </div>

                    <UIcon
                      v-if="preset === opt.id"
                      name="i-heroicons-check-circle-20-solid"
                      class="h-5 w-5 text-saffron-600 dark:text-saffron-400 shrink-0"
                    />
                    <div
                      v-else
                      class="h-4 w-4 rounded-full border border-stone-300 dark:border-stone-600 shrink-0 mt-0.5"
                    />
                  </div>

                  <span class="mt-1.5 block text-[12px] font-medium text-stone-700 dark:text-stone-300">
                    {{ opt.subtitle }}
                  </span>
                  <span class="mt-1 block text-[12px] leading-relaxed t-lo">
                    {{ opt.description }}
                  </span>
                </div>

                <!-- Swatches -->
                <div class="mt-4 flex items-center justify-between border-t b-line pt-2.5">
                  <div class="flex items-center gap-1.5">
                    <span
                      v-for="(hex, idx) in (colorMode.value === 'dark' ? opt.swatches.dark : opt.swatches.light)"
                      :key="idx"
                      class="h-3.5 w-3.5 rounded-full border border-black/10 dark:border-white/10 shadow-xs"
                      :style="{ backgroundColor: hex }"
                      :title="hex"
                    />
                  </div>
                  <span class="text-[10.5px] font-mono t-lo">
                    {{ colorMode.value === 'dark' ? 'Dark' : 'Light' }} palette
                  </span>
                </div>
              </button>
            </div>

            <!-- Live Theme Preview -->
            <div class="mt-6 rounded-xl border b-line bg-base p-4 transition-all duration-200">
              <div class="mb-3 flex items-center justify-between flex-wrap gap-2">
                <div class="flex items-center gap-2">
                  <span class="text-[11px] uppercase tracking-widest t-lo font-mono">Live Theme Preview</span>
                  <span
                    class="rounded px-2 py-0.5 text-[10.5px] font-mono font-semibold"
                    :class="isNotebook
                      ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      : (isForest
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                        : 'bg-stone-500/10 text-stone-700 dark:text-stone-300 border b-line')"
                  >
                    {{ currentPresetMeta.label }}
                  </span>
                </div>
                <span class="text-[11px] font-mono t-lo">
                  {{ colorMode.value === 'dark' ? (isNotebook ? 'Slate Chalkboard' : (isForest ? 'Midnight Spruce' : 'Dark Mode')) : (isNotebook ? 'Ruled Paper' : (isForest ? 'Matcha Cream' : 'Light Mode')) }}
                </span>
              </div>

              <!-- Sample Card Demonstration -->
              <div
                class="rounded-lg border p-4 transition-all duration-200"
                :class="isNotebook
                  ? 'border-stone-800 dark:border-stone-700 bg-[var(--bg-elevated)] shadow-[3px_3px_0_var(--text-1)] dark:shadow-[3px_3px_0_rgba(0,0,0,0.5)]'
                  : 'b-line bg-elev shadow-sm'"
              >
                <!-- Sample Header & Badge -->
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider"
                    :class="isNotebook
                      ? 'bg-[var(--accent-soft)] text-[var(--accent-strong)] border border-[var(--accent-line)]'
                      : (isForest
                        ? 'bg-[var(--jade-soft)] text-[var(--jade)] border border-[var(--jade-line)]'
                        : 'bg-saffron-50 text-saffron-700 dark:bg-saffron-950/40 dark:text-saffron-300')"
                  >
                    <UIcon name="i-heroicons-sparkles" class="h-3 w-3" />
                    Geography : Drainage System
                  </span>
                  <span class="text-[11px] font-mono t-lo">TGPRB Tier-1 Note</span>
                </div>

                <!-- Sample Note Title -->
                <h3
                  class="transition-all duration-150"
                  :class="isNotebook
                    ? 'font-hand text-[22px] font-bold t-hi leading-snug tracking-wide'
                    : 'font-display text-h3 font-bold t-hi'"
                >
                  01 : The Godavari Basin & Key Tributaries
                </h3>

                <!-- Sample Text Body -->
                <p class="mt-1.5 text-[13px] leading-relaxed t-mid">
                  Peninsular India's largest river basin covering 3,12,812 sq km. Originates at Trimbakeshwar in the Western Ghats (Nasik district, Maharashtra).
                </p>

                <!-- Sample Tactile Action & Status Elements -->
                <div class="mt-3.5 flex flex-wrap items-center gap-2 pt-3 border-t b-line">
                  <button
                    type="button"
                    class="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-all"
                    :class="isNotebook
                      ? 'btn-primary bg-[var(--accent)] text-[var(--text-1)]'
                      : (isForest
                        ? 'bg-[var(--jade)] hover:opacity-95 text-white shadow-xs'
                        : 'bg-saffron-500 hover:bg-saffron-600 text-white shadow-sm')"
                  >
                    <UIcon name="i-heroicons-bolt" class="h-3.5 w-3.5" />
                    Pass Gate (3/5)
                  </button>

                  <span
                    class="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-medium"
                    :class="isNotebook
                      ? 'bg-[var(--jade-soft)] text-[var(--jade)] border border-[var(--jade-line)] font-bold'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300'"
                  >
                    <UIcon name="i-heroicons-check-circle" class="h-3.5 w-3.5" />
                    12 PYQs Verified
                  </span>

                  <span
                    class="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-medium"
                    :class="isNotebook
                      ? 'bg-[var(--bg-subtle)] text-[var(--text-2)] border border-[var(--line-strong)]'
                      : 'bg-sub text-stone-600 dark:text-stone-300 border b-line'"
                  >
                    <UIcon name="i-heroicons-document-text" class="h-3.5 w-3.5" />
                    Pranhita Confluence
                  </span>
                </div>
              </div>
            </div>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useThemePreset } from '@/composables/useThemePreset'

useHead({ title: 'Settings - StudyOS' })

const router = useRouter()
const toast = useToast()
const colorMode = useColorMode()
const { user, isLoggedIn, userEmail, displayName, loading: authLoading, signOut } = useAuth()
const { mode: flashcardUnlockMode, setMode: setFlashcardUnlockMode } = useFlashcardUnlock()
const { preset, isNotebook, isForest, currentPresetMeta, setPreset, presets: themePresets } = useThemePreset()

async function handleSignOut() {
  await signOut()
  toast.add({ title: 'Signed out successfully', color: 'gray', timeout: 2000 })
}

const flashcardUnlockOptions = [
  {
    value: 'gate' as const,
    label: 'Comprehension gate first',
    description: 'Pass the note quiz before the atomic flashcards appear.',
    icon: 'i-heroicons-lock-closed',
  },
  {
    value: 'direct' as const,
    label: 'Direct unlock',
    description: 'Show the atomic flashcards immediately without the gate.',
    icon: 'i-heroicons-lock-open',
  },
]

const sizeOptions = [
  { label: 'Small',   value: 'small'   },
  { label: 'Default', value: 'default' },
  { label: 'Large',   value: 'large'   },
]

// The multipliers for each option
const scaleMap: Record<string, string> = {
  small:   '0.875',
  default: '1',
  large:   '1.125',
}

const scaleHeading = ref<string>('default')
const scaleSubheading = ref<string>('default')
const scaleBase = ref<string>('default')

onMounted(() => {
  scaleHeading.value = localStorage.getItem('studyos-scale-heading') || 'default'
  scaleSubheading.value = localStorage.getItem('studyos-scale-subheading') || 'default'
  scaleBase.value = localStorage.getItem('studyos-scale-base') || 'default'
})

function setScale(type: 'heading' | 'subheading' | 'base', value: string) {
  if (type === 'heading') {
    scaleHeading.value = value
    localStorage.setItem('studyos-scale-heading', value)
    document.documentElement.style.setProperty('--scale-heading', scaleMap[value])
  } else if (type === 'subheading') {
    scaleSubheading.value = value
    localStorage.setItem('studyos-scale-subheading', value)
    document.documentElement.style.setProperty('--scale-subheading', scaleMap[value])
  } else if (type === 'base') {
    scaleBase.value = value
    localStorage.setItem('studyos-scale-base', value)
    document.documentElement.style.setProperty('--scale-base', scaleMap[value])
  }
}
</script>
