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
        Exam-relevant news updated every day at 7am IST. Sourced from The Hindu, PIB, Telangana Today and more.
      </p>

      <!-- Stats row -->
      <div class="mt-4 flex flex-wrap gap-3">
        <span class="chip">
          <UIcon name="i-heroicons-calendar-days" class="h-3 w-3" />
          {{ thisWeekCount }} new this week
        </span>
        <span class="chip">
          <UIcon name="i-heroicons-document-text" class="h-3 w-3" />
          {{ items.length }} total entries
        </span>
        <span v-if="tgCount" class="chip">
          <UIcon name="i-heroicons-map-pin" class="h-3 w-3 text-saffron-500" />
          {{ tgCount }} Telangana focus
        </span>
      </div>
    </header>

    <!-- Filters -->
    <div class="mb-6 flex flex-wrap gap-2">
      <!-- Section filter -->
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="sec in sections"
          :key="sec.value"
          class="chip transition-colors"
          :class="activeSection === sec.value ? 'bg-accent text-white border-accent' : 'hover:b-line'"
          @click="activeSection = sec.value"
        >
          {{ sec.label }}
        </button>
      </div>

      <!-- Divider -->
      <div class="h-6 w-px bg-black/10 dark:bg-white/10 self-center mx-1" />

      <!-- Date filter -->
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="df in dateFilters"
          :key="df.value"
          class="chip transition-colors"
          :class="activeDateFilter === df.value ? 'bg-accent text-white border-accent' : 'hover:b-line'"
          @click="activeDateFilter = df.value"
        >
          {{ df.label }}
        </button>
      </div>
    </div>

    <!-- Entry list -->
    <div v-if="filtered.length" class="flex flex-col gap-3">
      <article
        v-for="item in filtered"
        :key="item.id"
        class="rounded-lg border b-line bg-sub p-4 flex flex-col gap-2 transition-shadow hover:shadow-sm"
        :class="item.meta?.is_telangana_focus ? 'border-l-2 border-l-saffron-500' : ''"
      >
        <div class="flex items-start justify-between gap-3 flex-wrap">
          <!-- Left: date + section chip -->
          <div class="flex items-center gap-2 flex-wrap">
            <time
              :datetime="item.meta?.date"
              class="font-mono text-[10px] uppercase tracking-widest t-lo"
            >
              {{ formatDate(item.meta?.date) }}
            </time>
            <span class="chip text-[10px]">{{ item.meta?.exam_section }}</span>
            <span
              v-if="item.meta?.is_telangana_focus"
              class="inline-flex items-center gap-1 rounded-full bg-saffron-500/10 dark:bg-saffron-500/20 text-saffron-600 dark:text-saffron-400 px-2 py-0.5 text-[10px] font-semibold border border-saffron-500/20"
            >
              <UIcon name="i-heroicons-map-pin" class="h-3 w-3" />
              TG Focus
            </span>
          </div>

          <!-- Right: related note chips -->
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tid in (item.meta?.related_topic_ids ?? [])"
              :key="tid"
              class="chip text-[10px] opacity-60"
            >
              {{ tid.replace('NOTE-', '') }}
            </span>
          </div>
        </div>

        <!-- Headline -->
        <p class="text-body-sm font-semibold leading-snug t-hi">
          {{ item.meta?.headline }}
        </p>

        <!-- Source link -->
        <a
          v-if="item.meta?.source_url"
          :href="item.meta.source_url"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex w-fit items-center gap-1 rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-body-xs t-lo hover:accent transition-colors"
        >
          <UIcon name="i-heroicons-arrow-top-right-on-square" class="h-3 w-3 shrink-0" />
          {{ sourceDomain(item.meta?.source_url) }}
        </a>
      </article>
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

useHead({
  title: 'Current Affairs - TGPRB StudyOS',
  meta: [{ name: 'description', content: 'Daily exam-relevant current affairs for TGPRB/TSPSC Police Constable and SI exams. Updated every morning.' }],
})

// Fetch all current affairs
const { data: allEntries } = await useAsyncData(
  'current-affairs-page',
  () => queryCollection('current_affair').all(),
)

// Filters state
const activeSection    = ref('ALL')
const activeDateFilter = ref('3M')

const sections = [
  { label: 'All',          value: 'ALL' },
  { label: 'Telangana',    value: 'Telangana' },
  { label: 'Geography',    value: 'Geography' },
  { label: 'Polity',       value: 'Polity' },
  { label: 'Economy',      value: 'Economy' },
  { label: 'Science',      value: 'Science & Technology' },
  { label: 'History',      value: 'History' },
]

const dateFilters = [
  { label: 'This week',    value: '7D' },
  { label: 'This month',   value: '1M' },
  { label: 'Last 3 months', value: '3M' },
  { label: 'Last year',    value: '1Y' },
]

// Sorted all entries newest first
const items = computed(() => {
  if (!allEntries.value) return []
  return [...allEntries.value].sort(
    (a: any, b: any) => new Date(b.meta?.date).getTime() - new Date(a.meta?.date).getTime()
  )
})

// Filtered by active filters
const filtered = computed(() => {
  const cutoff = dateCutoff(activeDateFilter.value)
  return items.value.filter((e: any) => {
    const sec  = e.meta?.exam_section ?? ''
    const date = new Date(e.meta?.date ?? 0)
    const sectionOk = activeSection.value === 'ALL' || sec === activeSection.value
    const dateOk    = date >= cutoff
    return sectionOk && dateOk
  })
})

// Stats
const thisWeekCount = computed(() => {
  const cutoff = dateCutoff('7D')
  return items.value.filter((e: any) => new Date(e.meta?.date ?? 0) >= cutoff).length
})
const tgCount = computed(() =>
  items.value.filter((e: any) => e.meta?.is_telangana_focus).length
)

// Helpers
function dateCutoff(filter: string): Date {
  const now  = new Date()
  const days = filter === '7D' ? 7 : filter === '1M' ? 30 : filter === '3M' ? 90 : 365
  return new Date(now.getTime() - days * 86400000)
}

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function sourceDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url }
}
</script>
