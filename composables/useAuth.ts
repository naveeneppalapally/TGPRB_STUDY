import { computed, ref } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'

export function useAuth() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const loading = ref(false)
  const authError = ref<string | null>(null)

  const isLoggedIn = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email ?? null)
  const userId = computed(() => user.value?.id ?? null)

  const displayName = computed(() => {
    if (!user.value) return 'Guest'
    const email = user.value.email || ''
    return user.value.user_metadata?.full_name || email.split('@')[0] || 'Learner'
  })

  /**
   * Sign in with Email and Password
   */
  async function signInWithPassword(email: string, password: string) {
    loading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) throw error
      return data
    } catch (err: any) {
      authError.value = err.message || 'Failed to sign in'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Sign up with Email and Password
   */
  async function signUpWithPassword(email: string, password: string, fullName?: string) {
    loading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName?.trim() || email.split('@')[0],
          },
        },
      })
      if (error) throw error
      return data
    } catch (err: any) {
      authError.value = err.message || 'Failed to sign up'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Send Magic Link / OTP to Email
   */
  async function sendOtp(email: string) {
    loading.value = true
    authError.value = null
    try {
      const redirectTo = typeof window !== 'undefined'
        ? `${window.location.origin}/auth/confirm`
        : undefined

      const { data, error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: redirectTo,
        },
      })
      if (error) throw error
      return data
    } catch (err: any) {
      authError.value = err.message || 'Failed to send login link'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Verify OTP token
   */
  async function verifyOtp(email: string, token: string) {
    loading.value = true
    authError.value = null
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email.trim(),
        token: token.trim(),
        type: 'email',
      })
      if (error) throw error
      return data
    } catch (err: any) {
      authError.value = err.message || 'Invalid or expired code'
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Sign out current user
   */
  async function signOut() {
    loading.value = true
    authError.value = null
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (err: any) {
      authError.value = err.message || 'Failed to sign out'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    isLoggedIn,
    userEmail,
    userId,
    displayName,
    loading,
    authError,
    signInWithPassword,
    signUpWithPassword,
    sendOtp,
    verifyOtp,
    signOut,
  }
}
