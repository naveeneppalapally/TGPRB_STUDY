<template>
  <section class="my-8">
    <p class="eyebrow mb-3">{{ mode === 'note' ? 'Live notes' : 'Study mode' }}</p>
    <div class="grid gap-3 sm:grid-cols-2">
      <UCard v-for="topic in chapters" :key="topic.id">
        <NuxtLink :to="mode === 'note' ? noteRoute(topic)! : studyRoute(topic)!" class="font-semibold">{{ topic.title }}</NuxtLink>
        <p class="mt-2 text-body-xs t-lo">{{ mode === 'note' ? topic.keywords.slice(0, 5).join(', ') : 'Section-bound PYQs, recall cards and trap duels' }}</p>
        <p class="mt-2 text-body-xs t-lo">{{ statistics.delivered.find(row => row.id === topic.id)?.pyqCount || 0 }} linked PYQs</p>
      </UCard>
    </div>
  </section>
</template>
<script setup lang="ts">
import topics from '~/data/topics_master.json'
import { noteRoute, studyRoute } from '~/utils/topic-delivery'
import statistics from '~/data/topic_stats.json'
const props = withDefaults(defineProps<{ subject: string; mode?: 'note' | 'study' }>(), { mode: 'study' })
const chapters = computed(() => topics.filter(t => 'subjectSlug' in t && t.subjectSlug === props.subject && (props.mode === 'note' ? t.noteSlug : t.studySlug)))
</script>
