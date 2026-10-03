/** Companion cards retain the original question's complete review identity. */
export function caReviewId(cardId: string, index: number, legacyReviewId?: string): string {
  return index === 0 && legacyReviewId ? legacyReviewId : `ca-mcq-${cardId}-q${index}`
}
