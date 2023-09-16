import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import Card from '../components/Card/Card';

import { db } from '../../firebase.config';

import EmptyIcon from '../assets/imgs/base-icons/empty-favorite.svg';
import AdvertisingImg from '../assets/imgs/reklama.jpg';

import './favoritePage.scss';

function FavoritePage() {
    const currentUser = useSelector(state => state.auth.currentUser);
    const [favsList, setFavsList] = useState([]);

		const { t } = useTranslation();
  	const favoritePageTr = t("favoritePage", { returnObjects: true });

    useEffect(() => {
        const favsRef = db
        .collection("users")
        .doc(currentUser.id.toString())
        .collection("favs");

        const unsubscribe = favsRef.onSnapshot(snap => {
            const formedFavs = snap.docs.map(item => item.data());
            setFavsList(formedFavs);
        })

        return unsubscribe;
    }, []);

    return (
        <div className="favorite">
            <div className="advertising">
                <img src={AdvertisingImg} />
            </div>

            {
                favsList.length ? 
                <div className="favorite-content col">
                    {
                        favsList.map(product => {
                            return <Card key={product.id} product={product} />
                        })
                    }
                </div>
                :
                <div className="favorite-empty">

                    <img src={EmptyIcon} />

                    <h2>{favoritePageTr.title}</h2>

                    <h3>{favoritePageTr.subtitle}</h3>

                    <Link to="/"><button>{favoritePageTr.buttonTitle}</button></Link>
                </div>
            }
        </div>
    )
}

export default FavoritePage;
