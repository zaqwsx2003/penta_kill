"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { Social } from "@/app/auth/_components/social";

export default function LoginForm() {
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            login(values)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }

                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }

                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <div>
            <div className='w-[400px] h-[400px] bg-white rounded-[10px] flex flex-col items-center py-10 px-5'>
                <h1 className='dark:text-black text space-y-1.5 p-6 text-3xl font-bold text-center'>
                    환영합니다
                </h1>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col items-center justify-center flex-grow w-full'>
                    <div className='flex flex-col w-full px-6'>
                        <span className='dark:text-black'>이메일</span>
                        <input
                            name='email'
                            className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                        />
                    </div>
                    <div className='flex flex-col w-full px-6 mt-4'>
                        <span className='dark:text-black'>비밀번호</span>
                        <input
                            name='password'
                            type='password'
                            placeholder='******'
                            className='border bg-white border-gray-300 rounded px-2 py-1 text-black'
                        />
                    </div>
                </form>
                <span className='text-black'>계정이 없으신가요?</span>
                <Social />
            </div>
        </div>
    );
}
