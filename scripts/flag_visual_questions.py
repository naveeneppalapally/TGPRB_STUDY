#!/usr/bin/env python3
import os
import glob
import json
import re
import fitz  # PyMuPDF

json_dir = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json'
pdf_base_dirs = [
    '/home/naveen/Videos/Chats/TGPLRB_Constable_Papers',
    '/home/naveen/Videos/Chats/TGPLRB_SI_Papers'
]

images_out_dir = '/home/naveen/Documents/TGPRB/extracted_questioin_paper_json/images'
os.makedirs(images_out_dir, exist_ok=True)

# Visual keywords using word boundaries to avoid false positives (like paragraph -> graph)
VISUAL_KEYWORDS = [
    r'\bdiagram\b', r'\bfigure\b', r'\bshown below\b', r'\bgiven below\b', 
    r'\bfollowing picture\b', r'\bvenn\b', r'\bmirror image\b', r'\bwater image\b', 
    r'\bpaper fold\b', r'\bmissing number\b', r'\bmissing character\b', r'\bcube\b', 
    r'\bdice\b', r'\bpattern\b', r'\bembedded\b', r'\btriangle\b', r'\brectangle\b', 
    r'\bcircle\b', r'\bmatrix\b', r'\bshape\b', r'\bchart\b', r'\bmap\b', r'\bgraph\b'
]

def find_pdf_for_json(json_filename):
    paper_name = os.path.splitext(json_filename)[0]
    for d in pdf_base_dirs:
        possible_pdf = os.path.join(d, paper_name + ".pdf")
        if os.path.exists(possible_pdf):
            return possible_pdf
    return None

json_files = glob.glob(os.path.join(json_dir, "*.json"))
print(f"🔍 Scanning {len(json_files)} extracted JSON files for visual/image questions (using regex word boundaries)...\n")

total_visual_qs = 0

for jf in json_files:
    json_name = os.path.basename(jf)
    pdf_path = find_pdf_for_json(json_name)
    
    with open(jf, 'r', encoding='utf-8') as f:
        try:
            questions = json.load(f)
        except Exception:
            continue

    paper_visual_count = 0
    paper_name = os.path.splitext(json_name)[0]
    paper_img_dir = os.path.join(images_out_dir, paper_name)
    os.makedirs(paper_img_dir, exist_ok=True)

    doc = fitz.open(pdf_path) if pdf_path and os.path.exists(pdf_path) else None

    for q in questions:
        q_text = (q.get('question', '') + " " + " ".join(q.get('options', []))).lower()
        
        # Check if question has visual keywords
        has_visual = any(re.search(pattern, q_text) for pattern in VISUAL_KEYWORDS)
        
        if has_visual:
            q['has_image'] = True
            paper_visual_count += 1
            total_visual_qs += 1
            
            page_num = q.get('source_page', 1)
            img_filename = f"q_{q.get('q_no', 'x')}_page_{page_num}.png"
            img_path = os.path.join(paper_img_dir, img_filename)
            q['image_file'] = f"images/{paper_name}/{img_filename}"

            # Render the full page for visual inspection if doc exists
            if doc and 1 <= page_num <= len(doc) and not os.path.exists(img_path):
                page = doc[page_num - 1]
                pix = page.get_pixmap(dpi=150)
                pix.save(img_path)
        else:
            q['has_image'] = False
            # Clean up image fields if previously set by false positive
            if 'image_file' in q:
                del q['image_file']

    # Save updated JSON with image metadata
    with open(jf, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"📊 [{json_name}]: Flagged {paper_visual_count}/{len(questions)} visual/diagram questions.")

print(f"\n✨ DONE! Total visual/diagram questions flagged across all papers: {total_visual_qs}")
print(f"📁 High-resolution page renders saved to: {images_out_dir}")
