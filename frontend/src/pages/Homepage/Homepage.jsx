import s from "./Homepage.module.css";
import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookPreview } from "../../components/BookPreview/BookPreview";
import { axiosInstance } from "../../axios/axiosInstance";

export const Homepage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/books");
        setBooks(res);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <main className={`${s.main} container`}>
        <section>
          <h2>Книги</h2>
          <div className={s.books}>
            {books?.map((book) => (
              <BookPreview key={book.objectId} book={book} />
            ))}
          </div>
        </section>
        {/* <section>
          <h2>Акційні книги</h2>
          <div className={s.books}>
            Render discounted books similarly
          </div>
        </section> */}
      </main>
    </>
  );
};
