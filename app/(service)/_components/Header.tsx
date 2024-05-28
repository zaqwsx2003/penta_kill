"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { gnbRootList } from "@/routes";
import GnbItem from "@/app/(service)/_components/GnbItem";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/ui/ModeToggle";
import useHeader from "@/app/(service)/_lib/useHeader";

export default function Header() {
    const [token, setToken] = useState<string | null>(null);
    const [session, setSession] = useState<any>(null);
    const path = usePathname();
    const { headerVisible } = useHeader();
    const route = useRouter();

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await fetch("/api/auth/session");
                if (!response.ok) {
                    throw new Error("Failed to fetch session");
                }
                const data = await response.json();
                console.log("Session Data:", data);
                setSession(data.session);
            } catch (error) {
                console.error("Error fetching session:", error);
            }
        };

        fetchSession();

        const accessToken = Cookies.get("Access_Token");
        console.log("Access Token:", accessToken); // Access Token 출력
        setToken(accessToken || null);
    }, []); // 빈 배열을 의존성 배열로 설정하여 한 번만 실행되도록 함

    const routeRootPageHandler = () => {
        route.push("/");
    };

    const routeLoginPageHandler = () => {
        route.push("/auth/login");
    };

    const handleLogout = () => {
        Cookies.remove("Access_Token");
        setToken(null);
        route.push("/");
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
                    {token ? (
                        <div onClick={handleLogout}>로그아웃</div>
                    ) : (
                        <div onClick={routeLoginPageHandler}>로그인</div>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
