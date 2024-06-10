import { useHelperFuncs } from "../../../../providers/HelperProvider";
import s from "./BoughtBookItem.module.css";

export const BoughtBookItem = ({ data }) => {
  const { navigateTo } = useHelperFuncs();

  return (
    <>
      <div className={s.book_item}>
        <img
          src={data.cover_image}
          alt="book cover img"
          onClick={() => navigateTo(`/books/${data.objectId}`)}
        />
        <div className={s.book_item_info}>
          <div
            className={s.book_item_title}
            onClick={() => navigateTo(`/books/${data.objectId}`)}
          >
            {data.title}
          </div>
        </div>
        <div className={s.book_item_actions}>
          <span className={s.book_item_price}>{data.price} грн.</span>
          <button className={s.book_item_read}>Читати онлайн</button>
        </div>
      </div>
    </>
  );
};
