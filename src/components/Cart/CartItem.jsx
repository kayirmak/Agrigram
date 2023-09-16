import { useTranslation } from 'react-i18next';
import Img from '../../assets/imgs/cat.jpg';
import Dec from '../../assets/imgs/base-icons/dec.svg';
import Inc from '../../assets/imgs/base-icons/inc.svg';
import Cross from '../../assets/imgs/base-icons/cross.svg';

import './cartItem.scss';

function CartItem({store, product, handleChangeQuantity, handleDeleteItem}) {
    const {item, quantity} = product;

		const { t } = useTranslation();
  	const cartItemTr = t("cartItem", {returnObjects: true});

    return (
        <tr className="cart-details-products-item">
            <td className="cart-details-products-item-img">
                <img src={item.image} />

                <div className="img-info">
                    <h3 className="img-info__title">{item.name}</h3>
                    <span className="img-info__from">{cartItemTr.local}</span>
                    <div className="store">
                        <span>{cartItemTr.store}: {store.name}</span>                
                    </div>
                    <div className="price">
                    {
                        !item.costSale ? 
                        <span className="">{item.cost} с</span>
                        : 
                        <div className="flex gap-x-2 justify-center items-baseline">
                            <span className="line-through text-base text-grey-light">{item.cost} с</span>
                            <span className="">{item.costSale} с</span>
                        </div>
                    }    
                    </div>
                </div>
            </td>

            <td className="cart-details-products-item-store sm:hidden">
                <span>{store.name}</span>                
            </td>

            <td className="cart-details-products-item-quantity">
                <button onClick={() => handleChangeQuantity("dec", {storeId: store.id, itemId: item.id, quantity})} disabled={quantity <= 1}><img src={Dec} /></button>
                <span>{quantity}</span>
                <button onClick={() => handleChangeQuantity("inc", {storeId: store.id, itemId: item.id, quantity})}><img src={Inc} /></button>
            </td>

            <td className="cart-details-products-item-price">
                {
                    !item.costSale ? 
                    <span className="">{item.cost} с</span>
                    : 
                    <div className="flex gap-x-2 justify-center items-baseline">
                        <span className="line-through text-sm text-grey-light">{item.cost} с</span>
                        <span className="">{item.costSale} с</span>
                    </div>
                }    
            </td>

            <td className="cart-details-products-item-total">
                <span>{item.costSale ? item.costSale * quantity : item.cost * quantity}с</span>
            </td>

            <td>
                <img onClick={() => handleDeleteItem({storeId: store.id, itemId: item.id})} className="remove-item" src={Cross} />
            </td>
        </tr>
    )
}

export default CartItem;
