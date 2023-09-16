import Button from "../Button/Button";

import SuccessIcon from "../../assets/imgs/contacts-icons/success-icon.svg";
import ErrotIcon from "../../assets/imgs/contacts-icons/error-icon.svg";
import CloseIcon from "../../assets/imgs/contacts-icons/close-icon.svg";


import "./message.scss";

const Message = () => {
  return (
    <div className="message">
      <h2>Связаться с нами</h2>
      <h3>Если возникли вопросы, можете нам написать.</h3>

      <form className="message-form">
        <div className="message-form-block">
          <label>Ваше имя</label>
          <input type="text" placeholder="Ваше имя" />
        </div>

        <div className="message-form-block">
          <label>Номер телефона</label>
          <input type="text" placeholder="Номер телефона" />
        </div>

        <div className="message-form-block">
          <label>Ваше сообщение</label>
          <textarea type="text" placeholder="Ваше сообщение" />
        </div>

        <div>
          <Button className="btn">Отправить</Button>
        </div>
      </form>

      <div>
        {/* <div className="message-success">
          <div>
            <img className="close" src={CloseIcon} alt="close" />
            <img className="message-error" src={SuccessIcon} alt="success-icon" />
            <h3>Ваше сообщение отправлено!</h3>
            <button>Продолжить</button>
          </div>
        </div> */}
        {/* <div className="message-success">
          <div>
            <img className="close" src={CloseIcon} alt="close" />
            <img className="message-error" src={ErrotIcon} alt="success-icon" />
            <h4>Извините, произошла ошибка</h4>
						<p>Попробуйте еще раз</p>
            <button>Еще раз</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Message;
