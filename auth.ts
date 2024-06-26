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
        async signIn({ user, account }: any) {
            console.log("asdadfafasf", user.id);
            console.log("asdadfafasf", account.access_token);
            if (account.provider === "google") {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/users/google`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                userId: user.id,
                                googleAccessToken: `Bearer ${account.access_token}`,
                            }),
                        },
                    );

                    if (response) {
                        account.accessToken = response.headers.get(
                            "authorization",
                        ) as string;
                        account.refreshToken = response.headers.get(
                            "refreshToken",
                        ) as string;

                        return account;
                    }
                } catch (error) {
                    throw new Error("Unexpected response format");
                }
            }

            return { ...user, ...account };
        },
        async jwt({ token, user, account, trigger, session }: any) {
            if (trigger === "update") {
                return {
                    ...token,
                    ...account,
                    ...session,
                    ...session.user,
                    ...session.token,
                };
            }

            return { ...token, ...user, ...account };
        },
        async session({ session, token, account }: any) {
            if (token.provider === "google") {
                console.log("goopoooooooooooooooooooooogle");
                const decodedUser = jwtDecode<UserInfo>(account.accessToken);
                session.accessToken = account.accessToken;
                session.refreshToken = account.refreshToken;
                session.user = {
                    email: token.email,
                    name: token.name,
                    point: decodedUser.point,
                    expires: decodedUser.exp,
                };
            } else if (token.provider === "credentials") {
                const decodedUser = jwtDecode<UserInfo>(token.accessToken);
                session.token = {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                };
                session.user = {
                    email: decodedUser.email,
                    name: decodedUser.username,
                    point: decodedUser.point,
                    expires: decodedUser.exp,
                };
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
