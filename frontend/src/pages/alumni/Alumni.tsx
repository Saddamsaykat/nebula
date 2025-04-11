/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPostsQuery } from "../../redux/slice/postData/postDataSlice";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";
import AlumniStudentsCard from "../../component/alumniStudents/AlumniStudentsCard";
import AlumniPagination from "../../component/alumniStudents/AlumniPagination";
import AlumniFilters from "../../component/alumniStudents/AlumniFilters";
import { filterData } from "../../hook/filterData";

const Alumni = () => {
  const { data = [] } = useGetPostsQuery();
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const uniqueBatches = [...new Set(data.map((item) => item.batch))].filter(
    (batch): batch is string => batch !== undefined
  );
  const uniqueDepartments = [
    ...new Set(data.flatMap((item) => Object.keys(item.department || {}))),
  ];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(0);
  };

  const handleBatchChange = (value: string) => {
    setSelectedBatch(value);
    setCurrentPage(0);
  };

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
    setCurrentPage(0);
  };

  const filteredData = filterData(
    data.filter((item) => item.batch !== undefined) as any,
    selectedBatch,
    selectedDepartment,
    searchTerm
  );
  const totalPages = filteredData.length;
  const currentBatch = filteredData[currentPage];

  const renderStudentCard = (student: any, index: number) => (
   <AlumniStudentsCard
      key={index}
      student={student}
      index={index}
    />
  );

  const renderDepartment = (dept: string, students: any[]) => {
    const filteredStudents = students.filter((student) =>
      !searchTerm ||
      [student.name, student.number, student.email].some((field) =>
        field?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    return (
      <div key={dept} className="mb-4">
        <h3 className="text-lg font-medium text-blue-600">{dept} Department</h3>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(renderStudentCard)}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alumni List</h1>

      {/* Filters */}
      <AlumniFilters
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        styles={styles}
        selectedBatch={selectedBatch}
        handleBatchChange={handleBatchChange}
        uniqueBatches={uniqueBatches}
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
        uniqueDepartments={uniqueDepartments}
      />

      {/* Alumni Display */}
      {currentBatch ? (
        <div className="mb-6 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Batch: {currentBatch.batch}</h2>
          {Object.entries(currentBatch.department || {})
            .filter(([dept]) => !selectedDepartment || dept === selectedDepartment)
            .map(([dept, students]) => 
              Array.isArray(students) ? renderDepartment(dept, students) : null
            )}
        </div>
      ) : (
        <p>No data available.</p>
      )}

      <AlumniPagination
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        filteredData={filteredData}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Alumni;
