"use client";
import { PasswordHideIcon, PasswordShowIcon } from "@/assets/images/icon";
import React, { useState } from "react";

interface InputType {
  placeholder: string;
  name: string;
  extraStyle?: string;
  type: "text" | "password" | "email" | "number";
}
const Input: React.FC<InputType> = ({
  extraStyle,
  name,
  placeholder,
  type,
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  return (
    <label className="relative">
      <input
        className={`w-full pl-[14px] py-3 outline-none rounded-[5px] border-[1px] border-[#EAEAEA] text-black placeholder:text-gray-400 text-[14px] font-normal leading-[16px] focus:border-[#46A358] ${extraStyle}`}
        name={name}
        placeholder={placeholder}
        type={type == "password" ? (showPass ? "text" : "password") : type}
      />
      {type == "password" && (
        <div
          onClick={() => setShowPass(!showPass)}
          className="flex items-center justify-center absolute top-[5px] right-[10px] cursor-pointer"
        >
          <button className={`${showPass ? "" : "hidden"}`} type="button">
            <PasswordHideIcon />
          </button>
          <button className={`${showPass ? "hidden" : ""}`} type="button">
            <PasswordShowIcon />
          </button>
        </div>
      )}
    </label>
  );
};
export default Input;
