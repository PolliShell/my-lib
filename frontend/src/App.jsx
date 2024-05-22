import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { BookPage } from "./pages/BookPage/BookPage";
import AddBookForm from "./polli_components/books/forms/AddBookForm";
import BooksList from "./polli_components/books/BooksList";
import SignUpForm from "./polli_components/SignUpForm/SignUpForm";
import LoginForm from "./polli_components/LoginForm/LoginForm";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books/:id" element={<BookPage />} />
      </Routes>
{/*<LoginForm/>*/}
{/*<SignUpForm/>*/}
    </>
  );
};
