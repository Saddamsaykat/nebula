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
  const { uploadImage } = useImageUpload(logo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    name: { common: string };
  } | null>(null);
  console.log(selectedCountry);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
    const gender = formData.get("gender") as string;
    const presentAddress = formData.get("presentAddress") as string;
    const permanentAddress = formData.get("permanentAddress") as string;
    const whatsUp = formData.get("whatsapp") as string;
    const facebook = formData.get("facebook") as string;
    const linkedin = formData.get("linkedin") as string;
    const github = formData.get("github") as string;
    const aboutYour = formData.get("aboutYour") as string;
    const studentId = generateRandomId();
    const agree = formData.get("agree") as string;
    const country = selectedCountry?.name?.common as string;
    const city = selectedCity || "";
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
      const uploadedImageId = await uploadImage(imageFile);

      const studentInfo = {
        batch,
        department,
        firstName,
        lastName,
        email,
        number,
        gender,
        presentAddress,
        permanentAddress,
        whatsUp,
        facebook,
        linkedin,
        github,
        aboutYour,
        image: uploadedImageId,
        role: "student",
        studentId,
        country,
        city,
        agree,
      };
      await addStudent(studentInfo as any).unwrap();
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
      setLoading(false);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4">
              <PersonalInformation
                setSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
              />
              <AdditionalInformation
                batchOptions={batchOptions}
                department={department}
              />
            </div>
            {/* Agreement */}
            <div className=" mt-2">
              <input
                type="checkbox"
                id="agree"
                name="agree"
                className="mr-2 text-black"
              />
              <label htmlFor="agree" className="text-black">
                I agree with the terms and conditions
              </label>
            </div>
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
