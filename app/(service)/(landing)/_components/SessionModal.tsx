import Link from "next/link";
import React from "react";

export default function SessionModal() {
    return (
        <>
            <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
                <div className="rounded-10 mx-aut z-50 flex h-60 w-[400px] flex-col items-center justify-center overflow-hidden rounded-[10px] bg-white">
                    <div className="text-xl text-black">
                        로그인 후 사용가능한 서비스입니다.
                    </div>
                    <Link
                        href="/auth/login"
                        className="mt-3 rounded-[10px] bg-blue-500 px-3 py-2 font-semibold text-white duration-200 ease-in-out hover:bg-blue-300"
                    >
                        <p>로그인하기</p>
                    </Link>
                </div>
            </div>
        </>
    );
}
