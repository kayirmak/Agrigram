import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../store/auth/authApi";
import { useTranslation } from "react-i18next";

import OrderHistory from "./OrderHistory";

import "./myhistory.scss";

const MyHistory = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const userOrders = useSelector(state => state.auth.userOrders);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

	const { t } = useTranslation();
	const myHistoryTr = t("myHistory", { returnObjects: true });

  const dispatch = useDispatch();

  const date = new Date();
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "numeric",
  };
  const today = date.toLocaleDateString().split(".").reverse().join("-");
  const tomorrow = (new Date(date.getTime() + 24 * 60 * 60 * 1000)).toLocaleDateString("ru-RU", options).split(".").reverse().join("-");

  useEffect(() => {
    getOrders(dispatch, `?user_id=${currentUser.id}&start_date=${startDate}&end_date=${endDate}`)
  }, [startDate, endDate]);  

  return (
    <div className="my-history">
			<h2 className="font-bold text-2xl mb-12 text-center hidden sm:block">
				{myHistoryTr.title}
      </h2>
      <div className="my-history-date">
        <input
          onChange={(e) => setStartDate(e.target.value)}
          type="date"
          min="2010-01-01"
          max={today}
          className="input-date mr-[2.875rem] xb:mr-2"
  			/>
        <input
          onChange={(e) => setEndDate(e.target.value)}
          type="date"
          min="2010-01-01"
          max={tomorrow}
          className="input-date"
        />
      </div>

      <div className="my-history-block">
        {
          userOrders.map((order) => {
            return (
              <OrderHistory key={order.id} order={order} myHistoryTr={myHistoryTr}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default MyHistory;
