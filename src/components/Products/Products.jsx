import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../store/products/productApi";
import Card from "../Card/Card";

import "./products.scss";

function Products() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { t } = useTranslation();
  const titlesTr = t("titles", {returnObjects: true});

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  return (
    <div className="products">
      <h2 className="products-title">{titlesTr.newProducts}</h2>
      <div className="products-items sm:grid-cols-2">
        {
          products.map((product, idx) => {
            if (idx < 8) {
              return <Card key={product.id} product={product} />;
            }
            return;
          })
        }
      </div>
      <Link to="/search-product">
        <button className="products-btn">{titlesTr.viewAll}</button>
      </Link>
    </div>
  );
}

export default Products;
