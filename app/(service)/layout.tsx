import { ReactNode } from "react";
import Header from "./_components/Header";

type Props = { children: ReactNode };
export default function Layout({ children }: Props) {
    return (
        <div className='min-h-[100vh] flex flex-col'>
            <Header />
            <div className=''>{children}</div>
        </div>
    );
}
