import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { BookPage } from "./pages/BookPage/BookPage";
import { setLSItem, getLSItem } from "./helpers/LSHelpers";
import { OrderPage } from "./pages/OrderPage/OrderPage";
// import AddBookForm from "./polli_components/books/forms/AddBookForm";
// import BooksList from "./polli_components/books/BooksList";
// import SignUpForm from "./polli_components/SignUpForm/SignUpForm";
// import LoginForm from "./polli_components/LoginForm/LoginForm";

export const App = () => {
  const cartBooks = getLSItem("cartBooks");
  if (cartBooks === null) {
    setLSItem("cartBooks", []);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
};
