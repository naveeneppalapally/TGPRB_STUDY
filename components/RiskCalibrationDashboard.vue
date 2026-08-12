<template>
  <UCard
    class="overflow-hidden !bg-[#0c0d0e] !text-slate-100"
    :ui="{ body: { padding: 'p-0 sm:p-0' } }"
  >
    <template #header>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#f59e0b]">
            20% negative marking
          </p>
          <h2 class="mt-1 text-lg font-semibold tracking-tight text-white">
            {{ title }}
          </h2>
          <p class="mt-1 max-w-2xl text-[13px] leading-relaxed text-slate-400">
            Use mock evidence to separate calculated expected value from confidence under time pressure.
          </p>
        </div>
        <UBadge color="primary" variant="soft" size="sm" label="+1 / -0.20 / skip 0" />
      </div>
    </template>

    <div class="space-y-6 p-5 sm:p-6">
      <section class="rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f59e0b]">EV elimination matrix</p>
            <h3 class="mt-1 text-[15px] font-semibold text-white">Calculate before you commit</h3>
          </div>
          <p class="max-w-sm text-[11px] leading-relaxed text-slate-400 sm:text-right">
            Positive EV is not an instruction to guess. It assumes definite eliminations, calibrated confidence, enough time, and a safely selected option.
          </p>
        </div>

        <div class="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <UButton
            v-for="choice in eliminationChoices"
            :key="choice.value"
            block
            size="sm"
            :color="selectedEliminated === choice.value ? 'primary' : 'gray'"
            :variant="selectedEliminated === choice.value ? 'solid' : 'soft'"
            class="min-h-14 justify-start text-left"
            @click="selectedEliminated = choice.value"
          >
            <span class="block">
              <span class="block text-[11px]">{{ choice.label }}</span>
              <span class="mt-0.5 block font-mono text-[10px] opacity-75">{{ choice.probability }}</span>
            </span>
          </UButton>
        </div>

        <div class="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div class="rounded-lg border border-white/10 bg-black/20 p-4">
            <div class="flex items-center justify-between gap-3">
              <label for="strategy-confidence" class="text-[12px] font-medium text-slate-200">Your pre-answer confidence</label>
              <span class="font-mono text-sm font-semibold text-[#f59e0b]">{{ formatPercent(subjectiveConfidence) }}</span>
            </div>
            <URange
              id="strategy-confidence"
              v-model="subjectiveConfidence"
              class="mt-4"
              color="saffron"
              :min="0"
              :max="1"
              :step="0.01"
            />
            <div class="mt-3 flex items-center justify-between gap-3">
              <span class="text-[11px] text-slate-400">Use declared confidence for this scenario</span>
              <UToggle v-model="useDeclaredConfidence" color="saffron" size="sm" />
            </div>
          </div>

          <div class="rounded-lg border border-[#f59e0b]/25 bg-[#f59e0b]/[0.07] p-4">
            <p class="font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300">Selected scenario</p>
            <p class="mt-2 text-3xl font-bold tracking-tight" :class="selectedEV.expectedValue >= 0 ? 'text-[#10b981]' : 'text-[#ef4444]'">
              {{ signedMark(selectedEV.expectedValue) }}
            </p>
            <p class="mt-1 text-[12px] text-slate-300">expected marks versus skipping</p>
            <p class="mt-3 text-[11px] leading-relaxed text-slate-400">
              Probability used: {{ formatPercent(selectedEV.probabilityUsed) }}
              <span v-if="useDeclaredConfidence">from your declared confidence</span>
              <span v-else>from {{ selectedEV.remainingOptions }} remaining options</span>.
              Break-even is {{ formatPercent(selectedEV.breakEvenProbability) }}.
            </p>
          </div>
        </div>

        <div class="mt-5 overflow-x-auto">
          <table class="w-full min-w-[560px] text-left text-[12px]">
            <thead class="border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.12em] text-slate-500">
              <tr>
                <th class="pb-2 font-medium">Eliminated</th>
                <th class="pb-2 font-medium">Remaining</th>
                <th class="pb-2 font-medium">Structural probability</th>
                <th class="pb-2 text-right font-medium">Expected value</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in eliminationMatrix"
                :key="row.eliminatedCount"
                class="border-b border-white/[0.06] last:border-0"
                :class="selectedEliminated === row.eliminatedCount ? 'bg-white/[0.035]' : ''"
              >
                <td class="py-2.5 text-slate-200">{{ row.eliminatedCount }}</td>
                <td class="py-2.5 text-slate-300">{{ row.remainingOptions }}</td>
                <td class="py-2.5 font-mono text-slate-300">{{ formatPercent(row.structuralProbability) }}</td>
                <td class="py-2.5 text-right font-mono font-semibold text-[#10b981]">{{ signedMark(row.expectedValue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
          <div class="flex items-start justify-between gap-3">
            <div>
              <p class="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f59e0b]">Risk balance</p>
              <h3 class="mt-1 text-[15px] font-semibold text-white">Overconfidence vs risk aversion</h3>
            </div>
            <UBadge
              :color="riskBadgeColor"
              variant="soft"
              size="sm"
              :label="riskProfileLabel"
            />
          </div>

          <template v-if="hasStrategyEvidence">
            <div class="mt-7">
              <div class="relative h-3 rounded-full bg-gradient-to-r from-[#10b981] via-[#f59e0b] to-[#ef4444]">
                <span
                  class="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_0_2px_#0c0d0e]"
                  :style="{ left: `${strategyMeterPosition}%` }"
                  aria-hidden="true"
                />
              </div>
              <div class="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-slate-500">
                <span>Leaving value</span>
                <span>Balanced</span>
                <span>Over-attempting</span>
              </div>
            </div>

            <div class="mt-5 grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-[#ef4444]/25 bg-[#ef4444]/[0.07] p-3">
                <p class="text-[11px] text-slate-400">Bad-guess penalties</p>
                <p class="mt-1 font-mono text-lg font-semibold text-[#ef4444]">{{ signedMark(-simulation.marksLostToBadGuesses) }}</p>
                <p class="mt-1 text-[10px] text-slate-500">{{ simulation.badGuessCount }} wrong with 0-1 eliminations</p>
              </div>
              <div class="rounded-lg border border-[#10b981]/25 bg-[#10b981]/[0.07] p-3">
                <p class="text-[11px] text-slate-400">Expected skipped value</p>
                <p class="mt-1 font-mono text-lg font-semibold text-[#10b981]">{{ signedMark(simulation.marksLeftOnTable) }}</p>
                <p class="mt-1 text-[10px] text-slate-500">{{ simulation.skippedOpportunityCount }} skips with 2-3 eliminations</p>
              </div>
            </div>

            <div class="mt-4 rounded-lg border border-white/[0.08] bg-black/20 px-3 py-2.5">
              <div class="flex items-center justify-between gap-3 text-[11px]">
                <span class="text-slate-400">Brier score</span>
                <span class="font-mono font-semibold text-slate-100">{{ formatBrier(simulation.brierScore) }}</span>
              </div>
              <p class="mt-1 text-[10px] leading-relaxed text-slate-500">
                0 is perfect calibration. This uses only attempted questions, with confidence captured before feedback.
              </p>
            </div>
          </template>

          <div v-else class="mt-5 rounded-lg border border-dashed border-white/15 bg-black/20 p-4 text-[12px] leading-relaxed text-slate-400">
            Add elimination counts to a completed mock to measure the direction of strategy error. Records without them remain unclassified rather than guessed at.
          </div>
        </div>

        <div class="rounded-xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
          <p class="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#f59e0b]">What if?</p>
          <h3 class="mt-1 text-[15px] font-semibold text-white">Mock score simulator</h3>

          <template v-if="hasMockData">
            <div class="mt-5 grid grid-cols-2 gap-3">
              <div class="rounded-lg border border-white/10 bg-black/20 p-4">
                <p class="text-[11px] text-slate-400">Actual net score</p>
                <p class="mt-1 font-mono text-3xl font-bold tracking-tight text-white">{{ formatMark(simulation.netScore) }}</p>
                <p class="mt-1 text-[10px] text-slate-500">
                  {{ simulation.correctCount }} correct, {{ simulation.incorrectCount }} incorrect, {{ simulation.skippedCount }} skipped
                </p>
              </div>
              <div class="rounded-lg border border-[#10b981]/30 bg-[#10b981]/[0.07] p-4">
                <p class="text-[11px] text-slate-400">EV-aware model</p>
                <p class="mt-1 font-mono text-3xl font-bold tracking-tight text-[#10b981]">{{ formatMark(simulation.optimalStrategyScore) }}</p>
                <p class="mt-1 text-[10px] text-slate-500">{{ signedMark(simulation.strategyImprovement) }} modelled opportunity</p>
              </div>
            </div>

            <div class="mt-4 rounded-lg border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] p-3 text-[11px] leading-relaxed text-slate-300">
              The model restores observed low-information wrong-answer penalties and adds the structural EV of high-information skips. It is not a claim that every skipped answer would have been correct.
            </div>

            <p v-if="simulation.missingEliminationCount > 0" class="mt-3 text-[10px] leading-relaxed text-slate-500">
              {{ simulation.missingEliminationCount }} record{{ simulation.missingEliminationCount === 1 ? '' : 's' }} lacked an elimination count and {{ simulation.missingEliminationCount === 1 ? 'was' : 'were' }} excluded from strategy-loss totals.
            </p>
          </template>

          <div v-else class="mt-5 rounded-lg border border-dashed border-white/15 bg-black/20 p-4 text-[12px] leading-relaxed text-slate-400">
            No completed mock supplied. Pass verified mock attempts through the <code class="font-mono text-[#f59e0b]">attempts</code> prop to compare actual net score with the EV-aware model.
          </div>
        </div>
      </section>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  calculateAttemptEV,
  simulateMockScore,
  type EliminationCount,
  type MockAttempt,
} from '@/composables/useExamStrategy'

const props = withDefaults(defineProps<{
  /** Completed mock records. Confidence must be captured before feedback. */
  attempts?: MockAttempt[]
  title?: string
}>(), {
  attempts: () => [],
  title: 'Risk Calibration Dashboard',
})

const eliminationChoices: Array<{ value: EliminationCount, label: string, probability: string }> = [
  { value: 0, label: 'No option removed', probability: '1 of 4 remains' },
  { value: 1, label: 'Remove 1 option', probability: '1 of 3 remains' },
  { value: 2, label: 'Remove 2 options', probability: '1 of 2 remains' },
  { value: 3, label: 'Remove 3 options', probability: '1 of 1 remains' },
]

const selectedEliminated = ref<EliminationCount>(2)
const subjectiveConfidence = ref(0.5)
const useDeclaredConfidence = ref(true)

const selectedEV = computed(() => calculateAttemptEV(
  selectedEliminated.value,
  useDeclaredConfidence.value ? subjectiveConfidence.value : undefined,
))

const eliminationMatrix = computed(() => eliminationChoices.map((choice) => calculateAttemptEV(choice.value)))
const simulation = computed(() => simulateMockScore(props.attempts))
const hasMockData = computed(() => simulation.value.totalQuestions > 0)
const hasStrategyEvidence = computed(() => simulation.value.riskProfile !== 'insufficient_data')

const riskProfileLabel = computed(() => {
  if (simulation.value.riskProfile === 'overconfident') return 'Over-attempting'
  if (simulation.value.riskProfile === 'risk_averse') return 'Leaving value'
  if (simulation.value.riskProfile === 'balanced') return 'Balanced'
  return 'Need evidence'
})

const riskBadgeColor = computed(() => {
  if (simulation.value.riskProfile === 'overconfident') return 'red'
  if (simulation.value.riskProfile === 'risk_averse') return 'primary'
  if (simulation.value.riskProfile === 'balanced') return 'emerald'
  return 'gray'
})

const strategyMeterPosition = computed(() => {
  const balance = simulation.value.strategyBalance
  if (balance === null) return 50
  return Math.min(100, Math.max(0, (balance + 1) * 50))
})

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`
}

function formatMark(value: number): string {
  return value.toFixed(2)
}

function signedMark(value: number): string {
  const prefix = value > 0 ? '+' : ''
  return `${prefix}${value.toFixed(2)}`
}

function formatBrier(value: number | null): string {
  return value === null ? 'No data' : value.toFixed(3)
}
</script>
