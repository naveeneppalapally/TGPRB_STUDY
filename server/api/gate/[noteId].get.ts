import { defineEventHandler, getRouterParam, createError } from 'h3'
import { gateFor } from '../../utils/learning-content'
export default defineEventHandler(event => {
  const gate = gateFor(getRouterParam(event, 'noteId') || '')
  if (!gate) throw createError({ statusCode: 404, statusMessage: 'Unknown comprehension gate' })
  return gate
})
