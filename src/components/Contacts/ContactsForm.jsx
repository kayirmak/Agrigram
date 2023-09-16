import Button from "../Button/Button";

import SuccessIcon from "../../assets/imgs/contacts-icons/success-icon.svg";
import ErrotIcon from "../../assets/imgs/contacts-icons/error-icon.svg";
import CloseIcon from "../../assets/imgs/contacts-icons/close-icon.svg";

import "./contactsForm.scss";

const ContactsForm = ({ ourContactsTr }) => {
  return (
    <div>
      <form className="contact-form">
        <div className="contact-form-item">
          <label className="contact-form-item-label">{ourContactsTr.name}</label>
          <input className="contact-form-item-inp" type="text" placeholder={ourContactsTr.name} />
        </div>

        <div className="contact-form-item">
          <label className="contact-form-item-label">{ourContactsTr.PhoneNumber}</label>
          <input className="contact-form-item-inp" type="text" placeholder={ourContactsTr.PhoneNumber} />
        </div>

        <div className="contact-form-item">
          <label className="contact-form-item-label">{ourContactsTr.message}</label>
          <textarea className="contact-form-item-text" type="text" placeholder={ourContactsTr.message} />
        </div>

        <div className="contact-form-btn">
          <Button className="btn bg-main">{ourContactsTr.send}</Button>
        </div>
      </form>

      <div className="response">
        {/* <div className="contact-success">
          <div className="contact-success-block">
            <img className="close" src={CloseIcon} alt="close" />
            <img className="contact-success-block-img" src={SuccessIcon} alt="success-icon" />
            <h3 className="contact-success-block-msg">Ваше сообщение отправлено!</h3>
            <button className="contact-success-block-btn">Продолжить</button>
          </div>
        </div>
        <div className="contact-success">
          <div className="contact-success-block">
            <img className="close" src={CloseIcon} alt="close" />
            <img className="contact-success-block-img" src={ErrotIcon} alt="success-icon" />
            <h4 className="contact-success-block-msg">Извините, произошла ошибка</h4>
						<p className="contact-success-block-try">Попробуйте еще раз</p>
            <button className="contact-success-block-btn">Еще раз</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactsForm;
