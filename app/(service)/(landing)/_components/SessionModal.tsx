import Link from "next/link";
import React from "react";

export default function SessionModal() {
    return (
        <>
            <div className='fixed flex items-center justify-center inset-0 z-40 bg-black bg-opacity-50'>
                <div className='z-50  mx-auto items-center justify-center bg-white w-40 h-40'>
                    <div>로그인 후 사용가능한 서비스입니다.</div>
                    <div>
                        <Link href={`/auth/login`}>로그인하기</Link>
                    </div>
                </div>
            </div>
        </>
    );
}
