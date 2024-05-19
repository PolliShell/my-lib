import "./BookPreview.css";
import BookCoverImg from "../../public/Homepage/book-cover.png";

const toBookPage = () => {
  return (window.location.href = "/book");
};

export const BookPreview = () => {
  return (
    <>
      <div className="book" onClick={toBookPage}>
        <img src={BookCoverImg} alt="book img" className="book-img" />
        <div className="book-info">
          <span className="book-title">Назва книги</span>
          <span className="book-author">Автор книги</span>
          <span className="book-price">699 грн</span>
        </div>
      </div>
    </>
  );
};
