import React from "react";
interface inputFieldProps {
  id: string;
  label: string;
  type?: string;
}

const TextAreaField: React.FC<inputFieldProps> = ({ id, label, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="text-sm text-white">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none text-xl resize-none"
        {...props}
      />
    </div>
  );
};

export default TextAreaField;