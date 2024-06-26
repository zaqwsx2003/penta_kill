import Link from "next/link";
import { Post } from "@/model/board";

export default function BoardRow({
    id,
    title,
    content,
    isLike,
    likeCount,
    dislikeCount,
    commentCount,
    createAt,
    nickname,
}: Post) {
    const date = new Date(createAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });

    return (
        <div className="grid grid-cols-12 gap-4 border-b border-zinc-700 p-4 text-xs text-white">
            <div className="col-span-1">{id}</div>
            <div className="col-span-4">
                <Link href={`/board/${id}`}>
                    <span className="truncate hover:underline">{title}</span>
                    {commentCount > 0 ? (
                        <span className="ml-3 font-bold">{commentCount}</span>
                    ) : null}
                </Link>
            </div>
            <div className="col-span-2">{nickname}</div>
            <div className="col-span-3">{date}</div>
            <div className="col-span-1">{likeCount}</div>
            <div className="col-span-1">{dislikeCount}</div>
        </div>
    );
}
