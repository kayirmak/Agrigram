import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Zoom } from "swiper";

import { getOneShop } from "../store/shop/shopsApi";
import {
  getOneProduct,
  getSimilarProducts,
} from "../store/products/productApi";
import { getCartItemsSuccess, getFavsSuccess } from "../store/cart/cartSlice";
import { db } from "../../firebase.config";
import { useTranslation } from "react-i18next";

import ContactsCard from "../components/ContactsCard/ContactsCard";
import Card from "../components/Card/Card";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import Button from "../components/Button/Button";
import ImageLoad from "../components/ImageLoad/ImageLoad";

import Rating from "../assets/imgs/rating/rating.svg";
import AddToFav from "../assets/imgs/add-to-favorite.svg";
import AddPluse from "../assets/imgs/add-pluse.svg";
import AddMinus from "../assets/imgs/add-minus.svg";
import AddToFavFill from "../assets/imgs/add-to-fav-fill.svg";

import "swiper/css";
import "swiper/css/mousewheel";
import "swiper/css/zoom";
import "./singleCardPage.scss";
import "swiper/css/pagination";

function SingleCardPage() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const currentProduct = useSelector((state) => state.products.currentProduct);
  const similarProducts = useSelector(
    (state) => state.products.similarProducts
  );
  const oneShop = useSelector((state) => state.shops.currentShop);
  const loading = useSelector((state) => state.products.isLoading);

  const favsByUser = useSelector((state) => state.cart.favs);
  const cartItemsByUser = useSelector((state) => state.cart.cartItems);
  const [isCart, setIsCart] = useState(false);
  const [isFavs, setIsFavs] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const { t } = useTranslation();
  const SingleCardPageTr = t("SingleCardPage", { returnObjects: true });

  const { productId } = useParams();
  const [activeImg, setActiveImg] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    getOneProduct(dispatch, productId).then((currProd) => {
      getSimilarProducts(dispatch, `?category=${currProd.category.id}`);
      setActiveImg(currProd.image);
      renderItems(currProd);
    });
  }, [productId]);

  const changeActiveImg = (e) => {
    setActiveImg(e.target.src);
  };

  const favItemsRef = db
    .collection("users")
    .doc(currentUser?.id?.toString())
    .collection("favs");

  const cartItemsRef = db
    .collection("users")
    .doc(currentUser?.id?.toString())
    .collection("cart");

  useEffect(() => {
    if (isAuth) {
      setIsFavs(!!favsByUser.find((item) => item.id === currentProduct.id));
      setIsCart(
        !!cartItemsByUser.find((store) => {
          return store.items.find((prod) => prod.item.id === currentProduct.id);
        })
      );
    }
  }, [favsByUser, cartItemsByUser]);

  const renderItems = (product) => {
    if (isAuth) {
      getOneShop(dispatch, product.supplier.id.toString());
      favItemsRef.get().then((favs) => {
        const favsList = favs.docs.map((item) => item.data());
        dispatch(getFavsSuccess(favsList));
      });

      cartItemsRef.get().then(async (items) => {
        const cartList = items.docs.map(async (item) => {
          const cartList = await cartItemsRef
            .doc(item.id.toString())
            .collection("cart")
            .get();

          return {
            ...item.data(),
            items: cartList.docs.map((item) => item.data()),
          };
        });
        Promise.all(cartList).then((cartList) =>
          dispatch(getCartItemsSuccess(cartList))
        );
      });
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (isAuth) {
      if (isCart) {
        setIsCart(false);
        cartItemsRef
          .doc(currentProduct.supplier.id.toString())
          .collection("cart")
          .doc(currentProduct.id.toString())
          .delete();

        const isEmpty = (
          await cartItemsRef
            .doc(currentProduct.supplier.id.toString())
            .collection("cart")
            .get()
        ).empty;
        console.log(isEmpty, "isempty");
        if (isEmpty) {
          cartItemsRef.doc(currentProduct.supplier.id.toString()).delete();
        }
      } else {
        setIsCart(true);
        const isEmpty = (
          await cartItemsRef.doc(currentProduct.supplier.id.toString()).get()
        ).exists;

        if (!isEmpty) {
          cartItemsRef.doc(currentProduct.supplier.id.toString()).set(oneShop);
        }
        cartItemsRef
          .doc(currentProduct.supplier.id.toString())
          .collection("cart")
          .doc(currentProduct.id.toString())
          .set({ item: currentProduct, quantity: 1 });
      }
    } else setIsModal(true);
  };

  const handleToggleFavs = async (e) => {
    e.preventDefault();

    if (isAuth) {
      if (isFavs) {
        setIsFavs(false);
        favItemsRef.doc(currentProduct.id.toString()).delete();
      } else {
        setIsFavs(true);
        favItemsRef.doc(currentProduct.id.toString()).set(currentProduct);
      }
    } else setIsModal(true);
  };

  return (
    <div className="single-card-page">
      <div className="single-card">
        {loading ? (
          <div className="mx-auto">
            <Loader />
          </div>
        ) : (
          <>
            <div className="single-card-imgs sm:hidden">
              <Swiper
                modules={[Mousewheel, Zoom]}
                direction={"vertical"}
                spaceBetween={50}
                slidesPerView={3.5}
                mousewheel={true}
                zoom={true}
                className="flex flex-col single-card-imgs-alternative max-w-[9.5rem] w-full h-[37rem]"
              >
                <SwiperSlide>
                  <ImageLoad
                    onClick={changeActiveImg}
                    className="w-full h-[9.25rem] object-contain rounded-sm cursor-pointer"
                    src={currentProduct.image}
                  />
                </SwiperSlide>
              </Swiper>

              <Swiper
                modules={[Zoom]}
                zoom={true}
                className="max-w-[38rem] w-full rounded-xl shadow-[0_9.5px_19px_0_rgba(204,204,204,0.4)]"
              >
                <SwiperSlide>
                  <div className="swiper-zoom-container single-card-imgs-main h-[37rem] rounded-xl">
                    <ImageLoad
                      src={activeImg}
                      alt="agrigram-card-main-img"
                      className="w-[100%!important] h-[100%!important] !object-contain !important rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>

            <div className="hidden sm:block max-w-[37rem] xb:max-w-[25rem] w-full mx-auto px-[3rem] xb:px-[1rem]">
              <Swiper
                pagination={{ el: ".swiper-pagination", clickable: true }}
                modules={[Pagination]}
                className="mySwiper swiper-block"
              >
                <SwiperSlide>
                  <div className="h-[30rem] xb:h-[20rem]">
                    <img
                      className="w-full h-full object-contain"
                      src={currentProduct.image}
                      alt="image"
                    />
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="h-[30rem] xb:h-[20rem]">
                    <img
                      className="w-full h-full object-contain"
                      src={currentProduct.image}
                      alt="image"
                    />
                  </div>
                </SwiperSlide>

                <div className="swiper-pagination"></div>
              </Swiper>
            </div>
          </>
        )}

        <div className="single-card-details">
          <div className="flex justify-between">
            <h2 className="single-card-details__title">
              {currentProduct.name}
            </h2>
            <button
              onClick={handleToggleFavs}
              className="single-card-details__btns-fav fav"
            >
              <img src={isFavs ? AddToFavFill : AddToFav} />
            </button>
          </div>
          <div className="single-card-details__btns sm:hidden">
            {!isCart ? (
              <button
                onClick={handleAddToCart}
                className="single-card-details__btns-cart"
              >
                {SingleCardPageTr.addCard}
              </button>
            ) : (
              <Link to="/cart" className="single-card-details__btns-link">
                {SingleCardPageTr.gotoCard}
              </Link>
            )}
            <button
              onClick={handleToggleFavs}
              className="single-card-details__btns-fav"
            >
              <img src={isFavs ? AddToFavFill : AddToFav} />
            </button>
          </div>
          <span className="single-card-details__price">{}</span>
          <div className="single-card-details__category">
            <h3>{SingleCardPageTr.store}</h3>
          </div>
          <div className="single-card-details__market-name">
            <div>
              <ImageLoad src={currentProduct.supplier?.avatar} />
            </div>
            <h4>{currentProduct.supplier?.name}</h4>
          </div>

          <p className="single-card-details__des">
            {currentProduct.description}
          </p>
          <div className="single-card-details__add">
            <div className="block">
              <div className="in-cart">
                {!isCart ? (
                  <button
                    onClick={handleAddToCart}
                    className="single-card-details__btns-cart"
                  >
                    {SingleCardPageTr.addCard}
                  </button>
                ) : (
                  <Link to="/cart" className="single-card-details__btns-link">
                    {SingleCardPageTr.gotoCard}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="single-card-info">
        <div className="single-card-info__desc sm:mb-[5.45rem]">
          <h2 className="single-card-info__desc-title">
            {SingleCardPageTr.desc}
          </h2>
          <p className="single-card-info__desc-text">
            {currentProduct.description}
          </p>
        </div>

        <ContactsCard currentShop={currentProduct} />
      </div>

      <div className="similar-products">
        <h2 className="similar-products__title">{SingleCardPageTr.title}</h2>
        <div className="similar-products__catalog sm:grid-cols-2">
          {similarProducts
            .filter((product) => product.id != productId)
            .map((product, idx) => {
              if (idx < 8) {
                return <Card key={product.id} product={product} />;
              }
              return;
            })}
        </div>
      </div>
      <Modal isActive={isModal} setIsActive={setIsModal}>
        <div className="modal-content-title">{SingleCardPageTr.modalTitle}</div>
        <Link to="/auth/sign-in" className="w-full">
          <Button>{SingleCardPageTr.btn}</Button>
        </Link>
        <div className="modal-content-no-auth">
          {SingleCardPageTr.notAcc}
          <Link to="/auth/sign-up" className="text-main">
            {SingleCardPageTr.register}
          </Link>
        </div>
      </Modal>
    </div>
  );
}

export default SingleCardPage;
