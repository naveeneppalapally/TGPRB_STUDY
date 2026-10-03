import topics from '../data/topics_master.json'
/** Resolve aliases at boundaries; store and compare only canonical NOTE IDs. */
export function canonicalNoteId(value: string): string | null {
  return topics.find(topic => topic.id === value || topic.aliases.includes(value))?.id || null
}
