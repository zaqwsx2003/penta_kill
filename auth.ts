import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

interface User {
    id: string;
    email: string;
    name: string;
    token: string;
}

const authOptions: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
                        {
                            username: credentials.username,
                            password: credentials.password,
                        }
                    );

                    const user: User = response.data;
                    console.log("User:", user);

                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
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
        async jwt({ token, user, account, profile, isNewUser }: any) {
            if (user) {
                token.accessToken = (user as User).token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                ...session.user,
                accessToken: token.accessToken,
            };
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

// NextAuth 인스턴스를 생성하고 필요한 핸들러들을 내보냅니다.
const nextAuthInstance = NextAuth(authOptions);

export const { handlers, signIn, signOut, auth } = nextAuthInstance;
export default nextAuthInstance;
