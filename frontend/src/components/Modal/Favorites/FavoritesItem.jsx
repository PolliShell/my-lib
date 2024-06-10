import s from "./Favorites.module.css";
import RemoveItemImg from "../../../public/Navbar/Modal/bin icon.png";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const FavoritesItem = ({ data, favBooks, setFavBooks }) => {
  const { navigateTo } = useHelperFuncs();

  const removeItem = async () => {
    try {
      const res = await axiosInstance.delete(
        `/favorites/delete/${data.objectId}`
      );
      if (res.status) {
        const filteredBooks = favBooks.filter(
          (b) => b.objectId !== data.objectId
        );
        setFavBooks(filteredBooks);
      }
    } catch (e) {
      console.log("Failed deleting item");
    }
  };

  return (
    <>
      <div className={s.fav_item}>
        <img
          src={data.cover_image}
          alt="book cover img"
          onClick={() => navigateTo(`/books/${data.objectId}`)}
        />
        <div className={s.fav_item_info}>
          <div
            className={s.fav_item_title}
            onClick={() => navigateTo(`/books/${data.objectId}`)}
          >
            {data.title}
          </div>
        </div>
        <div className={s.fav_item_actions}>
          <div
            className={s.fav_item_remove}
            onClick={() => removeItem(data.objectId)}
          >
            <img src={RemoveItemImg} alt="" />
          </div>
          <span className={s.fav_item_price}>{data.price} грн.</span>
        </div>
      </div>
    </>
  );
};
