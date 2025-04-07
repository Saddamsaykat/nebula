import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../themeStyles/themeStyles";
import { RootState } from "../../redux/store";

interface inputPasswordProps {
    id: string;
    label: string;
    name: string;
}

const PasswordField:React.FC<inputPasswordProps> = ({ id, label, name }) => {
    const [showPassword, setShowPassword] = useState(false);
      const theme = useSelector((state: RootState) => state.theme.theme);
      const themeStyles = getThemeStyles(theme);

    return (
      <div className={`relative mt-2 ${themeStyles}`}>
        <label htmlFor={id} className="text-sm text-black">
          {label}
        </label>
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          className="w-full rounded-md border-2 border-amber-300 px-3 py-2 text-black"
        name={name}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-8 cursor-pointer"
        >
          {showPassword ? "🙈" : "👁️"}
        </span>
      </div>
    );
  };

export default PasswordField;