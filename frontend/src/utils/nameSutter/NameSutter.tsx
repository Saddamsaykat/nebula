import React from "react";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../themeStyles/themeStyles";
interface nameRegProps {
  name: string;
}

const NameSutter: React.FC<nameRegProps> = ({ name }) => {
  const theme = useSelector((state) => state.theme.theme);
  const styles = getThemeStyles(theme);
  return (
    <div className="mt-2 mb-2" style={styles}>
      <div className="flex justify-center items-center">
        <hr className="border border-black w-48 mt-2 mb-2" />
      </div>
      <h1 className="text-xl text-center">{name}</h1>
      <div className="flex justify-center items-center">
        <hr className="border border-black w-48 mt-2 mb-2" />
      </div>
    </div>
  );
};

export default NameSutter;
