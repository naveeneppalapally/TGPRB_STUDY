-- =============================================================================
-- TSLPRB StudyOS - personal notes & content improvement queue schema
--
-- Personal notes are LWW-merged documents (mutable, soft-deletable), following
-- the same pattern as user_bookmarks. Content improvement items are write-once
-- from the browser; status transitions happen admin-side via service role.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Personal notes. Documents, not events: one row per note, merged LWW by
-- client_updated_at with event-ID tie-breaker, mirroring user_bookmarks.
-- Soft delete keeps deletions syncable across devices.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_personal_notes (
  id UUID NOT NULL,                          -- generated on device
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  note_id TEXT NOT NULL,                     -- e.g. NOTE-GEO-DRAINAGE
  section_id TEXT NOT NULL,                  -- e.g. 'deep-dive'
  section_label TEXT NOT NULL,               -- snapshot, survives section renames
  anchor_text TEXT,                          -- quoted passage the note attaches to
  body TEXT NOT NULL CHECK (length(body) <= 10000),
  is_important BOOLEAN NOT NULL DEFAULT FALSE,
  is_doubt BOOLEAN NOT NULL DEFAULT FALSE,
  deleted BOOLEAN NOT NULL DEFAULT FALSE,
  client_updated_at TIMESTAMPTZ NOT NULL,
  last_event_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, id)
);

CREATE INDEX IF NOT EXISTS idx_user_personal_notes_location
  ON public.user_personal_notes(user_id, note_id, section_id);
CREATE INDEX IF NOT EXISTS idx_user_personal_notes_recent
  ON public.user_personal_notes(user_id, updated_at DESC);

-- ---------------------------------------------------------------------------
-- Content improvement queue. Write-once from the browser; status transitions
-- happen admin-side via service role. Submitter identity nullable so that
-- rows survive even if the account is deleted.
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.content_improvement_items (
  id UUID PRIMARY KEY,                       -- generated on device
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  note_id TEXT NOT NULL,                     -- e.g. NOTE-GEO-DRAINAGE
  section_id TEXT,                           -- e.g. 'deep-dive'
  section_label TEXT,                        -- human-readable snapshot
  item_type TEXT NOT NULL
    CHECK (item_type IN ('replace_image','add_image','fix_fact','add_table','add_topic','other')),
  reference_url TEXT,
  description TEXT NOT NULL CHECK (length(description) <= 4000),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','in_progress','done','skipped')),
  admin_notes TEXT,
  processed_at TIMESTAMPTZ,
  client_created_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_improvement_pending
  ON public.content_improvement_items(status, created_at);
CREATE INDEX IF NOT EXISTS idx_content_improvement_submitter
  ON public.content_improvement_items(user_id, created_at DESC);

-- ---------------------------------------------------------------------------
-- LWW merge trigger for personal notes. Newer client_updated_at wins;
-- UUID lexical order breaks ties. Mirrors enforce_user_bookmark_lww().
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.enforce_user_note_lww()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id <> OLD.user_id OR NEW.id <> OLD.id THEN
    RAISE EXCEPTION 'Note identity is immutable';
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

DROP TRIGGER IF EXISTS trigger_user_note_lww ON public.user_personal_notes;
CREATE TRIGGER trigger_user_note_lww
  BEFORE UPDATE ON public.user_personal_notes
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_user_note_lww();

-- ---------------------------------------------------------------------------
-- RLS. User ID is never accepted by the merge RPCs; they use auth.uid().
-- ---------------------------------------------------------------------------
ALTER TABLE public.user_personal_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_improvement_items ENABLE ROW LEVEL SECURITY;

-- Personal notes: users manage only their own notes
DROP POLICY IF EXISTS "Users manage own personal notes" ON public.user_personal_notes;
CREATE POLICY "Users manage own personal notes"
  ON public.user_personal_notes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Improvement items: users can INSERT their own and SELECT their own
DROP POLICY IF EXISTS "Users read own improvement items" ON public.content_improvement_items;
DROP POLICY IF EXISTS "Users insert own improvement items" ON public.content_improvement_items;
CREATE POLICY "Users read own improvement items"
  ON public.content_improvement_items FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Users insert own improvement items"
  ON public.content_improvement_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- LWW note merge RPC. Later timestamp wins; UUID lexical order breaks a tie.
-- Direct sibling of merge_user_bookmarks().
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.merge_user_notes(p_notes JSONB)
RETURNS SETOF public.user_personal_notes
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
      note.id,
      note.note_id,
      note.section_id,
      note.section_label,
      note.anchor_text,
      note.body,
      note.is_important,
      note.is_doubt,
      note.deleted,
      note.client_updated_at,
      note.event_id
    FROM jsonb_to_recordset(p_notes) AS note(
      id UUID,
      note_id TEXT,
      section_id TEXT,
      section_label TEXT,
      anchor_text TEXT,
      body TEXT,
      is_important BOOLEAN,
      is_doubt BOOLEAN,
      deleted BOOLEAN,
      client_updated_at TIMESTAMPTZ,
      event_id UUID
    )
    WHERE note.id IS NOT NULL
      AND note.note_id IS NOT NULL
      AND note.section_id IS NOT NULL
      AND note.body IS NOT NULL
      AND note.client_updated_at IS NOT NULL
      AND note.event_id IS NOT NULL
  ), incoming AS (
    SELECT DISTINCT ON (id)
      id,
      note_id,
      section_id,
      section_label,
      anchor_text,
      body,
      COALESCE(is_important, FALSE) AS is_important,
      COALESCE(is_doubt, FALSE) AS is_doubt,
      COALESCE(deleted, FALSE) AS deleted,
      client_updated_at,
      event_id
    FROM incoming_raw
    ORDER BY id, client_updated_at DESC, event_id DESC
  ), merged AS (
    INSERT INTO public.user_personal_notes AS target (
      id,
      user_id,
      note_id,
      section_id,
      section_label,
      anchor_text,
      body,
      is_important,
      is_doubt,
      deleted,
      client_updated_at,
      last_event_id,
      updated_at
    )
    SELECT
      incoming.id,
      auth.uid(),
      incoming.note_id,
      incoming.section_id,
      incoming.section_label,
      incoming.anchor_text,
      incoming.body,
      incoming.is_important,
      incoming.is_doubt,
      incoming.deleted,
      incoming.client_updated_at,
      incoming.event_id,
      NOW()
    FROM incoming
    ON CONFLICT (user_id, id) DO UPDATE
    SET
      note_id = EXCLUDED.note_id,
      section_id = EXCLUDED.section_id,
      section_label = EXCLUDED.section_label,
      anchor_text = EXCLUDED.anchor_text,
      body = EXCLUDED.body,
      is_important = EXCLUDED.is_important,
      is_doubt = EXCLUDED.is_doubt,
      deleted = EXCLUDED.deleted,
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

-- ---------------------------------------------------------------------------
-- Idempotent improvement item insert. ON CONFLICT DO NOTHING prevents
-- duplicates after client retries, matching the review-logs pattern.
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.insert_content_improvement_items(p_items JSONB)
RETURNS VOID
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  INSERT INTO public.content_improvement_items (
    id,
    user_id,
    note_id,
    section_id,
    section_label,
    item_type,
    reference_url,
    description,
    client_created_at
  )
  SELECT
    item.id,
    auth.uid(),
    item.note_id,
    item.section_id,
    item.section_label,
    item.item_type,
    item.reference_url,
    item.description,
    item.client_created_at
  FROM jsonb_to_recordset(p_items) AS item(
    id UUID,
    note_id TEXT,
    section_id TEXT,
    section_label TEXT,
    item_type TEXT,
    reference_url TEXT,
    description TEXT,
    client_created_at TIMESTAMPTZ
  )
  WHERE item.id IS NOT NULL
    AND item.note_id IS NOT NULL
    AND item.item_type IS NOT NULL
    AND item.description IS NOT NULL
    AND item.client_created_at IS NOT NULL
  ON CONFLICT (id) DO NOTHING;
END;
$$;

-- ---------------------------------------------------------------------------
-- Revoke default access, grant only to authenticated users.
-- ---------------------------------------------------------------------------
REVOKE ALL ON FUNCTION public.merge_user_notes(JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.insert_content_improvement_items(JSONB) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.merge_user_notes(JSONB) TO authenticated;
GRANT EXECUTE ON FUNCTION public.insert_content_improvement_items(JSONB) TO authenticated;
