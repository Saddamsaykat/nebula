/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { getThemeStyles } from "../themeStyles/themeStyles";
interface nameRegProps {
  name: string;
}

const NameSutter: React.FC<nameRegProps> = ({ name }) => {
      const theme = useSelector((state) => (state as any).theme.theme);
      const styles = getThemeStyles(theme);
  return (
    <div className="mt-2 mb-2" style={styles}>
      <div className="flex justify-center items-center">
        <hr className="border w-[300px] mt-2 mb-2" />
      </div>
      <h1 className="text-xl  text-center">{name}</h1>
      <div className="flex justify-center items-center">
        <hr className="border w-[300px] mt-2 mb-2" />
      </div>
    </div>
  );
};

export default NameSutter;
