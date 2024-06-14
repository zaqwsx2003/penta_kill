import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import instance from "@/app/api/instance";
import { NextAuthConfig } from "next-auth";
import cookie from "cookie";
import axios from "axios";

interface User {
    // id: string;
    // email: string;
    // name: string;
    // userInfo: UserInfo;
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
                        `${process.env.NEXT_PUBLIC_ENDPOINT}/users/login`,
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

                    console.log("response", response);

                    if (response) {
                        const user: User = {
                            accessToken: response.headers.get(
                                "Authorization",
                            ) as string,
                            refreshToken: response.headers.get(
                                "Refresh-Token",
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
