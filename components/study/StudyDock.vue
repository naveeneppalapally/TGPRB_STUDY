<template>
  <!--
    Desktop work dock: 420px, fixed. Always bound to the section on the stage.
  -->
  <aside class="study-dock flex h-full w-[400px] shrink-0 flex-col border-l b-line bg-elev xl:w-[420px]" aria-label="Work dock">
    <div class="flex h-11 shrink-0 items-center border-b b-line">
      <StudyDockTabs class="flex-1" />
    </div>

    <!-- Bound-section strip: proves the dock follows the stage -->
    <div class="flex shrink-0 items-center gap-2 border-b b-line bg-sub/60 px-4 py-1.5">
      <span class="h-1.5 w-1.5 rounded-full bg-saffron-500" />
      <span class="truncate font-mono text-[10px] uppercase tracking-wider t-lo">
        Sec {{ String(activeIndex + 1).padStart(2, '0') }} · {{ section.short }}
      </span>
    </div>

    <div class="min-h-0 flex-1">
      <StudyDockBody />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useStudySession } from '~/composables/useStudySession'
const { section, activeIndex } = useStudySession()
</script>
