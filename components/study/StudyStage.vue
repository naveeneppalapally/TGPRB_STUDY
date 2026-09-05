<template>
  <!--
    Reading stage. The only zone that scrolls, and it only ever holds ONE
    section. Prev/Next (buttons, arrow keys, or horizontal swipe on touch)
    swap the section; the dock re-binds automatically via the session.
  -->
  <section
    ref="stageEl"
    class="study-stage relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-base"
    :style="{ paddingBottom: bottomPad }"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
    @mouseup="onSelectionEnd"
    @touchend="onSelectionEnd"
  >
    <Transition :name="dir === 'next' ? 'stage-next' : 'stage-prev'" mode="out-in">
      <article :key="section.id" class="stage-measure mx-auto w-full max-w-[720px] px-5 pt-8 sm:px-8 sm:pt-10">
        <!-- Section header -->
        <header class="mb-6">
          <p class="eyebrow mb-2">
            Section {{ String(activeIndex + 1).padStart(2, '0') }} of {{ sections.length }}
            <span class="mx-1.5">·</span>~{{ section.estMinutes }} min
          </p>
          <h1 class="font-display text-[24px] font-bold leading-[1.15] tracking-tight t-hi sm:text-[28px]">
            {{ section.title }}
          </h1>
        </header>

        <!-- Blocks -->
        <div class="stage-body">
          <template v-for="(block, bi) in section.blocks" :key="bi">
            <p
              v-if="block.type === 'p'"
              :data-line="block.lineId"
              class="stage-line stage-p"
              :class="{ 'is-flashing': block.lineId && block.lineId === flashLineId }"
            >
              <StudyCloze :html="block.html" />
              <span v-if="pinnedYears(block.lineId).length" class="stage-margin-tags" aria-label="Asked in">
                <span v-for="y in pinnedYears(block.lineId)" :key="y" class="stage-year-tag">{{ y }}</span>
              </span>
            </p>

            <StudyCompareTable v-else-if="block.type === 'compare'" :block="block" />

            <aside
              v-else-if="block.type === 'callout'"
              :data-line="block.lineId"
              class="stage-line callout my-5"
              :class="[`callout-${block.tone === 'neutral' ? '' : block.tone}`, { 'is-flashing': block.lineId && block.lineId === flashLineId }]"
            >
              <p class="callout-title">
                <UIcon :name="calloutIcon(block.tone)" class="h-3.5 w-3.5" />
                {{ block.title }}
              </p>
              <p class="callout-body"><StudyCloze :html="block.html" /></p>
            </aside>

            <figure v-else-if="block.type === 'timeline'" class="my-6">
              <figcaption v-if="block.caption" class="eyebrow mb-3">{{ block.caption }}</figcaption>
              <ol class="relative ml-2 border-l b-strong pl-5">
                <li
                  v-for="ev in block.events"
                  :key="ev.year + ev.label"
                  :data-line="ev.lineId"
                  class="stage-line relative mb-4 last:mb-0"
                  :class="{ 'is-flashing': ev.lineId && ev.lineId === flashLineId }"
                >
                  <span class="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-saffron-500 ring-4 ring-[var(--bg)]" />
                  <span class="mr-2 font-mono text-[12px] font-semibold accent-strong num"><StudyCloze :text="ev.year" /></span>
                  <span class="text-[15px] t-hi"><StudyCloze :text="ev.label" /></span>
                </li>
              </ol>
            </figure>
          </template>
        </div>

        <!-- Checkpoint bar -->
        <div class="checkpoint mt-10 rounded-xl border b-strong bg-elev p-4 sm:p-5">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p class="eyebrow mb-1">Checkpoint</p>
              <p class="text-[13px] t-mid">
                <span class="font-semibold t-hi num">{{ section.pyqs.length }}</span> PYQs
                <span v-if="paperYears.length" class="t-lo">({{ paperYears.join(', ') }})</span>
                <span class="mx-1.5 t-lo">·</span>
                <span class="font-semibold t-hi num">{{ section.cards.length }}</span> cards
                <span class="mx-1.5 t-lo">·</span>
                <span class="font-semibold t-hi num">{{ section.traps.length }}</span> traps
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <UButton size="sm" color="primary" icon="i-heroicons-clipboard-document-check" @click="openTab('pyq', { raiseTray: 'half' })">
                Solve PYQs
              </UButton>
              <UButton size="sm" color="gray" variant="soft" icon="i-heroicons-rectangle-stack" @click="openTab('cards', { raiseTray: 'half' })">
                Flip cards
              </UButton>
              <UButton
                size="sm"
                :color="sectionProgress.read ? 'green' : 'gray'"
                :variant="sectionProgress.read ? 'soft' : 'outline'"
                :icon="sectionProgress.read ? 'i-heroicons-check-circle' : 'i-heroicons-check'"
                @click="markRead()"
              >
                {{ sectionProgress.read ? 'Done' : 'Mark done' }}
              </UButton>
            </div>
          </div>
        </div>

        <!-- Prev / Next -->
        <nav class="mt-6 flex items-center justify-between gap-3 pb-8 text-[13px]" aria-label="Section navigation">
          <button
            type="button"
            class="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 t-mid transition-colors hover:bg-sub hover:t-hi disabled:opacity-30"
            :disabled="!hasPrev"
            @click="go('prev')"
          >
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
            <span class="truncate">{{ hasPrev ? sections[activeIndex - 1].short : 'Start' }}</span>
          </button>
          <span class="hidden font-mono text-[10.5px] t-lo sm:inline">
            <UKbd>←</UKbd> <UKbd>→</UKbd> or swipe
          </span>
          <button
            type="button"
            class="flex min-h-[44px] items-center gap-2 rounded-lg px-3 py-2 font-semibold transition-colors hover:bg-sub disabled:opacity-30"
            :class="hasNext ? 'accent-strong' : 't-lo'"
            :disabled="!hasNext"
            @click="markRead(); go('next')"
          >
            <span class="truncate">{{ hasNext ? sections[activeIndex + 1].short : 'End of chapter' }}</span>
            <UIcon name="i-heroicons-arrow-right" class="h-4 w-4" />
          </button>
        </nav>
      </article>
    </Transition>

    <!-- Selection action bar -->
    <Transition name="fade">
      <div
        v-if="selection"
        class="selection-bar fixed z-30 flex items-center gap-0.5 rounded-lg border b-strong bg-elev p-1 shadow-pop"
        :style="{ left: selection.x + 'px', top: selection.y + 'px' }"
        role="toolbar"
        aria-label="Selection actions"
      >
        <button type="button" class="sel-btn" @click="act('notes')">
          <UIcon name="i-heroicons-pencil-square" class="h-3.5 w-3.5" />Note
        </button>
        <button type="button" class="sel-btn" @click="act('cards')">
          <UIcon name="i-heroicons-rectangle-stack" class="h-3.5 w-3.5" />Card
        </button>
        <button type="button" class="sel-btn" @click="act('traps')">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-3.5 w-3.5" />Trap
        </button>
      </div>
    </Transition>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { DockTab } from '~/types/study'
import { useStudySession } from '~/composables/useStudySession'

const props = defineProps<{
  /** Extra bottom padding so the mobile tray never covers the checkpoint. */
  bottomPad?: string
}>()

const {
  section, sections, activeIndex, hasPrev, hasNext, next, prev,
  flashLineId, openTab, markRead, sectionProgress, captureAnchor, clozeOn,
} = useStudySession()

const stageEl = ref<HTMLElement | null>(null)
const dir = ref<'next' | 'prev'>('next')
const bottomPad = computed(() => props.bottomPad ?? '0px')

function go(d: 'next' | 'prev') {
  dir.value = d
  if (d === 'next') next()
  else prev()
}

// Scroll to top of stage when section changes
watch(() => section.value.id, () => {
  stageEl.value?.scrollTo({ top: 0, behavior: 'auto' })
  selection.value = null
})

// Years each line was asked in (margin heat map)
const paperYears = computed(() => {
  const years = new Set<string>()
  for (const q of section.value.pyqs) for (const p of q.papers) {
    const y = p.match(/20\d\d/)?.[0]
    if (y) years.add(y)
  }
  return Array.from(years).sort()
})
function pinnedYears(lineId?: string): string[] {
  if (!lineId) return []
  const years = new Set<string>()
  for (const q of section.value.pyqs) {
    if (q.sourceLine !== lineId) continue
    for (const p of q.papers) {
      const y = p.match(/20\d\d/)?.[0]
      if (y) years.add(y)
    }
  }
  return Array.from(years).sort()
}

function calloutIcon(tone: string) {
  if (tone === 'red') return 'i-heroicons-exclamation-triangle'
  if (tone === 'jade') return 'i-heroicons-check-badge'
  return 'i-heroicons-light-bulb'
}

// ── Keyboard ───────────────────────────────────────────────────────────
function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  if (e.ctrlKey || e.metaKey || e.altKey) return
  if (e.key === 'ArrowRight' || e.key === 'j' || e.key === 'J') { e.preventDefault(); go('next') }
  else if (e.key === 'ArrowLeft' || e.key === 'k' || e.key === 'K') { e.preventDefault(); go('prev') }
  else if (e.key === 'c' || e.key === 'C') { clozeOn.value = !clozeOn.value }
  else if (e.key === '1') openTab('pyq')
  else if (e.key === '2') openTab('cards')
  else if (e.key === '3') openTab('notes')
  else if (e.key === '4') openTab('traps')
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))

// ── Horizontal swipe (touch) ───────────────────────────────────────────
let tx = 0, ty = 0, tt = 0
function onTouchStart(e: TouchEvent) {
  const t = e.changedTouches[0]
  tx = t.clientX; ty = t.clientY; tt = Date.now()
}
function onTouchEnd(e: TouchEvent) {
  const t = e.changedTouches[0]
  const dx = t.clientX - tx
  const dy = t.clientY - ty
  const dt = Date.now() - tt
  // Ignore if a text selection is active or a table is being scrolled sideways
  if (window.getSelection()?.toString()) return
  if ((e.target as HTMLElement).closest('table, .compare-table')) return
  if (dt < 600 && Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (dx < 0) go('next')
    else go('prev')
  }
}

// ── Selection action bar ───────────────────────────────────────────────
const selection = ref<{ text: string; x: number; y: number } | null>(null)
function onSelectionEnd() {
  // Let the browser finalise the selection first
  setTimeout(() => {
    const sel = window.getSelection()
    const text = sel?.toString().trim() ?? ''
    if (!sel || !text || text.length < 3 || sel.rangeCount === 0) { selection.value = null; return }
    const range = sel.getRangeAt(0)
    if (!stageEl.value?.contains(range.commonAncestorContainer)) { selection.value = null; return }
    const rect = range.getBoundingClientRect()
    const barW = 200
    const x = Math.min(Math.max(8, rect.left + rect.width / 2 - barW / 2), window.innerWidth - barW - 8)
    const y = Math.max(8, rect.top - 44)
    selection.value = { text, x, y }
  }, 10)
}
function act(tab: DockTab) {
  if (!selection.value) return
  captureAnchor(selection.value.text, tab)
  selection.value = null
  window.getSelection()?.removeAllRanges()
}
</script>

<style scoped>
.stage-body :deep(.stage-p) {
  position: relative;
  margin-bottom: 1.1rem;
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-2);
}
@media (min-width: 640px) {
  .stage-body :deep(.stage-p) { font-size: 18px; line-height: 1.68; }
}
.stage-body :deep(.stage-p strong) { color: var(--text-1); font-weight: 600; }
.stage-body :deep(.stage-p em) { color: var(--text-1); }
.stage-body :deep(.callout-body) { font-size: 14.5px; line-height: 1.6; }

/* Source-lit flash */
.stage-line { border-radius: 6px; transition: background-color 0.3s ease, box-shadow 0.3s ease; }
.stage-line.is-flashing {
  animation: stage-flash 2.2s ease-out both;
}
@keyframes stage-flash {
  0%   { background-color: var(--accent-line); box-shadow: 0 0 0 6px var(--accent-line); }
  40%  { background-color: var(--accent-soft); box-shadow: 0 0 0 6px var(--accent-soft); }
  100% { background-color: transparent; box-shadow: 0 0 0 6px transparent; }
}

/* Margin year tags (desktop: hang in the right margin; mobile: inline) */
.stage-margin-tags {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
  vertical-align: middle;
}
@media (min-width: 1440px) {
  .stage-margin-tags {
    position: absolute;
    left: 100%;
    top: 4px;
    margin-left: 14px;
    flex-direction: column;
    align-items: flex-start;
  }
}
.stage-year-tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 1px 5px;
  border-radius: 4px;
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  color: var(--accent-strong);
  white-space: nowrap;
}

/* Section swap */
.stage-next-enter-active, .stage-next-leave-active,
.stage-prev-enter-active, .stage-prev-leave-active { transition: opacity 0.16s ease, transform 0.16s ease; }
.stage-next-enter-from { opacity: 0; transform: translateX(18px); }
.stage-next-leave-to   { opacity: 0; transform: translateX(-18px); }
.stage-prev-enter-from { opacity: 0; transform: translateX(-18px); }
.stage-prev-leave-to   { opacity: 0; transform: translateX(18px); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.12s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.sel-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-2);
}
.sel-btn:hover { background: var(--accent-soft); color: var(--accent-strong); }
</style>
