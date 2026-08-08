<template>
  <div>
    <!-- ── Header ──────────────────────────────────────────────────────── -->
    <header class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="eyebrow mb-2">TGPRB · Constable + SI · 2026 cycle</p>
        <h1 class="font-display text-[28px] font-bold tracking-tight t-hi sm:text-[32px]">
          Dashboard
        </h1>
      </div>
      <p class="num font-mono text-[11px] uppercase tracking-[0.14em] t-lo">{{ today }}</p>
    </header>

    <!-- ── Hero - due count + agenda ───────────────────────────────────── -->
    <section class="panel relative mb-6 overflow-hidden">
      <div class="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
      <div class="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <!-- Due count -->
        <div class="flex flex-col">
          <p class="eyebrow">Cards due today</p>
          <p class="num mt-3 font-display text-[72px] font-bold leading-none tracking-tighter t-hi sm:text-[88px]">
            {{ dueCount ?? '-' }}
          </p>
          <p class="mt-3 max-w-xs text-[13px] leading-relaxed t-lo">
            FSRS-scheduled across all subjects. The queue fills in once your
            first note gate is passed.
          </p>
          <div class="mt-6 flex flex-wrap items-center gap-3">
            <UButton
              label="Start review"
              to="/review"
              icon="i-heroicons-play"
              size="lg"
              color="primary"
            />
            <UButton
              label="Read latest note"
              to="/notes/geography/drainage-system-of-india"
              color="gray"
              variant="outline"
              size="lg"
            />
            <span class="hidden items-center gap-1.5 text-[11px] t-lo sm:inline-flex">
              press <UKbd>R</UKbd> to review
            </span>
          </div>
        </div>

        <!-- Agenda -->
        <div class="flex flex-col justify-center border-t b-line pt-6 lg:border-s lg:border-t-0 lg:ps-10 lg:pt-0">
          <p class="eyebrow mb-4">Up next</p>
          <ul class="space-y-4">
            <li v-for="item in agenda" :key="item.title" class="flex items-start gap-3">
              <span class="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent-soft">
                <UIcon :name="item.icon" class="h-3.5 w-3.5 accent" />
              </span>
              <div class="min-w-0">
                <p class="text-[13px] font-medium leading-snug t-hi">{{ item.title }}</p>
                <p class="mt-0.5 text-[11.5px] t-lo">{{ item.meta }}</p>
              </div>
            </li>
          </ul>

          <!-- Syllabus progress -->
          <div class="mt-6 border-t b-line pt-4">
            <div class="mb-2 flex items-center justify-between">
              <span class="eyebrow">Syllabus live</span>
              <span class="num font-mono text-[11px] t-mid">{{ notesLive }} / {{ subjects.length }}</span>
            </div>
            <div class="h-1 w-full overflow-hidden rounded-full bg-inset">
              <div
                class="h-full rounded-full bg-gradient-to-r from-saffron-500 to-saffron-400"
                :style="{ width: (notesLive / subjects.length * 100) + '%' }"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Secondary stats ─────────────────────────────────────────────── -->
    <section class="panel mb-6 grid grid-cols-1 divide-y divide-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      <div v-for="stat in stats" :key="stat.label" class="px-6 py-5">
        <p class="eyebrow">{{ stat.label }}</p>
        <p class="num mt-2 font-display text-[26px] font-bold tracking-tight" :class="stat.dim ? 't-lo' : 't-hi'">
          {{ stat.value }}
        </p>
        <p class="mt-1 text-[11.5px] t-lo">{{ stat.hint }}</p>
      </div>
    </section>

    <!-- ── Negative marking ────────────────────────────────────────────── -->
    <div class="callout callout-red mb-10 flex items-start gap-3">
      <UIcon name="i-heroicons-exclamation-triangle" class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]" />
      <div>
        <p class="callout-title">20% negative marking</p>
        <p class="callout-body">
          Every wrong answer costs 20% of that question's marks. Drill weak cards before
          guessing - the review queue exists to protect your score, not just grow it.
        </p>
      </div>
    </div>

    <!-- ── Today's Brief ─────────────────────────────────────────────── -->
    <section v-if="briefItems.length" class="mb-10">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <h2 class="font-display text-lg font-semibold tracking-tight t-hi">Today's Brief</h2>
          <!-- Pulsing dot if added today -->
          <span v-if="addedToday > 0" class="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {{ addedToday }} added today
          </span>
        </div>
        <NuxtLink to="/current-affairs" class="eyebrow accent hover:underline flex items-center gap-1">
          View all {{ totalCA }}
          <UIcon name="i-heroicons-arrow-right" class="h-3 w-3" />
        </NuxtLink>
      </div>

      <div class="panel divide-y divide-[var(--line)] overflow-hidden">
        <!-- TG Focus items first, then others -->
        <NuxtLink
          v-for="item in briefItems"
          :key="item.id"
          :to="item.meta?.source_url || '#'"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-sub group"
          :class="item.meta?.is_telangana_focus ? 'border-l-2 border-l-saffron-500' : 'border-l-2 border-l-transparent'"
        >
          <!-- Section chip -->
          <span class="chip chip-mono shrink-0 mt-0.5 text-[10px]">
            {{ sectionAbbr(item.meta?.exam_section) }}
          </span>

          <!-- Headline -->
          <p class="flex-1 text-[13px] font-medium leading-snug t-hi line-clamp-1 group-hover:accent">
            <span
              v-if="item.meta?.is_telangana_focus"
              class="me-1.5 inline-flex items-center gap-0.5 rounded-full bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 px-1.5 py-0.5 text-[10px] font-semibold"
            >
              <UIcon name="i-heroicons-map-pin" class="h-2.5 w-2.5" />
              TG
            </span>
            {{ item.meta?.headline }}
          </p>

          <!-- Date + external icon -->
          <div class="flex shrink-0 items-center gap-2 t-lo">
            <time class="font-mono text-[10px] hidden sm:block">
              {{ formatBriefDate(item.meta?.date) }}
            </time>
            <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ── Subject coverage ────────────────────────────────────────────── -->
    <section>
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <h2 class="font-display text-lg font-semibold tracking-tight t-hi">Subject coverage</h2>
        <span class="eyebrow">Ranked by verified PYQ count</span>
      </div>

      <div class="panel overflow-x-auto">
        <table class="table-note min-w-[640px]">
          <thead>
            <tr>
              <th class="w-10 pl-4">#</th>
              <th>Subject</th>
              <th class="text-right">PYQs</th>
              <th class="w-[30%]">Coverage</th>
              <th class="w-20 pr-4 text-center">Tier</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(s, i) in rankedSubjects"
              :key="s.slug"
              class="cursor-pointer"
              @click="openSubject(s)"
            >
              <td class="pl-4 font-mono text-[11px] t-lo num">{{ String(i + 1).padStart(2, '0') }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <span class="cell-key">{{ s.name }}</span>
                  <span v-if="s.noteCount > 0" class="chip chip-jade chip-mono">
                    <span class="dot" />live
                  </span>
                </div>
              </td>
              <td class="text-right cell-num">{{ s.pyqCount }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="h-1 min-w-[72px] flex-1 overflow-hidden rounded-full bg-inset">
                    <div
                      class="h-full rounded-full"
                      :class="s.tier === 'T1' ? 'bg-saffron-500' : s.tier === 'T2' ? 'bg-sky-500' : 'bg-stone-400 dark:bg-stone-600'"
                      :style="{ width: (s.pyqCount / maxPYQ * 100) + '%' }"
                    />
                  </div>
                  <span class="num font-mono text-[10.5px] t-lo">
                    {{ Math.round(s.pyqCount / maxPYQ * 100) }}%
                  </span>
                </div>
              </td>
              <td class="pr-4 text-center">
                <span class="chip chip-mono" :class="tierChip(s.tier)">{{ s.tier }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="border-t b-line px-4 py-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo">
          Σ {{ totalPYQs }} verified PYQs · Constable + SI papers · 2015–2023
        </p>
      </div>
    </section>

    <!-- ── Continue reading ────────────────────────────────────────────── -->
    <NuxtLink
      to="/notes/geography/drainage-system-of-india"
      class="panel panel-hover group mt-6 flex items-center gap-4 p-5 sm:p-6"
    >
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft">
        <UIcon name="i-heroicons-book-open" class="h-5 w-5 accent" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="eyebrow mb-1">Continue reading</p>
        <p class="truncate font-display text-[15px] font-semibold tracking-tight t-hi">
          Drainage System of India
        </p>
        <p class="mt-0.5 text-[11.5px] t-lo">Geography · 28 verified PYQs · ~14 min</p>
      </div>
      <UIcon
        name="i-heroicons-arrow-right"
        class="h-4 w-4 shrink-0 t-lo transition-transform duration-150 group-hover:translate-x-1 group-hover:accent"
      />
    </NuxtLink>
  </div>
</template>



<script setup lang="ts">
useHead({
  title: 'Dashboard - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Personal TGPRB Constable/SI study dashboard.' }],
})

const toast = useToast()

const dueCount = ref<number | null>(null)
const reviewedTotal = ref<number | null>(null)
import { queryCollection } from '#imports'

const { data: allCA } = await useAsyncData('dashboard-ca', () =>
  queryCollection('current_affair').all()
)

const todayISO = new Date().toISOString().split('T')[0]

// TG Focus first, then others, max 5
const briefItems = computed(() => {
  if (!allCA.value) return []
  const sorted = [...allCA.value].sort(
    (a: any, b: any) => new Date(b.meta?.date).getTime() - new Date(a.meta?.date).getTime()
  )
  const tg    = sorted.filter((e: any) => e.meta?.is_telangana_focus)
  const other = sorted.filter((e: any) => !e.meta?.is_telangana_focus)
  return [...tg, ...other].slice(0, 6)
})

const addedToday = computed(() =>
  (allCA.value ?? []).filter((e: any) => (e.meta?.date ?? '') === todayISO).length
)

const totalCA = computed(() => (allCA.value ?? []).length)

function sectionAbbr(section: string): string {
  const map: Record<string, string> = {
    'Geography': 'GEO', 'Polity': 'POL', 'Economy': 'ECO',
    'Telangana': 'TEL', 'Science & Technology': 'SCI',
    'History': 'HIS', 'Arithmetic': 'ARI',
  }
  return map[section] ?? section?.slice(0, 3).toUpperCase() ?? '?'
}

function formatBriefDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

const retention = ref<string | null>(null)

const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

/* Ranked by PYQ count descending - Arithmetic first (highest weightage) */
const subjects = [
  { name: 'Arithmetic',      slug: 'arithmetic',      pyqCount: 199, noteCount: 0 },
  { name: 'Polity',          slug: 'polity',          pyqCount: 85,  noteCount: 0 },
  { name: 'Telangana',       slug: 'telangana',       pyqCount: 73,  noteCount: 0 },
  { name: 'Science',         slug: 'science',         pyqCount: 48,  noteCount: 0 },
  { name: 'History',         slug: 'history',         pyqCount: 41,  noteCount: 0 },
  { name: 'Reasoning',       slug: 'reasoning',       pyqCount: 39,  noteCount: 0 },
  { name: 'Geography',       slug: 'geography',       pyqCount: 38,  noteCount: 1 },
  { name: 'Modern History',  slug: 'modern-history',  pyqCount: 31,  noteCount: 0 },
  { name: 'Current Affairs', slug: 'current-affairs', pyqCount: 20,  noteCount: 0 },
  { name: 'English',         slug: 'english',         pyqCount: 18,  noteCount: 0 },
  { name: 'Economy',         slug: 'economy',         pyqCount: 16,  noteCount: 0 },
  { name: 'Ethics',          slug: 'ethics',          pyqCount: 7,   noteCount: 0 },
]

const maxPYQ = Math.max(...subjects.map(s => s.pyqCount))
const totalPYQs = subjects.reduce((sum, s) => sum + s.pyqCount, 0)
const notesLive = computed(() => subjects.filter(s => s.noteCount > 0).length)

const agenda = [
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Comprehension gate - Drainage System of India',
    meta: 'Pass 3 / 5 to unlock its flashcards',
  },
  {
    icon: 'i-heroicons-clipboard-document-list',
    title: '5 embedded PYQs inside the note',
    meta: 'Constable 2018 · 2022 - SI 2018',
  },
  {
    icon: 'i-heroicons-arrow-path',
    title: 'Review queue awaiting first sync',
    meta: 'Cards appear here after gate completion',
  },
]

const stats = computed(() => [
  {
    label: 'Reviewed total',
    value: reviewedTotal.value ?? '-',
    hint: 'Cards graded since day one',
    dim: reviewedTotal.value == null,
  },
  {
    label: 'Notes live',
    value: `${notesLive.value} / ${subjects.length}`,
    hint: 'Geography is the pilot subject',
    dim: false,
  },
  {
    label: '30-day retention',
    value: retention.value ?? '-',
    hint: 'Measured on graded reviews',
    dim: retention.value == null,
  },
])

function assignTier(n: number) {
  if (n >= 30) return 'T1'
  if (n >= 10) return 'T2'
  return 'T3'
}

const rankedSubjects = computed(() =>
  [...subjects]
    .sort((a, b) => b.pyqCount - a.pyqCount)
    .map(s => ({ ...s, tier: assignTier(s.pyqCount) })),
)

function tierChip(tier: string) {
  if (tier === 'T1') return 'chip-saffron'
  if (tier === 'T2') return 'chip-sky'
  return ''
}

function openSubject(s: { slug: string; name: string; noteCount: number }) {
  if (s.noteCount > 0) {
    navigateTo(`/notes/${s.slug}`)
  } else {
    toast.add({
      title: `${s.name} is queued`,
      description: 'Unlocks as its topic bank is verified and notes are built.',
      icon: 'i-heroicons-clock',
      color: 'primary',
      timeout: 2600,
    })
  }
}

/* Press R anywhere outside an input to jump to the review queue */
defineShortcuts({
  r: () => navigateTo('/review'),
})
</script>
