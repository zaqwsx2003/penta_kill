"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Session } from "next-auth";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { fetchReplies } from "@/app/api/api";
import { useReplyStore } from "@/lib/boardStore";
import ReplyPagination from "./ReplyPagination";
import { Reply } from "@/model/board";

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
    const {
        page,
        size,
        totalPages,
        setReplies,
        addReplies,
        setTotalPages,
        setPage,
        hasMore,
        setHasMore,
    } = useReplyStore();

    const queryClient = useQueryClient();
    const axiosAuth = useAxiosAuth();

    const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
    const [editedContent, setEditedContent] = useState<string>("");

    const { data } = useQuery({
        queryKey: ["replies", postId, commentId, page],
        queryFn: () => fetchReplies({ postId, commentId, page, size }),
    });

    useEffect(() => {
        if (data) {
            if (page === 0) {
                setReplies(data.data);
            } else {
                addReplies(data.data);
            }
            setTotalPages(data.totalPages);
            setHasMore(data.currentPage < data.totalPages - 1);
        }
    }, [data, page, setReplies, addReplies, setHasMore, setTotalPages]);

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

    const editReplyMutation = useMutation({
        mutationFn: async ({
            replyId,
            content,
        }: {
            replyId: number;
            content: string;
        }) => {
            const response = await axiosAuth.put(
                `posts/${postId}/comments/${commentId}/replies/${replyId}`,
                { content },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["replies", postId, commentId, page],
            });
            setEditingReplyId(null);
            setEditedContent("");
        },
    });

    function editReplyHandler(replyId: number, content: string) {
        setEditingReplyId(replyId);
        setEditedContent(content);
    }

    function saveEditedReplyHandler() {
        if (editingReplyId !== null) {
            editReplyMutation.mutate({
                replyId: editingReplyId,
                content: editedContent,
            });
        }
    }

    function pageChangeHandler(newPage: number) {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    }

    return (
        <div className="mt-4">
            {data?.data.map((reply: Reply) => {
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
                                            reply.createdAt,
                                        ).toLocaleString()}
                                    </span>
                                </div>
                                {/* 수정, 삭제, 대댓글 버튼 */}
                                <div className="flex space-x-3 text-xs">
                                    {/* 댓글 작성자만 수정, 삭제 버튼 */}
                                    {isReplyAuthor && (
                                        <>
                                            <button
                                                className="cursor-pointer text-orange-400"
                                                onClick={() =>
                                                    editReplyHandler(
                                                        reply.id,
                                                        reply.content,
                                                    )
                                                }
                                            >
                                                수정
                                            </button>
                                            <button
                                                className="cursor-pointer text-red-500"
                                                onClick={() =>
                                                    deleteReplyHandler(reply.id)
                                                }
                                            >
                                                삭제
                                            </button>{" "}
                                        </>
                                    )}
                                    {/* 원댓 작성자 태그 기능 추가 시 대댓글 작성 버튼 */}
                                    {/* <button
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
                                    </button> */}
                                </div>
                            </div>
                            {editingReplyId === reply.id ? (
                                <div className="mb-4 flex items-center rounded-[10px] bg-card">
                                    <div className="flex flex-grow flex-col rounded-[10px] rounded-r px-3 py-2 lg:rounded-r-none">
                                        <textarea
                                            value={editedContent}
                                            onChange={(e) =>
                                                setEditedContent(e.target.value)
                                            }
                                            className="scrollbar-hide text-t2 h-[64px] max-h-[64px] w-full resize-none rounded-[10px] bg-card placeholder:text-gray-400 focus:outline-none"
                                        />
                                    </div>
                                    <div className="lg:bg-gray-850 flex-shrink-0 lg:mt-0 lg:rounded-r lg:p-2">
                                        <button
                                            onClick={saveEditedReplyHandler}
                                            className="w-30 my-auto mr-2 h-full select-none rounded border border-none bg-orange-500 px-5 py-4 text-center outline-none hover:bg-orange-400 active:bg-orange-400"
                                        >
                                            저장
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>{reply.content}</div>
                            )}
                        </div>
                    </div>
                );
            })}
            {data?.totalElements !== 0 ? (
                <ReplyPagination onPageChange={pageChangeHandler} />
            ) : null}
        </div>
    );
}
