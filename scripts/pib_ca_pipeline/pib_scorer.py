import sqlite3
import re
import os
import json
from datetime import datetime

DB_PATH = 'workers/scrapy-pib/pib_master_2025_2026.db'

# ---------------------------------------------------------------------------
# HARD REJECT PATTERNS (Title-level deterministic filtering)
# ---------------------------------------------------------------------------
HARD_REJECT_PATTERNS = [
    r'\bnotice\s+inviting\s+tender\b',
    r'\binviting\s+tenders?\b',
    r'\binvites?\s+bids?\b',
    r'\bbid\s+submission\b',
    r'\be-auction\b',
    r'\bauction\s+notice\b',
    r'\brequest\s+for\s+proposal\b',
    r'\bexpression\s+of\s+interest\b',
    r'\bgreetings\s+on\s+the\s+occasion\b',
    r'\bgreetings\s+to\s+the\s+people\b',
    r'\bcondolences\s+on\s+the\s+passing\s+of\b', # routine condolences without entity match
]

# ---------------------------------------------------------------------------
# CATEGORY SIGNAL KEYWORDS & WEIGHTS (Derived from 154 verified CA PYQs)
# ---------------------------------------------------------------------------
CATEGORY_SIGNALS = {
    'appointments': {
        'weight': 0.143,
        'keywords': ['appointed', 'assumes charge', 'sworn in', 'governor', 'chief justice', 'director general', 'solicitor general', 'attorney general', 'chairman', 'secretary', 'dgp', 'ceo', 'commissioner', 'president of']
    },
    'international': {
        'weight': 0.143,
        'keywords': ['summit', 'brics', 'g7', 'g20', 'sco', 'cop-28', 'cop-29', 'bilateral', 'mou', 'foreign minister', 'prime minister visits', 'united nations', 'world bank', 'imf', 'treaty', 'joint statement']
    },
    'economy': {
        'weight': 0.117,
        'keywords': ['rbi', 'repo rate', 'gdp', 'inflation', 'index', 'ranking', 'competitiveness', 'mospi', 'fiscal deficit', 'gst', 'budget', 'merger', 'start-up', 'export', 'forex']
    },
    'awards': {
        'weight': 0.104,
        'keywords': ['padma vibhushan', 'padma bhushan', 'padma shri', 'jnanpith', 'pulitzer', 'bharat ratna', 'khel ratna', 'arjuna award', 'sahitya akademi', 'nobel', 'gallantry award', 'conferred with']
    },
    'sports': {
        'weight': 0.097,
        'keywords': ['championship', 'gold medal', 'silver medal', 'bronze medal', 'olympics', 'world cup', 'grand slam', 'wimbledon', 'australian open', 'asiad', 'national games', 'boxing', 'athletics', 'federation']
    },
    'telangana': {
        'weight': 0.091,
        'keywords': ['telangana', 'hyderabad', 'warangal', 'karimnagar', 'nizamabad', 'nalgonda', 'khammam', 'buddhavanam', 't-hub', 'dhruva', 'tgsrtc', 'tgprb', 'dgp telangana', 'telangana budget']
    },
    'schemes': {
        'weight': 0.084,
        'keywords': ['pm-jay', 'pm-kisan', 'yojana', 'launched', 'scheme', 'portal', 'beneficiaries', 'smart cities', 'nilp', 'mission', 'flagship program']
    },
    'defence': {
        'weight': 0.104,
        'keywords': ['isro', 'sslv', 'gsat', 'drdo', 'brahmos', 'iaf', 'indian navy', 'indian army', 'exercise', 'aero india', 'missile', 'satellite', 'frigate', 'sub-submarine']
    },
    'judiciary': {
        'weight': 0.045,
        'keywords': ['supreme court', 'high court', 'constitutional bench', 'judgment', 'verdict', 'njac', 'law commission', 'obc commission']
    },
    'science': {
        'weight': 0.039,
        'keywords': ['indian science congress', 'dst', 'csir', 'supercomputer', 'quantum', 'biotechnology', 'space policy']
    },
    'books': {
        'weight': 0.032,
        'keywords': ['book titled', 'authored by', 'released the book', 'literary award', 'novel']
    },
    'environment': {
        'weight': 0.026,
        'keywords': ['cyclone', 'forest survey', 'fsi', 'ramsar', 'unesco', 'national park', 'wildlife sanctuary', 'tiger reserve', 'species']
    }
}

# High-Yield Ministries
TIER1_MINISTRIES = [
    "Prime Minister's Office",
    "Ministry of Defence",
    "Ministry of External Affairs",
    "Ministry of Finance",
    "Ministry of Home Affairs",
    "Ministry of Personnel, Public Grievances and Pensions",
    "President's Secretariat",
    "Ministry of Science and Technology",
    "Department of Space",
    "Ministry of Youth Affairs and Sports",
    "Ministry of Culture",
    "Ministry of Statistics and Programme Implementation",
    "Election Commission"
]

def is_hard_rejected(title: str) -> bool:
    t_lower = title.lower()
    for pat in HARD_REJECT_PATTERNS:
        if re.search(pat, t_lower):
            return True
    return False

def score_article(article: tuple) -> dict:
    prid, title, pub_date, ministry, office, full_text, url, word_count, scraped_at = article
    
    # 1. Hard reject filter
    if is_hard_rejected(title):
        return {'prid': prid, 'score': 0.0, 'rejected': True, 'reason': 'hard_reject_title'}

    if not full_text or len(full_text.strip()) < 80:
        return {'prid': prid, 'score': 0.0, 'rejected': True, 'reason': 'text_too_short'}

    text_combined = (title + " " + (ministry or "") + " " + full_text).lower()
    
    # 2. Category matching
    matched_categories = []
    category_score = 0.0
    
    for cat_name, info in CATEGORY_SIGNALS.items():
        hits = 0
        for kw in info['keywords']:
            if kw in text_combined:
                hits += 1
        if hits > 0:
            matched_categories.append((cat_name, hits, info['weight']))
            category_score += info['weight'] * (1.0 + 0.2 * min(hits, 5))

    if not matched_categories:
        return {'prid': prid, 'score': 0.0, 'rejected': True, 'reason': 'no_category_match'}

    primary_category = max(matched_categories, key=lambda x: x[1] * x[2])[0]

    # 3. Ministry boost
    ministry_boost = 1.3 if ministry in TIER1_MINISTRIES else 1.0

    # 4. Telangana boost (CRITICAL 2x multiplier)
    tg_keywords = ['telangana', 'hyderabad', 'warangal', 'karimnagar', 'nizamabad', 'nalgonda', 'khammam', 'tgsrtc', 'tgprb']
    is_tg_focus = any(kw in text_combined for kw in tg_keywords)
    tg_multiplier = 2.0 if is_tg_focus else 1.0

    # 5. Entity density (Numbers, Dates, Named Titles)
    num_count = len(re.findall(r'\b\d+[\d,]*\b', full_text))
    caps_count = len(re.findall(r'\b[A-Z][a-z]+\b', full_text))
    density_score = min(1.5, 0.5 + (num_count * 0.02) + (caps_count * 0.005))

    # 6. Recency weighting
    recency_multiplier = 1.0
    try:
        dt = datetime.strptime(pub_date, '%Y-%m-%d')
        if dt.year == 2026:
            recency_multiplier = 1.2
        elif dt.year == 2025 and dt.month >= 7:
            recency_multiplier = 1.0
        else:
            recency_multiplier = 0.8
    except Exception:
        pass

    final_score = category_score * ministry_boost * tg_multiplier * density_score * recency_multiplier

    return {
        'prid': prid,
        'title': title,
        'pub_date': pub_date,
        'ministry': ministry,
        'url': url,
        'score': round(final_score, 3),
        'primary_category': primary_category,
        'is_telangana_focus': is_tg_focus,
        'rejected': False
    }

def run_scoring_audit():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('SELECT prid, title, pub_date, ministry, office, full_text, url, word_count, scraped_at FROM articles')
    rows = c.fetchall()
    conn.close()

    total = len(rows)
    scored = []
    rejected_cnt = 0

    for row in rows:
        res = score_article(row)
        if res['rejected']:
            rejected_cnt += 1
        else:
            scored.append(res)

    scored.sort(key=lambda x: x['score'], reverse=True)

    print(f"============================================================")
    print(f"  PIB ML SCORING ENGINE AUDIT (Total: {total:,} Articles)")
    print(f"============================================================")
    print(f"  Hard Rejected / Low Signal : {rejected_cnt:,} ({rejected_cnt/total*100:.1f}%)")
    print(f"  High-Yield Candidates      : {len(scored):,} ({len(scored)/total*100:.1f}%)")
    
    tg_candidates = [s for s in scored if s['is_telangana_focus']]
    print(f"  Telangana State Focus      : {len(tg_candidates):,} articles")

    print("\n--- TOP 10 HIGHEST SCORED ARTICLES ---")
    for i, s in enumerate(scored[:10], 1):
        tg_flag = " [TG FOCUS]" if s['is_telangana_focus'] else ""
        print(f"  {i:>2}. [{s['score']:>6.2f}] {s['primary_category'].upper():<14} | {s['pub_date']} | {s['title'][:65]}...{tg_flag}")

    # Write scored manifest
    with open('data/pib_scored_manifest.json', 'w') as f:
        json.dump(scored, f, indent=2)

    print(f"\nSaved scored manifest with {len(scored):,} items to data/pib_scored_manifest.json")

if __name__ == '__main__':
    run_scoring_audit()
