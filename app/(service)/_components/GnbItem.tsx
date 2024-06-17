"use client";

import { useState } from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { menuActivate } from "@/app/(service)/_components/style";

export default function GnbItem({
    route,
    path,
    currentPath,
}: {
    route: string;
    path: string;
    currentPath: boolean;
}) {
    const [mouseHover, setMouseHover] = useState(false);
    const onMouseHandler = () => {
        setMouseHover((prev) => !prev);
    };

    return (
        <>
            <div
                className="relative h-fit w-fit"
                onMouseEnter={onMouseHandler}
                onMouseLeave={onMouseHandler}
            >
                <Link href={path} className="relative text-white">
                    <div className="text-lg">{route}</div>
                    <span
                        className={`${cn(menuActivate({ currentPath, mouseHover }))} `}
                    />
                </Link>
            </div>
        </>
    );
}
