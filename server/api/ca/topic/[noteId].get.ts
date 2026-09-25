import { createError, defineEventHandler, getRouterParam } from 'h3'
import { CA_CARDS } from '~/server/utils/ca-cards'
import topicsMaster from '~/data/topics_master.json'

interface TopicEntry {
  id: string
  subject: string
  title: string
  keywords?: string[]
  aliases?: string[]
}

const SECTION_TO_SUBJECT: Record<string, string> = {
  POL: 'Polity',
  GEO: 'Geography',
  TEL: 'Telangana',
  ECO: 'Economy',
  SCI: 'Science & Technology',
  HIS: 'History',
}

function getCardTime(item: any): number {
  const dateStr = item.meta?.published_at || item.published_at || item.meta?.event_date || item.event_date || item.meta?.date || item.date || ''
  const t = dateStr ? new Date(dateStr).getTime() : 0
  return Number.isNaN(t) ? 0 : t
}

function matchesSubject(item: any, subjectName: string): boolean {
  if (!subjectName) return false
  const sec = (item.meta?.exam_section || item.exam_section || '').toLowerCase()
  const cat = (item.meta?.category || item.category || '').toLowerCase()
  const subLower = subjectName.toLowerCase()

  if (subLower === 'polity') {
    return sec.includes('polity') || cat === 'judiciary' || cat === 'appointments'
  }
  if (subLower === 'geography') {
    return sec.includes('geography') || cat === 'environment' || cat === 'geography'
  }
  if (subLower === 'telangana') {
    return sec.includes('telangana') || cat.includes('telangana') || item.meta?.is_telangana_focus === true || item.is_telangana_focus === true
  }
  if (subLower === 'economy') {
    return sec.includes('economy') || cat === 'economy' || cat === 'schemes'
  }
  if (subLower.includes('science')) {
    return sec.includes('science') || cat === 'science' || cat === 'defence'
  }
  if (subLower === 'history') {
    return sec.includes('history') || cat === 'books' || cat === 'awards' || cat === 'culture'
  }
  return sec.includes(subLower)
}

export default defineEventHandler(async (event) => {
  const noteId = getRouterParam(event, 'noteId')
  if (!noteId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing noteId route param' })
  }

  const typedTopics = (topicsMaster || []) as TopicEntry[]
  const topicEntry = typedTopics.find(
    t => t.id === noteId || (Array.isArray(t.aliases) && t.aliases.includes(noteId)),
  )
  const parts = noteId.split('-')
  const topicSubject = topicEntry?.subject || (parts.length >= 2 ? SECTION_TO_SUBJECT[parts[1]] : '') || ''
  const validIds = topicEntry
    ? Array.from(new Set([topicEntry.id, ...(topicEntry.aliases || [])]))
    : [noteId]

  const allEntries = CA_CARDS as any[]
  const direct = allEntries.filter((entry: any) => {
    const ids: string[] = entry.meta?.related_topic_ids ?? entry.related_topic_ids ?? []
    return Array.isArray(ids) && ids.some((id: string) => validIds.includes(id))
  })

  let combined = [...direct]
  if (direct.length < 3 && topicSubject) {
    const directIds = new Set(direct.map((entry: any) => entry.id))
    const subjectItems = allEntries
      .filter((entry: any) => !directIds.has(entry.id) && matchesSubject(entry, topicSubject))
      .sort((a: any, b: any) => getCardTime(b) - getCardTime(a))

    const needed = Math.max(5, 10 - direct.length)
    combined = [...direct, ...subjectItems.slice(0, needed)]
  }

  return {
    note_id: noteId,
    subject: topicSubject,
    items: combined.sort((a: any, b: any) => getCardTime(b) - getCardTime(a)),
  }
})