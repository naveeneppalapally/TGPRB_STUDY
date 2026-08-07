import { defineEventHandler } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // Get current user - returns null if not authenticated
  const { data: { user } } = await client.auth.getUser()
  if (!user) {
    throw createError({ statusCode: 401, message: 'Not authenticated' })
  }

  const now = new Date().toISOString()

  // Fetch all due cards for this user, ordered most overdue first
  const { data: cards, error } = await client
    .from('review_cards')
    .select('*')
    .eq('user_id', user.id)
    .lte('due', now)
    .order('due', { ascending: true })

  if (error) {
    throw createError({ statusCode: 500, message: error.message })
  }

  // Also fetch total upcoming (due in next 24h) for dashboard counter
  const next24h = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  const { count: dueSoon } = await client
    .from('review_cards')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .lte('due', next24h)

  return {
    cards: cards ?? [],
    total_due: cards?.length ?? 0,
    due_in_24h: dueSoon ?? 0,
  }
})
