"use client";

import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import { useMutation } from "@tanstack/react-query";
import serverActionRegister from "@/actions/register";
import FormError from "./Form-Error";
import FormSuccess from "./Form-Success";

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

    const mutation = useMutation({
        mutationFn: serverActionRegister,
        onSuccess: () => {
            router.push("/");
        },
        onError: (error: Error) => {
            console.log(error);
            setError(error.message);
        },
    });

    const onSubmit: SubmitHandler<RegisterParams> = (values) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            mutation.mutate(values);
        });
    };

    return (
        <FormWrapper
            headerLabel='회원가입'
            backButtonLabel='계정이 있으신가요?'
            backButtonHref='/auth/login'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center justify-center flex-grow w-full'>
                <div className='flex flex-col w-full mt-4 h-[5rem]'>
                    <span className='dark:text-black'>이름</span>
                    <input
                        type='text'
                        {...register("username", { required: "Name is required" })}
                        placeholder='홍길동'
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                    {errors.username && (
                        <span className='text-red-500'>{errors.username.message}</span>
                    )}
                </div>
                <div className='flex flex-col w-full mt-4 h-[5rem]'>
                    <span className='dark:text-black'>이메일</span>
                    <input
                        type='email'
                        {...register("email", { required: "Email is required" })}
                        placeholder='gildong@gmail.com'
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                    {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='flex flex-col w-full mt-4 h-[5rem]'>
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
                    <div className='mt-3'>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                </div>
                <button
                    type='submit'
                    className='bg-black border w-full px-10 py-2 rounded-[10px] mt-12'
                    disabled={isPending}>
                    <span className='text-white'>회원가입</span>
                </button>
            </form>
        </FormWrapper>
    );
}
