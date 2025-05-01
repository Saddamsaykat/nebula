/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import bgImageRegistry from "../../assets/public/ZHSUSTFullView.png";
import logo from "../../assets/FavIcon.jpg";

import RegisterHeader from "../../component/registerComponent/RegisterHeader";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AdditionalInformation from "../../component/registerComponent/AdditionalInformation";

import { useAddPostMutation } from "../../redux/slice/postData/postDataSlice";
import { registerWithEmail } from "../../authActions/authActions";

import useImageUpload from "../../hook/uploadImage";
import { generateRandomId } from "../../hook/generateRandomId";
import { propsTypeRegister } from "./propsType/propsTypeRegister";

// Constants
const batchOptions = Array.from({ length: 51 }, (_, i) =>
  i === 0 ? "" : `${i}`
);
const departmentOptions = ["Department", "CSE"];

const Register: React.FC<propsTypeRegister> = () => {
  const dispatch = useDispatch();
  const [addStudent] = useAddPostMutation();
  const { uploadImage } = useImageUpload(logo);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [selectedCity, setSelectedCity] = useState<{
    name: { common: string };
  } | null>(null);

  const cityName = selectedCity?.name?.common;
  // Step 1: Personal Info
  const [formDataStep1, setFormDataStep1] = useState({
    batch: "",
    department: "",
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    gender: "",
    presentAddress: "",
    permanentAddress: "",
    whatsapp: "",
    facebook: "",
    linkedin: "",
    github: "",
    aboutYourself: "",
    image: null as File | null,
    password: "",
    confirmPassword: "",
    agree: false,
    jobDescription: "",
  });
console.log(formDataStep1.jobDescription)
  // Step 2: Job & Academic Info
  const [batch, setBatch] = useState("");
  const [department, setDepartment] = useState("");
  const [jobCategory, setJobCategory] = useState("");
  const [jobCategoryType, setJobCategoryType] = useState("");
  const [customJobCategoryType, setCustomJobCategoryType] = useState("");
  const [customJobCategory, setCustomJobCategory] = useState("");
  const finalJobType =
    jobCategoryType === "Other" ? customJobCategoryType : jobCategoryType;
  const finalJobCategory =
    jobCategory === "Other" ? customJobCategory : jobCategory;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const {
      batch,
      department,
      firstName,
      lastName,
      email,
      number,
      gender,
      presentAddress,
      permanentAddress,
      whatsapp,
      facebook,
      linkedin,
      github,
      aboutYourself,
      image,
      password,
      confirmPassword,
      agree,
      jobDescription,
    } = formDataStep1;

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
      const imageId = image ? await uploadImage(image) : "";

      const studentId = generateRandomId();
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
        whatsUp: whatsapp,
        facebook,
        linkedin,
        github,
        aboutYourself,
        image: imageId,
        role: "student",
        studentId,
        country: selectedCountry?.name?.common,
        city: cityName,
        agree,
        jobType: finalJobType,
        jobCategoryData: finalJobCategory,
        jobDescription,
      };

      await addStudent(studentInfo as any).unwrap();
      await dispatch(registerWithEmail(email, password) as any);

      Swal.fire({
        title: "Success!",
        text: "Register successful!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form states
      setFormDataStep1({
        ...formDataStep1,
        password: "",
        confirmPassword: "",
        agree: false,
      });
      setStep(1);
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
        backgroundColor: "#000000",
        color: "#ffffff",
      }}
      className="flex justify-center items-center h-full min-h-screen p-8"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[720px] bg-white p-5 rounded-lg"
      >
        <RegisterHeader />

        <div className="grid grid-cols-1 gap-4">
          {step === 1 && (
            <PersonalInformation
              formData={formDataStep1}
              setFormData={setFormDataStep1}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          )}
          {step === 2 && (
            <AdditionalInformation
              formData={formDataStep1}
              setFormData={setFormDataStep1}
              batchOptions={batchOptions}
              departmentOptions={departmentOptions}
              batch={batch}
              setBatch={setBatch}
              department={department}
              setDepartment={setDepartment}
              jobCategory={jobCategory}
              setJobCategory={setJobCategory}
              jobCategoryType={jobCategoryType}
              setJobCategoryType={setJobCategoryType}
              customJobCategoryType={customJobCategoryType}
              setCustomJobCategoryType={setCustomJobCategoryType}
              customJobCategory={customJobCategory}
              setCustomJobCategory={setCustomJobCategory}
              loading={loading}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          {step < 2 && (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next
            </button>
          )}
        </div>

        {step === 2 && (
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <Link
            to="/forgetPassword"
            className="text-amber-500 hover:text-amber-400"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
