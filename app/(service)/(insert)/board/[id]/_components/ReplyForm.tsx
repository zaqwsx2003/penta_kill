"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { Session } from "next-auth";

const schema = z.object({
    content: z
        .string()
        .min(1, { message: "댓글을 입력해주세요" })
        .max(1000, { message: "댓글은 최대 1000자까지 입력 가능합니다." }),
});

type FormData = z.infer<typeof schema>;

interface ReplyFormProps {
    postId: number;
    commentId: number;
    session: Session | null;
}

export default function ReplyForm({
    postId,
    commentId,
    session,
}: ReplyFormProps) {
    const axiosAuth = useAxiosAuth();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const addReplyMutation = useMutation({
        mutationFn: async (data: { content: string }) => {
            console.log("대댓글 등록", data, postId, commentId);
            const response = await axiosAuth.post(
                `/posts/${postId}/comments/${commentId}/replies`,
                {
                    content: data.content,
                },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["replies", commentId] });
            reset();
        },
        onError: (error) => {
            console.error("댓글오류:", error);
        },
    });

    const onSubmitHandler: SubmitHandler<FormData> = (data) => {
        addReplyMutation.mutate(data);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="mt-4 flex items-center rounded-[10px] bg-card"
            >
                <div className="flex flex-grow flex-col rounded-[10px] rounded-r px-3 py-2 lg:rounded-r-none">
                    <textarea
                        {...register("content")}
                        className="scrollbar-hide text-t2 h-[64px] max-h-[64px] w-full resize-none bg-transparent placeholder:text-gray-400 focus:outline-none"
                        placeholder="대댓글을 입력하세요."
                        name="content"
                    ></textarea>
                    {errors.content && (
                        <span className="text-xs text-red-500">
                            {errors.content.message}
                        </span>
                    )}
                </div>
                <div className="lg:bg-gray-850 flex-shrink-0 lg:mt-0 lg:rounded-r lg:p-2">
                    <button
                        type="submit"
                        className="w-30 my-auto mr-2 h-full select-none rounded border border-none bg-orange-500 px-5 py-4 text-center outline-none hover:bg-orange-400 active:bg-orange-400"
                    >
                        등록
                    </button>
                </div>
            </form>
        </>
    );
}
