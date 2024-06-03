import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage/Homepage";
import { BookPage } from "./pages/BookPage/BookPage";
import { setLSItem, getLSItem } from "./helpers/LSHelpers";
import { OrderPage } from "./pages/OrderPage/OrderPage";

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
        <Route path="/books/:id" element={<BookPage />} />
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
};
