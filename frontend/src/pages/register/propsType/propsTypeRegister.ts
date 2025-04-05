export interface propsTypeRegister {
  handleSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  batchOptions?: string[]; // Correctly passed to AdditionalInformation
  department?: string[];   // Correctly passed to AdditionalInformation
}
