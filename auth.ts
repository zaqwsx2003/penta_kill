import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import authConfig from "./auth.config";

interface UserInfo {
    userid: number;
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
                token.accessToken = user.token;
            }
            return { ...token, ...user };
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            const userInfo = jwtDecode<UserInfo>(token.accessToken.split(" ")[1]);
            console.log(userInfo);
            session.expires = userInfo.exp;
            session.user = {
                id: userInfo.userid.toString(),
                email: userInfo.email,
                name: userInfo.username,
                point: userInfo.point,
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
