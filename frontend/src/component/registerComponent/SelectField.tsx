interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[];
    required?: boolean;
  }
  
  const SelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
  }) => {
    return (
      <div>
        <label htmlFor={name} className="text-black">
          {label}
        </label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-3 py-2 border border-amber-400 rounded-md text-black"
        >
          {options.map((option, index) => (
            <option key={index} value={option} className="bg-black text-white">
              {label === "Batch" ? `Batch ${option}` : option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default SelectField;
  