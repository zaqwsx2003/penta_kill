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

    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center text-xs">
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
                    {number + 1}
                </button>
            ))}
        </div>
    );
}
