import "./Homepage.css";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookPreview } from "../../components/BookPreview/BookPreview";
import axios from "axios";

export const Homepage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/books/`
      );
      setBooks(data);
    } catch (error) {
      console.error("Failed to fetch books", error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="main container">
        <section className="popular-books">
          <h2>Популярні книги</h2>
          <div className="books">
            {books.map((book) => (
              <BookPreview key={book.objectId} book={book} />
            ))}
          </div>
        </section>
        <section className="stock-books">
          <h2>Акційні книги</h2>
          <div className="books">{/* Render discounted books similarly */}</div>
        </section>
      </main>
    </>
  );
};
