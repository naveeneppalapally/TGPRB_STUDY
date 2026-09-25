<template>
  <div class="mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <!-- 1. Page header -->
    <header class="mb-6">
      <p class="eyebrow mb-2 flex items-center gap-2">
        <UIcon name="i-heroicons-newspaper" class="h-4 w-4" />
        Daily updates
      </p>
      <h1 class="font-display text-[28px] sm:text-[36px] font-bold tracking-tight t-hi">
        Current Affairs
      </h1>
      <p class="mt-1.5 max-w-2xl text-body-sm leading-relaxed t-mid">
        Exam-relevant news sourced from PIB, updated daily at 7am IST.
        <span class="font-semibold accent">85% of TGPRB current-affairs questions come from the last 6 months</span>:
        those cards carry a
        <span class="inline-flex items-center gap-0.5 font-bold text-red-500">
          <UIcon name="i-heroicons-fire" class="h-4 w-4" />Hot zone
        </span>
        chip.
      </p>
    </header>

    <!-- 2. Today bar: reading progress + primary actions -->
    <section class="panel panel-pad mb-6 flex flex-wrap items-center justify-between gap-4" aria-label="Reading progress">
      <div>
        <p class="eyebrow mb-1.5">Your reading queue</p>
        <ClientOnly>
          <p class="flex flex-wrap items-baseline gap-x-2 text-sm t-mid">
            <span class="num text-2xl font-semibold t-hi">{{ newSinceCount }}</span>
            <span>new since your last visit</span>
            <span class="t-lo" aria-hidden="true">·</span>
            <span class="num text-2xl font-semibold t-hi">{{ bookmarkCount }}</span>
            <span>saved</span>
          </p>
          <template #fallback>
            <p class="text-sm t-lo">Loading your reading state...</p>
          </template>
        </ClientOnly>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <UButton
          color="primary"
          size="lg"
          icon="i-heroicons-academic-cap"
          class="press min-h-[44px]"
          :disabled="!drillTarget"
          @click="startDrill"
        >
          Start drill
        </UButton>
        <UButton
          color="gray"
          variant="ghost"
          size="lg"
          icon="i-heroicons-check"
          class="min-h-[44px]"
          @click="onMarkAllRead"
        >
          Mark all read
        </UButton>
      </div>
    </section>

    <!-- 3. Sticky filter bar -->
    <div
      ref="filterBarRef"
      class="sticky top-14 z-30 -mx-4 border-b b-line bg-base-85 px-4 backdrop-blur sm:-mx-6 sm:px-6"
    >
      <div class="flex flex-wrap items-center gap-2 py-2.5">
        <!-- Search (300ms debounce into q) -->
        <div class="relative w-full sm:w-auto sm:min-w-[240px] sm:flex-1">
          <UIcon name="i-heroicons-magnifying-glass" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 t-lo" />
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search headlines, facts, summaries..."
            aria-label="Search current affairs"
            class="h-11 w-full rounded-lg border b-line bg-elev pl-9 pr-11 text-sm t-hi placeholder:t-lo focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500"
          />
          <button
            v-if="searchInput"
            type="button"
            aria-label="Clear search"
            class="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md t-lo transition-colors hover:t-hi"
            @click="clearSearch"
          >
            <UIcon name="i-heroicons-x-mark" class="h-4 w-4" />
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-2">
          <!-- Sort -->
          <label for="ca-sort" class="sr-only">Sort order</label>
          <select
            id="ca-sort"
            v-model="sort"
            class="h-11 min-h-[44px] rounded-lg border b-line bg-elev px-3 text-xs font-medium t-hi focus:border-saffron-500 focus:outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="tg">Telangana first</option>
            <option value="hardest">Hardest first</option>
          </select>

          <!-- Dates slideover -->
          <button
            type="button"
            class="press inline-flex h-11 min-h-[44px] items-center gap-1.5 rounded-lg border b-line bg-elev px-3 text-xs font-medium t-mid transition-colors hover:t-hi"
            @click="datesOpen = true"
          >
            <UIcon name="i-heroicons-calendar-days" class="h-4 w-4" />
            Dates
          </button>

          <!-- Filters slideover -->
          <button
            type="button"
            class="press inline-flex h-11 min-h-[44px] items-center gap-1.5 rounded-lg border b-line bg-elev px-3 text-xs font-medium t-mid transition-colors hover:t-hi"
            :aria-expanded="filtersOpen"
            @click="filtersOpen = true"
          >
            <UIcon name="i-heroicons-funnel" class="h-4 w-4" />
            Filters
            <span v-if="activeFilterCount" class="chip chip-saffron chip-mono num !px-1.5 !py-0">
              {{ activeFilterCount }}
            </span>
          </button>

          <!-- Density toggle -->
          <button
            type="button"
            class="press inline-flex h-11 min-h-[44px] items-center gap-1.5 rounded-lg border b-line bg-elev px-3 text-xs font-medium t-mid transition-colors hover:t-hi"
            :aria-pressed="density === 'compact'"
            :title="density === 'compact' ? 'Switch to comfortable density' : 'Switch to compact density'"
            @click="toggleDensity"
          >
            <UIcon :name="density === 'compact' ? 'i-heroicons-bars-3' : 'i-heroicons-squares-2x2'" class="h-4 w-4" />
            <span class="hidden sm:inline">{{ density === 'compact' ? 'Compact' : 'Comfortable' }}</span>
          </button>

          <!-- Live result count -->
          <p class="w-full font-mono text-[11px] t-lo sm:ml-auto sm:w-auto" aria-live="polite">
            {{ resultCountText }}
          </p>
        </div>
      </div>

      <!-- 4. Active filter chips -->
      <div v-if="activeChips.length" class="flex flex-wrap items-center gap-1.5 border-t b-line py-2">
        <button
          v-for="chip in activeChips"
          :key="chip.key"
          type="button"
          class="press inline-flex min-h-[36px] items-center gap-1 rounded-full border b-line bg-sub px-3 py-1 text-[11px] font-medium t-mid transition-colors hover:border-[var(--line-strong)] hover:t-hi"
          :aria-label="`Remove filter: ${chip.label}`"
          @click="chip.onRemove()"
        >
          {{ chip.label }}
          <UIcon name="i-heroicons-x-mark" class="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          class="press min-h-[36px] px-2 text-[11px] font-semibold accent hover:underline"
          @click="resetAllFilters"
        >
          Reset all
        </button>
      </div>
    </div>

    <!-- 7. Feed -->
    <section class="pt-5" aria-label="Current affairs feed">
      <!-- Initial loading skeletons -->
      <div v-if="pending && items.length === 0" class="flex flex-col gap-3" aria-hidden="true">
        <div
          v-for="i in 6"
          :key="i"
          class="animate-pulse space-y-3 rounded-xl border b-line bg-sub p-5"
        >
          <div class="flex gap-2">
            <div class="h-5 w-20 rounded-full bg-black/10 dark:bg-white/10" />
            <div class="h-5 w-12 rounded-full bg-black/10 dark:bg-white/10" />
          </div>
          <div class="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
          <div class="h-10 w-full rounded bg-black/10 dark:bg-white/10" />
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error && items.length === 0" class="panel p-12 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto mb-3 h-10 w-10 t-lo" />
        <h3 class="mb-1 text-base font-semibold t-hi">Could not load the feed</h3>
        <p class="mb-4 text-sm t-mid">Something went wrong while fetching current affairs.</p>
        <UButton color="primary" variant="soft" class="min-h-[44px]" icon="i-heroicons-arrow-path" @click="refresh()">
          Retry
        </UButton>
      </div>

      <!-- 8. Day-grouped cards -->
      <template v-else-if="groups.length">
        <section v-for="g in groups" :key="g.key" class="mb-7" :aria-label="`${g.label}, ${g.items.length} cards`">
          <h2
            class="sticky z-20 -mx-4 flex items-baseline justify-between border-b b-line bg-base-85 px-4 py-2 backdrop-blur sm:-mx-6 sm:px-6"
            :style="{ top: groupHeaderTop }"
          >
            <span class="text-xs font-bold uppercase tracking-wider t-hi">{{ g.label }}</span>
            <span class="num font-mono text-[10px] t-lo">{{ g.items.length }} {{ g.items.length === 1 ? 'card' : 'cards' }}</span>
          </h2>
          <div class="flex flex-col gap-3 pt-3">
            <article
              v-for="item in g.items"
              :id="`ca-${item.id}`"
              :key="item.id"
              class="flex flex-col rounded-xl border b-line bg-sub transition-shadow hover:shadow-md"
              :class="[
                isNewCard(item) ? 'border-s-2 border-s-saffron-500' : '',
                density === 'compact' ? 'p-3' : 'p-5',
              ]"
            >
              <CACard
                :ref="(el: any) => setCardRef(String(item.id), el)"
                :item="item"
                :compact="density === 'compact'"
              />
            </article>
          </div>
        </section>

        <!-- Load more -->
        <div v-if="items.length < total" class="py-6 text-center">
          <UButton
            color="primary"
            size="md"
            class="min-h-[44px] font-semibold shadow-sm"
            :loading="pending"
            @click="loadMore"
          >
            Load more
            <span class="text-white/80">({{ total - items.length }} remaining)</span>
          </UButton>
        </div>
        <p v-else class="py-4 text-center text-xs font-medium t-lo">
          All {{ total }} {{ total === 1 ? 'card' : 'cards' }} shown
        </p>

        <!-- Loading-more skeletons -->
        <div v-if="pending && items.length" class="flex flex-col gap-3" aria-hidden="true">
          <div
            v-for="i in 2"
            :key="i"
            class="animate-pulse space-y-3 rounded-xl border b-line bg-sub p-5"
          >
            <div class="flex gap-2">
              <div class="h-5 w-20 rounded-full bg-black/10 dark:bg-white/10" />
              <div class="h-5 w-12 rounded-full bg-black/10 dark:bg-white/10" />
            </div>
            <div class="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      </template>

      <!-- Empty state -->
      <div v-else class="panel p-12 text-center">
        <UIcon name="i-heroicons-newspaper" class="mx-auto mb-3 h-10 w-10 t-lo" />
        <h3 class="mb-1 text-base font-semibold t-hi">No current affairs found</h3>
        <p class="mb-4 text-sm t-mid">Try a different search term, a broader timeframe, or clear your filters.</p>
        <UButton color="primary" variant="soft" class="min-h-[44px]" @click="resetAllFilters">
          Reset all filters
        </UButton>
      </div>
    </section>

    <!-- 5 + 6. Slideovers -->
    <CaFilterSlideover
      v-model:open="filtersOpen"
      v-model:window="windowVal"
      v-model:category="category"
      v-model:section="section"
      v-model:difficulty="difficulty"
      v-model:depth="depth"
      v-model:tg="tg"
      :facets="facets"
      @reset="resetAllFilters"
    />
    <CaDatesSlideover
      v-model:open="datesOpen"
      @select="onSelectDate"
    />

    <!-- 13. Drill modal -->
    <CaDrillModal
      v-model:open="drillOpen"
      v-model:index="drillIndex"
      v-model:score="drillScore"
      v-model:wrong="drillWrong"
      :questions="drillQuestions"
    />
  </div>
</template>

<script setup lang="ts">
import { useCACategories } from '@/composables/useCACategories'
import { useCAState } from '@/composables/useCAState'

useHead({
  title: 'Current Affairs - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Daily PIB-sourced current affairs for TGPRB Constable and SI exams, with drills, filters and PYQ-linked notes.' }],
})

const route = useRoute()
const router = useRouter()
const { getCategoryMeta } = useCACategories()
const {
  isNewSinceLastVisit,
  newCount,
  markAllRead,
  bookmarkCount,
} = useCAState()

const PAGE_SIZE = 30

// ---------------------------------------------------------------------------
// Filter state (initialised from the URL query on mount)
// ---------------------------------------------------------------------------
const searchInput = ref('')
const q = ref('')
const category = ref('')
const section = ref('')
const difficulty = ref('')
const depth = ref('')
const windowVal = ref('')
const date = ref('')
const tg = ref(false)
const sort = ref<'newest' | 'oldest' | 'tg' | 'hardest'>('newest')
const page = ref(1)

const filtersOpen = ref(false)
const datesOpen = ref(false)

function str(v: unknown): string {
  return typeof v === 'string' ? v : ''
}

// One-time init from route.query (not watched afterwards, so router.replace
// below can never trigger a refetch loop).
{
  const qr = route.query
  searchInput.value = str(qr.q)
  q.value = str(qr.q)
  category.value = str(qr.category)
  section.value = str(qr.section)
  difficulty.value = str(qr.difficulty)
  depth.value = str(qr.depth)
  windowVal.value = str(qr.window)
  date.value = str(qr.date)
  tg.value = str(qr.tg) === '1' || str(qr.tg) === 'true'
  const qs = str(qr.sort)
  if (qs === 'newest' || qs === 'oldest' || qs === 'tg' || qs === 'hardest') sort.value = qs
}

// 9. URL sync: write filter state back to the query string (omitting defaults).
watch([q, category, section, difficulty, depth, windowVal, date, tg, sort], () => {
  page.value = 1
  const query: Record<string, string> = {}
  if (q.value) query.q = q.value
  if (category.value) query.category = category.value
  if (section.value) query.section = section.value
  if (difficulty.value) query.difficulty = difficulty.value
  if (depth.value) query.depth = depth.value
  if (windowVal.value) query.window = windowVal.value
  if (date.value) query.date = date.value
  if (tg.value) query.tg = '1'
  if (sort.value !== 'newest') query.sort = sort.value
  router.replace({ query }).catch(() => {})
})

// An exact date and a timeframe window are mutually exclusive.
watch(windowVal, (v) => { if (v) date.value = '' })
watch(date, (v) => { if (v) windowVal.value = '' })

// Search debounce (manual setTimeout pattern, 300ms)
let debounceTimer: ReturnType<typeof setTimeout> | null = null
watch(searchInput, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    q.value = val.trim()
  }, 300)
})

function clearSearch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  searchInput.value = ''
  q.value = ''
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})

// ---------------------------------------------------------------------------
// 7. Server-paginated feed with page accumulation
// ---------------------------------------------------------------------------
const { data, pending, error, refresh } = await useFetch('/api/ca/feed', {
  key: 'ca-feed-page',
  query: computed(() => ({
    q: q.value || undefined,
    category: category.value || undefined,
    section: section.value || undefined,
    difficulty: difficulty.value || undefined,
    depth: depth.value || undefined,
    window: windowVal.value || undefined,
    date: date.value || undefined,
    tg: tg.value ? '1' : undefined,
    sort: sort.value,
    page: page.value,
    limit: PAGE_SIZE,
  })),
  watch: [q, category, section, difficulty, depth, windowVal, date, tg, sort, page],
})

const items = ref<any[]>([])

// Accumulate pages; reset whenever the server reports page 1.
watch(data, (val: any) => {
  if (!val) return
  const list = val.items ?? []
  if (val.page === 1) {
    items.value = [...list]
  } else {
    const seen = new Set(items.value.map((i: any) => i.id))
    items.value = [...items.value, ...list.filter((i: any) => !seen.has(i.id))]
  }
}, { immediate: true })

const total = computed(() => data.value?.total ?? 0)
const facets = computed(() => data.value?.facets ?? null)

function loadMore() {
  if (pending.value) return
  page.value += 1
}

const resultCountText = computed(() => {
  if (pending.value && items.value.length === 0) return 'Loading...'
  if (items.value.length < total.value) return `${items.value.length} of ${total.value}`
  return `${total.value} ${total.value === 1 ? 'result' : 'results'}`
})

// ---------------------------------------------------------------------------
// 8. Day grouping (IST calendar dates)
// ---------------------------------------------------------------------------
const IST_OFFSET = 5.5 * 60 * 60 * 1000
const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function entryDate(e: any): string {
  return e?.meta?.event_date || e?.meta?.date || e?.meta?.published_at || ''
}

function istDateKey(iso: string): string {
  if (!iso) return 'unknown'
  const t = new Date(iso).getTime()
  if (Number.isNaN(t)) return 'unknown'
  const ist = new Date(t + IST_OFFSET)
  const y = ist.getUTCFullYear()
  const m = String(ist.getUTCMonth() + 1).padStart(2, '0')
  const d = String(ist.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function todayIstKey(): string {
  const ist = new Date(Date.now() + IST_OFFSET)
  const y = ist.getUTCFullYear()
  const m = String(ist.getUTCMonth() + 1).padStart(2, '0')
  const d = String(ist.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function dayLabel(key: string): string {
  if (key === 'unknown') return 'Undated'
  const today = todayIstKey()
  if (key === today) return 'Today'
  const [y, m, d] = key.split('-').map(Number)
  const utc = Date.UTC(y, m - 1, d)
  if (key === istDateKey(new Date(Date.parse(today) - 86400000).toISOString())) return 'Yesterday'
  const dt = new Date(utc)
  return `${DAY_NAMES[dt.getUTCDay()]}, ${d} ${MONTH_SHORT[m - 1]} ${y}`
}

const groups = computed(() => {
  const map = new Map<string, any[]>()
  for (const item of items.value) {
    const key = istDateKey(entryDate(item))
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(item)
  }
  return [...map.entries()].map(([key, list]) => ({
    key,
    label: dayLabel(key),
    items: list,
  }))
})

// ---------------------------------------------------------------------------
// 9. Reading state (new/unread) + density preference
// ---------------------------------------------------------------------------

const stateReady = ref(false)
onMounted(() => { stateReady.value = true })

const newSinceCount = computed(() => (stateReady.value ? newCount(items.value) : 0))

function isNewCard(item: any): boolean {
  return stateReady.value && isNewSinceLastVisit(item)
}

function onMarkAllRead(): void {
  markAllRead()
}

const density = ref<'comfortable' | 'compact'>('comfortable')

if (import.meta.client) {
  try {
    const stored = localStorage.getItem('tgprb:ca:density')
    if (stored === 'compact' || stored === 'comfortable') density.value = stored
  } catch {
    // Storage blocked
  }
}

function toggleDensity(): void {
  density.value = density.value === 'compact' ? 'comfortable' : 'compact'
  if (import.meta.client) {
    try {
      localStorage.setItem('tgprb:ca:density', density.value)
    } catch {
      // Storage blocked
    }
  }
}


// ---------------------------------------------------------------------------
// 10. Active filter chips + reset
// ---------------------------------------------------------------------------

const activeFilterCount = computed(() => {
  let n = 0
  if (q.value) n++
  if (category.value) n++
  if (section.value) n++
  if (difficulty.value) n++
  if (depth.value) n++
  if (windowVal.value) n++
  if (date.value) n++
  if (tg.value) n++
  return n
})

interface ActiveChip {
  key: string
  label: string
  onRemove: () => void
}

const activeChips = computed<ActiveChip[]>(() => {
  const chips: ActiveChip[] = []
  if (q.value) chips.push({ key: 'q', label: `Search: ${q.value}`, onRemove: () => clearSearch() })
  if (category.value) chips.push({ key: 'category', label: `Category: ${getCategoryMeta(category.value).label}`, onRemove: () => { category.value = '' } })
  if (section.value) chips.push({ key: 'section', label: `Section: ${section.value}`, onRemove: () => { section.value = '' } })
  if (difficulty.value) {
    const dl = difficulty.value === 'F' ? 'Easy' : difficulty.value === 'O' ? 'Hard' : 'Medium'
    chips.push({ key: 'difficulty', label: `Difficulty: ${dl}`, onRemove: () => { difficulty.value = '' } })
  }
  if (depth.value) chips.push({ key: 'depth', label: `Depth: ${depth.value}`, onRemove: () => { depth.value = '' } })
  if (windowVal.value) {
    const wl = ({ '1D': 'Today', '7D': 'This week', '1M': 'This month', '6M': 'Hot zone', '1Y': 'Last year' } as Record<string, string>)[windowVal.value] ?? windowVal.value
    chips.push({ key: 'window', label: `Timeframe: ${wl}`, onRemove: () => { windowVal.value = '' } })
  }
  if (date.value) chips.push({ key: 'date', label: `Date: ${date.value}`, onRemove: () => { date.value = '' } })
  if (tg.value) chips.push({ key: 'tg', label: 'Telangana focus', onRemove: () => { tg.value = false } })
  return chips
})

function resetAllFilters(): void {
  clearSearch()
  category.value = ''
  section.value = ''
  difficulty.value = ''
  depth.value = ''
  windowVal.value = ''
  date.value = ''
  tg.value = false
  sort.value = 'newest'
}

function onSelectDate(d: string): void {
  date.value = d
  windowVal.value = ''
}


// ---------------------------------------------------------------------------
// 11. Card refs + sticky group header offset
// ---------------------------------------------------------------------------

const cardRefs = new Map<string, any>()
function setCardRef(id: string, el: any): void {
  if (el) cardRefs.set(id, el)
  else cardRefs.delete(id)
}

// Filter bar is sticky at top-14 (56px); group headers stick below it.
const filterBarRef = ref<HTMLElement | null>(null)
const groupHeaderTop = ref('112px')

function measureFilterBar(): void {
  if (!import.meta.client || !filterBarRef.value) return
  const bar = filterBarRef.value.getBoundingClientRect()
  groupHeaderTop.value = `${Math.round(56 + bar.height)}px`
}

onMounted(() => {
  measureFilterBar()
  window.addEventListener('resize', measureFilterBar, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', measureFilterBar)
})

// ---------------------------------------------------------------------------
// 12. Drill mode: one question at a time over the current filtered set
// ---------------------------------------------------------------------------

const drillOpen = ref(false)
const drillIndex = ref(0)
const drillScore = ref(0)
const drillWrong = ref(0)

interface DrillItem {
  item: any
  mcqIndex: number
}

// Flatten every MCQ of every card in the current filtered, loaded set.
const drillQuestions = computed<DrillItem[]>(() => {
  const out: DrillItem[] = []
  for (const item of items.value) {
    const mcqs = Array.isArray(item?.meta?.mcqs) ? item.meta.mcqs : []
    mcqs.forEach((mcq: any, mcqIndex: number) => {
      if (mcq && mcq.question && Array.isArray(mcq.options) && mcq.options.length >= 2) {
        out.push({ item, mcqIndex })
      }
    })
  }
  return out
})

const drillTarget = computed(() => drillQuestions.value.length > 0)

function startDrill(): void {
  if (!drillTarget.value) return
  drillIndex.value = 0
  drillScore.value = 0
  drillWrong.value = 0
  drillOpen.value = true
}
</script>

