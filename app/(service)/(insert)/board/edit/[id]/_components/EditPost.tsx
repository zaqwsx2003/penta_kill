"use client";

import PostForm from "../../../write/_components/PostForm";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchPost } from "@/app/api/api";

export default function EditPost() {
    const { id } = useParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchPost(Number(id)),
    });

    const post = data?.data;
    console.log(post);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading post</div>;

    return (
      <>
        <PostForm initialData={post} />
      </>
    );
}
