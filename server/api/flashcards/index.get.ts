import { defineEventHandler } from 'h3'
import { allReviewContent } from '../../utils/learning-content'
export default defineEventHandler(() => ({ cards: allReviewContent() }))
