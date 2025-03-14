import React, { useState } from "react";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AcademicsInformation from "../../component/registerComponent/AcademicsInformation";
import { BatchData } from "./propsType/propsTypeRegister";
import { useGetPostsQuery } from "../../redux/slice/postDataSlice";
import { useAlumniStudentSubmit } from "../../utils/handleAlumniStudentSubmit/handleAlumniStudentSubmit";
import zhsustImg from "../../assets/ZHSUST.jpg";

const Register: React.FC = () => {
  const { data } = useGetPostsQuery();
  const existingAlumniStudentInfo: BatchData[] = data || [];

  const [selectedBatch, setSelectedBatch] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");

  const handleChangeBatch = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBatch(event.target.value);
  };

  const handleChangeDepartment = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepartment(event.target.value);
  };

  const { handleSubmit, isLoading } = useAlumniStudentSubmit(
    existingAlumniStudentInfo,
    selectedBatch,
    selectedDepartment
  );

  return (
    <div
      className="bg-cover bg-center w-full bg-no-repeat"
      style={{ backgroundImage: `url(${zhsustImg})` }}
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-1.5 mt-2.5 max-w-7xl mx-auto p-4 bg-opacity-10 backdrop-blur-md border-2 border-white rounded-xl"
      >
        <div>
          <PersonalInformation />
        </div>
        <div className="rounded-md shadow-sm dark:bg-gray-50">
          <AcademicsInformation
            handleChangeBatch={handleChangeBatch}
            handleChangeDepartment={handleChangeDepartment}
            selectedBatch={selectedBatch}
            selectedDepartment={selectedDepartment}
            loading={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
