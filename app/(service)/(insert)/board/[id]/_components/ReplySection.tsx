"use client";

import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { fetchReplies } from "@/app/api/api";
import { useReplyStore } from "@/lib/boardStore";

interface ReplySectionProps {
    postId: number;
    commentId: number;
    session: Session | null;
}

export default function ReplySection({
    postId,
    commentId,
    session,
}: ReplySectionProps) {
    const { replies, page, size, setReplies, hasMore, setHasMore, addReplies } =
        useReplyStore();
    const queryClient = useQueryClient();
    const axiosAuth = useAxiosAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["replies", postId, commentId, page],
        queryFn: () => fetchReplies({ postId, commentId, page, size }),
    });

    const deleteReplyMutation = useMutation({
        mutationFn: async (replyId: number) => {
            const response = await axiosAuth.delete(
                `/posts/${postId}/comments/${commentId}/replies/${replyId}`,
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["replies", postId, commentId, page],
            });
        },
    });

    function deleteReplyHandler(replyId: number) {
        if (confirm("삭제 후에는 복구할 수 없습니다.")) {
            deleteReplyMutation.mutate(replyId);
        }
    }

    return (
        <div className="mt-4">
            {data?.data.map((reply: any) => {
                const isReplyAuthor = session?.user?.email === reply.email;
                return (
                    <div
                        key={reply.id}
                        className={`group/reply mb-1 flex rounded-[10px] p-4 ${isReplyAuthor ? "bg-zinc-600" : "bg-zinc-900"}`}
                    >
                        {/* 화살표 */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-corner-down-right mr-4"
                        >
                            <polyline points="15 10 20 15 15 20" />
                            <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                        </svg>
                        <div className="flex-1">
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex content-center items-center">
                                    <span className="mr-2">
                                        {reply.nickname}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(
                                            reply.createAt,
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                {/* 수정, 삭제, 대댓글 버튼 */}
                                <div className="flex space-x-3 text-xs">
                                    {/* 댓글 작성자만 수정, 삭제 버튼 */}
                                    {isReplyAuthor && (
                                        <>
                                            <button className="text-orange-400">
                                                수정
                                            </button>
                                            <button
                                                className="text-red-500"
                                                onClick={() =>
                                                    deleteReplyHandler(reply.id)
                                                }
                                            >
                                                삭제
                                            </button>{" "}
                                        </>
                                    )}
                                    {/* 대댓글 작성 버튼 */}
                                    <button
                                        className={`${isReplyAuthor ? "opacity-100" : "opacity-0"} ml-1 transition-opacity duration-200 group-hover/reply:opacity-100`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="#ffffff"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-message-circle"
                                        >
                                            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div>{reply.content}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
