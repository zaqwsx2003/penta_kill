"use client";

import React, { useState, useTransition } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import { useMutation } from "@tanstack/react-query";
import FormError from "./Form-Error";
import FormSuccess from "./Form-Success";
import { userRegister } from "@/app/api/api";
import { signIn } from "next-auth/react";

type RegisterParams = z.infer<typeof RegisterSchema>;

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

    const checkEmailAvailability = async (email: string) => {
        try {
            const response = await fetch("/api/checkEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            const stauts = await response.status;
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                if (response.status === 200) {
                    setEmailMessage(data.message);
                    setIsEmailValid(true);
                }
            } else {
                setEmailMessage(data.message);
                setIsEmailValid(false);
                return false;
            }
        } catch (error) {
            setError("잘못된 요청 입니다.");
            setIsEmailValid(false);
            return false;
        }
    };

    const mutation = useMutation({
        mutationFn: userRegister,
        onSuccess: () => {
            if (registerParams) {
                signIn("credentials", {
                    redirect: false,
                    email: registerParams.email,
                    password: registerParams.password,
                });
            }
            router.push("/");
            setSuccess("");
        },
        onError: (error: Error) => {
            console.log(error);
            setError(error.message);
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
            if (isEmailValid) mutation.mutate(values);
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
