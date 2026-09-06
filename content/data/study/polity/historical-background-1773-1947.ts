import type { StudyChapter } from '~/types/study'

/**
 * Chapter: Historical Background: Company Rule & Crown Rule (1773-1947)
 * NOTE-POL-HIST-ACTS - PYQ refs point to uids in data/pyq_enriched_master.json.
 * Every section is authored to fit roughly one screen on the stage.
 */
const historicalBackground: StudyChapter = {
  slug: 'historical-background-1773-1947',
  noteId: 'NOTE-POL-HIST-ACTS',
  subject: 'Polity',
  subjectSlug: 'polity',
  title: 'Historical Background: Company Rule & Crown Rule (1773-1947)',
  summary: 'British constitutional enactments from 1773 Regulating Act to 1947 Indian Independence Act: centralization vs devolution, Morley-Minto, 1919 Dyarchy, 1935 Provincial Autonomy and TGPRB traps. 12 verified PYQs.',
  hasNote: true,
  sections: [
    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'company-rule-1773-1813',
      title: 'Company Rule: Early Parliamentary Control (1773-1813)',
      short: '1773-1813 Acts',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's1-p1',
          html: 'The <strong>Regulating Act of 1773</strong> laid the foundation of British parliamentary control over the <strong>East India Company</strong>. It redesignated the Governor of Bengal as the <strong>Governor-General of Bengal</strong> (<strong>Lord Warren Hastings</strong>), assisted by an Executive Council of 4 members. It established the <strong>Supreme Court at Calcutta in 1774</strong> at <strong>Fort William</strong>, with <strong>Sir Elijah Impey</strong> as its first Chief Justice.',
        },
        {
          type: 'p',
          lineId: 's1-p2',
          html: '<strong>Pitt\'s India Act of 1784</strong> established a system of <strong>Double Government</strong>: the <strong>Court of Directors</strong> managed commercial affairs, while a newly created 6-member <strong>Board of Control</strong> supervised civil, military, and revenue affairs. For the first time in official statute, Company territories in India were termed <strong>"British possessions in India"</strong>.',
        },
        {
          type: 'p',
          lineId: 's1-p3',
          html: 'The <strong>Charter Act of 1813</strong> ended the commercial trade monopoly of the <strong>East India Company</strong> in India, throwing open commerce to all private British merchants. However, the Act strictly retained the Company\'s monopoly in <strong>Tea trade</strong> and <strong>Trade with China</strong>. It mandated an annual allocation of <strong>Rs 1,00,000 (One Lakh)</strong> for promoting literature and modern science among Indians, and permitted <strong>Christian missionaries</strong> to enter under license.',
        },
        {
          type: 'callout',
          tone: 'saffron',
          title: 'Exam Distinction: 1813 vs 1833 Trade Monopoly',
          lineId: 's1-c1',
          html: 'TGPRB frequently tests trade monopoly abolition. The <strong>1813 Charter Act</strong> abolished the general monopoly but <strong>preserved tea and China trade</strong>. Complete abolition of all commercial activity only occurred under the <strong>1833 Charter Act</strong>.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-0925', sourceLine: 's1-p3' },
      ],
      cards: [
        { id: 'c1-1', front: 'First Governor-General of Bengal under Regulating Act 1773', back: 'Lord Warren Hastings (assisted by a 4-member Executive Council)' },
        { id: 'c1-2', front: 'Supreme Court at Calcutta (1774): first Chief Justice', back: 'Sir Elijah Impey (established under Regulating Act 1773 with 1 CJ and 3 regular judges)' },
        { id: 'c1-3', front: 'Double Government introduced by which Act, and what were its two bodies?', back: 'Pitt\'s India Act 1784. Court of Directors (commercial) + Board of Control (political).' },
        { id: 'c1-4', front: 'Charter Act 1813 education grant and trade exceptions', back: 'Allocated Rs 1,00,000 (One Lakh) for education; retained trade monopoly in Tea and China.' },
      ],
      traps: [
        {
          id: 't1-1',
          left: 'Court of Directors',
          right: 'Board of Control',
          why: 'Pitt\'s India Act 1784 established Double Government by splitting commercial management from political administration.',
          statements: [
            { text: 'Managed commercial affairs of the Company', side: 'left' },
            { text: 'Supervised civil, military, and revenue governance', side: 'right' },
            { text: 'Six-member political body representing the Crown', side: 'right' },
            { text: 'Commercial governing body representing Company shareholders', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'company-rule-1833-1853',
      title: 'Apex Centralization to Separation of Powers (1833-1853)',
      short: '1833-1853 Acts',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's2-p1',
          html: 'The <strong>Charter Act of 1833 (Saint Helena Act)</strong> marked the <strong>apex of legislative centralization</strong>. It redesignated the Governor-General of Bengal as the <strong>Governor-General of India</strong>, vesting full civil and military powers in <strong>Lord William Bentinck</strong> (first Governor-General of India). The Governors of <strong>Bombay and Madras</strong> were completely stripped of their legislative powers.',
        },
        {
          type: 'p',
          lineId: 's2-p2',
          html: 'The 1833 Act completely ended the <strong>East India Company</strong>\'s commercial monopoly (including tea and China), transforming it into a purely administrative body. It added a 4th member (<strong>Lord Thomas Babington Macaulay</strong>, Law Member) to the Executive Council, leading to the <strong>First Law Commission (1834)</strong>. Note that while <strong>Lord Cornwallis</strong> organized and modernized the civil services as the <strong>"Father of Civil Services in India"</strong>, 1833 attempted open competition, which was negated by the <strong>Court of Directors</strong>.',
        },
        {
          type: 'p',
          lineId: 's2-p3',
          html: 'The <strong>Charter Act of 1853</strong> separated for the first time the <strong>executive and legislative functions</strong> of the Governor-General\'s Council. It created a 6-member <strong>Indian (Central) Legislative Council</strong>, acting as a mini-parliament. It threw open recruitment to the covenanted civil service through competitive examination, leading to the appointment of the <strong>Macaulay Committee on Civil Services (1854)</strong>.',
        },
        {
          type: 'compare',
          caption: 'Charter Act 1833 vs Charter Act 1853',
          colA: 'Charter Act 1833',
          colB: 'Charter Act 1853',
          rows: [
            { label: 'Supreme Post', a: '<strong>Governor-General of India</strong> (<strong>Lord William Bentinck</strong>)', b: 'G-G Council expanded with <strong>6 legislative councillors</strong>', lineId: 's2-r1' },
            { label: 'Trade Monopoly', a: '<strong>Completely ended</strong> (tea & China terminated)', b: 'Company held Indian territories in <strong>trust for Crown</strong>', lineId: 's2-r2' },
            { label: 'Civil Service', a: 'Open competition attempted, <strong>blocked by Directors</strong>', b: 'Open competition introduced; <strong>Macaulay Committee (1854)</strong>', lineId: 's2-r3' },
            { label: 'Legislative Wing', a: '<strong>Lord Macaulay</strong> added as 4th Law Member', b: 'Distinct <strong>Central Legislative Council</strong> (mini-parliament)', lineId: 's2-r4' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0495', sourceLine: 's2-p2' },
      ],
      cards: [
        { id: 'c2-1', front: 'First Governor-General of India under Charter Act 1833', back: 'Lord William Bentinck (vested with exclusive lawmaking for all British India)' },
        { id: 'c2-2', front: 'Which Act completely ended all commercial monopoly of EIC including Tea & China?', back: 'Charter Act 1833 (Company became a purely administrative trustee for Crown)' },
        { id: 'c2-3', front: 'Which Act separated legislative and executive functions of G-G Council?', back: 'Charter Act 1853 (created 6-member Indian Legislative Council)' },
        { id: 'c2-4', front: 'Macaulay Committee on the Indian Civil Service appointment year', back: '1854 (giving effect to open competition introduced under Charter Act 1853)' },
      ],
      traps: [
        {
          id: 't2-1',
          left: 'Charter Act 1833',
          right: 'Charter Act 1853',
          why: 'Both Acts involved Lord Macaulay and civil service reforms, but institutionalized different phases.',
          statements: [
            { text: 'Created office of Governor-General of India', side: 'left' },
            { text: 'Created 6-member Indian Legislative Council', side: 'right' },
            { text: 'Attempted open civil service competition but blocked by Directors', side: 'left' },
            { text: 'Successfully opened covenanted civil service to competitive exams', side: 'right' },
            { text: 'Added Macaulay as 4th Law Member to Executive Council', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'crown-rule-1858-1892',
      title: 'Crown Takeover & Early Legislative Devolution (1858-1892)',
      short: '1858-1892 Acts',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's3-p1',
          html: 'The <strong>Government of India Act 1858 (Act for the Better Government of India)</strong> was enacted in the immediate wake of the <strong>1857 Sepoy Mutiny</strong>. It liquidated the <strong>East India Company</strong> and transferred powers of government, territories, and revenues directly to the <strong>British Crown</strong>. The Governor-General was redesignated as the <strong>Viceroy of India</strong> (<strong>Lord Canning</strong> first Viceroy). It created the Cabinet office of <strong>Secretary of State for India</strong> in London, assisted by a 15-member <strong>Council of India</strong>, abolishing <strong>Double Government</strong>.',
        },
        {
          type: 'p',
          lineId: 's3-p2',
          html: 'The <strong>Indian Councils Act of 1861</strong> initiated legislative decentralization by restoring lawmaking powers to the Presidencies of <strong>Bombay and Madras</strong> (reversing the 1833 centralization). It associated Indians with lawmaking: in 1862, Lord Canning nominated 3 non-official Indians to his council: <strong>Raja of Benaras</strong>, <strong>Maharaja of Patiala</strong>, and <strong>Sir Dinkar Rao</strong>. It statutorily recognized the <strong>Portfolio system</strong> (introduced by Canning in 1859) and empowered the Viceroy to issue <strong>Ordinances</strong> during emergencies (valid for 6 months).',
        },
        {
          type: 'p',
          lineId: 's3-p3',
          html: 'The <strong>Indian Councils Act of 1892</strong> enlarged the functions of legislative councils. Members were granted the right to <strong>discuss the annual budget</strong> and <strong>address questions to the executive</strong> (with 6 days notice). However, members could <strong>neither vote on the budget nor ask supplementary questions</strong>. It introduced an indirect election mechanism through recommendations of <strong>universities, district boards, and chambers of commerce</strong>.',
        },
        {
          type: 'callout',
          tone: 'red',
          title: 'Trap: 1892 Budget Powers',
          lineId: 's3-c1',
          html: 'TGPRB tests the limits of the 1892 Act. Members could <strong>discuss</strong> the budget, but had <strong>no voting rights</strong> on financial provisions and could <strong>not ask supplementary questions</strong>. Voting and supplementaries came later under the 1909 Act.',
        },
      ],
      pyqs: [
        { uid: 'PYQ-3003', sourceLine: 's3-p1' },
      ],
      cards: [
        { id: 'c3-1', front: 'First Viceroy of India under Government of India Act 1858', back: 'Lord Canning (direct representative of the Crown following 1857 revolt)' },
        { id: 'c3-2', front: 'Council of India established by 1858 Act: size and location', back: '15-member advisory body in London, assisting the Secretary of State for India' },
        { id: 'c3-3', front: 'Three Indians nominated to Viceroy Legislative Council under 1861 Act', back: 'Raja of Benaras, Maharaja of Patiala, and Sir Dinkar Rao (nominated by Lord Canning in 1862)' },
        { id: 'c3-4', front: 'Budget powers granted to legislative council members under 1892 Act', back: 'Discuss the budget and address questions (with 6 days notice), but NO voting and NO supplementary questions' },
      ],
      traps: [
        {
          id: 't3-1',
          left: '1861 Councils Act',
          right: '1892 Councils Act',
          why: '1861 initiated legislative devolution and portfolios; 1892 expanded deliberative and budget discussion functions.',
          statements: [
            { text: 'Restored legislative powers to Bombay and Madras Presidencies', side: 'left' },
            { text: 'Granted right to discuss the annual financial statement (budget)', side: 'right' },
            { text: 'Statutorily recognized Lord Canning\'s portfolio system', side: 'left' },
            { text: 'Introduced indirect election principle for non-official members', side: 'right' },
            { text: 'Nominated Raja of Benaras, Maharaja of Patiala, Sir Dinkar Rao', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'morley-minto-montford',
      title: 'Communal Electorates & Provincial Dyarchy (1909-1919)',
      short: '1909-1919 Reforms',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's4-p1',
          html: 'The <strong>Indian Councils Act 1909 (Morley-Minto Reforms)</strong> was named after <strong>Lord Morley</strong> (Secretary of State for India in London) and <strong>Lord Minto</strong> (Viceroy of India). It introduced <strong>separate electorates for Muslims</strong>, earning Lord Minto the title of <strong>"Father of Communal Electorate"</strong>. For the first time, an Indian was appointed to the Viceroy\'s Executive Council: <strong>Satyendra Prasad Sinha</strong> (appointed as Law Member). Members were permitted to <strong>move resolutions on the budget</strong> and <strong>ask supplementary questions</strong>.',
        },
        {
          type: 'p',
          lineId: 's4-p2',
          html: 'The <strong>Government of India Act 1919 (Montagu-Chelmsford Reforms)</strong> came into effect in 1921. It introduced <strong>Dyarchy in the provinces</strong> (dual rule). Provincial subjects were divided into two categories: <strong>Transferred Subjects</strong> (<strong>Local Self-Government</strong>, <strong>Education</strong>, <strong>Public Health</strong>, <strong>Agriculture</strong>, administered by the Governor on the advice of Ministers responsible to the Legislative Council) and <strong>Reserved Subjects</strong> (<strong>Police</strong>, <strong>Land Revenue</strong>, <strong>Administration of Justice</strong>, <strong>Finance</strong>, <strong>Irrigation</strong>, administered by the Governor and Executive Council without legislative accountability).',
        },
        {
          type: 'p',
          lineId: 's4-p3',
          html: 'The 1919 Act introduced a <strong>bicameral legislature at the Centre</strong> (<strong>Council of State and Legislative Assembly</strong>), <strong>separated provincial budgets from the central budget</strong>, and extended separate electorates to <strong>Sikhs</strong>, <strong>Indian Christians</strong>, <strong>Anglo-Indians</strong>, and <strong>Europeans</strong>. Franchise was granted to a limited electorate based on <strong>property, tax, and education</strong>; <strong>universal adult franchise was strictly NOT introduced</strong>. It mandated a statutory commission after 10 years (<strong>Simon Commission</strong>, appointed in November 1927). In 1919, <strong>B.D. Sukul</strong>, along with <strong>Muhammad Ali Jinnah</strong> and <strong>Madan Mohan Malaviya</strong>, resigned from the <strong>Imperial Legislative Council</strong> in protest against the <strong>Rowlatt Act</strong>.',
        },
        {
          type: 'compare',
          caption: 'Transferred vs Reserved Subjects under 1919 Provincial Dyarchy',
          colA: 'Transferred Subjects',
          colB: 'Reserved Subjects',
          rows: [
            { label: 'Administered by', a: 'Governor with <strong>Ministers responsible to legislature</strong>', b: 'Governor with <strong>Executive Council (no accountability)</strong>', lineId: 's4-r1' },
            { label: 'Local Government', a: '<strong>Local Self-Government</strong> (Municipalities, Panchayats)', b: '<strong>Police and Prisons</strong>', lineId: 's4-r2' },
            { label: 'Public Services', a: '<strong>Public Health, Sanitation, Education</strong>', b: '<strong>Administration of Justice</strong>', lineId: 's4-r3' },
            { label: 'Revenue & Finance', a: '<strong>Agriculture, Fisheries</strong>', b: '<strong>Land Revenue, Finance, Irrigation</strong>', lineId: 's4-r4' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3073', sourceLine: 's4-p1' },
        { uid: 'PYQ-0758', sourceLine: 's4-p1' },
        { uid: 'PYQ-0759', sourceLine: 's4-p2' },
        { uid: 'PYQ-0690', sourceLine: 's4-p3' },
        { uid: 'PYQ-1086', sourceLine: 's4-p3' },
        { uid: 'PYQ-1813', sourceLine: 's4-p3' },
      ],
      cards: [
        { id: 'c4-1', front: '1909 Act: who was Secretary of State and who was Viceroy?', back: 'Lord Morley was Secretary of State (in London); Lord Minto was Viceroy (in India).' },
        { id: 'c4-2', front: 'Who is known as the "Father of Communal Electorate"?', back: 'Lord Minto (introduced separate electorates for Muslims in the 1909 Act)' },
        { id: 'c4-3', front: 'First Indian in Viceroy Executive Council under 1909 Act', back: 'Satyendra Prasad Sinha (appointed as Law Member)' },
        { id: 'c4-4', front: 'Which Act introduced provincial Dyarchy, and how were subjects split?', back: 'GoI Act 1919. Split into Transferred (responsible ministers) and Reserved (Governor + council).' },
        { id: 'c4-5', front: 'Did the 1919 Act introduce universal adult franchise?', back: 'No. Franchise was restricted based on property, tax, and educational qualifications.' },
        { id: 'c4-6', front: 'Simon Commission: appointment year and appointing authority', back: 'Appointed in November 1927 by the British Government under the statutory mandate of the 1919 Act.' },
      ],
      traps: [
        {
          id: 't4-1',
          left: '1909 Act (Morley-Minto)',
          right: '1919 Act (Mont-Ford)',
          why: 'Frequent TGPRB mix-ups: communal coverage, dyarchy level, and budgetary separation.',
          statements: [
            { text: 'Introduced separate electorates for Muslims only', side: 'left' },
            { text: 'Extended separate electorates to Sikhs, Christians, Anglo-Indians, Europeans', side: 'right' },
            { text: 'Introduced provincial Dyarchy (Reserved and Transferred subjects)', side: 'right' },
            { text: 'Satyendra Prasad Sinha appointed to Viceroy Executive Council', side: 'left' },
            { text: 'Separated provincial budgets from central budget', side: 'right' },
            { text: 'Created bicameral legislature at the Centre', side: 'right' },
          ],
        },
        {
          id: 't4-2',
          left: 'Transferred Subjects (1919)',
          right: 'Reserved Subjects (1919)',
          why: 'TGPRB tests exact subject classification under 1919 provincial dyarchy.',
          statements: [
            { text: 'Local Self-Government', side: 'left' },
            { text: 'Police and Law & Order', side: 'right' },
            { text: 'Public Health and Sanitation', side: 'left' },
            { text: 'Land Revenue and Finance', side: 'right' },
            { text: 'Education and Agriculture', side: 'left' },
            { text: 'Administration of Justice and Irrigation', side: 'right' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'goi-act-1935',
      title: 'Government of India Act 1935: Blueprint of the Constitution',
      short: '1935 Act',
      estMinutes: 4,
      blocks: [
        {
          type: 'p',
          lineId: 's5-p1',
          html: 'The <strong>Government of India Act 1935</strong> was the longest and most detailed British enactment for India (321 sections and 10 schedules). It served as the primary administrative framework for the 1950 Constitution of India. It envisaged an <strong>All-India Federation</strong> comprising provinces and princely states, which never materialized because princely states refused to sign <strong>Instruments of Accession</strong>.',
        },
        {
          type: 'p',
          lineId: 's5-p2',
          html: 'The 1935 Act introduced <strong>Provincial Autonomy</strong>: it abolished provincial dyarchy and made provinces autonomous administrative units with responsible ministries (in force 1937-1939). While it proposed <strong>Dyarchy at the Centre</strong> (Reserved vs Transferred federal subjects), this central dyarchy <strong>never came into operation</strong>. It introduced bicameralism in 6 out of 11 provinces: <strong>Bengal</strong>, <strong>Bombay</strong>, <strong>Madras</strong>, <strong>Bihar</strong>, <strong>Assam</strong>, and <strong>United Provinces</strong>.',
        },
        {
          type: 'p',
          lineId: 's5-p3',
          html: 'The Act divided legislative subjects into three lists: <strong>Federal List (59 items)</strong>, <strong>Provincial List (54 items)</strong>, and <strong>Concurrent List (36 items)</strong>. Under the 1935 Act, <strong>residuary powers were vested in the Governor-General (Viceroy)</strong> in his personal discretion (unlike modern Article 248, which vests residuary powers in Parliament).',
        },
        {
          type: 'p',
          lineId: 's5-p4',
          html: 'It provided for the establishment of the <strong>Federal Court in 1937</strong> (<strong>Sir Maurice Gwyer</strong> as first Chief Justice), the <strong>Reserve Bank of India (1935)</strong>, and the <strong>Federal Public Service Commission</strong>. It extended separate electorates to <strong>Depressed Classes (Scheduled Castes)</strong>, <strong>women</strong>, and <strong>labour</strong>, extending franchise to about 10% of the population.',
        },
        {
          type: 'compare',
          caption: '1919 Dyarchy vs 1935 Provincial Autonomy',
          colA: 'GoI Act 1919',
          colB: 'GoI Act 1935',
          rows: [
            { label: 'Provincial Setup', a: '<strong>Dyarchy</strong> (Transferred vs Reserved)', b: '<strong>Provincial Autonomy</strong> (responsible ministries)', lineId: 's5-r1' },
            { label: 'Central Dyarchy', a: 'Not provided', b: 'Proposed at Centre, but <strong>never took effect</strong>', lineId: 's5-r2' },
            { label: 'Residuary Powers', a: 'Not formally divided into 3 lists', b: 'Vested in <strong>Governor-General in his discretion</strong>', lineId: 's5-r3' },
            { label: 'Judicial Body', a: 'High Courts only; appeals to Privy Council', b: '<strong>Federal Court established (1937)</strong>', lineId: 's5-r4' },
            { label: 'Franchise Scope', a: '~3% of population franchised', b: '~10% of population franchised', lineId: 's5-r5' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-0520', sourceLine: 's5-p4' },
      ],
      cards: [
        { id: 'c5-1', front: 'Which Act abolished provincial dyarchy and established Provincial Autonomy?', back: 'Government of India Act 1935 (took effect in 1937)' },
        { id: 'c5-2', front: 'Where were residuary legislative powers vested under the 1935 Act?', back: 'In the Governor-General (Viceroy) in his discretion. (Under Art. 248 today, in Parliament).' },
        { id: 'c5-3', front: 'Federal Court of India: establishment year and first Chief Justice', back: 'Established in 1937 under the 1935 Act; Sir Maurice Gwyer was first Chief Justice.' },
        { id: 'c5-4', front: 'Item counts in the 3 legislative lists of 1935 GoI Act', back: 'Federal: 59 items; Provincial: 54 items; Concurrent: 36 items.' },
        { id: 'c5-5', front: 'In how many provinces was bicameralism introduced under 1935 Act?', back: '6 out of 11 provinces (Bengal, Bombay, Madras, Bihar, Assam, United Provinces).' },
      ],
      traps: [
        {
          id: 't5-1',
          left: '1935 Act Residuary Powers',
          right: 'Modern Constitution (Art. 248)',
          why: 'Under the 1935 Act the Viceroy had residuary power; in independent India Parliament holds it under the Canadian model.',
          statements: [
            { text: 'Residuary powers vested in Governor-General in his discretion', side: 'left' },
            { text: 'Residuary powers vested exclusively in Parliament', side: 'right' },
            { text: 'Enacted under British imperial statute (321 sections)', side: 'left' },
            { text: 'Adopted from Canadian constitutional model', side: 'right' },
          ],
        },
        {
          id: 't5-2',
          left: 'Dyarchy under 1919 Act',
          right: 'Dyarchy under 1935 Act',
          why: 'Candidates confuse where dyarchy was actually implemented vs where it was proposed.',
          statements: [
            { text: 'Introduced and operated in the Provinces', side: 'left' },
            { text: 'Abolished in the Provinces', side: 'right' },
            { text: 'Proposed at the Centre but never came into operation', side: 'right' },
            { text: 'Divided provincial subjects into Reserved and Transferred', side: 'left' },
          ],
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────
    {
      id: 'independence-act-1947',
      title: 'Indian Independence Act 1947 & Constitutional Transition',
      short: '1947 Act & Offices',
      estMinutes: 3,
      blocks: [
        {
          type: 'p',
          lineId: 's6-p1',
          html: 'The <strong>Indian Independence Act 1947</strong> was formulated based on the <strong>Mountbatten Plan of June 3, 1947</strong>. It was introduced in the British Parliament on July 4, 1947, passed by the <strong>House of Commons</strong> on <strong>July 15, 1947</strong>, and received <strong>Royal Assent</strong> on <strong>July 18, 1947</strong>. It declared India an independent and sovereign state from August 15, 1947.',
        },
        {
          type: 'p',
          lineId: 's6-p2',
          html: 'The Act partitioned British India into two independent sovereign Dominions: <strong>India and Pakistan</strong>. It declared the <strong>lapse of British paramountcy</strong> over Indian princely states and tribal treaties, freeing them to join either Dominion or remain independent. It recognized the <strong>Constituent Assemblies of both Dominions as sovereign legislative bodies</strong>, empowered to repeal any British statute, including the Independence Act itself.',
        },
        {
          type: 'p',
          lineId: 's6-p3',
          html: 'The Act abolished the offices of Viceroy and Secretary of State for India. <strong>Lord Mountbatten</strong> served as the <strong>last Viceroy of British India</strong> and first Governor-General of the Dominion of India. <strong>C. Rajagopalachari</strong> served as the first and only Indian Governor-General of India (June 1948 to January 26, 1950), after which the office was replaced by the President of India.',
        },
        {
          type: 'timeline',
          caption: 'Evolution of British Constitutional Enactments (1773-1947)',
          events: [
            { year: '1773', label: 'Regulating Act: <strong>Lord Warren Hastings</strong> G-G of Bengal; Supreme Court Calcutta (<strong>Sir Elijah Impey</strong>)', lineId: 's6-t1' },
            { year: '1784', label: 'Pitt\'s India Act: <strong>Double Government</strong> (<strong>Board of Control</strong> + <strong>Court of Directors</strong>)', lineId: 's6-t2' },
            { year: '1813', label: 'Charter Act: Trade monopoly ended except <strong>Tea & China</strong>; Rs 1 Lakh education grant', lineId: 's6-t3' },
            { year: '1833', label: 'Charter Act: <strong>Lord William Bentinck</strong> G-G of India; <strong>Lord Macaulay</strong> Law Member; monopoly ended', lineId: 's6-t4' },
            { year: '1853', label: 'Charter Act: <strong>Indian Legislative Council</strong> separated; open ICS competition (<strong>Macaulay Committee</strong>)', lineId: 's6-t5' },
            { year: '1858', label: 'GoI Act: Crown takeover; <strong>Lord Canning</strong> first Viceroy; <strong>Secretary of State for India</strong> created', lineId: 's6-t6' },
            { year: '1861', label: 'Councils Act: Devolution restored; 3 Indians nominated (<strong>Benaras, Patiala, Dinkar Rao</strong>); <strong>Portfolio system</strong>', lineId: 's6-t7' },
            { year: '1892', label: 'Councils Act: Right to <strong>discuss budget</strong> and <strong>ask questions</strong> (no voting)', lineId: 's6-t8' },
            { year: '1909', label: 'Morley-Minto: Separate electorates for Muslims; <strong>Satyendra Prasad Sinha</strong> in Executive Council', lineId: 's6-t9' },
            { year: '1919', label: 'Mont-Ford: <strong>Provincial Dyarchy</strong>; <strong>Central Bicameralism</strong>; <strong>Simon Commission</strong> mandate', lineId: 's6-t10' },
            { year: '1935', label: 'GoI Act: Provincial Autonomy; 3 Lists; Federal Court under <strong>Sir Maurice Gwyer</strong> (1937); <strong>Reserve Bank of India</strong>', lineId: 's6-t11' },
            { year: '1947', label: 'Independence Act: Partition into Dominions; <strong>Lord Mountbatten</strong> last Viceroy; <strong>C. Rajagopalachari</strong> Indian G-G', lineId: 's6-t12' },
          ],
        },
      ],
      pyqs: [
        { uid: 'PYQ-3126', sourceLine: 's6-p3' },
        { uid: 'PYQ-1560', sourceLine: 's6-p1' },
      ],
      cards: [
        { id: 'c6-1', front: 'British Viceroy during the time of India\'s independence', back: 'Lord Mountbatten (last Viceroy of British India, first G-G of Dominion of India)' },
        { id: 'c6-2', front: 'First and only Indian Governor-General of independent India', back: 'C. Rajagopalachari (served from June 1948 to January 26, 1950)' },
        { id: 'c6-3', front: 'Date the Indian Independence Bill was approved by British Commons and received Royal Assent', back: 'House of Commons: July 15, 1947; Royal Assent: July 18, 1947' },
        { id: 'c6-4', front: 'What happened to British paramountcy over princely states under 1947 Act?', back: 'Lapsed completely; princely states were free to join India, Pakistan, or remain independent.' },
      ],
      traps: [
        {
          id: 't6-1',
          left: 'Lord Mountbatten',
          right: 'C. Rajagopalachari',
          why: 'Both held the post of Governor-General of independent India, but with distinct constitutional roles.',
          statements: [
            { text: 'Last Viceroy of British India', side: 'left' },
            { text: 'First Governor-General of the Dominion of India (Aug 1947 - June 1948)', side: 'left' },
            { text: 'First and only Indian Governor-General of India (June 1948 - Jan 1950)', side: 'right' },
            { text: 'Administered oath of office to Jawaharlal Nehru as Prime Minister', side: 'left' },
            { text: 'Final incumbent before the office was replaced by the President of India', side: 'right' },
          ],
        },
      ],
    },
  ],
}

export default historicalBackground
