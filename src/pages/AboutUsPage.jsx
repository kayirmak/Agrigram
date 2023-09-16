import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getShops } from "../store/shop/shopsApi";
import { useTranslation } from "react-i18next";

import ContactsCard from "../components/ContactsCard/ContactsCard";

import Banner from "../assets/imgs/banner-about-us.svg";

import "./aboutUsPage.scss";

const AboutUsPage = () => {
  const currentShop = useSelector((state) => state.shops);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const aboutUsTr = t("aboutUs", { returnObjects: true });

  useEffect(() => {
    getShops(dispatch);
  }, []);

  return (
    <div className="about-us-page">
      <div className="about-us">
        <h3 className="about-us-title">{aboutUsTr.title}</h3>
        <div className="about-us-block">
          <div className="about-us-block-description">
            <p className="description-text">{aboutUsTr.desc[0]}</p>
            <p className="description-text">{aboutUsTr.desc[1]}</p>
          </div>
          <div className="contact-el">
            <ContactsCard currentShop={currentShop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
