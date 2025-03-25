export interface propsTypeRegister {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  batchOptions: string[];
  id: string;
  name: string;
  label: string;
  type: string;
}