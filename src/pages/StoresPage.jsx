import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { getShops } from "../store/shop/shopsApi";

import Banner from "../components/Banner/Banner";
import StoreCard from "../components/StoreCard/StoreCard";
import Loader from "../components/Loader/Loader";

import SearchIcon from "../assets/imgs/header-icons/search.svg";

import "./storesPage.scss";
import { getCategoriesByShop } from "../store/category/categoryApi";
import { useTranslation } from "react-i18next";

function StoresPage() {
  const shops = useSelector(state => state.shops.shops);
  const loading = useSelector(state => state.shops.isLoading);
  const categories = useSelector(state => state.category.categoriesByShop);
  const dispatch = useDispatch();

  const [searchStore, setSearchStore] = useState("");
  const [catId, setCatId] = useState("");

	const { t } = useTranslation();
  const storesPageTr = t("storesPage", { returnObjects: true });

  useEffect(() => {
    getShops(dispatch);
    getCategoriesByShop(dispatch);
  }, []);
  
  useEffect(() => {
      getShops(dispatch, `?storecategory=${catId}&visibility=True&&search=${searchStore}`)
  }, [searchStore, catId]);

  return (
    <div className="stores-page">
      <Banner />

      <h2 className="stores-page-title">{storesPageTr.stores}</h2>

      <div className="stores-page-filter">
        <div className="search">
          <img className="search-icon" src={SearchIcon} />
          <input
            id="search-by-name"
            onChange={(e) => debounce(() => setSearchStore(e.target.value), 500)()}
            className="search-input"
            type="text"
            placeholder={storesPageTr.search} />
        </div>
        <div className="filter-by-val">
          <div className="filter-by-val-item">
						<div className="filter-scroll">
							<div className="filter-select">
								<button onClick={() => setCatId("")} className={!catId ? "filter-select-item active" : "filter-select-item"}>{storesPageTr.all}</button>
								{categories.map(category => {
									return <button
										id={category.id}
										className={+catId === category.id ? "filter-select-item active" : "filter-select-item"}
										key={category.id}
										onClick={(e) => setCatId(e.target.id)}>
											{category.nameRus}
									</button>
              	})}
							</div>
            </div>
          </div>
        </div>
      </div>

      <div className="stores-items">
        {loading ? <div className="stores-items-loader"><Loader /></div>
        : shops.map((shop) => (
          <Link className="w-full" key={shop.id} to={`/stores/${shop.id}`}>
            <StoreCard shop={shop} />
          </Link>
        ))}
      </div>

    </div>
  );
}

export default StoresPage;
