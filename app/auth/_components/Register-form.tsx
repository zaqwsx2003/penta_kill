"use client";

import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import FormError from "@/app/auth/_components/Form-Error";
import FormSuccess from "@/app/auth/_components/Form-Success";
import useRegisterMutation from "@/app/auth/_lib/useRegisterMutation";
import useCheckEmail from "@/app/auth/_lib/useRegisterCheckEmail";

export type RegisterParams = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const [emailMessage, setEmailMessage] = useState<string | undefined>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean | null>(null);
    const [registerParams, setRegisterParams] = useState<RegisterParams | null>(
        null,
    );
    const { mutation } = useRegisterMutation({
        registerParams,
        setSuccess,
        setError,
        onSuccess: async () => {
            if (registerParams) {
                await signIn("credentials", {
                    redirect: false,
                    email: registerParams.email,
                    password: registerParams.password,
                });
                router.push("/");
            }
        },
    });

    const { checkEmailAvailability } = useCheckEmail({
        setEmailMessage,
        setIsEmailValid,
        setError,
    });

    const {
        register,
        handleSubmit,
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

    const handleEmailBlur = async (
        event: React.FocusEvent<HTMLInputElement>,
    ) => {
        const email = event.target.value;
        if (email) {
            await checkEmailAvailability(email);
        }
    };

    const onSubmit: SubmitHandler<RegisterParams> = (values) => {
        setError("");
        setSuccess("");
        setRegisterParams(values);

        startTransition(async () => {
            if (isEmailValid) {
                mutation.mutate(values);
            }
        });
    };
    return (
        <FormWrapper
            headerLabel="회원가입"
            backButtonLabel="계정이 있으신가요?"
            backButtonHref="/auth/login"
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-grow flex-col items-center justify-center"
            >
                <div className="mt-4 flex h-[5rem] w-full flex-col">
                    <span className="dark:text-black">이름</span>
                    <input
                        type="text"
                        {...register("username", {
                            required: "Name is required",
                        })}
                        placeholder="홍길동"
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-black"
                    />
                    {errors.username && (
                        <span className="text-red-500">
                            {errors.username.message}
                        </span>
                    )}
                </div>
                <div className="mt-4 flex h-[5rem] w-full flex-col">
                    <span className="dark:text-black">이메일</span>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        placeholder="gildong@gmail.com"
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-black"
                        onBlur={handleEmailBlur}
                    />
                    {emailMessage ? (
                        <span className="text-red-500">{emailMessage}</span>
                    ) : (
                        <span className="text-red-500">
                            {errors?.email?.message}
                        </span>
                    )}
                </div>
                <div className="mt-4 flex h-[5rem] w-full flex-col">
                    <span className="dark:text-black">비밀번호</span>
                    <input
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                        placeholder="********"
                        className="rounded border border-gray-300 bg-white px-2 py-1 text-black"
                    />
                    {errors.password && (
                        <span className="text-red-500">
                            {errors.password.message}
                        </span>
                    )}
                    <div className="mt-3">
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                </div>
                <button
                    type="submit"
                    className="mt-12 w-full rounded-[10px] border bg-black px-10 py-2"
                    disabled={isPending || isEmailValid === false}
                >
                    <span className="text-white">회원가입</span>
                </button>
            </form>
        </FormWrapper>
    );
}
