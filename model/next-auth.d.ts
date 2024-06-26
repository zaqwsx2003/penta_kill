// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: DefaultUser;
        token: {
            accessToken?: string;
            refreshToken?: string;
        };
        accessToken?: string;
        refreshToken?: string;
    }

    interface User {
        accessToken: string;
        exp?: string;
        iat?: string;
        id: string;
        jti?: string;
        refreshToken: string;
        sub?: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        user: DefaultUser;
    }
}
