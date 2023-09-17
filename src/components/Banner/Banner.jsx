import { useEffect, useRef, useState } from "react";

import sendRequest from "../../api";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import BannerImg from "../../assets/imgs/banner/banner.svg";
import BannerImage from "../../assets/imgs/agri/bann.png";
import AgroVideo from "../../assets/video/agroVideo.mp4";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./banner.scss";
import { Link } from "react-router-dom";

function Banner() {
  const [banners, setBanners] = useState([]);
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    videoRef.current.play();
  };

  useEffect(() => {
    getBanners();
  }, []);

  const getBanners = () => {
    sendRequest("getBanners").then((res) => setBanners(res.data.results));
  };

  return (
    <div className="banner relative">
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
        className="mySwiper"
      >
        <SwiperSlide>
          <video
            className="max-w-full w-full h-full"
            onEnded={handleVideoEnded}
            ref={videoRef}
            autoPlay
            muted
          >
            <source src={AgroVideo} type="video/mp4" />
            <source src={AgroVideo} type="video/webm" />
            <source src={AgroVideo} type="video/ogg" />
          </video>
        </SwiperSlide>
      </Swiper>
      <div className="flex items-center justify-center w-full h-full absolute left-0 top-0 z-20 bg-black opacity-70">
        <Link to="yield-calculation">
          <button className="bg-[#5ba29f] hover:bg-[#14988B] text-white font-bold py-2 px-4 rounded absolute z-30">
            Вы можете рассчитать урожайность
          </button>
        </Link>
      </div>

      {/* <div className="banner-items-scroll">
        <div className="banner-items">
          {banners.map((banner) => {
            return (
              <a key={banner.id} href={banner.link}>
                <img src={banner.photo} />
              </a>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default Banner;
