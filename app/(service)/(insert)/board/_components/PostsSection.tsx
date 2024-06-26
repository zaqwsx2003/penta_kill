"use client";

import { useEffect } from "react";
import Link from "next/link";
import { fetchPosts } from "@/app/api/api";
import { useBoardStore } from "@/lib/boardStore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import BoardRow from "./BoardRow";
import Pagination from "./Pagination";
import Spinner from "@/app/(service)/_components/Spinner";

export default function PostsSection() {
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

    const { data: session } = useSession();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["board", page, size],
        queryFn: () => fetchPosts({ page, size }),
    });

    useEffect(() => {
        if (data) {
            setPosts(data.data);
            setTotalPages(data.totalPages);
            setTotalPosts(data.totalElements);
        }
    }, [data, setPosts, setTotalPages, setTotalPosts]);

    function pageChangeHandler(newPage: number) {
        setPage(newPage);
    }

    return (
        <>
            <div className="container mx-auto max-w-3xl p-4 text-white">
                {isError ? (
                    <div className="rounded-md bg-gray-800 p-4 text-center">
                        잠시 후 다시 시도해주십시오.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-12 gap-4 rounded-[10px] bg-card p-4 text-sm">
                            <div className="col-span-1">#</div>
                            <div className="col-span-4">제목</div>
                            <div className="col-span-2">글쓴이</div>
                            <div className="col-span-3">날짜</div>
                            <div className="col-span-1">조회수</div>
                            <div className="col-span-1">추천</div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 text-sm">
                            {isLoading ? (
                                <div className="flex h-64 items-center justify-center">
                                    <Spinner />
                                </div>
                            ) : posts && posts.length > 0 ? (
                                posts.map((post) => (
                                    <BoardRow key={post.id} {...post} />
                                ))
                            ) : (
                                <div className="h-64 py-32 text-center text-white">
                                    등록된 게시물이 없습니다.
                                </div>
                            )}
                        </div>
                        <div className="mb-4 mt-2 flex justify-end">
                            {session ? (
                                <Link
                                    href="/board/write"
                                    className="rounded-md border bg-gray-700 px-2 py-1 text-white"
                                >
                                    글쓰기
                                </Link>
                            ) : null}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={pageChangeHandler}
                        />
                    </>
                )}
            </div>
        </>
    );
}
