import type { StudyChapter } from '~/types/study'

/**
 * Chapter: State Government & Local Governance
 * NOTE-POL-PANCHAYAT - 21 verified TGPRB PYQs, 2015-2023.
 * Every section is authored to fit roughly one screen on the stage.
 */
const stateAndLocalGovernance: StudyChapter = {
  slug: 'state-and-local-governance',
  noteId: 'NOTE-POL-PANCHAYAT',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'State Government & Local Governance',
  summary: 'State Executive (Governor, CM & Council), State Legislature (Assembly vs Council, Art. 169), 73rd & 74th CAAs (PRIs, ULBs, 11th & 12th Schedules), SEC, SFC, and Telangana Panchayati Raj Act 2018. 21 verified TGPRB PYQs, 2015-2023.',
  hasNote: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    // Section 1: Visual Architecture & Part VI / IX Blueprint
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'visual-architecture',
      title: 'Visual Architecture & Part VI / IX Blueprint (Arts. 152-243ZT)',
      short: 'Blueprint',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'The governance framework in the States and at the grassroots level is anchored in <strong>Part VI</strong> (Articles 152 to 237) and <strong>Part IX / IX-A</strong> (Articles 243 to 243ZT) of the Indian Constitution. While Part VI governs the State Executive, State Legislature, and High Courts, Part IX and Part IX-A decentralize democratic authority down to rural Panchayats and urban Municipalities.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: 'Under <strong>Chapter III of Part VI (Articles 168 to 212)</strong>, the Constitution provides for the organization, powers, and procedures of State Legislatures. Unlike Parliament which is mandatorily bicameral, states may have either a unicameral or bicameral legislature.',
        },
        {
          type: 'p',
          lineId: 's1-p3',
          html: 'The <strong>73rd and 74th Constitutional Amendment Acts, 1992</strong> structurally transformed Indian democracy by providing constitutional status to local self-government institutions. Crucially, mandatory reservation of not less than <strong>one-third (33%)</strong> of total seats and offices for women enabled hundreds of thousands of women to enter active governance across Gram Panchayats and Municipalities.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's1-c1',
          html: 'TGPRB tests structural parts and constitutional amendments: Part VI deals with the State Legislature (SI 2016), and the 73rd/74th Amendments facilitated large-scale entry of women into Gram Panchayats and Municipalities (Constable 2016).',
        },
        {
          type: 'compare',
          caption: 'Federal Governance Architecture: Union vs State vs Local',
          colA: 'Union & State Tier (Parts V & VI)',
          colB: 'Local Governance Tier (Parts IX & IX-A)',
          rows: [
            {
              label: 'Constitutional Part',
              a: 'Part V (Union) and Part VI (States)',
              b: 'Part IX (Panchayats) and Part IX-A (Municipalities)',
              lineId: 's1-cmp1',
            },
            {
              label: 'Legislative Competence',
              a: '7th Schedule: Union List (List I) & State List (List II)',
              b: '11th Schedule (29 subjects) & 12th Schedule (18 subjects)',
              lineId: 's1-cmp2',
            },
            {
              label: 'Democratic Mandate',
              a: 'Sovereignty shared under federal constitutional framework',
              b: 'Decentralized grassroots self-government institutions',
              lineId: 's1-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3065', sourceLine: 's1-p2' },
        { uid: 'PYQ-0590', sourceLine: 's1-p3' },
      ],
      cards: [
        { id: 'c1-1', front: 'Which Part of the Indian Constitution deals with the State Legislature?', back: 'Part VI (Articles 152 to 237; Chapter III covers Articles 168 to 212)' },
        { id: 'c1-2', front: 'What structural milestone did the 73rd and 74th Constitutional Amendments achieve for women?', back: 'Mandated at least 33% reservation, facilitating large-scale entry of women into Gram Panchayats and Municipalities' },
        { id: 'c1-3', front: 'Which Schedules detail the functional powers of Panchayats and Municipalities?', back: 'Eleventh Schedule (29 subjects for Panchayats) and Twelfth Schedule (18 subjects for Municipalities)' },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'Part VI (The States)',
          right: 'Part IX / IX-A (Local Self-Government)',
          why: 'Part VI governs state level executive, legislature and judiciary; Parts IX and IX-A govern rural Panchayats and urban Municipalities.',
          statements: [
            { text: 'Governor and Chief Minister (Arts. 153-167)', side: 'left' },
            { text: 'State Legislative Assembly and Council (Arts. 168-212)', side: 'left' },
            { text: 'High Courts and Subordinate Courts (Arts. 214-237)', side: 'left' },
            { text: 'Gram Sabha and 3-Tier Panchayats (Arts. 243-243O)', side: 'right' },
            { text: 'Nagar Panchayats and Municipal Corporations (Arts. 243P-243ZG)', side: 'right' },
            { text: 'Eleventh and Twelfth Schedules', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 2: State Executive: Governor, Chief Minister & Council
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'state-executive',
      title: 'State Executive: Governor, Chief Minister & Council of Ministers (Arts. 153-167, 213)',
      short: 'State Executive',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: 'Under <strong>Article 154(1)</strong>, the executive power of the State is vested in the <strong>Governor</strong> and is exercised by him directly or through subordinate officers in accordance with the Constitution. While the Governor is the constitutional and nominal head (de jure), the <strong>Chief Minister</strong> heading the Council of Ministers is the real executive head (de facto).',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: 'Under <strong>Article 155</strong>, the Governor is appointed by the <strong>President of India</strong> by warrant under his hand and seal. Under <strong>Article 156</strong>, the Governor holds office during the pleasure of the President (no fixed tenure or impeachment mechanism). Under <strong>Article 157</strong>, the Constitution prescribes only <strong>two qualifications</strong>: the candidate must be a citizen of India and have completed the age of 35 years. The Supreme Court in Hargovind Pant v. Raghukul Tilak (1979) established that the Governor is an independent constitutional office, not an employment under the Government of India.',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: 'Under the <strong>Fifth Schedule (Paragraph 5(1))</strong>, the Governor possesses special administrative authority: the Governor is authorized to direct that any particular Act of Parliament or of the State Legislature shall not apply to a Scheduled Area, or shall apply subject to exceptions and modifications.',
        },
        {
          type: 'p',
          lineId: 's2-p4',
          html: 'Under <strong>Article 213</strong>, the Governor has the power to promulgate ordinances during the recess of the State Legislature. An ordinance has the same force and effect as an Act of the State Legislature, but must be laid before the Legislative Assembly (and Council, if any) and ceases to operate after 6 weeks from its reassembly unless approved earlier.',
        },
        {
          type: 'p',
          lineId: 's2-p5',
          html: 'The President appoints Governors across states (e.g. historical appointments across Meghalaya, Jharkhand, Andhra Pradesh, Maharashtra, UP) and State Chief Ministers lead their respective cabinets. In Jammu and Kashmir prior to 2019, Section 92 of the J&K Constitution allowed imposition of Governor\'s rule.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Exam Traps',
          lineId: 's2-c1',
          html: 'Governor appointment (Art. 155) is by the President, but qualifications (Art. 157) are strictly two: citizen and 35 years. Governor pardoning power (Art. 161) CANNOT pardon a death sentence or court martial sentence (only President under Art. 72 can).',
        },
        {
          type: 'compare',
          caption: 'Pardoning Powers: President (Art. 72) vs Governor (Art. 161)',
          colA: 'President of India (Article 72)',
          colB: 'Governor of a State (Article 161)',
          rows: [
            {
              label: 'Death Sentence',
              a: 'Can grant full pardon, reprieve, respite, remission, or commute death sentences',
              b: 'CANNOT grant full pardon for death sentence; can only suspend, remit, or commute',
              lineId: 's2-cmp1',
            },
            {
              label: 'Court Martial',
              a: 'Can grant pardon or remission for sentences by Court Martial (military courts)',
              b: 'Has NO power whatsoever over Court Martial punishments',
              lineId: 's2-cmp2',
            },
            {
              label: 'Scope of Law',
              a: 'Extends to all offences against laws relating to Union executive power',
              b: 'Extends to offences against laws relating to State executive power',
              lineId: 's2-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0755', sourceLine: 's2-p2' },
        { uid: 'PYQ-1154', sourceLine: 's2-p1' },
        { uid: 'PYQ-3041', sourceLine: 's2-p2' },
        { uid: 'PYQ-0761', sourceLine: 's2-p3' },
        { uid: 'PYQ-0168', sourceLine: 's2-p5' },
        { uid: 'PYQ-1103', sourceLine: 's2-p5' },
        { uid: 'PYQ-0316', sourceLine: 's2-p5' },
        { uid: 'PYQ-0403', sourceLine: 's2-p5' },
        { uid: 'PYQ-0518', sourceLine: 's2-p5' },
        { uid: 'PYQ-2473', sourceLine: 's2-p5' },
      ],
      cards: [
        { id: 'c2-1', front: 'In whom is the executive power of the State constitutionally vested?', back: 'In the Governor under Article 154(1)' },
        { id: 'c2-2', front: 'What are the two qualifications for Governor under Article 157?', back: 'Citizen of India and completed 35 years of age' },
        { id: 'c2-3', front: 'Who decides the applicability of an Act of Parliament to a Scheduled Area under the 5th Schedule?', back: 'The Governor of the State under Paragraph 5(1) of the Fifth Schedule' },
        { id: 'c2-4', front: 'Can the Governor grant full pardon to a death row convict under Article 161?', back: 'No. Only the President under Article 72 can grant a full pardon for a death sentence' },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'President (Art. 72)',
          right: 'Governor (Art. 161)',
          why: 'President has exclusive jurisdiction over Court Martial convictions and death sentence pardons; Governor cannot pardon death sentences.',
          statements: [
            { text: 'Can grant absolute pardon for a death sentence', side: 'left' },
            { text: 'Can pardon punishments inflicted by a Court Martial', side: 'left' },
            { text: 'Executive clemency over Union law offences', side: 'left' },
            { text: 'Cannot grant absolute pardon for a death sentence', side: 'right' },
            { text: 'No clemency power over military court convictions', side: 'right' },
            { text: 'Executive clemency over State law offences', side: 'right' },
          ],
        },
        {
          id: 't2-2',
          left: 'Prescribed in Constitution (Art. 157)',
          right: 'Unwritten Convention (Sarkaria / Punchhi)',
          why: 'Article 157 has only two qualifications; being an outsider or consulting the Chief Minister are conventions, not constitutional text.',
          statements: [
            { text: 'Must be a citizen of India', side: 'left' },
            { text: 'Must have completed the age of 35 years', side: 'left' },
            { text: 'Should be an eminent person from outside the State', side: 'right' },
            { text: 'Chief Minister of the State should be consulted before appointment', side: 'right' },
            { text: 'Should be detached from local politics of the State', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 3: State Legislature: Assembly vs Council & Procedure
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'state-legislature',
      title: 'State Legislature: Assembly vs Council, Legislative Procedure & Bill Reservations (Arts. 168-212, 200, 201)',
      short: 'State Legislature',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: 'Under <strong>Article 168</strong>, the Legislature of a State consists of the Governor and one or two Houses. Where there are two Houses, they are the <strong>Legislative Assembly (Vidhan Sabha)</strong> and the <strong>Legislative Council (Vidhan Parishad)</strong>. Under <strong>Article 169</strong>, Parliament may by law abolish or create a Legislative Council if the Legislative Assembly passes a resolution by a <strong>special majority</strong> (majority of total membership and not less than two-thirds of members present and voting).',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: 'In the legislative process, the Legislative Council is subordinate and merely a <strong>dilatory chamber</strong>. For ordinary bills, the Council can delay a bill for a maximum of <strong>3 months</strong> in the first instance, and if passed again by the Assembly, for <strong>1 month</strong> in the second instance (total maximum delay of <strong>4 months</strong>). For Money Bills, the Council can delay only for <strong>14 days</strong>. Crucially, there is <strong>NO provision for a Joint Sitting</strong> in State Legislatures to resolve deadlocks.',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: 'Under <strong>Article 200</strong>, when a bill is passed by the State Legislature, the Governor may: (a) give assent, (b) withhold assent, (c) return the bill (if not a Money Bill) for reconsideration, or (d) reserve the bill for the consideration of the President. If the Assembly passes a returned bill again, the Governor <strong>must give assent</strong>.',
        },
        {
          type: 'p',
          lineId: 's3-p4',
          html: 'Under <strong>Article 201</strong>, when a bill is reserved for the <strong>President</strong>, the President may assent, withhold assent, or direct the Governor to return it to the House with a message. The House must reconsider it within <strong>6 months</strong>. If the House passes it again, <strong>the President is NOT bound to give assent</strong> and can still withhold assent (absolute veto).',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'High-Yield Trap',
          lineId: 's3-c1',
          html: 'In Parliament (Art. 111) and before the Governor (Art. 200), if the legislature repasses a returned bill, assent is mandatory. But under Article 201, the President is NEVER bound to assent to a reconsidered State Bill!',
        },
        {
          type: 'compare',
          caption: 'State Legislative Assembly (Vidhan Sabha) vs Legislative Council (Vidhan Parishad)',
          colA: 'Legislative Assembly (Lower House)',
          colB: 'Legislative Council (Upper House)',
          rows: [
            {
              label: 'Minimum Age',
              a: '25 years',
              b: '30 years',
              lineId: 's3-cmp1',
            },
            {
              label: 'Tenure',
              a: '5 years (subject to dissolution)',
              b: 'Permanent body (1/3rd retire every 2 years; 6-year term)',
              lineId: 's3-cmp2',
            },
            {
              label: 'Ordinary Bill Deadlock',
              a: 'Assembly will overrides Council after 4 months delay',
              b: 'Can only delay: 3 months (first instance) + 1 month (second instance)',
              lineId: 's3-cmp3',
            },
            {
              label: 'Money Bills',
              a: 'Exclusive power of introduction and passing',
              b: 'Can only make recommendations within 14 days',
              lineId: 's3-cmp4',
            },
            {
              label: 'Existence',
              a: 'Mandatory in every State',
              b: 'Optional: Created or abolished under Article 169',
              lineId: 's3-cmp5',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0757', sourceLine: 's3-p2' },
        { uid: 'PYQ-2516', sourceLine: 's3-p4' },
      ],
      cards: [
        { id: 'c3-1', front: 'Which Article provides for the abolition or creation of Legislative Councils by Parliament?', back: 'Article 169 (requires Assembly special majority resolution and Parliament simple majority law)' },
        { id: 'c3-2', front: 'What is the maximum period a Legislative Council can delay an ordinary bill?', back: '4 months maximum (3 months on first passage + 1 month on second passage)' },
        { id: 'c3-3', front: 'Is there a provision for Joint Sitting in State Legislatures to resolve deadlocks?', back: 'No. Joint sittings (Article 108) exist ONLY for Union Parliament, never for State Legislatures' },
        { id: 'c3-4', front: 'Is the President bound to give assent to a reconsidered State Bill under Article 201?', back: 'No. The President is never bound to give assent even if the State Legislature passes the bill again' },
      ],
      traps: [
        {
          id: 't3-1',
          left: 'Governor Reconsideration (Art. 200)',
          right: 'President Reconsideration (Art. 201)',
          why: 'Governor must give assent if the State Legislature passes the returned bill again; President is under no obligation to give assent.',
          statements: [
            { text: 'Governor must give assent if bill is passed again by State Legislature', side: 'left' },
            { text: 'Applies to state bills returned directly by the Governor', side: 'left' },
            { text: 'President may still withhold assent even if bill is repassed', side: 'right' },
            { text: 'Applies to state bills reserved for presidential consideration', side: 'right' },
            { text: 'State Legislature must reconsider bill within 6 months of message', side: 'right' },
          ],
        },
        {
          id: 't3-2',
          left: 'Rajya Sabha (Union Upper House)',
          right: 'Legislative Council (State Upper House)',
          why: 'Rajya Sabha has co-equal power on ordinary bills and deadlocks trigger Joint Sitting; Legislative Council is purely dilatory with no joint sitting.',
          statements: [
            { text: 'Can trigger a Joint Sitting under Article 108 if deadlocked', side: 'left' },
            { text: 'Cannot be abolished under any constitutional mechanism', side: 'left' },
            { text: 'Can authorize Parliament to make laws on State List (Art. 249)', side: 'left' },
            { text: 'Can be abolished by Parliament upon Assembly resolution (Art. 169)', side: 'right' },
            { text: 'Can only delay an ordinary bill for up to 4 months max', side: 'right' },
            { text: 'No provision for Joint Sitting when in disagreement with lower house', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 4: Panchayati Raj Institutions (73rd CAA 1992)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'panchayati-raj',
      title: 'Panchayati Raj Institutions (73rd CAA 1992, Part IX, 11th Schedule, Committees)',
      short: 'Panchayati Raj',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: 'The <strong>73rd Constitutional Amendment Act, 1992</strong> added <strong>Part IX</strong> titled "The Panchayats" (Articles 243 to 243O) and the <strong>Eleventh Schedule</strong> containing <strong>29 functional items</strong> (such as agriculture, minor irrigation, drinking water, rural roads, poverty alleviation). The Act came into force on <strong>24 April 1993</strong>, commemorated annually as National Panchayati Raj Day.',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: 'Under <strong>Article 243(b)</strong>, the <strong>Gram Sabha</strong> is the foundation of the Panchayati Raj system, defined as a body consisting of persons registered in the electoral rolls relating to a village comprised within the area of the Panchayat at the village level. It functions as the direct democracy assembly at the grassroots.',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: 'The architecture of Panchayati Raj evolved through landmark national committees: (1) <strong>Balwant Rai Mehta Committee (1957)</strong> recommended democratic decentralization with a 3-tier system (Gram Panchayat, Panchayat Samiti, Zilla Parishad) with ZP advisory; Rajasthan was first to adopt it on 2 Oct 1959 in Nagaur, followed by Andhra Pradesh. (2) <strong>Ashok Mehta Committee (1977)</strong> recommended a 2-tier system (Mandal Panchayat and Zilla Parishad). (3) <strong>G.V.K. Rao Committee (1985)</strong> recommended strengthening Zilla Parishad. (4) <strong>L.M. Singhvi Committee (1986)</strong> first recommended constitutional recognition, protection, and preservation for Panchayati Raj institutions.',
        },
        {
          type: 'p',
          lineId: 's4-p4',
          html: 'Under <strong>Article 243D</strong>, reservation of seats is provided for SCs and STs in proportion to their population, and <strong>not less than one-third (33%)</strong> of the total number of seats and offices of chairpersons are reserved for <strong>women</strong>. In 2006, <strong>Bihar</strong> became the first State in India to increase women\'s reservation in Panchayati Raj institutions to <strong>50%</strong>.',
        },
        {
          type: 'callout',
          tone: 'jade',
          title: 'Committee Chronology',
          lineId: 's4-c1',
          html: 'Chronology shortcut: B-A-G-L: Balwant Rai Mehta (1957) -> Ashok Mehta (1977) -> G.V.K. Rao (1985) -> L.M. Singhvi (1986).',
        },
        {
          type: 'compare',
          caption: 'Panchayati Raj Committee Recommendations: Balwant Rai vs Ashok Mehta vs LM Singhvi',
          colA: 'Balwant Rai Mehta (1957)',
          colB: 'Ashok Mehta (1977)',
          rows: [
            {
              label: 'Tier Structure',
              a: '3-tier system (Village, Block Samiti, Zilla Parishad)',
              b: '2-tier system (Mandal Panchayat & Zilla Parishad)',
              lineId: 's4-cmp1',
            },
            {
              label: 'Key Executive Tier',
              a: 'Panchayat Samiti at the block level',
              b: 'Zilla Parishad at the district level',
              lineId: 's4-cmp2',
            },
            {
              label: 'Political Parties',
              a: 'No direct political party participation',
              b: 'Open participation of political parties in elections',
              lineId: 's4-cmp3',
            },
            {
              label: 'Constitutional Status',
              a: 'Focus on Community Development Program integration',
              b: 'Did not propose formal constitutional amendment (L.M. Singhvi proposed in 1986)',
              lineId: 's4-cmp4',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3067', sourceLine: 's4-p1' },
        { uid: 'PYQ-2700', sourceLine: 's4-p2' },
        { uid: 'PYQ-0762', sourceLine: 's4-p3' },
        { uid: 'PYQ-0297', sourceLine: 's4-p4' },
      ],
      cards: [
        { id: 'c4-1', front: 'Which Constitutional Amendment added Part IX and the 11th Schedule?', back: '73rd Constitutional Amendment Act, 1992 (effective 24 April 1993)' },
        { id: 'c4-2', front: 'How many functional items are listed in the Eleventh Schedule for Panchayats?', back: '29 functional items (Article 243G)' },
        { id: 'c4-3', front: 'How does Article 243(b) define the Gram Sabha?', back: 'Body consisting of all persons registered in the electoral rolls relating to a village in the panchayat area' },
        { id: 'c4-4', front: 'Which committee first recommended constitutional recognition for Panchayati Raj institutions?', back: 'L.M. Singhvi Committee (1986)' },
        { id: 'c4-5', front: 'Which was the first State in India to implement 50% reservation for women in Panchayats?', back: 'Bihar in 2006' },
      ],
      traps: [
        {
          id: 't4-1',
          left: 'Balwant Rai Mehta (1957)',
          right: 'Ashok Mehta (1977)',
          why: 'Balwant Rai proposed a 3-tier model with block as primary unit; Ashok Mehta proposed a 2-tier model with ZP as primary unit.',
          statements: [
            { text: 'Recommended a 3-tier Panchayati Raj system', side: 'left' },
            { text: 'Panchayat Samiti as the primary executive body', side: 'left' },
            { text: 'Zilla Parishad primarily in an advisory role', side: 'left' },
            { text: 'Recommended a 2-tier system (Mandal Panchayat and Zilla Parishad)', side: 'right' },
            { text: 'Zilla Parishad as the executive tier for district planning', side: 'right' },
            { text: 'Favored official political party participation in elections', side: 'right' },
          ],
        },
        {
          id: 't4-2',
          left: 'Constitutional Minimum (Art. 243D)',
          right: 'State Enhancements (e.g. Bihar 2006)',
          why: 'Article 243D sets the floor at one-third (33%); individual states like Bihar enhanced it to 50%.',
          statements: [
            { text: 'Not less than one-third (33%) of seats reserved for women', side: 'left' },
            { text: 'Mandatory baseline across all Indian States', side: 'left' },
            { text: '50% reservation for women in local bodies', side: 'right' },
            { text: 'First enacted by Bihar in 2006 (later adopted by Telangana, AP, etc.)', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 5: Municipalities & Urban Local Bodies (74th CAA 1992)
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'municipalities',
      title: 'Municipalities & Urban Local Bodies (74th CAA 1992, Part IX-A, 12th Schedule)',
      short: 'Urban Bodies',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: 'The <strong>74th Constitutional Amendment Act, 1992</strong> introduced <strong>Part IX-A</strong> titled "The Municipalities" (Articles 243P to 243ZG) and the <strong>Twelfth Schedule</strong> containing <strong>18 functional items</strong> (such as urban planning, regulation of land use, roads and bridges, water supply, public health, and solid waste management). The Act came into force on <strong>1 June 1993</strong>.',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'Under <strong>Article 243Q</strong>, a three-tier structure of urban local bodies is constituted based on population and urban character: (1) <strong>Nagar Panchayat</strong> for a transitional area from rural to urban; (2) <strong>Municipal Council</strong> for a smaller urban area; and (3) <strong>Municipal Corporation</strong> for a larger urban area (e.g., GHMC).',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: 'Under <strong>Article 243X</strong>, the revenue sources of Municipalities are determined by State legislation: (1) taxes, duties, tolls, and fees levied and collected by Municipalities; (2) taxes assigned to Municipalities by the State; (3) grants-in-aid from the <strong>Consolidated Fund of the State</strong>; and (4) recommendations of the Central Finance Commission under <strong>Article 280(3)(c)</strong>. Crucially, the <strong>Contingency Fund of India</strong> is strictly an emergency corpus under Article 267 and is NEVER a source of municipal grants.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's5-c1',
          html: 'TGPRB tested municipal revenue sources directly (SI 2018): Grants-in-aid from the Contingency Fund of India is incorrect. Grants come from the Consolidated Fund, not Contingency Fund!',
        },
        {
          type: 'compare',
          caption: '73rd Amendment (Panchayats) vs 74th Amendment (Municipalities)',
          colA: '73rd CAA 1992 (Panchayats)',
          colB: '74th CAA 1992 (Municipalities)',
          rows: [
            {
              label: 'Constitutional Part',
              a: 'Part IX (Articles 243 to 243O)',
              b: 'Part IX-A (Articles 243P to 243ZG)',
              lineId: 's5-cmp1',
            },
            {
              label: 'Schedule & Subjects',
              a: 'Eleventh Schedule (29 functional subjects)',
              b: 'Twelfth Schedule (18 functional subjects)',
              lineId: 's5-cmp2',
            },
            {
              label: 'Effective Date',
              a: '24 April 1993 (National Panchayati Raj Day)',
              b: '1 June 1993',
              lineId: 's5-cmp3',
            },
            {
              label: 'Grassroots Unit',
              a: 'Gram Sabha (registered village voters)',
              b: 'Ward Committees (in municipalities with 3 lakh+ pop)',
              lineId: 's5-cmp4',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0521', sourceLine: 's5-p3' },
      ],
      cards: [
        { id: 'c5-1', front: 'Which Part and Schedule were added by the 74th Constitutional Amendment Act?', back: 'Part IX-A and the Twelfth Schedule (18 functional items)' },
        { id: 'c5-2', front: 'What are the three tiers of urban local bodies under Article 243Q?', back: 'Nagar Panchayat (transitional area), Municipal Council (smaller urban area), and Municipal Corporation (larger urban area)' },
        { id: 'c5-3', front: 'Is the Contingency Fund of India a source of revenue for Municipalities?', back: 'No. Municipal grants come from the Consolidated Fund of the State and Central Finance Commission grants, never Contingency Fund' },
      ],
      traps: [
        {
          id: 't5-1',
          left: '11th Schedule (Panchayats)',
          right: '12th Schedule (Municipalities)',
          why: '11th Schedule has 29 rural subjects under 73rd CAA; 12th Schedule has 18 urban subjects under 74th CAA.',
          statements: [
            { text: 'Added by the 73rd Constitutional Amendment Act, 1992', side: 'left' },
            { text: 'Contains 29 functional items', side: 'left' },
            { text: 'Covers agriculture, rural housing, drinking water, and minor irrigation', side: 'left' },
            { text: 'Added by the 74th Constitutional Amendment Act, 1992', side: 'right' },
            { text: 'Contains 18 functional items', side: 'right' },
            { text: 'Covers urban planning, regulation of land use, and fire services', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 6: Commissions & Telangana Panchayati Raj Act 2018
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'commissions-telangana-act',
      title: 'State Finance Commission, State Election Commission & Telangana Panchayati Raj Act 2018 (Arts. 243I, 243K, 243Y, 243ZA)',
      short: 'Commissions & TS Act',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: 'Under <strong>Article 243K</strong> (for Panchayats) and <strong>Article 243ZA</strong> (for Municipalities), the superintendence, direction, and control of electoral rolls and the conduct of all elections to local bodies are vested in the <strong>State Election Commission (SEC)</strong> headed by a State Election Commissioner. The Commissioner is appointed by the Governor, but to safeguard institutional independence, the Commissioner <strong>can only be removed in like manner and on like grounds as a Judge of a High Court</strong> (by the President after parliamentary address).',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'Under <strong>Article 243I</strong> (for Panchayats) and <strong>Article 243Y</strong> (for Municipalities), the Governor constitutes a <strong>State Finance Commission (SFC)</strong> every 5 years to review the financial position of local bodies and recommend principles governing tax sharing between the State and local bodies, assignment of taxes, and grants-in-aid.',
        },
        {
          type: 'p',
          lineId: 's6-p3',
          html: 'The <strong>Telangana State Panchayati Raj Act, 2018</strong> (Act No. 5 of 2018) enacted comprehensive governance standards for rural Telangana: (1) The minimum age to contest for the office of Sarpanch, Upa-Sarpanch, or Ward Member is <strong>21 years</strong> (while voting age is 18 years). (2) A village with a population exceeding 1,500 but not exceeding 3,000 has <strong>11 wards</strong> (wards range from 5 to 21 based on population brackets). (3) For voter population 3,001 to 5,000, the Gram Sabha quorum is <strong>200 members</strong> (not 300). (4) <strong>Roznamcha</strong> is a daily diary register recording general day-to-day administrative inspections, works, and occurrences in the village (not a register of dead people).',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Removal Paradox',
          lineId: 's6-c1',
          html: 'The Governor appoints the State Election Commissioner (Art. 243K) and State Public Service Commission members (Art. 316), but the Governor cannot remove either of them! SEC is removed like a High Court Judge; SPSC members are removed only by the President under Article 317.',
        },
        {
          type: 'compare',
          caption: 'Election Commission of India (Art. 324) vs State Election Commission (Art. 243K)',
          colA: 'Election Commission of India (ECI)',
          colB: 'State Election Commission (SEC)',
          rows: [
            {
              label: 'Constitutional Article',
              a: 'Article 324',
              b: 'Article 243K and Article 243ZA',
              lineId: 's6-cmp1',
            },
            {
              label: 'Elections Conducted',
              a: 'Parliament (Lok Sabha, Rajya Sabha), State Legislatures, President, and Vice-President',
              b: 'Panchayats (Gram Panchayat, Mandal, ZP) and Municipalities (Councils, Corporations)',
              lineId: 's6-cmp2',
            },
            {
              label: 'Appointing Authority',
              a: 'President of India',
              b: 'Governor of the State',
              lineId: 's6-cmp3',
            },
            {
              label: 'Removal Mechanism',
              a: 'CEC removed in like manner as a Supreme Court Judge',
              b: 'SEC removed in like manner as a High Court Judge',
              lineId: 's6-cmp4',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3078', sourceLine: 's6-p1' },
        { uid: 'PYQ-2201', sourceLine: 's6-p3' },
      ],
      cards: [
        { id: 'c6-1', front: 'Under which Article is the State Election Commission established for Panchayats?', back: 'Article 243K (Article 243ZA for Municipalities)' },
        { id: 'c6-2', front: 'How can the State Election Commissioner be removed from office?', back: 'Only in like manner and on like grounds as a Judge of a High Court (by the President)' },
        { id: 'c6-3', front: 'Which Article mandates the constitution of a State Finance Commission every 5 years?', back: 'Article 243I (for Panchayats) and Article 243Y (for Municipalities)' },
        { id: 'c6-4', front: 'What is the minimum age to contest for Sarpanch under the Telangana Panchayati Raj Act 2018?', back: '21 years' },
        { id: 'c6-5', front: 'How many wards are assigned to a village with population between 1,501 and 3,000 under the TS PR Act 2018?', back: '11 wards' },
      ],
      traps: [
        {
          id: 't6-1',
          left: 'Appointed by Governor',
          right: 'Removable by Governor',
          why: 'The Governor appoints SEC, SPSC Chairman/Members, and HC Judges (consulted), but CANNOT remove them.',
          statements: [
            { text: 'State Election Commissioner (Art. 243K)', side: 'left' },
            { text: 'Chairman & Members of State Public Service Commission (Art. 316)', side: 'left' },
            { text: 'Advocate General of the State (Art. 165 - pleasure of Governor)', side: 'right' },
            { text: 'State Election Commissioner cannot be removed by Governor', side: 'left' },
            { text: 'SPSC members can only be removed by President under Art. 317', side: 'left' },
            { text: 'Chief Minister and Ministers (hold office during Governor pleasure)', side: 'right' },
          ],
        },
        {
          id: 't6-2',
          left: 'Election Commission of India (Art. 324)',
          right: 'State Election Commission (Art. 243K)',
          why: 'ECI conducts elections to Parliament, State Legislatures, and President/VP; SEC exclusively conducts local body elections.',
          statements: [
            { text: 'Elections to Lok Sabha and Rajya Sabha', side: 'left' },
            { text: 'Elections to State Legislative Assembly and Council', side: 'left' },
            { text: 'Elections to the offices of President and Vice-President', side: 'left' },
            { text: 'Elections to Gram Panchayats and Mandal Praja Parishads', side: 'right' },
            { text: 'Elections to Zilla Praja Parishads', side: 'right' },
            { text: 'Elections to Municipalities and Municipal Corporations', side: 'right' },
          ],
        },
      ],
    },
  ],
}

export default stateAndLocalGovernance
