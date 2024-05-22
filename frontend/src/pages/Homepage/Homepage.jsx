import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { BookPreview } from "../../components/BookPreview/BookPreview";
import "./Homepage.css";

export const Homepage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:3000/books");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      }
    };

    fetchBooks();
  }, []);

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
            <div className="books">
              {/* Render discounted books similarly */}
            </div>
          </section>
        </main>
      </>

);};