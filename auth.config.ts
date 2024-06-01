import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import instance from "@/app/api/instance";
import { NextAuthConfig } from "next-auth";

interface User {
    // id: string;
    // email: string;
    // name: string;
    // userInfo: UserInfo;
    token: string;
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
                    const response = await instance.post("/users/login", {
                        email: credentials.email,
                        password: credentials.password,
                    });

                    if (response.data) {
                        const user: User = {
                            token: response.headers.authorization,
                        };

                        return user;
                    } else {
                        console.error("Unexpected response format:", response.data);
                        throw new Error("Unexpected response format");
                    }
                } catch (e: any) {
                    const errorMessage = e.response?.data?.message || "Login failed";
                    console.error("Error occurred:", errorMessage);
                    throw new Error(errorMessage + "&email=" + credentials.email);
                }
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
} satisfies NextAuthConfig;
