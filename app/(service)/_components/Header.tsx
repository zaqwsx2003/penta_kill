"use client";

import React from "react";
import Image from "next/image";
import { gnbRootList } from "@/routes";
import GnbItem from "@/app/(service)/_components/GnbItem";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/ModeToggle";
import useHeader from "@/app/(service)/_lib/useHeader";
import { useSessionStore } from "@/lib/sessionStore";

export default function Header() {
    const session = useSessionStore((state) => state.session);
    const token = useSessionStore((state) => state.accessToken);
    const path = usePathname();
    const { headerVisible } = useHeader();
    const route = useRouter();

    const routeRootPageHandler = () => {
        route.push("/");
    };

    const routeLoginPageHandler = () => {
        route.push("/auth/login");
    };

    return (
        <header
            className={`sticky w-full transition-transform duration-300 ease-in-out ${
                headerVisible ? "translate-y-0" : "-translate-y-full"
            } top-0 left-0 z-50`}>
            <div className='bg-white dark:bg-orange-400 h-20 flex items-center justify-between py-0 px-14 border-b'>
                <div className='max-w-[200px] cursor-pointer' onClick={routeRootPageHandler}>
                    <Image
                        src='/light_small_logo.png'
                        className='dark:hidden'
                        alt='logo'
                        width={200}
                        height={40}
                        priority={true}
                    />
                    <Image
                        src='/dark_small_logo.png'
                        className='hidden dark:block'
                        alt='logo'
                        width={200}
                        height={40}
                        priority={true}
                    />
                </div>
                <div className='flex-1 text-center w-auto'>
                    {gnbRootList.map((item, i) => (
                        <GnbItem
                            route={item.route}
                            path={item.path}
                            currentPath={path === item.path}
                            key={i}
                        />
                    ))}
                </div>
                <div className='flex flex-row items-center gap-5 ml-10 cursor-pointer'>
                    <div onClick={routeLoginPageHandler}>로그인</div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
