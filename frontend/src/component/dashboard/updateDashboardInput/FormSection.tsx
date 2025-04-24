interface FormSectionProps {
    title: string;
    children: React.ReactNode;
  }
  
  const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
    <section>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      {children}
    </section>
  );
  
  export default FormSection;
  