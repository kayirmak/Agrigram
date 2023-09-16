import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { getCategory } from "../store/category/categoryApi";
import { getProductsByCat } from "../store/products/productApi";
import { useTranslation } from "react-i18next";

import Card from "../components/Card/Card";

import SearchIcon from "../assets/imgs/header-icons/search.svg";
import Arrow from "../assets/imgs/base-icons/select-arrow.svg";

import "./searchPage.scss";
import Loader from "../components/Loader/Loader";

function SearchPage() {
  const categories = useSelector((state) => state.category.category);
  const products = useSelector((state) => state.products.productsByCat);
  const loading = useSelector((state) => state.products.isLoading);

  const dispatch = useDispatch();

  const [searchProduct, setSearchProduct] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [minCost, setMinCost] = useState("");
  const [maxCost, setMaxCost] = useState("");
  const [ordering, setOrdering] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [fetching, setFetching] = useState(false);

	const { t } = useTranslation();
  const searchPageTr = t("searchPage", { returnObjects: true });

  const inpRef = useRef();

  useEffect(() => {
    inpRef.current.focus();
    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    const params = `?page=1&&category=${categoryId || ""}&&min_cost=${
      minCost || ""
    }&max_cost=${maxCost || ""}&&search=${searchProduct || ""}&&ordering=${
      ordering || ""
    }`;
    onRequest(params, "filter");
  }, [categoryId, searchProduct, minCost, maxCost, ordering]);

  useEffect(() => {
    if (fetching && totalProducts > products.length) {
      const url = currentPage
        ? currentPage.slice(currentPage.indexOf("?"), currentPage.length)
        : "";
      onRequest(url, "loadmore");
    }
  }, [fetching]);

  const onRequest = (url, type) => {
    getProductsByCat(dispatch, url, type)
      .then((res) => {
        setCurrentPage(res.data.next);
        setTotalProducts(res.data.count);
      })
      .finally(() => setFetching(false));
  };

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      350
    ) {
      setFetching(true);
    }
  };

  return (
    <div className="category-page">
      <div className="category-page-filter">
        <div className="search">
          <img className="search-icon" src={SearchIcon} />
          <input
            ref={inpRef}
            onChange={(e) =>
              debounce(() => setSearchProduct(e.target.value), 500)()
            }
            className="search-input"
            type="text"
            placeholder={searchPageTr.search}
          />
        </div>

        <div className="filter-by-val">
          <div className="filter-by-val-item">
            <label htmlFor="filter-by-cat">{searchPageTr.categories}</label>
            <div className="filter-select">
              <select
                onChange={(e) => setCategoryId(e.target.value)}
                id="filter-by-cat"
                name="filter-by-cat"
              >
                <option value="">{searchPageTr.all}</option>
                {categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.nameRus}
                    </option>
                  );
                })}
              </select>
              <img className="filter-select-icon" src={Arrow} />
            </div>
          </div>

          <div className="filter-by-val-item mx-auto sm:mx-0">
            <label htmlFor="price">{searchPageTr.price}</label>
            <div className="filter-select">
              <input
                onChange={(e) => setMinCost(e.target.value)}
                type="number"
                placeholder={searchPageTr.from}
              />
              <input
                onChange={(e) => setMaxCost(e.target.value)}
                type="number"
                placeholder={searchPageTr.before}
              />
            </div>
          </div>

          <div className="filter-by-val-item">
            <label htmlFor="sort">{searchPageTr.sort}</label>
            <div className="filter-select">
              <select
                onChange={(e) => setOrdering(e.target.value)}
                id="sort"
                name="sort"
              >
                <option value="">{searchPageTr.new}</option>
                <option value="cost">{searchPageTr.cheap}</option>
                <option value="-cost">{searchPageTr.expensive}</option>
                <option value="priority">{searchPageTr.popular}</option>
              </select>
              <img className="filter-select-icon" src={Arrow} />
            </div>
          </div>
        </div>
      </div>

      <div className="items col max-w-[75rem] mx-auto grid grid-cols-[repeat(4,_17rem)] gap-y-10 gap-x-10 pb-16 justify-between">
        {!products.length ? (
          <div className="col-start-2 col-end-4 justify-self-center">
            <Loader />
          </div>
        ) : (
          products.map((product) => {
            return <Card key={product.id} product={product} />;
          })
        )}
      </div>
    </div>
  );
}

export default SearchPage;
