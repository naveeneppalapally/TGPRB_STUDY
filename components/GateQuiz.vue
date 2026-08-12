<template>
  <div class="gate-unlock">
    <Transition
      name="collapse"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-if="requiresGate && quiz && !collapsed"
        class="card"
        style="border-color: var(--border-active)"
      >
        <div class="flex items-center gap-2 mb-4">
          <span class="text-xl">🎯</span>
          <h3 class="font-semibold">Comprehension Gate</h3>
          <span class="text-xs" style="color: var(--text-muted)">
            Pass {{ quiz.pass_threshold }}/{{ quiz.questions.length }} to unlock flashcards
          </span>
          <UButton
            class="ms-auto"
            icon="i-heroicons-chevron-up"
            color="gray"
            variant="ghost"
            size="xs"
            aria-label="Collapse comprehension gate"
            title="Collapse comprehension gate"
            @click="collapse()"
          />
        </div>

        <!-- Question display -->
        <div v-if="!submitted" class="space-y-6">
          <div
            v-for="(q, qi) in quiz.questions"
            :key="q.id"
            class="p-4 rounded-lg"
            style="background: var(--bg-secondary)"
          >
            <p class="font-medium mb-3 text-sm">
              <span style="color: var(--accent)" class="font-mono">Q{{ qi + 1 }}.</span>
              {{ q.question }}
            </p>
            <div class="space-y-2">
              <label
                v-for="(opt, oi) in q.options"
                :key="oi"
                class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors duration-100"
                :class="[
                  answers[qi] === oi
                    ? 'border border-solid'
                    : 'hover:bg-surface-700/30'
                ]"
                :style="answers[qi] === oi
                  ? 'background: var(--accent-glow); border-color: var(--border-active)'
                  : ''
                "
              >
                <input
                  v-model="answers[qi]"
                  type="radio"
                  :name="`gate-q-${qi}`"
                  :value="oi"
                  class="sr-only"
                />
                <span
                  class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                  :style="answers[qi] === oi
                    ? 'border-color: var(--accent); background: var(--accent)'
                    : 'border-color: var(--border-subtle)'"
                >
                  <span
                    v-if="answers[qi] === oi"
                    class="w-2 h-2 rounded-full"
                    style="background: var(--bg-primary)"
                  />
                </span>
                <span class="text-sm" :style="answers[qi] === oi ? 'color: var(--text-primary)' : 'color: var(--text-secondary)'">
                  {{ opt }}
                </span>
              </label>
            </div>
          </div>

          <button
            class="btn-primary w-full"
            :disabled="!allAnswered"
            @click="submitGate"
          >
            Submit Answers ({{ answeredCount }}/{{ quiz.questions.length }})
          </button>
        </div>

        <!-- Results display -->
        <div v-else class="space-y-4">
          <div
            class="p-4 rounded-lg text-center"
            :style="passed
              ? 'background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.3)'
              : 'background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3)'"
          >
            <p class="text-3xl font-bold font-mono mb-1" :style="passed ? 'color: #34d399' : 'color: #f87171'">
              {{ score }}/{{ quiz.questions.length }}
            </p>
            <p class="text-sm" :style="passed ? 'color: #34d399' : 'color: #f87171'">
              {{ passed ? 'Gate Passed - Flashcards Unlocked!' : 'Gate Failed - Review the note and try again' }}
            </p>
          </div>

          <!-- Answer review -->
          <div
            v-for="(q, qi) in quiz.questions"
            :key="q.id"
            class="p-4 rounded-lg"
            style="background: var(--bg-secondary)"
          >
            <div class="flex items-start gap-2 mb-2">
              <span :class="answers[qi] === q.correct_answer ? 'text-green-400' : 'text-red-400'">
                {{ answers[qi] === q.correct_answer ? 'v' : 'x' }}
              </span>
              <p class="font-medium text-sm">{{ q.question }}</p>
            </div>
            <p class="text-xs ml-6 mb-1">
              <span style="color: var(--text-muted)">Your answer:</span>
              <span :class="answers[qi] === q.correct_answer ? 'text-green-400' : 'text-red-400'">
                {{ q.options[answers[qi]] }}
              </span>
            </p>
            <p v-if="answers[qi] !== q.correct_answer" class="text-xs ml-6 mb-1">
              <span style="color: var(--text-muted)">Correct:</span>
              <span class="text-green-400">{{ q.options[q.correct_answer] }}</span>
            </p>
            <p v-if="q.explanation" class="text-xs ml-6 mt-2 italic" style="color: var(--text-muted)">
              {{ q.explanation }}
            </p>
          </div>

          <button
            v-if="!passed"
            type="button"
            class="btn-primary w-full"
            @click="tryAgain"
          >
            Try again
          </button>
        </div>
      </div>
    </Transition>

    <!-- Keep a small restore control without keeping the large gate card in flow.
         Shown regardless of unlock state, so the gate never becomes permanently
         unreachable once flashcards are open. -->
    <div v-if="requiresGate && quiz && collapsed" class="mt-3 flex justify-end">
      <UButton
        :label="unlocked ? 'Show comprehension gate results' : 'Show comprehension gate'"
        trailing-icon="i-heroicons-chevron-down"
        color="gray"
        variant="ghost"
        size="sm"
        @click="expand()"
      />
    </div>

    <FlashcardDeck
      v-if="unlocked"
      :note-id="noteId || quiz?.note_id || ''"
      :unlock-mode="unlockMode"
    />

    <div v-else-if="requiresGate && !quiz" class="card" style="border-color: var(--border-active)">
      <p class="text-sm" style="color: var(--text-muted)">
        Comprehension gate not available for this note yet.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useAsyncData } from '#imports'
import { useFlashcardUnlock, type FlashcardUnlockMode } from '@/composables/useFlashcardUnlock'
import { useCollapse } from '@/composables/useCollapse'

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

const { mode, isGatePassed, markGatePassed } = useFlashcardUnlock()
const unlockMode = computed<FlashcardUnlockMode>(() => mode.value)
const requiresGate = computed(() => unlockMode.value === 'gate')

const { data: fetchedQuiz } = await useAsyncData<GateQuizData | null>(
  `gate-quiz-${props.noteId ?? 'none'}`,
  () => props.noteId ? $fetch<GateQuizData>(`/api/gate/${props.noteId}`) : Promise.resolve(null),
)

const quiz = computed<GateQuizData | undefined>(() => props.quiz ?? fetchedQuiz.value ?? undefined)
const gatePassed = ref(false)
const answers = reactive<Record<number, number>>({})
const submitted = ref(false)
const score = ref(0)
const passed = ref(false)
const { collapsed, collapse, expand, onBeforeEnter, onEnter, onBeforeLeave, onLeave } = useCollapse()

const noteId = computed(() => props.noteId || quiz.value?.note_id || '')
const answeredCount = computed(() => Object.keys(answers).length)
const allAnswered = computed(() => !!quiz.value && answeredCount.value === quiz.value.questions.length)
const unlocked = computed(() => unlockMode.value === 'direct' || gatePassed.value || passed.value)

onMounted(() => {
  gatePassed.value = isGatePassed(noteId.value)
})

function submitGate() {
  if (!quiz.value) return
  let correct = 0
  quiz.value.questions.forEach((question, index) => {
    if (answers[index] === question.correct_answer) correct++
  })

  score.value = correct
  passed.value = correct >= quiz.value.pass_threshold
  submitted.value = true

  if (passed.value) {
    gatePassed.value = true
    markGatePassed(noteId.value)
  }

  emit('completed', {
    score: correct,
    total: quiz.value.questions.length,
    passed: passed.value,
  })
}

function tryAgain() {
  Object.keys(answers).forEach(key => delete answers[Number(key)])
  submitted.value = false
  passed.value = false
  score.value = 0
}

</script>
