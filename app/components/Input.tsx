export const Input = ({
  icon,
  placeholder,
  type,
  name,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="mb-4 flex items-center border-4 border-black bg-white p-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
    {icon}
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="ml-2 w-full bg-transparent font-mono text-black placeholder-gray-500 focus:outline-none"
    />
  </div>
);
