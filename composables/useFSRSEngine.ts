import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  type Card,
} from 'ts-fsrs'

/**
 * TSLPRB FSRS and negative-marking domain service.
 *
 * This composable deliberately schedules only persisted reviewable objects:
 * real PYQs and atomic flashcards. A note's gate questions and raw current
 * affairs articles are not cards. A current-affairs item must first become an
 * atomic flashcard, and a gate-backed item must already be unlocked.
 */

export type StudyCardType = 'static' | 'current_affair'
export type ReviewableContentType = 'pyq' | 'atomic_flashcard'
export type FSRSGrade = Rating.Again | Rating.Hard | Rating.Good | Rating.Easy
export type AttemptRecommendation = 'attempt' | 'skip'

export const TSLPRB_MARKING = {
  correct: 1,
  wrong: 0.2,
  optionCount: 4,
  attemptThreshold: 1 / 6,
} as const

/**
 * These are policy defaults, not universal memory parameters. The values are
 * deliberately modest: static material starts at the FSRS default and recent,
 * high-value current-affairs facts receive a slightly higher target.
 */
export const TSLPRB_TARGET_RETENTION = {
  static: 0.9,
  current_affair: 0.92,
} as const

export interface StudyCard {
  /** Stable local or database card identifier. */
  id: string
  /** The ID of the real PYQ or atomic flashcard being scheduled. */
  contentId: string
  contentType: ReviewableContentType
  studyType: StudyCardType
  /** A gate-backed card is created only after its parent gate is passed. */
  unlocked: boolean
  /** Number of verified PYQs for the originating topic. */
  verifiedPyqCount: number
  /** The scheduler state that is persisted in review_cards. */
  fsrs: Card
  /** Persist this value alongside the card so reviews remain reproducible. */
  targetRetention: number
  /** Required for current-affairs cards. It identifies the source article. */
  sourceCurrentAffairId?: string
  /** Date of the event, rather than the scrape date. */
  eventDate?: string
  /** Optional hard expiry, for withdrawn or superseded facts. */
  validUntil?: string
}

export interface CreateCardInput {
  id: string
  contentId: string
  contentType: ReviewableContentType
  unlocked: boolean
  verifiedPyqCount: number
  sourceCurrentAffairId?: string
  eventDate?: string
  validUntil?: string
  targetRetention?: number
  now?: Date
}

export interface FSRSEngineOptions {
  targets?: Partial<Record<StudyCardType, number>>
  /** False makes previews and tests deterministic. Persisted schedules stay valid either way. */
  enableFuzz?: boolean
}

export interface CalibrationEvent {
  /** Confidence declared before answer feedback, on [0, 1]. */
  confidence: number
  correct: boolean
  /** Optional source lets the caller filter a mock, PYQ, or practice set. */
  source?: 'mock' | 'pyq' | 'practice'
  answeredAt?: string
}

export interface CalibrationBucket {
  lowerBound: number
  upperBound: number
  count: number
  meanConfidence: number
  accuracy: number
}

export interface CalibrationSummary {
  sampleSize: number
  brierScore: number | null
  expectedCalibrationError: number | null
  overconfidenceIndex: number | null
  buckets: CalibrationBucket[]
}

export interface AttemptInput {
  /** A chosen answer must exist before any attempt recommendation is possible. */
  hasSelectedOption: boolean
  /** Number of options eliminated as definitely wrong, from 0 through N - 1. */
  eliminatedOptions: number
  /** Probability of being correct before feedback. Omit only for truly certain elimination. */
  subjectiveConfidence?: number
  /**
   * Set only when every eliminated choice is known to be impossible. In this
   * narrow mathematical case, 1 / remainingOptions is an objective probability.
   */
  definitiveElimination?: boolean
  /** A recalled fact or solved method supports an answer even if no option was eliminated. */
  hasEvidenceBeyondRandom?: boolean
  calibrationEvents?: CalibrationEvent[]
  /** Extra probability above break-even required by the product policy. */
  safetyMargin?: number
}

export interface AttemptEvaluation {
  recommendation: AttemptRecommendation
  breakEvenProbability: number
  structuralProbability: number
  declaredProbability: number
  calibratedProbability: number
  conservativeProbability: number
  expectedValueAtDeclaredProbability: number
  expectedValueAtConservativeProbability: number
  rationale: string
}

const MIN_TARGET_RETENTION = 0.8
const MAX_TARGET_RETENTION = 0.97
const CALIBRATION_BINS = 10
const ONE_SIDED_90_PERCENT_Z = 1.645
const SHRINKAGE_PRIOR_WEIGHT = 20

function clamp(value: number, minimum = 0, maximum = 1): number {
  return Math.min(maximum, Math.max(minimum, value))
}

function requireFinite(value: number, label: string): void {
  if (!Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number`)
  }
}

function asDate(value: string | undefined): Date | undefined {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date
}

function daysBetween(earlier: Date, later: Date): number {
  return Math.max(0, (later.getTime() - earlier.getTime()) / 86_400_000)
}

/** The expected score of one attempted MCQ. Skipping is always 0. */
export function expectedValueOfAttempt(probabilityCorrect: number, wrongPenalty = TSLPRB_MARKING.wrong): number {
  requireFinite(probabilityCorrect, 'probabilityCorrect')
  requireFinite(wrongPenalty, 'wrongPenalty')
  if (wrongPenalty < 0) throw new Error('wrongPenalty must be non-negative')

  const p = clamp(probabilityCorrect)
  return p - (1 - p) * wrongPenalty
}

/** p > q / (1 + q) is the strict break-even rule for a +1, -q item. */
export function breakEvenProbability(wrongPenalty = TSLPRB_MARKING.wrong): number {
  requireFinite(wrongPenalty, 'wrongPenalty')
  if (wrongPenalty < 0) throw new Error('wrongPenalty must be non-negative')
  return wrongPenalty / (1 + wrongPenalty)
}

/** Wilson's one-sided lower confidence bound prevents a small lucky sample from driving attempts. */
export function wilsonLowerBound(successes: number, trials: number, z = ONE_SIDED_90_PERCENT_Z): number {
  if (trials <= 0) return 0
  const n = Math.max(1, trials)
  const proportion = clamp(successes / n)
  const zSquared = z ** 2
  const denominator = 1 + zSquared / n
  const centre = proportion + zSquared / (2 * n)
  const spread = z * Math.sqrt((proportion * (1 - proportion) + zSquared / (4 * n)) / n)
  return clamp((centre - spread) / denominator)
}

function bucketIndex(confidence: number, bins: number): number {
  return Math.min(bins - 1, Math.floor(clamp(confidence) * bins))
}

/**
 * Brier score is mean squared probability error. ECE measures the weighted
 * absolute confidence-accuracy gap; OCI preserves the sign of overconfidence.
 */
export function calculateCalibration(events: CalibrationEvent[], bins = CALIBRATION_BINS): CalibrationSummary {
  if (!Number.isInteger(bins) || bins < 2) {
    throw new Error('bins must be an integer of at least 2')
  }

  if (events.length === 0) {
    return { sampleSize: 0, brierScore: null, expectedCalibrationError: null, overconfidenceIndex: null, buckets: [] }
  }

  const grouped = Array.from({ length: bins }, () => [] as CalibrationEvent[])
  let brierTotal = 0

  for (const event of events) {
    const confidence = clamp(event.confidence)
    const outcome = event.correct ? 1 : 0
    brierTotal += (confidence - outcome) ** 2
    grouped[bucketIndex(confidence, bins)].push({ ...event, confidence })
  }

  let expectedCalibrationError = 0
  let overconfidenceIndex = 0
  const buckets: CalibrationBucket[] = []

  grouped.forEach((group, index) => {
    if (group.length === 0) return
    const meanConfidence = group.reduce((sum, item) => sum + item.confidence, 0) / group.length
    const accuracy = group.filter((item) => item.correct).length / group.length
    const signedGap = meanConfidence - accuracy
    const share = group.length / events.length
    expectedCalibrationError += share * Math.abs(signedGap)
    overconfidenceIndex += share * signedGap
    buckets.push({
      lowerBound: index / bins,
      upperBound: (index + 1) / bins,
      count: group.length,
      meanConfidence,
      accuracy,
    })
  })

  return {
    sampleSize: events.length,
    brierScore: brierTotal / events.length,
    expectedCalibrationError,
    overconfidenceIndex,
    buckets,
  }
}

function calibratedConfidence(declaredProbability: number, events: CalibrationEvent[]): {
  calibrated: number
  lowerBound: number
  matchingSampleSize: number
} {
  const declared = clamp(declaredProbability)
  const bucket = bucketIndex(declared, CALIBRATION_BINS)
  const matching = events.filter((event) => bucketIndex(event.confidence, CALIBRATION_BINS) === bucket)

  if (matching.length === 0) {
    return { calibrated: declared, lowerBound: wilsonLowerBound(2 * declared, 2), matchingSampleSize: 0 }
  }

  const successes = matching.filter((event) => event.correct).length
  const observedAccuracy = successes / matching.length
  const sampleWeight = matching.length / (matching.length + SHRINKAGE_PRIOR_WEIGHT)
  const calibrated = clamp(sampleWeight * observedAccuracy + (1 - sampleWeight) * declared)

  // A two-observation prior centred on declared confidence stabilises sparse bins.
  const lowerBound = wilsonLowerBound(successes + 2 * declared, matching.length + 2)
  return { calibrated, lowerBound, matchingSampleSize: matching.length }
}

/**
 * Returns the economic calculation and a conservative product recommendation.
 * A positive pure-random EV is shown but never becomes an automatic guessing
 * prompt: the caller must provide a selected answer and actual evidence.
 */
export function evaluateAttempt(input: AttemptInput): AttemptEvaluation {
  const optionCount = TSLPRB_MARKING.optionCount
  if (!Number.isInteger(input.eliminatedOptions) || input.eliminatedOptions < 0 || input.eliminatedOptions >= optionCount) {
    throw new Error(`eliminatedOptions must be an integer from 0 through ${optionCount - 1}`)
  }

  const structuralProbability = 1 / (optionCount - input.eliminatedOptions)
  const declaredProbability = clamp(input.subjectiveConfidence ?? structuralProbability)
  const calibration = calibratedConfidence(declaredProbability, input.calibrationEvents ?? [])
  const conservativeProbability = input.definitiveElimination
    ? structuralProbability
    : calibration.lowerBound
  const threshold = breakEvenProbability()
  const margin = clamp(input.safetyMargin ?? 0.02, 0, 0.2)
  const hasSupport = input.eliminatedOptions > 0 || Boolean(input.hasEvidenceBeyondRandom)
  const economicallyPositive = conservativeProbability > threshold + margin

  let recommendation: AttemptRecommendation = economicallyPositive && input.hasSelectedOption && hasSupport
    ? 'attempt'
    : 'skip'
  let rationale: string

  if (!input.hasSelectedOption) {
    recommendation = 'skip'
    rationale = 'Skip: no answer has been selected.'
  } else if (!hasSupport) {
    recommendation = 'skip'
    rationale = 'Skip: the calculation is displayed, but the product does not recommend a pure random guess without recalled or solved evidence.'
  } else if (recommendation === 'attempt') {
    rationale = input.definitiveElimination
      ? 'Attempt: definitive elimination leaves a probability above the TSLPRB break-even threshold plus safety margin.'
      : `Attempt: the conservative calibrated probability is above ${(threshold + margin).toFixed(3)}.`
  } else {
    rationale = `Skip: the conservative calibrated probability is not above ${(threshold + margin).toFixed(3)}.`
  }

  return {
    recommendation,
    breakEvenProbability: threshold,
    structuralProbability,
    declaredProbability,
    calibratedProbability: calibration.calibrated,
    conservativeProbability,
    expectedValueAtDeclaredProbability: expectedValueOfAttempt(declaredProbability),
    expectedValueAtConservativeProbability: expectedValueOfAttempt(conservativeProbability),
    rationale,
  }
}

/**
 * PYQ evidence places 85%, 10%, and 5% of current-affairs questions in the
 * 0-6, 7-12, and 13-24 month bands. This is a relevance weight, not a change
 * to the learner's FSRS memory stability.
 */
export function currentAffairRelevance(eventDate: string | undefined, examDate: Date | undefined): number {
  const event = asDate(eventDate)
  if (!event || !examDate) return 1
  const ageAtExam = daysBetween(event, examDate)
  if (ageAtExam <= 183) return 0.85
  if (ageAtExam <= 365) return 0.1
  if (ageAtExam <= 730) return 0.05
  return 0
}

function isDue(card: StudyCard, now: Date): boolean {
  return card.fsrs.due.getTime() <= now.getTime()
}

function isValid(card: StudyCard, now: Date, examDate?: Date): boolean {
  const validUntil = asDate(card.validUntil)
  if (validUntil && validUntil.getTime() < now.getTime()) return false
  return card.studyType !== 'current_affair' || currentAffairRelevance(card.eventDate, examDate) > 0
}

function priorityScore(card: StudyCard, now: Date, examDate?: Date): number {
  const overdueDays = Math.max(0, (now.getTime() - card.fsrs.due.getTime()) / 86_400_000)
  const evidenceScore = Math.min(card.verifiedPyqCount, 10) * 100
  const realPyqBoost = card.contentType === 'pyq' ? 1_000 : 0
  const currentAffairsScore = card.studyType === 'current_affair'
    ? currentAffairRelevance(card.eventDate, examDate) * 100
    : 0
  return realPyqBoost + evidenceScore + currentAffairsScore + Math.min(overdueDays, 30)
}

export function useFSRSEngine(options: FSRSEngineOptions = {}) {
  const targets = {
    ...TSLPRB_TARGET_RETENTION,
    ...options.targets,
  }
  const schedulerCache = new Map<number, ReturnType<typeof fsrs>>()

  function targetFor(type: StudyCardType, requested?: number): number {
    const target = requested ?? targets[type]
    requireFinite(target, 'targetRetention')
    if (target < MIN_TARGET_RETENTION || target > MAX_TARGET_RETENTION) {
      throw new Error(`targetRetention must be between ${MIN_TARGET_RETENTION} and ${MAX_TARGET_RETENTION}`)
    }
    return target
  }

  function schedulerFor(targetRetention: number) {
    const target = targetFor('static', targetRetention)
    const cached = schedulerCache.get(target)
    if (cached) return cached

    const scheduler = fsrs(generatorParameters({
      request_retention: target,
      enable_fuzz: options.enableFuzz ?? false,
      enable_short_term: true,
    }))
    schedulerCache.set(target, scheduler)
    return scheduler
  }

  function createNewCard(type: StudyCardType, input: CreateCardInput): StudyCard {
    if (!input.unlocked) {
      throw new Error('A review card cannot be created before its comprehension gate has passed.')
    }
    if (!Number.isInteger(input.verifiedPyqCount) || input.verifiedPyqCount < 0) {
      throw new Error('verifiedPyqCount must be a non-negative integer')
    }
    if (type === 'current_affair' && (input.contentType !== 'atomic_flashcard' || !input.sourceCurrentAffairId || !input.eventDate)) {
      throw new Error('A current-affairs review item must be a dated atomic_flashcard with its sourceCurrentAffairId.')
    }

    return {
      id: input.id,
      contentId: input.contentId,
      contentType: input.contentType,
      studyType: type,
      unlocked: true,
      verifiedPyqCount: input.verifiedPyqCount,
      fsrs: createEmptyCard(input.now ?? new Date()),
      targetRetention: targetFor(type, input.targetRetention),
      sourceCurrentAffairId: input.sourceCurrentAffairId,
      eventDate: input.eventDate,
      validUntil: input.validUntil,
    }
  }

  function scheduleReview(card: StudyCard, rating: FSRSGrade, reviewedAt = new Date()) {
    const result = schedulerFor(card.targetRetention).next(card.fsrs, reviewedAt, rating)
    return {
      card: { ...card, fsrs: result.card },
      log: result.log,
    }
  }

  function previewRatings(card: StudyCard, now = new Date()) {
    const scenarios = schedulerFor(card.targetRetention).repeat(card.fsrs, now)
    const ratings: FSRSGrade[] = [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy]
    return ratings.map((rating) => ({
      rating,
      due: scenarios[rating].card.due,
      scheduledDays: scenarios[rating].card.scheduled_days,
    }))
  }

  function retrievability(card: StudyCard, now = new Date()): number {
    return schedulerFor(card.targetRetention).get_retrievability(card.fsrs, now, false) as number
  }

  /** Due, eligible cards only. Verified PYQ frequency controls the first sort key. */
  function buildDueQueue(cards: StudyCard[], now = new Date(), examDate?: Date): StudyCard[] {
    return cards
      .filter((card) => card.unlocked && isDue(card, now) && isValid(card, now, examDate))
      .sort((left, right) => priorityScore(right, now, examDate) - priorityScore(left, now, examDate))
  }

  return {
    createNewCard,
    scheduleReview,
    previewRatings,
    retrievability,
    buildDueQueue,
    evaluateAttempt,
    calculateCalibration,
  }
}
