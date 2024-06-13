import { createContext, useContext } from "react";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { axiosInstance } from "../axios/axiosInstance";
import { pushUniqLSItem } from "../helpers/LSHelpers";

const HelperContext = createContext();

export const HelperProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    cart,
    setCart,
    favorites,
    setFavorites,
    setModalType,
    setIsModalOpen,
  } = useStateValue();

  const openModal = (modalType) => {
    if (modalType === "cart") {
      setModalType(modalType);
      setIsModalOpen(true);
      return;
    }
    if (modalType === "signup") {
      setModalType(modalType);
      setIsModalOpen(true);
      return;
    }

    if (isAuthenticated) {
      setModalType(modalType);
    } else {
      setModalType("login");
    }
    setIsModalOpen(true);
  };

  const navigateTo = (route) => {
    return navigate(route);
  };

  const addBookToCart = async (book) => {
    if (isAuthenticated) {
      const res = await axiosInstance.post("/cart/add", {
        bookId: book.objectId,
      });

      if (!res.status) {
        console.error("Error while adding book to cart");
        return;
      }

      setCart([...cart, book]);
    } else {
      const res = pushUniqLSItem("cartBooks", "objectId", book);
      setCart(res);
    }
    openModal("cart");
  };

  const addToFavorites = async (book) => {
    if (isAuthenticated) {
      const res = await axiosInstance.post("/favorites/add", {
        bookId: book.objectId,
      });

      if (!res.status) {
        console.error("Error while adding book to favorites");
        return;
      }

      setFavorites([...favorites, book]);
    }
    openModal("favorites");
  };

  return (
    <HelperContext.Provider
      value={{ openModal, navigateTo, addBookToCart, addToFavorites }}
    >
      {children}
    </HelperContext.Provider>
  );
};

export const useHelperFuncs = () => useContext(HelperContext);
