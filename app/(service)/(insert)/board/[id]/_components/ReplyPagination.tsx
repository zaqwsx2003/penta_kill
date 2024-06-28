interface PaginationProps {
    page: number;
    hasMore: boolean;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    page,
    hasMore,
    onPageChange,
}) => {
    return (
        <div className="mt-4 flex justify-between">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 0}
                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
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
            <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasMore}
                className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-circle-chevron-right"
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m10 8 4 4-4 4" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
