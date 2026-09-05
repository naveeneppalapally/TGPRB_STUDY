<template>
  <header class="study-topbar flex h-12 shrink-0 items-center gap-3 border-b b-line bg-elev px-3 sm:px-4">
    <!-- Left: back + breadcrumb -->
    <div class="flex min-w-0 items-center gap-2">
      <NuxtLink
        :to="`/notes/${chapter.subjectSlug}`"
        class="grid h-8 w-8 shrink-0 place-items-center rounded-lg t-mid hover:bg-sub hover:t-hi"
        aria-label="Back to subject"
      >
        <UIcon name="i-heroicons-chevron-left" class="h-4 w-4" />
      </NuxtLink>
      <nav class="flex min-w-0 items-center gap-1.5 text-[12.5px]" aria-label="Breadcrumb">
        <NuxtLink :to="`/notes/${chapter.subjectSlug}`" class="hidden t-lo hover:t-hi sm:inline">{{ chapter.subject }}</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="hidden h-3 w-3 t-lo sm:inline" />
        <span class="truncate font-semibold t-hi">{{ chapter.title }}</span>
        <span class="shrink-0 font-mono text-[11px] t-lo num">
          <span class="hidden sm:inline">Sec </span>{{ activeIndex + 1 }}/{{ sections.length }}
        </span>
      </nav>
    </div>

    <!-- Center: chapter progress -->
    <div class="hidden flex-1 items-center gap-3 md:flex">
      <div class="h-1.5 flex-1 max-w-xs overflow-hidden rounded-full bg-inset" role="progressbar" :aria-valuenow="chapterPercent" aria-valuemin="0" aria-valuemax="100">
        <div class="h-full rounded-full bg-saffron-500 transition-[width] duration-300" :style="{ width: chapterPercent + '%' }" />
      </div>
      <span class="font-mono text-[11px] t-lo num">{{ chapterPercent }}%</span>
    </div>

    <!-- Right: controls -->
    <div class="ml-auto flex items-center gap-1.5">
      <!-- Cloze toggle -->
      <UTooltip text="Cloze: blank out the marked facts (C)" :popper="{ placement: 'bottom' }">
        <button
          type="button"
          class="flex h-8 items-center gap-1.5 rounded-lg border px-2 text-[12px] font-medium transition-colors"
          :class="clozeOn ? 'border-saffron-500/50 bg-accent-soft accent-strong' : 'b-line bg-sub t-mid hover:t-hi'"
          :aria-pressed="clozeOn"
          @click="clozeOn = !clozeOn"
        >
          <UIcon name="i-heroicons-eye-slash" class="h-3.5 w-3.5" />
          <span class="hidden sm:inline">Cloze</span>
        </button>
      </UTooltip>

      <!-- Timer -->
      <span class="hidden h-8 items-center gap-1.5 rounded-lg border b-line bg-sub px-2 font-mono text-[11.5px] t-mid num sm:flex">
        <UIcon name="i-heroicons-clock" class="h-3.5 w-3.5 t-lo" />
        {{ clock }}
      </span>

      <!-- Theme -->
      <UButton
        :icon="colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
        color="gray"
        variant="ghost"
        size="sm"
        class="h-8 w-8 justify-center"
        :aria-label="colorMode.value === 'dark' ? 'Light mode' : 'Dark mode'"
        @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

const { chapter, sections, activeIndex, chapterPercent, clozeOn, elapsedSeconds } = useStudySession()
const colorMode = useColorMode()

const clock = computed(() => {
  const s = elapsedSeconds.value
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const mm = String(m % 60).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
})
</script>
