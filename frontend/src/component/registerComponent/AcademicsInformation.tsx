import React from "react";
import BatchUtils from "../../utils/BatchUtils";
import Department from "./Department";
import ImageUpload from "./ImageUpload";
import InputField from "../../utils/inputField/InputField";

interface acadidicInfoProps {
  handleChangeBatch: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedBatch: string;
  handleChangeDepartment: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedDepartment: string;
  loading: boolean;
}

const AcademicsInformation: React.FC<acadidicInfoProps> = ({
  handleChangeBatch,
  selectedBatch,
  handleChangeDepartment,
  selectedDepartment,
  loading,
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
          <InputField
            id={"studentBatchId"}
            label={"Student Id"}
            type="number"
          />
        </div>

        <div>
          <InputField
            id={"github"}
            label={"github"}
            type="text"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2">
        {/* whatsup */}
        <div>
          <InputField
            id={"whatsUp"}
            label={"whatsUp"}
            type="text"
          />
        </div>
        <div>
          <InputField
            id={"facebook"}
            label={"Facebook"}
            type="text"
          />
        </div>
      </div>
      <div>
        <ImageUpload />
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
