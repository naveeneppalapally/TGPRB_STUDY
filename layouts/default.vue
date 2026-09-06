<template>
  <div class="app-shell min-h-screen bg-base" :class="{ 'is-rail': !sidebarOpen }">
    <NuxtLoadingIndicator :height="2" color="var(--accent)" :throttle="150" />

    <!-- ══ Sidebar (desktop: fixed, collapsible to rail / mobile: drawer) ═══ -->
    <aside
      class="shell-sidebar fixed inset-y-0 start-0 z-40 flex flex-col border-e b-line bg-elev"
      :class="mobileOpen ? 'translate-x-0 shadow-pop' : '-translate-x-full lg:translate-x-0'"
      aria-label="Primary navigation"
    >
      <!-- Brand row -->
      <div class="flex h-[var(--shell-header-h)] shrink-0 items-center gap-2 border-b b-line px-3">
        <NuxtLink to="/" class="press flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-1.5 py-1" @click="mobileOpen = false">
          <span class="brand-mark grid h-8 w-8 shrink-0 place-items-center rounded-lg text-[13px] font-bold">TG</span>
          <span class="rail-hide min-w-0">
            <span class="block truncate text-[14px] font-semibold tracking-tight t-hi leading-tight">StudyOS</span>
            <span class="block truncate font-mono text-[10px] uppercase tracking-[0.12em] t-lo leading-tight">Police SI &amp; Constable</span>
          </span>
        </NuxtLink>

        <button
          type="button"
          class="press shell-focus rail-hide hidden h-8 w-8 shrink-0 place-items-center rounded-lg t-lo hover:t-hi hover:bg-sub lg:grid"
          :aria-label="sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'"
          :title="sidebarOpen ? 'Collapse sidebar (Ctrl+[)' : 'Expand sidebar (Ctrl+[)'"
          @click="toggleSidebar"
        >
          <UIcon name="i-heroicons-chevron-double-left" class="h-4 w-4" />
        </button>

        <button
          type="button"
          class="press shell-focus grid h-10 w-10 shrink-0 place-items-center rounded-lg t-lo hover:t-hi hover:bg-sub lg:hidden"
          aria-label="Close navigation"
          @click="mobileOpen = false"
        >
          <UIcon name="i-heroicons-x-mark" class="h-5 w-5" />
        </button>
      </div>

      <!-- Search trigger -->
      <div class="px-3 pt-3">
        <button
          type="button"
          class="press shell-focus group flex h-9 w-full items-center gap-2.5 rounded-lg border b-line bg-sub px-2.5 text-[13px] t-lo hover:b-strong hover:t-mid"
          title="Search (Ctrl+K)"
          @click="paletteOpen = true"
        >
          <UIcon name="i-heroicons-magnifying-glass" class="h-4 w-4 shrink-0" />
          <span class="rail-hide flex-1 text-left">Search</span>
          <UKbd class="rail-hide text-[10px]">Ctrl K</UKbd>
        </button>
      </div>

      <!-- Nav -->
      <nav class="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 scrollbar-thin">
        <ul class="space-y-0.5">
          <li v-for="link in mainLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="nav-row press shell-focus"
              :class="{ 'is-active': isActive(link.to, link.exact) }"
              :title="link.label"
              @click="mobileOpen = false"
            >
              <UIcon :name="link.icon" class="h-[18px] w-[18px] shrink-0" />
              <span class="rail-hide flex-1 truncate">{{ link.label }}</span>
              <span
                v-if="link.to === '/review' && dueCount > 0"
                class="due-pill num"
                :class="{ 'rail-dot': !sidebarOpen }"
              >
                <span class="rail-hide">{{ dueCount }}</span>
              </span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Subjects, ranked by real exam weight -->
        <div class="mt-6">
          <div class="rail-hide mb-1.5 flex items-baseline justify-between px-2.5">
            <p class="eyebrow">Subjects</p>
            <p class="eyebrow">By exam weight</p>
          </div>
          <div class="rail-only mx-auto mb-2 h-px w-6 bg-[var(--line-strong)]" aria-hidden="true" />
          <ul class="space-y-0.5">
            <li v-for="(s, i) in subjects" :key="s.name">
              <NuxtLink
                v-if="s.to"
                :to="s.to"
                class="nav-row press shell-focus"
                :class="{ 'is-active': route.path.startsWith(s.to) }"
                :title="`${s.name} (${s.weight})`"
                @click="mobileOpen = false"
              >
                <span class="subject-index num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="rail-hide flex-1 truncate">{{ s.name }}</span>
                <span class="rail-hide num font-mono text-[10.5px] t-lo">{{ s.weight }}</span>
              </NuxtLink>
              <button
                v-else
                type="button"
                class="nav-row press shell-focus is-queued"
                :title="`${s.name} (${s.weight}) - notes in preparation`"
                @click="queuedFeature(s.name)"
              >
                <span class="subject-index num">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="rail-hide flex-1 truncate">{{ s.name }}</span>
                <span class="rail-hide num font-mono text-[10.5px] t-lo">{{ s.weight }}</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Footer: settings + account -->
      <div class="shrink-0 border-t b-line p-3">
        <NuxtLink
          to="/settings"
          class="nav-row press shell-focus"
          :class="{ 'is-active': route.path === '/settings' }"
          title="Settings"
          @click="mobileOpen = false"
        >
          <UIcon name="i-heroicons-cog-6-tooth" class="h-[18px] w-[18px] shrink-0" />
          <span class="rail-hide flex-1 truncate">Settings</span>
        </NuxtLink>

        <div v-if="isLoggedIn" class="mt-2 flex items-center gap-2.5 rounded-lg px-2 py-1.5">
          <span class="avatar num">{{ (displayName || 'S')[0] }}</span>
          <div class="rail-hide min-w-0 flex-1">
            <p class="truncate text-[12.5px] font-medium t-hi leading-tight">{{ displayName || 'Student' }}</p>
            <p class="truncate text-[11px] t-lo leading-tight">Synced</p>
          </div>
          <UDropdown :items="userMenuItems" :popper="{ placement: 'top-end' }" class="rail-hide">
            <button type="button" class="press shell-focus grid h-8 w-8 place-items-center rounded-lg t-lo hover:t-hi hover:bg-sub" aria-label="Account menu">
              <UIcon name="i-heroicons-ellipsis-horizontal" class="h-4 w-4" />
            </button>
          </UDropdown>
        </div>

        <NuxtLink
          v-else
          to="/auth/login"
          class="nav-row press shell-focus mt-1"
          title="Sign in to sync progress"
          @click="mobileOpen = false"
        >
          <UIcon name="i-heroicons-arrow-right-on-rectangle" class="h-[18px] w-[18px] shrink-0" />
          <span class="rail-hide flex-1 truncate">Sign in to sync</span>
        </NuxtLink>
      </div>
    </aside>

    <!-- Mobile scrim -->
    <Transition name="scrim">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-30 lg:hidden"
        style="background: rgba(17, 18, 20, 0.45);"
        @click="mobileOpen = false"
      />
    </Transition>

    <!-- ══ Content column ═══════════════════════════════════════════════ -->
    <div class="shell-content flex min-h-screen flex-col">
      <header class="shell-header sticky top-0 z-20 flex h-[var(--shell-header-h)] items-center gap-2 border-b b-line px-3 sm:px-5">
        <button
          type="button"
          class="press shell-focus grid h-10 w-10 place-items-center rounded-lg t-mid hover:t-hi hover:bg-sub lg:hidden"
          aria-label="Open navigation"
          @click="mobileOpen = true"
        >
          <UIcon name="i-heroicons-bars-3" class="h-5 w-5" />
        </button>

        <!-- Breadcrumb-style context -->
        <div class="flex min-w-0 flex-1 items-center gap-2 text-[13px]">
          <span class="truncate font-medium t-hi">{{ currentSectionLabel }}</span>
          <span v-if="todayLabel" class="hidden items-center gap-2 sm:flex">
            <span class="h-3 w-px bg-[var(--line-strong)]" aria-hidden="true" />
            <span class="num font-mono text-[11px] t-lo">{{ todayLabel }}</span>
          </span>
        </div>

        <!-- Right cluster -->
        <div class="flex items-center gap-1">
          <NuxtLink
            v-if="dueCount > 0 && route.path !== '/review'"
            to="/review"
            class="press shell-focus hidden h-8 items-center gap-1.5 rounded-lg border b-line bg-sub px-2.5 text-[12px] font-medium t-mid hover:b-strong hover:t-hi sm:inline-flex"
          >
            <span class="h-1.5 w-1.5 rounded-full" style="background: var(--accent);" />
            <span class="num">{{ dueCount }} due</span>
          </NuxtLink>

          <button
            type="button"
            class="press shell-focus grid h-10 w-10 place-items-center rounded-lg t-mid hover:t-hi hover:bg-sub sm:hidden"
            aria-label="Search"
            @click="paletteOpen = true"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="h-[18px] w-[18px]" />
          </button>

          <WhatsNewSlideover />

          <ClientOnly>
            <button
              type="button"
              class="press shell-focus grid h-10 w-10 place-items-center rounded-lg t-mid hover:t-hi hover:bg-sub"
              :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
              @click="toggleTheme"
            >
              <UIcon :name="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'" class="h-[18px] w-[18px]" />
            </button>
            <template #fallback>
              <span class="h-10 w-10" />
            </template>
          </ClientOnly>
        </div>
      </header>

      <main class="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-6 sm:px-8 sm:pb-12 sm:pt-8 lg:pb-12">
        <slot />
      </main>

      <footer class="hidden border-t b-line sm:block">
        <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <span class="text-[11.5px] t-lo">StudyOS for Telangana State Police exams</span>
          <span class="font-mono text-[10.5px] t-lo">Ctrl K search</span>
        </div>
      </footer>
    </div>

    <!-- ══ Mobile bottom tab bar ═══════════════════════════════════════ -->
    <nav class="tab-bar fixed inset-x-0 bottom-0 z-30 border-t b-line bg-elev lg:hidden" aria-label="Quick navigation">
      <ul class="grid grid-cols-5">
        <li v-for="link in tabLinks" :key="link.to">
          <NuxtLink
            :to="link.to"
            class="tab-item press"
            :class="{ 'is-active': isActive(link.to, link.exact) }"
          >
            <span class="relative">
              <UIcon :name="link.icon" class="h-[21px] w-[21px]" />
              <span v-if="link.to === '/review' && dueCount > 0" class="tab-dot" />
            </span>
            <span class="text-[10.5px] font-medium leading-none">{{ link.short }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- ══ Command palette ═════════════════════════════════════════════ -->
    <UModal v-model="paletteOpen" :ui="{ padding: 'p-0 sm:p-0', width: 'w-full sm:max-w-lg' }">
      <UCommandPalette
        :groups="paletteGroups"
        placeholder="Search pages, subjects, actions"
        :autoselect="true"
        @update:model-value="onCommand"
        @close="paletteOpen = false"
      />
    </UModal>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
const mobileOpen = ref(false)
const sidebarOpen = ref(true)
const paletteOpen = ref(false)
const dueCount = ref(0)
const colorMode = useColorMode()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, userEmail, displayName, signOut } = useAuth()

/* ── Sidebar state (persisted) ─────────────────────────────────────────── */
onMounted(() => {
  const saved = localStorage.getItem('studyos:sidebar-open')
  if (saved !== null) sidebarOpen.value = saved === 'true'
  updateDueCount()
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  localStorage.setItem('studyos:sidebar-open', String(sidebarOpen.value))
}

watch(() => route.fullPath, () => {
  mobileOpen.value = false
  updateDueCount()
})
watch(user, updateDueCount)

/* ── Due count from local FSRS state ───────────────────────────────────── */
function updateDueCount() {
  if (!import.meta.client) return
  const uid = user.value?.id || 'guest'
  try {
    let raw = localStorage.getItem(`studyos:fsrs:card-states:${uid}`)
    if (!raw && !user.value) raw = localStorage.getItem('studyos:fsrs:card-states')
    if (raw) {
      const states = JSON.parse(raw)
      const now = Date.now()
      dueCount.value = Object.values(states).filter((s: any) => s?.fsrs?.due && new Date(s.fsrs.due).getTime() <= now).length
      return
    }
  } catch {}
  dueCount.value = 0
}

/* ── Theme ─────────────────────────────────────────────────────────────── */
function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

/* ── Navigation data ───────────────────────────────────────────────────── */
const mainLinks = [
  { label: 'Home',              to: '/',                icon: 'i-heroicons-home',            exact: true },
  { label: 'Daily Review',      to: '/review',          icon: 'i-heroicons-rectangle-stack' },
  { label: 'Question Archive',  to: '/pyq-archive',     icon: 'i-heroicons-archive-box' },
  { label: 'Current Affairs',   to: '/current-affairs', icon: 'i-heroicons-newspaper' },
  { label: 'My Notes & Doubts', to: '/my-notes',        icon: 'i-heroicons-pencil-square' },
]

const tabLinks = [
  { short: 'Home',    to: '/',                icon: 'i-heroicons-home',            exact: true },
  { short: 'Review',  to: '/review',          icon: 'i-heroicons-rectangle-stack' },
  { short: 'Archive', to: '/pyq-archive',     icon: 'i-heroicons-archive-box' },
  { short: 'News',    to: '/current-affairs', icon: 'i-heroicons-newspaper' },
  { short: 'Notes',   to: '/my-notes',        icon: 'i-heroicons-pencil-square' },
]

/* Ranked strictly by verified PYQ share (data/pyq_enriched_master.json). */
const subjects = [
  { name: "Arithmetic",                   weight: "21.6%" },
  { name: "Reasoning",                    weight: "18.7%" },
  { name: "Telangana History & Movement", icon: "i-heroicons-map-pin",          to: "/notes/telangana", weight: "11.7%" },
  { name: "Indian History",               weight: "10.5%" },
  { name: "Geography",                    icon: "i-heroicons-map",              to: "/notes/geography", weight: "10.4%" },
  { name: "General Science",              weight: "9.8%" },
  { name: "Indian Polity",                icon: "i-heroicons-building-library", to: "/notes/polity",    weight: "6.5%" },
  { name: "Indian Economy",               weight: "5.9%" },
  { name: "English",                      weight: "4.9%" },
]

function isActive(to: string, exact?: boolean) {
  return exact ? route.path === to : route.path === to || route.path.startsWith(to + '/')
}

const currentSectionLabel = computed(() => {
  const p = route.path
  if (p === '/') return 'Home'
  const main = mainLinks.find(l => p === l.to || p.startsWith(l.to + '/'))
  if (main) return main.label
  if (p.startsWith('/settings')) return 'Settings'
  if (p.startsWith('/auth')) return 'Account'
  const subj = subjects.find(s => s.to && p.startsWith(s.to))
  if (subj) return subj.name
  return 'StudyOS'
})

const todayLabel = computed(() =>
  new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
)

function queuedFeature(name: string) {
  toast.add({
    title: `${name} notes are in preparation`,
    description: 'Verified PYQs for this subject are available in the Question Archive now.',
    icon: 'i-heroicons-clock',
    color: 'gray',
    timeout: 2600,
  })
}

/* ── Account menu ──────────────────────────────────────────────────────── */
const userMenuItems = computed(() => [
  [{ label: userEmail.value || 'Account', disabled: true }],
  [
    { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', click: () => router.push('/settings') },
    {
      label: 'Sign out',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: async () => {
        await signOut()
        toast.add({ title: 'Signed out', color: 'gray', timeout: 2000 })
        router.push('/')
      },
    },
  ],
])

/* ── Command palette ───────────────────────────────────────────────────── */
const paletteGroups = computed(() => [
  {
    key: 'pages',
    label: 'Go to',
    commands: [
      ...mainLinks.map(l => ({ id: l.to, label: l.label, icon: l.icon, to: l.to })),
      { id: '/settings', label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
    ],
  },
  {
    key: 'subjects',
    label: 'Subjects',
    commands: subjects
      .filter(s => s.to)
      .map(s => ({ id: s.to!, label: s.name, icon: s.icon, to: s.to, suffix: s.weight })),
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
      {
        id: 'sidebar',
        label: sidebarOpen.value ? 'Collapse sidebar' : 'Expand sidebar',
        icon: 'i-heroicons-chevron-double-left',
        action: toggleSidebar,
      },
    ],
  },
])

function onCommand(cmd: any) {
  if (!cmd) return
  paletteOpen.value = false
  if (cmd.to) navigateTo(cmd.to)
  else cmd.action?.()
}

defineShortcuts({
  meta_k: () => { paletteOpen.value = !paletteOpen.value },
  ctrl_k: () => { paletteOpen.value = !paletteOpen.value },
  meta_bracket_left: toggleSidebar,
  ctrl_bracket_left: toggleSidebar,
})
</script>

<style scoped>
/* ── Geometry: sidebar width drives content offset, both animate on transform-free properties ── */
.shell-sidebar {
  width: var(--shell-sidebar-w);
  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), width 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease;
  will-change: transform;
}
.shell-header {
  background-color: color-mix(in srgb, var(--bg) 88%, transparent);
  backdrop-filter: saturate(1.1) blur(8px);
  -webkit-backdrop-filter: saturate(1.1) blur(8px);
}
@media (min-width: 1024px) {
  .shell-content {
    padding-inline-start: var(--shell-sidebar-w);
    transition: padding-inline-start 200ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .is-rail .shell-sidebar { width: var(--shell-rail-w); }
  .is-rail .shell-content { padding-inline-start: var(--shell-rail-w); }

  /* Rail mode: hide labels, centre icons, show a small expand affordance */
  .is-rail .rail-hide { display: none; }
  .is-rail .rail-only { display: block; }
  .is-rail .nav-row { justify-content: center; padding-inline: 0; }
  .is-rail .brand-mark { margin-inline: auto; }
}
.rail-only { display: none; }

/* ── Brand ── */
.brand-mark {
  background: var(--text-1);
  color: var(--bg-elevated);
  letter-spacing: -0.02em;
}

/* ── Nav rows ── */
.nav-row {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
  min-height: 38px;
  padding: 0 10px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-2);
  text-align: left;
}
.nav-row:hover { color: var(--text-1); background: var(--bg-subtle); }
.nav-row.is-active {
  color: var(--text-1);
  background: var(--bg-subtle);
  font-weight: 600;
}
.nav-row.is-active::before {
  content: '';
  position: absolute;
  inset-block: 9px;
  inset-inline-start: -12px;
  width: 3px;
  border-radius: 999px;
  background: var(--accent);
}
.is-rail .nav-row.is-active::before { inset-inline-start: -12px; }
.nav-row.is-queued { color: var(--text-3); }
.nav-row.is-queued:hover { color: var(--text-2); }

.subject-index {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 6px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10.5px;
  font-weight: 600;
  color: var(--text-3);
  background: var(--bg-inset);
}
.nav-row.is-active .subject-index { color: var(--accent-strong); background: var(--accent-soft); }

.due-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--accent-strong);
  background: var(--accent-soft);
  border: 1px solid var(--accent-line);
}
.due-pill.rail-dot {
  position: absolute;
  top: 7px;
  right: 14px;
  min-width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  background: var(--accent);
}

.avatar {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 999px;
  background: var(--bg-inset);
  color: var(--text-1);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

/* ── Mobile tab bar ── */
.tab-bar { padding-bottom: env(safe-area-inset-bottom, 0px); }
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 58px;
  color: var(--text-3);
}
.tab-item.is-active { color: var(--text-1); }
.tab-item.is-active > span:first-child::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -9px;
  width: 16px;
  height: 2px;
  border-radius: 999px;
  background: var(--accent);
  transform: translateX(-50%);
}
.tab-dot {
  position: absolute;
  top: -2px;
  right: -3px;
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 2px var(--bg-elevated);
}

/* ── Scrim fade ── */
.scrim-enter-active, .scrim-leave-active { transition: opacity 180ms ease; }
.scrim-enter-from, .scrim-leave-to { opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .shell-sidebar, .shell-content { transition: none !important; }
}
</style>
