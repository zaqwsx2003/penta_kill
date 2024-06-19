import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";

import authConfig from "@/auth.config";

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
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

            console.log("token", token);
            return { ...token, ...user };
        },

        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            session.refreshToken = token.refreshToken;

            const accessToken = session.accessToken.startsWith("Bearer ")
                ? session.accessToken.split(" ")[1]
                : session.accessToken;

            const userInfo = jwtDecode<UserInfo>(accessToken);
            // session.expires = new Date(token.expires * 1000).toISOString();
            session.user = {
                email: userInfo.email,
                name: userInfo.username,
                point: userInfo.point,
            };
            console.log("session", session);
            return session;
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
