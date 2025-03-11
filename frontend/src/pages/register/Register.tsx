import { useState } from "react";
import BatchUtils from "../../utils/BatchUtils";
import Department from "../../component/registerComponent/Department";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import {
  useAddPostMutation,
  useGetPostsQuery,
} from "../../redux/slice/postDataSlice";

const Register = () => {
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const [selectedBatch, setSelectedBatch] = useState("");
  const handleChangeBatch = (event) => {
    setSelectedBatch(event.target.value);
  };
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const handleChangeDepartment = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const { data } = useGetPostsQuery();
  const existingAlumniStudentInfo = data;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const number = event.target.number.value;
    const presentAddress = event.target.presentAddress.value;
    const permanentAddress = event.target.permanentAddress.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const dataDept = selectedDepartment;
    const dataBatch = selectedBatch;

    // Ensure that alumniStudentInfo is mutable
    let alumniStudentInfo = existingAlumniStudentInfo
      ? JSON.parse(JSON.stringify(existingAlumniStudentInfo))
      : [];

    // Find the batch
    let batch = alumniStudentInfo.find((batch) => batch.batch === dataBatch);

    if (!batch) {
      // Create new batch
      batch = { batch: dataBatch, department: {} };
      alumniStudentInfo.push(batch);
    }

    // Ensure department exists
    if (!batch.department[dataDept]) {
      batch.department[dataDept] = [];
    }

    // Prevent duplicate student entries
    const isDuplicate = batch.department[dataDept].some(
      (student) => student.email === email
    );
    if (!isDuplicate) {
      batch.department[dataDept].push({
        name: `${firstName} ${lastName}`,
        email,
        number,
        presentAddress,
        permanentAddress,
      });
console.log(dataBatch)
    //   try {
    //     await addPost({
    //       batch: dataBatch,
    //       department: batch.department,
    //     }).unwrap();
    //     console.log("Student added successfully!");
    //   } catch (error) {
    //     console.error("Error submitting data:", error);
    //   }
    // } else {
    //   alert("This student is already registered!");
    // }
    try {
      await addPost({
        batch: dataBatch,
        department: batch.department,
      }).unwrap();
      console.log("Student added successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error?.data?.message) {
        alert(error.data.message); // Display backend error message
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

      {/* </fieldset> */}

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
