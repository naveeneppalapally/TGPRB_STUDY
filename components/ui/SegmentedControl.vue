<template>
  <div
    ref="containerRef"
    class="relative inline-flex items-center rounded-lg border b-line bg-sub p-1 select-none"
    role="tablist"
  >
    <!-- High-Performance GPU-Composited Sliding Indicator Pill with Morphing Width -->
    <div
      class="pointer-events-none absolute top-1 bottom-1 rounded-md bg-elev shadow-sm border b-line transition-[transform,width] duration-160 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
      :style="{
        width: `${pillWidth}px`,
        transform: `translate3d(${pillLeft}px, 0, 0)`,
        opacity: pillWidth > 0 ? 1 : 0
      }"
      aria-hidden="true"
    />

    <!-- Segment Options -->
    <button
      v-for="(option, index) in options"
      :key="option.value"
      :ref="(el) => setOptionRef(index, el)"
      type="button"
      role="tab"
      :aria-selected="modelValue === option.value"
      class="relative z-10 flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium border border-transparent transition-colors duration-100 active:scale-96"
      :class="modelValue === option.value ? 't-hi font-semibold' : 't-lo hover:t-mid'"
      @click="selectOption(option.value)"
    >
      <UIcon v-if="option.icon" :name="option.icon" class="h-3.5 w-3.5" />
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'

export interface SegmentOption {
  label: string
  value: string
  icon?: string
}

const props = defineProps<{
  options: SegmentOption[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const optionRefs = ref<HTMLElement[]>([])
const pillLeft = ref(0)
const pillWidth = ref(0)

function setOptionRef(index: number, el: any) {
  if (el) optionRefs.value[index] = el.$el || el
}

function updatePill() {
  const currentIndex = props.options.findIndex(o => o.value === props.modelValue)
  const activeEl = optionRefs.value[currentIndex]
  if (activeEl && containerRef.value) {
    pillLeft.value = activeEl.offsetLeft
    pillWidth.value = activeEl.offsetWidth
  }
}

function selectOption(value: string) {
  emit('update:modelValue', value)
}

watch(() => props.modelValue, () => {
  nextTick(updatePill)
})

onMounted(() => {
  nextTick(updatePill)
})
</script>
