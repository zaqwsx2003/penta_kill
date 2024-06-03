import Link from "next/link";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const NotFound: NextPage = () => {
    return (
        <div className='flex justify-center flex-col items-center ml-auto h-screen gap-y-5'>
            <div className='text-5xl'>이 페이지는 존재하지 않습니다.</div>
            <Image
                src='/dark_big_logo.png'
                className='dark:block hidden'
                width={200}
                height={260}
                alt='logo'
            />
            <Image
                src='/light_big_logo.png'
                className='dark:hidden'
                width={200}
                height={260}
                alt='logo'
            />
            <Button>
                <Link href='/'>홈으로 돌아가기</Link>
            </Button>
        </div>
    );
};

export default NotFound;
