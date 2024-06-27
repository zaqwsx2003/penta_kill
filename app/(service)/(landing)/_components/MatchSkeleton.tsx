import React from "react";

import MatchCardSkeleton from "@/app/(service)/(landing)/_components/MatchCardSkeleton";

export default function MatchSkeleton() {
    return (
        <>
            <div className="relative flex items-center justify-end pr-5">
                <div className="skeleton h-8 w-32 rounded-[10px] border" />
            </div>
            <div className="flex flex-col gap-y-10">
                {Array.from({ length: 10 }).map((_, index) => (
                    <MatchCardSkeleton key={index} />
                ))}
            </div>
        </>
    );
}
