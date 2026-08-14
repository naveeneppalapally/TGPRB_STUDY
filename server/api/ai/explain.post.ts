import { createError, defineEventHandler } from 'h3'

export default defineEventHandler(() => {
  throw createError({
    statusCode: 404,
    statusMessage: 'AI assistant features have been disabled.',
  })
})
