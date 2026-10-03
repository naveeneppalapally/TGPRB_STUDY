-- Run only in an empty local test database. Never run against the live project.
CREATE ROLE authenticated;
CREATE SCHEMA auth;
CREATE TABLE auth.users (id uuid PRIMARY KEY);
CREATE FUNCTION auth.uid() RETURNS uuid LANGUAGE sql STABLE AS $$ SELECT nullif(current_setting('test.user_id', true), '')::uuid $$;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
INSERT INTO auth.users VALUES ('00000000-0000-0000-0000-000000000001'), ('00000000-0000-0000-0000-000000000002');
-- Simulate the existing UUID identity tables, including a pre-migration row.
CREATE TABLE user_review_card_seeds (user_id uuid REFERENCES auth.users(id), card_id uuid, initial_card jsonb NOT NULL, created_at timestamptz NOT NULL, PRIMARY KEY(user_id, card_id));
CREATE TABLE user_review_logs (id uuid PRIMARY KEY, user_id uuid REFERENCES auth.users(id), card_id uuid, rating smallint, state smallint, elapsed_days integer, review_time timestamptz, client_created_at timestamptz, CONSTRAINT user_review_logs_seed_fk FOREIGN KEY(user_id, card_id) REFERENCES user_review_card_seeds(user_id,card_id));
INSERT INTO user_review_card_seeds VALUES ('00000000-0000-0000-0000-000000000001','10000000-0000-0000-0000-000000000001','{}',now());
\ir ../../server/database/review_identity_migration.sql
\ir ../../server/database/offline_sync_schema.sql
\ir ../../server/database/ca_attempts_schema.sql
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
SET ROLE authenticated;
SELECT set_config('test.user_id','00000000-0000-0000-0000-000000000001',false);
SELECT insert_user_review_card_seeds('[{"card_id":"ca-mcq-CA-PIB-123-q0","initial_card":{},"metadata":{"eventDate":"2026-09-01"},"created_at":"2026-10-02T10:00:00Z"},{"card_id":"PYQ-0510","initial_card":{},"created_at":"2026-10-02T10:00:00Z"}]');
SELECT insert_user_review_logs('[{"id":"20000000-0000-0000-0000-000000000001","card_id":"ca-mcq-CA-PIB-123-q0","rating":1,"state":1,"elapsed_days":0,"review_time":"2026-10-02T10:00:00Z","client_created_at":"2026-10-02T10:00:00Z"}]');
-- Duplicate replay must remain one event.
SELECT insert_user_review_logs('[{"id":"20000000-0000-0000-0000-000000000001","card_id":"ca-mcq-CA-PIB-123-q0","rating":1,"state":1,"elapsed_days":0,"review_time":"2026-10-02T10:00:00Z","client_created_at":"2026-10-02T10:00:00Z"}]');
SELECT merge_user_ca_attempts('[{"content_id":"CA-PIB-123","attempts":{"score":0,"total":2,"lastAt":"2026-10-02T10:00:00Z","perQuestion":[{"selected":0,"correct":false,"at":"2026-10-02T10:00:00Z"},null]},"updated_at":"2026-10-02T10:00:00Z","event_id":"event-z"},{"content_id":"CA-PIB-123","attempts":{"score":2,"total":2,"lastAt":"2026-10-01T10:00:00Z","perQuestion":[{"selected":1,"correct":true,"at":"2026-10-01T10:00:00Z"},{"selected":1,"correct":true,"at":"2026-10-01T10:00:00Z"}]},"updated_at":"2026-10-01T10:00:00Z","event_id":"event-a"}]');
DO $$ BEGIN
 IF (SELECT count(*) FROM user_review_logs) <> 1 THEN RAISE EXCEPTION 'Duplicate replay'; END IF;
 IF (SELECT count(*) FROM user_review_card_seeds) <> 3 THEN RAISE EXCEPTION 'Identity migration lost rows'; END IF;
 IF (SELECT metadata->>'eventDate' FROM user_review_card_seeds WHERE card_id='ca-mcq-CA-PIB-123-q0') <> '2026-09-01' THEN RAISE EXCEPTION 'Metadata missing'; END IF;
 IF (SELECT attempts->>'score' FROM user_ca_attempts WHERE content_id='CA-PIB-123') <> '1' THEN RAISE EXCEPTION 'Per-question reconciliation lost concurrent answer'; END IF;
END $$;
SELECT set_config('test.user_id','00000000-0000-0000-0000-000000000002',false);
DO $$ BEGIN
 IF (SELECT count(*) FROM user_review_logs) <> 0 OR (SELECT count(*) FROM user_ca_attempts) <> 0 THEN RAISE EXCEPTION 'Cross-account RLS read'; END IF;
 BEGIN
  INSERT INTO user_review_card_seeds(user_id,card_id,initial_card,created_at) VALUES ('00000000-0000-0000-0000-000000000001','foreign','{}',now());
  RAISE EXCEPTION 'Cross-account insert succeeded';
 EXCEPTION WHEN insufficient_privilege THEN NULL;
 END;
END $$;
SELECT set_config('test.user_id','',false);
DO $$ BEGIN
 BEGIN
  PERFORM insert_user_review_card_seeds('[]');
  RAISE EXCEPTION 'Unauthenticated RPC succeeded';
 EXCEPTION WHEN raise_exception THEN IF SQLERRM <> 'Authentication required' THEN RAISE; END IF;
 END;
END $$;
RESET ROLE;
