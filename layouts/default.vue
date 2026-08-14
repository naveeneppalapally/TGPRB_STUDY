<template>
  <div class="min-h-screen">
    <NuxtLoadingIndicator :height="2" color="#e5ad31" :throttle="150" />

    <!-- ══ Sidebar ═══════════════════════════════════════════════════════ -->
    <aside
      class="fixed inset-y-0 start-0 z-40 flex w-60 flex-col border-e b-line bg-elev transition-transform duration-200 ease-out"
      :class="[
        open ? 'translate-x-0' : '-translate-x-full',
        sidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full',
      ]"
      aria-label="Primary"
    >
      <!-- Wordmark -->
      <div class="flex h-14 items-center gap-2.5 border-b b-line px-4">
        <NuxtLink to="/" class="flex min-w-0 items-center gap-2.5" @click="open = false">
          <span class="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-gradient-to-br from-saffron-300 to-saffron-600 shadow-sm">
            <UIcon name="i-heroicons-bolt-solid" class="h-4 w-4 text-ink-950" />
          </span>
          <span class="font-display text-[15px] font-bold tracking-tight t-hi">
            Study<span class="accent">OS</span>
          </span>
        </NuxtLink>
        <!-- 2026 chip - hide on desktop to make room for toggle -->
        <span class="ms-auto chip chip-mono lg:hidden">2026</span>
        <!-- Desktop sidebar collapse toggle in sidebar header -->
        <UButton
          class="hidden lg:flex ms-auto"
          icon="i-heroicons-arrow-left-start-on-rectangle"
          color="gray"
          variant="ghost"
          size="xs"
          aria-label="Collapse sidebar"
          title="Collapse sidebar"
          @click="sidebarOpen = false"
        />
        <!-- Mobile close button -->
        <UButton
          class="lg:hidden"
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          size="xs"
          aria-label="Close sidebar"
          @click="open = false"
        />
      </div>

      <!-- Nav -->
      <nav class="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        <div>
          <p class="eyebrow px-3 pb-2">Overview</p>
          <UVerticalNavigation :links="mainLinks" />
        </div>

        <div>
          <p class="eyebrow px-3 pb-2">Subjects</p>
          <UVerticalNavigation :links="subjectLinks" />
        </div>

        <div>
          <p class="eyebrow px-3 pb-2">Practice</p>
          <UVerticalNavigation :links="practiceLinks" />
        </div>

        <div>
          <p class="eyebrow px-3 pb-2">Preferences</p>
          <UVerticalNavigation :links="prefLinks" />
        </div>
      </nav>

      <!-- Footer -->
      <div class="border-t b-line px-4 py-3">
        <div class="flex items-center justify-between">
          <span class="eyebrow">Due today</span>
          <span class="num font-display text-lg font-bold" :class="dueCount > 0 ? 'accent' : 't-lo'">
            {{ dueCount > 0 ? dueCount : '0' }}
          </span>
        </div>
        <p class="mt-1 text-[11px] leading-snug t-lo">
          FSRS queue syncs after Supabase keys are set.
        </p>
      </div>

    </aside>

    <!-- Mobile scrim -->
    <div
      v-if="open"
      class="fixed inset-0 z-30 bg-ink-950/50 backdrop-blur-sm lg:hidden"
      @click="open = false"
    />

    <!-- ══ Main ══════════════════════════════════════════════════════════ -->
    <div
      class="flex min-h-screen flex-col transition-[padding] duration-200 ease-out"
      :class="sidebarOpen ? 'lg:ps-60' : 'lg:ps-0'"
    >
      <!-- Topbar -->
      <header class="sticky top-0 z-20 flex h-14 items-center justify-between gap-4 border-b b-line bg-base-85 px-4 backdrop-blur-md sm:px-6">
        <!-- Left Section: Controls & Brand when collapsed -->
        <div class="flex items-center gap-3 min-w-0">
          <!-- Mobile hamburger -->
          <UButton
            class="lg:hidden"
            icon="i-heroicons-bars-3"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Open menu"
            @click="open = !open"
          />
          <!-- Desktop expand button - only shows when sidebar is collapsed -->
          <template v-if="!sidebarOpen">
            <UButton
              class="hidden lg:flex"
              icon="i-heroicons-arrow-right-end-on-rectangle"
              color="gray"
              variant="ghost"
              size="sm"
              aria-label="Expand sidebar"
              title="Expand sidebar"
              @click="sidebarOpen = true"
            />
            <NuxtLink to="/" class="hidden lg:flex items-center gap-2 font-display text-[15px] font-bold tracking-tight t-hi">
              <span class="grid h-6 w-6 place-items-center rounded bg-gradient-to-br from-saffron-300 to-saffron-600 shadow-sm">
                <UIcon name="i-heroicons-bolt-solid" class="h-3.5 w-3.5 text-ink-950" />
              </span>
              Study<span class="accent">OS</span>
            </NuxtLink>
          </template>
        </div>

        <!-- Center Section: Command Palette Search Bar -->
        <div class="flex flex-1 items-center justify-center max-w-md mx-auto">
          <button
            type="button"
            class="group hidden h-8 w-full max-w-md items-center gap-2 rounded-lg border b-line bg-sub px-3 text-[12.5px] t-lo transition-all duration-200 hover:b-strong hover:t-mid sm:flex"
            @click="paletteOpen = true"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="h-3.5 w-3.5 shrink-0" />
            <span class="flex-1 text-left">Search or jump to...</span>
            <UKbd>⌘K</UKbd>
          </button>
          <UButton
            class="sm:hidden"
            icon="i-heroicons-magnifying-glass"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Search"
            @click="paletteOpen = true"
          />
        </div>

        <!-- Right Section: Badges, Bell & Theme Toggle -->
        <div class="flex items-center gap-2">
          <span class="eyebrow hidden md:block">TGPRB · Constable / SI</span>

          <!-- What's New bell -->
          <ClientOnly>
            <WhatsNewSlideover />
            <template #fallback><div class="h-8 w-8" /></template>
          </ClientOnly>

          <UTooltip :text="colorMode.value === 'dark' ? 'Switch to light' : 'Switch to dark'">
            <ClientOnly>
              <UButton
                :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                color="gray"
                variant="ghost"
                size="sm"
                :aria-label="colorMode.value === 'dark' ? 'Switch to light' : 'Switch to dark'"
                @click="toggleTheme"
              />
              <template #fallback>
                <div class="h-8 w-8" />
              </template>
            </ClientOnly>
          </UTooltip>
        </div>
      </header>

      <!-- Page -->
      <main class="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
        <slot />
      </main>

      <footer class="border-t b-line">
        <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <span class="eyebrow">StudyOS · TGPRB 2026 cycle</span>
          <span class="eyebrow hidden sm:block">⌘K to navigate</span>
        </div>
      </footer>
    </div>

    <!-- ══ Command palette ═══════════════════════════════════════════════ -->
    <UModal v-model="paletteOpen" :ui="{ padding: 'p-0 sm:p-0' }">
      <UCommandPalette
        :groups="paletteGroups"
        placeholder="Search notes, subjects, actions…"
        :autoselect="true"
        @update:model-value="onCommand"
        @close="paletteOpen = false"
      />
    </UModal>

    <UNotifications />
  </div>
</template>


<script setup lang="ts">
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap',
    },
  ],
})

const open = ref(false)
const sidebarOpen = ref(true)   // desktop sidebar - true = expanded, false = collapsed
const paletteOpen = ref(false)
const dueCount = ref(0)
const colorMode = useColorMode()
const toast = useToast()
const route = useRoute()

/* Close the mobile drawer on navigation */
watch(() => route.fullPath, () => { open.value = false })

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function queuedFeature(name: string) {
  toast.add({
    title: `${name} is queued`,
    description: 'Unlocks as its topic bank is verified and notes are built.',
    icon: 'i-heroicons-clock',
    color: 'primary',
    timeout: 2600,
  })
}

const mainLinks = [
  { label: 'Dashboard', to: '/', icon: 'i-heroicons-squares-2x2', exact: true },
  { label: 'Review Queue', to: '/review', icon: 'i-heroicons-rectangle-stack' },
]

const subjects = [
  { name: 'Geography',       icon: 'i-heroicons-map',              to: '/notes/geography' },
  { name: 'Polity',          icon: 'i-heroicons-building-library' },
  { name: 'History',         icon: 'i-heroicons-clock' },
  { name: 'Science',         icon: 'i-heroicons-beaker' },
  { name: 'Economy',         icon: 'i-heroicons-banknotes' },
  { name: 'Arithmetic',      icon: 'i-heroicons-calculator' },
  { name: 'Reasoning',       icon: 'i-heroicons-puzzle-piece' },
  { name: 'Telangana',       icon: 'i-heroicons-map-pin' },
  { name: 'Ethics',          icon: 'i-heroicons-scale' },
  { name: 'English',         icon: 'i-heroicons-language' },
  { name: 'Current Affairs', icon: 'i-heroicons-newspaper', to: '/current-affairs' },
]

const subjectLinks = subjects.map(s =>
  s.to
    ? { label: s.name, icon: s.icon, to: s.to }
    : { label: s.name, icon: s.icon, click: () => queuedFeature(s.name) },
)

const practiceLinks = [
  { label: 'PYQ Archive', icon: 'i-heroicons-archive-box', to: '/pyq-archive' },
]

const prefLinks = [
  { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
]

/* ── Command palette ───────────────────────────────────────────────────── */
const paletteGroups = computed(() => [
  {
    key: 'pages',
    label: 'Go to',
    commands: [
      { id: 'dash',     label: 'Dashboard',                icon: 'i-heroicons-squares-2x2',     to: '/' },
      { id: 'review',   label: 'Review Queue',             icon: 'i-heroicons-rectangle-stack', to: '/review' },
      { id: 'ca',       label: 'Current Affairs',          icon: 'i-heroicons-newspaper',       to: '/current-affairs', suffix: 'Updated 7am daily' },
      { id: 'geo',      label: 'Geography - all topics',   icon: 'i-heroicons-map',             to: '/notes/geography' },
      { id: 'drainage',   label: 'Drainage System of India',       icon: 'i-heroicons-book-open',       to: '/notes/geography/drainage-system-of-india' },
      { id: 'irrigation', label: 'Irrigation in India & Telangana',icon: 'i-heroicons-sparkles',        to: '/notes/geography/irrigation-in-india', suffix: 'New Note' },
    ],
  },
  {
    key: 'subjects',
    label: 'Queued subjects',
    commands: subjects
      .filter(s => !s.to)
      .map(s => ({ id: `sub-${s.name}`, label: s.name, icon: s.icon, action: () => queuedFeature(s.name) })),
  },
  {
    key: 'actions',
    label: 'Actions',
    commands: [
      {
        id: 'theme',
        label: colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon',
        action: toggleTheme,
      },
      { id: 'start-review', label: 'Start review session', icon: 'i-heroicons-play', to: '/review' },
    ],
  },
])

function onCommand(cmd: any) {
  if (!cmd) return
  paletteOpen.value = false
  if (cmd.to) navigateTo(cmd.to)
  else cmd.action?.()
}

/* ── Shortcuts ─────────────────────────────────────────────────────────── */
defineShortcuts({
  meta_k: () => { paletteOpen.value = !paletteOpen.value },
  ctrl_k: () => { paletteOpen.value = !paletteOpen.value },
})
</script>
