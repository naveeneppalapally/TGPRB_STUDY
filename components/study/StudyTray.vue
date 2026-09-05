<template>
  <!--
    Mobile bottom tray. Three snap heights:
      peek : 56px  - counts for this section, always visible
      half : 50%   - reading stays visible above; answer MCQs in context
      full : ~92%  - typing notes / long explanations
    Drag the handle or tap the peek bar. Height follows the finger while
    dragging, then snaps to the nearest stop on release.
  -->
  <div
    class="study-tray fixed inset-x-0 bottom-0 z-40 flex flex-col rounded-t-2xl border-t b-strong bg-elev shadow-pop"
    :class="{ 'is-dragging': dragging }"
    :style="{ height: heightPx + 'px' }"
    role="region"
    aria-label="Work tray"
  >
    <!-- Handle / peek bar -->
    <div
      class="tray-handle relative flex shrink-0 select-none flex-col items-center touch-none"
      @touchstart.passive="onStart"
      @touchmove.prevent="onMove"
      @touchend="onEnd"
      @mousedown="onStart"
      @click="onPeekTap"
    >
      <span class="mt-2 h-1 w-10 rounded-full bg-stone-300 dark:bg-stone-700" aria-hidden="true" />

      <!-- Peek content -->
      <div v-if="trayHeight === 'peek'" class="flex h-[44px] w-full items-center justify-between px-4">
        <div class="flex items-center gap-1.5 font-mono text-[11px] t-mid num">
          <UIcon name="i-heroicons-chevron-up" class="h-3.5 w-3.5 t-lo" />
          <span><b class="t-hi">{{ counts.pyqs }}</b> PYQs</span>
          <span class="t-lo">·</span>
          <span><b class="t-hi">{{ counts.cards }}</b> cards</span>
          <span class="t-lo">·</span>
          <span><b class="t-hi">{{ counts.traps }}</b> traps</span>
          <span class="t-lo">·</span>
          <span><b class="t-hi">{{ noteCount }}</b> notes</span>
        </div>
        <span v-if="counts.wrong" class="rounded-md bg-red-500/15 px-1.5 font-mono text-[10px] text-red-500 num">{{ counts.wrong }} ✗</span>
      </div>

      <!-- Tabs when raised -->
      <div v-else class="flex h-[44px] w-full min-w-0 items-center border-b b-line" @click.stop>
        <StudyDockTabs class="min-w-0 flex-1" raise-to="half" />
        <div class="flex shrink-0 items-center pr-1.5">
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-lg t-lo hover:bg-sub hover:t-hi"
            :aria-label="trayHeight === 'full' ? 'Shrink tray' : 'Expand tray'"
            @click="setTray(trayHeight === 'full' ? 'half' : 'full')"
          >
            <UIcon :name="trayHeight === 'full' ? 'i-heroicons-arrows-pointing-in' : 'i-heroicons-arrows-pointing-out'" class="h-4 w-4" />
          </button>
          <button
            type="button"
            class="grid h-9 w-9 place-items-center rounded-lg t-lo hover:bg-sub hover:t-hi"
            aria-label="Collapse tray"
            @click="setTray('peek')"
          >
            <UIcon name="i-heroicons-chevron-down" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div v-if="trayHeight !== 'peek'" class="min-h-0 flex-1">
      <div class="flex items-center gap-2 border-b b-line bg-sub/60 px-4 py-1">
        <span class="h-1.5 w-1.5 rounded-full bg-saffron-500" />
        <span class="truncate font-mono text-[10px] uppercase tracking-wider t-lo">Sec {{ String(activeIndex + 1).padStart(2, '0') }} · {{ section.short }}</span>
      </div>
      <div class="h-[calc(100%-26px)] min-h-0">
        <StudyDockBody />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { TrayHeight } from '~/types/study'
import { useStudySession } from '~/composables/useStudySession'
import { usePersonalNotes } from '~/composables/usePersonalNotes'

const { chapter, section, activeIndex, trayHeight, setTray, sectionCounts } = useStudySession()
const { getCountForSection } = usePersonalNotes()

const counts = computed(() => sectionCounts(section.value))
const noteCount = computed(() => getCountForSection(chapter.value.noteId, section.value.id))

const PEEK = 56
const vh = ref(800)
function measure() { vh.value = window.innerHeight }
onMounted(() => { measure(); window.addEventListener('resize', measure) })
onBeforeUnmount(() => { window.removeEventListener('resize', measure); window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onEnd) })

const stops = computed<Record<TrayHeight, number>>(() => ({
  peek: PEEK,
  half: Math.round(vh.value * 0.5),
  full: Math.round(vh.value * 0.92),
}))

const dragging = ref(false)
const dragHeight = ref<number | null>(null)
const heightPx = computed(() => dragHeight.value ?? stops.value[trayHeight.value])

defineExpose({ PEEK })

let startY = 0
let startH = 0
function clientY(e: TouchEvent | MouseEvent) {
  return 'touches' in e ? (e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0) : e.clientY
}
function onStart(e: TouchEvent | MouseEvent) {
  startY = clientY(e)
  startH = heightPx.value
  dragging.value = true
  if (!('touches' in e)) {
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
  }
}
function onMove(e: TouchEvent | MouseEvent) {
  if (!dragging.value) return
  const dy = startY - clientY(e)
  dragHeight.value = Math.max(PEEK, Math.min(stops.value.full, startH + dy))
}
function onEnd() {
  if (!dragging.value) return
  dragging.value = false
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseup', onEnd)
  const h = dragHeight.value
  dragHeight.value = null
  if (h === null) return
  const moved = Math.abs(h - startH) > 12
  if (!moved) return // treat as tap; onPeekTap handles it
  // Snap to nearest stop
  const entries = Object.entries(stops.value) as Array<[TrayHeight, number]>
  entries.sort((a, b) => Math.abs(a[1] - h) - Math.abs(b[1] - h))
  setTray(entries[0][0])
}
function onPeekTap() {
  if (trayHeight.value === 'peek') setTray('half')
}

// Section changes drop the tray to peek only from full (session handles); keep half.
watch(() => section.value.id, () => { dragHeight.value = null })
</script>

<style scoped>
.study-tray {
  transition: height 0.26s cubic-bezier(0.2, 0.8, 0.2, 1);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
.study-tray.is-dragging { transition: none; }
</style>
