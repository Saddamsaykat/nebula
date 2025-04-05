/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bgImageRegistry from "../../assets/public/ZHSUSTFullView.png";
import logo from "../../assets/FavIcon.jpg";
import { Link, useNavigate } from "react-router-dom";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AdditionalInformation from "../../component/registerComponent/AdditionalInformation";
import { propsTypeRegister } from "./propsType/propsTypeRegister";
import useImageUpload from "../../hook/uploadImage";
import { generateRandomId } from "../../hook/generateRandomId";
import RegisterHeader from "../../component/registerComponent/RegisterHeader";
import { useAddPostMutation } from "../../redux/slice/postData/postDataSlice";
import { registerWithEmail } from "../../authActions/authActions";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";

const Register: React.FC<propsTypeRegister> = () => {
  const dispatch = useDispatch();
  const [addStudent] = useAddPostMutation();
  const batchOptions = ["", " 1", " 2", " 3", " 4 ", "5", "6"];
  const department = ["Department", "CSE", "EEE", "CE"];
  const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const IMAGE_HOSTING_API_DATA = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`;
  const { uploadImage } = useImageUpload(logo, IMAGE_HOSTING_API_DATA);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // ✅ Set loading to true before anything starts

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    // Extract data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const batch = formData.get("batch") as string;
    const department = formData.get("department") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const imageFile = formData.get("image") as File;
    const number = formData.get("number") as string;
    const presentAddress = formData.get("presentAddress") as string;
    const permanentAddress = formData.get("permanentAddress") as string;
    const whatsUp = formData.get("whatsUp") as string;
    const facebook = formData.get("facebook") as string;
    const linkedin = formData.get("linkedin") as string;
    const github = formData.get("github") as string;
    const aboutYour = formData.get("aboutYour") as string;
    const studentId = generateRandomId();
    const agree = formData.get("agree") as string;

    if (!agree) {
      alert("You must agree to the terms and conditions");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const uploadedImageUrl = await uploadImage(imageFile);

      const studentInfo = {
        batch,
        department,
        name: firstName,
        lastName: lastName,
        email,
        number,
        presentAddress,
        permanentAddress,
        whatsUp,
        facebook,
        linkedin,
        github,
        aboutYour,
        image: uploadedImageUrl,
        role: "student",
        studentId,
        agree,
      };

      await addStudent(studentInfo).unwrap();
      // @ts-expect-error - reason: whatever the issue is (e.g. "Type mismatch workaround")
      await dispatch(registerWithEmail(email, password));

      Swal.fire({
        title: "Success!",
        text: "Register successful!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/home");
      });

      form.reset();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Invalid Registration. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false); // ✅ Always reset loading state
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageRegistry})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
      className="flex justify-center items-center h-full p-8"
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-5 rounded-lg m-auto max-w-[1080px]">
          <RegisterHeader />
          <div className="">
            <PersonalInformation />
            <AdditionalInformation
              batchOptions={batchOptions}
              department={department}
            />
            <button
              type="submit"
              disabled={loading}
              className={`mt-4 px-4 py-2 bg-amber-500 text-white rounded-md w-full`}
            >
              {loading ? <span>Loading...</span> : "Register"}
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Link
              to={"/forgetPassword"}
              className="text-amber-500 hover:text-amber-400"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
