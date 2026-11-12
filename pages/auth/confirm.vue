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
        <div class="pt-2 space-y-2">
          <UButton
            to="/auth/login"
            color="primary"
            block
            size="sm"
          >
            Return to Sign In
          </UButton>
          <UButton
            to="/"
            variant="ghost"
            color="gray"
            block
            size="sm"
          >
            Continue as Guest
          </UButton>
        </div>
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
import { ref, onMounted, watch } from 'vue'
import type { EmailOtpType } from '@supabase/supabase-js'

useHead({ title: 'Confirming sign in - BeatBook' })

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const verifying = ref(true)
const error = ref<string | null>(null)

watch(user, () => {
  if (user.value) {
    verifying.value = false
    const next = (route.query.redirect as string) || '/'
    setTimeout(() => router.replace(next), 500)
  }
}, { immediate: true })

onMounted(async () => {
  const code = route.query.code as string | undefined
  const tokenHash = route.query.token_hash as string | undefined
  const otpType = (route.query.type as EmailOtpType) || 'email'

  if (code) {
    try {
      const { error: exchangeErr } = await supabase.auth.exchangeCodeForSession(code)
      if (exchangeErr) throw exchangeErr
    } catch (err: any) {
      verifying.value = false
      error.value = err?.message || 'Failed to exchange authentication code'
      return
    }
  } else if (tokenHash) {
    try {
      const { error: verifyErr } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: otpType,
      })
      if (verifyErr) throw verifyErr
    } catch (err: any) {
      verifying.value = false
      error.value = err?.message || 'Failed to verify authentication token'
      return
    }
  }

  // Fallback timeout in case auth state change takes too long
  setTimeout(() => {
    if (!user.value && verifying.value) {
      verifying.value = false
      error.value = 'The link may have expired or is already used. Please request a new one.'
    }
  }, 4000)
})
</script>
