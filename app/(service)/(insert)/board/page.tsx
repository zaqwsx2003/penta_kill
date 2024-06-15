"use client";

import Link from "next/link";
import BoardRow from "./_components/BoardRow";
import Pagination from "./_components/Pagination";
import { useForm } from "react-hook-form";
import { fetchPosts } from "@/app/api/api";
import { useBoardStore } from "@/lib/boardStore";
import { FetchPostsResponse, Post } from "@/model/board";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const {
        posts,
        setPosts,
        page,
        setPage,
        size,
        totalPages,
        setTotalPages,
        setTotalPosts,
    } = useBoardStore();

    const {
        data: boardInfo,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["board", page, size],
        queryFn: () => fetchPosts({ page, size }),
    });

    function pageChangeHandler(newPage: number) {
        setPage(newPage);
    }

    // Form handling (일단 레이아웃만)
    type SearchFormValues = {
        searchQuery: string;
        searchType: string;
    };
    const { register, handleSubmit } = useForm<SearchFormValues>();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading posts</div>;

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
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <BoardRow key={post.id} {...post} />
                    ))
                ) : (
                    <div className="h-64 py-32 text-center text-white">
                        등록된 게시물이 없습니다.
                    </div>
                )}
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
                currentPage={page}
                totalPages={totalPages}
                onPageChange={pageChangeHandler}
            />
        </div>
    );
}
