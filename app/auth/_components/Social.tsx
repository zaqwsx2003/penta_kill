"use client";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
    const onClick = (provider: "google" | "github") => {
        signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
    };

    return (
        <div className="flex w-full items-center gap-x-2 pb-2">
            <Button
                size="lg"
                className="w-full rounded-[10px]"
                variant="outline"
                onClick={() => onClick("google")}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    );
};
