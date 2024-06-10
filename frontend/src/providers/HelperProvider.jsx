import { createContext, useContext } from "react";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const HelperContext = createContext();

export const HelperProvider = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setModalType, setIsModalOpen } = useStateValue();

  const openModal = (modalType) => {
    if (modalType === "cart") {
      setModalType("cart");
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

  return (
    <HelperContext.Provider value={{ openModal, navigateTo }}>
      {children}
    </HelperContext.Provider>
  );
};

export const useHelperFuncs = () => useContext(HelperContext);
