
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./categoryNavLinks.scss";
import { useState } from "react";
import CategoryNavLinkItem from "./CategoryNavLinkItem";

const CategoryNavLinks = ({visibleMenu, setVisibleMenu}) => {
  const categories = useSelector(state => state.category.category);

  const [isActiveCat, setIsActiveCat] = useState(null);
  const [subcategory, setSubcategory] = useState([]);
  const [catId, setCatId] = useState("");

  const visibleMenuClassNames = !visibleMenu ? "opacity-0 pointer-events-none" : "";

  return (
    <div className="flex">
      <div className={`category-nav-links h-[31.25rem] overflow-y-hidden ${visibleMenuClassNames}`}>
        <div className="inner scroll-style overflow-y-auto h-[31.25rem]">
          {categories.map((category) => (
            <CategoryNavLinkItem
              key={category.id}
              category={category} 
              visibleMenu={visibleMenu}
              setCatId={setCatId}
              isActiveCat={isActiveCat}
              setIsActiveCat={setIsActiveCat}
              setSubcategory={setSubcategory}
              setVisibleMenu={setVisibleMenu}
            />
          ))}

        </div>

      </div>
      {subcategory && subcategory.length && visibleMenu ?
        <div className="category-nav-link-product">
          <div className="inner scroll-style">
            {subcategory.map((sub, idx) => (
              <h3
                key={idx}
                // dangerouslySetInnerHTML={{__html: `<Link to="/category/${catId}">${sub.nameRus}</Link>`}}
              >
              <Link to={`/category/${catId}`}>{sub.nameRus}</Link>
              </h3>
            ))}
          </div>
        </div>
        : ""
      }
    </div>
  );
};

export default CategoryNavLinks;
