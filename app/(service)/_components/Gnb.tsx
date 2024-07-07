"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { gnbRootList } from "@/routes";
import GnbItem from "@/app/(service)/_components/GnbItem";

export default function Gnb() {
    const path = usePathname();

    return (
        <aside className="fixed top-0 z-10 w-64 pt-20">
            <ul className="mainRoutes">
                {gnbRootList.map((item, i) => (
                    <GnbItem
                        route={item.route}
                        path={item.path}
                        currentPath={path === item.path}
                        key={i}
                    />
                ))}
            </ul>
        </aside>
    );
}
