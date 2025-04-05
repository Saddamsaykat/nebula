import React, { useState } from "react";

interface inputPasswordProps {
    id: string;
    label: string;
    name: string;
}

const PasswordField:React.FC<inputPasswordProps> = ({ id, label, name }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative mt-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-md focus:ring focus:ring-opacity-75 dark:text-gray-50 focus:dark:ring-violet-600 dark:border-gray-300 border-2 border-amber-300 p-1 text-xl text-black"
        name={name}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 cursor-pointer text-gray-600 hover:text-indigo-500"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
    );
  };

export default PasswordField;