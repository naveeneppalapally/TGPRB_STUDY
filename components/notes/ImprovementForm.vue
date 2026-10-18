<script setup lang="ts">
function hidePreview(event: Event) {
  if (event.target instanceof HTMLImageElement) event.target.style.display = 'none'
}
function resizeInput(event: Event) {
  const target = event.target
  if (!(target instanceof HTMLTextAreaElement)) return
  target.style.height = 'auto'
  target.style.height = `${target.scrollHeight}px`
}

import { ref, computed } from 'vue'
import type { SectionContext } from '@/types/annotations'
import { useImprovementQueue } from '@/composables/useImprovementQueue'
import { useToast } from '#imports'
import { characterCount, FEEDBACK_DESCRIPTION_LIMIT } from '@/utils/annotation-validation'

const props = defineProps<{
  context: SectionContext
}>()

const { submitImprovement } = useImprovementQueue()
const toast = useToast()
const user = useSupabaseUser()

const itemType = ref('fix_fact')
const description = ref('')
const referenceUrl = ref('')

const typeOptions = [
  { label: 'Fix Fact', value: 'fix_fact' },
  { label: 'Replace Image', value: 'replace_image' },
  { label: 'Add Image', value: 'add_image' },
  { label: 'Add Table', value: 'add_table' },
  { label: 'Add Topic', value: 'add_topic' },
  { label: 'Other', value: 'other' }
]

const isImagePreview = computed(() => {
  const url = referenceUrl.value.toLowerCase()
  return url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.webp') || url.endsWith('.gif')
})

const submitting = ref(false)

async function onSubmit() {
  if (!user.value || !description.value.trim() || characterCount(description.value) > FEEDBACK_DESCRIPTION_LIMIT) return
  
  submitting.value = true
  try {
    submitImprovement(
      props.context,
      itemType.value as any,
      description.value,
      referenceUrl.value || undefined
    )
    
    toast.add({
      title: 'Feedback queued',
      description: 'Saved on this device. It will be sent when your account is connected.',
      color: 'green'
    })
    
    // Reset form
    description.value = ''
    referenceUrl.value = ''
    itemType.value = 'fix_fact'
  } catch (err: any) {
    toast.add({
      title: 'Error',
      description: err.message || 'Could not submit feedback.',
      color: 'red'
    })
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="space-y-5">
    <div v-if="!user" class="rounded-lg border b-line bg-sub p-4 space-y-3">
      <p class="text-sm t-mid">Sign in to send feedback to the review queue. Guest feedback is not sent.</p>
      <UButton to="/auth/login" label="Sign in to send feedback" />
    </div>
    <template v-else>
    <div class="bg-sub border b-line p-3 rounded-xl flex items-start gap-3">
      <UIcon name="i-heroicons-light-bulb" class="h-5 w-5 text-saffron-500 mt-0.5" />
      <div>
        <p class="text-[12px] t-mid">You are suggesting an improvement for:</p>
        <div class="font-semibold text-[13px] t-hi mt-0.5">
          {{ context.sectionLabel }}
        </div>
      </div>
    </div>
    
    <div>
      <label class="block mb-1.5 text-[12px] font-semibold t-hi uppercase tracking-wider">Type of Improvement</label>
      <USelect v-model="itemType" :options="typeOptions" option-attribute="label" class="w-full" />
    </div>
    
    <div>
      <label class="block mb-1.5 text-[12px] font-semibold t-hi uppercase tracking-wider">Description <span class="text-red-500">*</span></label>
      <UTextarea v-model="description" placeholder="Describe what should change and where..." :rows="4" />
      <p v-if="characterCount(description) > FEEDBACK_DESCRIPTION_LIMIT" role="alert" class="mt-1 text-xs text-red-500">Feedback can contain up to 4,000 characters.</p>
    </div>
    
    <div>
      <label class="block mb-1.5 text-[12px] font-semibold t-hi uppercase tracking-wider">Reference URL <span class="t-lo normal-case tracking-normal">(Optional)</span></label>
      <UInput v-model="referenceUrl" placeholder="Paste link to image, article, etc." />
      
      <div v-if="isImagePreview && referenceUrl" class="mt-3 border b-line rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 h-32 flex items-center justify-center p-2">
        <img :src="referenceUrl" alt="Preview" class="max-h-full max-w-full object-contain rounded" @error="hidePreview" />
      </div>
    </div>
    
    <div class="pt-2">
      <UButton
        label="Submit Improvement"
        block
        class="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold"
        :loading="submitting"
        :disabled="!description.trim() || characterCount(description) > FEEDBACK_DESCRIPTION_LIMIT || submitting"
        @click="onSubmit"
      />
    </div>
    </template>
  </div>
</template>
