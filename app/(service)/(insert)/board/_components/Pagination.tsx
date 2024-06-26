interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages - 1; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="mt-4 flex justify-center text-xs">
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`mx-1 rounded-full border px-4 py-2 text-white ${
                        currentPage === number
                            ? "bg-neutral-600"
                            : "bg-transparent"
                    }`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
}
