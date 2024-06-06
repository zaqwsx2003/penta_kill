interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const pageNumbers = [];

	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center mt-4">
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
};

export default Pagination;
