import React, { useState } from "react";
import BatchUtils from "../../utils/BatchUtils";
import Department from "../../component/registerComponent/Department";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import {
  useAddPostMutation,
  useGetPostsQuery,
} from "../../redux/slice/postDataSlice";
import { useLocation } from "react-router-dom";

interface Student {
  name: string;
  email: string;
  number: string;
  presentAddress: string;
  permanentAddress: string;
}

interface DepartmentData {
  [key: string]: Student[]; // Key is department name, value is an array of students
}

interface BatchData {
  _id: string;
  batch: string;
  department: DepartmentData;
}

const Register: React.FC = () => {

  // const location = useLocation()

  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();

  // Get data from API student information
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const number = formData.get("number") as string;
    const presentAddress = formData.get("presentAddress") as string;
    const permanentAddress = formData.get("permanentAddress") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const dataDept = selectedDepartment;
    const dataBatch = selectedBatch;

    let alumniStudentInfo = JSON.parse(
      JSON.stringify(existingAlumniStudentInfo)
    );

    let batch = alumniStudentInfo.find(
      (batch: BatchData) => batch.batch === dataBatch
    );

    if (!batch) {
      batch = { batch: dataBatch, department: {} };
      alumniStudentInfo.push(batch);
    }

    if (!batch.department[dataDept]) {
      batch.department[dataDept] = [];
    }

    const isDuplicate = alumniStudentInfo.some((batch: BatchData) =>
      Object.values(batch.department || {})
        .flat()
        .some((student: Student) => student.email === email)
    );

    if (!isDuplicate) {
      batch.department[dataDept].push({
        name: `${firstName} ${lastName}`,
        email,
        number,
        presentAddress,
        permanentAddress,
      });

      try {
        await addPost({
          batch: dataBatch,
          department: batch.department,
        }).unwrap();
        console.log("Student added successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
        if (error) {
          alert(error);
        }
      }
    } else {
      alert("This student is already registered!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center gap-1.5 mt-2.5"
    >
      <PersonalInformation />
      <div className="w-[50%] mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
          {/* Batch */}
          <div className="w-full">
            <BatchUtils
              handleChange={handleChangeBatch}
              selectedBatch={selectedBatch}
            />
          </div>
          {/* Department */}
          <div className="w-full">
            <Department
              handleChange={handleChangeDepartment}
              selectedDepartment={selectedDepartment}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Post added successfully!</p>}
      {isError && <p>Error adding post.</p>}
    </form>
  );
};

export default Register;
