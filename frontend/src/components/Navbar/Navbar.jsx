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
import { Categories } from "../Modal/Categories/Categories";
import ReactDOM from "react-dom";

export const Navbar = () => {
  const { user } = useAuth();
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [isCategoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const { favorites, cart, isModalOpen } = useStateValue();
  const { openModal, navigateTo } = useHelperFuncs();
  const [formData, setFormData] = useState({
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const renderCartCounter = () => {
    if (cart.length) {
      return <div className={s.nav_link_cart_counter}>{cart.length}</div>;
    }
    return "";
  };

  const renderFavCounter = () => {
    if (favorites.length) {
      return <div className={s.nav_link_fav_counter}>{favorites.length}</div>;
    }
    return "";
  };

  const renderUserBtn = () => {
    return user ? (
      <button className={s.nav_link} onClick={() => setUserModalOpen(true)}>
        {isUserModalOpen && <UserModal />}
        <img src={accountIcon} alt="account" />
        <span>{user.username}</span>
      </button>
    ) : (
      <button className={s.nav_link} onClick={() => openModal("login")}>
        <img src={accountIcon} alt="account" />
        <span>Увійти</span>
      </button>
    );
  };

  const handleSearchBook = async () =>
    navigateTo(`/books/search?title=${formData.title}`);

  return (
    <>
      <nav className={s.nav}>
        <div className="container">
          <div className={s.nav_inner}>
            <a href="/">
              <NavLogo className={s.nav_logo} />
            </a>
            <div className={s.nav_mid}>
              <button
                className={s.nav_categories}
                onClick={() => setCategoriesModalOpen(true)}
              >
                <img src={categoriesIcon} alt="cart" />
                <span>Категорії книг</span>
              </button>
              <form className={s.nav_search} onSubmit={handleSearchBook}>
                <img src={searchIcon} alt="" className={s.nav_search_icon} />
                <input
                  className={s.nav_search_input}
                  type="text"
                  placeholder="Найти книгу"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <button className={s.nav_search_btn}>Знайти</button>
              </form>
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
                {renderFavCounter()}
                <img src={favoritesIcon} alt="favorites" />
                <span>Улюблені</span>
              </button>
              {renderUserBtn()}
            </div>
          </div>
        </div>
        {isCategoriesModalOpen &&
          ReactDOM.createPortal(
            <Categories setCategoriesModalOpen={setCategoriesModalOpen} />,
            document.body
          )}
        {isModalOpen && <Modal />}
      </nav>
    </>
  );
};
