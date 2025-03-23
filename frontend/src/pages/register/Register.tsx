import bgImageRegistry from "../../assets/backViewZhsust.jpg";
import InputField from "../../utils/inputField/InputField";
import PasswordField from "../../utils/passwordField/PasswordField";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const batch = formData.get("batch") as string;

    const data = { email, firstName, lastName, batch };
    console.log(data);

    form.reset(); // ✅ Reset the form, including dropdown
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImageRegistry})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
      className="flex justify-center items-center"
    >
      <form onSubmit={handleSubmit}>
        <div className="bg-opacity-10 backdrop-blur-md p-5 rounded-lg m-auto">
          {/* Name */}
          <div className="flex justify-center items-center gap-2">
            <InputField id="firstName" name="firstName" label="First Name" type="text" />
            <InputField id="lastName" name="lastName" label="Last Name" type="text" />
          </div>
          {/* Email */}
          <div>
            <InputField id="email" name="email" label="Email" type="email" />
          </div>
          {/* Password */}
          <div>
            <PasswordField id="password" name="password" label="Password" />
            <PasswordField id="confirmPassword" name="confirmPassword" label="Confirm Password" />
          </div>
          {/* Dropdown Batch */}
          <div>
            <label htmlFor="batch" className="text-white">Batch</label>
            <select id="batch" name="batch" className="w-full px-3 py-2 border border-amber-400 rounded-md bg-black text-white">
              {batchOptions.map((batch, index) => (
                <option key={index} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
