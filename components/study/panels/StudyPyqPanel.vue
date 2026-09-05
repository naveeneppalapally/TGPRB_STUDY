<template>
  <div class="flex h-full flex-col">
    <div v-if="!section.pyqs.length" class="grid flex-1 place-items-center p-6 text-center">
      <div>
        <UIcon name="i-heroicons-clipboard-document" class="mx-auto mb-2 h-6 w-6 t-lo" />
        <p class="text-[13px] t-mid">No verified PYQs attached to this section yet.</p>
      </div>
    </div>

    <template v-else>
      <!-- Question header -->
      <div class="flex items-center justify-between gap-2 border-b b-line px-4 py-2.5">
        <div class="flex min-w-0 items-center gap-2">
          <span class="chip chip-saffron chip-mono shrink-0">Q{{ pyqIndex + 1 }}</span>
          <span class="truncate font-mono text-[10.5px] uppercase tracking-wider t-lo">
            {{ q.paper }}<span v-if="q.papers.length > 1"> +{{ q.papers.length - 1 }}</span>
          </span>
        </div>
        <span class="shrink-0 font-mono text-[11px] t-lo num">{{ answeredCount }}/{{ section.pyqs.length }} done</span>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-4 py-4">
        <p class="whitespace-pre-line text-[14.5px] leading-relaxed t-hi">{{ q.question }}</p>

        <div class="mt-4 space-y-2">
          <button
            v-for="(opt, i) in q.options"
            :key="i"
            type="button"
            class="opt"
            :class="optClass(i)"
            :disabled="chosen !== undefined"
            @click="choose(i)"
          >
            <span class="opt-letter">{{ 'ABCD'[i] }}</span>
            <span>{{ opt }}</span>
          </button>
        </div>

        <!-- Reveal -->
        <Transition name="rise">
          <div v-if="chosen !== undefined" class="mt-4">
            <div class="callout" :class="chosen === q.answer ? 'callout-jade' : 'callout-red'">
              <p class="callout-title">
                <UIcon :name="chosen === q.answer ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" class="h-4 w-4" />
                {{ chosen === q.answer ? 'Correct' : `Wrong. Answer: ${'ABCD'[q.answer]}` }}
              </p>
              <p class="callout-body">{{ q.explanation }}</p>
            </div>

            <div class="mt-3 flex flex-wrap gap-2">
              <UButton
                v-if="q.sourceLine"
                size="xs"
                color="primary"
                variant="soft"
                icon="i-heroicons-cursor-arrow-rays"
                @click="flashLine(q.sourceLine)"
              >
                Show source line
              </UButton>
              <UButton size="xs" color="gray" variant="soft" icon="i-heroicons-pencil-square" @click="noteIt">
                Note it
              </UButton>
              <UButton
                v-if="chosen !== q.answer"
                size="xs"
                color="red"
                variant="soft"
                icon="i-heroicons-exclamation-triangle"
                @click="openTab('traps')"
              >
                Review traps
              </UButton>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Pager -->
      <div class="flex items-center justify-between border-t b-line px-3 py-2">
        <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-chevron-left" :disabled="pyqIndex === 0" @click="pyqIndex--">
          Prev
        </UButton>
        <div class="flex items-center gap-1">
          <button
            v-for="(pq, i) in section.pyqs"
            :key="pq.uid"
            type="button"
            class="h-2 w-2 rounded-full transition-colors"
            :class="dot(pq.uid, i)"
            :aria-label="`Question ${i + 1}`"
            @click="pyqIndex = i"
          />
        </div>
        <UButton
          size="xs"
          color="gray"
          variant="ghost"
          trailing-icon="i-heroicons-chevron-right"
          :disabled="pyqIndex >= section.pyqs.length - 1"
          @click="pyqIndex++"
        >
          Next
        </UButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

const { section, pyqIndex, sectionProgress, answerPyq, flashLine, openTab, captureAnchor } = useStudySession()

const q = computed(() => section.value.pyqs[Math.min(pyqIndex.value, section.value.pyqs.length - 1)])
const chosen = computed(() => sectionProgress.value.answers[q.value?.uid])
const answeredCount = computed(() => section.value.pyqs.filter(p => sectionProgress.value.answers[p.uid] !== undefined).length)

function choose(i: number) {
  answerPyq(q.value.uid, i)
  if (q.value.sourceLine) flashLine(q.value.sourceLine)
}
function optClass(i: number) {
  if (chosen.value === undefined) return ''
  if (i === q.value.answer) return 'opt-correct'
  if (i === chosen.value) return 'opt-wrong'
  return 'opt-dim'
}
function dot(uid: string, i: number) {
  const a = sectionProgress.value.answers[uid]
  if (i === pyqIndex.value) return 'bg-saffron-500 ring-2 ring-saffron-500/30'
  if (a === undefined) return 'bg-stone-300 dark:bg-stone-700'
  return a === section.value.pyqs[i].answer ? 'bg-jade-500' : 'bg-red-500'
}
function noteIt() {
  captureAnchor(`${q.value.paper}: ${q.value.question}`, 'notes')
}
</script>

<style scoped>
.rise-enter-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.rise-enter-from { opacity: 0; transform: translateY(6px); }
</style>
