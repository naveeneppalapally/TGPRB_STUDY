<template>
  <div class="flex h-full flex-col">
    <template v-if="chapterReady">
      <StudyTopbar />

      <!-- Desktop (lg+): rail | stage | dock -->
      <div class="flex min-h-0 flex-1">
        <StudyRail class="hidden lg:flex" />
        <StudyStage :bottom-pad="isMobile ? trayPad : '0px'" />
        <StudyDock class="hidden lg:flex" />
      </div>

      <!-- Mobile (< lg): bottom tray with peek / half / full -->
      <StudyTray v-if="isMobile" />
    </template>

    <div v-else-if="error" class="grid flex-1 place-items-center p-8 text-center">
      <div>
        <p class="font-display text-[20px] font-bold t-hi">Chapter not found</p>
        <p class="mt-1 text-[13px] t-mid">{{ error.statusMessage || 'This study chapter has not been authored yet.' }}</p>
        <UButton class="mt-4" to="/" color="gray" variant="soft" icon="i-heroicons-home">Dashboard</UButton>
      </div>
    </div>

    <div v-else class="grid flex-1 place-items-center">
      <span class="font-mono text-[12px] t-lo">Loading chapter...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { StudyChapterResolved } from '~/types/study'
import { createStudySession } from '~/composables/useStudySession'

definePageMeta({
  layout: 'study',
  key: route => route.fullPath,
})

const route = useRoute()
const slug = computed(() => String(route.params.chapter))

// Provide study session synchronously during setup to prevent Vue injection context loss
const chapterContainer = ref<StudyChapterResolved | null>(null)
createStudySession(chapterContainer)

// Enforce responseType json so Cloudflare Pages octet-stream responses are parsed as JSON
const { data: rawChapter, error } = await useFetch<any>(() => `/api/study/${slug.value}`, {
  key: `study-${slug.value}`,
  responseType: 'json',
})

function syncChapter(val: any) {
  if (!val) {
    chapterContainer.value = null
    return
  }
  let parsed = val
  if (typeof val === 'string') {
    try { parsed = JSON.parse(val) } catch { parsed = null }
  }
  if (parsed && typeof parsed === 'object' && Array.isArray(parsed.sections)) {
    chapterContainer.value = parsed as StudyChapterResolved
  }
}

watch(rawChapter, syncChapter, { immediate: true })

const chapterReady = computed(() => {
  return !!chapterContainer.value && Array.isArray(chapterContainer.value.sections) && chapterContainer.value.sections.length > 0
})

useHead({
  title: computed(() => {
    return chapterContainer.value?.title
      ? `${chapterContainer.value.title} - Study - TGPRB StudyOS`
      : 'Study - TGPRB StudyOS'
  }),
})

/* lg breakpoint = 1024px. Below it the dock becomes the tray. */
const isMobile = ref(false)
const mq = ref<MediaQueryList | null>(null)
function sync() { isMobile.value = !!mq.value?.matches }
onMounted(() => {
  mq.value = window.matchMedia('(max-width: 1023px)')
  sync()
  mq.value.addEventListener('change', sync)
})
onBeforeUnmount(() => mq.value?.removeEventListener('change', sync))

/* Stage bottom padding so the peek bar never hides the checkpoint on phones */
const trayPad = 'calc(72px + env(safe-area-inset-bottom, 0px))'
</script>
