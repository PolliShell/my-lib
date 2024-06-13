import s from "./BookPreview.module.css";
import ReactDOM from "react-dom";
import FavoritesIcon from "../../public/Navbar/favorites.png";
import ColoredFavoritesIcon from "../../public/Navbar/colored favorite.png";
import { Modal } from "../Modal/Modal";
import { useStateValue } from "../../providers/StateProvider";
import { useHelperFuncs } from "../../providers/HelperProvider";

export const BookPreview = ({ book }) => {
  const { favorites, cart, isModalOpen } = useStateValue();
  const { openModal, navigateTo, addBookToCart, addToFavorites } =
    useHelperFuncs();

  const renderBuyBtn = (id) => {
    const isExists = cart.find((b) => b.objectId === id);

    return (
      <div className={s.book_actions}>
        {isExists ? (
          <button
            className={s.book_in_cart_button}
            onClick={() => openModal("cart")}
          >
            У корзині
          </button>
        ) : (
          <button
            className={s.book_buy_button}
            onClick={() => addBookToCart(book)}
          >
            Купити
          </button>
        )}
      </div>
    );
  };

  const renderGetInFavBtn = (id) => {
    const isExists = favorites.find((b) => b.objectId === id);

    return (
      <div
        className={
          isExists ? `${s.get_in_favorite_btn} active` : s.get_in_favorite_btn
        }
        onClick={() => addToFavorites(book)}
      >
        <img
          src={isExists ? ColoredFavoritesIcon : FavoritesIcon}
          alt="getInFavoriteIcon"
        />
      </div>
    );
  };

  return (
    <div className={s.book}>
      {renderGetInFavBtn(book.objectId)}
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
      {renderBuyBtn(book.objectId)}
      {isModalOpen && ReactDOM.createPortal(<Modal />, document.body)}
    </div>
  );
};
