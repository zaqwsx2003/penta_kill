"use client";

import { use, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useSessionStore } from "@/lib/sessionStore";
import { jwtDecode, JwtPayload } from "jwt-decode";

type Props = {
    children: React.ReactNode;
};

type User = {
    name: string;
    email: string;
    // 필요한 다른 필드들 추가
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
                if (accessToken) {
                    const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
                    const user: User = {
                        name: decodedToken.name,
                        email: decodedToken.email,
                    };
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
