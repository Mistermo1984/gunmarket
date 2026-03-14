import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      vorname: string;
      nachname: string;
      anbieterTyp: string;
      isAdmin: boolean;
    };
  }

  interface User {
    id: string;
    vorname: string;
    nachname: string;
    anbieterTyp: string;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    vorname: string;
    nachname: string;
    anbieterTyp: string;
    isAdmin: boolean;
  }
}
