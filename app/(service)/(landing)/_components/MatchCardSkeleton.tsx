import React from "react";

export default function MatchCardSkeleton() {
    return (
        <div className="shadow-default flex shrink-0 flex-col justify-between gap-2">
            <div className="skeleton flex h-6 w-96 items-center gap-2 rounded-[5px] bg-gray-900" />
            <div className="skeleton flex h-[5.6rem] w-[64rem] rounded-[10px] bg-gray-400" />
        </div>
    );
}