import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Select from "react-select";

import TopBar from "../TopBar/TopBar";
import CategoryNavLinks from "../Category/CategoryNavLinks";

import { navMenu } from "../../data";

import Logo from "../../assets/imgs/agri/LogoAgri.svg";
import MobLogo from "../../assets/imgs/header-icons/mob-logo.svg";
import FavoriteIcon from "../../assets/imgs/header-icons/favorite.svg";
import CartIcon from "../../assets/imgs/header-icons/cart.svg";
import Profile from "../../assets/imgs/header-icons/profile.svg";
import FlagIconKyr from "../../assets/imgs/header-icons/kyrgyzstan.svg";
import FlagIconRus from "../../assets/imgs/header-icons/russia.svg";
import ArrowIcon from "../../assets/imgs/header-icons/arrow.svg";
import SearchIcon from "../../assets/imgs/header-icons/search.svg";

import "./header.scss";

function Header() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [isActiveMenu, setIsActiveMenu] = useState(false);
  const [isActive, setIsActive] = useState(null);
  const [isLang, setIsLang] = useState("");

  const options = [
    { value: "ru", label: "рус", image: FlagIconRus },
    { value: "kg", label: "кыр", image: FlagIconKyr },
  ];

  useEffect(() => {
    setIsLang(
      options.find((opt) => opt.value == localStorage.getItem("i18nextLng"))
    );
  }, []);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "none",
      "div:first-child": {
        paddingLeft: "0",
      },
      "div:last-child": {
        cursor: "pointer",
      },
    }),
    input: (styles) => ({
      ...styles,
      display: "none",
    }),
  };

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLangChange = (e) => {
    const selectedLanguage = e.value;
    changeLang(selectedLanguage);
    setIsLang(e);
  };

  const onClickIsActiveMenu = () => {
    setIsActiveMenu(!isActiveMenu);
  };

  const handleClickIsActive = (idx) => {
    if (isActive === idx) {
      return setIsActive(null);
    }
    setIsActive(idx);
  };

  return (
    <>
      <TopBar />
      <header className="header">
        <div
          onClick={() => setIsActiveMenu(false)}
          className={`menu-block ${
            isActiveMenu ? "opacity-80" : "opacity-0 pointer-events-none"
          } `}
        />

        <div onClick={() => setIsActive(null)} className="header-logo h-full">
          <Link to="/Agrigram">
            <img className="max-w-[70%]" src={Logo} alt="agrigram" />
          </Link>
        </div>

        <nav className="header-menu">
          <div className="hidden md:flex items-center">
            <div className="relative max-w-[1.5rem] h-5">
              <div onClick={onClickIsActiveMenu} className="burger">
                <div className={`${isActiveMenu ? "menu-burger-fixed" : ""}`}>
                  <span
                    className={`span-one ${isActiveMenu && "active"}`}
                  ></span>
                  <span
                    className={`span-two ${isActiveMenu && "active"}`}
                  ></span>
                  <span
                    className={`span-tree ${isActiveMenu && "active"}`}
                  ></span>
                </div>
              </div>

              <div className={`header-menu-burger ${isActiveMenu && "active"}`}>
                <div className="mobile-menu-items">
                  {navMenu.map(({ title, path }, idx) => (
                    <Link
                      className={`${isActive === idx ? "active" : ""}`}
                      onClick={() => {
                        handleClickIsActive(idx), onClickIsActiveMenu();
                      }}
                      key={idx}
                      to={path}
                    >
                      {title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`header-menu-logo ${
                isActiveMenu ? "menu-logo-fixed" : ""
              }`}
            >
              <Link to="/">
                <img
                  onClick={() => {
                    setIsActiveMenu(false), setIsActive(null);
                  }}
                  src={Logo}
                  className="h-14 w-14"
                  alt="agrigram"
                />
              </Link>
            </div>
          </div>

          <Link className="header-menu-item" to="yield-calculation">
            Расчет семян и саженцев
          </Link>
          <Link className="header-menu-item" to="service">
            Услуги
          </Link>
          <Link className="header-menu-item" to="stores">
            Фермеры
          </Link>
          {/* <div
            className="relative"
            onClick={() => setVisibleMenu(false)}
            onMouseOver={() => {
              setVisibleMenu(true);
            }}
            onMouseOut={() => {
              setVisibleMenu(false);
            }}
          >
            <Link className="header-menu-item" to="category">
              {headerTr.categories}
              <img
                className={`transition-all ${
                  visibleMenu ? "" : "-rotate-90"
                } text-black`}
                src={ArrowIcon}
              />
            </Link>
            <CategoryNavLinks
              visibleMenu={visibleMenu}
              setVisibleMenu={setVisibleMenu}
            />
          </div> */}
          <Link to="contacts" className="header-menu-item">
            Контакты
          </Link>
          <Link className="header-menu-item" to="stores">
            Новости
          </Link>
          <Link to="about-us" className="header-menu-item">
            О нас
          </Link>
        </nav>

        {/* <Link to="/search-product">
          <div className="header-search search">
            <img className="search-icon" src={SearchIcon} />
            <input
              disabled
              className="search-input"
              type="text"
              placeholder={headerTr.search}
            />
          </div>
        </Link> */}

        <div className="header-icons">
          <Link to={isAuth ? "/wish-list" : "auth"}>
            <img src={FavoriteIcon} alt="agrigram-favorite" />
          </Link>
          <Link to={isAuth ? "/cart" : "auth"}>
            <img src={CartIcon} alt="agrigram-cart" />
          </Link>
          <Link to="profile/my-data">
            <img src={Profile} alt="agrigram-profile" />
          </Link>
          <Select
            className="sm:hidden"
            options={options}
            styles={customStyles}
            onChange={handleLangChange}
            value={isLang}
            getOptionLabel={(option) => (
              <div className="flex gap-x-3 justify-center items-center">
                <img
                  className="w-5 h-5 object-contain"
                  src={option.image}
                  alt={option.label}
                />
                {/* <span>{option.label}</span> */}
              </div>
            )}
          />

          <nav className="burger-menu-right sm:hidden">
            <div onClick={() => onClickIsActiveMenu()} className="burger">
              <div className={`${isActiveMenu && "burger-fixed"}`}>
                <span className={`span-one ${isActiveMenu && "active"}`}></span>
                <span className={`span-two ${isActiveMenu && "active"}`}></span>
                <span
                  className={`span-tree ${isActiveMenu && "active"}`}
                ></span>
              </div>
            </div>
            <div
              className={`burger-menu-right-block ${isActiveMenu && "active"}`}
            >
              <div>
                {navMenu.map(({ title, path }, idx) => (
                  <Link
                    className={`${isActive === idx ? "active" : ""}`}
                    onClick={() => {
                      handleClickIsActive(idx), onClickIsActiveMenu();
                    }}
                    key={idx}
                    to={path}
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
