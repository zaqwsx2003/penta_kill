import Link from "next/link";
import { Post } from "@/model/board";

interface BoardRowProps extends Post {
    isLast: boolean;
}

export default function BoardRow({
    id,
    title,
    content,
    isLike,
    likeCount,
    dislikeCount,
    commentCount,
    createdAt,
    nickname,
    isLast,
    views,
}: BoardRowProps) {
    const date = new Date(createdAt).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long",
    });

    return (
        <div
            className={`grid-cols-13 grid gap-4 p-4 text-sm ${
                isLast ? "border-none" : "border-b border-zinc-900"
            }`}
        >
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
            <div className="col-span-1">{views}</div>
            <div className="col-span-1">{likeCount}</div>
            <div className="col-span-1">{dislikeCount}</div>
        </div>
    );
}
