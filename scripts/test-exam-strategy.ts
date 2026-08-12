import assert from 'node:assert/strict'
import {
  calculateAttemptEV,
  computeBrierScore,
  simulateMockScore,
  type MockAttempt,
} from '../composables/useExamStrategy'

function approximatelyEqual(actual: number, expected: number, tolerance = 1e-12): void {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `Expected ${expected}, received ${actual}`,
  )
}

const expectedReturns = [0.1, 0.2, 0.4, 1]
for (const [eliminatedCount, expectedReturn] of expectedReturns.entries()) {
  const result = calculateAttemptEV(eliminatedCount as 0 | 1 | 2 | 3)
  approximatelyEqual(result.expectedValue, expectedReturn)
}

approximatelyEqual(calculateAttemptEV(1, 0.5).expectedValue, 0.4)
approximatelyEqual(calculateAttemptEV(0).breakEvenProbability, 1 / 6)
assert.equal(calculateAttemptEV(0).isAboveBreakEven, true)
assert.equal(computeBrierScore([]), null)
approximatelyEqual(computeBrierScore([
  { confidence: 0.9, isCorrect: true },
  { confidence: 0.3, isCorrect: false },
]) ?? Number.NaN, 0.05)

const mock: MockAttempt[] = [
  { status: 'correct', confidence: 0.9, eliminatedCount: 3 },
  { status: 'incorrect', confidence: 0.3, eliminatedCount: 0 },
  { status: 'incorrect', confidence: 0.8, eliminatedCount: 2 },
  { status: 'skipped', confidence: 0.7, eliminatedCount: 2 },
  { status: 'skipped', confidence: 0.9, eliminatedCount: 3 },
  { status: 'skipped', confidence: 0.2, eliminatedCount: 0 },
]

const simulation = simulateMockScore(mock)
assert.equal(simulation.correctCount, 1)
assert.equal(simulation.incorrectCount, 2)
assert.equal(simulation.skippedCount, 3)
approximatelyEqual(simulation.netScore, 0.6)
assert.equal(simulation.badGuessCount, 1)
approximatelyEqual(simulation.marksLostToBadGuesses, 0.2)
assert.equal(simulation.skippedOpportunityCount, 2)
approximatelyEqual(simulation.marksLeftOnTable, 1.4)
approximatelyEqual(simulation.strategyImprovement, 1.6)
approximatelyEqual(simulation.optimalStrategyScore, 2.2)
approximatelyEqual(simulation.brierScore ?? Number.NaN, (0.01 + 0.09 + 0.64) / 3)
assert.equal(simulation.riskProfile, 'risk_averse')
assert.equal(simulation.missingEliminationCount, 0)

const incompleteSimulation = simulateMockScore([
  { status: 'incorrect', confidence: 0.4 },
  { status: 'skipped', confidence: 0.5 },
])
assert.equal(incompleteSimulation.missingEliminationCount, 2)
assert.equal(incompleteSimulation.marksLostToBadGuesses, 0)
assert.equal(incompleteSimulation.marksLeftOnTable, 0)

console.log('Exam strategy tests passed.')
