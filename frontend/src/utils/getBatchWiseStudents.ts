import { useMemo } from "react";
import { useGetPostsQuery } from "../redux/slice/postDataSlice";

const useBatchWiseStudents = () => {
  const { data } = useGetPostsQuery();

  const batchWiseStudents = useMemo(() => {
    if (!Array.isArray(data)) {
      console.error("Invalid data format: Expected an array but received", data);
      return {};
    }

    const batchWiseData: Record<string, any[]> = {};

    data.forEach((entry) => {
      if (!entry?.studentInfo || !Array.isArray(entry.studentInfo)) return;

      entry.studentInfo.forEach((info: any) => {
        if (!info?.department || !Array.isArray(info.department)) return;

        if (!batchWiseData[info.batch]) {
          batchWiseData[info.batch] = [];
        }

        info.department.forEach((dept: any) => {
          if (!dept?.students || !Array.isArray(dept.students)) return;

          dept.students.forEach((student: any) => {
            batchWiseData[info.batch].push({
              batch: info.batch,
              department: dept.name,
              ...student,
            });
          });
        });
      });
    });

    return batchWiseData;
  }, [data]);

  return batchWiseStudents;
};

export default useBatchWiseStudents;
