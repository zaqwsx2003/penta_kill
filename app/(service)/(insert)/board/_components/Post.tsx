interface PostCardProps {
	index: number;
	title: string;
	author: string;
	date: string;
	views: number;
	comments: number;
	recommendation: number;
}

const PostCard: React.FC<PostCardProps> = ({
	index,
	title,
	author,
	date,
	views,
	comments,
	recommendation,
}) => (
	<div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 text-white">
		<div className="col-span-1">{index}</div>
		<div className="col-span-5">
			{title} [{comments}]
		</div>
		<div className="col-span-2">{author}</div>
		<div className="col-span-2">{date}</div>
		<div className="col-span-1">{views}</div>
		<div className="col-span-1">{recommendation}</div>
	</div>
);

export default PostCard;
