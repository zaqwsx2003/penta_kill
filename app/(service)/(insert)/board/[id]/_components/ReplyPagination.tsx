import React from "react";
import { useReplyStore } from "@/lib/boardStore";

interface ReplyPaginationProps {
    onPageChange: (newPage: number) => void;
}

export default function ReplyPagination({
    onPageChange,
}: ReplyPaginationProps) {
    const { page, totalPages } = useReplyStore((state) => ({
        page: state.page,
        totalPages: state.totalPages,
    }));

    return (
        <div className="mt-4 flex items-center justify-center space-x-2">
            {/* 이전 */}
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
                className="rounded bg-none px-4 py-2 text-white disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-chevron-left"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14 16-4-4 4-4" />
                </svg>
            </button>
            <span className="px-4 py-2 text-white">
                {page + 1} / {totalPages}
            </span>
            {/* 다음 */}
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page + 1 >= totalPages}
                className="rounded bg-none px-4 py-2 text-white disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-chevron-right"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m10 8 4 4-4 4" />
                </svg>
            </button>
        </div>
    );
}
