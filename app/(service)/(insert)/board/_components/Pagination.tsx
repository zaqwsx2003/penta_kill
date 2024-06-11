interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center mt-4 text-xs">
			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => onPageChange(number)}
					className={`px-4 py-2 mx-1 border rounded-full text-white ${
						currentPage === number ? "bg-neutral-600" : " bg-transparent"
					}`}>
					{number}
				</button>
			))}
		</div>
	);
}
