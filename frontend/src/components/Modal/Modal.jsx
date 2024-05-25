import s from "./Modal.module.css";
import CloseModalIcon from "../../public/Navbar/Modal/close_icon.png";
import { useState } from "react";
import { LoginForm } from "./LoginForm/LoginForm";
import { SignupForm } from "./SignupForm/SignupForm";
import { FavotiteBooks } from "./FavoriteBooks/FavoriteBooks";
import { Cart } from "./Cart/Cart";

export const Modal = ({ setIsModalOpen, type = "login" }) => {
  const [modalType, setModalType] = useState(type);

  const renderHeading = (type) => {
    switch (type) {
      case "signup":
        return "Реєстрація";
      case "cart":
        return "Кошик";
      case "favorites":
        return "Обрані книги";
      default:
        return "Увійти";
    }
  };

  const renderBody = (type) => {
    switch (type) {
      case "signup":
        return <SignupForm setModalType={setModalType} />;
      case "cart":
        return <Cart setModalType={setModalType} />;
      case "favorites":
        return <FavotiteBooks setModalType={setModalType} />;
      default:
        return <LoginForm setModalType={setModalType} />;
    }
  };

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
          <span>{renderHeading(modalType)}</span>
        </div>
        {renderBody(modalType)}
      </div>
    </>
  );
};
