import { useState } from "react";
import { useGetPostsQuery } from "../../redux/slice/postDataSlice";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../utils/themeStyles/themeStyles";

const Alumni = () => {
  const { data } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);
  console.log(data);
  const uniqueBatches = [...new Set(data?.map((batch) => batch.batch))];
  const uniqueDepartments = [
    ...new Set(data?.flatMap((batch) => Object.keys(batch.department))),
  ];

  // Filtering Logic
  const filteredData = data?.filter((batchData) => {
    const matchesBatch = selectedBatch
      ? batchData.batch === selectedBatch
      : true;
    const matchesDepartment = selectedDepartment
      ? Object.keys(batchData.department).includes(selectedDepartment)
      : true;

    const matchesSearch = searchTerm
      ? Object.values(batchData.department).some((students) =>
          students.some((student) =>
            [
              batchData.batch,
              ...Object.keys(batchData.department),
              student.name,
              student.number,
              student.email,
            ].some((field) =>
              field.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
          )
        )
      : true;

    return matchesBatch && matchesDepartment && matchesSearch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Alumni List</h1>

      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by batch, name, number, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-lg w-full md:w-1/3"
        />

        <select
          className="border p-2 rounded-lg w-full md:w-1/4"
          style={styles}
          value={selectedBatch}
          onChange={(e) => setSelectedBatch(e.target.value)}
        >
          <option value="">All Batches</option>
          {uniqueBatches.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded-lg w-full md:w-1/4"
          style={styles}
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          {uniqueDepartments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Alumni List */}
      {filteredData?.map((batchData) => (
        <div key={batchData._id} className="mb-6 p-4 border rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">
            Batch: {batchData.batch}
          </h2>

          {Object.entries(batchData.department)
            .filter(([deptName]) =>
              selectedDepartment ? deptName === selectedDepartment : true
            )
            .map(([deptName, students]) => (
              <div key={deptName} className="mb-4">
                <h3 className="text-lg font-medium text-blue-600">
                  {deptName} Department
                </h3>

                <div className="mt-2 grid grid-cols-3 gap-4">
                  {students
                    .filter((student) =>
                      searchTerm
                        ? [student.name, student.number, student.email].some(
                            (field) =>
                              field
                                .toString()
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                          )
                        : true
                    )
                    .map((student, index) => (
                      <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
                        <div className="flex space-x-4">
                          {student.image ? (
                            <img
                              src={student?.image}
                              alt={student?.name}
                              className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                              N/A
                            </div>
                          )}
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-semibold">
                              {student.name}
                            </p>
                            <span className="text-xs dark:text-gray-600">
                              {student.email}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p>
                            <strong>Number:</strong> {student.number}
                          </p>
                          <p>
                            <strong>Present Address:</strong>{" "}
                            {student.presentAddress}
                          </p>
                          <p>
                            <strong>Permanent Address:</strong>{" "}
                            {student.permanentAddress}
                          </p>
                          <p>
                            <strong>WhatsApp:</strong> {student.whatsUp}
                          </p>
                          <p>
                            <strong>Facebook:</strong>{" "}
                            <a
                              href={student.facebook}
                              className="text-blue-500"
                            >
                              {student.facebook}
                            </a>
                          </p>
                          <p>
                            <strong>LinkedIn:</strong>{" "}
                            <a
                              href={student.linkedin}
                              className="text-blue-500"
                            >
                              {student.linkedin}
                            </a>
                          </p>
                          <p>
                            <strong>GitHub:</strong>{" "}
                            <a href={student.github} className="text-blue-500">
                              {student.github}
                            </a>
                          </p>
                          <p>
                            <strong>About:</strong> {student.aboutYour}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Alumni;
