import { setLSItem } from "../../../helpers/LSHelpers";
import s from "./UserModal.module.css";

export const UserModal = () => {
  // TODO
  const goToUserProfilePage = () => {};

  const logout = () => {
    setLSItem("userToken", null);
    window.location.reload();
  };

  return (
    <>
      <div className={s.user_modal}>
        <div className={s.user_modal_actions}>
          <span onClick={() => goToUserProfilePage}>Налаштування</span>
          <span onClick={() => logout()}>Вийти</span>
        </div>
      </div>
    </>
  );
};
