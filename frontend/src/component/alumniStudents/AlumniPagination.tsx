/* eslint-disable @typescript-eslint/no-explicit-any */
const AlumniPagination = ({
  totalPages,
  setCurrentPage,
  filteredData,
  currentPage,
}: {
  totalPages: number;
  setCurrentPage: (page: number) => void;
  filteredData: any[];
  currentPage: number;
}) => {
  return (
    <div>
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 0))}
          >
            Previous
          </button>

          {filteredData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`px-3 py-1 rounded ${
                currentPage === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages - 1))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AlumniPagination;
