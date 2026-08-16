<template>
  <div>
    <!-- Bell trigger button -->
    <UButton
      icon="i-heroicons-bell"
      color="gray"
      variant="ghost"
      class="relative"
      aria-label="What's new"
      @click="openPanel"
    >
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 h-4 min-w-[1rem] rounded-full bg-saffron-500 px-1 text-[9px] font-bold text-white flex items-center justify-center"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </UButton>

    <!-- Slideover panel -->
    <USlideover v-model="isOpen" side="right">
      <div class="flex h-full flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between border-b b-line px-4 py-3 bg-base">
          <div>
            <p class="eyebrow mb-0.5 flex items-center gap-1.5">
              <UIcon name="i-heroicons-newspaper" class="h-3 w-3" />
              What's New
            </p>
            <p class="text-body-xs t-lo">Last 7 days - updated 7am IST daily</p>
          </div>
          <div class="flex items-center gap-1">
            <UButton
              v-if="unreadCount > 0"
              icon="i-heroicons-check"
              size="xs"
              color="primary"
              variant="soft"
              label="Mark all read"
              @click="markAllRead"
            />
            <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" @click="isOpen = false" />
          </div>
        </div>

        <!-- Entry list -->
        <div class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          <!-- Loading state -->
          <div v-if="loadingFull" class="flex flex-col gap-3">
            <div v-for="i in 5" :key="i" class="rounded-md border b-line bg-sub p-3 space-y-2 animate-pulse">
              <div class="flex gap-2">
                <div class="h-4 w-16 rounded-full bg-black/10 dark:bg-white/10" />
                <div class="h-4 w-10 rounded-full bg-black/10 dark:bg-white/10" />
              </div>
              <div class="h-3 w-3/4 rounded bg-black/10 dark:bg-white/10" />
              <div class="h-8 w-full rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>

          <div v-else-if="entriesInPanel.length">
            <div
              v-for="entry in entriesInPanel"
              :key="entry.id"
              class="rounded-md border b-line bg-sub p-3 flex flex-col gap-1.5"
              :class="[
                entry.meta?.is_telangana_focus ? 'border-l-2 border-l-saffron-500' : '',
                isUnread(entry) ? 'ring-1 ring-saffron-400/30' : 'opacity-75'
              ]"
            >
              <!-- Section + date row -->
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <div class="flex items-center gap-1.5">
                  <span class="chip text-[10px] uppercase font-bold">{{ entry.meta?.category || 'General' }}</span>
                  <span
                    v-if="isUnread(entry)"
                    class="inline-flex items-center rounded-full bg-saffron-500 text-white px-1.5 py-0.5 text-[9px] font-bold"
                  >
                    NEW
                  </span>
                  <span
                    v-if="entry.meta?.is_telangana_focus"
                    class="inline-flex items-center gap-1 rounded-full bg-saffron-500/10 text-saffron-600 dark:text-saffron-400 px-1.5 py-0.5 text-[10px] font-semibold"
                  >
                    <UIcon name="i-heroicons-map-pin" class="h-2.5 w-2.5" />
                    TG Focus
                  </span>
                </div>
                <time class="font-mono text-[10px] t-lo">{{ formatDate(entry.meta?.date) }}</time>
              </div>

              <!-- Fact / Headline -->
              <div class="flex flex-col gap-1">
                <p class="text-body-xs font-semibold leading-snug t-hi">
                  {{ entry.meta?.headline }}
                </p>
                <p v-if="entry.meta?.exam_fact" class="text-[11px] leading-snug t-mid bg-black/5 dark:bg-white/5 p-1.5 rounded border border-black/10 dark:border-white/10">
                  <UIcon name="i-heroicons-light-bulb" class="inline-block h-3 w-3 mr-0.5 align-text-bottom text-amber-500" />
                  {{ entry.meta.exam_fact }}
                </p>
              </div>

              <!-- Source -->
              <a
                v-if="entry.meta?.source_url || entry.meta?.canonical_source_url"
                :href="entry.meta?.canonical_source_url || entry.meta?.source_url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex w-fit items-center gap-1 text-[10px] t-lo hover:accent transition-colors"
              >
                <UIcon :name="entry.meta?.source_type === 'official' ? 'i-heroicons-building-library' : 'i-heroicons-newspaper'" class="h-2.5 w-2.5" />
                {{ entry.meta?.source_name || sourceDomain(entry.meta?.canonical_source_url || entry.meta?.source_url) }}
              </a>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="py-12 text-center">
            <UIcon name="i-heroicons-check-circle" class="h-8 w-8 t-lo mx-auto mb-2" />
            <p class="text-body-xs t-lo">No new entries in the last 7 days.</p>
          </div>
        </div>

        <!-- Footer link -->
        <div class="border-t b-line px-4 py-3">
          <NuxtLink
            to="/current-affairs"
            class="block w-full text-center text-body-xs accent font-medium hover:underline"
            @click="isOpen = false"
          >
            View all current affairs
          </NuxtLink>
        </div>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { useSupabaseUser, queryCollection } from '#imports'

const user = useSupabaseUser()

function getLsKey(): string {
  const uid = user.value?.id || 'guest'
  return `studyos-ca-last-read:${uid}`
}

const isOpen = ref(false)
const loadingFull = ref(false)

const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  .toISOString().split('T')[0]

// Lightweight query: only fetch dates for badge count (runs during SSR - fast)
const { data: dateSummary } = await useAsyncData('whats-new-dates', () =>
  queryCollection('current_affair').select('id', 'meta').all(),
  { server: true, lazy: false }
)

const recentDates = computed(() =>
  (dateSummary.value ?? []).filter((e: any) => (e.meta?.date ?? '') >= cutoff)
)

// Full data: loaded lazily on first open
const fullEntries = ref<any[]>([])
let fullLoaded = false

async function openPanel() {
  isOpen.value = true
  if (!fullLoaded) {
    loadingFull.value = true
    fullLoaded = true
    // Use the already-fetched data (same query) - no extra network call
    fullEntries.value = recentDates.value
      .sort((a: any, b: any) => new Date(b.meta?.date).getTime() - new Date(a.meta?.date).getTime())
    loadingFull.value = false
  }
}

// Track last-read timestamp (localStorage, client-only)
const lastReadTs = ref(0)

function loadLastRead() {
  if (!import.meta.client) return
  const key = getLsKey()
  let stored = localStorage.getItem(key)
  if (!stored && !user.value) {
    stored = localStorage.getItem('studyos-ca-last-read')
  }
  lastReadTs.value = stored ? (parseInt(stored, 10) || 0) : 0
}

onMounted(() => {
  loadLastRead()
})

watch(user, () => {
  loadLastRead()
})

function isUnread(entry: any): boolean {
  if (!lastReadTs.value) return true
  const entryTime = new Date(entry.meta?.date || 0).getTime()
  return entryTime > lastReadTs.value
}

function markAllRead() {
  lastReadTs.value = Date.now()
  if (import.meta.client) {
    localStorage.setItem(getLsKey(), String(lastReadTs.value))
  }
}

const unreadCount = computed(() =>
  recentDates.value.filter((e: any) => isUnread(e)).length
)

const entriesInPanel = computed(() => fullEntries.value)

function formatDate(iso: string): string {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}
function sourceDomain(url: string): string {
  try { return new URL(url).hostname.replace(/^www\./, '') }
  catch { return url }
}
</script>


