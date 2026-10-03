import type { StudyCard } from '../composables/useFSRSEngine'
import { serializeFSRSCard, type SerializableFSRSCard } from '../composables/useOfflineSync'

export type SavedStudyCard = Omit<StudyCard, 'fsrs'> & { fsrs: SerializableFSRSCard; front?: string; back?: string; exam_section?: string; topic?: string; subtopic?: string }

export function saveStudyCard(card: StudyCard): SavedStudyCard {
  return { ...card, fsrs: serializeFSRSCard(card.fsrs) }
}

export function restoreStudyCard(saved: SavedStudyCard): StudyCard {
  return { ...saved, fsrs: { ...saved.fsrs, due: new Date(saved.fsrs.due), last_review: saved.fsrs.last_review ? new Date(saved.fsrs.last_review) : undefined } }
}
