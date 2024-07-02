import Header from "@/app/(service)/_components/Header";
import { LayoutProps } from "@/model/layout";
import SSEProvider from "../_components/SSEProvider";
import { useSession } from "next-auth/react";

export default async function Layout({ children }: LayoutProps) {
    const { data: session } = useSession();

    return (
        <div className="flex min-h-[100vh] flex-col">
            <Header />
            {session && <SSEProvider />}
            <div className="">{children}</div>
        </div>
    );
}
