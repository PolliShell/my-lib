import { createContext, useState, useEffect, useContext } from "react";
import { getLSItem } from "../helpers/LSHelpers";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "../axios/axiosInstance";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [boughtItems, setBoughtItems] = useState([]);
  const [cart, setCart] = useState(getLSItem("cartBooks"));
  const [favorites, setFavorites] = useState(getLSItem("favBooks"));

  const [totalPrice, setTotalPrice] = useState(0);

  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const res = cart.map((b) => b.price).reduce((acc, next) => acc + next, 0);
    setTotalPrice(res);
  }, [cart]);

  useEffect(() => {
    const fetchCartBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/cart");
          setCart(res);
        } catch (err) {
          console.error("Failed to fetch cart books:", err.message);
        }
      }
    };

    const fetchBoughtBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/cart/purchased-books");
          setBoughtItems(res);
        } catch (err) {
          console.error("Failed to fetch cart books:", err.message);
        }
      }
    };

    fetchCartBooks();
    fetchBoughtBooks();
  }, [isAuthenticated]);

  return (
    <StateContext.Provider
      value={{
        boughtItems,
        setBoughtItems,
        cart,
        setCart,
        favorites,
        setFavorites,
        totalPrice,
        setTotalPrice,
        modalType,
        setModalType,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
