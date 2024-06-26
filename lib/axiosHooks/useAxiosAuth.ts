"use client";

import { useEffect } from "react";
import { getSession, useSession } from "next-auth/react";
import axios, { axiosAuth } from "./axios";
import { useRefreshToken } from "./useRefreshToken";

type SessionType = {
    user: UserType;
    expires?: string;
    userSession?: {
        email: string;
        name: string;
        point: number;
        expires: number;
    };
};

type UserType = {
    accessToken: string;
    exp: string;
    iat: string;
    id: string;
    jti: string;
    refreshToken: string;
    sub: string;
};

export default function useAxiosAuth() {
    const refreshToken = useRefreshToken();
    const { data: session } = useSession();

    useEffect(() => {
        const refreshAccessTime = async () => {
            if (session) {
                const now = Math.floor(new Date().getTime() / 1000);
                const expire = session?.user?.expires;
                const refreshTime = expire && expire - now - 5;

                if (refreshTime && refreshTime < 0) {
                    setTimeout(async () => {
                        await refreshToken();
                    }, refreshTime * 1000);
                }
            }
        };

        refreshAccessTime();

        const requestInterceptor = axiosAuth.interceptors.request.use(
            async (config) => {
                const session = await getSession();
                config.headers.Authorization = session
                    ? session?.token.accessToken
                    : null;
                config.headers.RefreshToken = session
                    ? session?.token.refreshToken
                    : null;

                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseInterceptor = axiosAuth.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error.config;
                if (error.response.status === 401 && !prevRequest.sent) {
                    prevRequest.sent = true;
                    const newTokens = await refreshToken();

                    if (newTokens) {
                        const session = await getSession();
                        prevRequest.headers.Authorization =
                            session?.token.accessToken;
                        return axiosAuth(prevRequest);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestInterceptor);
            axiosAuth.interceptors.response.eject(responseInterceptor);
        };
    }, [session, refreshToken]);

    return axiosAuth;
}
