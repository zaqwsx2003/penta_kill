import { ReactNode } from "react";
import Header from "./_components/Header";
import { auth } from "@/auth";

type Props = { children: ReactNode };
export default async function Layout({ children }: Props) {
    return (
        <div className="flex min-h-[100vh] flex-col">
            <Header />
            <div className="">{children}</div>
        </div>
    );
}
