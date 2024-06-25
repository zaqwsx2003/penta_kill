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
    debug: true,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({ token, user, account, trigger, session }: any) {
            if (trigger === "update") {
                return { ...token, ...session.user, ...account };
            }

            return { ...token, ...user, ...account };
        },
        async session({ session, token, account }: any) {
            console.log("account", account);
            console.log("token", token);

            if (token.provider === "google") {
                if (token) {
                    session.accessToken = token.access_token;
                    session.user = {
                        email: token.email,
                        name: token.name,
                        expires: token.expires_in,
                    };
                }
            }
            if (token.provider === "credentials") {
                if (token) {
                    session.accessToken = token.accessToken;
                    session.refreshToken = token.refreshToken;
                    const decodedUser = jwtDecode<UserInfo>(token.accessToken);
                    session.user = {
                        email: decodedUser.email,
                        name: decodedUser.username,
                        point: decodedUser.point,
                        expires: decodedUser.exp,
                    };
                }
            }
            console.log("session", session);
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
