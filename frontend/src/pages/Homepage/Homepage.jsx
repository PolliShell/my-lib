import s from "./Homepage.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookPreview } from "../../components/BookPreview/BookPreview";

export const Homepage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
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
          <h2>Популярні книги</h2>
          <div className={s.books}>
            {books.map((book) => (
              <BookPreview key={book.objectId} book={book} />
            ))}
          </div>
        </section>
        <section>
          <h2>Акційні книги</h2>
          <div className={s.books}>
            {/* Render discounted books similarly */}
          </div>
        </section>
      </main>
    </>
  );
};
