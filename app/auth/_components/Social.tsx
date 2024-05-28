"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "@/components/ui/button";

export const Social = () => {
    // const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get("callbackUrl");

    const googleSocialLogin = useGoogleLogin({
        scope: "email profile",
        onSuccess: async ({ code }) => {
            axios.post("http://localhost:3000/auth/google/callback", { code }).then(({ data }) => {
                console.log(data);
            });
        },
        onError: (errorResponse) => {
            console.error(errorResponse);
        },
        flow: "auth-code",
    });

    return (
        <div className='flex items-center w-full gap-x-2 pb-2'>
            <Button
                size='lg'
                className='w-full rounded-[10px]'
                variant='outline'
                onClick={googleSocialLogin}>
                <FcGoogle className='h-5 w-5 ' />
            </Button>
        </div>
    );
};
