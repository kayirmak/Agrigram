import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import img from "../../assets/image.png";
import Partner1 from "../../assets/imgs/partners/shoro.svg";

import "../Partners/partners.scss";
import Swiper, { Autoplay, Pagination } from "swiper";
import { SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ServiceCard = ({ service }) => {
  return (
    <div className="flex flex-wrap gap-20 w-full">
      {service?.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 270 }}>
          <CardActionArea>
            <div className="partners">
              <CardMedia
                component="img"
                height="140"
                image={img}
                alt="green iguana"
              />
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.nameRu}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCard;
