import s from "./Modal.module.css";
import CloseModalIcon from "../../public/Navbar/Modal/close_icon.png";
import { LoginForm } from "./LoginForm/LoginForm";
import { SignupForm } from "./SignupForm/SignupForm";
import { Favorites } from "./Favorites/Favorites";
import { Cart } from "./Cart/Cart";
import { useStateValue } from "../../providers/StateProvider";

export const Modal = () => {
  const { modalType, setIsModalOpen } = useStateValue();

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
        return <SignupForm />;
      case "cart":
        return <Cart />;
      case "favorites":
        return <Favorites />;
      default:
        return <LoginForm />;
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
