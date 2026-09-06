import os
import sys
import json
from typing import List, Dict, Any
from pydantic import BaseModel, Field

sys.path.insert(0, os.path.abspath('.'))

from scripts.pyq_pipeline.run_pipeline import load_env, get_client
from google.genai import types

class GateQuestion(BaseModel):
    id: str = Field(description="Question ID e.g. GATE-TEL-MOV-1")
    question: str = Field(description="Comprehension gate question text")
    options: List[str] = Field(description="4 options", min_length=4, max_length=4)
    correct_answer: int = Field(description="Correct option index 0-3", ge=0, le=3)
    explanation: str = Field(description="1-2 sentence explanation")

# Canonical schema consumed by components/GateQuiz.vue and server/api/gate/[noteId].get.ts.
# note_id must match the NOTE-ID used in the note page's <GateQuiz note-id="..." /> tag.
class GateConfig(BaseModel):
    note_id: str
    pass_threshold: int = 3
    questions: List[GateQuestion]

class AtomicFlashcard(BaseModel):
    id: str = Field(description="Flashcard ID e.g. FC-TEL-MOV-1")
    front: str = Field(description="Front of flashcard / prompt")
    back: str = Field(description="Back of flashcard / concise factual answer")
    key_fact: str = Field(description="Core takeaway fact")
    tags: List[str] = Field(default=[])

class FlashcardDeck(BaseModel):
    topic_id: str
    cards: List[AtomicFlashcard]

def generate_gate_and_cards(note_id: str, topic_slug: str, subject_slug: str, title: str):
    """note_id must be the exact NOTE-ID used in the note page's <GateQuiz note-id="..." />
    tag (format NOTE-{SECTION}-{TOPIC}, per AGENTS.md). This is written verbatim into the
    gate JSON's note_id field so server/api/gate/[noteId].get.ts can resolve it."""
    env = load_env()
    client = get_client(env)

    # 1. Generate Gate
    gate_prompt = f"""
Create a 5-question Comprehension Gate Quiz for the exam topic: "{title}" (Topic ID: {note_id}).
The gate tests whether a student understood the note page before unlocking atomic flashcards into FSRS.

Rules:
- Questions must test high-yield exam facts (dates, committee names, acts, leaders, locations).
- NO EM-DASHES (—). Use hyphens (-) or colons (:).
- correct_answer index (0-3) must be the exact correct option.
"""

    print(f"Generating Gate Quiz for {note_id}...")
    resp_gate = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=gate_prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are an expert exam author for Telangana Police exams.",
            response_mime_type="application/json",
            response_schema=GateConfig,
            temperature=0.1,
        )
    )

    gate_data = json.loads(resp_gate.text)
    # Force the exact note_id and standard pass_threshold (3/5) regardless of model echo
    gate_data['note_id'] = note_id
    gate_data['pass_threshold'] = 3
    gate_dir = 'content/data/gates'
    os.makedirs(gate_dir, exist_ok=True)
    gate_file = os.path.join(gate_dir, f"{topic_slug}.json")
    with open(gate_file, 'w', encoding='utf-8') as f:
        json.dump(gate_data, f, indent=2, ensure_ascii=False)
    print(f"  ✓ Saved Gate Quiz to: {gate_file}")

    # 2. Generate Atomic Flashcards
    fc_prompt = f"""
Create 10 atomic flashcards for FSRS spaced repetition review for the topic: "{title}" (Topic ID: {note_id}).

Rules:
- Each card must be atomic (tests exactly ONE pinpoint fact).
- Front: Crisp prompt / question.
- Back: Concise 1-sentence answer.
- NO EM-DASHES (-).
"""

    print(f"Generating FSRS Atomic Flashcards for {note_id}...")
    resp_fc = client.models.generate_content(
        model='gemini-3.6-flash',
        contents=fc_prompt,
        config=types.GenerateContentConfig(
            system_instruction="You are an expert learning scientist creating atomic flashcards for FSRS.",
            response_mime_type="application/json",
            response_schema=FlashcardDeck,
            temperature=0.1,
        )
    )

    fc_data = json.loads(resp_fc.text)
    fc_data['note_id'] = note_id
    fc_dir = os.path.join('content/data/flashcards', subject_slug)
    os.makedirs(fc_dir, exist_ok=True)
    fc_file = os.path.join(fc_dir, f"{topic_slug}.json")
    with open(fc_file, 'w', encoding='utf-8') as f:
        json.dump(fc_data, f, indent=2, ensure_ascii=False)
    print(f"  ✓ Saved Flashcards to: {fc_file}")

if __name__ == '__main__':
    if len(sys.argv) >= 5:
        generate_gate_and_cards(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
    elif len(sys.argv) > 1:
        print("Usage: python3 scripts/note_pipeline/generate_gates_and_cards.py <note_id> <topic_slug> <subject_slug> <title>")
        sys.exit(1)
    else:
        generate_gate_and_cards('NOTE-TEL-MOVEMENT', 'telangana-statehood-movement', 'telangana', 'Telangana Armed Struggle & Statehood Movement')
