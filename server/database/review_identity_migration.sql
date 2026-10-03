-- Existing UUID installation: apply this before refreshing offline_sync_schema.sql.
-- Fresh installation: create the updated offline-sync tables first. No rows are deleted.
-- The legacy UUID values survive as text. Runtime content IDs are stable strings.
BEGIN;
ALTER TABLE public.user_review_logs DROP CONSTRAINT IF EXISTS user_review_logs_seed_fk;
ALTER TABLE public.user_review_card_seeds ALTER COLUMN card_id TYPE TEXT USING card_id::text;
ALTER TABLE public.user_review_logs ALTER COLUMN card_id TYPE TEXT USING card_id::text;
ALTER TABLE public.user_review_card_seeds ADD COLUMN IF NOT EXISTS metadata JSONB NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE public.user_review_logs ADD CONSTRAINT user_review_logs_seed_fk
  FOREIGN KEY (user_id, card_id) REFERENCES public.user_review_card_seeds(user_id, card_id) ON DELETE CASCADE;
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
    metadata,
    created_at
  )
  SELECT auth.uid(), seed.card_id, seed.initial_card, coalesce(seed.metadata, '{}'::jsonb), seed.created_at
  FROM jsonb_to_recordset(p_seeds) AS seed(
    card_id TEXT,
    initial_card JSONB,
    metadata JSONB,
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
    card_id TEXT,
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

COMMIT;
