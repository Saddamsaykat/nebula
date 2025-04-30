/* eslint-disable @typescript-eslint/no-explicit-any */
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
  formData,
  setFormData,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-4 max-w-[720px] rounded-md shadow-lg border-2 border-gray-300 dark:bg-gray-50 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputField
          id="firstName"
          label="First Name"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          id="lastName"
          label="Last Name"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <InputField
          id="email"
          label="Email"
          name="email"
          type="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          id="number"
          label="Contact Number"
          name="number"
          type="number"
          placeholder="Contact Number"
          value={formData.number}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <PasswordField
          id="password"
          label="Password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordField
          id="confirmPassword"
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <TextAreaField
          id="AddressP"
          label="Present Address"
          name="presentAddress"
          placeholder="Present Address"
          value={formData.presentAddress}
          onChange={handleChange}
        />
        <TextAreaField
          id="AddressPer"
          label="Permanent Address"
          name="permanentAddress"
          placeholder="Permanent Address"
          value={formData.permanentAddress}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Country
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <City
          selectedCity={selectedCity?.name.common || null}
          setSelectedCity={(city: string) => setSelectedCity({ name: { common: city } })}
        />
      </div>
    </div>
  );
};

export default PersonalInformation;
