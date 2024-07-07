import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const NotFound: NextPage = () => {
    return (
        <div className="ml-auto flex h-screen flex-col items-center justify-center gap-y-5">
            <div className="text-5xl text-white">
                이 페이지는 존재하지 않습니다.
            </div>
            <div className="h-72 w-52">
                <Image
                    src="/light_big_logo.png"
                    className="dark:hidden"
                    alt="logo"
                />
            </div>
            <Button>
                <Link href="/">홈으로 돌아가기</Link>
            </Button>
        </div>
    );
};

export default NotFound;
