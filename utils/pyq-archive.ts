export interface PyqOccurrence { source_file: string; q_no?: number | string; source_page?: number }
export interface ArchivePyq {
  uid: string; subject_id: string; subject_name: string; topic_name: string
  question_text: string; options: string[]; correct_option_index: number
  explanation: string; occurrences: PyqOccurrence[]; has_image?: boolean
  difficulty?: string; question_type?: string
}
export interface PyqMedia { source_image: string; asset_url: string; alt_text: string }
export type PyqMediaMap = Record<string, PyqMedia>

export function structuralIssues(q: ArchivePyq): string[] {
  const issues: string[] = []
  if (!q.question_text?.trim()) issues.push('missing_question')
  if (q.options.length !== 4 || q.options.some(option => !option.trim()) || new Set(q.options).size !== q.options.length) issues.push('incomplete_options')
  if (!Number.isInteger(q.correct_option_index) || q.correct_option_index < 0 || q.correct_option_index >= q.options.length) issues.push('invalid_answer_index')
  return issues
}

export function publishedImage(media?: PyqMedia): string | null {
  if (!media) return null
  try {
    const url = new URL(media.asset_url)
    return url.protocol === 'https:' && url.hostname === 'res.cloudinary.com' && !url.username && !url.password ? url.href : null
  } catch { return null }
}

const text = (value: unknown) => typeof value === 'string' ? value.trim().toLowerCase() : ''
const positiveInteger = (value: unknown, fallback: number) => {
  const number = Number(value)
  return Number.isFinite(number) && number >= 1 ? Math.floor(number) : fallback
}
export function sourceExam(source: string): string {
  return /^si_/i.test(source) ? 'SI' : /^constable_/i.test(source) ? 'Constable' : ''
}
export function matchesOccurrence(o: PyqOccurrence, exam: string, year: string): boolean {
  return (!exam || exam === 'all' || sourceExam(o.source_file).toLowerCase() === exam) &&
    (!year || year === 'all' || o.source_file.match(/(?:19|20)\d{2}/)?.[0] === year)
}

export function buildPyqArchive(master: readonly ArchivePyq[], query: Record<string, unknown>, media: PyqMediaMap = {}) {
  const subject = text(query.subject), exam = text(query.exam), year = text(query.year), search = text(query.search)
  const page = positiveInteger(query.page, 1), limit = Math.min(100, positiveInteger(query.limit, 20))
  const filtered = master.filter(q => {
    if (subject && subject !== 'all' && !q.subject_name.toLowerCase().includes(subject) && !q.subject_id.toLowerCase().includes(subject)) return false
    if ((exam && exam !== 'all' || year && year !== 'all') && !q.occurrences.some(o => matchesOccurrence(o, exam, year))) return false
    return !search || [q.question_text, q.options.join(' '), q.topic_name].some(value => value.toLowerCase().includes(search))
  })
  const offset = (page - 1) * limit
  const items = filtered.slice(offset, offset + limit).map(q => {
    const occurrence = q.occurrences.find(o => matchesOccurrence(o, exam, year)) || q.occurrences[0]
    const source = occurrence?.source_file || ''
    const examLabel = sourceExam(source) || 'Constable / SI'
    const yearLabel = source.match(/(?:19|20)\d{2}/)?.[0] || ''
    const stage = /prelims/i.test(source) ? ' Prelims' : /mains|final/i.test(source) ? ' Mains' : ''
    const paperLabel = `${examLabel} ${yearLabel}${stage}${occurrence?.q_no ? ` · Q${occurrence.q_no}` : ''}`.trim()
    const image = publishedImage(media[q.uid])
    const issues = structuralIssues(q)
    if (q.has_image && !image) issues.push('missing_diagram')
    return {
      uid: q.uid, subject_id: q.subject_id, subject_name: q.subject_name, topic_name: q.topic_name,
      question_type: q.question_type, difficulty: q.difficulty || 'M',
      correct_option_index: q.correct_option_index, explanation: q.explanation,
      question_text: q.question_text, options: q.options,
      paper_label: paperLabel, exam: examLabel, year: yearLabel, occurrence,
      has_image: !!q.has_image, image_url: image, image_alt: media[q.uid]?.alt_text || '',
      practice_issues: issues, practice_available: issues.length === 0,
    }
  })
  return {
    total: filtered.length, page, limit, totalPages: Math.ceil(filtered.length / limit), pyqs: items,
    archiveTotal: master.length,
    subjects: [...new Map(master.map(q => [q.subject_id, q.subject_name])).entries()].map(([id, label]) => ({ id, label, count: master.filter(q => q.subject_id === id).length })),
  }
}
