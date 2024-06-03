import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import authConfig from "./auth.config";
import Cookies from "js-cookie";

interface UserInfo {
    userid: number;
    email: string;
    username: string;
    exp: number;
    iat: number;
}

const nextAuthOptions: NextAuthConfig = {
    // debug: true,
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/register",
    },
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            Cookies.set("Access_Token", session.accessToken, { sameSite: "strict" });
            const userInfo = jwtDecode<UserInfo>(token.accessToken.split(" ")[1]);
            session.user = {
                id: userInfo.userid.toString(),
                email: userInfo.email,
                name: userInfo.username,
            };
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
