import { useState } from "react";

const useAlumniStudentForm = (selectedDepartment, selectedBatch) => {
  const [addPost, { isLoading, isError, isSuccess }] = useAddPostMutation();
  const { data } = useGetPostsQuery();
  const existingAlumniStudentInfo = data || [];
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const number = formData.get("number");
    const presentAddress = formData.get("presentAddress");
    const permanentAddress = formData.get("permanentAddress");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let alumniStudentInfo = JSON.parse(JSON.stringify(existingAlumniStudentInfo));
    let batch = alumniStudentInfo.find((batch) => batch.batch === selectedBatch);

    if (!batch) {
      batch = { batch: selectedBatch, department: {} };
      alumniStudentInfo.push(batch);
    }

    if (!batch.department[selectedDepartment]) {
      batch.department[selectedDepartment] = [];
    }

    const isDuplicate = alumniStudentInfo.some((batch) =>
      Object.values(batch.department || {})
        .flat()
        .some((student) => student.email === email)
    );

    if (!isDuplicate) {
      batch.department[selectedDepartment].push({
        name: `${firstName} ${lastName}`,
        email,
        number,
        presentAddress,
        permanentAddress,
      });

      try {
        await addPost({ batch: selectedBatch, department: batch.department }).unwrap();
        console.log("Student added successfully!");
      } catch (error) {
        console.error("Error submitting data:", error);
        setError(error);
      }
    } else {
      alert("This student is already registered!");
    }
  };

  return { handleSubmit, isLoading, isError, isSuccess, error };
};

export default useAlumniStudentForm;
