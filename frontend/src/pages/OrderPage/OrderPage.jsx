import s from "./OrderPage.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../components/Modal/Cart/CartItem";
import WalletIcon from "../../public/OrderPage/wallet.png";
import CreditIcon from "../../public/OrderPage/credit.png";
import { AuthContext } from "../../auth/AuthProvider";
import { getLSItem } from "../../helpers/LSHelpers";
import { axiosInstance } from "../../axios/axiosInstance";

export const OrderPage = () => {
  const navigate = useNavigate();
  const [cartBooks, setCartBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartBooks = async () => {
      try {
        const res = await axiosInstance.get("/cart");
        setCartBooks(res);
      } catch (err) {
        console.error("Failed to fetch cart books:", err.message);
      }
      // if (isAuthenticated) {
      //   try {
      //     const res = await axiosInstance.get("/cart");
      //     setCartBooks(res);
      //   } catch (err) {
      //     console.error("Failed to fetch cart books:", err.message);
      //   }
      // } else {
      //   setCartBooks(getLSItem("cartBooks"));
      // }
    };
    fetchCartBooks();
  }, []);

  useEffect(() => {
    const res = cartBooks
      ?.map((b) => b.price)
      .reduce((acc, next) => acc + next, 0);

    setTotalPrice(res);
  }, [cartBooks]);

  const handleOrder = async () => {
    await axiosInstance.post("/cart/purchase");
  };

  return (
    <>
      <div className={s.cart_forms_header}>
        <button onClick={() => navigate("/")}>{"<"}</button>
        <span>Оформлення замовлення</span>
      </div>
      {cartBooks?.length ? (
        <div className={s.order_container}>
          <form className={`${s.form}`}>
            <div className={s.form_left}>
              <section>
                <div className={s.form_heading}>
                  <span>1</span>
                  <h3>Список обраних товарів</h3>
                </div>
                <div className={s.form_cart_items}>
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
                </div>
              </section>
              <section>
                <div className={s.form_heading}>
                  <span>2</span>
                  <h3>Контактні дані</h3>
                </div>
                <div className={s.form_contacts}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Ім'я та прізвище"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Пошта"
                    required
                  />
                  <input
                    type="phone"
                    name="phone"
                    placeholder="Телефон"
                    required
                  />
                </div>
              </section>
              {/* <section>
                <div className={s.form_heading}>
                  <span>3</span>
                  <h3>Доставка</h3>
                </div>

                <div className={s.form_payment}>
                  <ul className={s.form_payment_choices}>
                    <li>
                      <img src={WalletIcon} alt="wallet icon" /> Оплата картою
                    </li>
                    <li>
                      <img src={CreditIcon} alt="credit icon" /> Післяплата
                    </li>
                  </ul>
                </div>
              </section> */}
              <section>
                <div className={s.form_heading}>
                  <span>3</span>
                  <h3>Оплата</h3>
                </div>

                <div className={s.form_payment}>
                  <ul className={s.form_payment_choices}>
                    <li>
                      <img src={WalletIcon} alt="wallet icon" /> Оплата картою
                    </li>
                    <li>
                      <img src={CreditIcon} alt="credit icon" /> Післяплата
                    </li>
                  </ul>
                </div>
              </section>
            </div>
            <div className={s.form_right}>
              <div className={s.form_info}>
                <span className={s.text}>До оплати усіх товарів: </span>
                <span className={s.price}>{`${totalPrice} грн`}</span>
              </div>
              <div className={s.form_actions}>
                <button onClick={handleOrder}>Оформити замовлення</button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={s.cart_empty}>
          <span className={s.cart_empty_heading}>Кошик пустий</span>
          <span className={s.cart_empty_subheading}>
            Додайте товари, які вам сподобались, щоб їх замовити
          </span>
        </div>
      )}
    </>
  );
};
