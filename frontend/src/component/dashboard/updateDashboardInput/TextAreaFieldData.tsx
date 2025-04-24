interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
  }
  
  const TextAreaFieldData: React.FC<TextAreaProps> = ({ label, name, ...rest }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        className="input resize-none w-full"
        {...rest}
      />
    </div>
  );
  
  export default TextAreaFieldData;
  