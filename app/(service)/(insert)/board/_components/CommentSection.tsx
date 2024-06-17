"useClient";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "@/app/api/api";
import { Comment } from "@/model/board";
import { useCommentStore } from "@/lib/boardStore";

interface CommentSectionProps {
    postId: number;
}

const comments = [
    {
        id: 1,
        nickname: "ehdgkl23",
        content: "dd",
        createAt: "1y",
        likeCount: 0,
    },
    { id: 2, nickname: "ㅇㅇ", content: "ㅇㅋ", createAt: "1y", likeCount: 0 },
    { id: 3, nickname: "dfgfdg", content: "ds", createAt: "1y", likeCount: 0 },
    { id: 4, nickname: "ff", content: "zz", createAt: "2y", likeCount: 0 },
];

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

    return (
        <div className="mt-8 text-white">
            <h2 className="mb-4 text-xl font-bold">댓글</h2>
            <form className="mb-4 flex items-center rounded-md bg-gray-800">
                <div className="bg-gray-850 flex flex-col rounded-l rounded-r px-3 py-2 lg:flex-1 lg:rounded-r-none">
                    <textarea
                        className="scrollbar-hide text-t2 h-[64px] max-h-[64px] w-full resize-none bg-transparent placeholder:text-gray-400 focus:outline-none"
                        placeholder="바람직한 Esports 문화 정착을 위해 욕설, 과도한 비난을 지양합시다."
                        name="content"
                    ></textarea>
                </div>
                <div className="lg:bg-gray-850 mt-2 lg:mt-0 lg:rounded-r lg:p-2">
                    <button
                        type="submit"
                        className="lg:w-30 h-9 w-full select-none rounded border border-none bg-orange-500 text-center outline-none hover:bg-orange-400 active:bg-orange-400 lg:h-full"
                    >
                        작성
                    </button>
                </div>
            </form>
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
                                    추천 {comment.likeCount}
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
