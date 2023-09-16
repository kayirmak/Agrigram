import Partner1 from '../../assets/imgs/partners/shoro.svg';
import Partner2 from '../../assets/imgs/partners/kolobok.svg';
import Partner3 from '../../assets/imgs/partners/perekrestok.svg';
import Partner4 from '../../assets/imgs/partners/alma.svg';
import Partner5 from '../../assets/imgs/partners/umka.svg';

import './partners.scss';

function Partners() {
    return (
        <div className="partners">
            <img src={Partner1} />
            <img src={Partner2} />
            <img src={Partner3} />
            <img src={Partner4} />
            <img src={Partner5} />
        </div>
    )
}

export default Partners;
