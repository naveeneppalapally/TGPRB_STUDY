-- Idempotent latest-attempt snapshots. Personal data belongs only to auth.uid().
CREATE TABLE IF NOT EXISTS public.user_ca_attempts (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_id text NOT NULL,
  attempts jsonb NOT NULL,
  updated_at timestamptz NOT NULL,
  last_event_id text NOT NULL,
  PRIMARY KEY (user_id, content_id)
);
ALTER TABLE public.user_ca_attempts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS own_ca_attempts ON public.user_ca_attempts;
CREATE POLICY own_ca_attempts ON public.user_ca_attempts FOR SELECT TO authenticated USING (user_id = auth.uid());
-- Merge per question, preserving array positions and resolving equal timestamps deterministically.
CREATE OR REPLACE FUNCTION public.merge_ca_attempt_state(a jsonb, b jsonb)
RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$
  WITH candidates AS (
    SELECT value, ordinality AS pos FROM jsonb_array_elements(a->'perQuestion') WITH ORDINALITY
    UNION ALL
    SELECT value, ordinality AS pos FROM jsonb_array_elements(b->'perQuestion') WITH ORDINALITY
  ), latest AS (
    SELECT DISTINCT ON (pos) pos, value FROM candidates WHERE value <> 'null'::jsonb
    ORDER BY pos, (value->>'at')::timestamptz DESC, (value->>'correct')::boolean DESC, (value->>'selected')::int DESC
  ), slots AS (
    SELECT pos, value FROM generate_series(1, greatest((a->>'total')::int, (b->>'total')::int)) pos LEFT JOIN latest USING (pos)
  )
  SELECT jsonb_build_object('total', greatest((a->>'total')::int, (b->>'total')::int),
    'lastAt', CASE WHEN (a->>'lastAt')::timestamptz >= (b->>'lastAt')::timestamptz THEN a->>'lastAt' ELSE b->>'lastAt' END,
    'score', count(*) FILTER (WHERE (value->>'correct')::boolean),
    'perQuestion', jsonb_agg(coalesce(value, 'null'::jsonb) ORDER BY pos)) FROM slots;
$$;
CREATE OR REPLACE FUNCTION public.merge_user_ca_attempts(p_attempts jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE item jsonb;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  FOR item IN SELECT value FROM jsonb_array_elements(p_attempts) LOOP
    INSERT INTO user_ca_attempts(user_id, content_id, attempts, updated_at, last_event_id)
    VALUES (auth.uid(), item->>'content_id', item->'attempts', (item->>'updated_at')::timestamptz, item->>'event_id')
    ON CONFLICT (user_id, content_id) DO UPDATE SET attempts = merge_ca_attempt_state(user_ca_attempts.attempts, excluded.attempts),
      updated_at = greatest(excluded.updated_at, user_ca_attempts.updated_at),
      last_event_id = CASE WHEN (excluded.updated_at, excluded.last_event_id) > (user_ca_attempts.updated_at, user_ca_attempts.last_event_id) THEN excluded.last_event_id ELSE user_ca_attempts.last_event_id END;
  END LOOP;
END;
$$;
REVOKE ALL ON FUNCTION public.merge_user_ca_attempts(jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.merge_user_ca_attempts(jsonb) TO authenticated;
