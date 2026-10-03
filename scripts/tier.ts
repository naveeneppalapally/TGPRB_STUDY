import master from '../data/pyq_enriched_master.json'

// Tier evidence is exclusively canonical verified PYQs, never OCR seed labels.
const topics = new Map<string, { topic: string; subject: string; count: number }>()
for (const q of master) {
  const row = topics.get(q.topic_id) || { topic: q.topic_name, subject: q.subject_name, count: 0 }
  row.count++
  topics.set(q.topic_id, row)
}
console.table([...topics].map(([id, row]) => ({ id, ...row, tier: row.count >= 10 ? 1 : row.count >= 3 ? 2 : 3 })))
