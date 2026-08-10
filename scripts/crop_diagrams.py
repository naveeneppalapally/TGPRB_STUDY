#!/usr/bin/env python3
import os
import glob
import json
import fitz  # PyMuPDF
from PIL import Image
import io
from google import genai
from google.genai import types

# Load credentials
dotenv_path = '/home/naveen/Documents/TGPRB/.env'
if os.path.exists(dotenv_path):
    with open(dotenv_path) as f:
        for line in f:
            if '=' in line and not line.strip().startswith('#'):
                k, v = line.strip().split('=', 1)
                os.environ[k.strip()] = v.strip().strip('"\'')

creds_json = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS_JSON')
if creds_json:
    import tempfile
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix='.json', mode='w')
    tmp.write(creds_json)
    tmp.close()
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = tmp.name

project_id = os.environ.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')
client = genai.Client(vertexai=True, project=project_id, location='us-central1')

json_dir = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json'
images_out_dir = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json/images'

crop_prompt = """
You are an expert visual diagram locator.
Look at this page from an exam paper.
Find the bounding box of the main visual diagram, figure, Venn diagram, map, matrix pattern, or chart associated with the visual question.

Return the bounding box in normalized coordinates [ymin, xmin, ymax, xmax] on a scale of 0 to 1000.
For example: [200, 150, 600, 850]

If there is NO visual diagram, map, matrix pattern, Venn diagram, shape, or chart on the page, return null.

Output ONLY a JSON object:
{
  "box": [ymin, xmin, ymax, xmax] or null
}
"""

import time

def get_crop_box(img_bytes):
    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=[
                    types.Part.from_bytes(data=img_bytes, mime_type='image/png'),
                    crop_prompt
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.0
                )
            )
            data = json.loads(response.text.strip())
            return data.get("box")
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                time.sleep(2 * (attempt + 1))
                continue
            print(f"⚠️ Gemini crop box detection failed: {e}")
            return False
    return False

# Find all JSON files
json_files = glob.glob(os.path.join(json_dir, "*.json"))

for jf in json_files:
    try:
        with open(jf, 'r', encoding='utf-8') as f:
            questions = json.load(f)
    except Exception:
        continue

    paper_name = os.path.splitext(os.path.basename(jf))[0]
    pdf_path = None
    for d in ['/home/naveen/Videos/Chats/TGPLRB_Constable_Papers', '/home/naveen/Videos/Chats/TGPLRB_SI_Papers']:
        possible_pdf = os.path.join(d, paper_name + ".pdf")
        if os.path.exists(possible_pdf):
            pdf_path = possible_pdf
            break

    if not pdf_path:
        continue

    doc = fitz.open(pdf_path)
    updated = False

    for q in questions:
        if q.get('has_image') and 'image_file' in q:
            page_num = q.get('source_page', 1)
            q_no = q.get('q_no')
            
            # Target path for the cropped diagram
            cropped_filename = f"q_{q_no}_cropped.png"
            cropped_dir = os.path.join(images_out_dir, paper_name)
            cropped_path = os.path.join(cropped_dir, cropped_filename)

            if os.path.exists(cropped_path):
                # Already cropped
                q['image_file'] = f"images/{paper_name}/{cropped_filename}"
                updated = True
                continue

            print(f"✂️ Cropping diagram for [{paper_name}] Q{q_no} on Page {page_num}...")
            
            # Render page to get bytes for Gemini
            page = doc[page_num - 1]
            pix = page.get_pixmap(dpi=150)
            img_bytes = pix.tobytes('png')

            # Get normalized bounding box from Gemini
            box = get_crop_box(img_bytes)
            if box and len(box) == 4:
                try:
                    ymin, xmin, ymax, xmax = box
                    
                    # Convert normalized coordinates (0-1000) to actual pixel dimensions
                    img = Image.open(io.BytesIO(img_bytes))
                    width, height = img.size
                    
                    # Bounding box pixels
                    left = max(0, int(xmin * width / 1000))
                    top = max(0, int(ymin * height / 1000))
                    right = min(width, int(xmax * width / 1000))
                    bottom = min(height, int(ymax * height / 1000))

                    if (right - left) > 10 and (bottom - top) > 10:
                        # Crop and save only the diagram
                        cropped_img = img.crop((left, top, right, bottom))
                        cropped_img.save(cropped_path)
                        
                        # Update JSON pointer to the cropped diagram instead of the full page
                        q['image_file'] = f"images/{paper_name}/{cropped_filename}"
                        updated = True
                        print(f"   ✓ Cropped successfully!")
                    else:
                        print(f"   ⚠️ Invalid/empty bounding box dimension. Cleaning up flag.")
                        q['has_image'] = False
                        if 'image_file' in q:
                            del q['image_file']
                        updated = True
                except Exception as img_err:
                    print(f"   ❌ Image operation failed: {img_err}")
            elif box is False:
                # API error, do NOT clean up flag, just skip to next
                print(f"   ⚠️ API error (rate limit). Skipping crop, preserving flag for retry.")
            else:
                # box is None (Gemini confirmed no diagram exists on the page)
                print(f"   ❌ Diagram confirmed not present on page. Cleaning up flag.")
                q['has_image'] = False
                if 'image_file' in q:
                    del q['image_file']
                updated = True

    if updated:
        with open(jf, 'w', encoding='utf-8') as f:
            json.dump(questions, f, indent=2, ensure_ascii=False)

print("\n🏆 Diagram cropping complete!")
