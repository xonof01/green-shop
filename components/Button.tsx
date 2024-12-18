"use client";
import React, { ReactNode } from "react";

interface ButtonType {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  title: ReactNode;
  extraTitleStyle?: string;
  extraStyle?: string;
  onClick?: () => void;
  type: "submit" | "button" | "reset";
}
const Button: React.FC<ButtonType> = ({
  leftIcon,
  title,
  rightIcon,
  extraStyle,
  extraTitleStyle,
  onClick,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#46A358] rounded-[6px] text-white flex items-center justify-center gap-[5px] ${extraStyle}`}
    >
      {leftIcon && leftIcon}
      <span className={extraTitleStyle}>{title}</span>
      {rightIcon && rightIcon}
    </button>
  );
};
export default Button;
