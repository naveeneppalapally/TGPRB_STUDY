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
          <p class="text-body-xs t-lo">Every day with current-affairs cards</p>
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
      <div class="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        <!-- Loading -->
        <div v-if="pending" class="flex flex-col gap-2">
          <div
            v-for="i in 8"
            :key="i"
            class="h-11 animate-pulse rounded-lg bg-black/5 dark:bg-white/5"
          />
        </div>

        <!-- Error -->
        <div v-else-if="error" class="py-12 text-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="mx-auto mb-2 h-8 w-8 t-lo" />
          <p class="mb-3 text-body-xs t-lo">Could not load the date index.</p>
          <UButton color="gray" variant="soft" size="sm" class="min-h-[44px]" @click="refresh()">
            Retry
          </UButton>
        </div>

        <!-- Date rows grouped by month -->
        <template v-else-if="groups.length">
          <section v-for="g in groups" :key="g.key" class="mb-5">
            <h3 class="eyebrow mb-2">{{ g.label }}</h3>
            <div class="flex flex-col gap-1">
              <button
                v-for="d in g.rows"
                :key="d.date"
                type="button"
                class="press flex min-h-[44px] items-center justify-between gap-3 rounded-lg border b-line bg-sub px-3 py-2 text-left transition-colors hover:border-[var(--line-strong)]"
                @click="select(d.date)"
              >
                <span class="text-[13px] font-medium t-hi">{{ formatRow(d.date) }}</span>
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

const open = defineModel<boolean>('open', { default: false })
const emit = defineEmits<{ select: [date: string] }>()

const { data, pending, error, refresh } = await useFetch('/api/ca/dates', {
  key: 'ca-dates-panel',
})

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const groups = computed(() => {
  const rows: DateRow[] = (data.value as any)?.dates ?? []
  const map = new Map<string, { key: string, label: string, rows: DateRow[] }>()
  for (const d of rows) {
    const [y, m] = d.date.split('-').map(Number)
    if (!y || !m) continue
    const key = `${y}-${String(m).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, { key, label: `${MONTHS[m - 1]} ${y}`, rows: [] })
    map.get(key)!.rows.push(d)
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
</script>
