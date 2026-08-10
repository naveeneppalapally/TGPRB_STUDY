#!/usr/bin/env python3
import os
import glob
import json
import time
import fitz
import tempfile
from google import genai
from google.genai import types

# 1. Load Google Cloud credentials from .env
dotenv_path = '/home/naveen/Documents/TGPRB/.env'
if os.path.exists(dotenv_path):
    with open(dotenv_path) as f:
        for line in f:
            if '=' in line and not line.strip().startswith('#'):
                k, v = line.strip().split('=', 1)
                os.environ[k.strip()] = v.strip().strip('\"\'')

creds_json = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON')
if creds_json:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.json', mode='w')
    tmp.write(creds_json)
    tmp.close()
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = tmp.name

# 2. Initialize Gemini Client (Vertex AI)
project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')
client = genai.Client(vertexai=True, project=project_id, location='us-central1')

output_dir = '/home/naveen/Documents/TGPRB/Extracted_JSON'
os.makedirs(output_dir, exist_ok=True)

all_pdfs = sorted(glob.glob('/home/naveen/Videos/Chats/**/*.pdf', recursive=True))

ignore_keywords = ['Key', 'Study_Guide', 'Set_B', 'Set_C', 'Set_D', 'Paper1.pdf', 'Paper2.pdf']

target_pdfs = []
for p in all_pdfs:
    base = os.path.basename(p)
    if any(k in base for k in ignore_keywords):
        continue
    target_pdfs.append(p)

print(f"📋 Found {len(target_pdfs)} target question papers for extraction:\n")
for idx, p in enumerate(target_pdfs, 1):
    print(f"  {idx:2d}. {os.path.basename(p)}")
print("-" * 60)

system_prompt = """
You are an expert OCR and exam question extractor.
Look at this scanned page containing bilingual (English + Telugu) multiple-choice questions from TGPRB exam paper.

Task Rules:
1. Ignore all Telugu text, characters, and Telugu translations completely.
2. Ignore all page headers, footers, page numbers, and watermarks (e.g. www.universityupdates.in, www.previousquestionpapers.com).
3. Extract EVERY English question and its 4 options.
4. Output a clean JSON array of objects with the exact schema:
[
  {
    "q_no": 1,
    "question": "English question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
  }
]

Return ONLY raw valid JSON array. Do not wrap in markdown or extra commentary.
"""

def generate_content_with_retry(img_bytes, retries=5):
    """Retries with exponential backoff on 429 rate limit errors."""
    for attempt in range(1, retries + 1):
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[
                    types.Part.from_bytes(data=img_bytes, mime_type='image/png'),
                    system_prompt
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1
                )
            )
            return response
        except Exception as e:
            err_str = str(e)
            if ('429' in err_str or 'RESOURCE_EXHAUSTED' in err_str) and attempt < retries:
                wait_sec = attempt * 3
                print(f" (⏳ Rate limited, retrying in {wait_sec}s...)", end="", flush=True)
                time.sleep(wait_sec)
            else:
                raise e

master_questions = []

for paper_idx, pdf_path in enumerate(target_pdfs, 1):
    paper_name = os.path.splitext(os.path.basename(pdf_path))[0]
    out_file = os.path.join(output_dir, f"{paper_name}.json")
    
    print(f"\n🚀 [{paper_idx}/{len(target_pdfs)}] Extracting: {paper_name}")

    # Use existing desktop extraction for SI_2018_Mains_Paper4_GS
    desktop_already = '/home/naveen/Desktop/SI_2018_Mains_Paper4_GS_extracted.json'
    if paper_name == 'SI_2018_Mains_Paper4_GS' and os.path.exists(desktop_already):
        print(f"  ⏩ Using existing desktop extraction for {paper_name}")
        with open(desktop_already, 'r', encoding='utf-8') as f:
            paper_qs = json.load(f)
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(paper_qs, f, indent=2, ensure_ascii=False)
        master_questions.extend(paper_qs)
        continue

    # Skip if already completely extracted
    if os.path.exists(out_file) and os.path.getsize(out_file) > 500:
        print(f"  ⏩ Already extracted ({out_file}). Skipping.")
        with open(out_file, 'r', encoding='utf-8') as f:
            paper_qs = json.load(f)
        master_questions.extend(paper_qs)
        continue

    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    paper_questions = []

    for page_num in range(total_pages):
        page = doc[page_num]
        pix = page.get_pixmap(dpi=200)
        img_bytes = pix.tobytes('png')

        print(f"  Page {page_num + 1}/{total_pages}...", end="", flush=True)

        try:
            response = generate_content_with_retry(img_bytes)
            raw_text = response.text.strip()
            page_qs = json.loads(raw_text)
            
            if isinstance(page_qs, list):
                for q in page_qs:
                    q['paper_name'] = paper_name
                    q['source_page'] = page_num + 1
                paper_questions.extend(page_qs)
                print(f" ✓ {len(page_qs)} Qs")
            else:
                print(" ⚠️ Non-list output")

        except Exception as e:
            print(f" ❌ Error: {e}")
        
        # Save progress per page
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(paper_questions, f, indent=2, ensure_ascii=False)
        
        # Pace requests at ~1.5 seconds per page to stay comfortably under RPM limits
        time.sleep(1.5)

    print(f"  🎉 Completed {paper_name}: {len(paper_questions)} total questions")
    master_questions.extend(paper_questions)

# Save combined master file
master_path = os.path.join(output_dir, "master_pyq_dataset.json")
desktop_master = "/home/naveen/Desktop/TGPRB_Master_PYQ_Dataset.json"

with open(master_path, "w", encoding="utf-8") as f:
    json.dump(master_questions, f, indent=2, ensure_ascii=False)

with open(desktop_master, "w", encoding="utf-8") as f:
    json.dump(master_questions, f, indent=2, ensure_ascii=False)

print("\n" + "="*60)
print(f"🏆 ALL PAPERS BATCH EXTRACTION COMPLETE!")
print(f"📊 Total Questions Extracted Across All Papers: {len(master_questions)}")
print(f"📁 Master File Saved To: {desktop_master}")
print("="*60)
