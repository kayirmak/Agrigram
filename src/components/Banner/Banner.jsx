import { useEffect, useState } from 'react';

import sendRequest from '../../api';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';

import BannerImg from '../../assets/imgs/banner/banner.svg';
import BannerImege from '../../assets/imgs/banner/banner-two.svg';

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"
import "./banner.scss";

function Banner() {
	const [banners, setBanners] = useState([]);
	useEffect(() => {
		getBanners();
	}, []);

	const getBanners = () => {
		sendRequest("getBanners")
			.then(res => setBanners(res.data.results));
	};

  return (
    <div className="banner">
			<Swiper
				spaceBetween={30}
        pagination={{
          clickable: true,
        }}
				autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper h-[30.9rem] lm:hidden"			
			>
				{
					banners.map(banner => {
						return (
							<SwiperSlide key={banner.id}>
								<a href={banner.link}>
									<img className="banner-img w-full h-[30.9rem] object-contain" src={banner.photo} />
								</a>
							</SwiperSlide>	
						);
					})
				}
			</Swiper>

			<div className="banner-items-scroll">
				<div className="banner-items">
					{
						banners.map(banner => {
							return (
								<a key={banner.id} href={banner.link}>
									<img src={banner.photo} />
								</a>
							);
						})
					}
				</div>
			</div>
			
    </div>
  )
}

export default Banner;
