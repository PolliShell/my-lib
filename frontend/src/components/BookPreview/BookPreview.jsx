import React from "react";
import "./BookPreview.css";

export const BookPreview = ({ book }) => {
    return (
        <div className="book">
            <img src={book.cover_image} alt={book.title} className="book-img" />
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.authorName}</p>
                <p className="book-price">{book.price} грн</p>
            </div>
        </div>
    );
};
