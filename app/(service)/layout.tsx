import Header from "@/app/(service)/_components/Header";
import { LayoutProps } from "@/model/layout";
import SSEProvider from "../_components/SSEProvider";

export default async function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-[100vh] flex-col">
            <Header />
            {/* <SSEProvider /> */}
            <div className="">{children}</div>
        </div>
    );
}
