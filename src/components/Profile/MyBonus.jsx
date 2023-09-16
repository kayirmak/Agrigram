import { useSelector } from "react-redux";
import Coin from "../../assets/imgs/profile/coin.svg";
import { useTranslation } from "react-i18next";
import NoBonus from "../../assets/imgs/profile/nobonus-icon.svg";
import NotOrdered from "../../assets/imgs/profile/notordered-icon.svg";

import "./mybonus.scss";

const MyBonus = () => {
  const bonus = useSelector((state) => state.auth.currentUser.bonus);

	const { t } = useTranslation();
  const myBonusTr = t("myBonus", { returnObjects: true });

  return (
    <div className="my-bonus">
      <h2 className="font-bold text-2xl mb-12 text-center hidden sm:block">
        {myBonusTr.title}
      </h2>
      {bonus ? (
        <div className="w-full">
          <span className="coin">
            <img src={Coin} alt="Coin" />
            {bonus}
          </span>
          <div className="my-bonus-el">
            <span>21.12.2022</span>
            <div className="my-block">
              <div>
                <h2>{myBonusTr.apple}</h2>
                <h3>{myBonusTr.kolobok}</h3>
              </div>
              <span>1% кешбек</span>
              <div>
                <h4>3562 с</h4>
                <h5>+1456 с</h5>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <span className="coin">
            <img src={Coin} alt="Coin" />
            {bonus}
          </span>
          <div className="my-bonus-el">
            <span>21.12.2022</span>
            <div className="my-block">
              <div>
                <h2>{myBonusTr.apple}</h2>
                <h3>{myBonusTr.kolobok}</h3>
              </div>
              <span>1% кешбек</span>
              <div>
                <h4>3562 с</h4>
                <h5>+1456 с</h5>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <div className="no-bonuses">
        <img src={NoBonus} alt="NoBonus" />
        <h2 >
          У вас еще нет бонусов
        </h2>
        <p >
          Для того чтобы, получать бонусы вам нужно начать делать покупки в
          разделе “Главная”
        </p>
      </div> 
      {/* <div className="no-bonuses">
        <img src={NotOrdered} alt="NotOrdered" />
        <h2 >
          Вы еще ничего не заказали
        </h2>
        <p >
          Здесь будут отображаться все ваши заказы, чтобы сделать первый,
          перейдите в раздел “Главная”
        </p>
      </div> */}
    </div>
  );
};

export default MyBonus;
