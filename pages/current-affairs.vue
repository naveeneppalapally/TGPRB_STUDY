<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <!-- Page header -->
    <header class="mb-8">
      <div class="eyebrow flex items-center gap-2 mb-2">
        <UIcon name="i-heroicons-newspaper" class="h-4 w-4" />
        Daily Updates
      </div>
      <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight t-hi mb-3">
        Current Affairs
      </h1>
      <p class="text-sm sm:text-base leading-relaxed t-mid max-w-3xl">
        Exam-relevant news sourced from PIB, updated daily at 7am IST.
        <span class="font-semibold accent">85% of TGPRB current-affairs questions come from the last 6 months</span> –
        those cards are marked <span class="inline-flex items-center gap-0.5 text-red-500 font-bold"><UIcon name="i-heroicons-fire" class="h-4 w-4" />Hot zone</span>.
      </p>

      <!-- Stats row (Clickable quick-filters) -->
      <div class="mt-5 flex flex-wrap gap-2.5">
        <button
          class="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeDateFilter === '1D'
            ? 'bg-saffron-600 text-white border-saffron-600 shadow-sm'
            : 'b-line bg-sub t-mid hover:border-saffron-500'"
          @click="activeDateFilter = '1D'"
        >
          <UIcon name="i-heroicons-sun" class="h-3.5 w-3.5" />
          {{ todayCount }} today
        </button>
        <button
          class="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeDateFilter === '7D'
            ? 'bg-saffron-600 text-white border-saffron-600 shadow-sm'
            : 'b-line bg-sub t-mid hover:border-saffron-500'"
          @click="activeDateFilter = '7D'"
        >
          <UIcon name="i-heroicons-calendar-days" class="h-3.5 w-3.5" />
          {{ thisWeekCount }} this week
        </button>
        <button
          class="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeDateFilter === '6M'
            ? 'bg-red-600 text-white border-red-600 shadow-sm font-semibold'
            : 'border-red-500/30 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 hover:border-red-500'"
          @click="activeDateFilter = '6M'"
        >
          <UIcon name="i-heroicons-fire" class="h-3.5 w-3.5 text-red-500" :class="activeDateFilter === '6M' ? 'text-white' : ''" />
          {{ hotZoneCount }} in hot zone (6mo)
        </button>
        <button
          class="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeDateFilter === 'ALL' && activeCategory === 'ALL'
            ? 'bg-saffron-600 text-white border-saffron-600 shadow-sm'
            : 'b-line bg-sub t-mid hover:border-saffron-500'"
          @click="activeDateFilter = 'ALL'; activeCategory = 'ALL'"
        >
          <UIcon name="i-heroicons-document-text" class="h-3.5 w-3.5" />
          {{ items.length }} total entries
        </button>
        <button
          v-if="tgCount"
          class="px-3 py-1.5 rounded-md text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeCategory === 'telangana'
            ? 'bg-saffron-600 text-white border-saffron-600 shadow-sm font-semibold'
            : 'border-saffron-300 dark:border-saffron-800 bg-saffron-50 dark:bg-saffron-950/20 text-saffron-700 dark:text-saffron-300 hover:border-saffron-500'"
          @click="activeCategory = activeCategory === 'telangana' ? 'ALL' : 'telangana'"
        >
          <UIcon name="i-heroicons-map-pin" class="h-3.5 w-3.5 text-saffron-500" :class="activeCategory === 'telangana' ? 'text-white' : ''" />
          {{ tgCount }} Telangana focus
        </button>
      </div>
    </header>

    <!-- Date Range Filter Switch -->
    <div class="mb-6 flex flex-wrap items-center gap-2 border-b b-line pb-4">
      <span class="text-xs font-bold uppercase tracking-wider t-lo mr-1">Timeframe:</span>
      <button
        v-for="df in dateFilters"
        :key="df.value"
        class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
        :class="activeDateFilter === df.value
          ? 'bg-saffron-600 text-white shadow-sm'
          : 'bg-black/5 dark:bg-white/5 t-mid hover:bg-black/10 dark:hover:bg-white/10'"
        @click="activeDateFilter = df.value"
      >
        {{ df.label }}
      </button>
    </div>

    <!-- Category Breakdown & Filter Grid -->
    <section class="mb-8 rounded-xl border b-line bg-sub p-5 shadow-sm">
      <div class="mb-4 flex items-center justify-between">
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider t-hi flex items-center gap-2">
            <UIcon name="i-heroicons-funnel" class="h-4 w-4 accent" />
            Filter by Category
          </h2>
          <p class="text-xs t-mid mt-0.5">Click any category to filter the news below</p>
        </div>
        <button
          v-if="activeCategory !== 'ALL'"
          class="text-xs font-semibold accent hover:underline"
          @click="activeCategory = 'ALL'"
        >
          Clear category filter (Show All)
        </button>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        <!-- ALL Categories Option -->
        <button
          class="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-all cursor-pointer"
          :class="activeCategory === 'ALL'
            ? 'bg-saffron-600 text-white border-saffron-600 font-bold shadow-sm'
            : 'b-line bg-white/50 dark:bg-black/20 t-hi hover:border-saffron-500/50'"
          @click="activeCategory = 'ALL'"
        >
          <span class="flex items-center gap-2 text-xs truncate">
            <UIcon name="i-heroicons-squares-2x2" class="h-4 w-4 shrink-0" />
            All Categories
          </span>
          <span class="font-mono text-xs shrink-0" :class="activeCategory === 'ALL' ? 'text-white/90' : 't-lo'">
            {{ items.length }}
          </span>
        </button>

        <!-- Specific Categories -->
        <button
          v-for="cat in categoryStats"
          :key="cat.id"
          class="flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-left transition-all cursor-pointer"
          :class="activeCategory === cat.id
            ? 'bg-saffron-600 text-white border-saffron-600 font-bold shadow-sm'
            : 'b-line bg-white/50 dark:bg-black/20 t-hi hover:border-saffron-500/50'"
          @click="activeCategory = activeCategory === cat.id ? 'ALL' : cat.id"
        >
          <span class="flex items-center gap-2 text-xs truncate">
            <UIcon :name="cat.icon" class="h-4 w-4 shrink-0" />
            {{ cat.label }}
          </span>
          <span class="font-mono text-xs shrink-0" :class="activeCategory === cat.id ? 'text-white/90' : 't-lo'">
            {{ cat.count }}
          </span>
        </button>
      </div>
    </section>

    <!-- Loading skeleton -->
    <div v-if="pending" class="flex flex-col gap-3">
      <div
        v-for="i in 8"
        :key="i"
        class="rounded-lg border b-line bg-sub p-4 space-y-3 animate-pulse"
      >
        <div class="flex gap-2">
          <div class="h-5 w-20 rounded-full bg-black/10 dark:bg-white/10" />
          <div class="h-5 w-12 rounded-full bg-black/10 dark:bg-white/10" />
        </div>
        <div class="h-4 w-3/4 rounded bg-black/10 dark:bg-white/10" />
        <div class="h-10 w-full rounded bg-black/10 dark:bg-white/10" />
      </div>
    </div>

    <!-- Entry list (paginated) -->
    <div ref="resultsRef" v-else-if="filtered.length" class="flex flex-col gap-4">
      <div
        v-for="item in visibleItems"
        :key="item.id"
        class="rounded-xl border b-line bg-sub p-5 flex flex-col gap-2 transition-all hover:shadow-md"
        :class="item.meta?.is_telangana_focus ? 'border-l-4 border-l-saffron-500' : ''"
      >
        <CACard :item="item" />
      </div>

      <!-- Load more -->
      <div v-if="visibleItems.length < filtered.length" class="py-6 text-center">
        <UButton
          variant="solid"
          color="primary"
          size="md"
          :loading="loadingMore"
          class="font-semibold shadow-sm"
          @click="loadMore"
        >
          Load {{ Math.min(PAGE_SIZE, filtered.length - visibleItems.length) }} more cards
          <span class="text-white/80">({{ filtered.length - visibleItems.length }} remaining)</span>
        </UButton>
      </div>

      <p v-else class="text-center text-xs font-medium t-lo py-4">All {{ filtered.length }} cards shown</p>
    </div>

    <!-- Empty state -->
    <div v-else class="rounded-xl border b-line bg-sub p-12 text-center">
      <UIcon name="i-heroicons-newspaper" class="h-10 w-10 t-lo mx-auto mb-3" />
      <h3 class="text-base font-semibold t-hi mb-1">No current affairs found</h3>
      <p class="text-sm t-mid mb-4">Try selecting "All Categories" or choosing a broader timeframe filter.</p>
      <UButton
        color="primary"
        variant="soft"
        size="sm"
        @click="activeCategory = 'ALL'; activeDateFilter = 'ALL'"
      >
        Reset All Filters
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { queryCollection } from '#imports'
import { useCACategories } from '@/composables/useCACategories'

useHead({
  title: 'Current Affairs - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Daily exam-relevant current affairs for TGPRB/TSPSC Police Constable and SI exams. Updated every morning.' }],
})

const { categories } = useCACategories()

// Ref for scrolling to results when a filter is applied
const resultsRef = ref<HTMLElement | null>(null)

function scrollToResults() {
  nextTick(() => {
    resultsRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

// Fetch all current affairs - select only frontmatter fields needed for display
const { data: allEntries, pending } = await useAsyncData(
  'current-affairs-page',
  () => queryCollection('current_affair').select(
    'id', 'meta'
  ).all(),
)

// Filters state
const activeCategory   = ref('ALL')
const activeDateFilter = ref('ALL')

const dateFilters = [
  { label: 'All',            value: 'ALL' },
  { label: 'Today',          value: '1D' },
  { label: 'This week',      value: '7D' },
  { label: 'This month',     value: '1M' },
  { label: 'Hot zone (6mo)', value: '6M' },
  { label: 'Last year',      value: '1Y' },
]

// Pagination state
const PAGE_SIZE = 30
const page = ref(1)
const loadingMore = ref(false)

// Reset pagination and scroll to results whenever filters change
watch([activeCategory, activeDateFilter], () => {
  page.value = 1
  scrollToResults()
})

// Only render the current page slice
const visibleItems = computed(() => filtered.value.slice(0, page.value * PAGE_SIZE))

function loadMore() {
  loadingMore.value = true
  requestAnimationFrame(() => {
    page.value++
    loadingMore.value = false
  })
}

// Sorted all entries newest first
const items = computed(() => {
  if (!allEntries.value) return []
  return [...allEntries.value].sort(
    (a: any, b: any) => new Date(entryDate(b) ?? 0).getTime() - new Date(entryDate(a) ?? 0).getTime()
  )
})

// Filtered by active filters
const filtered = computed(() => {
  const cutoff = dateCutoff(activeDateFilter.value)
  return items.value.filter((e: any) => {
    const cat  = (e.meta?.category ?? '').toLowerCase()
    const date = new Date(entryDate(e) ?? 0)
    const categoryOk = activeCategory.value === 'ALL' || cat === activeCategory.value
    const dateOk      = activeDateFilter.value === 'ALL' || date >= cutoff
    return categoryOk && dateOk
  })
})

// Category breakdown (counts computed off the full set)
const categoryStats = computed(() =>
  categories.map((cat) => ({
    ...cat,
    count: items.value.filter((e: any) => (e.meta?.category ?? '').toLowerCase() === cat.id).length,
  })).sort((a, b) => b.count - a.count)
)

// Stats
const todayCount = computed(() => {
  const cutoff = dateCutoff('1D')
  return items.value.filter((e: any) => new Date(entryDate(e) ?? 0) >= cutoff).length
})
const thisWeekCount = computed(() => {
  const cutoff = dateCutoff('7D')
  return items.value.filter((e: any) => new Date(entryDate(e) ?? 0) >= cutoff).length
})
const hotZoneCount = computed(() => {
  const cutoff = dateCutoff('6M')
  return items.value.filter((e: any) => new Date(entryDate(e) ?? 0) >= cutoff).length
})
const tgCount = computed(() =>
  items.value.filter((e: any) => e.meta?.is_telangana_focus).length
)

// Helpers
function entryDate(e: any): string | undefined {
  // event_date is the real date the news happened (what the card displays)
  // Fall back to published_at / date only if event_date is missing
  return e?.meta?.event_date || e?.meta?.date || e?.meta?.published_at
}

function dateCutoff(filter: string): Date {
  if (filter === 'ALL') return new Date(0)
  const now = new Date()
  if (filter === '1D') {
    // "Today" = this calendar day in IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000
    const istNow = new Date(now.getTime() + istOffset)
    const startOfDayIST = new Date(Date.UTC(
      istNow.getUTCFullYear(),
      istNow.getUTCMonth(),
      istNow.getUTCDate()
    ) - istOffset)
    return startOfDayIST
  }
  const days = filter === '7D' ? 7 : filter === '1M' ? 30 : filter === '6M' ? 180 : 365
  return new Date(now.getTime() - days * 86400000)
}
</script>
