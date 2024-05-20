import { LayoutProps } from "@/model/layout";
import React, { ReactNode } from "react";

export default function layout({ children }: LayoutProps) {
    return <div className='flex h-[100dvh] flex-col items-center justify-center '>{children}</div>;
}
