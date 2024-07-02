"use client";

import React, { useEffect, useState, useRef } from "react";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import { useSession } from "next-auth/react";

import { useRefreshToken } from "@/lib/axiosHooks/useRefreshToken";
import SSEMessage from "@/app/_components/SSEMessage";
import { MatchNoticeType } from "@/model/SSE";
import { AnimatePresence, motion } from "framer-motion";
import { match } from "assert";

export default function SSEProvider() {
    const { data: session, status } = useSession();
    const refreshAccessToken = useRefreshToken();
    const [matchNotices, setMatchNotices] = useState<MatchNoticeType[]>([]);
    const ssePoolRef = useRef<EventSource | null>(null);
    const sseConnected = useRef(false);

    useEffect(() => {
        if (status !== "authenticated" || !session || sseConnected.current)
            return;

        const SSESource = EventSourcePolyfill || NativeEventSource;
        const SSEPool = new SSESource(
            `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/sse/emitter`,
            {
                headers: {
                    Authorization: `Bearer ${session.token.accessToken}`,
                },
                withCredentials: true,
            },
        );

        SSEPool.onmessage = (event: any) => {
            const newMessage = JSON.parse(event.data);
            setMatchNotices((prevNotices) => [...prevNotices, newMessage]);
        };

        SSEPool.onerror = async (error: any) => {
            console.error("SSE error:", error);
            SSEPool.close();
            sseConnected.current = false;
        };

        ssePoolRef.current = SSEPool;
        sseConnected.current = true;

        return () => {
            if (ssePoolRef.current) {
                ssePoolRef.current.close();
                ssePoolRef.current = null;
                sseConnected.current = false;
            }
        };
    }, [session, status]);

    const removeNotice = (index: number) => {
        setMatchNotices((prevNotices) =>
            prevNotices.filter((_, i) => i !== index),
        );
    };
    // const removeNotice = (index: number) => {
    //     setMatchNotices((prevNotices) =>
    //         prevNotices.filter((_, i) => i !== index),
    //     );
    // };

    // useEffect(() => {
    //     setVisibleNotice(matchNotices.slice(0, 5));
    // }, [matchNotices]);

    return (
        <>
            {/* <div className="fixed right-5 top-32 z-50">
                <AnimatePresence>
                    {visibleNotice?.map(
                        (notice: MatchNoticeType, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 1, x: 400 }}
                                animate={{ opacity: 1, x: 0 }}
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
                        ),
                    )}
                </AnimatePresence>
            </div> */}
        </>
    );
}

//     const connectSSE = (token: any) => {
//         if (sseConnected.current) return;

//         SSEPool = new SSESource(
//             `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/sse/emitter`,
//             {
//                 headers: {
//                     Authorization: `${token}`,
//                     Connection: "keep-alive",
//                     Accept: "text/event-stream",
//                 },
//                 heartbeatTimeout: 86400000, // 24시간 연결 유지
//             },
//         );

//         SSEPool.addEventListener("open", (event: any) => {
//             sseConnected.current = true;
//             retryCount.current = 0; // 연결 성공 시 재시도 횟수 초기화
//         });

//         SSEPool.addEventListener("matchNotice", (event: any) => {
//             const matchData = JSON.parse(event.data);
//             console.log(matchData);
//             setMatchNotices((prevNotices) => [
//                 ...prevNotices,
//                 ...matchData,
//             ]);
//         });

//         SSEPool.addEventListener("error", async (error: any) => {
//             console.error("SSE error:", error);

//             if (error.status === 401 && retryCount.current < maxRetries) {
//                 retryCount.current += 1;
//                 const newToken = await refreshAccessToken();
//                 if (newToken) {
//                     SSEPool.close();
//                     sseConnected.current = false;
//                     connectSSE(newToken);
//                 } else {
//                     console.error("Failed to refresh token.");
//                 }
//             } else {
//                 SSEPool.close();
//                 sseConnected.current = false;
//             }
//         });
//     };

//     connectSSE(session.token.accessToken);

//     return () => {
//         if (SSEPool) {
//             SSEPool.close();
//             sseConnected.current = false;
//         }
//     };
