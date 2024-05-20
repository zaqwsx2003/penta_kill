import React from "react";
import { Social } from "../_components/social";

export default function Page() {
    return (
        <div>
            <div className='w-[400px] h-[400px] bg-white rounded-[10px] flex flex-col items-center py-10 px-5'>
                <h1 className='dark:text-black text space-y-1.5 p-6 text-3xl font-bold text-center'>
                    회원가입
                </h1>
                <div className='flex flex-col items-center justify-center flex-grow w-full'>
                    <div className='flex flex-col w-full px-6  mt-4'>
                        <span className='dark:text-black'>이름</span>
                        <input className='border bg-white border-gray-300 rounded px-2 py-1 text-black' />
                    </div>
                    <div className='flex flex-col w-full px-6  mt-4'>
                        <span className='dark:text-black'>이메일</span>
                        <input className='border bg-white border-gray-300 rounded px-2 py-1 text-black' />
                    </div>
                    <div className='flex flex-col w-full px-6 mt-4'>
                        <span className='dark:text-black'>비밀번호</span>
                        <input className='border bg-white border-gray-300 rounded px-2 py-1 text-black' />
                    </div>
                </div>
                <span className='text-black'>이미 계정이 있으신가요?</span>
            </div>
        </div>
    );
}
