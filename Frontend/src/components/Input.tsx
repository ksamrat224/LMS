import { Eye, EyeOff } from "lucide-react";
import { MouseEvent, useState } from "react";

interface InputProps {
  content: string;
  type: string;
  id: string;
  name: string;
}

const Input = ({ content, type, id, name }: InputProps) => {
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
        {content}
      </label>
      <div className="flex items-center justify-between w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <input
          type={inputType}
          id={id}
          name={name}
          required
          className={`border-none outline-0 ${
            isPassword ? "w-[90%]" : "w-full"
          }`}
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
