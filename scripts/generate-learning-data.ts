import { readFileSync, writeFileSync } from 'node:fs'
import { globSync } from 'glob'
import topics from '../data/topics_master.json'
import master from '../data/pyq_enriched_master.json'

const chapterUids = new Set(globSync('content/data/study/**/*.ts').flatMap(file =>
  [...readFileSync(file, 'utf8').matchAll(/["']?uid["']?\s*:\s*["'](PYQ-[^"']+)["']/g)].map(m => m[1])))
const live = new Set(topics.flatMap(t => t.pyqUids || []))
const write = (path: string, value: unknown) => writeFileSync(path, JSON.stringify(value, null, 2) + '\n')
write('content/data/study/pyqs.json', master.filter(q => chapterUids.has(q.uid)))
write('data/live_pyqs.json', master.filter(q => live.has(q.uid)))
const canonicalTopics = [...new Set(master.map(q => q.topic_id))].map(id => {
  const questions = master.filter(q => q.topic_id === id)
  return { id, name: questions[0].topic_name, subjectId: questions[0].subject_id, count: questions.length, tier: questions.length >= 10 ? 1 : questions.length >= 3 ? 2 : 3 }
})
write('data/topic_stats.json', { canonical: canonicalTopics, delivered: topics.filter(t => t.noteSlug || t.studySlug).map(t => ({ id: t.id, pyqCount: new Set(t.pyqUids || []).size, canonicalTopicIds: [...new Set(master.filter(q => t.pyqUids?.includes(q.uid)).map(q => q.topic_id))] })) })
const metadata = [
  ['ARI', 'Arithmetic', 'arithmetic', 'i-heroicons-calculator'],
  ['REA', 'Reasoning', 'reasoning', 'i-heroicons-puzzle-piece'],
  ['TEL', 'Telangana State', 'telangana', 'i-heroicons-map-pin'],
  ['HIS', 'History of India', 'history', 'i-heroicons-clock'],
  ['GEO', 'Geography', 'geography', 'i-heroicons-map'],
  ['SCI', 'General Science', 'science', 'i-heroicons-beaker'],
  ['POL', 'Indian Polity', 'polity', 'i-heroicons-building-library'],
  ['ECO', 'Indian Economy', 'economy', 'i-heroicons-banknotes'],
  ['ENG', 'General English', 'english', 'i-heroicons-language'],
]
write('data/subject_stats.json', metadata.map(([id, name, slug, icon]) => {
  const pyqCount = master.filter(q => q.subject_id === id).length
  const noteCount = topics.filter(t => t.subjectSlug === slug && t.noteSlug).length
  return { id, name, slug, icon, pyqCount, noteCount, weight: `${(pyqCount / master.length * 100).toFixed(1)}%`, to: noteCount ? `/notes/${slug}` : undefined }
}).sort((a,b) => b.pyqCount - a.pyqCount))
console.log(`Generated canonical Study bundle (${chapterUids.size} UIDs), live PYQs (${live.size}) and subject statistics.`)
