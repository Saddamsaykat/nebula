/* eslint-disable @typescript-eslint/no-explicit-any */
import StudentImage from "../../../utils/studentImage/StudentImage";
import SettingTableHead from "./SettingTableHead";

interface SettingsTableBodyProps {
  filteredData: any[]; // Replace 'any[]' with the actual type if known
  selectedDepartment: string | null; // Adjust the type as per your requirements
  searchTerm: string;
}

const SettingsTableBody: React.FC<SettingsTableBodyProps> = ({
  filteredData,
  selectedDepartment,
  searchTerm,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[600px] max-w-[1920px] max-h-[600px] mx-auto overflow-x-auto overflow-y-auto">
        <table className="text-xs w-full">
          <SettingTableHead />
          <tbody>
            {filteredData?.map(
              (batchData) =>
                batchData.department &&
                Object.entries(batchData.department)
                  .filter(([deptName]) =>
                    selectedDepartment ? deptName === selectedDepartment : true
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
                              className="border-b border-opacity-20 dark:border-gray-300"
                            >
                              <td className="p-2 sm:p-3 border-r-2 border-l">
                                <StudentImage imageId={student?.image} />
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{student?.number || "N/A"}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>
                                  {student?.firstName} {student?.lastName}
                                </p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{batchData?.batch}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{deptName}</p>
                              </td>
                              <td
                                className="max-w-[100px] p-2 sm:p-3 border-r-2 overflow-hidden"
                                title={student?.email}
                              >
                                <p className="cursor-pointer">
                                  {student?.email?.slice(0, 10) || "N/A"}
                                </p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{student?.gender || "N/A"}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{student?.country || "N/A"}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{student?.city || "N/A"}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <p>{student?.role || "N/A"}</p>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <button className="cursor-pointer bg-yellow-300 text-black px-3 py-1 rounded-md text-[10px] sm:text-xs">
                                  Update
                                </button>
                              </td>
                              <td className="p-2 sm:p-3 border-r-2">
                                <button className="cursor-pointer bg-lime-600 text-white px-3 py-1 rounded-md text-[10px] sm:text-xs">
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
  );
};

export default SettingsTableBody;
