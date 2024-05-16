"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MenuIcon } from "lucide-react";
import { gnbRootList } from "@/route";
import GnbItem from "./GnbItem";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ui/ModeToggle";
import useHeader from "../_lib/useHeader";
// import { useCategoryStore } from "../../store/useCategory";

export default function Header() {
    const path = usePathname();
    const { headerVisible } = useHeader();

    return (
        <header
            className={`sticky w-full transition-transform duration-300 ease-in-out ${
                headerVisible ? "translate-y-0" : "-translate-y-full"
            } top-0 left-0 z-50`}>
            <div className='bg-orange-400 h-20 flex items-center justify-between py-0 px-14 border-b'>
                <div className='max-w-[200px] cursor-pointer'>penta - kill</div>
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
                <div className='ml-10'>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}
