import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
        message: "이메일을 입력하세요",
    }),
    password: z.string().min(8, {
        message: "최소 8자 이상의 비밀번호를 입력하세요",
    }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "이메일을 입력하세요",
    }),
    password: z.string().min(8, {
        message: "최소 8자 이상의 비밀번호를 입력하세요",
    }),
    username: z.string().min(1, {
        message: "이름을 입력하세요",
    }),
});

export const BettingSchema = z.object({
    point: z.number().min(100, {
        message: "100 포인트 이상을 입력하세요",
    }),
});
