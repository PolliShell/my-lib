import { setLSItem } from "../../../helpers/LSHelpers";
import { useHelperFuncs } from "../../../providers/HelperProvider";
import s from "./UserModal.module.css";

export const UserModal = () => {
  const { navigateTo } = useHelperFuncs();

  const logout = () => {
    setLSItem("userToken", null);
    window.location.reload();
  };

  return (
    <>
      <div className={s.user_modal}>
        <div className={s.user_modal_actions}>
          <span onClick={() => navigateTo("/profile")}>Налаштування</span>
          <span onClick={() => logout()}>Вийти</span>
        </div>
      </div>
    </>
  );
};
