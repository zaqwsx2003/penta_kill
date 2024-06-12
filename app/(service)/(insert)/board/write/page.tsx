"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const schema = z.object({
	title: z.string().min(1, { message: "제목을 입력해주세요" }),
	content: z.string().min(1, { message: "내용을 입력해주세요" }),
});

type FormData = z.infer<typeof schema>;

export default function Page() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmitHandler: SubmitHandler<FormData> = (data) => {
		// API 연결하기
		console.log(data);
	};

	return (
		<div className="max-w-4xl mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">글쓰기</h1>
			<form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700">
						제목
					</label>
					<input
						id="title"
						type="text"
						{...register("title")}
						className={`mt-1 block w-full px-3 py-2 text-gray-700 bg-white rounded-md border ${
							errors.title ? "border-red-500" : "border-gray-600"
						}`}
					/>
					{errors.title && (
						<span className="text-red-500 text-xs">{errors.title.message}</span>
					)}
				</div>
				<div>
					<label htmlFor="content" className="block text-sm font-medium text-gray-700">
						내용
					</label>
					<Controller
						name="content"
						control={control}
						render={({ field }) => (
							<div
								className="quill-wrapper"
								style={{ position: "relative", height: "300px" }}>
								<ReactQuill
									theme="snow"
									value={field.value}
									onChange={field.onChange}
									style={{
										height: "calc(100% - 42px)",
										overflowY: "auto",
										backgroundColor: "white",
										color: "black",
									}}
									className={`mt-1 block w-full px-3 py-2 bg-gray-700 text-black rounded-md border ${
										errors.content ? "border-red-500" : "border-gray-600"
									}`}
								/>
							</div>
						)}
					/>
					{errors.content && (
						<span className="text-red-500 text-xs">{errors.content.message}</span>
					)}
				</div>
				<div>
					<button
						type="submit"
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
						등록
					</button>
				</div>
			</form>
		</div>
	);
}
