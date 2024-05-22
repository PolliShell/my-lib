import React, { useState, useEffect } from "react";
import axios from "axios";

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:3000/books/");
                setBooks(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch books:", err);
                setError(err);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading books: {error.message}</p>;

    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.objectId}>
                        <h2>{book.title}</h2>
                        <p>{book.description}</p>
                        <p>Published Year: {book.publication_year}</p>
                        <p>Author: {book.authorName}</p> {/* Отображаем имя автора */}
                        <img src={book.cover_image} alt={book.title} width="100" />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
