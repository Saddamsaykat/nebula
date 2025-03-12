import { useState } from "react";
import {
  BatchData,
  Student,
} from "../../pages/register/propsType/propsTypeRegister";
import { useAddPostMutation } from "../../redux/slice/postDataSlice";

// Generate a random ID for the student
const generateRandomId = (length = 25) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};
const studentId = generateRandomId();

// ImageBB upload API key and endpoint
const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`;

export const useAlumniStudentSubmit = (
  existingAlumniStudentInfo: BatchData[],
  selectedBatch: string,
  selectedDepartment: string
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [addPost] = useAddPostMutation();

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
    const departmentID = formData.get("departmentID") as string;
    const image = formData.get("image") as File | null;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let imageUrl: string = "";
    try {
      // Upload image to ImageBB if there's an image file
      if (image && image instanceof File) {
        // const imageFormData = new FormData();
        formData.append("image", image);

        const imageUploadResponse = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        const imageUploadData = await imageUploadResponse.json();
        console.log(imageUploadData);
        if (imageUploadData.success) {
          imageUrl = imageUploadData.data.url;
        } else {
          throw new Error("Image upload failed");
        }
      } else {
        console.error("No valid image file found");
      }

      let alumniStudentInfo = JSON.parse(
        JSON.stringify(existingAlumniStudentInfo)
      );
      let batch = alumniStudentInfo.find(
        (batch: BatchData) => batch.batch === selectedBatch
      );

      if (!batch) {
        batch = { batch: selectedBatch, department: {} };
        alumniStudentInfo.push(batch);
      }

      if (!batch.department[selectedDepartment]) {
        batch.department[selectedDepartment] = [];
      }

      const isDuplicate = alumniStudentInfo.some((batch: BatchData) =>
        Object.values(batch.department || {})
          .flat()
          .some((student: Student) => student.email === email)
      );

      console.log({ batch: selectedBatch, department: batch.department });

      if (!isDuplicate) {
        batch.department[selectedDepartment].push({
          name: `${firstName} ${lastName}`,
          email,
          number,
          presentAddress,
          permanentAddress,
          studentId,
          departmentID,
          imageUrl: imageUrl || "",
        });
        await addPost({
          batch: selectedBatch,
          department: batch.department,
        }).unwrap();
        console.log("Student added successfully!");
      } else {
        alert("This student is already registered!");
      }
    } catch (err) {
      setError("Error submitting data: " + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, error };
};
