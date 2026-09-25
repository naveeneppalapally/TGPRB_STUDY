import { defineEventHandler, getQuery } from 'h3'
import { queryCollection } from '#imports'

/**
 * Full-featured current-affairs feed for /current-affairs.
 * Server-side filtering, faceting, sorting, and pagination so the client
 * never loads the Nuxt Content query engine.
 *
 * Query params (all optional):
 *   q          case-insensitive substring across headline / exam_fact / summary
 *   category   exact match on meta.category (lowercased)
 *   section    exact case-insensitive match on meta.exam_section
 *   difficulty one of F | M | O
 *   depth      exact case-insensitive match on meta.exam_depth
 *   window     ALL | 1D | 7D | 1M | 6M | 1Y (entryDate >= cutoff)
 *   date       exact YYYY-MM-DD match on entryDate (takes precedence over window)
 *   tg         '1' keeps only is_telangana_focus === true
 *   sort       newest (default) | oldest | tg | hardest
 *   page       default 1
 *   limit      default 30, clamped 1-100
 *
 * Facets are context-aware: every count reflects all active filters EXCEPT its
 * own group. Selecting timeframe=Today turns the category numbers into Today's
 * numbers (Schemes 2), and while Schemes is selected the other categories still
 * show their own Today counts instead of 0. Keys always come from the full set,
 * so a row reads 0 rather than disappearing.
 */

function entryDate(e: any): string {
  // event_date is the real date the news happened (what the card displays).
  // Fall back to date / published_at only if event_date is missing.
  return e?.meta?.event_date || e?.meta?.date || e?.meta?.published_at || ''
}

function entryTime(e: any): number {
  const t = new Date(entryDate(e)).getTime()
  return Number.isNaN(t) ? 0 : t
}

function istStartOfToday(now: Date): Date {
  // "Today" = this calendar day in IST (UTC+5:30)
  const istOffset = 5.5 * 60 * 60 * 1000
  const istNow = new Date(now.getTime() + istOffset)
  const startOfDayIST = new Date(Date.UTC(
    istNow.getUTCFullYear(),
    istNow.getUTCMonth(),
    istNow.getUTCDate(),
  ) - istOffset)
  return startOfDayIST
}

function windowCutoff(window: string, now: Date): Date | null {
  switch (window) {
    case '1D':
      return istStartOfToday(now)
    case '7D':
      return new Date(now.getTime() - 7 * 86400000)
    case '1M':
      return new Date(now.getTime() - 30 * 86400000)
    case '6M':
      return new Date(now.getTime() - 180 * 86400000)
    case '1Y':
      return new Date(now.getTime() - 365 * 86400000)
    default:
      return null // ALL or unrecognized
  }
}

const DIFFICULTY_RANK: Record<string, number> = { O: 0, M: 1, F: 2 }

/**
 * A facet group whose counts ignore their own selection. Pass it to matches()
 * so, for example, category counts respond to the timeframe filter but not to
 * which category is currently selected.
 */
type FacetGroup = 'category' | 'section' | 'difficulty' | 'depth'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const q = String(query.q ?? '').trim().toLowerCase()
  const category = String(query.category ?? '').trim().toLowerCase()
  const section = String(query.section ?? '').trim().toLowerCase()
  const difficultyRaw = String(query.difficulty ?? '').trim().toUpperCase()
  const difficulty = ['F', 'M', 'O'].includes(difficultyRaw) ? difficultyRaw : ''
  const depth = String(query.depth ?? '').trim().toLowerCase()
  const windowRaw = String(query.window ?? 'ALL').trim().toUpperCase()
  const date = String(query.date ?? '').trim()
  const tgOnly = String(query.tg ?? '') === '1'
  const sort = String(query.sort ?? 'newest').trim().toLowerCase()
  const page = Math.max(Math.floor(Number(query.page) || 1), 1)
  const limit = Math.min(Math.max(Math.floor(Number(query.limit) || 30), 1), 100)

  const all = await queryCollection(event, 'current_affair').select('id', 'meta').all()

  const now = new Date()
  const todayStart = istStartOfToday(now).getTime()
  const weekCutoff = now.getTime() - 7 * 86400000
  const hotZoneCutoff = now.getTime() - 180 * 86400000

  // Stats describe the whole archive, not the current filter.
  const stats = { total: all.length, today: 0, week: 0, hotZone: 0, tg: 0 }

  // Facet key universe also comes from the full set, so a row shows 0 instead
  // of disappearing when the active filter matches none of its entries.
  const allCategories = new Set<string>()
  const allSections = new Set<string>()
  const allDepths = new Set<string>()

  for (const e of all as any[]) {
    const meta = e.meta ?? {}
    const t = entryTime(e)
    if (t >= todayStart) stats.today += 1
    if (t >= weekCutoff) stats.week += 1
    if (t >= hotZoneCutoff) stats.hotZone += 1
    if (meta.is_telangana_focus === true) stats.tg += 1

    const cat = String(meta.category ?? '').trim().toLowerCase()
    if (cat) allCategories.add(cat)
    const sec = String(meta.exam_section ?? '').trim()
    if (sec) allSections.add(sec)
    const dep = String(meta.exam_depth ?? '').trim().toLowerCase()
    if (dep) allDepths.add(dep)
  }

  const cutoff = date ? null : windowCutoff(windowRaw, now)

  /**
   * Context-aware match.
   *
   * Omitting `skipGroup` gives the real result set. Passing one facet group
   * makes every OTHER filter still apply while that group's own selection is
   * ignored, which is how each count stays useful: with Today selected the
   * category numbers become Today's numbers, and with Schemes selected the
   * other categories still show their own Today numbers instead of 0.
   */
  function matches(e: any, skipGroup?: FacetGroup): boolean {
    const meta = e.meta ?? {}
    if (q) {
      const haystack = `${meta.headline ?? ''} ${meta.exam_fact ?? ''} ${meta.summary ?? ''}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    if (skipGroup !== 'category' && category && String(meta.category ?? '').toLowerCase() !== category) return false
    if (skipGroup !== 'section' && section && String(meta.exam_section ?? '').toLowerCase() !== section) return false
    if (skipGroup !== 'difficulty' && difficulty && String(meta.difficulty ?? '').toUpperCase() !== difficulty) return false
    if (skipGroup !== 'depth' && depth && String(meta.exam_depth ?? '').toLowerCase() !== depth) return false
    if (tgOnly && meta.is_telangana_focus !== true) return false
    if (date) {
      if (entryDate(e) !== date) return false
    } else if (cutoff) {
      if (entryTime(e) < cutoff.getTime()) return false
    }
    return true
  }

  function facetCounts(group: FacetGroup): Record<string, number> {
    const out: Record<string, number> = {}
    if (group === 'difficulty') {
      out.F = 0
      out.M = 0
      out.O = 0
    } else if (group === 'category') {
      for (const key of allCategories) out[key] = 0
    } else if (group === 'section') {
      for (const key of allSections) out[key] = 0
    } else {
      for (const key of allDepths) out[key] = 0
    }

    for (const e of all as any[]) {
      if (!matches(e, group)) continue
      const meta = e.meta ?? {}
      if (group === 'difficulty') {
        const diff = String(meta.difficulty ?? '').trim().toUpperCase()
        if (diff === 'F' || diff === 'M' || diff === 'O') out[diff] += 1
        continue
      }
      const key = group === 'category'
        ? String(meta.category ?? '').trim().toLowerCase()
        : group === 'section'
          ? String(meta.exam_section ?? '').trim()
          : String(meta.exam_depth ?? '').trim().toLowerCase()
      if (key) out[key] = (out[key] ?? 0) + 1
    }
    return out
  }

  const categories = facetCounts('category')
  const sections = facetCounts('section')
  const difficulties = facetCounts('difficulty')
  const depths = facetCounts('depth')

  // Result set: the full filter, no group skipped.
  const filtered = (all as any[]).filter(e => matches(e))

  // Sorting
  const byNewest = (a: any, b: any) => entryTime(b) - entryTime(a)
  if (sort === 'oldest') {
    filtered.sort((a, b) => entryTime(a) - entryTime(b))
  } else if (sort === 'tg') {
    filtered.sort((a, b) => {
      const ta = a.meta?.is_telangana_focus === true ? 0 : 1
      const tb = b.meta?.is_telangana_focus === true ? 0 : 1
      return ta - tb || byNewest(a, b)
    })
  } else if (sort === 'hardest') {
    filtered.sort((a, b) => {
      const da = DIFFICULTY_RANK[String(a.meta?.difficulty ?? '').toUpperCase()] ?? 3
      const db = DIFFICULTY_RANK[String(b.meta?.difficulty ?? '').toUpperCase()] ?? 3
      return da - db || byNewest(a, b)
    })
  } else {
    filtered.sort(byNewest)
  }

  // Pagination AFTER filtering and sorting
  const total = filtered.length
  const totalPages = Math.max(Math.ceil(total / limit), 1)
  const items = filtered.slice((page - 1) * limit, page * limit)

  return {
    items,
    total,
    page,
    totalPages,
    stats,
    facets: { categories, sections, difficulties, depths },
  }
})
