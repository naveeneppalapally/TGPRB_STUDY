#!/usr/bin/env python3
"""
run_pipeline.py  -  TSLPRB PYQ Autonomous Enrichment Pipeline

Fully autonomous loop-engineered runner:
  - Verifies credentials before starting
  - Processes all questions in configurable batch sizes
  - Self-validates each response (schema, confidence, taxonomy IDs)
  - Auto-retries failed or invalid questions (up to MAX_RETRIES)
  - Skips already-enriched questions (resumable)
  - Merges all batches into one master enriched file
  - Generates a summary quality report at the end
  - Prints live progress to terminal

Usage:
  python3 scripts/pyq_pipeline/run_pipeline.py               # Process all 3129 unique questions
  python3 scripts/pyq_pipeline/run_pipeline.py --limit 10    # Pilot run: first 10 questions
  python3 scripts/pyq_pipeline/run_pipeline.py --limit 100 --batch-size 20
"""

import os
import sys
import json
import time
import argparse
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ValidationError
from google import genai
from google.genai import types

# ── Paths ──────────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TAXONOMY_PATH        = os.path.join(BASE_DIR, "data", "taxonomy_v1.json")
MASTER_CATALOG_PATH  = os.path.join(BASE_DIR, "data", "pyq_master_catalog.json")
ENRICHED_DIR         = os.path.join(BASE_DIR, "data", "enriched_pyq")
MASTER_ENRICHED_PATH = os.path.join(BASE_DIR, "data", "pyq_enriched_master.json")
FAILED_LOG_PATH      = os.path.join(BASE_DIR, "data", "pyq_failed_questions.json")
REPORT_PATH          = os.path.join(BASE_DIR, "data", "pyq_enrichment_report.json")
ENV_PATH             = os.path.join(BASE_DIR, ".env")

# ── Config ─────────────────────────────────────────────────────────────────────
DEFAULT_MODEL    = "gemini-3.6-flash"
MAX_RETRIES      = 3
RETRY_DELAY      = 5.0    # seconds between retries
REQUEST_DELAY    = 2.0    # seconds between API calls (avoid rate limits on Vertex free tier)
CONFIDENCE_MIN   = 0.45   # below this → flag as low-confidence
DEFAULT_BATCH    = 50     # questions per batch


# ── Pydantic schema ────────────────────────────────────────────────────────────
class EnrichedQuestion(BaseModel):
    uid: str
    subject_id: str = Field(description="One of: GEO POL HIS TEL SCI ECO ARI REA ENG")
    subject_name: str
    topic_id: str
    topic_name: str
    sub_topic: str
    question_type: str = Field(
        description="One of: factual_recall calculation logic_reasoning "
                    "match_the_following assertion_reason reading_comprehension"
    )
    difficulty: str = Field(description="F M or O")
    correct_option_index: int = Field(ge=0, le=3)
    confidence: float = Field(ge=0.0, le=1.0)
    explanation: str
    recommended_memory_technique: str


# ── Helpers ────────────────────────────────────────────────────────────────────
def load_env() -> dict:
    env = {}
    if os.path.exists(ENV_PATH):
        with open(ENV_PATH) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def get_client(env: dict) -> Optional[genai.Client]:
    import tempfile, json as _json
    project = env.get("GOOGLE_CLOUD_PROJECT") or os.environ.get("GOOGLE_CLOUD_PROJECT", "navtunes-core")

    # Priority 1: Service Account JSON from .env (most reliable, no gcloud needed)
    sa_json_str = env.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
    if sa_json_str:
        try:
            sa_data = _json.loads(sa_json_str)
            tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
            _json.dump(sa_data, tmp)
            tmp.close()
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
            client = genai.Client(vertexai=True, project=project, location="global")
            print(f"  [Auth] Using Service Account: {sa_data.get('client_email','?')} (project={project}, location=global)")
            return client
        except Exception as e:
            print(f"  [WARN] Service account auth failed: {e}")

    # Priority 2: ADC (gcloud application-default login)
    try:
        client = genai.Client(vertexai=True, project=project, location="us-central1")
        print(f"  [Auth] Using Vertex AI ADC (project={project})")
        return client
    except Exception as e:
        print(f"  [WARN] Vertex AI ADC failed: {e}")

    # Priority 3: AI Studio API key fallback
    api_key = env.get("GEMINI_API_KEY") or os.environ.get("GEMINI_API_KEY", "")
    if api_key:
        print("  [Auth] Falling back to GEMINI_API_KEY")
        return genai.Client(api_key=api_key)

    return None


def build_taxonomy_index(taxonomy: dict) -> tuple[set, set]:
    """Return (valid_subject_ids, valid_topic_ids)"""
    subject_ids = set()
    topic_ids   = set()
    for s in taxonomy["subjects"]:
        subject_ids.add(s["subject_id"])
        for t in s["topics"]:
            topic_ids.add(t["topic_id"])
    return subject_ids, topic_ids


def build_system_prompt(taxonomy: dict) -> str:
    lines = []
    for s in taxonomy["subjects"]:
        for t in s["topics"]:
            subs = "; ".join(t["sub_topics"])
            lines.append(
                f"[{s['subject_id']}] {s['subject_name']} "
                f"-> [{t['topic_id']}] {t['topic_name']}: {subs}"
            )

    return (
        "You are the master curriculum classifier and expert solver for TSLPRB "
        "(Telangana Police Recruitment Board - Constable & SI exams). \n\n"
        "For each question you must:\n"
        "1. Classify STRICTLY into the taxonomy below.\n"
        "2. Solve step-by-step with full reasoning to find the correct answer.\n"
        "3. Return correct_option_index as 0-based (0=Option1, 1=Option2, 2=Option3, 3=Option4).\n"
        "4. Set confidence 0.0-1.0 reflecting your certainty. Use <0.6 if genuinely unsure.\n"
        "5. Write a 1-3 sentence explanation teaching the underlying fact/concept.\n"
        "6. Assign difficulty: F=Famous/Easy, M=Medium, O=Obscure/Hard.\n"
        "7. Assign recommended_memory_technique from: "
        "blank_map_retrieval, timeline_chunking, formula_error_log, diagram_redraw, "
        "contrast_pairs, hierarchical_chunking, spaced_retrieval, narrative_chain, "
        "representation_framework, keyword_method, deliberate_practice.\n\n"
        "APPROVED TAXONOMY:\n" + "\n".join(lines)
    )


def validate_response(data: dict, valid_sids: set, valid_tids: set) -> list[str]:
    """Return list of validation error strings, empty = OK."""
    errors = []
    if data.get("subject_id") not in valid_sids:
        errors.append(f"Invalid subject_id: {data.get('subject_id')}")
    if data.get("topic_id") not in valid_tids:
        errors.append(f"Invalid topic_id: {data.get('topic_id')}")
    if data.get("correct_option_index") not in [0, 1, 2, 3]:
        errors.append(f"Bad correct_option_index: {data.get('correct_option_index')}")
    if not data.get("explanation", "").strip():
        errors.append("Empty explanation")
    return errors


def enrich_question(
    client, model: str, sys_prompt: str,
    q_item: dict, valid_sids: set, valid_tids: set
) -> tuple[Optional[dict], str]:
    """
    Returns (enriched_dict, status)
    status = 'ok' | 'low_confidence' | 'failed'
    """
    uid     = q_item["uid"]
    q_text  = q_item.get("question_text", "")
    options = q_item.get("options", [])
    opts_str = "\n".join(f"Option {i+1}: {o}" for i, o in enumerate(options))

    prompt = (
        f"Question ID: {uid}\n"
        f"Question:\n{q_text}\n\n"
        f"Options:\n{opts_str}\n\n"
        "Classify, solve, and respond in JSON."
    )

    from concurrent.futures import ThreadPoolExecutor, TimeoutError as FuturesTimeout

    def _call_gemini():
        return client.models.generate_content(
            model=model,
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=sys_prompt,
                response_mime_type="application/json",
                response_schema=EnrichedQuestion,
                temperature=0.1,
            ),
        )

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            with ThreadPoolExecutor(max_workers=1) as executor:
                future = executor.submit(_call_gemini)
                response = future.result(timeout=25.0)

            raw = json.loads(response.text)
            raw["uid"] = uid  # ensure uid is present

            # Pydantic validation
            validated = EnrichedQuestion(**raw)
            d = validated.model_dump()

            # Taxonomy consistency check
            errors = validate_response(d, valid_sids, valid_tids)
            if errors:
                if attempt < MAX_RETRIES:
                    time.sleep(RETRY_DELAY)
                    continue
                return None, "failed"

            # Attach occurrence metadata
            d["occurrences"]  = q_item.get("occurrences", [])
            d["has_image"]    = q_item.get("has_image", False)
            d["question_text"] = q_text
            d["options"]      = options
            d["enriched_at"]  = datetime.utcnow().isoformat() + "Z"

            status = "low_confidence" if d["confidence"] < CONFIDENCE_MIN else "ok"
            return d, status

        except FuturesTimeout:
            print(f"\n  [TIMEOUT] Request timed out on {uid} (attempt {attempt}/{MAX_RETRIES}), retrying...")
            time.sleep(RETRY_DELAY)
        except (ValidationError, json.JSONDecodeError) as e:
            if attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY)
            else:
                return None, "failed"
        except Exception as e:
            err_str = str(e)
            if "quota" in err_str.lower() or "429" in err_str:
                print(f"\n  [RATE LIMIT] Sleeping 60s...")
                time.sleep(60)
            elif attempt < MAX_RETRIES:
                time.sleep(RETRY_DELAY * attempt)
            else:
                return None, "failed"

    return None, "failed"


def load_already_enriched() -> set[str]:
    """Return set of UIDs already enriched (resumability)."""
    if not os.path.exists(MASTER_ENRICHED_PATH):
        return set()
    try:
        with open(MASTER_ENRICHED_PATH) as f:
            data = json.load(f)
        return {q["uid"] for q in data}
    except Exception:
        return set()


def save_master(all_enriched: list):
    """Persist the full enriched master file."""
    with open(MASTER_ENRICHED_PATH, "w", encoding="utf-8") as f:
        json.dump(all_enriched, f, indent=2, ensure_ascii=False)


# ── Main ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="TSLPRB PYQ Autonomous Enrichment Pipeline")
    parser.add_argument("--limit",      type=int, default=0,
                        help="Max questions to process. 0 = all (default: all)")
    parser.add_argument("--batch-size", type=int, default=DEFAULT_BATCH,
                        help=f"Questions per save-checkpoint (default: {DEFAULT_BATCH})")
    parser.add_argument("--model",      type=str, default=DEFAULT_MODEL,
                        help=f"Gemini model name (default: {DEFAULT_MODEL}, e.g. models/gemini-3.6-flash)")
    parser.add_argument("--offset",     type=int, default=0,
                        help="Start offset in catalog (default: 0)")
    args = parser.parse_args()

    os.makedirs(ENRICHED_DIR, exist_ok=True)

    print("=" * 60)
    print("  TSLPRB PYQ AUTONOMOUS ENRICHMENT PIPELINE")
    print("=" * 60)

    # Load resources
    env = load_env()
    with open(TAXONOMY_PATH)       as f: taxonomy = json.load(f)
    with open(MASTER_CATALOG_PATH) as f: catalog  = json.load(f)

    valid_sids, valid_tids = build_taxonomy_index(taxonomy)
    sys_prompt = build_system_prompt(taxonomy)

    # Resume: skip already-done UIDs
    already_done = load_already_enriched()
    if already_done:
        print(f"\n  [RESUME] {len(already_done)} questions already enriched - skipping them.")

    # Slice catalog
    catalog_slice = catalog[args.offset:]
    if args.limit > 0:
        catalog_slice = catalog_slice[:args.limit]

    pending = [q for q in catalog_slice if q["uid"] not in already_done]
    total   = len(pending)

    print(f"\n  Model            : {args.model}")
    print(f"  Catalog size     : {len(catalog)} unique questions")
    print(f"  Already enriched : {len(already_done)}")
    print(f"  To process now   : {total}")
    print(f"  Batch checkpoint : every {args.batch_size} questions")

    if total == 0:
        print("\n  Nothing to do. All questions already enriched!")
        return

    # Verify credentials
    client = get_client(env)
    if not client:
        print("\n[ERROR] No Gemini API credentials found.")
        print("Add GEMINI_API_KEY to your .env file and retry.")
        sys.exit(1)
    print(f"\n  [Auth] Gemini client initialized OK.\n")

    # Load existing enriched data
    all_enriched: list = []
    if os.path.exists(MASTER_ENRICHED_PATH):
        with open(MASTER_ENRICHED_PATH) as f:
            all_enriched = json.load(f)

    # Stats
    stats = {
        "ok": 0, "low_confidence": 0, "failed": 0,
        "by_subject": {}, "by_type": {}, "by_difficulty": {}
    }
    failed_items = []

    start_time = time.time()
    print(f"{'Q':>6} | {'UID':<10} | {'Status':<15} | {'Subject':<5} | {'Topic':<30} | {'Ans':<3} | {'Conf'}")
    print("-" * 95)

    for idx, q_item in enumerate(pending, 1):
        uid = q_item["uid"]

        result, status = enrich_question(
            client, args.model, sys_prompt, q_item, valid_sids, valid_tids
        )

        if result:
            all_enriched.append(result)
            stats[status] += 1
            stats["by_subject"][result["subject_id"]] = stats["by_subject"].get(result["subject_id"], 0) + 1
            stats["by_type"][result["question_type"]] = stats["by_type"].get(result["question_type"], 0) + 1
            stats["by_difficulty"][result["difficulty"]] = stats["by_difficulty"].get(result["difficulty"], 0) + 1

            conf_flag = " ⚠" if status == "low_confidence" else ""
            print(
                f"{idx:>6}/{total} | {uid:<10} | {status:<15} | "
                f"{result['subject_id']:<5} | {result['topic_name']:<30} | "
                f"Opt{result['correct_option_index']+1:<2} | {result['confidence']:.2f}{conf_flag}"
            )
        else:
            stats["failed"] += 1
            failed_items.append({"uid": uid, "question_text": q_item.get("question_text", "")[:100]})
            print(f"{idx:>6}/{total} | {uid:<10} | {'FAILED':<15} | {'?':<5} | {'?':<30} | {'?':<3} | ?")

        # Checkpoint save every batch_size questions
        if idx % args.batch_size == 0:
            save_master(all_enriched)
            print(f"\n  ✓ Checkpoint saved at {idx}/{total} questions.\n")

        time.sleep(REQUEST_DELAY)

    # Final save
    save_master(all_enriched)

    # Save failed log
    if failed_items:
        with open(FAILED_LOG_PATH, "w", encoding="utf-8") as f:
            json.dump(failed_items, f, indent=2, ensure_ascii=False)

    # Quality report
    elapsed   = round(time.time() - start_time, 1)
    total_done = stats["ok"] + stats["low_confidence"]
    report = {
        "run_timestamp": datetime.utcnow().isoformat() + "Z",
        "model": args.model,
        "elapsed_seconds": elapsed,
        "total_processed": total,
        "successful": total_done,
        "low_confidence": stats["low_confidence"],
        "failed": stats["failed"],
        "success_rate_pct": round(total_done / total * 100, 1) if total else 0,
        "confidence_flag_rate_pct": round(stats["low_confidence"] / max(total_done, 1) * 100, 1),
        "subject_distribution": dict(sorted(stats["by_subject"].items(), key=lambda x: -x[1])),
        "question_type_distribution": dict(sorted(stats["by_type"].items(), key=lambda x: -x[1])),
        "difficulty_distribution": stats["by_difficulty"],
        "all_enriched_total": len(all_enriched),
        "failed_uids": [f["uid"] for f in failed_items],
    }
    with open(REPORT_PATH, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    # Final summary
    print("\n" + "=" * 60)
    print("  PIPELINE COMPLETE - QUALITY REPORT")
    print("=" * 60)
    print(f"  Elapsed Time        : {elapsed}s ({round(elapsed/60,1)} min)")
    print(f"  Total Processed     : {total}")
    print(f"  Successful (OK)     : {stats['ok']}")
    print(f"  Low Confidence ⚠    : {stats['low_confidence']}")
    print(f"  Failed (3x retry)   : {stats['failed']}")
    print(f"  Success Rate        : {report['success_rate_pct']}%")
    print(f"\n  Subject Distribution:")
    for sid, cnt in report["subject_distribution"].items():
        print(f"    {sid:<5}: {cnt}")
    print(f"\n  Difficulty Split:")
    for d, cnt in stats["by_difficulty"].items():
        print(f"    {d}: {cnt}")
    print(f"\n  Master File         : {MASTER_ENRICHED_PATH}")
    print(f"  Report File         : {REPORT_PATH}")
    if failed_items:
        print(f"  Failed Questions    : {FAILED_LOG_PATH}")
    print("=" * 60)


if __name__ == "__main__":
    main()
