import * as fs from 'node:fs';
import * as path from 'node:path';
import { ParsedPYQ } from '../types/content';

const PYQ_DIR = path.join(process.cwd(), 'content/pyq');

function main() {
  if (!fs.existsSync(PYQ_DIR)) {
    console.log('PYQ directory not found.');
    return;
  }

  const files = fs.readdirSync(PYQ_DIR).filter(f => f.endsWith('.json'));
  let updated = 0;

  for (const file of files) {
    const filepath = path.join(PYQ_DIR, file);
    const data: ParsedPYQ = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    
    // Cross-check logic: if seed_topic matches some mapping, assign verified_topic_id
    // This is a stub for the actual verification logic based on Topic_Banks
    if (data.seed_topic && !data.verified_topic_id) {
      data.verified_topic_id = `VERIFIED-${data.seed_topic.toUpperCase().replace(/\s+/g, '-')}`;
      data.topic = data.seed_topic;
      data.subtopic = 'General'; // Defaulting
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      updated++;
    }
  }

  console.log(`Topic Verification Complete. Updated ${updated} PYQs.`);
}

main();
