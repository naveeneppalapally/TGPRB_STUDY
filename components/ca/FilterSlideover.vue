<template>
  <CaSheetSlideover v-model="open">
    <div class="flex h-full max-h-[85dvh] flex-col overflow-hidden sm:max-h-none">
      <!-- Header -->
      <div class="flex items-center justify-between border-b b-line bg-base px-4 py-3">
        <div>
          <p class="eyebrow mb-0.5 flex items-center gap-1.5">
            <UIcon name="i-heroicons-funnel" class="h-3 w-3" />
            Filters
          </p>
          <p class="text-body-xs t-lo">Refine the current-affairs feed</p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          aria-label="Close filters"
          @click="open = false"
        />
      </div>

      <!-- Body -->
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4 space-y-6">
        <!-- Timeframe -->
        <section>
          <h3 class="eyebrow mb-2">Timeframe</h3>
          <div class="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Timeframe">
            <button
              v-for="opt in windowOptions"
              :key="opt.value"
              type="button"
              role="radio"
              :aria-checked="windowModel === opt.value"
              class="press min-h-[44px] rounded-lg border px-3 text-xs font-semibold transition-colors"
              :class="windowModel === opt.value
                ? 'border-saffron-600 bg-saffron-600 text-white shadow-sm'
                : 'b-line bg-sub t-mid hover:border-[var(--line-strong)] hover:t-hi'"
              @click="windowModel = opt.value"
            >
              {{ opt.label }}
            </button>
          </div>
        </section>

        <!-- Telangana-only toggle -->
        <section>
          <button
            type="button"
            class="press flex min-h-[44px] w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 transition-colors"
            :class="tg ? 'border-saffron-500/50 bg-[var(--accent-soft)]' : 'b-line bg-sub hover:border-[var(--line-strong)]'"
            :aria-pressed="tg"
            @click="tg = !tg"
          >
            <span class="flex items-center gap-2 text-[13px] font-medium t-hi">
              <UIcon name="i-heroicons-map-pin" class="h-4 w-4 accent" />
              Telangana focus only
            </span>
            <span
              class="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
              :class="tg ? 'bg-saffron-600' : 'bg-inset'"
              aria-hidden="true"
            >
              <span
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform"
                :class="tg ? 'translate-x-6' : 'translate-x-1'"
              />
            </span>
          </button>
        </section>

        <!-- Categories -->
        <section v-if="categoryRows.length">
          <h3 class="eyebrow mb-2">Category</h3>
          <div class="flex flex-col gap-1">
            <button
              v-for="c in categoryRows"
              :key="c.id"
              type="button"
              class="press flex min-h-[44px] items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors"
              :class="category === c.id
                ? 'border-saffron-500/50 bg-[var(--accent-soft)]'
                : 'b-line bg-sub hover:border-[var(--line-strong)]'"
              :aria-pressed="category === c.id"
              @click="toggleCategory(c.id)"
            >
              <span :class="['chip text-[10px] uppercase font-bold tracking-wider inline-flex items-center gap-1', c.colorClass]">
                <UIcon :name="c.icon" class="h-3 w-3" />
              </span>
              <span class="flex-1 truncate text-[13px] font-medium t-hi">{{ c.label }}</span>
              <span class="num font-mono text-[11px] t-lo">{{ c.count }}</span>
              <UIcon v-if="category === c.id" name="i-heroicons-check" class="h-4 w-4 shrink-0 accent" />
            </button>
          </div>
        </section>

        <!-- Exam sections -->
        <section v-if="sectionRows.length">
          <h3 class="eyebrow mb-2">Exam section</h3>
          <div class="flex flex-col gap-1">
            <button
              v-for="s in sectionRows"
              :key="s.id"
              type="button"
              class="press flex min-h-[44px] items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors"
              :class="section === s.id
                ? 'border-saffron-500/50 bg-[var(--accent-soft)]'
                : 'b-line bg-sub hover:border-[var(--line-strong)]'"
              :aria-pressed="section === s.id"
              @click="toggleSection(s.id)"
            >
              <UIcon name="i-heroicons-rectangle-stack" class="h-4 w-4 shrink-0 t-lo" />
              <span class="flex-1 truncate text-[13px] font-medium capitalize t-hi">{{ s.id }}</span>
              <span class="num font-mono text-[11px] t-lo">{{ s.count }}</span>
              <UIcon v-if="section === s.id" name="i-heroicons-check" class="h-4 w-4 shrink-0 accent" />
            </button>
          </div>
        </section>

        <!-- Difficulty -->
        <section>
          <h3 class="eyebrow mb-2">Difficulty</h3>
          <div class="flex gap-1.5" role="radiogroup" aria-label="Difficulty">
            <button
              v-for="d in difficultyOptions"
              :key="d.value"
              type="button"
              role="radio"
              :aria-checked="difficulty === d.value"
              class="press flex min-h-[44px] flex-1 flex-col items-center justify-center rounded-lg border px-2 py-1.5 transition-colors"
              :class="difficulty === d.value
                ? 'border-saffron-600 bg-saffron-600 text-white shadow-sm'
                : 'b-line bg-sub t-mid hover:border-[var(--line-strong)] hover:t-hi'"
              @click="difficulty = difficulty === d.value ? '' : d.value"
            >
              <span class="text-xs font-semibold">{{ d.label }}</span>
              <span class="num font-mono text-[10px]" :class="difficulty === d.value ? 'text-white/80' : 't-lo'">{{ d.count }}</span>
            </button>
          </div>
        </section>

        <!-- Exam depth -->
        <section v-if="depthRows.length">
          <h3 class="eyebrow mb-2">Exam depth</h3>
          <div class="flex flex-col gap-1">
            <button
              v-for="d in depthRows"
              :key="d.id"
              type="button"
              class="press flex min-h-[44px] items-center gap-2.5 rounded-lg border px-3 py-2 text-left transition-colors"
              :class="depth === d.id
                ? 'border-saffron-500/50 bg-[var(--accent-soft)]'
                : 'b-line bg-sub hover:border-[var(--line-strong)]'"
              :aria-pressed="depth === d.id"
              @click="depth = depth === d.id ? '' : d.id"
            >
              <UIcon name="i-heroicons-chart-bar" class="h-4 w-4 shrink-0 t-lo" />
              <span class="flex-1 truncate text-[13px] font-medium capitalize t-hi">{{ d.id }}</span>
              <span class="num font-mono text-[11px] t-lo">{{ d.count }}</span>
              <UIcon v-if="depth === d.id" name="i-heroicons-check" class="h-4 w-4 shrink-0 accent" />
            </button>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <div class="flex gap-2 border-t b-line px-4 py-3">
        <UButton
          color="gray"
          variant="soft"
          icon="i-heroicons-arrow-path"
          class="min-h-[44px] flex-1"
          @click="$emit('reset')"
        >
          Reset all
        </UButton>
        <UButton
          color="primary"
          icon="i-heroicons-check"
          class="min-h-[44px] flex-1"
          @click="open = false"
        >
          Show results
        </UButton>
      </div>
    </div>
  </CaSheetSlideover>
</template>

<script setup lang="ts">
import { useCACategories } from '@/composables/useCACategories'

interface Facets {
  categories: Record<string, number>
  sections: Record<string, number>
  difficulties: { F: number, M: number, O: number }
  depths: Record<string, number>
}

const props = defineProps<{ facets: Facets | null }>()
defineEmits<{ reset: [] }>()

const open = defineModel<boolean>('open', { default: false })
const windowModel = defineModel<string>('window', { default: '' })
const category = defineModel<string>('category', { default: '' })
const section = defineModel<string>('section', { default: '' })
const difficulty = defineModel<string>('difficulty', { default: '' })
const depth = defineModel<string>('depth', { default: '' })
const tg = defineModel<boolean>('tg', { default: false })

const { getCategoryMeta } = useCACategories()

// Values mirror the feed API window enum (ALL | 1D | 7D | 1M | 6M | 1Y).
const windowOptions = [
  { value: '', label: 'All' },
  { value: '1D', label: 'Today' },
  { value: '7D', label: 'This week' },
  { value: '1M', label: 'This month' },
  { value: '6M', label: 'Hot zone (6 months)' },
  { value: '1Y', label: 'Last year' },
]

const categoryRows = computed(() =>
  Object.entries(props.facets?.categories ?? {})
    .map(([id, count]) => ({ ...getCategoryMeta(id), count }))
    .sort((a, b) => b.count - a.count),
)

const sectionRows = computed(() =>
  Object.entries(props.facets?.sections ?? {})
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count),
)

const depthRows = computed(() =>
  Object.entries(props.facets?.depths ?? {})
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count),
)

const difficultyOptions = computed(() => [
  { value: 'F', label: 'Easy', count: props.facets?.difficulties?.F ?? 0 },
  { value: 'M', label: 'Medium', count: props.facets?.difficulties?.M ?? 0 },
  { value: 'O', label: 'Hard', count: props.facets?.difficulties?.O ?? 0 },
])

function toggleCategory(id: string) {
  category.value = category.value === id ? '' : id
}

function toggleSection(id: string) {
  section.value = section.value === id ? '' : id
}
</script>
