"""
TGPRB Current Affairs Cleanup
Reads all existing .md files, scores each headline via Gemini 3.6 Flash,
and deletes files that score below the threshold (irrelevant noise).
"""

import os, re, json, tempfile
from pathlib import Path

CONTENT_DIR  = Path("content/current-affairs")
GCP_PROJECT  = os.environ.get("GOOGLE_CLOUD_PROJECT", "")
GCP_CREDS    = os.environ.get("GOOGLE_APPLICATION_CREDENTIALS_JSON", "")
AI_SCORE_MIN = 6
BATCH_SIZE   = 40   # headlines per Gemini call

# ── Vertex AI ────────────────────────────────────────────────────────────────

def get_client():
    if not GCP_CREDS or not GCP_PROJECT:
        print("ERROR: GOOGLE_APPLICATION_CREDENTIALS_JSON and GOOGLE_CLOUD_PROJECT must be set")
        return None
    try:
        creds = json.loads(GCP_CREDS)
        tmp = tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False)
        json.dump(creds, tmp); tmp.flush()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = tmp.name
        import vertexai
        from vertexai.generative_models import GenerativeModel
        vertexai.init(project=GCP_PROJECT, location="us-central1")
        model = GenerativeModel("gemini-3.6-flash")
        print("Gemini 3.6 Flash ready\n")
        return model
    except Exception as e:
        print(f"Vertex AI error: {e}")
        return None

def score_batch(client, headlines: list[tuple[Path, str]]) -> dict[Path, int]:
    """Score a batch of (path, headline) pairs. Returns {path: score}."""
    text = "\n".join(f"{i+1}. {h}" for i, (_, h) in enumerate(headlines))
    prompt = f"""You are evaluating current affairs for TGPRB/TSPSC Police Constable & SI exam preparation (Telangana, India).

Score each headline 0-10 for exam relevance:
- 7-10: Relevant (India/Telangana government, policy, geography, science, appointments, sports awards)
- 4-6: Borderline (general India news, could be useful)
- 0-3: Irrelevant (other states' local news, foreign affairs unrelated to India, entertainment, opinions, coaching tips)

Examples of IRRELEVANT (score 0-3):
- Tamil Nadu budget / Karnataka court / Kerala rains (other state local news)
- Colombia president / Israel news / Pakistan statements (foreign, not India-specific)
- Film reviews / celebrity news / IPL match results
- "How Chennai's startup..." / "Inside Bengaluru's new..."

Examples of RELEVANT (score 7-10):
- Telangana scheme/budget/appointment/project
- India-wide policy (Supreme Court, Parliament, RBI, ISRO)
- National appointments (Governors, CJI, CEOs)
- Geography/environment facts (rivers, forests, national parks)

Headlines:
{text}

Reply ONLY with a JSON array of integers (one score per headline, in order):
[8, 2, 7, 1, ...]"""

    try:
        resp = client.generate_content(prompt)
        raw = resp.text.strip()
        if "```" in raw:
            raw = re.sub(r"^```(?:json)?|```$", "", raw, flags=re.MULTILINE).strip()
        scores = json.loads(raw)
        if isinstance(scores, list) and len(scores) == len(headlines):
            return {path: scores[i] for i, (path, _) in enumerate(headlines)}
    except Exception as e:
        print(f"  Scoring error: {e}")
    return {path: 7 for path, _ in headlines}  # keep on error

# ── Main ─────────────────────────────────────────────────────────────────────

def extract_headline(path: Path) -> str:
    """Extract headline: field from frontmatter."""
    text = path.read_text(encoding="utf-8")
    m = re.search(r'^headline:\s*"(.+)"', text, re.MULTILINE)
    return m.group(1) if m else path.stem

def main():
    client = get_client()
    if not client:
        return

    all_files = sorted(CONTENT_DIR.glob("*.md"))
    print(f"Total files to review: {len(all_files)}\n")

    # Build (path, headline) list
    pairs = [(p, extract_headline(p)) for p in all_files]

    # Score in batches
    scores: dict[Path, int] = {}
    for i in range(0, len(pairs), BATCH_SIZE):
        batch = pairs[i:i + BATCH_SIZE]
        print(f"Scoring batch {i//BATCH_SIZE + 1}/{-(-len(pairs)//BATCH_SIZE)} ({len(batch)} headlines)...")
        scores.update(score_batch(client, batch))

    # Separate keep vs delete
    to_delete = [(p, scores[p]) for p in all_files if scores.get(p, 7) < AI_SCORE_MIN]
    to_keep   = [(p, scores[p]) for p in all_files if scores.get(p, 7) >= AI_SCORE_MIN]

    print(f"\n--- Results ---")
    print(f"Keep:   {len(to_keep)}")
    print(f"Delete: {len(to_delete)}\n")

    print("DELETING:")
    for path, score in sorted(to_delete, key=lambda x: x[1]):
        headline = extract_headline(path)
        print(f"  [{score}] {headline[:70]}")
        path.unlink()

    print(f"\nDone. {len(to_delete)} files removed, {len(to_keep)} kept.")

if __name__ == "__main__":
    main()
