/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetPostsQuery } from "../../../redux/slice/postData/postDataSlice";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../../utils/themeStyles/themeStyles";
import StudentImage from "../../../utils/studentImage/StudentImage";
import SettingTableHead from "./SettingTableHead";

const Settings = () => {
  const { data } = useGetPostsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const theme = useSelector((state: any) => state.theme.theme);
  const styles = getThemeStyles(theme);

  const uniqueBatches = [...new Set(data?.map((batch) => batch.batch))];
  const uniqueDepartments = [
    ...new Set(
      data?.flatMap((batch) =>
        batch.department ? Object.keys(batch.department) : []
      )
    ),
  ];

  // Filtering Logic
  const filteredData = data?.filter((batchData) => {
    const matchesBatch = selectedBatch
      ? batchData.batch === selectedBatch
      : true;

    const matchesDepartment = selectedDepartment
      ? batchData.department &&
        Object.keys(batchData.department).includes(selectedDepartment)
      : true;

    const matchesSearch = searchTerm
      ? batchData.department &&
        Object.values(batchData.department).some((students) =>
          Array.isArray(students) &&
          students.some((student) =>
            [
              batchData.batch ?? "",
              ...(batchData.department
                ? Object.keys(batchData.department)
                : []),
              student?.name ?? "",
              student?.number ?? "",
              student?.email ?? "",
            ].some((field) =>
              field
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
          )
        )
      : true;

    return matchesBatch && matchesDepartment && matchesSearch;
  });

  return (
    <div>
      <div className="container p-2 mx-auto sm:p-4" style={styles}>
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-center">
          Student List With Image
        </h2>

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
            {uniqueDepartments?.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto overflow-y-auto min-w-[600px] max-w-[1920px] max-h-[600px] container mx-auto">
          <table className="text-xs">
           <SettingTableHead/>
            <tbody>
              {filteredData?.map(
                (batchData) =>
                  batchData.department &&
                  Object.entries(batchData.department)
                    .filter(([deptName]) =>
                      selectedDepartment
                        ? deptName === selectedDepartment
                        : true
                    )
                    .map(([deptName, students]) =>
                      Array.isArray(students)
                        ? students
                            .filter((student) =>
                              searchTerm
                                ? [
                                    student?.name ?? "",
                                    student?.number ?? "",
                                    student?.email ?? "",
                                  ].some((field) =>
                                    field
                                      .toString()
                                      .toLowerCase()
                                      .includes(searchTerm.toLowerCase())
                                  )
                                : true
                            )
                            .map((student, index) => (
                              <tr
                                key={`${batchData._id}-${deptName}-${index}`}
                                className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50"
                              >
                                <td className="p-3 border-r-2 border-l">
                                  <StudentImage imageId={student?.image} />
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{student?.number || "N/A"}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>
                                    {student?.firstName} {student?.lastName}
                                  </p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{batchData?.batch}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{deptName}</p>
                                </td>
                                <td
                                  className="max-w-[100px] p-3 border-r-2 overflow-hidden"
                                  title={student?.email}
                                >
                                  <p className="cursor-pointer">
                                    {student?.email?.slice(0, 10) || "N/A"}
                                  </p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{student?.gender || "N/A"}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{student?.country || "N/A"}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{student?.city || "N/A"}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <p>{student?.role || "N/A"}</p>
                                </td>
                                <td className="p-3 border-r-2">
                                  <button className="cursor-pointer bg-yellow-300 text-black p-2 rounded-md">
                                    Update
                                  </button>
                                </td>
                                <td className="p-3 border-r-2">
                                  <button className="cursor-pointer bg-lime-600 text-white p-2 rounded-md">
                                    User View
                                  </button>
                                </td>
                              </tr>
                            ))
                        : null
                    )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
