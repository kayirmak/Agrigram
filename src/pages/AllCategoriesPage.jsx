import { useState } from "react";
import { Link } from "react-router-dom";
import {  useSelector } from "react-redux";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

import SearchIcon from "../assets/imgs/header-icons/search.svg";

import "../components/Category/category.scss"
import "../components/Category/categoryList.scss"


const AllCategoriesPage = () => {
  const categories = useSelector((state) => state.category.category);

  const [searchCat, setSearchCat] = useState("");

	const { t } = useTranslation();
  const AllCategoriesPageTr = t("AllCategoriesPage", { returnObjects: true });

  const handleSearchCat = () => {
    return categories.filter(item => item.nameRus.toLowerCase().includes(searchCat.toLowerCase()));
  }

  return (
    <div className="category main max-w-[1440px] mx-auto">
      <h2 className="category-title">{AllCategoriesPageTr.categories}</h2>
			<div className="category-search">
				<div className="search max-w-full w-full">
					<img className="search-icon" src={SearchIcon} />
					<input
            onChange={(e) => debounce(() => setSearchCat(e.target.value), 500)()}
						className="search-input"
						type="text"
						placeholder="Поиск" />
				</div>
				{/* <button>Искать</button> */}
			</div>
      <div className="category-items-all">
        <div className="category-items-el">
          {handleSearchCat().map(({ nameRus, icon, id }, idx) => (
            <Link
              key={idx}
              to={`${id}`}
              className="category-item"
            >
              <div className="category-item__img">
                <img src={icon} alt="нет лого" />
              </div>
              <p>{nameRus}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;
