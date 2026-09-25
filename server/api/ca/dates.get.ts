import { defineEventHandler } from 'h3'
import { queryCollection } from '#imports'

/**
 * Calendar of current-affairs coverage.
 * Returns every distinct entryDate (YYYY-MM-DD) that has at least one card,
 * with the total card count and TG-focus count per date, newest first.
 */

function entryDate(e: any): string {
  return e?.meta?.event_date || e?.meta?.date || e?.meta?.published_at || ''
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export default defineEventHandler(async (event) => {
  const all = await queryCollection(event, 'current_affair').select('id', 'meta').all()

  const byDate = new Map<string, { date: string, count: number, tgCount: number }>()

  for (const e of all as any[]) {
    const d = entryDate(e)
    if (!d || !DATE_RE.test(d) || Number.isNaN(new Date(d).getTime())) continue

    const bucket = byDate.get(d) ?? { date: d, count: 0, tgCount: 0 }
    bucket.count += 1
    if (e.meta?.is_telangana_focus === true) bucket.tgCount += 1
    byDate.set(d, bucket)
  }

  const dates = Array.from(byDate.values()).sort((a, b) => b.date.localeCompare(a.date))

  return { dates }
})