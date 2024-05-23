"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { useRouter } from "next/navigation";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/app/api/api";

type LoginParams = z.infer<typeof LoginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [showTwoFactor, setShowTwoFactor] = useState(false);
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

    const loginMutation = useMutation({
        mutationFn: userLogin,
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: Error) => {
            console.log(error);
            setError(error.message);
        },
    });

    const onSubmit: SubmitHandler<LoginParams> = (data) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            loginMutation.mutate(data);
        });
    };

    return (
        <FormWrapper
            headerLabel='환영합니다'
            backButtonLabel='계정이 없으신가요?'
            backButtonHref='/auth/register'
            showSocial>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center justify-center flex-grow w-full'>
                <div className='flex flex-col w-full '>
                    <span className='dark:text-black'>이메일</span>
                    <input
                        type='text'
                        {...register("email", { required: "Email is required" })}
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>비밀번호</span>
                    <input
                        type='password'
                        {...register("password", { required: "Password is required" })}
                        placeholder='********'
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                </div>
                <button className='bg-black border w-full px-10 py-2 rounded-[10px] mt-8'>
                    <span className='text-white'>로그인</span>
                </button>
            </form>
        </FormWrapper>
    );
}
