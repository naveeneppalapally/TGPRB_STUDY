<template>
  <div class="mx-auto max-w-4xl px-4 py-10">
    <!-- Page header -->
    <header class="mb-8">
      <p class="eyebrow mb-2 flex items-center gap-1.5">
        <UIcon name="i-heroicons-newspaper" class="h-3.5 w-3.5" />
        Daily Updates
      </p>
      <h1 class="text-display mb-2 t-hi">Current Affairs</h1>
      <p class="text-body t-mid">
        Exam-relevant news sourced from PIB, updated daily at 7am IST.
        <span class="font-medium t-mid">85% of TGPRB current-affairs questions come from the last 6 months</span> -
        those cards are marked <span class="inline-flex items-center gap-0.5 text-red-500 font-semibold"><UIcon name="i-heroicons-fire" class="h-3 w-3" />Hot zone</span>.
      </p>

      <!-- Stats row (Clickable quick-filters) -->
      <div class="mt-4 flex flex-wrap gap-3">
        <button
          class="chip cursor-pointer transition-colors hover:border-accent"
          :class="activeDateFilter === '1D' ? 'bg-accent text-white border-accent' : ''"
          @click="activeDateFilter = '1D'"
        >
          <UIcon name="i-heroicons-sun" class="h-3 w-3" />
          {{ todayCount }} today
        </button>
        <button
          class="chip cursor-pointer transition-colors hover:border-accent"
          :class="activeDateFilter === '7D' ? 'bg-accent text-white border-accent' : ''"
          @click="activeDateFilter = '7D'"
        >
          <UIcon name="i-heroicons-calendar-days" class="h-3 w-3" />
          {{ thisWeekCount }} this week
        </button>
        <button
          class="chip cursor-pointer transition-colors hover:border-red-500"
          :class="activeDateFilter === '6M' ? 'bg-red-500 text-white border-red-500' : ''"
          @click="activeDateFilter = '6M'"
        >
          <UIcon name="i-heroicons-fire" class="h-3 w-3 text-red-500" :class="activeDateFilter === '6M' ? 'text-white' : ''" />
          {{ hotZoneCount }} in hot zone (6mo)
        </button>
        <button
          class="chip cursor-pointer transition-colors hover:border-accent"
          :class="activeDateFilter === 'ALL' && activeCategory === 'ALL' ? 'bg-black/10 dark:bg-white/10' : ''"
          @click="activeDateFilter = 'ALL'; activeCategory = 'ALL'"
        >
          <UIcon name="i-heroicons-document-text" class="h-3 w-3" />
          {{ items.length }} total entries
        </button>
        <button
          v-if="tgCount"
          class="chip cursor-pointer transition-colors border-saffron-300 dark:border-saffron-800 hover:border-saffron-500"
          :class="activeCategory === 'telangana' ? 'bg-saffron-500 text-white border-saffron-500' : ''"
          @click="activeCategory = activeCategory === 'telangana' ? 'ALL' : 'telangana'"
        >
          <UIcon name="i-heroicons-map-pin" class="h-3 w-3 text-saffron-500" :class="activeCategory === 'telangana' ? 'text-white' : ''" />
          {{ tgCount }} Telangana focus
        </button>
      </div>
    </header>

    <!-- Digest view switch: Today / This week / etc -->
    <div class="mb-4 flex flex-wrap gap-1.5">
      <button
        v-for="df in dateFilters"
        :key="df.value"
        class="chip cursor-pointer transition-colors"
        :class="activeDateFilter === df.value ? 'bg-accent text-white border-accent' : 'hover:b-line'"
        @click="activeDateFilter = df.value"
      >
        {{ df.label }}
      </button>
    </div>

    <!-- Category breakdown / progress -->
    <section class="mb-6 rounded-lg border b-line bg-sub p-4">
      <div class="mb-3 flex items-center justify-between">
        <p class="eyebrow m-0">Category breakdown</p>
        <p class="text-[11px] t-lo">{{ items.length }} cards across {{ categories.length }} categories</p>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        <button
          v-for="cat in categoryStats"
          :key="cat.id"
          class="flex items-center justify-between gap-2 rounded-md border b-line px-2.5 py-1.5 text-left transition-colors"
          :class="activeCategory === cat.id ? 'bg-accent text-white border-accent' : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'"
          @click="activeCategory = activeCategory === cat.id ? 'ALL' : cat.id"
        >
          <span class="flex items-center gap-1.5 text-[11.5px] font-medium truncate">
            <UIcon :name="cat.icon" class="h-3.5 w-3.5 shrink-0" />
            {{ cat.label }}
          </span>
          <span class="font-mono text-[11px] shrink-0" :class="activeCategory === cat.id ? 'text-white/80' : 't-lo'">
            {{ cat.count }}
          </span>
        </button>
      </div>
    </section>

    <!-- Category filter chips -->
    <div class="mb-6 flex flex-wrap gap-1.5">
      <button
        class="chip transition-colors"
        :class="activeCategory === 'ALL' ? 'bg-accent text-white border-accent' : 'hover:b-line'"
        @click="activeCategory = 'ALL'"
      >
        All categories
      </button>
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="chip transition-colors inline-flex items-center gap-1"
        :class="activeCategory === cat.id ? 'bg-accent text-white border-accent' : 'hover:b-line'"
        @click="activeCategory = cat.id"
      >
        <UIcon :name="cat.icon" class="h-3 w-3" />
        {{ cat.label }}
      </button>
    </div>

    <!-- Entry list -->
    <div v-if="filtered.length" class="flex flex-col gap-3">
      <div
        v-for="item in filtered"
        :key="item.id"
        class="rounded-lg border b-line bg-sub p-4 flex flex-col gap-2 transition-shadow hover:shadow-sm"
        :class="item.meta?.is_telangana_focus ? 'border-l-2 border-l-saffron-500' : ''"
      >
        <CACard :item="item" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="rounded-lg border b-line bg-sub p-10 text-center">
      <UIcon name="i-heroicons-newspaper" class="h-8 w-8 t-lo mx-auto mb-3" />
      <p class="text-body t-mid">No current affairs found for this filter.</p>
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

const { categories, getCategoryMeta } = useCACategories()

// Fetch all current affairs
const { data: allEntries } = await useAsyncData(
  'current-affairs-page',
  () => queryCollection('current_affair').all(),
)

// Filters state
const activeCategory   = ref('ALL')
const activeDateFilter = ref('ALL')

const dateFilters = [
  { label: 'All',           value: 'ALL' },
  { label: 'Today',         value: '1D' },
  { label: 'This week',     value: '7D' },
  { label: 'This month',    value: '1M' },
  { label: 'Hot zone (6mo)', value: '6M' },
  { label: 'Last year',     value: '1Y' },
]

// Sorted all entries newest first
const items = computed(() => {
  if (!allEntries.value) return []
  return [...allEntries.value].sort(
    (a: any, b: any) => new Date(entryDate(b)).getTime() - new Date(entryDate(a)).getTime()
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

// Category breakdown (counts computed off the full unfiltered set)
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
  return e?.meta?.published_at || e?.meta?.event_date || e?.meta?.date
}

function dateCutoff(filter: string): Date {
  if (filter === 'ALL') return new Date(0)
  const now  = new Date()
  const days = filter === '1D' ? 1 : filter === '7D' ? 7 : filter === '1M' ? 30 : filter === '6M' ? 180 : 365
  return new Date(now.getTime() - days * 86400000)
}
</script>
