import s from "./Favorites.module.css";
import RemoveItemImg from "../../../public/Navbar/Modal/bin icon.png";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useHelperFuncs } from "../../../providers/HelperProvider";
import { useStateValue } from "../../../providers/StateProvider";

export const FavoritesItem = ({ data }) => {
  const { navigateTo } = useHelperFuncs();
  const { favorites, setFavorites } = useStateValue();

  const removeItem = async () => {
    const res = await axiosInstance.delete(
      `/favorites/delete/${data.objectId}`
    );
    if (res.status) {
      const filteredBooks = favorites.filter(
        (b) => b.objectId !== data.objectId
      );
      setFavorites(filteredBooks);
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
