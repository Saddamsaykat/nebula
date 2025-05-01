import React from "react";

interface inputFieldPropstypes {
  id: string;
  label: string;
  type?: string;
  dynamicClassName?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const InputField: React.FC<inputFieldPropstypes> = ({
  id,
  label,
  type ="text",
  dynamicClassName,
  required = false,
  name,
  value, onChange,
  ...props
}) => {
  return (
    <div className="mt-2">
      <label htmlFor={id} className="text-sm text-black">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`${dynamicClassName} w-full px-3 py-2 border border-amber-400 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none 
             [&::-webkit-outer-spin-button]:appearance-none 
             [&::-moz-number-spin-box]:appearance-none text-black`}
        {...props}
      />
    </div>
  );
};

export default InputField;
