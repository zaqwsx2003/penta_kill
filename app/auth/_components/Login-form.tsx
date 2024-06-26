"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schema";
import FormWrapper from "@/app/auth/_components/Form-wrapper";
import FormError from "@/app/auth/_components/Form-Error";
import FormSuccess from "@/app/auth/_components/Form-Success";
import FormButton from "@/app/auth/_components/FormButton";
import useCheckEmail from "@/app/auth/_lib/useSigninCheckEmail";

type LoginParams = z.infer<typeof LoginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>("");
    const [emailMessage, setEmailMessage] = useState<string | undefined>("");
    const [emailError, setEmailError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();
    const { checkEmailAvailability } = useCheckEmail({
        setEmailError,
        setEmailMessage,
    });

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
        const isEmailAvailable = await checkEmailAvailability(values.email);
        if (isEmailAvailable) {
            startTransition(async () => {
                const result = await signIn("credentials", {
                    redirect: false,
                    email: values.email as string,
                    password: values.password,
                });

                console.log(result);
                if (result?.error) {
                    setError(
                        "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
                    );
                } else {
                    setSuccess("로그인 성공");
                    router.push("/");
                }
            });
        } else {
            setError("해당 이메일이 존재하지 않습니다.");
        }
    };

    return (
        <FormWrapper
            headerLabel="환영합니다"
            backButtonLabel="계정이 없으신가요?"
            backButtonHref="/auth/register"
            showSocial
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center justify-between gap-10"
            >
                <div className="w-full">
                    <div className="flex h-[5rem] w-full flex-col">
                        <span className="dark:text-black">이메일</span>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            placeholder="gildong@gmail.com"
                            autoComplete="username"
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-black"
                        />
                        {errors.email && (
                            <span className="text-red-500">
                                {errors.email.message}
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
                            autoComplete="current-password"
                            className="rounded border border-gray-300 bg-white px-2 py-1 text-black"
                        />
                        {errors.password && (
                            <span className="text-red-500">
                                {errors.password.message}
                            </span>
                        )}
                        <div className="mt-5">
                            <FormError message={error} />
                            <FormSuccess message={success} />
                        </div>
                    </div>
                </div>
                <FormButton label="로그인" isPending={isPending} />
            </form>
        </FormWrapper>
    );
}
