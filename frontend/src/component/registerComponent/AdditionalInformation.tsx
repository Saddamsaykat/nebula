/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../../utils/inputField/InputField";
import TextAreaField from "../../utils/textAreaField/TextAreaField";
import JobExperience from "./jobExperience/JobExperience";

const AdditionalInformation = ({
  batchOptions,
  department,
  jobCategoryType,
  setJobCategoryType,
  jobCategory,
  setJobCategory,
  customJobCategoryType,
  setCustomJobCategoryType,
  customJobCategory,
  setCustomJobCategory,
}: any) => {
  return (
    <div className="p-4 rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
      {/* <div className="flex flex-col items-center mt-4 mb-4 sm:flex-row sm:justify-center sm:gap-4">
        <hr className="border border-black w-2/3 sm:w-40 lg:w-60 mb-2 sm:mb-0" />
        <h1 className="text-lg sm:text-xl text-black whitespace-nowrap px-2 text-center">
          Additional Information
        </h1>
        <hr className="border border-black w-2/3 sm:w-40 lg:w-60 mt-2 sm:mt-0" />
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <div>
          <label htmlFor="batch" className="text-black">
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
            required
          >
            {batchOptions?.map((batch: any, index: any) => (
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
            required
          >
            {department?.map((department: any, index: any) => (
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

      {/* Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 mt-4">
        <div>
          <label htmlFor={"image"} className="text-sm text-black">
            Image
          </label>
          <input
            id={"image"}
            type="file"
            required
            name="image"
            className={` w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-moz-number-spin-box]:appearance-none text-black`}
            // accept="image/jpeg, image/png, image/jpg, image/jfif"
          />
        </div>
        <div>
          {/* Gender dropdown*/}
          <label htmlFor="gender" className="text-black">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
          >
            <option className="bg-black text-white" value="">
              Select your Gender
            </option>
            <option className="bg-black text-white" value="male">
              Male
            </option>
            <option className="bg-black text-white" value="female">
              Female
            </option>
          </select>
        </div>
      </div>

      <div className="text-black">
        <JobExperience
          jobCategoryType={jobCategoryType}
          setJobCategoryType={setJobCategoryType}
          jobCategory={jobCategory}
          setJobCategory={setJobCategory}
          customJobCategoryType={customJobCategoryType}
          setCustomJobCategoryType={setCustomJobCategoryType}
          customJobCategory={customJobCategory}
          setCustomJobCategory={setCustomJobCategory}
        />
      </div>

      {/* Social Media */}
      <div
      //  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2"
      >
        <InputField
          id="facebook"
          name="facebook"
          label="Facebook"
          type="text"
        />
        <InputField id="github" name="github" label="Github" type="text" />
      </div>
      {/* Whatsapp & Linkedin*/}
      <div
      //  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2"
      >
        <div>
          <InputField
            id="linkedin"
            label="Linkedin"
            type="text"
            name="linkedin"
          />
        </div>
        <div>
          <InputField
            id="whatsapp"
            label="Whatsapp"
            type="text"
            name="whatsapp"
          />
        </div>
      </div>

      {/* About Yourself */}

      <TextAreaField
        id="about"
        label="About Yourself"
        type="text"
        name="aboutYour"
        placeholder=" Software Engineer passionate about AI and Web Development."
      />
    </div>
  );
};

export default AdditionalInformation;
