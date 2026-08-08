# Scrapy settings for pib_scraper
BOT_NAME = "pib_scraper"
SPIDER_MODULES = ["pib_scraper.spiders"]
NEWSPIDER_MODULE = "pib_scraper.spiders"

# Google News RSS is a public API - no robots.txt needed
ROBOTSTXT_OBEY = False

# Polite crawl
DOWNLOAD_DELAY = 1
CONCURRENT_REQUESTS = 4
DOWNLOAD_TIMEOUT = 30

# Pipelines
ITEM_PIPELINES = {
    "pib_scraper.pipelines.GithubPipeline": 300,
}

# Logging
LOG_LEVEL = "INFO"

# Suppress deprecation warnings
SCRAPER_DEPRECATED_SYNC_ALLOWED = True
