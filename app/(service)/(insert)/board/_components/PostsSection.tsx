"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { fetchPosts } from "@/app/api/api";
import { useBoardStore } from "@/lib/boardStore";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import SessionModal from "@/app/(service)/(landing)/_components/SessionModal";
import BoardRow from "./BoardRow";
import Pagination from "./Pagination";

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

    const [sessionModal, setSessionModal] = useState<boolean>(false);
    const { data: session } = useSession();

    function onClickHandler(
        e: React.MouseEvent<HTMLButtonElement>,
    ) {
        if (!session) {
            e.preventDefault();
            setSessionModal(true);
            return;
        }
    }

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

    // Form handling (일단 레이아웃만)
    type SearchFormValues = {
        searchQuery: string;
        searchType: string;
    };
    const { register, handleSubmit } = useForm<SearchFormValues>();

    return (
        <>
            {sessionModal && <SessionModal />}
            <div className="container mx-auto max-w-3xl p-4">
                {isLoading || isError ? (
                    <div className="rounded-md bg-gray-800 p-4 text-center text-white">
                        잠시 후 다시 시도해주십시오.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-12 gap-4 rounded-md bg-gray-800 p-4 text-xs text-white">
                            <div className="col-span-1">#</div>
                            <div className="col-span-5">제목</div>
                            <div className="col-span-2">글쓴이</div>
                            <div className="col-span-2">날짜</div>
                            <div className="col-span-1">조회수</div>
                            <div className="col-span-1">추천</div>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2 text-xs">
                            {posts && posts.length > 0
                                ? posts.map((post) => (
                                      <BoardRow key={post.id} {...post} />
                                  ))
                                : !isLoading && (
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
                            {session ? (
                                <Link
                                    href="/board/write"
                                    className="rounded-md border bg-gray-700 px-2 py-1 text-white"
                                >
                                    글쓰기
                                </Link>
                            ) : (
                                <button
                                    className="rounded-md border bg-gray-700 px-2 py-1 text-white"
                                    onClick={onClickHandler}
                                >
                                    글쓰기
                                </button>
                            )}
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
