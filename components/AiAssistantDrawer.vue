<template>
  <div>
    <UButton
      icon="i-heroicons-sparkles"
      label="Ask AI"
      color="primary"
      size="sm"
      class="fixed bottom-5 right-5 z-30 rounded-full shadow-lg shadow-saffron-500/20 sm:bottom-7 sm:right-7"
      aria-label="Open study assistant"
      @click="isOpen = true"
    />

    <USlideover v-model="isOpen" side="right" :ui="{ width: 'w-screen sm:w-[28rem]' }">
      <div class="flex h-full flex-col bg-base">
        <header class="flex items-start justify-between gap-4 border-b b-line px-4 py-4">
          <div>
            <p class="eyebrow flex items-center gap-1.5">
              <UIcon name="i-heroicons-sparkles" class="h-3.5 w-3.5 accent" />
              Study assistant
            </p>
            <h2 class="mt-1 text-[15px] font-semibold t-hi">{{ effectiveNoteTitle }}</h2>
            <p class="mt-1 text-[11px] leading-relaxed t-lo">
              Grounded in this note and verified TGPRB PYQs. Keep a final check against official sources.
            </p>
          </div>
          <UButton icon="i-heroicons-x-mark" color="gray" variant="ghost" aria-label="Close assistant" @click="isOpen = false" />
        </header>

        <div ref="chatRegion" class="flex-1 space-y-4 overflow-y-auto px-4 py-4" aria-live="polite">
          <div v-if="messages.length === 0" class="rounded-xl border b-line bg-sub p-4">
            <p class="text-[13px] font-medium t-hi">Ask a focused exam question.</p>
            <p class="mt-1 text-[12px] leading-relaxed t-lo">
              Responses are short, factual, and intended to help you avoid negative-marking traps.
            </p>
          </div>

          <article
            v-for="message in messages"
            :key="message.id"
            class="rounded-xl px-3.5 py-3 text-[13px] leading-[1.7]"
            :class="message.role === 'user' ? 'ml-7 bg-saffron-500 text-white' : 'mr-4 border b-line bg-elev t-mid'"
          >
            <p class="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em]" :class="message.role === 'user' ? 'text-white/70' : 't-lo'">
              {{ message.role === 'user' ? 'You' : 'Study assistant' }}
            </p>
            <p class="whitespace-pre-wrap">{{ message.text || (loading ? 'Preparing a grounded answer…' : '') }}</p>
          </article>

          <div v-if="suggestedCards.length" class="rounded-xl border border-saffron-500/30 bg-saffron-500/5 p-3.5">
            <p class="text-[11px] font-semibold uppercase tracking-[0.12em] accent">Recommended existing cards</p>
            <ul class="mt-2 space-y-2">
              <li v-for="card in suggestedCards" :key="card.id" class="text-[12px] leading-relaxed t-mid">
                <span class="font-mono text-[10px] accent">{{ card.id }}</span>
                <span class="ml-1">{{ card.front }}</span>
              </li>
            </ul>
            <p class="mt-2 text-[11px] leading-relaxed t-lo">These remain the note’s existing atomic cards. The assistant cannot add unverified cards to FSRS.</p>
          </div>

          <p v-if="errorMessage" class="rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-[12px] leading-relaxed text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {{ errorMessage }}
          </p>
        </div>

        <footer class="border-t b-line bg-base px-4 py-3">
          <div class="mb-3 flex flex-wrap gap-2">
            <UButton
              v-for="chip in effectiveQuickPrompts"
              :key="chip.label"
              :label="chip.label"
              color="gray"
              variant="soft"
              size="xs"
              :disabled="loading"
              @click="runChip(chip.prompt, chip.action)"
            />
          </div>

          <div class="flex gap-2">
            <UInput
              v-model="draft"
              class="min-w-0 flex-1"
              placeholder="Ask about this note"
              :disabled="loading"
              @keydown.enter.exact.prevent="submit()"
            />
            <UButton
              icon="i-heroicons-paper-airplane"
              color="primary"
              :loading="loading"
              :disabled="!draft.trim() || loading"
              aria-label="Send question"
              @click="submit()"
            />
          </div>
          <div class="mt-2 flex items-center justify-between gap-2">
            <p class="text-[10px] leading-relaxed t-lo">Plain text only, optimized for slow connections. {{ quotaLabel }}</p>
            <UButton label="Clear chat" color="gray" variant="link" size="xs" :disabled="loading || messages.length === 0" @click="clearChat" />
          </div>
        </footer>
      </div>
    </USlideover>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type {
  AiAssistantAction,
  AiConversationTurn,
  AiExamProfile,
  AiFlashcardSuggestion,
  AiPromptChip,
  AiQuizState,
} from '~/types/ai'

interface ChatMessage extends AiConversationTurn {
  id: string
}

const props = withDefaults(defineProps<{
  noteId?: string
  noteTitle?: string
  examProfile?: AiExamProfile
  quickPrompts?: AiPromptChip[]
}>(), {
  examProfile: 'constable',
})

const route = useRoute()

const ROUTE_NOTE_MAP: Record<string, { noteId: string; title: string }> = {
  '/notes/geography/drainage-system-of-india': { noteId: 'NOTE-GEO-DRAINAGE', title: 'Drainage System of India' },
  '/notes/polity/union-executive-and-legislature': { noteId: 'NOTE-POL-UNION-EXEC', title: 'Union Executive and Legislature' },
  '/notes/telangana/telangana-statehood-movement': { noteId: 'NOTE-TEL-MOVEMENT', title: 'Telangana Statehood Movement' },
}

function resolveCurrentNote() {
  if (props.noteId && props.noteTitle) {
    return { noteId: props.noteId, title: props.noteTitle }
  }
  const currentPath = (route.path || '').replace(/\/$/, '')
  if (ROUTE_NOTE_MAP[currentPath]) {
    return ROUTE_NOTE_MAP[currentPath]
  }
  if (currentPath.includes('/notes/geography')) return { noteId: 'NOTE-GEO-DRAINAGE', title: 'Drainage System of India' }
  if (currentPath.includes('/notes/polity')) return { noteId: 'NOTE-POL-UNION-EXEC', title: 'Union Executive and Legislature' }
  if (currentPath.includes('/notes/telangana')) return { noteId: 'NOTE-TEL-MOVEMENT', title: 'Telangana Statehood Movement' }
  return { noteId: 'NOTE-GEO-DRAINAGE', title: 'Drainage System of India' }
}

const currentNote = computed(() => resolveCurrentNote())
const effectiveNoteId = computed(() => props.noteId || currentNote.value.noteId)
const effectiveNoteTitle = computed(() => props.noteTitle || currentNote.value.title)
const effectiveQuickPrompts = computed(() => {
  if (props.quickPrompts && props.quickPrompts.length > 0) return props.quickPrompts
  return useAiPromptChips(effectiveNoteId.value)
})

const { pendingRequest, clearRequest } = useAiAssistant()
const isOpen = ref(false)
const draft = ref('')
const loading = ref(false)
const messages = ref<ChatMessage[]>([])
const errorMessage = ref('')
const suggestedCards = ref<AiFlashcardSuggestion[]>([])
const quotaRemaining = ref<number | null>(null)
const chatRegion = ref<HTMLElement | null>(null)

const storageKey = computed(() => `studyos:ai-chat:${effectiveNoteId.value}`)
const quotaLabel = computed(() => quotaRemaining.value === null
  ? '20 questions per day for signed-in students.'
  : `${quotaRemaining.value} AI question${quotaRemaining.value === 1 ? '' : 's'} left today.`)

onMounted(() => {
  const saved = sessionStorage.getItem(storageKey.value)
  if (!saved) return

  try {
    const parsed = JSON.parse(saved) as ChatMessage[]
    if (Array.isArray(parsed)) messages.value = parsed.slice(-10)
  } catch {
    sessionStorage.removeItem(storageKey.value)
  }
})

watch(pendingRequest, (request) => {
  if (!request) return
  if (props.noteId && request.noteId !== props.noteId) return
  isOpen.value = true
  draft.value = request.question
  void nextTick(() => submit(request.action, request.sourceQuestionId, request.quizState))
  clearRequest(request.id)
})

function runChip(prompt: string, action: AiAssistantAction = 'explain') {
  draft.value = prompt
  void submit(action)
}

function historyForRequest(): AiConversationTurn[] {
  return messages.value
    .slice(-4)
    .map(({ role, text }) => ({ role, text: text.slice(0, 450) }))
}

function addMessage(role: AiConversationTurn['role'], text: string): ChatMessage {
  const message = { id: `${Date.now()}-${messages.value.length}`, role, text }
  messages.value.push(message)
  if (messages.value.length > 10) messages.value = messages.value.slice(-10)
  return message
}

async function submit(
  action: AiAssistantAction = 'explain',
  sourceQuestionId?: string,
  quizState?: AiQuizState,
) {
  const question = draft.value.trim()
  if (!question || loading.value) return

  errorMessage.value = ''
  suggestedCards.value = []
  draft.value = ''
  loading.value = true
  const conversation = historyForRequest()
  addMessage('user', question)
  const assistantMessage = addMessage('assistant', '')

  try {
    const response = await fetch('/api/ai/explain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'text/event-stream' },
      body: JSON.stringify({
        note_id: effectiveNoteId.value,
        question,
        action,
        exam_profile: props.examProfile,
        source_question_id: sourceQuestionId,
        quiz_state: quizState,
        conversation,
      }),
    })

    if (!response.ok || !response.body) {
      const problem = await response.json().catch(() => null) as { statusMessage?: string, message?: string } | null
      throw new Error(problem?.statusMessage || problem?.message || 'The assistant is unavailable. Please try again shortly.')
    }

    await readEventStream(response, assistantMessage)
  } catch (error) {
    messages.value = messages.value.filter(message => message.id !== assistantMessage.id)
    errorMessage.value = error instanceof Error ? error.message : 'The assistant is unavailable. Please try again shortly.'
  } finally {
    loading.value = false
    saveMessages()
    await nextTick()
    chatRegion.value?.scrollTo({ top: chatRegion.value.scrollHeight, behavior: 'smooth' })
  }
}

async function readEventStream(response: Response, assistantMessage: ChatMessage) {
  const reader = response.body?.getReader()
  if (!reader) throw new Error('The response stream could not be read.')

  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop() ?? ''

    for (const event of events) processEvent(event, assistantMessage)
    await nextTick()
    chatRegion.value?.scrollTo({ top: chatRegion.value.scrollHeight })
  }

  if (buffer) processEvent(buffer, assistantMessage)
  if (!assistantMessage.text) throw new Error('No answer was returned. Please try a shorter question.')
}

function processEvent(rawEvent: string, assistantMessage: ChatMessage) {
  const dataLine = rawEvent.split('\n').find(line => line.startsWith('data:'))
  if (!dataLine) return

  try {
    const payload = JSON.parse(dataLine.slice(5).trim()) as {
      type?: string
      text?: string
      remaining?: number
      cards?: AiFlashcardSuggestion[]
      message?: string
    }
    if (payload.type === 'token' && payload.text) assistantMessage.text += payload.text
    if (payload.type === 'meta' && typeof payload.remaining === 'number') quotaRemaining.value = payload.remaining
    if (payload.type === 'review-cards' && Array.isArray(payload.cards)) suggestedCards.value = payload.cards
    if (payload.type === 'error') throw new Error(payload.message || 'The assistant could not complete this answer.')
  } catch (error) {
    if (error instanceof SyntaxError) return
    throw error
  }
}

function clearChat() {
  messages.value = []
  suggestedCards.value = []
  errorMessage.value = ''
  if (import.meta.client) sessionStorage.removeItem(storageKey.value)
}

function saveMessages() {
  if (import.meta.client) sessionStorage.setItem(storageKey.value, JSON.stringify(messages.value.slice(-10)))
}
</script>
