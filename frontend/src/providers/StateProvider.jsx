import { createContext, useState, useEffect, useContext } from "react";
import { getLSItem } from "../helpers/LSHelpers";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "../axios/axiosInstance";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);

  const [cart, setCart] = useState(getLSItem("cartBooks"));
  const [boughtItems, setBoughtItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [modalType, setModalType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchCartBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/cart");
          setCart(res);
        } catch (e) {
          console.error("Failed to fetch cart books:", e.message);
        }
      }
    };

    const fetchBoughtBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/cart/purchased-books");
          setBoughtItems(res);
        } catch (e) {
          console.error("Failed to fetch bought books:", e.message);
        }
      }
    };

    const fetchFavBooks = async () => {
      if (isAuthenticated) {
        try {
          const res = await axiosInstance.get("/favorites");
          setFavorites(res);
        } catch (e) {
          console.error("Failed to fetch favorite books:", e.message);
        }
      }
    };

    fetchCartBooks();
    fetchBoughtBooks();
    fetchFavBooks();
  }, [isAuthenticated]);

  useEffect(() => {
    const res = cart?.map((b) => b.price).reduce((acc, next) => acc + next, 0);
    setTotalPrice(res);
  }, [cart]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosInstance.get("/genres");
        setCategories(res);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    };

    fetchBooks();
  }, []);

  return (
    <StateContext.Provider
      value={{
        categories,
        setCategories,
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
