/* eslint-disable @typescript-eslint/no-explicit-any */
const AlumniPagination = ({
  totalPages,
  setCurrentPage,
  currentPage,
}: {
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredData: any[];
  currentPage: number;
}) => {
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      // Always show first 3 pages
      pages.push(0, 1, 2);

      // Add middle pages around current
      if (currentPage > 4 && currentPage < totalPages - 3) {
        pages.push("...", currentPage - 1, currentPage, currentPage + 1, "...");
      } else if (currentPage <= 4) {
        pages.push(3, 4, "..."); // Near the beginning
      } else {
        pages.push("...");
      }

      // Always show last 3 pages
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`mx-1 px-3 py-1 text-sm sm:text-base rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 ${
            currentPage === page ? "!bg-[#3B9DF8] !text-white shadow-lg" : ""
          }`}
        >
          {page + 1}
        </button>
      ) : (
        <span key={index} className="mx-1 px-2 py-1 text-gray-500">
          ...
        </span>
      )
    );
  };

  return (
    <div className="w-full">
      {totalPages > 1 && (
        <div className="flex items-center flex-wrap justify-center mt-8 gap-2 sm:gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
          >
            Previous
          </button>

          <div className="flex flex-wrap justify-center items-center gap-2">
            {renderPageNumbers()}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniPagination;
