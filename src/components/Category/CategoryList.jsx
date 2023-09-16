import { useTranslation } from "react-i18next";
import Icon from "../../assets/imgs/category-icons/category-item-icon.svg";

import "./categoryList.scss";

function CategoryList() {
  const { t } = useTranslation();
  const categoryListTr = t("categoryList", { returnObjects: true });

  return (
    <ul className="category-list">
      <li className="category-list-item">
        <a href="#">
          <img src={Icon} className="category-list-item__icon" />
          <span className="category-list-item__title">
            {categoryListTr.titleOne}
          </span>
        </a>
      </li>
      <li className="category-list-item">
        <a href="#">
          <img src={Icon} className="category-list-item__icon" />
          <span className="category-list-item__title">
            {categoryListTr.titleOne}
          </span>
        </a>
      </li>
      <li className="category-list-item">
        <a href="#">
          <img src={Icon} className="category-list-item__icon" />
          <span className="category-list-item__title">
            {categoryListTr.titleOne}
          </span>
        </a>
      </li>
    </ul>
  );
}

export default CategoryList;
