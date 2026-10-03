import { computed, watch, type Ref } from 'vue'
import { useSupabaseClient, useSupabaseUser, useState } from '#imports'
import { createSupabaseOfflineSyncAdapter, useOfflineSync } from '@/composables/useOfflineSync'
import { readAllRows } from '../utils/supabase-pages'
import type { PersonalNote, SectionContext } from '@/types/annotations'

const STORAGE_KEY_PREFIX = 'tgprb:personal-notes:'

export function usePersonalNotes() {
  const supabase = useSupabaseClient<any>()
  const user = useSupabaseUser()
  const offlineSync = useOfflineSync({
    getUserId: () => user.value?.id,
    adapter: createSupabaseOfflineSyncAdapter(supabase),
  })

  // Shared reactive state across all components on a page via Nuxt useState
  const notes = useState<PersonalNote[]>('tgprb:personal-notes-state', () => [])
  const isLoading = useState<boolean>('tgprb:personal-notes-loading', () => false)
  const isLoaded = useState<boolean>('tgprb:personal-notes-loaded', () => false)
  const activeUserId = useState<string | null>('tgprb:personal-notes-active-user', () => null)
  const loadGeneration = useState<number>('tgprb:personal-notes-generation', () => 0)

  const currentUserId = computed(() => user.value?.id || 'guest')
  const lsKey = computed(() => `${STORAGE_KEY_PREFIX}${currentUserId.value}`)

  function _lsGet(key?: string): PersonalNote[] {
    if (!import.meta.client) return []
    try {
      const targetKey = key || lsKey.value
      const stored = localStorage.getItem(targetKey)
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.error('[usePersonalNotes] Failed to parse localStorage notes:', e)
      return []
    }
  }

  function _lsSet(data: PersonalNote[], key?: string): void {
    if (!import.meta.client) return
    try {
      const targetKey = key || lsKey.value
      localStorage.setItem(targetKey, JSON.stringify(data))
    } catch (e) {
      console.error('[usePersonalNotes] Failed to save to localStorage:', e)
    }
  }

  function getNotesForTopic(noteId: string): PersonalNote[] {
    return notes.value.filter(n => n.note_id === noteId && !n.deleted)
  }

  function getNotesForSection(noteId: string, sectionId: string): PersonalNote[] {
    return notes.value.filter(n => n.note_id === noteId && n.section_id === sectionId && !n.deleted)
  }

  function getCountForSection(noteId: string, sectionId: string): number {
    return getNotesForSection(noteId, sectionId).length
  }

  function hasFlaggedNotes(noteId: string, sectionId: string): boolean {
    return getNotesForSection(noteId, sectionId).some(n => n.is_important || n.is_doubt)
  }

  function searchNotes(query: string): PersonalNote[] {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    return notes.value.filter(n =>
      !n.deleted &&
      ((n.body && n.body.toLowerCase().includes(q)) || (n.anchor_text && n.anchor_text.toLowerCase().includes(q)))
    )
  }

  function createNote(context: SectionContext, body: string, anchorText?: string): PersonalNote {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
    const now = new Date().toISOString()

    const newNote: PersonalNote = {
      id,
      note_id: context.noteId,
      section_id: context.sectionId,
      section_label: context.sectionLabel,
      anchor_text: anchorText,
      body,
      is_important: false,
      is_doubt: false,
      deleted: false,
      client_updated_at: now,
      last_event_id: id,
      created_at: now,
    }

    // Atomic reactive state update
    notes.value = [...notes.value, newNote]
    _lsSet(notes.value)

    offlineSync.queueNoteUpsert({
      note: {
        id: newNote.id,
        note_id: newNote.note_id,
        section_id: newNote.section_id,
        section_label: newNote.section_label,
        anchor_text: newNote.anchor_text,
        body: newNote.body,
        is_important: newNote.is_important,
        is_doubt: newNote.is_doubt,
        deleted: newNote.deleted,
      },
      updated_at: now,
    })

    return newNote
  }

  function updateNote(noteId: string, updates: { body?: string, is_important?: boolean, is_doubt?: boolean }): void {
    const idx = notes.value.findIndex(n => n.id === noteId)
    if (idx === -1) return

    const now = new Date().toISOString()
    const eventId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

    const updatedNote: PersonalNote = {
      ...notes.value[idx],
      ...updates,
      client_updated_at: now,
      last_event_id: eventId,
    }

    const nextNotes = [...notes.value]
    nextNotes[idx] = updatedNote
    notes.value = nextNotes

    _lsSet(notes.value)

    offlineSync.queueNoteUpsert({
      note: {
        id: updatedNote.id,
        note_id: updatedNote.note_id,
        section_id: updatedNote.section_id,
        section_label: updatedNote.section_label,
        anchor_text: updatedNote.anchor_text,
        body: updatedNote.body,
        is_important: updatedNote.is_important,
        is_doubt: updatedNote.is_doubt,
        deleted: updatedNote.deleted,
      },
      updated_at: now,
    })
  }

  function deleteNote(noteId: string): void {
    const idx = notes.value.findIndex(n => n.id === noteId)
    if (idx === -1) return

    const now = new Date().toISOString()
    const eventId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `evt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

    const updatedNote: PersonalNote = {
      ...notes.value[idx],
      deleted: true,
      client_updated_at: now,
      last_event_id: eventId,
    }

    const nextNotes = [...notes.value]
    nextNotes[idx] = updatedNote
    notes.value = nextNotes

    _lsSet(notes.value)

    offlineSync.queueNoteUpsert({
      note: {
        id: updatedNote.id,
        note_id: updatedNote.note_id,
        section_id: updatedNote.section_id,
        section_label: updatedNote.section_label,
        anchor_text: updatedNote.anchor_text,
        body: updatedNote.body,
        is_important: updatedNote.is_important,
        is_doubt: updatedNote.is_doubt,
        deleted: updatedNote.deleted,
      },
      updated_at: now,
    })
  }

  function resolveConflict(l: PersonalNote, c: any): PersonalNote {
    const lTime = new Date(l.client_updated_at).getTime()
    const cTime = new Date(c.client_updated_at).getTime()
    if (lTime > cTime) return l
    if (lTime < cTime) return c as PersonalNote
    return (l.last_event_id || '') > (c.last_event_id || '') ? l : (c as PersonalNote)
  }

  async function loadNotes(forceReload = false): Promise<void> {
    if (!import.meta.client) return

    const userKey = currentUserId.value
    const storageKey = lsKey.value
    const requestUser = user.value?.id
    if (isLoaded.value && activeUserId.value === userKey && !forceReload && notes.value.length > 0) {
      return
    }

    const generation = ++loadGeneration.value
    isLoading.value = true

    // 1. Read from localStorage for immediate UI
    const local = _lsGet()
    notes.value = local
    activeUserId.value = userKey
    isLoaded.value = true

    // Recover acknowledged-to-device writes even if the localStorage snapshot failed.
    try {
      const pending = await offlineSync.pendingMutations()
      if (generation !== loadGeneration.value || currentUserId.value !== userKey) return
      const recovered = new Map(notes.value.map(note => [note.id, note]))
      for (const item of pending) if (item.type === 'note_upsert') {
        const payload = item.payload
        const note: PersonalNote = { ...payload.note, client_updated_at: payload.updated_at, last_event_id: item.id, created_at: recovered.get(payload.note.id)?.created_at || item.client_timestamp }
        const existing = recovered.get(note.id)
        recovered.set(note.id, existing ? resolveConflict(existing, note) : note)
      }
      notes.value = [...recovered.values()]
      _lsSet(notes.value, storageKey)
    } catch (error) { offlineSync.lastError.value = error instanceof Error ? error : new Error(String(error)) }
    if (generation !== loadGeneration.value || currentUserId.value !== userKey) return

    // 2. Hydrate from cloud if logged in
    if (user.value) {
      try {
        const { data: cloudNotes, error } = await readAllRows<any>((from, to) => supabase
          .from('user_personal_notes')
          .select('*')
          .eq('user_id', requestUser!)
          .order('id').range(from, to))

        if (generation !== loadGeneration.value || currentUserId.value !== userKey) return
        if (!error && cloudNotes) {
          const cloudMap = new Map<string, any>(cloudNotes.map((n: any) => [n.id, n]))
          const localMap = new Map<string, PersonalNote>(notes.value.map(n => [n.id, n]))
          const merged = new Map<string, PersonalNote>()

          for (const [id, lNote] of localMap) {
            const cNote = cloudMap.get(id)
            if (cNote) {
              merged.set(id, resolveConflict(lNote, cNote))
              cloudMap.delete(id)
            } else {
              merged.set(id, lNote)
            }
          }

          for (const [id, cNote] of cloudMap) {
            merged.set(id, cNote as PersonalNote)
          }

          notes.value = Array.from(merged.values())
          _lsSet(notes.value, storageKey)
        }
      } catch (e) {
        console.error('[usePersonalNotes] Failed to hydrate notes from cloud:', e)
      }
    }

    if (generation === loadGeneration.value && currentUserId.value === userKey) isLoading.value = false
  }

  // Watch for auth user change to re-hydrate state cleanly
  if (import.meta.client) {
    watch(
      () => user.value?.id,
      (newUid, oldUid) => {
        if (newUid !== oldUid) {
          loadNotes(true)
        }
      }
    )
  }

  return {
    offlineSync,
    notes,
    isLoading,
    isLoaded,
    getNotesForTopic,
    getNotesForSection,
    getCountForSection,
    hasFlaggedNotes,
    searchNotes,
    createNote,
    updateNote,
    deleteNote,
    loadNotes,
  }
}
