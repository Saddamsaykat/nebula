import React from "react";

interface inputFieldProps {
    id: string;
    label: string;
    type?: string;
}

const InputField: React.FC<inputFieldProps> = ({ id, label, type = "text", ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full rounded-md text-white focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl"
        {...props}
      />
    </div>
  );
};

export default InputField;