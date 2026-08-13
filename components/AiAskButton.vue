<template>
  <UButton
    :label="label"
    icon="i-heroicons-sparkles"
    color="primary"
    variant="soft"
    :size="compact ? 'xs' : 'sm'"
    @click="openAssistant"
  />
</template>

<script setup lang="ts">
import type { AiAssistantAction, AiExamProfile, AiQuizState } from '~/types/ai'

const props = withDefaults(defineProps<{
  noteId: string
  prompt: string
  examProfile?: AiExamProfile
  action?: AiAssistantAction
  sourceQuestionId?: string
  quizState?: AiQuizState
  label?: string
  compact?: boolean
}>(), {
  examProfile: 'constable',
  action: 'explain',
  label: 'Ask AI',
  compact: true,
})

const { ask } = useAiAssistant()

function openAssistant() {
  ask({
    noteId: props.noteId,
    question: props.prompt,
    examProfile: props.examProfile,
    action: props.action,
    sourceQuestionId: props.sourceQuestionId,
    quizState: props.quizState,
  })
}
</script>
