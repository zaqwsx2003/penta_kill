// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: DefaultUser;
        accessToken?: string;
        refreshToken?: string;
    }

    interface User {
        email: string;
        name: string;
        accessToken: string;
        refreshToken?: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
    }
}
