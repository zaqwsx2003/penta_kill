"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchComments } from "@/app/api/api";
import { useCommentStore } from "@/lib/boardStore";
import { Session } from "next-auth";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import CommentForm from "../_components/CommentForm";
import Spinner from "@/app/(service)/_components/Spinner";
import ReplySection from "./ReplySection";
import ReplyForm from "./ReplyForm";

interface CommentSectionProps {
    postId: number;
    session: Session | null;
}

export default function CommentSection({
    postId,
    session,
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

    const [editingCommentId, setEditingCommentId] = useState<number | null>(
        null,
    );
    const [editedContent, setEditedContent] = useState<string>("");
    const [replyingToCommentId, setReplyingToCommentId] = useState<
        number | null
    >(null);
    const [creatingComment, setCreatingComment] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const axiosAuth = useAxiosAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["comments", postId, page],
        queryFn: () => fetchComments({ postId, page, size }),
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
        setReplyingToCommentId(null);
        setCreatingComment(false);
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

    function toggleReplyFormHandler(commentId: number) {
        setReplyingToCommentId((prevId) =>
            prevId === commentId ? null : commentId,
        );
        setEditingCommentId(null);
    }

    function keyDownHandler(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveEditCommentHandler();
        }
    }

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
                            {comments.map((comment) => {
                                const isCommentAuthor =
                                    session?.user?.email === comment.email;
                                return (
                                    <div
                                        key={comment.id}
                                        className={`group/comment mb-4 rounded-[10px] p-4 ${isCommentAuthor ? "bg-zinc-700" : "bg-zinc-800"}`}
                                    >
                                        {/* 댓글 헤더 */}
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
                                            {/* 수정, 삭제, 대댓글 버튼 */}
                                            <div className="flex space-x-3 text-xs">
                                                {/* 댓글 작성자 수정, 삭제 버튼 */}
                                                {isCommentAuthor && (
                                                    <>
                                                        <button
                                                            onClick={() =>
                                                                editCommentHandler(
                                                                    comment.id,
                                                                    comment.content,
                                                                )
                                                            }
                                                            className="cursor-pointer text-orange-400"
                                                        >
                                                            수정
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                deleteCommentHandler(
                                                                    comment.id,
                                                                )
                                                            }
                                                            className="cursor-pointer text-red-500"
                                                        >
                                                            삭제
                                                        </button>{" "}
                                                    </>
                                                )}
                                                {/* 대댓글 작성 버튼 */}
                                                {session && (
                                                    <button
                                                        onClick={() =>
                                                            toggleReplyFormHandler(
                                                                comment.id,
                                                            )
                                                        }
                                                        className={`${isCommentAuthor ? "opacity-100" : "opacity-0"} ml-1 cursor-pointer transition-opacity duration-200 group-hover/comment:opacity-100 group-hover/reply:opacity-0`}
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
                                                )}
                                            </div>
                                        </div>
                                        {/* 댓글 작성자 댓글 수정 폼 */}
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
                                                        onKeyDown={
                                                            keyDownHandler
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
                                            <div className="mb-1">
                                                {comment.content}
                                            </div>
                                        )}
                                        {replyingToCommentId === comment.id && (
                                            <ReplyForm
                                                postId={postId}
                                                commentId={comment.id}
                                            />
                                        )}
                                        <ReplySection
                                            postId={postId}
                                            commentId={comment.id}
                                            session={session}
                                        />
                                    </div>
                                );
                            })}
                            {/* 더보기 */}
                            <div className="text-center">
                                {hasMore ? (
                                    <button
                                        onClick={loadMoreCommentsHandler}
                                        className="hover border-1 mt-4 rounded-full border-white bg-zinc-800 px-4 py-4 transition-colors duration-300 hover:bg-zinc-700"
                                    >
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
                                            className="lucide lucide-plus"
                                        >
                                            <path d="M5 12h14" />
                                            <path d="M12 5v14" />
                                        </svg>
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
