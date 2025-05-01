/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

const useFormInputHandler = (setFormData: React.Dispatch<React.SetStateAction<any>>) => {
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    const handlers: Record<string, () => void> = {
      checkbox: () => {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData((prev: any) => ({ ...prev, [name]: checked }));
      },
      file: () => {
        const file = (e.target as HTMLInputElement).files?.[0] || null;
        setFormData((prev: any) => ({ ...prev, [name]: file }));
      },
      default: () => {
        setFormData((prev: any) => ({ ...prev, [name]: value }));
      },
    };

    (handlers[type] || handlers.default)();
  };

  return handleInputChange;
};

export default useFormInputHandler;
