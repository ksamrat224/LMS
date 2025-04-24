interface ButtonProps {
    label: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    bgColor?: string;
  }
  
  const Button = ({ label, type, onClick, bgColor }: ButtonProps) => {
    return (
      <div>
        <button
          onClick={onClick}
          type={type}
          className={`${bgColor} w-full text-white py-2 rounded-lg font-semibold hover:opacity-85 transition-colors`}
        >
          {label}
        </button>
      </div>
    );
  };
  
  export default Button;