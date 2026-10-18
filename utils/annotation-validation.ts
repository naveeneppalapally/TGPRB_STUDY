export const NOTE_BODY_LIMIT = 10_000
export const FEEDBACK_DESCRIPTION_LIMIT = 4_000
export const IMPROVEMENT_TYPES = ['replace_image', 'add_image', 'fix_fact', 'add_table', 'add_topic', 'other'] as const

// PostgreSQL length(text) counts Unicode characters, not UTF-16 code units.
export const characterCount = (text: string) => Array.from(text).length

export function validateNoteBody(body: string, deleted = false): void {
  if (typeof body !== 'string' || (!deleted && !body.trim())) throw new Error('Write a note before saving.')
  if (characterCount(body) > NOTE_BODY_LIMIT) throw new Error('Notes can contain up to 10,000 characters. Shorten this note before saving.')
}

export function validateFeedback(type: string, description: string): void {
  if (!IMPROVEMENT_TYPES.includes(type as typeof IMPROVEMENT_TYPES[number])) throw new Error('Choose a valid feedback type.')
  if (typeof description !== 'string' || !description.trim()) throw new Error('Describe the improvement before submitting.')
  if (characterCount(description) > FEEDBACK_DESCRIPTION_LIMIT) throw new Error('Feedback can contain up to 4,000 characters.')
}
