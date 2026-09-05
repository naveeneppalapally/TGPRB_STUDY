<template>
  <!--
    Panel switcher. Keyed on section.id so every panel is remounted (and its
    local state dropped) the instant the stage moves to another section.
  -->
  <div class="relative h-full min-h-0">
    <Transition name="dock-swap" mode="out-in">
      <div :key="`${section.id}:${dockTab}`" class="h-full min-h-0">
        <StudyPanelsStudyPyqPanel v-if="dockTab === 'pyq'" />
        <StudyPanelsStudyCardsPanel v-else-if="dockTab === 'cards'" />
        <StudyPanelsStudyNotesPanel v-else-if="dockTab === 'notes'" />
        <StudyPanelsStudyTrapsPanel v-else />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useStudySession } from '~/composables/useStudySession'
const { section, dockTab } = useStudySession()
</script>

<style scoped>
.dock-swap-enter-active, .dock-swap-leave-active { transition: opacity 0.12s ease; }
.dock-swap-enter-from, .dock-swap-leave-to { opacity: 0; }
</style>
