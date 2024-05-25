import s from "../Modal.module.css";
import GoogleAuthIcon from "../../../public/Navbar/Modal/google_auth_icon.png";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";

export const FavotiteBooks = ({ setModalType }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);

  return (
    <>
      <div className={s.modal_body}>
        <div className={s.modal_body_header}>
          <span className={s.modal_body_heading}>Обрані книги</span>
          <span className={s.modal_body_subheading}>
            Увійдіть, щоб мати можливість додавати книги у обране та писати
            відгуки до прочитаних книг
          </span>
        </div>
        <div className={s.modal_body_quick_auth}>
          <img src={GoogleAuthIcon} alt="google auth" className="google_auth" />
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
