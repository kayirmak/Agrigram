import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../store/products/productApi";
import { useTranslation } from "react-i18next";

import Card from "../Card/Card";

import "./popular.scss";

function Popular() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const { t } = useTranslation();
  const popularTr = t("popular", { returnObjects: true });

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  return (
    <div className="popular">
      <div className="popular-items-scroll">
        <div className="popular-items">
          {products?.map((product, idx) => {
            if (idx < 8) {
              return <Card key={product.id} product={product} />;
            }
            return;
          })}
        </div>
      </div>
    </div>
  );
}

export default Popular;
