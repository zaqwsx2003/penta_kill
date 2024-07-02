import Header from "@/app/(service)/_components/Header";
import { LayoutProps } from "@/model/layout";

export default async function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-[100vh] flex-col">
            <Header />
            <div className="">{children}</div>
        </div>
    );
}
