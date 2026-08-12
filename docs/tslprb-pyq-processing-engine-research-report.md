# TSLPRB PYQ & PIB Current Affairs Processing Engine: Research & Architecture Report

## Scope and priority order

This report covers PYQ classification, answer recovery, exam-pattern intelligence, score modelling, memory systems, and content generation. Current-affairs product design is intentionally excluded because it is documented separately. PIB is used here only as a signal for emerging exam topics.

| Priority | Deliverable | Score impact |
|---|---|---:|
| 1 | Canonical paper registry and taxonomy | Very high |
| 2 | Constrained hierarchical classification | Very high |
| 3 | Verified answer recovery | Very high |
| 4 | Pattern, repeat, and high-yield analysis | High |
| 5 | Score simulator and calibrated attempts | High |
| 6 | Topic-specific memory system | High |
| 7 | Controlled synthetic practice | Medium-high |
| 8 | Drift and emerging-topic monitor | Medium |
| 9 | IRT and fine-tuning | Medium later |

The corpus is small. The principal risks are inconsistent labels, duplicated papers, false answer confidence, and treating model output as ground truth.

# 0. Foundation: canonical PYQ registry

Create a canonical-paper registry before calculating any topic frequency, trend, repeat rate, or high-yield rank. Several source JSON files overlap substantially, so pooling all 25 files would inflate counts.

Use `Extracted_Text/` as ground truth. Treat JSON files as processing inputs rather than automatically independent papers.

```json
{
  "source_file": "Constable_2023_Set_A.json",
  "source_file_sha256": "...",
  "exam_type": "Constable",
  "year": 2023,
  "stage": "Mains",
  "paper_name": "Set A",
  "question_count": 200,
  "is_canonical_paper": false,
  "canonical_paper_id": "PC-2015-MAINS-01",
  "relationship_to_canonical": "duplicate_or_reprint",
  "duplicate_overlap_ratio": 0.91,
  "source_confidence": "review_required"
}
```

Process:

1. Parse filename metadata into type, year, stage, and paper name.
2. Normalize stems with Unicode NFKC, removal of question numbers and option labels, and whitespace collapse. Preserve math symbols, dates, and named entities.
3. Hash normalized stems and calculate paper-overlap matrices.
4. Review high-overlap paper pairs manually.
5. Mark each source as `canonical`, `alternate_set`, `duplicate_or_reprint`, `partial_duplicate`, or `uncertain`.
6. Use canonical papers for longitudinal reports; retain all files for provenance and duplicate detection.

Use `polars` or `pandas`, `duckdb`, `rapidfuzz`, `hashlib`, `pydantic`, and `pytest`. It runs locally in minutes. No GPU or API is required.

# 1. Hierarchical Question Classification

## Recommendation: taxonomy-first hybrid classification

Use this pipeline:

1. Human-designed versioned taxonomy.
2. Embedding retrieval to select 10 to 25 candidate taxonomy leaves.
3. Gemini structured output constrained to approved IDs.
4. Rules for obvious forms such as arithmetic, assertion-reason, and match-the-following.
5. Review queue for uncertainty, image questions, mixed subjects, and disagreement.
6. Gold-set evaluation and governed taxonomy changes.

| Approach | Recommendation | Why |
|---|---|---|
| Zero-shot LLM alone | Do not use | Produces unstable, duplicate labels. |
| Few-shot LLM with fixed IDs | Primary method | Best quality-speed trade-off for 4,991 questions. |
| Embedding and clustering | Support method | Useful for candidate retrieval and cluster discovery. |
| Fine-tuned classifier | Later | Requires a reliable gold set first. |
| TF-IDF classifier | Baseline only | Transparent but weak on paraphrase and mixed concepts. |
| Free-form LLM labels | Discovery only | Never allow them into production taxonomy. |

Use Gemini 2.5 Flash batch for bulk classification. Use Gemini 2.5 Pro or an independent model only for adjudication. Vertex batch is appropriate because this is not latency-sensitive. See [Vertex batch inference](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/batch-prediction-genai) and [Vertex pricing](https://cloud.google.com/vertex-ai/generative-ai/pricing).

## Taxonomy: three educational levels plus a roll-up

Use the requested learning hierarchy:

```text
Subject -> Topic -> Sub-topic
```

Keep `exam_section` separate:

```text
Exam section: General Studies
Subject: Geography
Topic: Drainage Systems of India
Sub-topic: Peninsular Rivers
```

Do not make a fourth level mandatory. In this corpus, a fourth level is often a fact with only one or two examples. Store it as an optional `concept_id` or `skill_id` instead.

```text
General Studies
  Polity
    Constitutional Provisions
      Special Status Provisions
        CON-POL-ART370-ABROGATION
```

Suggested subjects: English; Arithmetic; Reasoning and Mental Ability; General Science; History; Geography; Polity; Economy; Telangana GK; and Current Affairs. Current Affairs remains a PYQ classification subject, though its product design is not covered here.

## Governance and consistency

Store IDs as the source of truth and never let a model invent display strings.

```json
{
  "taxonomy_version": "2026.1",
  "subject_id": "SUB-GEO",
  "topic_id": "TOP-GEO-DRAINAGE",
  "subtopic_id": "SUBTOP-GEO-PENINSULAR-RIVERS",
  "label": "Peninsular Rivers",
  "aliases": ["Rivers of Peninsular India", "South Indian Rivers"]
}
```

- Enforce parent-child validity.
- Keep aliases only in the taxonomy registry.
- Reject unknown IDs from model output.
- Version every classification.
- Log `renamed`, `merged`, `deprecated`, and `split` taxonomy changes.
- Test for duplicate sibling labels, orphan leaves, deprecated assignments, and invalid paths.

Use `pydantic`, `jsonschema`, `pytest`, JSON/YAML, and `duckdb` joins.

## Classification workflow and multi-subject questions

Preprocess question text, options, paper metadata, image flag, length, numerical notation, and deterministic phrases. Embed questions and taxonomy leaves, retrieve candidate paths, then ask Gemini to return strict JSON only.

Use Vertex `gemini-embedding-001`, or `sentence-transformers/all-MiniLM-L6-v2` locally for an English-first baseline. [Vertex embeddings documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-text-embeddings)

```json
{
  "primary_path": {
    "subject_id": "SUB-ARI",
    "topic_id": "TOP-ARI-PROFIT_LOSS",
    "subtopic_id": "SUBTOP-ARI-BASIC_PROFIT_PERCENT"
  },
  "secondary_paths": [],
  "classification_confidence": 0.94,
  "requires_human_review": false
}
```

Every question has one `primary_path` for weightage. Secondary paths are study connections only. For example, a question on forest cover in a Telangana district can have primary Telangana GK / Telangana Geography / Forest Cover and secondary Geography / Environment / Forest Cover. Count only primary paths in aggregate reports.

Review when confidence is below `0.80`, top-two paths are close, the item is multi-subject or visual, the leaf is new, or models disagree.

## Enriched question schema

```json
{
  "question_id": "PYQ-PC-2023-MAINS-001-045",
  "canonical_paper_id": "PC-2023-MAINS-01",
  "source": {
    "source_file": "Constable_2023_Mains_Official.json",
    "q_no": 45,
    "source_page": 5,
    "exam_type": "Constable",
    "year": 2023,
    "stage": "Mains"
  },
  "question": "Full question text...",
  "options": ["(1) Option A", "(2) Option B", "(3) Option C", "(4) Option D"],
  "visual": {
    "has_image": false,
    "image_file": null,
    "visual_type": null,
    "human_verified_description": null
  },
  "taxonomy": {
    "taxonomy_version": "2026.1",
    "exam_section": "General Studies",
    "primary_path": {
      "subject_id": "SUB-GEO",
      "topic_id": "TOP-GEO-DRAINAGE",
      "subtopic_id": "SUBTOP-GEO-PENINSULAR-RIVERS"
    },
    "secondary_paths": [],
    "concept_ids": ["CON-GEO-NARMADA-ORIGIN"],
    "is_multi_subject": false
  },
  "question_profile": {
    "question_type": "factual_recall",
    "bloom_level": "remember",
    "difficulty_prior": "easy",
    "language_complexity": {"score": 0.22, "label": "simple"},
    "estimated_steps": 1
  },
  "answer": {
    "correct_option_index": null,
    "answer_status": "unverified",
    "confidence": null,
    "explanation_short": null,
    "evidence": [],
    "validation_methods": []
  },
  "quality": {
    "classification_confidence": 0.94,
    "needs_human_review": false,
    "review_status": "pending"
  },
  "provenance": {
    "pipeline_version": "2026.1",
    "classified_by": "gemini-2.5-flash"
  }
}
```

## Validation, accuracy, and cost

Create a human-labelled gold set of 800 to 1,000 questions, stratified by year/subject and containing every image question, rare topic, mixed-subject question, and duplicate cluster.

| Metric | Target |
|---|---:|
| Subject macro F1 | 0.95+ |
| Topic macro F1 | 0.88+ |
| Sub-topic macro F1 | 0.80+ |
| Exact full-path match | 0.78 to 0.88 |
| Review rate after tuning | Under 15% |
| Human agreement | Cohen's kappa 0.80+ |

Expected post-review accuracy: subject 93% to 98%, topic 85% to 93%, sub-topic 75% to 88%, question type 90% to 97%, and multi-subject detection 75% to 90%. These are estimates: publish measured gold-set results.

Two Gemini Flash batch passes with retries should cost roughly $8 to $26, approximately ₹700 to ₹2,200 depending on prompt length and current Vertex SKU.

# 2. Answer Key Generation

Do not call generated answers official answer keys. Use `AI-generated, evidence-validated answer` until an official historical key has been recovered.

```text
Official answer-key search
  -> deterministic solver where possible
  -> Gemini candidate answer
  -> evidence retrieval
  -> adjudication only on disagreement
  -> confidence calibration
  -> human review queue
```

Model voting is a disagreement signal, not proof. Models can share the same misconception or incorrect answer mapping.

Search official TSLPRB final-key notices, result pages, archive documents, and recruitment press notes before generating anything. Store one of: `official_final_key`, `official_provisional_key`, `official_selection_key`, `authoritative_reference_verified`, `multi_model_validated`, `human_reviewed`, or `unverified_ai`. See an [official TSLPRB selection press-note example](https://www.tgprb.in/Pdfs/PressNoteDated04102023_SEL.pdf).

| Question family | Best validator |
|---|---|
| Arithmetic | Python, SymPy, unit tests |
| Algebra | SymPy or numeric substitution |
| English grammar | LLM plus rule review |
| Static GK | Official or textbook retrieval |
| Constitution | Constitution of India / India Code retrieval |
| Science | NCERT or authoritative source retrieval |
| Reasoning | Explicit logic trace |
| Historical CA | Dated official evidence retrieval |
| Image reasoning | Gemini vision plus mandatory human review |

Ask for answer index, concise derivation, assumptions, facts that require verification, confidence, and ambiguity flags. Never ask for only an option letter.

Evidence hierarchy:

1. Official answer key.
2. Official government or statutory source.
3. NCERT or standard textbook.
4. Deterministic calculation.
5. Independent-model agreement.
6. Human review.
7. Unverified LLM output.

| Condition | Recommended confidence |
|---|---:|
| Official final key | 1.00 |
| Deterministic calculation and option match | 0.98 |
| Two reliable sources plus model agreement | 0.90 to 0.97 |
| Flash and Pro agree with cited evidence | 0.85 to 0.94 |
| Two models agree without source | 0.65 to 0.80 |
| One model only | 0.40 to 0.65 |
| Unclear diagram | Under 0.60 |

Calibrate confidence later against a known-answer set using isotonic regression or Platt scaling.

| Type | Candidate reliability | After validation |
|---|---:|---:|
| Clear arithmetic | 90% to 98% | 95% to 99% |
| Algebra and ratios | 85% to 96% | 93% to 99% |
| English grammar | 80% to 93% | 85% to 95% |
| Static GK | 75% to 92% | 85% to 97% |
| Polity | 80% to 95% | 90% to 98% |
| Science | 75% to 92% | 85% to 96% |
| Text reasoning | 70% to 90% | 80% to 94% |
| Series / coding | 70% to 90% | 80% to 93% |
| Image reasoning | 55% to 85% | 70% to 90% |
| 2015-2023 CA | 50% to 85% | 80% to 95% |

For all 124 image questions, preserve the source crop, verify question-image correspondence, derive visual type/OCR/entities, send the question/options/image together, use Pro only for disputes, and require human approval.

```json
{
  "answer": {
    "correct_option_index": 2,
    "correct_option_label": "(3)",
    "answer_status": "evidence_validated",
    "confidence": 0.93,
    "confidence_band": "high",
    "explanation_short": "Profit = 120. Profit percentage = 120 / 800 × 100 = 15%.",
    "validation_methods": ["python_calculation", "gemini_flash_candidate"],
    "evidence": [{"source_type": "deterministic_calculation", "source_name": "SymPy"}],
    "human_review": {"required": false, "status": "not_required"}
  }
}
```

Use Gemini Flash batch for candidates, Gemini Pro for difficult adjudication, and an independent OpenAI or Claude judge selectively. Vertex should remain primary because credits are locked there. [Official OpenAI model comparison documentation](https://developers.openai.com/api/docs/models/compare)

| Work | Estimated Vertex cost |
|---|---:|
| Flash answer pass | $4 to $12 |
| Evidence extraction and explanations | $5 to $18 |
| Pro adjudication for 15% to 25% | $8 to $30 |
| Image analysis | $2 to $12 |
| Evaluation and retries | $5 to $25 |
| Total | **$24 to $97** |

# 3. Pattern Analysis, Weightage, Similarity, and Difficulty

Run every report in two modes: canonical papers only and all source files with duplicate provenance. The canonical view is the decision-making view.

| Analysis | What it answers |
|---|---|
| Subject weightage by paper | What each paper actually tested |
| Topic frequency by year | What repeated over time |
| Topic frequency by tier | PC versus SI differences |
| Paper coverage rate | How many papers include a topic |
| Unique-concept frequency | Conceptual repeat rate, not just repeated text |
| Recent-weighted frequency | What may matter most for 2026 |
| Difficulty distribution | Whether papers appear to be harder |
| Question-type mix | Recall versus calculation versus reasoning |
| Exact duplicate analysis | Reprints and copied questions |
| Semantic duplicate analysis | Paraphrased or same-concept items |
| Cross-tier overlap | PC and SI common ground |

Calculate:

```text
subject_weightage = subject_question_count / total_questions
topic_weightage = topic_question_count / total_questions
```

Keep raw count, percentage, unique-question count, and unique-concept count. A paper with five paraphrases of one concept should not be interpreted as five independent content areas.

Use a high-yield score rather than raw count alone:

```text
high_yield_score =
  0.30 × recent_frequency
+ 0.25 × paper_coverage_rate
+ 0.20 × unique_concept_frequency
+ 0.15 × cross_tier_presence
+ 0.10 × repeat_or_paraphrase_rate
```

Add a separate `static_syllabus_score` so short-lived event questions do not overwhelm evergreen content.

Recommended visualizations are subject-by-paper stacked bars, topic-year heatmaps, Pareto charts, Sankey diagrams, frequency-versus-difficulty bubble plots, first/last-observed timelines, similarity networks, and searchable evidence tables. Use `pandas`, `duckdb`, `plotly`, `seaborn`, `matplotlib`, and optional `altair`; export precomputed JSON to Nuxt.

Measure whether the distribution is long-tailed using a log-log frequency plot, Lorenz curve, Gini coefficient, and cumulative coverage curve. A result such as `top 20% of verified topics account for 55% of canonical PYQs` can guide Tier 1/2/3 content decisions only after verified tagging.

## Duplicate and reuse detection

| Layer | Method | Finds |
|---|---|---|
| Exact | Normalized stem/options hash | Direct reprints |
| Lexical | RapidFuzz, char TF-IDF, token overlap | OCR and minor wording changes |
| Semantic | Embeddings plus cosine retrieval | Paraphrases |
| Conceptual | Concept ID plus LLM pair judge | Same templates with different facts/values |

Classify pairs as `exact_duplicate`, `near_duplicate`, `paraphrase_same_answer`, `same_concept_different_fact`, `same_template_different_values`, `related_but_distinct`, or `unrelated`.

For 5,000 questions, `sklearn.neighbors.NearestNeighbors` is enough. `faiss-cpu` is optional. `all-MiniLM-L6-v2` is a suitable local English baseline. Do not rely on TF-IDF alone for paraphrase detection.

## Difficulty, question type, and Bloom tags

Difficulty without learner response data is a prior, not a fact. Use estimated reasoning steps, calculations, word length, entity count, assertion/match form, image dependency, topic rarity, formula dependence, distractor closeness, and LLM estimates as features.

```json
{
  "difficulty_prior": "medium",
  "difficulty_score": 0.62,
  "estimated_steps": 3,
  "time_pressure": "medium",
  "difficulty_reasons": ["requires_percentage_calculation", "two_intermediate_steps"]
}
```

Once learner answer history exists, use IRT. Start with Rasch / 1PL, then 2PL for discrimination. Keep PC and SI calibrations separate. Do not start with 3PL because guessing parameters need much more data. Use `py-irt`, `pymc`, `scipy`, `numpy`, and `pandas`.

Classify question type as:

```text
factual_recall
conceptual_understanding
calculation
data_interpretation
logical_reasoning
language_grammar
vocabulary
reading_comprehension
match_the_following
assertion_reason
statement_evaluation
image_reasoning
sequence_pattern
```

Use deterministic rules for obvious forms before LLM classification. Expected post-review question-type accuracy is 90% to 97%.

Use practical Bloom tags only: `remember`, `understand`, `apply`, and `analyze`. They help prescribe revision mode but are lower priority than correct taxonomy, answer, and difficulty.

# 4. Topic Evolution and Drift

## Limits and terminology

The data includes only 2015, 2016, 2018, 2022, and 2023, with different paper stages. First appearance is not proof of syllabus introduction and absence is not proof of death. Compare only like cohorts: PC Prelims with PC Prelims and SI GS papers with comparable SI GS papers. Do not use arithmetic-only or language-only papers to infer GS shifts. Analyse static syllabus and current affairs separately.

Use `first_observed`, `last_observed`, `persistent`, and `not_observed_recently` rather than literal birth and death claims.

## Birth, persistence, decay, and velocity

```text
first_observed_year(topic) =
  earliest year in which a topic appears in a canonical comparable paper
```

Treat a first observation as meaningful when it has at least two unique questions in the first year, appears in both PC and SI, or clearly relates to a new law, technology, or policy.

```json
{
  "topic_id": "TOP-ECO-GST",
  "cohort": "PC_PRELIMS",
  "first_observed_year": 2018,
  "unique_question_count_first_year": 4,
  "earlier_comparable_years_checked": [2015, 2016],
  "birth_confidence": "medium",
  "interpretation": "First observed in available comparable papers, not confirmed syllabus introduction."
}
```

Mark a topic `not_observed_recently` when it appears in at least two older comparable years but not in the latest two. Mark it evergreen only when it appears in every available comparable year and meets a minimum count. Build the actual lists from canonical verified tags.

Calculate novelty rate separately for all questions, static questions, current-affairs questions, PC, and SI:

```text
2023_novelty_rate =
  questions in 2023 whose topic was absent in comparable papers through 2018
  / total canonical 2023 questions
```

Measure distribution shift with Jensen-Shannon divergence, cosine distance, and Hellinger distance. Use embedding-centroid drift as a secondary signal.

## ML methods

| Method | Recommendation |
|---|---|
| Controlled taxonomy counts | Primary drift system |
| First-observed timeline | Essential |
| Jensen-Shannon divergence | Use |
| Embedding-centroid drift | Secondary signal |
| Change-point detection | Cautious use: only five time points |
| Dynamic BERTopic | Exploratory only |
| LDA topic modelling | Do not use for decisions |
| Time-series forecasting | Too little data |
| Bayesian hierarchical smoothing | Useful for conservative trend estimates |
| Survival analysis | Useful after canonicalization |

BERTopic and LDA find word clusters, not stable exam concepts. The controlled taxonomy remains authoritative.

## 2026 topic ranking and PIB signal

Do not predict individual questions. Rank topic families using:

```text
2026_topic_signal =
  0.30 × recent_PYQ_momentum
+ 0.20 × cross_tier_presence
+ 0.15 × syllabus_match
+ 0.15 × PIB_emerging_signal
+ 0.10 × government_or_legal_significance
+ 0.10 × Telangana_relevance
```

Use `evergreen_core`, `rising`, `emerging_watchlist`, and `low_evidence` labels.

Monitor, rather than assume, new criminal-law frameworks, AI/digital governance, semiconductors, 5G/public digital infrastructure, space and human spaceflight, cybercrime/police technology, climate adaptation, constitutional/legal changes, Telangana governance, and international groupings.

For PIB: classify with the same taxonomy, create an `emerging_candidate` only when no historical PYQ match exists, deduplicate into event clusters, then score recurrence, ministry diversity, official significance, syllabus fit, Telangana relevance, and historical category similarity. Rank clusters, not individual releases.

```json
{
  "emerging_topic_id": "EMG-SCI-SPACE-DOCKING",
  "candidate_label": "Spacecraft Docking Technology",
  "related_subject": "General Science",
  "related_topic": "Indian Space Programme",
  "present_in_historical_pyqs": false,
  "pib_article_count": 12,
  "distinct_event_count": 3,
  "signal_score": 0.82,
  "recommended_action": "Add as emerging sub-topic after editorial approval"
}
```

Never create new content from a single PIB article. Require recurring signal plus clear syllabus relevance.

# 5. Score Prediction and Attempt Strategy

## Official baseline

The PC notification specifies 200 questions, 200 marks, three hours, 20% negative marking for wrong answers, BC PWT qualifying marks of 25%, and BC final-written qualifying marks of 35%. It lists 7,112 vacancies, including 3,697 PC Civil vacancies, with local-area allocation rules. [PC 2026 notification](</home/naveen/Documents/TGPRB/Notifications/PC%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf>)

The SI notification specifies a PWT of 100 Arithmetic/Reasoning and 100 General Studies questions, 200 marks, three hours, 20% negative marking, BC PWT qualifying marks of 25%, and 35% in relevant final-written papers. For SI Civil, Papers III and IV contribute to final merit while Papers I and II are qualifying language papers. [SI 2026 notification](</home/naveen/Documents/TGPRB/Notifications/SI%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf>)

Qualifying marks are floors, not competitive selection cutoffs.

## Negative-marking mathematics

Let `A` be attempts, `p` the probability of correctness, `C = A × p`, and `W = A × (1 - p)`.

```text
Expected score = C - 0.2W
Expected score = A × p - 0.2 × A × (1 - p)
Expected score = A × (1.2p - 0.2)
```

The break-even expected accuracy is:

```text
1.2p - 0.2 > 0
p > 0.1667
```

The theoretical threshold is **16.67%**. Four-option random choices can have positive theoretical value, but the application must not recommend blind guessing. Time cost, OMR mistakes, ambiguity, and poor calibration matter. Use calibrated selection.

| Attempts | Accuracy | Correct | Wrong | Expected score |
|---:|---:|---:|---:|---:|
| 180 | 75% | 135 | 45 | **126.0** |
| 150 | 85% | 127.5 | 22.5 | **123.0** |

| Accuracy | Score at 150 attempts | Score at 180 attempts | Score at 200 attempts |
|---:|---:|---:|---:|
| 40% | 42.0 | 50.4 | 56.0 |
| 50% | 60.0 | 72.0 | 80.0 |
| 60% | 78.0 | 93.6 | 104.0 |
| 70% | 96.0 | 115.2 | 128.0 |
| 75% | 105.0 | 126.0 | 140.0 |
| 80% | 114.0 | 136.8 | 152.0 |
| 85% | 123.0 | 147.6 | 164.0 |
| 90% | 132.0 | 158.4 | 176.0 |

## Score simulator

```json
{
  "exam": "PC_PWT",
  "total_questions": 200,
  "negative_mark_per_wrong": 0.2,
  "subjects": [
    {"subject_id": "SUB-ARI", "available_questions": 35, "planned_attempt_rate": 0.90, "expected_accuracy": 0.82},
    {"subject_id": "SUB-REASONING", "available_questions": 30, "planned_attempt_rate": 0.88, "expected_accuracy": 0.78}
  ]
}
```

```python
def expected_score(available_questions, attempt_rate, accuracy):
    attempts = available_questions * attempt_rate
    correct = attempts * accuracy
    wrong = attempts - correct
    return correct - 0.2 * wrong

def simulate(subjects):
    return sum(
        expected_score(
            s["available_questions"],
            s["planned_attempt_rate"],
            s["expected_accuracy"],
        )
        for s in subjects
    )
```

Run 10,000 Monte Carlo simulations with `numpy.random.binomial()`. Return mean, 10th percentile, median, 90th percentile, target-clearing probability, and expected correct/wrong/skipped counts.

## Confidence and time strategy

| Confidence | Action |
|---|---|
| Certain | Attempt immediately |
| Strong | Attempt |
| Moderate | Mark for second pass |
| Weak | Attempt only after time budget is secure |
| Blind | Do not spend time |

The useful metric is calibration: if you call an answer 80% likely, are you actually correct about 80% of the time?

There are 54 seconds per question on average. For SI PWT:

| Phase | Time |
|---|---:|
| Arithmetic and Reasoning first pass | 80 to 85 min |
| General Studies first pass | 65 to 70 min |
| Marked questions | 15 to 20 min |
| OMR and final audit | 10 to 15 min |

For PC PWT, use the same three-pass structure but calibrate subject time from actual timed mocks.

Arithmetic should prioritize solvable questions. Do not spend three minutes on one calculation. Start reasoning with familiar representation frameworks. Attempt English grammar broadly only after measuring accuracy. In GS, answer immediate recall first. Telangana GK is high value but prone to false familiarity. Defer visual questions unless they are a trained strength.

## Cutoff and district issues

Do not invent a BC-B Mancherial cutoff from PYQs or unverified coaching-site tables. The correct source is official post/category/local-area selection data from comparable cycles.

What is defensible now:

- PWT BC qualifying floor: 50/200.
- PC final-written BC qualifying floor: 70/200.
- SI final-written BC qualifying floor: 35% in each relevant paper.
- These are not selection targets.
- Mancherial should not be treated as an independently known cutoff without confirming applicable local cadre and preference.
- The PC annexure lists Ramagundam Police Commissionerate rather than a separate Mancherial row. Confirm applicable local cadre through notification/application rules.
- SI effective cutoff depends on post, roster category, local status, preferences, and qualified-candidate volume.

Until official historical cutoff data is extracted, use readiness targets rather than claimed forecasts:

| Exam | Readiness target |
|---|---:|
| PC PWT | Build toward 140/200, then 150+/200 |
| PC final written | Build toward 145+/200 |
| SI PWT | Build toward 145/200, then 155+/200 |
| SI Papers III and IV combined | Build toward 300+/400, balanced by paper |

# 6. Topic-Specific Memory and Retention

Research broadly supports retrieval practice, spaced review, feedback, and interleaving. See [Roediger and Karpicke](https://pubmed.ncbi.nlm.nih.gov/26151629/) and [Dunlosky et al.](https://pubmed.ncbi.nlm.nih.gov/26173288/). The method must vary by knowledge type. Current Affairs is deliberately excluded.

## Geography

**Best technique:** blank-map retrieval plus a six-point geographic scaffold: location, origin/source, direction/extent, states/regions, connections such as tributaries/dams, and the key exam distinction.

Use labelled maps, blank-map cards, comparison tables, and high-confusion fact cards. Review on Day 0, 1, 3, 7, 14, 30, and 60. Maps are essential. Avoid memorising rivers or parks without locating them.

## History

**Best technique:** chronological story chains anchored to visible era timelines.

Use `cause -> event -> leader/authority -> outcome -> next consequence`. Build master timelines, event chains, comparison cards, and before/after cards. Review Day 0, 1, 3, 7, 14, 30, and 60. Avoid dates without meaning and role confusion. Timelines and causal arrows are high value.

## Polity and Constitution

**Best technique:** chunked legal architecture plus mnemonic number anchors.

Learn `Part -> constitutional area -> Article range -> landmark articles`. Use meaning cards, reverse-number cards, and comparison cards. Review Day 0, 2, 7, 21, 45, and 90. Avoid mixing Articles, Parts, Schedules, and Amendments. Use hierarchy diagrams where useful.

## General Science

| Area | Best technique | Review | Visuals |
|---|---|---|---|
| Biology | Process redraw and labelled diagram retrieval | Days 1, 3, 7, 14, 30, 60 | High value for systems, cycles, ecology |
| Physics | Worked examples with formula, conditions, and units | Days 1, 3, 7, 14, 28 | High value for optics, circuits, mechanics |
| Chemistry | Contrastive pair learning | Days 1, 3, 7, 14, 30, 60 | Useful for periodic table and reaction flow |

In Physics, include variable meaning, SI units, applicability conditions, and a mini-example on formula cards. In Chemistry, learn acid/base, metal/non-metal, oxidation/reduction, and other contrast pairs together. Avoid reaction lists without conditions and outcomes.

## Arithmetic

**Best technique:** deliberate mixed practice plus a personal error log.

Use formula sheets, trigger cards, and error cards. Solve 15 to 25 untimed examples Day 0, changed-value examples Day 1, mixed practice Day 3, a timed set Day 7, error-log retest Day 14, mixed PYQs Day 21, and a speed benchmark Day 45. Avoid shortcut-only learning, permanently blocked practice, and ignoring time cost. Visuals are secondary except in mensuration, ratios, and speed-distance questions.

## Reasoning and Mental Ability

**Best technique:** reusable representation frameworks plus timed pattern discrimination.

| Topic | Framework |
|---|---|
| Blood relations | Family-tree symbols |
| Direction sense | Coordinate grid with North fixed |
| Syllogisms | Venn rules |
| Seating | Position grid |
| Coding-decoding | Mapping table and rule hypotheses |
| Series | Difference, ratio, alternating-pattern checklist |
| Calendar / clock | Standard procedure |

Review Day 0, 1, 3, 7, 14, and 30. Avoid mental-only solving for visual logic, changing conventions mid-problem, and practising only familiar patterns. Visual representation is essential for directions, relations, Venn, seating, and figures.

## Telangana GK

**Best technique:** district-map pegs plus thematic history/governance chains.

```text
Spatial: district -> river/resource/park/landmark
Thematic: history -> movement -> culture -> governance -> schemes
```

Use a blank Telangana map, district comparisons, movement timeline, scheme cards with target group/department/benefit, and confusion cards. Review Day 0, 1, 3, 7, 14, 30, and 60. Avoid scheme memorisation without beneficiary/department and mixing districts. Maps, timeline, and governance flows are high value.

# 7. Content Generation from Verified PYQs

Build topic banks only from questions with `verified_topic_id` and an answer status better than `unverified_ai`. Store source paper/year, tier, answer status, explanation, difficulty, type, concept ID, duplicate group, and image.

Never present synthetic questions as real PYQs. Synthetic material is useful for rare but syllabus-important topics, arithmetic variants, changed values for repeated templates, error remediation, and controlled mock tests.

Generation workflow:

1. Select a verified taxonomy leaf.
2. Retrieve 5 to 15 real PYQs from it.
3. Extract source style: length, option count, type, difficulty, and distractor pattern.
4. Supply a verified source fact or deterministic arithmetic rule.
5. Generate question, answer, and explanation.
6. Validate unique solvability and run a style judge.
7. Label the item as synthetic.

```json
{
  "content_origin": "synthetic_practice",
  "style_reference_question_ids": ["PYQ-PC-2022-PRE-004-022"],
  "synthetic_label": "Practice question - not a real PYQ"
}
```

Reject items with unverifiable facts, multiple correct answers, no correct answer, source-inconsistent length, advanced analytical prose, unjustified obscure facts, weak distractors, or excessive similarity to a real PYQ.

Use Gemini Flash for bulk candidates, Gemini Pro for difficult quality checks, Python for arithmetic and option validation, and human review for factual or image-based synthetic content.

Use a short review explanation plus a compact teaching explanation. Avoid long textbook prose in review mode.

Convert PYQs into atomic flashcards only when knowledge is separable. Use `fact_recall`, `reverse_fact`, `comparison`, `map_label`, `formula_trigger`, `procedure_step`, `error_correction`, and `timeline_order`. Existing `ts-fsrs` scheduling should receive content only after question, answer, and topic verification.

# 8. Additional High-Value Techniques

## Personal weakness model

Track mastery at `subject -> topic -> sub-topic -> concept` using question accuracy, response time, confidence calibration, FSRS due state, last attempt, difficulty, and error category.

```json
{
  "subtopic_id": "SUBTOP-ARI-PROFIT_PERCENT",
  "mastery_score": 0.57,
  "accuracy_rolling_20": 0.65,
  "median_time_seconds": 78,
  "confidence_calibration_gap": 0.18,
  "recommended_next_action": "timed_practice_set"
}
```

Use error categories including knowledge gap, formula gap, concept confusion, calculation error, careless reading, time pressure, option-mapping error, visual interpretation error, overconfidence, and guessing error. Map these to notes/cards, formula drills, comparison cards, deliberate calculation practice, timed mini-sets, calibration feedback, or diagram practice as appropriate.

## Study scheduling, dashboard, and image bank

```text
priority =
  0.35 × PYQ_weightage
+ 0.25 × personal_weakness
+ 0.15 × forgetting_risk
+ 0.15 × exam_proximity
+ 0.10 × topic_recency_or_emergence
```

Do not let high-yield topics monopolize every day. Reserve time for low-frequency syllabus requirements, include mixed mocks weekly, use due FSRS cards as baseline, and select practice from actual errors rather than broad subject averages.

| Period | Primary work |
|---|---|
| Weeks 1-2 | Canonical registry, taxonomy v1, 800-question gold set |
| Weeks 3-5 | Bulk classification, taxonomy review, duplicate graph |
| Weeks 5-8 | Answer generation, source validation, image review |
| Weeks 7-10 | Topic banks, weightage reports, score simulator |
| Weeks 9-14 | Notes, FSRS cards, targeted practice, timed mini-mocks |
| Weeks 14-16 | Full mocks, calibration, error-driven revision, emerging-topic review |

Build dashboards for due reviews, weakest high-yield topics, score simulation, confidence calibration, topic heatmaps, repeat concepts, time-per-question, error taxonomy, PC/SI comparison, and topic drift. The due-review count should remain dominant and subject ranking should use verified PYQ weightage.

Useful motivation mechanisms are high-yield mastery progress, daily weakest-topic recovery, mock-improvement trend, time-saved progress, calibration streaks, and map/timeline recall milestones. Avoid points for opening pages, shallow streak pressure, non-comparable leaderboards, and rewards for attempts without accuracy.

Create a visual-reasoning sub-bank using `venn_diagram`, `figure_completion`, `number_pattern`, `direction_diagram`, `seating_layout`, `data_visual`, and `other_visual_reasoning`. Preserve source images, add human-verified descriptions, identify visual rules and representation methods, and offer image-first practice.

# Recommended Python and API Stack

| Need | Recommended tool |
|---|---|
| Data validation | `pydantic`, `jsonschema`, `pytest` |
| Processing | `polars`, `pandas`, `duckdb` |
| Exact duplicates | `hashlib`, `unicodedata` |
| Fuzzy matching | `rapidfuzz` |
| Local embeddings | `sentence-transformers` |
| Managed embeddings | Vertex `gemini-embedding-001` |
| Similarity search | `sklearn.neighbors`, optional `faiss-cpu` |
| Clustering | `hdbscan`, `scikit-learn` |
| Bulk LLM work | Gemini 2.5 Flash batch |
| Hard adjudication | Gemini 2.5 Pro |
| Independent judge | OpenAI or Claude selectively |
| Arithmetic validation | `sympy`, `fractions`, `decimal` |
| Statistical analysis | `scipy`, `statsmodels` |
| IRT later | `py-irt`, `pymc` |
| Charts | `plotly`, `seaborn`, `matplotlib` |
| Export | JSON, Parquet, DuckDB views |

Everything except managed LLM calls runs on a 16 GB Linux laptop. No dedicated GPU is necessary.

# Budget Recommendation

| Workstream | Estimated Vertex spend |
|---|---:|
| Classification and taxonomy review | $8 to $26 |
| Answer candidates and explanations | $24 to $97 |
| Embeddings, duplicates, pair judgments | $5 to $35 |
| Image-question processing | $2 to $12 |
| Quality evaluation and synthetic pilots | $15 to $60 |
| Evaluation, retries, experiments | $20 to $80 |
| Four-month practical total | **$74 to $310** |

This is well within the approximately $1,070 Vertex credit. Use batch jobs for non-interactive enrichment, and reserve Pro or external providers for disagreement, low-confidence, image, and evaluation cases.

# Final architecture decision

```text
Raw JSON + Extracted_Text
  -> canonical paper registry
  -> taxonomy registry
  -> Gemini structured classification
  -> duplicate and concept graph
  -> verified answer pipeline
  -> topic banks and explanations
  -> weightage / drift / score intelligence
  -> FSRS-linked practice and revision
```

No topic count, high-yield ranking, note tier, answer, or study recommendation should be treated as final until its paper provenance, taxonomy path, and validation status are recorded.
