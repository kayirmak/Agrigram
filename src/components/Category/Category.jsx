import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import AllCategoriesIcon from "../../assets/imgs/category-icons/menu.svg";

import "./category.scss";
import "./categoryList.scss";
import { useState } from "react";

const Category = () => {
  const categories = useSelector((state) => state.category.category);
  const { t } = useTranslation();
  const titlesTr = t("titles", {returnObjects: true});

  return (
    <div className="category main max-w-[1440px] mx-auto">
      {
        document.documentElement.clientWidth >= 769 &&
        <h2 className="category-title">{titlesTr.categories}</h2>
      }
      <div className="category-items-scroll">
        <div className="category-items">
          <Link to="/search-product" className="category-item">
            <div className="category-item__img">
              <img src={AllCategoriesIcon} alt="нет логотип" />
            </div>
            <p className="size">Все</p>
          </Link>
          {categories.map(({ nameRus, icon, id }, idx) => (
            <Link
              key={idx}
              to={`category/${id}`}
              className="category-item"
            >
              <div className="category-item__img">
                <img src={icon} alt="нет лого" />
              </div>
              <p className="size">{nameRus}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
