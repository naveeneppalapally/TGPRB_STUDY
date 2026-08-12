import { defineEventHandler, getRouterParam, createError } from 'h3'
import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
  const noteId = getRouterParam(event, 'noteId')
  if (!noteId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing noteId parameter' })
  }

  // Map note_id to topic flashcard file
  const mapNoteToPath: Record<string, string> = {
    'NOTE-GEO-DRAINAGE': 'geography/drainage-system-of-india.json',
  }

  const relPath = mapNoteToPath[noteId] || 'geography/drainage-system-of-india.json'
  const fullPath = path.resolve(process.cwd(), 'content/data/flashcards', relPath)

  if (fs.existsSync(fullPath)) {
    const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
    return data
  }

  // Fallback default cards if file not found
  return {
    topic_id: noteId,
    cards: [
      {
        id: 'FC-1',
        front: 'Which peninsular river is known as Dakshin Ganga?',
        back: 'Godavari River (1,465 km long, originating in Trimbakeshwar, Nasik).',
        key_fact: 'Godavari = Dakshin Ganga.'
      },
      {
        id: 'FC-2',
        front: 'What is the easternmost tributary of Godavari?',
        back: 'Sabari River.',
        key_fact: 'Sabari is easternmost.'
      }
    ]
  }
})
