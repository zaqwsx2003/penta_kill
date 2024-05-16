import { versers } from "@/dummy";
import MatchCard from "./_components/MatchCard";
import { Do_Hyeon } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Do_Hyeon({
    subsets: ["latin"],
    weight: ["400"],
});

export default function Home() {
    const match = versers.data.schedule.events;

    return (
        <>
            <div className='flex items-center justify-center py-20'>
                <h1 className={cn("text-5xl font-bold", font.className)}>승부예측</h1>
            </div>
            <div className='w-[1024px] flex flex-col gap-12'>
                {match.map((event, index) => (
                    <MatchCard event={event} key={index} />
                ))}
            </div>
        </>
    );
}
