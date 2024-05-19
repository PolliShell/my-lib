import "./Navbar.css";
import { ReactComponent as NavLogo } from "../../public/Navbar/logo.svg";
import cartIcon from "../../public/Navbar/cart.png";
import favoritesIcon from "../../public/Navbar/favorites.png";
import accountIcon from "../../public/Navbar/account.png";
import categoriesIcon from "../../public/Navbar/categories.png";
import searchIcon from "../../public/Navbar/search.png";

export const Navbar = () => {
  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <a href="/">
              <NavLogo className="nav-logo" />
            </a>
            <div className="nav-mid">
              <button className="nav-categories">
                <img src={categoriesIcon} alt="cart" />
                <span>Категорії книг</span>
              </button>
              <div className="nav-search">
                <img src={searchIcon} alt="" className="nav-search-icon" />
                <input
                  type="text"
                  className="nav-search-input"
                  placeholder="Найти книгу"
                />
                <button className="nav-search-btn">Знайти</button>
              </div>
            </div>
            <div className="nav-links">
              <button className="nav-link">
                <img src={cartIcon} alt="cart" />
                <span>Кошик</span>
              </button>
              <button className="nav-link">
                <img src={favoritesIcon} alt="favorites" />
                <span>Улюблені</span>
              </button>
              <button className="nav-link">
                <img src={accountIcon} alt="account" />
                <span>Увійти</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
