"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import avatarImg from "@/public/mid.png";

export default function Page() {
	const { id } = useParams();

	// 목업 데이터
	const post = {
		id: Number(id),
		title: "도메인이 변경 됩니다 (ESPORTS.OP.GG)",
		author: "OP.GG Esports",
		date: "11.28 11:11",
		views: 6727,
		recommendation: 0,
		content: `안녕하세요 QWER.GG 입니다.

2022.11.28 부터 QWER.GG 에서 ESPORTS.OP.GG로 도메인이 변경됩니다.

이용에 착오 없으시길 바랍니다.

감사합니다.`,
	};
	return (
		<div className="max-w-4xl mx-auto p-4 text-white">
			<div className="bg-gray-800 p-6 rounded-md">
				<h1 className="text-2xl font-bold mb-4">{post.title}</h1>
				<div className="flex items-center mb-4">
					<div className="flex items-center mr-4">
						<Image
							src={avatarImg}
							alt="Author avatar"
							className="rounded-full mr-2"
							width={40}
							height={40}
						/>
						<span>{post.author}</span>
					</div>
					<span>{post.date}</span>
				</div>
				<div className="mb-4">
					{post.content.split("\n").map((line, index) => (
						<p key={index}>{line}</p>
					))}
				</div>
				<div className="flex justify-between items-center">
					<div>조회수 {post.views}</div>
					<div className="flex space-x-4">
						<button className="flex items-center space-x-1 border border-gray-600 p-2 rounded-md">
							<span>추천</span>
							<span>{post.recommendation}</span>
						</button>
						<button className="flex items-center space-x-1 border border-gray-600 p-2 rounded-md">
							<span>비추천</span>
							<span>0</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
