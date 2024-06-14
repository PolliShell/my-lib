import s from "./Categories.module.css";
import CloseBtnIcon from "../../../public/Navbar/close btn.png";
import { useStateValue } from "../../../providers/StateProvider";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const Categories = ({ setCategoriesModalOpen }) => {
  const { categories } = useStateValue();
  const { navigateTo } = useHelperFuncs();

  const renderCategories = () => {
    return categories
      ? categories.map((c) => (
          <div
            key={c.objectId}
            className={s.categories_item}
            onClick={() => {
              setCategoriesModalOpen(false);
              navigateTo(`/books/by-category/${c.objectId}`);
            }}
          >
            <span>{c.title}</span>
          </div>
        ))
      : "";
  };

  return (
    <>
      <div
        className={s.modal_shadow}
        onClick={() => setCategoriesModalOpen(false)}
      ></div>
      <div className={s.categories}>
        <button
          className={s.categories_close_btn}
          onClick={() => setCategoriesModalOpen(false)}
        >
          <img src={CloseBtnIcon} alt="close btn" />
        </button>
        <div className={s.categories_items}>{renderCategories()}</div>
      </div>
    </>
  );
};
