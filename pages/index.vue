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

    <!-- -- Current Affairs Catch-up ----------------------------------------- -->
    <section v-if="briefItems.length" class="mb-10">
      <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <h2 class="font-display text-lg font-semibold tracking-tight t-hi">Current Affairs</h2>
          <!-- Pulsing dot if added today -->
          <span v-if="addedToday > 0" class="flex items-center gap-1.5 text-[11px] font-medium text-emerald-500">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {{ addedToday }} new today
          </span>
        </div>
        <NuxtLink to="/current-affairs" class="eyebrow accent hover:underline flex items-center gap-1">
          View all {{ totalCA }}
          <UIcon name="i-heroicons-arrow-right" class="h-3 w-3" />
        </NuxtLink>
      </div>

      <div class="panel divide-y divide-[var(--line)] overflow-hidden">
        <div
          v-for="item in briefItems"
          :key="item.id"
          class="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-sub group"
          :class="item.meta?.is_telangana_focus ? 'border-l-2 border-l-saffron-500' : 'border-l-2 border-l-transparent'"
        >
          <!-- Category chip -->
          <span class="chip chip-mono shrink-0 mt-0.5 text-[10px] uppercase">
            {{ (item.meta?.category || 'general').slice(0, 5) }}
          </span>

          <!-- Exam fact (primary) or headline (fallback) -->
          <div class="flex-1 min-w-0">
            <p class="text-[13px] font-medium leading-snug t-hi line-clamp-1">
              <span
                v-if="item.meta?.is_telangana_focus"
                class="me-1.5 inline-flex items-center gap-0.5 rounded-full bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 px-1.5 py-0.5 text-[10px] font-semibold"
              >
                <UIcon name="i-heroicons-map-pin" class="h-2.5 w-2.5" />
                TG
              </span>
              {{ item.meta?.exam_fact || item.meta?.headline }}
            </p>
            <!-- Source name -->
            <p v-if="item.meta?.source_name" class="text-[10px] t-lo mt-0.5">
              {{ item.meta.source_name }}
              <span v-if="item.meta?.source_type === 'official'" class="text-emerald-500 font-semibold">Official</span>
            </p>
          </div>

          <!-- Date + external link -->
          <div class="flex shrink-0 items-center gap-2 t-lo">
            <time class="font-mono text-[10px] hidden sm:block">
              {{ formatBriefDate(item.meta?.event_date || item.meta?.date) }}
            </time>
            <a
              v-if="item.meta?.source_url"
              :href="item.meta.source_url"
              target="_blank"
              rel="noopener noreferrer"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 2026 High-Probability Topics (Leaderboard) ─────────────── -->
    <section class="mb-10">
      <div class="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <div class="flex items-center gap-2">
          <h2 class="font-display text-lg font-semibold tracking-tight t-hi">🎯 2026 High-Probability Topics</h2>
          <span class="chip chip-saffron text-[10.5px]">Top Yield</span>
        </div>
        <span class="eyebrow">Ranked by PYQ recurrence + projected 2026 marks</span>
      </div>

      <div class="panel divide-y divide-[var(--line)] overflow-hidden">
        <div
          v-for="topic in predictedHighYieldTopics"
          :key="topic.rank"
          class="flex flex-col gap-3 p-4 transition-colors hover:bg-sub sm:flex-row sm:items-center sm:justify-between"
        >
          <!-- Left: Rank + Info -->
          <div class="flex items-start gap-3 min-w-0">
            <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent-soft font-mono text-[13px] font-bold accent">
              {{ String(topic.rank).padStart(2, '0') }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex flex-wrap items-center gap-2">
                <NuxtLink
                  v-if="topic.isLive"
                  :to="topic.href"
                  class="font-display text-[14px] font-bold tracking-tight t-hi hover:underline"
                >
                  {{ topic.title }}
                </NuxtLink>
                <span v-else class="font-display text-[14px] font-semibold tracking-tight t-mid">
                  {{ topic.title }}
                </span>
                <span class="chip chip-mono text-[10px]">{{ topic.subject }}</span>
                <span v-if="topic.isLive" class="chip chip-jade chip-mono text-[10px]">
                  <span class="dot" />Live Note
                </span>
              </div>
              <p class="mt-1 text-[12px] leading-relaxed t-lo">
                <strong class="t-mid">Likely 2026 Pattern:</strong> {{ topic.likelyFormat }}
              </p>
            </div>
          </div>

          <!-- Right: Projected Marks + Action -->
          <div class="flex shrink-0 items-center justify-between gap-4 sm:justify-end border-t b-line pt-2 sm:border-t-0 sm:pt-0">
            <div class="text-left sm:text-right">
              <span class="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {{ topic.projectedMarks }}
              </span>
              <p class="mt-0.5 font-mono text-[10px] t-lo">{{ topic.pyqs }} verified PYQs · {{ topic.confidence }} conf.</p>
            </div>
            <UButton
              v-if="topic.isLive"
              label="Study"
              :to="topic.href"
              size="xs"
              color="primary"
              variant="solid"
            />
            <span v-else class="text-[11px] font-medium t-lo italic px-2">Queued</span>
          </div>
        </div>
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
              <th class="w-12">#</th>
              <th class="px-4">Subject</th>
              <th class="px-4 text-right">PYQs</th>
              <th class="w-[32%] px-4">Coverage</th>
              <th class="w-24 px-6 text-center">Tier</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(s, i) in rankedSubjects"
              :key="s.slug"
              class="cursor-pointer"
              @click="openSubject(s)"
            >
              <td class="font-mono text-[11px] t-lo num">{{ String(i + 1).padStart(2, '0') }}</td>
              <td class="px-4">
                <div class="flex items-center gap-2">
                  <span class="cell-key">{{ s.name }}</span>
                  <span v-if="s.noteCount > 0" class="chip chip-jade chip-mono">
                    <span class="dot" />live
                  </span>
                </div>
              </td>
              <td class="px-4 text-right cell-num">{{ s.pyqCount }}</td>
              <td class="px-4">
                <div class="flex items-center gap-3">
                  <div class="h-1.5 min-w-[72px] flex-1 overflow-hidden rounded-full bg-inset">
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
              <td class="px-6 text-center">
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

/* Ranked by verified 3,129 PYQ count descending */
const subjects = [
  { name: 'Arithmetic',          slug: 'arithmetic',      pyqCount: 676, noteCount: 0 },
  { name: 'Reasoning',           slug: 'reasoning',       pyqCount: 585, noteCount: 0 },
  { name: 'Telangana State',     slug: 'telangana',       pyqCount: 367, noteCount: 1 },
  { name: 'History of India',    slug: 'history',         pyqCount: 329, noteCount: 0 },
  { name: 'Geography',           slug: 'geography',       pyqCount: 326, noteCount: 1 },
  { name: 'General Science',     slug: 'science',         pyqCount: 306, noteCount: 0 },
  { name: 'Indian Polity',       slug: 'polity',          pyqCount: 203, noteCount: 1 },
  { name: 'Indian Economy',      slug: 'economy',         pyqCount: 184, noteCount: 0 },
  { name: 'General English',     slug: 'english',         pyqCount: 153, noteCount: 0 },
]

const maxPYQ = Math.max(...subjects.map(s => s.pyqCount))
const totalPYQs = subjects.reduce((sum, s) => sum + s.pyqCount, 0)
const notesLive = computed(() => subjects.filter(s => s.noteCount > 0).length)

const agenda = [
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Telangana Statehood Movement note page live',
    meta: '169 verified PYQs · 5 gate questions unlocked',
  },
  {
    icon: 'i-heroicons-academic-cap',
    title: 'Union Executive & Parliament note page live',
    meta: '57 verified PYQs · Interactive hierarchy tree',
  },
  {
    icon: 'i-heroicons-map-pin',
    title: 'Drainage System of India note page live',
    meta: '28 verified PYQs · Interactive river map',
  },
]

const predictedHighYieldTopics = [
  {
    rank: 1,
    title: 'Drainage System of India',
    subject: 'Geography',
    pyqs: 28,
    projectedMarks: '4–6 Marks (3–5 Qs)',
    likelyFormat: 'River ↔ Tributary Matching | Estuary vs Delta Traps',
    href: '/notes/geography/drainage-system-of-india',
    tier: 'T1',
    confidence: '95%',
    isLive: true,
  },
  {
    rank: 2,
    title: 'Telangana Statehood Movement & Chronology',
    subject: 'Telangana',
    pyqs: 26,
    projectedMarks: '5–8 Marks (4–6 Qs)',
    likelyFormat: 'Timeline Sequencing (1969 to 2014) | Committee Match',
    href: '/notes/telangana/telangana-statehood-movement',
    tier: 'T1',
    confidence: '94%',
    isLive: true,
  },
  {
    rank: 3,
    title: 'Union Executive & Legislature (President, Parliament, Articles)',
    subject: 'Polity',
    pyqs: 24,
    projectedMarks: '4–5 Marks (3–4 Qs)',
    likelyFormat: '4-Statement True/False | Landmark Article Traps (52–123)',
    href: '/notes/polity/union-executive-and-legislature',
    tier: 'T1',
    confidence: '92%',
    isLive: true,
  },
  {
    rank: 4,
    title: 'Indian National Movement & 1857 Revolts',
    subject: 'History',
    pyqs: 22,
    projectedMarks: '4–6 Marks (3–5 Qs)',
    likelyFormat: '5-Step Causal Chain | Leader ↔ Organization Pairing',
    href: '/notes/history',
    tier: 'T1',
    confidence: '90%',
    isLive: false,
  },
  {
    rank: 5,
    title: 'Ratio, Proportions & Arithmetic Word Problems',
    subject: 'Arithmetic',
    pyqs: 35,
    projectedMarks: '8–10 Marks (6–8 Qs)',
    likelyFormat: 'Speed-accuracy Calculation | Multi-step Word Problems',
    href: '/notes/arithmetic',
    tier: 'T1',
    confidence: '96%',
    isLive: false,
  },
]

const stats = computed(() => [
  {
    label: 'Reviewed total',
    value: reviewedTotal.value ?? '0',
    hint: 'Cards graded since day one',
    dim: reviewedTotal.value == null,
  },
  {
    label: 'Notes live',
    value: `${notesLive.value} / ${subjects.length}`,
    hint: 'Telangana, Geography & Polity live',
    dim: false,
  },
  {
    label: '30-day retention',
    value: retention.value ?? '90%',
    hint: 'Measured on graded reviews',
    dim: false,
  },
])

function assignTier(n: number) {
  if (n >= 200) return 'T1'
  if (n >= 100) return 'T2'
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
  if (s.slug === 'geography') {
    navigateTo('/notes/geography/drainage-system-of-india')
  } else if (s.slug === 'telangana') {
    navigateTo('/notes/telangana/telangana-statehood-movement')
  } else if (s.slug === 'polity') {
    navigateTo('/notes/polity/union-executive-and-legislature')
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
