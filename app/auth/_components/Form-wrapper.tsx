import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

import { Social } from "@/app/auth/_components/Social";

type FormWrapperProps = {
    children: ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
};

export default function FormWrapper({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: FormWrapperProps) {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <Link href={"/"} className="cursor-pointer">
                <Image
                    src="/dark_big_logo.png"
                    className="block"
                    width={500}
                    height={260}
                    alt="logo"
                />
            </Link>
            <div className="flex h-[600px] w-[400px] flex-col items-center justify-between rounded-[10px] bg-white px-12 py-10">
                <div className="w-full">
                    <h1 className="space-y-1.5 p-6 text-center text-3xl font-bold text-black">
                        {headerLabel}
                    </h1>
                    {children}
                    {showSocial && <Social />}
                </div>
                <Link
                    href={backButtonHref}
                    className="cursor-pointer text-black"
                >
                    {backButtonLabel}
                </Link>
            </div>
        </div>
    );
}
