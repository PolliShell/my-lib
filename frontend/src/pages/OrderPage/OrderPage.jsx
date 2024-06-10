import s from "./OrderPage.module.css";
import { CartItem } from "../../components/Modal/Cart/CartItem";
import { StrictNavbar } from "../../components/StrictNavbar/StrictNavbar";
import WalletIcon from "../../public/OrderPage/wallet.png";
import CreditIcon from "../../public/OrderPage/credit.png";
import { axiosInstance } from "../../axios/axiosInstance";
import { useStateValue } from "../../providers/StateProvider";
import { useHelperFuncs } from "../../providers/HelperProvider";
import { useState } from "react";

export const OrderPage = () => {
  const { cart, totalPrice } = useStateValue();
  const { navigateTo } = useHelperFuncs();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    credit_card: "",
    credit_mmyy: "",
    credit_cvv: "",
    payment_type: "", // card || cash
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setPaymentType = (e) => {
    e.target.classList.add("active");
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    await axiosInstance.post("/cart/purchase");
    navigateTo("/");
  };

  return (
    <>
      <StrictNavbar title="Оформлення замовлення" />
      {cart.length ? (
        <div className={s.order_container}>
          <form className={`${s.form}`}>
            <div className={s.form_left}>
              <section>
                <div className={s.form_heading}>
                  <span>1</span>
                  <h3>Список обраних товарів</h3>
                </div>
                <div className={s.form_cart_items}>
                  {cart.map((book) => (
                    <CartItem key={book.objectId} book={book} />
                  ))}
                </div>
              </section>
              <section>
                <div className={s.form_heading}>
                  <span>2</span>
                  <h3>Контактні дані</h3>
                </div>
                <div className={s.form_inputs}>
                  <input
                    type="text"
                    name="username"
                    placeholder="Ім'я та прізвище"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Пошта"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="phone"
                    name="phone"
                    placeholder="Номер телефона"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>
              <section>
                <div className={s.form_heading}>
                  <span>3</span>
                  <h3>Адреса</h3>
                </div>

                <div className={s.form_inputs}>
                  <input
                    type="text"
                    name="address"
                    placeholder="Адреса"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </section>
              <section>
                <div className={s.form_heading}>
                  <span>4</span>
                  <h3>Оплата</h3>
                </div>
                <div className={s.form_payment}>
                  <ul className={s.form_payment_choices}>
                    <li className={s.test} onClick={setPaymentType}>
                      <img src={WalletIcon} alt="wallet icon" /> Оплата картою
                    </li>
                    <div
                      className={`${s.form_inputs} ${s.form_payment_inputs}`}
                    >
                      <input
                        type="text"
                        name="credit_card"
                        placeholder="Номер картки"
                        value={formData.credit_card}
                        maxLength={16}
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="credit_mmyy"
                        placeholder="MM/YY"
                        value={formData.credit_mmyy}
                        maxLength="4"
                        onChange={handleChange}
                        required
                      />
                      <input
                        type="text"
                        name="credit_cvv"
                        placeholder="CVV"
                        value={formData.credit_cvv}
                        maxLength="3"
                        onChange={handleChange}
                        required
                      />
                    </div>
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
