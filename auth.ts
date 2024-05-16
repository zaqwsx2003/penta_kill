import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: { label: "Username" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                const response = await fetch(request);
                if (!response.ok) return null;
                return (await response.json()) ?? null;
            },
        }),
        Google({
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
});

/**
 *CredentialsProvider({
            async authorize(credentials) {
                const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: credentials.username,
                        password: credentials.password,
                    }),
                });
                let setCookie = authResponse.headers.get("Set-Cookie");
                console.log("set-cookie", setCookie);
                if (setCookie) {
                    const parsed = cookie.parse(setCookie);
                    cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
                }
                if (!authResponse.ok) {
                    return null;
                }

                const user = await authResponse.json();
                console.log("user", user);
                return {
                    email: user.id,
                    name: user.nickname,
                    image: user.image,
                    ...user,
                };
            },
        }),
 */
