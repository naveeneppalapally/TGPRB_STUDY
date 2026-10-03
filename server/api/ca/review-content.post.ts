import { defineEventHandler, readBody, createError } from 'h3'
import { CA_CARDS } from '../../utils/ca-cards'
import { caReviewId } from '../../../utils/ca-review-id'

// Public source lookup repairs metadata omitted by older local review snapshots.
export default defineEventHandler(async event => {
  const body = await readBody(event)
  if (!Array.isArray(body?.ids) || body.ids.length > 100 || body.ids.some((id: unknown)=>typeof id !== 'string')) throw createError({statusCode:400,message:'At most 100 content IDs are required'})
  const requested = new Set<string>(body.ids)
  const cards = CA_CARDS.flatMap(source => (source.meta.mcqs || []).map((q: any,index: number)=>({
    id: caReviewId(source.id, index, source.meta.legacy_review_id),
    sourceCurrentAffairId: source.id,
    eventDate: source.meta.event_date || source.meta.date,
    validUntil: source.meta.valid_until,
    front: q.question,
    back: `${q.options[q.answer]} - ${q.explanation}`,
    exam_section: source.meta.exam_section,
    topic: 'Current Affairs', subtopic: source.meta.headline,
  }))).filter(card=>requested.has(card.id))
  return { cards }
})
