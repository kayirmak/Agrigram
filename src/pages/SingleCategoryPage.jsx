import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { getOneCategory } from '../store/category/categoryApi';
import { getProductsByCat } from '../store/products/productApi';

import Card from '../components/Card/Card';
import Banner from '../components/Banner/Banner';

import AdvertisingImg from '../assets/imgs/reklama.jpg';
import SearchIcon from '../assets/imgs/header-icons/search.svg';
import Arrow from '../assets/imgs/base-icons/select-arrow.svg';

import './singleCategoryPage.scss';
import Loader from '../components/Loader/Loader';
import { useTranslation } from 'react-i18next';

function SingleCategoryPage() {
    const category = useSelector(state => state.category.oneCategory);
    const products = useSelector(state => state.products.productsByCat);
    const loading = useSelector(state => state.products.isLoading);

    const {categoryId} = useParams();
    const dispatch = useDispatch();

		const { t } = useTranslation();
  	const SingleCategoryPageTr = t("SingleCategoryPage", { returnObjects: true });

    const [searchProduct, setSearchProduct] = useState("");
    const [minCost, setMinCost] = useState("");
    const [maxCost, setMaxCost] = useState("");
    const [ordering, setOrdering] = useState("");
    const [currentPage, setCurrentPage] = useState(null);
    const [totalProducts, setTotalProducts] = useState(0);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        getOneCategory(dispatch, categoryId);
        document.addEventListener("scroll", scrollHandler);

        return () => document.removeEventListener("scroll", scrollHandler);
    }, [categoryId])

    useEffect(() => {
        const params = `?page=1&&category=${categoryId || ""}&&min_cost=${minCost || ""}&max_cost=${maxCost || ""}&&search=${searchProduct || ""}&&ordering=${ordering || ""}`;
        onRequest(params, "filter");
    }, [categoryId, searchProduct, minCost, maxCost, ordering])

    useEffect(() => {
        if (fetching && totalProducts > products.length) {
          const url = currentPage ? currentPage.slice(currentPage.indexOf("?"), currentPage.length) : "";
          onRequest(url, "loadmore")
        }
    }, [fetching])

    const onRequest = (url, type) => {
        getProductsByCat(dispatch, url, type)
          .then((res) => {
            setCurrentPage(res.data.next);
            setTotalProducts(res.data.count);
          })
        .finally(() => setFetching(false));
    }

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 350) {
          setFetching(true);
        }
    }

    return (
        <div className="category-page">
            <Banner />

            <h2 className="category-page-title md:pl-0 xb:mt-8">{category.nameRus}</h2>

            <div className="category-page-filter">
                <div className="search">
                    <img className="search-icon" src={SearchIcon} />
                    <input
                        onChange={(e) => debounce(() => setSearchProduct(e.target.value), 500)()}
                        className="search-input"
                        type="text"
                        placeholder={SingleCategoryPageTr.search} />
                </div>
                <div className="filter-by-val">
                    <div className="filter-by-val-item">
                        <label htmlFor="price">{SingleCategoryPageTr.price}</label>
                        <div className="filter-select">
                            <input
                                onChange={(e) => setMinCost(e.target.value)}
                                type="number"
                                placeholder={SingleCategoryPageTr.from} />
                            <input
                                onChange={(e) => setMaxCost(e.target.value)}
                                type="number"
                                placeholder={SingleCategoryPageTr.before} />
                        </div>
                    </div>

                    <div className="filter-by-val-item">
                        <label htmlFor="sort">{SingleCategoryPageTr.sort}</label>
                        <div className="filter-select">
                            <select
															onChange={(e) => setOrdering(e.target.value)}
															id="sort"
															name="sort">
															<option value="">{SingleCategoryPageTr.new}</option>
															<option value="cost">{SingleCategoryPageTr.cheap}</option>
															<option value="-cost">{SingleCategoryPageTr.expensive}</option>
															<option value="priority">{SingleCategoryPageTr.popular}</option>
                            </select>
                            <img className="filter-select-icon" src={Arrow} />
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div className="items col">
							{loading ? <div className="col-start-2 col-end-4 justify-self-center"><Loader /></div>
								: products.map((product) => {
										return <Card
											key={product.id}
											product={product} />
									})
							}
            </div>

        </div>
    )
}

export default SingleCategoryPage;
