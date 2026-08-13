import type { AiPromptChip } from '~/types/ai'

const PROMPT_CHIPS: Record<string, AiPromptChip[]> = {
  'NOTE-GEO-DRAINAGE': [
    { label: 'Mnemonic for tributaries', prompt: 'Create a short mnemonic for the Ganga left-bank tributaries in this note.', action: 'mnemonic' },
    { label: 'Himalayan vs Peninsular', prompt: 'Compare Himalayan and Peninsular rivers in a TGPRB-ready table-free answer.', action: 'compare' },
    { label: 'River exam traps', prompt: 'List the highest-risk river and tributary traps in this note.', action: 'exam-traps' },
    { label: 'What to review', prompt: 'Which existing flashcards should I review after missing a river-system question?', action: 'review-plan' },
  ],
  'NOTE-POL-UNION-EXEC': [
    { label: 'Article distinction', prompt: 'Explain the most tested Article distinctions on this page in three short points.', action: 'explain' },
    { label: 'Money Bill traps', prompt: 'Explain the common TGPRB traps involving a Money Bill and the Speaker.', action: 'exam-traps' },
    { label: 'Executive vs legislature', prompt: 'Compare the Union Executive and Parliament using only this note context.', action: 'compare' },
    { label: 'What to review', prompt: 'Suggest existing atomic cards to review after a wrong polity question.', action: 'review-plan' },
  ],
  'NOTE-TEL-MOVEMENT': [
    { label: 'Timeline mnemonic', prompt: 'Create a compact chronological mnemonic for the Telangana statehood movement events in this note.', action: 'mnemonic' },
    { label: 'Committee traps', prompt: 'Explain the common Telangana committee and report matching traps.', action: 'exam-traps' },
    { label: 'Formation timeline', prompt: 'Explain the 2014 formation timeline in three exam-ready points.', action: 'explain' },
    { label: 'What to review', prompt: 'Suggest existing atomic cards to review after a wrong Telangana movement question.', action: 'review-plan' },
  ],
}

export function useAiPromptChips(noteId: string): AiPromptChip[] {
  return PROMPT_CHIPS[noteId] ?? []
}
