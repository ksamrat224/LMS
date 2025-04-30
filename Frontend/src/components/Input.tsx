import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, MouseEvent, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  name: string;
  required?: boolean ;
  value?: string | number;
}

const Input = ({ label, type, id, name, required, value,...rest }: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <input
          value={value}
          type={inputType}
          id={id}
          name={name}
          required={required}
          className={`border-none outline-0 ${
            isPassword ? "w-[90%]" : "w-full"
          }`}
          {...rest}
        />
        {isPassword && (
          <button type="button" className="" onClick={handleShowPassword}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
