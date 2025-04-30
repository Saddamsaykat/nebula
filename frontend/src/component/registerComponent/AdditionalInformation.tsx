/* eslint-disable @typescript-eslint/no-explicit-any */
import InputField from "../../utils/inputField/InputField";
import TextAreaField from "../../utils/textAreaField/TextAreaField";
import JobExperience from "./jobExperience/JobExperience";

const AdditionalInformation = ({
  batchOptions,
  departmentOptions,
  jobCategoryType,
  setJobCategoryType,
  jobCategory,
  setJobCategory,
  customJobCategoryType,
  setCustomJobCategoryType,
  customJobCategory,
  setCustomJobCategory,
  formData,
  setFormData,
}: any) => {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev: any) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0];
      setFormData((prev: any) => ({
        ...prev,
        [name]: file, // this must be a File object
      }));
    } else {
      const value = e.target.value;
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-4 rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <div>
          <label htmlFor="batch" className="text-black">
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            value={formData.batch || ""}
            onChange={handleInputChange}
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
            value={formData.department || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
            required
          >
            {departmentOptions?.map((department: any, index: any) => (
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
          <label htmlFor="image" className="text-sm text-black">
            Image
          </label>
          <input
            id="image"
            type="file"
            name="image"
            className={`w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none text-black`}
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files?.[0] || null })
            }
          />
        </div>
        <div>
          {/* Gender dropdown */}
          <label htmlFor="gender" className="text-black">
            Gender
          </label>
          <select
            name="gender"
            id="gender"
            value={formData.gender || ""}
            onChange={handleInputChange}
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
        value={formData.aboutYour || ""}
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

export default AdditionalInformation;
