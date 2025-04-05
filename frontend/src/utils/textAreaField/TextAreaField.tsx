import React from "react";
interface inputFieldProps {
  id: string;
  label: string;
  type?: string;
  name?: string;
  placeholder?: string;
}

const TextAreaField: React.FC<inputFieldProps> = ({ id, label, ...props }) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="text-sm text-black">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none text-xl resize-none text-black"
        {...props}
      />
    </div>
  );
};

export default TextAreaField;