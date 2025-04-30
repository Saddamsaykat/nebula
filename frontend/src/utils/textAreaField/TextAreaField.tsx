import React from "react";

interface TextAreaFieldProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  type?: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  id,
  label,
  name,
  placeholder,
  required = false,
  value,
  onChange,
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="text-sm text-black">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none resize-none text-black"
      />
    </div>
  );
};

export default TextAreaField;
