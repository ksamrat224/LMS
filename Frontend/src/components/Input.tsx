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
      <div className="relative">
        <input
          type={inputType}
          id={id}
          name={name}
          required
          className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={handleShowPassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;