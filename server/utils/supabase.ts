// =============================================================================
// Supabase Server Client
// Creates an authenticated Supabase client for server-side API routes.
// =============================================================================

import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

/**
 * Creates a Supabase client for server-side use.
 * Reads credentials from runtime config (set via env vars).
 */
export function useSupabaseServer(event: H3Event) {
  const config = useRuntimeConfig(event)

  return createClient(
    config.supabaseUrl,
    config.supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

/**
 * Creates a Supabase client scoped to the requesting user.
 * Passes the user's JWT from the Authorization header so RLS applies.
 */
export function useSupabaseUser(event: H3Event) {
  const config = useRuntimeConfig(event)
  const authHeader = getHeader(event, 'authorization')

  const client = createClient(
    config.supabaseUrl,
    config.public.supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: authHeader ? { Authorization: authHeader } : {},
      },
    }
  )

  return client
}
