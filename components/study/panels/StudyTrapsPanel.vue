<template>
  <div class="flex h-full flex-col">
    <div v-if="!section.traps.length" class="grid flex-1 place-items-center p-6 text-center">
      <p class="text-[13px] t-mid">No confusing pairs flagged for this section.</p>
    </div>

    <template v-else>
      <div class="flex items-center justify-between border-b b-line px-4 py-2.5">
        <span class="font-mono text-[10.5px] uppercase tracking-wider t-lo">Duel {{ trapIndex + 1 }} / {{ section.traps.length }}</span>
        <span v-if="prior" class="font-mono text-[11px] t-lo num">last: {{ prior.correct }}/{{ prior.total }}</span>
      </div>

      <div class="flex flex-1 flex-col overflow-y-auto p-4">
        <!-- Wrong PYQs land here -->
        <div v-if="wrongPyqs.length" class="callout callout-red mb-4">
          <p class="callout-title"><UIcon name="i-heroicons-exclamation-triangle" class="h-3.5 w-3.5" />{{ wrongPyqs.length }} PYQ{{ wrongPyqs.length > 1 ? 's' : '' }} missed in this section</p>
          <ul class="callout-body list-disc pl-4">
            <li v-for="w in wrongPyqs" :key="w.uid" class="line-clamp-2">{{ w.question }}</li>
          </ul>
        </div>

        <p class="mb-3 text-[12.5px] leading-snug t-mid">{{ trap.why }}</p>

        <!-- Two labels -->
        <div class="mb-4 grid grid-cols-2 gap-2">
          <div class="rounded-lg border border-saffron-500/40 bg-accent-soft px-3 py-2 text-center text-[13px] font-semibold accent-strong">← {{ trap.left }}</div>
          <div class="rounded-lg border border-sky-500/40 bg-sky-500/10 px-3 py-2 text-center text-[13px] font-semibold text-sky-700 dark:text-sky-300">{{ trap.right }} →</div>
        </div>

        <!-- Statement -->
        <div v-if="!finished" class="flex-1">
          <div
            class="panel min-h-[96px] px-4 py-4 text-center text-[15px] font-medium leading-snug t-hi transition-colors"
            :class="lastResult === 'right' ? 'border-jade-500/60 bg-jade-500/10' : lastResult === 'wrong' ? 'border-red-500/60 bg-red-500/10' : ''"
          >
            {{ statement.text }}
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <UButton color="primary" variant="soft" size="md" icon="i-heroicons-arrow-left" block :disabled="lastResult !== null" @click="answer('left')">{{ trap.left }}</UButton>
            <UButton color="sky" variant="soft" size="md" trailing-icon="i-heroicons-arrow-right" block :disabled="lastResult !== null" @click="answer('right')">{{ trap.right }}</UButton>
          </div>
          <p class="mt-2 text-center font-mono text-[10px] t-lo num">{{ pos + 1 }} / {{ trap.statements.length }} · {{ correct }} correct</p>
        </div>

        <!-- Result -->
        <div v-else class="flex-1">
          <div class="callout" :class="correct === trap.statements.length ? 'callout-jade' : 'callout-saffron'">
            <p class="callout-title">
              <UIcon name="i-heroicons-flag" class="h-4 w-4" />
              {{ correct }} / {{ trap.statements.length }} correct
            </p>
            <p class="callout-body">{{ correct === trap.statements.length ? 'Pair cleared. It will still return in the chapter drill.' : 'Re-read the compare table, then run the duel again.' }}</p>
          </div>
          <UButton class="mt-3" color="gray" variant="soft" size="sm" icon="i-heroicons-arrow-path" block @click="reset">Run again</UButton>
        </div>
      </div>

      <div class="flex items-center justify-between border-t b-line px-3 py-2">
        <UButton size="xs" color="gray" variant="ghost" icon="i-heroicons-chevron-left" :disabled="trapIndex === 0" @click="trapIndex--; reset()">Prev</UButton>
        <span class="font-mono text-[10px] t-lo">swap pairs</span>
        <UButton size="xs" color="gray" variant="ghost" trailing-icon="i-heroicons-chevron-right" :disabled="trapIndex >= section.traps.length - 1" @click="trapIndex++; reset()">Next</UButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

const { section, trapIndex, sectionProgress, recordTrap } = useStudySession()

const trap = computed(() => section.value.traps[Math.min(trapIndex.value, section.value.traps.length - 1)])
const prior = computed(() => sectionProgress.value.traps[trap.value?.id])
const wrongPyqs = computed(() => section.value.pyqs.filter(q => {
  const a = sectionProgress.value.answers[q.uid]
  return a !== undefined && a !== q.answer
}))

const pos = ref(0)
const correct = ref(0)
const lastResult = ref<'right' | 'wrong' | null>(null)
const finished = computed(() => pos.value >= (trap.value?.statements.length ?? 0))
const statement = computed(() => trap.value.statements[Math.min(pos.value, trap.value.statements.length - 1)])

function reset() {
  pos.value = 0
  correct.value = 0
  lastResult.value = null
}
watch(() => section.value.id, reset)

function answer(side: 'left' | 'right') {
  if (lastResult.value !== null) return
  const ok = statement.value.side === side
  lastResult.value = ok ? 'right' : 'wrong'
  if (ok) correct.value++
  setTimeout(() => {
    lastResult.value = null
    pos.value++
    if (finished.value) recordTrap(trap.value.id, correct.value, trap.value.statements.length)
  }, 420)
}
</script>
