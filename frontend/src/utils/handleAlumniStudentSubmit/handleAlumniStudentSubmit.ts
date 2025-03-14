import { registerWithEmail } from "../../authActions/authActions";
import {
  BatchData,
  Student,
} from "../../pages/register/propsType/propsTypeRegister";
import { useAddPostMutation } from "../../redux/slice/postDataSlice";
import { useDispatch } from "react-redux";

const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`;

const generateRandomId = (length = 25) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};

export const useAlumniStudentSubmit = (
  existingAlumniStudentInfo: BatchData[],
  selectedBatch: string,
  selectedDepartment: string
) => {
  const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth);
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
    const studentId = formData.get("studentId") as string;

    // Validate passwords
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(password);
    try {
      // Pass email and password as separate arguments
      await dispatch(registerWithEmail(email, password));
      console.log("User registered!");
    } catch (error) {
      console.error("Error:", error);
    }
    // Clone existing alumni student info to avoid mutating the state
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

    // Check for duplicate email in the selected department only
    const isDuplicate = batch.department[selectedDepartment].some(
      (student: Student) => student.email === email
    );

    if (isDuplicate) {
      alert("This student is already registered in the selected department!");
      return;
    }

    // Image upload logic
    let imageUrl: string = "";
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile instanceof File) {
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      try {
        const imageUploadResponse = await fetch(image_hosting_api, {
          method: "POST",
          body: imageFormData,
        });

        const imageUploadData = await imageUploadResponse.json();
        console.log(imageUploadData);

        if (imageUploadData.success) {
          imageUrl = imageUploadData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload the image. Please try again.");
        return; // Exit early if the image upload fails
      }
    } else {
      console.error("No valid image file found");
      alert("Please upload a valid image file.");
      return; // Exit early if no valid image file is provided
    }

    // Create student entry
    const newStudent: Student = {
      name: `${firstName} ${lastName}`,
      email,
      number,
      presentAddress,
      permanentAddress,
      imageUrl: imageUrl || "",
      role: "user",
      generateStudentRandomNumber: generateRandomId(),
      studentId: studentId,
    };

    // Add the new student to the selected department
    batch.department[selectedDepartment].push(newStudent);

    // Build the complete payload for the API
    const payload = {
      batch: selectedBatch,
      department: alumniStudentInfo.reduce((acc, currBatch) => {
        if (currBatch.batch === selectedBatch) {
          acc = { ...currBatch.department }; // Preserve existing departments
        }
        return acc;
      }, {}),
    };

    // Ensure that the updated department is part of the payload
    payload.department[selectedDepartment] =
      batch.department[selectedDepartment];

    console.log("Sending Data:", JSON.stringify(payload, null, 2));

    try {
      const response = await addPost(payload).unwrap();
      console.log("✅ Student added successfully!", response);
    } catch (error: any) {
      console.error("Error submitting data:", error);
      alert(error?.data?.message || "Failed to submit data. Please try again.");
    }
    // console.log(error)
  };

  return { handleSubmit, isLoading };
};
