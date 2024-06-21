// CommentSection.tsx
"use client";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "@/app/api/api";
import { Comment } from "@/model/board";
import { useCommentStore } from "@/lib/boardStore";
import CommentForm from "../_components/CommentForm"; // CommentForm import 추가

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

    const { data, isLoading, isError } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => fetchComments(postId, 0, 10),
    });

    const handleCommentSubmit = (data: { content: string }) => {
        // API 요청을 통해 댓글 작성 로직 구현
        console.log(data);
        // 작성된 댓글을 로컬 상태에 추가
        addComments([
            {
                id: Date.now(),
                ...data,
                nickname: "You",
                createAt: new Date().toISOString(),
                replyCount: 1,
            },
        ]);
    };

    return (
        <div className="mt-8 text-white">
            <h2 className="mb-4 text-xl font-bold">댓글</h2>
            <CommentForm postId={postId} />
            <div className="mb-4 flex">
                <button className="mr-2 rounded-md bg-gray-700 px-3 py-1">
                    최신순
                </button>
                <button className="rounded-md bg-gray-700 px-3 py-1">
                    포인트
                </button>
            </div>
            {comments.length > 0 ? (
                <div>
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="mb-4 rounded-md bg-gray-700 p-4"
                        >
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="mr-2">
                                        {comment.nickname}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {comment.createAt}
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
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-400">
                    등록된 댓글이 없습니다.
                </div>
            )}
        </div>
    );
}
