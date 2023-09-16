import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Kai from "../../assets/imgs/onboard/kai.svg";
import Cercle from "../../assets/imgs/autorization/cercle.svg";

import Button from "../Button/Button";

import "./style.scss";

const Confirmation = () => {
  const { t } = useTranslation();
  const confirmationTr = t("confirmation", { returnObjects: true });

  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="confirmation">
            <div className=" confirmation-el">
              <img src={Cercle} alt="Cercle-icon" />
              <h2>{confirmationTr.title}</h2>
              <p>{confirmationTr.desc}</p>
              <Link to="/auth">
                <Button className="btn">{confirmationTr.btn}</Button>
              </Link>
            </div>
          </div>
          <img className="image" src={Kai} alt="kai-iocn" />
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
