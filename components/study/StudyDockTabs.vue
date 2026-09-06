<template>
  <div class="flex items-stretch gap-0.5 px-1.5" role="tablist" aria-label="Work dock">
    <button
      v-for="t in tabs"
      :key="t.id"
      type="button"
      role="tab"
      :aria-selected="dockTab === t.id"
      class="relative flex min-h-[40px] min-w-0 flex-1 items-center justify-center gap-1 rounded-lg px-1 text-[12px] font-medium transition-colors sm:gap-1.5 sm:px-2 sm:text-[12.5px]"
      :class="dockTab === t.id ? 't-hi' : 't-lo hover:t-mid'"
      @click="openTab(t.id, { raiseTray: raiseTo })"
    >
      <UIcon :name="t.icon" class="h-3.5 w-3.5 shrink-0" />
      <span class="truncate">{{ t.label }}</span>
      <span
        v-if="t.count !== undefined"
        class="hidden rounded-md px-1 font-mono text-[10px] num min-[440px]:inline"
        :class="t.alert ? 'bg-red-500/15 text-red-500' : 'bg-sub t-lo'"
      >{{ t.count }}</span>
      <span
        v-if="dockTab === t.id"
        class="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-saffron-500"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DockTab, TrayHeight } from '~/types/study'
import { useStudySession } from '~/composables/useStudySession'
import { usePersonalNotes } from '~/composables/usePersonalNotes'

defineProps<{ raiseTo?: TrayHeight }>()

const { chapter, section, dockTab, openTab, sectionCounts } = useStudySession()
const { getCountForSection } = usePersonalNotes()

const tabs = computed<Array<{ id: DockTab; label: string; icon: string; count?: number; alert?: boolean }>>(() => {
  const c = sectionCounts(section.value)
  return [
    { id: 'pyq', label: 'PYQ', icon: 'i-heroicons-clipboard-document-check', count: c.pyqs },
    { id: 'cards', label: 'Cards', icon: 'i-heroicons-rectangle-stack', count: c.cards },
    { id: 'notes', label: 'Notes', icon: 'i-heroicons-pencil-square', count: getCountForSection(chapter.value?.noteId || '', section.value?.id || '') },
    { id: 'traps', label: 'Traps', icon: 'i-heroicons-exclamation-triangle', count: c.traps + c.wrong, alert: c.wrong > 0 },
  ]
})
</script>
