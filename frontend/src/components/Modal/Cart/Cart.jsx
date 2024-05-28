import s from "./Cart.module.css";
import { useContext, useEffect, useState } from "react";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { CartItem } from "./CartItem";
import { getLSItem } from "../../../helpers/LSHelpers";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../auth/AuthProvider";
import { EmptyModal } from "../EmptyModal/EmptyModal";
import { axiosInstance } from "../../../axios/axiosInstance";

export const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState("");
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(null);
  const [cartBooks, setCartBooks] = useState([]);

  useEffect(() => {
    const fetchCartBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/cart");
          setCartBooks(res);
        } catch (error) {
          console.error("Failed to fetch books:", error);
        }
      } else {
        setCartBooks(getLSItem("cartBooks"));
      }
    };
    fetchCartBooks();
  }, []);

  useEffect(() => {
    const res = cartBooks
      ?.map((b) => b.price)
      .reduce((acc, next) => acc + next, 0);
    setTotalPrice(res);
  }, [cartBooks]);

  const handleOrder = () => navigate("/order");

  return (
    <>
      {cartBooks && cartBooks.length ? (
        <div className={s.cart}>
          <div className={s.cart_items}>
            {cartBooks.map((book) => (
              <CartItem
                key={book.objectId}
                book={book}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                cartBooks={cartBooks}
                setCartBooks={setCartBooks}
              />
            ))}
            <div className={s.cart_items_info}>
              <span className={s.cart_items_info_text}>
                До оплати без доставки:
              </span>
              <span className={s.cart_items_info_price}>{totalPrice} грн.</span>
            </div>
          </div>
          <div className={s.cart_actions}>
            <button
              className={s.cart_action_order_btn}
              onClick={() => handleOrder()}
            >
              Оформити замовлення
            </button>
          </div>
        </div>
      ) : (
        <EmptyModal
          data={{
            title: "Кошик пустий",
            subtitle: "Додайте товари, які вам сподобались, щоб їх замовити",
          }}
        />
      )}

      {openErrorModal ? (
        <ErrorMessage msg={errorMsg} setOpenErrorModal={setOpenErrorModal} />
      ) : (
        ""
      )}
    </>
  );
};
