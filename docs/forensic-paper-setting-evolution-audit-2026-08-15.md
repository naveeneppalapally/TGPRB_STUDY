# Telangana recruitment paper-setting evolution: forensic audit

Date: 2026-08-15

## Executive finding

The data supports a substantial format shift in the 2024 TGPSC Group-I preliminary paper, but it does **not** support a blanket claim that 2022-2023 TGPRB SI papers had abandoned one-liner MCQs. Group-I 2024 uses 47 statement sets in 150 questions (31.3%), against 70 direct questions (46.7%). That is a large move from the 2016-2018 police baseline, but it is not a literal takeover by statement sets. The local SI 2022 and SI 2023 GS papers remain 92.0% and 93.5% direct under the disclosed coding rule.

This distinction matters for StudyOS: 2015-2018 papers remain excellent fact and concept inventory, 2024 TGPSC is a strong complexity signal, and 2022-2023 TGPRB should not be misrepresented as proof that direct recall has disappeared.

## 0. Primary-source retrieval, ingestion and limits

The retrieval ledger is machine-readable at [`data/research/primary-source-manifest-2026-08-15.json`](../data/research/primary-source-manifest-2026-08-15.json). It records URL, access result, local checksum and confidence for every requested paper family.

The crucial provenance distinction is as follows.

| Requested material | What was inspected | Result and limit |
|---|---|---|
| TGPSC Group-I prelims, 09 June 2024 | A downloaded 52-page bilingual scan, public HTML transcription yielding 150 English stems, official Notification 02/2024, and an independently hosted key reproduction | The official candidate-login paper/key endpoint is now closed. The retained scan and key are reproductions, not official-host downloads. Page 1 was visually inspected and confirms TEST 224, booklet 218482, 150 minutes and 150 MCQs. |
| TGPSC Group-IV Paper-I, 01 July 2023 | Official Notification 19/2022, plus a public reproduction of the final key and its downloaded PDF | The old official paper/key file host is not currently reachable. The preserved reproduction identifies Paper-I and Final Master Key 22191, but it is not substituted for an official copy. |
| TGPSC DAO, 26 February 2023 | Public paper catalog and corroborating paper listing | The public catalog confirms Paper-I GS, 150 questions, 150 marks and 150 minutes. Final-key delivery was candidate-login based and not retrievable anonymously. |
| TGPSC Polytechnic Lecturer, September 2023 | Public record of master-paper/key workflow | The original candidate response/key delivery was login based. No discipline-specific final key was falsely aggregated or treated as retrieved. |
| TGPRB modern and legacy papers | Full `extracted_question_paper_json` corpus already maintained in this repository, plus recovered official key PDFs | This is the project ground-truth question text described in `AGENTS.md`. Official 2022-2023 SI/PC keys and several 2015-2016 legacy keys are now preserved under [`data/research/source-pdfs/tgprb-official-archive/`](../data/research/source-pdfs/tgprb-official-archive/) with board URLs, archive timestamps and SHA-256 values in the manifest. |

The official 2024 Group-I recruitment notification confirms the fresh Notification 02/2024, an objective preliminary test and the 150-question scheme. [TGPSC Group-I Notification 02/2024](https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJL05PVElGSUNBVElPTl9OT18wMi0yMDI0X0dyb3VwLUlfU2VydmljZXMgKDEpMjAyNDAyMjAxNDA3MzcucGRmr95v17a0y2d8i13v)

The source limit is material: this is an auditable question-format study, not a claim that every historical question-paper PDF or every final key was independently recovered from a live official host. The format analysis needs question stems, not answer keys, and no final-key answer is used to classify a stem. The recovered TGPRB keys are primary provenance for the 2022-2023 answer-key releases, while the structured question corpus remains the text source for the matrix. The TGPSC Group-I and Group-IV key PDFs preserved in [`data/research/source-pdfs/tgpsc-reproductions/`](../data/research/source-pdfs/tgpsc-reproductions/) remain explicitly labelled independent reproductions.

The recovered key set includes the SI and PC 2022 preliminary/final keys, SI and PC 2023 GS preliminary/final keys, and archived board-host legacy keys. The 2023 GS final keys are directly downloadable from the TSLPRB S3 bucket; the 2022 and legacy artifacts are byte-identical captures from archived official board URLs. Each file is text-extracted and checksum-verified in the manifest.

## 1. Empirical question-format distribution matrix

The reproducible classifier is [`scripts/research/audit_question_formats.py`](../scripts/research/audit_question_formats.py); its result is [`data/research/paper-format-audit-2026-08-15.json`](../data/research/paper-format-audit-2026-08-15.json).

Each question has one mutually-exclusive primary label. Precedence is: assertion-reason or pair-counting, matching matrix, chronology or spatial sequence, multi-statement, direct one-liner. A bare prompt such as "Which statement is correct?" remains direct unless it supplies at least two separately labelled propositions. This avoids double-counting and makes every row sum to 100%.

| Examination and year | Total | Direct 1-liner | Multi-statement | Matching matrices | Chronology/spatial | Assertion-reason/pair counting |
|---|---:|---:|---:|---:|---:|---:|
| TSLPRB Constable 2016 Prelims | 200 | 65.0% | 8.0% | 14.5% | 3.5% | 9.0% |
| TSLPRB SI 2016 Mains GS | 200 | 60.5% | 20.5% | 12.0% | 1.5% | 5.5% |
| TSLPRB Constable 2018 Mains | 200 | 77.0% | 10.0% | 6.0% | 4.5% | 2.5% |
| TSLPRB SI 2018 Mains GS | 200 | 70.5% | 11.0% | 9.5% | 3.5% | 5.5% |
| TSLPRB SI 2022 Prelims | 200 | 92.0% | 0.0% | 0.5% | 3.0% | 4.5% |
| TSLPRB SI 2023 Mains GS | 200 | 93.5% | 0.0% | 3.5% | 1.5% | 1.5% |
| TGPSC Group-I Prelims, 09 June 2024 | 150 | 46.7% | 31.3% | 10.7% | 7.3% | 4.0% |

### The actual inflection point

Across the four 2016-2018 police rows, direct questions average 68.3% and multi-statement questions 12.4%. Group-I 2024 changes that to 46.7% and 31.3%, respectively: a 21.6 percentage-point fall in direct questions and an 18.9 point rise in multi-statement questions. The practical change is not merely more facts. It is more simultaneous truth evaluation, more combinations of correct propositions, more ordered data and more linked lists.

There is no equivalent modern-TGPRB collapse in the two SI rows supplied for this audit. In fact their direct share rises. The defensible interpretation is a **TGPSC 2024 format-complexity signal plus an uncertainty warning for TGPRB 2026**, not proof that TGPRB will copy the Group-I distribution question-for-question.

## 2. Institutional reconstitution: what can and cannot be evidenced

### Evidence-supported facts

- The earlier Group-I Notification 04/2022 was cancelled; the 2024 official notification required candidates to reapply under Notification 02/2024. [Notification 02/2024](https://websitenew.tgpsc.gov.in/preview/RElSRUNUUkVDUlVJVE1FTlROT1RJL05PVElGSUNBVElPTl9OT18wMi0yMDI0X0dyb3VwLUlfU2VydmljZXMgKDEpMjAyNDAyMjAxNDA3MzcucGRmr95v17a0y2d8i13v)
- The Telangana Government's July 2024 release says the earlier Group-I process had been delayed after paper-leakage and legal issues, and describes the new preliminary examination as strictly conducted. [Telangana State Portal, July 2024](https://www.telangana.gov.in/news/press-releases/2024/07/cm-holds-a-meeting-on-group-1-group-2-and-group-3-exams/)
- M. Mahender Reddy's appointment as TGPSC chairperson was publicly reported on 25 January 2024. [Telangana Today report](https://telanganatoday.com/former-dgp-mahender-reddy-appointed-as-tspsc-chairman)
- A later official UPSC newsletter records TGPSC measures introduced from January 2024: 100% biometric capture, video monitoring of centres and strong rooms through a central command centre, and academic work involving universities/academic bodies. [UPSC 88th newsletter](https://upsc.gov.in/sites/default/files/88thNewsletterEngl-19082025.pdf)

### Claims that cannot be made from the retrieved record

No retrieved public document identifies the confidential Group-I conveners, subject experts or a named common TGPSC-TGPRB university-faculty panel. The official material supports university/academic-body involvement in TGPSC academic work. It does **not** disclose roster membership, shared membership with TGPRB, or a causal instruction that TGPSC 2024 design standards govern TGPRB papers.

Accordingly, StudyOS must not state that both boards draw from the same named faculty pool, or that TGPRB has adopted TGPSC's standard, unless a citable public order, tender, roster or sworn official statement is later added to the evidence set. The empirical paper comparison is a useful planning signal, but it is not evidence of shared confidential personnel.

## 3. Six question-pair case studies

The local question records provide the legacy wording; the downloaded and parsed Group-I 2024 source provides the modern wording. The modern SI/PC records are cross-checked against the recovered official board keys, although key PDFs contain answer mappings rather than question stems. Quotations below preserve the question numbers, stems, propositions and answer combinations. They are transcribed from the ingested question records, with typographic table layout compacted into a readable line where necessary.

### 3.1 Telangana history: Kakatiya period

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **Constable 2016 Prelims, Q167:** "Which dance form originated during the Kakatiya Period?" Options: Bharata Natyam; Perini dance; Kuchipudi dance; Kathakali dance. | **TGPSC Group-I 2024, Q79:** "Consider the following statements about religious conditions under Kakatiyas: A. Shaivism flourished. B. Jain Temples were destroyed. C. No Vaishnavacharya was mentioned in any of the inscriptions of the Kakatiya rulers. D. There was no rivalry between Shaivism and Vaishnavism in general. Which of the above statements are correct?" Options: A and B only; A, B and C only; A, B, C and D; B and D only. | Single fact recognition becomes four claims drawn from inscriptions, religion and social relations. A learner must validate each claim, not just retrieve Perini. |

### 3.2 Drainage, rivers and spatial relations

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **SI 2018 Mains GS, Q99:** "Consider the following rivers in India from North to South and identify the correct sequence: a. Mahi b. Sabarmati c. Tapi d. Luni." Options: a, b, d, c; d, b, a, c; b, d, a, c; d, b, c, a. | **TGPSC Group-I 2024, Q101:** "Match the following lift irrigation projects/barrage with the rivers: A. Mahatma Gandhi Kalwakurthy Lift Irrigation Project; B. Nizam Sagar Project; C. J. Chokka Rao Devadula Lift Irrigation Scheme; D. Chanaka-Korata Barrage. I. Godavari; II. Krishna; III. Penganga; IV. Manjeera. Choose the correct answer." Options: A-II, B-I, C-IV, D-III; A-II, B-I, C-III, D-IV; A-II, B-IV, C-I, D-III; A-I, B-II, C-III, D-IV. | Both reward spatial encoding. The newer formulation cross-links project and river instead of accepting a single north-south route. |

### 3.3 Indian polity and Constitutional articles

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **Constable 2018 Mains, Q98:** "'Casting Vote' to the Speaker of Lok Sabha is given in which Article of the Constitution?" Options: Article 100; Article 101; Article 102; Article 103. | **TGPSC Group-I 2024, Q89:** "Consider the following in relation to Article 368 of the Constitution: A. It empowers the Parliament to amend the Constitution. B. It empowers the Parliament to amend the Constitution by 2/3 majority. C. It does not empower the Parliament to amend the Fundamental Rights. D. The Parliament can amend any provisions of the Constitution except Basic Structure. Which of the above statements are correct?" Options: Only A and B are true; Only A, B and C are true; Only A, B and D are true; A, B, C and D are true. | Article-number recall becomes a doctrine-and-procedure audit. It creates traps around the scope of amendment power and the basic-structure constraint. |

### 3.4 Economy and planning

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **Constable 2018 Mains, Q105:** "In which of the following Five Year Plans, India's growth rate of agriculture exceeded the targeted growth rate?" Options: Eighth; Ninth; Tenth; Eleventh Five Year Plan. | **TGPSC Group-I 2024, Q58:** "Which of the following statements are true in relation to the Five Year Plans of India? A. One of the main objectives of the 5th Five Year Plan was 'Removal of Poverty'. B. To achieve Growth with Stability was one of the objectives of the 4th Five Year Plan. C. The focus of the 7th Plan was on Food, Work and Productivity. D. The main objective of 9th Plan was to achieve Inclusive Growth. Choose the correct answer." Options: B, C and D only; A, B and C only; A and D only; A, B, C and D. | The concept is identical, but one fact has been transformed into four chronological and objective mappings. This is the clearest evidence for a statement-evaluation gate. |

### 3.5 General science and space technology

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **Constable 2018 Mains, Q113:** "Which one of the following is an Indian Satellite sensor?" Options: LISS-II; MSS; LANDSAT; Geo Eye. | **TGPSC Group-I 2024, Q12:** "Which of the following statements about Gaganyaan are true? A. LVM-3 rocket is the launch vehicle for Gaganyaan mission. B. It consists of solid stage, liquid stage and cryogenic stage. C. It has an Orbital Module (OM) which comprises of Crew Module (CM) and Service Module (SM). D. It envisages demonstration of human space flight capabilities by launching crew of 5 to the Earth's orbit at 500 kilometers. Choose the correct answer." Options: A, B and C only; B and C only; A and B only; B and D only. | The space domain moves from one identifier to vehicle, architecture and mission-specification validation. The wrong crew-size/range detail is the designed near-miss. |

### 3.6 Environment and environmental policy

| Legacy formulation | Modern formulation | Forensic shift |
|---|---|---|
| **Constable 2016 Prelims, Q67:** "Match the following: A. Ganga Action plan; B. Air (Prevention and Control of Pollution) Act; C. Environment (Protection) Act; D. Water (Prevention and Control of Pollution) Act. I. 1986; II. 1974; III. 1985; IV. 1980; V. 1981." | **TGPSC Group-I 2024, Q41:** "Match the following Acts/Rules in India with respect to their year of passing: A. Forest (Conservation) Act; B. National Green Tribunal Act; C. Wild Life (Protection) Act; D. Hazardous Wastes (Management, Handling and Transboundary Movement) First Amendment Rules; E. Biological Diversity Act. I. 2010; II. 2016; III. 2002; IV. 1972; V. 1980; VI. 2020. Choose the correct answer." Options: A-V, B-I, C-IV, D-III, E-VI; A-I, B-IV, C-V, D-III, E-II; A-VI, B-V, C-IV, D-II, E-III; A-V, B-I, C-IV, D-II, E-III. | The newer item grows the taxonomy from four to five items, adds a rule amendment and asks a denser policy timeline. It reduces safe option elimination. |

### 3.7 Modern TGPRB countercheck: eight verbatim 2022-2023 stems

The requested modern police papers are essential evidence because they test the generalisation. These are verbatim stems and options from the ingested SI 2022 Prelims and SI 2023 Mains GS records. Six are direct recall, one is a chronology item and one is a matching matrix. They corroborate the direct-majority classifications in the distribution matrix and show why the Group-I pattern cannot be attributed to TGPRB without a released TGPRB paper showing it.

| Question | Verbatim text | Format implication |
|---|---|---|
| **SI 2023 Mains GS, Q13** | "Which of the following River is also known as 'Iravati'?" Options: Jhelum; Chenab; Ravi; Beas. | Direct geography recall. |
| **SI 2023 Mains GS, Q17** | "In February 2023, ISRO carried out the first successful launch using its new rocket." Options: Small Satellite Launch Vehicle; Geo Synchronous Satellite Launch Vehicle; Polar Satellite Launch Vehicle; Scramjet Engine-TD. | Direct current-science recall. |
| **SI 2023 Mains GS, Q126** | "In Indian constitution, 'There shall be a council of ministers with prime minister at the head to aid and advice the President' is mentioned in ______ article." Options: 73; 74; 75; 76. | Direct Article recall. |
| **SI 2023 Mains GS, Q155** | "Which association was formed in the year 1997 to speed up the separation movement in the second phase?" Options: Telangana students forum; Telangana Aikya vedika; Telangana Intellectuals forum; Telangana journalist guild. | Direct Telangana-history recall. |
| **SI 2023 Mains GS, Q173** | "The value of Information Technology and ITeS exports from Telangana for the Financial Year 2022-2023 is about" Options: Rs. 80,000 Crores; Rs. 2.5 Lakh Crores; Rs. 1.82 Lakh Crores; None of the above. | Direct numerical current-affairs recall. |
| **SI 2023 Mains GS, Q171** | "Match the following organisations according to the year of their foundation. (A) Centre for Telangana studies (B) Telangana Prajasamithi (C) Telangana Students Forum (D) Telangana Forum (i) August, 1997 (ii) Nov, 1996 (iii) 1989 (iv) 1991." Options: A-IV, B-III, C-I, D-II; A-III, B-I, C-IV, D-II; A-IV, B-I, C-III, D-II; A-I, B-II, C-III, D-IV. | The comparatively rare 4x4 matching format. |
| **SI 2022 Prelims, Q151** | "Which part of the Constitution deals with Amendments?" Options: XXI; XXII; XX; IX. | Direct Constitutional-structure recall. |
| **SI 2022 Prelims, Q177** | "Arrange the following events related to Telangana Movement in Chronological order: (a) Telangana Vidrohadinam (b) Bhuvanagiri Declaration (c) Namaste Telangana daily was launched (d) Sagaraharam." Options: a, c, d, b; b, c, d, a; a, b, c, d; d, b, a, c. | A distinct sequence item, not evidence that statement-set questions dominate. |

## 4. Trap architecture and the 20% penalty

The paper examples demonstrate three recurring mechanisms.

1. **Entity swapping.** Article 368 versus Article 100, river-project links, and names/years in matching matrices are built from near neighbours. A student who recognizes only the broad chapter is exposed.
2. **Combination and pair counting.** Four propositions with options such as "A, C and D only" block ordinary one-option elimination. Logical statement-assumption and statement-conclusion items do the same in the reasoning part of SI prelims.
3. **Temporal and numerical near-misses.** Group-I 2024 combines 2022-23 data, budget figures, dates and targets. The wrong choice often changes one year, amount, office-holder or technical specification while preserving the topic's surface familiarity.

The recovered TGPRB keys also show why answer-key hygiene must be a separate StudyOS data layer. The SI 2022 final key marks deleted questions as `D*` and states that a zero in the correct-answer field awards marks to candidates who selected no option. The PC and SI 2023 GS final keys likewise mark deleted questions as `D`. These are official post-exam corrections and scoring instructions, not evidence that the underlying paper used more multi-statement formats. Store them as key revisions and never silently overwrite the question stem or its original option structure.

For the SI 2026 preliminary objective test, the official notification states that a wrong or otherwise invalid bubble attracts a negative mark of 20% of full marks; a blank gets zero. [`SI (Civil et al) 2026 Notification`](../Notifications/SI%20(Civil%20et%20al)%202026%20Notification%20dated%2029-07-2026.pdf) at the written-test marking rule. With +1 and -0.2 scoring, an attempt has positive expected value only above a 16.7% probability of being correct. That mathematical threshold is not a license to guess: statement-combination options are correlated, so a learner's subjective confidence can be badly miscalibrated.

## 5. Actionable StudyOS architecture for 2026

### PYQ dual-stratification rule

| Layer | Input papers | Product role |
|---|---|---|
| Fact and concept inventory | TSLPRB 2015-2018 | Extract atomic facts, source links, distractor families, maps, timelines and high-frequency concepts. |
| Format and complexity blueprint | TGPSC Group-I 2024 plus TSLPRB 2022-2023 | Model multi-statement, matching, ordering, assertion-reason and statement-inference formats. Do not claim the SI 2022-2023 distribution is already TGPSC-like. |
| Calibration layer | 2026 notification and future official TGPRB papers | Apply the actual marking penalty, current syllabus and only verified released format changes. |

### Question-modernization engine

1. Start with a verified legacy fact and preserve its original paper, year and question number.
2. Gather three independently sourced neighbouring facts from the same learning object. Label source and data year for volatile statistics.
3. Produce one explicit **practice** multi-statement item with two to four propositions, never label it a PYQ.
4. Give every proposition a truth value, one-line evidence and a distractor role: entity swap, date swap, scope reversal or causal reversal.
5. Generate at least one changed-value or changed-entity variant. For spatial topics use ordered map labels and project-river/district pairs.
6. Keep a one-fact direct recall card and a higher-order statement gate as separate records. The gate unlocks content; it is not an FSRS review item.
7. Require a reviewer check on all synthetic statement sets before publication, especially statistics, constitutional articles and current affairs.

### Top ten preparation rules

1. Learn the legacy fact base first. A complex question cannot be solved by format tactics without its underlying facts.
2. For every topic, maintain a statement ledger: claim, truth value, source, date and nearest confusable neighbour.
3. Practise exact option-combination reading. Evaluate A, B, C and D independently before looking at answer combinations.
4. Convert article learning into Part, Article, rule, exception and case link, not a flat article-number list.
5. Build river and Telangana-project knowledge as bidirectional maps: river to project and project to river.
6. Use timelines for Five Year Plans, Acts, movements, awards and scheme launches. Rehearse both chronology and reverse chronology.
7. For every current statistic, attach its source year. Treat an un-dated number as untrusted.
8. Use official sources for current affairs and policy updates. Keep practice questions visibly marked as synthetic.
9. Use a three-state attempt decision: know, eliminable with evidence, or leave. Never convert uncertainty into an automatic guess.
10. After each mock, log the failure mode: missing fact, entity swap, date/number near-miss, option-combination error or careless reading. Retest the failure mode in a changed format.

## Audit conclusion

The strongest verified platform implication is not "all new TGPRB papers are TGPSC Group-I papers." It is a controlled dual system: retain the police PYQ fact inventory and add TGPSC-grade statement, matching and sequence drills to make that inventory robust under a harder format. The report deliberately leaves the confidential-panel hypothesis unproven and keeps the historical-key retrieval limitation visible.
