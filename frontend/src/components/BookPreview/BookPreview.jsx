import React from "react";
import s from "./BookPreview.module.css";
import FavoritesIcon from "../../public/Navbar/favorites.png";

const toBookPage = (objectId) => {
  window.location.href = `/books/${objectId}`;
};

const getInFavorite = () => {
  // Логика для добавления в избранное
};

const buyBook = () => {
  // Логика для покупки книги
};

const addToCart = () => {
  // Логика для добавления в корзину
};

export const BookPreview = ({ book }) => {
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
            {book.price || "Немає в наявності"}
          </span>
          </div>
        </div>
        {book.price && (
            <div className={s.book_actions}>
              <button className={s.book_buy} onClick={buyBook}>
                Купити
              </button>
              <button className={s.book_addToCart} onClick={addToCart}>
                До корзини
              </button>
            </div>
        )}
      </div>
  );
};

export default BookPreview;
