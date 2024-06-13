/* eslint-disable default-case */
import s from "./BookList.module.css";
import { BookPreview } from "../BookPreview/BookPreview";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
import { useParams, useSearchParams } from "react-router-dom";
import { useStateValue } from "../../providers/StateProvider";

export const BookList = ({ type }) => {
  const [books, setBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const { categories } = useStateValue();
  const [searchParams] = useSearchParams();
  const titleParam = searchParams.get("title");
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const res = await axiosInstance.get(`/genres/${categoryId}`);
        setCategoryBooks(res);
      } catch (e) {
        console.error("Failed to fetch category books", e);
      }
    };

    const fetchSearchBooks = async () => {
      try {
        const res = await axiosInstance.post(
          `/books/search?title=${titleParam}`
        );
        setSearchBooks(res);
      } catch (e) {
        console.error("Failed to search books", e);
      }
    };

    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/books");
        setBooks(res);
      } catch (e) {
        console.error("Failed to fetch books", e);
      }
    };

    switch (type) {
      case "titleSearch":
        fetchSearchBooks();
        break;
      case "categorySearch":
        fetchCategoryBooks();
        break;
    }

    fetchBooks();
  }, []);

  const renderBooks = (title, books) => {
    return (
      <>
        <h2>{title}</h2>
        <div className={s.books}>
          {books.map((book) => (
            <BookPreview key={book.objectId} book={book} />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {type === "homepage" ? (
        <section>{renderBooks("Книги", books)}</section>
      ) : type === "categorySearch" ? (
        <>
          <section>
            {categoryBooks.length ? (
              renderBooks(
                `Книги за жанром "${
                  categories?.find((c) => c.objectId === categoryId)?.title
                }"`,
                categoryBooks
              )
            ) : (
              <h2>
                Книг за жанром "
                {categories?.find((c) => c.objectId === categoryId)?.title}" не
                знайдено
              </h2>
            )}
          </section>
          <section>{renderBooks("Інші книги", books)}</section>
        </>
      ) : type === "titleSearch" ? (
        <>
          <section>
            {searchBooks.length ? (
              renderBooks(`Книги за запитом "${titleParam}"`, searchBooks)
            ) : (
              <h2>Книг за вашим запитом "{titleParam}" не знайдено</h2>
            )}
          </section>
          <section>{renderBooks("Інші книги", books)}</section>
        </>
      ) : (
        ""
      )}
    </>
  );
};
