import { ReactNode } from "react";
import Header from "./_components/Header";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
    return (
        <div className='min-h-[100vh] flex flex-col'>
            <Header />
            <div className='relative flex-1 max-w-screen-lg mx-auto py-4'>{children}</div>
        </div>
    );
}
