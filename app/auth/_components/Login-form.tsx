"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import FormError from "@/app/auth/_components/Form-Error";
import FormSuccess from "@/app/auth/_components/Form-Success";
import { userLogin } from "@/app/api/api";
import { useSessionStore } from "@/lib/sessionStore";

import FormButton from "@/app/auth/_components/FormButton";
import { signIn } from "next-auth/react";

type LoginParams = z.infer<typeof LoginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginParams> = async (values) => {
        setError("");
        setSuccess("");
        const result = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            setSuccess("로그인 성공");
            router.push("/");
        }
    };

    return (
        <FormWrapper
            headerLabel='환영합니다'
            backButtonLabel='계정이 없으신가요?'
            backButtonHref='/auth/register'
            showSocial>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center justify-between w-full gap-10'>
                <div className='w-full'>
                    <div className='flex flex-col w-full h-[5rem]'>
                        <span className='dark:text-black'>이메일</span>
                        <input
                            type='text'
                            {...register("email", { required: "Email is required" })}
                            placeholder='gildong@gmail.com'
                            autoComplete='username'
                            className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                        />
                        {errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col w-full mt-4 h-[5rem]'>
                        <span className='dark:text-black'>비밀번호</span>
                        <input
                            type='password'
                            {...register("password", { required: "Password is required" })}
                            placeholder='********'
                            autoComplete='current-password'
                            className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                        />
                        {errors.password && (
                            <span className='text-red-500'>{errors.password.message}</span>
                        )}
                        <div className='mt-5'>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                    </div>
                </div>
                <FormButton label='로그인' isPending={isPending} />
            </form>
        </FormWrapper>
    );
}
