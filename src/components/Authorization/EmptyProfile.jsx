import Kai from "../../assets/imgs/onboard/kai.svg";
import Child from "../../assets/imgs/autorization/child.svg";

import Button from "../../components/Button/Button";

import { Link } from "react-router-dom";

import "./style.scss";

const EmptyProfile = () => {
  return (
    <section className="authorization">
      <div className="authorization-container">
        <div className="authorization-shadow">
          <div className="empty">
            <div className="empty-el">
              <img src={Child} alt="Child-icon" />
              <p>Ой, сначало вам необходимо авторизоваться</p>

              <Link to="sign-in">
                <Button className="btn">Авторизоваться</Button>
              </Link>

              <div className="bottom-link">
                У вас нет аккаунта?
                <Link to="sign-up">Зарегистрироваться</Link>
              </div>
            </div>
          </div>
          <img className="image" src={Kai} alt="kai-icon" />
        </div>
      </div>
    </section>
  );
};

export default EmptyProfile;
