/* eslint-disable @typescript-eslint/no-explicit-any */
export interface propsTypeRegister {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  batchOptions?: string[];
  department?: string[];
  setSelectedCountry: (country: any) => void;
  selectedCountry: string;
  selectedCity: any;
  setSelectedCity: (city: any) => void;
}
