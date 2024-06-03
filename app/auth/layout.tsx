import { LayoutProps } from "@/model/layout";
import React, { ReactNode } from "react";
import Header from "@/app/(service)/_components/Header";
import { ModeToggle } from "@/components/ui/ModeToggle";

export default function layout({ children }: LayoutProps) {
    return (
        <div className=''>
            <div className='flex items-center justify-end h-20 pr-[4.6rem]'>
                <ModeToggle />
            </div>

            {children}
        </div>
    );
}
