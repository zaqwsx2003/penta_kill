// PostDetail.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchPost } from "@/app/api/api";
import { useSession } from "next-auth/react";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import CommentSection from "./CommentSection";

export default function PostDetail() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const axiosAuth = useAxiosAuth();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(Number(id)),
    });

    const post = data?.data;
    const isAuthor = session?.user?.name === post?.nickname;

    const deletePostMutation = useMutation({
        mutationFn: async (postId: number) => {
            const response = await axiosAuth.delete(`/posts/${postId}`);
            return response.data;
        },
        onSuccess: () => {
            router.push("/board");
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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading post</div>;

    return (
        <div className="mx-auto max-w-4xl p-4 text-white">
            <div className="rounded-[10px] bg-zinc-700 p-6">
                <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
                <div className="mb-4 flex items-center justify-between">
                    <div className="mr-4 flex items-center">
                        {post.nickname}
                    </div>
                    <span>{new Date(post.createAt).toLocaleString()}</span>
                </div>
                <div
                    className="mb-4 min-h-[100px]"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                <div className="flex items-center justify-between">
                    <div>조회수 {post.views}</div>
                    <div className="flex space-x-4">
                        <button className="flex items-center space-x-1 rounded-md border border-gray-600 p-2">
                            <span>추천</span>
                            <span>{post.likeCount}</span>
                        </button>
                        <button className="flex items-center space-x-1 rounded-md border border-gray-600 p-2">
                            <span>비추천</span>
                            <span>{post.dislikeCount}</span>
                        </button>
                    </div>
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
            <CommentSection postId={Number(id)} />
        </div>
    );
}
