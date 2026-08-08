"""
GitHub Pipeline
──────────────────────────────────────────────────────────────────────────────
Takes items from the PIB spider and creates .md files in the GitHub repo
via the GitHub Contents API.

Required env vars:
    GITHUB_TOKEN   - Fine-grained PAT with Contents: Read & Write
    GITHUB_REPO    - e.g. naveeneppalapally/TGPRB_STUDY
    GITHUB_BRANCH  - e.g. main
"""

import os
import base64
import logging
import hashlib
import requests
from scrapy.exceptions import DropItem


logger = logging.getLogger(__name__)


class GithubPipeline:
    def open_spider(self, spider):
        self.token  = os.environ.get("GITHUB_TOKEN", "")
        self.repo   = os.environ.get("GITHUB_REPO", "naveeneppalapally/TGPRB_STUDY")
        self.branch = os.environ.get("GITHUB_BRANCH", "main")
        self.seen   = set()

        if not self.token:
            logger.warning("GITHUB_TOKEN not set - files will NOT be pushed to GitHub")

        self.added   = 0
        self.skipped = 0

    def close_spider(self, spider):
        logger.info(f"Pipeline done: {self.added} added, {self.skipped} skipped/duplicate")

    def process_item(self, item, spider):
        item_id = item.get("id", "")

        # In-memory dedup for this run
        guid = item.get("guid", item_id)
        if guid in self.seen:
            self.skipped += 1
            raise DropItem(f"Duplicate: {guid}")
        self.seen.add(guid)

        if not self.token:
            logger.info(f"[DRY RUN] Would create: {item_id}")
            return item

        # Build markdown content
        related = "\n".join(f'  - "{t}"' for t in item["related_topic_ids"])
        content = f"""---
id: "{item_id}"
type: "current_affair"
exam_section: "{item['exam_section']}"
topic: "{item['topic']}"
related_topic_ids:
{related}
headline: "{item['headline']}"
date: "{item['date']}"
source_url: "{item['source_url']}"
---
"""

        slug = item_id.lower().replace("_", "-")
        path = f"content/current-affairs/{slug}.md"
        encoded = base64.b64encode(content.encode("utf-8")).decode("ascii")

        url = f"https://api.github.com/repos/{self.repo}/contents/{path}"
        headers = {
            "Authorization": f"Bearer {self.token}",
            "Content-Type": "application/json",
            "User-Agent": "TGPRB-Scrapy/1.0",
        }

        # Check if file already exists (to avoid duplicate commits)
        check = requests.get(url, headers=headers)
        if check.status_code == 200:
            self.skipped += 1
            logger.info(f"Already exists: {path}")
            return item

        # Create the file
        payload = {
            "message": f"ca: auto-add {item_id} [skip ci]",
            "content": encoded,
            "branch": self.branch,
        }

        resp = requests.put(url, json=payload, headers=headers)
        if resp.status_code in (200, 201):
            self.added += 1
            logger.info(f"Created: {path}")
        else:
            logger.error(f"Failed ({resp.status_code}): {path} - {resp.text[:200]}")

        return item
