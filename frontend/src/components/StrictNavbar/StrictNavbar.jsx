import s from "./StrictNavbar.module.css";
import { useHelperFuncs } from "../../providers/HelperProvider";

export const StrictNavbar = ({ title }) => {
  const { navigateTo } = useHelperFuncs();

  return (
    <>
      <div className={s.strict_header}>
        <button onClick={() => navigateTo("/")}>{"<"}</button>
        <span>{title}</span>
      </div>
    </>
  );
};
