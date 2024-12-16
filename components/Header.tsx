"use client";
import React, { useState, FormEvent } from "react";
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

const Header = () => {
  const path = usePathname();
  const [registerEmail, setRegisterEmail] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [authState, setAuthState] = useState<
    "login" | "register" | "verifyRegister" | "forgotPassword" | "resetPassword"
  >("verifyRegister");

  const navbarItems = [
    { id: 1, title: "Home", path: "/" },
    { id: 2, title: "Shop", path: "/shop" },
    { id: 3, title: "Plant Care", path: "/plant" },
    { id: 4, title: "Blogs", path: "/blogs" },
  ];

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
        instance()
          .post("/login", loginData)
          .then(() => setModalOpen(false));
        break;
      case "register":
        if (form.password.value === form.confirm_password.value) {
          instance()
            .post("/register", registerData)
            .then(() => {
              setRegisterEmail(registerData.email);
              setAuthState("verifyRegister");
            });
        } else {
          alert("Passwords must match!");
        }
        break;
      case "verifyRegister":
        instance()
          .post("/users/verify", {}, { params: verifyData })
          .then(() => setAuthState("login"));
        break;
      case "forgotPassword":
        const email = form.email?.value;
        instance()
          .post(`/forgot/${email}`)
          .then(() => {
            setRegisterEmail(email);
            setAuthState("resetPassword");
          });
        break;
      case "resetPassword":
        instance()
          .put("/reset-password", resetData)
          .then(() => setAuthState("login"));
        break;
      default:
        break;
    }
  };

  return (
    <header>
      <div className="container1 flex items-center justify-between border-b-[1px] border-[#EEF7F0]">
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
                  ? "font-bold border-[#46A358]"
                  : "border-transparent"
              }`}
            >
              {title}
            </Link>
          ))}
        </nav>
        <Button
          onClick={() => setModalOpen(true)}
          title="Login"
          leftIcon={<LoginIcon />}
          extraStyle="py-[7px] px-[17px]"
          type="button"
        />
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
      </div>
    </header>
  );
};

export default Header;
