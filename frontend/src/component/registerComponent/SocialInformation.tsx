/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../../utils/inputField/InputField";
import TextAreaField from "../../utils/textAreaField/TextAreaField";

interface SocialInformationProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: {
    facebook?: string;
    github?: string;
    linkedin?: string;
    whatsapp?: string;
    aboutYour?: string;
    [key: string]: any;
  };
}

const SocialInformation: React.FC<SocialInformationProps> = ({
  setFormData,
  formData,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="p-4 rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
        <div className="flex justify-center items-center">
        <h1 className="text-xl text-black">
          Social Information
          <span>
            {" "}
            <hr className="border border-black w-46 mt-2 mb-2" />
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <InputField
          id="facebook"
          name="facebook"
          label="Facebook"
          type="text"
          value={formData.facebook || ""}
          onChange={handleInputChange}
        />
        <InputField
          id="github"
          name="github"
          label="Github"
          type="text"
          value={formData.github || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* Whatsapp & Linkedin */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <InputField
          id="linkedin"
          name="linkedin"
          label="Linkedin"
          type="text"
          value={formData.linkedin || ""}
          onChange={handleInputChange}
        />
        <InputField
          id="whatsapp"
          name="whatsapp"
          label="Whatsapp"
          type="text"
          value={formData.whatsapp || ""}
          onChange={handleInputChange}
        />
      </div>

      {/* About Yourself */}
      <TextAreaField
        id="about"
        name="aboutYour"
        label="About Yourself"
        type="text"
        placeholder=" Software Engineer passionate about AI and Web Development."
        value={formData.aboutYourself || ""}
        onChange={handleInputChange}
      />
      <div>
        <div className="flex justify-center items-center mt-4">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={formData.agree || false}
            onChange={handleInputChange}
            className="mr-2 text-black w-5 h-5"
          />
          <label htmlFor="agree" className="text-black text-lg">
            I agree with the terms and conditions
          </label>
        </div>
      </div>
    </div>
  );
};

export default SocialInformation;
