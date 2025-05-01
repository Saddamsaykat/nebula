import React from "react";

interface GenderSelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const GenderSelect: React.FC<GenderSelectProps> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="gender" className="text-black">
        Gender
      </label>
      <select
        name="gender"
        id="gender"
        value={value}
        onChange={onChange}
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
  );
};

export default GenderSelect;
