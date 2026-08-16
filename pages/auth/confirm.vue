<template>
  <div class="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
    <div class="rounded-2xl border b-line bg-elev p-8 max-w-sm w-full shadow-sm">
      <div v-if="verifying" class="space-y-4">
        <UIcon name="i-heroicons-arrow-path" class="h-8 w-8 mx-auto accent animate-spin" />
        <h2 class="text-base font-semibold t-hi">Confirming your sign in...</h2>
        <p class="text-xs t-lo">Connecting to Supabase and setting up your study session.</p>
      </div>

      <div v-else-if="error" class="space-y-4">
        <UIcon name="i-heroicons-exclamation-circle" class="h-8 w-8 mx-auto text-red-500" />
        <h2 class="text-base font-semibold t-hi">Sign in failed</h2>
        <p class="text-xs text-red-500">{{ error }}</p>
        <UButton
          to="/auth/login"
          color="primary"
          block
          size="sm"
        >
          Return to Sign In
        </UButton>
      </div>

      <div v-else class="space-y-4">
        <UIcon name="i-heroicons-check-circle" class="h-8 w-8 mx-auto text-emerald-500" />
        <h2 class="text-base font-semibold t-hi">Welcome back!</h2>
        <p class="text-xs t-lo">Redirecting you to the dashboard...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSupabaseUser } from '#imports'

useHead({ title: 'Confirming sign in - StudyOS' })

const user = useSupabaseUser()
const router = useRouter()
const verifying = ref(true)
const error = ref<string | null>(null)

watch(user, () => {
  if (user.value) {
    verifying.value = false
    setTimeout(() => router.replace('/'), 500)
  }
}, { immediate: true })

onMounted(() => {
  // Give Supabase client 3 seconds to process URL hash/token
  setTimeout(() => {
    if (!user.value) {
      verifying.value = false
      error.value = 'The link may have expired or is already used. Please request a new one.'
    }
  }, 4000)
})
</script>
