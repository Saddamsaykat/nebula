import {
  BatchData,
  Student,
} from "../../pages/register/propsType/propsTypeRegister";
import { useAddPostMutation } from "../../redux/slice/postDataSlice";



export const useAlumniStudentSubmit = (
  existingAlumniStudentInfo: BatchData[],
  selectedBatch: string,
  selectedDepartment: string
) => {
  const [addPost, { isLoading }] = useAddPostMutation();

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

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    let alumniStudentInfo = JSON.parse(
      JSON.stringify(existingAlumniStudentInfo)
    );

    // Find batch entry or create a new one
    let batch = alumniStudentInfo.find(
      (batch: BatchData) => batch.batch === selectedBatch
    );

    if (!batch) {
      batch = { batch: selectedBatch, department: {} };
      alumniStudentInfo.push(batch);
    }

    // Initialize department if not already present
    if (!batch.department[selectedDepartment]) {
      batch.department[selectedDepartment] = [];
    }

    // Check for duplicate email
    const isDuplicate = alumniStudentInfo.some((batch: BatchData) =>
      Object.values(batch.department || {})
        .flat()
        .some((student: Student) => student.email === email)
    );

    if (isDuplicate) {
      alert("This student is already registered!");
      return;
    }

    // Create student entry
    const newStudent: Student = {
      // id: generateRandomId(),
      name: `${firstName} ${lastName}`,
      email,
      number,
      presentAddress,
      permanentAddress,
    };

   batch.department[selectedDepartment].push(newStudent);

    // API payload
    const payload = {
      batch: selectedBatch,
      department: batch.department,
    };

    console.log("📡 Sending Data:", JSON.stringify(payload, null, 2));

    try {
      const response = await addPost(payload).unwrap();
      console.log("✅ Student added successfully!", response);
    } catch (error: any) {
      console.error("❌ Error submitting data:", error);
      alert(error?.data?.message || "Failed to submit data. Please try again.");
    }
  };

  return { handleSubmit, isLoading };
};
