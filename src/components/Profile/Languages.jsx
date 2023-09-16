import React from "react";
import { useTranslation } from "react-i18next";
import LlagKgz from "../../assets/imgs/profile/flag-kgz.svg";
import LlagRuss from "../../assets/imgs/profile/flag-russ.svg";
import Arrow from "../../assets/imgs/profile/arrow.svg";

import "./languages.scss";

const Languages = () => {
	const { t } = useTranslation();
	const languagesTr = t("languages", { returnObjects: true });

  return (
    <div className="languages">
			<h2 className="font-bold text-2xl mb-12 hidden sm:block">{languagesTr[0]}</h2>
      <div className="languages-block">
        <div className="languages-el">
          <img src={LlagKgz} alt="Llag-kgz" />
          <span>{languagesTr[1]}</span>
        </div>
        <img src={Arrow} alt="arrow-icon" />
      </div>
      <div className="languages-block">
        <div className="languages-el">
          <img src={LlagRuss} alt="Llag-rassun" />
          <span>{languagesTr[2]}</span>
        </div>
      </div>

			<button>{languagesTr[3]}</button>
    </div>
  );
};

export default Languages;
