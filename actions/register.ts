"use server";

import instance from "@/app/api/instance";
import { z } from "zod";
import { RegisterSchema } from "@/schema";

export default async function serverActionRegister(values: z.infer<typeof RegisterSchema>) {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "회원가입에 문제가 발생했습니다." };
    }

    const { email, password, username } = validatedFields.data;

    try {
        const response = await instance.post("/user/register", {
            email,
            password,
            username,
        });

        if (response.data.success) {
            return { success: "회원가입 성공" };
        } else {
            throw new Error("회원가입에 문제가 발생했습니다.");
        }
    } catch (error) {
        return { error: "회원가입에 문제가 발생했습니다." };
    }
}
