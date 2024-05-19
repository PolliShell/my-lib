import { Navbar } from "../../components/Navbar/Navbar";
import BookCoverImg from "../../public/BookPage/book-cover.png";
import BookRatingNumIcon from "../../public/BookPage/rating num icon.png";
import BookRatingIcon from "../../public/BookPage/outlined star icon.png";
import CommenterAvatar from "../../public/BookPage/commenter avatar.png";
import s from "./BookPage.module.css";

export const BookPage = () => {
  return (
    <>
      <Navbar />
      <main className={`${s.book} container`}>
        <div className={s.book_bg_cover}></div>
        <img
          className={s.book_image}
          src={BookCoverImg}
          alt="book cover img"
        ></img>
        <div className={s.book_inner}>
          <div className={s.book_info}>
            <h3 className={s.book_title}>Назва книги</h3>
            <h4 className={s.book_author}>Автор книги</h4>
            <span className={s.book_genres}>Жанр 1, Жанр 2, Жанр 3</span>
          </div>
          <div className={s.book_rating}>
            <div className={s.book_rating_num}>
              <span>4,5</span>
              <img src={BookRatingNumIcon} alt="book rating num icon" />
            </div>
            <div className={s.book_rating_action}>
              <img src={BookRatingIcon} alt="book rating icon 1" />
              <img src={BookRatingIcon} alt="book rating icon 2" />
              <img src={BookRatingIcon} alt="book rating icon 3" />
              <img src={BookRatingIcon} alt="book rating icon 4" />
              <img src={BookRatingIcon} alt="book rating icon 5" />
            </div>
            <span className={s.book_rating_text}>Моя оцінка</span>
          </div>
          <div className={s.book_description}>
            <h5 className={s.book_desc_heading}>Опис книги</h5>
            <div className={s.book_desc_inner}>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in ...
              </p>
              <span className={s.book_desc_resize}>Розгорнути</span>
            </div>
          </div>
          <div className={s.book_publisher}>
            <span>Видавницство:</span>
            <span className={s.book_publisher_link}>
              Книжный клуб «Клуб семейного досуга»
            </span>
          </div>
          <div className={s.book_best_resentment}>
            <h6 className="book_resentment_heading">
              Найкраща рецензія на книгу
            </h6>
            <div className="book_resentment_commenter">
              <img src={CommenterAvatar} alt="commenter avatar" />
              <span>
                <b>Користувач</b> написав рецензію
              </span>
            </div>
            <div className="book_best_resentment_img_cover">
              <img src={BookCoverImg} alt="book cover" />
            </div>
            <span className="book_resentment_date">
              11 жовтня 2024 p. 20:13
            </span>
            <div className="book_resentment_rating"></div>
            <div className="book_resentment_text"></div>
          </div>
          <div className={s.book_additional_info}></div>
          <div className={s.book_resentments}></div>
        </div>
        <div className={s.book_actions}>
          <span className={s.book_price}>699 грн</span>
          <div className={s.book_btns}>
            <button className={s.read_online}>Читати онлайн</button>
            <div className={s.actions_separator}></div>
            <button className={s.buy}>Замовити</button>
          </div>
        </div>
      </main>
    </>
  );
};
