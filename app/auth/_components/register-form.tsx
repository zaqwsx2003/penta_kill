"use client";

import React, { useState, useTransition } from "react";
import { Form, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/form-wrapper";

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
    } = useForm<z.infer<typeof LoginSchema>>({
        mode: "onChange",
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const routeLoginHandler = () => {
        router.push("/auth/login");
    };

    const onSubmit = () => {
        setError("");
        setSuccess("");

        startTransition(() => {});
    };
    
    return (
        <FormWrapper
            headerLabel='환영합니다'
            backButtonLabel='계정이 있으신가요?'
            backButtonHref='/auth/login'>
            <form className='flex flex-col items-center justify-center flex-grow w-full'>
                <div onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>이름</span>
                    <input
                        type='text'
                        {...(register("email"), { required: true })}
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>이메일</span>
                    <input className='border bg-white border-gray-300 rounded px-2 py-1 text-black' />
                </div>
                <div className='flex flex-col w-full mt-4'>
                    <span className='dark:text-black'>비밀번호</span>
                    <input
                        type='password'
                        {...(register("password"), { required: true })}
                        placeholder='********'
                        className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                    />
                </div>
                <button className=' bg-black border w-full px-10 py-2 rounded-[10px] mt-8'>
                    <span className='text-white'>회원가입</span>
                </button>
            </form>
        </FormWrapper>
    );
}
