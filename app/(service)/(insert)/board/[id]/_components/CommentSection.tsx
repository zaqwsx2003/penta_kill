"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments } from "@/app/api/api";
import { useCommentStore } from "@/lib/boardStore";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import CommentForm from "../_components/CommentForm";
import Spinner from "@/app/(service)/_components/Spinner";

interface CommentSectionProps {
    postId: number;
    isAuthor: boolean;
}

export default function CommentSection({
    postId,
    isAuthor,
}: CommentSectionProps) {
    const {
        comments,
        page,
        size,
        setComments,
        setPage,
        hasMore,
        setHasMore,
        addComments,
    } = useCommentStore();

    const queryClient = useQueryClient();
    const axiosAuth = useAxiosAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["comments", postId, page],
        queryFn: () => fetchComments(postId, page, size),
    });

    useEffect(() => {
        if (data) {
            if (page === 0) {
                setComments(data.data);
            } else {
                addComments(data.data);
            }
            setHasMore(data.currentPage < data.totalPages - 1);
        }
    }, [data, page, setComments, addComments, setHasMore]);

    function loadMoreCommentsHandler() {
        if (hasMore) {
            setPage(page + 1);
        }
    }

    const deleteCommentMutation = useMutation({
        mutationFn: async (commentId: number) => {
            const response = await axiosAuth.delete(
                `/posts/${postId}/comments/${commentId}`,
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
    });

    const [editingCommentId, setEditingCommentId] = useState<number | null>(
        null,
    );
    const [editedContent, setEditedContent] = useState<string>("");

    const editCommentMutation = useMutation({
        mutationFn: async ({
            commentId,
            content,
        }: {
            commentId: number;
            content: string;
        }) => {
            const response = await axiosAuth.put(
                `/posts/${postId}/comments/${commentId}`,
                { content },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] });
        },
    });

    function deleteCommentHandler(commentId: number) {
        if (confirm("삭제 후에는 복구할 수 없습니다.")) {
            deleteCommentMutation.mutate(commentId);
        }
    }

    function editCommentHandler(commetId: number, content: string) {
        setEditingCommentId(commetId);
        setEditedContent(content);
    }

    const saveEditCommentHandler = () => {
        if (editingCommentId !== null) {
            editCommentMutation.mutate({
                commentId: editingCommentId,
                content: editedContent,
            });
            setEditingCommentId(null);
            setEditedContent("");
        }
    };

    return (
        <div className="mt-8 text-white">
            <h2 className="mb-4 text-xl font-bold">
                댓글
                <span className="ml-5">{comments.length}</span>
            </h2>
            <CommentForm postId={postId} />
            {isLoading && page === 0 ? (
                <Spinner />
            ) : isError ? (
                <div className="text-center text-gray-400">
                    잠시 후 다시 시도해주세요.
                </div>
            ) : (
                <>
                    {comments.length > 0 ? (
                        <div>
                            {comments.map(function (comment) {
                                return (
                                    <div
                                        key={comment.id}
                                        className="mb-4 rounded-[10px] bg-zinc-700 p-4"
                                    >
                                        <div className="mb-2 flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="mr-2">
                                                    {comment.nickname}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(
                                                        comment.createAt,
                                                    ).toLocaleString()}
                                                </span>
                                            </div>
                                            {isAuthor && (
                                                <div className="flex space-x-3 text-xs">
                                                    <button
                                                        onClick={() =>
                                                            editCommentHandler(
                                                                comment.id,
                                                                comment.content,
                                                            )
                                                        }
                                                        className="text-orange-400"
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            deleteCommentHandler(
                                                                comment.id,
                                                            )
                                                        }
                                                        className="text-red-500"
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        {editingCommentId === comment.id ? (
                                            <div className="mb-4 flex items-center rounded-[10px] bg-card">
                                                <div className="flex flex-grow flex-col rounded-[10px] rounded-r px-3 py-2 lg:rounded-r-none">
                                                    <textarea
                                                        value={editedContent}
                                                        onChange={(e) =>
                                                            setEditedContent(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="scrollbar-hide text-t2 h-[64px] max-h-[64px] w-full resize-none rounded-[10px] bg-card placeholder:text-gray-400 focus:outline-none"
                                                    />
                                                </div>
                                                <div className="lg:bg-gray-850 flex-shrink-0 lg:mt-0 lg:rounded-r lg:p-2">
                                                    <button
                                                        onClick={
                                                            saveEditCommentHandler
                                                        }
                                                        className="w-30 my-auto mr-2 h-full select-none rounded border border-none bg-orange-500 px-5 py-4 text-center outline-none hover:bg-orange-400 active:bg-orange-400"
                                                    >
                                                        저장
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="min-h-10">
                                                {comment.content}
                                            </div>
                                        )}
                                        <button className="mt-2 text-xs text-blue-400">
                                            댓글
                                        </button>
                                    </div>
                                );
                            })}
                            <div className="text-center">
                                {hasMore ? (
                                    <button
                                        onClick={loadMoreCommentsHandler}
                                        className="mt-4 rounded-md bg-gray-700 px-4 py-2"
                                    >
                                        더보기
                                    </button>
                                ) : (
                                    <div className="mt-4 text-gray-400">
                                        마지막 댓글입니다.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="my-4 text-center text-gray-400">
                            등록된 댓글이 없습니다.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
