"use client";

import { useEffect } from "react";
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

    function deleteCommentHandler(commentId: number) {
        if (confirm("삭제 후에는 복구할 수 없습니다.")) {
            deleteCommentMutation.mutate(commentId);
        }
    }

    function editCommentHandler(commetId: number) {}

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
                                        <div>{comment.content}</div>
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
