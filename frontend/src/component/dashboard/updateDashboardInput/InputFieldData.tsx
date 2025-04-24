interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
  }
  
  const InputFieldData: React.FC<InputFieldProps> = ({ label, name, ...rest }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        name={name}
        id={name}
        className="input"
        {...rest}
      />
    </div>
  );
  
  export default InputFieldData;
  