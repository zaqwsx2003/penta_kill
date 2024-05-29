"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useSessionStore } from "@/lib/sessionStore";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Props = {
    children: React.ReactNode;
    initialAccessToken: string | null;
};

type User = {
    userid: number;
    username: string;
    email: string;
};

type CustomJwtPayload = JwtPayload & User;

export default function SessionProvider({ children, initialAccessToken }: Props) {
    const setSession = useSessionStore((state) => state.setSession);
    const setLogin = useSessionStore((state) => state.setLogin);
    const setLoading = useSessionStore((state) => state.setLoading);
    const setAccess = useSessionStore((state) => state.setAccessToken);

    useEffect(() => {
        const loadSession = async () => {
            try {
                const accessToken = initialAccessToken || Cookies.get("Access_Token");
                console.log("Access Token: ", accessToken);
                if (accessToken) {
                    setLogin(true);
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
                console.error("Error decoding token: ", error);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        loadSession();
    }, [initialAccessToken, setSession, setLoading, setLogin, setAccess]);

    return <>{children}</>;
}
