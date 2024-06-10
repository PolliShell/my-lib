import s from "./Cart.module.css";
import { CartItem } from "./CartItem";
import { EmptyModal } from "../EmptyModal/EmptyModal";
import { useStateValue } from "../../../providers/StateProvider";
import { useHelperFuncs } from "../../../providers/HelperProvider";

export const Cart = () => {
  const { cart, totalPrice } = useStateValue();
  const { navigateTo } = useHelperFuncs();

  return (
    <>
      {cart.length ? (
        <div className={s.cart}>
          <div className={s.cart_items}>
            {cart.map((book) => (
              <CartItem key={book.objectId} book={book} />
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
              onClick={() => navigateTo("/order")}
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
    </>
  );
};
