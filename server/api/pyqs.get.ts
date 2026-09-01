import { defineEventHandler, getQuery } from 'h3'
import fs from 'fs'
import path from 'path'

interface MasterPyq {
  uid: string
  subject_id: string
  subject_name: string
  topic_id: string
  topic_name: string
  sub_topic?: string
  question_type?: string
  difficulty?: string
  correct_option_index: number
  explanation: string
  occurrences: Array<{
    source_file: string
    q_no?: number
    source_page?: number
  }>
  question_text: string
  options: string[]
}

let cachedPyqs: MasterPyq[] | null = null

function loadMasterPyqs(): MasterPyq[] {
  if (cachedPyqs) return cachedPyqs
  const filePath = path.resolve(process.cwd(), 'data/pyq_enriched_master.json')
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf-8')
    cachedPyqs = JSON.parse(raw)
    return cachedPyqs!
  }
  return []
}

export default defineEventHandler((event) => {
  const query = getQuery(event)
  
  const subject = (query.subject as string || '').trim().toLowerCase()
  const exam = (query.exam as string || '').trim().toLowerCase()
  const year = (query.year as string || '').trim()
  const search = (query.search as string || '').trim().toLowerCase()
  const page = Math.max(1, parseInt(query.page as string || '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string || '20', 10)))

  const all = loadMasterPyqs()

  const filtered = all.filter((q) => {
    // Subject filter
    if (subject && subject !== 'all') {
      const sName = (q.subject_name || '').toLowerCase()
      const sId = (q.subject_id || '').toLowerCase()
      if (!sName.includes(subject) && !sId.includes(subject)) {
        return false
      }
    }

    // Exam & Year from occurrences
    const occStr = JSON.stringify(q.occurrences || []).toLowerCase()
    
    if (exam && exam !== 'all') {
      const isConstable = /(?:^|[_\s\/\-"'])constable(?:$|[_\s\/\-"'])/i.test(occStr)
      const isSI = /(?:^|[_\s\/\-"'])si(?:$|[_\s\/\-"'])/i.test(occStr)
      if (exam === 'constable' && !isConstable) return false
      if (exam === 'si' && !isSI) return false
    }

    if (year && year !== 'all') {
      if (!occStr.includes(year)) return false
    }

    // Search query filter
    if (search) {
      const qText = (q.question_text || '').toLowerCase()
      const optText = (q.options || []).join(' ').toLowerCase()
      const topText = (q.topic_name || '').toLowerCase()
      if (!qText.includes(search) && !optText.includes(search) && !topText.includes(search)) {
        return false
      }
    }

    return true
  })

  const total = filtered.length
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit
  const items = filtered.slice(offset, offset + limit).map(item => {
    // Format source label cleanly from occurrences
    const occ = item.occurrences?.[0]
    let paperLabel = 'TGPRB PYQ'
    let yearLabel = '2015-2023'
    let examLabel = 'Constable / SI'

    if (occ?.source_file) {
      const sf = occ.source_file
      if (sf.includes('Constable')) examLabel = 'Constable'
      else if (sf.includes('SI')) examLabel = 'SI'

      const yrMatch = sf.match(/20\d\d/)
      if (yrMatch) yearLabel = yrMatch[0]

      if (sf.includes('Prelims')) paperLabel = `${examLabel} ${yearLabel} Prelims`
      else if (sf.includes('Mains')) paperLabel = `${examLabel} ${yearLabel} Mains`
      else paperLabel = `${examLabel} ${yearLabel}`

      if (occ.q_no) paperLabel += ` · Q${occ.q_no}`
    }

    return {
      uid: item.uid,
      subject_id: item.subject_id,
      subject_name: item.subject_name,
      topic_name: item.topic_name,
      question_type: item.question_type,
      difficulty: item.difficulty || 'M',
      correct_option_index: item.correct_option_index,
      explanation: item.explanation,
      question_text: item.question_text,
      options: item.options,
      paper_label: paperLabel,
      exam: examLabel,
      year: yearLabel
    }
  })

  return {
    total,
    page,
    limit,
    totalPages,
    pyqs: items
  }
})
