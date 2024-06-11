import Link from "next/link";
interface PostCardProps {
	index: number;
	id: number;
	title: string;
	author: string;
	date: string;
	views: number;
	comments: number;
	recommendation: number;
}

export default function Post({
	index,
	id,
	title,
	author,
	date,
	views,
	comments,
	recommendation,
}: PostCardProps) {
	return (
		<div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-white text-xs">
			<div className="col-span-1">{index}</div>
			<div className="col-span-5">
				<Link href={`/board/${id}`}>
					<span className="hover:underline">
						{title} [{comments}]
					</span>
				</Link>
			</div>
			<div className="col-span-2">{author}</div>
			<div className="col-span-2">{date}</div>
			<div className="col-span-1">{views}</div>
			<div className="col-span-1">{recommendation}</div>
		</div>
	);
}
