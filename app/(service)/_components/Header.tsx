"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

import { gnbRootList } from "@/routes";
import GnbItem from "@/app/(service)/_components/GnbItem";
import useHeader from "@/app/(service)/_lib/useHeader";
import Spinner from "@/app/(service)/_components/Spinner";
import UserModal from "@/app/(service)/_components/UserModal";
import useModalRef from "@/app/(service)/_lib/useModalRef";

export default function Header() {
    const path = usePathname();
    const { headerVisible } = useHeader();
    const route = useRouter();
    const { data: session, status } = useSession();
    const [userMenu, setUserMenu] = useState(false);
    const loading = status === "loading";
    const userMenuRef = useRef<HTMLDivElement>(null);

    const rootRoutePageHandler = () => {
        route.push("/");
    };

    useModalRef({
        refs: { userMenuRef },
        setState: setUserMenu,
    });

    const userModalHandler = () => {
        setUserMenu((prev) => !prev);
    };

    return (
        <header
            className={`sticky transition-transform duration-300 ease-in-out ${
                headerVisible ? "translate-y-0" : "-translate-y-full"
            } left-0 top-0 z-50`}
        >
            <div className="flex h-20 flex-row items-center justify-between border-b bg-orange-400 px-14 py-0">
                <Link
                    href="/"
                    className="max-w-[200px] cursor-pointer"
                    onClick={rootRoutePageHandler}
                >
                    <Image
                        src="/dark_small_logo.png"
                        className="block"
                        alt="logo"
                        width={200}
                        height={40}
                        priority={true}
                    />
                </Link>
                <div className="w-100 flex flex-grow justify-center gap-10">
                    {gnbRootList.map((item, i) => (
                        <GnbItem
                            route={item.route}
                            path={item.path}
                            currentPath={path === item.path}
                            key={i}
                        />
                    ))}
                </div>
                <div className="ml-10 flex flex-row items-center gap-5">
                    {!loading && session ? (
                        <>

                            <motion.div
                                className="relative"
                                ref={userMenuRef}
                                whileTap={{ scale: 0.97 }}
                            >
                                <Image
                                    src="/blank-avatar.webp"
                                    width={40}
                                    height={40}
                                    alt="avatar"
                                    className="cursor-pointer rounded-full hover:border-2 hover:border-indigo-500"
                                    onClick={userModalHandler}
                                />
                                <AnimatePresence>
                                    {userMenu && <UserModal />}
                                </AnimatePresence>
                            </motion.div>
                        </>
                    ) : loading ? (
                        <Spinner />
                    ) : (
                        <Link
                            href="/auth/login"
                            className="text-white ease-in-out hover:font-bold"
                        >
                            로그인
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
