/* eslint-disable @typescript-eslint/no-explicit-any */

const JobExperience = ({
  jobCategoryType,
  setJobCategoryType,
  jobCategory,
  setJobCategory,
  customJobCategoryType,
  setCustomJobCategoryType,
  customJobCategory,
  setCustomJobCategory
}: any) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {/* Job Type Dropdown */}
      <div>
        <label htmlFor="jobType" className="text-black">
          Job Type
        </label>
        <select
          name="jobType"
          id="jobType"
          value={jobCategoryType}
          onChange={(e) => setJobCategoryType(e.target.value)}
          className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
        >
          <option className="bg-black text-white" value="">
            Job Type
          </option>
          <option className="bg-black text-white" value="Government">
            Government
          </option>
          <option className="bg-black text-white" value="private">
            Non Government / Private
          </option>
          <option className="bg-black text-white" value="Semi-government">
            Semi Government
          </option>
          <option className="bg-black text-white" value="Other">
            Other
          </option>
        </select>

        {jobCategoryType === "Other" && (
          <input
            type="text"
            placeholder="Enter your job type"
            value={customJobCategoryType}
            onChange={(e) => setCustomJobCategoryType(e.target.value)}
            className="mt-2 w-full px-3 py-2 border border-amber-400 rounded-md text-black"
          />
        )}
      </div>

      {/* Job Category Dropdown */}
      <div>
        <label htmlFor="jobCategory" className="text-black">
          Job Category
        </label>
        <select
          name="jobCategory"
          id="jobCategory"
          value={jobCategory}
          onChange={(e) => setJobCategory(e.target.value)}
          className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
        >
          <option className="bg-black text-white" value="">
            Select your Job Experience
          </option>
          <option className="bg-black text-white" value="Software Engineer">
            Software Engineer / Junior Software Engineer
          </option>
          <option className="bg-black text-white" value="Web Developer">
            Web Developer / Junior Web Developer
          </option>
          <option className="bg-black text-white" value="App Developer">
            App Developer
          </option>
          <option className="bg-black text-white" value="Teacher">
            Teacher
          </option>
          <option className="bg-black text-white" value="Freelancer">
            Freelancer
          </option>
          <option className="bg-black text-white" value="Business">
            Business
          </option>
          <option className="bg-black text-white" value="Project Manager">
            Project Manager
          </option>
          <option className="bg-black text-white" value="IT Officer">
            IT Officer
          </option>
          <option className="bg-black text-white" value="Bank">
            Bank
          </option>
          <option className="bg-black text-white" value="Any Government (job)">
            Any Government (job)
          </option>
          <option className="bg-black text-white" value="CTO">
            CTO
          </option>
          <option className="bg-black text-white" value="Lead Engineer">
            Lead Engineer
          </option>
          <option className="bg-black text-white" value="Assistant Programmer">
            Assistant Programmer
          </option>
          <option className="bg-black text-white" value="HR(Human Resource)">
            HR(Human Resource)
          </option>
          <option className="bg-black text-white" value="Other">
            Other
          </option>
        </select>

        {jobCategory === "Other" && (
          <input
            type="text"
            placeholder="Enter your job category"
            value={customJobCategory}
            onChange={(e) => setCustomJobCategory(e.target.value)}
            className="mt-2 w-full px-3 py-2 border border-amber-400 rounded-md text-black"
          />
        )}
      </div>
    </div>
  );
};

export default JobExperience;
