<template>
  <div v-if="quiz" class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm transition-all duration-300">
    <!-- Header with Collapse Arrow -->
    <div class="flex items-center justify-between gap-3 cursor-pointer select-none" @click="isCollapsed = !isCollapsed">
      <div class="flex items-center gap-2.5">
        <span class="text-xl">🎯</span>
        <div>
          <h3 class="font-display text-body font-semibold tracking-tight t-hi">Comprehension Gate</h3>
          <p class="text-body-xs t-lo">
            Pass {{ quiz.pass_threshold }}/{{ quiz.questions.length }} to unlock flashcards
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span v-if="submitted" class="chip chip-mono text-[10.5px]" :class="passed ? 'chip-jade' : 'chip-red'">
          {{ passed ? 'Passed (' + score + '/' + quiz.questions.length + ')' : 'Failed (' + score + '/' + quiz.questions.length + ')' }}
        </span>
        
        <!-- Smooth Collapse/Expand Arrow Button -->
        <button
          type="button"
          class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          :title="isCollapsed ? 'Expand Quiz' : 'Hide / Collapse Quiz'"
          @click.stop="isCollapsed = !isCollapsed"
        >
          <UIcon
            name="i-heroicons-chevron-down"
            class="h-5 w-5 t-lo transition-transform duration-300"
            :class="{ 'rotate-180': !isCollapsed }"
          />
        </button>
      </div>
    </div>

    <!-- Smooth Collapsible Content Container -->
    <div
      class="grid transition-all duration-300 ease-in-out"
      :class="isCollapsed ? 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none' : 'grid-rows-[1fr] opacity-100 mt-5'"
    >
      <div class="overflow-hidden space-y-6">
        <!-- Question display (Unsubmitted) -->
        <div v-if="!submitted" class="space-y-6">
          <div
            v-for="(q, qi) in quiz.questions"
            :key="q.id"
            class="p-4 rounded-lg bg-sub border border-gray-100 dark:border-gray-800"
          >
            <p class="font-medium mb-3 text-body-sm t-hi">
              <span class="font-mono accent">Q{{ qi + 1 }}.</span>
              {{ q.question }}
            </p>
            <div class="space-y-2">
              <label
                v-for="(opt, oi) in q.options"
                :key="oi"
                class="flex items-center gap-3 px-3.5 py-2.5 rounded-lg cursor-pointer transition-all duration-150 border"
                :class="[
                  answers[qi] === oi
                    ? 'border-amber-500 bg-amber-500/10 t-hi font-medium'
                    : 'border-transparent bg-white dark:bg-gray-900 t-mid hover:t-hi hover:border-gray-200 dark:hover:border-gray-800'
                ]"
              >
                <input
                  type="radio"
                  :name="`gate-q-${qi}`"
                  :value="oi"
                  v-model="answers[qi]"
                  class="sr-only"
                />
                <span
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  :class="answers[qi] === oi ? 'border-amber-500 bg-amber-500' : 'border-gray-300 dark:border-gray-700'"
                >
                  <span v-if="answers[qi] === oi" class="w-2 h-2 rounded-full bg-white" />
                </span>
                <span class="text-body-sm">{{ opt }}</span>
              </label>
            </div>
          </div>

          <!-- Submit button -->
          <button
            class="w-full py-3 px-4 rounded-lg bg-amber-500 text-white font-semibold text-body-sm shadow-sm hover:bg-amber-600 transition-colors disabled:opacity-50"
            :disabled="!allAnswered"
            @click="submitGate"
          >
            Submit Gate Answers ({{ answeredCount }}/{{ quiz.questions.length }})
          </button>
        </div>

        <!-- Results display & Unlocked Flashcards -->
        <div v-else class="space-y-6">
          <div
            class="p-4 rounded-xl text-center border"
            :class="passed ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400'"
          >
            <p class="text-3xl font-bold font-mono mb-1">
              {{ score }}/{{ quiz.questions.length }}
            </p>
            <p class="text-body-sm font-semibold">
              {{ passed ? '🎉 Gate Passed - Flashcards Unlocked!' : '❌ Gate Failed - Review the note and try again' }}
            </p>
          </div>

          <!-- 🎴 UNLOCKED FLASHCARDS DECK (Shows when Gate Passed) -->
          <div v-if="passed && flashcardDeck.length > 0" class="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center gap-2">
                <span class="text-xl">🎴</span>
                <h4 class="font-display text-body font-semibold t-hi">Topic Flashcards Deck</h4>
              </div>
              <span class="font-mono text-body-xs t-lo">
                Card {{ currentCardIndex + 1 }} of {{ flashcardDeck.length }}
              </span>
            </div>

            <!-- Flip Card Container -->
            <div
              class="relative min-h-[160px] cursor-pointer rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:border-amber-500/50"
              @click="isFlipped = !isFlipped"
            >
              <div class="flex items-center justify-between text-[11px] font-mono t-lo mb-2">
                <span>{{ isFlipped ? 'ANSWER (BACK)' : 'QUESTION (FRONT)' }}</span>
                <span class="text-amber-500">click to flip 🔄</span>
              </div>

              <!-- Card Front -->
              <div v-if="!isFlipped" class="my-auto">
                <p class="text-body font-medium t-hi leading-relaxed text-center">
                  {{ currentCard.front }}
                </p>
              </div>

              <!-- Card Back -->
              <div v-else class="my-auto animate-fade-in">
                <p class="text-body font-semibold accent text-center mb-2">
                  {{ currentCard.back }}
                </p>
                <p v-if="currentCard.key_fact" class="text-body-xs t-lo text-center italic">
                  💡 Key Fact: {{ currentCard.key_fact }}
                </p>
              </div>
            </div>

            <!-- Flashcard Nav Controls -->
            <div class="flex items-center justify-between mt-4">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-body-xs font-medium t-mid hover:t-hi disabled:opacity-40"
                :disabled="currentCardIndex <= 0"
                @click="currentCardIndex--; isFlipped = false"
              >
                ← Previous
              </button>

              <button
                type="button"
                class="px-4 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-body-xs font-semibold hover:bg-amber-500/20"
                @click="isFlipped = !isFlipped"
              >
                {{ isFlipped ? 'Show Front' : 'Flip Answer' }}
              </button>

              <button
                type="button"
                class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-body-xs font-medium t-mid hover:t-hi disabled:opacity-40"
                :disabled="currentCardIndex >= flashcardDeck.length - 1"
                @click="currentCardIndex++; isFlipped = false"
              >
                Next →
              </button>
            </div>
          </div>

          <!-- Gate Question Review -->
          <div class="space-y-3 pt-2">
            <h4 class="font-mono text-body-xs uppercase tracking-wider t-lo font-semibold">Quiz Answer Breakdown:</h4>
            <div
              v-for="(q, qi) in quiz.questions"
              :key="q.id"
              class="p-4 rounded-lg bg-sub border border-gray-200 dark:border-gray-800"
            >
              <div class="flex items-start gap-2 mb-2">
                <span :class="answers[qi] === q.correct_answer ? 'text-emerald-500' : 'text-rose-500'" class="font-bold">
                  {{ answers[qi] === q.correct_answer ? '✓' : '✕' }}
                </span>
                <p class="font-medium text-body-sm t-hi">{{ q.question }}</p>
              </div>
              <p class="text-body-xs ml-6 mb-1">
                <span class="t-lo">Your answer: </span>
                <span :class="answers[qi] === q.correct_answer ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'">
                  {{ q.options[answers[qi]] }}
                </span>
              </p>
              <p v-if="answers[qi] !== q.correct_answer" class="text-body-xs ml-6 mb-1">
                <span class="t-lo">Correct answer: </span>
                <span class="text-emerald-500 font-semibold">{{ q.options[q.correct_answer] }}</span>
              </p>
              <p v-if="q.explanation" class="text-body-xs ml-6 mt-2 italic t-lo">
                {{ q.explanation }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
    <p class="text-body-xs t-lo">
      Comprehension gate not available for this note yet.
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
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

interface Flashcard {
  id: string
  front: string
  back: string
  key_fact?: string
}

const props = defineProps<{
  quiz?: GateQuizData
  noteId?: string
}>()

const emit = defineEmits<{
  completed: [result: { score: number; total: number; passed: boolean }]
}>()

const isCollapsed = ref(false)
const isFlipped = ref(false)
const currentCardIndex = ref(0)
const flashcardDeck = ref<Flashcard[]>([])

const { data: fetchedQuiz } = await useAsyncData<GateQuizData | null>(
  `gate-quiz-${props.noteId ?? 'none'}`,
  () => props.noteId ? $fetch<GateQuizData>(`/api/gate/${props.noteId}`) : Promise.resolve(null),
)

const quiz = computed<GateQuizData | undefined>(() => props.quiz ?? fetchedQuiz.value ?? undefined)

// Fetch topic flashcards when noteId is present
if (props.noteId) {
  $fetch<{ cards: Flashcard[] }>(`/api/flashcards/${props.noteId}`)
    .then(res => {
      if (res?.cards) {
        flashcardDeck.value = res.cards
      }
    })
    .catch(() => {})
}

const currentCard = computed(() => flashcardDeck.value[currentCardIndex.value] || { front: '', back: '' })

const answers = reactive<Record<number, number>>({})
const submitted = ref(false)
const score = ref(0)
const passed = ref(false)

const answeredCount = computed(() => Object.keys(answers).length)
const allAnswered = computed(() => !!quiz.value && answeredCount.value === quiz.value.questions.length)

function submitGate() {
  if (!quiz.value) return
  let correct = 0
  quiz.value.questions.forEach((q, i) => {
    if (answers[i] === q.correct_answer) correct++
  })

  score.value = correct
  passed.value = correct >= quiz.value.pass_threshold
  submitted.value = true

  emit('completed', {
    score: correct,
    total: quiz.value.questions.length,
    passed: passed.value,
  })
}
</script>
