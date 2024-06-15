"use client";

import { useState } from "react";
import Link from "next/link";
import Post from "./_components/Post";
import Pagination from "./_components/Pagination";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import instance from "@/app/api/instance";

export default function Page() {
    const mockPosts = Array.from({ length: 50 }, (_, i) => ({
        id: i + 1,
        title: `Post ${i + 1}`,
        author: `Author ${i + 1}`,
        date: `2023-01-0${(i % 10) + 1}`,
        views: 100 + i * 10,
        comments: i * 2,
        recommendation: i % 5,
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const totalPages = Math.ceil(mockPosts.length / postsPerPage);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);

    const pageChangeHandler = (page: number) => {
        setCurrentPage(page);
    };

    const { data: post } = useQuery({
        queryKey: ["post"],
        queryFn: async () => {
            const response = await instance.get(`posts?page=1&size=10`);
            return response.data;
        },
    });

    // Form handling (일단 레이아웃만)
    type SearchFormValues = {
        searchQuery: string;
        searchType: string;
    };
    const { register, handleSubmit } = useForm<SearchFormValues>();

    return (
        <div className="container mx-auto max-w-3xl p-4">
            <h1 className="mb-4 text-2xl font-bold text-white">펜타톡</h1>
            <div className="grid grid-cols-12 gap-4 rounded-md bg-gray-800 p-4 text-xs text-white">
                <div className="col-span-1">#</div>
                <div className="col-span-5">제목</div>
                <div className="col-span-2">글쓴이</div>
                <div className="col-span-2">날짜</div>
                <div className="col-span-1">조회수</div>
                <div className="col-span-1">추천</div>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2 text-xs">
                {currentPosts.map((post, index) => (
                    <Post
                        key={post.id}
                        index={indexOfFirstPost + index + 1}
                        {...post}
                    />
                ))}
            </div>
            <div className="mb-4 mt-2 flex justify-between">
                <form
                    onSubmit={handleSubmit(() => {})}
                    className="flex items-center space-x-2"
                >
                    <input
                        {...register("searchQuery")}
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="rounded-md border px-2 py-1"
                    />
                    <select
                        {...register("searchType")}
                        className="rounded-md border px-2 py-1"
                    >
                        <option value="title">제목</option>
                        <option value="content">내용</option>
                        <option value="author">글쓴이</option>
                    </select>
                    <button
                        type="submit"
                        className="rounded-md border bg-gray-700 px-2 py-1 text-white"
                    >
                        검색
                    </button>
                </form>
                <Link
                    href="/board/write"
                    className="rounded-md border bg-gray-700 px-2 py-1 text-white"
                >
                    글쓰기
                </Link>
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </div>
    );
}
