import s from "./Cart.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CartItem } from "./CartItem";
import { getLSItem } from "../../../helpers/LSHelpers";

export const Cart = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [cartBooks, setCartBooks] = useState(getLSItem("cartBooks"));

  useEffect(() => {
    const res = cartBooks
      .map((b) => b.price)
      .reduce((acc, next) => acc + next, 0);
    setTotalPrice(res);
  }, [cartBooks]);

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}/auth/login`,
  //       {
  //         ...formData,
  //       }
  //     );

  //     if (!user.data.token) {
  //       setOpenErrorModal(true);
  //       setErrorMsg("Login failed. Please check your credentials.");
  //     }
  //   } catch (error) {
  //     setOpenErrorModal(true);
  //     setErrorMsg("Login failed. Please check your credentials.");
  //   }
  // };

  return (
    <>
      <div className={s.cart}>
        <div className={s.cart_items}>
          {cartBooks && cartBooks.length
            ? cartBooks.map((book) => (
                <CartItem
                  key={book.id}
                  book={book}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  setCartBooks={setCartBooks}
                />
              ))
            : ""}
          <div className={s.cart_items_info}>
            <span className={s.cart_items_info_text}>
              До оплати без доставки:
            </span>
            <span className={s.cart_items_info_price}>{totalPrice} грн.</span>
          </div>
        </div>
        <div className={s.cart_actions}></div>

        {openErrorModal ? (
          <ErrorMessage msg={errorMsg} setOpenErrorModal={setOpenErrorModal} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};
