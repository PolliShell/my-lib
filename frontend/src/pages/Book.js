import React from "react";
import BookRatingNumIcon from "../../public/BookPage/rating num icon.png";
import OutlinedRatingIcon from "../../public/BookPage/outlined star icon.png";
import ColoredRatingIcon from "../../public/BookPage/colored star icon.png";
import s from "./Book.module.css";

export const Book = ({ book }) => {
    return (
        <div className={s.book}>
            <div className={s.book_bg_cover}></div>
            <img className={s.book_image} src={book.cover_image} alt="book cover img" />
            <div className={s.book_inner}>
                <div className={s.book_info}>
                    <h3 className={s.book_title}>{book.title}</h3>
                    <h4 className={s.book_author}>{book.authorName}</h4>
                    {/*<span className={s.book_genres}>{book.genres ? book.genres.join(", ") : ""}</span>*/}
                </div>
                <div className={s.book_rating}>
                    <div className={s.book_rating_num}>
                        <span>{book.rating}</span>
                        <img src={BookRatingNumIcon} alt="book rating num icon" />
                    </div>
                    <div className={s.book_rating_action}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <img key={i} src={i < book.rating ? ColoredRatingIcon : OutlinedRatingIcon} alt={`book rating icon ${i + 1}`} />
                        ))}
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
                    <span>Видавництво:</span>
                    <span className={s.book_publisher_link}>{book.publisher}</span>
                </div>
            </div>
        </div>
    );
};
