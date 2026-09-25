<template>
  <div class="flex flex-col" :class="compact ? 'gap-2' : 'gap-3'">
    <!-- Row 1: category pill, difficulty, TG focus, hot zone, NEW, date -->
    <div class="flex flex-wrap items-center gap-1.5">
      <span :class="['chip text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1', categoryMeta.colorClass]">
        <UIcon :name="categoryMeta.icon" class="h-3 w-3" />
        {{ categoryMeta.label }}
      </span>
      <span
        v-if="item.meta?.difficulty"
        :class="difficultyClass"
        class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
      >
        {{ difficultyLabel }}
      </span>
      <span
        v-if="item.meta?.is_telangana_focus"
        class="inline-flex items-center gap-1 rounded-full bg-saffron-500/10 dark:bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 px-2 py-0.5 text-[10px] font-semibold tracking-wide border border-saffron-500/20"
      >
        <UIcon name="i-heroicons-map-pin" class="h-3 w-3 shrink-0" />
        TG Focus
      </span>
      <span
        v-if="isHotZone"
        class="inline-flex items-center gap-1 rounded-full bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-2 py-0.5 text-[10px] font-semibold tracking-wide border border-red-500/20"
        title="85% of PYQ current-affairs questions come from the last 6 months"
      >
        <UIcon name="i-heroicons-fire" class="h-3 w-3 shrink-0" />
        Hot zone
      </span>
      <span
        v-if="isNew"
        class="inline-flex items-center rounded-full bg-saffron-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white"
      >
        New
      </span>
      <span class="flex-1" aria-hidden="true" />
      <time
        v-if="entryDate"
        :datetime="entryDate"
        class="font-mono text-[11px] uppercase tracking-[0.1em] t-lo"
      >
        {{ formatDate(entryDate) }}
      </time>
    </div>

    <!-- Headline -->
    <h3 class="font-semibold leading-snug tracking-tight t-hi" :class="compact ? 'text-sm' : 'text-base'">
      {{ item.meta?.headline }}
    </h3>

    <!-- Exam fact callout -->
    <p
      v-if="item.meta?.exam_fact"
      class="rounded-md border border-[var(--jade-line)] bg-[var(--jade-soft)] px-2.5 py-2 text-[12.5px] font-medium leading-snug text-[var(--jade)]"
    >
      <UIcon name="i-heroicons-light-bulb" class="mr-1 inline-block h-4 w-4 align-text-bottom" />
      {{ item.meta.exam_fact }}
    </p>

    <!-- Summary (hidden in compact mode) -->
    <p v-if="!compact && item.meta?.summary" class="text-xs leading-relaxed t-mid">
      {{ item.meta.summary }}
    </p>

    <!-- Linked notes -->
    <div v-if="linkedNotes.length" class="flex flex-wrap items-center gap-1.5">
      <span class="font-mono text-[9.5px] uppercase tracking-[0.12em] t-lo">Notes:</span>
      <NuxtLink
        v-for="n in linkedNotes"
        :key="n.to"
        :to="n.to"
        class="chip text-[10px] leading-tight transition-colors hover:border-[var(--accent-line)] hover:text-[var(--accent-strong)] ca-note-chip"
      >
        <UIcon name="i-heroicons-book-open" class="h-3 w-3 shrink-0" />
        {{ n.title }}
      </NuxtLink>
    </div>

    <!-- Footer: source, last score, bookmark, test yourself -->
    <div class="mt-auto flex flex-wrap items-center gap-1 border-t b-line pt-2">
      <a
        v-if="sourceUrl"
        :href="sourceUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex min-h-[32px] items-center gap-1.5 rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-medium t-lo transition-colors hover:accent"
      >
        <UIcon
          :name="item.meta?.source_type === 'official' ? 'i-heroicons-building-library' : 'i-heroicons-newspaper'"
          class="h-3.5 w-3.5 shrink-0"
        />
        {{ sourceLabel }}
      </a>
      <span class="flex-1" aria-hidden="true" />
      <span
        v-if="attemptBadge"
        class="chip chip-mono num"
        :class="attemptBadge.perfect ? 'chip-jade' : 'chip-saffron'"
        :title="`Last drill score: ${attemptBadge.score}/${attemptBadge.total}`"
      >
        <UIcon name="i-heroicons-academic-cap" class="h-3 w-3" />
        {{ attemptBadge.score }}/{{ attemptBadge.total }}
      </span>
      <button
        type="button"
        class="press inline-flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors"
        :class="bookmarked ? 'accent bg-[var(--accent-soft)]' : 't-lo hover:accent hover:bg-black/5 dark:hover:bg-white/5'"
        :aria-pressed="bookmarked"
        :aria-label="bookmarked ? 'Remove bookmark' : 'Bookmark this card'"
        @click="onBookmark"
      >
        <UIcon :name="bookmarked ? 'i-heroicons-bookmark-solid' : 'i-heroicons-bookmark'" class="h-5 w-5" />
      </button>
      <button
        v-if="mcqs.length"
        type="button"
        class="press inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-saffron-600 px-3.5 text-[12.5px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        :aria-expanded="showMCQ"
        :aria-controls="mcqPanelId"
        @click="toggleMCQ"
      >
        <UIcon name="i-heroicons-academic-cap" class="h-4 w-4" />
        {{ showMCQ ? 'Hide questions' : `Test yourself (${mcqs.length} ${mcqs.length === 1 ? 'Q' : 'Qs'})` }}
      </button>
    </div>

    <!-- MCQ drill panel -->
    <div
      v-if="mcqs.length && showMCQ"
      :id="mcqPanelId"
      class="overflow-hidden rounded-lg border b-line bg-black/[0.03] dark:bg-white/[0.04] text-sm"
    >
      <!-- Question navigator (only when more than one question) -->
      <div v-if="mcqs.length > 1" class="flex items-center justify-between gap-2 border-b b-line px-3 py-1">
        <span class="font-mono text-[10.5px] font-semibold uppercase tracking-wider t-lo">
          Question {{ currentQ + 1 }} of {{ mcqs.length }}
        </span>
        <div class="flex items-center gap-0.5">
          <button
            v-for="(_, i) in mcqs"
            :key="i"
            type="button"
            class="flex min-h-[44px] min-w-[32px] items-center justify-center"
            :aria-label="`Go to question ${i + 1}`"
            :aria-current="i === currentQ ? 'true' : undefined"
            @click="goToQ(i)"
          >
            <span class="block h-2 w-2 rounded-full transition-colors" :class="dotClass(i)" />
          </button>
        </div>
      </div>

      <!-- Current question -->
      <div class="p-3">
        <p
          v-if="lockedFromAttempt"
          class="mb-2 inline-flex items-center gap-1 rounded bg-black/5 dark:bg-white/5 px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider t-lo"
        >
          <UIcon name="i-heroicons-lock-closed" class="h-3 w-3" />
          Attempted earlier: answers locked
        </p>
        <p class="mb-3 font-medium leading-snug t-hi">{{ currentMCQ.question }}</p>
        <div class="flex flex-col gap-2" role="group" :aria-label="`Options for question ${currentQ + 1}`">
          <button
            v-for="(option, idx) in currentMCQ.options"
            :key="idx"
            type="button"
            class="press flex min-h-[44px] w-full items-start gap-2.5 rounded-lg border px-3 py-2.5 text-left text-[13px] leading-snug transition-colors disabled:cursor-default"
            :class="optionClass(idx)"
            :disabled="currentAnswer !== undefined"
            @click="selectOption(idx)"
          >
            <span class="chip chip-mono mt-px shrink-0 !px-1.5 !py-0 text-[10px] font-bold">
              {{ String.fromCharCode(65 + idx) }}
            </span>
            <span class="flex-1">{{ option }}</span>
            <UIcon
              v-if="currentAnswer !== undefined && idx === currentMCQ.answer"
              name="i-heroicons-check-circle-solid"
              class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
            />
            <UIcon
              v-else-if="currentAnswer !== undefined && idx === currentAnswer"
              name="i-heroicons-x-circle-solid"
              class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
            />
          </button>
        </div>

        <!-- Feedback after answering -->
        <div v-if="currentAnswer !== undefined" class="mt-3 rounded-md bg-black/5 dark:bg-white/5 p-2.5 text-xs leading-relaxed t-mid">
          <p
            class="mb-1 font-semibold"
            :class="isCorrect ? 'text-[var(--jade)]' : 'text-[var(--red)]'"
          >
            {{ isCorrect ? 'Correct' : `Incorrect. Correct answer: ${String.fromCharCode(65 + currentMCQ.answer)}` }}
          </p>
          <p v-if="currentMCQ.explanation">{{ currentMCQ.explanation }}</p>
          <UButton
            v-if="!allAnswered && currentQ < mcqs.length - 1"
            size="xs"
            color="primary"
            variant="soft"
            trailing-icon="i-heroicons-arrow-right"
            class="mt-2 min-h-[36px]"
            @click="goToQ(currentQ + 1)"
          >
            Next question
          </UButton>
        </div>

        <!-- Score line -->
        <p
          v-if="allAnswered"
          class="mt-3 text-sm font-semibold"
          :class="score === mcqs.length ? 'text-[var(--jade)]' : 'accent'"
        >
          Score: {{ score }}/{{ mcqs.length }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCACategories } from '@/composables/useCACategories'
import { useCAState } from '@/composables/useCAState'

const props = withDefaults(defineProps<{
  item: any
  compact?: boolean
}>(), {
  compact: false,
})

const { getCategoryMeta } = useCACategories()
const {
  isNewSinceLastVisit,
  markRead,
  isBookmarked,
  toggleBookmark,
  getAttempt,
  recordAttempt,
} = useCAState()

// Per-user state (localStorage/Supabase) only hydrates on the client.
// Gate it behind `hydrated` so SSR output never mismatches.
const hydrated = ref(false)
onMounted(() => { hydrated.value = true })

// Normalise: support both the mcqs array and the legacy single mcq.
const mcqs = computed<any[]>(() => {
  const meta = props.item.meta ?? {}
  if (Array.isArray(meta.mcqs) && meta.mcqs.length > 0) return meta.mcqs
  if (meta.mcq && meta.mcq.question) return [meta.mcq]
  return []
})

// MCQ state
const showMCQ = ref(false)
const currentQ = ref(0)
const lockedFromAttempt = ref(false)
// answers[i] = selected option index for question i, undefined if not answered
const answers = ref<(number | undefined)[]>([])

const mcqPanelId = computed(() => `ca-mcq-${String(props.item.id ?? '').replace(/[^A-Za-z0-9_-]/g, '-')}`)

function toggleMCQ() {
  showMCQ.value = !showMCQ.value
  if (showMCQ.value) {
    markRead(props.item.id)
    const attempt = getAttempt(props.item.id)
    lockedFromAttempt.value = !!attempt
    answers.value = attempt
      ? normalizePerQuestion(attempt.perQuestion)
      : mcqs.value.map(() => undefined)
    const firstOpen = answers.value.findIndex(a => a === undefined)
    currentQ.value = firstOpen === -1 ? 0 : firstOpen
  }
}

// The page's "Start drill" button opens the first drillable card through this.
function openQuiz() {
  if (mcqs.value.length === 0) return
  if (!showMCQ.value) toggleMCQ()
}
defineExpose({ openQuiz })

// perQuestion may arrive as an array, an object keyed by question index,
// or values wrapped in { selected } / { selectedIdx } shapes.
function normalizePerQuestion(pq: any): (number | undefined)[] {
  const out: (number | undefined)[] = mcqs.value.map(() => undefined)
  if (!pq) return out
  for (let i = 0; i < mcqs.value.length; i++) {
    let v: any = Array.isArray(pq) ? pq[i] : (pq[i] ?? pq[String(i)])
    if (v && typeof v === 'object') v = v.selected ?? v.selectedIdx ?? v.idx ?? v.answer
    if (typeof v === 'number' && Number.isFinite(v)) out[i] = v
  }
  return out
}

function goToQ(i: number) {
  if (i >= 0 && i < mcqs.value.length) currentQ.value = i
}

function selectOption(idx: number) {
  if (answers.value[currentQ.value] !== undefined) return
  const updated = [...answers.value]
  updated[currentQ.value] = idx
  answers.value = updated
  recordAttempt(props.item, currentQ.value, idx)
}

const currentMCQ = computed(() => mcqs.value[currentQ.value] ?? {})
const currentAnswer = computed(() => answers.value[currentQ.value])
const isCorrect = computed(() => currentAnswer.value === currentMCQ.value?.answer)
const allAnswered = computed(() => answers.value.length > 0 && answers.value.every(a => a !== undefined))
const score = computed(() =>
  answers.value.filter((a, i) => a === mcqs.value[i]?.answer).length,
)

function optionClass(idx: number) {
  if (currentAnswer.value === undefined) {
    return 'b-line bg-elev t-hi hover:border-[var(--line-strong)]'
  }
  if (idx === currentMCQ.value?.answer) {
    return 'border-[var(--jade-line)] bg-[var(--jade-soft)] text-[var(--jade)] font-medium'
  }
  if (idx === currentAnswer.value) {
    return 'border-[var(--red-line)] bg-[var(--red-soft)] text-[var(--red)]'
  }
  return 'b-line t-mid opacity-60'
}

function dotClass(i: number) {
  if (i === currentQ.value) return 'bg-saffron-500'
  const a = answers.value[i]
  if (a === undefined) return 'bg-black/20 dark:bg-white/20'
  return a === mcqs.value[i]?.answer ? 'bg-[var(--jade)]' : 'bg-[var(--red)]'
}

// New / bookmark / attempt state (client-hydrated)
const isNew = computed(() => hydrated.value && isNewSinceLastVisit(props.item))
const bookmarked = computed(() => hydrated.value && isBookmarked(props.item.id))

function onBookmark() {
  toggleBookmark(props.item.id)
  markRead(props.item.id)
}

const attemptBadge = computed(() => {
  if (!hydrated.value) return null
  const a = getAttempt(props.item.id)
  if (!a || typeof a.score !== 'number' || typeof a.total !== 'number') return null
  return { score: a.score, total: a.total, perfect: a.score === a.total }
})

// Category + difficulty pills
const categoryMeta = computed(() => getCategoryMeta(props.item.meta?.category))

const difficultyLabel = computed(() => {
  const d = props.item.meta?.difficulty
  if (d === 'F') return 'Easy'
  if (d === 'O') return 'Hard'
  return 'Medium'
})

const difficultyClass = computed(() => {
  const d = props.item.meta?.difficulty
  if (d === 'F') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (d === 'O') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
})

// Hot zone: entryDate within the last 180 days, matching the page's
// "Hot zone 6mo" filter (85% of PYQ CA questions fall in this window).
const entryDate = computed<string>(() =>
  props.item.meta?.event_date || props.item.meta?.date || props.item.meta?.published_at || '',
)

const isHotZone = computed(() => {
  if (!entryDate.value) return false
  const t = new Date(entryDate.value).getTime()
  if (Number.isNaN(t)) return false
  const days = (Date.now() - t) / 86400000
  return days >= 0 && days <= 180
})

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

// Source link
const sourceUrl = computed<string>(() =>
  props.item.meta?.canonical_source_url || props.item.meta?.source_url || '',
)
const sourceLabel = computed(() =>
  props.item.meta?.source_name || sourceDomain(sourceUrl.value),
)

function sourceDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url || '' }
}

// Linked note routes. Titles are taken from data/topics_master.json;
// alias NOTE IDs resolve to their canonical topic page.
interface NoteLink { to: string, title: string }

const NOTE_LINKS: Record<string, NoteLink> = {
  'NOTE-GEO-DRAINAGE': { to: '/notes/geography/drainage-system-of-india', title: 'Drainage System of India' },
  'NOTE-GEO-RIVERS': { to: '/notes/geography/drainage-system-of-india', title: 'Drainage System of India' },
  'NOTE-GEO-WATER-RESOURCES': { to: '/notes/geography/drainage-system-of-india', title: 'Drainage System of India' },
  'NOTE-GEO-MOUNTAINS': { to: '/notes/geography/mountains-in-india', title: 'Mountains, Ranges & Passes of India' },
  'NOTE-GEO-PASSES': { to: '/notes/geography/mountains-in-india', title: 'Mountains, Ranges & Passes of India' },
  'NOTE-GEO-RANGES': { to: '/notes/geography/mountains-in-india', title: 'Mountains, Ranges & Passes of India' },
  'NOTE-GEO-DAMS': { to: '/notes/geography/dams-in-india', title: 'Dams, Reservoirs & Multipurpose Projects of India' },
  'NOTE-GEO-RESERVOIRS': { to: '/notes/geography/dams-in-india', title: 'Dams, Reservoirs & Multipurpose Projects of India' },
  'NOTE-GEO-HYDRO': { to: '/notes/geography/dams-in-india', title: 'Dams, Reservoirs & Multipurpose Projects of India' },
  'NOTE-GEO-IRRIGATION': { to: '/notes/geography/irrigation-in-india', title: 'Irrigation in India & Telangana' },
  'NOTE-GEO-IRRIG': { to: '/notes/geography/irrigation-in-india', title: 'Irrigation in India & Telangana' },
  'NOTE-TEL-IRRIGATION': { to: '/notes/geography/irrigation-in-india', title: 'Irrigation in India & Telangana' },
  'NOTE-GEO-FORESTS': { to: '/notes/geography/forests-in-india', title: 'Forests, Natural Vegetation & Protected Areas of India' },
  'NOTE-GEO-ENVIRONMENT': { to: '/notes/geography/forests-in-india', title: 'Forests, Natural Vegetation & Protected Areas of India' },
  'NOTE-ENV-CONSERVATION': { to: '/notes/geography/forests-in-india', title: 'Forests, Natural Vegetation & Protected Areas of India' },
  'NOTE-ENV-BIODIVERSITY': { to: '/notes/geography/forests-in-india', title: 'Forests, Natural Vegetation & Protected Areas of India' },
  'NOTE-POL-HIST-ACTS': { to: '/notes/polity/historical-background-1773-1947', title: 'Historical Background: Company Rule & Crown Rule (1773-1947)' },
  'NOTE-POL-CONST-FRAME': { to: '/notes/polity/historical-background-1773-1947', title: 'Historical Background: Company Rule & Crown Rule (1773-1947)' },
  'NOTE-POL-CONSTITUTION-FRAME': { to: '/notes/polity/historical-background-1773-1947', title: 'Historical Background: Company Rule & Crown Rule (1773-1947)' },
  'NOTE-POL-PREAMBLE': { to: '/notes/polity/historical-background-1773-1947', title: 'Historical Background: Company Rule & Crown Rule (1773-1947)' },
  'NOTE-POL-CONSTITUTION': { to: '/notes/polity/historical-background-1773-1947', title: 'Historical Background: Company Rule & Crown Rule (1773-1947)' },
  'NOTE-POL-MAKING-CONST': { to: '/notes/polity/making-of-the-constitution', title: 'Making of the Indian Constitution' },
  'NOTE-POL-CONSTITUENT-ASSEMBLY': { to: '/notes/polity/making-of-the-constitution', title: 'Making of the Indian Constitution' },
  'NOTE-TEL-MOVEMENT': { to: '/notes/telangana/telangana-statehood-movement', title: 'Telangana Armed Struggle & Statehood Movement' },
  'NOTE-TEL-STATEHOOD': { to: '/notes/telangana/telangana-statehood-movement', title: 'Telangana Armed Struggle & Statehood Movement' },
  'NOTE-TEL-AGITATION': { to: '/notes/telangana/telangana-statehood-movement', title: 'Telangana Armed Struggle & Statehood Movement' },
  'NOTE-TEL-HISTORY': { to: '/notes/telangana/telangana-statehood-movement', title: 'Telangana Armed Struggle & Statehood Movement' },
}

const linkedNotes = computed<NoteLink[]>(() => {
  const ids: string[] = props.item.meta?.related_topic_ids ?? []
  if (!Array.isArray(ids)) return []
  const seen = new Set<string>()
  const out: NoteLink[] = []
  for (const id of ids) {
    const link = NOTE_LINKS[id]
    if (link && !seen.has(link.to)) {
      seen.add(link.to)
      out.push(link)
    }
  }
  return out
})
</script>

<style scoped>
/* Chips are nowrap by default; note-link chips may hold long titles. */
.ca-note-chip {
  white-space: normal;
  text-align: left;
}
</style>
