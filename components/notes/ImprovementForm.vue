<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SectionContext } from '@/types/annotations'
import { useImprovementQueue } from '@/composables/useImprovementQueue'
import { useToast } from '#imports'

const props = defineProps<{
  context: SectionContext
}>()

const { submitImprovement } = useImprovementQueue()
const toast = useToast()

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
  if (!description.value.trim()) return
  
  submitting.value = true
  try {
    submitImprovement(
      props.context,
      itemType.value as any,
      description.value,
      referenceUrl.value || undefined
    )
    
    toast.add({
      title: 'Feedback Submitted',
      description: 'Thanks! Our team will review this shortly.',
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
    </div>
    
    <div>
      <label class="block mb-1.5 text-[12px] font-semibold t-hi uppercase tracking-wider">Reference URL <span class="t-lo normal-case tracking-normal">(Optional)</span></label>
      <UInput v-model="referenceUrl" placeholder="Paste link to image, article, etc." />
      
      <div v-if="isImagePreview && referenceUrl" class="mt-3 border b-line rounded-lg overflow-hidden bg-black/5 dark:bg-white/5 h-32 flex items-center justify-center p-2">
        <img :src="referenceUrl" alt="Preview" class="max-h-full max-w-full object-contain rounded" @error="$event.target.style.display='none'" />
      </div>
    </div>
    
    <div class="pt-2">
      <UButton
        label="Submit Improvement"
        block
        class="bg-saffron-500 hover:bg-saffron-600 text-white font-semibold"
        :loading="submitting"
        :disabled="!description.trim() || submitting"
        @click="onSubmit"
      />
    </div>
  </div>
</template>
