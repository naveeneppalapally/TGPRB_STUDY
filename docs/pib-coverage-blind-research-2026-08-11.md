# Blind research: PIB coverage strategy for TSLPRB current affairs

Date: 2026-08-11

## Scope and evidence standard

This is an evidence-first audit of the files supplied for this task. It does not use `Deep_Analysis.txt`, draft topic-bank tags, or a prior current-affairs conclusion as a source of counts.

Evidence read:

- `data/pyq_master_catalog.json`: 3,129 unique question stems and 4,983 source-paper occurrences.
- `data/pyq_enriched_master.json`: a live, incomplete snapshot of 260 enriched rows at `2026-08-11T12:51:06.494Z`.
- `workers/scrapy-pib/pib_master_2025_2026.db`: 26,699 full-text PIB releases from 2025-01-01 through 2026-08-10.
- The 2026 PC notification: PWT is 200 objective questions and the final written syllabus explicitly includes current national and international events.

Important limitation: the enriched file is not the claimed complete enrichment of the master catalog. It changed from 110 to 260 rows while this audit ran. Therefore, a subject or topic count over all 3,129 questions would be fabricated. Under the repository rule that only verified topic assignments count, the only defensible whole-corpus result is **insufficient PYQ evidence** until enrichment is completed and topic verification exists for every row.

The current-affairs category evidence below is a strict event-dependent reading of the catalog. A question was counted only when its answer depends on a then-recent appointment, award, result, report, policy event, launch, office-holder, or Telangana event. Static background knowledge that happens to include a date was excluded.

## 1. PYQ frequency and data integrity

### 1.1 Catalog integrity

| Measure | Exact result | Consequence |
|---|---:|---|
| Unique master questions | 3,129 | Correct denominator for a unique-question analysis. |
| Total source occurrences | 4,983 | Do not add these to topic counts: questions recur across files. |
| Enriched rows available | 260 | Only 8.3% of the catalog has a subject and topic in the supplied file. |
| Verified-topic field in supplied enrichment | 0 | Tiering all topics is not valid yet. |
| Unique sources in catalog | 25 | Several are duplicate or mislabelled paper versions. |

The source files demonstrably overlap. For example, `Constable_2015_Prelims.json` shares 177 unique questions with `Constable_2016_Mains.json` and 172 with `Constable_2016_Prelims.json`; the three SI 2016 GS-labelled versions each share 175 questions. The source filename alone therefore cannot establish an independent exam-year denominator.

### 1.2 Subjects in the available enrichment snapshot

This is a partial-snapshot table, not a claim about all 3,129 questions.

| Rank | Subject | Classified rows | Share of 260 |
|---:|---|---:|---:|
| 1 | Arithmetic | 48 | 18.5% |
| 2= | English | 39 | 15.0% |
| 2= | Science and Technology | 39 | 15.0% |
| 4 | Telangana | 36 | 13.8% |
| 5 | Reasoning | 35 | 13.5% |
| 6 | Geography | 22 | 8.5% |
| 7 | History | 19 | 7.3% |
| 8 | Polity | 15 | 5.8% |
| 9 | Economy | 7 | 2.7% |

The zero for Economy means "not yet enriched", not "not tested". It must not be used to rank subjects or to set application weightage.

### 1.3 Topics in the available enrichment snapshot

| PYQ band | Topic ID and topic | Count | Status |
|---|---|---:|---|
| 10+ | `REA-VERBAL` Verbal Reasoning and Logical Deductions | 33 | partial snapshot |
| 10+ | `TEL-HIS-CULTURE` Telangana History and Culture | 23 | partial snapshot |
| 10+ | `TEL-MOVEMENT` Telangana Armed Struggle and Statehood Movement | 11 | partial snapshot |
| 10+ | `ARI-COMMERCIAL-MATH` Commercial Arithmetic | 27 | partial snapshot |
| 10+ | `ENG-VOCAB-COMP` Vocabulary and Reading Comprehension | 24 | partial snapshot |
| 10+ | `ENG-GRAMMAR` English Grammar and Usage | 15 | partial snapshot |
| 10+ | `ARI-SPEED-WORK-MENS` Speed, Work and Mensuration | 14 | partial snapshot |
| 10+ | `SCI-PHY` Physics | 13 | partial snapshot |
| 10+ | `SCI-BIO` Biology and Life Sciences | 10 | partial snapshot |
| 5-9 | `HIS-ANCIENT` Ancient India and Culture | 10 | partial snapshot |
| 5-9 | `SCI-CHEM` Chemistry | 9 | partial snapshot |
| 5-9 | `GEO-AGRI-MINERAL` Agriculture, Minerals and Transport | 9 | partial snapshot |
| 5-9 | `ARI-NUMBER-MATH` Number System and Basic Math | 7 | partial snapshot |
| 5-9 | `SCI-TECH-SPACE` Science, Technology, Space and Defence | 7 | partial snapshot |
| 5-9 | `GEO-ENV` Forests, Wildlife and Environment | 7 | partial snapshot |
| 5-9 | `ECO-FISCAL-SCHEMES` Public Finance, Budget and Central Schemes | 7 | partial snapshot |
| 5-9 | `HIS-MEDIEVAL` Medieval India | 6 | partial snapshot |
| 5-9 | `POL-JUDICIARY-BODIES` Judiciary and Constitutional/Statutory Bodies | 5 | partial snapshot |
| 5-9 | `POL-UNION-EXEC-LEG` Union Executive and Legislature | 5 | partial snapshot |
| 1-4 | `GEO-PHY` Physical Geography and Geomorphology | 5 | partial snapshot |
| 1-4 | `HIS-MODERN-MOV` Modern India and National Movement | 3 | partial snapshot |
| 1-4 | all other classified topic IDs | 1-2 each | partial snapshot |

No Tier-1, Tier-2, or Tier-3 content decision should be made from this table. It only records the current state of the supplied enriched file.

### 1.4 Strict current-affairs taxonomy

After collapsing duplicate paper versions, the strict register contains **154 event-dependent questions**. The categories total 154, so each question has one primary category only. This avoids double-counting a Telangana sports result as both Telangana and sport.

| Rank | Primary category | Questions | Share | Example catalog evidence |
|---:|---|---:|---:|---|
| 1= | Appointments and office-holders | 22 | 14.3% | Governors, CJI, Solicitor General, Union Environmental Secretary, Rajya Sabha Chairperson. |
| 1= | International events, summits and foreign affairs | 22 | 14.3% | BRICS, G7, SCO, New Development Bank, UPI-PayNow, COP-28. |
| 3 | Economy, data, reports and corporate events | 18 | 11.7% | World Competitiveness Index, RBI inflation target, HDFC merger, start-up funding. |
| 4 | Awards and honours | 16 | 10.4% | Padma, Jnanpith, Pulitzer, Raja Rammohan Roy, awards matching. |
| 5 | Sports results and athletes | 15 | 9.7% | Nikhat Zareen, Border-Gavaskar Trophy, ICC U-19 Women's World Cup, Hyderabad E-Prix. |
| 6 | Telangana-specific events | 14 | 9.1% | Telangana budget, IT/ITeS exports, DHRUVA, Buddhavanam, local industry. |
| 7 | Government schemes, policy and infrastructure | 13 | 8.4% | PM-JAY, PM-KISAN, NILP, Smart Cities, Char Dham. |
| 8 | Defence and security | 10 | 6.5% | BrahMos, IAF, DRDO, Aero India, exercises, procurement. |
| 9 | Judiciary, law and commissions | 7 | 4.5% | High Court, NJAC, commissions, Supreme Court decisions. |
| 10 | Science and space | 6 | 3.9% | SSLV, GSAT, Indian Science Congress, policy. |
| 11 | Books and literary events | 5 | 3.2% | author-title and recent literary awards. |
| 12 | Environment and disasters | 4 | 2.6% | Cyclone Asani, environmental indices, observances. |
| 13 | Polity and elections | 2 | 1.3% | Rajya Sabha poll vacancy and related current polity. |

Categories with at least three questions are all retained in the design. This includes Books and Environment, despite their lower volume.

### 1.5 Current affairs by exam year

The supplied catalog does not have an independent `exam_year` field and its source filenames contain demonstrable duplicate and mislabelled versions. A precise all-years count is therefore insufficiently evidenced. The safe conclusion is qualitative:

| Source period | Observed result |
|---|---|
| 2015-16-labelled papers | The catalog contains appointments, international events, awards, sports, schemes, judiciary, and defence questions. Files share large duplicate blocks, so the variants cannot be summed. |
| 2018-labelled papers | The catalog includes 2018 and 2019-dated event questions, including reports, summits, sports, awards, schemes, defence, space and current office-holders. Filenames are not a reliable exam date. |
| 2022 | Both the Constable and SI sources contain direct current-event questions, including Nikhat Zareen, PM-JAY, BrahMos, SCO, NDB and Cyclone Asani. |
| 2023 | The Constable and SI GS sources contain the densest visible cluster of direct current-event questions: India Space Policy, NILP, state budget, SSLV, UPI-PayNow, E-Prix, Padma, appointments and reports. |

For a publication-quality "current versus static by year" table, add a checked paper manifest with `paper_id`, actual exam date, paper type, and duplicate-group ID. Do not infer it from file names.

## 2. Current-affairs source taxonomy

The master catalog stores questions and options, not a link to the contemporary press release which supplied the fact. Thus "likely PIB ministry" below is a source family determined by the entity in the question, not a claim of a verified original publisher. A question is marked **non-PIB primary** when its own event type lacks a central PIB issuer.

| Category | Count | Typical fact asked | Evidence entities from the catalog | Primary source family | PIB status |
|---|---:|---|---|---|---|
| Appointments | 22 | person-post, state-post, office-holder | Governors, DGs, Attorney General, CJI, Chairperson Rajya Sabha, Solicitor General | President's Secretariat, DoPT, Cabinet Secretariat, department or constitutional body | mixed |
| International | 22 | host, member, agreement, visiting leader | BRICS, G7, SCO, NDB, COP-28, UPI-PayNow | MEA, international organisation | mixed |
| Economy/reports | 18 | rank, rate, figure, merger | World Competitiveness Index, ILO report, RBI inflation, HDFC merger, start-up funding | Finance, MoSPI, RBI, Commerce, report publisher | mixed |
| Awards | 16 | awardee-award-year | Padma, Jnanpith, Pulitzer, Freedom of City of London, Raja Rammohan Roy | Culture, I&B, Sports, award body | mixed |
| Sports | 15 | winner, medal, player-sport, venue | Nikhat Zareen, ICC, Border-Gavaskar, Australian Open, Hyderabad E-Prix | Sports Ministry/SAI, federation, event organiser | mostly non-PIB primary |
| Telangana | 14 | state scheme, amount, location, project, portal | Buddhavanam, DHRUVA, Telangana budget, IT/ITeS exports, T-Hub/industry | Telangana State Portal and department | non-PIB primary |
| Schemes/infrastructure | 13 | launch date/place, benefit, nodal body | PM-JAY, PM-KISAN, NILP, Smart Cities, Char Dham | respective central ministry | PIB suitable |
| Defence | 10 | platform, exercise, service, agreement, location | BrahMos, IAF, DRDO, GSAT, Aero India, Exercise Rahat | Ministry of Defence, DRDO, service HQ | PIB suitable |
| Judiciary | 7 | judgment, court, commission, office | NJAC, High Court, OBC commission, Social Justice Bench | Supreme Court, DoJ, Law Ministry | non-PIB primary/mixed |
| Science/space | 6 | vehicle, mission, policy, institution | SSLV, GSAT-11, Indian Science Congress, Space Policy | ISRO/Department of Space, DST, CSIR | PIB suitable |
| Books/literary | 5 | author-title, literary honour | recent author-title pairs, William E. Colby | award body, publisher | mostly non-PIB primary |
| Environment/disasters | 4 | cyclone/state, index, event | Cyclone Asani, EPI, ozone and habitat observances | MoEFCC, IMD, NDMA, report body | mixed |
| Elections/polity | 2 | current electoral event | Rajya Sabha vacancies | Election Commission | PIB supplementary |

The repeated entities and event forms are appointments/office-holders, award-awardee-year, result-winner-venue, report-rank-figure, summit-host-members, scheme-launch-benefit, named defence platform/exercise, and Telangana amount/location/portal. Those are the mandatory retrieval forms, not generic headlines.

## 3. Ministry priority matrix

The priority is derived from the 154-question category counts. It is a source-priority matrix, not a claim that every fact was published by a named ministry.

| Tier | Source family | PYQ evidence | Raw PIB coverage | Decision |
|---|---|---:|---:|---|
| 1 | Appointment issuers: President's Secretariat, DoPT/Personnel, PMO, Cabinet Secretariat and relevant department | 22 appointments | President 433, Personnel 511, PMO 3,057; DoPT label 0 | Retain all appointment event triggers. Repair the missing DoPT identity rather than treating Personnel volume as sufficient. |
| 1 | MEA and official international bodies | 22 international | MEA label 2 | Critical gap. PIB alone is not a viable international feed in this archive. Add MEA's own feed as a primary source. |
| 1 | Finance, MoSPI, RBI, Commerce, official report issuer | 18 economy/report | Finance 710, MoSPI 364, Commerce 861, RBI label 0 | Retain PIB Finance/MoSPI/Commerce and add RBI directly. |
| 1 | Culture, I&B, Sports Ministry, award bodies and federations | 16 awards plus 15 sports | Culture 593, Youth Affairs and Sports 447; Sahitya Akademi and SAI labels 0 | PIB covers part of the cluster only. Award bodies and sports federations remain necessary. |
| 1 | Telangana State government | 14 Telangana | no Telangana publisher in PIB corpus | Manual state feed is mandatory, not optional. |
| 1 | Respective scheme and infrastructure ministry | 13 schemes | broad coverage across central ministries | Accept only a named scheme, launch, budget, beneficiary, location, or measurable output. |
| 2 | Ministry of Defence, DRDO and service HQ | 10 defence | Defence 1,572 | Well represented. Use high-precision named-platform/exercise triggers. |
| 2 | Supreme Court, DoJ and Law Ministry | 7 judiciary | Law 324; Supreme Court label 0 | Add Supreme Court releases. PIB Law is supplementary. |
| 2 | Department of Space/ISRO and DST/CSIR | 6 science/space | Department of Space 138, Science and Technology 1,021; ISRO label 0 | Well represented by Department of Space but still add ISRO's direct release archive. |
| 3 | Literary bodies/publishers | 5 books | Sahitya Akademi label 0 | Use direct award-body sources, not broad general news. |
| 3 | MoEFCC, IMD, NDMA and report bodies | 4 environment/disasters | MoEFCC 475, Earth Sciences 288 | Keep category. Use named cyclone, index, protected-area, species and official report triggers. |
| Monitor | Election Commission | 2 elections/polity | Election Commission 185 | Keep low-volume, event-specific monitoring. |

There is insufficient PYQ evidence to place any other PIB ministry in a blanket skip list. A low-volume ministry can still issue a high-value appointment, scheme, award or infrastructure release.

## 4. PIB archive coverage and gaps

### 4.1 What is present

The raw database holds 26,699 releases across 587 dates, 86 distinct ministry labels, and no empty article text. The following high-yield publishers are materially represented:

| Publisher label in raw data | Articles |
|---|---:|
| Prime Minister's Office | 3,057 |
| Ministry of Defence | 1,572 |
| Ministry of Science and Technology | 1,021 |
| Ministry of Commerce and Industry | 861 |
| Ministry of Home Affairs | 851 |
| Ministry of Finance | 710 |
| Ministry of Culture | 593 |
| Ministry of Personnel, Public Grievances and Pensions | 511 |
| Ministry of Environment, Forest and Climate Change | 475 |
| Ministry of Youth Affairs and Sports | 447 |
| President's Secretariat | 433 |
| Ministry of Statistics and Programme Implementation | 364 |
| Ministry of Law and Justice | 324 |
| Ministry of Earth Sciences | 288 |
| Election Commission | 185 |
| Department of Atomic Energy | 173 |
| Department of Space | 138 |

### 4.2 Confirmed publisher-label gaps

| High-yield source named by the PYQ taxonomy | Raw rows with matching publisher label | Interpretation |
|---|---:|---|
| Ministry of External Affairs | 2 | Severe under-coverage for a 22-question category. |
| Reserve Bank of India | 0 | Not an obtainable PIB substitute. Ingest RBI directly. |
| Supreme Court | 0 | Not an obtainable PIB substitute. Ingest Supreme Court releases directly. |
| Department of Personnel and Training | 0 | The broader Personnel Ministry label exists, but DoPT-specific routing is absent. |
| Sahitya Akademi | 0 | Add direct literary-award source. |
| Sports Authority of India | 0 | Add direct sports authority/federation source when needed. |
| Indian Space Research Organisation | 0 | Department of Space provides 138 rows, but ISRO's own archive should be added for mission detail. |

"Zero" describes the raw publisher field, not proof that the organisation released no information during the period.

### 4.3 Processing risk in the current scraper

The raw archive averaged 45.5 releases per date, and 386 of 587 dates have more than 30 releases. The existing processing loop slices the archive list with `releases[:max_per_day]`, where the default maximum is 30, before category classification. At minimum, **10,935 raw rows occur beyond that daily cap**. Because the archive ordering has no priority sort, any of them can be silently omitted, including a Tier-1 source.

This is a proven ingestion coverage risk, not a claim that a specific release was rejected. The current data has no accept/reject ledger linking a raw PRID to a produced card, so individual incorrect filtering cannot be determined retrospectively.

Required repair: fetch and store all releases first, run deterministic title/body triage on all of them, then apply daily output quotas after scoring and deduplication.

## 5. Rejection filter derived from raw titles

### 5.1 Observed title patterns

The counts below come from `lower(title)` matches in all 26,699 raw rows. Terms overlap, so they must not be added together.

| Title pattern | Rows | Safe action |
|---|---:|---|
| `greetings` | 158 | Reject when it is solely a ceremonial greeting. |
| `year end review` or `year-end review` | 56 | Default-reject as a broad roundup, but route to review when a mandatory trigger identifies a unique fact. |
| `tender` | 10 | Hard reject if it is a procurement notice. |
| `e-auction` or `auction` | 99 | Hard reject if procurement/disposal. |
| `bid` | 13 | Hard reject only for bid invitation/submission/timeline. |
| `request for proposal` or `expression of interest` | 2 | Hard reject. |
| `condolence`, `condolences`, `obituary`, or `demise` | 65 | Do not blanket-reject. A recent death can be directly testable, as shown by the catalog's Mukarram Jah question. Queue for entity check. |
| `workshop` | 384 | Do not blanket-reject. Some can contain a named launch, agreement, award or report. |
| `visit` | 760 | Do not blanket-reject. A diplomatic visit or signed agreement can be testable. |
| `press conference` | 20 | Do not blanket-reject. It may announce a report, budget, result or agreement. |

The safe hard-reject expression is therefore intentionally narrow: `notice inviting tender`, `invites bids`, `bid submission`, `e-auction`, `auction notice`, `request for proposal`, `expression of interest`, and a greeting-only title. Other patterns become a score penalty or human-review signal rather than an automatic rejection.

### 5.2 Skip-ministry list

**None.** The data supports prioritising publishers but not permanently suppressing any ministry. A ministry with no direct historical-category match can still issue a named scheme, appointment, award, defence project or infrastructure inauguration. A title-level hard filter plus evidence-weighted score is safer and complies with the requirement not to exclude a category with at least three PYQs.

## 6. Telangana source map

The enriched snapshot contains 36 Telangana rows: 23 History and Culture, 11 Statehood Movement, and 2 State Geography/Economy/Schemes rows. Those are mostly static content and belong in notes and flashcards, not the current-affairs pipeline. The master catalog also visibly contains current Telangana facts about budget, IT/ITeS exports, a Life Sciences figure, state portals, local inaugurations, TGSRTC, tourism recognition, sports and local industry.

| Telangana PYQ cluster | PIB coverage | Manual primary source | Verified URL and use |
|---|---|---|---|
| State schemes, launches, inaugurations, local projects and Cabinet events | Not reliable | Telangana State Portal press releases | [Press releases](https://www.telangana.gov.in/news/press-releases/) has current state releases. |
| Budget, allocations, fiscal figures and departmental grants | Not reliable | Telangana State Portal budget | [Budget 2026-27](https://www.telangana.gov.in/budget-2026-2027/) publishes financial statement, grants and detailed estimates. |
| Government order, notification and legally operative policy detail | Not reliable | Telangana Government Orders | [Government Orders](https://www.telangana.gov.in/government-orders/) links the state's GO repository. |
| IT/ITeS exports, T-Hub, digital portals, technology investment and Life Sciences/industry facts | Not reliable | IT, Electronics and Communications Department | [IT, E&C Department](https://www.telangana.gov.in/Departments/Information-Technology-Electronics-and-Communications/) is the state portal's official department page and identifies the department site. |
| Police initiatives, DGP events, operations, awards and appointments | No | Telangana Police | [Telangana Police](https://www.tspolice.gov.in/) is the official state police site and exposes latest news and the DGP desk. |
| TGSRTC events and operational announcements | No | TGSRTC | [TGSRTC](https://www.tgsrtc.telangana.gov.in/) is the official corporation site. |
| State tourism awards, heritage, tourism policy and local destination facts | Partial at best | Telangana Tourism | [Telangana Tourism](https://www.tourism.telangana.gov.in/) is the official tourism corporation site. |
| Recruitment-notice facts relevant to the student experience | No | Telangana Police Recruitment Board | [TGPRB](https://www.tgprb.in/) is the current official recruitment portal. |

Use the state sources for current facts only. Telangana history, culture, movement chronology, dynasties, historical agreements and historical geography are not current affairs and must remain static note/flashcard content.

## 7. PIBSmartScraper architecture

```python
class PIBSmartScraper:
    PYQ_COUNTS = {
        "appointments": 22, "international": 22, "economy": 18,
        "awards": 16, "sports": 15, "telangana": 14,
        "schemes": 13, "defence": 10, "judiciary": 7,
        "science": 6, "books": 5, "environment": 4, "elections": 2,
    }

    def run_day(self, day: date) -> list[CurrentAffair]:
        raw = self.fetch_all_releases(day)             # never slice to 30
        stored = [self.normalize(r) for r in raw]
        self.raw_store.upsert_many(stored)             # PRID, URL, title, body, publisher, timestamps

        candidates = []
        for article in stored:
            triage = self.title_triage(article.title)
            if triage.hard_reject:
                self.ledger.reject(article.prid, triage.reason)
                continue

            signals = self.extract_only_from_source(article)
            category = self.classify_with_pyq_taxonomy(article, signals)
            score = self.quality_score(article, category, triage, signals)
            if score < 45:
                self.ledger.reject(article.prid, "low-evidence-score")
            elif score < 60 or signals.ambiguous:
                self.review_queue.add(article, category, score)
            else:
                candidates.append(self.to_event(article, category, signals, score))

        canonical = self.event_deduplicate(candidates)
        output = [x for x in canonical if self.within_retention(x.event_date)]
        self.publish_cards(output)                     # only after all scoring and dedupe
        return output

    def title_triage(self, title: str) -> Triage:
        low = normalize(title)
        if any(term in low for term in PROCUREMENT_HARD_REJECTS):
            return Triage(hard_reject=True, reason="procurement")
        if is_greeting_only(low):
            return Triage(hard_reject=True, reason="ceremonial-greeting")
        return Triage(review_penalty=has_broad_roundup_marker(low))

    def event_deduplicate(self, events: list[Event]) -> list[Event]:
        # First exact stable identity, then fuzzy near-duplicate check.
        groups = group_by(events, key=lambda x: x.event_key)
        groups = merge_if_same_named_entities_and_action(
            groups,
            date_window_days=14,
            title_similarity=0.88,
        )
        return [choose_canonical(group) for group in groups]
```

### Filtering stages

1. Preserve every raw PRID and its triage decision in a ledger. This makes a later coverage audit possible.
2. Hard-reject only title patterns proven to be procedural procurement or a greeting-only message.
3. Extract named entities, action, event date, place, agency and numbers from the source text only.
4. Require at least one PYQ-supported category and one direct testable fact.
5. Score all candidates before any daily cap. A cap, if necessary, selects the highest scoring distinct events, never the first archive entries.
6. Deduplicate by event, preserving all source URLs but publishing one canonical study card.
7. Send uncertain category, event date, named entity and possible duplicate matches to a human-review queue.

### Event key

`event_key = CATEGORY | NORMALIZED_PRIMARY_ENTITY | ACTION | EVENT_DATE_OR_PUB_DATE`

Examples:

- `DEFENCE|BRAHMOS|EXPORT-AGREEMENT|2022-01-28`
- `SCIENCE|SSLV|FIRST-SUCCESSFUL-LAUNCH|2023-02-10`
- `AWARDS|PADMA-AWARDS|RECIPIENT-ANNOUNCEMENT|2026-01-25`

Use source-extracted values only. If the event date is absent, use publication date and mark `event_date_precision: "publication_date"`. Never let a model invent an event date. On collision, retain the highest-authority primary source, earliest directly relevant release, and all corroborating URLs.

## 8. Quality scoring rubric

The category component is proportional to the 154-question strict taxonomy: `round(40 * category_questions / 22)`. The maximum category evidence is 40 points because the two highest categories each have 22 questions.

| Component | Points | Rule |
|---|---:|---|
| Category evidence | 4-40 | Appointments and International 40; Economy 33; Awards 29; Sports 27; Telangana 25; Schemes 24; Defence 18; Judiciary 13; Science 11; Books 9; Environment 7; Elections 4. |
| Direct exam fact | 0-25 | Named person-place-post, award-awardee-year, result-winner-venue, report-rank-figure, launch-platform-date, scheme-benefit or Telangana amount/location. No precise fact means zero. |
| Source authority | 0-15 | 15 for primary official issuer, 8 for official government cross-post, 0 for an unverified secondary source. |
| Recency | 0-10 | 10 for event within 180 days, 6 for 181-365 days, 0 when older. Keep the configured one-year window. |
| Novelty and distinctness | 0-10 | 10 for a new, single event with a stable identity; 0 for a duplicate or a generic roundup. |

Decision thresholds:

- 60-100: accept if the direct fact and source URL pass validation.
- 45-59: human review.
- 0-44: reject with a ledger reason.

This rubric retains every PYQ-supported category. It prevents a prolific but generic publisher from outranking a low-volume, exact event such as an award, court release, RBI decision or Telangana budget figure.

## 9. Mandatory trigger vocabulary

These triggers are derived from named fact forms seen in the strict taxonomy. A trigger is an inclusion cue, not automatic acceptance: the article still needs a direct source-supported fact and a score of at least 60.

| Category | Mandatory triggers |
|---|---|
| Appointments | `appointed`, `assumes charge`, `elected`, `resigns`, `steps down`, `governor`, `chairperson`, `chairman`, `secretary`, `director general`, `solicitor general`, `chief justice`, `chief executive officer` |
| International | `summit`, `BRICS`, `G7`, `G20`, `SCO`, `New Development Bank`, `COP`, `bilateral`, `agreement`, `memorandum of understanding`, `PayNow`, `UPI`, `chief guest` |
| Economy/reports | `index`, `report`, `rank`, `inflation`, `repo`, `budget`, `GDP`, `funding`, `merger`, `competitiveness`, `employment outlook` |
| Awards/books | `Padma`, `Jnanpith`, `Pulitzer`, `Nobel`, `Bharat Ratna`, `Gandhi Peace Prize`, `Arjuna`, `Dronacharya`, `Khel Ratna`, `Raja Rammohan Roy`, `award`, `prize`, `book` |
| Sports | `championship`, `medal`, `trophy`, `World Cup`, `ICC`, `boxing`, `tennis`, `wrestling`, `Formula E`, `winner` |
| Defence/space | `BrahMos`, `DRDO`, `IAF`, `Indian Navy`, `exercise`, `missile`, `Aero India`, `ISRO`, `SSLV`, `GSAT`, `satellite`, `launch vehicle`, `space policy` |
| Schemes | `scheme`, `mission`, `launched`, `inaugurated`, `beneficiary`, `PM-JAY`, `PM-KISAN`, `literacy programme` |
| Judiciary/elections | `Supreme Court`, `High Court`, `commission`, `judgment`, `Election Commission`, `Rajya Sabha` |
| Environment/disaster | `cyclone`, `wildlife`, `national park`, `species`, `environment performance index`, `ozone`, `habitat` |
| Telangana | `Telangana`, `Hyderabad`, `TGSRTC`, `DHRUVA`, `IT/ITeS`, `Life Sciences`, `state budget`, `Buddhavanam`, `T-Hub` |

## 10. Telangana manual-entry workflow

1. Poll the State Portal press-release archive daily and the budget, GO, Police, TGSRTC, Tourism and IT department sources weekly.
2. Require the official source URL, event date, exact entity, category, exam fact, and source capture timestamp before creating an entry.
3. Apply the same scoring and event-key dedupe algorithm as PIB. `is_telangana_focus` is true only when the event is primarily Telangana-specific.
4. Route to a `telangana_manual_review` queue when an entry is a local legal dispute, local sports result, district event, budget figure or office-holder. Do not elevate it merely because it mentions Hyderabad.
5. Publish a card only after a reviewer can point to the exact official sentence supporting its exam fact.
6. Keep static Telangana history and movement content out of this workflow. It belongs to its note and verified PYQ bank.

## Implementation gate

Do not change the live scraper until these two evidence gaps are closed:

1. Complete `pyq_enriched_master.json` and add a verified-topic field for all 3,129 master rows.
2. Add a raw-PRID decision ledger so accepted, rejected, deferred and duplicate outcomes can be audited against the 26,699-row source corpus.

Those gates prevent the system from presenting partial enrichment or an opaque filtering outcome as PYQ-derived truth.
