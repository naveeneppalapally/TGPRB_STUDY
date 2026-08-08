"""
TGPRB Current Affairs Spider (Google News RSS)
──────────────────────────────────────────────────────────────────────────────
Uses Google News RSS to fetch exam-relevant current affairs from all Indian
news sources (PIB, The Hindu, Indian Express, NDTV, etc.) in one place.

One feed per TGPRB topic - each feed is a targeted search query.

Run locally:
    scrapy crawl tgprb_news

Deploy to Scrapy Cloud:
    shub deploy
    shub schedule pib_scraper/tgprb_news
"""

import scrapy
from datetime import datetime, timezone
import re


# ── Per-topic Google News RSS feeds ──────────────────────────────────────────
# Each feed is a targeted query returning news from ALL Indian sources
TOPIC_FEEDS = [
    {
        "url": "https://news.google.com/rss/search?q=India+river+dam+flood+irrigation+site:pib.gov.in+OR+site:thehindu.com+OR+site:ndtv.com&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Geography",
        "topic": "Drainage System of India",
        "related_topic_ids": ["NOTE-GEO-DRAINAGE"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+constitution+parliament+supreme+court+amendment+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Polity",
        "topic": "Indian Constitution",
        "related_topic_ids": ["NOTE-POL-CONSTITUTION"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+GDP+inflation+RBI+budget+economy+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Economy",
        "topic": "Indian Economy",
        "related_topic_ids": ["NOTE-ECO-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+environment+wildlife+forest+climate+disaster+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Geography",
        "topic": "Environment and Ecology",
        "related_topic_ids": ["NOTE-GEO-ENVIRONMENT"],
    },
    {
        "url": "https://news.google.com/rss/search?q=Telangana+government+scheme+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Telangana",
        "topic": "Telangana State",
        "related_topic_ids": ["NOTE-TEL-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+ISRO+space+missile+AI+technology+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "Science & Technology",
        "topic": "Science and Technology",
        "related_topic_ids": ["NOTE-SCI-GENERAL"],
    },
    {
        "url": "https://news.google.com/rss/search?q=India+history+heritage+archaeological+ASI+2026&hl=en-IN&gl=IN&ceid=IN:en",
        "exam_section": "History",
        "topic": "Indian History",
        "related_topic_ids": ["NOTE-HIS-GENERAL"],
    },
]

# Only include articles published within this many days
MAX_AGE_DAYS = 30


def format_date(pub_date: str) -> str:
    try:
        for fmt in [
            "%a, %d %b %Y %H:%M:%S %z",
            "%a, %d %b %Y %H:%M:%S GMT",
        ]:
            try:
                return datetime.strptime(pub_date.strip(), fmt).strftime("%Y-%m-%d")
            except ValueError:
                continue
    except Exception:
        pass
    return datetime.now().strftime("%Y-%m-%d")


def is_recent(pub_date: str) -> bool:
    """Return True if article is within MAX_AGE_DAYS."""
    try:
        for fmt in ["%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"]:
            try:
                dt = datetime.strptime(pub_date.strip(), fmt)
                if dt.tzinfo is None:
                    dt = dt.replace(tzinfo=timezone.utc)
                age = (datetime.now(timezone.utc) - dt).days
                return age <= MAX_AGE_DAYS
            except ValueError:
                continue
    except Exception:
        pass
    return True  # If we can't parse, include it


def clean_title(raw: str) -> str:
    """Strip HTML entities and source suffix from Google News titles."""
    # Remove source suffix like " - The Hindu"
    raw = re.sub(r"\s+-\s+[^-]+$", "", raw).strip()
    # Decode common HTML entities
    raw = raw.replace("&amp;", "&").replace("&quot;", '"').replace("&#39;", "'")
    return raw.replace('"', "'")


def make_id(topic_meta: dict, title: str, date: str) -> str:
    section = topic_meta["exam_section"].upper().replace(" & ", "").replace(" ", "")[:3]
    slug = title.upper()[:25]
    slug = re.sub(r"[^A-Z0-9]+", "-", slug).strip("-")
    return f"CA-{section}-{slug}-{date.replace('-', '')}"


class TgprbNewsSpider(scrapy.Spider):
    name = "tgprb_news"
    custom_settings = {
        "DOWNLOAD_DELAY": 1.5,
        "ROBOTSTXT_OBEY": False,  # Google News RSS is a public API
        "DEFAULT_REQUEST_HEADERS": {
            "User-Agent": "Mozilla/5.0 (compatible; TGPRBStudyBot/1.0)",
            "Accept": "application/rss+xml, application/xml, text/xml",
        },
    }

    def start_requests(self):
        for topic_meta in TOPIC_FEEDS:
            yield scrapy.Request(
                topic_meta["url"],
                callback=self.parse_feed,
                cb_kwargs={"topic_meta": topic_meta},
            )

    def parse_feed(self, response, topic_meta):
        items = response.xpath("//item")
        self.logger.info(
            f"[{topic_meta['topic']}] Feed returned {len(items)} items"
        )

        for item in items:
            pub_date = item.xpath("pubDate/text()").get("").strip()

            # Skip old articles
            if not is_recent(pub_date):
                continue

            raw_title = item.xpath("title/text()").get("").strip()
            title = clean_title(raw_title)
            if not title:
                continue

            link  = item.xpath("link/text()").get("").strip()
            guid  = item.xpath("guid/text()").get(link).strip()
            date  = format_date(pub_date)
            item_id = make_id(topic_meta, title, date)

            yield {
                "id": item_id,
                "type": "current_affair",
                "exam_section": topic_meta["exam_section"],
                "topic": topic_meta["topic"],
                "related_topic_ids": topic_meta["related_topic_ids"],
                "headline": title,
                "date": date,
                "source_url": link,
                "guid": guid,
            }
