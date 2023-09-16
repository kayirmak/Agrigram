import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import ArrowIcon from "../../assets/imgs/profile/arrow-icon.svg";

import './settings.scss';

function Settings(props) {
const {isActiveItem, onActiveChild, isActiveChild, item, settings} = props;

const { t } = useTranslation();
const profileTr = t("profile", { returnObjects: true });

let classNamesForItems = "h-0 mr-0 ml-auto cursor-pointer w-60 sm:w-[3rem] grid grid-cols-[1fr_2.5fr_1fr] items-center bg-grey-light rounded-xl text-white duration-300";
  
  return (
      <div className={`settings transition-all ${isActiveItem.id === item.id ? "mt-8" : ""}`}>
          {
              settings.map((el, idx) => {
                  return (
                      <Link
                          to={`${item.path}/${el.path}`}
                          key={idx}
                          onClick={() => onActiveChild(el)}
                          className={`
                              ${classNamesForItems}
                              ${isActiveItem.path === item.path ? " !h-12 last:mb-0 mb-6" : "relative -z-10 opacity-0"}
                              ${isActiveChild.path === el.path ? " !bg-black" : ""}
                          `}
                      >	
                          <img className="ml-4" src={el.img} />
                          <span className="font-medium sm:hidden">{profileTr[el.title]}</span>
                          <img className="mr-3 justify-self-end fill-white sm:hidden" src={ArrowIcon} />
                      </Link>
                  )
              })
          }
      </div>
  )
}

export default Settings;
