import type { StudyChapter } from '~/types/study'

/**
 * Chapter: Judiciary & Constitutional Bodies
 * NOTE-POL-JUDICIARY - 22 verified TGPRB PYQs, 2015-2023.
 * Every section is authored to fit roughly one screen on the stage.
 */
const judiciary: StudyChapter = {
  slug: 'judiciary',
  noteId: 'NOTE-POL-JUDICIARY',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'Judiciary & Constitutional Bodies',
  summary: 'Integrated judicial system (Arts. 124-237), Supreme Court, High Courts & Subordinate Courts, Writs, and Constitutional & Statutory Bodies. 22 verified TGPRB PYQs, 2015-2023.',
  hasNote: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    // Section 1: Visual Architecture & Integrated Judicial System
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'integrated-judiciary',
      title: 'Visual Architecture & Integrated Judicial System (Arts. 124-237)',
      short: 'Architecture',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'Under the Constitution of India, there is a single <strong>integrated judicial system</strong> with the <strong>Supreme Court</strong> at the apex, <strong>High Courts</strong> at the state level, and <strong>Subordinate Courts</strong> below them. Unlike the United States which has a dual court system (federal courts enforcing federal laws and state courts enforcing state laws), the Indian judiciary is a single hierarchy that enforces both <strong>Union and State laws</strong>.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: 'Judicial independence is protected by constitutional safeguards: security of tenure, fixed conditions of service, expenses charged on the Consolidated Fund, and immunity from legislative discussion on judicial conduct. In 2015, a 5-judge Constitution Bench headed by <strong>Justice J.S. Kehar</strong> struck down the <strong>99th Constitutional Amendment Act</strong> and the <strong>National Judicial Appointments Commission (NJAC) Act</strong>, upholding the primacy of the Collegium system to safeguard judicial independence.',
        },
        {
          type: 'p',
          lineId: 's1-p3',
          html: 'The Supreme Court exercises robust judicial review over legislative and executive acts. For instance, in a landmark ruling on civil liberties, the Supreme Court stayed the operation of <strong>Section 124(A) of IPC</strong> (sedition law), directing all pending trials, appeals, and proceedings under Section 124(A) to be kept in abeyance.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's1-c1',
          html: 'TGPRB tests judicial milestones directly: Justice J.S. Kehar headed the 5-judge bench invalidating the NJAC Act in 2015, and the Supreme Court suspended Section 124(A) of IPC covering sedition.',
        },
        {
          type: 'compare',
          caption: 'Indian Integrated Judiciary vs US Dual Judicial System',
          colA: 'Indian Integrated Judiciary',
          colB: 'US Dual Judicial System',
          rows: [
            {
              label: 'Court Structure',
              a: 'Single integrated hierarchy (Supreme Court at apex, High Courts, Subordinate Courts)',
              b: 'Dual system (Federal Supreme Court and separate State Supreme Courts)',
              lineId: 's1-cmp1',
            },
            {
              label: 'Law Enforcement',
              a: 'All courts enforce both Union (central) and State laws',
              b: 'Federal courts enforce federal laws; State courts enforce state laws',
              lineId: 's1-cmp2',
            },
            {
              label: 'Appeals Pipeline',
              a: 'Direct appeals flow from Subordinate Courts to High Court to Supreme Court',
              b: 'State court decisions rarely reach federal courts unless a federal issue arises',
              lineId: 's1-cmp3',
            },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0312', sourceLine: 's1-p2' },
        { uid: 'PYQ-2653', sourceLine: 's1-p3' },
      ],
      cards: [
        {
          id: 'c1-1',
          front: 'Who headed the Supreme Court Constitution Bench that invalidated the NJAC Act in 2015?',
          back: 'Justice J.S. Kehar (4:1 majority restored the Collegium system).',
        },
        {
          id: 'c1-2',
          front: 'Which section of the Indian Penal Code covering sedition was suspended by the Supreme Court?',
          back: 'Section 124(A) of IPC.',
        },
        {
          id: 'c1-3',
          front: 'Does India have a dual court system like the United States?',
          back: 'No. India has a single integrated judicial system enforcing both Union and State laws.',
        },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'Indian Judiciary',
          right: 'US Judiciary',
          why: 'Candidates confuse the single integrated hierarchy of India with the dual court system of the United States.',
          statements: [
            { text: 'Single integrated hierarchy across Union and States', side: 'left' },
            { text: 'Dual court system with independent federal and state judiciaries', side: 'right' },
            { text: 'Enforces both central and state laws uniformly', side: 'left' },
            { text: 'Federal courts enforce only federal law; state courts enforce state law', side: 'right' },
          ],
        },
        {
          id: 't1-2',
          left: 'Collegium System',
          right: 'NJAC Act (99th Amendment)',
          why: 'NJAC attempted to replace the judiciary-led Collegium with a commission including the Law Minister, but was struck down in 2015.',
          statements: [
            { text: 'Judicial body comprising CJI and senior-most judges', side: 'left' },
            { text: 'Included Union Law Minister and two eminent persons', side: 'right' },
            { text: 'Restored by SC in Fourth Judges Case (2015)', side: 'left' },
            { text: 'Invalidated by 5-judge bench headed by Justice J.S. Kehar', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 2: Supreme Court of India
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'supreme-court',
      title: 'Supreme Court of India: Composition, Appointments & Jurisdictions (Arts. 124-147)',
      short: 'Supreme Court',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: '<strong>Article 124(1)</strong> establishes the Supreme Court of India. The power to prescribe and increase the number of judges in the Supreme Court belongs strictly to <strong>Parliament by passing a law</strong> (not the President). The current sanctioned strength is <strong>34 judges</strong> (1 Chief Justice of India + 33 other judges).',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: 'Under <strong>Article 124(2)</strong>, Supreme Court judges are appointed by the <strong>President of India</strong> on the binding advice of the Collegium (CJI + 4 senior-most judges). A Supreme Court judge holds office until attaining the age of <strong>65 years</strong>. Justice <strong>H.J. Kania</strong> served as the first Chief Justice of India (1950-1951).',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: 'The Supreme Court exercises three primary jurisdictions: <strong>Original Jurisdiction</strong> under Article 131 (exclusive jurisdiction over federal disputes between Centre and States or between States); <strong>Appellate Jurisdiction</strong> under Articles 132 to 136 (constitutional, civil, criminal appeals, and Special Leave Petitions); and <strong>Advisory Jurisdiction</strong> under Article 143 (opinion rendered to the President on legal questions). Under Article 129, it is a <strong>Court of Record</strong> with power to punish for contempt.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's2-c1',
          html: 'Crucial distinction: Parliament fixes the number of SC judges by law (Art. 124(1)), but the President appoints them (Art. 124(2)). The SC enjoys Original, Appellate, and Advisory jurisdictions.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0523', sourceLine: 's2-p1' },
        { uid: 'PYQ-0936', sourceLine: 's2-p2' },
        { uid: 'PYQ-0303', sourceLine: 's2-p2' },
        { uid: 'PYQ-2236', sourceLine: 's2-p3' },
      ],
      cards: [
        {
          id: 'c2-1',
          front: 'Who has the power to prescribe the number of judges in the Supreme Court?',
          back: 'Parliament by passing a law under Article 124(1).',
        },
        {
          id: 'c2-2',
          front: 'Who appoints Supreme Court judges, and at what age do they retire?',
          back: 'The President of India appoints them; they retire at 65 years of age.',
        },
        {
          id: 'c2-3',
          front: 'Who was the first Chief Justice of India?',
          back: 'Justice H.J. Kania (Harilal Jekisundas Kania).',
        },
        {
          id: 'c2-4',
          front: 'What jurisdictions are enjoyed by the Supreme Court of India?',
          back: 'Original Jurisdiction (Art. 131), Appellate Jurisdiction (Arts. 132-136), and Advisory Jurisdiction (Art. 143).',
        },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'Supreme Court Strength',
          right: 'High Court Strength',
          why: 'The strength of the Supreme Court is determined by Parliament by law, whereas the strength of a High Court is determined by the President.',
          statements: [
            { text: 'Prescribed by Parliament by law (Art. 124(1))', side: 'left' },
            { text: 'Determined from time to time by the President (Art. 216)', side: 'right' },
            { text: 'Currently fixed at 34 judges (33 + 1 CJI)', side: 'left' },
            { text: 'Varies widely depending on caseload across different states', side: 'right' },
          ],
        },
        {
          id: 't2-2',
          left: 'Original Jurisdiction (Art. 131)',
          right: 'Advisory Jurisdiction (Art. 143)',
          why: 'Article 131 resolves federal disputes between governments; Article 143 provides consultative non-binding opinions to the President.',
          statements: [
            { text: 'Dispute between Government of India and one or more States', side: 'left' },
            { text: 'Presidential reference on question of law or fact', side: 'right' },
            { text: 'Exclusive and binding federal dispute resolution', side: 'left' },
            { text: 'Opinion is consultative and not binding on the President', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 3: High Courts & Subordinate Courts
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'high-courts',
      title: 'High Courts & Subordinate Courts (Arts. 214-237)',
      short: 'High Courts',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: 'Under <strong>Article 214</strong>, there is a High Court for each State, though Parliament may establish a common High Court for two or more States (Article 231). India currently has <strong>25 High Courts</strong>. A separate High Court for the State of Andhra Pradesh was established with effect from <strong>January 1, 2019</strong> at Amaravati, while the High Court for the State of Telangana functions at Hyderabad. High Court judges retire at <strong>62 years</strong> of age (Article 217).',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: 'In the subordinate judiciary, <strong>District Judges</strong> are appointed under <strong>Article 233</strong> by the <strong>Governor of the State</strong> in consultation with the High Court exercising jurisdiction over that State. Postings and promotions of district judges are also regulated under Article 233.',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: 'To fulfill the constitutional directive of free legal aid under <strong>Article 39A</strong>, Parliament passed the <strong>Legal Services Authorities Act, 1987</strong>, creating NALSA, State Legal Services Authorities, and <strong>Lok Adalats</strong>. Statutory Lok Adalat awards have the status of a civil court decree and are final and non-appealable. India first mobile court was established in Haryana.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's3-c1',
          html: 'High Court judge retirement age is 62 years (SC judge is 65). District Judges are appointed by the Governor under Article 233 in consultation with the High Court. Total High Courts in India is 25 (AP High Court separated Jan 1, 2019).',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0549', sourceLine: 's3-p1' },
        { uid: 'PYQ-1113', sourceLine: 's3-p2' },
        { uid: 'PYQ-1562', sourceLine: 's3-p3' },
      ],
      cards: [
        {
          id: 'c3-1',
          front: 'When did the separate High Court for Andhra Pradesh commence functioning?',
          back: 'January 1, 2019 at Amaravati (taking total High Courts in India to 25).',
        },
        {
          id: 'c3-2',
          front: 'Under which Article are District Judges appointed, and by whom?',
          back: 'Article 233 by the Governor in consultation with the High Court.',
        },
        {
          id: 'c3-3',
          front: 'Where was India first mobile court established, and under which Act do Lok Adalats function?',
          back: 'Haryana; Lok Adalats function under the Legal Services Authorities Act, 1987 (implementing Art. 39A).',
        },
      ],
      traps: [
        {
          id: 't3-1',
          left: 'SC Judge Retirement',
          right: 'HC Judge Retirement',
          why: 'Frequent exam trap: Candidates mix up the retirement ages of SC and HC judges.',
          statements: [
            { text: 'Retires at 65 years of age', side: 'left' },
            { text: 'Retires at 62 years of age', side: 'right' },
            { text: 'Article 124(2) prescribes tenure', side: 'left' },
            { text: 'Article 217(1) prescribes tenure', side: 'right' },
          ],
        },
        {
          id: 't3-2',
          left: 'High Court Judge Appointment',
          right: 'District Judge Appointment',
          why: 'HC judges are appointed by the President, whereas District Judges are appointed by the Governor in consultation with the High Court.',
          statements: [
            { text: 'Appointed by President under Article 217', side: 'left' },
            { text: 'Appointed by Governor under Article 233', side: 'right' },
            { text: 'Consultation with CJI, Governor, and HC Chief Justice', side: 'left' },
            { text: 'Consultation with the High Court only', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 4: The 5 Constitutional Writs & Judicial Doctrines
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'writs-and-doctrines',
      title: 'The 5 Constitutional Writs & Judicial Review (Arts. 32 & 226)',
      short: 'Writs & Review',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: 'The Constitution provides extraordinary remedies through prerogative writs under <strong>Article 32</strong> (Supreme Court) and <strong>Article 226</strong> (High Courts). High Court writ jurisdiction is wider because it covers both Fundamental Rights and any other ordinary legal rights, whereas Article 32 is restricted to Fundamental Rights. The 5 writs are: <strong>Habeas Corpus</strong> (to produce an unlawfully detained person), <strong>Mandamus</strong> (commanding a public official to perform an obligatory public duty), <strong>Prohibition</strong> (preventing an inferior court or tribunal from exceeding jurisdiction), <strong>Certiorari</strong> (quashing an illegal order passed without jurisdiction), and <strong>Quo-Warranto</strong> (challenging the legality of a person claim to a public office).',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: '<strong>Public Interest Litigation (PIL)</strong> was pioneered by Justice P.N. Bhagwati and Justice V.R. Krishna Iyer to relax the traditional rule of <em>locus standi</em>. PIL protects people cause and common welfare, but higher courts possess complete judicial discretion whether to admit or dismiss a PIL petition.',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: 'In constitutional evolution, the <strong>24th Constitutional Amendment Act, 1971</strong> amended Article 13 and Article 368 to clarify that Parliament has constituent power to amend any provision of the Constitution, including Fundamental Rights. Later, the <strong>52nd Constitutional Amendment Act, 1985</strong> introduced the Anti-Defection Law in the <strong>Tenth Schedule (X Schedule)</strong>. In <em>Kihoto Hollohan (1992)</em>, the Supreme Court ruled that decisions of the Speaker under the 10th Schedule are subject to judicial review.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's4-c1',
          html: 'Key questions: PIL protects people cause and higher courts have discretion to admit it; 24th Amendment confirmed Fundamental Rights are amendable under Art. 368; Anti-defection law is contained in the X Schedule.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0321', sourceLine: 's4-p2' },
        { uid: 'PYQ-0760', sourceLine: 's4-p3' },
        { uid: 'PYQ-3062', sourceLine: 's4-p3' },
      ],
      cards: [
        {
          id: 'c4-1',
          front: 'Why is High Court writ jurisdiction under Article 226 broader than Supreme Court under Article 32?',
          back: 'Article 32 enforces only Fundamental Rights; Article 226 enforces Fundamental Rights as well as ordinary legal rights.',
        },
        {
          id: 'c4-2',
          front: 'Which Constitutional Amendment clarified that Fundamental Rights can be amended under Article 368?',
          back: '24th Constitutional Amendment Act, 1971.',
        },
        {
          id: 'c4-3',
          front: 'Which Schedule of the Constitution contains the Anti-Defection Law?',
          back: 'Tenth Schedule (X Schedule), added by the 52nd Constitutional Amendment Act, 1985.',
        },
      ],
      traps: [
        {
          id: 't4-1',
          left: 'Article 32 (Supreme Court)',
          right: 'Article 226 (High Court)',
          why: 'Article 32 is a Fundamental Right itself and cannot be refused, but is limited to FRs. Article 226 is discretionary but covers all legal rights.',
          statements: [
            { text: 'Remedy is itself a Fundamental Right (Part III)', side: 'left' },
            { text: 'Discretionary constitutional remedy', side: 'right' },
            { text: 'Can be invoked ONLY for Fundamental Rights violations', side: 'left' },
            { text: 'Can be invoked for Fundamental Rights and any other legal rights', side: 'right' },
          ],
        },
        {
          id: 't4-2',
          left: 'Prohibition',
          right: 'Certiorari',
          why: 'Prohibition is preventive (issued while proceedings are pending); Certiorari is curative (issued after order has been passed to quash it).',
          statements: [
            { text: 'Preventive writ issued while proceedings are pending', side: 'left' },
            { text: 'Curative writ issued to quash an order already passed', side: 'right' },
            { text: 'Commands an inferior tribunal not to exceed its jurisdiction', side: 'left' },
            { text: 'Transfers the record or quashes an order passed without jurisdiction', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 5: Constitutional Bodies
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'constitutional-bodies',
      title: 'Constitutional Bodies (CAG, ECI, FC, UPSC & Commissions)',
      short: 'Const. Bodies',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: '<strong>Constitutional bodies</strong> derive their authority directly from specific Articles of the Constitution. The <strong>Comptroller and Auditor General (CAG)</strong> under <strong>Article 148</strong> audits all receipts and expenditure of the Union and the States; the CAG serves a 6-year term or until age 65. Under <strong>Article 76</strong>, the <strong>Attorney General for India</strong> is appointed by the President and holds office during the <strong>pleasure of the President</strong> without a fixed 6-year tenure.',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'Under <strong>Article 324(2)</strong>, the <strong>Election Commission of India (ECI)</strong> consists of the Chief Election Commissioner and other Election Commissioners appointed by the <strong>President of India</strong> (not the Prime Minister). They hold office for 6 years or until age 65. Sukumar Sen was the first Chief Election Commissioner of India.',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: 'Under <strong>Article 280</strong>, the President constitutes the <strong>Finance Commission</strong> every 5 years. Its primary purview under Article 280(3) includes recommending the distribution of net tax proceeds between Union and States, principles governing grants-in-aid, and measures to augment State Consolidated Funds for local bodies. The <strong>14th Finance Commission</strong> was chaired by <strong>Dr. Y.V. Reddy</strong> and recommended devolving 42 percent of central divisible taxes to States. K.C. Neogy was the first Finance Commission Chairman.',
        },
        {
          type: 'p',
          lineId: 's5-p4',
          html: 'Other crucial constitutional bodies include the <strong>Inter-State Council</strong> under <strong>Article 263</strong> (established in 1990 on the recommendation of the <strong>Sarkaria Commission</strong>, with the Prime Minister as Chairman and all Chief Ministers as members), the <strong>Special Officer for Linguistic Minorities</strong> under <strong>Article 350B</strong>, and the <strong>National Commission for Backward Classes (NCBC)</strong> which was accorded constitutional status under <strong>Article 338B</strong> by the <strong>102nd Constitutional Amendment Act, 2018</strong>.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's5-c1',
          html: 'ECI members are appointed by the President (Art. 324). Attorney General holds office during the pleasure of the President. Inter-State Council was recommended by Sarkaria Commission. NCBC became constitutional via the 102nd Amendment.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0318', sourceLine: 's5-p1' },
        { uid: 'PYQ-0649', sourceLine: 's5-p2' },
        { uid: 'PYQ-0320', sourceLine: 's5-p3' },
        { uid: 'PYQ-2519', sourceLine: 's5-p3' },
        { uid: 'PYQ-0516', sourceLine: 's5-p4' },
        { uid: 'PYQ-0763', sourceLine: 's5-p4' },
        { uid: 'PYQ-3049', sourceLine: 's5-p4' },
      ],
      cards: [
        {
          id: 'c5-1',
          front: 'What is the tenure of the Attorney General of India under Article 76?',
          back: 'Holds office during the pleasure of the President (no fixed 6-year tenure).',
        },
        {
          id: 'c5-2',
          front: 'Who headed the 14th Finance Commission and what tax devolution percentage did it recommend?',
          back: 'Dr. Y.V. Reddy; recommended 42 percent central tax devolution to States.',
        },
        {
          id: 'c5-3',
          front: 'On whose recommendation was the Inter-State Council established under Article 263 in 1990?',
          back: 'Sarkaria Commission on Centre-State Relations.',
        },
        {
          id: 'c5-4',
          front: 'Which Constitutional Amendment gave constitutional status to the National Commission for Backward Classes under Article 338B?',
          back: '102nd Constitutional Amendment Act, 2018.',
        },
        {
          id: 'c5-5',
          front: 'Is the Special Officer for Linguistic Minorities a constitutional body?',
          back: 'Yes, established under Article 350B of the Indian Constitution.',
        },
      ],
      traps: [
        {
          id: 't5-1',
          left: 'CAG of India (Art. 148)',
          right: 'Attorney General (Art. 76)',
          why: 'CAG has fixed security of tenure (6 years or 65 years of age); Attorney General holds office at the pleasure of the President.',
          statements: [
            { text: 'Fixed term of 6 years or 65 years of age', side: 'left' },
            { text: 'Holds office during the pleasure of the President', side: 'right' },
            { text: 'Audits accounts of both Union and State governments', side: 'left' },
            { text: 'Chief legal advisor to the Government of India', side: 'right' },
          ],
        },
        {
          id: 't5-2',
          left: 'Sarkaria Commission',
          right: 'J.S. Verma Committee',
          why: 'Inter-State Council was set up under Art. 263 on the recommendation of Sarkaria Commission, not J.S. Verma Committee (which dealt with criminal law amendments).',
          statements: [
            { text: 'Recommended establishment of Inter-State Council in 1990', side: 'left' },
            { text: 'Dealt with criminal law amendments and women safety', side: 'right' },
            { text: 'Report on Centre-State relations submitted in 1988', side: 'left' },
            { text: 'Report submitted post-2012 Delhi incident', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    // Section 6: Statutory & Non-Constitutional Bodies
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'statutory-bodies',
      title: 'Statutory & Non-Constitutional Bodies (NHRC, CVC, Lokpal & NITI Aayog)',
      short: 'Statutory Bodies',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: 'While constitutional bodies derive their mandate from constitutional articles, <strong>statutory bodies</strong> are created by Acts of Parliament, and <strong>extra-constitutional bodies</strong> are created by executive cabinet resolutions. The <strong>National Human Rights Commission (NHRC)</strong> is a statutory body established under the <strong>Protection of Human Rights Act, 1993</strong>, NOT a constitutional body.',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'Under the <strong>Lokpal and Lokayuktas Act, 2013</strong>, an independent anti-corruption ombudsman was established. In 2018, the Union Government constituted the <strong>Lokpal Search Committee</strong> headed by former Supreme Court judge <strong>Justice Ranjana Prakash Desai</strong> to recommend names for appointment as Chairperson and Members of Lokpal.',
        },
        {
          type: 'p',
          lineId: 's6-p3',
          html: '<strong>NITI Aayog</strong> (National Institution for Transforming India) was formed on <strong>January 1, 2015</strong> by an executive resolution of the Union Cabinet to replace the 65-year-old Planning Commission. It functions as the government premier policy think tank promoting cooperative federalism; it is neither a constitutional nor a statutory body.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Angle',
          lineId: 's6-c1',
          html: 'NHRC is a statutory body (non-constitutional). NITI Aayog stands for National Institution for Transforming India (executive body). Lokpal Search Committee was headed by Justice Ranjana Prakash Desai.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-2707', sourceLine: 's6-p1' },
        { uid: 'PYQ-0627', sourceLine: 's6-p2' },
        { uid: 'PYQ-1796', sourceLine: 's6-p3' },
      ],
      cards: [
        {
          id: 'c6-1',
          front: 'What type of body is NHRC and under which Act was it established?',
          back: 'Statutory body established under the Protection of Human Rights Act, 1993.',
        },
        {
          id: 'c6-2',
          front: 'Who chaired the Lokpal Search Committee constituted in September 2018?',
          back: 'Justice Ranjana Prakash Desai.',
        },
        {
          id: 'c6-3',
          front: 'What does NITI Aayog stand for and what is its legal nature?',
          back: 'National Institution for Transforming India; it is an extra-constitutional body created by Cabinet resolution on January 1, 2015.',
        },
      ],
      traps: [
        {
          id: 't6-1',
          left: 'Constitutional Body',
          right: 'Statutory Body',
          why: 'Candidates frequently mix up constitutional bodies (created by constitutional articles) with statutory bodies (created by Acts of Parliament).',
          statements: [
            { text: 'Election Commission of India (Art. 324)', side: 'left' },
            { text: 'National Human Rights Commission (PHRA 1993)', side: 'right' },
            { text: 'Comptroller and Auditor General (Art. 148)', side: 'left' },
            { text: 'Central Vigilance Commission (CVC Act 2003)', side: 'right' },
            { text: 'Finance Commission (Art. 280)', side: 'left' },
            { text: 'Lokpal of India (Lokpal Act 2013)', side: 'right' },
          ],
        },
        {
          id: 't6-2',
          left: 'Statutory Body',
          right: 'Extra-Constitutional Body',
          why: 'Statutory bodies are created by Acts of Parliament; extra-constitutional bodies are created by executive cabinet resolution.',
          statements: [
            { text: 'Created by an Act of Parliament', side: 'left' },
            { text: 'Created by executive resolution of the Cabinet', side: 'right' },
            { text: 'NHRC, CVC, Lokpal', side: 'left' },
            { text: 'NITI Aayog (and former Planning Commission)', side: 'right' },
          ],
        },
      ],
    },
  ],
}

export default judiciary
