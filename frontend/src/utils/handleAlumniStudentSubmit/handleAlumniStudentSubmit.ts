import { registerWithEmail } from "../../authActions/authActions";
import zhsustIcon from "../../assets/ZHSUST.jpg";
import { BatchData, Student } from "../../pages/register/propsType/propsTypeRegister";
import { useAddPostMutation } from "../../redux/slice/postDataSlice";
import { useDispatch } from "react-redux";

const IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${IMAGE_HOSTING_KEY}`;

const generateRandomId = (length = 25): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
};

export const useAlumniStudentSubmit = (
  existingAlumniStudentInfo: BatchData[],
  selectedBatch: string,
  selectedDepartment: string
) => {
  const dispatch = useDispatch();
  const [addPost, { isLoading }] = useAddPostMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const studentData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      number: formData.get("number") as string,
      presentAddress: formData.get("presentAddress") as string,
      permanentAddress: formData.get("permanentAddress") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      studentId: formData.get("studentId") as string,
      image: formData.get("image") as File,
    };

    if (studentData.password !== studentData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const alumniDataCopy = JSON.parse(JSON.stringify(existingAlumniStudentInfo));
    let batch = alumniDataCopy.find((b: BatchData) => b.batch === selectedBatch) || { batch: selectedBatch, department: {} };
    if (!alumniDataCopy.includes(batch)) alumniDataCopy.push(batch);
    batch.department[selectedDepartment] = batch.department[selectedDepartment] || [];

    if (batch.department[selectedDepartment].some((s: Student) => s.email === studentData.email)) {
      alert("This student is already registered in the selected department!");
      return;
    }

    let imageUrl: string = zhsustIcon;
    if (studentData.image && studentData.image instanceof File) {
      try {
        const imageFormData = new FormData();
        imageFormData.append("image", studentData.image);
        const response = await fetch(IMAGE_HOSTING_API, { method: "POST", body: imageFormData });
        const data = await response.json();
        if (data.success) imageUrl = data.data.url;
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Using default image.");
      }
    } else {
      alert("Please upload a valid image file.");
      return;
    }

    const newStudent: Student = {
      name: `${studentData.firstName} ${studentData.lastName}`,
      email: studentData.email,
      number: studentData.number,
      presentAddress: studentData.presentAddress,
      permanentAddress: studentData.permanentAddress,
      imageUrl,
      role: "user",
      generateStudentRandomNumber: generateRandomId(),
      studentId: studentData.studentId,
    };

    batch.department[selectedDepartment].push(newStudent);
    const payload = { batch: selectedBatch, department: { ...batch.department } };

    try {
      const response = await addPost(payload).unwrap();
      const userRegister = await dispatch(
        registerWithEmail(studentData.email, studentData.password)
      );
      console.log(userRegister);
      console.log("✅ Student added successfully!", response);
    } catch (error: any) {
      console.error("Error submitting data:", error);
      alert(error?.data?.message || "Failed to submit data. Please try again.");
      console.error("Error registering user:", error);
      return;
    }
  };

  return { handleSubmit, isLoading };
};
