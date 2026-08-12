#!/usr/bin/env python3
"""Find the exact working model name for gemini-3.6-flash on Vertex AI."""
import os, json, tempfile, warnings
warnings.filterwarnings('ignore')

env = {}
with open('/home/naveen/Documents/TGPRB/.env') as f:
    for line in f:
        line = line.strip()
        if '=' in line and not line.startswith('#'):
            k, v = line.split('=', 1)
            env[k.strip()] = v.strip().strip('"').strip("'")

sa_json_str = env.get('GOOGLE_APPLICATION_CREDENTIALS_JSON', '')
project = env.get('GOOGLE_CLOUD_PROJECT', 'navtunes-core')

sa_data = json.loads(sa_json_str)
tmp = tempfile.NamedTemporaryFile(mode='w', suffix='.json', delete=False)
json.dump(sa_data, tmp); tmp.close()
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = tmp.name

from google import genai
from google.genai import types

client = genai.Client(vertexai=True, project=project, location='us-central1')

# Try all possible name formats for 3.6-flash as shown in dashboard
candidates = [
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-3.5-flash-001',
    'gemini-3.6-flash-001',
    'gemini-3.6-flash-002',
    'publishers/google/models/gemini-3.6-flash',
    'google/gemini-3.6-flash',
]

print(f"Project: {project}\n")
working = []
for m in candidates:
    try:
        r = client.models.generate_content(
            model=m,
            contents='Say: READY',
            config=types.GenerateContentConfig(temperature=0)
        )
        print(f"  ✓ WORKS: '{m}'  ->  {r.text.strip()[:30]}")
        working.append(m)
    except Exception as e:
        code = str(e)[:90]
        print(f"  ✗ '{m}': {code}")

print(f"\nBest available: {working[0] if working else 'None found'}")
os.unlink(tmp.name)
