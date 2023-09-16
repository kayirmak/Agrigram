import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { db } from '../../../firebase.config';

import CartItem from './CartItem';
import ImageLoad from '../ImageLoad/ImageLoad';

import ImgArrow from '../../assets/imgs/category-icons/category-item-icon-arrow.svg';
import CartUzor from '../../assets/imgs/cart/uzor.svg';

import './cart.scss';

function Cart({items, cart}) {
    const currentUser = useSelector(state => state.auth.currentUser);

    const navigate = useNavigate();

    const handleChangeQuantity = (type, data) => {
        const itemRef = db
        .collection("users")
        .doc(currentUser.id.toString())
        .collection("cart")
        .doc(data.storeId.toString())
        .collection("cart")
        .doc(data.itemId.toString());

        switch (type) {
            case "inc":
                itemRef.update({
                    quantity: data.quantity + 1
                })
                break;

            case "dec":
                itemRef.update({
                    quantity: data.quantity - 1
                })
                break;
        
            default:
                break;
        }        
    };

    const handleDeleteItem = async (data) => {
        const itemRef = db
        .collection("users")
        .doc(currentUser.id.toString())
        .collection("cart")
        .doc(data.storeId.toString())
        .collection("cart");
        
        itemRef
        .doc(data.itemId.toString())
        .delete();
        
        const isEmpty = (await itemRef.get()).empty;
        if (isEmpty) {
            db
            .collection("users")
            .doc(currentUser.id.toString())
            .collection("cart")
            .doc(data.storeId.toString())
            .delete();
        }
    }

    const handleCheckout = (store, sum) => {
        navigate("/checkout", {state: {store, sum: sum}})
    }

    return (
        <div className="cart-content">
            <h2 className="cart-content-title">{cart[0]}</h2>
            <div className="cart-content-details">
                {
                    items.length && 
                    items.filter(store => store.items.length !== 0).map(store => {
                        return (
                            <div key={store.id} className="cart-content-details-products">
                                <div className="cart-content-details-products-logo">
                                    <div className="uzor">
                                        <img src={CartUzor} alt="CartUzor" />
                                    </div>
                                    <div className="img-logo">
                                        <ImageLoad src={store.avatar} alt="нет лого" />
                                    </div>
                                    <span className="img-name">{store.name}</span>
                                </div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th className="text-left">{cart[1]}</th>
                                            <th className="text-left">{cart[2]}</th>
                                            <th className="text-left">{cart[3]}</th>
                                            <th className="text-left">{cart[4]}</th>
                                            <th className="text-left">{cart[5]}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {   
                                            store.items.map(product => {
                                                return <CartItem
                                                    key={product.item?.id}
                                                    store={store}
                                                    product={product} 
                                                    handleChangeQuantity={handleChangeQuantity}
                                                    handleDeleteItem={handleDeleteItem}
                                                />
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="cart-content-details-info">
                                    <Link to={`/stores/${store.id}`} className="back-to-shop">
                                        <img src={ImgArrow} />
                                        <span>{cart[6]}</span>
                                    </Link>

                                    <div className="cart-content-details-info-total">
                                        <div className="info-total-block">
                                            <span className="total-text">{cart[7]}</span>
                                            <span className="total-price">
                                                {store.items.reduce((accum, curr) => {
                                                    return accum += curr.item.costSale ? curr.item.costSale * curr.quantity : curr.item.cost * curr.quantity
                                                }, 0) } c
                                            </span>
                                        </div>

                                        <Link to={`/stores/${store.id}`} className="back-to-shop-mob">
                                            <button>{cart[6]}</button>
                                        </Link>

                                        <button 
                                            className="cart-content-details-info-submit"
                                            onClick={() => handleCheckout(store, store.items.reduce((accum, curr) => {
                                                return accum += curr.item.costSale ? curr.item.costSale * curr.quantity : curr.item.cost * curr.quantity
                                            }, 0))} 
                                        >
                                            {cart[8]}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cart;
