"use server";

import { z } from "zod";
import instance from "@/app/api/instance";
import { LoginSchema } from "@/schema";

export default async function serverActionLogin(values: z.infer<typeof LoginSchema>) {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        throw new Error("로그인에 문제가 발생했습니다.");
    }

    const { email, password } = validatedFields.data;

    try {
        const response = await instance.post("/user/login", {
            email,
            password,
        });

        if (response.data.success) {
            return { success: "로그인 성공" };
        } else {
            throw new Error("로그인에 문제가 발생했습니다.");
        }
    } catch (error) {
        throw new Error("로그인에 문제가 발생했습니다.");
    }
}
