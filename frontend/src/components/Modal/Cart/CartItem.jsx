import s from "./Cart.module.css";
import { useState } from "react";
import { toBookPage } from "../../../helpers/toBookPage";
import { getLSItem, removeLSItem } from "../../../helpers/LSHelpers";
import RemoveItemImg from "../../../public/Navbar/Modal/bin icon.png";

export const CartItem = ({ book, totalPrice, setTotalPrice, setCartBooks }) => {
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

  const removeCartItem = (id) => {
    removeLSItem("cartBooks", "id", id);
    setCartBooks(getLSItem("cartBooks"));
  };

  return (
    <>
      <div className={s.cart_item}>
        <img
          src={book.img}
          alt="book cover img"
          onClick={() => toBookPage(book.id)}
        />
        <div className={s.cart_item_info}>
          <div
            className={s.cart_item_title}
            onClick={() => toBookPage(book.id)}
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
            onClick={() => removeCartItem(book.id)}
          >
            <img src={RemoveItemImg} alt="" />
          </div>
          <span className={s.cart_item_price}>{price} грн.</span>
        </div>
      </div>
    </>
  );
};
