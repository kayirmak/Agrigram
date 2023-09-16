import Img from '../../assets/imgs/product-of-the-day.png';

import Cat from '../../assets/imgs/cat.jpg';

import './productOfTheDay.scss';


function ProductOfTheDay() {
    return (
        <div className="product-day">
            <div className="product-day-img">
              <img src={Cat} alt="kurjun-prod-day" />
            </div>

            <div className="product-day-info">
                <p className="product-day-info__pretitle">Товар дня</p>
                <h2 className="product-day-info__title">Свадебное платье</h2>
                <p className="product-day-info__desc">Et id lectus vitae tellus quisque. Eu elementum id quis magnis molestie urna condimentum pellentesque. Eget et purus eu eu posuere amet mauris turpis.</p>
                <button className="product-day-info__btn">Посмотреть товар</button>
            </div>
        </div>
    )
}

export default ProductOfTheDay;
