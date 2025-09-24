// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** default fields */
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** custom fields we add via callbacks */
      provider?: string | null;
      providerAccountId?: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    provider?: string | null;
    providerAccountId?: string | null;
  }
}

