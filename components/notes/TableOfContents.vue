<template>
  <aside class="hidden w-52 shrink-0 xl:block">
    <div class="sticky top-20">
      <p class="eyebrow mb-3">On this page</p>
      <nav ref="navRef" class="relative space-y-0.5">
        <!-- High-Performance GPU-Composited Magnetic Indicator Pill -->
        <div
          class="toc-pill pointer-events-none absolute start-0 w-full rounded-md bg-accent-soft border border-accent-line will-change-transform"
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

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    activeId.value = id
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

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
