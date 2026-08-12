#!/usr/bin/env python3
"""
classify_and_solve_pyq.py

Enrichment engine for TSLPRB Previous Year Questions.
Uses Gemini 3.6 Flash / 2.5 Flash to:
  1. Hierarchically classify question into Subject -> Topic -> Sub-topic (from taxonomy_v1.json)
  2. Solve the MCQ step-by-step with deep reasoning
  3. Output correct option index (0, 1, 2, or 3), confidence (0.0-1.0), and concise explanation
  4. Tag question type and recommended study/retention method
"""

import os
import sys
import json
import time
import argparse
from typing import List, Optional
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TAXONOMY_PATH = os.path.join(BASE_DIR, "data", "taxonomy_v1.json")
MASTER_CATALOG_PATH = os.path.join(BASE_DIR, "data", "pyq_master_catalog.json")
OUTPUT_DIR = os.path.join(BASE_DIR, "data", "enriched_pyq")

class EnrichedQuestionSchema(BaseModel):
    uid: str = Field(description="Unique Question ID e.g. PYQ-0001")
    subject_id: str = Field(description="One of: GEO, POL, HIS, TEL, SCI, ECO, ARI, REA, ENG")
    subject_name: str = Field(description="Subject name matching taxonomy")
    topic_id: str = Field(description="Specific Topic ID e.g. GEO-DRAINAGE, POL-FR-DPSP, ARI-COMMERCIAL-MATH")
    topic_name: str = Field(description="Specific Topic Name matching taxonomy")
    sub_topic: str = Field(description="Sub-topic title matching taxonomy")
    question_type: str = Field(description="One of: factual_recall, calculation, logic_reasoning, match_the_following, assertion_reason, reading_comprehension")
    difficulty: str = Field(description="F (Famous/Easy), M (Medium), O (Obscure/Hard)")
    correct_option_index: int = Field(description="0-indexed option number (0 for option 1, 1 for option 2, 2 for option 3, 3 for option 4)")
    confidence: float = Field(description="Model confidence from 0.0 to 1.0 in the correctness of the answer")
    explanation: str = Field(description="Clear, 1-3 sentence explanation teaching the underlying concept/calculation")
    recommended_memory_technique: str = Field(description="Best retention technique: e.g. blank_map_retrieval, timeline_chunking, formula_error_log, diagram_redraw, contrast_pairs")

def load_taxonomy():
    with open(TAXONOMY_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def get_gemini_client():
    # Check .env first
    api_key = os.environ.get("GEMINI_API_KEY", "")
    project = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
    
    if not api_key and not project:
        env_file = os.path.join(BASE_DIR, ".env")
        if os.path.exists(env_file):
            with open(env_file) as f:
                for line in f:
                    line = line.strip()
                    if line.startswith("GEMINI_API_KEY="):
                        api_key = line.split("=", 1)[1].strip().strip('"').strip("'")
                    elif line.startswith("GOOGLE_CLOUD_PROJECT="):
                        project = line.split("=", 1)[1].strip().strip('"').strip("'")
    
    if api_key:
        print("  [Auth] Initializing Gemini Client with GEMINI_API_KEY...")
        return genai.Client(api_key=api_key)
    elif project:
        print(f"  [Auth] Initializing Gemini Client with Vertex AI (project={project})...")
        try:
            return genai.Client(vertexai=True, project=project, location="us-central1")
        except Exception as e:
            print(f"  [Warn] Vertex AI auth error: {e}")
    
    print("\n[ERROR] No API credentials found!")
    print("Please set GEMINI_API_KEY in your .env file or environment.")
    return None

def build_system_prompt(taxonomy):
    tax_summary = []
    for s in taxonomy["subjects"]:
        for t in s["topics"]:
            sub_list = ", ".join(t["sub_topics"])
            tax_summary.append(f"- [{s['subject_id']}] {s['subject_name']} -> [{t['topic_id']}] {t['topic_name']}: ({sub_list})")
    
    tax_str = "\n".join(tax_summary)
    
    return f"""You are the master curriculum classifier and expert examination solver for the Telangana Police Recruitment Board (TSLPRB Constable & SI Exams).

YOUR MANDATE:
1. Classify each question STRICTLY into the provided hierarchy (Subject -> Topic -> Sub-topic).
2. Deeply solve the question step-by-step to determine the 100% correct answer choice.
3. Return the 0-based option index (0 for Option 1, 1 for Option 2, 2 for Option 3, 3 for Option 4).
4. Provide a high-yield, concise explanation suitable for fast study and active recall.
5. Assign difficulty: F (Easy/Famous), M (Medium), O (Obscure/Hard).

APPROVED TAXONOMY:
{tax_str}
"""

def enrich_single_question(client, model_name, sys_prompt, q_item):
    uid = q_item.get("uid", "PYQ-XXXX")
    q_text = q_item.get("question_text", "")
    options = q_item.get("options", [])
    
    opts_str = "\n".join([f"Option {i+1}: {opt}" for i, opt in enumerate(options)])
    
    prompt = f"""Question ID: {uid}
Question Text:
{q_text}

Answer Choices:
{opts_str}

Perform classification, solve step-by-step, and output the structured JSON according to the schema.
"""
    try:
        response = client.models.generate_content(
            model=model_name,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=sys_prompt,
                response_mime_type="application/json",
                response_schema=EnrichedQuestionSchema,
                temperature=0.1,
            ),
        )
        data = json.loads(response.text)
        return data
    except Exception as e:
        print(f"    [!] Error enriching {uid}: {e}")
        return None

def main():
    parser = argparse.ArgumentParser(description="TSLPRB PYQ Enrichment Pipeline")
    parser.add_argument("--limit", type=int, default=10, help="Number of questions to process (default: 10 pilot)")
    parser.add_argument("--offset", type=int, default=0, help="Start offset in catalog")
    parser.add_argument("--model", type=str, default="gemini-2.5-flash", help="Gemini model name")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    taxonomy = load_taxonomy()
    
    with open(MASTER_CATALOG_PATH, "r", encoding="utf-8") as f:
        catalog = json.load(f)

    print(f"==================================================")
    print(f"  TSLPRB PYQ ENRICHMENT & SOLVER ENGINE           ")
    print(f"==================================================")
    print(f"Loaded Master Catalog : {len(catalog)} unique questions")
    print(f"Target Batch          : {args.limit} questions (Offset: {args.offset})")
    print(f"Model Target          : {args.model}")

    client = get_gemini_client()
    if not client:
        print("Aborting. Please provide API credentials to continue.")
        return

    sys_prompt = build_system_prompt(taxonomy)
    batch = catalog[args.offset : args.offset + args.limit]
    enriched_results = []

    print(f"\nProcessing batch of {len(batch)} questions...\n")
    start_time = time.time()

    for idx, q in enumerate(batch):
        uid = q.get("uid")
        print(f"  [{idx+1}/{len(batch)}] Processing {uid}...")
        result = enrich_single_question(client, args.model, sys_prompt, q)
        if result:
            # Attach occurrences from master
            result["occurrences"] = q.get("occurrences", [])
            enriched_results.append(result)
            print(f"      ✓ [{result['subject_id']}] {result['topic_name']} -> Ans: Option {result['correct_option_index']+1} (Conf: {result['confidence']:.2f})")
        time.sleep(0.2)  # courteous pacing

    elapsed = round(time.time() - start_time, 2)
    out_file = os.path.join(OUTPUT_DIR, f"enriched_batch_{args.offset}_{args.offset+len(enriched_results)}.json")
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(enriched_results, f, indent=2, ensure_ascii=False)

    print(f"\n==================================================")
    print(f"  BATCH ENRICHMENT COMPLETE ({elapsed}s)")
    print(f"==================================================")
    print(f"  Successfully Enriched : {len(enriched_results)}/{len(batch)} questions")
    print(f"  Saved Batch To        : {out_file}")
    print(f"==================================================\n")

if __name__ == "__main__":
    main()
