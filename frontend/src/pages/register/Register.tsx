import bgImageRegistry from "../../assets/public/ZHSUSTFullView.png";
import logo from "../../assets/FavIcon.jpg";
import { Link } from "react-router-dom";
import PersonalInformation from "../../component/registerComponent/PersonalInformation";
import AdditionalInformation from "../../component/registerComponent/AdditionalInformation";
import { propsTypeRegister } from "./propsType/propsTypeRegister";



const Register: React.FC<propsTypeRegister> = () => {
  const batchOptions = ["", " 1", " 2", " 3", " 4 ", "5", "6"];
  const department = ["Department", "CSE", "EEE", "CE"];

  const iamge_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${iamge_hosting_key}`;

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
    const image = formData.get("image") as File;
    const role = "user";

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // ImageBB upload API key and endpoint
    let imageUrl: string = "";

    if (image instanceof File) {
      const imageFormData = new FormData();
      imageFormData.append("image", image);

      // if (!image || !(image instanceof File) || image.size === 0) {
      //   console.error("No valid image file found");
      //   return;
      // }

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
      }
    }

    console.log(imageUrl || "");
    const data = { email, firstName, lastName, batch, department };
    console.log(data);
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
        // overflow: "hidden",
      }}
      className="flex justify-center items-center h-full p-8"
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-5 rounded-lg m-auto max-w-[1080px]">
          <div>
            <Link to="/">
              <img
                src={logo}
                alt={"ZHSUST"}
                className="w-12 h-12 rounded border-black"
              />
            </Link>
            <h1 className="text-4xl font-semibold text-black">
              Welcome to ZHSUST Alumni!
            </h1>
            <p className="text-lg text-black">Register your account</p>
            <hr className="border border-black mb-2 mt-2" />
          </div>
          {/* Info */}
          <div className="">
            <div className="flex justify-center items-center">
              <h1 className="text-xl text-black">
                Personal Information
                <span>
                  {" "}
                  <hr className="border border-black w-46 mt-2 mb-2" />
                </span>
              </h1>
            </div>
            {/* Personal Info */}
            <PersonalInformation />
            {/* Additional Info */}
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