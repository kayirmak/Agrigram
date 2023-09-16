import { useEffect } from "react";
import { Link } from "react-router-dom";

import ArrowIcon from "../../assets/imgs/category-icons/arrow-icon.svg";

function CategoryNavLinkItem(props) {
  const {category, setSubcategory, visibleMenu, setVisibleMenu, setCatId, isActiveCat, setIsActiveCat} = props;
  const {id, icon, nameRus, subcategory} = category;

  useEffect(() => {
    if (!visibleMenu) {
      setSubcategory([]);
      setIsActiveCat(null);

      document.querySelector(".category-nav-links").scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  }, [visibleMenu]);

  return (
    <Link
      to={`/category/${id}`}
      key={id}
      onClick={() => setVisibleMenu(false)}
      onMouseEnter={() => {
        setSubcategory(subcategory);
        setCatId(id);
        setIsActiveCat(category);
      }}
    >
      <div className="category-nav-link-block">
        <div className={`${isActiveCat?.id === id ? "category-nav-link-el active": "category-nav-link-el"}`}>
          <img src={icon} alt="icon" />
          <h3>{nameRus}</h3>
          <img className="arrow" src={ArrowIcon} alt="Arrow-icon" />
        </div>
      </div>
    </Link>
)
}

export default CategoryNavLinkItem;
