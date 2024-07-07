import { useBoardStore } from "@/lib/boardStore";
import React from "react";

export default function BoardRowSkeleton() {
    const { size } = useBoardStore();
    return (
        <div className="flex w-full flex-col items-center justify-center gap-2">
            {Array.from({ length: 10 }).map((_, size) => (
                <div
                    className="flex w-full flex-col gap-x-2 border-b border-zinc-700 p-4 text-xs"
                    key={size}
                >
                    <div className="skeleton h-5 rounded-[10px]" />
                </div>
            ))}
        </div>
    );
}
