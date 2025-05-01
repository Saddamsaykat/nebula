/* eslint-disable @typescript-eslint/no-explicit-any */
import useFormInputHandler from "../../hook/useFormInputHandler";
import TextAreaField from "../../utils/textAreaField/TextAreaField";
import GenderSelect from "./GenderSelect";
import JobExperience from "./jobExperience/JobExperience";
import SelectField from "./SelectField";

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
  const handleInputChange = useFormInputHandler(setFormData);

  return (
    <div className="p-4 rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
        <div className="flex justify-center items-center">
        <h1 className="text-xl text-black">
          Additional Information
          <span>
            {" "}
            <hr className="border border-black w-46 mt-2 mb-2" />
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <SelectField
          label="Batch"
          name="batch"
          value={formData.batch || ""}
          onChange={handleInputChange}
          options={batchOptions}
        />

        <SelectField
          label="Department"
          name="department"
          value={formData.department || ""}
          onChange={handleInputChange}
          options={departmentOptions}
        />
      </div>

      {/* Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2 mt-4">
        <div>
          <label htmlFor="image" className="text-sm text-black">
            Image <span className="text-red-500">*</span>
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
          <GenderSelect
            value={formData.gender || ""}
            onChange={handleInputChange}
          />
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
      <div>
        <TextAreaField
          id="jobDescription"
          name="jobDescription"
          label="Job Description"
          value={formData.jobDescription || ""}
          onChange={handleInputChange}
          placeholder="Job Description"
        />
      </div>
    </div>
  );
};

export default AdditionalInformation;
