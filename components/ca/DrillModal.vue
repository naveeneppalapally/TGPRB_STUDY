<template>
  <UModal v-model="open" :ui="{ width: 'w-full sm:max-w-2xl' }">
    <div class="flex max-h-[85dvh] flex-col overflow-hidden bg-elev">
      <!-- Header -->
      <div class="flex items-center justify-between border-b b-line px-4 py-3 sm:px-5">
        <div>
          <p class="eyebrow mb-0.5 flex items-center gap-1.5">
            <UIcon name="i-heroicons-academic-cap" class="h-3 w-3" />
            Current affairs drill
          </p>
          <p class="text-body-xs t-lo">
            <span v-if="!finished">Question {{ index + 1 }} of {{ questions.length }}</span>
            <span v-else>Drill complete</span>
          </p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          aria-label="Close drill"
          @click="open = false"
        />
      </div>

      <!-- Progress bar -->
      <div class="h-1 w-full bg-inset">
        <div
          class="h-full bg-saffron-500 transition-all duration-300"
          :style="{ width: `${progressPct}%` }"
        />
      </div>

      <!-- Question body -->
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-5">
        <template v-if="!finished && current">
          <p class="eyebrow mb-2 flex items-center gap-2">
            <span class="chip chip-saffron chip-mono">{{ current.item.meta?.category || 'General' }}</span>
            <span v-if="current.item.meta?.is_telangana_focus" class="chip chip-mono">TG</span>
          </p>
          <h3 class="text-[15px] font-semibold leading-snug t-hi">
            {{ currentMcq.question }}
          </h3>

          <!-- Options -->
          <div class="mt-4 flex flex-col gap-2">
            <button
              v-for="(opt, oi) in currentMcq.options"
              :key="oi"
              type="button"
              class="press flex min-h-[44px] items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left text-[13px] transition-colors"
              :class="optionClass(oi)"
              :disabled="answered !== null"
              @click="answer(oi)"
            >
              <span
                class="grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-[11px] font-bold"
                :class="letterClass(oi)"
              >
                {{ 'ABCD'[oi] }}
              </span>
              <span class="flex-1">{{ opt }}</span>
            </button>
          </div>

          <!-- Feedback -->
          <div v-if="answered !== null" class="mt-4 rounded-lg border p-3 text-[12.5px] leading-relaxed"
            :class="answeredCorrect ? 'border-[var(--jade-line)] bg-[var(--jade-soft)]' : 'border-[var(--red-line)] bg-[var(--red-soft)]'"
          >
            <p class="font-semibold" :class="answeredCorrect ? 'text-[var(--jade)]' : 'text-[var(--red)]'">
              {{ answeredCorrect ? 'Correct.' : 'Not quite - this was added to your review queue.' }}
            </p>
            <p v-if="currentMcq.explanation" class="mt-1 t-mid">{{ currentMcq.explanation }}</p>
          </div>
        </template>

        <!-- End screen -->
        <template v-else-if="finished">
          <div class="py-8 text-center">
            <span class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full" style="background: var(--jade-soft); color: var(--jade);">
              <UIcon name="i-heroicons-trophy" class="h-7 w-7" />
            </span>
            <h3 class="font-display text-xl font-bold t-hi">Drill complete</h3>
            <p class="mt-2 text-sm t-mid">
              You answered <span class="num font-bold t-hi">{{ score }}</span> of
              <span class="num font-bold t-hi">{{ questions.length }}</span> correctly.
            </p>
            <p v-if="wrong > 0" class="mt-2 text-xs t-lo">
              {{ wrong }} {{ wrong === 1 ? 'question' : 'questions' }} you missed {{ wrong === 1 ? 'was' : 'were' }} added to your FSRS review queue.
            </p>
            <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
              <UButton color="primary" class="min-h-[44px]" @click="restart">Restart drill</UButton>
              <UButton to="/review" color="gray" variant="soft" class="min-h-[44px]">Open review queue</UButton>
              <UButton color="gray" variant="ghost" class="min-h-[44px]" @click="open = false">Back to feed</UButton>
            </div>
          </div>
        </template>
      </div>

      <!-- Footer nav -->
      <div v-if="!finished" class="flex items-center justify-between border-t b-line px-4 py-3 sm:px-5">
        <p class="num font-mono text-[11px] t-lo">
          Score {{ score }} / {{ answeredCount }}
        </p>
        <UButton
          v-if="answered !== null"
          color="primary"
          class="min-h-[44px]"
          @click="next"
        >
          {{ index + 1 >= questions.length ? 'Finish' : 'Next question' }}
        </UButton>
        <span v-else class="text-body-xs t-lo">Select an answer to continue</span>
      </div>
    </div>
  </UModal>
</template>


<script setup lang="ts">
import { useCAState } from '@/composables/useCAState'

interface DrillItem {
  item: any
  mcqIndex: number
}

const props = defineProps<{
  questions: DrillItem[]
}>()

const open = defineModel<boolean>('open', { default: false })
const index = defineModel<number>('index', { default: 0 })
const score = defineModel<number>('score', { default: 0 })
const wrong = defineModel<number>('wrong', { default: 0 })

const { recordAttempt, markRead } = useCAState()

const answered = ref<number | null>(null)
const answeredCount = ref(0)

const current = computed(() => props.questions[index.value] ?? null)
const currentMcq = computed(() => {
  const c = current.value
  if (!c) return { question: '', options: [], answer: -1, explanation: '' }
  return c.item.meta?.mcqs?.[c.mcqIndex] ?? { question: '', options: [], answer: -1, explanation: '' }
})

const finished = computed(() => props.questions.length > 0 && index.value >= props.questions.length)
const progressPct = computed(() =>
  props.questions.length === 0 ? 0 : Math.min(100, Math.round((answeredCount.value / props.questions.length) * 100)),
)

const answeredCorrect = computed(() =>
  answered.value !== null && answered.value === currentMcq.value.answer,
)

function optionClass(oi: number): string {
  if (answered.value === null) {
    return 'b-line bg-sub t-hi hover:border-[var(--line-strong)]'
  }
  if (oi === currentMcq.value.answer) {
    return 'border-[var(--jade-line)] bg-[var(--jade-soft)] t-hi'
  }
  if (oi === answered.value) {
    return 'border-[var(--red-line)] bg-[var(--red-soft)] t-mid'
  }
  return 'b-line bg-sub t-lo opacity-60'
}

function letterClass(oi: number): string {
  if (answered.value === null) return 'b-line t-lo'
  if (oi === currentMcq.value.answer) return 'border-[var(--jade-line)] bg-[var(--jade)] text-white'
  if (oi === answered.value) return 'border-[var(--red-line)] bg-[var(--red)] text-white'
  return 'b-line t-lo'
}

function answer(oi: number): void {
  if (answered.value !== null || !current.value) return
  answered.value = oi
  answeredCount.value += 1
  const res = recordAttempt(current.value.item, current.value.mcqIndex, oi)
  if (res.correct) {
    score.value += 1
  } else {
    wrong.value += 1
  }
  markRead(String(current.value.item.id))
}

function next(): void {
  answered.value = null
  index.value += 1
}

function restart(): void {
  index.value = 0
  score.value = 0
  wrong.value = 0
  answeredCount.value = 0
  answered.value = null
}

watch(open, (v) => {
  if (v) {
    answered.value = null
    answeredCount.value = 0
  }
})
</script>
