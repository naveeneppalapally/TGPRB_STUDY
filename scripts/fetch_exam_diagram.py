#!/usr/bin/env python3
"""
scripts/fetch_exam_diagram.py
─────────────────────────────────────────────────────────────────────────────
Automated Exam Diagram Harvester for TGPRB StudyOS.
Uses Bing Image Engine with exact exam-domain prioritization (PMF IAS, Rau IAS,
Drishti IAS, Testbook, Civilspedia, etc.) to fetch full-resolution exam diagrams,
convert them to optimized WebP, and place them in assets-to-upload/<subject>/
"""

import sys
import os
import re
import json
import urllib.request
import urllib.parse
from PIL import Image

EXAM_DOMAINS = [
    'pmfias.com',
    'rauias.com',
    'drishtiias.com',
    'testbook.com',
    'civilspedia.com',
    'riversinsight.com',
    'upsccolorfullnotes.com',
    'clearias.com'
]

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
}

def search_bing_images(query):
    """Scrape full-resolution image URLs from Bing Image Search."""
    url = f"https://www.bing.com/images/search?q={urllib.parse.quote(query)}&form=HDRSC2"
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            # Extract original image URLs (murl)
            urls = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', html)
            # Unescape html entities
            urls = [u.replace('&amp;', '&') for u in urls]
            return urls
    except Exception as e:
        print(f"[!] Bing search error: {e}")
        return []

def download_image(img_url, save_path):
    """Download image using desktop browser headers."""
    req = urllib.request.Request(img_url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=12) as resp, open(save_path, 'wb') as out:
            out.write(resp.read())
        return True
    except Exception as e:
        print(f"  [x] Download failed ({img_url[:60]}...): {e}")
        return False

def convert_to_webp(input_path, output_path):
    """Convert downloaded raw image to optimized WebP format."""
    try:
        img = Image.open(input_path)
        if img.mode in ('RGBA', 'LA'):
            img = img.convert('RGB')
        img.save(output_path, 'WEBP', quality=90)
        
        # Copy to public/images for local dev preview
        subject = os.path.basename(os.path.dirname(output_path))
        filename = os.path.basename(output_path)
        pub_path = os.path.join('public', 'images', subject, filename)
        os.makedirs(os.path.dirname(pub_path), exist_ok=True)
        img.save(pub_path, 'WEBP', quality=90)

        if input_path != output_path and os.path.exists(input_path):
            os.remove(input_path)

        print(f"  [✓] Saved & converted to WebP: {output_path} ({os.path.getsize(output_path)} bytes)")
        print(f"  [✓] Copied for local preview: {pub_path}")
        return True
    except Exception as e:
        print(f"  [x] WebP conversion error: {e}")
        return False

def main():
    if len(sys.argv) < 3:
        print("Usage: python3 scripts/fetch_exam_diagram.py <subject> <query_or_topic> [filename_slug]")
        print("Example: python3 scripts/fetch_exam_diagram.py geography 'Godavari river basin map' godavari-river-map")
        sys.exit(1)

    subject = sys.argv[1].lower()
    query = sys.argv[2]
    filename_slug = sys.argv[3] if len(sys.argv) > 3 else re.sub(r'[^a-z0-9]+', '-', query.lower()).strip('-')

    target_dir = os.path.join('assets-to-upload', subject)
    os.makedirs(target_dir, exist_ok=True)

    webp_out = os.path.join(target_dir, f"{filename_slug}.webp")
    temp_raw = os.path.join(target_dir, f"{filename_slug}_temp.raw")

    print(f"\n🔍 Searching high-res exam diagrams for: '{query}'...")

    # Phase 1: Search targeted exam queries first
    candidate_urls = []

    # Direct query with PMF IAS / UPSC keywords
    urls = search_bing_images(f"{query} PMF IAS OR Rau IAS OR Testbook map diagram")
    candidate_urls.extend(urls)

    # Sort candidates: prioritize URLs coming from top exam domains
    def score_url(u):
        u_lower = u.lower()
        for i, d in enumerate(EXAM_DOMAINS):
            if d in u_lower:
                return i
        return 99

    candidate_urls.sort(key=score_url)

    # Deduplicate keeping order
    seen = set()
    unique_candidates = []
    for u in candidate_urls:
        if u not in seen:
            seen.add(u)
            unique_candidates.append(u)

    print(f"  Found {len(unique_candidates)} high-res candidates.")

    # Try downloading candidate URLs until one succeeds
    success = False
    for url in unique_candidates[:8]:
        print(f"  -> Downloading candidate: {url[:75]}...")
        if download_image(url, temp_raw):
            if convert_to_webp(temp_raw, webp_out):
                success = True
                break

    if success:
        print(f"\n🎉 SUCCESS! Exam diagram saved.")
        print(f"📁 Staged file: {webp_out}")
        print(f"💡 Vue Template Code:")
        print(f"   <img src=\"/images/{subject}/{filename_slug}.webp\" alt=\"{query}\" />\n")
    else:
        print("\n❌ Could not automatically fetch a working diagram for this query.")

if __name__ == '__main__':
    main()
