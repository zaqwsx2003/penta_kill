"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/app/api/api";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import CommentSection from "./CommentSection";
import Spinner from "@/app/(service)/_components/Spinner";
import SessionModal from "@/app/(service)/(landing)/_components/SessionModal";

export default function PostDetail() {
    const [sessionModal, setSessionModal] = useState<boolean>(false);
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const axiosAuth = useAxiosAuth();
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(Number(id)),
    });

    const post = data?.data;
    const isAuthor = session?.user?.email === post?.email;

    const deletePostMutation = useMutation({
        mutationFn: async (postId: number) => {
            const response = await axiosAuth.delete(`/posts/${postId}`);
            return response.data;
        },
        onSuccess: () => {
            router.push("/board");
        },
    });

    const likeOrDislikeMutation = useMutation({
        mutationFn: async ({
            postId,
            isLike,
        }: {
            postId: number;
            isLike: boolean | null;
        }) => {
            const response = await axiosAuth.put(
                `/posts/${postId}/likes`,
                null,
                {
                    params: { isLike },
                },
            );
            return response.data;
        },
        onSuccess: () => {
            // router.refresh();
            queryClient.invalidateQueries({ queryKey: ["post", id] });
        },
    });

    function moveToBoardHandler() {
        router.push("/board");
    }

    function moveToEditHandler() {
        router.push(`/board/edit/${id}`);
    }

    function deletePostHandler() {
        if (confirm("삭제 후에는 복구할 수 없습니다.")) {
            deletePostMutation.mutate(Number(id));
        }
    }

    function likePostHandler() {
        if (!session) {
            return setSessionModal(true);
        }
        const newIsLike = post.isLike === true ? null : true;
        likeOrDislikeMutation.mutate({ postId: Number(id), isLike: newIsLike });
    }

    function dislikePostHandler() {
        if (!session) {
            return setSessionModal(true);
        }
        const newIsLike = post.isLike === false ? null : true;
        likeOrDislikeMutation.mutate({ postId: Number(id), isLike: newIsLike });
    }

    if (isLoading) return <Spinner />;
    if (isError) return <div>잠시 후 다시 시도해주세요.</div>;

    return (
        <div className="mx-auto max-w-4xl p-4 text-white">
            {sessionModal && <SessionModal />}
            <div className="rounded-[10px] bg-zinc-700 p-6">
                <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
                <div className="mb-4 flex items-center justify-between">
                    <div className="mr-4 flex items-center">
                        {post.nickname}
                    </div>
                    <span>{new Date(post.createdAt).toLocaleString()}</span>
                </div>
                <div
                    className="mb-4 min-h-[100px] break-words"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <div className="flex items-center justify-center">
                    <button
                        className="flex items-center space-x-1 rounded-md p-2"
                        onClick={likePostHandler}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={post.isLike === true ? "#de542a" : "none"}
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-thumbs-up"
                        >
                            <path d="M7 10v12" />
                            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                        </svg>
                        <span>{post.likeCount}</span>
                    </button>
                    <button
                        onClick={dislikePostHandler}
                        className="flex items-center space-x-1 p-2"
                    >
                        <span>{post.dislikeCount}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill={post.isLike === false ? "#3b55ff" : "none"}
                            stroke="#ffffff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-thumbs-down"
                        >
                            <path d="M17 14V2" />
                            <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="mt-3 flex justify-between font-bold">
                {isAuthor && (
                    <>
                        <div>
                            <button
                                onClick={moveToEditHandler}
                                className="mr-2 rounded bg-orange-500 px-4 py-2"
                            >
                                수정
                            </button>
                            <button
                                onClick={deletePostHandler}
                                className="rounded bg-red-500 px-4 py-2"
                            >
                                삭제
                            </button>
                        </div>
                    </>
                )}
                <button
                    className="rounded bg-zinc-700 px-4 py-2"
                    onClick={moveToBoardHandler}
                >
                    목록
                </button>
            </div>
            <CommentSection postId={Number(id)} isAuthor={isAuthor} />
        </div>
    );
}
