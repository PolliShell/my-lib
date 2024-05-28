import s from "../Modal.module.css";
import GoogleAuthIcon from "../../../public/Navbar/Modal/google_auth_icon.png";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { setLSItem } from "../../../helpers/LSHelpers";

export const LoginForm = ({ setModalType }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );

      if (!res.data.loggedIn) {
        setOpenErrorModal(true);
        setErrorMsg(res.data.message);
        return;
      }

      setLSItem("userToken", res.data.accessToken);
      window.location.reload();
    } catch (error) {
      setOpenErrorModal(true);
      setErrorMsg("Login failed. Please check your credentials.");
    }
  };

  return (
    <>
      <div className={s.modal_body}>
        <div className={s.modal_body_header}>
          <span className={s.modal_body_heading}>Увійти в кабінет</span>
          <span className={s.modal_body_subheading}>
            Увійдіть, щоб мати можливість додавати книги у обране та писати
            відгуки до прочитаних книг
          </span>
        </div>
        <div className={s.modal_body_quick_auth}>
          <img src={GoogleAuthIcon} alt="google auth" className="google_auth" />
        </div>
        <form onSubmit={handleLogin} className={s.modal_body_form}>
          <input
            type="email"
            placeholder="Пошта"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={s.submitButton}>
            Увійти
          </button>
        </form>
        <div className={s.modal_body_register}>
          <span className={s.modal_body_register_desc}>Немає профілю?</span>
          <span
            className={s.modal_body_register_link}
            onClick={() => setModalType("signup")}
          >
            Зареєструйтесь
          </span>
        </div>
        {openErrorModal ? (
          <ErrorMessage msg={errorMsg} setOpenErrorModal={setOpenErrorModal} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
