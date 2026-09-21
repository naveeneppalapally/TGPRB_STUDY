import { defineEventHandler } from 'h3'
import { queryCollection } from '#imports'

/**
 * Full current-affairs feed for /current-affairs.
 * Filtering and pagination stay client-side; only the data load is served,
 * keeping the Nuxt Content sqlite engine out of the browser bundle.
 */
export default defineEventHandler(async (event) => {
  const all = await queryCollection(event, 'current_affair').select('id', 'meta').all()

  const items = [...all].sort((a: any, b: any) => {
    const da = a.meta?.event_date || a.meta?.date || a.meta?.published_at || ''
    const db = b.meta?.event_date || b.meta?.date || b.meta?.published_at || ''
    return new Date(db).getTime() - new Date(da).getTime()
  })

  return { items, total: items.length }
})