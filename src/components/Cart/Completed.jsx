import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import { useTranslation } from "react-i18next";

import SuccessImg from "../../assets/imgs/cart/successmark.svg";

import "./completed.scss";

function Completed() {
  const navigate = useNavigate();

  const { t } = useTranslation();
  const completedTr = t("completed", { returnObjects: true });

  useEffect(() => {
    window.addEventListener("popstate", popstate);
    return () => {
      window.removeEventListener("popstate", popstate);
    };
  }, []);

  const popstate = () => {
    navigate("/cart");
  };

  return (
    <div className="completed">
      <h2 className="completed-title">{completedTr.title}</h2>

      <div className="completed-details">
        <div className="completed-details-img">
          <img src={SuccessImg} />
        </div>

        <h2 className="completed-details-title">
          {completedTr.subtitle[0]} <br /> {completedTr.subtitle[1]}
        </h2>

        <h3 className="completed-details-subtitle">
          {completedTr.desc[0]} <br />
          {completedTr.desc[1]} <br />
          {completedTr.desc[2]} <br />
          {completedTr.desc[3]}
        </h3>

        <Link to="/">
          <button className="completed-details-submit">
            {completedTr.btn}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Completed;
