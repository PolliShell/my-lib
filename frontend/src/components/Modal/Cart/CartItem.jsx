import s from "./Cart.module.css";
import { useContext, useState } from "react";
import { toBookPage } from "../../../helpers/toBookPage";
import { getLSItem, removeLSItem } from "../../../helpers/LSHelpers";
import RemoveItemImg from "../../../public/Navbar/Modal/bin icon.png";
import { AuthContext } from "../../../auth/AuthProvider";
import { axiosInstance } from "../../../axios/axiosInstance";

export const CartItem = ({
  book,
  totalPrice,
  setTotalPrice,
  cartBooks,
  setCartBooks,
}) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(book.price);

  const handleChange = (action) => {
    if (action === "down" && count > 1) {
      setCount(count - 1);
      setPrice(price - book.price);
      setTotalPrice(totalPrice - book.price);
      return;
    } else if (action === "up") {
      setCount(count + 1);
      setPrice(price + book.price);
      setTotalPrice(totalPrice + book.price);
    }
  };

  const removeItem = async (id) => {
    if (isAuthenticated) {
      try {
        const res = await axiosInstance.delete(`/cart/delete/${id}`);
        if (res.status) {
          const filteredBooks = cartBooks.filter((b) => b.objectId !== id);
          setCartBooks(filteredBooks);
        }
      } catch (e) {
        console.log("Failed deleting item");
      }
    } else {
      removeLSItem("cartBooks", "objectId", id);
      setCartBooks(getLSItem("cartBooks"));
    }
  };

  return (
    <>
      <div className={s.cart_item}>
        <img
          src={book.cover_image}
          alt="book cover img"
          onClick={() => toBookPage(book.objectId)}
        />
        <div className={s.cart_item_info}>
          <div
            className={s.cart_item_title}
            onClick={() => toBookPage(book.objectId)}
          >
            {book.title}
          </div>
          <div className={s.cart_item_counter}>
            <button
              onClick={() => {
                handleChange("down");
              }}
            >
              -
            </button>
            <span>{count} шт.</span>
            <button
              onClick={() => {
                handleChange("up");
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className={s.cart_item_actions}>
          <div
            className={s.cart_item_remove}
            onClick={() => removeItem(book.objectId)}
          >
            <img src={RemoveItemImg} alt="" />
          </div>
          <span className={s.cart_item_price}>{price} грн.</span>
        </div>
      </div>
    </>
  );
};
