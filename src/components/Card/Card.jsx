import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getOneShop } from "../../store/shop/shopsApi";
import { getCartItemsSuccess, getFavsSuccess } from "../../store/cart/cartSlice";
import { db } from "../../../firebase.config";
import { useTranslation } from "react-i18next";

import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ImageLoad from "../ImageLoad/ImageLoad";

import AddToCart from "../../assets/imgs/add-to-cart.svg";
import AddToCartFill from "../../assets/imgs/add-to-cart-fill.svg";
import AddToFavorite from "../../assets/imgs/add-to-favorite.svg";
import AddToFavoriteFill from "../../assets/imgs/add-to-fav-fill.svg";
import AddToCartPlus from "../../assets/imgs/add-icon.svg";
import AddToCartPlusAct from "../../assets/imgs/add-icon-act.svg";

import "./card.scss";
import { CartContext } from "../../hoc/CartProvider";

function Card({ product }) {
  const currentUser = useSelector(state => state.auth.currentUser);
  const isAuth = useSelector(state => state.auth.isAuth);
  const favsByUser = useSelector(state => state.cart.favs);
  const cartItemsByUser = useSelector(state => state.cart.cartItems);
  const oneShop = useSelector(state => state.shops.currentShop);

  const {getItems, items} = useContext(CartContext);

	const { t } = useTranslation();
  const cardTr = t("card", {returnObjects: true});

  const [isCart, setIsCart] = useState(false);
  const [isFavs, setIsFavs] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const dispatch = useDispatch();

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
      getOneShop(dispatch, product.supplier.id.toString());
      favItemsRef
      .get()
      .then(favs => {
        const favsList = favs.docs.map(item => item.data());
        dispatch(getFavsSuccess(favsList));
      });
    }

  }, []);

  useEffect(() => {
    setIsFavs(!!favsByUser.find(item => item.id === product.id));
  }, [favsByUser]);

  useEffect(() => {
    setIsCart(!!items.find(store => {
      return store.items.find(prod => prod.item.id === product.id);
    }));
  }, [items]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isAuth) {
      if (isCart) {
        setIsCart(false);
        cartItemsRef
        .doc(product.supplier.id.toString())
        .collection("cart")
        .doc(product.id.toString())
        .delete();
  
        const isEmpty = (await cartItemsRef
          .doc(product.supplier.id.toString())
          .collection("cart")
          .get()).empty;
          console.log(isEmpty, 'isempty');
        if (isEmpty) {
          cartItemsRef
          .doc(product.supplier.id.toString())
          .delete();
        }
      }
      else {
        setIsCart(true);
  
        const isEmpty = (await cartItemsRef
          .doc(product.supplier.id.toString())
          .get()).exists;
  
        if (!isEmpty) {
          cartItemsRef
          .doc(product.supplier.id.toString())
          .set(oneShop);
        }
        cartItemsRef
        .doc(product.supplier.id.toString())
        .collection("cart")
        .doc(product.id.toString())
        .set({item: product, quantity: 1})
      }
    }
    else setIsModal(true);
  }

  const handleToggleFavs = async (e) => {
    e.preventDefault();

    if (isAuth) {
      if (isFavs) {
        setIsFavs(false);
        favItemsRef
        .doc(product.id.toString())
        .delete();
      }
      else {
        setIsFavs(true);
        favItemsRef.doc(product.id.toString()).set(product);
      }
    }
    else setIsModal(true);
  }

  if (product) {
    return (
      <>
        <Link to={`/products/${product.id}`} className="card">
          <div className="card-img">
            <ImageLoad src={product.image} alt="нет фото" />
          </div>

          <div className="card-info">
            <h3 className="card-info__title">{product.name}</h3>
            <p className="card-info__availability">{cardTr.availability}</p>

            <div className="card-info__shop">
              <div className="card-info__shop-logo">
                <ImageLoad src={product.supplier.avatar} alt="нет логотип" />
              </div>
              <h4 className="card-info__shop-name">{product.supplier.name}</h4>
            </div>
            <div className="card-info__btns">
              <button className="card-info__btns-buy">
              {
                !product.costSale ? 
                  <span className="sm:text-[1.27rem]">{product.cost} с</span>
                : 
                  <div className="flex gap-x-2 justify-center items-baseline">
                    <span className="line-through text-sm text-greyf2">{product.cost} с</span>
                    <span className="">{product.costSale} с</span>
                  </div>
              }                
              </button>
              <button onClick={handleToggleFavs} className="card-info__btns-fav">
                <img src={isFavs ? AddToFavoriteFill : AddToFavorite} />
              </button>
              <button onClick={handleAddToCart} className="card-info__btns-card">
                <img className="sm:hidden" src={isCart ? AddToCartFill : AddToCart} alt="kurjun-cart" />
                <img className="hidden sm:block" src={isCart ? AddToCartPlusAct  : AddToCartPlus} alt="kurjun-cart" />
              </button>
            </div>
          </div>
        </Link>
        <Modal isActive={isModal} setIsActive={setIsModal}>
          <div className="modal-content-title">{cardTr.title}</div>
          <Link to="/auth/sign-in" className="w-full"><Button>{cardTr.btn}</Button></Link>
          <div className="modal-content-no-auth">
						{cardTr.notAcc}
            <Link to="/auth/sign-up" className="text-main">{cardTr.register}</Link>
          </div>
        </Modal>
      </>
    );
  }
}

export default Card;
