import React, { useState } from "react";
import { questions } from "../../data";
import { useTranslation } from "react-i18next";
import Arrow from "../../assets/imgs/profile/arrow.svg";
import Search from "../../assets/imgs/profile/search-icon.svg";
import "./questions.scss";

const Questions = () => {
  const [clicked, setClicked] = useState(null);

	const { t } = useTranslation();
	const questionsTr = t("questions", { returnObjects: true });

  const handleClick = (i) => {
    if (clicked === i) {
      return setClicked(null);
    }
    setClicked(i);
  };

  return (
    <div className="questions">
      <div>
        <h2>{questionsTr.title}</h2>
        <div className="relative">
          <input type="text" placeholder={questionsTr.search} />
          <img className="search" src={Search} alt="search-icon" />
        </div>
        <div className="mark">
          {questions.map(({title, subtitle}, i) => (
            <div key={i}>
              <div onClick={() => handleClick(i)} className="mark-el">
                <h3>{questionsTr.titles[title]}</h3>
                <img
                  className={`${
                    clicked === i
                      ? "arrow-one"
                      : "arrow-two"
                  }`}
                  src={Arrow}
                  alt="Arrow"
                />
              </div>
              <div className={`${clicked === i ? "block" : "hidden"}`}>
                <p className="title">{questionsTr.descriptions[subtitle]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="questions-el">
        <p className="questions-el-text">{questionsTr.text}</p>
        <button>{questionsTr.btn}</button>
      </div>
    </div>
  );
};

export default Questions;
