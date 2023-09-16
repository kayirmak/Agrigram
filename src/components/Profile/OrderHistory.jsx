
import { useState } from "react";
import { Link } from "react-router-dom";

import ImageLoad from "../ImageLoad/ImageLoad";

import Arrow from "../../assets/imgs/profile/arrow-icon.svg";

import "./myhistory.scss";

function OrderHistory({order, myHistoryTr}) {
  const [isActive, setIsActive] = useState(false);

  const options = {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  };

  const date = new Date(order.date).toLocaleString("ru-RU", options);
  
  const orderStatus = (status) => {
    switch (status) {
      case 1:
        return "waiting";
      case 11:
        return "approved";
      case 2:
        return "packed";
      case 22:
        return "packeded";
      case 3:
        return "ways";
      case -1:
        return "refused";
      default:
        return "completed"
    }
  };

  const HistoryStatus = [
    { title: "date", subtitle: date },
    { title: "stat", subtitle: myHistoryTr[orderStatus(order.status)] },
    { title: "deliveryAddress", subtitle: order.status },
    { title: "numTelephone", subtitle: order.phone },
    { title: "total", subtitle: order.totalCost },
    { title: "bonus", subtitle: order.bonus },
    { title: "paid", subtitle: order.totalCost },
  ];

  return (
    <div
      className={`history-block  ${isActive ? "h-full" : "h-[7.125rem]"}`}
    >
      <div className="history-comp">
        <div className="avatar">
          <ImageLoad src={order.storeLogo} alt="Avatar" />
          <span>{order.storeName}</span>
        </div>
        <div className="history-el">
          <div>
            <h3>{myHistoryTr.price}</h3>
            <h4>{order.totalCost}</h4>
          </div>
          <div>
            <h3>{myHistoryTr.quantity}</h3>
            <h4>{order.items.reduce((accum, prev) => accum += prev.quantity, 0)}</h4>
          </div>
          <div>
            <h3>{myHistoryTr.status}</h3>
            <h4>{myHistoryTr[orderStatus(order.status)]}</h4>
          </div>
        </div>
        <div className="arrow">
          <span className={`${isActive ? "opacity-0" : null}`}>
            {date}
          </span>
          <img
            className={`${isActive ? "active" : null}`}
            onClick={() => setIsActive(!isActive)}
            src={Arrow}
            alt="Arrow"
          />
        </div>
      </div>
      <div className={`${isActive ? "history-bottom" : "hidden"}`}>
        {HistoryStatus.map((status, i) => (
          <div key={i}>
            <h3>{myHistoryTr[status.title]}</h3>
            <h4 className={`${i === 1 ? "normal" : "bold"}`}>
              {status.subtitle}
            </h4>
          </div>
        ))}
      <div className="order-items flex flex-col gap-y-4">
        {
          order.items.map(prod => {
            return (
              <Link key={prod.id} to={`/products/${prod.item.id}`} className="order-items-item flex justify-between items-end shadow-[0_9px_18px_rgba(204,204,204,.4)] rounded-xl py-1 px-4">
                <div className="item-left flex items-center gap-x-4 mb-0">
                  <div className="item-left-img">
                    <ImageLoad className="w-14 h-14 object-cover" src={prod.item.image} alt="нет лого" />
                  </div>
                  <div className="item-left-info">
                    <h3 className="item-left-info-title font-medium">{prod.item.name}</h3>
                    <h4 className="item-left-info-subtitile">{prod.quantity}x{prod.item.cost}<span className="text-main">с</span> </h4>
                  </div>
                </div>
                <div className="item-right">
                  <h2 className="item-right-total !mb-0 !text-main">{prod.quantity * prod.item.cost}с</h2>
                </div>
              </Link>
            )
          })
        }
      </div>
      </div>
    </div>
  )
}

export default OrderHistory;
