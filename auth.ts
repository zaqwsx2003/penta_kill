import NextAuth, { NextAuthConfig } from "next-auth";
import { jwtDecode } from "jwt-decode";
import authConfig from "./auth.config";

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
        async jwt({ token, user }: any) {
            if (user) {
                token.accessToken = user.token;
            }
            return { ...token, ...user };
        },
        async session({ session, token }: any) {
            if (!token.accessToken) {
                console.error("Access token is undefined");
                throw new Error("Access token is undefined");
            }

            try {
                const accessToken = token.accessToken.startsWith("Bearer ")
                    ? token.accessToken.split(" ")[1]
                    : token.accessToken;

                const userInfo = jwtDecode<UserInfo>(accessToken);
                console.log(userInfo);
                session.accessToken = accessToken;
                session.expires = new Date(userInfo.exp * 1000).toISOString();
                session.user = {
                    email: userInfo.email,
                    name: userInfo.username,
                    point: userInfo.point,
                };
            } catch (error) {
                console.error("Error decoding JWT:", error);
                throw new Error("Error decoding JWT");
            }
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
