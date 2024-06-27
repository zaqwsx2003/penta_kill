"use client";

import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchComments } from "@/app/api/api";
import { useCommentStore } from "@/lib/boardStore";
import CommentForm from "../_components/CommentForm";

interface CommentSectionProps {
    postId: number;
}

export default function CommentSection({ postId }: CommentSectionProps) {
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
            // queryClient.invalidateQueries(["comment", postId, page + 1]);
        }
    }

    return (
        <div className="mt-8 text-white">
            <h2 className="mb-4 text-xl font-bold">
                댓글
                <span className="ml-5">{data?.data.totalElements}</span>
            </h2>
            <CommentForm postId={postId} />
            {isLoading && page === 0 ? (
                <div className="text-center text-gray-400">로딩 중...</div>
            ) : isError ? (
                <div className="text-center text-gray-400">
                    댓글을 불러오는 중 오류가 발생했습니다.
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
                                            <div className="text-xs text-gray-400">
                                                추천
                                            </div>
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
                        <div className="text-center text-gray-400">
                            등록된 댓글이 없습니다.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
