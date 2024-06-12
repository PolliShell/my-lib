import React, { useState } from "react";
import ReactDOM from "react-dom";
import s from "./BookPreview.module.css";
import { Modal } from "../Modal/Modal";
import FavoritesIcon from "../../public/Navbar/favorites.png";
import { pushUniqLSItem } from "../../helpers/LSHelpers";
import { useAuth } from "../../providers/AuthProvider";
import { axiosInstance } from "../../axios/axiosInstance";
import { useStateValue } from "../../providers/StateProvider";
import { useHelperFuncs } from "../../providers/HelperProvider";

export const BookPreview = ({ book }) => {
  const { isAuthenticated } = useAuth();
  const { cart, setCart, isModalOpen } = useStateValue();
  const { openModal, navigateTo } = useHelperFuncs();

  // Добавляем состояние для отслеживания наведения мыши
  const [isHovered, setIsHovered] = useState(false);

  const addToCart = async () => {
    if (isAuthenticated) {
      await axiosInstance.post("/cart/add", { bookId: book.objectId });
      setCart([...cart, book]);
    } else {
      const res = pushUniqLSItem("cartBooks", "objectId", book);
      setCart(res);
    }

    openModal("cart");
  };

  const addToFavorites = async () => {
    await axiosInstance.post("/favorites/add", { bookId: book.objectId });
    openModal("favorites");
  };

  const checkCartItem = (id) => {
    return cart.find((b) => b.objectId === id);
  };

  return (
      <div
          className={s.book}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <div className={s.get_in_favorite_btn} onClick={addToFavorites}>
          <img src={FavoritesIcon} alt="getInFavoriteIcon" />
        </div>
        <div
            className={s.book_inner}
            onClick={() => navigateTo(`/books/${book.objectId}`)}
        >
          <img src={book.cover_image} alt={book.title} className={s.book_img} />
          <div className={s.book_info}>
            <span className={s.book_title}>{book.title}</span>
            <span className={s.book_author}>{book.author_name}</span>
            <span className={s.book_price}>
            {book.price ? `${book.price} грн` : "Немає в наявності"}
          </span>
          </div>
        </div>
        {isHovered && (
            <div className={s.book_actions}>
              {!checkCartItem(book.objectId) ? (
                  <button className={s.book_buy_button} onClick={addToCart}>
                    Купити
                  </button>
              ) : (
                  <button
                      className={s.book_in_cart_button}
                      onClick={() => openModal("cart")}
                  >
                    У корзині
                  </button>
              )}
            </div>
        )}
        {isModalOpen && ReactDOM.createPortal(<Modal />, document.body)}
      </div>
  );
};
