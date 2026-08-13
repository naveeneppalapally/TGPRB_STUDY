import drainageFlashcards from '~/content/data/flashcards/geography/drainage-system.json'
import unionFlashcards from '~/content/data/flashcards/polity/union-executive-and-legislature.json'
import movementFlashcards from '~/content/data/flashcards/telangana/telangana-statehood-movement.json'
import type { AiNoteChunk } from '~/types/ai'

export interface AiNoteDefinition {
  noteId: string
  title: string
  examSection: string
  pyqTopicId: string
  chunks: AiNoteChunk[]
  flashcards: unknown
}

export const AI_NOTE_DEFINITIONS: Record<string, AiNoteDefinition> = {
  'NOTE-GEO-DRAINAGE': {
    noteId: 'NOTE-GEO-DRAINAGE',
    title: 'Drainage System of India',
    examSection: 'Geography',
    pyqTopicId: 'GEO-DRAINAGE',
    chunks: [
      {
        id: 'overview',
        label: 'System overview',
        keywords: ['himalayan', 'peninsular', 'delta', 'estuary', 'drainage'],
        text: 'Himalayan rivers are generally perennial and glacier-fed. Peninsular rivers are mainly rain-fed. Most peninsular rivers flow east to the Bay of Bengal and form deltas. Narmada and Tapi flow west through rift valleys to the Arabian Sea and form estuaries. Luni has inland drainage and ends in the Rann of Kutch.',
      },
      {
        id: 'ganga-brahmaputra',
        label: 'Himalayan systems',
        keywords: ['ganga', 'brahmaputra', 'tsangpo', 'dihang', 'tributary', 'sundarban'],
        text: 'The Ganga begins as Bhagirathi at Gangotri Glacier and is called Ganga after meeting Alaknanda at Devprayag. Its major left-bank tributaries include Ramganga, Gomti, Ghaghara, Gandak, Kosi and Mahananda. Brahmaputra is Tsangpo in Tibet, Dihang in Arunachal Pradesh and Brahmaputra in Assam. It is an antecedent river.',
      },
      {
        id: 'peninsular',
        label: 'Peninsular rivers',
        keywords: ['godavari', 'krishna', 'cauvery', 'mahanadi', 'tributary', 'basin'],
        text: 'Godavari is the longest peninsular river, about 1,465 km, and is called Dakshin Ganga. Its basin covers seven states. Krishna begins near Mahabaleshwar. Panchganga and Malaprabha are Krishna tributaries, while Purna and Pravara belong to the Godavari system. Sabari is the easternmost major Godavari tributary.',
      },
      {
        id: 'projects-and-traps',
        label: 'Dams, waterfalls and distinctions',
        keywords: ['dam', 'ukai', 'matatilla', 'dhuandhar', 'narmada', 'lune', 'lunni', 'waterfall'],
        text: 'Matatilla Project is on the Betwa. Ukai Dam is on the Tapi. Sardar Sarovar is on the Narmada. Dhuandhar, also called Marble Falls, is on the Narmada. In Punjab, Bist Doab lies between Beas and Sutlej; Bari is Beas-Ravi; Rechna is Ravi-Chenab; Chaj is Chenab-Jhelum. Ravi was called Iravati.',
      },
    ],
    flashcards: drainageFlashcards,
  },
  'NOTE-POL-UNION-EXEC': {
    noteId: 'NOTE-POL-UNION-EXEC',
    title: 'Union Executive and Legislature',
    examSection: 'Polity',
    pyqTopicId: 'POL-UNION-EXEC-LEG',
    chunks: [
      {
        id: 'executive',
        label: 'Union executive',
        keywords: ['president', 'vice-president', 'prime minister', 'council', 'article 52', 'article 75'],
        text: 'Article 52 provides that there shall be a President of India. Article 53 vests Union executive power in the President. The Vice-President is the ex-officio Chairman of the Rajya Sabha. Under Article 75(3), the Council of Ministers is collectively responsible to the Lok Sabha.',
      },
      {
        id: 'parliament',
        label: 'Parliament architecture',
        keywords: ['parliament', 'rajya sabha', 'lok sabha', 'article 79', 'speaker', 'money bill'],
        text: 'Under Article 79, Parliament consists of the President, Rajya Sabha and Lok Sabha. The Speaker of the Lok Sabha presides over a joint sitting and has final authority to certify a Money Bill. The Rajya Sabha can enable Parliament to legislate on a State List matter in national interest under Article 249 by the required resolution.',
      },
      {
        id: 'exam-distinction',
        label: 'High-yield distinctions',
        keywords: ['article', 'ordinance', 'nominated', 'impeachment', 'election', 'speaker'],
        text: 'Article 61 sets the procedure for impeachment of the President. Article 123 empowers the President to promulgate ordinances during recess of Parliament. The President nominates 12 Rajya Sabha members for special knowledge or practical experience in literature, science, art and social service. Do not confuse nomination, election and appointment powers.',
      },
    ],
    flashcards: unionFlashcards,
  },
  'NOTE-TEL-MOVEMENT': {
    noteId: 'NOTE-TEL-MOVEMENT',
    title: 'Telangana Armed Struggle and Statehood Movement',
    examSection: 'Telangana',
    pyqTopicId: 'TEL-MOVEMENT',
    chunks: [
      {
        id: 'armed-struggle',
        label: 'Armed struggle',
        keywords: ['armed struggle', 'police action', 'operation polo', '1946', '1948', 'nizam'],
        text: 'The Telangana Peasant Armed Struggle began in 1946 against feudal oppression under the Nizam. Police Action against Hyderabad State is also called Operation Polo. TGPRB frequently tests leader, event, date and committee matching rather than broad narrative history.',
      },
      {
        id: 'movement-timeline',
        label: 'Statehood movement timeline',
        keywords: ['1969', 'six point', 'eight point', 'presidential order', 'sakala janula samme', 'million march'],
        text: 'For statehood-movement chronology, distinguish the Five-Point Formula, Eight-Point Formula, Six-Point Formula and Presidential Order. Separate major agitations such as Million March, Sakala Janula Samme, Sagaraharam and Sadak Bandh by sequence. Questions commonly turn one date or organiser into a matching trap.',
      },
      {
        id: 'formation',
        label: 'Formation of Telangana',
        keywords: ['reorganisation bill', '2014', 'lok sabha', 'june 2', 'formation', 'sushil kumar shinde'],
        text: 'The Andhra Pradesh Reorganisation Bill was introduced in the Lok Sabha by Home Minister Sushil Kumar Shinde on 13 February 2014. Telangana was formed on 2 June 2014. Treat dates, authorities and legal steps as separate recall facts.',
      },
    ],
    flashcards: movementFlashcards,
  },
}
