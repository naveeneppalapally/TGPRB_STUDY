import { defineEventHandler } from 'h3'
import { CA_CARDS } from '~/server/utils/ca-cards'

/**
 * Dashboard current-affairs briefs.
 * Serves the homepage strip (TG focus first, then newest) plus counts,
 * so the client never loads the Nuxt Content query engine.
 */
export default defineEventHandler(() => {
  const all = CA_CARDS

  const sorted = [...all].sort(
    (a: any, b: any) => new Date(b.meta?.date ?? 0).getTime() - new Date(a.meta?.date ?? 0).getTime(),
  )
  const tg = sorted.filter((e: any) => e.meta?.is_telangana_focus)
  const other = sorted.filter((e: any) => !e.meta?.is_telangana_focus)

  // "Today" in IST, matching the student-facing review-day convention.
  const todayIST = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())

  const slim = (e: (typeof CA_CARDS)[number]) => ({
    id: e.id,
    meta: {
      headline: String(e.meta?.headline || ''),
      exam_fact: String(e.meta?.exam_fact || ''),
      category: String(e.meta?.category || ''),
      date: String(e.meta?.date || ''),
      event_date: String(e.meta?.event_date || ''),
      source_url: String(e.meta?.source_url || ''),
      source_type: String(e.meta?.source_type || ''),
      is_telangana_focus: e.meta?.is_telangana_focus === true,
    },
  })

  return {
    items: [...tg, ...other].slice(0, 6).map(slim),
    total: all.length,
    addedToday: all.filter((e: any) => (e.meta?.date ?? '') === todayIST).length,
  }
})