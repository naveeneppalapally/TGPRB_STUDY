#!/usr/bin/env python3
"""
build_canonical_registry.py

Scans all 25 extracted PYQ JSON files, normalizes question stems,
computes pairwise paper overlap, identifies canonical papers vs duplicate reprints,
and builds the canonical question registry.
"""

import os
import re
import json
import glob
import hashlib
import unicodedata

DATA_DIR = os.path.join(os.path.dirname(__file__), "../../extracted_question_paper_json")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../../data")

def normalize_stem(text: str) -> str:
    """Normalize question text for stable fingerprinting."""
    if not text:
        return ""
    # Unicode NFKC
    t = unicodedata.normalize("NFKC", text)
    # Remove leading question numbers e.g. '1.', '1)', 'Q.1', 'Q1:'
    t = re.sub(r"^(?:q(?:uestion)?\.?\s*\d+[\.\)\:\-]?|\d+[\.\)\:\-]?)\s*", "", t, flags=re.IGNORECASE)
    # Remove common OCR artifact prefixes
    t = re.sub(r"^[\s\.\:\-\*]+", "", t)
    # Lowercase & collapse whitespace
    t = " ".join(t.lower().split())
    # Strip basic non-alphanumeric punctuation for fuzzy hashing
    clean = re.sub(r"[^\w\s]", "", t)
    return clean.strip()

def compute_hash(text: str) -> str:
    """SHA-256 fingerprint of normalized text."""
    norm = normalize_stem(text)
    return hashlib.sha256(norm.encode("utf-8")).hexdigest()[:16]

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    json_files = sorted(glob.glob(os.path.join(DATA_DIR, "*.json")))
    
    if not json_files:
        print(f"Error: No JSON files found in {DATA_DIR}")
        return

    print(f"==================================================")
    print(f"  TSLPRB CANONICAL PAPER REGISTRY & DEDUP ENGINE  ")
    print(f"==================================================")
    print(f"Found {len(json_files)} question paper JSON files.\n")

    papers_data = {}
    paper_stems = {}
    
    for fpath in json_files:
        fname = os.path.basename(fpath)
        with open(fpath, "r", encoding="utf-8") as f:
            questions = json.load(f)
        
        stems_map = {}
        for q in questions:
            q_num = q.get("q_no")
            raw_q = q.get("question", "")
            h = compute_hash(raw_q)
            stems_map[q_num] = {
                "hash": h,
                "norm": normalize_stem(raw_q),
                "raw": raw_q,
                "options": q.get("options", []),
                "has_image": q.get("has_image", False),
                "source_page": q.get("source_page", None),
                "source_file": fname
            }
        
        papers_data[fname] = questions
        paper_stems[fname] = stems_map
        print(f"  ✓ Loaded {fname:<42}: {len(questions):>3} questions")

    print("\n--------------------------------------------------")
    print("Computing Paper Overlap Matrix...")
    print("--------------------------------------------------")

    overlap_results = []
    file_names = list(papers_data.keys())
    
    for i in range(len(file_names)):
        f1 = file_names[i]
        hashes1 = {item["hash"] for item in paper_stems[f1].values() if item["hash"]}
        
        for j in range(i + 1, len(file_names)):
            f2 = file_names[j]
            hashes2 = {item["hash"] for item in paper_stems[f2].values() if item["hash"]}
            
            common = hashes1.intersection(hashes2)
            if not common:
                continue
                
            min_len = min(len(hashes1), len(hashes2))
            ratio = len(common) / min_len if min_len > 0 else 0
            
            if ratio >= 0.20:  # Report any paper pair with >= 20% identical questions
                overlap_results.append({
                    "paper_a": f1,
                    "paper_b": f2,
                    "common_count": len(common),
                    "paper_a_count": len(hashes1),
                    "paper_b_count": len(hashes2),
                    "overlap_ratio": round(ratio, 4)
                })

    # Sort by overlap ratio descending
    overlap_results.sort(key=lambda x: x["overlap_ratio"], reverse=True)

    print(f"\nDetected {len(overlap_results)} High-Overlap Paper Pairs:\n")
    print(f"{'Paper A':<35} | {'Paper B':<35} | {'Common':<6} | {'Overlap':<7}")
    print("-" * 90)
    for r in overlap_results:
        pct = f"{r['overlap_ratio']*100:.1f}%"
        print(f"{r['paper_a']:<35} | {r['paper_b']:<35} | {r['common_count']:<6} | {pct:<7}")

    # Build Deduplicated Master Question Registry
    print("\n--------------------------------------------------")
    print("Building Unique Master Question Catalog...")
    print("--------------------------------------------------")

    unique_questions = {}
    hash_to_uid = {}
    q_counter = 1

    for fname, stems in paper_stems.items():
        for q_no, q_info in stems.items():
            h = q_info["hash"]
            if not h:
                continue
            
            if h not in hash_to_uid:
                uid = f"PYQ-{q_counter:04d}"
                hash_to_uid[h] = uid
                unique_questions[uid] = {
                    "uid": uid,
                    "hash": h,
                    "question_text": q_info["raw"],
                    "normalized_stem": q_info["norm"],
                    "options": q_info["options"],
                    "has_image": q_info["has_image"],
                    "occurrences": [{
                        "source_file": fname,
                        "q_no": q_no,
                        "source_page": q_info["source_page"]
                    }]
                }
                q_counter += 1
            else:
                uid = hash_to_uid[h]
                unique_questions[uid]["occurrences"].append({
                    "source_file": fname,
                    "q_no": q_no,
                    "source_page": q_info["source_page"]
                })
                if q_info["has_image"]:
                    unique_questions[uid]["has_image"] = True

    multi_occurrence = [q for q in unique_questions.values() if len(q["occurrences"]) > 1]
    
    registry_meta = {
        "total_source_files": len(json_files),
        "total_raw_questions": sum(len(q) for q in papers_data.values()),
        "total_unique_questions": len(unique_questions),
        "total_repeated_questions": len(multi_occurrence),
        "paper_overlap_pairs": overlap_results,
        "files_summary": {
            fname: {
                "question_count": len(questions),
                "is_duplicate_set": any(r["overlap_ratio"] > 0.85 for r in overlap_results if fname in (r["paper_a"], r["paper_b"]))
            }
            for fname, questions in papers_data.items()
        }
    }

    # Save Registry
    registry_path = os.path.join(OUTPUT_DIR, "pyq_canonical_registry.json")
    with open(registry_path, "w", encoding="utf-8") as f:
        json.dump(registry_meta, f, indent=2, ensure_ascii=False)

    # Save Master Deduplicated Questions
    master_path = os.path.join(OUTPUT_DIR, "pyq_master_catalog.json")
    with open(master_path, "w", encoding="utf-8") as f:
        json.dump(list(unique_questions.values()), f, indent=2, ensure_ascii=False)

    print(f"\n==================================================")
    print(f"  REGISTRY GENERATION COMPLETE                    ")
    print(f"==================================================")
    print(f"  Total Raw Questions Ingested : {registry_meta['total_raw_questions']}")
    print(f"  Total Unique Questions       : {registry_meta['total_unique_questions']}")
    print(f"  Identical Repeats / Cross-Set: {registry_meta['total_repeated_questions']}")
    print(f"  Saved Registry To            : {registry_path}")
    print(f"  Saved Master Catalog To      : {master_path}")
    print(f"==================================================\n")

if __name__ == "__main__":
    main()
