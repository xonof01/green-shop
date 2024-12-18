"use client";

import React, { useState, FormEvent, useEffect, useRef } from "react";
import { LoginIcon, Logo } from "@/assets/images/icon";
import Button from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Modal from "./Modal";
import { instance } from "@/hooks/instance";
import LoginInput from "./LoginInput";
import RegisterInput from "./RegisterInput";
import VerifyRegister from "./RegisterInput/VerifyRegister";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import { useGetBaskets } from "@/hooks/useGetBaskets";

const navbarItems = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Shop", path: "/shop" },
  { id: 3, title: "Plant Care", path: "/plant" },
  { id: 4, title: "Blogs", path: "/blogs" },
];

const Header = () => {
  const path = usePathname();
  const { baskets } = useGetBaskets();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [authState, setAuthState] = useState<
    "login" | "register" | "verifyRegister" | "forgotPassword" | "resetPassword"
  >("login");

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const loginData = {
      password: form.password?.value,
      usernameoremail: form.email?.value,
    };

    const registerData = {
      firstName: form.username?.value,
      lastName: form.username?.value,
      email: form.email?.value,
      password: form.password?.value,
    };

    const verifyData = {
      email: registerEmail,
      code: form.code?.value,
    };

    const resetData = {
      email: registerEmail,
      password: form.password?.value,
      otp: form.otp?.value,
    };

    switch (authState) {
      case "login":
        instance.post("/login", loginData).then((res) => {
          localStorage.setItem("access_token", res.data.access_token);
          setAuthState("login");
          setRegisterEmail("");
          setModalOpen(false);
        });
        break;
      case "register":
        if (form.password.value === form.confirm_password.value) {
          instance.post("/register", registerData).then(() => {
            setRegisterEmail(registerData.email);
            setAuthState("verifyRegister");
          });
        } else {
          alert("Passwords must match!");
        }
        break;
      case "verifyRegister":
        instance
          .post("/users/verify", {}, { params: verifyData })
          .then(() => setAuthState("login"));
        break;
      case "forgotPassword":
        const email = form.email?.value;
        instance.post(`/forgot/${email}`).then(() => {
          setRegisterEmail(email);
          setAuthState("resetPassword");
        });
        break;
      case "resetPassword":
        instance
          .put("/reset-password", resetData)
          .then(() => setAuthState("login"));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, [authState]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b border-[#EEF7F0]">
      <div className="container mx-auto px-4 flex items-center justify-between h-[70px]">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="flex items-center gap-[50px]">
          {navbarItems.map(({ id, title, path: itemPath }) => (
            <Link
              key={id}
              href={itemPath}
              className={`py-[25px] text-[#3D3D3D] text-[16px] font-normal leading-[20px] border-b-[2px] ${
                itemPath === path
                  ? "font-bold border-[#46A358] text-[#46A358]"
                  : "border-transparent hover:text-[#46A358] transition-colors"
              }`}
            >
              {title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-[#46A358] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          <button className="p-2 hover:text-[#46A358] transition-colors relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            {baskets?.totalCount && (
              <span className="absolute -top-1 -right-1 bg-[#46A358] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {baskets?.totalCount || 0}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <div className="relative">
              <Button
                type="button"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                }
                title="Profile"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
                extraStyle="flex items-center gap-2 py-2 px-4 text-[#46A358] hover:bg-[#46A358] hover:text-white rounded-md transition-colors"
              />

              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md border border-gray-300 shadow-lg p-1 z-10"
                >
                  <Button
                    type="button"
                    title="Log out"
                    onClick={handleLogout}
                    extraStyle="block w-full bg-red-500 text-left px-4 py-2 text-sm text-white"
                  />
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => setModalOpen(true)}
              title="Login"
              leftIcon={<LoginIcon />}
              extraStyle="py-2 px-4"
              type="button"
            />
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen} width={500}>
        <ul className="mb-[55px] flex items-center justify-center gap-[10px]">
          <li
            onClick={() => setAuthState("login")}
            className={`${
              authState === "login" && "text-[#46A358]"
            } text-[#3D3D3D] text-[20px] font-medium leading-[16px] cursor-pointer`}
          >
            Login
          </li>
          <li className="w-[1px] h-[16px] bg-[#3D3D3D]"></li>
          <li
            onClick={() => setAuthState("register")}
            className={`${
              authState === "register" && "text-[#46A358]"
            } text-[#3D3D3D] text-[20px] font-medium leading-[16px] cursor-pointer`}
          >
            Register
          </li>
        </ul>
        <form onSubmit={handleFormSubmit}>
          {authState === "login" && <LoginInput setIsLogin={setAuthState} />}
          {authState === "register" && <RegisterInput />}
          {authState === "verifyRegister" && (
            <VerifyRegister registerEmail={registerEmail} />
          )}
          {authState === "forgotPassword" && <ForgotPassword />}
          {authState === "resetPassword" && <ResetPassword />}
        </form>
      </Modal>
    </header>
  );
};

export default Header;
