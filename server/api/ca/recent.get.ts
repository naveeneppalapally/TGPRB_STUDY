import { defineEventHandler, getQuery } from 'h3'
import { queryCollection } from '#imports'

/**
 * Recent current-affairs entries for the WhatsNew slideover.
 * Default window: last 7 days, newest first.
 */
export default defineEventHandler(async (event) => {
  const days = Math.min(Math.max(Number(getQuery(event).days) || 7, 1), 90)
  const cutoff = new Date(Date.now() - days * 86400000).toISOString().split('T')[0]

  const all = await queryCollection(event, 'current_affair').select('id', 'meta').all()

  const items = all
    .filter((e: any) => (e.meta?.date ?? '') >= cutoff)
    .sort((a: any, b: any) => new Date(b.meta?.date).getTime() - new Date(a.meta?.date).getTime())

  return { items, total: items.length, days }
})