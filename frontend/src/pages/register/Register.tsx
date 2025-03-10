import { useState } from "react";
import BatchUtils from "../../utils/BatchUtils";
import Department from "../../component/registerComponent/Department";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import { useAddPostMutation } from "../../redux/slice/postDataSlice";

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
    // graduation_year: new Date().getFullYear() + 4, // Example: 4-year course

    // if (password !== confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }
    const dataDept =  selectedDepartment;
    const dataBatch =  selectedBatch;
    const alumniStudentInfo = [
      {
        batch: dataBatch,
        department: [
          {
            [dataDept]: [
              {
                name: `${firstName} ${lastName}`,
                email,
                number,
                presentAddress,
                permanentAddress
              }
            ]
          }
        ]
      }
    ];
    await addPost({ alumniStudentInfo }).unwrap();
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
