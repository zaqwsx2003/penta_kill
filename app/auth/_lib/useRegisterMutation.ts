"use client";

import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import useAxiosAuth from "@/lib/axiosHooks/useAxiosAuth";
import { RegisterParams } from "../_components/Register-form";

// export type RegisterParams = {
//     username: string;
//     email: string;
//     password: string;
// };

type RegisterMutationProps = {
    registerParams: RegisterParams | null;
    setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
    setError: React.Dispatch<React.SetStateAction<string | undefined>>;
    onSuccess?: () => void;
};

export default function useRegisterMutation({
    registerParams,
    setSuccess,
    setError,
    onSuccess,
}: RegisterMutationProps) {
    const axiosAuth = useAxiosAuth();
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: async (params: RegisterParams) => {
            try {
                const response = await axiosAuth.post("/users/signup", {
                    username: params?.username,
                    email: params?.email,
                    password: params?.password,
                });
                return response.data;
            } catch (error) {
                throw new Error();
            }
        },
        onSuccess: () => {
            setSuccess("");
            if (onSuccess) onSuccess();
        },
        onError: (error: Error) => {
            console.log(error);
            setError(error.message);
        },
    });
    return { mutation };
}
