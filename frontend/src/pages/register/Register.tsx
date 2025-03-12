import React, { useState } from "react";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AcademicsInformation from "../../component/registerComponent/AcademicsInformation";
import { BatchData } from "./propsType/propsTypeRegister";
import { useGetPostsQuery } from "../../redux/slice/postDataSlice";
import { useAlumniStudentSubmit } from "../../utils/handleAlumniStudentSubmit/handleAlumniStudentSubmit";

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

  const { handleSubmit, isSubmitting, error } = useAlumniStudentSubmit(
    existingAlumniStudentInfo,
    selectedBatch,
    selectedDepartment
  );

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex justify-center gap-1.5 mt-2.5"
    >
      <PersonalInformation />
      <div className="w-[50%] mt-2">
        <AcademicsInformation
          handleChangeBatch={handleChangeBatch}
          handleChangeDepartment={handleChangeDepartment}
          selectedBatch={selectedBatch}
          selectedDepartment={selectedDepartment}
        />
      </div>
      {isSubmitting && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
};

export default Register;
