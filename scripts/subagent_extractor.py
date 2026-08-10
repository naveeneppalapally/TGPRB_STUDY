#!/usr/bin/env python3
import os
import sys
import json
import fitz
import tempfile
from google import genai
from google.genai import types
from tenacity import retry, wait_exponential, stop_after_attempt

if len(sys.argv) != 2:
    print("Usage: python3 subagent_extractor.py <pdf_path>")
    sys.exit(1)

pdf_path = sys.argv[1]
filename = os.path.basename(pdf_path)
output_dir = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json'
os.makedirs(output_dir, exist_ok=True)
json_name = os.path.splitext(filename)[0] + ".json"
output_file = os.path.join(output_dir, json_name)

# 1. Load Google Cloud credentials from .env
dotenv_path = '/home/naveen/Documents/TGPRB/.env'
if os.path.exists(dotenv_path):
    with open(dotenv_path) as f:
        for line in f:
            if '=' in line and not line.strip().startswith('#'):
                k, v = line.strip().split('=', 1)
                os.environ[k.strip()] = v.strip().strip('"\'')

creds_json = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON')
if creds_json:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.json', mode='w')
    tmp.write(creds_json)
    tmp.close()
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = tmp.name

# 2. Initialize Gemini Client (Vertex AI)
project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')
client = genai.Client(vertexai=True, project=project_id, location='us-central1')

doc = fitz.open(pdf_path)
total_pages = len(doc)
print(f"📄 Loaded PDF: {pdf_path} ({total_pages} pages)")

system_prompt = """
You are an expert OCR and exam question extractor.
Look at this scanned exam page containing bilingual (English + Telugu) multiple-choice questions from TGPRB.

Task Rules:
1. Ignore all Telugu text, characters, and Telugu translations completely.
2. Ignore all page headers, footers, page numbers, and watermarks.
3. Extract EVERY English question and its 4 options.
4. Visually check if the question contains a diagram, figure, chart, map, pattern matrix, Venn diagram, or visual drawing. Set "has_image": true if it does, otherwise "has_image": false.
5. Output a clean JSON array of objects with the exact schema:
[
  {
    "q_no": 1,
    "question": "English question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "has_image": false
  }
]

Return ONLY raw valid JSON array. Do not wrap in markdown or extra commentary. If no questions are present, return [].
"""

@retry(wait=wait_exponential(multiplier=1, min=4, max=20), stop=stop_after_attempt(6))
def process_page(img_bytes):
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=[
            types.Part.from_bytes(data=img_bytes, mime_type='image/png'),
            system_prompt
        ],
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            temperature=0.0
        )
    )
    return response.text.strip()

all_extracted_questions = []

for page_num in range(total_pages):
    page = doc[page_num]
    pix = page.get_pixmap(dpi=200)
    img_bytes = pix.tobytes('png')

    try:
        raw_text = process_page(img_bytes)
        page_qs = json.loads(raw_text)
        
        if isinstance(page_qs, list):
            for q in page_qs:
                q['source_page'] = page_num + 1
            all_extracted_questions.extend(page_qs)
            print(f"[{filename}] Page {page_num+1}/{total_pages}: ✓ Extracted {len(page_qs)} questions")
        else:
            print(f"[{filename}] Page {page_num+1}/{total_pages}: ⚠️ Output was not a JSON list")
    except Exception as e:
        print(f"[{filename}] Page {page_num+1}/{total_pages}: ❌ Error: {e}")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(all_extracted_questions, f, indent=2, ensure_ascii=False)

print(f"✅ [{filename}] EXTRACTION COMPLETE: {len(all_extracted_questions)} questions saved to {output_file}")
