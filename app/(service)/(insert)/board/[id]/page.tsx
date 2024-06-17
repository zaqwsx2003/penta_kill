"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import avatarImg from "@/public/mid.png";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/app/api/api";

export default function Page() {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(Number(id)),
    });

    const post = data?.data;

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading post</div>;

    return (
        <div className="mx-auto max-w-4xl p-4 text-white">
            <div className="rounded-md bg-gray-800 p-6">
                <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
                <div className="mb-4 flex items-center">
                    <div className="mr-4 flex items-center">
                        <Image
                            src={avatarImg}
                            alt="Author avatar"
                            className="mr-2 rounded-full"
                            width={40}
                            height={40}
                        />
                        <span>{post.nickname}</span>
                    </div>
                    <span>{new Date(post.createAt).toLocaleString()}</span>
                </div>
                <div className="mb-4">{post.content}</div>
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
        </div>
    );
}
