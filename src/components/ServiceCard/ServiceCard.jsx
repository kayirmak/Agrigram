import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import img from "../../assets/image.png";

const ServiceCard = ({ service }) => {
  return (
    <div className="flex flex-wrap justify-between gap-y-14 w-full">
      {service?.map((item, index) => (
        <Card key={index} sx={{ maxWidth: 270 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={img}
              alt="green iguana"
            />
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
