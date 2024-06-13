import s from "./Favorites.module.css";
import { EmptyModal } from "../EmptyModal/EmptyModal";
import { FavoritesItem } from "./FavoritesItem";
import { useStateValue } from "../../../providers/StateProvider";

export const Favorites = () => {
  const { favorites } = useStateValue();

  return (
    <>
      {favorites.length ? (
        <div className={s.fav}>
          <div className={s.fav_items}>
            {favorites.map((b) => (
              <FavoritesItem key={b.objectId} data={b} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyModal
          data={{
            title: "Список пустий",
            subtitle:
              "Додайте товари, які вам сподобались, щоб вони тут відображались",
          }}
        />
      )}
    </>
  );
};
