#!/usr/bin/env python3
import os
import glob
from concurrent.futures import ThreadPoolExecutor, as_completed
import subprocess

si_dir = '/home/naveen/Videos/Chats/TGPLRB_SI_Papers'
all_pdfs = sorted(glob.glob(os.path.join(si_dir, "*.pdf")))

ignore_keywords = ['Key', 'Study_Guide', 'Set_B', 'Set_C', 'Set_D']
target_pdfs = []
for p in all_pdfs:
    base = os.path.basename(p)
    if any(k in base for k in ignore_keywords):
        continue
    target_pdfs.append(p)

print(f"🚀 Found {len(target_pdfs)} SI PDFs to process.")

def run_extractor(pdf_path):
    cmd = ["python3", "-u", "/home/naveen/Documents/TGPRB/scripts/subagent_extractor.py", pdf_path]
    print(f"▶️ Starting extraction for: {os.path.basename(pdf_path)}")
    res = subprocess.run(cmd, capture_output=False)
    print(f"✅ Completed: {os.path.basename(pdf_path)}")
    return pdf_path

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(run_extractor, pdf) for pdf in target_pdfs]
    for future in as_completed(futures):
        try:
            future.result()
        except Exception as e:
            print(f"❌ Error: {e}")

print("🏁 Running final visual question flagging...")
subprocess.run(["python3", "/home/naveen/Documents/TGPRB/scripts/flag_visual_questions.py"])

print("🏁 Running final diagram cropping...")
subprocess.run(["python3", "/home/naveen/Documents/TGPRB/scripts/crop_diagrams.py"])

print("🏆 ALL SI PAPERS EXTRACTION COMPLETE!")
