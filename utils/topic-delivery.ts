export interface TopicDelivery {
  id: string
  subjectSlug?: string
  noteSlug?: string
  studySlug?: string
}
export function noteRoute(topic: TopicDelivery): string | null {
  return topic.noteSlug && topic.subjectSlug ? `/notes/${topic.subjectSlug}/${topic.noteSlug}` : null
}
export function studyRoute(topic: TopicDelivery): string | null {
  return topic.studySlug ? `/study/${topic.studySlug}` : null
}
export function contentRoutes(topics: readonly TopicDelivery[]): string[] {
  return [...new Set(['/', '/pyq-archive', ...topics.flatMap(topic => [
    ...(noteRoute(topic) ? [`/notes/${topic.subjectSlug}`, noteRoute(topic)!] : []),
    ...(studyRoute(topic) ? [studyRoute(topic)!, `/api/study/${topic.studySlug}`] : []),
  ])])]
}
