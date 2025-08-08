type FormRowPropsType = {
  label?: string;
  error?: string;
  children: React.ReactElement;
  required?: boolean;
};

export default function FormRow({
  label,
  error,
  children,
  required,
}: FormRowPropsType) {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={children.props.id}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label} {required && <span className="font-bold">*</span>}
        </label>
      )}
      {children}
      {error && <span className="text-red-700 text-md mt-2">{error}</span>}
    </div>
  );
}
