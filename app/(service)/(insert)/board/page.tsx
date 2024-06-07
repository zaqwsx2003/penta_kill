"use client";

import { useState } from "react";
import Link from "next/link";
import Post from "./_components/Post";
import Pagination from "./_components/Pagination";

const BoardPage = () => {
	const mockPosts = Array.from({ length: 50 }, (_, i) => ({
		id: i + 1,
		title: `Post ${i + 1}`,
		author: `Author ${i + 1}`,
		date: `2023-01-0${(i % 10) + 1}`,
		views: 100 + i * 10,
		comments: i * 2,
		recommendation: i % 5,
	}));

	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;
	const totalPages = Math.ceil(mockPosts.length / postsPerPage);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = mockPosts.slice(indexOfFirstPost, indexOfLastPost);

	const pageChangeHandler = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="container max-w-3xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">펜타톡</h1>
			<div className="grid grid-cols-12 gap-4 bg-gray-800 text-white p-4 rounded-md text-xs">
				<div className="col-span-1">#</div>
				<div className="col-span-5">제목</div>
				<div className="col-span-2">글쓴이</div>
				<div className="col-span-2">날짜</div>
				<div className="col-span-1">조회수</div>
				<div className="col-span-1">추천</div>
			</div>
			<div className="grid grid-cols-1 gap-2 mt-2 text-xs">
				{currentPosts.map((post, index) => (
					<Post key={post.id} index={indexOfFirstPost + index + 1} {...post} />
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={pageChangeHandler}
			/>
		</div>
	);
};

export default BoardPage;
