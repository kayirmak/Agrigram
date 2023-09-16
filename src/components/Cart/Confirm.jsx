
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import sendRequest from "../../api/index.js";
import { db } from '../../../firebase.config';

import './confirm.scss';
import { useState } from "react";
import Loader from "../Loader/Loader.jsx";

function Confirm() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const {state} = useLocation();
    const {orderData, userData} = state;
    const {store, sum} = orderData;

		const { t } = useTranslation();
  	const confirmTr = t("confirm", { returnObjects: true });

    const sendOrder = () => {
        setLoading(true);
        setErrorMessage("");
        const items = store.items.map(prod => ({item: prod.item.id, quantity: prod.quantity}))
        const order = {
            items: items,
            store: Number(store.id),
            totalCost: sum,
            user: currentUser.id,
            address: userData.address,
            phone: userData.phone,
            lat: 0,
            lon: 0,
            comment: userData.comments,
            storeName: store.name,
            storeLogo: store.avatar,
            status: 1,
            isoptovik: false,
            bonus: userData.bonus ? userData.bonus : 0,
            pay_status: false,
            user_id: currentUser.id
        }
        
        sendRequest("sendOrder", order)
            .then(async () => {
                const itemRefs = db
                .collection("users")
                .doc(currentUser.id.toString())
                .collection("cart")
                .doc(store.id.toString())

                itemRefs
                .collection("cart")
                .get()
                .then(items => {
                    items.forEach(item => item.ref.delete());
                })

                itemRefs.delete();

                navigate("/checkout/completed");
                setLoading(false);
            })
            .catch(() =>  {
                setErrorMessage("Ошибка запроса")
                setLoading(false);
            })
        ;
    }

    return (
        <div className="confirm">
            <h2 className="confirm-title">{confirmTr.title}</h2>

            <div className="confirm-details">
                <div className="confirm-details-info">
                    <div className="confirm-details-info-item">
                        <h4>{confirmTr.address}</h4>
                        <div>
                            <span>{userData.address}</span>
                            <span>{confirmTr.city}</span>
                        </div>
                    </div>

                    <div className="confirm-details-info-item">
                        <h4>{confirmTr.pay}</h4>
                        <span>{userData.paymentType}</span>
                    </div>

                    <div className="confirm-details-info-item">
                        <h4>{confirmTr.detalPay}</h4>
                        <span>{confirmTr.TotalPaid}</span>
                        <span className="confirm-details-info-item-total">{sum} c</span>
                    </div>
                </div>


                <div className="h-11">
                    <span className="text-[red] text-lg">
                        {errorMessage}
                    </span>
                </div>
                <button
                    onClick={sendOrder}
                    disabled={loading}
                    className="confirm-details-submit flex justify-center items-center">
                        {loading ? <Loader /> : `${confirmTr.confirm}`}
                </button>
                {/* <button className="confirm-details-cancel">Отмена</button> */}
            </div>
        </div>
    )
}

export default Confirm;
