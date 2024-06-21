// next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: DefaultUser;
        userSession: {
            email: string;
            name: string;
            point: number;
            expires: number;
        };
        accessToken?: string;
        refreshToken?: string;
    }

    interface User {
        accessToken: string;
        exp: string;
        iat: string;
        id: string;
        jti: string;
        refreshToken: string;
        sub: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        user: DefaultUser;
    }
}
