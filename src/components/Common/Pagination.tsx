type PaginationProps = {
  currentPage: number;
  totalPages?: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages = 10,
  onChangePage,
}: PaginationProps) => {
  const isNextDisabled = currentPage === totalPages;
  return (
    <div className="flex ml-10 mt-8 mb-1">
      <button
        className="px-4 py-2 flex items-center justify-end enabled:hover:bg-btn  disabled:cursor-not-allowed focus-visible:ring-blue-500 hacker-orange-bg"
        disabled={isNextDisabled}
        onClick={() => onChangePage(currentPage + 1)}
      >
        <span
          className={`text-sm font-extrabold font-sans text-white ${
            !isNextDisabled ? "group-hover:text-btn" : ""
          } mr-1`}
        >
          Show More
        </span>
      </button>
    </div>
  );
};

export default Pagination;
