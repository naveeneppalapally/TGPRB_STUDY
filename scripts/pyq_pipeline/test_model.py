#!/usr/bin/env python3
import os, json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field

env = {}
with open('.env') as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip().strip('"').strip("'")

client = genai.Client(api_key=env.get('GEMINI_API_KEY',''))

class TestSchema(BaseModel):
    subject_id: str
    topic_name: str
    correct_option_index: int = Field(ge=0, le=3)
    confidence: float
    explanation: str

with open('data/pyq_master_catalog.json') as f:
    catalog = json.load(f)

q = catalog[0]
print("Question:", q['question_text'][:80])
print("Options:", q['options'])

opts = "\n".join(f"Opt{i+1}: {o}" for i, o in enumerate(q['options']))
prompt = f"Question: {q['question_text']}\nOptions:\n{opts}\n\nClassify as GEO/POL/HIS/TEL/SCI/ECO/ARI/REA/ENG and solve."

try:
    r = client.models.generate_content(
        model='models/gemini-3.6-flash',
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            response_schema=TestSchema,
            temperature=0.1
        )
    )
    print('SUCCESS:', r.text)
except Exception as e:
    print('FAILED:', e)
