import s from "./ErrorMessage.module.css";
import { useEffect } from "react";

export const ErrorMessage = ({ setOpenErrorModal, msg }) => {
  useEffect(() => {
    setTimeout(() => {
      setOpenErrorModal(false);
    }, 5000);
  });

  return (
    <>
      <div className={s.modal_body_error}>
        <span>{msg}</span>
      </div>
    </>
  );
};
