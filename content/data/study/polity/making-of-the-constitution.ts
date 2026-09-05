import type { StudyChapter } from '~/types/study'

/**
 * Chapter: Making of the Indian Constitution
 * NOTE-POL-MAKING-CONST - PYQ refs point to uids in data/pyq_enriched_master.json.
 * Every section is authored to fit roughly one screen on the stage.
 */
const makingOfTheConstitution: StudyChapter = {
  slug: 'making-of-the-constitution',
  noteId: 'NOTE-POL-MAKING-CONST',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'Making of the Indian Constitution',
  summary: 'Demand timeline (1934-1946), Cabinet Mission composition, milestone sittings, 8 major committees, Drafting Committee roster, dual functions, calligraphy and constants. 9 verified PYQs.',
  hasNote: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'demand-timeline',
      title: 'Demand Timeline & The Cabinet Mission Plan (1934-1946)',
      short: 'Demand Timeline',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'The demand for an indigenous Constituent Assembly to frame India\'s constitution was first put forward in 1934 by <span class="hot">M.N. Roy</span>, a pioneer of the communist movement in India and exponent of radical humanism. In 1935, the Indian National Congress (INC) officially demanded a Constituent Assembly, reaffirmed at the <strong>1936 Faizpur session</strong> under Jawaharlal Nehru.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: 'In 1938, <span class="hot">Jawaharlal Nehru</span> declared on behalf of the INC that the Constitution of free India must be framed by an assembly elected on the basis of <strong>adult franchise</strong>, without outside interference. The British Government accepted the demand in principle for the first time in the <span class="hot">August Offer of 1940</span> (Viceroy Linlithgow, stating the body would consist "mainly of Indians"). The <strong>Cripps Mission of 1942</strong> offered a post-war assembly with Dominion status, but was rejected by Congress and the Muslim League.',
        },
        {
          type: 'p',
          lineId: 's1-p3',
          html: 'The Constituent Assembly was formulated under the <span class="hot">Cabinet Mission Plan of 1946</span> (arrived March 24, 1946; announced May 16, 1946). The 3-member mission comprised <span class="hot">Lord Pethick-Lawrence</span> (Secretary of State for India), <span class="hot">Sir Stafford Cripps</span> (President of Board of Trade), and <span class="hot">A.V. Alexander</span> (First Lord of Admiralty). The Plan rejected the Muslim League\'s demand for two separate Constituent Assemblies and formulated a single 389-member assembly for undivided India.',
        },
        {
          type: 'timeline',
          caption: 'Evolution of the Demand for the Constituent Assembly (1934-1946)',
          events: [
            { year: '1934', label: 'M.N. Roy puts forward the formal idea of a Constituent Assembly', lineId: 's1-t1' },
            { year: '1935', label: 'INC officially demands a Constituent Assembly (Faizpur 1936)', lineId: 's1-t2' },
            { year: '1938', label: 'Jawaharlal Nehru demands an assembly elected by universal adult franchise', lineId: 's1-t3' },
            { year: '1940', label: 'August Offer: British accept demand in principle ("mainly of Indians")', lineId: 's1-t4' },
            { year: '1942', label: 'Cripps Mission: Draft declaration proposing post-war assembly', lineId: 's1-t5' },
            { year: '1946', label: 'Cabinet Mission Plan: Formulates the 389-seat Constituent Assembly', lineId: 's1-t6' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1560', sourceLine: 's1-p3' },
      ],
      cards: [
        { id: 'c1-1', front: 'Who first put forward the idea of a Constituent Assembly for India, and when?', back: 'M.N. Roy in 1934 (pioneer of communist movement and radical humanism)' },
        { id: 'c1-2', front: 'Which British mission formulated the scheme for the Constituent Assembly?', back: 'Cabinet Mission Plan of 1946 (rejected two separate assemblies; created single 389-seat body)' },
        { id: 'c1-3', front: 'Name the 3 members of the Cabinet Mission (1946)', back: 'Lord Pethick-Lawrence (Secretary of State), Sir Stafford Cripps, and A.V. Alexander' },
        { id: 'c1-4', front: 'August Offer (1940): Viceroy and critical limitation', back: 'Announced by Lord Linlithgow; limited the body to "mainly of Indians" (not exclusively Indians).' },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'M.N. Roy (1934)',
          right: 'Jawaharlal Nehru (1938)',
          why: 'M.N. Roy first initiated the idea; Nehru formulated the adult franchise requirement on behalf of INC.',
          statements: [
            { text: 'First individual to put forward the formal idea of a Constituent Assembly', side: 'left' },
            { text: 'Pioneer of the communist movement and radical humanism in India', side: 'left' },
            { text: 'Declared assembly must be elected on the basis of adult franchise', side: 'right' },
            { text: 'Moved the historic Objectives Resolution in the Assembly', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'assembly-composition',
      title: 'Assembly Composition & Architecture (389 to 299 Seats)',
      short: 'Composition',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: 'Under the Cabinet Mission Plan, the total strength of the Constituent Assembly was fixed at <span class="hot">389 seats</span>: <strong>296 seats for British India</strong> (292 from 11 Governors\' Provinces and 4 from Chief Commissioners\' Provinces: Delhi, Ajmer-Merwara, Coorg, British Baluchistan) and <strong>93 seats for Indian Princely States</strong>.',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: 'Seats were allocated in proportion to respective population at roughly <span class="hot">1 seat per 1 million (10 lakh)</span> inhabitants. Seats in British India were divided among 3 communities: <span class="hot">Muslims, Sikhs (in Punjab), and General</span> (all others). Provincial members were elected <strong>indirectly</strong> by Provincial Legislative Assemblies using <strong>proportional representation by single transferable vote (STV)</strong>, while Princely State representatives were <strong>nominated by rulers</strong>. The Assembly was thus <span class="hot">partly elected and partly nominated</span>.',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: 'Following the Mountbatten Plan (June 3, 1947) and partition, representatives of Pakistan areas withdrew. The total strength was reduced to <span class="hot">299 members</span> as of December 31, 1947: <strong>229 representing Indian Provinces</strong> and <strong>70 representing Princely States</strong>.',
        },
        {
          type: 'compare',
          caption: 'Constituent Assembly Strength: Pre-Partition vs Post-Partition',
          colA: 'Cabinet Mission Plan (1946)',
          colB: 'Post-Partition (Dec 31, 1947)',
          rows: [
            { label: 'Total Strength', a: '389 seats', b: '299 seats (-90 seats)', lineId: 's2-r1' },
            { label: 'Provinces / British India', a: '296 seats (292 + 4 CCP)', b: '229 seats (-67 seats)', lineId: 's2-r2' },
            { label: 'Princely States', a: '93 seats (nominated by rulers)', b: '70 seats (-23 seats)', lineId: 's2-r3' },
            { label: 'Constitutional Character', a: 'Partly elected, partly nominated', b: 'Sovereign legislative parliament', lineId: 's2-r4' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3037', sourceLine: 's2-p1' },
      ],
      cards: [
        { id: 'c2-1', front: 'Initial strength of Constituent Assembly under Cabinet Mission Plan', back: '389 seats: 296 British India (292 provinces + 4 commissioners) + 93 Princely States' },
        { id: 'c2-2', front: 'Population ratio for allocating seats in the Constituent Assembly', back: 'Roughly 1 seat per 1 million (10 lakh) population' },
        { id: 'c2-3', front: 'Three communal categories for British India seats', back: 'Muslims, Sikhs (Punjab), and General (all other communities)' },
        { id: 'c2-4', front: 'Post-partition strength of Constituent Assembly (Dec 31, 1947)', back: '299 seats: 229 from Indian Provinces + 70 from Princely States' },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'Pre-Partition (1946)',
          right: 'Post-Partition (1947)',
          why: 'Total seat numbers and provincial allocations get mixed up under exam pressure.',
          statements: [
            { text: 'Total strength was 389 seats', side: 'left' },
            { text: 'Total strength reduced to 299 seats', side: 'right' },
            { text: 'Princely States allotted 93 seats', side: 'left' },
            { text: 'Princely States allotted 70 seats', side: 'right' },
            { text: 'Provinces held 229 seats', side: 'right' },
            { text: 'British India held 296 seats', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'milestone-sittings-officers',
      title: 'Milestone Sittings & Key Assembly Officers',
      short: 'Sittings & Officers',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: '<strong>December 9, 1946 (Inaugural Sitting)</strong>: Exactly <strong>211 members</strong> attended in Constitution Hall, New Delhi (the Muslim League boycotted). Following French convention of electing the oldest member to preside, <span class="hot">Dr. Sachchidananda Sinha</span> was elected temporary / interim Chairman. Frank Anthony was nominated temporary Deputy Chairman.',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: '<strong>December 11, 1946 (Permanent Officers)</strong>: <span class="hot">Dr. Rajendra Prasad</span> was elected unanimously as the permanent <strong>President</strong> of the Constituent Assembly. The Assembly elected <strong>two Vice-Presidents</strong>: <span class="hot">Dr. H.C. Mukherjee</span> (representing Christian minorities) and <span class="hot">V.T. Krishnamachari</span> (representing princely states). <span class="hot">Sir B.N. Rau</span> was appointed <strong>Constitutional Advisor</strong>, preparing the initial draft constitution containing 243 articles and 13 schedules.',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: '<strong>December 13, 1946 to January 22, 1947 (Objectives Resolution)</strong>: On December 13, 1946, Jawaharlal Nehru moved the historic <strong>Objectives Resolution</strong>, outlining the philosophical foundations and constitutional aims of the Indian Republic. The Resolution was <span class="hot">unanimously adopted on January 22, 1947</span>. Its modified text forms the Preamble of the Constitution of India.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Crucial TGPRB Exam Date Pair',
          lineId: 's3-c1',
          html: 'TGPRB tests the Objectives Resolution dates repeatedly: Moved by Jawaharlal Nehru on <strong>December 13, 1946</strong>; unanimously passed and adopted by the Constituent Assembly on <strong>January 22, 1947</strong> (tested in PYQ-0766).',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0766', sourceLine: 's3-p3' },
      ],
      cards: [
        { id: 'c3-1', front: 'First sitting of Constituent Assembly: date, attendance, and interim Chairman', back: 'December 9, 1946; 211 members; Dr. Sachchidananda Sinha (oldest member, French practice)' },
        { id: 'c3-2', front: 'Permanent President and two Vice-Presidents of Constituent Assembly', back: 'President: Dr. Rajendra Prasad (Dec 11, 1946). Vice-Presidents: Dr. H.C. Mukherjee and V.T. Krishnamachari.' },
        { id: 'c3-3', front: 'Constitutional Advisor to the Constituent Assembly', back: 'Sir B.N. Rau (prepared initial working draft with 243 articles and 13 schedules)' },
        { id: 'c3-4', front: 'Objectives Resolution: moved date and adopted date', back: 'Moved by Jawaharlal Nehru on Dec 13, 1946; unanimously passed on Jan 22, 1947.' },
      ],
      traps: [
        {
          id: 't3-1',
          left: 'Dr. Sachchidananda Sinha',
          right: 'Dr. Rajendra Prasad',
          why: 'Classic interim vs permanent presiding officer confusion.',
          statements: [
            { text: 'Presided over inaugural sitting on December 9, 1946', side: 'left' },
            { text: 'Elected temporary Chairman following French tradition', side: 'left' },
            { text: 'Elected permanent President on December 11, 1946', side: 'right' },
            { text: 'Presided over final adoption on November 26, 1949', side: 'right' },
            { text: 'Elected first President of India on January 24, 1950', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'committees-drafting',
      title: 'Major Committees & The Drafting Committee Roster',
      short: 'Committees',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: 'The Constituent Assembly appointed 22 committees, including <span class="hot">8 major committees</span>:<br>• <strong>Jawaharlal Nehru</strong> chaired 3: Union Powers Committee, Union Constitution Committee, and <strong>States Committee</strong> (Negotiating with States - CRITICAL TRAP: chaired by Nehru, NOT Sardar Patel!).<br>• <strong>Sardar Vallabhbhai Patel</strong> chaired 2: Provincial Constitution Committee, and Advisory Committee on Fundamental Rights, Minorities, and Tribal/Excluded Areas (54 members; sub-committees included FR under <strong>J.B. Kripalani</strong> and Minorities under <strong>H.C. Mukherjee</strong>).<br>• <strong>Dr. Rajendra Prasad</strong> chaired 2: Rules of Procedure Committee and Steering Committee.<br>• <strong>Dr. B.R. Ambedkar</strong> chaired the Drafting Committee.',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: 'In June 1948, Constituent Assembly President Dr. Rajendra Prasad appointed the <span class="hot">Linguistic Provinces Commission (Dhar Commission)</span> under the chairmanship of <span class="hot">Justice S.K. Dhar</span> (retired judge of Allahabad High Court). The Commission submitted its report in December 1948, recommending state reorganization based strictly on <strong>administrative convenience</strong> rather than linguistic identity.',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: 'The <strong>Drafting Committee</strong> was appointed on <span class="hot">August 29, 1947</span>, with Dr. B.R. Ambedkar elected Chairman on August 30. It consisted of <span class="hot">7 members</span>: 1. Dr. B.R. Ambedkar (Chairman), 2. N. Gopalaswamy Ayyangar, 3. Alladi Krishnaswamy Iyer, 4. Dr. K.M. Munshi (only original Congress party member), 5. Syed Mohammad Saadulla (only Muslim League member), 6. <span class="hot">N. Madhava Rau</span> (replaced B.L. Mitter who resigned due to ill health), and 7. <span class="hot">T.T. Krishnamachari</span> (replaced D.P. Khaitan who passed away in 1948). Do not confuse T.T. Krishnamachari with CA Vice-President V.T. Krishnamachari.',
        },
        {
          type: 'compare',
          caption: 'States Committee vs Provincial Constitution Committee',
          colA: 'States Committee (Negotiating with States)',
          colB: 'Provincial Constitution Committee',
          rows: [
            { label: 'Chairperson', a: 'Jawaharlal Nehru (High-yield trap!)', b: 'Sardar Vallabhbhai Patel', lineId: 's4-r1' },
            { label: 'Primary Mandate', a: 'Negotiate accession and seats with Princely States', b: 'Draft executive & legislative rules for provinces', lineId: 's4-r2' },
            { label: 'Associated Sub-bodies', a: 'Negotiations with rulers and ministers', b: 'Patel also chaired 54-member Advisory Committee', lineId: 's4-r3' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-1168', sourceLine: 's4-p2' },
        { uid: 'PYQ-2537', sourceLine: 's4-p2' },
      ],
      cards: [
        { id: 'c4-1', front: 'Who chaired the States Committee (Committee for Negotiating with States)?', back: 'Jawaharlal Nehru (CRITICAL TRAP: not Sardar Patel!)' },
        { id: 'c4-2', front: 'Chairman of the Linguistic Provinces Commission appointed in June 1948', back: 'Justice S.K. Dhar (Dhar Commission; recommended administrative convenience over language)' },
        { id: 'c4-3', front: '7 members of the Drafting Committee (appointed August 29, 1947)', back: 'Ambedkar (Chair), Ayyangar, Alladi, Munshi, Saadulla, N. Madhava Rau (for Mitter), T.T. Krishnamachari (for Khaitan)' },
        { id: 'c4-4', front: 'Two replacement members in the Drafting Committee and whom they replaced', back: 'N. Madhava Rau replaced B.L. Mitter (ill health); T.T. Krishnamachari replaced D.P. Khaitan (died 1948).' },
      ],
      traps: [
        {
          id: 't4-1',
          left: 'States Committee',
          right: 'Provincial Constitution Committee',
          why: 'Candidates pick Patel for States Committee due to princely states integration, but Nehru was the actual chair.',
          statements: [
            { text: 'Chaired by Jawaharlal Nehru', side: 'left' },
            { text: 'Chaired by Sardar Vallabhbhai Patel', side: 'right' },
            { text: 'Mandated to negotiate with the rulers of Princely States', side: 'left' },
            { text: 'Dealt with constitutional framework of British Indian provinces', side: 'right' },
          ],
        },
        {
          id: 't4-2',
          left: 'N. Madhava Rau',
          right: 'T.T. Krishnamachari',
          why: 'Both were replacement members of the 7-man Drafting Committee.',
          statements: [
            { text: 'Replaced B.L. Mitter on the Drafting Committee', side: 'left' },
            { text: 'Replaced D.P. Khaitan on the Drafting Committee', side: 'right' },
            { text: 'Resignation due to ill-health necessitated this replacement', side: 'left' },
            { text: 'Death of incumbent in 1948 necessitated this replacement', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'dual-functions-enactment',
      title: 'Dual Role of the Assembly & Enactment vs Enforcement',
      short: 'Dual Role & Dates',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: 'Under the Indian Independence Act 1947, the Constituent Assembly performed <span class="hot">two distinct constitutional roles</span>:<br>• When it sat as a <strong>Constituent body</strong> (framing the Constitution), it was presided over by <span class="hot">Dr. Rajendra Prasad</span>.<br>• When it met as the <strong>Dominion Legislature</strong> (passing ordinary laws), it was presided over by Speaker <span class="hot">G.V. Mavalankar</span> (elected Speaker on November 17, 1947; later first Speaker of Lok Sabha in 1952).',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'Production constants: Constitution-making took <span class="hot">2 years, 11 months, and 18 days</span>, spanning 11 formal sessions and 165 sitting days (114 days dedicated to debating the Draft Constitution). The framers studied constitutions of roughly 60 countries and incurred total expenditure of about ₹64 Lakh.',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: '<strong>Adoption on November 26, 1949 (Constitution Day)</strong>: Out of 299 members, exactly <strong>284 members were present and signed</strong> the historic document. The original Constitution contained a <span class="hot">Preamble, 395 Articles, 8 Schedules</span> (now expanded to 12 schedules [PYQ-0943]), and 22 Parts. Under <span class="hot">Article 394</span>, 15 specific provisions came into force immediately on Nov 26, 1949: <strong>Citizenship (Articles 5, 6, 7, 8, 9)</strong>, <strong>Presidential Oath (Article 60)</strong>, <strong>Elections (Article 324)</strong>, Provisional Parliament (Articles 379, 380), and Short Title (Article 393).',
        },
        {
          type: 'p',
          lineId: 's5-p4',
          html: '<strong>Commencement on January 26, 1950 (Republic Day)</strong>: All remaining provisions (Fundamental Rights, DPSPs, Union & State Judiciary, and Federal structures) came into force. January 26 was chosen to commemorate <span class="hot">Purna Swaraj Day (January 26, 1930)</span>, declared following the December 1929 Lahore Congress session. Under Article 395, it repealed the 1935 GoI Act and 1947 Independence Act. India is declared a Sovereign Socialist Secular Democratic Republic (Preamble [PYQ-0972]); a "Republic" indicates that the Head of State is elected, not hereditary (PYQ-1240).',
        },
        {
          type: 'compare',
          caption: 'Adoption (Nov 26, 1949) vs Commencement (Jan 26, 1950)',
          colA: 'November 26, 1949 (Adoption)',
          colB: 'January 26, 1950 (Commencement)',
          rows: [
            { label: 'Status & Event', a: 'Constitution adopted & signed by 284 members', b: 'Full Constitution came into force (Republic Day)', lineId: 's5-r1' },
            { label: 'Enforced Articles', a: '15 articles immediately under Art. 394 (Citizenship, EC)', b: 'All remaining provisions (FR, DPSP, Executive, Courts)', lineId: 's5-r2' },
            { label: 'Citizenship & EC', a: 'Arts 5-9 and Art 324 operational immediately', b: 'Full democratic republican apparatus activated', lineId: 's5-r3' },
            { label: 'Repeal Section', a: 'Article 394 brought itself & 15 articles into force', b: 'Article 395 repealed 1935 GoI Act & 1947 Independence Act', lineId: 's5-r4' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0943', sourceLine: 's5-p3' },
        { uid: 'PYQ-0972', sourceLine: 's5-p4' },
        { uid: 'PYQ-1240', sourceLine: 's5-p4' },
      ],
      cards: [
        { id: 'c5-1', front: 'Dual presiding officers of Constituent Assembly: Constitution-making vs Law-making', back: 'Constitution-making: Dr. Rajendra Prasad. Dominion Legislature: G.V. Mavalankar.' },
        { id: 'c5-2', front: 'Constitution-making constants: duration, sessions, and original contents', back: '2 years 11 months 18 days; 11 sessions; Preamble, 395 Articles, 8 Schedules (12 now), 22 Parts.' },
        { id: 'c5-3', front: 'Which provisions came into force immediately on November 26, 1949 under Article 394?', back: 'Citizenship (Arts 5-9), President\'s oath (Art 60), Elections (Art 324), Provisional Parliament, Short Title.' },
        { id: 'c5-4', front: 'Why was January 26 chosen as the date of commencement of the Constitution?', back: 'To commemorate Purna Swaraj Day (January 26, 1930) declared after the 1929 Lahore Congress.' },
        { id: 'c5-5', front: 'What does "Republic" mean in the Indian Constitution?', back: 'The head of the state (President) is elected for a fixed term, not hereditary.' },
      ],
      traps: [
        {
          id: 't5-1',
          left: 'Dr. Rajendra Prasad',
          right: 'G.V. Mavalankar',
          why: 'Both presided over the Constituent Assembly, but under different constitutional hats.',
          statements: [
            { text: 'Presided when the Assembly sat to frame the Constitution', side: 'left' },
            { text: 'Presided when the Assembly met as the Dominion Legislature', side: 'right' },
            { text: 'Elected Speaker on November 17, 1947', side: 'right' },
            { text: 'Became first Speaker of Lok Sabha in 1952', side: 'right' },
            { text: 'Elected permanent President on December 11, 1946', side: 'left' },
          ],
        },
        {
          id: 't5-2',
          left: 'November 26, 1949',
          right: 'January 26, 1950',
          why: 'Adoption vs Commencement: which articles were in force when.',
          statements: [
            { text: 'Date of adoption and signing by 284 members (Constitution Day)', side: 'left' },
            { text: 'Date of full commencement of the Constitution (Republic Day)', side: 'right' },
            { text: 'Citizenship (Arts 5-9) and Elections (Art 324) came into force', side: 'left' },
            { text: 'Fundamental Rights and Directive Principles came into force', side: 'right' },
            { text: 'Commemorates Purna Swaraj Day declaration of 1930', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'symbols-calligraphy',
      title: 'Official Symbols, Calligraphy & Adoption Dates',
      short: 'Symbols & Dates',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: 'Official symbols and artisans of the Constitution:<br>• <strong>Official Seal:</strong> The <span class="hot">Elephant</span> was adopted as the symbol/seal of the Constituent Assembly.<br>• <strong>English Calligrapher:</strong> <span class="hot">Prem Behari Narain Raizada</span> handwrote the original English text in flowing italic style using No. 303 nibs across 251 parchment sheets without charge.<br>• <strong>Hindi Calligrapher:</strong> <span class="hot">Vasant Krishnan Vaidya</span> handwrote the original Hindi version.<br>• <strong>Illumination & Artwork:</strong> <span class="hot">Acharya Nand Lal Bose</span> and Shantiniketan artists illuminated the borders. The Preamble page was designed and illuminated by <span class="hot">Beohar Rammanohar Sinha</span> (who signed "Ram" in the bottom-right corner).<br>• <strong>Secretariat:</strong> <span class="hot">H.V.R. Iengar</span> was Secretary to the CA; <span class="hot">S.N. Mukherjee</span> was Chief Draftsman.',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'National adoptions by the Constituent Assembly:<br>• <strong>National Flag:</strong> Adopted on <span class="hot">July 22, 1947</span>. The Ad-hoc Flag Committee was chaired by <strong>Dr. Rajendra Prasad</strong> (CRITICAL TRAP: J.B. Kripalani chaired the 1931 Congress committee, NOT the Assembly committee).<br>• <strong>National Anthem & Song:</strong> Both "Jana Gana Mana" and "Vande Mataram" were adopted on <span class="hot">January 24, 1950</span>. The National Anthem is an expression of the <strong>unity of India</strong> (PYQ-0592).<br>• <strong>First President of India:</strong> Dr. Rajendra Prasad was elected as the first President of India on <span class="hot">January 24, 1950</span> (the Assembly\'s final 12th sitting).',
        },
        {
          type: 'timeline',
          caption: 'Constituent Assembly Milestone Adoptions',
          events: [
            { year: '1946', label: 'Dec 9: First sitting; Dec 11: Rajendra Prasad President; Dec 13: Objectives Resolution', lineId: 's6-t1' },
            { year: '1947', label: 'Jan 22: Objectives Resolution passed; July 22: National Flag adopted; Aug 29: Drafting Committee', lineId: 's6-t2' },
            { year: '1948', label: 'June: Dhar Commission appointed; Oct: Draft Constitution published for public feedback', lineId: 's6-t3' },
            { year: '1949', label: 'Nov 26: Constitution adopted & signed by 284 members; Art. 394 enlivens 15 articles', lineId: 's6-t4' },
            { year: '1950', label: 'Jan 24: National Anthem, Song adopted; Prasad elected President; Jan 26: Republic Day', lineId: 's6-t5' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0592', sourceLine: 's6-p2' },
      ],
      cards: [
        { id: 'c6-1', front: 'Constituent Assembly seal and calligraphy artists', back: 'Seal: Elephant. English: Prem Behari Narain Raizada. Hindi: Vasant Krishnan Vaidya. Preamble art: Beohar Rammanohar Sinha.' },
        { id: 'c6-2', front: 'Adoption date of National Flag and Flag Committee Chairman', back: 'Adopted July 22, 1947. Ad-hoc Flag Committee chaired by Dr. Rajendra Prasad (not Kripalani).' },
        { id: 'c6-3', front: 'Adoption date of National Anthem and National Song', back: 'January 24, 1950 (along with Dr. Rajendra Prasad\'s election as first President of India)' },
        { id: 'c6-4', front: 'What does India\'s National Anthem signify (TGPRB exam angle)?', back: 'An expression of the unity of India amidst geographical diversity.' },
      ],
      traps: [
        {
          id: 't6-1',
          left: 'Prem Behari Narain Raizada',
          right: 'Nand Lal Bose',
          why: 'One wrote the manuscript text; the other directed the artistic illumination.',
          statements: [
            { text: 'Calligrapher who handwrote the original English text in italic style', side: 'left' },
            { text: 'Renowned artist from Shantiniketan who directed illumination', side: 'right' },
            { text: 'Used No. 303 nibs across 251 parchment sheets without fee', side: 'left' },
            { text: 'Decorated borders illustrating scenes from 5,000 years of Indian history', side: 'right' },
          ],
        },
        {
          id: 't6-2',
          left: 'July 22, 1947',
          right: 'January 24, 1950',
          why: 'Key adoption dates tested as matching or sequence questions.',
          statements: [
            { text: 'Adoption of the National Flag of India', side: 'left' },
            { text: 'Adoption of the National Anthem (Jana Gana Mana)', side: 'right' },
            { text: 'Adoption of the National Song (Vande Mataram)', side: 'right' },
            { text: 'Election of Dr. Rajendra Prasad as first President of India', side: 'right' },
            { text: 'Ad-hoc Committee headed by Dr. Rajendra Prasad approved design', side: 'left' },
          ],
        },
      ],
    },
  ],
}

export default makingOfTheConstitution
