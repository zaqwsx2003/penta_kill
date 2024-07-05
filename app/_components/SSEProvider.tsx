"use client";

import React, { useEffect, useRef } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useSession } from "next-auth/react";

import { useRefreshToken } from "@/lib/axiosHooks/useRefreshToken";
import SSEMessage from "@/app/_components/SSEMessage";
import { MatchNoticeType } from "@/model/SSE";
import { AnimatePresence, motion } from "framer-motion";
import { useSSEState } from "@/lib/SSEStore";

export default function SSEProvider() {
    const { data: session, status } = useSession();
    const refreshAccessToken = useRefreshToken();
    const { matchNotices, setMatchNotices, addMatchNotice, removeNotice } =
        useSSEState();
    const sseConnected = useRef(false);
    const retryCount = useRef(0);
    const maxRetries = 5;

    useEffect(() => {
        if (status !== "authenticated" || !session) return;

        let SSEPool: any;
        const SSESource = EventSourcePolyfill || NativeEventSource;

        const connectSSE = (token: any) => {
            if (sseConnected.current) return;

            SSEPool = new SSESource(
                `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/sse/emitter`,
                {
                    headers: {
                        Authorization: `${token}`,
                        Connection: "keep-alive",
                        Accept: "text/event-stream",
                    },
                    heartbeatTimeout: 86400000, // 24시간 연결 유지
                },
            );

            SSEPool.addEventListener("open", (event: any) => {
                sseConnected.current = true;
                retryCount.current = 0; // 연결 성공 시 재시도 횟수 초기화
            });

            SSEPool.addEventListener("matchNotice", (event: any) => {
                const matchData: MatchNoticeType[] = JSON.parse(event.data);
                console.log(matchData);
                setMatchNotices((prevNotices) => [
                    ...prevNotices,
                    ...matchData,
                ]);
            });

            SSEPool.addEventListener("error", async (error: any) => {
                console.error("SSE error:", error);

                if (error.status === 401 && retryCount.current < maxRetries) {
                    retryCount.current += 1;
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        SSEPool.close();
                        sseConnected.current = false;
                        connectSSE(newToken);
                    } else {
                        console.error("Failed to refresh token.");
                    }
                } else {
                    SSEPool.close();
                    sseConnected.current = false;
                }
            });
        };

        connectSSE(session.token.accessToken);

        return () => {
            if (SSEPool) {
                SSEPool.close();
                sseConnected.current = false;
            }
        };
    }, [session, status, refreshAccessToken, setMatchNotices]);

    return (
        <>
            <div className="fixed right-5 top-32 z-50">
                <AnimatePresence>
                    {matchNotices
                        .slice(0, 5)
                        ?.map((notice: MatchNoticeType, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 1, x: 400 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 1, x: 400 }}
                                layout
                                layoutRoot
                                style={{ position: "sticky" }}
                            >
                                <SSEMessage
                                    notice={notice}
                                    messageNumber={index}
                                    removeNotice={() => removeNotice(index)}
                                />
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </>
    );
}
