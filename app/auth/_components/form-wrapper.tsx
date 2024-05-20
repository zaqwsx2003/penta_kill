import { LayoutProps } from "@/model/layout";
import React, { Children, ReactNode } from "react";
import { Social } from "@/app/auth/_components/social";
import Link from "next/link";

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
        <div>
            <div className='w-[400px] h-[500px] bg-white rounded-[10px] flex flex-col items-center py-10 px-12'>
                <h1 className='dark:text-black text space-y-1.5 p-6 text-3xl font-bold text-center'>
                    {headerLabel}
                </h1>
                {children}
                {showSocial && <Social />}
                <Link href={backButtonHref} className='text-black cursor-pointer'>
                    {backButtonLabel}
                </Link>
            </div>
        </div>
    );
}
