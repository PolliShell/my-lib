import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { BookPage } from "./pages/BookPage/BookPage";
import { OrderPage } from "./pages/OrderPage/OrderPage";
import { UserPage } from "./pages/UserPage/UserPage";
import { ReaderPage } from "./pages/ReaderPage/ReaderPage";
import { SearchBooksPage } from "./pages/SearchBooksPage/SearchBooksPage";
import { CategoryBooksPage } from "./pages/CategoryBooksPage/CategoryBooksPage";
import { getLSItem, setLSItem } from "./helpers/LSHelpers";

export const App = () => {
  // Default LS items
  const cartBooks = getLSItem("cartBooks");
  const userToken = getLSItem("userToken");
  if (cartBooks === null) {
    setLSItem("cartBooks", []);
  }
  if (userToken === null) {
    setLSItem("userToken", null);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/books/by-category/:categoryId"
          element={<CategoryBooksPage />}
        />
        <Route path="/books/search" element={<SearchBooksPage />} />
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/books/:id/read" element={<ReaderPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/profile" element={<UserPage />} />
        {/* <Route path="/authors/:id" element={<AuthorPage />} /> */}
      </Routes>
    </>
  );
};
