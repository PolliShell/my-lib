import s from "./Navbar.module.css";
import { ReactComponent as NavLogo } from "../../public/Navbar/logo.svg";
import cartIcon from "../../public/Navbar/cart.png";
import favoritesIcon from "../../public/Navbar/favorites.png";
import accountIcon from "../../public/Navbar/account.png";
import categoriesIcon from "../../public/Navbar/categories.png";
import searchIcon from "../../public/Navbar/search.png";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { UserModal } from "../Modal/UserModal/UserModal";
import { useStateValue } from "../../providers/StateProvider";
import { useHelperFuncs } from "../../providers/HelperProvider";

export const Navbar = () => {
  const { user } = useAuth();
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const { cart, isModalOpen } = useStateValue();
  const { openModal } = useHelperFuncs();

  const renderCartCounter = () => {
    if (cart.length) {
      return <div className={s.nav_link_cart_counter}>{cart.length}</div>;
    }
    return "";
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
                {renderCartCounter()}
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
              {user ? (
                <button
                  className={s.nav_link}
                  onClick={() => setUserModalOpen(true)}
                >
                  {isUserModalOpen && <UserModal />}
                  <img src={accountIcon} alt="account" />
                  <span>{user.username}</span>
                </button>
              ) : (
                <button
                  className={s.nav_link}
                  onClick={() => openModal("login")}
                >
                  <img src={accountIcon} alt="account" />
                  <span>Увійти</span>
                </button>
              )}
            </div>
          </div>
        </div>
        {isModalOpen && <Modal />}
      </nav>
    </>
  );
};
