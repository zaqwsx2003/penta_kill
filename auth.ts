import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

import authConfig from "./auth.config";

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
                token.expires = Math.floor(Date.now() / 1000) + 3600;
            } else if (Date.now() < token.expires * 1000) {
                return token;
            } else {
                const now = dayjs();
                const expires = dayjs();
                if (!token.refreshToken) {
                    throw new Error("Missing refresh token");

                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_ENDPOINT}/users/refresh`,
                        {
                            method: "GET",
                            headers: {
                                "Refresh-Token": token.refreshToken,
                                "Content-Type": "application/json",
                            },
                        },
                    );
                }
            }

            return { ...token, ...user };
        },
        async session({ session, token, user }: any) {
            if (!token.accessToken) {
                console.error("Access token is undefined");
                throw new Error("Access token is undefined");
            }

            try {
                const accessToken = token.accessToken.startsWith("Bearer ")
                    ? token.accessToken.split(" ")[1]
                    : token.accessToken;

                const userInfo = jwtDecode<UserInfo>(accessToken);
                session.accessToken = accessToken;
                session.refreshToken = token.refreshToken;
                session.expires = new Date(userInfo.exp * 1000).toISOString();
                session.user = {
                    email: userInfo.email,
                    name: userInfo.username,
                    point: userInfo.point,
                };
                console.log(session);
            } catch (error) {
                console.error("Error decoding JWT:", error);
                throw new Error("Error decoding JWT");
            }
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
