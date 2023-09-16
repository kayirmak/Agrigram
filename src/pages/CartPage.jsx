import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Cart from '../components/Cart/Cart';

import { CartContext } from '../hoc/CartProvider';

import AdvertisingImg from '../assets/imgs/reklama.jpg';
import CartEmptyImg from '../assets/imgs/cart/empty-cart.svg';

import './cartPage.scss';

function CartPage() {
    const {getItems, items} = useContext(CartContext);
    const [isEmpty, setIsEmpty] = useState(null);
    const filteredItems = items.filter(store => store.items.length !== 0);

		const { t } = useTranslation();
  	const cartPageTr = t("cartPage", { returnObjects: true });
    
    useEffect(() => {
        if (!filteredItems.length) {
            const unsubscribe = getItems();
            return unsubscribe;
        }
    }, []);

    useEffect(() => {
        setIsEmpty(filteredItems.length ? false : true);
    }, [filteredItems]);

    return (
        <div className="cart">
            <div className="advertising">
                <img src={AdvertisingImg} />
            </div>
            {
                isEmpty ?
                <div className="cart-empty">
                    <img className="cart-empty-img" src={CartEmptyImg} />
                    <h3 className="cart-empty-title">{cartPageTr.title}</h3>
                    <h4 className="cart-empty-subtitle">
                        {cartPageTr.subtitle} <br />
                        {cartPageTr.subtitleBr}
                    </h4>
                    <Link to="/">
                        <button className="cart-empty-submit">{cartPageTr.buttonTitle}</button>
                    </Link>
                </div> : <Cart items={filteredItems} cart={cartPageTr.cart}/>
            }
        </div>
    )
}

export default CartPage;
