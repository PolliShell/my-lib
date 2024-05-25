import s from "./BookPreview.module.css";
import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "../Modal/Modal";
import FavoritesIcon from "../../public/Navbar/favorites.png";
import { toBookPage } from "../../helpers/toBookPage";
import { setLSItem, getLSItem, checkLSItem } from "../../helpers/LSHelpers";
import { AuthContext } from "../../auth/AuthProvider";

export const BookPreview = ({ book }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (modalType) => {
    if (modalType === "cart") {
      setModalType("cart");
      setIsModalOpen(true);
      return;
    }

    if (isAuthenticated) {
      setModalType(modalType);
    } else {
      setModalType("login");
    }
    setIsModalOpen(true);
  };

  const addToCart = (book) => {
    const LS_cartBooks = getLSItem("cartBooks");
    if (!checkLSItem("cartBooks", "id", book.id)) {
      LS_cartBooks.push(book);
      setLSItem("cartBooks", LS_cartBooks);
    }
    setModalType("cart");
    setIsModalOpen(true);
  };

  // TODO: opens BuyFormPage with book info
  const buyBook = () => {};

  return (
    <div className={s.book}>
      <div
        className={s.get_in_favorite_btn}
        onClick={() => openModal("favorites")}
      >
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
      {book.price && !checkLSItem("cartBooks", "id", book.objectId) ? (
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
          <button
            className={s.book_show_cart}
            onClick={() => openModal("cart")}
          >
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
