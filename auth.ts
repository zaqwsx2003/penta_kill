import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import instance from "@/app/api/instance";
import { jwtDecode } from "jwt-decode";

interface UserInfo {
    userid: number;
    email: string;
    username: string;
    exp: number;
    iat: number;
}

interface User {
    // id: string;
    // email: string;
    // name: string;
    // userInfo: UserInfo;
    token: string;
}

const nextAuthOptions = {
    debug: true,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
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
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            const userInfo = jwtDecode<UserInfo>(token.accessToken.split(" ")[1]);
            session.user = {
                id: userInfo.userid.toString(),
                email: userInfo.email,
                name: userInfo.username,
            };
            console.log("Session:", session);
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
