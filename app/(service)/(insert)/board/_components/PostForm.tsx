"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useEffect } from "react";
import PostForm from "../_components/PostForm";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const schema = z.object({
    title: z.string().min(1, { message: "제목을 입력해주세요" }),
    content: z.string().min(1, { message: "내용을 입력해주세요" }),
});

type FormData = z.infer<typeof schema>;

export default function PostFOrm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .quill-wrapper .ql-toolbar {
      position: sticky;
      top: 0;
      z-index: 10;
      background: white;
      }
      .quill-wrapper .ql-container {
      height: calc(100% - 42px);
      overflow-y: auto;
      }
  `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const onSubmitHandler: SubmitHandler<FormData> = (data) => {
        // API 연결하기
        console.log(data);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-4"
            >
                <div className="flex space-x-4">
                    <div className="w-1/4">
                        <select
                            id="category"
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        >
                            <option>분류1</option>
                            <option>분류2</option>
                            <option>분류3</option>
                        </select>
                    </div>
                    <div className="relative flex-grow">
                        <label
                            htmlFor="title"
                            className="absolute left-3 top-1/2 -translate-y-1/2 transform text-sm font-medium text-gray-700"
                        >
                            제목
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title")}
                            className={`mt-1 block w-full border px-3 py-2 pl-16 ${
                                errors.title
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                        />
                        {errors.title && (
                            <span className="text-xs text-red-500">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="content"
                        className="block text-sm font-medium text-gray-700"
                    >
                        내용
                    </label>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <div
                                className="quill-wrapper relative h-[400px] rounded-md border border-gray-300" // 수정: TailwindCSS 클래스로 변환
                            >
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    className={`h-full rounded-md bg-white text-black ${
                                        errors.content
                                            ? "border-red-500"
                                            : "border-gray-300"
                                    }`}
                                />
                            </div>
                        )}
                    />
                    {errors.content && (
                        <span className="text-xs text-red-500">
                            {errors.content.message}
                        </span>
                    )}
                </div>
                <div className="mt-4">
                    <label
                        htmlFor="fileUpload"
                        className="block text-sm font-medium text-gray-700"
                    >
                        사진 선택
                    </label>
                    <input
                        id="fileUpload"
                        type="file"
                        className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                    />
                </div>
                <div className="relative flex flex-1 justify-center space-x-4">
                    <button
                        type="button"
                        className="w-24 rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                    >
                        미리 보기
                    </button>
                    <button
                        type="submit"
                        className="w-24 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-700"
                    >
                        등록
                    </button>
                    <button
                        type="button"
                        className="absolute right-0 w-24 rounded-md bg-gray-300 px-4 py-2 text-black hover:bg-gray-400"
                    >
                        돌아가기
                    </button>
                </div>
            </form>
        </div>
    );
}
