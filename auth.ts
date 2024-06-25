import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";

import authConfig from "@/auth.config";
import { access } from "fs";

interface UserInfo {
    email: string;
    username: string;
    point: number;
    exp: number;
    iat: number;
}

const nextAuthOptions: NextAuthConfig = {
    // debug: true,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (trigger === "update") {
                return { ...token, ...session.user };
            }
            return { ...token, ...user };
        },
        async session({ session, token }: any) {
            const decodedUser = jwtDecode<UserInfo>(token.accessToken);
            (session.accessToken = token.accessToken),
                (session.refreshToken = token.refreshToken),
                (session.user = {
                    email: decodedUser.email,
                    name: decodedUser.username,
                    point: decodedUser.point,
                    expires: decodedUser.exp,
                });

            console.log(session);
            return { ...session };
        },
    },
};

const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth(nextAuthOptions);

export { GET, POST, signIn, signOut, auth };
export default nextAuthOptions;
