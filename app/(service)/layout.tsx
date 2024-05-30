import { ReactNode } from "react";
import Header from "./_components/Header";
import { auth } from "@/auth";

type Props = { children: ReactNode };
export default async function Layout({ children }: Props) {
    const session = await auth();
    return (
        <div className='min-h-[100vh] flex flex-col'>
            <Header />
            <div className=''>{children}</div>
        </div>
    );
}
