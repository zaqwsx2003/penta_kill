"use client";

import { signIn, useSession } from "next-auth/react";
import axios from "./axios";

export const RefreshToken = () => {
    const { data: session, update } = useSession();

    const refreshToken = async () => {
        const response = await axios.get("/auth/refresh", {
            headers: {
                "Content-Type": "application/json",
                Refreshtoken: session?.user.refreshToken,
            },
        });

        await update({
            ...session,
            user: {
                ...session?.user,
                accessToken: response.headers.Authorization,
                refreshToken: response.headers.Refreshtoken,
            },
        });
    };
    return refreshToken;
};
