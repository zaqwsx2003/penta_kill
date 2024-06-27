import React from "react";

export default function BoardRowSkeleton() {
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
                <div
                    className="w-full border-b border-zinc-700 p-4 text-xs"
                    key={index}
                >
                    <div className="skeleton h-4 rounded-[10px]" />
                </div>
            ))}
        </div>
    );
}
