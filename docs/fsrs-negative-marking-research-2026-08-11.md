# FSRS and Negative-Marking Decision Design for TSLPRB StudyOS

Date: 2026-08-11

## Decision summary

1. With TSLPRB's `+1, -0.20, 0` scoring, the exact break-even probability is \(1/6 = 16.667\%\). A purely mathematical expected-value maximiser attempts any selected answer with a calibrated \(p > 1/6\).
2. This does **not** license an "always guess" feature. The break-even result assumes the stated \(p\) is calibrated, a selected option is recorded correctly, time has no opportunity cost, and the student is indifferent to score variance. None of those conditions is automatic in a timed, high-stakes paper.
3. Keep a base requested retention of \(0.90\) for static material. Trial \(0.92\), rather than globally forcing \(0.94\), for verified high-yield, current-affairs atomic facts inside the PYQ-supported six-month window. Retention must be selected against each learner's review capacity and calibration data.
4. Do not hand-tune the 19 FSRS weights. Fit only to clean review data, and only with an optimizer compatible with the scheduler version actually deployed.
5. The installed lockfile resolves `ts-fsrs` to 4.7.1, whose exported `FSRSVersion` identifies an FSRS-5 implementation. That is not FSRS-4.5. The code uses the installed official library safely, but the team must pin a package that reports FSRS-4.5 if exact FSRS-4.5 comparability is a release requirement.

The official FSRS guide defines desired retention as the fraction successfully recalled when due, recommends \(80\%-95\%\) as a normal range, and warns that higher retention increases daily workload. It also makes the rating semantics unambiguous: forgotten is `Again`; `Hard` is a successful but effortful recall. [FSRS tutorial](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md)

## 1. Exact negative-marking decision theory

### 1.1 Expected value and proof of the threshold

Let \(p\) be the probability that the selected option is correct, and let \(q=0.20\) be the absolute wrong-answer penalty. Skipping has value zero. Therefore

\[
\begin{aligned}
E(\operatorname{attempt}\mid p)
&=p(+1)+(1-p)(-q)\\
&=p-q+pq\\
&=(1+q)p-q.
\end{aligned}
\]

Attempting is better than skipping precisely when

\[
(1+q)p-q>0
\quad\Longleftrightarrow\quad
p>\frac{q}{1+q}.
\]

For TSLPRB:

\[
p_{crit}=\frac{0.20}{1.20}=\frac{1}{6}=0.166\overline{6}.
\]

At equality, attempt and skip both have expected mark \(0\). A cautious product rule must use a strict, calibration-adjusted probability above this number, rather than displaying the equality as a recommendation.

The statement "knowing that you do not know is infinitely better than false confidence" is not literally true in mark units. Relative to skipping, an incorrect attempt costs \(0.20\) mark. Relative to a correct attempt, it creates a \(1.20\)-mark swing. The substantive concern is valid: falsely high self-confidence makes the \(p\) supplied to the formula wrong.

### 1.2 Four-option elimination return table

For \(N=4\) choices and \(m\) **definitely** eliminated choices, random selection among the remaining answers yields \(p_m=1/(4-m)\). Substitution into \(E=1.2p-0.2\) gives:

| Definite eliminations \(m\) | Remaining choices | \(p_m\) | \(E_{-0.20}\) |
|---:|---:|---:|---:|
| 0 | 4 | \(1/4=0.2500\) | \(+0.1000\) |
| 1 | 3 | \(1/3=0.3333\) | \(+0.2000\) |
| 2 | 2 | \(1/2=0.5000\) | \(+0.4000\) |
| 3 | 1 | \(1\) | \(+1.0000\) |

The proof is direct. For example, after one certain elimination:

\[
E_1=\frac13-\frac23(0.2)=0.2.
\]

The table is a conditional mathematical result. In a mock, an "eliminated" option may be merely disliked rather than impossible. That error lowers the true \(p\), which is why the app must collect confidence before feedback and use a conservative calibrated estimate. It must never show a button or message that turns this row into a blanket random-guess prompt.

### 1.3 Why a 20% penalty is strategically different

Using the same \(p_m\), the general formula is \(E_q=(1+q)p_m-q\).

| \(m\) | \(p_m\) | TSLPRB \(q=0.20\) | UPSC-style \(q=0.25\) | Exact one-third \(q=1/3\) | Decimal \(q=0.33\) |
|---:|---:|---:|---:|---:|---:|
| 0 | 0.2500 | +0.1000 | +0.0625 | 0.0000 | +0.0025 |
| 1 | 0.3333 | +0.2000 | +0.1667 | +0.1111 | +0.1133 |
| 2 | 0.5000 | +0.4000 | +0.3750 | +0.3333 | +0.3350 |
| 3 | 1.0000 | +1.0000 | +1.0000 | +1.0000 | +1.0000 |

Their strict break-even probabilities are \(1/6=16.667\%\), \(1/5=20\%\), \(1/4=25\%\), and \(0.33/1.33=24.812\%\), respectively. The small positive value in the last row for a "33%" penalty is only because \(0.33\) is smaller than an exact one-third. TSLPRB's 20% penalty leaves a substantial EV cushion for genuinely calibrated partial knowledge.

This is an expected-value result, not a score-guarantee result. For \(G\) independent blind four-option attempts, expected marks are \(0.10G\), while the variance is \(G\operatorname{Var}(X)\), where \(X\in\{1,-0.2\}\). An exam cutoff, a limited time budget, OMR transfer risk, and error correlation mean that a risk-sensitive candidate may rationally require a margin above break-even.

### 1.4 Calibration score and a real-time recommendation

For question \(i\), let \(c_i\in[0,1]\) be confidence declared before feedback and \(y_i\in\{0,1\}\) the actual outcome.

The Brier score is

\[
BS=\frac{1}{n}\sum_{i=1}^{n}(c_i-y_i)^2.
\]

It is a proper probability score: lower is better, and zero is perfect. A reliability diagram groups forecasts into bins \(b\). With \(n_b\) observations, mean confidence \(\bar c_b\), and accuracy \(\bar y_b\), report:

\[
ECE=\sum_b\frac{n_b}{n}\left|\bar c_b-\bar y_b\right|,
\qquad
OCI=\sum_b\frac{n_b}{n}(\bar c_b-\bar y_b).
\]

`ECE` is absolute calibration error. `OCI` preserves sign: positive means overconfidence and negative means underconfidence. The Brier score's probability-error interpretation is documented in the [Brier Score reference](https://scores.readthedocs.io/en/stable/tutorials/Brier_Score.html).

For a new question, find its confidence bin. Let the bin contain \(s\) correct answers from \(n\) past attempts. The implementation uses a shrinkage estimate

\[
\hat p_{cal}=\frac{n}{n+20}\frac{s}{n}+\frac{20}{n+20}c,
\]

and uses a one-sided 90% Wilson lower bound \(L\), with a weak two-observation prior centred on \(c\), for the decision:

\[
L=\frac{\hat p+z^2/(2n)-z\sqrt{\hat p(1-\hat p)/n+z^2/(4n^2)}}{1+z^2/n},\qquad z=1.645.
\]

The live rule is:

\[
\operatorname{recommend}=
\begin{cases}
\text{Attempt}, & L>p_{crit}+\delta,\ \text{an option is selected, and evidence exists};\\
\text{Skip}, & \text{otherwise},
\end{cases}
\]

where \(\delta=0.02\) is a configurable risk buffer. If eliminations are truly definitive, the structural probability \(1/(4-m)\) is known and can replace \(L\). In ordinary use they should not be marked definitive casually. With no selected option, or with pure random selection and no recalled/solved evidence, the product returns `Skip` even though it exposes the mathematical EV. This meets the no-free-guessing rule.

### 1.5 Mock-data contract

Record before explanation, not retrospectively:

| Field | Values | Why it matters |
|---|---|---|
| `confidence` | 0.25, 0.40, 0.55, 0.70, 0.85, 0.95 or a slider | Probability forecast for Brier and reliability calculations |
| `selected_option` | 0-3 or null | Distinguishes a real attempt from a skip |
| `eliminated_options` | 0-3 | Supports post-hoc analysis of elimination quality |
| `correct` | boolean | Observed outcome |
| `response_seconds` | non-negative number | Captures the 54-second time constraint |
| `question_source` | verified PYQ, practice, mock | Keeps synthetic practice separate from real PYQ calibration |

Do not feed a post-explanation confidence rating into calibration. It is contaminated by feedback.

## 2. FSRS target retention, ratings, and parameters

### 2.1 Version boundary and installed behaviour

The application declares `ts-fsrs: ^4.0.0`, but the current lockfile resolves 4.7.1. Its exported `FSRSVersion` identifies FSRS-5.0 and it exposes a 19-value parameter vector. This report therefore separates:

| Requirement | Safe action |
|---|---|
| Use the present app safely | Use its installed `ts-fsrs` API and persist the profile/target used for every schedule. |
| Claim FSRS-4.5 results | Pin a compatible package/version and verify `FSRSVersion` at build time before fitting or migrating cards. |
| Move between FSRS-4.5 and FSRS-5 | Do not copy parameter vectors across versions. Refit from review history with that version's optimizer. |

The official tutorial distinguishes FSRS v4 and FSRS-4.5 as versions with the same parameter count but different forgetting-curve shape. [FSRS version FAQ](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md#faq) A 19-number vector is therefore not portable merely because its length matches.

For the currently installed library, the local runtime uses \(D=-0.5\) and \(F=19/81\):

\[
R(t,S)=\left(1+\frac{19}{81}\frac{t}{S}\right)^{-0.5}.
\]

Solving \(R(t,S)=r\) gives its un-fuzzed target interval:

\[
I(S,r)=S\frac{r^{1/D}-1}{F}
=S\frac{r^{-2}-1}{19/81}.
\]

This local formula is supplied to make the implementation auditable. It should not be presented as the FSRS-4.5 formula.

### 2.2 Retention trade-off

At the same learned stability \(S\), the interval multipliers are:

| Requested retention \(r\) | \(I/S\) | Example interval when \(S=100\) days | Change from \(r=0.90\) |
|---:|---:|---:|---:|
| 0.90 | 1.0000 | 100 days | baseline |
| 0.92 | 0.7737 | 77 days | 23% shorter |
| 0.93 | 0.6659 | 67 days | 33% shorter |
| 0.94 | 0.5616 | 56 days | 44% shorter |

The table does not predict a universal 23% increase in review count, because the queue also depends on card states, stability distribution, learning steps, and user behaviour. It proves the direction and substantial interval compression. FSRS itself recommends calculating a learner-specific minimum recommended retention through a workload/knowledge simulation rather than relying on a generic number. [FSRS optimal-retention documentation](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Optimal-Retention)

Negative marking changes the value of answering accurately, but it does not change the forgetting process or turn \(0.94\) into a universal optimum. Conditional on an attempted question, a probability improvement \(\Delta p\) changes expected marks by

\[
\Delta E=(1+q)\Delta p=1.2\Delta p.
\]

The correct operational question is whether the extra reviews required by a higher \(r\) produce enough reliable \(\Delta p\), without displacing PYQs, timed mocks, sleep, or error review.

Recommended policy:

| Card group | Initial requested retention | Promotion condition | Do not do |
|---|---:|---|---|
| Static, ordinary priority | 0.90 | Review capacity is healthy and recall reliability is below goal | Raise every card to 0.94 |
| Static, verified high-yield topic | 0.92 trial | At least several weeks of truthful ratings, no sustained due backlog | Force a new custom \(w\) vector |
| Dated CA atomic fact in the six-month band | 0.92 | It has an official source, a clear atomic fact, and PYQ-supported category relevance | Schedule raw article bodies |
| Older CA bands | 0.90 or archive by relevance | Keep only facts still useful to the next exam | Treat event age as a memory lapse |

Run a 21-day profile comparison: keep the same new-card cap and review-time budget, compare `0.90` and `0.92` by Brier score on mixed PYQs, actual due backlog, time per retained fact, and mock net marks. Do not select `0.92` merely because it produces more reviews.

### 2.3 Four rating buttons

Ratings describe recall quality, never the desired next interval.

| Button | Operational TSLPRB definition | Data meaning |
|---|---|---|
| `Again` | Blank, wrong, unable to state the fact, or answer reconstructed only after seeing the back | Recall failure, including a lapse on a mature card |
| `Hard` | Correct recall, but slow, effortful, or uncertain after a serious retrieval attempt | Successful recall, weak access |
| `Good` | Correct atomic answer within the target pace and without material hesitation | Normal successful recall |
| `Easy` | Immediate, correct recall plus a useful distinction from the closest distractor | Very strong successful recall |

For the actual exam, \(180\) minutes for \(200\) questions is \(54\) seconds per question. Use a much shorter local threshold for an atomic flashcard, for example 8-12 seconds, so a `Hard` fact is not mistaken for exam-ready automatic recall. Do not rate `Hard` when the answer was forgotten. The official FSRS documentation explicitly treats `Again` as failure and `Hard`, `Good`, and `Easy` as passes. [FSRS rating guidance](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md#the-ultra-short-version)

### 2.4 Lapses and exam horizon

The scheduler receives every truthful lapse as `Again`, including a mature card. Keep `enable_short_term: true`; that preserves the library's short-term relearning behaviour. The app should not falsify a `Hard` rating or mutate stability to make a card reappear sooner.

| Time to exam | Lapse policy | Queue policy |
|---|---|---|
| More than 90 days | Truthful `Again`, complete same-day short-term relearning, normal FSRS thereafter | Keep new-card flow capped by actual completion capacity |
| 31-90 days | Same rating rule; investigate recurring lapse clusters and repair card wording | Prioritise verified high-yield PYQ and current affairs, but do not starve due static reviews |
| 8-30 days | Same rating rule; surface failed high-yield cards again in the study session only through FSRS short-term scheduling | Trial 0.92 only where due backlog remains controlled; use mixed timed mocks for transfer |
| Final 7 days | No parameter panic, no global rescheduling, no fabricated ratings | Complete due cards, known error cards, and final capsules; preserve OMR and mock-audit time |

FSRS recommends that learning and relearning steps finish the same day and cautions that long steps reduce scheduling efficiency. [FSRS learning-step guidance](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md#learning-and-re-learning-steps)

### 2.5 The 19 parameters \(w\)

There is insufficient learner data to recommend 19 universal TSLPRB weights. The production recommendation is:

1. Start with the defaults returned by the exact deployed `ts-fsrs` version.
2. Log only honest `Again`/`Hard`/`Good`/`Easy` reviews. Do not mix a gate result, answer-choice confidence, or post-feedback recognition into FSRS review history.
3. Fit with the matching version's optimizer only after a substantial review history. The public FSRS guide notes a historical 400-review threshold in Anki 24.04 and advises defaults when data is insufficient. [FSRS optimization guidance](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md#step-3-find-optimal-parameters)
4. Evaluate held-out recall using log loss/RMSE and verify that the fit improves before replacing the default. Store the profile version, `w`, and requested retention with its schedule metadata.

The current local default vector is a property of FSRS-5 in this lockfile, not a recommended FSRS-4.5 vector. Do not copy it into an FSRS-4.5 deployment.

## 3. Static syllabus versus current affairs

The premise that a current-affairs fact needs a deliberately lower memory stability is partly mistaken. A student can remember "who was appointed" as strongly as a Constitution article. What expires is usually **exam relevance**, not the memory trace.

Model those independently:

\[
R_m(t)=\text{FSRS retrieval probability from actual review history},
\]

\[
V_{static}=1,
\qquad
V_{CA}(a)=
\begin{cases}
0.85, & 0\le a\le183\\
0.10, & 183<a\le365\\
0.05, & 365<a\le730\\
0, & a>730,
\end{cases}
\]

where \(a\) is event age at the target exam date. The CA bands are the existing PYQ-derived timeline: 85% within six months, 10% at 7-12 months, and 5% at 13-24 months. The study utility used for queue priority can be

\[
U_i=Y_i\,V_i\,(1-R_{m,i}),
\]

where \(Y_i\) is verified topic PYQ evidence. This prioritises a due, high-yield, recent event without corrupting FSRS's learned memory state.

Consequences:

| Design choice | Static syllabus | Current affairs |
|---|---|---|
| Reviewable object | Atomic flashcard or real PYQ unlocked after gate | Dated atomic flashcard derived from a current-affair entry |
| \(S_0\) | Let the matching FSRS model infer it from ratings | Same rule. Use a separate fitted profile only when enough CA review data exists |
| Memory decay | FSRS only | FSRS only |
| Relevance decay | \(V=1\) | PYQ timeline function above |
| End condition | None | `valid_until`, superseding event, or zero relevance after 24 months |

Separate static and CA parameter presets are defensible only if a held-out evaluation shows lower loss/RMSE for separate data sets. Without that evidence, a different requested retention and relevance priority are safer than manually changing \(S_0\) or \(w\).

## 4. Implementation delivered

[`composables/useFSRSEngine.ts`](../composables/useFSRSEngine.ts) implements:

- `createNewCard(type: 'static' | 'current_affair')`, with hard guards for gate eligibility and for CA-to-atomic-card conversion.
- Per-card target-retention schedulers via the installed official `ts-fsrs` package.
- Deterministic previews and review scheduling with `Again`, `Hard`, `Good`, and `Easy`.
- A due queue that prioritises real PYQs and verified PYQ frequency, then overdue state and CA relevance.
- Exact expected value, Brier/ECE/overconfidence analytics, Wilson lower confidence bounds, and a no-free-guess product guard.

### Required persistence work before production activation

The existing `review_cards` schema and `server/api/review/grade.post.ts` use one default scheduler and do **not** persist a card's target retention or profile version. Deploying the composable alone will not change server-side schedules. Add the following fields through a proper Supabase migration, then have the grade endpoint instantiate the matching scheduler from the persisted profile:

```sql
ALTER TABLE review_cards
  ADD COLUMN IF NOT EXISTS target_retention REAL NOT NULL DEFAULT 0.90
    CHECK (target_retention >= 0.80 AND target_retention <= 0.97),
  ADD COLUMN IF NOT EXISTS fsrs_profile_version TEXT NOT NULL DEFAULT 'ts-fsrs-4.7.1-fsrs-5';
```

Also persist `study_type`, `source_current_affair_id`, `event_date`, `valid_until`, and a verified topic PYQ-count snapshot either in `review_cards` or in a content metadata join. The server must remain the source of truth for grading; the client composable is a deterministic preview and decision domain layer, not an authority to rewrite a persisted schedule.

For exact FSRS-4.5, change the default `fsrs_profile_version`, verify the selected package's exported version in CI, and re-fit only with that scheduler. The [official TypeScript library](https://github.com/open-spaced-repetition/ts-fsrs) is the correct integration family, but library version and algorithm version are separate facts that must both be logged.

## 5. Negative Marking Protection Dashboard

All outcomes should be filterable by date, exam-section, verified topic, source type, and mock. Do not combine synthetic practice with verified-PYQ metrics by default.

| Tile or visual | Exact measure | Decision it supports |
|---|---|---|
| Net Marks Saved by Skipping | \(\sum_{skip} \max(0,-E(\hat p_{cal}))\) and actual counterfactual error bands | Shows disciplined skips without inventing unknowable marks |
| Overconfidence Penalty Tracker | Actual \(-0.20\) marks from wrong attempts with \(c\ge0.70\), plus \(OCI\) | Identifies confidence bands that are financially expensive |
| Recall Reliability Index | \(1-BS\), shown with ECE and sample size, never alone | Distinguishes reliable confidence from mere accuracy |
| Reliability diagram | \(\bar c_b\) against \(\bar y_b\), with 45-degree reference | Shows where calibration adjustment comes from |
| Attempt threshold plot | Distribution of conservative \(L\) with \(p_{crit}=1/6\) and \(p_{crit}+\delta\) lines | Makes the attempt/skip boundary inspectable |
| Expected versus actual net marks | \(\sum E(\hat p_{cal})\) versus observed marking by mock | Checks whether decision theory transfers to timed tests |
| Time-pressure scatter | confidence or correctness against response seconds, with 54-second marker | Finds slow correct answers that are not exam-ready |
| FSRS reliability | predicted retrievability buckets versus observed card-recall rate, log loss/RMSE, due backlog | Validates scheduling separately from MCQ confidence |
| Queue composition | Due cards by verified PYQ count, static/CA, and CA age band | Verifies that high-yield content is being prioritised without dropping due obligations |

`Net Marks Saved by Skipping` needs cautious wording. The exact counterfactual outcome of a skipped question is unknown. Show a modelled estimate from calibrated probability and a confidence interval, not a claimed factual mark total.

## 6. Acceptance tests

1. `expectedValueOfAttempt(1 / 6)` returns 0 within floating-point tolerance.
2. The four definitive-elimination rows return \(0.10, 0.20, 0.40, 1.00\) for the 20% penalty.
3. `evaluateAttempt` returns `skip` when no option is selected or when there is a pure random choice with no evidence flag.
4. A raw current-affair entry cannot be sent to FSRS. Only a dated `atomic_flashcard` with a source current-affair ID can be created.
5. A card with `unlocked: false` throws before entering the queue.
6. In a due queue, a card with a higher verified PYQ count sorts above an otherwise equivalent lower-evidence card.
7. A CA event older than 24 months at the target exam date is excluded by relevance, while static cards have no relevance expiry.
8. The server grading endpoint is not switched to custom retention until the migration and profile persistence are deployed.
