import { Do_Hyeon } from "next/font/google";
import { cn } from "@/lib/utils";
import MatchSchedule from "./_components/MatchSchedule";
import YearMonthFilter from "./_components/YearMonthFilter";

const font = Do_Hyeon({
    subsets: ["latin"],
    weight: ["400"],
});

export default function page() {
    return (
        <div className="relative mx-auto max-w-screen-lg flex-1 py-4">
            <div className="flex items-center justify-center py-20">
                <h1
                    className={cn(
                        "text-5xl font-bold text-white",
                        font.className,
                    )}
                >
                    경기일정
                </h1>
            </div>
            <div className="scrollbar-hide flex min-w-[658px] flex-col gap-12">
                <YearMonthFilter />
                <MatchSchedule />
            </div>
        </div>
    );
}
