<template>
  <ClientOnly>
    <div class="mermaid-shell">
      <!-- Render target -->
      <div v-show="ready" ref="el" class="mermaid-wrap" />

      <!-- Loading skeleton -->
      <div v-if="!ready && !failed" class="mermaid-loading" aria-hidden="true">
        <div class="skel skel-wide" />
        <div class="skel-row">
          <div class="skel skel-node" />
          <div class="skel skel-node" />
          <div class="skel skel-node" />
        </div>
        <span class="mermaid-hint">Drawing diagram…</span>
      </div>

      <!-- Error state -->
      <div v-if="failed" class="callout callout-red">
        <p class="callout-title">
          <UIcon name="i-heroicons-exclamation-triangle" class="h-4 w-4" />
          Diagram failed to render
        </p>
        <p class="callout-body">The Mermaid source for this figure could not be parsed.</p>
      </div>
    </div>

    <template #fallback>
      <div class="mermaid-shell">
        <div class="mermaid-loading" aria-hidden="true">
          <div class="skel skel-wide" />
          <span class="mermaid-hint">Loading diagram…</span>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useThemePreset } from '@/composables/useThemePreset'

const props = defineProps<{ code: string }>()

const el = ref<HTMLElement | null>(null)
const ready = ref(false)
const failed = ref(false)
const colorMode = useColorMode()
const { preset } = useThemePreset()

let mermaidApi: any = null
let renderSeq = 0

/** Palette-matched Mermaid theme - preset aware. */
function themeFor(mode: string, currentPreset: string) {
  const dark = mode === 'dark'

  let primaryColor = dark ? '#241e13' : '#faf3df'
  let primaryBorderColor = dark ? '#e5ad31' : '#cd8a14'
  let primaryTextColor = dark ? '#f3efe4' : '#3b2e12'

  if (currentPreset === 'forest') {
    primaryColor = dark ? '#13221C' : '#FAFDF8'
    primaryBorderColor = dark ? '#34D399' : '#247A55'
    primaryTextColor = dark ? '#ECFDF5' : '#14271F'
  } else if (currentPreset === 'notebook') {
    primaryColor = dark ? '#1D2B33' : '#FFFDF7'
    primaryBorderColor = dark ? '#F3CE72' : '#C99A3B'
    primaryTextColor = dark ? '#F3E6C6' : '#20303A'
  }

  return {
    startOnLoad: false,
    theme: 'base',
    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
    themeVariables: {
      background: 'transparent',
      primaryColor,
      primaryBorderColor,
      primaryTextColor,
      secondaryColor: dark ? '#1a1915' : '#f5f3ec',
      tertiaryColor: dark ? '#14120d' : '#eeebe0',
      lineColor: dark ? '#8d867a' : '#a8a29e',
      textColor: dark ? '#e9e2d2' : '#44403c',
      mainBkg: primaryColor,
      nodeBorder: primaryBorderColor,
      clusterBkg: dark ? '#1a1915' : '#f5f3ec',
      edgeLabelBackground: dark ? '#17150f' : '#fffefa',
      fontSize: '13px',
    },
    mindmap: { useMaxWidth: true },
    flowchart: { useMaxWidth: true, htmlLabels: true },
  } as const
}

async function render() {
  if (!el.value) return
  const seq = ++renderSeq
  try {
    if (!mermaidApi) {
      mermaidApi = (await import('mermaid')).default
    }
    mermaidApi.initialize(themeFor(colorMode.value, preset.value))
    const id = `mermaid-${Math.random().toString(36).slice(2)}`
    const { svg } = await mermaidApi.render(id, props.code)
    if (seq !== renderSeq || !el.value) return
    el.value.innerHTML = svg
    ready.value = true
    failed.value = false
  } catch {
    if (seq !== renderSeq) return
    failed.value = true
    ready.value = false
  }
}

onMounted(render)

/* Re-render when the color mode or preset flips so the diagram matches the theme. */
watch([() => colorMode.value, () => preset.value], () => {
  ready.value = false
  render()
})
</script>

<style scoped>
.mermaid-shell {
  min-height: 120px;
}
.mermaid-wrap {
  overflow-x: auto;
  padding: 8px 0 4px;
  animation: mm-in 0.35s ease;
}
.mermaid-wrap :deep(svg) {
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  display: block;
}
.mermaid-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 16px;
}
.skel {
  border-radius: 8px;
  background: linear-gradient(90deg, var(--bg-subtle) 25%, var(--bg-inset) 50%, var(--bg-subtle) 75%);
  background-size: 200% 100%;
  animation: mm-shimmer 1.4s ease infinite;
}
.skel-wide { width: 70%; height: 14px; }
.skel-row { display: flex; gap: 14px; }
.skel-node { width: 72px; height: 34px; }
.mermaid-hint {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-3);
}
@keyframes mm-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@keyframes mm-in {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
