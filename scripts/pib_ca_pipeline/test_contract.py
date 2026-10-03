import unittest
import tempfile
import importlib.util
import copy
import re
from pathlib import Path
import yaml
from unittest.mock import patch
from unittest.mock import Mock
from datetime import date, datetime, timedelta
import csv
import json
import os
import sqlite3
from scripts.pib_ca_pipeline.card_contract import validate_extraction, validate_card, canonical_tags
from scripts.pib_ca_pipeline.sync_ca_topics import resolve_tags
from scripts.pib_ca_pipeline.ingestion_state import load_state, outcome, terminal
from scripts.pib_ca_pipeline import extract_ca_cards as manual
from scripts.pib_ca_pipeline import pib_scorer as scorer

spec = importlib.util.spec_from_file_location('daily', Path('workers/scrapy-pib/pib_scraper.py'))
daily = importlib.util.module_from_spec(spec)
spec.loader.exec_module(daily)

VALID = {'category':'environment','exam_section':'Geography','topic':'Rivers','difficulty':'M','is_telangana_focus':False,'headline':'A fact: with "quotes" and a newline\ncontinued','exam_fact':'A verified source fact','summary':'Background','mcqs':[{'question':'Which river?','options':['A','B','C','D'],'answer':1,'explanation':'Source states B.'}],'related_topic_ids':['NOTE-GEO-DRAINAGE'],'extra_topics':['NOTE-GEO-DRAINAGE']}

class ContractTests(unittest.TestCase):
    def test_daily_uses_configured_service_account_before_api_key(self):
        with patch.object(daily, '_gemini_client', None), patch.object(daily, 'GCP_PROJECT', 'test-project'), patch.object(daily, 'GCP_CREDS', '{"type":"service_account"}'), patch.object(daily, 'GEMINI_API_KEY', 'unused-key'), patch.dict(os.environ), patch('google.genai.Client') as client:
            daily.get_gemini_client()
            client.assert_called_once_with(vertexai=True, project='test-project', location='global')
            Path(os.environ['GOOGLE_APPLICATION_CREDENTIALS']).unlink()
        workflow = Path('.github/workflows/pib-daily.yml').read_text()
        self.assertNotIn('secrets.GOOGLE_APPLICATION_CREDENTIALS_JSON', workflow)
        self.assertNotIn('secrets.GOOGLE_CLOUD_PROJECT', workflow)
        self.assertIn('secrets.GEMINI_API_KEY', workflow)
        self.assertNotIn('secrets.GCP_SA_KEY', workflow)

    def test_daily_api_key_backend_and_backlog_start(self):
        self.assertEqual(daily.escape_yaml('Source' + chr(0x2014) + 'fact'), 'Source-fact')
        with patch.object(daily, '_gemini_client', None), patch.object(daily, 'GCP_PROJECT', ''), patch.object(daily, 'GCP_CREDS', ''), patch.object(daily, 'GEMINI_API_KEY', 'test-key'), patch('google.genai.Client') as client:
            daily.get_gemini_client()
            client.assert_called_once_with(vertexai=False, api_key='test-key')
        workflow = yaml.safe_load(Path('.github/workflows/pib-daily.yml').read_text())
        steps = workflow['jobs']['pib-daily-scrape']['steps']
        self.assertEqual(steps[0]['with']['ref'], 'main')
        self.assertIn('timeout --signal=INT', next(step['run'] for step in steps if step.get('name') == 'Run PIB Daily Scraper'))
        self.assertLess(next(i for i, step in enumerate(steps) if step.get('name') == 'Preserve ingestion recovery snapshot'), next(i for i, step in enumerate(steps) if step.get('name') == 'Persist cards, retags and retry ledger'))
        calculation = next(step['run'] for step in workflow['jobs']['pib-daily-scrape']['steps'] if step.get('name') == 'Calculate dates')
        code = calculation.split("<<'PYTHON'\n", 1)[1].rsplit('PYTHON', 1)[0]
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory); (root / 'data').mkdir()
            (root / 'data/ca_ingestion_state.json').write_text('{"last_completed_date":null,"backfill_from_date":"2026-09-26"}')
            output = root / 'output'
            previous = Path.cwd()
            try:
                os.chdir(root)
                with patch.dict(os.environ, {'INPUT_FROM':'', 'INPUT_TO':'2026-10-03', 'GITHUB_OUTPUT':str(output)}):
                    exec(code, {})
                self.assertIn('from_date=2026-09-26', output.read_text())
            finally:
                os.chdir(previous)

    def test_invalid_answers_never_repaired(self):
        for invalid in [-1,4,1.5,True,None]:
            card=copy.deepcopy(VALID);card['mcqs'][0]['answer']=invalid
            with self.assertRaises(ValueError):validate_extraction(card)
        card=copy.deepcopy(VALID);card['mcqs']*=3
        with self.assertRaises(ValueError):validate_extraction(card)
        card=copy.deepcopy(VALID);card['extra_topics']=['NOTE-FAKE-ID']
        with self.assertRaises(ValueError):validate_extraction(card)
        self.assertEqual(canonical_tags(['NOTE-POL-CONST-FRAME','UNKNOWN']),['NOTE-POL-HIST-ACTS'])

    def test_both_writers_yaml_and_defaults(self):
        with tempfile.TemporaryDirectory() as directory:
            with patch.object(manual,'OUTPUT_DIR',directory):
                file=manual.write_ca_markdown(copy.deepcopy(VALID),{'prid':123,'title':'A fact title','pub_date':'2027-01-02','ministry':'Jal Shakti','url':'https://www.pib.gov.in/PressReleasePage.aspx?PRID=123'})
                card=yaml.safe_load(Path(file).read_text().split('---',2)[1]);validate_card(card)
                self.assertEqual(card['headline'],VALID['headline'])
                self.assertEqual(card['date'],'2027-01-02')
            defaults=copy.deepcopy(daily.CATEGORY_NOTE_IDS)
            with patch.object(daily,'CONTENT_DIR',Path(directory)):
                file=daily.write_exam_card({'title':'Distinct official title: quoted "fact"','date_iso':'2027-01-02','url':'https://www.pib.gov.in/PressReleasePage.aspx?PRID=124'},copy.deepcopy(VALID),'Jal Shakti')
                card=yaml.safe_load(file.read_text().split('---',2)[1]);validate_card(card)
                self.assertEqual(card['event_date_basis'],'publication_proxy')
                self.assertIn('prid-124',file.name)
            self.assertEqual(defaults,daily.CATEGORY_NOTE_IDS)

    def test_terminal_resume_and_retry(self):
        with tempfile.TemporaryDirectory() as directory, patch('scripts.pib_ca_pipeline.ingestion_state.STATE_PATH',Path(directory)/'state.json'):
            state=load_state();outcome(state,123,'irrelevant');outcome(state,124,'retryable')
            state=load_state();self.assertTrue(terminal(state,123));self.assertFalse(terminal(state,124))

    def test_existing_source_skips_ai_before_spending_quota(self):
        release = {'title':'Existing release', 'url':'https://www.pib.gov.in/?PRID=123', 'date_iso':'2026-09-26'}
        with tempfile.TemporaryDirectory() as directory, patch('scripts.pib_ca_pipeline.ingestion_state.STATE_PATH', Path(directory)/'state.json'), patch.object(daily, 'get_gemini_client'), patch.object(daily, 'get_pib_releases_for_date', return_value=[release]), patch.object(daily, 'card_exists', return_value=True), patch.object(daily, 'fetch_pib_article_text') as fetch, patch.object(daily, 'extract_exam_fact') as extract, patch.object(daily.time, 'sleep'):
            stats = daily.scrape_date_range(date(2026,9,26), date(2026,9,26))
            fetch.assert_not_called(); extract.assert_not_called()
            self.assertEqual(stats['skipped'], 1)
            self.assertTrue(terminal(load_state(), 123))

    def test_minute_quota_is_retried_without_exhausting_free_tier(self):
        client = Mock()
        client.chats.create.return_value.send_message.side_effect = [RuntimeError("429 {'quotaId': 'GenerateRequestsPerMinutePerProjectPerModel-FreeTier', 'retryDelay': '1s'}"), Mock(text=json.dumps(VALID))]
        with patch.object(daily, '_exhausted_models', set()), patch.object(daily, 'get_candidate_models', return_value=['test-model']), patch.object(daily.time, 'sleep') as sleep:
            self.assertIsNotNone(daily.extract_exam_fact('Official source text', 'Title', client))
            self.assertNotIn('test-model', daily._exhausted_models)
            sleep.assert_called_once()

    def test_daily_quota_exhausts_model_without_retry_sleep(self):
        client = Mock()
        client.chats.create.return_value.send_message.side_effect = RuntimeError("429 {'quotaId': 'GenerateRequestsPerDayPerProjectPerModel-FreeTier'}")
        with patch.object(daily, '_exhausted_models', set()), patch.object(daily, 'get_candidate_models', return_value=['test-model']), patch.object(daily.time, 'sleep') as sleep:
            with self.assertRaises(RuntimeError):daily.extract_exam_fact('Official source text', 'Title', client)
            self.assertIn('test-model', daily._exhausted_models)
            sleep.assert_not_called()

    def test_keyword_reconciliation_preserves_source_and_curated_tags(self):
        fields = {'headline': 'Different news', 'source_topic_ids': ['NOTE-GEO-DRAINAGE'], 'curated_topic_ids': ['NOTE-POL-HIST-ACTS'], 'keyword_topic_ids': ['NOTE-GEO-FORESTS'], 'related_topic_ids': ['NOTE-GEO-DRAINAGE', 'NOTE-GEO-FORESTS']}
        result, derived = resolve_tags(fields, [('NOTE-GEO-FORESTS', re.compile(r'forest'))], {}, {'NOTE-GEO-DRAINAGE', 'NOTE-GEO-FORESTS', 'NOTE-POL-HIST-ACTS'})
        self.assertEqual(result, {'NOTE-GEO-DRAINAGE', 'NOTE-POL-HIST-ACTS'})
        self.assertEqual(derived, set())

    def test_writer_rejects_invalid_output_before_save(self):
        for field, value in [('difficulty', 'HARD'), ('exam_depth', 'unknown'), ('exam_section', 'General Knowledge')]:
            card = copy.deepcopy(VALID); card[field] = value
            with self.assertRaises(ValueError): validate_extraction(card)
        self.assertEqual(daily._category_to_section('sports'), 'General Studies')
        self.assertEqual(daily._category_to_section('defence'), 'General Studies')

    def test_archived_release_is_not_reextracted(self):
        with tempfile.TemporaryDirectory() as directory, patch.object(daily, 'CONTENT_DIR', Path(directory)):
            archive = next(Path('data/ca_duplicate_archive').glob('*.md'))
            url = re.search(r'PRID=\d+', archive.read_text()).group()
            self.assertTrue(daily.card_exists('', 'another title', 'https://www.pib.gov.in/?' + url))

    def test_exhausted_models_are_failure(self):
        with patch.object(daily,'_exhausted_models',set(daily.get_candidate_models())):
            with self.assertRaises(RuntimeError):daily.extract_exam_fact('Source article','Title',object())

    def test_archive_failure_does_not_fake_empty_day(self):
        with self.assertRaises(RuntimeError):daily.get_pib_releases_for_date(__import__('datetime').date(2027,1,1),max_retries=0)

    def test_scorer_recency_uses_relative_age_across_years(self):
        def article(published):
            return (123,'RBI banking scheme',published,'Ministry','Office','Reserve Bank banking policy and economic scheme. '*8,'https://www.pib.gov.in/?PRID=123',64,'2027-01-02')
        with patch.object(scorer,'REFERENCE_DATE',datetime(2027,1,2)):
            recent=scorer.score_article(article('2026-12-31'))
            older=scorer.score_article(article('2026-01-02'))
            self.assertFalse(recent['rejected'])
            self.assertGreater(recent['score'],older['score'])
        with patch.object(scorer,'REFERENCE_DATE',datetime(2026,1,2)):
            self.assertEqual(scorer.score_article(article('2025-12-31'))['score'],recent['score'])

    def test_raw_workflow_rollover_and_deduplicated_merge(self):
        workflow = yaml.safe_load(Path('.github/workflows/pib-raw-scrape.yml').read_text())
        plan = workflow['jobs']['plan']['steps'][0]['run'].split("<<'PYTHON'\n",1)[1].rsplit('\nPYTHON',1)[0]
        class FrozenDate(date):
            @classmethod
            def today(cls): return cls(2027,1,2)
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory)/'output'
            plan = plan.replace('from datetime import date, timedelta', 'from datetime import timedelta')
            plan = plan.replace('while current <= last:', "while current <= last:\n    assert len(chunks) < 15, 'Unbounded month planner'")
            with patch.dict(os.environ, {'REQUESTED_MONTH':'all','GITHUB_OUTPUT':str(output)}):
                exec(plan, {'date':FrozenDate})
            chunks = json.loads(output.read_text().split('=',1)[1])
            self.assertEqual(chunks[0]['from'], (FrozenDate.today()-timedelta(days=365)).isoformat())
            self.assertEqual(chunks[-1]['to'], '2027-01-02')
            for a,b in zip(chunks,chunks[1:]): self.assertEqual(date.fromisoformat(a['to'])+timedelta(days=1), date.fromisoformat(b['from']))
            step = next(step for step in workflow['jobs']['merge-all']['steps'] if step.get('name','').startswith('Merge all CSVs'))
            merge = step['run'].split("<< 'EOF'\n",1)[1].rsplit('\nEOF',1)[0]
            columns = ['prid','title','pub_date','ministry','office','full_text','url','word_count','scraped_at']
            chunk_dir = Path(directory)/'chunks'; chunk_dir.mkdir()
            for index, timestamp in enumerate(['2027-01-01T00:00:00Z','2027-01-02T00:00:00Z']):
                with (chunk_dir/f'{index}.csv').open('w') as file:
                    writer=csv.writer(file);writer.writerow(columns)
                    writer.writerow([123,f'Title {index}','2027-01-01','Ministry','Office','Fact','https://www.pib.gov.in/?PRID=123',1,timestamp])
            current=Path.cwd()
            try:
                os.chdir(directory)
                exec(merge, {})
                with sqlite3.connect('pib_master_2025_2026.db') as db:
                    self.assertEqual(db.execute('SELECT title FROM articles').fetchall(), [('Title 1',)])
                with open('pib_master_2025_2026.csv') as file: self.assertEqual(len(list(csv.reader(file))),2)
                (chunk_dir/'bad.csv').write_text('wrong,header\n')
                with self.assertRaises(ValueError): exec(merge, {})
            finally: os.chdir(current)

if __name__=='__main__':unittest.main()
