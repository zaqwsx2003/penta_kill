"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSessionStore } from "@/lib/sessionStore";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Props = {
    children: React.ReactNode;
};

type User = {
    userid: number;
    username: string;
    email: string;
};

type CustomJwtPayload = JwtPayload & User;

export default function SessionProvider({ children }: Props) {
    const setSession = useSessionStore((state) => state.setSession);
    const setLoading = useSessionStore((state) => state.setLoading);
    const setAccess = useSessionStore((state) => state.setAccessToken);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const accessToken = Cookies.get("Access_Token");
                console.log(accessToken);
                if (accessToken) {
                    const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
                    console.log("decodedToken", decodedToken);
                    const user: User = {
                        userid: decodedToken.userid,
                        username: decodedToken.username,
                        email: decodedToken.email,
                    };
                    console.log("user", user);
                    setAccess(accessToken);
                    setSession(user);
                } else {
                    setSession(null);
                }
            } catch (error) {
                console.log(error);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, [setSession, setLoading]);

    return <>{children}</>;
}
