import s from "./Navbar.module.css";
import { ReactComponent as NavLogo } from "../../public/Navbar/logo.svg";
import cartIcon from "../../public/Navbar/cart.png";
import favoritesIcon from "../../public/Navbar/favorites.png";
import accountIcon from "../../public/Navbar/account.png";
import categoriesIcon from "../../public/Navbar/categories.png";
import searchIcon from "../../public/Navbar/search.png";
import { Modal } from "../Modal/Modal";
import { useState, useEffect } from "react";
import useAuth from "../../helpers/useAuth";

export const Navbar = () => {
  const isAuthenticated = useAuth();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  // const [cartBookCount, setCartBookCount] = useState(0);

  const openModal = (modalType) => {
    // user passed auth and has his cookie in session
    setModalType(modalType);
    // user is not authenticated
    // setModalType("login");
    setIsModalOpen(true);
  };

  return (
    <>
      <nav className={s.nav}>
        <div className="container">
          <div className={s.nav_inner}>
            <a href="/">
              <NavLogo className={s.nav_logo} />
            </a>
            <div className={s.nav_mid}>
              <button className={s.nav_categories}>
                <img src={categoriesIcon} alt="cart" />
                <span>Категорії книг</span>
              </button>
              <div className={s.nav_search}>
                <img src={searchIcon} alt="" className={s.nav_search_icon} />
                <input
                  type="text"
                  className={s.nav_search_input}
                  placeholder="Найти книгу"
                />
                <button className={s.nav_search_btn}>Знайти</button>
              </div>
            </div>
            <div className={s.nav_links}>
              <button className={s.nav_link} onClick={() => openModal("cart")}>
                {/* TO FIX LATER */}
                {/* {getCountOfBooksInLS ? (
                  <div className={s.nav_link_cart_counter}>
                    {() => getCountOfBooksInLS}
                  </div>
                ) : (
                  ""
                )} */}
                <img src={cartIcon} alt="cart" />
                <span>Кошик</span>
              </button>
              <button
                className={s.nav_link}
                onClick={() => openModal("favorites")}
              >
                <img src={favoritesIcon} alt="favorites" />
                <span>Улюблені</span>
              </button>
              {isAuthenticated && <span>Увійти</span>}
              <button className={s.nav_link} onClick={() => openModal("login")}>
                <img src={accountIcon} alt="account" />
                <span>Увійти</span>
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <Modal setIsModalOpen={setIsModalOpen} type={modalType} />
        )}
      </nav>
    </>
  );
};
