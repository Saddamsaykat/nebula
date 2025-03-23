import bgImageRegistry from "../../assets/public/ZHSUSTFullView.png";
import InputField from "../../utils/inputField/InputField";
import PasswordField from "../../utils/passwordField/PasswordField";
import logo from "../../assets/FavIcon.jpg";
import { Link } from "react-router-dom";

interface registerProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  batchOptions: string[];
  id: string;
  name: string;
  label: string;
  type: string;
}

const Register: React.FC<registerProps> = () => {
  const batchOptions = ["None", "Batch 1", "Batch 2", "Batch 3"];
  const department = ["None", "CSE", "EEE", "CE"];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const batch = formData.get("batch") as string;
    const department = formData.get("department") as string;

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
            <div className="relative">
              {/* Name */}
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  type="text"
                  dynamicClassName="text-black"
                />
                <InputField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  type="text"
                />
              </div>
              {/* Email */}
              <div>
                <InputField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                />
              </div>
              {/* Password */}
              <div className="grid grid-cols-2 gap-2">
                <PasswordField id="password" name="password" label="Password" />
                <PasswordField
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm Password"
                />
              </div>
              {/* Dropdown Batch and Department */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="batch" className="text-black">
                    Batch
                  </label>
                  <select
                    id="batch"
                    name="batch"
                    className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
                  >
                    {batchOptions.map((batch, index) => (
                      <option
                        key={index}
                        value={batch}
                        className="bg-black text-white"
                      >
                        {batch}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="department" className="text-black">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
                  >
                    {department.map((department, index) => (
                      <option
                        key={index}
                        value={department}
                        className="bg-black text-white"
                      >
                        {department}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Additional Info */}
            <div className="">
              <div className="flex justify-center items-center gap-2 mt-2 mb-2">
                <hr className="border border-black w-48 mt-2 mb-2" />
                <h1 className="text-xl text-black">Additional Information</h1>
                <hr className="border border-black w-48 mt-2 mb-2" />
              </div>
              {/* Social Media */}
              <div className="grid grid-cols-2 gap-2">
                <InputField
                  id="facebook"
                  name="facebook"
                  label="Facebook"
                  type="text"
                />
                <InputField
                  id="instagram"
                  name="instagram"
                  label="Instagram"
                  type="text"
                />
              </div>
              {/* Image Upload */}
              <div>
                <label htmlFor={"image"} className="text-sm text-black">
                  Image
                </label>
                <input
                  id={"image"}
                  type="file"
                  className={` w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none text-black`}
                  accept="image/jpeg, image/png, image/jpg, image/jfif"
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
            </div>
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
