"use client";

import { signIn, useSession } from "next-auth/react";

import axios from "@/lib/axiosHooks/axios";

export const useRefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        try {
            const response = await axios.get("/users/refresh", {
                headers: {
                    "Content-Type": "application/json",
                    RefreshToken: session?.token.refreshToken,
                },
            });

            const newAccessToken = response.headers.authorization;
            const newRefreshToken = response.headers.refreshtoken;

            await update({
                ...session,
                token: {
                    ...session?.token,
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                },
                user: {
                    ...session?.user,
                },
            });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            console.log("error", error);
            return null;
        }
    };
    return refreshToken;
};
