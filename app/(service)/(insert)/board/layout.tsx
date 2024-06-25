import { LayoutProps } from "@/model/layout";
import { ReactNode } from "react";

export default function Layout({ children }: LayoutProps) {
    return <div>{children}</div>;
}
