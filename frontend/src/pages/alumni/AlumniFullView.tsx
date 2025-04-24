/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../redux/slice/postData/postDataSlice";
import SingleStudentInfo from "./SingleStudentInfo";
import AllStudentInfo from "./AllStudentInfo";

const AlumniFullView = () => {
  const { id } = useParams<{ id: string }>();
  const { data: student, isLoading, isError } = useGetPostByIdQuery(id as any);

  if (isLoading) {
    return <div className="p-6 text-center">Loading student data...</div>;
  }

  if (isError || !student) {
    return (
      <div className="p-6 text-center text-red-600">
        Student not found or an error occurred.
      </div>
    );
  }

  return (
    <div>
      <SingleStudentInfo student={student} />
      <div>
        <h2 className="text-2xl font-bold mb-4 text-center">All Alumni</h2>
        <AllStudentInfo />
      </div>
    </div>
  );
};

export default AlumniFullView;
