<template>
  <CaSheetSlideover v-model="open">
    <div class="flex h-full max-h-[85dvh] flex-col overflow-hidden sm:max-h-none">
      <!-- Header -->
      <div class="flex items-center justify-between border-b b-line bg-base px-4 py-3">
        <div>
          <p class="eyebrow mb-0.5 flex items-center gap-1.5">
            <UIcon name="i-heroicons-calendar-days" class="h-3 w-3" />
            Browse by date
          </p>
          <p class="text-body-xs t-lo">
            {{ props.mode === 'high-yield' ? 'High-yield picks per day (5-8/day)' : 'Every day with current-affairs cards' }}
          </p>
        </div>
        <UButton
          icon="i-heroicons-x-mark"
          color="gray"
          variant="ghost"
          aria-label="Close date browser"
          @click="open = false"
        />
      </div>

      <!-- Body -->
      <div ref="bodyRef" class="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <!-- Loading -->
        <div v-if="effectivePending" class="flex flex-col gap-2">
          <div
            v-for="i in 8"
            :key="i"
            class="h-11 animate-pulse rounded-lg bg-black/5 dark:bg-white/5"
          />
        </div>

        <!-- Error -->
        <div v-else-if="effectiveError" class="py-12 text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto mb-2 h-8 w-8 t-lo" />
          <p class="mb-3 text-body-xs t-lo">Could not load the date index.</p>
          <UButton color="gray" variant="soft" size="sm" class="min-h-[44px]" @click="onRetry">
            Retry
          </UButton>
        </div>

        <!-- Date rows grouped by collapsible month -->
        <template v-else-if="groups.length">
          <section
            v-for="g in groups"
            :key="g.key"
            :ref="(el: any) => setMonthRef(g.key, el)"
            class="mb-3 rounded-xl border b-line bg-elev/50"
          >
            <div class="flex items-center justify-between gap-2 px-3 py-2">
              <button
                type="button"
                class="press flex min-h-[44px] min-w-0 flex-1 items-center gap-2 text-left"
                :aria-expanded="isMonthExpanded(g.key)"
                @click="toggleMonth(g.key)"
              >
                <UIcon
                  :name="isMonthExpanded(g.key) ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
                  class="h-4 w-4 shrink-0 t-lo"
                />
                <span class="truncate font-mono text-[11px] font-bold uppercase tracking-wider t-hi">
                  {{ g.label }}
                </span>
                <span class="num shrink-0 font-mono text-[10px] t-lo">
                  ({{ g.rows.length }}d · {{ g.totalCount }})
                </span>
              </button>
              <button
                type="button"
                class="press inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-md border px-2.5 py-1 font-mono text-[11px] font-medium transition-colors"
                :class="props.selectedMonth === g.key
                  ? 'border-saffron-500 bg-saffron-500/15 accent'
                  : 'b-line bg-elev accent hover:border-saffron-500/50'"
                @click="selectMonth(g.key)"
              >
                All month ({{ g.totalCount }})
              </button>
            </div>
            <div v-if="isMonthExpanded(g.key)" class="flex flex-col gap-1 border-t b-line px-2 py-2">
              <button
                v-for="d in g.rows"
                :key="d.date"
                :ref="(el: any) => setDateRef(d.date, el)"
                type="button"
                :aria-current="props.selectedDate === d.date ? 'date' : undefined"
                class="press flex min-h-[44px] items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors"
                :class="props.selectedDate === d.date
                  ? 'border-saffron-500 bg-saffron-500/15'
                  : 'b-line bg-sub hover:border-[var(--line-strong)]'"
                @click="select(d.date)"
              >
                <span class="flex min-w-0 items-center gap-2">
                  <span
                    class="text-[13px] font-medium"
                    :class="props.selectedDate === d.date ? 'accent font-semibold' : 't-hi'"
                  >
                    {{ formatRow(d.date) }}
                  </span>
                  <span
                    v-if="props.selectedDate === d.date"
                    class="rounded bg-saffron-600 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white"
                  >
                    Selected
                  </span>
                </span>
                <span class="flex shrink-0 items-center gap-1.5">
                  <span
                    v-if="d.tgCount"
                    class="chip chip-saffron chip-mono num"
                    :title="`${d.tgCount} Telangana-focus ${d.tgCount === 1 ? 'card' : 'cards'}`"
                  >
                    {{ d.tgCount }} TG
                  </span>
                  <span class="num font-mono text-[11px] t-lo">{{ d.count }}</span>
                </span>
              </button>
            </div>
          </section>
        </template>

        <!-- Empty -->
        <p v-else class="py-12 text-center text-body-xs t-lo">
          No dated cards yet.
        </p>
      </div>
    </div>
  </CaSheetSlideover>
</template>

<script setup lang="ts">
interface DateRow { date: string, count: number, tgCount: number }

const props = withDefaults(defineProps<{
  mode?: 'high-yield' | 'all'
  selectedDate?: string
  selectedMonth?: string
  dateRows?: DateRow[]
  datePending?: boolean
  dateError?: boolean
}>(), {
  mode: 'all',
  selectedDate: '',
  selectedMonth: '',
  dateRows: undefined,
  datePending: false,
  dateError: false,
})

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{
  select: [date: string]
  selectMonth: [month: string]
  refreshDates: []
}>()

const modeRef = toRef(props, 'mode')
const expandedMonths = ref<Set<string>>(new Set())
const bodyRef = ref<HTMLElement | null>(null)
const dateRowRefs = new Map<string, HTMLElement>()
const monthRefs = new Map<string, HTMLElement>()

const usesExternalDates = computed(() => props.dateRows !== undefined)

const { data, pending, error, refresh } = await useFetch('/api/ca/dates', {
  key: 'ca-dates-panel',
  immediate: !props.dateRows,
  query: computed(() => ({
    mode: modeRef.value === 'high-yield' ? 'high-yield' : undefined,
  })),
  watch: [modeRef],
})

const effectivePending = computed(() => (usesExternalDates.value ? props.datePending : pending.value))
const effectiveError = computed(() => (usesExternalDates.value ? props.dateError : Boolean(error.value)))

function onRetry(): void {
  if (usesExternalDates.value) emit('refreshDates')
  else refresh()
}

function setDateRef(d: string, el: any): void {
  if (el) dateRowRefs.set(d, el as HTMLElement)
  else dateRowRefs.delete(d)
}

function setMonthRef(m: string, el: any): void {
  if (el) monthRefs.set(m, el as HTMLElement)
  else monthRefs.delete(m)
}

function isMonthExpanded(monthKey: string): boolean {
  return expandedMonths.value.has(monthKey)
}

function toggleMonth(monthKey: string): void {
  const next = new Set(expandedMonths.value)
  if (next.has(monthKey)) next.delete(monthKey)
  else next.add(monthKey)
  expandedMonths.value = next
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const groups = computed(() => {
  const rows: DateRow[] = props.dateRows ?? (data.value as any)?.dates ?? []
  const map = new Map<string, { key: string, label: string, totalCount: number, rows: DateRow[] }>()
  for (const d of rows) {
    const [y, m] = d.date.split('-').map(Number)
    if (!y || !m) continue
    const key = `${y}-${String(m).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, { key, label: `${MONTHS[m - 1]} ${y}`, totalCount: 0, rows: [] })
    const entry = map.get(key)!
    entry.totalCount += d.count
    entry.rows.push(d)
  }
  // Newest month first, rows inside each month stay newest first
  return [...map.values()].sort((a, b) => (a.key < b.key ? 1 : -1))
})

function formatRow(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number)
  if (!y || !m || !d) return dateStr
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', {
    weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  })
}

function select(dateStr: string) {
  emit('select', dateStr)
  open.value = false
}

function selectMonth(monthStr: string) {
  emit('selectMonth', monthStr)
  open.value = false
}

function activeMonthKey(): string {
  if (props.selectedDate && /^\d{4}-\d{2}-\d{2}$/.test(props.selectedDate)) {
    return props.selectedDate.slice(0, 7)
  }
  if (props.selectedMonth && /^\d{4}-\d{2}$/.test(props.selectedMonth)) {
    return props.selectedMonth
  }
  return groups.value[0]?.key ?? ''
}

function focusSelectedEntry(): void {
  const targetMonth = activeMonthKey()
  if (targetMonth && !expandedMonths.value.has(targetMonth)) {
    const next = new Set(expandedMonths.value)
    next.add(targetMonth)
    expandedMonths.value = next
  }

  nextTick(() => {
    const scrollToTarget = () => {
      const targetEl = (props.selectedDate ? dateRowRefs.get(props.selectedDate) : undefined)
        ?? (targetMonth ? monthRefs.get(targetMonth) : undefined)
      if (targetEl && typeof targetEl.scrollIntoView === 'function') {
        targetEl.scrollIntoView({ block: 'center', behavior: 'instant' as ScrollBehavior })
      }
    }
    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(() => setTimeout(scrollToTarget, 40))
    } else {
      scrollToTarget()
    }
  })
}

watch(open, (isOpen) => {
  if (isOpen) focusSelectedEntry()
})

watch([groups, () => props.selectedDate, () => props.selectedMonth], () => {
  const key = activeMonthKey()
  if (key && expandedMonths.value.size === 0) {
    expandedMonths.value = new Set([key])
  }
  if (open.value) focusSelectedEntry()
}, { immediate: true })
</script>
