"use client";

import { gnbRootList } from "@/routes";
import React from "react";
import GnbItem from "./GnbItem";
import { usePathname } from "next/navigation";

export default function Gnb() {
    const path = usePathname();
    // const currentPath = path.split("/")[1];

    return (
        <aside className='fixed top-0 w-64 z-10 pt-20'>
            <ul className='mainRoutes'>
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
