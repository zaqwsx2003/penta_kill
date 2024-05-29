import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios, { AxiosError } from "axios";
import instance from "./app/api/instance";

interface User {
    id: string;
    email: string;
    name: string;
    token: string;
}

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth,
} = NextAuth({
    debug: true,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                try {
                    const response = await instance.post(
                        "/users/login",
                        {
                            email: credentials.email,
                            password: credentials.password,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const token = response.headers.authorization;
                    console.log(token);
                    if (response.data && response.data.token) {
                        const user: User = {
                            id: response.data.id,
                            email: response.data.email,
                            name: response.data.name,
                            token: token,
                        };
                        return user;
                    } else {
                        console.error("Unexpected response format:", response.data);
                    }
                } catch (e: any) {
                    const errorMessage = e.response?.data?.message || "Login failed";
                    console.error("Error occurred:", errorMessage); // 에러 로그
                    throw new Error(errorMessage + "&email=" + credentials.email);
                }
                return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.data.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
});
