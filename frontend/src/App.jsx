import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { BookPage } from "./pages/BookPage/BookPage";
// import AddBookForm from "./polli_components/books/forms/AddBookForm";

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book" element={<BookPage />} />
      </Routes>
    </>
  );
};
