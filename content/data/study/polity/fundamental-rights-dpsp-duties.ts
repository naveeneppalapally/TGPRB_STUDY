import type { StudyChapter } from '~/types/study'

/**
 * Chapter: Fundamental Rights, DPSP & Fundamental Duties
 * NOTE-POL-RIGHTS - 35 verified TGPRB PYQs, 2015-2023.
 * Every section is authored to fit roughly one screen on the stage.
 */
const fundamentalRightsDpspDuties: StudyChapter = {
  slug: 'fundamental-rights-dpsp-duties',
  noteId: 'NOTE-POL-RIGHTS',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'Fundamental Rights, DPSP & Fundamental Duties',
  summary: 'The Triad of Liberty (Arts. 12-51A), Right to Equality (Arts. 14-18), Right to Freedom and Life (Arts. 19-22), Remedies & Writs (Arts. 23-35), Directive Principles (Arts. 36-51), and Fundamental Duties (Art. 51A). 35 verified TGPRB PYQs, 2015-2023.',
  hasNote: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    // Section 1: Visual Architecture & The Triad of Liberty
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'visual-architecture',
      title: 'Visual Architecture & The Triad of Liberty (Arts. 12-51A)',
      short: 'Architecture',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'The Indian constitutional architecture of individual liberty and social justice is anchored in the <strong>Triad of Liberty</strong>: <strong>Part III (Fundamental Rights, Articles 12-35)</strong>, <strong>Part IV (Directive Principles of State Policy, Articles 36-51)</strong>, and <strong>Part IV-A (Fundamental Duties, Article 51A)</strong>. Together, Parts III and IV constitute the <em>"Conscience of the Constitution"</em> as described by Granville Austin.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: 'Under <strong>Article 12</strong>, the "State" is defined for Part III to include the <strong>Government and Parliament of India</strong>, the <strong>Government and Legislature of each State</strong>, all <strong>local authorities</strong> (Municipalities, Panchayats, District Boards), and <strong>other authorities</strong> (statutory corporations like LIC, ONGC, and SAIL under state control). Under <strong>Article 13(3)</strong>, "law" includes ordinances, orders, bye-laws, rules, regulations, and notifications having the force of law.',
        },
        {
          type: 'p',
          lineId: 's1-p3',
          html: '<strong>Article 13(2)</strong> provides the explicit foundation for <strong>Judicial Review</strong>, declaring that the State shall not make any law taking away or abridging Fundamental Rights. In the landmark <strong>Golaknath Case (1967)</strong>, the Supreme Court held that constitutional amendments under Article 368 are subject to Article 13(2). This triggered the 24th Amendment Act (1971), culminating in <strong>Kesavananda Bharati (1973)</strong> which established the unalterable <strong>Basic Structure Doctrine</strong>.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's1-c1',
          html: 'TGPRB frequently tests the definition of Judicial Review: it is the power of the Supreme Court and High Courts to decide the constitutionality of legislative Acts and executive orders (SI 2018). In Golaknath (1967), the Supreme Court ruled that amendments could not abridge Fundamental Rights (SI 2016).',
        },
        {
          type: 'compare',
          caption: 'Constitutional Triad: Fundamental Rights vs DPSP vs Fundamental Duties',
          colA: 'Fundamental Rights (Part III)',
          colB: 'DPSP (Part IV) & Duties (Part IV-A)',
          rows: [
            {
              label: 'Legal Character',
              a: 'Justiciable: directly enforceable by Supreme Court (Art. 32) & High Courts (Art. 226)',
              b: 'Non-justiciable: cannot be directly enforced through writs by courts',
              lineId: 's1-cmp1',
            },
            {
              label: 'Constitutional Objective',
              a: 'Establishes Political Democracy and civil liberties against state overreach',
              b: 'Establishes Socio-Economic Democracy (Welfare State) and citizen responsibilities',
              lineId: 's1-cmp2',
            },
            {
              label: 'Origin in Constitution',
              a: 'Original 1950 Constitution (Articles 12-35, borrowed from US Bill of Rights)',
              b: 'DPSP in 1950 (from Ireland); Duties added in 1976 by 42nd CAA (from USSR)',
              lineId: 's1-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1835', sourceLine: 's1-c1' },
        { uid: 'PYQ-1561', sourceLine: 's1-p3' },
        { uid: 'PYQ-2202', sourceLine: 's1-p2' },
      ],
      cards: [
        { id: 'c1-1', front: 'Which Article provides the definition of "State" for Fundamental Rights?', back: 'Article 12 (covers Union/State Governments & Legislatures, local bodies, and statutory authorities under State control)' },
        { id: 'c1-2', front: 'What does Judicial Review under Article 13 specifically mean?', back: 'The power of courts to decide the constitutionality of legislative Acts and executive orders' },
        { id: 'c1-3', front: 'What did the Supreme Court rule in Golaknath Case (1967)?', back: 'Parliament cannot take away or abridge Fundamental Rights even through constitutional amendments under Article 368' },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'Included in Article 12 State',
          right: 'NOT Included in Article 12 State',
          why: 'Statutory corporations and authorities under government control are State; purely private autonomous entities without state control are not.',
          statements: [
            { text: 'Life Insurance Corporation (LIC)', side: 'left' },
            { text: 'Oil and Natural Gas Corporation (ONGC)', side: 'left' },
            { text: 'Municipal Corporation and Gram Panchayat', side: 'left' },
            { text: 'Purely private unaided company or society', side: 'right' },
            { text: 'BCCI (Board of Control for Cricket in India)', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 2: Right to Equality & Social Justice
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'right-to-equality',
      title: 'Right to Equality & Social Justice (Arts. 14-18)',
      short: 'Equality',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: '<strong>Article 14</strong> guarantees that the State shall not deny to any person <strong>equality before the law</strong> or the <strong>equal protection of the laws</strong> within India. Equality before the law is a British negative concept ensuring no person is above law; equal protection of the laws is an American positive concept requiring equal treatment among equals.',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: '<strong>Article 15</strong> prohibits discrimination against citizens on grounds <strong>only of religion, race, caste, sex, or place of birth</strong> (5 grounds). Under <strong>Article 15(3)</strong>, the State can make special protective provisions for <strong>women and children</strong>. Under <strong>Article 15(4) and 15(5)</strong>, affirmative action is permitted for socially and educationally backward classes and SC/STs.',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: '<strong>Article 16</strong> guarantees equality of opportunity in public employment on <strong>7 grounds</strong> (the 5 grounds of Art. 15 plus <strong>descent</strong> and <strong>residence</strong>). Article 16(4) empowers the State to provide reservations for backward classes not adequately represented in state services, while Article 16(6) (103rd CAA, 2019) enables up to 10% reservation for Economically Weaker Sections (EWS).',
        },
        {
          type: 'p',
          lineId: 's2-p4',
          html: '<strong>Article 17</strong> abolishes <strong>untouchability</strong> in any form. To enforce this absolute right, Parliament enacted the <strong>Untouchability (Offences) Act, 1955</strong>, which was amended and renamed the <strong>Protection of Civil Rights Act, 1955</strong> in <strong>1976</strong>. Further, the <strong>SC and ST (Prevention of Atrocities) Act, 1989</strong> was enacted to check violence against vulnerable communities. Under <strong>Article 18</strong>, titles are abolished, but national awards (Bharat Ratna, Padma awards) are constitutional honours (Balaji Raghavan case, 1996) provided they are not used as prefixes or suffixes.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's2-c1',
          html: 'Key TGPRB questions: Economic equality is NOT a Fundamental Right under Articles 14-18 (Constable 2016). Special provisions for women and children derive from Article 15(3) (SI 2016). The Untouchability Offences Act 1955 was renamed Protection of Civil Rights Act in 1976 (Constable 2016).',
        },
        {
          type: 'compare',
          caption: 'Grounds of Prohibited Discrimination: Article 15 vs Article 16',
          colA: 'Article 15 (General Non-Discrimination)',
          colB: 'Article 16 (Public Employment Equality)',
          rows: [
            {
              label: 'Total Grounds',
              a: '5 grounds only: Religion, Race, Caste, Sex, Place of Birth',
              b: '7 grounds: Religion, Race, Caste, Sex, Place of Birth, Descent, Residence',
              lineId: 's2-cmp1',
            },
            {
              label: 'Scope',
              a: 'Access to shops, public restaurants, wells, tanks, bathing ghats, roads',
              b: 'Employment or appointment to any office under the State',
              lineId: 's2-cmp2',
            },
            {
              label: 'Affirmative Action',
              a: 'Special provisions for women, children, SEBCs, SCs, STs, and EWS',
              b: 'Reservation in appointments/posts (Art. 16(4)) and promotions (Art. 16(4A))',
              lineId: 's2-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1002', sourceLine: 's2-p1' },
        { uid: 'PYQ-3060', sourceLine: 's2-p2' },
        { uid: 'PYQ-0764', sourceLine: 's2-p2' },
        { uid: 'PYQ-0788', sourceLine: 's2-p2' },
        { uid: 'PYQ-0026', sourceLine: 's2-p2' },
        { uid: 'PYQ-1218', sourceLine: 's2-p2' },
        { uid: 'PYQ-3051', sourceLine: 's2-p2' },
        { uid: 'PYQ-2470', sourceLine: 's2-p3' },
        { uid: 'PYQ-0513', sourceLine: 's2-c1' },
        { uid: 'PYQ-0785', sourceLine: 's2-p4' },
        { uid: 'PYQ-0787', sourceLine: 's2-p4' },
        { uid: 'PYQ-0789', sourceLine: 's2-p4' },
        { uid: 'PYQ-2650', sourceLine: 's2-p2' },
        { uid: 'PYQ-0646', sourceLine: 's2-p4' },
        { uid: 'PYQ-2958', sourceLine: 's2-p4' },
      ],
      cards: [
        { id: 'c2-1', front: 'Which Article prohibits discrimination on grounds only of religion, race, caste, sex or place of birth?', back: 'Article 15' },
        { id: 'c2-2', front: 'Is economic equality a Fundamental Right under Articles 14 to 18?', back: 'No, economic equality is a socio-economic goal under DPSP, not an enforceable Fundamental Right' },
        { id: 'c2-3', front: 'In which year was the Untouchability (Offences) Act 1955 renamed the Protection of Civil Rights Act?', back: '1976' },
        { id: 'c2-4', front: 'What are the two additional grounds of non-discrimination in Article 16 compared to Article 15?', back: 'Descent and Residence (making 7 grounds total in Article 16)' },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'Protected under Right to Equality (Arts. 14-18)',
          right: 'NOT a Right to Equality Guarantee',
          why: 'Right to Equality covers legal equality, non-discrimination, opportunity, untouchability, and titles; economic equality and right to property are not included.',
          statements: [
            { text: 'Equality before the law and equal protection of laws', side: 'left' },
            { text: 'Abolition of untouchability in any form', side: 'left' },
            { text: 'Abolition of aristocratic titles', side: 'left' },
            { text: 'Equality of opportunity in public employment', side: 'left' },
            { text: 'Guaranteed economic equality of income', side: 'right' },
            { text: 'Right to acquire and hold private property', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 3: Right to Freedom, Life & Personal Liberty
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'right-to-freedom',
      title: 'Right to Freedom, Life & Personal Liberty (Arts. 19-22)',
      short: 'Freedom & Life',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: '<strong>Article 19(1)</strong> guarantees <strong>6 democratic freedoms</strong> to citizens: (a) speech and expression, (b) peaceful assembly without arms, (c) forming associations/unions/cooperatives, (d) moving freely throughout India, (e) residing and settling in any part of India, and (g) practicing any profession, trade, or business. <em>Right to acquire, hold, and dispose of property [Art. 19(1)(f)] was deleted by the 44th Constitutional Amendment Act, 1978</em> and relocated to <strong>Article 300A</strong> as a legal/constitutional right.',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: '<strong>Article 20</strong> provides three vital safeguards against arbitrary criminal prosecution: <strong>20(1) Protection against ex-post facto laws</strong> (applies only to criminal penal law, not civil/tax law); <strong>20(2) Protection against double jeopardy</strong> (no person prosecuted and punished for the same offence twice in judicial courts); and <strong>20(3) Protection against self-incrimination</strong> (compulsion to be a witness against oneself is barred). Courts have held that obtaining voice samples or fingerprints does not violate Article 20(3) (Kathi Kalu Oghad, Ritesh Sinha).',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: '<strong>Article 21</strong> guarantees that <em>"no person shall be deprived of his life or personal liberty except according to procedure established by law."</em> In <strong>A.K. Gopalan (1950)</strong>, the SC adopted a narrow literal interpretation. In <strong>Maneka Gandhi (1978)</strong>, the SC overturned this, ruling that the procedure must be <strong>just, fair, and reasonable</strong> (incorporating American Due Process). In <strong>K.S. Puttaswamy (2017)</strong>, a 9-judge bench unanimously recognized the <strong>Right to Privacy</strong> as an intrinsic part of Article 21, formally overruling ADM Jabalpur (1976).',
        },
        {
          type: 'p',
          lineId: 's3-p4',
          html: '<strong>Article 21A</strong> guarantees free and compulsory education for all children aged <strong>6 to 14 years</strong>, added by the <strong>86th Constitutional Amendment Act, 2002</strong> and enforced via the <strong>Right of Children to Free and Compulsory Education (RTE) Act, 2009</strong>. <strong>Article 22</strong> grants safeguards against arrest: right to know grounds of arrest, right to consult a lawyer, and production before a magistrate within 24 hours. For <strong>preventive detention</strong>, detention beyond <strong>3 months</strong> requires approval by an Advisory Board headed by a High Court judge.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Critical Exam Trap: Non-Suspendable Articles in Emergency',
          lineId: 's3-c1',
          html: 'Under <strong>Article 359</strong> as amended by the <strong>44th Amendment Act, 1978</strong>, the right to move any court for the enforcement of <strong>Articles 20 and 21 CANNOT be suspended</strong> during any National Emergency (SI 2018). Furthermore, Article 19 freedoms are suspended automatically under Article 358 only in an emergency declared on grounds of war or external aggression, never armed rebellion.',
        },
        {
          type: 'compare',
          caption: 'Procedural Evolution of Article 21: Gopalan (1950) vs Maneka Gandhi (1978)',
          colA: 'A.K. Gopalan Case (1950)',
          colB: 'Maneka Gandhi Case (1978)',
          rows: [
            {
              label: 'Standard Applied',
              a: 'Procedure established by law: literal compliance with statutory enactment',
              b: 'Substantive Due Process: procedure must be just, fair, and reasonable',
              lineId: 's3-cmp1',
            },
            {
              label: 'Protection Scope',
              a: 'Protection available against arbitrary executive action only, not legislature',
              b: 'Protection available against both arbitrary executive AND arbitrary legislative action',
              lineId: 's3-cmp2',
            },
            {
              label: 'Inter-relationship',
              a: 'Articles 19, 21, and 14 are separate water-tight compartments',
              b: 'Golden Triangle: Articles 14, 19, and 21 are mutually inclusive and organic',
              lineId: 's3-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-2198', sourceLine: 's3-p1' },
        { uid: 'PYQ-2511', sourceLine: 's3-p2' },
        { uid: 'PYQ-1789', sourceLine: 's3-c1' },
        { uid: 'PYQ-1836', sourceLine: 's3-p3' },
        { uid: 'PYQ-2702', sourceLine: 's3-p4' },
        { uid: 'PYQ-1791', sourceLine: 's3-p4' },
        { uid: 'PYQ-1558', sourceLine: 's3-p4' },
      ],
      cards: [
        { id: 'c3-1', front: 'Which Articles cannot be suspended even during a National Emergency under Article 359?', back: 'Article 20 (protection regarding conviction) and Article 21 (protection of life and personal liberty)' },
        { id: 'c3-2', front: 'Which Constitutional Amendment inserted Article 21A (Right to Education)?', back: '86th Constitutional Amendment Act, 2002' },
        { id: 'c3-3', front: 'Which landmark case overruled ADM Jabalpur and established Right to Privacy under Article 21?', back: 'K.S. Puttaswamy v. Union of India (2017, 9-judge bench)' },
        { id: 'c3-4', front: 'What is the maximum initial period of preventive detention permitted without Advisory Board approval?', back: '3 months (under Article 22(4))' },
      ],
      traps: [
        {
          id: 't3-1',
          left: 'Non-Suspendable in Emergency',
          right: 'Can Be Suspended in Emergency',
          why: 'The 44th CAA 1978 strictly barred the suspension of Articles 20 and 21 in any National Emergency.',
          statements: [
            { text: 'Article 20 (Protection against conviction for offences)', side: 'left' },
            { text: 'Article 21 (Protection of life and personal liberty)', side: 'left' },
            { text: 'Article 19 (Six democratic freedoms of speech, assembly, etc.)', side: 'right' },
            { text: 'Article 32 (Right to move Supreme Court for other FRs)', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 4: Exploitation, Religious Freedoms & Constitutional Remedies
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'exploitation-religion-remedies',
      title: 'Exploitation, Religious Freedoms & Constitutional Remedies (Arts. 23-35)',
      short: 'Remedies & Writs',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: '<strong>Articles 23 and 24</strong> guarantee the <strong>Right against Exploitation</strong>. Article 23 prohibits traffic in human beings, begar (unpaid forced labor), and similar forms of forced labor. Article 24 forbids the employment of children below <strong>14 years of age</strong> in factories, mines, or hazardous occupations (enforced by the Child and Adolescent Labour Act).',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: '<strong>Articles 25 to 28</strong> guarantee the <strong>Right to Freedom of Religion</strong>. Article 25 guarantees freedom of conscience and free profession, practice, and propagation of religion to all persons (subject to public order, morality, and health). Article 26 guarantees freedom to manage religious affairs. Article 27 protects against taxation for promoting any specific religion. Article 28 prohibits religious instruction in wholly state-funded educational institutions.',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: '<strong>Articles 29 and 30</strong> protect the <strong>Cultural and Educational Rights</strong> of minorities. Article 29 protects the distinct language, script, or culture of any section of citizens. Article 30 empowers religious and linguistic minorities to establish and administer educational institutions of their choice.',
        },
        {
          type: 'p',
          lineId: 's4-p4',
          html: '<strong>Article 32</strong> confers the <strong>Right to Constitutional Remedies</strong>, which Dr. B.R. Ambedkar called the <em>"very soul of the Constitution and the very heart of it."</em> Article 32 is itself a Fundamental Right, empowering citizens to move the Supreme Court directly. Under Articles 32 (Supreme Court) and 226 (High Courts), five prerogative writs can be issued: <strong>Habeas Corpus</strong>, <strong>Mandamus</strong>, <strong>Prohibition</strong>, <strong>Certiorari</strong>, and <strong>Quo-Warranto</strong>.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's4-c1',
          html: 'TGPRB tests categorization: Articles 25-28 belong to Right to Freedom of Religion (Constable 2018). In military service matters, SC held Indian Air Force grooming regulations were reasonable restrictions consistent with Article 25 discipline (SI 2018).',
        },
        {
          type: 'compare',
          caption: 'Writ Powers: Supreme Court (Art. 32) vs High Court (Art. 226)',
          colA: 'Supreme Court (Article 32)',
          colB: 'High Court (Article 226)',
          rows: [
            {
              label: 'Constitutional Status',
              a: 'Itself a Fundamental Right; Supreme Court cannot refuse to exercise it',
              b: 'Discretionary constitutional remedy; not a Fundamental Right',
              lineId: 's4-cmp1',
            },
            {
              label: 'Subject Matter Scope',
              a: 'Enforces Fundamental Rights (Part III) only; narrower jurisdiction',
              b: 'Enforces Fundamental Rights AND any other legal purpose; wider jurisdiction',
              lineId: 's4-cmp2',
            },
            {
              label: 'Territorial Jurisdiction',
              a: 'Throughout the entire territory of India',
              b: 'Within its state territory or where cause of action arises',
              lineId: 's4-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3056', sourceLine: 's4-p2' },
        { uid: 'PYQ-2477', sourceLine: 's4-c1' },
      ],
      cards: [
        { id: 'c4-1', front: 'Which Articles guarantee the Right to Freedom of Religion?', back: 'Articles 25 to 28' },
        { id: 'c4-2', front: 'Which Article did Dr. B.R. Ambedkar describe as the "heart and soul" of the Constitution?', back: 'Article 32 (Right to Constitutional Remedies)' },
        { id: 'c4-3', front: 'What is the key difference between writ jurisdiction of Supreme Court (Art. 32) and High Courts (Art. 226)?', back: 'Supreme Court can issue writs only for Fundamental Rights; High Courts can issue writs for Fundamental Rights and "any other purpose"' },
      ],
      traps: [
        {
          id: 't4-1',
          left: 'Supreme Court (Art. 32)',
          right: 'High Court (Art. 226)',
          why: 'Art. 32 is a Fundamental Right limited to Part III; Art. 226 is a discretionary remedy with wider scope extending to ordinary legal rights.',
          statements: [
            { text: 'Remedy is itself an enforceable Fundamental Right', side: 'left' },
            { text: 'Writs can be issued ONLY for enforcement of Fundamental Rights', side: 'left' },
            { text: 'Writs can be issued for Fundamental Rights and "any other purpose"', side: 'right' },
            { text: 'Remedy is discretionary and not a Fundamental Right in itself', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 5: Directive Principles of State Policy
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'directive-principles',
      title: 'Directive Principles of State Policy (Arts. 36-51)',
      short: 'DPSP',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: '<strong>Part IV (Articles 36 to 51)</strong> contains the <strong>Directive Principles of State Policy (DPSP)</strong>, borrowed from the <strong>Irish Constitution</strong> of 1937 (which took them from Spain). DPSPs embody the vision of a <strong>Welfare State</strong> and economic democracy, contrasting with the negative police-state concept of laissez-faire.',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'Under <strong>Article 37</strong>, Directive Principles are <strong>non-justiciable</strong> (not enforceable in courts of law), but are explicitly declared <strong>fundamental in the governance of the country</strong>, making it the duty of the State to apply them in making laws. DPSPs are conceptually grouped into three streams: <strong>Socialistic</strong> (Arts. 38, 39, 39A, 41, 42, 43, 43A, 47), <strong>Gandhian</strong> (Arts. 40, 43, 43B, 46, 47, 48), and <strong>Liberal-Intellectual</strong> (Arts. 44, 45, 48, 48A, 49, 50, 51).',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: 'Key high-yield DPSPs tested in TGPRB: <strong>Article 38</strong> directs the State to secure a social order promoting welfare of the people; <strong>Article 39(a)</strong> directs equal livelihood rights for men and women; <strong>Article 39A</strong> (added by 42nd CAA, 1976) guarantees <strong>Equal Justice and Free Legal Aid</strong>, leading to NALSA; <strong>Article 40</strong> directs organization of Village Panchayats; <strong>Article 44</strong> directs a Uniform Civil Code (UCC); <strong>Article 48A</strong> (42nd CAA, 1976) directs environmental protection; and <strong>Article 50</strong> mandates separation of judiciary from executive.',
        },
        {
          type: 'p',
          lineId: 's5-p4',
          html: '<strong>FR vs DPSP Conflict Evolution</strong>: In <em>Champakam Dorairajan (1951)</em>, SC held FRs prevail over DPSPs. The 25th CAA (1971) inserted Article 31C, giving primacy to Article 39(b) and (c) over Articles 14 and 19. In <em>Kesavananda Bharati (1973)</em>, the SC upheld this core. In <strong>Minerva Mills (1980)</strong>, the SC struck down the 42nd CAA expansion, ruling that the <strong>harmony and balance between Fundamental Rights and Directive Principles is an essential feature of the Basic Structure</strong>.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's5-c1',
          html: 'Direct TGPRB questions: Securing a social order for people welfare is Art. 38 (Constable 2018). Adequate means of livelihood for men and women equally is Art. 39(a) (SI 2022). Equal Justice and Free Legal Aid is Art. 39A under DPSP (SI 2022). Separation of judiciary from executive is Art. 50 (SI 2016). Environmental interpretation under Art. 21 and 48A includes absolute liability and polluter pays principles (SI 2018).',
        },
        {
          type: 'compare',
          caption: 'Fundamental Rights (Part III) vs Directive Principles of State Policy (Part IV)',
          colA: 'Fundamental Rights (Part III)',
          colB: 'Directive Principles (Part IV)',
          rows: [
            {
              label: 'Enforceability',
              a: 'Justiciable: courts enforce through writs under Articles 32 and 226',
              b: 'Non-justiciable: Article 37 bars court enforcement',
              lineId: 's5-cmp1',
            },
            {
              label: 'Orientation',
              a: 'Negative obligations: forbids State from taking arbitrary actions',
              b: 'Positive directives: instructs State to implement welfare policies',
              lineId: 's5-cmp2',
            },
            {
              label: 'Sanction',
              a: 'Legal sanction backed by judicial review',
              b: 'Political and moral sanction backed by public opinion and elections',
              lineId: 's5-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3042', sourceLine: 's5-p3' },
        { uid: 'PYQ-2698', sourceLine: 's5-p3' },
        { uid: 'PYQ-2697', sourceLine: 's5-p3' },
        { uid: 'PYQ-0299', sourceLine: 's5-p3' },
        { uid: 'PYQ-2523', sourceLine: 's5-p3' },
        { uid: 'PYQ-0027', sourceLine: 's5-p1' },
        { uid: 'PYQ-1601', sourceLine: 's5-p1' },
      ],
      cards: [
        { id: 'c5-1', front: 'From which country was the concept of Directive Principles of State Policy borrowed?', back: 'Ireland (Irish Constitution of 1937)' },
        { id: 'c5-2', front: 'Which Article provides for Equal Justice and Free Legal Aid?', back: 'Article 39A (inserted by the 42nd Amendment Act, 1976)' },
        { id: 'c5-3', front: 'Which Article mandates the separation of the Judiciary from the Executive?', back: 'Article 50' },
        { id: 'c5-4', front: 'What did the Minerva Mills case (1980) establish regarding FRs and DPSPs?', back: 'The harmony and balance between Fundamental Rights and Directive Principles is part of the Basic Structure' },
      ],
      traps: [
        {
          id: 't5-1',
          left: 'Fundamental Right (Part III)',
          right: 'Directive Principle of State Policy (Part IV)',
          why: 'Fundamental Rights are justiciable negative commands; DPSPs are non-justiciable positive welfare instructions.',
          statements: [
            { text: 'Abolition of untouchability (Art. 17)', side: 'left' },
            { text: 'Protection of life and personal liberty (Art. 21)', side: 'left' },
            { text: 'Equal justice and free legal aid (Art. 39A)', side: 'right' },
            { text: 'Uniform Civil Code for the citizens (Art. 44)', side: 'right' },
            { text: 'Organization of Village Panchayats (Art. 40)', side: 'right' },
            { text: 'Separation of judiciary from executive (Art. 50)', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 6: Fundamental Duties & Citizen Obligations
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'fundamental-duties',
      title: 'Fundamental Duties & Citizen Obligations (Art. 51A)',
      short: 'Duties',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: 'The original 1950 Constitution did not contain Fundamental Duties. During the Internal Emergency, the Government appointed the <strong>Sardar Swaran Singh Committee (1976)</strong> to make recommendations on citizen obligations. Inspired by the Constitution of the erstwhile <strong>USSR</strong>, the committee recommended incorporating a chapter on duties to balance individual rights with civic responsibilities.',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'The <strong>42nd Constitutional Amendment Act, 1976</strong> introduced <strong>Part IV-A</strong> containing a single article, <strong>Article 51A</strong>, with <strong>10 Fundamental Duties</strong>. Later, the <strong>86th Constitutional Amendment Act, 2002</strong> added the <strong>11th Fundamental Duty [Art. 51A(k)]</strong>: the duty of a parent or guardian to provide educational opportunities to their child between the ages of 6 and 14 years.',
        },
        {
          type: 'p',
          lineId: 's6-p3',
          html: 'Like Directive Principles, Fundamental Duties are <strong>non-justiciable</strong>: they cannot be directly enforced by courts using prerogative writs. However, they serve as a guide for constitutional interpretation, and Parliament has enacted statutory laws to enforce specific duties. The <strong>Justice J.S. Verma Committee (1999)</strong> identified existing legal enactments enforcing duties, such as the Prevention of Insults to National Honour Act 1971, the Protection of Civil Rights Act 1955, the Wildlife Protection Act 1972, and the Forest Conservation Act 1980.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's6-c1',
          html: 'TGPRB tests exact facts: Article 51A (not 51) contains Fundamental Duties; they were incorporated by the 42nd CAA 1976; they cannot be enforced directly by writs; and constitutional methods can be used by Parliament to enact statutory laws promoting them (SI 2018, PYQ-2515).',
        },
        {
          type: 'compare',
          caption: 'Constitutional Duties: 42nd Amendment (1976) vs 86th Amendment (2002)',
          colA: '42nd Amendment Act, 1976',
          colB: '86th Amendment Act, 2002',
          rows: [
            {
              label: 'Duties Introduced',
              a: 'Introduced 10 Fundamental Duties [Articles 51A(a) to 51A(j)]',
              b: 'Introduced 11th Fundamental Duty [Article 51A(k)]',
              lineId: 's6-cmp1',
            },
            {
              label: 'Recommending Body',
              a: 'Sardar Swaran Singh Committee (1976)',
              b: 'Tapas Majumdar Committee / 86th Amendment consensus',
              lineId: 's6-cmp2',
            },
            {
              label: 'Core Focus',
              a: 'National anthem, constitution, sovereignty, environment, scientific temper',
              b: 'Duty of parents to provide education to children aged 6 to 14',
              lineId: 's6-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-2515', sourceLine: 's6-c1' },
      ],
      cards: [
        { id: 'c6-1', front: 'Which committee recommended the incorporation of Fundamental Duties into the Constitution?', back: 'Sardar Swaran Singh Committee (1976)' },
        { id: 'c6-2', front: 'Which Part and Article of the Constitution contain Fundamental Duties?', back: 'Part IV-A, Article 51A' },
        { id: 'c6-3', front: 'How many Fundamental Duties were originally added by the 42nd Amendment, and how many are there today?', back: '10 duties were added by 42nd CAA (1976); 11 duties exist today (11th added by 86th CAA, 2002)' },
        { id: 'c6-4', front: 'Can Fundamental Duties be directly enforced by courts through writs?', back: 'No, they are non-justiciable, though Parliament can enforce them by ordinary statutory legislation' },
      ],
      traps: [
        {
          id: 't6-1',
          left: '42nd Constitutional Amendment Act, 1976',
          right: '86th Constitutional Amendment Act, 2002',
          why: '42nd CAA added Part IV-A with the original 10 duties; 86th CAA added the 11th duty for child education.',
          statements: [
            { text: 'Created Part IV-A and Article 51A in the Constitution', side: 'left' },
            { text: 'Added 10 Fundamental Duties on Swaran Singh Committee recommendation', side: 'left' },
            { text: 'Duty to develop scientific temper, humanism, and spirit of inquiry', side: 'left' },
            { text: 'Added 11th Fundamental Duty under Article 51A(k)', side: 'right' },
            { text: 'Duty of parent/guardian to provide education for child aged 6-14', side: 'right' },
          ],
        },
      ],
    },
  ],
}

export default fundamentalRightsDpspDuties
