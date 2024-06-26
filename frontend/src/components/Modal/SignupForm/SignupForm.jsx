import s from "../Modal.module.css";
import GoogleAuthIcon from "../../../public/Navbar/Modal/google_auth_icon.png";
import { useState } from "react";
import { setLSItem } from "../../../helpers/LSHelpers";
import { axiosInstance } from "../../../axios/axiosInstance";

export const SignupForm = ({ setModalType }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/signup", formData);

      if (!res.status) {
        return;
      }

      setLSItem("userToken", res.accessToken);
      setLSItem("cartBooks", []);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <>
      <div className={s.modal_body}>
        <div className={s.modal_body_header}>
          <span className={s.modal_body_heading}>Створити профіль</span>
          <span className={s.modal_body_subheading}>
            Заповніть всі поля нижче, щоб створити свій профіль
          </span>
        </div>
        <div className={s.modal_body_quick_auth}>
          <img src={GoogleAuthIcon} alt="google auth" className="google_auth" />
        </div>
        <form onSubmit={handleSignUp} className={s.modal_body_form}>
          <input
            type="username"
            placeholder="Ім'я та прізвище"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
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
            Зареєструватися
          </button>
        </form>
        <div className={s.modal_body_register}>
          <span className={s.modal_body_register_desc}>Вже є профіль?</span>
          <span
            className={s.modal_body_register_link}
            onClick={() => setModalType("login")}
          >
            Увійти
          </span>
        </div>
      </div>
    </>
  );
};
