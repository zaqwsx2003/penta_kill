import { Do_Hyeon } from "next/font/google";
import { cn } from "@/lib/utils";
import MatchRound from "./_components/MatchRound";

const font = Do_Hyeon({
    subsets: ["latin"],
    weight: ["400"],
});

export default function Home() {
    return (
        <div className='relative flex-1 max-w-screen-lg mx-auto py-4 '>
            <div className='flex items-center justify-center py-20'>
                <h1 className={cn("text-5xl font-bold text-white" , font.className)}>승부예측</h1>
            </div>
            <div className='w-[1024px] flex flex-col gap-12 scrollbar-hide'>
                <MatchRound />
            </div>
        </div>
    );
}
