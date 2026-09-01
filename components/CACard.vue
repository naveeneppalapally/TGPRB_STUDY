<template>
  <div class="flex flex-col gap-3">
    <!-- Header: Category pill + TG Focus + Hot zone + Date -->
    <div class="flex items-center justify-between gap-2 flex-wrap">
      <div class="flex items-center gap-2">
        <span :class="['chip text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1', categoryMeta.colorClass]">
          <UIcon :name="categoryMeta.icon" class="h-3 w-3" />
          {{ categoryMeta.label }}
        </span>
        <span
          v-if="item.meta.difficulty"
          :class="difficultyClass"
          class="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
        >
          {{ difficultyLabel }}
        </span>
        <span
          v-if="item.meta.is_telangana_focus"
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
      </div>
      <time
        :datetime="item.meta.event_date || item.meta.date"
        class="font-mono text-[11px] uppercase tracking-[0.1em] t-lo"
      >
        {{ formatDate(item.meta.event_date || item.meta.date) }}
      </time>
    </div>

    <!-- Headline -->
    <h3 class="text-base sm:text-lg font-bold leading-snug t-hi tracking-tight my-1">
      {{ item.meta.headline }}
    </h3>

    <!-- Exam fact highlight (from first MCQ) -->
    <p class="text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 p-2 rounded-md border border-emerald-100 dark:border-emerald-900/50">
      <UIcon name="i-heroicons-light-bulb" class="inline-block h-4 w-4 mr-1 align-text-bottom" />
      {{ item.meta.exam_fact }}
    </p>

    <!-- Summary -->
    <p v-if="item.meta.summary" class="text-xs leading-relaxed t-mid">
      {{ item.meta.summary }}
    </p>

    <!-- Footer: Source link + Test yourself -->
    <div class="mt-auto pt-2 flex items-center justify-between border-t b-line flex-wrap gap-2">
      <a
        v-if="item.meta.source_url || item.meta.canonical_source_url"
        :href="item.meta.canonical_source_url || item.meta.source_url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded bg-black/5 dark:bg-white/5 px-2 py-1 text-[11px] font-medium t-lo transition-colors hover:accent"
      >
        <UIcon
          :name="item.meta.source_type === 'official' ? 'i-heroicons-building-library' : 'i-heroicons-newspaper'"
          class="h-3.5 w-3.5 shrink-0"
        />
        {{ item.meta.source_name || sourceDomain(item.meta.canonical_source_url || item.meta.source_url) }}
      </a>

      <UButton
        v-if="mcqs.length > 0"
        size="xs"
        color="white"
        variant="solid"
        icon="i-heroicons-academic-cap"
        @click="toggleMCQ"
      >
        {{ showMCQ ? 'Hide' : `Test yourself${mcqs.length > 1 ? ` (${mcqs.length} Qs)` : ''}` }}
      </UButton>
    </div>

    <!-- Multi-MCQ panel -->
    <div
      v-if="mcqs.length > 0 && showMCQ"
      class="rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm overflow-hidden"
    >
      <!-- Question navigator (only shown when >1 question) -->
      <div v-if="mcqs.length > 1" class="flex items-center justify-between px-3 py-2 border-b border-black/10 dark:border-white/10">
        <span class="text-[11px] font-semibold t-lo uppercase tracking-wider">
          Question {{ currentQ + 1 }} of {{ mcqs.length }}
        </span>
        <div class="flex items-center gap-1">
          <!-- Progress dots -->
          <button
            v-for="(_, i) in mcqs"
            :key="i"
            type="button"
            class="flex items-center justify-center min-h-[36px] min-w-[24px] p-1"
            :aria-label="`Question ${i + 1}`"
            @click="goToQ(i)"
          >
            <span
              class="h-2 w-2 rounded-full transition-colors block"
              :class="i === currentQ
                ? 'bg-emerald-500'
                : answers[i] !== undefined
                  ? (answers[i] === mcqs[i].answer ? 'bg-green-400' : 'bg-red-400')
                  : 'bg-black/20 dark:bg-white/20'"
            />
          </button>
        </div>
        <div class="flex gap-1">
          <UButton
            size="sm"
            variant="ghost"
            color="gray"
            icon="i-heroicons-chevron-left"
            class="min-h-[44px] min-w-[44px] flex items-center justify-center"
            :disabled="currentQ === 0"
            aria-label="Previous question"
            @click="goToQ(currentQ - 1)"
          />
          <UButton
            size="sm"
            variant="ghost"
            color="gray"
            icon="i-heroicons-chevron-right"
            class="min-h-[44px] min-w-[44px] flex items-center justify-center"
            :disabled="currentQ === mcqs.length - 1"
            aria-label="Next question"
            @click="goToQ(currentQ + 1)"
          />
        </div>
      </div>

      <!-- Current question -->
      <div class="p-3">
        <p class="font-medium t-hi mb-3">{{ currentMCQ.question }}</p>
        <div class="flex flex-col gap-2">
          <UButton
            v-for="(option, idx) in currentMCQ.options"
            :key="idx"
            size="sm"
            :color="optionColor(idx)"
            :variant="currentAnswer !== undefined ? 'solid' : 'soft'"
            class="justify-start text-left whitespace-normal h-auto py-2"
            :disabled="currentAnswer !== undefined"
            @click="selectOption(idx)"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ option }}
          </UButton>
        </div>

        <!-- Feedback -->
        <div v-if="currentAnswer !== undefined" class="mt-3 p-2 rounded bg-black/5 dark:bg-white/5 text-xs t-mid">
          <p
            class="font-semibold mb-1"
            :class="isCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
          >
            {{ isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${String.fromCharCode(65 + currentMCQ.answer)}` }}
          </p>
          <p>{{ currentMCQ.explanation }}</p>

          <!-- Auto-advance to next question -->
          <UButton
            v-if="currentQ < mcqs.length - 1"
            size="xs"
            color="gray"
            variant="soft"
            class="mt-2"
            icon="i-heroicons-arrow-right"
            @click="goToQ(currentQ + 1)"
          >
            Next question
          </UButton>
          <p v-else-if="allAnswered" class="mt-2 text-emerald-600 dark:text-emerald-400 font-semibold">
            All {{ mcqs.length }} questions answered! Score: {{ score }}/{{ mcqs.length }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCACategories } from '@/composables/useCACategories'

const props = defineProps<{
  item: any
}>()

const { getCategoryMeta } = useCACategories()

// Normalise: support both new mcqs array and legacy single mcq
const mcqs = computed<any[]>(() => {
  const meta = props.item.meta
  if (Array.isArray(meta.mcqs) && meta.mcqs.length > 0) return meta.mcqs
  if (meta.mcq && meta.mcq.question) return [meta.mcq]
  return []
})

// MCQ state
const showMCQ = ref(false)
const currentQ = ref(0)
// answers[i] = selected option index for question i, undefined if not answered
const answers = ref<(number | undefined)[]>([])

function toggleMCQ() {
  showMCQ.value = !showMCQ.value
  if (showMCQ.value) {
    currentQ.value = 0
    answers.value = mcqs.value.map(() => undefined)
  }
}

function goToQ(i: number) {
  if (i >= 0 && i < mcqs.value.length) currentQ.value = i
}

function selectOption(idx: number) {
  if (answers.value[currentQ.value] !== undefined) return
  const updated = [...answers.value]
  updated[currentQ.value] = idx
  answers.value = updated
}

const currentMCQ = computed(() => mcqs.value[currentQ.value] ?? {})
const currentAnswer = computed(() => answers.value[currentQ.value])
const isCorrect = computed(() => currentAnswer.value === currentMCQ.value?.answer)
const allAnswered = computed(() => answers.value.every(a => a !== undefined))
const score = computed(() =>
  answers.value.filter((a, i) => a === mcqs.value[i]?.answer).length
)

function optionColor(idx: number) {
  if (currentAnswer.value === undefined) return 'gray'
  if (idx === currentMCQ.value?.answer) return 'green'
  if (idx === currentAnswer.value) return 'red'
  return 'gray'
}

// Difficulty badge
const difficultyLabel = computed(() => {
  const d = props.item.meta.difficulty
  if (d === 'F') return 'Easy'
  if (d === 'O') return 'Hard'
  return 'Medium'
})

const difficultyClass = computed(() => {
  const d = props.item.meta.difficulty
  if (d === 'F') return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
  if (d === 'O') return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
  return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
})

const categoryMeta = computed(() => getCategoryMeta(props.item.meta.category))

// Hot zone: last 6 months (180 days). PYQ analysis shows 85% of current
// affairs questions are drawn from this window (see AGENTS.md).
const isHotZone = computed(() => {
  const iso = props.item.meta.published_at || props.item.meta.event_date || props.item.meta.date
  if (!iso) return false
  const days = (Date.now() - new Date(iso).getTime()) / 86400000
  return days >= 0 && days <= 180
})

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function sourceDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url || '' }
}
</script>
