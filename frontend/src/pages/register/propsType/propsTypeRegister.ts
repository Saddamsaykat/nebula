/* eslint-disable @typescript-eslint/no-explicit-any */
export interface propsTypeRegister {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    gender: string;
    presentAddress: string;
    permanentAddress: string;
    whatsapp: string;
    facebook: string;
    linkedin: string;
    github: string;
    aboutYourself: string;
    image: File | null;
    password: string;
    confirmPassword: string;
    agree: boolean;
    batch: string;
    department: string;
  };
  setFormData: React.Dispatch<
  React.SetStateAction<{
    batch: string;
    department: string;
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    gender: string;
    presentAddress: string;
    permanentAddress: string;
    whatsapp: string;
    facebook: string;
    linkedin: string;
    github: string;
    aboutYourself: string;
    image: File | null;
    password: string;
    confirmPassword: string;
    agree: boolean;
  }>
>;
  selectedCountry: any | null;
  setSelectedCountry: React.Dispatch<React.SetStateAction<any | null>>;
  selectedCity: { name: { common: string } } | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<{ name: { common: string } } | null>>;
}