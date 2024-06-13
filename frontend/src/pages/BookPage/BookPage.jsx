import s from "./BookPage.module.css";
import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import BookRatingNumIcon from "../../public/BookPage/rating num icon.png";
import OutlinedRatingIcon from "../../public/BookPage/outlined star icon.png";
import HeartIcon from "../../public/BookPage/heart.png";
// import ColoredRatingIcon from "../../public/BookPage/colored star icon.png";
// import CommenterAvatar from "../../public/BookPage/commenter avatar.png";
import {Link, useParams} from "react-router-dom";
import { AuthContext, useAuth } from "../../providers/AuthProvider";
import { checkLSItem, getLSItem, setLSItem } from "../../helpers/LSHelpers";
import { Modal } from "../../components/Modal/Modal";
import ReactDOM from "react-dom";
import { axiosInstance } from "../../axios/axiosInstance";

export const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axiosInstance.get(`/books/${id}`);
        setBook(res);
      } catch (error) {
        console.error("Failed to fetch book: ", error);
      }
    };

    fetchBook();
  }, []);

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
    if (isAuthenticated) {
      // TODO: request to the server to add a book to the cart
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

  const checkCartItem = (id) => {
    if (isAuthenticated) {
      // make request to DB if book exists there
    }

    return checkLSItem("cartBooks", "objectId", id);
  };

  const addToFavorites = async () => {
    try {
      await axiosInstance.post("/favorites/add", { bookId: book.objectId });
    } catch (e) {
      console.error(e);
    }
    openModal("favorites");
  };

  return (
    <>
      <Navbar />
      <main className={`${s.book} container`}>
        <div className={s.book_bg_cover}></div>
        <img
          className={s.book_image}
          src={book.cover_image}
          alt="book cover img"
        ></img>
        <div className={s.book_inner}>
          <div className={s.book_info}>
            <h3 className={s.book_title}>{book.title}</h3>
            <h4 className={s.book_author}>
              <Link to={`/authors/${book.author_id}`}>{book.author_name}</Link>
            </h4>
            <span className={s.book_genres}>
              {book?.genres?.join(", ") || ""}
            </span>
          </div>
          <div className={s.book_rating}>
            <div className={s.book_rating_num}>
              <span>{book.rating}</span>
              <img src={BookRatingNumIcon} alt="book rating num icon" />
            </div>
            <div className={s.book_rating_action}>
              <img src={OutlinedRatingIcon} alt="star icon" />
              <img src={OutlinedRatingIcon} alt="star icon" />
              <img src={OutlinedRatingIcon} alt="star icon" />
              <img src={OutlinedRatingIcon} alt="star icon" />
              <img src={OutlinedRatingIcon} alt="star icon" />
            </div>
            <span className={s.book_rating_text}>Моя оцінка</span>
          </div>
          <div className={s.book_description}>
            <h5 className={s.book_desc_heading}>Опис книги</h5>
            <div className={s.book_desc_inner}>
              <p>{book.description}</p>
              <span className={s.book_desc_resize}>Розгорнути</span>
            </div>
          </div>
          <div className={s.book_publisher}>
            <span>Видавницство:</span>
            <span className={s.book_publisher_link}>
              {book.publishing_house}
            </span>
          </div>
          {/* <div className={s.book_best_resentment}>
            <h4 className={s.book_resentment_heading}>
              Найкраща рецензія на книгу
            </h4>
            <div className={s.book_resentment_commenter}>
              <img src={CommenterAvatar} alt="commenter avatar" />
              <span className={s.book_resentment_commenter_heading}>
                <b>{book.bestReview.user}</b> написав рецензію
              </span>
              <span className={s.book_resentment_date}>
               {new Date(book.bestReview.date).toLocaleDateString()}
              </span>
            </div>
            <div className={s.book_resentment_rating}>
             <img src={ColoredRatingIcon} alt="comment star" />
             <span>{book.bestReview.rating}</span>
            </div>
            <div className={s.book_resentment_text}>
             <p>{book.bestReview.text}</p>
             <span className={s.book_desc_resize}>Розгорнути</span>
            </div>
          </div> */}
          <div className={s.book_additional_info}>
            <div className={s.horizontal_hr}></div>
            <div className={s.book_additional_info_inner}>
              <h4>Додаткова інформація про книгу</h4>
              <span>ISBN: {book.ISBN}</span>
              <span>Рік видання: {book.year_of_publication}</span>
              <span>Мова: {book.language}</span>
              <span>Об`єм: {book.number_of_pages} стр.</span>
              <span>Палітурка: {book.cover_type}</span>
              <span>Формат: {book.format}</span>
              <span>Вікові обмеження: {book.age_restrictions}+</span>
            </div>
            <div className={s.horizontal_hr}></div>
          </div>
          <div className={s.book_resentments}>
            <h4>Рецензії</h4>
            {/* {book.reviews.map((review, index) => (
             <div key={index} className={s.book_resentment}>
               <div className={s.book_resentment_commenter}>
                 <img src={CommenterAvatar} alt="commenter avatar" />
                 <span className={s.book_resentment_commenter_heading}>
                   <b>{review.user}</b> написав рецензію
                 </span>
                 <span className={s.book_resentment_date}>
                   {new Date(review.date).toLocaleDateString()}
                 </span>
               </div>
               <div className={s.book_resentment_rating}>
                 <img src={ColoredRatingIcon} alt="comment star" />
                 <span>{review.rating}</span>
               </div>
               <div className={s.book_resentment_text}>
                 <p>{review.text}</p>
                 <span className={s.book_desc_resize}>Розгорнути</span>
               </div>
             </div>
            ))} */}
          </div>
        </div>
        <div className={s.book_actions}>
          <button className={s.book_add_to_favorites} onClick={addToFavorites}>
            <img src={HeartIcon} alt="add to favorites" />
          </button>
          <span className={s.book_price}>{book.price} грн</span>
          <div className={s.book_btns}>
            <button className={s.read_online}>Читати онлайн</button>
            <div className={s.actions_separator}></div>
            {!checkCartItem(book.objectId) ? (
              <button
                className={s.buy}
                onClick={() =>
                  addToCart({
                    objectId: book.objectId,
                    cover_image: book.cover_image,
                    title: book.title,
                    price: book.price,
                  })
                }
              >
                Замовити
              </button>
            ) : (
              <button className={s.show_cart} onClick={() => openModal("cart")}>
                У корзині
              </button>
            )}
          </div>
        </div>
        {isModalOpen && ReactDOM.createPortal(<Modal />, document.body)}
      </main>
    </>
  );
};
