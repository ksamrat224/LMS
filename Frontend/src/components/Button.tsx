interface ButtonProps {
    content: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    bgColor?: string;
  }
  
  const Button = ({ content, type, onClick, bgColor }: ButtonProps) => {
    return (
      <div>
        <button
          onClick={onClick}
          type={type}
          className={`${bgColor} w-full text-white py-2 rounded-lg font-semibold hover:opacity-85 transition-colors`}
        >
          {content}
        </button>
      </div>
    );
  };
  
  export default Button;