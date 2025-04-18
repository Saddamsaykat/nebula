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

  return (
    <div>
      {totalPages > 1 && (
        <div className="flex items-center flex-wrap justify-center mt-8 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-700 transition-all duration-300"
          >
            Previous
          </button>

          <div className="flex items-center flex-wrap justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageClick(index)}
                className={`mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 transform hover:scale-105 ${
                  currentPage === index
                    ? "!bg-[#3B9DF8] !text-white shadow-lg"
                    : ""
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-gray-700 transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniPagination;
