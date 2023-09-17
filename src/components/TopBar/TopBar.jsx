import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SearchIcon from "../../assets/imgs/top-bar/search-icon.svg";

import "./topBar.scss";

const TopBar = () => {
  const { i18n } = useTranslation();
  const [isLang, setIsLang] = useState(localStorage.getItem("i18nextLng"));

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleLangChange = (e) => {
    // console.log(e.target.getAttribute("lang"));
    const selectedLanguage = e.target.getAttribute("lang");
    changeLang(selectedLanguage);
    setIsLang(e.target.getAttribute("lang"));
  };

  return (
    <div className="top-bar">
      <div className="top-bar-block">
        <Link to="/search-product">
          <div className="search">
            <img className="search-icon" src={SearchIcon} />
            <input
              className="search-input input-search"
              disabled
              type="text"
              placeholder="Поиск"
            />
          </div>
        </Link>
        <div className="flex" onClick={handleLangChange}>
          <p className={isLang === "kg" ? "mr-2 active" : "mr-2"} lang="kg">
            кыр
          </p>
          <p className={isLang === "ru" ? "active" : ""} lang="ru">
            рус
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
