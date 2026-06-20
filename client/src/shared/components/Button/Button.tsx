import type React from "react";
import style from "./Button.module.css";

interface ButtonProps {
  text: string;
  action?: () => void;
  color: "primary" | "secondary";
  type?: "button" | "submit" | "reset" | undefined
}

const Button: React.FC<ButtonProps> = ({ text, action, color, type = "button" }) => {
  const handleClick = () => {
    if(action) {
      action();
    }
  };
  return (
    <button
      type={type}
      className={`${color === "primary" 
        ? (style.primaryBtn + " text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" )
        : (style.secondaryBtn + " text-white text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none")} `}
      onClick={() => handleClick()}
    >
      {text}
    </button>
  );
};

export default Button;
