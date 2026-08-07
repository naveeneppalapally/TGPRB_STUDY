<template>
  <div class="mx-auto max-w-2xl">
    <!-- Page header -->
    <header class="mb-8 border-b b-line pb-6">
      <div class="mb-2 flex items-center gap-2 text-[12px] t-lo">
        <NuxtLink to="/" class="hover:t-hi transition-colors">Dashboard</NuxtLink>
        <UIcon name="i-heroicons-chevron-right" class="h-3 w-3" />
        <span class="t-mid">Settings</span>
      </div>
      <h1 class="font-display text-h1 font-bold tracking-tight t-hi">Settings</h1>
      <p class="mt-1 text-[14px] t-mid">Preferences are saved locally in your browser.</p>
    </header>

    <!-- Typography -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Typography</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5">
        
        <!-- Controls Grid -->
        <div class="grid gap-6">
          
          <!-- Base Text -->
          <div class="flex items-start justify-between gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Base text</p>
              <p class="mt-0.5 text-[13px] t-lo">Paragraphs, lists, and standard interface text.</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1">
              <button
                v-for="opt in sizeOptions"
                :key="'base'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleBase === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('base', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Headings -->
          <div class="flex items-start justify-between gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Headings</p>
              <p class="mt-0.5 text-[13px] t-lo">Main page titles and top-level sections (H1, H2).</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1">
              <button
                v-for="opt in sizeOptions"
                :key="'head'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleHeading === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('heading', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Subheadings -->
          <div class="flex items-start justify-between gap-6">
            <div>
              <p class="text-[15px] font-medium t-hi">Subheadings</p>
              <p class="mt-0.5 text-[13px] t-lo">Deep dive titles and subsection headers (H3, H4).</p>
            </div>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1">
              <button
                v-for="opt in sizeOptions"
                :key="'sub'+opt.value"
                type="button"
                class="rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="scaleSubheading === opt.value
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="setScale('subheading', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
          
        </div>

        <!-- Live preview -->
        <div class="mt-6 rounded-lg border b-line bg-base px-4 py-4">
          <p class="mb-2 text-[11px] uppercase tracking-widest t-lo font-mono">Live Preview</p>
          <div class="space-y-3">
            <p class="font-display font-bold t-hi text-h2">
              The Godavari Basin
            </p>
            <p class="font-semibold t-hi text-h3">
              Geographical Extent
            </p>
            <p class="t-mid text-body">
              The Godavari basin extends over states of Maharashtra, Andhra Pradesh, Chhattisgarh and Odisha in addition to smaller parts in Madhya Pradesh, Karnataka and Union territory of Puducherry.
            </p>
            <p class="font-semibold t-hi text-h4 mt-2">
              Key Tributaries
            </p>
            <p class="t-mid text-body-sm">
              The Pravara, Purna, Manjra, Penganga, Wardha, Wainganga, Pranhita (combined flow of Wainganga, Penganga, Wardha), Indravati, Maner and the Sabri.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Color Mode -->
    <section class="mb-8">
      <h2 class="mb-1 text-[13px] font-semibold uppercase tracking-wider t-lo">Appearance</h2>
      <div class="mt-3 rounded-xl border b-line bg-elev p-5">
        <div class="flex items-center justify-between gap-6">
          <div>
            <p class="text-[15px] font-medium t-hi">Color mode</p>
            <p class="mt-0.5 text-[13px] t-lo">Switch between light and dark themes.</p>
          </div>
          <ClientOnly>
            <div class="flex shrink-0 items-center gap-1 rounded-lg border b-line bg-sub p-1">
              <button
                v-for="mode in ['light', 'dark']"
                :key="mode"
                type="button"
                class="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors"
                :class="colorMode.value === mode
                  ? 'bg-elev shadow-sm t-hi border b-line'
                  : 't-lo hover:t-mid'"
                @click="colorMode.preference = mode"
              >
                <UIcon
                  :name="mode === 'light' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
                  class="h-3.5 w-3.5"
                />
                {{ mode.charAt(0).toUpperCase() + mode.slice(1) }}
              </button>
            </div>
          </ClientOnly>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Settings - StudyOS' })

const colorMode = useColorMode()

const sizeOptions = [
  { label: 'Small',   value: 'small'   },
  { label: 'Default', value: 'default' },
  { label: 'Large',   value: 'large'   },
]

// The multipliers for each option
const scaleMap: Record<string, string> = {
  small:   '0.875',
  default: '1',
  large:   '1.125',
}

const scaleHeading = ref<string>('default')
const scaleSubheading = ref<string>('default')
const scaleBase = ref<string>('default')

onMounted(() => {
  scaleHeading.value = localStorage.getItem('studyos-scale-heading') || 'default'
  scaleSubheading.value = localStorage.getItem('studyos-scale-subheading') || 'default'
  scaleBase.value = localStorage.getItem('studyos-scale-base') || 'default'
})

function setScale(type: 'heading' | 'subheading' | 'base', value: string) {
  if (type === 'heading') {
    scaleHeading.value = value
    localStorage.setItem('studyos-scale-heading', value)
    document.documentElement.style.setProperty('--scale-heading', scaleMap[value])
  } else if (type === 'subheading') {
    scaleSubheading.value = value
    localStorage.setItem('studyos-scale-subheading', value)
    document.documentElement.style.setProperty('--scale-subheading', scaleMap[value])
  } else if (type === 'base') {
    scaleBase.value = value
    localStorage.setItem('studyos-scale-base', value)
    document.documentElement.style.setProperty('--scale-base', scaleMap[value])
  }
}
</script>
