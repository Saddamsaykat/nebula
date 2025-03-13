import React from "react";
import BatchUtils from "../../utils/BatchUtils";
import Department from "./Department";
import ImageUpload from "./ImageUpload";

interface acadidicInfoProps {
  handleChangeBatch: () => void;
  selectedBatch: string;
  handleChangeDepartment: () => void;
  selectedDepartment: string;
  loading: boolean;
}

const AcademicsInformation: React.FC<acadidicInfoProps> = ({
  handleChangeBatch,
  selectedBatch,
  handleChangeDepartment,
  selectedDepartment,
  loading
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
        {/* Batch */}
        <div className="w-full">
          <BatchUtils
            handleChange={handleChangeBatch}
            selectedBatch={selectedBatch}
          />
        </div>
        {/* Department */}
        <div className="w-full">
          <Department
            handleChange={handleChangeDepartment}
            selectedDepartment={selectedDepartment}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 items-center">
        <div className="p-2">
          <label htmlFor="studentBatchId">
            Student ID
            <input
              id="studentBatchId"
              type="number"
              name="studentId"
              placeholder="123456789"
              className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none"
            />
          </label>
        </div>
        <div>
          <div>
            <label htmlFor="github">
              Github
              <input
                id="github"
                type="url"
                name="github"
                placeholder="https://github.com/"
                className="w-full rounded-md focus:ring focus:ring-opacity-75
                dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-moz-number-spin-box]:appearance-none"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
        {/* whatsup */}
        <div>
          <label htmlFor="whatsUp">
            Whatsapp Number
            <input
              id="whatsUp"
              type="number"
              name="whatsUp"
              placeholder="09123456789"
              className="w-full rounded-md focus:ring focus:ring-opacity-75
              dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none"
            />
          </label>
        </div>
        <div>
          <label htmlFor="facebook">
            Facebook Profile
            <input
              id="facebook"
              type="url"
              name="facebook"
              placeholder="https://www.facebook.com/profile"
              className="w-full rounded-md focus:ring focus:ring-opacity-75
                dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl  appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none
             [&::-moz-number-spin-box]:appearance-none"
            />
          </label>
        </div>
      </div>
      <div>
        <ImageUpload/>
      </div>
      <div className="p-2">
        <button
          className="w-full p-2 bg-blue-500 text-white rounded"
          type="submit"
        >
           {loading ? "Submitting..." : "Submit"}
        </button>
      </div>{" "}
    </div>
  );
};

export default AcademicsInformation;
