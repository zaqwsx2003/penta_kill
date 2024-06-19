"use client";

import { signIn, useSession } from "next-auth/react";
import axios from "./axios";

export const useRefreshToken = () => {
    const { data: session } = useSession();

    const refreshToken = async () => {
        const response = await axios.get("/users/refresh", {
            headers: {
                "Content-Type": "application/json",
                RefreshToken: session?.refreshToken,
            },
        });

        if (session) {
            session.accessToken = response.headers.authorization;
            session.refreshToken = response.headers.refreshtoken;
        }
    };
    return refreshToken;
};
