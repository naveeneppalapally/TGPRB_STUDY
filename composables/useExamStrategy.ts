/**
 * Decision and calibration utilities for the TSLPRB +1, -0.20, 0 marking rule.
 *
 * These functions expose the mathematics and mock-test feedback. They do not
 * issue an automatic "guess" command: an expected value depends on a truthful,
 * calibrated probability and does not include time or OMR-transfer risk.
 */

export type EliminationCount = 0 | 1 | 2 | 3
export type MockAnswerStatus = 'correct' | 'incorrect' | 'skipped'
export type RiskProfile = 'overconfident' | 'risk_averse' | 'balanced' | 'insufficient_data'

export const TSLPRB_EXAM_RULES = {
  correctMark: 1,
  wrongPenalty: 0.2,
  optionCount: 4,
  breakEvenProbability: 1 / 6,
} as const

export interface CalibrationAttempt {
  confidence: number
  isCorrect: boolean
}

export interface MockAttempt {
  status: MockAnswerStatus
  /** Confidence entered before the answer key is revealed, in the closed interval [0, 1]. */
  confidence: number
  /**
   * How many options were definitely removed before deciding. It is optional
   * only for backwards-compatible mock records. Without it, strategy loss is
   * reported as unknown instead of being inferred from confidence.
   */
  eliminatedCount?: EliminationCount
}

export interface AttemptEV {
  eliminatedCount: EliminationCount
  remainingOptions: number
  structuralProbability: number
  probabilityUsed: number
  probabilitySource: 'elimination' | 'subjective_confidence'
  expectedValue: number
  breakEvenProbability: number
  isAboveBreakEven: boolean
}

export interface MockScoreSimulation {
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  skippedCount: number
  netScore: number
  brierScore: number | null
  averageAttemptConfidence: number | null
  attemptedAccuracy: number | null
  calibrationGap: number | null
  badGuessCount: number
  marksLostToBadGuesses: number
  skippedOpportunityCount: number
  marksLeftOnTable: number
  /** A modelled EV-aware counterfactual, not a known actual score. */
  optimalStrategyScore: number
  strategyImprovement: number
  riskProfile: RiskProfile
  strategyBalance: number | null
  missingEliminationCount: number
}

function assertConfidence(confidence: number): void {
  if (!Number.isFinite(confidence) || confidence < 0 || confidence > 1) {
    throw new RangeError('confidence must be a finite probability from 0 through 1')
  }
}

function assertEliminationCount(eliminatedCount: number): asserts eliminatedCount is EliminationCount {
  if (!Number.isInteger(eliminatedCount) || eliminatedCount < 0 || eliminatedCount >= TSLPRB_EXAM_RULES.optionCount) {
    throw new RangeError('eliminatedCount must be an integer from 0 through 3')
  }
}

function expectedValue(probabilityCorrect: number): number {
  return probabilityCorrect * TSLPRB_EXAM_RULES.correctMark
    - (1 - probabilityCorrect) * TSLPRB_EXAM_RULES.wrongPenalty
}

/**
 * Computes the expected mark of an attempt compared with skipping, which has
 * value 0. When confidence is omitted, the probability is random selection
 * among the remaining options after definite eliminations.
 */
export function calculateAttemptEV(
  eliminatedCount: EliminationCount,
  subjectiveConfidence?: number,
): AttemptEV {
  assertEliminationCount(eliminatedCount)
  if (subjectiveConfidence !== undefined) assertConfidence(subjectiveConfidence)

  const remainingOptions = TSLPRB_EXAM_RULES.optionCount - eliminatedCount
  const structuralProbability = 1 / remainingOptions
  const probabilityUsed = subjectiveConfidence ?? structuralProbability
  const value = expectedValue(probabilityUsed)

  return {
    eliminatedCount,
    remainingOptions,
    structuralProbability,
    probabilityUsed,
    probabilitySource: subjectiveConfidence === undefined ? 'elimination' : 'subjective_confidence',
    expectedValue: value,
    breakEvenProbability: TSLPRB_EXAM_RULES.breakEvenProbability,
    isAboveBreakEven: probabilityUsed > TSLPRB_EXAM_RULES.breakEvenProbability,
  }
}

/**
 * Mean squared confidence error. A return value of null means no answer
 * outcomes have been observed, so calibration is genuinely unknown.
 */
export function computeBrierScore(attempts: CalibrationAttempt[]): number | null {
  if (attempts.length === 0) return null

  const total = attempts.reduce((sum, attempt) => {
    assertConfidence(attempt.confidence)
    const outcome = attempt.isCorrect ? 1 : 0
    return sum + (attempt.confidence - outcome) ** 2
  }, 0)

  return total / attempts.length
}

function scoreStatus(status: MockAnswerStatus): number {
  if (status === 'correct') return TSLPRB_EXAM_RULES.correctMark
  if (status === 'incorrect') return -TSLPRB_EXAM_RULES.wrongPenalty
  return 0
}

function deriveRiskProfile(
  badGuessPenalty: number,
  skippedOpportunityValue: number,
): { riskProfile: RiskProfile, strategyBalance: number | null } {
  const totalOpportunity = badGuessPenalty + skippedOpportunityValue
  if (totalOpportunity === 0) {
    return { riskProfile: 'insufficient_data', strategyBalance: null }
  }

  const strategyBalance = (badGuessPenalty - skippedOpportunityValue) / totalOpportunity
  if (strategyBalance > 0.1) return { riskProfile: 'overconfident', strategyBalance }
  if (strategyBalance < -0.1) return { riskProfile: 'risk_averse', strategyBalance }
  return { riskProfile: 'balanced', strategyBalance }
}

/**
 * Summarises a completed mock under the official marking scheme.
 *
 * Marks lost to bad guesses are actual -0.20 penalties from incorrect attempts
 * with zero or one definite elimination. Marks left on the table are expected
 * values, not known counterfactual marks, for skipped two- or three-elimination
 * questions. The optimalStrategyScore is therefore a transparent modelled
 * score, not a claim of perfect hindsight.
 */
export function simulateMockScore(userAnswers: MockAttempt[]): MockScoreSimulation {
  let correctCount = 0
  let incorrectCount = 0
  let skippedCount = 0
  let netScore = 0
  let badGuessCount = 0
  let marksLostToBadGuesses = 0
  let skippedOpportunityCount = 0
  let marksLeftOnTable = 0
  let missingEliminationCount = 0
  const gradedAttempts: CalibrationAttempt[] = []

  for (const answer of userAnswers) {
    assertConfidence(answer.confidence)
    if (answer.eliminatedCount !== undefined) assertEliminationCount(answer.eliminatedCount)

    netScore += scoreStatus(answer.status)

    if (answer.status === 'correct') {
      correctCount += 1
      gradedAttempts.push({ confidence: answer.confidence, isCorrect: true })
    } else if (answer.status === 'incorrect') {
      incorrectCount += 1
      gradedAttempts.push({ confidence: answer.confidence, isCorrect: false })

      if (answer.eliminatedCount === undefined) {
        missingEliminationCount += 1
      } else if (answer.eliminatedCount <= 1) {
        badGuessCount += 1
        marksLostToBadGuesses += TSLPRB_EXAM_RULES.wrongPenalty
      }
    } else {
      skippedCount += 1

      if (answer.eliminatedCount === undefined) {
        missingEliminationCount += 1
      } else if (answer.eliminatedCount >= 2) {
        skippedOpportunityCount += 1
        marksLeftOnTable += calculateAttemptEV(answer.eliminatedCount).expectedValue
      }
    }
  }

  const averageAttemptConfidence = gradedAttempts.length === 0
    ? null
    : gradedAttempts.reduce((sum, attempt) => sum + attempt.confidence, 0) / gradedAttempts.length
  const attemptedAccuracy = gradedAttempts.length === 0 ? null : correctCount / gradedAttempts.length
  const calibrationGap = averageAttemptConfidence === null || attemptedAccuracy === null
    ? null
    : averageAttemptConfidence - attemptedAccuracy
  const risk = deriveRiskProfile(marksLostToBadGuesses, marksLeftOnTable)
  const strategyImprovement = marksLostToBadGuesses + marksLeftOnTable

  return {
    totalQuestions: userAnswers.length,
    correctCount,
    incorrectCount,
    skippedCount,
    netScore,
    brierScore: computeBrierScore(gradedAttempts),
    averageAttemptConfidence,
    attemptedAccuracy,
    calibrationGap,
    badGuessCount,
    marksLostToBadGuesses,
    skippedOpportunityCount,
    marksLeftOnTable,
    optimalStrategyScore: netScore + strategyImprovement,
    strategyImprovement,
    riskProfile: risk.riskProfile,
    strategyBalance: risk.strategyBalance,
    missingEliminationCount,
  }
}

/** A conventional composable entry point for Nuxt consumers. */
export function useExamStrategy() {
  return {
    rules: TSLPRB_EXAM_RULES,
    calculateAttemptEV,
    computeBrierScore,
    simulateMockScore,
  }
}
