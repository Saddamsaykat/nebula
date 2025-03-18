import React from "react";

interface inputFieldProps {
  id: string;
  label: string;
  type?: string;
}

const InputField: React.FC<inputFieldProps> = ({
  id,
  label,
  type = "text",
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-white">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none text-white"
        {...props}
      />
    </div>
  );
};

export default InputField;
