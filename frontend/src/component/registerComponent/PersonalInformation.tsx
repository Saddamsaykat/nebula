import React from "react";
import InputField from "../../utils/inputField/InputField";
import PasswordField from "../../utils/passwordField/PasswordField";
import TextAreaField from "../../utils/textAreaField/TextAreaField";
import { propsTypeRegister } from "../../pages/register/propsType/propsTypeRegister";
import Country from "../../utils/country/Country";
import City from "../../utils/city/City";

const PersonalInformation: React.FC<propsTypeRegister> = ({
  setSelectedCountry,
  selectedCountry,
  selectedCity,
  setSelectedCity,
}) => {
  return (
    <div className="p-4 max-w-[720px] rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="First Name"
        />
        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
        />
      </div>
      <InputField
        id="email"
        label="Email"
        name="email"
        type="email"
        placeholder="Email"
      />
      <InputField
        id="number"
        label="Contact Number"
        name="number"
        type="number"
        placeholder="Contact Number"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <PasswordField id="password" label="Password" name="password" />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <TextAreaField
          id="AddressP"
          label="Present Address"
          name="presentAddress"
          placeholder="Present Address"
        />
        <TextAreaField
          id="AddressPer"
          label="Permanent Address"
          name="permanentAddress"
          placeholder="Permanent Address"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-2">
        <div className="w-full">
          <Country
            setSelectedCountry={setSelectedCountry}
            selectedCountry={selectedCountry}
          />
        </div>
        <div>
          <City selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInformation;
