import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import burgerMenuPath from '../../images/burger-menu.svg';
import burgerMenuClosePath from '../../images/burger-menu-close.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function Header() {
  const { isLoggedIn } = useContext(UserContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      setMenuOpen(false);
    }
    // А тут воспользуемся фичей, что navigate изменяется при любой навигации :)
    // eslint-disable-next-line
  }, [navigate]);

  return (
    <header
      className={`header page__section ${
        isMenuOpen ? 'header__menu-open' : ''
      } ${isLoggedIn ? '' : 'header_page-main'}`}
    >
      <Logo />
      {isLoggedIn ? (
        <>
          <div className="header__drawer-menu-overlay" />
          <button
            className="header__btn header__burger-btn header__burger-btn-open"
            aria-label="Открыть меню"
            onClick={handleMenuClick}
          >
            <img
              className="header__burger-btn-img"
              src={burgerMenuPath}
              alt="Открыть меню"
            />
          </button>
          <div className="header__menu">
            <div className="header__drawer-menu">
              <div className="header__drawer-menu-elements">
                <button
                  className="header__btn header__burger-btn header__burger-btn-close"
                  aria-label="Закрыть меню"
                  onClick={handleMenuClick}
                >
                  <img
                    className="header__burger-btn-img"
                    src={burgerMenuClosePath}
                    alt="Закрыть меню"
                    onClick={handleMenuClick}
                  />
                </button>
                <nav className="header__nav">
                  <ul className="header__nav-menu">
                    <li className="header__nav-menu-item header__nav-menu-item_home">
                      <Link
                        className="header__nav-link header__nav-link_bold"
                        to="/"
                      >
                        Главная
                      </Link>
                    </li>
                    <li className="header__nav-menu-item">
                      <NavLink
                        className={({ isActive }) =>
                          `header__nav-link header__nav-link_bold ${
                            isActive ? 'header__nav-link_active' : ''
                          }`
                        }
                        to="/movies"
                      >
                        Фильмы
                      </NavLink>
                    </li>
                    <li className="header__nav-menu-item header__nav-menu-item_before-btn">
                      <NavLink
                        className={({ isActive }) =>
                          `header__nav-link header__nav-link_bold ${
                            isActive ? 'header__nav-link_active' : ''
                          }`
                        }
                        to="/saved-movies"
                      >
                        Сохранённые фильмы
                      </NavLink>
                    </li>
                  </ul>
                  <NavLink
                    className="header__nav-link header__nav-link_profile"
                    to="/profile"
                  >
                    <button className="header__btn header__btn_profile">
                      Аккаунт
                    </button>
                  </NavLink>
                </nav>
              </div>
            </div>
          </div>
        </>
      ) : (
        <nav>
          <ul className="header__nav-menu header__nav-menu_page-main">
            <li className="header__nav-menu-item">
              <Link
                className="header__nav-link header__nav-link_page-main header__nav-link_light"
                to="/signup"
              >
                Регистрация
              </Link>
            </li>
            <li className="header__nav-menu-item">
              <Link
                className="header__nav-link header__nav-link_page-main"
                to="/signin"
              >
                <button className="header__btn header__btn_login">Войти</button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;
