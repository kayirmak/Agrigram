import { useState } from "react";
import AvDefault from "../../assets/imgs/avatar-default.svg";

function ImageLoad({src, alt, className, onClick}) {
  const [loadedImg, setLoadedImg] = useState(true);

  return <img
    onError={() => setLoadedImg(false)}
    onClick={onClick}
    src={loadedImg && src ? src : AvDefault}
    className={className}
    alt={alt}
  />
}

export default ImageLoad;
