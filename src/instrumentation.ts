export async function register() {
  // Only run scheduler on the server (not during build or edge)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startCrawlScheduler } = await import("@/lib/crawl-scheduler");
    startCrawlScheduler();
  }
}
