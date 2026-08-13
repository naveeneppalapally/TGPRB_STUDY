<template>
  <ClientOnly>
    <div v-if="quiz" class="rounded-xl border b-line overflow-hidden" @keydown="handleKey" tabindex="0">
      <!-- Header -->
      <div class="flex items-center justify-between px-5 py-3.5 border-b b-line">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-lock-closed" class="h-4 w-4 text-saffron-500" />
          <h3 class="font-semibold text-[13px] t-hi">Comprehension Gate</h3>
          <span class="font-mono text-[10px] t-lo">
            {{ submitted ? 'Done' : `Q${currentQ + 1} of ${quiz.questions.length}` }}
          </span>
        </div>
        <span class="text-[11px] t-lo">Pass {{ quiz.pass_threshold }}/{{ quiz.questions.length }} to unlock flashcards</span>
      </div>

      <!-- Question view (one at a time) -->
      <div v-if="!submitted">
        <Transition :name="slideDir" mode="out-in">
          <div :key="currentQ" class="px-5 py-5">
            <!-- Question text -->
            <p class="font-medium text-[14px] leading-[1.7] t-hi mb-4">
              <span class="font-mono text-saffron-500 mr-1.5">Q{{ currentQ + 1 }}.</span>
              {{ quiz.questions[currentQ].question }}
            </p>

            <!-- Options -->
            <div class="flex flex-col gap-2">
              <label
                v-for="(opt, oi) in quiz.questions[currentQ].options"
                :key="oi"
                class="opt"
                :class="answers[currentQ] === oi ? 'opt-selected' : ''"
              >
                <input
                  type="radio"
                  :name="`gate-q-${currentQ}`"
                  :value="oi"
                  v-model="answers[currentQ]"
                  class="sr-only"
                />
                <span
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  :class="answers[currentQ] === oi
                    ? 'border-saffron-500 bg-saffron-500'
                    : 'border-gray-300 dark:border-gray-700'"
                >
                  <span v-if="answers[currentQ] === oi" class="w-2 h-2 rounded-full bg-white" />
                </span>
                <span class="text-[13px] flex-1" :class="answers[currentQ] === oi ? 't-hi font-medium' : 't-mid'">
                  {{ opt }}
                </span>
              </label>
            </div>
          </div>
        </Transition>

        <!-- Progress dots + navigation -->
        <div class="flex items-center justify-between px-5 py-3 border-t b-line bg-white/30 dark:bg-black/20">
          <!-- Dot progress -->
          <div class="flex items-center gap-1.5">
            <span
              v-for="(q, i) in quiz.questions"
              :key="i"
              class="rounded-full transition-all duration-200"
              :class="[
                i === currentQ ? 'w-4 h-1.5 bg-saffron-500' : 'w-1.5 h-1.5',
                answers[i] !== undefined
                  ? 'bg-saffron-400'
                  : 'bg-gray-300 dark:bg-gray-700'
              ]"
            />
          </div>

          <!-- Arrows + Submit -->
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="h-8 w-8 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all disabled:opacity-30"
              :disabled="currentQ === 0"
              @click="prevQ"
            >
              <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
            </button>
            <button
              v-if="currentQ < quiz.questions.length - 1"
              type="button"
              class="h-8 w-8 rounded-lg border b-line flex items-center justify-center t-mid hover:t-hi hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              @click="nextQ"
            >
              <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
            </button>
            <button
              v-else
              type="button"
              class="h-8 px-4 rounded-lg text-[12px] font-semibold transition-all"
              :class="allAnswered
                ? 'bg-saffron-500 text-white hover:bg-saffron-600'
                : 'bg-gray-100 dark:bg-gray-800 t-lo cursor-not-allowed'"
              :disabled="!allAnswered"
              @click="submitGate"
            >
              Submit ({{ answeredCount }}/{{ quiz.questions.length }})
            </button>
          </div>
        </div>
      </div>

      <!-- Results view -->
      <div v-else class="px-5 py-5 space-y-4">
        <!-- Score banner -->
        <div
          class="rounded-xl p-5 text-center"
          :class="passed
            ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'"
        >
          <p class="text-4xl font-bold font-mono mb-1" :class="passed ? 'text-green-500' : 'text-red-400'">
            {{ score }}/{{ quiz.questions.length }}
          </p>
          <p class="text-[13px] font-medium" :class="passed ? 'text-green-600 dark:text-green-400' : 'text-red-500'">
            {{ passed ? 'Gate Passed - Flashcards Unlocked!' : 'Not quite - review and try again' }}
          </p>
        </div>

        <!-- Per-question review -->
        <div
          v-for="(q, qi) in quiz.questions"
          :key="q.id"
          class="rounded-lg border b-line p-4"
          :class="answers[qi] === q.correct_answer ? 'border-green-200 dark:border-green-900' : 'border-red-200 dark:border-red-900'"
        >
          <div class="flex items-start gap-2 mb-2">
            <UIcon
              :name="answers[qi] === q.correct_answer ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid'"
              class="h-4 w-4 mt-0.5 flex-shrink-0"
              :class="answers[qi] === q.correct_answer ? 'text-green-500' : 'text-red-400'"
            />
            <p class="font-medium text-[13px] t-hi">{{ q.question }}</p>
          </div>
          <p class="text-[12px] ml-6 t-lo">
            Your answer:
            <span :class="answers[qi] === q.correct_answer ? 'text-green-500' : 'text-red-400'">
              {{ q.options[answers[qi]] }}
            </span>
          </p>
          <p v-if="answers[qi] !== q.correct_answer" class="text-[12px] ml-6 text-green-500">
            Correct: {{ q.options[q.correct_answer] }}
          </p>
          <p v-if="q.explanation" class="text-[12px] ml-6 mt-2 t-lo italic">{{ q.explanation }}</p>
          <AiAskButton
            v-if="assistantNoteId"
            class="ml-6 mt-3"
            :note-id="assistantNoteId"
            :prompt="`Explain the reasoning for this gate question and the likely exam trap: ${q.question}`"
            :source-question-id="q.id"
            :quiz-state="{
              incorrect_question_ids: answers[qi] === q.correct_answer ? [] : [q.id],
              gate_score: score,
              gate_total: quiz.questions.length,
            }"
            label="Explain this"
          />
        </div>

        <!-- Retry -->
        <button
          v-if="!passed"
          type="button"
          class="w-full py-2.5 rounded-lg border b-line text-[12px] font-medium t-mid hover:t-hi hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
          @click="retry"
        >
          Try again
        </button>
      </div>
    </div>

    <!-- Gate not available yet -->
    <div v-else class="rounded-xl border b-line px-5 py-4">
      <p class="text-[12px] t-lo">Comprehension gate not available for this note yet.</p>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { useAsyncData } from '#imports'

interface GateQuestion {
  id: string
  question: string
  options: string[]
  correct_answer: number
  explanation?: string
}

interface GateQuizData {
  note_id: string
  pass_threshold: number
  questions: GateQuestion[]
}

const props = defineProps<{
  quiz?: GateQuizData
  noteId?: string
}>()

const emit = defineEmits<{
  completed: [result: { score: number; total: number; passed: boolean }]
}>()

const fetchedQuiz = ref<GateQuizData | null>(null)

onMounted(async () => {
  if (props.noteId && !props.quiz) {
    try {
      fetchedQuiz.value = await $fetch<GateQuizData>(`/api/gate/${props.noteId}`)
    } catch {
      fetchedQuiz.value = null
    }
  }
})

const quiz = computed<GateQuizData | undefined>(() => props.quiz ?? fetchedQuiz.value ?? undefined)
const assistantNoteId = computed(() => props.noteId ?? quiz.value?.note_id ?? '')

// Navigation
const currentQ = ref(0)
const slideDir = ref<'slide-left' | 'slide-right'>('slide-left')

const answers = reactive<Record<number, number>>({})
const submitted = ref(false)
const score = ref(0)
const passed = ref(false)

const answeredCount = computed(() => Object.keys(answers).length)
const allAnswered = computed(() => !!quiz.value && answeredCount.value === quiz.value.questions.length)

function prevQ() {
  if (currentQ.value > 0) {
    slideDir.value = 'slide-right'
    currentQ.value--
  }
}
function nextQ() {
  if (quiz.value && currentQ.value < quiz.value.questions.length - 1) {
    slideDir.value = 'slide-left'
    currentQ.value++
  }
}

function handleKey(e: KeyboardEvent) {
  if (submitted.value) return
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextQ() }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevQ() }
}

function submitGate() {
  if (!quiz.value) return
  let correct = 0
  quiz.value.questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) correct++
  })
  score.value = correct
  passed.value = correct >= quiz.value.pass_threshold
  submitted.value = true
  emit('completed', { score: correct, total: quiz.value.questions.length, passed: passed.value })
}

function retry() {
  Object.keys(answers).forEach(k => delete (answers as any)[k])
  currentQ.value = 0
  submitted.value = false
  score.value = 0
  passed.value = false
}
</script>

<style scoped>
.opt {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid var(--border-subtle);
  cursor: pointer;
  transition: all 0.15s;
}
.opt:hover { border-color: var(--border-active); }
.opt-selected { border-color: var(--saffron); background: color-mix(in srgb, var(--saffron) 8%, transparent); }

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-left-enter-from { opacity: 0; transform: translateX(28px); }
.slide-left-leave-to   { opacity: 0; transform: translateX(-28px); }
.slide-right-enter-from { opacity: 0; transform: translateX(-28px); }
.slide-right-leave-to   { opacity: 0; transform: translateX(28px); }
</style>
