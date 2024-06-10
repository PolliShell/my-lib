import s from "./Cart.module.css";
import { useState } from "react";
import { getLSItem, removeLSItem } from "../../../helpers/LSHelpers";
import RemoveItemImg from "../../../public/Navbar/Modal/bin icon.png";
import { useAuth } from "../../../providers/AuthProvider";
import { axiosInstance } from "../../../axios/axiosInstance";
import { useStateValue } from "../../../providers/StateProvider";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const CartItem = ({ book }) => {
  const { isAuthenticated } = useAuth();
  const { cart, setCart, totalPrice, setTotalPrice } = useStateValue();
  const { navigateTo } = useHelperFuncs();
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
      const res = await axiosInstance.delete(`/cart/delete/${id}`);
      if (res.status) {
        const filteredBooks = cart.filter((b) => b.objectId !== id);
        setCart(filteredBooks);
      }
    } else {
      removeLSItem("cartBooks", "objectId", id);
      setCart(getLSItem("cartBooks"));
    }
  };

  return (
    <>
      <div className={s.cart_item}>
        <img
          src={book.cover_image}
          alt="book cover img"
          onClick={() => navigateTo(`/books/${book.objectId}`)}
        />
        <div className={s.cart_item_info}>
          <div
            className={s.cart_item_title}
            onClick={() => navigateTo(`/books/${book.objectId}`)}
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
