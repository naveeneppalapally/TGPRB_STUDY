<template>
  <div class="mx-auto max-w-md px-4 py-12 sm:py-16">
    <!-- Header -->
    <div class="text-center mb-8">
      <NuxtLink to="/" class="inline-flex items-center gap-2.5 mb-4">
        <span class="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-saffron-300 to-saffron-600 shadow-sm">
          <UIcon name="i-heroicons-bolt-solid" class="h-5 w-5 text-ink-950" />
        </span>
        <span class="font-display text-xl font-bold tracking-tight t-hi">
          Study<span class="accent">OS</span>
        </span>
      </NuxtLink>
      <h1 class="font-display text-2xl font-bold tracking-tight t-hi">
        {{ authMode === 'login' ? 'Welcome back' : authMode === 'signup' ? 'Create an account' : 'Sign in with Magic Link' }}
      </h1>
      <p class="mt-1.5 text-xs sm:text-sm t-mid">
        Sync your FSRS queue, comprehension gates, and study progress across devices.
      </p>
    </div>

    <!-- Auth Container -->
    <div class="rounded-2xl border b-line bg-elev p-6 sm:p-8 shadow-sm">
      <!-- Mode Tabs -->
      <div class="grid grid-cols-2 gap-1 rounded-lg border b-line bg-sub p-1 mb-6">
        <button
          type="button"
          class="rounded-md py-1.5 text-xs font-semibold transition-all"
          :class="method === 'magic_link' ? 'bg-elev t-hi shadow-sm' : 't-lo hover:t-mid'"
          @click="method = 'magic_link'; errorMsg = ''; successMsg = ''"
        >
          Magic Link / OTP
        </button>
        <button
          type="button"
          class="rounded-md py-1.5 text-xs font-semibold transition-all"
          :class="method === 'password' ? 'bg-elev t-hi shadow-sm' : 't-lo hover:t-mid'"
          @click="method = 'password'; errorMsg = ''; successMsg = ''"
        >
          Password
        </button>
      </div>

      <!-- Alerts -->
      <div v-if="errorMsg" class="mb-5 rounded-lg border border-red-500/30 bg-red-50 dark:bg-red-950/30 p-3.5 text-xs text-red-600 dark:text-red-400 flex items-start gap-2.5">
        <UIcon name="i-heroicons-exclamation-circle" class="h-4 w-4 shrink-0 mt-0.5" />
        <div class="space-y-1.5 flex-1">
          <p class="font-medium">{{ errorMsg }}</p>
          <div v-if="isNetworkError" class="rounded-md bg-red-100/60 dark:bg-red-900/30 p-2 text-[11px] text-red-700 dark:text-red-300">
            <p class="font-semibold mb-1">How to restore connection:</p>
            <p>1. Open your <a href="https://supabase.com/dashboard/project/fqasvhrzzheziuirnwtc" target="_blank" rel="noopener" class="underline font-bold text-red-800 dark:text-red-200">Supabase Project Dashboard</a></p>
            <p>2. Click <b>"Restore project"</b> to unpause the database</p>
            <p>3. Wait ~1 minute for DNS activation and retry</p>
          </div>
        </div>
      </div>

      <div v-if="successMsg" class="mb-5 rounded-lg border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/30 p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2">
        <UIcon name="i-heroicons-check-circle" class="h-4 w-4 shrink-0 mt-0.5" />
        <span>{{ successMsg }}</span>
      </div>

      <!-- METHOD 1: MAGIC LINK / OTP -->
      <div v-if="method === 'magic_link'">
        <!-- Step 1: Request OTP -->
        <form v-if="!otpSent" @submit.prevent="handleSendOtp" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold t-hi mb-1.5">Email address</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full rounded-lg border b-line bg-sub px-3.5 py-2 text-sm t-hi placeholder:t-lo focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 transition-colors"
            />
          </div>

          <UButton
            type="submit"
            color="primary"
            block
            size="md"
            :loading="loading"
            class="font-semibold shadow-sm mt-2"
          >
            Send Magic Link & OTP
          </UButton>
        </form>

        <!-- Step 2: Verify OTP code -->
        <form v-else @submit.prevent="handleVerifyOtp" class="space-y-4">
          <div>
            <label class="block text-xs font-semibold t-hi mb-1.5">Enter 6-digit code or check email link</label>
            <input
              v-model="otpCode"
              type="text"
              required
              placeholder="123456"
              maxlength="10"
              class="w-full text-center tracking-widest font-mono text-lg rounded-lg border b-line bg-sub px-3.5 py-2 t-hi focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 transition-colors"
            />
          </div>

          <div class="flex items-center justify-between text-xs t-lo">
            <span>Sent to: <b class="t-hi">{{ email }}</b></span>
            <button
              type="button"
              class="accent hover:underline font-semibold"
              @click="otpSent = false; otpCode = ''"
            >
              Change email
            </button>
          </div>

          <UButton
            type="submit"
            color="primary"
            block
            size="md"
            :loading="loading"
            class="font-semibold shadow-sm mt-2"
          >
            Verify and Sign In
          </UButton>

          <button
            type="button"
            class="w-full text-center text-xs t-lo hover:t-mid mt-2"
            @click="handleSendOtp"
          >
            Didn't receive code? Resend
          </button>
        </form>
      </div>

      <!-- METHOD 2: PASSWORD (LOGIN OR SIGNUP) -->
      <div v-else>
        <form @submit.prevent="handlePasswordAuth" class="space-y-4">
          <div v-if="authMode === 'signup'">
            <label class="block text-xs font-semibold t-hi mb-1.5">Your Name</label>
            <input
              v-model="fullName"
              type="text"
              required
              placeholder="e.g. Ramesh"
              class="w-full rounded-lg border b-line bg-sub px-3.5 py-2 text-sm t-hi placeholder:t-lo focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold t-hi mb-1.5">Email address</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full rounded-lg border b-line bg-sub px-3.5 py-2 text-sm t-hi placeholder:t-lo focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 transition-colors"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold t-hi mb-1.5">Password</label>
            <input
              v-model="password"
              type="password"
              required
              minlength="6"
              placeholder="••••••••"
              class="w-full rounded-lg border b-line bg-sub px-3.5 py-2 text-sm t-hi placeholder:t-lo focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500 transition-colors"
            />
          </div>

          <UButton
            type="submit"
            color="primary"
            block
            size="md"
            :loading="loading"
            class="font-semibold shadow-sm mt-2"
          >
            {{ authMode === 'login' ? 'Sign In with Password' : 'Create Account' }}
          </UButton>

          <!-- Toggle Login vs Signup -->
          <div class="text-center pt-2">
            <button
              type="button"
              class="text-xs t-lo hover:t-hi"
              @click="authMode = authMode === 'login' ? 'signup' : 'login'; errorMsg = ''; successMsg = ''"
            >
              <span v-if="authMode === 'login'">
                Don't have an account? <b class="accent">Sign Up</b>
              </span>
              <span v-else>
                Already have an account? <b class="accent">Sign In</b>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Security & Privacy note -->
    <p class="text-center text-[11px] t-lo mt-6 max-w-sm mx-auto">
      Each account has completely isolated progress, FSRS scheduling, and review history protected by Supabase Row Level Security.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

useHead({
  title: 'Sign In - TGPRB StudyOS',
})

const route = useRoute()
const router = useRouter()
const { signInWithPassword, signUpWithPassword, sendOtp, verifyOtp, loading, isLoggedIn } = useAuth()

// If already logged in, redirect
if (isLoggedIn.value) {
  const next = (route.query.redirect as string) || '/'
  router.replace(next)
}

const method = ref<'magic_link' | 'password'>('magic_link')
const authMode = ref<'login' | 'signup'>('login')

const email = ref('')
const password = ref('')
const fullName = ref('')
const otpCode = ref('')
const otpSent = ref(false)

const errorMsg = ref('')
const successMsg = ref('')
const isNetworkError = ref(false)

function formatAuthError(err: any): string {
  const msg = err?.message || ''
  if (/NetworkError|Failed to fetch|fetch resource|Network request failed/i.test(msg)) {
    isNetworkError.value = true
    return 'Unable to reach the authentication server. The backend Supabase database appears to be paused due to inactivity.'
  }
  isNetworkError.value = false
  return msg || 'Authentication failed. Please verify credentials.'
}

async function handleSendOtp() {
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await sendOtp(email.value)
    otpSent.value = true
    successMsg.value = `We sent a login code and magic link to ${email.value}. Check your inbox!`
  } catch (err: any) {
    errorMsg.value = formatAuthError(err)
  }
}

async function handleVerifyOtp() {
  errorMsg.value = ''
  successMsg.value = ''
  try {
    await verifyOtp(email.value, otpCode.value)
    successMsg.value = 'Signed in successfully! Redirecting...'
    const next = (route.query.redirect as string) || '/'
    setTimeout(() => router.replace(next), 600)
  } catch (err: any) {
    errorMsg.value = formatAuthError(err)
  }
}

async function handlePasswordAuth() {
  errorMsg.value = ''
  successMsg.value = ''
  try {
    if (authMode.value === 'login') {
      await signInWithPassword(email.value, password.value)
      successMsg.value = 'Signed in successfully! Redirecting...'
      const next = (route.query.redirect as string) || '/'
      setTimeout(() => router.replace(next), 600)
    } else {
      await signUpWithPassword(email.value, password.value, fullName.value)
      successMsg.value = 'Account created! If email confirmation is enabled, please check your inbox.'
      const next = (route.query.redirect as string) || '/'
      setTimeout(() => router.replace(next), 800)
    }
  } catch (err: any) {
    errorMsg.value = formatAuthError(err)
  }
}
</script>
