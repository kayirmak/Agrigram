import { useTranslation } from 'react-i18next';
import Icon from '../../assets/imgs/advantage/icon.svg';

import './advantage.scss';

function Advantage() {
	const { t } = useTranslation();
  const advantageTr = t("advantage", {returnObjects: true});

    return (
        <div className="advantage">
            <div className="advantage-item">
                <img src={Icon} />
                <h3 className="advantage-item__title">{advantageTr.convenientOrder.title}</h3>
                <p className="advantage-item__desc">{advantageTr.convenientOrder.desc}</p>
            </div>

            <div className="advantage-item">
                <img src={Icon} />
                <h3 className="advantage-item__title">{advantageTr.largeAssortment.title}</h3>
                <p className="advantage-item__desc">{advantageTr.largeAssortment.desc}</p>
            </div>

            <div className="advantage-item">
                <img src={Icon} />
                <h3 className="advantage-item__title">{advantageTr.productRange.title}</h3>
                <p className="advantage-item__desc">{advantageTr.productRange.desc}</p>
            </div>
        </div>
    )
}

export default Advantage;
