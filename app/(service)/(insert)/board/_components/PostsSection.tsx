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
import BoardRowSkeleton from "./BoardRowSkeleton";

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

    console.log(data);
    return (
        <div className="container mx-auto max-w-3xl p-4 text-white">
            {isError ? (
                <div className="rounded-[10px] bg-zinc-600 p-4 text-center">
                    잠시 후 다시 시도해주십시오.
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-12 gap-4 rounded-[10px] bg-card p-4 text-sm">
                        <div className="col-span-1">#</div>
                        <div className="col-span-4">제목</div>
                        <div className="col-span-2">글쓴이</div>
                        <div className="col-span-3">날짜</div>
                        <div className="col-span-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-thumbs-up"
                            >
                                <path d="M7 10v12" />
                                <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                            </svg>
                        </div>
                        <div className="col-span-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-thumbs-down"
                            >
                                <path d="M17 14V2" />
                                <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
                            </svg>
                        </div>
                    </div>

                    <div className="mt-2 grid grid-cols-1 gap-2 overflow-hidden rounded-[10px] bg-zinc-800 text-sm shadow-inner">
                        {isLoading ? (
                            <div className="flex h-64 items-center justify-center">
                                <Spinner />
                            </div>
                        ) : posts && posts.length > 0 ? (
                            posts.map((post, idx) => (
                                <BoardRow
                                    key={post.id}
                                    {...post}
                                    isLast={idx === posts.length - 1}
                                />
                            ))
                        ) : (
                            <div className="h-64 py-32 text-center text-white">
                                등록된 게시물이 없습니다.
                            </div>
                        )}
                    </div>
                    <div className="relative my-5 flex content-center justify-center">
                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={pageChangeHandler}
                        />
                        {session ? (
                            <Link
                                href="/board/write"
                                className="absolute right-0 transform rounded-[10px] bg-zinc-700 px-4 py-1 text-white transition duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-zinc-500"
                            >
                                글쓰기
                            </Link>
                        ) : null}
                    </div>
                </>
            )}
        </div>
    );
}
