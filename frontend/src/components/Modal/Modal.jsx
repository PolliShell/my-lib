import s from "./Modal.module.css";
import CloseModalIcon from "../../public/Navbar/Modal/close_icon.png";
import { useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { SignupForm } from "./SignupForm/SignupForm";

export const Modal = ({ setIsModalOpen }) => {
  const [modalType, setModalType] = useState("login"); // login || signup

  return (
    <>
      <div
        className={s.modal_shadow}
        onClick={() => setIsModalOpen(false)}
      ></div>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <img
            src={CloseModalIcon}
            alt="close btn"
            onClick={() => setIsModalOpen(false)}
          />
          <span>{modalType === "login" ? "Вхід" : "Реєстрація"}</span>
        </div>
        {modalType === "login" ? (
          <LoginForm setModalType={setModalType} />
        ) : (
          <SignupForm setModalType={setModalType} />
        )}
      </div>
    </>
  );
};
