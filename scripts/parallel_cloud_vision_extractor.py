#!/usr/bin/env python3
import os
import glob
import json
import time
import fitz
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from google.cloud import vision
from google import genai
from google.genai import types
from tenacity import retry, wait_exponential, stop_after_attempt

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

# 2. Setup paths
project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')
output_dir = '/home/naveen/Documents/TGPRB/Extracted_JSON'
desktop_dir = '/home/naveen/Desktop'
os.makedirs(output_dir, exist_ok=True)

all_pdfs = sorted(glob.glob('/home/naveen/Videos/Chats/**/*.pdf', recursive=True))
ignore_keywords = ['Key', 'Study_Guide', 'Set_B', 'Set_C', 'Set_D', 'Paper1.pdf', 'Paper2.pdf']

target_pdfs = []
for p in all_pdfs:
    base = os.path.basename(p)
    if any(k in base for k in ignore_keywords):
        continue
    target_pdfs.append(p)

print(f"🚀 Parallel Extractor initialized for {len(target_pdfs)} PDFs (4 Parallel Workers)", flush=True)

text_structuring_prompt = """
You are an expert exam paper structure parser.
Below is the raw text extracted via OCR from a page of a bilingual (English + Telugu) Indian exam paper (TGPRB).

Task:
1. Extract ONLY the English questions and their 4 options. Ignore all Telugu text.
2. Ignore watermarks, page numbers, website names (e.g. Adda247, universityupdates.in).
3. Return a clean JSON array of question objects:
[
  {
    "q_no": 1,
    "question": "English question prompt",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
  }
]

Return ONLY valid JSON array. If no questions are on this page, return [].
"""

def extract_single_pdf(pdf_path):
    """Worker function to process one full PDF paper."""
    paper_name = os.path.splitext(os.path.basename(pdf_path))[0]
    out_file = os.path.join(output_dir, f"{paper_name}.json")
    desktop_file = os.path.join(desktop_dir, f"{paper_name}.json")
    
    # We will FORCE extraction for all files to ensure complete data
    # (Previously skipping if len(existing) >= 100, but we found many incomplete files)

    # Thread-local GCP clients
    vision_client = vision.ImageAnnotatorClient()
    gemini_client = genai.Client(vertexai=True, project=project_id, location='us-central1')

    @retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(5))
    def call_vision(img_bytes):
        image = vision.Image(content=img_bytes)
        ocr_res = vision_client.document_text_detection(image=image)
        return ocr_res.full_text_annotation.text if ocr_res.full_text_annotation else ""

    @retry(wait=wait_exponential(multiplier=1, min=4, max=20), stop=stop_after_attempt(5))
    def call_gemini(raw_text):
        return gemini_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=f"{text_structuring_prompt}\n\nRAW PAGE OCR TEXT:\n{raw_text}",
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.0
            )
        )

    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    paper_questions = []
    t0 = time.time()

    print(f"▶️ [{paper_name}] Starting ({total_pages} pages)...", flush=True)

    for page_num in range(total_pages):
        page = doc[page_num]
        pix = page.get_pixmap(dpi=200)
        img_bytes = pix.tobytes('png')

        # Phase A: Cloud Vision OCR
        try:
            raw_page_text = call_vision(img_bytes)
        except Exception as e:
            print(f"⚠️ [{paper_name} P{page_num+1}] Vision OCR Failed after retries: {e}", flush=True)
            continue

        if not raw_page_text.strip():
            continue

        # Phase B: Text LLM Structuring
        try:
            response = call_gemini(raw_page_text)
            page_qs = json.loads(response.text.strip())
            if isinstance(page_qs, list):
                for q in page_qs:
                    q['paper_name'] = paper_name
                    q['source_page'] = page_num + 1
                paper_questions.extend(page_qs)
        except Exception as e:
            print(f"⚠️ [{paper_name} P{page_num+1}] Gemini Structuring Failed after retries: {e}", flush=True)
            continue

        # Save separate JSON file incrementally
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(paper_questions, f, indent=2, ensure_ascii=False)

        with open(desktop_file, 'w', encoding='utf-8') as f:
            json.dump(paper_questions, f, indent=2, ensure_ascii=False)

        time.sleep(0.25)

    elapsed = round(time.time() - t0, 1)
    print(f"✅ [{paper_name}] Complete! Saved to Desktop/{paper_name}.json ({len(paper_questions)} Qs in {elapsed}s)", flush=True)
    return paper_name, len(paper_questions)

start_time_all = time.time()

# Run 4 parallel paper extractions
with ThreadPoolExecutor(max_workers=4) as executor:
    futures = {executor.submit(extract_single_pdf, pdf): pdf for pdf in target_pdfs}
    for future in as_completed(futures):
        pdf = futures[future]
        try:
            name, q_count = future.result()
        except Exception as exc:
            print(f"❌ [{os.path.basename(pdf)}] Generated exception: {exc}", flush=True)

total_elapsed = round((time.time() - start_time_all) / 60, 2)
print("\n" + "="*60, flush=True)
print(f"🏆 ALL INDIVIDUAL PAPERS EXTRACTION COMPLETE!", flush=True)
print(f"⏱️ Total Time Taken: {total_elapsed} minutes", flush=True)
print(f"📁 All 18 separate JSON files saved to Desktop and Extracted_JSON/", flush=True)
print("="*60, flush=True)
