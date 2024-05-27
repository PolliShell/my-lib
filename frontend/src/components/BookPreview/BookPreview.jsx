import s from "./BookPreview.module.css";
import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { Modal } from "../Modal/Modal";
import FavoritesIcon from "../../public/Navbar/favorites.png";
import { toBookPage } from "../../helpers/toBookPage";
import { setLSItem, getLSItem, checkLSItem } from "../../helpers/LSHelpers";
import { AuthContext } from "../../auth/AuthProvider";
import { axiosInstance } from "../../axios/axiosInstance";

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

  const addToCart = async () => {
    if (isAuthenticated) {
      await axiosInstance.post("/cart/add", { bookId: book.objectId });
    } else {
      const LS_cartBooks = getLSItem("cartBooks");
      if (!checkLSItem("cartBooks", "objectId", book.objectId)) {
        LS_cartBooks.push(book);
        setLSItem("cartBooks", LS_cartBooks);
      }
    }
    setModalType("cart");
    setIsModalOpen(true);
  };

  const addToFavorites = async () => {
    await axiosInstance.post("/favorites/add", { bookId: book.objectId });
    openModal("favorites");
  };

  // TODO: add removeFromFavorites on this component

  const checkCartItem = (id) => {
    if (isAuthenticated) {
      // TODO: make request to DB if book exists there
    }

    return checkLSItem("cartBooks", "objectId", id);
  };

  return (
    <div className={s.book}>
      <div className={s.get_in_favorite_btn} onClick={addToFavorites}>
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
      {!checkCartItem(book.objectId) ? (
        <div className={s.book_actions}>
          <button className={s.book_buy} onClick={addToCart}>
            Купити
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
