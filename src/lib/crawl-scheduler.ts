import { runCrawl } from "./crawl-waffengebraucht";

const CRAWL_HOUR = 17; // 17:00 (5pm)
const CRAWL_MINUTE = 0;
const CHECK_INTERVAL = 60_000; // Check every minute

let lastCrawlDate = "";

/**
 * Simple scheduler that checks every minute if it's time to crawl.
 * Runs at 17:00 daily (Swiss time).
 */
export function startCrawlScheduler() {
  console.log(`[CrawlScheduler] Started — auto-crawl at ${CRAWL_HOUR}:${String(CRAWL_MINUTE).padStart(2, "0")} daily`);

  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const today = now.toISOString().slice(0, 10); // YYYY-MM-DD

    if (hour === CRAWL_HOUR && minute === CRAWL_MINUTE && lastCrawlDate !== today) {
      lastCrawlDate = today;
      console.log(`[CrawlScheduler] Triggering auto-crawl at ${now.toISOString()}`);
      runCrawl()
        .then((result) => {
          console.log(`[CrawlScheduler] Done — inserted ${result.inserted}, deleted ${result.deleted} in ${result.duration}ms`);
        })
        .catch((err) => {
          console.error(`[CrawlScheduler] Error:`, err);
        });
    }
  }, CHECK_INTERVAL);
}
