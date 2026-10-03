interface QuestionAttempt { selected: number; correct: boolean; at: string }
interface CardAttempts { score: number; total: number; lastAt: string; perQuestion: (QuestionAttempt | null | undefined)[] }
/** Reconcile each question separately so answering Q2 cannot erase Q1 on another device. */
export function mergeCAAttempts(a: CardAttempts, b: CardAttempts): CardAttempts {
  const total = Math.max(a.total, b.total)
  const perQuestion = Array.from({ length: total }, (_, index) => {
    const left = a.perQuestion[index], right = b.perQuestion[index]
    if (!left || !right) return left || right
    const comparison = Date.parse(left.at) - Date.parse(right.at)
    return comparison > 0 || comparison === 0 && JSON.stringify([left.correct, left.selected]) >= JSON.stringify([right.correct, right.selected]) ? left : right
  })
  return { total, perQuestion, score: perQuestion.filter(q => q?.correct).length, lastAt: Date.parse(a.lastAt) >= Date.parse(b.lastAt) ? a.lastAt : b.lastAt }
}
