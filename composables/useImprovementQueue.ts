import { ref, type Ref, computed } from 'vue'
import { useSupabaseClient, useSupabaseUser } from '#imports'
import { createSupabaseOfflineSyncAdapter, useOfflineSync } from '@/composables/useOfflineSync'
import type { ContentImprovementItem, ImprovementItemType, SectionContext } from '@/types/annotations'

export function useImprovementQueue() {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  const offlineSync = useOfflineSync({
    getUserId: () => user.value?.id,
    adapter: createSupabaseOfflineSyncAdapter(supabase),
  })

  const submissions: Ref<ContentImprovementItem[]> = ref([])
  const isLoading = ref(false)

  const lsKey = computed(() => `tgprb:improvements:${user.value?.id || 'guest'}`)

  function _lsGet(): ContentImprovementItem[] {
    if (!import.meta.client) return []
    try {
      const stored = localStorage.getItem(lsKey.value)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  function _lsSet(data: ContentImprovementItem[]): void {
    if (!import.meta.client) return
    localStorage.setItem(lsKey.value, JSON.stringify(data))
  }

  function submitImprovement(
    context: SectionContext,
    item_type: ImprovementItemType,
    description: string,
    reference_url?: string
  ): ContentImprovementItem {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    
    const item: ContentImprovementItem = {
      id,
      note_id: context.noteId,
      section_id: context.sectionId,
      section_label: context.sectionLabel,
      item_type,
      reference_url,
      description,
      status: 'pending',
      client_created_at: now
    }
    
    submissions.value.push(item)
    _lsSet(submissions.value)
    
    offlineSync.queueImprovementCreate({
      item: {
        id: item.id,
        note_id: item.note_id,
        section_id: item.section_id,
        section_label: item.section_label,
        item_type: item.item_type,
        reference_url: item.reference_url,
        description: item.description
      },
      created_at: now
    })
    
    return item
  }

  async function loadSubmissions(): Promise<void> {
    isLoading.value = true
    
    // 1. Read from localStorage for immediate UI
    const local = _lsGet()
    if (local.length > 0) {
      submissions.value = local
    }
    
    // 2. Hydrate from cloud if logged in
    if (user.value) {
      try {
        const { data: cloudSubmissions, error } = await supabase
          .from('content_improvement_items')
          .select('*')
          .eq('user_id', user.value.id)
          
        if (!error && cloudSubmissions) {
          // Merge local and cloud. Since this is an append-only creation queue,
          // we can union by ID. The cloud version takes precedence because it
          // may have updated server status (e.g. 'done') or admin_notes.
          const merged = new Map<string, ContentImprovementItem>()
          
          for (const item of local) {
            merged.set(item.id, item)
          }
          
          for (const item of cloudSubmissions) {
            merged.set(item.id, item as ContentImprovementItem)
          }
          
          submissions.value = Array.from(merged.values())
          _lsSet(submissions.value)
        }
      } catch (e) {
        console.error('Failed to load improvements from cloud', e)
      }
    }
    
    isLoading.value = false
  }

  function getSubmissionsForTopic(noteId: string): ContentImprovementItem[] {
    return submissions.value.filter(s => s.note_id === noteId)
  }

  return {
    submissions,
    isLoading,
    submitImprovement,
    loadSubmissions,
    getSubmissionsForTopic
  }
}
