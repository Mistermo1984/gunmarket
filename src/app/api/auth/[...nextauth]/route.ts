import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { initializeSchema } from "@/lib/db";

// Ensure DB schema on first API call
initializeSchema();

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
