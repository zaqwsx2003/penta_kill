"use client";

import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/form-wrapper";
import { useMutation } from "@tanstack/react-query";
import { userLogin, userRegister } from "@/app/api/api";

type RegisterParams = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
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
    } = useForm<RegisterParams>({
        mode: "onChange",
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const registerMutation = useMutation<RegisterParams, Error, RegisterParams>({
        mutationFn: userRegister,
        onSuccess: (data) => {
            loginMutation.mutate({ email: data.email, password: data.password });
        },
        onError: (error: Error) => {
            console.log(error);
            setError(error.message);
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

    const onSubmit: SubmitHandler<RegisterParams> = (data) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            registerMutation.mutate(data);
        });
    };

    return (
        <FormWrapper
            headerLabel='환영합니다'
            backButtonLabel='계정이 있으신가요?'
            backButtonHref='/auth/login'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center justify-center flex-grow w-full'>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>이름</span>
                    <input
                        type='text'
                        {...register("username", { required: "Name is required" })}
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                    {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>이메일</span>
                    <input
                        type='email'
                        {...register("email", { required: "Email is required" })}
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>비밀번호</span>
                    <input
                        type='password'
                        {...register("password", { required: "Password is required" })}
                        placeholder='********'
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                    {errors.password && (
                        <span className='text-red-500'>{errors.password.message}</span>
                    )}
                </div>
                <button
                    type='submit'
                    className='bg-black border w-full px-10 py-2 rounded-[10px] mt-8'>
                    <span className='text-white'>회원가입</span>
                </button>
                {error && <div className='text-red-500 mt-4'>{error}</div>}
                {success && <div className='text-green-500 mt-4'>{success}</div>}
            </form>
        </FormWrapper>
    );
}
