import React from "react";

export default function MatchScheduleSkeleton() {
    return (
        <>
            <div className="flex flex-col gap-y-6">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        className="skeleton h-[12rem] w-[64rem] rounded-[10px]"
                        key={index}
                    />
                ))}
            </div>
        </>
    );
}
