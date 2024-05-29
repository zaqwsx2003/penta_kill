import React, { ReactNode } from "react";
import { Social } from "@/app/auth/_components/Social";
import Link from "next/link";
import Image from "next/image";

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
        <div className='flex flex-col items-center justify-center'>
            <Link href={"/"}>
                <Image
                    src='/dark_big_logo.png'
                    className='dark:block hidden'
                    width={500}
                    height={260}
                    alt='logo'
                />
                <Image
                    src='/light_big_logo.png'
                    className='dark:hidden'
                    width={500}
                    height={260}
                    alt='logo'
                />
            </Link>

            <div className='w-[400px] h-[600px] bg-white rounded-[10px] flex flex-col justify-between items-center py-10 px-12'>
                <div className='w-full'>
                    <h1 className='dark:text-black text space-y-1.5 p-6 text-3xl font-bold text-center'>
                        {headerLabel}
                    </h1>
                    {children}
                    {showSocial && <Social />}
                </div>
                <Link href={backButtonHref} className='text-black cursor-pointer'>
                    {backButtonLabel}
                </Link>
            </div>
        </div>
    );
}
