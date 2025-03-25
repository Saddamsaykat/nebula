import React from "react";
import InputField from "../../utils/inputField/InputField";
import TextAreaField from "../../utils/textAreaField/TextAreaField";

interface registerAdditionalProps{
  batchOptions: string[];
  department: string[];
  handleBatchChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDepartmentChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
  name: string;
  label: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  errorMessage: string;
  success: boolean;
  successMessage: string;
  handleSuccess: () => void;
  placeholder: string;
} 

const AdditionalInformation: React.FC<registerAdditionalProps> = ({ batchOptions, department }) => {
  return (
    <div className="p-4 max-w-[720px] rounded-md shadow-sm dark:bg-gray-50 mt-3">
      <div className="flex justify-center items-center gap-2 mt-2 mb-2">
        <hr className="border border-black w-48 mt-2 mb-2" />
        <h1 className="text-xl text-black">Additional Information</h1>
        <hr className="border border-black w-48 mt-2 mb-2" />
      </div>
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
              <option key={index} value={batch} className="bg-black text-white">
                Batch {batch}
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
      {/* Social Media */}
      <div className="grid grid-cols-2 gap-2">
        <InputField
          id="facebook"
          name="facebook"
          label="Facebook"
          type="text"
        />
        <InputField id="github" name="github" label="Github" type="text" />
      </div>
      {/* Whatsapp & Linkedin*/}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <InputField id="linkedin" label="Linkedin" type="text" />
        </div>
        <div>
          <InputField id="whatsapp" label="Whatsapp" type="text" />
        </div>
      </div>
      {/* Image */}
      <div>
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
      </div>

      {/* About Yourself */}

      <TextAreaField id="about" label="About Yourself" type="text" placeholder=' Software Engineer passionate about AI and Web Development.'/>
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
  );
};

export default AdditionalInformation;
