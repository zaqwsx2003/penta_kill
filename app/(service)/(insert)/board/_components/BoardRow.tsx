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
    views,
    createdAt,
    modifiedAt,
    nickname,
}: Post) {
    return (
        <div className="grid grid-cols-12 gap-4 border-b border-gray-700 p-4 text-xs text-white">
            <div className="col-span-1">{id}</div>
            <div className="col-span-5">
                <Link href={`/board/${id}`}>
                    <span className="hover:underline">{title}</span>
                </Link>
            </div>
            <div className="col-span-2">{nickname}</div>
            <div className="col-span-2">{createdAt}</div>
            <div className="col-span-1">{views}</div>
            <div className="col-span-1">{likeCount}</div>
        </div>
    );
}
