import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { getOneShop } from '../store/shop/shopsApi';
import { getProductsByCat } from '../store/products/productApi';

import ContactsCard from '../components/ContactsCard/ContactsCard';
import Card from '../components/Card/Card';

import AdvertisingImg from '../assets/imgs/reklama.jpg';
import BgUzor from '../assets/imgs/bg-uzor.svg';
import AvDefault from '../assets/imgs/logo-def-black.svg';
import { useTranslation } from 'react-i18next';

import './singleStorePage.scss';

function SingleStorePage() {
  const currentShop = useSelector(state => state.shops.currentShop);
  const productsBySupplier = useSelector(state => state.products.productsByCat);
  const dispatch = useDispatch();
  const {storeId} = useParams();
  
  const [currentPage, setCurrentPage] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [loadedImg, setLoadedImg] = useState(true);

	const { t } = useTranslation();
  const singleStoreTr = t("singleStore", { returnObjects: true });

  useEffect(() => {
    getOneShop(dispatch, storeId);
    onRequest(currentPage, "filter");

    document.addEventListener("scroll", scrollHandler);

    return () => document.removeEventListener("scroll", scrollHandler);
  }, [storeId]);

  useEffect(() => {
    if (fetching && totalProducts > productsBySupplier.length) {
      onRequest(currentPage, "loadmore")
    }
  }, [fetching]);
  
  const onRequest = (currPage, type) => {
    const params = `?page=${currPage || 1}&&supplier=${storeId}`;
    const url = currPage ? currPage.slice(currPage.indexOf("?"), currPage.length) : params;
    getProductsByCat(dispatch, url, type)
      .then((res) => {
        setCurrentPage(res.data ? res.data.next : 1);
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
    <div className="single-store">
      <div className="advertising">
        <img src={AdvertisingImg} />
      </div>
      <div className="single-store-info">
        <div className="bg-uzor">
          <img src={BgUzor} alt="BgUzor" />		
        </div>
        <div className="single-store-info__logo ">
          <img onError={() => setLoadedImg(false)} src={loadedImg ? currentShop.avatar : AvDefault} />
          <h4>{currentShop.name}</h4>
        </div>

        <div className="single-store-desc">
          <h4 className="single-store-desc__title">{singleStoreTr.title}</h4>
          <p className="single-store-desc__text">{currentShop.description}</p>
        </div>
        
        <div className="single-store-contacts">
          <ContactsCard currentShop={currentShop}/>
        </div>
      </div>

      <div className="single-store-products">
        <h2 className="single-store-products__title">{singleStoreTr.product}</h2>
        <div className="single-store-products__items col">
          {productsBySupplier.map(product => {
              return <Card key={product.id} product={product} />
          })}
        </div>
      </div>
    </div>
  )
}

export default SingleStorePage;
