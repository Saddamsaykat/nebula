/* eslint-disable @typescript-eslint/no-explicit-any */
interface AlumniFiltersProps {
  searchTerm: string;
  handleSearch: (value: string) => void;
  styles?: React.CSSProperties;
  selectedBatch: string;
  handleBatchChange: (value: string) => void;
  uniqueBatches: string[];
  selectedDepartment: string;
  handleDepartmentChange: (value: string) => void;
  uniqueDepartments: string[];
}

const AlumniFilters: React.FC<AlumniFiltersProps> = ({
  searchTerm,
  handleSearch,
  styles,
  selectedBatch,
  handleBatchChange,
  uniqueBatches,
  selectedDepartment,
  handleDepartmentChange,
  uniqueDepartments,
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by student name"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        className="border p-2 rounded-lg w-full md:w-1/3"
      />

      <select
        className="border p-2 rounded-lg w-full md:w-1/4"
        style={styles}
        value={selectedBatch}
        onChange={(e) => handleBatchChange(e.target.value)}
      >
        <option value="">All Batches</option>
        {uniqueBatches.map((batch: any) => (
          <option key={batch} value={batch}>
            {batch}
          </option>
        ))}
      </select>

      <select
        className="border p-2 rounded-lg w-full md:w-1/4"
        style={styles}
        value={selectedDepartment}
        onChange={(e) => handleDepartmentChange(e.target.value)}
      >
        <option value="">All Departments</option>
        {uniqueDepartments.map((dept: any) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AlumniFilters;
