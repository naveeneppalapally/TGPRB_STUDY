-- =============================================================================
-- TSLPRB StudyOS - offline mutation sync schema
--
-- This migration stores idempotent append-only FSRS review events and compact
-- LWW/CRDT topic and bookmark state. It contains no service-worker, cache, or
-- content-storage concerns.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Immutable seed required to replay a complete FSRS review history.
-- Each card has one seed: the Card object before its first review.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_review_card_seeds (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID NOT NULL,
  initial_card JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (user_id, card_id)
);

-- ---------------------------------------------------------------------------
-- Append-only, idempotent review events. ID is generated on the device and is
-- the idempotency key, so retrying a batch cannot duplicate a review.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_review_logs (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 4),
  state SMALLINT NOT NULL CHECK (state BETWEEN 0 AND 3),
  elapsed_days INTEGER NOT NULL CHECK (elapsed_days >= 0),
  review_time TIMESTAMPTZ NOT NULL,
  client_created_at TIMESTAMPTZ NOT NULL,
  server_received_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT user_review_logs_seed_fk
    FOREIGN KEY (user_id, card_id)
    REFERENCES public.user_review_card_seeds(user_id, card_id)
    ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_user_review_logs_replay
  ON public.user_review_logs(user_id, card_id, review_time, client_created_at, id);

CREATE INDEX IF NOT EXISTS idx_user_review_logs_user_time
  ON public.user_review_logs(user_id, review_time DESC);

-- ---------------------------------------------------------------------------
-- Topic CRDT. gate_passed is monotonic. last_seen_at merges by timestamp max.
-- One row holds both note-gate and current-affairs visit state for a topic.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_topic_states (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  gate_passed BOOLEAN NOT NULL DEFAULT FALSE,
  last_seen_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_user_topic_states_user
  ON public.user_topic_states(user_id, topic_id);

-- Carry existing current-affairs watermarks forward when the original schema
-- has already been applied. The dynamic check keeps this migration usable on a
-- fresh database where topic_visits does not exist.
DO $$
BEGIN
  IF to_regclass('public.topic_visits') IS NOT NULL THEN
    EXECUTE '
      INSERT INTO public.user_topic_states (user_id, topic_id, gate_passed, last_seen_at, updated_at)
      SELECT user_id, note_id, FALSE, last_seen_at, updated_at
      FROM public.topic_visits
      ON CONFLICT (user_id, topic_id) DO UPDATE
      SET last_seen_at = GREATEST(
        public.user_topic_states.last_seen_at,
        EXCLUDED.last_seen_at
      ),
      updated_at = GREATEST(
        public.user_topic_states.updated_at,
        EXCLUDED.updated_at
      )';
  END IF;
END;
$$;

-- ---------------------------------------------------------------------------
-- Bookmarks are last-write-wins. The event ID is a deterministic tie-breaker
-- when two devices submit the same client timestamp.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_bookmarks (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,
  bookmarked BOOLEAN NOT NULL,
  client_updated_at TIMESTAMPTZ NOT NULL,
  last_event_id UUID NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user
  ON public.user_bookmarks(user_id, content_id);

-- Table-level guards keep the same merge semantics even if an authenticated
-- client writes directly instead of going through an RPC.
CREATE OR REPLACE FUNCTION public.enforce_user_topic_state_merge()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id <> OLD.user_id OR NEW.topic_id <> OLD.topic_id THEN
    RAISE EXCEPTION 'Topic state identity is immutable';
  END IF;

  NEW.gate_passed := OLD.gate_passed OR NEW.gate_passed;
  NEW.last_seen_at := CASE
    WHEN OLD.last_seen_at IS NULL THEN NEW.last_seen_at
    WHEN NEW.last_seen_at IS NULL THEN OLD.last_seen_at
    ELSE GREATEST(OLD.last_seen_at, NEW.last_seen_at)
  END;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_user_topic_state_merge ON public.user_topic_states;
CREATE TRIGGER trigger_user_topic_state_merge
  BEFORE UPDATE ON public.user_topic_states
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_user_topic_state_merge();

CREATE OR REPLACE FUNCTION public.enforce_user_bookmark_lww()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id <> OLD.user_id OR NEW.content_id <> OLD.content_id THEN
    RAISE EXCEPTION 'Bookmark identity is immutable';
  END IF;

  IF NEW.client_updated_at < OLD.client_updated_at
    OR (
      NEW.client_updated_at = OLD.client_updated_at
      AND NEW.last_event_id <= OLD.last_event_id
    ) THEN
    RETURN OLD;
  END IF;

  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_user_bookmark_lww ON public.user_bookmarks;
CREATE TRIGGER trigger_user_bookmark_lww
  BEFORE UPDATE ON public.user_bookmarks
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_user_bookmark_lww();

-- ---------------------------------------------------------------------------
-- RLS. User ID is never accepted by the state-merge RPCs; they use auth.uid().
-- ---------------------------------------------------------------------------
ALTER TABLE public.user_review_card_seeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_review_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_topic_states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_bookmarks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own offline review card seeds" ON public.user_review_card_seeds;
DROP POLICY IF EXISTS "Users insert own offline review card seeds" ON public.user_review_card_seeds;
CREATE POLICY "Users read own offline review card seeds"
  ON public.user_review_card_seeds FOR SELECT
  USING (auth.uid() = user_id)
;
CREATE POLICY "Users insert own offline review card seeds"
  ON public.user_review_card_seeds FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users read own offline review logs" ON public.user_review_logs;
DROP POLICY IF EXISTS "Users insert own offline review logs" ON public.user_review_logs;
CREATE POLICY "Users read own offline review logs"
  ON public.user_review_logs FOR SELECT
  USING (auth.uid() = user_id)
;
CREATE POLICY "Users insert own offline review logs"
  ON public.user_review_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own offline topic states" ON public.user_topic_states;
CREATE POLICY "Users manage own offline topic states"
  ON public.user_topic_states FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own offline bookmarks" ON public.user_bookmarks;
CREATE POLICY "Users manage own offline bookmarks"
  ON public.user_bookmarks FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Append-only review RPCs. `ON CONFLICT DO NOTHING` acknowledges an already
-- accepted event without granting the browser an UPDATE policy for its log or
-- immutable seed.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.insert_user_review_card_seeds(p_seeds JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  INSERT INTO public.user_review_card_seeds (
    user_id,
    card_id,
    initial_card,
    created_at
  )
  SELECT auth.uid(), seed.card_id, seed.initial_card, seed.created_at
  FROM jsonb_to_recordset(p_seeds) AS seed(
    card_id UUID,
    initial_card JSONB,
    created_at TIMESTAMPTZ
  )
  WHERE seed.card_id IS NOT NULL
    AND seed.initial_card IS NOT NULL
    AND seed.created_at IS NOT NULL
  ON CONFLICT (user_id, card_id) DO NOTHING;
END;
$$;

CREATE OR REPLACE FUNCTION public.insert_user_review_logs(p_logs JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  INSERT INTO public.user_review_logs (
    id,
    user_id,
    card_id,
    rating,
    state,
    elapsed_days,
    review_time,
    client_created_at
  )
  SELECT
    log.id,
    auth.uid(),
    log.card_id,
    log.rating,
    log.state,
    log.elapsed_days,
    log.review_time,
    log.client_created_at
  FROM jsonb_to_recordset(p_logs) AS log(
    id UUID,
    card_id UUID,
    rating SMALLINT,
    state SMALLINT,
    elapsed_days INTEGER,
    review_time TIMESTAMPTZ,
    client_created_at TIMESTAMPTZ
  )
  WHERE log.id IS NOT NULL
    AND log.card_id IS NOT NULL
    AND log.rating BETWEEN 1 AND 4
    AND log.state BETWEEN 0 AND 3
    AND log.elapsed_days >= 0
    AND log.review_time IS NOT NULL
    AND log.client_created_at IS NOT NULL
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- ---------------------------------------------------------------------------
-- CRDT merge RPC: passed is logical OR and last_seen_at is max(local, cloud).
-- SECURITY INVOKER preserves table RLS and auth.uid() determines the owner.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.merge_user_topic_states(p_states JSONB)
RETURNS SETOF public.user_topic_states
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  RETURN QUERY
  WITH incoming AS (
    SELECT
      state.topic_id,
      BOOL_OR(COALESCE(state.gate_passed, FALSE)) AS gate_passed,
      MAX(state.last_seen_at) AS last_seen_at
    FROM jsonb_to_recordset(p_states) AS state(
      topic_id TEXT,
      gate_passed BOOLEAN,
      last_seen_at TIMESTAMPTZ
    )
    WHERE state.topic_id IS NOT NULL AND state.topic_id <> ''
    GROUP BY state.topic_id
  ), merged AS (
    INSERT INTO public.user_topic_states AS target (
      user_id,
      topic_id,
      gate_passed,
      last_seen_at,
      updated_at
    )
    SELECT auth.uid(), incoming.topic_id, incoming.gate_passed, incoming.last_seen_at, NOW()
    FROM incoming
    ON CONFLICT (user_id, topic_id) DO UPDATE
    SET
      gate_passed = target.gate_passed OR EXCLUDED.gate_passed,
      last_seen_at = CASE
        WHEN target.last_seen_at IS NULL THEN EXCLUDED.last_seen_at
        WHEN EXCLUDED.last_seen_at IS NULL THEN target.last_seen_at
        ELSE GREATEST(target.last_seen_at, EXCLUDED.last_seen_at)
      END,
      updated_at = NOW()
    RETURNING target.*
  )
  SELECT * FROM merged;
END;
$$;

-- ---------------------------------------------------------------------------
-- LWW bookmark RPC. Later timestamp wins; UUID lexical order breaks a tie.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.merge_user_bookmarks(p_bookmarks JSONB)
RETURNS SETOF public.user_bookmarks
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  RETURN QUERY
  WITH incoming_raw AS (
    SELECT
      bookmark.content_id,
      bookmark.bookmarked,
      bookmark.client_updated_at,
      bookmark.event_id
    FROM jsonb_to_recordset(p_bookmarks) AS bookmark(
      content_id TEXT,
      bookmarked BOOLEAN,
      client_updated_at TIMESTAMPTZ,
      event_id UUID
    )
    WHERE bookmark.content_id IS NOT NULL
      AND bookmark.content_id <> ''
      AND bookmark.client_updated_at IS NOT NULL
      AND bookmark.event_id IS NOT NULL
  ), incoming AS (
    SELECT DISTINCT ON (content_id)
      content_id,
      bookmarked,
      client_updated_at,
      event_id
    FROM incoming_raw
    ORDER BY content_id, client_updated_at DESC, event_id DESC
  ), merged AS (
    INSERT INTO public.user_bookmarks AS target (
      user_id,
      content_id,
      bookmarked,
      client_updated_at,
      last_event_id,
      updated_at
    )
    SELECT auth.uid(), content_id, bookmarked, client_updated_at, event_id, NOW()
    FROM incoming
    ON CONFLICT (user_id, content_id) DO UPDATE
    SET
      bookmarked = EXCLUDED.bookmarked,
      client_updated_at = EXCLUDED.client_updated_at,
      last_event_id = EXCLUDED.last_event_id,
      updated_at = NOW()
    WHERE EXCLUDED.client_updated_at > target.client_updated_at
      OR (
        EXCLUDED.client_updated_at = target.client_updated_at
        AND EXCLUDED.last_event_id > target.last_event_id
      )
    RETURNING target.*
  )
  SELECT * FROM merged;
END;
$$;

REVOKE ALL ON FUNCTION public.merge_user_topic_states(JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.merge_user_bookmarks(JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.insert_user_review_card_seeds(JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.insert_user_review_logs(JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.merge_user_topic_states(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.merge_user_bookmarks(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_user_review_card_seeds(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_user_review_logs(JSONB) TO authenticated;
