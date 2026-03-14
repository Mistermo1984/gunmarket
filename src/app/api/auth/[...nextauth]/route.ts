import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { seedDatabase } from "@/lib/seed";
import { seedCrawledListings } from "@/lib/crawl-waffengebraucht";

// Auto-seed on first API call
seedDatabase();
seedCrawledListings();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
