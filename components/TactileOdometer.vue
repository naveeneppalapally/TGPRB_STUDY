<template>
  <span
    class="inline-flex items-baseline font-mono font-bold tabular-nums tracking-tighter overflow-hidden h-[1.1em] leading-none select-none"
    aria-live="polite"
  >
    <template v-for="(char, i) in formattedDigits" :key="i">
      <!-- Non-digit Separators -->
      <span v-if="isNaN(Number(char))" class="inline-block">{{ char }}</span>

      <!-- Rolling Digit Column -->
      <span
        v-else
        class="inline-block overflow-hidden h-[1.1em] relative"
        style="width: 0.62em;"
      >
        <span
          class="odometer-digit-strip flex flex-col transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
          :style="{
            transform: `translate3d(0, -${Number(char) * 10}%, 0)`,
            transitionDelay: `${i * 35}ms`
          }"
        >
          <span v-for="digit in 10" :key="digit - 1" class="h-[1.1em] flex items-center justify-center">
            {{ digit - 1 }}
          </span>
        </span>
      </span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number | string | null
}>()

const formattedDigits = computed(() => {
  if (props.value === null || props.value === undefined) return ['-']
  return String(props.value).split('')
})
</script>
