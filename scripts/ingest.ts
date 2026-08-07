import * as fs from 'node:fs';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import type { ParsedPYQ, ParsedFilename } from '../types/content';


const EXTD_DIR = path.join(process.cwd(), 'Extracted_Text');
const OUT_DIR = path.join(process.cwd(), 'content/pyq');

const isDryRun = process.argv.includes('--dry-run');

if (!fs.existsSync(OUT_DIR) && !isDryRun) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function parseFilename(filename: string): ParsedFilename | null {
  // e.g., Constable_2018_Prelims.txt, SI_2016_Mains_P4_GS.txt
  const base = path.basename(filename, '.txt');
  const parts = base.split('_');
  if (parts.length < 3) return null;
  
  const exam = parts[0] as 'Constable' | 'SI';
  const year = parseInt(parts[1], 10);
  const stage = parts[2] as 'Prelims' | 'Mains';
  
  let part_code, part_name;
  if (parts.length >= 5) {
    part_code = parts[3];
    part_name = parts[4];
  }
  
  return { exam, year, stage, part_code, part_name };
}

function computeHash(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}

function containsTelugu(text: string): boolean {
  return /[\u0C00-\u0C7F]/.test(text);
}

function isGarbage(line: string): boolean {
  const l = line.toLowerCase();
  if (l.includes('--- page break ---')) return true;
  if (l.includes('get it on') || l.includes('google play') || l.includes('addale47')) return true;
  if (l.includes('all exams') || l.includes('one subscription') || l.includes('attempt free mock')) return true;
  if (l.includes('www.android.universityupdates.in') || l.includes('www.previousquestionpapers.com')) return true;
  return false;
}

function parseFile(filepath: string, filename: string) {
  const content = fs.readFileSync(filepath, 'utf-8');
  if (filename === 'SI_2018_Mains_P4_GS.txt') {
    return []; // ZERO extractable content
  }

  const lines = content.split('\n').map(l => l.trim());
  let inHeader = true;
  
  const questions: any[] = [];
  let currentQuestion: any = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (!line) continue;
    if (isGarbage(line)) continue;
    
    // Header skip: Assume header ends when we see the first question
    const qMatch = line.match(/^(\d+)[\.,]\s*(.*)/);
    const qMatchSolo = line.match(/^(\d+)[\.,]$/); // "1." on its own line
    
    if (qMatch || qMatchSolo) {
      inHeader = false;
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      const qNum = parseInt(qMatch ? qMatch[1] : qMatchSolo![1], 10);
      let text = qMatch ? qMatch[2] : '';
      currentQuestion = {
        question_number: qNum,
        raw_lines: text ? [text] : [],
        options: []
      };
      continue;
    }
    
    if (inHeader) continue;
    
    // Stop accumulating if we hit Telugu translation for this question
    if (containsTelugu(line)) {
      continue; // Skip Telugu text
    }
    
    // Collect options or text
    const optMatch = line.match(/^[\(]?([1-4A-D])[\)]?[\.\s]+(.*)/);
    const optMatchSolo = line.match(/^[\(]?([1-4A-D])[\)]?$/); // Option num on its own line
    if (optMatch) {
       currentQuestion.options.push(optMatch[2]);
    } else if (optMatchSolo) {
       // next line might be the option text
       if (i + 1 < lines.length) {
         currentQuestion.options.push(lines[i+1].trim());
         i++; // skip next line
       }
    } else {
      // Just regular text for the question
      if (currentQuestion) {
        currentQuestion.raw_lines.push(line);
      }
    }
  }
  
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  return questions;
}

function main() {
  const files = fs.readdirSync(EXTD_DIR).filter(f => f.endsWith('.txt') && f !== 'Deep_Analysis.txt');
  
  let totalProcessed = 0;
  let totalSkipped = 0;
  let totalDuplicates = 0;
  let fileStats: any = {};
  
  const seenHashes = new Map<string, string>(); // hash -> id
  
  for (const file of files) {
    const meta = parseFilename(file);
    if (!meta) continue;
    
    if (file === 'SI_2018_Mains_P4_GS.txt') {
      console.log(`Flagging ${file}: ZERO extractable content (watermarks only).`);
      totalSkipped++;
      fileStats[file] = 0;
      continue;
    }
    
    const filepath = path.join(EXTD_DIR, file);
    const rawQs = parseFile(filepath, file);
    
    let saved = 0;
    
    for (const rq of rawQs) {
      const qText = rq.raw_lines.join('\n').trim();
      if (!qText && rq.options.length === 0) continue;
      
      const contentHash = computeHash(qText + JSON.stringify(rq.options));
      const id = `PYQ-${meta.year}-${meta.stage[0]}-${rq.question_number}${meta.part_code ? '-' + meta.part_code : ''}`;
      
      let isDup = false;
      let dupOf = undefined;
      
      if (seenHashes.has(contentHash)) {
        isDup = true;
        dupOf = seenHashes.get(contentHash);
        totalDuplicates++;
      } else {
        seenHashes.set(contentHash, id);
      }
      
      const parsed: ParsedPYQ = {
        id,
        type: 'pyq',
        exam_section: meta.part_name || 'General',
        topic: 'Unassigned',
        subtopic: 'Unassigned',
        related_topic_ids: [],
        source_file: file,
        exam: meta.exam,
        year: meta.year,
        stage: meta.stage,
        part_code: meta.part_code as any,
        part_name: meta.part_name as any,
        question_number: rq.question_number,
        question_text: qText,
        options: rq.options,
        is_duplicate: isDup,
        duplicate_of: dupOf,
        content_hash: contentHash
      };
      
      if (!isDryRun) {
        fs.writeFileSync(path.join(OUT_DIR, `${id}.json`), JSON.stringify(parsed, null, 2));
      }
      saved++;
      totalProcessed++;
    }
    
    fileStats[file] = saved;
  }
  
  console.log('--- Ingestion Summary ---');
  console.log(`Dry Run: ${isDryRun}`);
  console.log(`Total Questions Processed: ${totalProcessed}`);
  console.log(`Total Duplicates Found: ${totalDuplicates}`);
  console.log(`Files Skipped: ${totalSkipped}`);
  console.log('File Breakdown:', fileStats);
}

main();
