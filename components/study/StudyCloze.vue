<template>
  <span
    class="study-cloze"
    :class="{ 'is-on': clozeOn }"
    v-html="rendered"
    @click="onClick"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStudySession } from '~/composables/useStudySession'

/**
 * Renders authored HTML (or plain text). When the session cloze toggle is on,
 * every <strong>...</strong> span and every bare number/article reference is
 * redacted to a chip. Click a chip to reveal it. No extra content is authored:
 * the same sentence the student read becomes the recall test.
 */
const props = defineProps<{
  html?: string
  text?: string
}>()

const { clozeOn } = useStudySession()

/**
 * Matches: 250 · 1/3 · 83(1) · Art. 110(3) · 104th · 79 to 122 (as two chips)
 * Does not swallow a closing paren that belongs to the sentence.
 */
const NUM_RE = /(?<![\w<>"'=/-])((?:Art(?:icle)?\.?\s*)?\d[\d,]*(?:\(\d+\))?(?:[/-]\d+)?(?:st|nd|rd|th)?)(?![\w"'=;-])/g

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const source = computed(() => props.html ?? escape(props.text ?? ''))

const rendered = computed(() => {
  if (!clozeOn.value) return source.value
  // 1. Whole <strong> spans become chips
  let out = source.value.replace(/<strong>([\s\S]*?)<\/strong>/g, (_m, inner: string) =>
    `<button type="button" class="cloze-chip" data-cloze="1"><span class="cloze-hidden">${inner}</span></button>`)
  // 2. Bare numbers outside tags become chips
  out = out.split(/(<[^>]+>)/g).map((chunk) => {
    if (chunk.startsWith('<')) return chunk
    return chunk.replace(NUM_RE, (m: string) =>
      `<button type="button" class="cloze-chip" data-cloze="1"><span class="cloze-hidden">${m}</span></button>`)
  }).join('')
  return out
})

function onClick(e: MouseEvent) {
  const target = (e.target as HTMLElement).closest('[data-cloze]') as HTMLElement | null
  if (!target) return
  e.preventDefault()
  e.stopPropagation()
  target.classList.toggle('is-revealed')
}
</script>

<style>
/* Global (unscoped) because chips are injected via v-html */
.cloze-chip {
  display: inline-block;
  min-width: 2.2em;
  margin: 0 1px;
  padding: 0 6px;
  border-radius: 5px;
  border: 1px dashed var(--accent-line);
  background: var(--accent-soft);
  color: transparent;
  font: inherit;
  line-height: 1.35;
  vertical-align: baseline;
  cursor: pointer;
  transition: background-color 0.12s ease, color 0.12s ease;
  user-select: none;
}
.cloze-chip .cloze-hidden { visibility: hidden; }
.cloze-chip.is-revealed {
  background: transparent;
  border-style: solid;
  color: var(--accent-strong);
  font-weight: 600;
}
.cloze-chip.is-revealed .cloze-hidden { visibility: visible; }
.cloze-chip:hover { background: var(--accent-line); }
.cloze-chip.is-revealed:hover { background: var(--accent-soft); }
</style>
