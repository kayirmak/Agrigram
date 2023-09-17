import PhoneIcon from "../../assets/imgs/contacts-icons/phone.svg";
import MailIcon from "../../assets/imgs/contacts-icons/mail.svg";
import WhatsAppIcon from "../../assets/imgs/contacts-icons/whatsapp.svg";
import TelegramIcon from "../../assets/imgs/contacts-icons/telegram.svg";

import "./contactsCard.scss";

function ContactsCard({ currentShop }) {
  const { phone, email, whatsapp, facebook } = currentShop;

  return (
    <div className="contacts">
      <h2 className="contacts-title">Связаться с нами:</h2>
      <div className="contacts-items">
        <a href={`tel:${phone}`} className="contacts-items__item">
          <img src={PhoneIcon} />
          <span>{phone}</span>
        </a>
        <a href={`mailto:${email}`} className="contacts-items__item">
          <img src={MailIcon} />
          <span>{email}</span>
        </a>
        <a href="tel:" className="contacts-items__item">
          <img src={WhatsAppIcon} />
          <span>{whatsapp}</span>
        </a>
        <a href="tel:" className="contacts-items__item">
          <img src={TelegramIcon} />
          <span>{facebook}</span>
        </a>
      </div>

      <a href={`mailto:${email}`}>
        <button className="contacts-btn">Написать сообщение</button>
      </a>
    </div>
  );
}

export default ContactsCard;
