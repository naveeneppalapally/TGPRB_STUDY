<template>
  <div class="space-y-10">
    <!-- ── Page header ──────────────────────────────────────────────────── -->
    <header class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p class="eyebrow mb-1.5">Study dashboard</p>
        <h1 class="text-[26px] font-semibold tracking-tight t-hi sm:text-[30px]">{{ greeting }}</h1>
      </div>
      <p class="num font-mono text-[11.5px] t-lo">{{ today }}</p>
    </header>

    <!-- ── Hero: cards due today (dominant element) ─────────────────────── -->
    <section class="panel overflow-hidden" aria-labelledby="due-title">
      <div class="grid lg:grid-cols-[1.35fr_1fr]">
        <!-- Due count -->
        <div class="p-6 sm:p-8">
          <p id="due-title" class="eyebrow">Cards due today</p>
          <div class="mt-3 flex items-baseline gap-3">
            <ClientOnly>
              <TactileOdometer
                :value="dueCount ?? 0"
                class="text-[84px] font-semibold leading-none tracking-tighter t-hi sm:text-[104px]"
              />
              <template #fallback>
                <span class="num text-[84px] font-semibold leading-none tracking-tighter t-lo sm:text-[104px]">0</span>
              </template>
            </ClientOnly>
            <span v-if="dueCount && dueCount > 0" class="due-dot" aria-hidden="true" />
          </div>

          <p class="mt-4 max-w-sm text-[14px] leading-relaxed t-mid">
            <template v-if="dueCount && dueCount > 0">
              FSRS has scheduled {{ dueCount }} {{ dueCount === 1 ? 'card' : 'cards' }} for recall today. Clearing the queue keeps your retention on target.
            </template>
            <template v-else-if="unlockedCount > 0">
              Nothing is due right now. {{ unlockedCount }} {{ unlockedCount === 1 ? 'card is' : 'cards are' }} scheduled and will return when FSRS predicts you are about to forget.
            </template>
            <template v-else>
              Your queue fills once you pass a topic's comprehension gate. Read a note, score 3 of 5, and its flashcards enter the schedule.
            </template>
          </p>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <NuxtLink to="/review" class="btn-hero press">
              <UIcon name="i-heroicons-play-solid" class="h-4 w-4" />
              Start review
            </NuxtLink>
            <NuxtLink
              v-if="!dueCount && unlockedCount === 0"
              :to="continueNote.href"
              class="btn-quiet press"
            >
              Open a note
              <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
            </NuxtLink>
            <span class="hidden items-center gap-1.5 text-[12px] t-lo sm:inline-flex">
              Press <UKbd>R</UKbd> to review
            </span>
          </div>
        </div>

        <!-- Secondary stats -->
        <dl class="grid grid-cols-3 divide-x divide-[var(--line)] border-t b-line lg:grid-cols-1 lg:divide-x-0 lg:divide-y lg:border-s lg:border-t-0">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col justify-center px-5 py-5 sm:px-6">
            <dt class="eyebrow">{{ stat.label }}</dt>
            <dd class="num mt-1.5 text-[22px] font-semibold tracking-tight" :class="stat.dim ? 't-lo' : 't-hi'">
              {{ stat.value }}
            </dd>
            <dd class="mt-0.5 hidden text-[11.5px] t-lo sm:block">{{ stat.hint }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- ── Negative marking (quiet) ────────────────────────────────────── -->
    <aside class="flex items-start gap-3 rounded-lg border b-line bg-sub px-4 py-3.5">
      <span class="mt-px grid h-6 w-6 shrink-0 place-items-center rounded-md" style="background: var(--red-soft); color: var(--red);">
        <UIcon name="i-heroicons-minus-small" class="h-4 w-4" />
      </span>
      <p class="text-[13px] leading-relaxed t-mid">
        <span class="font-semibold t-hi">Wrong answers cost 0.20 marks</span> in the TGPRB exam.
        Review before you guess: a card you can recall with confidence is worth attempting, a card you are unsure of is not.
      </p>
    </aside>

    <!-- ── Two-column: high-probability topics + current affairs ────────── -->
    <div class="grid gap-10 xl:grid-cols-[1.25fr_1fr]">
      <!-- 2026 high-probability topics -->
      <section aria-labelledby="hp-title">
        <div class="mb-3 flex items-baseline justify-between gap-3">
          <h2 id="hp-title" class="text-[16px] font-semibold tracking-tight t-hi">2026 high-probability topics</h2>
          <span class="eyebrow hidden sm:block">Ranked by PYQ recurrence</span>
        </div>

        <ol class="panel divide-y divide-[var(--line)] overflow-hidden">
          <li v-for="topic in predictedHighYieldTopics" :key="topic.rank">
            <component
              :is="topic.isLive ? NuxtLink : 'div'"
              :to="topic.isLive ? topic.href : undefined"
              class="row-item press"
              :class="topic.isLive ? 'hover:bg-sub' : 'cursor-default opacity-70'"
            >
              <span class="rank num">{{ String(topic.rank).padStart(2, '0') }}</span>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <p class="text-[14px] font-medium leading-snug t-hi">{{ topic.title }}</p>
                  <span class="chip chip-mono">{{ topic.subject }}</span>
                  <span v-if="!topic.isLive" class="text-[11px] italic t-lo">note in preparation</span>
                </div>
                <p class="mt-1 text-[12.5px] leading-relaxed t-lo">{{ topic.likelyFormat }}</p>
              </div>
              <div class="shrink-0 text-right">
                <p class="num text-[13px] font-semibold t-hi">{{ topic.projectedMarks }}</p>
                <p class="num mt-0.5 font-mono text-[10.5px] t-lo">{{ topic.pyqs }} PYQs</p>
              </div>
              <UIcon
                v-if="topic.isLive"
                name="i-heroicons-chevron-right"
                class="h-4 w-4 shrink-0 t-lo transition-transform duration-160 ease-out-quart group-hover:translate-x-0.5"
              />
              <span v-else class="h-4 w-4 shrink-0" aria-hidden="true" />
            </component>
          </li>
        </ol>
      </section>

      <!-- Current affairs -->
      <section aria-labelledby="ca-title">
        <div class="mb-3 flex items-baseline justify-between gap-3">
          <div class="flex items-center gap-2">
            <h2 id="ca-title" class="text-[16px] font-semibold tracking-tight t-hi">Current affairs</h2>
            <span v-if="addedToday > 0" class="chip chip-jade chip-mono">
              <span class="dot" />{{ addedToday }} new today
            </span>
          </div>
          <NuxtLink to="/current-affairs" class="press inline-flex items-center gap-1 text-[12.5px] font-medium t-mid hover:t-hi">
            All {{ totalCA }}
            <UIcon name="i-heroicons-arrow-right" class="h-3.5 w-3.5" />
          </NuxtLink>
        </div>

        <div v-if="briefItems.length" class="panel divide-y divide-[var(--line)] overflow-hidden">
          <a
            v-for="item in briefItems"
            :key="item.id"
            :href="item.meta?.source_url || '/current-affairs'"
            :target="item.meta?.source_url ? '_blank' : undefined"
            :rel="item.meta?.source_url ? 'noopener noreferrer' : undefined"
            class="row-item press group hover:bg-sub"
          >
            <span
              class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              :style="item.meta?.is_telangana_focus ? 'background: var(--accent);' : 'background: var(--line-strong);'"
              aria-hidden="true"
            />
            <div class="min-w-0 flex-1">
              <p class="text-[13.5px] leading-snug t-hi line-clamp-2">
                <span v-if="item.meta?.is_telangana_focus" class="tg-badge num">TG</span>
                {{ item.meta?.exam_fact || item.meta?.headline }}
              </p>
              <p class="mt-1 flex items-center gap-2 text-[11px] t-lo">
                <span class="uppercase tracking-[0.08em]">{{ item.meta?.category || 'general' }}</span>
                <span aria-hidden="true">/</span>
                <time class="num font-mono">{{ formatBriefDate(item.meta?.event_date || item.meta?.date) }}</time>
                <span v-if="item.meta?.source_type === 'official'" class="hidden sm:inline" style="color: var(--jade);">official</span>
              </p>
            </div>
          </a>
        </div>
        <div v-else class="panel px-5 py-8 text-center text-[13px] t-lo">
          No current affairs cards yet. New PIB items appear here each morning.
        </div>
      </section>
    </div>

    <!-- ── Subject coverage, ranked by exam weight ─────────────────────── -->
    <section aria-labelledby="subj-title">
      <div class="mb-3 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="subj-title" class="text-[16px] font-semibold tracking-tight t-hi">Subjects by exam weight</h2>
        <span class="num font-mono text-[11px] t-lo">{{ totalPYQs.toLocaleString('en-IN') }} verified PYQs, 2015-2023</span>
      </div>

      <ol class="panel divide-y divide-[var(--line)] overflow-hidden">
        <li v-for="(s, i) in rankedSubjects" :key="s.slug">
          <button
            type="button"
            class="row-item press group w-full text-left hover:bg-sub"
            :class="{ 'is-queued': s.noteCount === 0 }"
            @click="openSubject(s)"
          >
            <span class="rank num">{{ String(i + 1).padStart(2, '0') }}</span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2">
                <p class="text-[14px] font-medium t-hi">{{ s.name }}</p>
                <span v-if="s.noteCount > 0" class="chip chip-jade chip-mono"><span class="dot" />live</span>
              </div>
              <div class="mt-2 flex items-center gap-3">
                <div class="h-1 flex-1 max-w-[280px] overflow-hidden rounded-full bg-inset">
                  <div
                    class="weight-bar h-full rounded-full"
                    :style="{ transform: `scaleX(${s.pyqCount / maxPYQ})` }"
                  />
                </div>
                <span class="num font-mono text-[11px] t-lo">{{ s.weight }}</span>
              </div>
            </div>
            <span class="num shrink-0 font-mono text-[12px] t-mid">{{ s.pyqCount }}</span>
            <UIcon
              name="i-heroicons-chevron-right"
              class="h-4 w-4 shrink-0 transition-transform duration-160 ease-out-quart group-hover:translate-x-0.5"
              :class="s.noteCount > 0 ? 't-lo' : 'opacity-0'"
            />
          </button>
        </li>
      </ol>
    </section>

    <!-- ── Continue reading ────────────────────────────────────────────── -->
    <NuxtLink :to="continueNote.href" class="panel press group flex items-center gap-4 p-5 hover:bg-sub">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sub border b-line">
        <UIcon name="i-heroicons-book-open" class="h-5 w-5 t-mid" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="eyebrow mb-0.5">Continue reading</p>
        <p class="truncate text-[15px] font-medium tracking-tight t-hi">{{ continueNote.title }}</p>
        <p class="mt-0.5 text-[12px] t-lo">{{ continueNote.meta }}</p>
      </div>
      <UIcon name="i-heroicons-arrow-right" class="h-4 w-4 shrink-0 t-lo transition-transform duration-160 ease-out-quart group-hover:translate-x-1" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components'
import { queryCollection } from '#imports'

useHead({
  title: 'Dashboard - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Personal TGPRB Constable/SI study dashboard.' }],
})

const toast = useToast()
const user = useSupabaseUser()

/* ── FSRS state read from local storage (works logged in or offline) ────── */
const dueCount = ref<number | null>(null)
const unlockedCount = ref(0)
const reviewedTotal = ref<number | null>(null)
const retention = ref<string | null>(null)

function readFsrsStats() {
  if (!import.meta.client) return
  const uid = user.value?.id || 'guest'
  try {
    let raw = localStorage.getItem(`studyos:fsrs:card-states:${uid}`)
    if (!raw && !user.value) raw = localStorage.getItem('studyos:fsrs:card-states')
    if (!raw) { dueCount.value = 0; unlockedCount.value = 0; reviewedTotal.value = 0; return }
    const states = Object.values(JSON.parse(raw)) as any[]
    const now = Date.now()
    unlockedCount.value = states.length
    dueCount.value = states.filter(s => s?.fsrs?.due && new Date(s.fsrs.due).getTime() <= now).length
    reviewedTotal.value = states.reduce((sum, s) => sum + (Number(s?.fsrs?.reps) || 0), 0)
  } catch {
    dueCount.value = 0
  }
}

onMounted(readFsrsStats)
watch(user, readFsrsStats)

/* ── Current affairs (TG focus first, then newest) ──────────────────────── */
const { data: allCA } = await useAsyncData('dashboard-ca', () =>
  queryCollection('current_affair').all()
)

const todayISO = new Date().toISOString().split('T')[0]

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

function formatBriefDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

/* ── Header ─────────────────────────────────────────────────────────────── */
const today = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
})

const greeting = computed(() => {
  const h = new Date().getHours()
  const part = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
  return `Good ${part}`
})

/* ── Subjects: ranked strictly by verified PYQ count (3,129 total) ──────── */
const subjects = [
  { name: 'Arithmetic',       slug: 'arithmetic', pyqCount: 676, weight: '21.6%', noteCount: 0 },
  { name: 'Reasoning',        slug: 'reasoning',  pyqCount: 585, weight: '18.7%', noteCount: 0 },
  { name: 'Telangana State',  slug: 'telangana',  pyqCount: 367, weight: '11.7%', noteCount: 1 },
  { name: 'History of India', slug: 'history',    pyqCount: 329, weight: '10.5%', noteCount: 0 },
  { name: 'Geography',        slug: 'geography',  pyqCount: 326, weight: '10.4%', noteCount: 5 },
  { name: 'General Science',  slug: 'science',    pyqCount: 306, weight: '9.8%',  noteCount: 0 },
  { name: 'Indian Polity',    slug: 'polity',     pyqCount: 203, weight: '6.5%',  noteCount: 2 },
  { name: 'Indian Economy',   slug: 'economy',    pyqCount: 184, weight: '5.9%',  noteCount: 0 },
  { name: 'General English',  slug: 'english',    pyqCount: 153, weight: '4.9%',  noteCount: 0 },
]

const maxPYQ = Math.max(...subjects.map(s => s.pyqCount))
const totalPYQs = subjects.reduce((sum, s) => sum + s.pyqCount, 0)
const subjectsLive = computed(() => subjects.filter(s => s.noteCount > 0).length)

const rankedSubjects = computed(() => [...subjects].sort((a, b) => b.pyqCount - a.pyqCount))

function openSubject(s: { slug: string; name: string; noteCount: number }) {
  if (s.slug === 'geography') {
    navigateTo('/notes/geography')
  } else if (s.slug === 'telangana') {
    navigateTo('/notes/telangana')
  } else if (s.slug === 'polity') {
    navigateTo('/notes/polity')
  } else {
    toast.add({
      title: `${s.name} notes are in preparation`,
      description: 'Verified PYQs for this subject are available in the Question Archive now.',
      icon: 'i-heroicons-clock',
      color: 'gray',
      timeout: 2600,
    })
  }
}

/* ── Stats ──────────────────────────────────────────────────────────────── */
const stats = computed(() => [
  {
    label: 'Reviewed',
    value: reviewedTotal.value == null ? '-' : String(reviewedTotal.value),
    hint: 'Cards graded so far',
    dim: !reviewedTotal.value,
  },
  {
    label: 'Retention',
    value: retention.value ?? '90%',
    hint: retention.value ? 'Measured on graded reviews' : 'FSRS target',
    dim: !retention.value,
  },
  {
    label: 'Syllabus live',
    value: `${subjectsLive.value} / ${subjects.length}`,
    hint: 'Subjects with verified notes',
    dim: false,
  },
])

/* ── 2026 high-probability topics ───────────────────────────────────────── */
const predictedHighYieldTopics = [
  {
    rank: 1,
    title: 'Drainage System of India',
    subject: 'Geography',
    pyqs: 28,
    projectedMarks: '4-6 marks',
    likelyFormat: 'River and tributary matching, estuary vs delta traps',
    href: '/notes/geography/drainage-system-of-india',
    isLive: true,
  },
  {
    rank: 2,
    title: 'Telangana Statehood Movement',
    subject: 'Telangana',
    pyqs: 26,
    projectedMarks: '5-8 marks',
    likelyFormat: 'Timeline sequencing 1969 to 2014, committee matching',
    href: '/notes/telangana/telangana-statehood-movement',
    isLive: true,
  },
  {
    rank: 3,
    title: 'Historical Background: Company and Crown Rule (1773-1947)',
    subject: 'Polity',
    pyqs: 12,
    projectedMarks: '2-3 marks',
    likelyFormat: 'Chronology of British Acts, matching provisions to years',
    href: '/notes/polity/historical-background-1773-1947',
    isLive: true,
  },
  {
    rank: 4,
    title: 'Indian National Movement and 1857 Revolt',
    subject: 'History',
    pyqs: 22,
    projectedMarks: '4-6 marks',
    likelyFormat: 'Causal chains, leader and organisation pairing',
    href: '/notes/history',
    isLive: false,
  },
  {
    rank: 5,
    title: 'Ratio, Proportion and Arithmetic Word Problems',
    subject: 'Arithmetic',
    pyqs: 35,
    projectedMarks: '8-10 marks',
    likelyFormat: 'Speed-accuracy calculation, multi-step word problems',
    href: '/notes/arithmetic',
    isLive: false,
  },
]

const continueNote = {
  title: 'Drainage System of India',
  meta: 'Geography, 28 verified PYQs, about 16 minutes',
  href: '/notes/geography/drainage-system-of-india',
}

/* Press R anywhere outside an input to jump to the review queue */
defineShortcuts({
  r: () => navigateTo('/review'),
})
</script>

<style scoped>
.btn-hero {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border-radius: 10px;
  background: var(--text-1);
  color: var(--bg-elevated);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.005em;
}
.btn-hero:hover { opacity: 0.92; }

.btn-quiet {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 42px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid var(--line-strong);
  background: var(--bg-elevated);
  color: var(--text-2);
  font-size: 13.5px;
  font-weight: 500;
}
.btn-quiet:hover { color: var(--text-1); border-color: var(--text-3); }

.due-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--accent);
  align-self: flex-start;
  margin-top: 14px;
}

.row-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 18px;
  color: inherit;
}
.row-item.is-queued .rank { opacity: 0.6; }

.rank {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 7px;
  background: var(--bg-inset);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  font-weight: 600;
  color: var(--text-3);
}

.tg-badge {
  display: inline-block;
  margin-inline-end: 6px;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  vertical-align: 2px;
}

.weight-bar {
  background: var(--text-2);
  transform-origin: left center;
  transition: transform 350ms cubic-bezier(0.16, 1, 0.3, 1);
}
.row-item:hover .weight-bar { background: var(--accent); }

@media (prefers-reduced-motion: reduce) {
  .weight-bar { transition: none; }
}
</style>
