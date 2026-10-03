import canonical from '../data/live_pyqs.json'
const byUid = new Map(canonical.map(q => [q.uid,q]))
export function canonicalNotePyqs<T extends { uid: string; question: string; options: string[]; correct: number; teaching_explanation?: string }>(items: T[]): Array<T & { explanation: string; teaching_explanation?: string }> {
  return items.map(item => {
    const q = byUid.get(item.uid)
    if (!q) throw new Error(`Unresolved official note PYQ: ${item.uid}`)
    return { ...item, question: q.question_text, options: q.options, correct: q.correct_option_index,
      explanation: q.explanation }
  })
}
