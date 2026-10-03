import { defineEventHandler, createError } from 'h3'

// Review writes use idempotent user_review_logs RPCs with stable content IDs.
export default defineEventHandler(() => {
  throw createError({ statusCode: 410, message: 'Use the synchronized review event queue' })
})
