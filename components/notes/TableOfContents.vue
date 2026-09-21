<template>
  <ClientOnly>
    <!-- Mobile / tablet section navigation. Fixed so the aside's grid position does not matter. -->
    <div class="xl:hidden">
    <button
      type="button"
      class="fixed bottom-20 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-full border b-line bg-elev px-4 text-[12px] font-semibold t-hi shadow-pop press"
      :aria-expanded="mobileOpen"
      aria-controls="mobile-toc-panel"
      @click="mobileOpen = true"
    >
      <UIcon name="i-heroicons-bars-3-bottom-left" class="h-4 w-4 accent" />
      Sections
    </button>

    <Teleport to="body">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 z-50 xl:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="On this page"
      >
        <button
          type="button"
          class="absolute inset-0 bg-ink-950/60"
          aria-label="Close section navigation"
          @click="closeMobile"
        />
        <div id="mobile-toc-panel" class="absolute inset-x-0 bottom-0 max-h-[72vh] overflow-y-auto rounded-t-2xl border-t b-line bg-elev p-4 shadow-pop">
          <div class="mb-3 flex items-center justify-between gap-3">
            <p class="eyebrow">On this page</p>
            <button type="button" class="chip press" @click="closeMobile">Close</button>
          </div>
          <nav class="space-y-1">
            <button
              v-for="(section, i) in sections"
              :key="section.id"
              type="button"
              class="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-left text-body-sm transition-colors"
              :class="activeId === section.id ? 'bg-accent-soft t-hi font-semibold' : 't-mid hover:bg-sub hover:t-hi'"
              @click="goToSection(section.id)"
            >
              <span class="font-mono text-[11px]" :class="activeId === section.id ? 'accent' : 't-lo'">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <span class="truncate">{{ section.label }}</span>
            </button>
          </nav>
          <div v-if="weightText" class="mt-4 border-t b-line pt-3">
            <p class="eyebrow mb-1.5">Weight in paper</p>
            <p class="text-body-xs leading-relaxed t-lo">{{ weightText }}</p>
          </div>
        </div>
      </div>
    </Teleport>
    </div>
  </ClientOnly>

  <aside class="hidden w-52 shrink-0 xl:block">
    <div class="sticky top-20">
      <p class="eyebrow mb-3">On this page</p>
      <nav ref="navRef" class="relative space-y-0.5">
        <!-- High-Performance GPU-Composited Magnetic Indicator Pill -->
        <div
          class="toc-pill pointer-events-none absolute start-0 w-full rounded-md bg-accent-soft border border-[var(--accent-line)] will-change-transform"
          :style="pillStyle"
          aria-hidden="true"
        />

        <a
          v-for="(section, i) in sections"
          :key="section.id"
          :ref="(el) => setItemRef(section.id, el)"
          :href="`#${section.id}`"
          class="group relative z-10 flex h-7 items-center gap-2.5 rounded-md px-2 text-body-xs bg-transparent transition-colors duration-100"
          :class="activeId === section.id ? 't-hi font-semibold' : 't-lo hover:t-mid'"
          @click.prevent="scrollTo(section.id)"
        >
          <span
            class="font-mono text-[10px] transition-colors duration-100"
            :class="activeId === section.id ? 'accent' : 't-lo'"
          >
            {{ String(i + 1).padStart(2, '0') }}
          </span>
          <span class="truncate">{{ section.label }}</span>
        </a>
      </nav>

      <div v-if="weightText" class="mt-6 border-t b-line pt-4">
        <p class="eyebrow mb-2">Weight in paper</p>
        <p class="text-body-xs leading-relaxed t-lo">{{ weightText }}</p>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

export interface TocSection {
  id: string
  label: string
}

const props = defineProps<{
  sections: TocSection[]
  weightText?: string
  modelValue?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const innerActiveId = ref(props.modelValue || props.sections[0]?.id || '')

watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined && newVal !== innerActiveId.value) {
    innerActiveId.value = newVal
  }
})

const activeId = computed({
  get: () => (props.modelValue !== undefined ? props.modelValue : innerActiveId.value),
  set: (val: string) => {
    innerActiveId.value = val
    emit('update:modelValue', val)
  }
})

const navRef = ref<HTMLElement | null>(null)
const itemRefs = new Map<string, HTMLElement>()
const pillTop = ref(0)
const pillHeight = ref(28)
const hasPill = ref(false)
const mobileOpen = ref(false)

function setItemRef(id: string, el: any) {
  if (el) {
    const domEl = el.$el || el
    if (domEl instanceof HTMLElement) {
      itemRefs.set(id, domEl)
    }
  } else {
    itemRefs.delete(id)
  }
}

function updatePill() {
  const el = itemRefs.get(activeId.value)
  if (el && navRef.value) {
    pillTop.value = el.offsetTop
    pillHeight.value = el.offsetHeight
    hasPill.value = true
  } else {
    hasPill.value = false
  }
}

const pillStyle = computed(() => ({
  transform: `translate3d(0, ${pillTop.value}px, 0)`,
  height: `${pillHeight.value}px`,
  opacity: hasPill.value ? 1 : 0,
}))

const activeIndex = computed(() => {
  return props.sections.findIndex(s => s.id === activeId.value)
})

watch(activeId, () => {
  nextTick(() => {
    updatePill()
  })
})

watch(() => props.sections, () => {
  nextTick(() => {
    updatePill()
  })
}, { deep: true })

let observer: IntersectionObserver | null = null
let sentinelObserver: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null

function closeMobile() {
  mobileOpen.value = false
}

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    activeId.value = id
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function goToSection(id: string) {
  closeMobile()
  scrollTo(id)
}

watch(mobileOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

defineExpose({ scrollTo })

onMounted(() => {
  nextTick(() => {
    updatePill()
    if (navRef.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updatePill()
      })
      resizeObserver.observe(navRef.value)
    }
  })

  window.addEventListener('resize', updatePill, { passive: true })

  if (typeof IntersectionObserver === 'undefined') return

  // Internal Intersection State Map to handle W3C Delta Callback batches
  const intersectionState = new Map<string, boolean>()

  // Primary Observer: RootMargin matches scroll-mt-20 (80px top offset)
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        intersectionState.set(entry.target.id, entry.isIntersecting)
      })

      // Select the first section in document order that is currently intersecting
      const activeSection = props.sections.find(s => intersectionState.get(s.id))
      if (activeSection) {
        activeId.value = activeSection.id
      }
    },
    {
      rootMargin: '-80px 0px -65% 0px',
      threshold: 0,
    }
  )

  props.sections.forEach(s => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })

  // Bottom Sentinel Observer: Watches terminal sections (#gate, #current-affairs, last section)
  // to prevent reachability deadlocks on compact notes
  const lastSectionId = props.sections[props.sections.length - 1]?.id
  const terminalSectionIds = Array.from(new Set(['gate', 'current-affairs', lastSectionId])).filter(Boolean) as string[]

  sentinelObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
        }
      })
    },
    { threshold: 0.15 }
  )

  terminalSectionIds.forEach(id => {
    const el = document.getElementById(id)
    if (el) sentinelObserver?.observe(el)
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePill)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
  observer?.disconnect()
  sentinelObserver?.disconnect()
})
</script>

<style scoped>
.toc-pill {
  transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1), height 140ms cubic-bezier(0.16, 1, 0.3, 1), opacity 100ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .toc-pill {
    transition: none !important;
  }
}
</style>
