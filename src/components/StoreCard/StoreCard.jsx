import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SingleRating from '../../assets/imgs/rating/single-rating.svg';
import AvDefault from '../../assets/imgs/logo-def-black.svg';

import './storeCard.scss';

function StoreCard({shop}) {
  const [loadedImg, setLoadedImg] = useState(true);

	const { t } = useTranslation();
  const storeCardTr = t("storeCard", {returnObjects: true});

    return (
        <div className="store-card max-w-[22.5rem] w-full mx-auto">
            <div className="store-card-head">
                <span className="store-card-head__schedule">{storeCardTr.after} 10.00 {storeCardTr.before} 20.00</span>
                <div className="store-card-head__rating">
                    <img src={SingleRating} />
                    <h4>{shop.rating}</h4>
                </div>
            </div>

            <div className="store-card-middle">
                <div className="store-card-middle-logo">
                    <img onError={() => setLoadedImg(false)} src={loadedImg ? shop.avatar : AvDefault} alt='Logo'/>
                </div>
                <h4 className="store-card-middle-name">{shop.name}</h4>
            </div>

            <div className="store-card-foot">
                <span>{storeCardTr.delivery} 150 с</span>
            </div>
        </div>
    )
}
  
export default StoreCard;
