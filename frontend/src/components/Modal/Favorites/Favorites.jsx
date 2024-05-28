import s from "./Favorites.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthProvider";
import { EmptyModal } from "../EmptyModal/EmptyModal";
import { FavoritesItem } from "./FavoritesItem";
import { axiosInstance } from "../../../axios/axiosInstance";

export const Favorites = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [favBooks, setFavBooks] = useState([]);

  useEffect(() => {
    const fetchFavBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/favorites");
          setFavBooks(res);
        } catch (error) {
          console.error("Failed to fetch books:", error);
        }
      }
    };
    fetchFavBooks();
  }, []);

  return (
    <>
      {favBooks && favBooks.length ? (
        <div className={s.fav}>
          <div className={s.fav_items}>
            {favBooks.map((b) => (
              <FavoritesItem
                key={b.objectId}
                data={b}
                favBooks={favBooks}
                setFavBooks={setFavBooks}
              />
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
