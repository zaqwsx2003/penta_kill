"use client";

import { scedule } from "@/dummy";

export default function Home() {
    return (
        <div className='h-full'>
            <div>{ scedule.data}</div>
        </div>
    );
}
