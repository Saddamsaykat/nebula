/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetPostsQuery } from "../../../redux/slice/postData/postDataSlice";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../../../utils/themeStyles/themeStyles";
import SettingsTableBody from "./SettingsTableBody";
import { filterData } from "../../../hook/filterData";

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
  const filteredData = filterData(
    (data ?? []).filter((item) => item.batch !== undefined) as any,
    selectedBatch,
    selectedDepartment,
    searchTerm
  );

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

        <SettingsTableBody
          filteredData={filteredData || []}
          searchTerm={searchTerm}
          selectedDepartment={selectedDepartment}
        />
      </div>
    </div>
  );
};

export default Settings;
