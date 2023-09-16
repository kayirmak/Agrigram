import { contacts } from "../data";
import { useTranslation } from "react-i18next";

import ContactsForm from "../components/Contacts/ContactsForm";

import Banner from "../assets/imgs/banner-about-us.svg";
import LocationIcon from "../assets/imgs/contacts-icons/lacation.svg";

import "./contactsPage.scss";

const ContactsPage = () => {
  const { t } = useTranslation();
  const ourContactsTr = t("ourContacts", { returnObjects: true });

  return (
    <div className="contacts-page">
      <div className="advertising">
        <img className="advertising-img" src={Banner} alt="banner-about-us" />
      </div>

      <div className="contact">
        <h3 className="contact-title">{ourContactsTr.title}</h3>
        <div className="contact-block">
          <div className="contact-media-social">
            <div className="social-item">
              <img className="social-item-img" src={LocationIcon} alt="icon" />
              <h5 className="social-item-title">{ourContactsTr.street}</h5>
            </div>
            {contacts.map(({ title, icon }, idx) => (
              <div className="social-item" key={idx}>
                <img className="social-item-img" src={icon} alt="icon" />
                <h5 className="social-item-title">{title}</h5>
              </div>
            ))}
          </div>
          <div className="contacts-form-wrap">
            <ContactsForm ourContactsTr={ourContactsTr} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
