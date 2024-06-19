"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RefreshAccess() {
    const { data: session, update } = useSession();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const refreshAccessToken = async () => {
            console.log("old session", session?.accessToken);
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT}/users/refresh`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            RefreshToken: session?.refreshToken,
                        },
                    },
                );

                if (response.status === 200) {
                    console.log("new access", response.headers.authorization);
                    const newAccessToken = response.headers.authorization;
                    const newRefreshToken = response.headers.refreshtoken;

                    if (session) {
                        session.accessToken = newAccessToken;
                        session.refreshToken = newRefreshToken;
                    }
                } else {
                    throw new Error("Failed to refresh token");
                }
            } catch (error) {
                console.error("Failed to refresh token", error);
            } finally {
                setLoading(false);
            }
        };

        if (
            session &&
            session.expires &&
            new Date(session.expires) < new Date()
        ) {
            refreshAccessToken();
        }
    }, [session, update]);

    return;
}
