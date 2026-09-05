<template>
  <!--
    Outline rail. 56px collapsed (status dots only). Expands to 260px on hover
    or when pinned. Click a row to jump; this is the one place besides the
    stage footer that changes activeSectionId.
  -->
  <aside
    class="study-rail group/rail relative flex h-full shrink-0 flex-col border-r b-line bg-elev transition-[width] duration-200 ease-out"
    :class="expanded ? 'w-[260px]' : 'w-14'"
    aria-label="Chapter outline"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <!-- Header: pin toggle -->
    <div class="flex h-11 shrink-0 items-center border-b b-line px-2" :class="expanded ? 'justify-between' : 'justify-center'">
      <span v-if="expanded" class="eyebrow truncate pl-1">Outline</span>
      <UTooltip :text="railPinned ? 'Unpin rail' : 'Pin rail open'" :popper="{ placement: 'right' }">
        <button
          type="button"
          class="grid h-8 w-8 place-items-center rounded-lg t-lo transition-colors hover:bg-sub hover:t-hi"
          :aria-pressed="railPinned"
          aria-label="Toggle outline pin"
          @click="railPinned = !railPinned"
        >
          <UIcon :name="railPinned ? 'i-heroicons-chevron-double-left' : 'i-heroicons-bars-3-bottom-left'" class="h-4 w-4" />
        </button>
      </UTooltip>
    </div>

    <!-- Section list -->
    <nav class="flex-1 overflow-y-auto overflow-x-hidden py-2">
      <ol class="space-y-0.5 px-2">
        <li v-for="(s, i) in sections" :key="s.id">
          <button
            type="button"
            class="relative flex w-full items-center gap-3 rounded-lg py-2 text-left transition-colors"
            :class="[
              expanded ? 'px-2' : 'justify-center px-0',
              s.id === activeSectionId ? 'bg-accent-soft' : 'hover:bg-sub',
            ]"
            :aria-current="s.id === activeSectionId ? 'true' : undefined"
            :title="expanded ? undefined : `${i + 1}. ${s.title}`"
            @click="goTo(s.id)"
          >
            <!-- status dot -->
            <span class="relative grid h-6 w-6 shrink-0 place-items-center">
              <span
                class="h-2.5 w-2.5 rounded-full ring-2 transition-colors"
                :class="dotClass(sectionStatus(s.id))"
              />
              <span
                v-if="sectionCounts(s).wrong > 0"
                class="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--bg-elevated)]"
                aria-label="Has wrong answers"
              />
            </span>

            <template v-if="expanded">
              <span class="min-w-0 flex-1">
                <span class="block truncate text-[13px]" :class="s.id === activeSectionId ? 'font-semibold t-hi' : 't-mid'">
                  <span class="mr-1.5 font-mono text-[10.5px] t-lo num">{{ String(i + 1).padStart(2, '0') }}</span>{{ s.short }}
                </span>
                <span class="mt-0.5 block truncate font-mono text-[10px] t-lo num">
                  {{ sectionCounts(s).pyqs }} PYQ · {{ sectionCounts(s).cards }} cards · {{ sectionCounts(s).traps }} traps
                </span>
              </span>
            </template>
          </button>
        </li>
      </ol>
    </nav>

    <!-- Footer legend (expanded only) -->
    <div v-if="expanded" class="shrink-0 border-t b-line px-3 py-2.5">
      <div class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9.5px] uppercase tracking-wider t-lo">
        <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />todo</span>
        <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-saffron-500" />read</span>
        <span class="flex items-center gap-1"><span class="h-1.5 w-1.5 rounded-full bg-jade-500" />cleared</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

const { sections, activeSectionId, goTo, railPinned, sectionStatus, sectionCounts } = useStudySession()
const hover = ref(false)
const expanded = computed(() => railPinned.value || hover.value)

function dotClass(status: ReturnType<typeof sectionStatus>) {
  switch (status) {
    case 'cleared': return 'bg-jade-500 ring-jade-500/25'
    case 'read': return 'bg-saffron-500 ring-saffron-500/25'
    case 'reading': return 'bg-transparent ring-saffron-500'
    default: return 'bg-stone-300 ring-transparent dark:bg-stone-700'
  }
}
</script>
