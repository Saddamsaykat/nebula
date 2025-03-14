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
          className="w-full text-white rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 p-1 border-amber-300 text-xl resize-none"
          {...props}
        />
      </div>
    );
  };
  

export default TextAreaField;