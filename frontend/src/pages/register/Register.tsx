import bgImageRegistry from "../../assets/public/ZHSUSTFullView.png";
import logo from "../../assets/FavIcon.jpg";
import { Link } from "react-router-dom";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AdditionalInformation from "../../component/registerComponent/AdditionalInformation";
import { propsTypeRegister } from "./propsType/propsTypeRegister";
import useImageUpload from "../../hook/uploadImage";
import { generateRandomId } from "../../hook/generateRandomId";
import RegisterHeader from "../../component/registerComponent/RegisterHeader";
import  { useAddPostMutation } from "../../redux/slice/postDataSlice";

const Register: React.FC<propsTypeRegister> = () => {
  const [addStudent] = useAddPostMutation()
  const batchOptions = ["", " 1", " 2", " 3", " 4 ", "5", "6"];
  const department = ["Department", "CSE", "EEE", "CE"];
  const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const IMAGE_HOSTING_API_DATA = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`;
  const { uploadImage } = useImageUpload(logo, IMAGE_HOSTING_API_DATA);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
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
    const uploadedImageUrl = await uploadImage(imageFile);
    const agree = formData.get("agree") as string;

    if (!agree) {
      alert("You must agree to the terms and conditions");
      return;
    }
    console.log("Uploaded Image URL:", uploadedImageUrl);

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

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
      role: 'student',
      studentId,
    };
    try {
      await addStudent(studentInfo).unwrap();
      // Optionally, reset the form or show success message
    } catch (error) {
      console.error('Failed to add student: ', error);
    }
    form.reset();
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
              className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md w-full"
            >
              Submit
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
