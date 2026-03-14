import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getDb } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = getDb();
        const user = db
          .prepare("SELECT * FROM users WHERE email = ?")
          .get(credentials.email) as Record<string, unknown> | undefined;

        if (!user) return null;

        const valid = bcrypt.compareSync(
          credentials.password,
          user.password_hash as string
        );
        if (!valid) return null;

        // Check email verification (admins and seeded users bypass)
        if ((user.email_verified as number) === 0 && (user.is_admin as number) === 0) {
          throw new Error("EMAIL_NOT_VERIFIED");
        }

        return {
          id: user.id as string,
          email: user.email as string,
          name: `${user.vorname} ${user.nachname}`,
          vorname: user.vorname as string,
          nachname: user.nachname as string,
          anbieterTyp: user.anbieter_typ as string,
          isAdmin: (user.is_admin as number) === 1,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.vorname = (user as unknown as Record<string, unknown>).vorname as string;
        token.nachname = (user as unknown as Record<string, unknown>).nachname as string;
        token.anbieterTyp = (user as unknown as Record<string, unknown>).anbieterTyp as string;
        token.isAdmin = (user as unknown as Record<string, unknown>).isAdmin as boolean;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as Record<string, unknown>).id = token.id;
        (session.user as Record<string, unknown>).vorname = token.vorname;
        (session.user as Record<string, unknown>).nachname = token.nachname;
        (session.user as Record<string, unknown>).anbieterTyp = token.anbieterTyp;
        (session.user as Record<string, unknown>).isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "gunmarket-dev-secret-change-in-production",
};
