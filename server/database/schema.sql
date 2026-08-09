-- =============================================================================
-- TSLPRB StudyOS — Supabase Database Schema
-- Run this in the Supabase SQL Editor to set up all tables.
-- Auth is handled by Supabase Auth (built-in) — we just reference auth.users.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- FSRS review cards — one per (user, content_item) pair
-- This is where spaced repetition state lives.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS review_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,          -- matches ContentItem.id, e.g. "PYQ-2018-M-092"
  content_type TEXT NOT NULL CHECK (content_type IN ('pyq', 'atomic_flashcard')),

  -- FSRS scheduling state (mirrors ts-fsrs Card fields)
  difficulty REAL NOT NULL DEFAULT 0,
  stability REAL NOT NULL DEFAULT 0,
  retrievability REAL NOT NULL DEFAULT 1,
  state INTEGER NOT NULL DEFAULT 0,  -- ts-fsrs State: 0=New, 1=Learning, 2=Review, 3=Relearning
  due TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_review TIMESTAMPTZ,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  elapsed_days INTEGER NOT NULL DEFAULT 0,
  scheduled_days INTEGER NOT NULL DEFAULT 0,

  -- Content metadata for fast filtering
  exam_section TEXT NOT NULL,        -- "Geography", "Polity", etc.
  topic TEXT NOT NULL,               -- "Drainage System of India"

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One card per content item per user
  UNIQUE(user_id, content_id)
);

-- Index for the daily review queue: "what's due for this user?"
CREATE INDEX IF NOT EXISTS idx_review_cards_due
  ON review_cards(user_id, due);

-- Index for section-level stats
CREATE INDEX IF NOT EXISTS idx_review_cards_section
  ON review_cards(user_id, exam_section);

-- Index for topic-level lookups
CREATE INDEX IF NOT EXISTS idx_review_cards_topic
  ON review_cards(user_id, topic);

-- ---------------------------------------------------------------------------
-- Comprehension gate results
-- Graded ONCE per note per user. Never enters the FSRS queue.
-- Passing unlocks the note's atomic flashcards.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS gate_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id TEXT NOT NULL,             -- e.g. "NOTE-GEO-DRAINAGE"
  score INTEGER NOT NULL,            -- how many they got right
  total INTEGER NOT NULL,            -- how many questions in the gate
  passed BOOLEAN NOT NULL,           -- score >= threshold
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One attempt per note per user (it's a one-shot gate)
  UNIQUE(user_id, note_id)
);

-- ---------------------------------------------------------------------------
-- Review log — every single review event, for analytics and history
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS review_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID NOT NULL REFERENCES review_cards(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 4), -- 1=Again, 2=Hard, 3=Good, 4=Easy
  review_duration_ms INTEGER,        -- how long the user took to answer
  reviewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for review history queries
CREATE INDEX IF NOT EXISTS idx_review_log_user_time
  ON review_log(user_id, reviewed_at DESC);

-- ---------------------------------------------------------------------------
-- Row Level Security — lock everything down to the owning user
-- ---------------------------------------------------------------------------

ALTER TABLE review_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE gate_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_log ENABLE ROW LEVEL SECURITY;

-- review_cards: users can only see/modify their own cards
CREATE POLICY "Users manage own review cards"
  ON review_cards FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- gate_results: users can only see/submit their own gate results
CREATE POLICY "Users manage own gate results"
  ON gate_results FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- review_log: users can only see/insert their own review logs
CREATE POLICY "Users manage own review logs"
  ON review_log FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Auto-update updated_at on review_cards
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_review_cards_updated_at
  BEFORE UPDATE ON review_cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- Topic visits — tracks when each user last marked a topic's CA as "caught up"
-- Used by useTopicVisits.ts for cross-device "new since last visit" sync.
-- Layer 1: localStorage (instant, offline)
-- Layer 2: This table (cloud backup, synced when logged in)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS topic_visits (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id      TEXT NOT NULL,          -- e.g. "NOTE-GEO-FORESTS"
  last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- One row per user per topic
  UNIQUE(user_id, note_id)
);

-- Index for fast per-user lookups
CREATE INDEX IF NOT EXISTS idx_topic_visits_user
  ON topic_visits(user_id, note_id);

-- RLS: each user only sees and writes their own rows
ALTER TABLE topic_visits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own topic visits"
  ON topic_visits FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update updated_at on topic_visits
CREATE TRIGGER trigger_topic_visits_updated_at
  BEFORE UPDATE ON topic_visits
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
