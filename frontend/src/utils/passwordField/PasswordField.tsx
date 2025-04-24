import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../themeStyles/themeStyles";
import { RootState } from "../../redux/store";

// react icons
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface inputPasswordProps {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

const PasswordField: React.FC<inputPasswordProps> = ({ id, label, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const theme = useSelector((state: RootState) => state.theme.theme);
  const themeStyles = getThemeStyles(theme);

  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });

  const countTrueItems = (obj: typeof signal) => {
    const totalItems = Object.keys(obj).length;
    const trueItems = Object.values(obj).filter((item) => item).length;
    return (trueItems / totalItems) * 100;
  };

  const strengthProgress = Math.floor(countTrueItems(signal));

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    setSignal({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: value.length >= 8,
      strong:
        hasUpperCase && hasLowerCase && hasNumber && hasSymbol && value.length >= 8,
    });
  };

  return (
    <div className={`w-full relative mt-2 ${themeStyles}`}>
      <label htmlFor={id} className="text-sm text-black">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          placeholder={placeholder}
          className="peer border-[#e5eaf2] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300 text-black"
        />

        {showPassword ? (
          <IoEyeOutline
            className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <IoEyeOffOutline
            className="absolute top-4 right-4 text-[1.5rem] text-[#777777] cursor-pointer"
            onClick={() => setShowPassword(true)}
          />
        )}
      </div>

      <div className="w-full mt-2 flex items-center gap-[5px]">
        {[0, 16, 33, 50, 90].map((progress, index) => (
          <div
            key={index}
            className={`${
              strengthProgress > progress ? "bg-green-500" : "dark:bg-slate-700 bg-gray-200"
            } h-[9px] w-full rounded-md`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PasswordField;
