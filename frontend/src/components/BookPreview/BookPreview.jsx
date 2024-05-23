import s from "./BookPreview.module.css";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "../Modal/Modal";
import FavoritesIcon from "../../public/Navbar/favorites.png";
import { toBookPage } from "../../helpers/toBookPage";
import {
  addToLS,
  checkObjectByPropInLS,
  getFromLS,
} from "../../helpers/LSHelpers";

const buyBook = () => {
  // Логика для покупки книги
};

export const BookPreview = ({ book }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // login || signup || cart || favorites

  const getInFavorite = () => {
    // user passed auth and has his cookie in session:
    setModalType("favorites");
    // user is not authenticated:
    // setModalType("login");

    setIsModalOpen(true);
  };

  const addToCart = (book) => {
    // Логика для добавления в корзину
    const LS_cartBooks = getFromLS("cartBooks");
    if (!checkObjectByPropInLS("cartBooks", "id", book.id)) {
      LS_cartBooks.push(book);
      addToLS("cartBooks", LS_cartBooks);
    }
    // if user passed auth and has his cookie in session:
    setModalType("cart");
    // if user is not authenticated: (need to put logic here)
    // setModalType("login");

    setIsModalOpen(true);
  };

  const checkBookInLS = (id) => checkObjectByPropInLS("cartBooks", "id", id);

  const showCartModal = () => {
    setModalType("cart");
    setIsModalOpen(true);
  };

  return (
    <div className={s.book}>
      <div className={s.get_in_favorite_btn} onClick={getInFavorite}>
        <img src={FavoritesIcon} alt="getInFavoriteIcon" />
      </div>
      <div className={s.book_inner} onClick={() => toBookPage(book.objectId)}>
        <img src={book.cover_image} alt={book.title} className={s.book_img} />
        <div className={s.book_info}>
          <span className={s.book_title}>{book.title}</span>
          <span className={s.book_author}>{book.author_name}</span>
          <span className={s.book_price}>
            {book.price ? `${book.price} грн` : "Немає в наявності"}
          </span>
        </div>
      </div>
      {book.price && !checkBookInLS(book.objectId) ? (
        <div className={s.book_actions}>
          <button className={s.book_buy} onClick={buyBook}>
            Купити
          </button>
          <button
            className={s.book_addToCart}
            onClick={() =>
              addToCart({
                id: book.objectId,
                img: book.cover_image,
                title: book.title,
                price: book.price,
              })
            }
          >
            До корзини
          </button>
        </div>
      ) : (
        <div className={s.book_actions}>
          <button className={s.book_show_cart} onClick={showCartModal}>
            У корзині
          </button>
        </div>
      )}
      {isModalOpen &&
        ReactDOM.createPortal(
          <Modal setIsModalOpen={setIsModalOpen} type={modalType} />,
          document.body
        )}
    </div>
  );
};

export default BookPreview;
