#!/usr/bin/env python3
import os
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
                os.environ[k] = v

creds_json = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON')
if creds_json:
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.json', mode='w')
    tmp.write(creds_json)
    tmp.close()
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = tmp.name

# 2. Initialize Gemini Client (Vertex AI)
project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')
client = genai.Client(vertexai=True, project=project_id, location='us-central1')

pdf_path = '/home/naveen/Videos/Chats/TGPLRB_SI_Papers/SI_2018_Mains_Paper4_GS.pdf'
desktop_output = '/home/naveen/Desktop/SI_2018_Mains_Paper4_GS_extracted.json'

doc = fitz.open(pdf_path)
total_pages = len(doc)
print(f"📄 Loaded PDF: {pdf_path}")
print(f"📚 Total pages: {total_pages}")
print(f"💾 Saving results to: {desktop_output}\n")

system_prompt = """
You are an expert OCR and exam question extractor.
Look at this scanned exam page containing bilingual (English + Telugu) multiple-choice questions from TGPRB.

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

all_extracted_questions = []

for page_num in range(total_pages):
    page = doc[page_num]
    pix = page.get_pixmap(dpi=200)
    img_bytes = pix.tobytes('png')

    print(f"Processing Page {page_num + 1}/{total_pages}...", end="", flush=True)

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
        
        raw_text = response.text.strip()
        page_qs = json.loads(raw_text)
        
        if isinstance(page_qs, list):
            for q in page_qs:
                q['source_page'] = page_num + 1
            all_extracted_questions.extend(page_qs)
            print(f" ✓ Extracted {len(page_qs)} questions")
        else:
            print(" ⚠️ Output was not a JSON list")

    except Exception as e:
        print(f" ❌ Error: {e}")
    
    # Save incremental progress to Desktop so user can inspect immediately
    with open(desktop_output, 'w', encoding='utf-8') as f:
        json.dump(all_extracted_questions, f, indent=2, ensure_ascii=False)
    
    time.sleep(0.5)

print("\n" + "="*60)
print(f"✅ EXTRACTION COMPLETE!")
print(f"📊 Total Questions Extracted: {len(all_extracted_questions)}")
print(f"📁 Saved File: {desktop_output}")
print("="*60)
