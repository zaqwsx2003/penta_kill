"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function Test() {
    const { data: session } = useSession();
    console.log("old access", session?.accessToken);

    useEffect(() => {
        const test = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_ENDPOINT}/users/refresh`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            refreshToken: session?.refreshToken,
                        },
                    },
                );

                console.log(response);
                if (session)
                    session.user.accessToken = response.data.accessToken;
                console.log("new access", session?.accessToken);
            } catch (error) {
                console.error("Failed to refresh token", error);
            }
        };
        test();
    });
    return <div className="">ㄴㅇㄹㄴㅇㄹ    </div>;
}
