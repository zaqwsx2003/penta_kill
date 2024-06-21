import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";

interface User {
    accessToken: string;
    refreshToken: string;
}

export default {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_URL}/users/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                email: credentials.email,
                                password: credentials.password,
                            }),
                        },
                    );

                    if (response) {
                        const user: User = {
                            accessToken: response.headers.get(
                                "authorization",
                            ) as string,
                            refreshToken: response.headers.get(
                                "refreshToken",
                            ) as string,
                        };

                        return user;
                    } else {
                        console.error("Unexpected response format:", response);
                        throw new Error("Unexpected response format");
                    }
                } catch (e: any) {
                    const errorMessage =
                        e.response?.data?.message || "Login failed";
                    console.error("Error occurred:", errorMessage);
                    throw new Error(
                        errorMessage + "&email=" + credentials.email,
                    );
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
} satisfies NextAuthConfig;
