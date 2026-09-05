<template>
  <figure class="study-compare my-6">
    <figcaption v-if="block.caption" class="eyebrow mb-2.5">{{ block.caption }}</figcaption>

    <!-- Desktop: hairline table, sticky header -->
    <div class="hidden overflow-hidden rounded-xl border b-line bg-elev md:block">
      <table class="table-note compare-table w-full">
        <thead>
          <tr>
            <th class="w-[28%]">Point</th>
            <th>{{ block.colA }}</th>
            <th>{{ block.colB }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in block.rows"
            :key="row.label"
            :data-line="row.lineId"
            class="stage-line"
            :class="{ 'is-flashing': row.lineId && row.lineId === flashLineId }"
          >
            <td class="cell-key">{{ row.label }}</td>
            <td><StudyCloze :text="row.a" /></td>
            <td><StudyCloze :text="row.b" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile: row-cards + compare switch -->
    <div class="md:hidden">
      <div class="mb-2.5 flex items-center gap-1 rounded-lg border b-line bg-sub p-1" role="tablist" aria-label="Compare view">
        <button
          v-for="opt in modes"
          :key="opt.value"
          type="button"
          role="tab"
          :aria-selected="mode === opt.value"
          class="min-w-0 flex-1 truncate rounded-md px-2 py-1.5 text-[12px] font-medium transition-colors"
          :class="mode === opt.value ? 'bg-elev t-hi shadow-sm border b-line' : 't-lo'"
          @click="mode = opt.value; revealed = {}"
        >
          {{ opt.value === 'a' ? block.colA : opt.value === 'b' ? block.colB : opt.label }}
        </button>
      </div>

      <ul class="divide-y divide-[var(--line)] overflow-hidden rounded-xl border b-line bg-elev">
        <li
          v-for="row in block.rows"
          :key="row.label"
          :data-line="row.lineId"
          class="stage-line px-3.5 py-3"
          :class="{ 'is-flashing': row.lineId && row.lineId === flashLineId }"
        >
          <p class="mb-1.5 text-[11px] font-semibold uppercase tracking-wider t-lo">{{ row.label }}</p>
          <div class="grid gap-2" :class="mode === 'both' ? 'grid-cols-2' : 'grid-cols-1'">
            <div v-if="mode !== 'b'" class="min-w-0">
              <span class="block font-mono text-[9.5px] uppercase tracking-wider accent">{{ block.colA }}</span>
              <span class="block text-[13.5px] leading-snug t-hi"><StudyCloze :text="row.a" /></span>
            </div>
            <div v-if="mode === 'both' || mode === 'b'" class="min-w-0">
              <span class="block font-mono text-[9.5px] uppercase tracking-wider text-sky-600 dark:text-sky-400">{{ block.colB }}</span>
              <span class="block text-[13.5px] leading-snug t-hi"><StudyCloze :text="row.b" /></span>
            </div>
            <!-- Quiz: left column shown, right column tap-to-reveal -->
            <button
              v-if="mode === 'quiz'"
              type="button"
              class="flex min-h-[40px] w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-[13px] transition-colors"
              :class="revealed[row.label] ? 'border-jade-500/40 bg-jade-500/10 t-hi' : 'b-line bg-sub t-lo'"
              @click="revealed[row.label] = !revealed[row.label]"
            >
              <span class="font-mono text-[9.5px] uppercase tracking-wider">{{ block.colB }}</span>
              <span v-if="revealed[row.label]">{{ row.b }}</span>
              <span v-else class="italic">tap to reveal</span>
            </button>
          </div>
        </li>
      </ul>
    </div>
  </figure>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StudyCompareBlock } from '~/types/study'
import { useStudySession } from '~/composables/useStudySession'

defineProps<{ block: StudyCompareBlock }>()
const { flashLineId } = useStudySession()

type Mode = 'both' | 'a' | 'b' | 'quiz'
const mode = ref<Mode>('both')
const revealed = ref<Record<string, boolean>>({})
const modes: Array<{ label: string; value: Mode }> = [
  { label: 'Both', value: 'both' },
  { label: 'Left', value: 'a' },
  { label: 'Right', value: 'b' },
  { label: 'Quiz', value: 'quiz' },
]
</script>

<style scoped>
.compare-table th:first-child,
.compare-table td:first-child { padding-left: 16px; }
.compare-table td { font-size: 14px; color: var(--text-1); }
.compare-table thead th {
  position: sticky;
  top: 0;
  background: var(--bg-elevated);
  z-index: 1;
}
</style>
