import * as fs from 'node:fs';
import * as path from 'node:path';
import { ParsedPYQ, TierAssignment } from '../types/content';

const PYQ_DIR = path.join(process.cwd(), 'content/pyq');

function main() {
  if (!fs.existsSync(PYQ_DIR)) {
    console.log('PYQ directory not found.');
    return;
  }

  const files = fs.readdirSync(PYQ_DIR).filter(f => f.endsWith('.json'));
  
  const counts: Record<string, number> = {};
  const meta: Record<string, { exam_section: string }> = {};

  for (const file of files) {
    const data: ParsedPYQ = JSON.parse(fs.readFileSync(path.join(PYQ_DIR, file), 'utf-8'));
    
    // Only count verified PYQs (or ones that have verified_topic_id, but here we group by topic/subtopic)
    // The instructions say "counts verified PYQs per (topic, subtopic)". 
    // If a PYQ isn't verified, it might not have verified_topic_id.
    // Assuming we use topic and subtopic from the ParsedPYQ.
    if (data.topic && data.topic !== 'Unassigned' && data.subtopic && data.subtopic !== 'Unassigned') {
      const key = `${data.topic}::${data.subtopic}`;
      counts[key] = (counts[key] || 0) + 1;
      meta[key] = { exam_section: data.exam_section || 'General' };
    }
  }

  const tiers: TierAssignment[] = [];
  
  for (const [key, count] of Object.entries(counts)) {
    const [topic, subtopic] = key.split('::');
    let tier: 1 | 2 | 3 = 3;
    if (count >= 10) tier = 1;
    else if (count >= 3) tier = 2;
    
    tiers.push({
      topic,
      subtopic,
      exam_section: meta[key].exam_section,
      verified_pyq_count: count,
      tier
    });
  }

  console.log('Tier Assignments:');
  console.table(tiers);
}

main();
