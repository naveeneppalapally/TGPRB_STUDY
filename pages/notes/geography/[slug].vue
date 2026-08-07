<template>
  <div v-if="doc">
    <!-- ── Breadcrumb ── -->
    <nav class="mb-6 flex items-center gap-2 text-xs text-gray-400">
      <NuxtLink to="/" class="hover:text-gray-600 dark:hover:text-gray-300">Dashboard</NuxtLink>
      <span>/</span>
      <NuxtLink to="/notes/geography" class="hover:text-gray-600 dark:hover:text-gray-300">Geography</NuxtLink>
      <span>/</span>
      <span class="text-gray-600 dark:text-gray-300">{{ doc.topic }}</span>
    </nav>

    <!-- ── Header meta ── -->
    <div class="mb-8 border-b border-gray-100 pb-6 dark:border-gray-800">
      <div class="mb-3 flex flex-wrap items-center gap-2">
        <UBadge label="T1" color="amber" variant="subtle" size="sm" />
        <UBadge :label="`${doc.verified_pyq_count} PYQs`" color="primary" variant="subtle" size="sm" />
        <UBadge label="Geography" color="gray" variant="subtle" size="sm" />
      </div>
      <h1 class="text-2xl font-bold tracking-tight">{{ doc.topic }}</h1>
      <p class="mt-1 text-sm text-gray-500">{{ doc.exam_section }} · TSLPRB Constable / SI</p>
    </div>

    <!-- ── Rendered markdown content ── -->
    <!-- ContentRenderer handles markdown → HTML, prose styles from note-body class -->
    <ContentRenderer :value="doc" class="note-body" />
  </div>

  <!-- ── Not found state ── -->
  <div v-else class="py-16 text-center">
    <UIcon name="i-heroicons-document-text" class="mx-auto mb-4 h-12 w-12 text-gray-300" />
    <h2 class="mb-2 text-lg font-semibold">Note Not Found</h2>
    <p class="mb-6 text-sm text-gray-500">This topic hasn't been built yet.</p>
    <UButton label="Back to Dashboard" to="/" color="primary" variant="soft" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

// Capitalize slug words for title
const titleCase = (s: string) =>
  s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

useHead({
  title: `${titleCase(slug)} - TSLPRB StudyOS`,
  meta: [{ name: 'description', content: `TSLPRB study notes on ${titleCase(slug)}.` }],
})

// @nuxt/content v3 API: queryCollection('content')
const { data: doc } = await useAsyncData(
  `note-${slug}`,
  async () => {
    try {
      // Query by path
      const item = await queryCollection('content').where('path', '=', `/notes/geography/${slug}`).first()
      if (item) return item
      // Fallback: try by stem or where path ends with slug
      const all = await queryCollection('content').all()
      return all.find((c: any) => c.path?.endsWith(slug) || c.stem?.endsWith(slug) || c.id?.includes(slug)) || null
    } catch (e) {
      console.error('Error fetching note:', e)
      return null
    }
  }
)

</script>
