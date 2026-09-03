<template>
  <div class="min-h-screen bg-base">
    <NuxtLoadingIndicator :height="2" color="#e5ad31" :throttle="150" />

    <!-- ══ Unified Sidebar (Desktop Expandable & Mobile Slideover) ════════ -->
    <aside
      class="sidebar-shutter fixed inset-y-0 start-0 z-40 flex w-64 flex-col border-e b-line bg-elev"
      :class="[
        open ? 'translate-x-0 shadow-2xl' : '-translate-x-full',
        sidebarOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full',
      ]"
      aria-label="Primary Navigation"
    >
      <!-- Sidebar Header: Brand + Collapse Toggle Button -->
      <div class="flex h-14 items-center justify-between border-b b-line px-3.5">
        <!-- Brand with StudyOS Logo -->
        <NuxtLink to="/" class="group flex items-center gap-2.5 min-w-0" @click="open = false">
          <div class="grid place-items-center rounded-lg p-1 transition-transform group-hover:scale-105">
            <StudyOsIcon size="sm" />
          </div>
          <span class="font-display text-[16px] font-bold tracking-tight t-hi">
            Study<span class="accent">OS</span>
          </span>
          <span class="chip chip-mono text-[9px] px-1.5 py-0.5 font-semibold">2026</span>
        </NuxtLink>

        <!-- Header Action Controls -->
        <div class="flex items-center gap-1">
          <!-- Desktop Sidebar Collapse Toggle Button -->
          <UTooltip text="Close sidebar (⌘[)" :popper="{ placement: 'bottom' }">
            <button
              type="button"
              class="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border b-line bg-sub text-mid hover:t-hi hover:b-strong hover:bg-elev transition-colors active:scale-95"
              aria-label="Close sidebar"
              @click="toggleSidebar"
            >
              <SidebarToggleIcon size="sm" />
            </button>
          </UTooltip>

          <!-- Mobile Close Button -->
          <UButton
            class="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            icon="i-heroicons-x-mark"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Close sidebar"
            @click="open = false"
          />
        </div>
      </div>

      <!-- Quick Action / Search Trigger Button -->
      <div class="px-3 pt-3 pb-1">
        <button
          type="button"
          class="group flex w-full items-center justify-between rounded-lg border b-line bg-sub px-3 py-2 text-xs transition-all hover:b-strong hover:bg-base"
          @click="paletteOpen = true"
        >
          <div class="flex items-center gap-2 t-mid group-hover:t-hi">
            <UIcon name="i-heroicons-magnifying-glass" class="h-4 w-4 accent" />
            <span class="font-medium">Search notes & PYQs</span>
          </div>
          <UKbd class="text-[10px]">⌘K</UKbd>
        </button>
      </div>

      <!-- Nav Links & High-Yield Topic Notes -->
      <nav class="flex-1 space-y-4 overflow-y-auto px-3 py-2 scrollbar-thin">
        <!-- Main Hub Links -->
        <div>
          <p class="eyebrow px-2.5 pb-1">Overview</p>
          <div class="space-y-0.5">
            <NuxtLink
              v-for="link in mainLinks"
              :key="link.to"
              :to="link.to"
              class="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] transition-colors"
              :class="route.path === link.to ? 'bg-accent-soft t-hi font-semibold' : 't-mid hover:t-hi hover:bg-sub'"
              @click="open = false"
            >
              <div class="flex items-center gap-2.5">
                <UIcon :name="link.icon" class="h-4 w-4 shrink-0" :class="route.path === link.to ? 'accent' : 't-lo'" />
                <span>{{ link.label }}</span>
              </div>
              <span
                v-if="link.badge !== undefined && link.badge > 0"
                class="rounded-full bg-saffron-500/15 px-2 py-0.5 text-[10px] font-mono font-bold text-saffron-600 dark:text-saffron-400"
              >
                {{ link.badge }}
              </span>
            </NuxtLink>
          </div>
        </div>

        <!-- High-Yield Topic Notes -->
        <div>
          <div class="flex items-center justify-between px-2.5 pb-1">
            <p class="eyebrow">Verified Topic Notes</p>
            <span class="font-mono text-[10px] t-lo">7 live</span>
          </div>
          <div class="space-y-0.5">
            <NuxtLink
              v-for="note in highYieldNotes"
              :key="note.to"
              :to="note.to"
              class="group flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors"
              :class="route.path === note.to ? 'bg-accent-soft t-hi font-semibold' : 't-mid hover:t-hi hover:bg-sub'"
              @click="open = false"
            >
              <span
                class="h-1.5 w-1.5 rounded-full shrink-0 transition-colors"
                :class="route.path === note.to ? 'bg-saffron-500 ring-2 ring-saffron-400/30' : 'bg-stone-300 dark:bg-stone-700 group-hover:bg-saffron-400'"
              />
              <span class="truncate flex-1">{{ note.label }}</span>
              <span class="font-mono text-[9px] t-lo shrink-0">{{ note.section }}</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Subject Banks -->
        <div>
          <p class="eyebrow px-2.5 pb-1">Subject Banks</p>
          <div class="grid grid-cols-2 gap-1">
            <button
              v-for="s in subjects"
              :key="s.name"
              type="button"
              class="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[11.5px] text-left transition-colors border border-transparent hover:border-b-line hover:bg-sub"
              :class="s.to && route.path.startsWith(s.to) ? 'bg-sub t-hi font-medium border-b-line' : 't-lo hover:t-mid'"
              @click="s.to ? (open = false, router.push(s.to)) : queuedFeature(s.name)"
            >
              <UIcon :name="s.icon" class="h-3.5 w-3.5 shrink-0 accent" />
              <span class="truncate">{{ s.name }}</span>
            </button>
          </div>
        </div>

        <!-- Preferences -->
        <div>
          <p class="eyebrow px-2.5 pb-1">Preferences</p>
          <NuxtLink
            to="/settings"
            class="flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13px] transition-colors"
            :class="route.path === '/settings' ? 'bg-accent-soft t-hi font-semibold' : 't-mid hover:t-hi hover:bg-sub'"
            @click="open = false"
          >
            <UIcon name="i-heroicons-cog-6-tooth" class="h-4 w-4" :class="route.path === '/settings' ? 'accent' : 't-lo'" />
            <span>Preferences & Themes</span>
          </NuxtLink>
        </div>
      </nav>

      <!-- Sidebar Footer: Profile & Account -->
      <div class="border-t b-line p-3">
        <!-- Authenticated Profile -->
        <div v-if="isLoggedIn" class="flex items-center justify-between gap-2 rounded-xl bg-sub p-2 border b-line">
          <div class="flex items-center gap-2 min-w-0">
            <div class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron-500 text-[11px] font-bold text-white uppercase shadow-xs">
              {{ (displayName || 'U')[0] }}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-[12px] font-semibold t-hi leading-tight">{{ displayName || 'Student' }}</p>
              <p class="truncate font-mono text-[10px] t-lo">TGPRB 2026</p>
            </div>
          </div>
          <UDropdown :items="userMenuItems" :popper="{ placement: 'top-end' }">
            <button
              type="button"
              class="flex h-7 w-7 items-center justify-center rounded-lg t-lo hover:t-hi hover:bg-elev transition-colors"
              aria-label="Account options"
            >
              <UIcon name="i-heroicons-ellipsis-vertical" class="h-4 w-4" />
            </button>
          </UDropdown>
        </div>

        <!-- Guest Sign In -->
        <div v-else class="flex items-center justify-between rounded-xl bg-sub p-2 border b-line">
          <div class="min-w-0">
            <p class="text-[12px] font-semibold t-hi leading-tight">Guest Mode</p>
            <p class="font-mono text-[10px] t-lo">Local study cache</p>
          </div>
          <UButton
            to="/auth/login"
            color="primary"
            variant="soft"
            size="xs"
            label="Sign In"
            icon="i-heroicons-arrow-right-on-rectangle"
            class="font-semibold"
          />
        </div>
      </div>
    </aside>

    <!-- Mobile Scrim Backdrop -->
    <div
      v-if="open"
      class="fixed inset-0 z-30 bg-ink-950/60 backdrop-blur-xs lg:hidden transition-opacity"
      @click="open = false"
    />

    <!-- ══ Main Content Area ═════════════════════════════════════════════ -->
    <div
      class="content-shell flex min-h-screen flex-col"
      :class="[sidebarOpen ? 'lg:ps-64' : 'lg:ps-0']"
    >
      <!-- Topbar Header Navigation -->
      <header class="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b b-line bg-base/85 px-4 backdrop-blur-md sm:px-6">
        <!-- Left Section: Toggle & Brand (when collapsed) -->
        <div class="flex items-center gap-2.5 min-w-0">
          <!-- Mobile Hamburger Menu Button -->
          <UButton
            class="lg:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            icon="i-heroicons-bars-3"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Open navigation menu"
            @click="open = !open"
          />

          <!-- ZLS Bounded Expand Button (Pre-Reserved 36px Container) -->
          <div class="hidden lg:flex w-9 h-9 items-center justify-center shrink-0">
            <UTooltip v-if="!sidebarOpen" text="Open sidebar (⌘[)" :popper="{ placement: 'bottom-start' }">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-lg border b-line bg-sub text-mid hover:t-hi hover:b-strong hover:bg-elev transition-colors active:scale-95"
                aria-label="Open sidebar"
                @click="toggleSidebar"
              >
                <SidebarToggleIcon size="sm" />
              </button>
            </UTooltip>
          </div>

          <span class="eyebrow hidden sm:block truncate">
            TGPRB · Constable & SI
          </span>
        </div>

        <!-- Center Section: Command Palette Search Bar -->
        <div class="flex flex-1 items-center justify-center max-w-md mx-auto">
          <button
            type="button"
            class="group hidden h-8 w-full max-w-md items-center gap-2 rounded-lg border b-line bg-sub px-3 text-[12.5px] t-lo transition-all duration-200 hover:b-strong hover:t-mid sm:flex"
            @click="paletteOpen = true"
          >
            <UIcon name="i-heroicons-magnifying-glass" class="h-3.5 w-3.5 shrink-0" />
            <span class="flex-1 text-left">Search notes, PYQs, topics…</span>
            <UKbd class="text-[10px]">⌘K</UKbd>
          </button>
          <UButton
            class="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center"
            icon="i-heroicons-magnifying-glass"
            color="gray"
            variant="ghost"
            size="sm"
            aria-label="Search"
            @click="paletteOpen = true"
          />
        </div>

        <!-- Right Section: Badges, Bell, Theme Toggle & User Profile -->
        <div class="flex items-center gap-2">
          <!-- Due Flashcards Chip -->
          <NuxtLink
            v-if="dueCount > 0"
            to="/review"
            class="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-body-xs font-mono font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            <UIcon name="i-heroicons-bolt" class="h-3.5 w-3.5" />
            <span>{{ dueCount }} due</span>
          </NuxtLink>

          <!-- What's New Slideover Notification Bell -->
          <WhatsNewSlideover />

          <!-- Theme Mode Switcher -->
          <UButton
            :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            color="gray"
            variant="ghost"
            size="sm"
            class="min-h-[44px] min-w-[44px] flex items-center justify-center"
            :aria-label="colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          />

          <!-- User Profile Dropdown -->
          <UDropdown
            v-if="isLoggedIn"
            :items="userMenuItems"
            :popper="{ placement: 'bottom-end' }"
          >
            <button
              type="button"
              class="flex items-center justify-center min-h-[44px] min-w-[44px] rounded-full border b-line bg-sub p-1 hover:border-saffron-400 transition-colors"
              :title="userEmail || 'Account'"
            >
              <span class="grid h-6 w-6 place-items-center rounded-full bg-saffron-500 text-[11px] font-bold text-white uppercase">
                {{ (displayName || 'U')[0] }}
              </span>
            </button>
          </UDropdown>

          <UButton
            v-else
            to="/auth/login"
            color="primary"
            variant="soft"
            size="xs"
            label="Sign In"
            icon="i-heroicons-arrow-right-on-rectangle"
            class="font-semibold"
          />
        </div>
      </header>

      <!-- Main Page Slot -->
      <main class="mx-auto w-full max-w-6xl flex-1 px-5 py-8 sm:px-8 sm:py-10">
        <slot />
      </main>

      <!-- Page Footer -->
      <footer class="border-t b-line bg-sub/30">
        <div class="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <div class="flex items-center gap-2">
            <StudyOsIcon size="xs" />
            <span class="eyebrow">StudyOS · TGPRB 2026 cycle</span>
          </div>
          <span class="eyebrow hidden sm:block">⌘K search · ⌘[ toggle sidebar</span>
        </div>
      </footer>
    </div>

    <!-- ══ Command Palette ════════════════════════════════════════════════ -->
    <UModal v-model="paletteOpen" :ui="{ padding: 'p-0 sm:p-0' }">
      <div class="command-palette-container">
        <UCommandPalette
          :groups="paletteGroups"
          placeholder="Search notes, subjects, practice questions, actions…"
          :autoselect="true"
          @update:model-value="onCommand"
          @close="paletteOpen = false"
        />
      </div>
    </UModal>

    <UNotifications />
  </div>
</template>

<script setup lang="ts">
import StudyOsIcon from "@/components/icons/StudyOsIcon.vue"
import SidebarToggleIcon from "@/components/icons/SidebarToggleIcon.vue"

useHead({
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Telugu:wght@400;500;600;700&family=Patrick+Hand&family=Space+Grotesk:wght@500;600;700&display=swap",
    },
  ],
})

const open = ref(false)
const sidebarOpen = ref(true)   // desktop sidebar: true = open (256px), false = closed (0px)
const paletteOpen = ref(false)
const dueCount = ref(0)
const colorMode = useColorMode()
const toast = useToast()
const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, userEmail, displayName, signOut } = useAuth()

/* Initialize and persist sidebar state */
onMounted(() => {
  if (import.meta.client) {
    const savedSidebar = localStorage.getItem("studyos:sidebar-open")
    if (savedSidebar !== null) {
      sidebarOpen.value = savedSidebar === "true"
    }
  }
  updateDueCount()
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  if (import.meta.client) {
    localStorage.setItem("studyos:sidebar-open", String(sidebarOpen.value))
  }
}

/* Close the mobile drawer on route navigation */
watch(() => route.fullPath, () => {
  open.value = false
})

function updateDueCount() {
  if (!import.meta.client) return
  const uid = user.value?.id || "guest"
  const key = `studyos:fsrs:card-states:${uid}`
  try {
    let raw = localStorage.getItem(key)
    if (!raw && !user.value) raw = localStorage.getItem("studyos:fsrs:card-states")
    if (raw) {
      const states = JSON.parse(raw)
      const now = new Date()
      const due = Object.values(states).filter((s: any) => {
        return s?.fsrs?.due ? new Date(s.fsrs.due) <= now : false
      })
      dueCount.value = due.length
      return
    }
  } catch {}
  dueCount.value = 0
}

watch([user, () => route.fullPath], () => {
  updateDueCount()
})

const userMenuItems = computed(() => [
  [
    {
      label: userEmail.value || 'Account',
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Review Queue",
      icon: "i-heroicons-rectangle-stack",
      click: () => router.push("/review"),
    },
    {
      label: "My Notes",
      icon: "i-heroicons-pencil-square",
      click: () => router.push("/my-notes"),
    },
    {
      label: "Settings",
      icon: "i-heroicons-cog-6-tooth",
      click: () => router.push("/settings"),
    },
  ],
  [
    {
      label: "Sign Out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await signOut()
        toast.add({ title: "Signed out", color: "gray", timeout: 2000 })
        router.push("/")
      },
    },
  ],
])

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark"
}

function queuedFeature(name: string) {
  toast.add({
    title: `${name} is queued`,
    description: "Unlocks as its topic bank is verified and notes are built.",
    icon: "i-heroicons-clock",
    color: "primary",
    timeout: 2600,
  })
}

const mainLinks = computed(() => [
  { label: "Dashboard", to: "/", icon: "i-heroicons-squares-2x2", exact: true },
  { label: "PYQ Archive", to: "/pyq-archive", icon: "i-heroicons-archive-box" },
  { label: "Review Queue", to: "/review", icon: "i-heroicons-rectangle-stack", badge: dueCount.value },
  { label: "Current Affairs", to: "/current-affairs", icon: "i-heroicons-newspaper" },
  { label: "My Notes & Doubts", to: "/my-notes", icon: "i-heroicons-pencil-square" },
])

const highYieldNotes = [
  { label: "Drainage System of India", to: "/notes/geography/drainage-system-of-india", section: "GEO" },
  { label: "Dams & Reservoirs in India", to: "/notes/geography/dams-in-india", section: "GEO" },
  { label: "Mountains & Passes in India", to: "/notes/geography/mountains-in-india", section: "GEO" },
  { label: "Forests of India", to: "/notes/geography/forests-in-india", section: "GEO" },
  { label: "Irrigation in India & TG", to: "/notes/geography/irrigation-in-india", section: "GEO" },
  { label: "Constitutional Framework & Preamble", to: "/notes/polity/constitutional-framework-and-preamble", section: "POL" },
  { label: "Telangana Statehood Movement", to: "/notes/telangana/telangana-statehood-movement", section: "TEL" },
]

const subjects = [
  { name: "Geography",       icon: "i-heroicons-map",              to: "/notes/geography" },
  { name: "Polity",          icon: "i-heroicons-building-library", to: "/notes/polity" },
  { name: "Telangana",       icon: "i-heroicons-map-pin",          to: "/notes/telangana" },
  { name: "History",         icon: "i-heroicons-clock" },
  { name: "Science",         icon: "i-heroicons-beaker" },
  { name: "Economy",         icon: "i-heroicons-banknotes" },
  { name: "Arithmetic",      icon: "i-heroicons-calculator" },
  { name: "Reasoning",       icon: "i-heroicons-puzzle-piece" },
  { name: "Current Affairs", icon: "i-heroicons-newspaper",        to: "/current-affairs" },
  { name: "English",         icon: "i-heroicons-language" },
]

/* ── Command palette ───────────────────────────────────────────────────── */
const paletteGroups = computed(() => [
  {
    key: "pages",
    label: "Navigate to",
    commands: [
      { id: "dash",      label: "Dashboard",                       icon: "i-heroicons-squares-2x2",     to: "/" },
      { id: "review",    label: "Review Queue (FSRS)",             icon: "i-heroicons-rectangle-stack", to: "/review" },
      { id: "pyq",       label: "PYQ Archive (3,129 Questions)",   icon: "i-heroicons-archive-box",     to: "/pyq-archive" },
      { id: "my-notes",  label: "My Personal Notes & Doubts",      icon: "i-heroicons-pencil-square",   to: "/my-notes" },
      { id: "ca",        label: "Current Affairs Hub",             icon: "i-heroicons-newspaper",       to: "/current-affairs", suffix: "Updated daily" },
      { id: "settings",  label: "Preferences & Theme Customizer",  icon: "i-heroicons-cog-6-tooth",     to: "/settings" },
    ],
  },
  {
    key: "notes",
    label: "Verified Topic Notes",
    commands: highYieldNotes.map(n => ({
      id: `note-${n.section}-${n.label}`,
      label: n.label,
      icon: "i-heroicons-book-open",
      to: n.to,
      suffix: n.section,
    })),
  },
  {
    key: "actions",
    label: "Actions & Tools",
    commands: [
      {
        id: "toggle-sidebar",
        label: sidebarOpen.value ? "Collapse Sidebar" : "Expand Sidebar",
        icon: "i-heroicons-bars-3-bottom-left",
        action: toggleSidebar,
      },
      {
        id: "theme",
        label: colorMode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
        icon: colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon',
        action: toggleTheme,
      },
      { id: "start-review", label: "Start FSRS Review Session", icon: "i-heroicons-play", to: "/review" },
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
  meta_bracket_left: () => { toggleSidebar() },
  ctrl_bracket_left: () => { toggleSidebar() },
})
</script>

<style scoped>
.sidebar-shutter {
  will-change: transform;
  transition: transform 190ms cubic-bezier(0.16, 1, 0.3, 1);
}

@media (min-width: 1024px) {
  .content-shell {
    contain: layout;
  }
}

/* -- Raycast/Linear-Calibrated ⌘K Scale-Spring Physics ---------------- */
.command-palette-container {
  animation: modalScaleSpring 160ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  will-change: transform, opacity;
}

@keyframes modalScaleSpring {
  0% {
    opacity: 0;
    transform: scale(0.96) translateY(-8px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .sidebar-shutter {
    transition: none !important;
  }
  .command-palette-container {
    animation: none !important;
  }
}
</style>
