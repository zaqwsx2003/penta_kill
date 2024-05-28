// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: DefaultUser & {
            accessToken?: string;
        };
    }

    interface User {
        id: string;
        email: string;
        name: string;
        token: string;
    }

    interface JWT {
        accessToken?: string;
    }
}
