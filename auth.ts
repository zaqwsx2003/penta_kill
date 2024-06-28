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
                                googleAccessToken: account.access_token,
                            }),
                        },
                    );

                    if (response) {
                        user.accessToken = response.headers.get(
                            "Authorization",
                        ) as string;
                        user.refreshToken = response.headers.get(
                            "RefreshToken",
                        ) as string;

                        return { ...user };
                    }
                } catch (error) {
                    throw new Error("Unexpected response format");
                }
            }

            return { ...user };
        },
        async jwt({ token, user, account, trigger, session }: any) {
            if (user) {
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }

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
        // token에서는 Bearer를 제거하고 accessToken을 저장
        async session({ session, user, token }: any) {
            if (token.provider === "google") {
                const accessToken = token.accessToken.startsWith("Bearer ")
                    ? token.accessToken.split(" ")[1]
                    : token.accessToken;

                const decodedUser = jwtDecode<UserInfo>(accessToken);
                session.token = {
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                };
                session.user = {
                    email: token.email,
                    name: token.name,
                    point: decodedUser.point,
                    expires: decodedUser.exp,
                };
            } else if (token.provider === "credentials") {
                const accessToken = token.accessToken.startsWith("Bearer ")
                    ? token.accessToken.split(" ")[1]
                    : token.accessToken;
                const decodedUser = jwtDecode<UserInfo>(accessToken);
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
