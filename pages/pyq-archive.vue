<template>
  <div class="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <!-- Header -->
    <header class="mb-8">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-1.5">
            <span class="chip chip-saffron chip-mono">Master Database</span>
            <span class="font-mono text-body-xs t-lo">3,129 Verified Questions · 2015–2023</span>
          </div>
          <h1 class="font-display text-[28px] sm:text-[36px] font-bold tracking-tight t-hi">
            TGPRB PYQ Archive
          </h1>
          <p class="mt-1 text-body-sm t-lo max-w-2xl">
            Browse, search, and practice official Constable &amp; SI exam questions across 10 official papers.
          </p>
        </div>
      </div>
    </header>

    <!-- Search & Filter Controls -->
    <div class="mb-8 space-y-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-sub p-5 shadow-sm">
      <!-- Search Input -->
      <div class="relative">
        <UIcon name="i-heroicons-magnifying-glass" class="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 t-lo" />
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search question text, keywords, or topics..."
          class="w-full rounded-lg border b-line bg-elev py-2.5 pl-10 pr-4 text-body-sm t-hi placeholder:t-lo focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        <button
          v-if="searchInput"
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-body-xs t-lo hover:t-hi font-mono min-h-[36px] px-2 flex items-center"
          @click="clearSearch"
        >
          clear
        </button>
      </div>

      <!-- Subject Tabs Grid -->
      <div>
        <label class="mb-2 block font-mono text-[11px] font-semibold uppercase tracking-wider t-lo">
          Subject:
        </label>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="sub in subjectsList"
            :key="sub.id"
            type="button"
            class="px-3 py-1.5 rounded-lg text-body-xs font-medium transition-all"
            :class="selectedSubject === sub.id ? 'bg-amber-500 text-white font-semibold shadow-sm' : 'bg-elev t-mid hover:t-hi border b-line'"
            @click="selectedSubject = sub.id; onFilterChange()"
          >
            {{ sub.label }} <span v-if="sub.count" class="opacity-75 font-mono text-[10.5px]">({{ sub.count }})</span>
          </button>
        </div>
      </div>

      <!-- Filters Grid -->
      <div class="grid gap-4 sm:grid-cols-2 border-t b-line pt-4">
        <!-- Exam Filter -->
        <div>
          <label class="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider t-lo">
            Exam Type:
          </label>
          <div class="flex gap-2">
            <button
              v-for="examOpt in [
                { id: 'all', label: 'All Exams' },
                { id: 'Constable', label: 'Constable' },
                { id: 'SI', label: 'SI Papers' }
              ]"
              :key="examOpt.id"
              type="button"
              class="flex-1 min-h-[44px] px-3 rounded-lg text-body-xs font-medium text-center transition-all flex items-center justify-center"
              :class="selectedExam === examOpt.id ? 'bg-saffron-500 text-white font-semibold shadow-sm' : 'bg-elev t-mid hover:t-hi border b-line'"
              @click="selectedExam = examOpt.id; onFilterChange()"
            >
              {{ examOpt.label }}
            </button>
          </div>
        </div>

        <!-- Year Filter -->
        <div>
          <label class="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wider t-lo">
            Paper Year:
          </label>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="yr in ['all', '2023', '2022', '2018', '2016', '2015']"
              :key="yr"
              type="button"
              class="min-h-[36px] min-w-[44px] px-2.5 py-1 rounded-md text-[11.5px] font-mono transition-all flex items-center justify-center"
              :class="selectedYear === yr ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/40' : 'bg-elev t-lo hover:t-hi border b-line'"
              @click="selectedYear = yr; onFilterChange()"
            >
              {{ yr === 'all' ? 'All' : yr }}
            </button>
          </div>
        </div>
      </div>

      <!-- Active Filter Status -->
      <div v-if="isFiltered" class="flex items-center justify-between pt-2 border-t b-line text-[11px] t-lo">
        <span>Found <strong>{{ totalResults }}</strong> matching questions</span>
        <button type="button" class="text-amber-600 dark:text-amber-400 hover:underline font-mono" @click="resetAllFilters">
          Reset all filters ×
        </button>
      </div>
    </div>

    <!-- Questions Feed / Skeleton -->
    <div v-if="pending" class="space-y-4">
      <div v-for="i in 4" :key="i" class="panel panel-pad animate-pulse space-y-3">
        <div class="h-4 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div class="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div class="grid grid-cols-2 gap-2">
          <div v-for="j in 4" :key="j" class="h-10 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    </div>

    <div v-else-if="pyqsList.length === 0" class="panel panel-pad py-16 text-center">
      <UIcon name="i-heroicons-archive-box-x-mark" class="mx-auto h-10 w-10 t-lo mb-3" />
      <h3 class="text-body font-semibold t-hi mb-1">No PYQs found</h3>
      <p class="text-body-xs t-lo mb-4 max-w-md mx-auto">
        No questions matched your current search and filter combination. Try adjusting your subject, year, or clearing the search text.
      </p>
      <button type="button" class="btn btn-secondary text-xs px-4 py-2" @click="resetAllFilters">
        Reset All Filters
      </button>
    </div>

    <div v-else class="space-y-4">
      <article
        v-for="(q, idx) in pyqsList"
        :key="q.uid || idx"
        class="panel panel-pad transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-700"
      >
        <!-- Card Meta Header -->
        <div class="mb-3 flex flex-wrap items-center gap-2">
          <span class="chip chip-saffron chip-mono">#{{ (currentPage - 1) * limit + idx + 1 }}</span>
          <span class="chip chip-mono">{{ q.paper_label }}</span>
          <span class="chip chip-jade chip-mono">{{ q.subject_name }}</span>
          <span v-if="q.topic_name" class="chip chip-mono text-[10px] t-lo max-w-[200px] truncate">{{ q.topic_name }}</span>
          <span
            v-if="q.userRevealed && q.userSelected !== null"
            class="chip chip-mono ms-auto"
            :class="q.userSelected === q.correct_option_index ? 'chip-jade' : 'chip-red'"
          >
            {{ q.userSelected === q.correct_option_index ? 'Correct' : 'Missed' }}
          </span>
        </div>

        <!-- Question Text -->
        <p class="mb-4 whitespace-pre-line text-[14px] font-medium leading-[1.7] t-hi">
          {{ q.question_text }}
        </p>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <button
            v-for="(opt, oi) in q.options"
            :key="oi"
            type="button"
            class="opt"
            :class="getOptionClass(q, oi)"
            :disabled="q.userRevealed"
            @click="attemptQuestion(q, oi)"
          >
            <span class="opt-letter">{{ 'ABCD'[oi] }}</span>
            <span class="flex-1 text-left">{{ opt }}</span>
            <UIcon
              v-if="q.userRevealed && oi === q.correct_option_index"
              name="i-heroicons-check-circle-solid"
              class="mt-0.5 h-4 w-4 shrink-0 text-[var(--jade)]"
            />
            <UIcon
              v-else-if="q.userRevealed && oi === q.userSelected"
              name="i-heroicons-x-circle-solid"
              class="mt-0.5 h-4 w-4 shrink-0 text-[var(--red)]"
            />
          </button>
        </div>

        <!-- Explanation -->
        <div v-if="q.userRevealed" class="callout callout-jade mt-4 animate-fade-in">
          <p class="callout-title">
            <UIcon name="i-heroicons-light-bulb" class="h-3.5 w-3.5" />
            Correct Answer: Option {{ 'ABCD'[q.correct_option_index] }} - {{ q.options[q.correct_option_index] }}
          </p>
          <p class="callout-body">{{ q.explanation }}</p>
        </div>

        <button
          v-else
          type="button"
          class="mt-3 font-mono text-[10.5px] uppercase tracking-[0.12em] t-lo transition-colors hover:accent flex items-center gap-1"
          @click="q.userRevealed = true"
        >
          <span>Reveal answer &amp; explanation</span>
          <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
        </button>
      </article>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 dark:border-gray-800 pt-6">
        <p class="font-mono text-body-xs t-lo">
          Page {{ currentPage }} of {{ totalPages }} ({{ totalResults }} items)
        </p>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="min-h-[44px] px-4 py-2 rounded-lg border b-line text-body-xs font-medium t-mid hover:t-hi disabled:opacity-40 flex items-center justify-center"
            :disabled="currentPage <= 1"
            @click="changePage(currentPage - 1)"
          >
            ← Previous
          </button>

          <button
            type="button"
            class="min-h-[44px] px-4 py-2 rounded-lg border b-line text-body-xs font-medium t-mid hover:t-hi disabled:opacity-40 flex items-center justify-center"
            :disabled="currentPage >= totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'TGPRB PYQ Archive · 3,129 Verified Questions | StudyOS',
  meta: [
    { name: 'description', content: 'Browse and practice 3,129 verified official TGPRB Constable and SI previous year questions (2015-2023).' }
  ]
})

interface PyqCard {
  uid: string
  subject_id: string
  subject_name: string
  topic_name: string
  question_type?: string
  difficulty?: string
  correct_option_index: number
  explanation: string
  question_text: string
  options: string[]
  paper_label: string
  exam: string
  year: string
  userSelected?: number | null
  userRevealed?: boolean
}

const searchInput = ref('')
const searchQuery = ref('')
const selectedSubject = ref('all')
const selectedExam = ref('all')
const selectedYear = ref('all')
const currentPage = ref(1)
const limit = ref(20)
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(searchInput, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    searchQuery.value = val.trim()
    currentPage.value = 1
  }, 300)
})

function clearSearch() {
  if (debounceTimer) clearTimeout(debounceTimer)
  searchInput.value = ''
  searchQuery.value = ''
  currentPage.value = 1
}

const subjectsList = [
  { id: 'all', label: 'All Subjects', count: 3129 },
  { id: 'arithmetic', label: 'Arithmetic', count: 676 },
  { id: 'reasoning', label: 'Reasoning', count: 585 },
  { id: 'telangana', label: 'Telangana State', count: 367 },
  { id: 'history', label: 'History of India', count: 329 },
  { id: 'geography', label: 'Geography', count: 326 },
  { id: 'science', label: 'General Science', count: 306 },
  { id: 'polity', label: 'Indian Polity', count: 203 },
  { id: 'economy', label: 'Indian Economy', count: 184 },
  { id: 'english', label: 'General English', count: 153 },
]

const isFiltered = computed(() => {
  return searchQuery.value !== '' || selectedSubject.value !== 'all' || selectedExam.value !== 'all' || selectedYear.value !== 'all'
})

const { data, pending } = await useFetch('/api/pyqs', {
  query: computed(() => ({
    search: searchQuery.value,
    subject: selectedSubject.value,
    exam: selectedExam.value,
    year: selectedYear.value,
    page: currentPage.value,
    limit: limit.value,
  })),
  watch: [searchQuery, selectedSubject, selectedExam, selectedYear, currentPage]
})

const pyqsList = ref<PyqCard[]>([])
const totalResults = computed(() => data.value?.total || 0)
const totalPages = computed(() => data.value?.totalPages || 1)

watch(data, (newVal) => {
  if (newVal?.pyqs) {
    pyqsList.value = newVal.pyqs.map(q => ({
      ...q,
      userSelected: null,
      userRevealed: false
    }))
  }
}, { immediate: true })

function onFilterChange() {
  currentPage.value = 1
}

function resetAllFilters() {
  clearSearch()
  selectedSubject.value = 'all'
  selectedExam.value = 'all'
  selectedYear.value = 'all'
  currentPage.value = 1
}

function changePage(newPage: number) {
  currentPage.value = newPage
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function attemptQuestion(q: PyqCard, optionIdx: number) {
  if (q.userRevealed) return
  q.userSelected = optionIdx
  q.userRevealed = true
}

function getOptionClass(q: PyqCard, oi: number) {
  if (!q.userRevealed) return ''
  if (oi === q.correct_option_index) return 'opt-correct'
  if (oi === q.userSelected) return 'opt-wrong'
  return 'opt-dim'
}
</script>
