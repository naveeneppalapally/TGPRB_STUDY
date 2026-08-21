/**
 * Shared TypeScript types for personal notes and content improvement queue.
 * Used by composables/usePersonalNotes.ts, composables/useImprovementQueue.ts,
 * and components/notes/*.
 */

// ---------------------------------------------------------------------------
// Personal Note
// ---------------------------------------------------------------------------

export interface PersonalNote {
  /** Client-generated UUID */
  id: string
  /** Topic page NOTE ID, e.g. 'NOTE-GEO-DRAINAGE' */
  note_id: string
  /** Section key, e.g. 'deep-dive' or 'deep-dive:ganga-system' */
  section_id: string
  /** Snapshot of section heading text, survives renames */
  section_label: string
  /** Quoted passage the note attaches to (from text selection) */
  anchor_text?: string
  /** Note body - plain text with markdown-lite (bold, bullets) */
  body: string
  /** Revision priority flag */
  is_important: boolean
  /** Marks note as a doubt for pre-exam filtering */
  is_doubt: boolean
  /** Soft-delete flag - hidden from UI, synced as tombstone */
  deleted: boolean
  /** LWW timestamp for conflict resolution */
  client_updated_at: string
  /** Last event ID - UUID tie-breaker for LWW when timestamps match */
  last_event_id: string
  /** When this note was first created */
  created_at: string
}

// ---------------------------------------------------------------------------
// Content Improvement Item
// ---------------------------------------------------------------------------

export type ImprovementItemType =
  | 'replace_image'
  | 'add_image'
  | 'fix_fact'
  | 'add_table'
  | 'add_topic'
  | 'other'

export type ImprovementStatus = 'pending' | 'in_progress' | 'done' | 'skipped'

export interface ContentImprovementItem {
  /** Client-generated UUID */
  id: string
  /** Topic page NOTE ID, e.g. 'NOTE-GEO-DRAINAGE' */
  note_id: string
  /** Section key (optional for page-level improvements) */
  section_id?: string
  /** Snapshot of section heading text */
  section_label?: string
  /** Type of improvement */
  item_type: ImprovementItemType
  /** URL reference (image link, article, etc.) */
  reference_url?: string
  /** Description of what should be improved */
  description: string
  /** Processing status - set by admin/agent, not by user */
  status: ImprovementStatus
  /** Admin/agent processing notes */
  admin_notes?: string
  /** When the item was processed */
  processed_at?: string
  /** When the item was created (client time) */
  client_created_at: string
  /** Server creation timestamp */
  created_at?: string
}

// ---------------------------------------------------------------------------
// Section context - captured when pencil icon is clicked
// ---------------------------------------------------------------------------

export interface SectionContext {
  /** Topic page NOTE ID */
  noteId: string
  /** Note page title, e.g. 'Drainage System of India' */
  noteTitle: string
  /** Route path, e.g. '/notes/geography/drainage-system-of-india' */
  route: string
  /** Section key, e.g. 'deep-dive' or 'deep-dive:ganga-system' */
  sectionId: string
  /** Section heading text, e.g. 'Ganga System' */
  sectionLabel: string
  /** Optional section number, e.g. '03' */
  sectionNumber?: string
}

// ---------------------------------------------------------------------------
// Note display helpers
// ---------------------------------------------------------------------------

export type NoteFilterMode = 'all' | 'important' | 'doubt'

export interface NoteGroup {
  /** Topic NOTE ID */
  noteId: string
  /** Topic title */
  noteTitle: string
  /** Subject (e.g. 'Geography') */
  examSection?: string
  /** Notes grouped by section within this topic */
  sections: NoteSection[]
  /** Total note count across all sections */
  totalCount: number
}

export interface NoteSection {
  sectionId: string
  sectionLabel: string
  notes: PersonalNote[]
}
