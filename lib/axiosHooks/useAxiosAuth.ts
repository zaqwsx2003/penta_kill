"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import axios, { axiosAuth } from "./axios";
import { useRefreshToken } from "./useRefreshToken";

export default function useAxiosAuth() {
    const { data: session } = useSession();
    const refreshToken = useRefreshToken();

    useEffect(() => {
        const requestInterceptor = axiosAuth.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) {
                    config.headers.Authorization = session?.accessToken;
                }
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
                    await refreshToken();
                    console.log(session?.accessToken);
                    prevRequest.headers.authorization = `${session?.accessToken}`;
                    prevRequest.headers.refreshtoken = `${session?.refreshToken}`;
                    return axiosAuth(prevRequest);
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
