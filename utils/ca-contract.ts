import contract from '../data/ca_contract.json'
import topics from '../data/topics_master.json'
const ids = new Set(topics.map(t => t.id))
export function validateCACard(card: Record<string, any>): string[] {
  const errors: string[] = []
  if (!card.id || card.type !== 'current_affair') errors.push('Missing canonical CA identity')
  if (!contract.categories.includes(card.category)) errors.push('Invalid category')
  if (!contract.sections.includes(card.exam_section)) errors.push('Invalid exam section')
  if (!contract.difficulties.includes(card.difficulty) || !contract.depths.includes(card.exam_depth)) errors.push('Invalid difficulty or depth')
  for (const field of ['source_topic_ids', 'keyword_topic_ids', 'curated_topic_ids']) if (field in card && (!Array.isArray(card[field]) || card[field].some((id: string) => !ids.has(id)))) errors.push(`Unregistered NOTE ID in ${field}`)
  if (!Array.isArray(card.related_topic_ids) || card.related_topic_ids.some((id: string) => !ids.has(id))) errors.push('Unregistered NOTE ID')
  if ('mcq' in card || !Array.isArray(card.mcqs) || card.mcqs.length < 1 || card.mcqs.length > contract.maxMcqs) errors.push('CA requires 1-2 MCQs')
  for (const q of card.mcqs || []) {
    if (!q.question || !q.explanation || !Array.isArray(q.options) || q.options.length !== 4 || new Set(q.options).size !== 4 || q.options.some((o: unknown) => typeof o !== 'string' || !o.trim()) || !Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3) errors.push('Invalid MCQ')
  }
  for (const field of ['headline', 'exam_fact', 'summary', 'source_url', 'canonical_source_url', 'source_name']) if (typeof card[field] !== 'string' || !card[field].trim()) errors.push(`Missing ${field}`)
  if (!/^https:\/\//.test(card.source_url || '')) errors.push('Missing HTTPS provenance')
  for (const field of ['event_date', 'published_at', 'date']) if (!card[field] || Number.isNaN(Date.parse(card[field]))) errors.push(`Invalid ${field}`)
  return errors
}
