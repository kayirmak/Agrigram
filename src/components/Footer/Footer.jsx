import { useState } from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Logo from "../../assets/imgs/agri/LogoAgri.svg";

import { footerContacts, footerNavLinks } from "../../data";

import "./footer.scss";

function Footer() {
  const [size, setSize] = useState(window.innerWidth);
  const [isActive, setIsActive] = useState(null);

  const { t } = useTranslation();
  const footerTr = t("footer", { returnObjects: true });

  window.addEventListener("resize", function () {
    setSize(window.innerWidth);
  });

  const handleClickIsActive = (idx) => {
    if (isActive === idx) {
      return setIsActive(null);
    }
    setIsActive(idx);
  };

  return (
    <footer className="footer">
      <Link to="/" className="footer-logo">
        <img src={Logo} alt="agrigramLogo" />
      </Link>

      {size <= 640 ? (
        <nav className="footer-nav flex items-center flex-col">
          {footerNavLinks.map(({ title, img, elements }, idx) => (
            <div key={idx} className="mb-6">
              <div className="nav mb-3">
                <div
                  onClick={() => handleClickIsActive(idx)}
                  className="nav-el"
                >
                  <h3 className="nav-title">{title}</h3>
                  <img
                    className={`${
                      isActive === idx ? "arrow-one" : "arrow-two"
                    }`}
                    src={img}
                    alt="arrow-icon"
                  />
                </div>
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-300 ${
                  isActive === idx ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                {elements.map(({ name, path }, idx) => (
                  <Link key={idx} className="item" to={path}>
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="nav-social">
            <h3 className="nav-social-title">Мы в соц. сетях</h3>
            <div className="nav-social-items">
              {footerContacts.map(({ icon }, idx) => (
                <a key={idx} href="#">
                  <img src={icon} alt="contacts-icon" />
                </a>
              ))}
            </div>
          </div>

          <a className="footer-nav-link" href="/">
            <img className="w-14 h-14" src={Logo} alt="logo" />
            <p>Скачать приложение</p>
          </a>
        </nav>
      ) : (
        <nav className="footer-nav">
          <div className="nav">
            <h3 className="nav-title">О нас</h3>
            <Link className="nav-item" to="/stores">
              Магазины
            </Link>
            <Link className="nav-item" to="/category">
              Категории
            </Link>
            <Link className="nav-item" to="/contacts">
              Контакты
            </Link>
          </div>

          <div className="nav">
            <h3 className="nav-title">Помощь</h3>
            <Link to="technical-support" className="nav-item">
              Тех. поддержка
            </Link>
            <Link to="user-agreement-page" className="nav-item">
              Пользовательское соглашение
            </Link>
            <Link to="privacy-policy-page" className="nav-item">
              Политика конфиденциальности
            </Link>
          </div>

          <div className="nav">
            <h3 className="nav-title">Мы в соц. сетях</h3>
            <a className="nav-item" href="#">
              Facebook
            </a>
            <a className="nav-item" href="#">
              Instagram
            </a>
            <a className="nav-item" href="#">
              Telegram
            </a>
          </div>
        </nav>
      )}
    </footer>
  );
}

export default Footer;
