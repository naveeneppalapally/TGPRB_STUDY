import type { StudyChapter } from '~/types/study'

/**
 * Chapter: Parliament of India (Union Legislature)
 * NOTE-POL-UNION-EXEC - PYQ refs point to uids in data/pyq_enriched_master.json.
 * Every section is authored to fit roughly one screen on the stage.
 */
const parliament: StudyChapter = {
  slug: 'parliament',
  noteId: 'NOTE-POL-UNION-EXEC',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'Parliament of India',
  summary: 'Composition (Art. 79-81), Rajya Sabha vs Lok Sabha, presiding officers, Money Bills and parliamentary devices. 18 verified TGPRB PYQs, 2015-2023.',
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'composition',
      title: 'What "Parliament" means (Art. 79)',
      short: 'Composition',
      estMinutes: 2,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'Under <span class="hot">Article 79</span>, the Parliament of India consists of <strong>three</strong> parts: the <strong>President</strong>, the <strong>Council of States (Rajya Sabha)</strong> and the <strong>House of the People (Lok Sabha)</strong>. The President is a constituent part of Parliament but is <strong>not a member of either House</strong>.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: 'The two-House structure is called <strong>bicameralism</strong>. Part V, Chapter II of the Constitution (Articles 79 to 122) deals with the organisation, composition, duration, officers, procedures and privileges of Parliament.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam angle',
          lineId: 's1-c1',
          html: 'TGPRB asks "Parliament means" as a direct one-liner. The answer is always <strong>all three</strong> (President + Rajya Sabha + Lok Sabha), never just the two Houses. SI 2022 Prelims tested exactly this.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-2699', sourceLine: 's1-p1' },
      ],
      cards: [
        { id: 'c1-1', front: 'Which Article says Parliament consists of the President and two Houses?', back: 'Article 79' },
        { id: 'c1-2', front: 'Is the President a member of Parliament?', back: 'No. The President is a part of Parliament under Art. 79 but is not a member of either House.' },
        { id: 'c1-3', front: 'Articles that cover Parliament in Part V, Chapter II', back: 'Articles 79 to 122' },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'Part of Parliament',
          right: 'NOT Part of Parliament',
          why: 'Under Art. 79, Parliament consists strictly of President + two Houses. The Vice-President or Ministers are NOT constituent parts of Parliament.',
          statements: [
            { text: 'President of India', side: 'left' },
            { text: 'Council of States (Rajya Sabha)', side: 'left' },
            { text: 'House of the People (Lok Sabha)', side: 'left' },
            { text: 'Vice-President of India', side: 'right' },
            { text: 'Prime Minister of India', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'rajya-sabha',
      title: 'Rajya Sabha - Council of States (Art. 80)',
      short: 'Rajya Sabha',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: '<span class="hot">Article 80</span> fixes the maximum strength of the Rajya Sabha at <strong>250</strong>: up to <strong>238</strong> representatives of the States and Union Territories, plus <strong>12</strong> members <strong>nominated by the President</strong> for special knowledge or practical experience in literature, science, art and social service.',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: 'State representatives are elected <strong>indirectly</strong> by the elected members of the State Legislative Assembly, by proportional representation using the <strong>single transferable vote</strong>. Seats are allotted by population, so they are unequal: Uttar Pradesh 31, Andhra Pradesh 11, Gujarat 11, <strong>Telangana 7</strong>.',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: 'The Rajya Sabha is a <strong>permanent body</strong> and is never dissolved. Under <span class="hot">Article 83(1)</span>, <strong>one-third</strong> of its members retire every <strong>second year</strong>; each member serves a <strong>six-year</strong> term. Minimum age to be a member is <strong>30</strong> (Art. 84).',
        },
        {
          type: 'p',
          lineId: 's2-p4',
          html: 'Special powers only the Rajya Sabha has: a resolution by <strong>two-thirds</strong> majority under <span class="hot">Article 249</span> lets Parliament legislate on a <strong>State List</strong> matter in the national interest; and under <strong>Article 312</strong> it can authorise the creation of new All-India Services.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Trap: who nominates and how many',
          lineId: 's2-c1',
          html: 'It is the <strong>President</strong> who nominates <strong>12</strong> members to the Rajya Sabha. Constable 2023 Mains offered 10 / 11 / 12 / 13 as options. Actual nominated members asked in 2015-2016 papers: <strong>K.T. Tulsi</strong> and <strong>K. Parasaran</strong>.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0998', sourceLine: 's2-p1' },
        { uid: 'PYQ-1182', sourceLine: 's2-p1' },
        { uid: 'PYQ-0313', sourceLine: 's2-c1' },
        { uid: 'PYQ-0309', sourceLine: 's2-p2' },
        { uid: 'PYQ-0164', sourceLine: 's2-p4' },
      ],
      cards: [
        { id: 'c2-1', front: 'Maximum strength of Rajya Sabha and its split', back: '250 = 238 (States + UTs) + 12 (nominated by President). Article 80.' },
        { id: 'c2-2', front: 'How often does one-third of Rajya Sabha retire?', back: 'Every second year (Art. 83(1)). Member term is 6 years.' },
        { id: 'c2-3', front: 'Rajya Sabha seats: Telangana, Andhra Pradesh, Gujarat', back: 'Telangana 7, Andhra Pradesh 11, Gujarat 11 (AP and Gujarat are equal).' },
        { id: 'c2-4', front: 'Article that lets Rajya Sabha open a State List subject to Parliament', back: 'Article 249 - resolution by two-thirds majority, in the national interest.' },
        { id: 'c2-5', front: 'Minimum age for Rajya Sabha membership', back: '30 years (Art. 84). Lok Sabha is 25.' },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'Rajya Sabha',
          right: 'Lok Sabha',
          why: 'Numbers get swapped under exam pressure: 250 / 552, 6 yrs / 5 yrs, 30 / 25.',
          statements: [
            { text: 'Permanent body, never dissolved', side: 'left' },
            { text: 'Maximum strength 250', side: 'left' },
            { text: 'Minimum age 25', side: 'right' },
            { text: 'Members serve six years', side: 'left' },
            { text: 'Term of five years from first sitting', side: 'right' },
            { text: 'Has 12 nominated members', side: 'left' },
            { text: 'Elected by direct adult franchise', side: 'right' },
            { text: 'Can pass an Art. 249 resolution on the State List', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'lok-sabha',
      title: 'Lok Sabha - House of the People (Art. 81)',
      short: 'Lok Sabha',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: '<span class="hot">Article 81</span> (with Art. 331) fixed the maximum strength of the Lok Sabha at <strong>552</strong>: 530 from States, 20 from Union Territories and 2 Anglo-Indians nominated by the President. The <strong>104th Amendment (2019)</strong> ended Anglo-Indian nomination from January 2020, so the ceiling is now <strong>550</strong>. Actual strength is <strong>543</strong>.',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: 'Members are elected <strong>directly</strong> by universal adult franchise from territorial constituencies. Under <span class="hot">Article 83(2)</span> the House continues for <strong>five years</strong> from its first sitting unless dissolved earlier; during a National Emergency Parliament can extend it by <strong>one year at a time</strong>. Minimum age: <strong>25</strong>.',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: 'Constituency extremes asked repeatedly: the <strong>largest</strong> by number of electors is <strong>Malkajgiri (Telangana)</strong>; the <strong>smallest</strong> is <strong>Lakshadweep</strong>. Telangana sends <strong>17</strong> members to the Lok Sabha. Seats are unequal by population: Rajasthan 25, Odisha 21.',
        },
        {
          type: 'compare',
          caption: 'Rajya Sabha vs Lok Sabha - the contrast table TGPRB draws from',
          colA: 'Rajya Sabha',
          colB: 'Lok Sabha',
          rows: [
            { label: 'Article', a: '80', b: '81', lineId: 's3-r1' },
            { label: 'Max strength', a: '250 (238 + 12)', b: '552 -> 550 after 104th CAA; 543 actual', lineId: 's3-r2' },
            { label: 'Nature', a: 'Permanent, never dissolved', b: 'Dissolvable', lineId: 's3-r3' },
            { label: 'Term', a: '6 yrs per member; 1/3 retire every 2nd yr', b: '5 yrs per House (Art. 83(2))', lineId: 's3-r4' },
            { label: 'Election', a: 'Indirect, by MLAs (STV)', b: 'Direct, adult franchise', lineId: 's3-r5' },
            { label: 'Minimum age', a: '30', b: '25', lineId: 's3-r6' },
            { label: 'Presiding officer', a: 'Vice-President (ex-officio Chairman)', b: 'Speaker (elected member)', lineId: 's3-r7' },
            { label: 'Money Bill', a: 'Recommendations only, 14 days', b: 'Originates here; final say', lineId: 's3-r8' },
            { label: 'Telangana seats', a: '7', b: '17', lineId: 's3-r9' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1077', sourceLine: 's3-p1' },
        { uid: 'PYQ-0326', sourceLine: 's3-p3' },
        { uid: 'PYQ-0191', sourceLine: 's3-p3' },
      ],
      cards: [
        { id: 'c3-1', front: 'Constitutional maximum of Lok Sabha as originally fixed, and after 104th CAA', back: '552 (530 + 20 + 2 Anglo-Indian). After 104th CAA (2019): 550. Actual: 543.' },
        { id: 'c3-2', front: 'Largest and smallest Lok Sabha constituencies by electors', back: 'Largest: Malkajgiri (Telangana). Smallest: Lakshadweep.' },
        { id: 'c3-3', front: 'How long can Lok Sabha be extended during a National Emergency?', back: 'One year at a time, by law of Parliament (Art. 83(2)).' },
        { id: 'c3-4', front: 'Telangana seats in Lok Sabha and Rajya Sabha', back: 'Lok Sabha 17, Rajya Sabha 7.' },
      ],
      traps: [
        {
          id: 't3-1',
          left: '552',
          right: '543',
          why: 'One is the constitutional ceiling (as originally fixed), the other is the actual elected strength.',
          statements: [
            { text: 'Number "allotted" by the Constitution (Art. 81 + 331)', side: 'left' },
            { text: 'Members who actually sit today', side: 'right' },
            { text: 'Includes 2 Anglo-Indian nominees', side: 'left' },
            { text: 'Number of constituencies in the 2024 election', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'presiding-officers',
      title: 'Speaker, Deputy Speaker and Chairman',
      short: 'Presiding officers',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: 'Under <span class="hot">Article 93</span> the Lok Sabha elects a <strong>Speaker</strong> and a <strong>Deputy Speaker</strong> from among its members. Under <span class="hot">Article 94</span> the Speaker resigns by writing to the <strong>Deputy Speaker</strong>, and the Deputy Speaker resigns to the <strong>Speaker</strong>. Neither resigns to the President.',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: 'The Speaker does not vote in the first instance. <span class="hot">Article 100(1)</span> gives the presiding officer a <strong>casting vote</strong> only when votes are equal. The Speaker also has the <strong>final</strong> word on whether a bill is a Money Bill (Art. 110(3)).',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: 'A <strong>joint sitting</strong> (Art. 108) is presided over by the <strong>Speaker</strong>; in the Speaker\'s absence, the <strong>Deputy Speaker</strong>; then the <strong>Deputy Chairman</strong> of the Rajya Sabha; then a member chosen by the sitting. The <strong>Chairman of the Rajya Sabha never presides</strong>, because the Vice-President is not a member of either House.',
        },
        {
          type: 'p',
          lineId: 's4-p4',
          html: 'Convention, not law: since the <strong>11th Lok Sabha (1996)</strong> the Deputy Speaker\'s post has been offered to the <strong>opposition</strong>. The Speaker does <strong>not</strong> appoint the Leader of Opposition and does <strong>not</strong> nominate members to the House.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Asked in 2015, 2016, 2018 (twice)',
          lineId: 's4-c1',
          html: 'Casting vote article (100), joint-sitting chair order, resignation addressee and the 11th Lok Sabha convention are the four Speaker facts TGPRB has actually tested.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0519', sourceLine: 's4-p2' },
        { uid: 'PYQ-2203', sourceLine: 's4-p3' },
        { uid: 'PYQ-0754', sourceLine: 's4-p4' },
        { uid: 'PYQ-0314', sourceLine: 's4-p1' },
      ],
      cards: [
        { id: 'c4-1', front: 'Speaker\'s casting vote - which Article?', back: 'Article 100(1). Only when votes are equal.' },
        { id: 'c4-2', front: 'To whom does the Speaker address a resignation?', back: 'To the Deputy Speaker (Art. 94). Deputy Speaker resigns to the Speaker.' },
        { id: 'c4-3', front: 'Order of presiding at a joint sitting', back: 'Speaker -> Deputy Speaker -> Deputy Chairman of RS -> member chosen by the sitting. Never the RS Chairman.' },
        { id: 'c4-4', front: 'Since which Lok Sabha has Deputy Speaker gone to the opposition?', back: '11th Lok Sabha, 1996 (convention).' },
      ],
      traps: [
        {
          id: 't4-1',
          left: 'Speaker (LS)',
          right: 'Chairman (RS)',
          why: 'One is an elected member of the House; the other is the Vice-President, not a member at all.',
          statements: [
            { text: 'Elected from among members of the House', side: 'left' },
            { text: 'Ex-officio post held by the Vice-President', side: 'right' },
            { text: 'Certifies a Money Bill', side: 'left' },
            { text: 'Presides over a joint sitting', side: 'left' },
            { text: 'Not a member of either House', side: 'right' },
            { text: 'Resigns to the Deputy Speaker', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'money-bills',
      title: 'Money Bills vs Ordinary Bills (Art. 109-110)',
      short: 'Money Bills',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: 'A <strong>Money Bill</strong> is defined in <span class="hot">Article 110</span>: it deals <em>only</em> with taxes, borrowing, the Consolidated Fund or Contingency Fund, appropriation, audit and related matters. Under <span class="hot">Article 109</span> it can be introduced <strong>only in the Lok Sabha</strong>, and only on the <strong>recommendation of the President</strong>.',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'The Rajya Sabha gets <strong>14 days</strong> to return a Money Bill with recommendations, which the Lok Sabha may accept or reject. There is <strong>no joint sitting</strong> for a Money Bill. Because the President has already recommended its introduction, the President <strong>cannot return</strong> a Money Bill for reconsideration.',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: 'Any member (minister or <strong>private member</strong>) may introduce a bill in their House. If the bill has been published in the <strong>Gazette</strong> before introduction, no motion for leave to introduce is needed. But <strong>not all bills</strong> can start in either House: Money Bills and <strong>Financial Bills Type I (Art. 117(1))</strong> start only in the Lok Sabha.',
        },
        {
          type: 'compare',
          caption: 'Money Bill vs Ordinary Bill',
          colA: 'Money Bill',
          colB: 'Ordinary Bill',
          rows: [
            { label: 'Defined in', a: 'Art. 110', b: 'No definition; anything not money/financial', lineId: 's5-r1' },
            { label: 'Introduced in', a: 'Lok Sabha only, on President\'s recommendation', b: 'Either House', lineId: 's5-r2' },
            { label: 'Certified by', a: 'Speaker (final, Art. 110(3))', b: 'Not applicable', lineId: 's5-r3' },
            { label: 'Rajya Sabha power', a: '14 days, recommendations only', b: 'Equal power to amend or reject', lineId: 's5-r4' },
            { label: 'Joint sitting (Art. 108)', a: 'Never', b: 'Yes, on deadlock', lineId: 's5-r5' },
            { label: 'President can return it?', a: 'No', b: 'Yes, once (Art. 111)', lineId: 's5-r6' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1107', sourceLine: 's5-p1' },
        { uid: 'PYQ-0301', sourceLine: 's5-p2' },
        { uid: 'PYQ-2517', sourceLine: 's5-p3' },
      ],
      cards: [
        { id: 'c5-1', front: 'In which House can a Money Bill NOT be introduced?', back: 'Council of States (Rajya Sabha). Art. 109(1).' },
        { id: 'c5-2', front: 'How long does Rajya Sabha get with a Money Bill?', back: '14 days, for recommendations only.' },
        { id: 'c5-3', front: 'Who decides whether a bill is a Money Bill?', back: 'The Speaker of Lok Sabha; the decision is final (Art. 110(3)).' },
        { id: 'c5-4', front: 'Which bills cannot be introduced in Rajya Sabha?', back: 'Money Bills (Art. 110) and Financial Bills Type I (Art. 117(1)).' },
      ],
      traps: [
        {
          id: 't5-1',
          left: 'Money Bill',
          right: 'Financial Bill (Type I)',
          why: 'Both start only in Lok Sabha with President\'s recommendation. Everything after introduction differs.',
          statements: [
            { text: 'Defined under Article 110', side: 'left' },
            { text: 'Governed by Article 117(1)', side: 'right' },
            { text: 'Rajya Sabha limited to 14 days', side: 'left' },
            { text: 'Rajya Sabha can amend or reject', side: 'right' },
            { text: 'Joint sitting possible on deadlock', side: 'right' },
            { text: 'Speaker\'s certificate decides its character', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'devices-committees',
      title: 'Question Hour, Zero Hour and Committees',
      short: 'Devices & committees',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: '<strong>Question Hour</strong> is the <strong>first hour</strong> of every sitting, reserved for questions to ministers, and is mentioned in the Rules of Procedure. <strong>Zero Hour</strong> begins right after it (around 12 noon), needs <strong>no prior notice</strong>, is <strong>not</strong> in the Rules, and is an <strong>Indian innovation</strong> in parliamentary practice dating to <strong>1962</strong>.',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'The <strong>Estimates Committee</strong> has <strong>30 members, all from the Lok Sabha</strong>, elected yearly by proportional representation (STV); it is nicknamed the <em>continuous economy committee</em>. The <strong>Public Accounts Committee</strong> has <strong>22 members (15 LS + 7 RS)</strong>, examines <strong>CAG reports</strong>, and by convention since 1967 its chairman comes from the <strong>opposition</strong>.',
        },
        {
          type: 'p',
          lineId: 's6-p3',
          html: 'The Committee on Empowerment of Women is a <strong>standing</strong> committee, not a departmentally related one; the Committee on Home Affairs is a <strong>department-related standing committee</strong>, not a Joint Parliamentary Committee.',
        },
        {
          type: 'timeline',
          caption: 'Dates TGPRB has pulled from this section',
          events: [
            { year: '1950', label: 'Estimates Committee constituted on Speaker Mavalankar\'s recommendation', lineId: 's6-t1' },
            { year: '1962', label: 'Zero Hour emerges as an Indian innovation', lineId: 's6-t2' },
            { year: '1967', label: 'PAC chair goes to the opposition by convention', lineId: 's6-t3' },
            { year: '1993', label: 'Department-related standing committees (17) set up', lineId: 's6-t4' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1834', sourceLine: 's6-p1' },
        { uid: 'PYQ-0768', sourceLine: 's6-p2' },
      ],
      cards: [
        { id: 'c6-1', front: 'Which hour is reserved for questions, and when does Zero Hour start?', back: 'Question Hour = first hour of the sitting. Zero Hour starts right after, around 12 noon.' },
        { id: 'c6-2', front: 'Zero Hour - origin and status', back: 'Indian innovation, 1962. Not mentioned in the Rules of Procedure.' },
        { id: 'c6-3', front: 'Estimates Committee: size and House', back: '30 members, all from Lok Sabha, elected yearly by STV.' },
        { id: 'c6-4', front: 'Public Accounts Committee: size and split', back: '22 = 15 Lok Sabha + 7 Rajya Sabha. Examines CAG reports.' },
      ],
      traps: [
        {
          id: 't6-1',
          left: 'Question Hour',
          right: 'Zero Hour',
          why: 'Both happen daily and back to back; only one is in the rulebook.',
          statements: [
            { text: 'First hour of every sitting', side: 'left' },
            { text: 'Mentioned in the Rules of Procedure', side: 'left' },
            { text: 'Starts around 12 noon', side: 'right' },
            { text: 'Indian innovation from 1962', side: 'right' },
            { text: 'No prior notice required', side: 'right' },
          ],
        },
        {
          id: 't6-2',
          left: 'Estimates Committee',
          right: 'Public Accounts Committee',
          why: 'Similar-sounding financial committees with different size, House mix and job.',
          statements: [
            { text: '30 members, all Lok Sabha', side: 'left' },
            { text: '22 members: 15 LS + 7 RS', side: 'right' },
            { text: 'Examines CAG audit reports', side: 'right' },
            { text: 'Called the "continuous economy committee"', side: 'left' },
            { text: 'Chairman from opposition by convention since 1967', side: 'right' },
          ],
        },
      ],
    },
  ],
}

export default parliament
