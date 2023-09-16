import { useState } from "react";
import { Link } from "react-router-dom";

import CategoryList from "./CategoryList";

function CategoryItem({title, img, link}) {
    const [visibleMenu, setVisibleMenu] = useState(false);

    return (
        <Link to={link} onMouseOver={() => {setVisibleMenu(true)}} onMouseOut={() => {setVisibleMenu(false)}} className="category-item">
            <div className="category-item__img">
                <img src={img} alt="нет логотип" />
            </div>
            <p>{title}</p>
            {
                title === "Все" ? null : 
                    <div className="absolute z-10 bg-white">
                        {visibleMenu ? <CategoryList /> : null}
                    </div>
            }
           
        </Link>
    )
}

export default CategoryItem;
