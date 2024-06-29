"use client";

import React, { useEffect, useState } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useSession, getSession } from "next-auth/react";

import { useRefreshToken } from "@/lib/axiosHooks/useRefreshToken";
import SSEMessage from "./SSEMessage";
    
export default function SSEProvider() {
    const { data: session, status } = useSession();
    const refreshAccessToken = useRefreshToken();
    const [slidStyle, setSlidStyle] = useState("");

    useEffect(() => {
        if (status !== "authenticated" || !session) return; // session이 없으면 실행하지 않음

        let SSEPool: any;
        const SSESource = EventSourcePolyfill || NativeEventSource;

        const connectSSE = (token: any) => {
            SSEPool = new SSESource(
                `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/sse/emitter`,
                {
                    headers: {
                        Authorization: `${token}`,
                        Connection: "keep-alive",
                        Accept: "text/event-stream",
                    },
                    heartbeatTimeout: 86400000, // 기본 45초 24시간 연결
                },
            );

            SSEPool.addEventListener("open", (event: any) => {
                console.log("SSE connection opened", event);
            });

            SSEPool.addEventListener("connect", (event: any) => {
                const { data: connect } = event;
                if (connect === "connected!") {
                    console.log("SSE CONNECTED");
                } else {
                    console.log(event);
                }
            });

            SSEPool.addEventListener("error", async (error: any) => {
                if (error.status === 401) {
                    await refreshAccessToken();
                    const newSession = await getSession();
                    const newToken = newSession?.token.accessToken;
                    connectSSE(newToken);
                } else {
                    console.error("SSE error:", error);
                }
            });
        };

        connectSSE(session.token.accessToken);

        return () => {
            if (SSEPool) {
                SSEPool.close();
            }
        };
    }, [session, status, refreshAccessToken]);

    return <SSEMessage />;
}
