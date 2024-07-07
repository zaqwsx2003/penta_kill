"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const schema = z.object({
    title: z.string().min(1, { message: "제목을 입력해주세요" }),
    content: z.string().min(1, { message: "내용을 입력해주세요" }),
});

type FormData = z.infer<typeof schema>;

interface PostFormProps {
    initialData?: FormData;
    postId?: number;
}

const modules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["image", "video"],
        // ["clean"],
    ],
};

export default function PostForm({ initialData, postId }: PostFormProps) {
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const imgInputRef = useRef<HTMLInputElement>(null);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
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

    const imageUploadHandler = async (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (!file.type.startsWith("image/")) {
                alert("이미지 파일만 업로드할 수 있습니다.");
                return;
            }
            try {
                const formData = new FormData();
                formData.append("files", file);

                const response = await axiosAuth.post<{
                    statusCode: number;
                    message: string;
                    data: string[];
                }>("/posts/images", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (
                    response.data &&
                    response.data.data &&
                    response.data.data.length > 0
                ) {
                    const imageUrl = response.data.data[0];
                    const currentContent = getValues("content") || "";
                    setValue(
                        "content",
                        `${currentContent}<img src="${imageUrl}" alt="Uploaded Image" />`,
                    );
                } else {
                    throw new Error("Image upload failed");
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    function imgInputBtnHandler() {
        if (imgInputRef.current) {
            imgInputRef.current.click();
        }
    }

    const onSubmitHandler: SubmitHandler<FormData> = async (data) => {
        try {
            if (initialData) {
                const response = await axiosAuth.put(`/posts/${postId}`, data);
                router.push(`/board/${postId}`);
            } else {
                const response = await axiosAuth.post("/posts", data);
                router.push("/board");
            }
        } catch (err) {
            throw err;
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmitHandler)}
                className="space-y-4"
            >
                <div className="flex space-x-4">
                    <div className="flex-grow">
                        <input
                            id="title"
                            type="text"
                            placeholder="제목을 입력해주세요."
                            {...register("title")}
                            className={`mt-1 block w-full border px-3 py-2 ${
                                errors.title
                                    ? "border-red-500"
                                    : "border-gray-300"
                            } rounded-md shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 sm:text-sm`}
                        />
                        {errors.title && (
                            <span className="text-xs text-red-500">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <Controller
                        name="content"
                        control={control}
                        render={({ field }) => (
                            <div className="quill-wrapper relative h-[400px] rounded-md border border-gray-300">
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={field.onChange}
                                    modules={modules}
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
                    <input
                        id="fileUpload"
                        type="file"
                        accept="image/*"
                        ref={imgInputRef}
                        onChange={imageUploadHandler}
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={imgInputBtnHandler}
                        className="mt-1 block w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-zinc-500"
                    >
                        사진 선택
                    </button>
                </div>
                <div className="flex justify-center">
                    <button
                        type="button"
                        className="mr-4 w-24 rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-400"
                    >
                        돌아가기
                    </button>
                    <button
                        type="submit"
                        className="w-24 rounded bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-400"
                    >
                        {initialData ? "수정" : "등록"}
                    </button>
                </div>
            </form>
        </div>
    );
}
